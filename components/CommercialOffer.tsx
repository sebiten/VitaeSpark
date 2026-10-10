"use client";

import { useMarket } from "@/hooks/use-market";
import { useEffect, useState } from "react";
import { PRICING } from "@/lib/pricing";
import type { AppLanguage } from "@/lib/i18n";
import type { MarketMode } from "@/lib/market";

export function CommercialOffer({ language = "es", initialCountryCode, market: selectedMarket, className = "text-sm leading-6 text-white/70" }: {
  language?: AppLanguage;
  initialCountryCode?: string | null;
  market?: MarketMode;
  className?: string;
}) {
  const { market } = useMarket(initialCountryCode);
  const [regionReady, setRegionReady] = useState(false);
  useEffect(() => setRegionReady(true), []);
  const regionalPrice = (selectedMarket ?? market) === "argentina" ? PRICING.mercadoPago.label : PRICING.paypal.label;
  // Static landings cannot know the visitor's regional cookie during rendering.
  const price = !regionReady && !selectedMarket
    ? language === "en"
      ? `${PRICING.mercadoPago.label} in Argentina or ${PRICING.paypal.label} internationally`
      : `${PRICING.mercadoPago.label} en Argentina o ${PRICING.paypal.label} para pagos internacionales`
    : regionalPrice;
  return <p className={className}>{language === "en"
    ? `Creation and preview at no cost. Final PDF for ${price}. One-time payment, no subscription.`
    : `Creación y vista previa sin costo. PDF final por ${price}. Pago único, sin suscripción.`}</p>;
}
