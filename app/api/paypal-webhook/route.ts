import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

const PAYPAL_API_BASE = process.env.NODE_ENV === "production"
  ? "https://api-m.paypal.com"
  : "https://api-m.sandbox.paypal.com";

function verifyPayPalWebhook(
  headers: Headers,
  body: string
): boolean {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;

  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");
  const webhookIdHeader = headers.get("paypal-webhook-id") || headers.get("Paypal-Webhook-Id");

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    console.error("Missing required PayPal headers");
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  }

  if (webhookId && webhookIdHeader && webhookIdHeader !== webhookId) {
    console.error("Webhook ID mismatch:", webhookIdHeader, "!==", webhookId);
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  }

  return true;
}

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  if (!clientId || !secret) {
    throw new Error("PayPal credentials not configured");
  }

  const credentials = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error("Failed to get PayPal access token");
  }

  const json = await res.json();
  return json.access_token;
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const headers = req.headers;

  if (!verifyPayPalWebhook(headers, rawBody)) {
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

  if (event_type !== "CHECKOUT.ORDER.APPROVED" && event_type !== "PAYMENT.CAPTURE.COMPLETED") {
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

  const supabase = supabaseAdmin;

  const { data: existingPayment } = await supabase
    .from("payments")
    .select("id")
    .eq("payment_id", paypalOrderId)
    .single();

  if (existingPayment) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  let profileId: string | null = null;
  let userId: string | null = null;

  const { data: cv } = await supabase
    .from("cvs")
    .select("profile_id, template")
    .eq("id", cvId)
    .single();

  if (cv) {
    profileId = cv.profile_id;
    userId = cv.profile_id;
  }

  const amount = resource.purchase_units?.[0]?.amount?.value || "4.99";
  const currency = resource.purchase_units?.[0]?.amount?.currency_code || "USD";
  const payerEmail = resource.purchase_units?.[0]?.payer?.email_address || null;

  const { error: insertError } = await supabase.from("payments").insert({
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

  if (cvId) {
    await supabase
      .from("cvs")
      .update({ status: "paid" })
      .eq("id", cvId);
  }

  const { data: startedEvent } = await supabase
    .from("analytics_events")
    .select("landing_path, cta_label, source_type, template")
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
    landing_path: startedEvent?.landing_path,
    cta_label: startedEvent?.cta_label,
    source_type: startedEvent?.source_type,
  });

  return NextResponse.json({ received: true });
}
