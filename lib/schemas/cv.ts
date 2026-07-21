import { z } from "zod";
import { CV_TEMPLATE_IDS } from "../cv-templates";

const optionalPhotoUrl = z.preprocess((value) => {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    value === "undefined"
  ) {
    return undefined;
  }

  return value;
}, z.string().url().optional());

const boundedText = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

export const TemplateSchema = z.enum(CV_TEMPLATE_IDS);

export const LandingAttributionSchema = z
  .object({
    landing_path: z.string().trim().max(240).optional(),
    cta_label: z.string().trim().max(120).optional(),
    source_type: z.enum(["landing", "blog"]).optional(),
    landing_ts: z.number().optional(),
    utm_source: z.string().trim().max(120).optional(),
    utm_medium: z.string().trim().max(120).optional(),
    utm_campaign: z.string().trim().max(120).optional(),
    utm_content: z.string().trim().max(120).optional(),
    session_id: z.string().uuid().optional(),
  })
  .optional();

export const GenerateCVInputSchema = z.object({
  language: z.enum(["es", "en"]).optional().default("es"),
  foto_url: optionalPhotoUrl,
  template: TemplateSchema.optional(),
  nombre: boundedText(1, 120),
  puesto: boundedText(1, 140),
  contacto: boundedText(1, 1200),
  sobreMi: boundedText(10, 1600),
  experiencia: boundedText(20, 5000),
  formacion: z.string().trim().max(2400).optional().default(""),
  habilidades: boundedText(1, 1800),
  idiomas: z.string().trim().max(600).optional().default(""),
  informacionAdicional: z.string().trim().max(1600).optional().default(""),
});

export const CVSchema = z.object({
  foto_url: optionalPhotoUrl,
  nombre: boundedText(1, 120),
  puesto: boundedText(1, 140),
  sobreMi: boundedText(1, 900),
  contacto: z.array(boundedText(1, 240)).max(8),
  experiencia: z
    .array(
      z.object({
        cargo: boundedText(1, 140),
        empresa: boundedText(1, 140),
        fechas: z.string().trim().max(80),
        ubicacion: z.string().trim().max(120),
        logros: z.array(boundedText(1, 320)).min(1).max(4),
      })
    )
    .min(1)
    .max(8),
  formacion: z
    .array(
      z.object({
        institucion: boundedText(1, 180),
        titulo: z.string().trim().max(180),
        fechas: z.string().trim().max(80),
        ubicacion: z.string().trim().max(120),
      })
    )
    .max(6),
  habilidades: z.array(boundedText(1, 80)).max(32),
  idiomas: z.array(boundedText(1, 80)).max(8),
  informacionAdicional: z.array(boundedText(1, 240)).max(8),
});

export const CreatePaymentSchema = z.object({
  cvId: z.string().uuid().optional(),
  cvData: CVSchema.optional(),
  template: TemplateSchema.optional(),
  language: z.enum(["es", "en"]).optional().default("es"),
  attribution: LandingAttributionSchema,
}).superRefine((data, context) => {
  if (!data.cvId && !data.cvData) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["cvData"],
      message: "El CV es obligatorio para iniciar un pago nuevo",
    });
  }

  if (!data.cvId && !data.template) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["template"],
      message: "La plantilla es obligatoria para iniciar un pago nuevo",
    });
  }
});
