import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { capturePayPalOrder } from "@/lib/paypal";
import { PRICING } from "@/lib/pricing";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

type PayPalCaptureResponse = {
  id?: string;
  status?: string;
  payer?: {
    email_address?: string | null;
  };
  purchase_units?: Array<{
    reference_id?: string;
    custom_id?: string;
    payments?: {
      captures?: Array<{
        id?: string;
        status?: string;
        amount?: {
          value?: string;
          currency_code?: string;
        };
        custom_id?: string;
      }>;
    };
  }>;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderId = url.searchParams.get("token");
  const cvId = url.searchParams.get("cv_id");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";

  if (!orderId || !cvId) {
    return NextResponse.redirect(new URL("/perfil?paypal=missing", siteUrl));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", siteUrl));
  }

  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id, status, template")
    .eq("id", cvId)
    .eq("profile_id", user.id)
    .maybeSingle();

  if (!cv) {
    return NextResponse.redirect(new URL("/perfil?paypal=cv_not_found", siteUrl));
  }

  if (cv.status === "paid") {
    return NextResponse.redirect(
      new URL(`/perfil?cv_id=${cv.id}&method=paypal`, siteUrl),
    );
  }

  try {
    const capturedOrder = (await capturePayPalOrder(
      orderId,
    )) as PayPalCaptureResponse;
    const purchaseUnit = capturedOrder.purchase_units?.[0];
    const capture = purchaseUnit?.payments?.captures?.[0];
    const referenceCvId =
      purchaseUnit?.custom_id ||
      capture?.custom_id ||
      purchaseUnit?.reference_id?.replace(/^cv_/, "");

    if (referenceCvId !== cv.id || capture?.status !== "COMPLETED") {
      console.error("PayPal capture invalida:", {
        orderId,
        cvId: cv.id,
        referenceCvId,
        status: capture?.status,
      });

      return NextResponse.redirect(
        new URL(`/perfil?cv_id=${cv.id}&paypal=not_completed`, siteUrl),
      );
    }

    const paymentId = capture.id || capturedOrder.id || orderId;
    const amount = Number(capture.amount?.value || PRICING.paypal.value);

    const { error: insertError } = await supabaseAdmin.from("payments").insert({
      cv_id: cv.id,
      payment_id: paymentId,
      amount,
      status: "approved",
      payer_email: capturedOrder.payer?.email_address ?? user.email ?? null,
      payment_type: "paypal",
      payment_method: "paypal",
      user_id: user.id,
    });

    if (insertError && insertError.code !== "23505") {
      console.error("Error insertando pago PayPal:", insertError);
      return NextResponse.redirect(
        new URL(`/perfil?cv_id=${cv.id}&paypal=db_error`, siteUrl),
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("cvs")
      .update({ status: "paid" })
      .eq("id", cv.id)
      .eq("profile_id", user.id);

    if (updateError) {
      console.error("Error actualizando CV PayPal:", updateError);
      return NextResponse.redirect(
        new URL(`/perfil?cv_id=${cv.id}&paypal=db_error`, siteUrl),
      );
    }

    const { data: startedEvent } = await supabaseAdmin
      .from("analytics_events")
      .select(
        "landing_path, cta_label, source_type, language, payment_provider, template, utm_source, utm_medium, utm_campaign, utm_content, country_code, session_id",
      )
      .eq("event_name", "payment_started")
      .eq("cv_id", cv.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    await recordAnalyticsEventServer({
      event_name: "payment_completed",
      user_id: user.id,
      cv_id: cv.id,
      payment_id: paymentId,
      template: startedEvent?.template ?? cv.template,
      language: startedEvent?.language,
      payment_provider: "paypal",
      country_code: startedEvent?.country_code,
      session_id: startedEvent?.session_id ?? undefined,
      landing_path: startedEvent?.landing_path,
      cta_label: startedEvent?.cta_label,
      source_type: startedEvent?.source_type,
      utm_source: startedEvent?.utm_source,
      utm_medium: startedEvent?.utm_medium,
      utm_campaign: startedEvent?.utm_campaign,
      utm_content: startedEvent?.utm_content,
    });

    return NextResponse.redirect(
      new URL(`/perfil?cv_id=${cv.id}&method=paypal`, siteUrl),
    );
  } catch (error) {
    console.error("Error capturando PayPal:", error);
    return NextResponse.redirect(
      new URL(`/perfil?cv_id=${cv.id}&paypal=capture_error`, siteUrl),
    );
  }
}
