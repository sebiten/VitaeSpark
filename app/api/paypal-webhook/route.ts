import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal";
import { PRICING } from "@/lib/pricing";
import { supabaseAdmin } from "@/utils/supabase/admin";

type PayPalWebhookPayload = {
  event_type?: string;
  resource?: {
    id?: string;
    status?: string;
    custom_id?: string;
    amount?: { value?: string; currency_code?: string };
    payer?: { email_address?: string };
    supplementary_data?: {
      related_ids?: {
        order_id?: string;
      };
    };
  };
};

export async function POST(req: Request) {
  let payload: PayPalWebhookPayload;

  try {
    payload = (await req.json()) as PayPalWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const isVerified = await verifyPayPalWebhookSignature({
    headers: req.headers,
    webhookEvent: payload,
  });

  if (!isVerified) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { event_type, resource } = payload;
  if (event_type !== "PAYMENT.CAPTURE.COMPLETED") {
    return NextResponse.json({ received: true, ignored: true });
  }

  if (!resource?.id || resource.status !== "COMPLETED") {
    return NextResponse.json({ error: "Invalid capture" }, { status: 400 });
  }

  const cvId = resource.custom_id;
  if (!cvId) {
    console.error("PayPal capture sin custom_id:", resource);
    return NextResponse.json({ error: "Invalid CV" }, { status: 400 });
  }

  const { data: existingPayment } = await supabaseAdmin
    .from("payments")
    .select("id")
    .eq("payment_id", resource.id)
    .maybeSingle();

  if (existingPayment) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("profile_id, template")
    .eq("id", cvId)
    .maybeSingle();

  if (!cv) {
    console.error("CV no encontrado para capture PayPal:", { cvId });
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  const amount = Number(resource.amount?.value || PRICING.paypal.value);
  const payerEmail = resource.payer?.email_address || null;

  const { error: insertError } = await supabaseAdmin.from("payments").insert({
    cv_id: cvId,
    payment_id: resource.id,
    amount,
    status: "approved",
    payer_email: payerEmail,
    payment_type: "paypal",
    payment_method: "paypal",
    user_id: cv.profile_id,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }

    console.error("Error inserting PayPal payment:", insertError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("cvs")
    .update({ status: "paid" })
    .eq("id", cvId)
    .eq("profile_id", cv.profile_id);

  if (updateError) {
    console.error("Error updating PayPal CV:", updateError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  const { data: startedEvent } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "landing_path, cta_label, source_type, language, payment_provider, template, utm_source, utm_medium, utm_campaign, utm_content, country_code, session_id",
    )
    .eq("event_name", "payment_started")
    .eq("cv_id", cvId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  await recordAnalyticsEventServer({
    event_name: "payment_completed",
    user_id: cv.profile_id,
    cv_id: cvId,
    payment_id: resource.id,
    template: startedEvent?.template ?? cv.template,
    language: startedEvent?.language,
    payment_provider: "paypal",
    country_code: startedEvent?.country_code,
    session_id: startedEvent?.session_id ?? undefined,
    landing_path: startedEvent?.landing_path,
    cta_label: startedEvent?.cta_label,
    source_type: startedEvent?.source_type,
    utm_source: startedEvent?.utm_source,
    utm_medium: startedEvent?.utm_medium,
    utm_campaign: startedEvent?.utm_campaign,
    utm_content: startedEvent?.utm_content,
  });

  return NextResponse.json({ received: true });
}
