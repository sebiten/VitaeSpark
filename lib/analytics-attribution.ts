import { getAnalyticsSessionId } from "./analytics-session";

const ATTRIBUTION_KEY = "vitaespark_landing_attribution";
const ATTRIBUTION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type LandingAttribution = {
  landing_path?: string;
  cta_label?: string;
  source_type?: "landing" | "blog" | "tool";
  landing_ts?: number;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  session_id?: string;
};

export function setLandingAttribution({
  landing_path,
  cta_label,
  source_type,
}: Pick<LandingAttribution, "landing_path" | "cta_label" | "source_type">) {
  if (typeof window === "undefined") return;

  const existingCampaign = readStoredCampaignParams();

  window.localStorage.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify({
      landing_path,
      cta_label,
      source_type,
      ...existingCampaign,
      ...getCurrentCampaignParams(),
      landing_ts: Date.now(),
    })
  );
}

export function getLandingAttribution(): LandingAttribution {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) {
      return {
        ...getCurrentCampaignParams(),
        session_id: getAnalyticsSessionId(),
      };
    }

    const parsed = JSON.parse(raw) as LandingAttribution;
    if (
      parsed.landing_ts &&
      Date.now() - parsed.landing_ts > ATTRIBUTION_TTL_MS
    ) {
      window.localStorage.removeItem(ATTRIBUTION_KEY);
      return { session_id: getAnalyticsSessionId() };
    }

    return {
      ...parsed,
      ...getCurrentCampaignParams(),
      session_id: getAnalyticsSessionId(),
    };
  } catch {
    return {
      ...getCurrentCampaignParams(),
      session_id: getAnalyticsSessionId(),
    };
  }
}

export function getCurrentCampaignParams(): Pick<
  LandingAttribution,
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const campaignParams: Pick<
    LandingAttribution,
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
  > = {};

  const utmSource = sanitizeCampaignParam(params.get("utm_source"));
  const utmMedium = sanitizeCampaignParam(params.get("utm_medium"));
  const utmCampaign = sanitizeCampaignParam(params.get("utm_campaign"));
  const utmContent = sanitizeCampaignParam(params.get("utm_content"));

  if (utmSource) campaignParams.utm_source = utmSource;
  if (utmMedium) campaignParams.utm_medium = utmMedium;
  if (utmCampaign) campaignParams.utm_campaign = utmCampaign;
  if (utmContent) campaignParams.utm_content = utmContent;

  return campaignParams;
}

function sanitizeCampaignParam(value: string | null) {
  const clean = value?.trim().slice(0, 120);
  return clean || undefined;
}

function readStoredCampaignParams(): Pick<
  LandingAttribution,
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
> {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as LandingAttribution;
    if (
      parsed.landing_ts &&
      Date.now() - parsed.landing_ts > ATTRIBUTION_TTL_MS
    ) {
      return {};
    }
    return {
      utm_source: parsed.utm_source,
      utm_medium: parsed.utm_medium,
      utm_campaign: parsed.utm_campaign,
      utm_content: parsed.utm_content,
    };
  } catch {
    return {};
  }
}
