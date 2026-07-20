export const DETECTED_COUNTRY_COOKIE = "vitaespark-country";
export const MARKET_OVERRIDE_COOKIE = "vitaespark-market";

export type MarketMode = "argentina" | "international";
export type PaymentProvider = "mercado_pago" | "paypal";

export function normalizeCountryCode(value?: string | null) {
  const countryCode = value?.trim().toUpperCase();
  return countryCode && /^[A-Z]{2}$/.test(countryCode)
    ? countryCode
    : null;
}

export function normalizeMarketMode(value?: string | null): MarketMode | null {
  return value === "argentina" || value === "international" ? value : null;
}

export function getDetectedCountry(headers: Headers) {
  return normalizeCountryCode(
    headers.get("x-vercel-ip-country") ??
      headers.get("cf-ipcountry") ??
      headers.get("x-country-code"),
  );
}

export function getMarketMode(
  countryCode?: string | null,
  override?: string | null,
): MarketMode {
  const marketOverride = normalizeMarketMode(override);
  if (marketOverride) return marketOverride;
  return normalizeCountryCode(countryCode) === "AR"
    ? "argentina"
    : "international";
}

export function getPaymentProvider(market: MarketMode): PaymentProvider {
  return market === "argentina" ? "mercado_pago" : "paypal";
}

export function readCookieValue(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;

  const item = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  return item ? decodeURIComponent(item.slice(name.length + 1)) : null;
}

export function getRequestCountry(headers: Headers) {
  return (
    getDetectedCountry(headers) ??
    normalizeCountryCode(
      readCookieValue(headers.get("cookie"), DETECTED_COUNTRY_COOKIE),
    )
  );
}

export function getRequestMarket(headers: Headers) {
  return getMarketMode(
    getRequestCountry(headers),
    readCookieValue(headers.get("cookie"), MARKET_OVERRIDE_COOKIE),
  );
}
