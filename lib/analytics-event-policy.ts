export const CLIENT_ANALYTICS_EVENTS = [
  "landing_cta_clicked",
  "template_selected",
  "form_started",
  "auth_required",
  "auth_completed",
  "preview_viewed",
  "checkout_viewed",
  "guest_email_submitted",
  "download_completed",
  "tool_started",
  "tool_result_generated",
  "tool_ai_refined",
  "tool_result_copied",
] as const;

export type ClientAnalyticsEventName =
  (typeof CLIENT_ANALYTICS_EVENTS)[number];

const AUTHENTICATED_CLIENT_EVENTS = new Set<ClientAnalyticsEventName>([
  "auth_completed",
  "download_completed",
]);

export function analyticsEventRequiresUser(
  eventName: ClientAnalyticsEventName,
) {
  return AUTHENTICATED_CLIENT_EVENTS.has(eventName);
}
