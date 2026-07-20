import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { getOrCreatePendingPaymentCv } from "@/lib/payment-cv";
import { PRICING } from "@/lib/pricing";
import { CreatePaymentSchema } from "@/lib/schemas/cv";
import { createClient } from "@/utils/supabase/server";
import { getRequestCountry } from "@/lib/market";

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
  const countryCode = getRequestCountry(req.headers);
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

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      items: [
        {
          id: `cv-${paymentCv.cv.id}`,
          title:
            language === "en"
              ? "ATS-friendly resume in PDF"
              : "CV optimizado con IA",
          description:
            language === "en"
              ? "Professional resume with AI writing and PDF download"
              : "Curriculum profesional con diseno moderno y textos persuasivos",
          category_id: "services",
          quantity: 1,
          unit_price: PRICING.mercadoPago.amount,
        },
      ],
      payer: { email },
      external_reference: `cv_${paymentCv.cv.id}`,
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${paymentCv.cv.id}`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${paymentCv.cv.id}`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${paymentCv.cv.id}`,
      },
      auto_return: "approved",
      metadata: {
        cv_id: paymentCv.cv.id,
        profile_id,
        landing_path: attribution?.landing_path,
        cta_label: attribution?.cta_label,
        source_type: attribution?.source_type,
        utm_source: attribution?.utm_source,
        utm_medium: attribution?.utm_medium,
        utm_campaign: attribution?.utm_campaign,
        utm_content: attribution?.utm_content,
        language,
        payment_provider: "mercado_pago",
        template: paymentCv.cv.template,
        country_code: countryCode,
        session_id: attribution?.session_id,
      },
      customization: {
        visual: {
          showExternalReference: true,
        },
      },
    }),
  });

  const mpJson = await mpRes.json().catch(() => null);

  if (!mpRes.ok || !mpJson.init_point) {
    console.error("Error creando preferencia de Mercado Pago:", mpJson);
    return NextResponse.json(
      { cvId: paymentCv.cv.id, error: "No se pudo generar link de pago" },
      { status: 500 }
    );
  }

  await recordAnalyticsEventServer({
    event_name: "payment_started",
    user_id: profile_id,
    language,
    payment_provider: "mercado_pago",
    template: paymentCv.cv.template,
    cv_id: paymentCv.cv.id,
    country_code: countryCode,
    ...attribution,
  });

  return NextResponse.json({
    cvId: paymentCv.cv.id,
    init_point: mpJson.init_point,
  });
}
