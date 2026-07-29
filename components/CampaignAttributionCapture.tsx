"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getCurrentCampaignParams,
  setLandingAttribution,
  type LandingAttribution,
} from "@/lib/analytics-attribution";
import { CAMPAIGN_LANDING_VIEW_LABEL } from "@/lib/analytics-event-labels";
import { recordAnalyticsEvent } from "@/lib/analytics-events";

const CAMPAIGN_VIEW_KEY_PREFIX = "vitaespark_campaign_view";

export function CampaignAttributionCapture() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const campaignQuery = searchParams.toString();

  useEffect(() => {
    const campaign = getCurrentCampaignParams();
    if (!hasCampaignParams(campaign)) return;

    const landingPath = pathname || "/";
    const sourceType = getSourceType(landingPath);
    const dedupeKey = buildDedupeKey(landingPath, campaign);

    setLandingAttribution({
      landing_path: landingPath,
      cta_label: CAMPAIGN_LANDING_VIEW_LABEL,
      source_type: sourceType,
    });

    try {
      if (window.sessionStorage.getItem(dedupeKey)) return;
      window.sessionStorage.setItem(dedupeKey, "1");
    } catch {
      // El evento puede registrarse aunque el navegador bloquee sessionStorage.
    }

    recordAnalyticsEvent({
      event_name: "landing_cta_clicked",
      landing_path: landingPath,
      cta_label: CAMPAIGN_LANDING_VIEW_LABEL,
      source_type: sourceType,
      language: landingPath === "/en" || landingPath.startsWith("/en/")
        ? "en"
        : "es",
      ...campaign,
    });
  }, [campaignQuery, pathname]);

  return null;
}

function hasCampaignParams(
  campaign: Pick<
    LandingAttribution,
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
  >,
) {
  return Boolean(
    campaign.utm_source ||
      campaign.utm_medium ||
      campaign.utm_campaign ||
      campaign.utm_content,
  );
}

function getSourceType(pathname: string): "landing" | "blog" | "tool" {
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return "blog";
  if (pathname.startsWith("/herramientas/")) return "tool";
  return "landing";
}

function buildDedupeKey(
  pathname: string,
  campaign: Pick<
    LandingAttribution,
    "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"
  >,
) {
  return [
    CAMPAIGN_VIEW_KEY_PREFIX,
    pathname,
    campaign.utm_source,
    campaign.utm_medium,
    campaign.utm_campaign,
    campaign.utm_content,
  ]
    .filter(Boolean)
    .join(":");
}
