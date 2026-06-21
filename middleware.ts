import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

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
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|favicons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)",
  ],
};
