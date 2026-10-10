import { beforeEach, describe, expect, it, vi } from "vitest";
import { confirmMercadoPagoPayment } from "@/lib/mercado-pago-confirmation";
const mocks = vi.hoisted(() => ({ complete: vi.fn(), access: vi.fn(), event: vi.fn(), single: vi.fn() }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { from: () => { const q = { select: () => q, eq: () => q, maybeSingle: mocks.single }; return q; } } }));
vi.mock("@/lib/payment-checkout-session", () => ({ completeCvPayment: mocks.complete }));
vi.mock("@/lib/purchase-access", () => ({ ensurePurchaseAccessForCv: mocks.access }));
vi.mock("@/lib/payment-analytics", () => ({ getPaymentAnalyticsContext: async () => ({}) }));
vi.mock("@/lib/analytics-events-server", () => ({ recordAnalyticsEventServer: mocks.event }));
let payment: Record<string, unknown>; let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.stubEnv("MERCADOPAGO_ACCESS_TOKEN", "test-token");
  payment = { id: 123, status: "approved", external_reference: "cv_original", transaction_amount: 1999, currency_id: "ARS",
    metadata: { attempt_id: "attempt", cv_id: "original", profile_id: "owner", payment_provider: "mercado_pago" } };
  mocks.single.mockResolvedValue({ data: { id: "attempt", cv_id: "original", profile_id: "owner", provider: "mercado_pago", provider_checkout_id: "preference" } });
  mocks.complete.mockResolvedValue({ payment_inserted: true }); mocks.access.mockResolvedValue({ ok: true });
  fetchMock = vi.fn(async (_url: string, options?: RequestInit) => new Response(JSON.stringify(options?.method === "PUT" ? {} : payment)));
  vi.stubGlobal("fetch", fetchMock);
});
describe("Mercado Pago reconciliation", () => {
  it("confirma el CV original y cierra su preferencia, también ante duplicados", async () => {
    mocks.complete.mockResolvedValueOnce({ payment_inserted: true }).mockResolvedValue({ payment_inserted: false });
    expect(await confirmMercadoPagoPayment("123", "original")).toMatchObject({ state: "paid", cvId: "original" });
    await confirmMercadoPagoPayment("123", "original");
    expect(mocks.event).toHaveBeenCalledTimes(1);
    expect(mocks.complete).toHaveBeenCalledWith(expect.objectContaining({ attemptId: "attempt", cvId: "original", amount: 1999 }));
    expect(fetchMock.mock.calls.filter(([, options]) => options?.method === "PUT")).toHaveLength(2);
  });
  it.each(["amount", "currency", "provider", "cv", "owner"])("rechaza %s incorrecto", async (mode) => {
    if (mode === "amount") payment.transaction_amount = 1;
    if (mode === "currency") payment.currency_id = "USD";
    const metadata = payment.metadata as Record<string, string>;
    if (mode === "provider") metadata.payment_provider = "paypal";
    if (mode === "cv") metadata.cv_id = "revised";
    if (mode === "owner") metadata.profile_id = "other";
    await expect(confirmMercadoPagoPayment("123", "original")).rejects.toThrow(); expect(mocks.complete).not.toHaveBeenCalled();
  });
  it("un pago pendiente no entrega el CV ni cierra el enlace", async () => {
    payment.status = "in_process";
    expect((await confirmMercadoPagoPayment("123")).state).toBe("pending");
    expect(mocks.complete).not.toHaveBeenCalled(); expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
