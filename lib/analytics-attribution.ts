const ATTRIBUTION_KEY = "vitaespark_landing_attribution";
const ATTRIBUTION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type LandingAttribution = {
  landing_path?: string;
  cta_label?: string;
  source_type?: "landing" | "blog";
  landing_ts?: number;
};

export function setLandingAttribution({
  landing_path,
  cta_label,
  source_type,
}: Omit<LandingAttribution, "landing_ts">) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify({
      landing_path,
      cta_label,
      source_type,
      landing_ts: Date.now(),
    })
  );
}

export function getLandingAttribution(): LandingAttribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as LandingAttribution;
    if (
      parsed.landing_ts &&
      Date.now() - parsed.landing_ts > ATTRIBUTION_TTL_MS
    ) {
      window.localStorage.removeItem(ATTRIBUTION_KEY);
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}
