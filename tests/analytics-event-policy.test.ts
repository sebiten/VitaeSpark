import { describe, expect, it } from "vitest";
import {
  analyticsEventRequiresUser,
  CLIENT_ANALYTICS_EVENTS,
} from "../lib/analytics-event-policy";

describe("analytics event policy", () => {
  it("does not expose payment or recovery events to the public endpoint", () => {
    expect(CLIENT_ANALYTICS_EVENTS).not.toContain("payment_completed");
    expect(CLIENT_ANALYTICS_EVENTS).not.toContain("payment_started");
    expect(CLIENT_ANALYTICS_EVENTS).not.toContain("recovery_email_sent");
    expect(CLIENT_ANALYTICS_EVENTS).not.toContain("feedback_submitted");
    expect(CLIENT_ANALYTICS_EVENTS).not.toContain("cv_generated");
  });

  it("requires a session for sensitive product events", () => {
    expect(analyticsEventRequiresUser("checkout_viewed")).toBe(true);
    expect(analyticsEventRequiresUser("download_completed")).toBe(true);
    expect(analyticsEventRequiresUser("landing_cta_clicked")).toBe(false);
  });
});
