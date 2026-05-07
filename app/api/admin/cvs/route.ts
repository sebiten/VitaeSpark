import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

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
  const search = (url.searchParams.get("search") || "").trim().toLowerCase();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabaseAdmin
    .from("cvs")
    .select("id, profile_id, cv_data, created_at, template, status", {
      count: "exact",
    })
    .order("created_at", { ascending: false });

  if (template !== "all") {
    query = query.eq("template", template);
  }

  if (!search) {
    query = query.range(from, to);
  } else {
    query = query.limit(250);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Error cargando CVs de admin:", error);
    return NextResponse.json({ error: "Error cargando CVs" }, { status: 500 });
  }

  const filtered = search
    ? (data ?? []).filter((cv) => {
        const cvData = cv.cv_data as Record<string, unknown>;
        return [cvData?.nombre, cvData?.puesto, cvData?.titulo, cv.template]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(search));
      })
    : data ?? [];

  const paginated = search ? filtered.slice(from, from + pageSize) : filtered;

  return NextResponse.json({
    cvs: paginated,
    total: search ? filtered.length : count ?? paginated.length,
    page,
    pageSize,
  });
}
