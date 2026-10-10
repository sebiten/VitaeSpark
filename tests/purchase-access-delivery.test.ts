import { beforeEach, describe, expect, it, vi } from "vitest";
import { ensurePurchaseAccessForCv } from "@/lib/purchase-access";
const state = vi.hoisted(() => ({ claim: {} as Record<string, unknown>, completedOnly: false }));
vi.mock("@/lib/analytics-events-server", () => ({ recordAnalyticsEventServer: vi.fn() }));
vi.mock("@/lib/guest-checkout-server", () => ({ ensureCheckoutProfile: vi.fn() }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { from: (table: string) => {
  let update: Record<string, unknown> | undefined;
  const filters: Array<[string, unknown]> = [];
  const run = () => {
    if (table === "payment_checkout_sessions") {
      state.completedOnly = filters.some(([key, value]) => key === "status" && value === "completed");
      return { data: { profile_id: "owner", contact_email: "test@example.com", is_guest: true }, error: null };
    }
    if (table === "cvs") return { data: { id: "cv", profile_id: "owner", status: "paid", template: "elegance", cv_data: { language: "es" } }, error: null };
    if (update && !filters.every(([key, value]) => state.claim[key] === value)) return { data: null, error: null };
    if (update) Object.assign(state.claim, update);
    return { data: structuredClone(state.claim), error: null };
  };
  const q = { select: () => q, order: () => q, limit: () => q,
    eq: (key: string, value: unknown) => { filters.push([key, value]); return q; },
    is: (key: string, value: unknown) => { filters.push([key, value]); return q; },
    update: (values: Record<string, unknown>) => { update = values; return q; },
    maybeSingle: async () => run(), then: (resolve: (value: unknown) => unknown) => Promise.resolve(run()).then(resolve) };
  return q;
} } }));
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key"); vi.stubEnv("EMAIL_FROM", "test@example.com");
  state.claim = { id: "claim", cv_id: "cv", status: "pending", access_sent_at: null,
    last_error: "__sending__", updated_at: "2020-01-01T00:00:00Z" };
});
describe("idempotent purchase delivery", () => {
  it("dos reintentos concurrentes de entrega vencida envían un solo email", async () => {
    const send = vi.fn(async () => new Response("{}")); vi.stubGlobal("fetch", send);
    await Promise.all([ensurePurchaseAccessForCv("cv"), ensurePurchaseAccessForCv("cv")]);
    await ensurePurchaseAccessForCv("cv");
    expect(send).toHaveBeenCalledTimes(1);
    expect(state.completedOnly).toBe(true);
    const options = (send.mock.calls as unknown as [string, RequestInit][])[0][1];
    expect(options.headers).toMatchObject({ "Idempotency-Key": "purchase-access/claim" });
    expect(state.claim.access_sent_at).toBeTruthy();
  });
});
