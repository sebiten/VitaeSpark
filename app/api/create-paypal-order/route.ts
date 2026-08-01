import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { getOrCreatePendingPaymentCv } from "@/lib/payment-cv";
import {
  failCheckoutSession,
  getOrCreateCheckoutSession,
  saveCheckoutSession,
} from "@/lib/payment-checkout-session";
import { getPayPalAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";
import { PRICING } from "@/lib/pricing";
import { CreatePaymentSchema } from "@/lib/schemas/cv";
import { createClient } from "@/utils/supabase/server";
import { getRequestCountry } from "@/lib/market";
import {
  ensureCheckoutProfile,
  isGuestCheckoutEnabled,
  resolveCheckoutEmail,
} from "@/lib/guest-checkout-server";

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

  const { cvId, cvData, template, contactEmail, language, attribution } =
    parsed.data;
  const countryCode = getRequestCountry(req.headers);
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  const checkoutUser = user.data.user;
  if (!checkoutUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const isGuest = checkoutUser.is_anonymous === true;
  if (isGuest && !isGuestCheckoutEnabled()) {
    return NextResponse.json(
      { error: "El pago invitado no esta habilitado" },
      { status: 401 },
    );
  }

  const profile_id = checkoutUser.id;
  const email = resolveCheckoutEmail(checkoutUser, contactEmail);

  if (!profile_id || !email) {
    return NextResponse.json(
      { error: "No se pudo identificar al usuario" },
      { status: 400 }
    );
  }

  await ensureCheckoutProfile(checkoutUser);

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

  const checkoutSession = await getOrCreateCheckoutSession({
    cvId: paymentCv.cv.id,
    profileId: profile_id,
    provider: "paypal",
    attribution,
    contactEmail: email,
    isGuest,
  });

  if (checkoutSession.checkout_url) {
    await recordAnalyticsEventServer({
      event_name: "payment_started",
      user_id: profile_id,
      language,
      payment_provider: "paypal",
      template: paymentCv.cv.template,
      cv_id: paymentCv.cv.id,
      country_code: countryCode,
      is_guest: isGuest,
      ...checkoutSession.attribution,
    });

    return NextResponse.json({
      cvId: paymentCv.cv.id,
      orderId: checkoutSession.provider_checkout_id,
      approveUrl: checkoutSession.checkout_url,
    });
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const isPendingRecovery = attribution?.cta_label?.startsWith(
      "pending_payment_",
    );
    const cancelPath = isPendingRecovery && !isGuest
      ? `/perfil?cv_id=${paymentCv.cv.id}`
      : `/pago/resultado?cv_id=${paymentCv.cv.id}&provider=paypal&status=cancelled`;
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
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}${cancelPath}`,
      },
    };

    const paypalRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": checkoutSession.idempotency_key,
      },
      body: JSON.stringify(orderPayload),
    });

    const paypalJson = await paypalRes.json();

    if (!paypalRes.ok || !paypalJson.id) {
      console.error("PayPal order error:", paypalJson);
      if (
        paypalRes.status >= 400 &&
        paypalRes.status < 500 &&
        paypalRes.status !== 429
      ) {
        await failCheckoutSession(checkoutSession.id);
      }
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

    if (!approveUrl) {
      await failCheckoutSession(checkoutSession.id);
      return NextResponse.json(
        {
          cvId: paymentCv.cv.id,
          error: "PayPal no devolvio un enlace de aprobacion",
        },
        { status: 502 },
      );
    }

    await saveCheckoutSession(checkoutSession.id, {
      providerCheckoutId: paypalJson.id,
      checkoutUrl: approveUrl,
    });

    await recordAnalyticsEventServer({
      event_name: "payment_started",
      user_id: profile_id,
      language,
      payment_provider: "paypal",
      template: paymentCv.cv.template,
      cv_id: paymentCv.cv.id,
      country_code: countryCode,
      is_guest: isGuest,
      ...checkoutSession.attribution,
    });

    if (isGuest) {
      await recordAnalyticsEventServer({
        event_name: "guest_checkout_created",
        user_id: profile_id,
        language,
        payment_provider: "paypal",
        template: paymentCv.cv.template,
        cv_id: paymentCv.cv.id,
        country_code: countryCode,
        is_guest: true,
        ...checkoutSession.attribution,
      });
    }

    return NextResponse.json({
      cvId: paymentCv.cv.id,
      orderId: paypalJson.id,
      approveUrl,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { cvId: paymentCv.cv.id, error: "Error comunicandose con PayPal" },
      { status: 500 }
    );
  }
}
