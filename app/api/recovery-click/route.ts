import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { supabaseAdmin } from "@/utils/supabase/admin";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cvId = url.searchParams.get("cv_id");
  const reminderType = url.searchParams.get("type");
  const next = url.searchParams.get("next") || "/perfil";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  const siteOrigin = new URL(siteUrl).origin;
  let redirectUrl = new URL(next, siteUrl);

  if (redirectUrl.origin !== siteOrigin) {
    redirectUrl = new URL("/perfil", siteUrl);
  }

  if (cvId && reminderType) {
    await supabaseAdmin
      .from("cv_recovery_emails")
      .update({ clicked_at: new Date().toISOString() })
      .eq("cv_id", cvId)
      .eq("reminder_type", reminderType);

    await recordAnalyticsEventServer({
      event_name: "recovery_email_clicked",
      cv_id: cvId,
      landing_path: redirectUrl.pathname,
      cta_label: `pending_cv_email_${reminderType}`,
      source_type: "landing",
      utm_source: "recovery_email",
      utm_medium: "email",
      utm_campaign: "pending_cv",
      utm_content: reminderType,
    });
  }

  return NextResponse.redirect(redirectUrl);
}
