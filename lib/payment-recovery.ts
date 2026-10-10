import "server-only";
import { supabaseAdmin } from "@/utils/supabase/admin";
import type { PaymentCheckoutSession } from "@/lib/payment-checkout-session";
import { confirmPayPalOrder } from "@/lib/paypal-confirmation";
import { confirmMercadoPagoPayment, mercadoPagoGet } from "@/lib/mercado-pago-confirmation";

export type PaymentState = "paid" | "pending" | "unpaid" | "expired" | "failure" | "unknown";

export class CheckoutConflict extends Error {
  constructor(public cvId: string, public provider: string, public state: string) {
    super("Revisá la compra anterior antes de iniciar otra.");
  }
  get recoveryUrl() { return `/pago/resultado?cv_id=${encodeURIComponent(this.cvId)}&provider=${this.provider}`; }
}

export async function inspectCheckout(session: PaymentCheckoutSession, capture = false): Promise<PaymentState> {
  if (!session.provider_checkout_id) return "unknown";
  if (session.provider === "paypal") {
    return (await confirmPayPalOrder(session.provider_checkout_id, { cvId: session.cv_id, capture, stage: "return" })).state;
  }
  const preference = await mercadoPagoGet(`/checkout/preferences/${encodeURIComponent(session.provider_checkout_id)}`);
  if (preference.external_reference !== `cv_${session.cv_id}`) throw new Error("Preference association mismatch");
  const payments = await mercadoPagoGet(`/v1/payments/search?external_reference=${encodeURIComponent(`cv_${session.cv_id}`)}&limit=100`);
  if (!Array.isArray(payments.results) || payments.paging?.total > payments.results.length) return "unknown";
  let pending = false;
  let failure = false;
  for (const payment of payments.results) {
    const result = await confirmMercadoPagoPayment(String(payment.id), session.cv_id);
    if (result.state === "paid") return "paid";
    pending ||= result.state === "pending";
    failure ||= result.state === "failure";
  }
  if (pending) return "pending";
  if (preference.expires === true && Date.parse(preference.expiration_date_to) <= Date.now()) return "expired";
  return failure ? "failure" : "unpaid";
}

export async function getRelatedCheckouts(cvId: string, profileId: string) {
  const { data: version, error } = await supabaseAdmin.from("payment_cv_versions").select("root_id").eq("cv_id", cvId).maybeSingle();
  if (error) throw error;
  const root = version?.root_id ?? cvId;
  const { data: versions, error: versionsError } = await supabaseAdmin.from("payment_cv_versions").select("cv_id").eq("root_id", root);
  if (versionsError) throw versionsError;
  const ids = [...new Set([cvId, root, ...(versions ?? []).map((v) => v.cv_id)])];
  const { data: sessions, error: sessionError } = await supabaseAdmin.from("payment_checkout_sessions")
    .select("*").in("cv_id", ids).eq("profile_id", profileId).order("created_at", { ascending: false });
  if (sessionError) throw sessionError;
  return (sessions ?? []) as PaymentCheckoutSession[];
}

export async function reconcileBeforeCheckout(cvId: string, profileId: string, provider: string) {
  const sessions = await getRelatedCheckouts(cvId, profileId);
  for (const session of sessions) {
    if (session.status === "completed") throw new CheckoutConflict(session.cv_id, session.provider, "paid");
    if (session.status !== "pending" || !session.provider_checkout_id) continue;
    const state = await inspectCheckout(session, true);
    if (state === "expired") {
      const { error } = await supabaseAdmin.from("payment_checkout_sessions").update({ status: "expired" })
        .eq("id", session.id).eq("status", "pending");
      if (error) throw error;
    } else if (state === "paid" || state === "pending" || state === "unknown" || session.cv_id !== cvId || session.provider !== provider) {
      throw new CheckoutConflict(session.cv_id, session.provider, state);
    }
  }
}
