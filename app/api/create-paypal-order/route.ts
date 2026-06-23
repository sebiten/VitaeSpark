import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { getOrCreatePendingPaymentCv } from "@/lib/payment-cv";
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";
import { PRICING } from "@/lib/pricing";
import { CreatePaymentSchema } from "@/lib/schemas/cv";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON invalido en la solicitud" },
      { status: 400 }
    );
  }

  const parsed = CreatePaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos invalidos", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { cvId, cvData, template, language, attribution } = parsed.data;
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile_id = user.data.user.id;
  const email = user.data.user.email;

  if (!profile_id || !email) {
    return NextResponse.json(
      { error: "No se pudo identificar al usuario" },
      { status: 400 }
    );
  }

  const paymentCv = await getOrCreatePendingPaymentCv({
    supabase,
    cvId,
    profileId: profile_id,
    cvData,
    template,
    language,
  });

  if (!paymentCv.ok) {
    return NextResponse.json(
      { error: paymentCv.error },
      { status: paymentCv.status },
    );
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `cv_${paymentCv.cv.id}`,
          custom_id: paymentCv.cv.id,
          description:
            language === "en"
              ? "ATS-friendly resume in PDF - VitaeSpark"
              : "CV optimizado con IA - VitaeSpark",
          amount: {
            currency_code: PRICING.paypal.currency,
            value: PRICING.paypal.value,
          },
        },
      ],
      payer: {
        email_address: email,
      },
      application_context: {
        brand_name: "VitaeSpark",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/paypal-return?cv_id=${paymentCv.cv.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/crear?lang=${language}`,
      },
    };

    const paypalRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": randomUUID(),
      },
      body: JSON.stringify(orderPayload),
    });

    const paypalJson = await paypalRes.json();

    if (!paypalRes.ok || !paypalJson.id) {
      console.error("PayPal order error:", paypalJson);
      return NextResponse.json(
        {
          cvId: paymentCv.cv.id,
          error: "No se pudo crear la orden de PayPal",
        },
        { status: 500 }
      );
    }

    const approveUrl = paypalJson.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    )?.href;

    await recordAnalyticsEventServer({
      event_name: "payment_started",
      user_id: profile_id,
      language,
      payment_provider: "paypal",
      template: paymentCv.cv.template,
      cv_id: paymentCv.cv.id,
      ...attribution,
    });

    return NextResponse.json({
      cvId: paymentCv.cv.id,
      orderId: paypalJson.id,
      approveUrl: approveUrl || null,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { cvId: paymentCv.cv.id, error: "Error comunicandose con PayPal" },
      { status: 500 }
    );
  }
}
