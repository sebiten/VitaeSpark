import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { loadAdminCvs } from "@/lib/admin-cvs";

export const runtime = "nodejs";

export async function GET(req: Request) {
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

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const pageSize = Math.min(
    48,
    Math.max(6, Number(url.searchParams.get("pageSize")) || 12)
  );
  const template = url.searchParams.get("template") || "all";
  const status = url.searchParams.get("status") || "all";
  const search = url.searchParams.get("search") || "";

  try {
    const result = await loadAdminCvs({
      page,
      pageSize,
      template,
      status,
      search,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error cargando CVs de admin:", error);
    return NextResponse.json({ error: "Error cargando CVs" }, { status: 500 });
  }
}
