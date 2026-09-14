"use client";

import { useMarket } from "@/hooks/use-market";
import { PRICING } from "@/lib/pricing";
import { GUEST_CV_GENERATION_MAX_AGE_SECONDS } from "@/lib/guest-cv-generation";

export function LandingOffer() {
  const { countryCode, market } = useMarket();
  const price = market === "argentina" ? PRICING.mercadoPago : PRICING.paypal;
  const guestWindowHours = GUEST_CV_GENERATION_MAX_AGE_SECONDS / 3600;

  return (
    <div className="space-y-1.5 text-sm leading-6 text-white/75">
      <p>Generación y vista previa sin costo.</p>
      <p>
        {countryCode ? (
          <>PDF por <strong className="font-semibold text-white">{price.label}</strong>.</>
        ) : (
          <>
            PDF por <strong className="font-semibold text-white">{PRICING.mercadoPago.label}</strong> en Argentina
            {" o "}<strong className="font-semibold text-white">{PRICING.paypal.label}</strong> para pagos internacionales.
          </>
        )}
        {" "}Pago único, sin suscripción.
      </p>
      <p className="text-xs leading-5 text-white/55">
        Sin cuenta: 1 CV cada {guestWindowHours} horas. Aplican límites de uso.
      </p>
    </div>
  );
}
