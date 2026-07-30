import { beforeEach, describe, expect, it, vi } from "vitest";
import { recordGaFunnelEvent } from "../lib/ga-events";

describe("GA4 funnel events", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  it("envía el evento propio y su equivalente recomendado", () => {
    recordGaFunnelEvent("payment_completed", {
      transaction_id: "payment-123",
      value: 1999,
      currency: "ARS",
    });

    expect(window.gtag).toHaveBeenNthCalledWith(
      1,
      "event",
      "payment_completed",
      {
        transaction_id: "payment-123",
        value: 1999,
        currency: "ARS",
      },
    );
    expect(window.gtag).toHaveBeenNthCalledWith(2, "event", "purchase", {
      transaction_id: "payment-123",
      value: 1999,
      currency: "ARS",
    });
  });

  it("no inventa equivalencias para eventos ajenos al funnel", () => {
    recordGaFunnelEvent("blog_scroll_depth", { percent: 50 });

    expect(window.gtag).toHaveBeenCalledOnce();
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "blog_scroll_depth",
      { percent: 50 },
    );
  });
});
