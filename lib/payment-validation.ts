import { PRICING } from "./pricing";

const PAYMENT_EPSILON = 0.001;

function amountsMatch(received: number | undefined, expected: number) {
  return (
    typeof received === "number" &&
    Number.isFinite(received) &&
    Math.abs(received - expected) < PAYMENT_EPSILON
  );
}

export function isExpectedMercadoPagoPayment(input: {
  amount?: number;
  currency?: string | null;
}) {
  return (
    amountsMatch(input.amount, PRICING.mercadoPago.amount) &&
    input.currency === PRICING.mercadoPago.currency
  );
}

export function isExpectedPayPalPayment(input: {
  amount?: string | number | null;
  currency?: string | null;
}) {
  const amount =
    typeof input.amount === "string" ? Number(input.amount) : input.amount;

  return (
    amountsMatch(amount ?? undefined, PRICING.paypal.amount) &&
    input.currency === PRICING.paypal.currency
  );
}
