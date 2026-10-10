import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOrCreatePendingPaymentCv } from "@/lib/payment-cv";
import { previewCv } from "./fixtures/preview-cv";

const oldId = "550e8400-e29b-41d4-a716-446655440000";
const newId = "550e8400-e29b-41d4-a716-446655440001";
const { rpc } = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { rpc } }));
beforeEach(() => rpc.mockResolvedValue({ data: { ok: true, cv: { id: newId, template: "harvard" } }, error: null }));
function database(status = "pending", missing = false) {
  const row = { id: oldId, template: "elegance", cv_data: structuredClone(previewCv), status };
  const query = {
    select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), insert: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValueOnce({ data: missing ? null : row, error: null }).mockResolvedValue({ data: { id: newId, template: "harvard" }, error: null }),
  };
  return { row, query, supabase: { from: vi.fn(() => query) } as unknown as Parameters<typeof getOrCreatePendingPaymentCv>[0]["supabase"] };
}
const input = { cvId: oldId, profileId: "owner", cvData: previewCv, template: "elegance", language: "es" as const };

describe("checkout snapshot", () => {
  it("reutiliza únicamente el mismo contenido y plantilla y mantiene propiedad", async () => {
    const db = database();
    expect(await getOrCreatePendingPaymentCv({ ...input, supabase: db.supabase })).toEqual({ ok: true, cv: { id: oldId, template: "elegance" } });
    expect(db.query.eq).toHaveBeenCalledWith("profile_id", "owner");
    expect(db.query.insert).not.toHaveBeenCalled();
  });
  it.each(["content", "template", "language", "photo"])("crea una versión inmutable nueva al cambiar %s", async (change) => {
    const db = database();
    const cvData = { ...previewCv, ...(change === "content" ? { sobreMi: "Texto revisado." } : {}), ...(change === "photo" ? { foto_url: "https://example.com/new.jpg" } : {}) };
    const language = change === "language" ? "en" as const : "es" as const;
    const template = change === "template" ? "harvard" : "elegance";
    const result = await getOrCreatePendingPaymentCv({ ...input, cvData, template, language, supabase: db.supabase });
    expect(result.ok && result.cv.id).toBe(newId);
    expect(rpc).toHaveBeenCalledExactlyOnceWith("prepare_payment_cv", { p_profile_id: "owner", p_previous_id: oldId, p_data: { ...cvData, language }, p_template: template, p_purchase_key: null });
    expect(db.query.insert).not.toHaveBeenCalled();
    expect(db.row.cv_data).toEqual(previewCv);
  });
  it("mantiene recuperación histórica por ID sin contenido", async () => {
    const db = database();
    const result = await getOrCreatePendingPaymentCv({ ...input, cvData: undefined, template: undefined, supabase: db.supabase });
    expect(result.ok && result.cv.id).toBe(oldId);
    expect(db.query.insert).not.toHaveBeenCalled();
  });
  it.each(["paid", "cancelled"])("no crea otra compra para un ID con estado %s", async (status) => {
    const db = database(status);
    expect((await getOrCreatePendingPaymentCv({ ...input, template: "harvard", supabase: db.supabase })).ok).toBe(false);
    expect(db.query.insert).not.toHaveBeenCalled();
  });
  it("no reemplaza un ID ajeno o inexistente", async () => {
    const db = database("pending", true);
    expect(await getOrCreatePendingPaymentCv({ ...input, supabase: db.supabase })).toMatchObject({ ok: false, status: 404 });
    expect(db.query.insert).not.toHaveBeenCalled();
  });
});
