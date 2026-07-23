import { describe, expect, it } from "vitest";
import {
  isExpectedMercadoPagoPayment,
  isExpectedPayPalPayment,
} from "../lib/payment-validation";

describe("payment validation", () => {
  it("accepts the configured Mercado Pago amount and currency", () => {
    expect(
      isExpectedMercadoPagoPayment({ amount: 1999, currency: "ARS" }),
    ).toBe(true);
  });

  it("rejects a Mercado Pago payment with a different amount or currency", () => {
    expect(
      isExpectedMercadoPagoPayment({ amount: 199, currency: "ARS" }),
    ).toBe(false);
    expect(
      isExpectedMercadoPagoPayment({ amount: 1999, currency: "USD" }),
    ).toBe(false);
  });

  it("accepts only the configured PayPal amount in USD", () => {
    expect(isExpectedPayPalPayment({ amount: "2.99", currency: "USD" })).toBe(
      true,
    );
    expect(isExpectedPayPalPayment({ amount: "1.00", currency: "USD" })).toBe(
      false,
    );
    expect(isExpectedPayPalPayment({ amount: "2.99", currency: "ARS" })).toBe(
      false,
    );
  });
});
