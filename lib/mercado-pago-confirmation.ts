import "server-only";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { isExpectedMercadoPagoPayment } from "@/lib/payment-validation";
import { completeCvPayment } from "@/lib/payment-checkout-session";
import { ensurePurchaseAccessForCv } from "@/lib/purchase-access";
import { getPaymentAnalyticsContext } from "@/lib/payment-analytics";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

export async function mercadoPagoGet(path: string) {
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) throw new Error("Mercado Pago unavailable");
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}` },
    cache: "no-store", signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error("Mercado Pago state unavailable");
  return response.json();
}

export async function confirmMercadoPagoPayment(paymentId: string, expectedCvId?: string) {
  const payment = await mercadoPagoGet(`/v1/payments/${encodeURIComponent(paymentId)}`);
  if (String(payment.id) !== paymentId || !isExpectedMercadoPagoPayment({
    amount: payment.transaction_amount, currency: payment.currency_id,
  })) throw new Error("Invalid Mercado Pago amount");
  const cvId = typeof payment.external_reference === "string" ? payment.external_reference.replace(/^cv_/, "") : "";
  if (!cvId || (expectedCvId && cvId !== expectedCvId) || (payment.metadata?.cv_id && payment.metadata.cv_id !== cvId)) {
    throw new Error("Invalid Mercado Pago CV");
  }
  if (payment.metadata?.payment_provider && payment.metadata.payment_provider !== "mercado_pago") {
    throw new Error("Invalid payment provider");
  }
  let query = supabaseAdmin.from("payment_checkout_sessions")
    .select("id, cv_id, profile_id, provider, provider_checkout_id").eq("provider", "mercado_pago").eq("cv_id", cvId);
  if (payment.metadata?.attempt_id) query = query.eq("id", payment.metadata.attempt_id);
  else {
    if (!payment.order?.id) throw new Error("Missing Mercado Pago order");
    const order = await mercadoPagoGet(`/merchant_orders/${encodeURIComponent(String(payment.order.id))}`);
    if (!order.preference_id) throw new Error("Missing Mercado Pago preference");
    query = query.eq("provider_checkout_id", order.preference_id);
  }
  const { data: attempt, error } = await query.maybeSingle();
  if (error || !attempt || attempt.provider !== "mercado_pago" ||
    (payment.metadata?.profile_id && payment.metadata.profile_id !== attempt.profile_id)) {
    throw new Error("Unregistered Mercado Pago payment");
  }
  if (payment.status !== "approved") return { state: ["pending", "in_process", "authorized", "in_mediation"].includes(payment.status)
    ? "pending" as const : "failure" as const, cvId };
  const completion = await completeCvPayment({ attemptId: attempt.id, cvId, profileId: attempt.profile_id, paymentId,
    amount: payment.transaction_amount, payerEmail: payment.payer?.email,
    paymentType: payment.payment_type_id, provider: "mercado_pago" });
  await ensurePurchaseAccessForCv(cvId);
  if (completion.payment_inserted) {
    const { data: cv } = await supabaseAdmin.from("cvs").select("template, cv_data").eq("id", cvId).maybeSingle();
    const context = await getPaymentAnalyticsContext({ cvId, provider: "mercado_pago", orderId: attempt.provider_checkout_id });
    await recordAnalyticsEventServer({ ...context, event_name: "payment_completed", attempt_id: attempt.id,
      template: context.template ?? cv?.template, language: context.language ?? (cv?.cv_data?.language === "en" ? "en" : "es"),
      stage: "webhook", user_id: attempt.profile_id, cv_id: cvId, payment_id: paymentId, payment_provider: "mercado_pago" });
  }
  // Hosted preferences can be reopened: close this exact link after confirmation.
  // A provider failure leaves the webhook retryable; it never reassigns the payment.
  const close = await fetch(`https://api.mercadopago.com/checkout/preferences/${encodeURIComponent(attempt.provider_checkout_id)}`, {
    method: "PUT", headers: { Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ expires: true, expiration_date_to: new Date().toISOString() }), signal: AbortSignal.timeout(12000),
  });
  if (!close.ok) throw new Error("Paid preference could not be closed");
  return { state: "paid" as const, cvId };
}
