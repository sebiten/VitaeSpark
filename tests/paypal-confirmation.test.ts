import { beforeEach, describe, expect, it, vi } from "vitest";
import { confirmPayPalOrder, validatePayPalOrder } from "@/lib/paypal-confirmation";
import { POST } from "@/app/api/paypal-webhook/route";
import type { PayPalOrder } from "@/lib/paypal";

const mocks = vi.hoisted(() => ({ get: vi.fn(), capture: vi.fn(), complete: vi.fn(), access: vi.fn(), event: vi.fn(), verify: vi.fn(), single: vi.fn() }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { from: () => {
  const q = { select: () => q, eq: () => q, maybeSingle: mocks.single }; return q;
} } }));
vi.mock("@/lib/paypal", () => ({ getPayPalOrder: mocks.get, capturePayPalOrder: mocks.capture, verifyPayPalWebhookSignature: mocks.verify }));
vi.mock("@/lib/payment-checkout-session", () => ({ completeCvPayment: mocks.complete }));
vi.mock("@/lib/purchase-access", () => ({ ensurePurchaseAccessForCv: mocks.access }));
vi.mock("@/lib/payment-analytics", () => ({ getPaymentAnalyticsContext: async () => ({}) }));
vi.mock("@/lib/analytics-events-server", () => ({ recordAnalyticsEventServer: mocks.event }));
const order = (status = "APPROVED"): PayPalOrder => ({ id: "order-1", intent: "CAPTURE", status,
  purchase_units: [{ reference_id: "cv_old-cv", custom_id: "old-cv", amount: { value: "2.99", currency_code: "USD" },
    ...(status === "COMPLETED" ? { payments: { captures: [{ id: "capture-1", status: "COMPLETED", amount: { value: "2.99", currency_code: "USD" } }] } } : {}) }] });
beforeEach(() => {
  mocks.get.mockReset(); mocks.capture.mockReset(); mocks.complete.mockReset();
  mocks.single.mockResolvedValue({ data: { id: "attempt", cv_id: "old-cv", profile_id: "owner", provider: "paypal" }, error: null });
  mocks.get.mockResolvedValue(order("COMPLETED"));
  mocks.complete.mockResolvedValue({ payment_inserted: true, cv_status: "paid" });
  mocks.verify.mockResolvedValue(true); mocks.access.mockResolvedValue({ ok: true });
});
describe("PayPal confirmation", () => {
  it("captura una aprobación sin retorno, ligada a la versión original", async () => {
    mocks.get.mockResolvedValueOnce(order()).mockResolvedValueOnce(order("COMPLETED"));
    const response = await POST(new Request("https://site/api/paypal-webhook", { method: "POST", body: JSON.stringify({ event_type: "CHECKOUT.ORDER.APPROVED", resource: { id: "order-1" } }) }));
    expect(response.status).toBe(200);
    expect(mocks.capture).toHaveBeenCalledWith("order-1");
    expect(mocks.complete).toHaveBeenCalledWith(expect.objectContaining({ cvId: "old-cv", attemptId: "attempt", paymentId: "capture-1" }));
  });
  it("resuelve captura sin custom_id y notificaciones duplicadas por orden registrada", async () => {
    mocks.complete.mockResolvedValueOnce({ payment_inserted: true }).mockResolvedValue({ payment_inserted: false });
    const payload = { event_type: "PAYMENT.CAPTURE.COMPLETED", resource: { id: "capture-1", supplementary_data: { related_ids: { order_id: "order-1" } } } };
    for (let i = 0; i < 2; i++) expect((await POST(new Request("https://site/webhook", { method: "POST", body: JSON.stringify(payload) }))).status).toBe(200);
    expect(mocks.capture).not.toHaveBeenCalled();
    expect(mocks.event).toHaveBeenCalledTimes(1);
    expect(mocks.access).toHaveBeenCalledTimes(2);
  });
  it("resuelve respuesta de captura perdida consultando el proveedor", async () => {
    mocks.get.mockResolvedValueOnce(order()).mockResolvedValueOnce(order("COMPLETED")); mocks.capture.mockRejectedValue(new Error("timeout"));
    expect((await confirmPayPalOrder("order-1", { capture: true })).state).toBe("paid");
  });
  it.each(["missing", "provider", "cv"])("rechaza %s antes de capturar", async (mode) => {
    if (mode !== "cv") mocks.single.mockResolvedValue({ data: mode === "missing" ? null : { provider: "mercado_pago", cv_id: "old-cv" }, error: null });
    await expect(confirmPayPalOrder("order-1", { cvId: mode === "cv" ? "new-cv" : undefined, capture: true })).rejects.toThrow();
    expect(mocks.capture).not.toHaveBeenCalled(); expect(mocks.complete).not.toHaveBeenCalled();
  });
  it.each(["amount", "currency", "association", "order", "intent"])("rechaza %s incorrecto antes de capturar", async (mode) => {
    const value = order(); const unit = value.purchase_units![0];
    if (mode === "amount") unit.amount!.value = "0.01";
    if (mode === "currency") unit.amount!.currency_code = "ARS";
    if (mode === "association") unit.custom_id = "new-cv";
    if (mode === "order") value.id = "other";
    if (mode === "intent") value.intent = "AUTHORIZE";
    mocks.get.mockResolvedValue(value);
    await expect(confirmPayPalOrder("order-1", { capture: true })).rejects.toThrow();
    expect(mocks.capture).not.toHaveBeenCalled();
  });
  it("no confunde aprobación con pago y reconoce vencimiento", async () => {
    mocks.get.mockResolvedValue(order()); expect((await confirmPayPalOrder("order-1")).state).toBe("pending");
    mocks.get.mockResolvedValue(order("VOIDED")); expect((await confirmPayPalOrder("order-1")).state).toBe("expired");
    expect(mocks.complete).not.toHaveBeenCalled();
  });
  it("acepta referencia original sin custom_id, nunca referencias contradictorias", () => {
    const value = order(); delete value.purchase_units![0].custom_id;
    expect(() => validatePayPalOrder(value, "order-1", "old-cv")).not.toThrow();
    value.purchase_units![0].custom_id = "new-cv";
    expect(() => validatePayPalOrder(value, "order-1", "old-cv")).toThrow();
  });
  it("no acepta webhooks sin firma válida", async () => {
    mocks.verify.mockResolvedValue(false);
    expect((await POST(new Request("https://site/webhook", { method: "POST", body: JSON.stringify({ event_type: "CHECKOUT.ORDER.APPROVED", resource: { id: "order-1" } }) }))).status).toBe(401);
    expect(mocks.capture).not.toHaveBeenCalled();
  });
});
