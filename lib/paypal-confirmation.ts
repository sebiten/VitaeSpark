import "server-only";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { capturePayPalOrder, getPayPalOrder, type PayPalOrder } from "@/lib/paypal";
import { isExpectedPayPalPayment } from "@/lib/payment-validation";
import { completeCvPayment } from "@/lib/payment-checkout-session";
import { ensurePurchaseAccessForCv } from "@/lib/purchase-access";
import { getPaymentAnalyticsContext } from "@/lib/payment-analytics";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

export function validatePayPalOrder(order: PayPalOrder, orderId: string, cvId: string) {
  const unit = order.purchase_units?.[0];
  if (order.id !== orderId || order.intent !== "CAPTURE" || order.purchase_units?.length !== 1 || !unit ||
    (unit.custom_id !== cvId && unit.reference_id !== `cv_${cvId}`) ||
    (unit.custom_id && unit.custom_id !== cvId) ||
    (unit.reference_id && unit.reference_id !== `cv_${cvId}`) ||
    !isExpectedPayPalPayment({ amount: unit.amount?.value, currency: unit.amount?.currency_code })) {
    throw new Error("Invalid PayPal order association");
  }
  return unit;
}

// Resolve the registered order BEFORE capturing, even without a browser session.
export async function confirmPayPalOrder(orderId: string, options: {
  cvId?: string; capture?: boolean; stage?: "capture" | "webhook" | "return";
} = {}) {
  const { data: attempt, error } = await supabaseAdmin.from("payment_checkout_sessions")
    .select("id, cv_id, profile_id, provider, provider_checkout_id")
    .eq("provider", "paypal").eq("provider_checkout_id", orderId).maybeSingle();
  if (error) throw error;
  if (!attempt || attempt.provider !== "paypal" || (options.cvId && attempt.cv_id !== options.cvId)) {
    throw new Error("PayPal order is not registered for this CV");
  }
  let order = await getPayPalOrder(orderId);
  let unit = validatePayPalOrder(order, orderId, attempt.cv_id);
  if (order.status === "APPROVED" && options.capture) {
    try { await capturePayPalOrder(orderId); } catch { /* Resolve concurrent captures and lost responses by GET. */ }
    order = await getPayPalOrder(orderId);
    unit = validatePayPalOrder(order, orderId, attempt.cv_id);
  }
  const captures = unit.payments?.captures ?? [];
  const capture = captures.find((item) => item.status === "COMPLETED");
  if (!capture) {
    return { state: order.status === "VOIDED" ? "expired" as const
      : captures.some((item) => item.status === "PENDING") || order.status === "APPROVED" ? "pending" as const
      : captures.some((item) => ["DECLINED", "DENIED", "FAILED"].includes(item.status ?? "")) ? "failure" as const
      : order.status === "CREATED" || order.status === "PAYER_ACTION_REQUIRED" ? "unpaid" as const : "unknown" as const,
      cvId: attempt.cv_id };
  }
  if (captures.length !== 1 || !capture.id || (capture.custom_id && capture.custom_id !== attempt.cv_id) ||
    !isExpectedPayPalPayment({ amount: capture.amount?.value, currency: capture.amount?.currency_code })) {
    throw new Error("Invalid PayPal capture");
  }
  const completion = await completeCvPayment({ attemptId: attempt.id, cvId: attempt.cv_id, profileId: attempt.profile_id,
    provider: "paypal", paymentId: capture.id, amount: Number(capture.amount!.value),
    payerEmail: order.payer?.email_address, paymentType: "paypal" });
  await ensurePurchaseAccessForCv(attempt.cv_id);
  if (completion.payment_inserted) {
    const { data: cv } = await supabaseAdmin.from("cvs").select("template, cv_data").eq("id", attempt.cv_id).maybeSingle();
    const context = await getPaymentAnalyticsContext({ cvId: attempt.cv_id, provider: "paypal", orderId });
    await recordAnalyticsEventServer({ ...context, event_name: "payment_completed", attempt_id: attempt.id,
      template: context.template ?? cv?.template, language: context.language ?? (cv?.cv_data?.language === "en" ? "en" : "es"),
      stage: options.stage ?? "capture", user_id: attempt.profile_id, cv_id: attempt.cv_id,
      payment_id: capture.id, payment_provider: "paypal" });
  }
  return { state: "paid" as const, cvId: attempt.cv_id };
}
