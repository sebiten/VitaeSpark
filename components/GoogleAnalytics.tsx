"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-SZY8XLM2G1";

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isReady, setIsReady] = useState(false);
  const lastPagePath = useRef<string | null>(null);
  const isExcluded = pathname.startsWith("/abelardo");
  const query = searchParams.toString();

  useEffect(() => {
    if (isExcluded) {
      lastPagePath.current = null;
      return;
    }

    if (!isReady || !window.gtag) return;

    const pagePath = query ? `${pathname}?${query}` : pathname;
    if (lastPagePath.current === pagePath) return;

    lastPagePath.current = pagePath;
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_location: window.location.href,
    });
  }, [isExcluded, isReady, pathname, query]);

  if (isExcluded) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        onReady={() => setIsReady(true)}
      >{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      `}</Script>
    </>
  );
}
