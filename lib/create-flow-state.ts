import { normalizeCreateIntent, type CreateIntent } from "./blog-intent";
import { CVSchema, TemplateSchema } from "./schemas/cv";
import type {
  CV,
  DatosCVFormulario,
} from "./types/cv";
import type { AppLanguage } from "./i18n";
import {
  isEphemeralPhotoUrl,
  isGuestPhotoKey,
} from "./guest-photo";

export const CREATE_DRAFT_KEY = "vitaespark_create_draft";
export const CREATE_DRAFT_VERSION = 3;

export type ResumeAction = "generate" | "photo" | "checkout";
export type FlowStep = "template" | "form" | "preview";

export type StoredCreateDraft = {
  version: number;
  data: DatosCVFormulario;
  template: string;
  language: AppLanguage;
  intent: CreateIntent;
  action: ResumeAction | null;
  flowStep: FlowStep;
  generatedCv?: CV;
  guestPhotoKey?: string;
};

export type ParsedCreateDraft = StoredCreateDraft & {
  generatedCvInvalid: boolean;
};

const resumeActions = new Set<ResumeAction>([
  "generate",
  "photo",
  "checkout",
]);
const flowSteps = new Set<FlowStep>(["template", "form", "preview"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeStoredData(value: Record<string, unknown>): DatosCVFormulario {
  const fotoUrl = readString(value.foto_url).trim();

  return {
    nombre: readString(value.nombre),
    puesto: readString(value.puesto),
    contacto: readString(value.contacto),
    sobreMi: readString(value.sobreMi),
    experiencia: readString(value.experiencia),
    formacion: readString(value.formacion),
    habilidades: readString(value.habilidades),
    idiomas: readString(value.idiomas),
    informacionAdicional: readString(value.informacionAdicional),
    foto_url:
      fotoUrl && !isEphemeralPhotoUrl(fotoUrl)
        ? fotoUrl
        : undefined,
  };
}

export function parseStoredCreateDraft(
  raw: string | null,
): ParsedCreateDraft | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(value) || !isRecord(value.data)) return null;

  const template = TemplateSchema.safeParse(value.template);
  if (!template.success) return null;

  const language: AppLanguage = value.language === "en" ? "en" : "es";
  const action =
    typeof value.action === "string" &&
    resumeActions.has(value.action as ResumeAction)
      ? (value.action as ResumeAction)
      : null;

  const generatedCvCandidate = isRecord(value.generatedCv)
    ? {
        ...value.generatedCv,
        foto_url: isEphemeralPhotoUrl(
          readString(value.generatedCv.foto_url),
        )
          ? undefined
          : value.generatedCv.foto_url,
      }
    : value.generatedCv;
  const generatedCvResult = CVSchema.safeParse(generatedCvCandidate);
  const generatedCvInvalid =
    generatedCvCandidate !== undefined && !generatedCvResult.success;
  const generatedCv = generatedCvResult.success
    ? {
        ...generatedCvResult.data,
        language:
          isRecord(generatedCvCandidate) &&
          generatedCvCandidate.language === "en"
            ? "en"
            : language,
      }
    : undefined;

  const requestedStep =
    typeof value.flowStep === "string" &&
    flowSteps.has(value.flowStep as FlowStep)
      ? (value.flowStep as FlowStep)
      : generatedCv
        ? "preview"
        : "form";

  return {
    version:
      typeof value.version === "number"
        ? value.version
        : 1,
    data: normalizeStoredData(value.data),
    template: template.data,
    language,
    intent: normalizeCreateIntent(readString(value.intent)),
    action,
    flowStep:
      generatedCv || requestedStep !== "preview"
        ? requestedStep
        : "form",
    generatedCv,
    guestPhotoKey: isGuestPhotoKey(readString(value.guestPhotoKey))
      ? readString(value.guestPhotoKey)
      : undefined,
    generatedCvInvalid,
  };
}
