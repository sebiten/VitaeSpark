import { describe, expect, it } from "vitest";
import { getCheckoutInsight } from "../lib/checkout-insight";

describe("checkout diagnosis", () => {
  const input = {
    generated: 10,
    paymentStarts: 2,
    paymentStartToCompleted: 0,
    generatedToPreview: 100,
    previewToPaymentStart: 20,
  };

  it("flags the observed 10 previews / 2 starts / 0 approvals instead of a healthy funnel", () => {
    expect(getCheckoutInsight(input).value).toBe("Pagos sin aprobación");
    expect(getCheckoutInsight(input).tone).toBe("warn");
  });

  it("does not diagnose abandonment from a handful of previews without attempts", () => {
    expect(getCheckoutInsight({ ...input, paymentStarts: 0 }).tone).toBe("neutral");
  });

  it("does not declare a small successful sample healthy", () => {
    expect(getCheckoutInsight({ ...input, paymentStartToCompleted: 50 }).value)
      .toBe("Muestra insuficiente");
  });

  it("keeps payment completion visible even when starts look good", () => {
    expect(getCheckoutInsight({ ...input, generated: 100, paymentStarts: 20, paymentStartToCompleted: 5 }).text)
      .toContain("5.0%");
  });
});
