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

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

export function recordAnalyticsEvent(payload: AnalyticsEventPayload) {
  if (typeof window === "undefined") return;

  const event = { ...getLandingAttribution(), ...payload };
  const body = JSON.stringify(event);

  window.gtag?.("event", event.event_name, {
    landing_path: event.landing_path,
    cta_label: event.cta_label,
    source_type: event.source_type,
    language: event.language,
    payment_provider: event.payment_provider,
    template: event.template,
    utm_source: event.utm_source,
    utm_medium: event.utm_medium,
    utm_campaign: event.utm_campaign,
    utm_content: event.utm_content,
  });

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
