import { NextRequest, NextResponse } from "next/server";

const flyerPlacements = {
  mostrador: "mostrador",
  reparto: "reparto",
  cartelera: "cartelera",
} as const;

type FlyerPlacement = keyof typeof flyerPlacements;

function isFlyerPlacement(value: string): value is FlyerPlacement {
  return value in flyerPlacements;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ placement: string }> },
) {
  const { placement } = await context.params;
  const target = new URL("/crear", request.url);

  target.searchParams.set("utm_source", "flyer");
  target.searchParams.set("utm_medium", "offline");
  target.searchParams.set("utm_campaign", "ledesma");
  target.searchParams.set(
    "utm_content",
    isFlyerPlacement(placement) ? flyerPlacements[placement] : "general",
  );

  return NextResponse.redirect(target, 307);
}
