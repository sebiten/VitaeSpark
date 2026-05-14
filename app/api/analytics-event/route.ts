import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

const AnalyticsEventSchema = z.object({
  event_name: z.enum([
    "landing_cta_clicked",
    "template_selected",
    "cv_generated",
    "checkout_viewed",
    "payment_started",
    "payment_completed",
  ]),
  landing_path: z.string().trim().max(240).optional(),
  cta_label: z.string().trim().max(120).optional(),
  source_type: z.enum(["landing", "blog"]).optional(),
  language: z.enum(["es", "en"]).optional(),
  template: z.string().trim().max(80).optional(),
  cv_id: z.string().uuid().optional(),
  payment_id: z.string().trim().max(160).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalido" }, { status: 400 });
  }

  const parsed = AnalyticsEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Evento invalido" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await recordAnalyticsEventServer({
    ...parsed.data,
    user_id: user?.id ?? null,
  });

  return NextResponse.json({ ok: true });
}
