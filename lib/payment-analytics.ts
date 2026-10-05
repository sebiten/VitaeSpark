import "server-only";

import { supabaseAdmin } from "@/utils/supabase/admin";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import type { AnalyticsDiagnostics } from "@/lib/analytics-diagnostics";
import type { LandingAttribution } from "@/lib/analytics-attribution";

type PaymentAnalyticsContext = LandingAttribution & {
  attempt_id?: string;
  is_guest?: boolean;
  language?: "es" | "en";
  template?: string;
  country_code?: string;
};

// Match the confirmed order, never the most recent checkout for the CV.
export async function getPaymentAnalyticsContext(input: {
  cvId: string;
  provider: "mercado_pago" | "paypal";
  orderId?: string;
}): Promise<PaymentAnalyticsContext> {
  if (!input.orderId) return {};
  try {
    const { data: attempts, error } = await supabaseAdmin
      .from("payment_checkout_sessions")
      .select("id, attribution, is_guest")
      .eq("cv_id", input.cvId)
      .eq("provider", input.provider)
      .eq("provider_checkout_id", input.orderId)
      .limit(2);
    if (error || attempts?.length !== 1) return {};
    const attempt = attempts[0];
    const { data: startedEvent } = await supabaseAdmin
      .from("analytics_events")
      .select("language, template, country_code")
      .eq("event_name", "payment_started")
      .eq("attempt_id", attempt.id)
      .eq("cv_id", input.cvId)
      .eq("payment_provider", input.provider)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return {
      ...(attempt.attribution as LandingAttribution),
      attempt_id: attempt.id,
      is_guest: attempt.is_guest,
      language: startedEvent?.language ?? undefined,
      template: startedEvent?.template ?? undefined,
      country_code: startedEvent?.country_code ?? undefined,
    };
  } catch {
    return {};
  }
}

// Observation only: this helper never captures, reconciles or changes a payment.
export async function recordPaymentFailure(input: {
  cvId: string;
  provider: "mercado_pago" | "paypal";
  stage: AnalyticsDiagnostics["stage"];
  errorCode: AnalyticsDiagnostics["error_code"];
  orderId?: string;
}) {
  try {
    let query = supabaseAdmin.from("payment_checkout_sessions")
      .select("id, attribution, is_guest")
      .eq("cv_id", input.cvId).eq("provider", input.provider);
    if (input.orderId) query = query.eq("provider_checkout_id", input.orderId);
    const { data: attempt } = await query.order("created_at", { ascending: false }).limit(1).maybeSingle();
    await recordAnalyticsEventServer({
      ...(attempt?.attribution as LandingAttribution | undefined),
      event_name: "payment_failed", cv_id: input.cvId,
      payment_provider: input.provider, stage: input.stage,
      error_code: input.errorCode, attempt_id: attempt?.id,
      is_guest: attempt?.is_guest,
    });
  } catch {
    console.error("No se pudo registrar el diagnóstico de pago");
  }
}
