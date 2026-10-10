import { beforeEach, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { previewCv, previewDraft } from "./fixtures/preview-cv";

const { complete } = vi.hoisted(() => ({ complete: vi.fn() }));
vi.mock("openai", () => ({ default: class { chat = { completions: { create: complete } }; } }));
vi.mock("@/utils/supabase/server", () => ({ createClient: async () => ({ auth: { getUser: async () => ({ data: { user: null } }) } }) }));
vi.mock("@arcjet/next", () => ({ shield: vi.fn(), fixedWindow: vi.fn() }));
vi.mock("@/lib/arcjet", () => { const limiter = { withRule: () => limiter, protect: async () => ({ isDenied: () => false }) }; return { aj: limiter, authenticatedGenerationAj: limiter }; });
vi.mock("@/lib/analytics-events-server", () => ({ recordAnalyticsEventServer: vi.fn() }));
vi.mock("@/lib/ai-generation-usage", () => ({ recordAiGenerationUsage: vi.fn() }));
import { POST } from "@/app/api/generate-cv/route";
beforeEach(() => complete.mockResolvedValue({ choices: [{ message: { content: JSON.stringify(previewCv) } }] }));
const request = (body: unknown) => new NextRequest("https://example.com/api/generate-cv", { method: "POST", body: JSON.stringify(body) });
it.each(["es", "en"])("impone experiencia vacía sobre una salida válida del modelo (%s)", async (language) => {
  const response = await POST(request({ ...previewDraft.data, language, experienceMode: "no-experience", experiencia: "Texto oculto" }));
  expect(response.status).toBe(200);
  expect((await response.json()).cv.experiencia).toEqual([]);
  const sent = JSON.parse(complete.mock.calls[0][0].messages[1].content);
  expect(sent).toMatchObject({ experiencia: "", experienceMode: "no-experience" });
  expect(response.headers.get("set-cookie")).toContain("vitaespark_guest_cv_generated=1");
});
it("rechaza datos obligatorios antes de llamar al modelo", async () => {
  const response = await POST(request({ ...previewDraft.data, experienceMode: "no-experience", habilidades: "" }));
  expect(response.status).toBe(400);
  expect(complete).not.toHaveBeenCalled();
});
it("rechaza una respuesta sin antecedentes cuando sí se aportaron, sin fabricar un cargo", async () => {
  complete.mockResolvedValue({ choices: [{ message: { content: JSON.stringify({ ...previewCv, experiencia: null }) } }] });
  const response = await POST(request({ ...previewDraft.data, experiencia: "Atendí consultas reales en un comercio familiar." }));
  expect(response.status).toBe(500);
});
