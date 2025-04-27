// app/auth/callback/route.ts
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // redirige al usuario a la página que querías
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("Error exchanging code:", error.message);
  }

  // Fallback: fallo en el callback
  return NextResponse.redirect(`${origin}/auth/error`);
}
