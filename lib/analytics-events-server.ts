import { supabaseAdmin } from "@/utils/supabase/admin";
import type { LandingAttribution } from "@/lib/analytics-attribution";

type AnalyticsEventName =
  | "landing_cta_clicked"
  | "template_selected"
  | "cv_generated"
  | "checkout_viewed"
  | "payment_started"
  | "payment_completed";

type ServerAnalyticsEventPayload = LandingAttribution & {
  event_name: AnalyticsEventName;
  user_id?: string | null;
  language?: "es" | "en";
  template?: string;
  cv_id?: string;
  payment_id?: string;
};

export async function recordAnalyticsEventServer({
  user_id,
  event_name,
  landing_path,
  cta_label,
  source_type,
  language,
  template,
  cv_id,
  payment_id,
}: ServerAnalyticsEventPayload) {
  const { error } = await supabaseAdmin.from("analytics_events").insert({
    user_id: user_id ?? null,
    event_name,
    landing_path: landing_path || null,
    cta_label: cta_label || null,
    source_type: source_type || null,
    language: language || null,
    template: template || null,
    cv_id: cv_id || null,
    payment_id: payment_id || null,
  });

  if (error) {
    console.error("Error guardando analytics event:", error);
  }
}
