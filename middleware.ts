import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import {
  DETECTED_COUNTRY_COOKIE,
  getDetectedCountry,
} from "./lib/market";
import { CANONICAL_REDIRECTS } from "./lib/canonical-redirects";

export default async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/webhook")) {
    return NextResponse.next();
  }

  if (CANONICAL_REDIRECTS[pathname]) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = CANONICAL_REDIRECTS[pathname];
    return NextResponse.redirect(redirectUrl, 301);
  }

  if (hostname === "www.vitaespark.com") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.hostname = "vitaespark.com";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const needsSessionRefresh =
    pathname.startsWith("/perfil") ||
    pathname.startsWith("/abelardo") ||
    pathname.startsWith("/crear") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/login");

  if (needsSessionRefresh) {
    return withDetectedCountry(request, await updateSession(request));
  }

  return withDetectedCountry(request, NextResponse.next());
}

function withDetectedCountry(
  request: NextRequest,
  response: NextResponse,
) {
  const countryCode = getDetectedCountry(request.headers);
  if (!countryCode || request.cookies.get(DETECTED_COUNTRY_COOKIE)?.value === countryCode) {
    return response;
  }

  response.cookies.set(DETECTED_COUNTRY_COOKIE, countryCode, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|favicons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)",
  ],
};
