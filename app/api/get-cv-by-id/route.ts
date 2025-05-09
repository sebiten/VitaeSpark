import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("generated_cvs")
    .select("cv_data, template")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
