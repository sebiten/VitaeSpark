import { fixedWindow, shield } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  analyticsEventRequiresUser,
  CLIENT_ANALYTICS_EVENTS,
} from "@/lib/analytics-event-policy";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { aj } from "@/lib/arcjet";
import { getRequestCountry } from "@/lib/market";
import { createClient } from "@/utils/supabase/server";

const AnalyticsEventSchema = z.object({
  event_name: z.enum(CLIENT_ANALYTICS_EVENTS),
  landing_path: z.string().trim().max(240).optional(),
  cta_label: z.string().trim().max(120).optional(),
  source_type: z.enum(["landing", "blog", "tool"]).optional(),
  language: z.enum(["es", "en"]).optional(),
  payment_provider: z.enum(["mercado_pago", "paypal"]).optional(),
  template: z.string().trim().max(80).optional(),
  cv_id: z.string().uuid().optional(),
  utm_source: z.string().trim().max(120).optional(),
  utm_medium: z.string().trim().max(120).optional(),
  utm_campaign: z.string().trim().max(120).optional(),
  utm_content: z.string().trim().max(120).optional(),
  session_id: z.string().uuid().optional(),
  is_guest: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const decision = await aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(fixedWindow({ mode: "LIVE", max: 120, window: "60s" }))
    .protect(req);

  if (decision.isDenied()) {
    return NextResponse.json({ error: "Too many events" }, { status: 429 });
  }

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

  let userId: string | null = null;

  if (analyticsEventRequiresUser(parsed.data.event_name)) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    userId = user.id;

    if (
      parsed.data.event_name === "download_completed" &&
      !parsed.data.cv_id
    ) {
      return NextResponse.json({ error: "CV requerido" }, { status: 400 });
    }

    if (parsed.data.cv_id) {
      const { data: cv } = await supabase
        .from("cvs")
        .select("id, status")
        .eq("id", parsed.data.cv_id)
        .eq("profile_id", user.id)
        .maybeSingle();

      if (!cv) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (
        parsed.data.event_name === "download_completed" &&
        cv.status !== "paid"
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }
  }

  await recordAnalyticsEventServer({
    ...parsed.data,
    user_id: userId,
    country_code: getRequestCountry(req.headers),
  });

  return NextResponse.json({ ok: true });
}
