import { beforeEach, describe, expect, it, vi } from "vitest";
import { inspectCheckout, reconcileBeforeCheckout, CheckoutConflict } from "@/lib/payment-recovery";
import { claimCheckoutDispatch, getOrCreateCheckoutSession } from "@/lib/payment-checkout-session";
import type { PaymentCheckoutSession } from "@/lib/payment-checkout-session";
const mocks = vi.hoisted(() => ({ paypal: vi.fn(), mp: vi.fn(), mpGet: vi.fn(), sessions: [] as unknown[], update: vi.fn(), rpc: vi.fn(), claim: true }));
vi.mock("@/lib/paypal-confirmation", () => ({ confirmPayPalOrder: mocks.paypal }));
vi.mock("@/lib/mercado-pago-confirmation", () => ({ confirmMercadoPagoPayment: mocks.mp, mercadoPagoGet: mocks.mpGet }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { rpc: mocks.rpc, from: (table: string) => {
  const q = { select: () => q, eq: () => q, in: () => q, is: () => q,
    update: (data: unknown) => { mocks.update(data); return q; },
    order: async () => ({ data: mocks.sessions, error: null }),
    maybeSingle: async () => ({ data: table === "payment_cv_versions" ? null : mocks.claim ? { id: "attempt" } : null, error: null }),
    then: (resolve: (value: unknown) => void) => resolve({ data: [], error: null }) };
  return q;
} } }));
const session: PaymentCheckoutSession = { id: "attempt", cv_id: "cv", profile_id: "owner", provider: "paypal",
  provider_checkout_id: "order", checkout_url: "https://provider/order", idempotency_key: "key", status: "pending",
  attribution: {}, contact_email: null, is_guest: true, created_at: new Date().toISOString(), dispatch_started_at: null };
beforeEach(() => { mocks.sessions = [session]; mocks.claim = true; mocks.paypal.mockResolvedValue({ state: "unpaid" }); mocks.rpc.mockResolvedValue({ data: session, error: null }); mocks.mpGet.mockReset(); });
describe("checkout recovery", () => {
  it("consulta al proveedor antes de reutilizar un enlace de la misma versión", async () => {
    expect((await getOrCreateCheckoutSession({ cvId: "cv", profileId: "owner", provider: "paypal" })).id).toBe("attempt");
    expect(mocks.paypal).toHaveBeenCalledWith("order", expect.objectContaining({ cvId: "cv", capture: true }));
  });
  it.each(["paid", "pending", "unknown"])("no emite otra orden cuando encuentra %s", async (state) => {
    mocks.paypal.mockResolvedValue({ state });
    await expect(getOrCreateCheckoutSession({ cvId: "cv", profileId: "owner", provider: "paypal" })).rejects.toBeInstanceOf(CheckoutConflict);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("bloquea una revisión nueva o cambio de proveedor mientras el enlace anterior está vivo", async () => {
    await expect(reconcileBeforeCheckout("revised", "owner", "paypal")).rejects.toMatchObject({ cvId: "cv", state: "unpaid" });
    await expect(reconcileBeforeCheckout("cv", "owner", "mercado_pago")).rejects.toBeInstanceOf(CheckoutConflict);
  });
  it("cierra un vencimiento verificado antes de reservar otro intento", async () => {
    mocks.paypal.mockResolvedValue({ state: "expired" });
    await getOrCreateCheckoutSession({ cvId: "cv", profileId: "owner", provider: "paypal" });
    expect(mocks.update).toHaveBeenCalledWith({ status: "expired" }); expect(mocks.rpc).toHaveBeenCalledOnce();
  });
  it("un error externo no habilita una compra nueva", async () => {
    mocks.paypal.mockRejectedValue(new Error("unavailable"));
    await expect(getOrCreateCheckoutSession({ cvId: "cv", profileId: "owner", provider: "paypal" })).rejects.toThrow();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("el despacho usa CAS y no repite un POST ambiguo de Mercado Pago", async () => {
    mocks.claim = false;
    expect(await claimCheckoutDispatch({ ...session, provider_checkout_id: null })).toBe(false);
    mocks.claim = true;
    const sent = { ...session, provider_checkout_id: null, dispatch_started_at: new Date(Date.now() - 60000).toISOString() };
    expect(await claimCheckoutDispatch(sent)).toBe(true);
    expect(await claimCheckoutDispatch({ ...sent, provider: "mercado_pago" })).toBe(false);
    expect(await claimCheckoutDispatch({ ...sent, created_at: new Date(Date.now() - 7 * 3600000).toISOString() })).toBe(false);
  });
  it("una preferencia vencida con pago pendiente no permite otro cobro", async () => {
    mocks.mpGet.mockResolvedValueOnce({ external_reference: "cv_cv", expires: true, expiration_date_to: "2020-01-01" })
      .mockResolvedValueOnce({ results: [{ id: "payment" }], paging: { total: 1 } });
    mocks.mp.mockResolvedValue({ state: "pending" });
    expect(await inspectCheckout({ ...session, provider: "mercado_pago" })).toBe("pending");
  });
});
