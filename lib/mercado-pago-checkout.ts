import "server-only";

import type { LandingAttribution } from "@/lib/analytics-attribution";
import {
  failCheckoutSession,
  getOrCreateCheckoutSession,
  saveCheckoutSession,
} from "@/lib/payment-checkout-session";
import { PRICING } from "@/lib/pricing";

type MercadoPagoCheckoutInput = {
  cvId: string;
  profileId: string;
  email: string;
  language: "es" | "en";
  template: string;
  countryCode: string | null;
  attribution?: LandingAttribution;
  isGuest?: boolean;
};

export async function createMercadoPagoCheckout(
  input: MercadoPagoCheckoutInput,
) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!accessToken || !siteUrl) {
    throw new Error("Mercado Pago environment is not configured");
  }

  const session = await getOrCreateCheckoutSession({
    cvId: input.cvId,
    profileId: input.profileId,
    provider: "mercado_pago",
    attribution: input.attribution,
    contactEmail: input.email,
    isGuest: input.isGuest,
  });

  if (session.checkout_url) {
    return {
      initPoint: session.checkout_url,
      attribution: session.attribution,
      reused: true,
    };
  }

  const attribution = session.attribution ?? {};
  const response = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": session.idempotency_key,
      },
      body: JSON.stringify({
        items: [
          {
            id: `cv-${input.cvId}`,
            title:
              input.language === "en"
                ? "ATS-friendly resume in PDF"
                : "CV optimizado con IA",
            description:
              input.language === "en"
                ? "Professional resume with AI writing and PDF download"
                : "Curriculum profesional con diseno moderno y textos persuasivos",
            category_id: "services",
            quantity: 1,
            unit_price: PRICING.mercadoPago.amount,
            currency_id: PRICING.mercadoPago.currency,
          },
        ],
        payer: { email: input.email },
        external_reference: `cv_${input.cvId}`,
        notification_url: `${siteUrl}/api/webhook`,
        back_urls: {
          success: `${siteUrl}/pago/resultado?cv_id=${input.cvId}&provider=mercado_pago&status=approved`,
          failure: `${siteUrl}/pago/resultado?cv_id=${input.cvId}&provider=mercado_pago&status=failure`,
          pending: `${siteUrl}/pago/resultado?cv_id=${input.cvId}&provider=mercado_pago&status=pending`,
        },
        auto_return: "approved",
        metadata: {
          cv_id: input.cvId,
          profile_id: input.profileId,
          language: input.language,
          payment_provider: "mercado_pago",
          is_guest: input.isGuest === true,
          template: input.template,
          country_code: input.countryCode,
          landing_path: attribution.landing_path,
          cta_label: attribution.cta_label,
          source_type: attribution.source_type,
          utm_source: attribution.utm_source,
          utm_medium: attribution.utm_medium,
          utm_campaign: attribution.utm_campaign,
          utm_content: attribution.utm_content,
          session_id: attribution.session_id,
        },
        customization: {
          visual: {
            showExternalReference: true,
          },
        },
      }),
    },
  );

  const payload = (await response.json().catch(() => null)) as {
    id?: string;
    init_point?: string;
  } | null;

  if (!response.ok || !payload?.id || !payload.init_point) {
    if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      await failCheckoutSession(session.id);
    }
    throw new Error("No se pudo generar link de pago");
  }

  await saveCheckoutSession(session.id, {
    providerCheckoutId: payload.id,
    checkoutUrl: payload.init_point,
  });

  return {
    initPoint: payload.init_point,
    attribution,
    reused: false,
  };
}
