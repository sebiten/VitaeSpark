const ANALYTICS_SESSION_KEY = "vitaespark_analytics_session";
const ANALYTICS_SESSION_BRIDGE_KEY = "vitaespark_analytics_session_bridge";
const ANALYTICS_SESSION_BRIDGE_TTL_MS = 24 * 60 * 60 * 1000;

type AnalyticsSessionBridge = {
  id: string;
  touchedAt: number;
};

export function getAnalyticsSessionId() {
  if (typeof window === "undefined") return undefined;

  const existing = window.sessionStorage.getItem(ANALYTICS_SESSION_KEY);
  if (isUuid(existing)) {
    writeBridge(existing);
    return existing;
  }

  const bridged = readBridge();
  if (bridged) {
    window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, bridged);
    writeBridge(bridged);
    return bridged;
  }

  const sessionId = crypto.randomUUID();
  window.sessionStorage.setItem(ANALYTICS_SESSION_KEY, sessionId);
  writeBridge(sessionId);
  return sessionId;
}

function readBridge() {
  try {
    const raw = window.localStorage.getItem(ANALYTICS_SESSION_BRIDGE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as AnalyticsSessionBridge;
    if (
      !isUuid(parsed.id) ||
      !Number.isFinite(parsed.touchedAt) ||
      Date.now() - parsed.touchedAt > ANALYTICS_SESSION_BRIDGE_TTL_MS
    ) {
      window.localStorage.removeItem(ANALYTICS_SESSION_BRIDGE_KEY);
      return undefined;
    }

    return parsed.id;
  } catch {
    window.localStorage.removeItem(ANALYTICS_SESSION_BRIDGE_KEY);
    return undefined;
  }
}

function writeBridge(id: string) {
  const bridge: AnalyticsSessionBridge = {
    id,
    touchedAt: Date.now(),
  };
  window.localStorage.setItem(
    ANALYTICS_SESSION_BRIDGE_KEY,
    JSON.stringify(bridge),
  );
}

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}
