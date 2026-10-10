import React, { act, createElement as h, lazy, Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CVForm from "@/components/pdf/CVForm";
import { CREATE_DRAFT_KEY, parseStoredCreateDraft } from "@/lib/create-flow-state";
import { previewDraft } from "./fixtures/preview-cv";

vi.mock("next/dynamic", () => ({ default: (load: Parameters<typeof lazy>[0]) => {
  const Component = lazy(async () => { const result = await load(); return typeof result === "function" ? { default: result } : result; });
  return (props: Record<string, unknown>) => h(Suspense, { fallback: null }, h(Component, props));
} }));
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
vi.mock("@/lib/analytics-events", () => ({ recordAnalyticsEvent: vi.fn(), recordGaFunnelEvent: vi.fn() }));
vi.mock("@/components/ConversionProof", () => ({ ConversionProof: () => null }));
vi.mock("@/components/pdf/PDFViewerPane", () => ({ default: ({ cv, template }: { cv: { sobreMi: string }; template: string }) => h("output", { "data-preview": template }, cv.sobreMi) }));
vi.mock("@/components/CVFormStep", () => ({ default: () => { throw new Error("El generador no debe montarse para editar"); } }));
vi.mock("@/utils/supabase/client", () => ({ createClient: () => ({ auth: {
  getSession: async () => ({ data: { session: null } }),
  signInAnonymously: async () => ({ data: { user: { id: "guest", is_anonymous: true } }, error: null }),
} }) }));
vi.mock("next/image", () => ({ default: () => null }));

let host: HTMLDivElement;
let root: Root;
let fetchMock: ReturnType<typeof vi.fn>;
async function settle() { await act(async () => { await vi.dynamicImportSettled(); }); }
async function click(text: string) {
  const button = [...document.querySelectorAll("button")].find((el) => el.textContent?.includes(text));
  expect(button, text).toBeTruthy();
  await act(async () => { button!.click(); });
  await settle();
}
async function changeSummary(text: string, labelText = "Perfil profesional") {
  const label = [...host.querySelectorAll("label")].find((el) => el.textContent?.includes(labelText));
  const input = label!.querySelector("textarea")!;
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!.call(input, text);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
async function mount(overrides: Partial<React.ComponentProps<typeof CVForm>> = {}) {
  root = createRoot(host);
  await act(async () => { root.render(h(CVForm, { currentUser: { id: "guest", email: null, isAnonymous: true }, guestCheckoutEnabled: true, initialCountryCode: "AR", ...overrides })); });
  await settle();
}
beforeEach(() => {
  vi.stubGlobal("React", React);
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  window.sessionStorage.clear();
  document.cookie = "vitaespark_guest_cv_generated=1; Path=/";
  window.sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify(previewDraft));
  window.sessionStorage.setItem("vitaespark_guest_checkout_email", "ana@example.com");
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  // An exhausted generator would return 429. Only checkout is allowed here.
  fetchMock = vi.fn(async (url: string, _options?: RequestInit) => {
    if (url.includes("generate-cv")) return new Response("{}", { status: 429 });
    return new Response(JSON.stringify({ cvId: "550e8400-e29b-41d4-a716-446655440000", init_point: "#checkout", approveUrl: "#checkout" }), { status: 200 });
  });
  vi.stubGlobal("fetch", fetchMock);
  host = document.createElement("div"); document.body.append(host);
});
afterEach(async () => { if(root) await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });

describe("edición del preview sin regenerar", () => {
  it("entrar con puesto conserva primer empleo sin inferir ausencia de antecedentes", async () => {
    sessionStorage.removeItem(CREATE_DRAFT_KEY);
    await mount({ initialRole: "Cajero/a", initialIntent: "first-job" });
    expect(host.textContent).toContain("Podés crear un buen CV sin experiencia laboral");
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))).toMatchObject({ intent: "first-job", data: { puesto: "Cajero/a", experienceMode: "with-experience" } });
  });
  it("elimina el último antecedente, cancela, guarda, recarga y compra la versión vacía sin regenerar", async () => {
    const pendingCvId = "550e8400-e29b-41d4-a716-446655440000";
    const purchaseKey = "550e8400-e29b-41d4-a716-446655440001";
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, pendingCvId, purchaseKey }));
    await mount();
    await click("Editar antes de pagar");
    const remove = async () => { await act(async () => { host.querySelector('[aria-label="Eliminar"]')!.closest("button")!.click(); }); };
    await remove(); await click("Cancelar");
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.generatedCv?.experiencia).toEqual(previewDraft.generatedCv.experiencia);
    await click("Editar antes de pagar"); await remove(); await click("Guardar cambios");
    await click("Cambiar plantilla"); await click("Harvard");
    await act(async () => root.unmount()); await mount();
    const saved = parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY));
    expect(saved).toMatchObject({ pendingCvId, purchaseKey, generatedCv: { experiencia: [] }, template: "harvard" });
    await click("Editar antes de pagar"); await click("Agregar");
    expect(host.textContent).toContain("Experiencia 1"); await click("Cancelar");
    await click("Mercado Pago");
    const call = fetchMock.mock.calls.find(([url]) => url === "/api/create-payment")!;
    expect(JSON.parse(call[1]!.body as string)).toMatchObject({ cvId: pendingCvId, purchaseKey, cvData: JSON.parse(JSON.stringify(saved!.generatedCv)), template: "harvard" });
    expect(fetchMock.mock.calls.some(([url]) => url.includes("generate-cv"))).toBe(false);
  });
  it("persiste la identidad de compra antes de enviar y bloquea doble clic", async () => {
    await mount();
    const key = parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.purchaseKey;
    expect(key).toMatch(/^[0-9a-f-]{36}$/);
    let resolveResponse!: (value: Response) => void;
    fetchMock.mockImplementation(() => new Promise<Response>((resolve) => { resolveResponse = resolve; }));
    const button = [...host.querySelectorAll("button")].find((item) => item.textContent?.includes("Mercado Pago"))!;
    await act(async () => { button.click(); button.click(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.parse(fetchMock.mock.calls[0][1]!.body as string).purchaseKey).toBe(key);
    await act(async () => resolveResponse(new Response(JSON.stringify({ error: "unknown" }), { status: 503 })));
    await act(async () => root.unmount()); await mount();
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.purchaseKey).toBe(key);
  });
  it("fuera de Argentina Mercado Pago requiere elegir explícitamente Argentina", async () => {
    document.cookie = "vitaespark-market=; Max-Age=0; Path=/";
    await mount({ initialCountryCode: "CL" });
    const mpButton = () => [...host.querySelectorAll("button")].find((item) => item.textContent?.includes("Mercado Pago"));
    expect(mpButton()).toBeUndefined();
    expect(host.textContent).toContain("US$2.99");
    await click("Argentina"); expect(mpButton()).toBeTruthy();
  });
  it("guarda una frase, cambia plantilla, restaura el borrador y paga exactamente esa versión", async () => {
    await mount();
    await click("Editar antes de pagar");
    await changeSummary("Mi frase corregida para la compra.");
    await click("Guardar cambios");
    expect(host.querySelector("[data-preview]")?.textContent).toBe("Mi frase corregida para la compra.");
    await click("Cambiar plantilla");
    await click("Harvard");
    // Reload while still in the template selector, before continuing.
    await act(async () => root.unmount());
    await mount();
    expect(host.querySelector("[data-preview]")?.getAttribute("data-preview")).toBe("harvard");
    expect(host.querySelector("[data-preview]")?.textContent).toBe("Mi frase corregida para la compra.");
    await click("Mercado Pago");
    const calls = fetchMock.mock.calls;
    expect(calls.some(([url]) => url.includes("generate-cv"))).toBe(false);
    const checkout = calls.find(([url]) => url === "/api/create-payment");
    expect(checkout).toBeTruthy();
    const body = JSON.parse((checkout as unknown as [string, RequestInit])[1].body as string);
    expect(body.cvData.sobreMi).toBe("Mi frase corregida para la compra.");
    expect(body.template).toBe("harvard");
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.pendingCvId).toBe("550e8400-e29b-41d4-a716-446655440000");
  });

  it("un invitado sin sesión edita en inglés y envía su versión a PayPal", async () => {
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, language: "en", generatedCv: { ...previewDraft.generatedCv, language: "en" } }));
    await mount({ currentUser: null, initialLanguage: "en" });
    await click("Edit before paying");
    await changeSummary("My revised profile.", "Professional summary");
    await click("Save changes");
    await click("International payment in USD");
    const dialog = document.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    await act(async () => { dialog!.querySelector<HTMLButtonElement>('button[type="submit"]')!.click(); });
    await settle();
    const checkout = fetchMock.mock.calls.find(([url]) => url === "/api/create-paypal-order");
    expect(checkout).toBeTruthy();
    const body = JSON.parse(checkout![1]!.body as string);
    expect(body.cvData.sobreMi).toBe("My revised profile.");
    expect(body.language).toBe("en");
    expect(fetchMock.mock.calls.some(([url]) => url.includes("generate-cv"))).toBe(false);
  });

  it("conserva la referencia anterior al editar y navegar para que el servidor compare las versiones", async () => {
    const pendingCvId = "550e8400-e29b-41d4-a716-446655440000";
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, pendingCvId }));
    await mount();
    await click("Editar antes de pagar");
    await changeSummary("Una nueva versión después del intento anterior.");
    await click("Guardar cambios");
    await click("Cambiar plantilla");
    await click("Harvard");
    await act(async () => root.unmount());
    await mount();
    expect(host.textContent).toContain("Los enlaces anteriores siguen asociados");
    await click("Mercado Pago");
    const checkout = fetchMock.mock.calls.find(([url]) => url === "/api/create-payment");
    const body = JSON.parse(checkout![1]!.body as string);
    expect(body.cvId).toBe(pendingCvId);
    expect(body.cvData.sobreMi).toBe("Una nueva versión después del intento anterior.");
    expect(body.template).toBe("harvard");
  });

  it("un guardado inválido conserva la versión revisada anterior", async () => {
    await mount();
    await click("Editar antes de pagar");
    await changeSummary("");
    await click("Guardar cambios");
    expect(host.querySelector('[role="alert"]')).toBeTruthy();
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.generatedCv?.sobreMi).toBe(previewDraft.generatedCv.sobreMi);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("cancelar conserva el CV original y su borrador", async () => {
    await mount();
    await click("Editar antes de pagar");
    await changeSummary("Este cambio se descarta.");
    await click("Cancelar");
    expect(host.querySelector("[data-preview]")?.textContent).toBe(previewDraft.generatedCv.sobreMi);
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))?.generatedCv?.sobreMi).toBe(previewDraft.generatedCv.sobreMi);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
