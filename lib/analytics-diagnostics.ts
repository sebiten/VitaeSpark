import { z } from "zod";

// Closed vocabularies: never send CV text, emails or exception messages.
export const analyticsDiagnosticSchema = z.object({
  step_id: z.enum(["basic", "summary", "experience", "education", "skills"]).optional(),
  stage: z.enum(["landing", "creator", "form", "generation", "email", "checkout", "return", "capture", "webhook", "download"]).optional(),
  error_code: z.enum([
    "generation_limit", "generation_http_error", "generation_network_error",
    "checkout_http_error", "checkout_network_error", "checkout_missing_url",
    "guest_session_error", "provider_error", "capture_error", "invalid_capture",
    "return_cancelled", "return_failure", "verification_error", "session_lost",
  ]).optional(),
  attempt_id: z.string().uuid().optional(),
});

export type AnalyticsDiagnostics = z.infer<typeof analyticsDiagnosticSchema>;

const EVENT_FIELDS = new Set([
  "event_name", "user_id", "cv_id", "payment_id", "session_id", "is_guest",
  "language", "payment_provider", "template", "country_code", "landing_path",
  "cta_label", "source_type", "utm_source", "utm_medium", "utm_campaign",
  "utm_content", "step_id", "stage", "error_code", "attempt_id",
]);

// Explicit allowlist for both transports. Diagnostic text is always a closed code.
export function sanitizeAnalyticsPayload<T extends Record<string, unknown>>(payload: T): T {
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (!EVENT_FIELDS.has(key)) continue;
    if (typeof value === "string") {
      let decoded = value;
      try { decoded = decodeURIComponent(value); } catch { continue; }
      if (key === "landing_path") {
        decoded = decoded.split(/[?#]/)[0];
        if (!/^\/[a-z0-9/_-]*$/i.test(decoded)) continue;
      }
      if (decoded.includes("@") || /[\r\n]/.test(decoded)) continue;
      clean[key] = decoded;
    } else if (value == null || typeof value === "boolean") {
      clean[key] = value;
    }
  }
  for (const key of ["step_id", "stage", "error_code", "attempt_id"] as const) {
    if (clean[key] != null && !analyticsDiagnosticSchema.shape[key].safeParse(clean[key]).success) delete clean[key];
  }
  return clean as T;
}

export function isGuestAnalyticsEvent(event: { is_guest: boolean | null; user_id: string | null }) {
  return event.is_guest === true || (event.is_guest == null && !event.user_id);
}

export const ANALYTICS_EVENT_LABELS: Record<string, string> = {
  landing_viewed: "Visitó página comercial",
  creator_entered: "Entró al creador",
  form_step_completed: "Completó paso",
  generation_failed: "Falló la generación",
  payment_clicked: "Clic en pagar",
  checkout_email_opened: "Abrió formulario de email",
  payment_failed: "Fallo observado de pago",
  checkout_viewed: "Vio oferta de pago",
  payment_started: "Checkout creado",
  guest_checkout_created: "Checkout invitado creado",
  payment_completed: "Evento de pago aprobado",
  download_completed: "Descarga solicitada",
};
