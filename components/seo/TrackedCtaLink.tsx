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
  language?: "es" | "en";
  trackingLabel?: string;
  className?: string;
  buttonClassName?: string;
  buttonSize?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
};

export function TrackedCtaLink({
  href,
  label,
  sourcePath,
  sourceType,
  language = "es",
  trackingLabel,
  className,
  buttonClassName,
  buttonSize = "lg",
  showIcon = true,
}: TrackedCtaLinkProps) {
  const ctaLabel = trackingLabel || label;
  const trackedHref = buildTrackedHref({
    href,
    label: ctaLabel,
    sourcePath,
    sourceType,
    language,
  });

  return (
    <Link
      href={trackedHref}
      className={className}
      onClick={() => {
        const intent = new URL(trackedHref, window.location.origin).searchParams.get(
          "intent",
        );
        if (intent) {
          try {
            window.sessionStorage.setItem("vitaespark-create-intent", intent);
          } catch {
            // La atribución sigue funcionando aunque el navegador bloquee storage.
          }
        }
        setLandingAttribution({
          landing_path: sourcePath,
          cta_label: ctaLabel,
          source_type: sourceType,
        });
        track("Landing CTA Clicked", {
          landing_path: sourcePath,
          cta_label: ctaLabel,
          source_type: sourceType,
          language,
        });
        recordAnalyticsEvent({
          event_name: "landing_cta_clicked",
          language,
          landing_path: sourcePath,
          cta_label: ctaLabel,
          source_type: sourceType,
        });
      }}
    >
      <Button
        size={buttonSize}
        className={
          buttonClassName ||
          "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 hover:opacity-90"
        }
      >
        {label}
        {showIcon && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </Link>
  );
}

function buildTrackedHref({
  href,
  label,
  sourcePath,
  sourceType,
  language,
}: TrackedCtaLinkProps & { language: "es" | "en" }) {
  const [pathname = "", query = ""] = href.split("?");
  const params = new URLSearchParams(query);

  params.set("landing_path", sourcePath);
  params.set("source_type", sourceType);
  params.set("cta_label", label);
  params.set("lang", language);

  return `${pathname}?${params.toString()}`;
}
