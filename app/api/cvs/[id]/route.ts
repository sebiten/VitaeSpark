import { NextResponse } from "next/server";
import { z } from "zod";
import { CVSchema, TemplateSchema } from "@/lib/schemas/cv";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const UpdateSavedCVSchema = z.object({
  cvData: CVSchema,
  template: TemplateSchema,
});

async function getAuthenticatedUserId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

export async function GET(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: cv, error } = await supabaseAdmin
    .from("cvs")
    .select("id, cv_data, template, status")
    .eq("id", id)
    .eq("profile_id", userId)
    .eq("status", "paid")
    .single();

  if (error || !cv) {
    return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ cv });
}

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON invalido en la solicitud" },
      { status: 400 },
    );
  }

  const parsed = UpdateSavedCVSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos invalidos", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { data: existingCv, error: existingError } = await supabaseAdmin
    .from("cvs")
    .select("id")
    .eq("id", id)
    .eq("profile_id", userId)
    .eq("status", "paid")
    .single();

  if (existingError || !existingCv) {
    return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
  }

  const { cvData, template } = parsed.data;
  const { data: updatedCv, error: updateError } = await supabaseAdmin
    .from("cvs")
    .update({
      cv_data: cvData,
      foto_url: cvData.foto_url ?? null,
      template,
    })
    .eq("id", id)
    .eq("profile_id", userId)
    .eq("status", "paid")
    .select("id, cv_data, template, status")
    .single();

  if (updateError || !updatedCv) {
    console.error("Error actualizando CV editable:", updateError);
    return NextResponse.json(
      { error: "No se pudo guardar el CV" },
      { status: 500 },
    );
  }

  return NextResponse.json({ cv: updatedCv });
}
