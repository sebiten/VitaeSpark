"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordAnalyticsEvent } from "@/lib/analytics-events";
import { isCommercialPath } from "@/lib/analytics-pages";

export function FunnelPageCapture() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!pathname || lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (pathname === "/crear") {
      recordAnalyticsEvent({ event_name: "creator_entered", stage: "creator", language: new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "es" });
    } else if (isCommercialPath(pathname)) {
      recordAnalyticsEvent({ event_name: "landing_viewed", stage: "landing", landing_path: pathname, source_type: "landing", cta_label: undefined, language: pathname === "/resume-ready" ? "en" : "es" });
    }
  }, [pathname]);
  return null;
}
