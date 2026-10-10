import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/payment-status/route";
import { POST as confirmAccess } from "@/app/api/purchase-access/confirm/route";
import { GET as finishAccess } from "@/app/acceso-cv/finalizar/route";
import { previewCv } from "./fixtures/preview-cv";
const mocks = vi.hoisted(() => ({ user: null as null | { id: string; is_anonymous: boolean }, cv: vi.fn(), refreshed: vi.fn(), inspect: vi.fn(), prepare: vi.fn(), claim: vi.fn(), from: vi.fn() }));
vi.mock("@/utils/supabase/server", () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: mocks.user } }) }, from: mocks.from }) }));
vi.mock("@/lib/payment-recovery", () => ({ getRelatedCheckouts: async () => [{ cv_id: "550e8400-e29b-41d4-a716-446655440000", status: "pending", provider: "paypal" }], inspectCheckout: mocks.inspect }));
vi.mock("@/lib/purchase-access", () => ({ ensurePurchaseAccessForCv: async () => ({ ok: true, sent: true }), preparePurchaseClaimVerification: mocks.prepare, claimGuestPurchase: mocks.claim }));
const id = "550e8400-e29b-41d4-a716-446655440000";
beforeEach(() => {
  mocks.user = { id: "owner", is_anonymous: true };
  mocks.from.mockImplementation(() => { const q = { select: () => q, eq: () => q, maybeSingle: mocks.cv, single: mocks.refreshed }; return q; });
  mocks.cv.mockResolvedValue({ data: { id, status: "pending", cv_data: previewCv, template: "elegance" } });
  mocks.refreshed.mockResolvedValue({ data: { id, status: "paid", cv_data: previewCv, template: "elegance" } });
  mocks.inspect.mockResolvedValue("unpaid");
});
describe("authenticated payment status and existing email access", () => {
  it("no expone CV ni estado privado sin sesión aunque el retorno diga approved", async () => {
    mocks.user = null;
    const response = await GET(new Request(`https://site/api/payment-status?cv_id=${id}&status=approved`));
    expect(response.status).toBe(401); expect(mocks.from).not.toHaveBeenCalled();
  });
  it("la cancelación del retorno no prevalece sobre el proveedor confirmado", async () => {
    mocks.inspect.mockResolvedValue("paid");
    const response = await GET(new Request(`https://site/api/payment-status?cv_id=${id}&status=cancelled`));
    expect(await response.json()).toMatchObject({ cv: { status: "paid", template: "elegance" }, paymentState: "paid", accessSent: true, canRetry: false });
  });
  it("un error del proveedor deja estado desconocido, sin habilitar reintento", async () => {
    mocks.inspect.mockRejectedValue(new Error("unavailable"));
    expect(await (await GET(new Request(`https://site/api/payment-status?cv_id=${id}`))).json()).toMatchObject({ paymentState: "unknown", canRetry: false });
  });
  it("el enlace de email inicia la verificación sin la sesión temporal original", async () => {
    mocks.user = null;
    mocks.prepare.mockResolvedValue({ claim: { id }, tokenHash: "test-token", tokenType: "magiclink" });
    const form = new FormData(); form.set("claim", id);
    const response = await confirmAccess(new Request("https://site/api/purchase-access/confirm", { method: "POST", body: form }));
    const target = new URL(response.headers.get("location")!);
    expect(target.pathname).toBe("/auth/confirm"); expect(target.searchParams.get("next")).toBe(`/acceso-cv/finalizar?claim=${id}`);
    expect(mocks.claim).not.toHaveBeenCalled();
  });
  it("solo reclama el CV después de autenticar la cuenta permanente", async () => {
    mocks.user = null;
    await finishAccess(new Request(`https://site/acceso-cv/finalizar?claim=${id}`)); expect(mocks.claim).not.toHaveBeenCalled();
    mocks.user = { id: "permanent", is_anonymous: false }; mocks.claim.mockResolvedValue({ cvId: id });
    const response = await finishAccess(new Request(`https://site/acceso-cv/finalizar?claim=${id}`));
    expect(response.headers.get("location")).toContain(`/perfil?cv_id=${id}&purchase_claimed=1`);
  });
});
