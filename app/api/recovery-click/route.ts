import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { verifyRecoveryLink } from "@/lib/recovery-token";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { getRequestCountry } from "@/lib/market";

const RecoveryClickSchema = z.object({
  cvId: z.string().uuid(),
  reminderType: z.enum(["1h", "24h", "72h"]),
  signature: z.string().regex(/^[a-f0-9]{64}$/i),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cvId = url.searchParams.get("cv_id");
  const reminderType = url.searchParams.get("type");
  const signature = url.searchParams.get("signature");
  const next = url.searchParams.get("next") || "/perfil";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  const siteOrigin = new URL(siteUrl).origin;
  let redirectUrl = new URL(next, siteUrl);

  if (redirectUrl.origin !== siteOrigin) {
    redirectUrl = new URL("/perfil", siteUrl);
  }

  const recovery = RecoveryClickSchema.safeParse({
    cvId,
    reminderType,
    signature,
  });

  if (
    recovery.success &&
    verifyRecoveryLink(
      recovery.data.cvId,
      recovery.data.reminderType,
      recovery.data.signature,
    )
  ) {
    await supabaseAdmin
      .from("cv_recovery_emails")
      .update({ clicked_at: new Date().toISOString() })
      .eq("cv_id", recovery.data.cvId)
      .eq("reminder_type", recovery.data.reminderType);

    await recordAnalyticsEventServer({
      event_name: "recovery_email_clicked",
      cv_id: recovery.data.cvId,
      landing_path: redirectUrl.pathname,
      cta_label: `pending_cv_email_${recovery.data.reminderType}`,
      source_type: "landing",
      utm_source: "recovery_email",
      utm_medium: "email",
      utm_campaign: "pending_cv",
      utm_content: recovery.data.reminderType,
      country_code: getRequestCountry(req.headers),
    });
  }

  return NextResponse.redirect(redirectUrl);
}
