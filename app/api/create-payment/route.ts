import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { getOrCreatePendingPaymentCv } from "@/lib/payment-cv";
import { createMercadoPagoCheckout } from "@/lib/mercado-pago-checkout";
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

  let checkout: Awaited<ReturnType<typeof createMercadoPagoCheckout>>;
  try {
    checkout = await createMercadoPagoCheckout({
      cvId: paymentCv.cv.id,
      profileId: profile_id,
      email,
      language,
      template: paymentCv.cv.template,
      countryCode,
      attribution,
      isGuest,
    });
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error);
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
    is_guest: isGuest,
    ...checkout.attribution,
  });

  if (isGuest && !checkout.reused) {
    await recordAnalyticsEventServer({
      event_name: "guest_checkout_created",
      user_id: profile_id,
      language,
      payment_provider: "mercado_pago",
      template: paymentCv.cv.template,
      cv_id: paymentCv.cv.id,
      country_code: countryCode,
      is_guest: true,
      ...checkout.attribution,
    });
  }

  return NextResponse.json({
    cvId: paymentCv.cv.id,
    init_point: checkout.initPoint,
  });
}
