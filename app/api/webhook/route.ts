import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { supabaseAdmin } from "@/utils/supabase/admin";

const MercadoPagoWebhookSchema = z.object({
  type: z.string().optional(),
  data: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = MercadoPagoWebhookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const type = parsed.data.type;
  const id = parsed.data.data?.id;
  if (type !== "payment" || !id) {
    return NextResponse.json({ message: "Ignored" }, { status: 200 });
  }

  const mpRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(String(id))}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!mpRes.ok) {
    console.error("Error consultando Mercado Pago:", mpRes.status);
    return NextResponse.json({ error: "MP error" }, { status: 500 });
  }

  const payment = await mpRes.json();
  if (payment.status !== "approved") {
    return NextResponse.json({ message: "Payment not approved" }, { status: 200 });
  }

  const cv_id = String(payment.metadata?.cv_id ?? "");
  const profile_id = String(payment.metadata?.profile_id ?? "");

  if (!cv_id || !profile_id) {
    console.error("Metadata incompleta:", payment.metadata);
    return NextResponse.json({ error: "Metadata invalida" }, { status: 400 });
  }

  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id")
    .eq("id", cv_id)
    .eq("profile_id", profile_id)
    .maybeSingle();

  if (!cv) {
    console.error("CV no encontrado o no pertenece al usuario:", {
      cv_id,
      profile_id,
    });
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  const { data: existing } = await supabaseAdmin
    .from("payments")
    .select("id")
    .eq("payment_id", payment.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  const { error: insertError } = await supabaseAdmin.from("payments").insert({
    user_id: profile_id,
    cv_id,
    payment_id: payment.id,
    amount: payment.transaction_amount,
    status: payment.status,
    payer_email: payment.payer.email,
    payment_type: payment.payment_type_id,
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    console.error("Error insertando pago:", insertError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("cvs")
    .update({ status: "paid" })
    .eq("id", cv_id)
    .eq("profile_id", profile_id);

  if (updateError) {
    console.error("Error actualizando CV:", updateError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  await recordAnalyticsEventServer({
    event_name: "payment_completed",
    user_id: profile_id,
    cv_id,
    payment_id: String(payment.id),
    template: payment.metadata?.template,
    language: payment.metadata?.language,
    payment_provider: payment.metadata?.payment_provider ?? "mercado_pago",
    landing_path: payment.metadata?.landing_path,
    cta_label: payment.metadata?.cta_label,
    source_type: payment.metadata?.source_type,
  });

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
