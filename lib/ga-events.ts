declare global {
  interface Window {
    gtag?: (
      command: "event" | "config",
      eventName: string,
      parameters?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}

const recommendedGaEvents: Partial<Record<string, string>> = {
  cv_generated: "generate_lead",
  checkout_viewed: "begin_checkout",
  payment_started: "add_payment_info",
  payment_completed: "purchase",
};

export function recordGaEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, parameters);
}

export function recordGaFunnelEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | undefined>,
) {
  recordGaEvent(eventName, parameters);

  const recommendedEvent = recommendedGaEvents[eventName];
  if (recommendedEvent) {
    recordGaEvent(recommendedEvent, parameters);
  }
}
