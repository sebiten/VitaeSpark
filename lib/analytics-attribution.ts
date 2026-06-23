const ATTRIBUTION_KEY = "vitaespark_landing_attribution";
const ATTRIBUTION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type LandingAttribution = {
  landing_path?: string;
  cta_label?: string;
  source_type?: "landing" | "blog";
  landing_ts?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
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
      ...getCurrentCampaignParams(),
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

    return { ...parsed, ...getCurrentCampaignParams() };
  } catch {
    return getCurrentCampaignParams();
  }
}

export function getCurrentCampaignParams(): Pick<
  LandingAttribution,
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: sanitizeCampaignParam(params.get("utm_source")),
    utm_medium: sanitizeCampaignParam(params.get("utm_medium")),
    utm_campaign: sanitizeCampaignParam(params.get("utm_campaign")),
    utm_content: sanitizeCampaignParam(params.get("utm_content")),
  };
}

function sanitizeCampaignParam(value: string | null) {
  const clean = value?.trim().slice(0, 120);
  return clean || undefined;
}
