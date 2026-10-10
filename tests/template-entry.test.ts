import React, { act, createElement as h, lazy, Suspense } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CVForm from "@/components/pdf/CVForm";
import { CommercialOffer } from "@/components/CommercialOffer";
import TemplateSelector from "@/components/TemplateSelector";
import { CREATE_DRAFT_KEY, parseStoredCreateDraft } from "@/lib/create-flow-state";
import { previewDraft } from "./fixtures/preview-cv";
import { CV_TEMPLATE_IDS } from "@/lib/cv-templates";
import { createSkillsToolTransfer, SKILLS_TOOL_TRANSFER_KEY } from "@/lib/skills-tool";

vi.mock("next/dynamic", () => ({ default: (load: Parameters<typeof lazy>[0]) => {
  const Component = lazy(async () => { const result = await load(); return typeof result === "function" ? { default: result } : result; });
  return (props: Record<string, unknown>) => h(Suspense, { fallback: null }, h(Component, props));
} }));
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
vi.mock("@/lib/analytics-events", () => ({ recordAnalyticsEvent: vi.fn(), recordGaFunnelEvent: vi.fn() }));
vi.mock("@/components/CVFormStep", () => ({ default: (props: Record<string, unknown>) => h("output", { "data-form": props.template }, JSON.stringify(props.draftData)) }));
vi.mock("@/components/CVPreviewStep", () => ({ default: (props: Record<string, unknown>) => h("output", { "data-preview": props.template }, JSON.stringify(props)) }));
vi.mock("next/image", () => ({ default: () => null }));

let host: HTMLDivElement;
let root: Root;
async function settle() { await act(async () => { await vi.dynamicImportSettled(); }); }
async function mount(props: Partial<React.ComponentProps<typeof CVForm>> = {}) {
  await act(async () => { root.render(h(CVForm, { currentUser: null, guestCheckoutEnabled: true, initialCountryCode: "AR", ...props })); });
  await settle();
}
async function click(text: string) {
  const button = [...host.querySelectorAll("button")].find(el => el.textContent === text);
  expect(button).toBeTruthy();
  await act(async () => { button!.click(); });
  await settle();
}
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  sessionStorage.clear();
  document.cookie = "vitaespark-market=; Max-Age=0; Path=/";
  document.cookie = "vitaespark-country=; Max-Age=0; Path=/";
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });

