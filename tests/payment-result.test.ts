import React, { act, createElement as h } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PaymentResultClient from "@/app/pago/resultado/payment-result-client";
import { CREATE_DRAFT_KEY } from "@/lib/create-flow-state";
import { previewDraft, previewCv } from "./fixtures/preview-cv";
vi.mock("next/dynamic", () => ({ default: () => () => h("button", null, "PDF") }));
vi.mock("next/link", () => ({ default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => h("a", props) }));
vi.mock("@/lib/analytics-events", () => ({ recordAnalyticsEvent: vi.fn() }));
let root: Root; let host: HTMLDivElement; let fetchMock: ReturnType<typeof vi.fn>;
const response = (state: string, paid = false) => new Response(JSON.stringify({
  cv: { id: "cv", status: paid ? "paid" : "pending", cv_data: previewCv, template: "elegance" },
  paymentState: state, canRetry: ["unpaid", "expired", "failure"].includes(state),
}));
beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true); window.sessionStorage.clear();
  fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.useRealTimers(); vi.unstubAllGlobals(); });
async function mount(status: string | null = null) {
  await act(async () => root.render(h(PaymentResultClient, { cvId: "cv", provider: "paypal", returnStatus: status })));
}
describe("payment result recovery", () => {
  it("cancelación sin pago ofrece volver al CV y conserva edición/plantilla", async () => {
    const draft = JSON.stringify({ ...previewDraft, template: "harvard" });
    sessionStorage.setItem(CREATE_DRAFT_KEY, draft); fetchMock.mockResolvedValue(response("unpaid"));
    await mount("cancelled");
    expect(host.textContent).toContain("Cancelaste el checkout");
    expect(host.textContent).toContain("Reintentá desde tu CV");
    expect(host.querySelector('a[href="/crear"]')).toBeTruthy();
    const back = host.querySelector<HTMLAnchorElement>('a[href="/crear"]')!;
    back.addEventListener("click", (event) => event.preventDefault());
    await act(async () => back.click());
    expect(sessionStorage.getItem(CREATE_DRAFT_KEY)).toBe(draft);
  });
  it("el proveedor confirmado prevalece sobre cancelación; no borra una revisión posterior", async () => {
    const draft = JSON.stringify({ ...previewDraft, generatedCv: { ...previewCv, sobreMi: "Revisión nueva" } });
    sessionStorage.setItem(CREATE_DRAFT_KEY, draft); fetchMock.mockResolvedValue(response("paid", true));
    await mount("cancelled"); expect(host.textContent).toContain("Pago confirmado");
    expect(sessionStorage.getItem(CREATE_DRAFT_KEY)).toBe(draft);
  });
  it("un parámetro approved nunca desbloquea un pago pendiente", async () => {
    fetchMock.mockResolvedValue(response("pending")); await mount("approved");
    expect(host.textContent).toContain("El pago sigue pendiente"); expect(host.textContent).not.toContain("Pago confirmado");
  });
  it("detiene el polling pendiente después de cinco consultas", async () => {
    vi.useFakeTimers(); fetchMock.mockImplementation(async () => response("pending")); await mount();
    for (let i = 0; i < 7; i++) await act(async () => { await vi.advanceTimersByTimeAsync(3000); });
    expect(fetchMock).toHaveBeenCalledTimes(5); expect(host.textContent).toContain("Volver a verificar");
  });
  it("no confunde estado desconocido con cancelación confirmada", async () => {
    fetchMock.mockResolvedValue(response("unknown")); await mount("cancelled");
    expect(host.textContent).toContain("No pudimos verificar"); expect(host.textContent).not.toContain("Cancelaste");
  });
  it("presenta vencimiento y salida de recuperación sin sesión", async () => {
    fetchMock.mockResolvedValueOnce(response("expired")); await mount(); expect(host.textContent).toContain("venció");
    fetchMock.mockResolvedValueOnce(new Response("{}", { status: 401 }));
    await act(async () => host.querySelector("button")!.click());
    expect(host.textContent).toContain("Recuperá el acceso por email"); expect(host.querySelector('a[href="/login"]')).toBeTruthy();
  });
  it("conserva inglés cuando se pierde la sesión", async () => {
    sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ ...previewDraft, language: "en" }));
    fetchMock.mockResolvedValue(new Response("{}", { status: 401 })); await mount();
    expect(host.textContent).toContain("Recover access by email");
  });
});
