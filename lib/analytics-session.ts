const ANALYTICS_SESSION_KEY = "vitaespark_analytics_session";

export function getAnalyticsSessionId() {
  if (typeof window === "undefined") return undefined;

  const existing = window.sessionStorage.getItem(ANALYTICS_SESSION_KEY);
  if (existing) return existing;

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, sessionId);
  return sessionId;
}