describe("entrada explícita por plantilla", () => {
  it.each(CV_TEMPLATE_IDS)("abre %s directamente sin borrador", async template => {
    await mount({ initialTemplate: template });
    expect(host.querySelector("[data-form]")?.getAttribute("data-form")).toBe(template);
    expect(host.textContent).toContain("PDF final por $1.999 ARS");
  });
  it.each([null, "desconocida", "<script>", "Harvard"])("recupera el selector normal con %s", async template => {
    await mount({ initialTemplate: template });
    expect(host.querySelector("[data-form]")).toBeNull();
    expect(host.textContent).toContain("Una estructura clara");
  });
  it("conserva puesto e intención de primer empleo con una plantilla explícita", async () => {
    await mount({ initialTemplate: "harvard", initialRole: "Cajero/a", initialIntent: "first-job" });
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))).toMatchObject({ template: "harvard", intent: "first-job", flowStep: "form", data: { puesto: "Cajero/a", experienceMode: "with-experience" } });
  });
  it("abrir un enlace y salir no escribe ni pierde el borrador; continuar conserva todo", async () => {
    const draft = { ...previewDraft, intent: "first-job", data: { ...previewDraft.data, experienceMode: "no-experience" }, pendingCvId: "550e8400-e29b-41d4-a716-446655440000", purchaseKey: "550e8400-e29b-41d4-a716-446655440001" };
    const raw = JSON.stringify(draft); sessionStorage.setItem(CREATE_DRAFT_KEY, raw);
    await mount({ initialTemplate: "harvard", initialRole: "Otro puesto", initialIntent: "general" });
    expect(host.querySelector("[data-preview]")).toBeNull();
    window.dispatchEvent(new Event("beforeunload"));
    expect(sessionStorage.getItem(CREATE_DRAFT_KEY)).toBe(raw);
    await click("Continuar borrador");
    const props = JSON.parse(host.querySelector("[data-preview]")!.textContent!);
    expect(props).toMatchObject({ template: draft.template, pendingCvId: draft.pendingCvId, purchaseKey: draft.purchaseKey, cvData: draft.generatedCv });
    expect(parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY))).toMatchObject(draft);
  });
  it("reinicia solo por elección explícita y conserva el contexto de entrada", async () => {
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, generatedCv: undefined }));
    await mount({ initialTemplate: "harvard", initialRole: "Cajero/a", initialIntent: "first-job" });
    expect(host.textContent).toContain("Tenés un borrador guardado");
    await click("Empezar de nuevo");
    expect(host.querySelector("[data-form]")?.getAttribute("data-form")).toBe("harvard");
    const saved = parseStoredCreateDraft(sessionStorage.getItem(CREATE_DRAFT_KEY));
    expect(saved).toMatchObject({ template: "harvard", intent: "first-job", data: { nombre: "", puesto: "Cajero/a", experienceMode: "with-experience" } });
    expect(saved?.generatedCv).toBeUndefined();
  });
  it("continuar no mezcla una transferencia pendiente ni dispara regeneración", async () => {
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, action: "generate" }));
    sessionStorage.setItem(SKILLS_TOOL_TRANSFER_KEY, JSON.stringify(createSkillsToolTransfer({ role: "Otro puesto", skills: ["Otra habilidad"] })));
    await mount({ initialTemplate: "harvard", currentUser: { id: "registered", email: null, isAnonymous: false }, initialResumeAction: "generate" });
    await click("Continuar borrador");
    expect(host.querySelector("[data-form]")).toBeNull();
    const props = JSON.parse(host.querySelector("[data-preview]")!.textContent!);
    expect(props.cvData).toEqual(previewDraft.generatedCv);
    expect(sessionStorage.getItem(SKILLS_TOOL_TRANSFER_KEY)).toBeNull();
  });
  it.each(["pendingCvId", "purchaseKey"])("impide reiniciar cuando existe %s", async field => {
    const raw = JSON.stringify({ ...previewDraft, [field]: "550e8400-e29b-41d4-a716-446655440000" });
    sessionStorage.setItem(CREATE_DRAFT_KEY, raw);
    await mount({ initialTemplate: "harvard" });
    const restart = [...host.querySelectorAll("button")].find(el => el.textContent === "Empezar de nuevo")!;
    expect(restart.disabled).toBe(true);
    await click("Empezar de nuevo");
    expect(sessionStorage.getItem(CREATE_DRAFT_KEY)).toBe(raw);
  });
  it("restaura un formulario antiguo al continuar sin inferir ausencia de experiencia", async () => {
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, generatedCv: undefined, data: { ...previewDraft.data, experienceMode: undefined } }));
    await mount({ initialTemplate: "harvard" }); await click("Continuar borrador");
    const form = host.querySelector("[data-form]")!;
    expect(form.getAttribute("data-form")).toBe(previewDraft.template);
    expect(JSON.parse(form.textContent!)).toMatchObject({ ...previewDraft.data, experienceMode: "with-experience" });
  });
});

describe("oferta común", () => {
  it("respeta la región elegida incluso con país detectado argentino", async () => {
    document.cookie = "vitaespark-market=international; Path=/";
    await act(async () => root.render(h(CommercialOffer, { initialCountryCode: "AR", language: "en" })));
    expect(host.textContent).toBe("Creation and preview at no cost. Final PDF for US$2.99. One-time payment, no subscription.");
  });
  it.each([true, false])("describe correctamente la generación invitada y checkout=%s", async enabled => {
    await act(async () => root.render(h(TemplateSelector, { selectedTemplate: "harvard", language: "en", guestCheckoutEnabled: enabled, onSelectTemplate: vi.fn(), onContinue: vi.fn() })));
    expect(host.textContent).toContain("You can create and preview without signing in.");
    expect(host.textContent).toContain(enabled ? "To pay as a guest" : "Sign in to pay");
  });
});
