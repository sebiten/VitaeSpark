"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setLandingAttribution } from "@/lib/analytics-attribution";
import { recordAnalyticsEvent } from "@/lib/analytics-events";

type TrackedCtaLinkProps = {
  href: string;
  label: string;
  sourcePath: string;
  sourceType: "landing" | "blog";
};

export function TrackedCtaLink({
  href,
  label,
  sourcePath,
  sourceType,
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        setLandingAttribution({
          landing_path: sourcePath,
          cta_label: label,
          source_type: sourceType,
        });
        track("Landing CTA Clicked", {
          landing_path: sourcePath,
          cta_label: label,
          source_type: sourceType,
        });
        recordAnalyticsEvent({
          event_name: "landing_cta_clicked",
          landing_path: sourcePath,
          cta_label: label,
          source_type: sourceType,
        });
      }}
    >
      <Button
        size="lg"
        className="bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:opacity-90"
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
}
