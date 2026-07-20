import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
import {
  DETECTED_COUNTRY_COOKIE,
  getDetectedCountry,
} from "./lib/market";

export default async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const { pathname } = request.nextUrl;

  const canonicalRedirects: Record<string, string> = {
    "/terms": "/terminos",
    "/privacy": "/privacidad",
    "/refund": "/reembolsos",
    "/hacer-cv-online": "/crear-cv-online",
    "/crear-curriculum-vitae": "/crear-cv-online",
  };

  if (pathname.startsWith("/api/webhook")) {
    return NextResponse.next();
  }

  if (canonicalRedirects[pathname]) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = canonicalRedirects[pathname];
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
