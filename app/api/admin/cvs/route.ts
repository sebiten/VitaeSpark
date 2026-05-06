import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

export const runtime = "nodejs";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("isadmin")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.isadmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("cvs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error cargando CVs de admin:", error);
    return NextResponse.json({ error: "Error cargando CVs" }, { status: 500 });
  }

  return NextResponse.json({ cvs: data ?? [] });
}

