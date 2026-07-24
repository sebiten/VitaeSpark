import { supabaseAdmin } from "@/utils/supabase/admin";
import type { LandingAttribution } from "@/lib/analytics-attribution";

type AnalyticsEventName =
  | "landing_cta_clicked"
  | "template_selected"
  | "form_started"
  | "auth_required"
  | "auth_completed"
  | "cv_generated"
  | "checkout_viewed"
  | "payment_started"
  | "payment_completed"
  | "recovery_email_sent"
  | "recovery_email_clicked"
  | "feedback_submitted"
  | "download_completed"
  | "tool_started"
  | "tool_result_generated"
  | "tool_ai_refined"
  | "tool_result_copied";

type ServerAnalyticsEventPayload = LandingAttribution & {
  event_name: AnalyticsEventName;
  user_id?: string | null;
  language?: "es" | "en";
  payment_provider?: "mercado_pago" | "paypal";
  template?: string;
  cv_id?: string;
  payment_id?: string;
  country_code?: string | null;
  session_id?: string;
};

export async function recordAnalyticsEventServer({
  user_id,
  event_name,
  landing_path,
  cta_label,
  source_type,
  language,
  payment_provider,
  template,
  cv_id,
  payment_id,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  country_code,
  session_id,
}: ServerAnalyticsEventPayload) {
  const { error } = await supabaseAdmin.from("analytics_events").insert({
    user_id: user_id ?? null,
    event_name,
    landing_path: landing_path || null,
    cta_label: cta_label || null,
    source_type: source_type || null,
    language: language || null,
    payment_provider: payment_provider || null,
    template: template || null,
    cv_id: cv_id || null,
    payment_id: payment_id || null,
    utm_source: utm_source || null,
    utm_medium: utm_medium || null,
    utm_campaign: utm_campaign || null,
    utm_content: utm_content || null,
    country_code: country_code || null,
    session_id: session_id || null,
  });

  if (error) {
    console.error("Error guardando analytics event:", error);
  }
}
