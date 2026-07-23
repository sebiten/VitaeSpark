export const CLIENT_ANALYTICS_EVENTS = [
  "landing_cta_clicked",
  "template_selected",
  "form_started",
  "auth_required",
  "auth_completed",
  "checkout_viewed",
  "download_completed",
] as const;

export type ClientAnalyticsEventName =
  (typeof CLIENT_ANALYTICS_EVENTS)[number];

const AUTHENTICATED_CLIENT_EVENTS = new Set<ClientAnalyticsEventName>([
  "auth_completed",
  "checkout_viewed",
  "download_completed",
]);

export function analyticsEventRequiresUser(
  eventName: ClientAnalyticsEventName,
) {
  return AUTHENTICATED_CLIENT_EVENTS.has(eventName);
}
