import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

const FeedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(8).max(600),
  can_use_anonymously: z.boolean().default(false),
  cv_id: z.string().uuid().optional(),
  source: z.string().trim().max(80).optional(),
});

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  const parsed = FeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Feedback invalido", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (parsed.data.cv_id) {
    const { data: cv } = await supabaseAdmin
      .from("cvs")
      .select("id")
      .eq("id", parsed.data.cv_id)
      .eq("profile_id", user.id)
      .eq("status", "paid")
      .maybeSingle();

    if (!cv) {
      return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
    }
  }

  const { error } = await supabaseAdmin.from("feedback").insert({
    user_id: user.id,
    rating: parsed.data.rating,
    message: parsed.data.message,
    can_use_anonymously: parsed.data.can_use_anonymously,
    cv_id: parsed.data.cv_id ?? null,
    source: parsed.data.source ?? "profile_success",
  });

  if (error) {
    console.error("Error guardando feedback:", error);
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
  }

  await recordAnalyticsEventServer({
    event_name: "feedback_submitted",
    user_id: user.id,
    cv_id: parsed.data.cv_id,
    cta_label: parsed.data.can_use_anonymously
      ? "feedback_public_anonymous"
      : "feedback_private",
  });

  return NextResponse.json({ ok: true });
}
