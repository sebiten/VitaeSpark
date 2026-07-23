import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("feedback")
    .select("rating, message, source, created_at")
    .eq("can_use_anonymously", true)
    .gte("rating", 4)
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Error cargando feedback publico:", error);
    return NextResponse.json(
      { feedback: [] },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  }

  return NextResponse.json(
    {
      feedback: (data ?? []).filter((item) => item.message),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    },
  );
}
