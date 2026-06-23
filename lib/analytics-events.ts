import {
  getLandingAttribution,
  type LandingAttribution,
} from "@/lib/analytics-attribution";

type AnalyticsEventName =
  | "landing_cta_clicked"
  | "template_selected"
  | "cv_generated"
  | "checkout_viewed"
  | "payment_started"
  | "payment_completed"
  | "recovery_email_sent"
  | "recovery_email_clicked"
  | "feedback_submitted"
  | "download_completed";

type AnalyticsEventPayload = LandingAttribution & {
  event_name: AnalyticsEventName;
  language?: "es" | "en";
  payment_provider?: "mercado_pago" | "paypal";
  template?: string;
  cv_id?: string;
  payment_id?: string;
};

export function recordAnalyticsEvent(payload: AnalyticsEventPayload) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({ ...getLandingAttribution(), ...payload });

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      "/api/analytics-event",
      new Blob([body], { type: "application/json" })
    );
    if (sent) return;
  }

  void fetch("/api/analytics-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
