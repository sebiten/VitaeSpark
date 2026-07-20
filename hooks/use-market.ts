"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DETECTED_COUNTRY_COOKIE,
  getMarketMode,
  MARKET_OVERRIDE_COOKIE,
  type MarketMode,
  normalizeCountryCode,
  normalizeMarketMode,
  readCookieValue,
} from "@/lib/market";

const MARKET_CHANGED_EVENT = "vitaespark-market-changed";

export function useMarket(initialCountryCode?: string | null) {
  const [countryCode, setCountryCode] = useState(
    normalizeCountryCode(initialCountryCode),
  );
  const [market, setMarket] = useState<MarketMode>(() =>
    getMarketMode(initialCountryCode),
  );

  const syncFromCookies = useCallback(() => {
    const detectedCountry = normalizeCountryCode(
      readCookieValue(document.cookie, DETECTED_COUNTRY_COOKIE),
    );
    const override = normalizeMarketMode(
      readCookieValue(document.cookie, MARKET_OVERRIDE_COOKIE),
    );

    setCountryCode(detectedCountry ?? normalizeCountryCode(initialCountryCode));
    setMarket(getMarketMode(detectedCountry ?? initialCountryCode, override));
  }, [initialCountryCode]);

  useEffect(() => {
    syncFromCookies();
    window.addEventListener(MARKET_CHANGED_EVENT, syncFromCookies);
    return () => window.removeEventListener(MARKET_CHANGED_EVENT, syncFromCookies);
  }, [syncFromCookies]);

  const updateMarket = useCallback((nextMarket: MarketMode) => {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${MARKET_OVERRIDE_COOKIE}=${nextMarket}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax${secure}`;
    setMarket(nextMarket);
    window.dispatchEvent(new Event(MARKET_CHANGED_EVENT));
  }, []);

  return { countryCode, market, setMarket: updateMarket };
}
