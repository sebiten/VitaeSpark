import { NextResponse } from "next/server";
import { z } from "zod";
import { ensurePurchaseAccessForCv } from "@/lib/purchase-access";
import { createClient } from "@/utils/supabase/server";

const CvIdSchema = z.string().uuid();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cvId = CvIdSchema.safeParse(url.searchParams.get("cv_id"));
  if (!cvId.success) {
    return NextResponse.json({ error: "CV inválido" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sesión no disponible" }, { status: 401 });
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .select("id, status, cv_data, template, created_at")
    .eq("id", cvId.data)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (error || !cv) {
    return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
  }

  let accessSent = false;
  if (cv.status === "paid" && user.is_anonymous === true) {
    const access = await ensurePurchaseAccessForCv(cv.id).catch((accessError) => {
      console.error("No se pudo preparar el acceso postcompra:", accessError);
      return null;
    });
    accessSent = Boolean(access?.ok);
  }

  return NextResponse.json(
    {
      cv,
      isGuest: user.is_anonymous === true,
      accessSent,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
