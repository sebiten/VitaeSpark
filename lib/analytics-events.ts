import {
  getLandingAttribution,
  type LandingAttribution,
} from "@/lib/analytics-attribution";
import { getAnalyticsSessionId } from "@/lib/analytics-session";
import type { ClientAnalyticsEventName } from "@/lib/analytics-event-policy";

type AnalyticsEventPayload = LandingAttribution & {
  event_name: ClientAnalyticsEventName;
  language?: "es" | "en";
  payment_provider?: "mercado_pago" | "paypal";
  template?: string;
  cv_id?: string;
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

export function recordGaEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, parameters);
}

export function recordAnalyticsEvent(payload: AnalyticsEventPayload) {
  if (typeof window === "undefined") return;

  const event = {
    ...getLandingAttribution(),
    ...payload,
    session_id: payload.session_id ?? getAnalyticsSessionId(),
  };
  const body = JSON.stringify(event);

  recordGaEvent(event.event_name, {
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
    session_id: event.session_id,
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
