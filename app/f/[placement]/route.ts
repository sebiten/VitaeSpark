import { after, NextRequest, NextResponse } from "next/server";
import { FLYER_QR_SCAN_LABEL } from "@/lib/analytics-event-labels";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

const flyerPlacements = {
  mostrador: "mostrador",
  reparto: "reparto",
  cartelera: "cartelera",
} as const;

type FlyerPlacement = keyof typeof flyerPlacements;

const VISIT_COOKIE_MAX_AGE = 24 * 60 * 60;

function isFlyerPlacement(value: string): value is FlyerPlacement {
  return value in flyerPlacements;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ placement: string }> },
) {
  const { placement } = await context.params;
  const normalizedPlacement = isFlyerPlacement(placement)
    ? flyerPlacements[placement]
    : "general";
  const visitCookieName = `vitaespark_flyer_${normalizedPlacement}`;
  const previousVisit = request.cookies.get(visitCookieName)?.value;
  const visitId = previousVisit || crypto.randomUUID();
  const target = new URL("/crear", request.url);

  target.searchParams.set("utm_source", "flyer");
  target.searchParams.set("utm_medium", "offline");
  target.searchParams.set("utm_campaign", "ledesma");
  target.searchParams.set("utm_content", normalizedPlacement);

  if (!previousVisit) {
    const countryCode = request.headers.get("x-vercel-ip-country");

    after(() =>
      recordAnalyticsEventServer({
        event_name: "landing_cta_clicked",
        landing_path: "/crear",
        cta_label: FLYER_QR_SCAN_LABEL,
        source_type: "landing",
        language: "es",
        utm_source: "flyer",
        utm_medium: "offline",
        utm_campaign: "ledesma",
        utm_content: normalizedPlacement,
        country_code: countryCode,
        session_id: visitId,
      }),
    );
  }

  const response = NextResponse.redirect(target, 307);
  response.cookies.set(visitCookieName, visitId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: VISIT_COOKIE_MAX_AGE,
    path: "/f",
  });

  return response;
}
