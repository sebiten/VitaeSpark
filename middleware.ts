import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const { pathname } = request.nextUrl;

  if (hostname === "www.vitaespark.com") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.hostname = "vitaespark.com";
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (pathname.startsWith("/api/webhook")) {
    return NextResponse.next(); // no aplicar middlewares ni redirecciones
  }

  return await updateSession(request);
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
