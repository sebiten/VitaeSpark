import "server-only";

import type { LandingAttribution } from "@/lib/analytics-attribution";
import { supabaseAdmin } from "@/utils/supabase/admin";

export type PaymentProvider = "mercado_pago" | "paypal";

export type PaymentCheckoutSession = {
  id: string;
  cv_id: string;
  profile_id: string;
  provider: PaymentProvider;
  idempotency_key: string;
  provider_checkout_id: string | null;
  checkout_url: string | null;
  status: "pending" | "completed" | "failed" | "expired";
  attribution: LandingAttribution;
};

type CreateCheckoutSessionInput = {
  cvId: string;
  profileId: string;
  provider: PaymentProvider;
  attribution?: LandingAttribution;
};

async function findPendingCheckoutSession({
  cvId,
  profileId,
  provider,
}: CreateCheckoutSessionInput) {
  const { data, error } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .select(
      "id, cv_id, profile_id, provider, idempotency_key, provider_checkout_id, checkout_url, status, attribution",
    )
    .eq("cv_id", cvId)
    .eq("profile_id", profileId)
    .eq("provider", provider)
    .eq("status", "pending")
    .maybeSingle();

  if (error) throw error;
  return data as PaymentCheckoutSession | null;
}

export async function getOrCreateCheckoutSession(
  input: CreateCheckoutSessionInput,
) {
  const existing = await findPendingCheckoutSession(input);
  if (existing) return existing;

  const { data, error } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .insert({
      cv_id: input.cvId,
      profile_id: input.profileId,
      provider: input.provider,
      attribution: input.attribution ?? {},
    })
    .select(
      "id, cv_id, profile_id, provider, idempotency_key, provider_checkout_id, checkout_url, status, attribution",
    )
    .single();

  if (!error) return data as PaymentCheckoutSession;
  if (error.code !== "23505") throw error;

  const concurrent = await findPendingCheckoutSession(input);
  if (!concurrent) throw error;
  return concurrent;
}

export async function saveCheckoutSession(
  id: string,
  values: {
    providerCheckoutId: string;
    checkoutUrl: string;
  },
) {
  const { error } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .update({
      provider_checkout_id: values.providerCheckoutId,
      checkout_url: values.checkoutUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending");

  if (error) throw error;
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
  cvId: string;
  profileId: string;
  paymentId: string;
  amount: number;
  payerEmail?: string | null;
  paymentType?: string | null;
  provider: PaymentProvider;
}) {
  const { data, error } = await supabaseAdmin.rpc("complete_cv_payment", {
    p_cv_id: input.cvId,
    p_profile_id: input.profileId,
    p_payment_id: input.paymentId,
    p_amount: input.amount,
    p_status: "approved",
    p_payer_email: input.payerEmail ?? null,
    p_payment_type: input.paymentType ?? input.provider,
    p_payment_method: input.provider,
  });

  if (error) throw error;

  return data as {
    payment_inserted: boolean;
    cv_status: "paid";
  };
}
