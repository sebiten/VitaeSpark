import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAnalyticsSessionId } from "../lib/analytics-session";

const SESSION_KEY = "vitaespark_analytics_session";
const BRIDGE_KEY = "vitaespark_analytics_session_bridge";

describe("analytics session", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
    vi.useRealTimers();
  });

  it("mantiene el identificador durante la pestaña actual", () => {
    const first = getAnalyticsSessionId();
    const second = getAnalyticsSessionId();

    expect(first).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(second).toBe(first);
  });

  it("recupera la sesión desde otra pestaña durante 24 horas", () => {
    const first = getAnalyticsSessionId();
    window.sessionStorage.removeItem(SESSION_KEY);

    expect(getAnalyticsSessionId()).toBe(first);
  });

  it("descarta un puente vencido", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-28T12:00:00.000Z"));
    window.localStorage.setItem(
      BRIDGE_KEY,
      JSON.stringify({
        id: "de305d54-75b4-431b-adb2-eb6b9e546014",
        touchedAt: Date.now() - 25 * 60 * 60 * 1000,
      }),
    );

    const next = getAnalyticsSessionId();

    expect(next).not.toBe("de305d54-75b4-431b-adb2-eb6b9e546014");
  });
});
