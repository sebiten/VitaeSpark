import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { supabaseAdmin } from "@/utils/supabase/admin";

function verifyPayPalWebhook(headers: Headers): boolean {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");
  const webhookIdHeader =
    headers.get("paypal-webhook-id") || headers.get("Paypal-Webhook-Id");

  if (
    !transmissionId ||
    !transmissionTime ||
    !certUrl ||
    !authAlgo ||
    !transmissionSig
  ) {
    console.error("Missing required PayPal headers");
    return process.env.NODE_ENV !== "production";
  }

  if (webhookId && webhookIdHeader && webhookIdHeader !== webhookId) {
    console.error("Webhook ID mismatch:", webhookIdHeader, "!==", webhookId);
    return process.env.NODE_ENV !== "production";
  }

  return true;
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  if (!verifyPayPalWebhook(req.headers)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: {
    event_type: string;
    resource?: {
      id?: string;
      purchase_units?: Array<{
        reference_id?: string;
        amount?: { value?: string; currency_code?: string };
        payer?: { email_address?: string };
      }>;
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event_type, resource } = payload;
  if (
    event_type !== "CHECKOUT.ORDER.APPROVED" &&
    event_type !== "PAYMENT.CAPTURE.COMPLETED"
  ) {
    return NextResponse.json({ received: true });
  }

  if (!resource?.id) {
    return NextResponse.json({ error: "Missing resource ID" }, { status: 400 });
  }

  const paypalOrderId = resource.id;
  const referenceId = resource.purchase_units?.[0]?.reference_id || "";
  const cvId = referenceId.replace("cv_", "");

  if (!cvId || !referenceId.startsWith("cv_")) {
    console.error("Invalid reference_id:", referenceId);
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  const { data: existingPayment } = await supabaseAdmin
    .from("payments")
    .select("id")
    .eq("payment_id", paypalOrderId)
    .single();

  if (existingPayment) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  let userId: string | null = null;
  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("profile_id, template")
    .eq("id", cvId)
    .single();

  if (cv) {
    userId = cv.profile_id;
  }

  const amount = resource.purchase_units?.[0]?.amount?.value || "2.99";
  const payerEmail = resource.purchase_units?.[0]?.payer?.email_address || null;

  const { error: insertError } = await supabaseAdmin.from("payments").insert({
    cv_id: cvId,
    payment_id: paypalOrderId,
    amount: parseFloat(amount),
    status: "approved",
    payer_email: payerEmail,
    payment_type: "paypal",
    payment_method: "paypal",
    user_id: userId,
  });

  if (insertError) {
    console.error("Error inserting payment:", insertError);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  await supabaseAdmin.from("cvs").update({ status: "paid" }).eq("id", cvId);

  const { data: startedEvent } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "landing_path, cta_label, source_type, language, payment_provider, template"
    )
    .eq("event_name", "payment_started")
    .eq("cv_id", cvId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  await recordAnalyticsEventServer({
    event_name: "payment_completed",
    user_id: userId,
    cv_id: cvId,
    payment_id: paypalOrderId,
    template: startedEvent?.template ?? cv?.template,
    language: startedEvent?.language,
    payment_provider: startedEvent?.payment_provider ?? "paypal",
    landing_path: startedEvent?.landing_path,
    cta_label: startedEvent?.cta_label,
    source_type: startedEvent?.source_type,
  });

  return NextResponse.json({ received: true });
}
