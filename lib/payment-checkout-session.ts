import "server-only";

import { CheckoutConflict, reconcileBeforeCheckout } from "@/lib/payment-recovery";
import type { LandingAttribution } from "@/lib/analytics-attribution";
import { supabaseAdmin } from "@/utils/supabase/admin";

export type PaymentProvider = "mercado_pago" | "paypal";

export type PaymentCheckoutSession = {
  id: string;
  created_at: string;
  dispatch_started_at: string | null;
  cv_id: string;
  profile_id: string;
  provider: PaymentProvider;
  idempotency_key: string;
  provider_checkout_id: string | null;
  checkout_url: string | null;
  status: "pending" | "completed" | "failed" | "expired";
  attribution: LandingAttribution;
  contact_email: string | null;
  is_guest: boolean;
};

type CreateCheckoutSessionInput = {
  cvId: string;
  profileId: string;
  provider: PaymentProvider;
  attribution?: LandingAttribution;
  contactEmail?: string | null;
  isGuest?: boolean;
};

export async function getOrCreateCheckoutSession(input: CreateCheckoutSessionInput) {
  await reconcileBeforeCheckout(input.cvId, input.profileId, input.provider);
  const { data, error } = await supabaseAdmin.rpc("reserve_payment_checkout", {
    p_cv_id: input.cvId, p_profile_id: input.profileId, p_provider: input.provider,
    p_attribution: input.attribution ?? {}, p_email: input.contactEmail ?? null, p_guest: input.isGuest ?? false,
  });
  if (error || !data) throw error ?? new Error("Checkout reservation unavailable");
  if (data.conflict_cv_id) throw new CheckoutConflict(data.conflict_cv_id, data.provider ?? input.provider, data.reason);
  return data as PaymentCheckoutSession;
}

// A dispatch claim is persisted before contacting the provider. An ambiguous response
// never releases it: PayPal reuses its key; Mercado Pago searches the exact preference.
export async function claimCheckoutDispatch(session: PaymentCheckoutSession) {
  const sessionAge = Date.now() - Date.parse(session.created_at);
  if (!Number.isFinite(sessionAge) || sessionAge > 5 * 60 * 60 * 1000) return false;
  // A historical incomplete preference might already exist outside our database.
  if (session.provider === "mercado_pago" && !session.dispatch_started_at && sessionAge > 30000) return false;
  const now = new Date().toISOString();
  let query = supabaseAdmin.from("payment_checkout_sessions").update({ dispatch_started_at: now })
    .eq("id", session.id).eq("status", "pending").is("provider_checkout_id", null);
  if (session.dispatch_started_at) {
    const age = Date.now() - Date.parse(session.dispatch_started_at);
    if (session.provider !== "paypal" || age < 30000) return false;
    query = query.eq("dispatch_started_at", session.dispatch_started_at);
  } else query = query.is("dispatch_started_at", null);
  const { data, error } = await query.select("id").maybeSingle();
  if (error) throw error;
  return Boolean(data);
}
export async function saveCheckoutSession(
  id: string,
  values: {
    providerCheckoutId: string;
    checkoutUrl: string;
  },
) {
  const { data, error } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .update({
      provider_checkout_id: values.providerCheckoutId,
      checkout_url: values.checkoutUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending")
    .is("provider_checkout_id", null)
    .select("id").maybeSingle();

  if (error || !data) throw error ?? new Error("Checkout order was already assigned");
}

export async function failCheckoutSession(id: string) {
  const { error } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .update({
      status: "failed",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending");

  if (error) {
    console.error("No se pudo cerrar el intento de pago fallido:", error);
  }
}

export async function completeCvPayment(input: {
  attemptId: string;
  cvId: string;
  profileId: string;
  paymentId: string;
  amount: number;
  payerEmail?: string | null;
  paymentType?: string | null;
  provider: PaymentProvider;
}) {
  const { data, error } = await supabaseAdmin.rpc("complete_registered_cv_payment", {
    p_attempt_id: input.attemptId,
    p_payment_id: input.paymentId,
    p_amount: input.amount,
    p_payer_email: input.payerEmail ?? null,
    p_payment_type: input.paymentType ?? input.provider,
    p_provider: input.provider,
  });

  if (error) throw error;

  return data as {
    payment_inserted: boolean;
    cv_status: "paid";
  };
}
