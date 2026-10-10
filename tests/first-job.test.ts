import { describe, expect, it } from "vitest";
import { GenerateCVInputSchema, CVSchema, CreatePaymentSchema } from "@/lib/schemas/cv";
import { parseStoredCreateDraft } from "@/lib/create-flow-state";
import { getJobCreateHref } from "@/lib/job-landing";
import { getBlogCtaContent, getBlogCreateHref } from "@/lib/blog-intent";
import { normalizeCvGenerationOutput } from "@/lib/cv-generation-output";
import { getCvFormContext } from "@/lib/cv-form-context";
import { calculateCvScore } from "@/lib/cv-score";
import { previewCv, previewDraft } from "./fixtures/preview-cv";

const input = { ...previewDraft.data, experienceMode: "no-experience" as const, experiencia: "", formacion: "" };
describe("primer empleo", () => {
  it.each(["/cv-para-cajero-sin-experiencia", "/cv-atencion-al-cliente-sin-experiencia", "/cv-para-primer-empleo", "/cv-para-estudiantes"])("conserva puesto e intención desde %s", (path) => {
    const params = new URL(getJobCreateHref(path), "https://example.com").searchParams;
    expect(params.get("intent")).toBe("first-job");
    expect(params.get("role")).toBeTruthy();
    expect(getBlogCtaContent(path).intent).toBe("first-job");
    expect(new URL(getBlogCreateHref(path), "https://example.com").searchParams.get("role")).toBe(params.get("role"));
  });
  it("acepta experiencia vacía y formación omitida solo por elección explícita", () => {
    expect(GenerateCVInputSchema.parse({ ...input, formacion: undefined }).formacion).toBe("");
    expect(GenerateCVInputSchema.safeParse({ ...input, experienceMode: undefined }).success).toBe(false);
    expect(GenerateCVInputSchema.safeParse({ ...input, experienceMode: "with-experience" }).success).toBe(false);
    expect(GenerateCVInputSchema.parse({ ...input, experiencia: "Texto retenido del modo anterior" }).experiencia).toBe("");
  });
  it.each(["nombre", "puesto", "contacto", "habilidades"])("rechaza %s ausente o vacío", (field) => {
    for (const value of [undefined, "", "   "]) {
      expect(GenerateCVInputSchema.safeParse({ ...input, [field]: value }).success).toBe(false);
    }
  });
  it("no fabrica antecedentes ni formación, incluso si el modelo los devuelve", () => {
    for (const output of [null, {}, previewCv]) {
      const cv = normalizeCvGenerationOutput(output, input);
      expect(cv.experiencia).toEqual([]);
      expect(cv.formacion).toEqual([]);
      expect(CVSchema.safeParse(cv).success).toBe(true);
      expect(CreatePaymentSchema.safeParse({ cvData: cv, template: "harvard" }).success).toBe(true);
    }
  });
  it("restaura modo, texto oculto, CV vacío y referencias de compra", () => {
    const references = { pendingCvId: "550e8400-e29b-41d4-a716-446655440000", purchaseKey: "550e8400-e29b-41d4-a716-446655440001" };
    const restored = parseStoredCreateDraft(JSON.stringify({ ...previewDraft, ...references, data: { ...input, experiencia: "Texto que se conserva" }, generatedCv: { ...previewCv, experiencia: [] } }));
    expect(restored).toMatchObject({ ...references, data: { experienceMode: "no-experience", experiencia: "Texto que se conserva" }, generatedCv: { experiencia: [] }, generatedCvInvalid: false });
    const legacy = parseStoredCreateDraft(JSON.stringify({ ...previewDraft, intent: "first-job" }));
    expect(legacy?.data.experienceMode).toBe("with-experience");
    expect(legacy?.data.experiencia).toBe(previewDraft.data.experiencia);
    expect(legacy?.generatedCv).toEqual(previewCv);
  });
  it("adapta ayudas sin precargar habilidades", () => {
    expect(getCvFormContext("Cajero/a", "es").experiencePlaceholder).toContain("cobros");
    expect(getCvFormContext("Atención al cliente", "es").experiencePlaceholder).toContain("consultas");
    expect(getCvFormContext("Minería", "es").experiencePlaceholder).toContain("seguridad");
    expect(getCvFormContext("", "es").summaryPlaceholder).not.toMatch(/program|desarroll/i);
    expect(getCvFormContext("Cashier", "en").experiencePlaceholder).toContain("payments");
  });
  it("no penaliza antecedentes vacíos y conserva controles de claridad", () => {
    expect(calculateCvScore({ ...previewCv, experiencia: [], language: "en" }).items.find((item) => item.label === "First job")?.passed).toBe(true);
    const score = calculateCvScore({ ...previewCv, experiencia: [] });
    expect(score.items.find((item) => item.label === "Primer empleo")?.passed).toBe(true);
    expect(score.items.find((item) => item.label === "Perfil claro")?.passed).toBe(false);
    expect(score.items.find((item) => item.label === "Formato listo")?.passed).toBe(false);
    expect(calculateCvScore(previewCv).items.find((item) => item.label === "Experiencia entendible")?.passed).toBe(false);
  });
});
