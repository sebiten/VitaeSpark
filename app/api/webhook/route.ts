import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

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

  // Ignorar eventos que no son pagos
  if (type !== "payment" || !id) {
    return NextResponse.json({ message: "Ignored" }, { status: 200 });
  }

  // 1. Consultar el pago directamente a MercadoPago (nunca confiar en el body)
  const mpRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(String(id))}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!mpRes.ok) {
    console.error("❌ Error consultando MercadoPago:", mpRes.status);
    return NextResponse.json({ error: "MP error" }, { status: 500 });
  }

  const payment = await mpRes.json();

  if (payment.status !== "approved") {
    return NextResponse.json({ message: "Payment not approved" }, { status: 200 });
  }

  // 2. Extraer cv_id y profile_id del metadata (lo pusiste vos al crear la preferencia)
  const cv_id = String(payment.metadata?.cv_id ?? "");
  const profile_id = String(payment.metadata?.profile_id ?? "");

  if (!cv_id || !profile_id) {
    console.error("❌ Metadata incompleto:", payment.metadata);
    return NextResponse.json({ error: "Metadata inválido" }, { status: 400 });
  }

  // 3. Verificar que el CV existe Y pertenece al profile_id del metadata
  //    Esto evita que alguien manipule un cv_id ajeno
  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id")
    .eq("id", cv_id)
    .eq("profile_id", profile_id) // ← cruce clave de seguridad
    .maybeSingle();

  if (!cv) {
    console.error("❌ CV no encontrado o no pertenece al usuario:", { cv_id, profile_id });
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  // 4. Idempotencia: si ya procesamos este pago, no hacer nada
  const { data: existing } = await supabaseAdmin
    .from("payments")
    .select("id")
    .eq("payment_id", payment.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  // 5. Insertar el pago
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

    console.error("❌ Error insertando pago:", insertError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // 6. Marcar el CV como pagado
  const { error: updateError } = await supabaseAdmin
    .from("cvs")
    .update({ status: "paid" })
    .eq("id", cv_id)
    .eq("profile_id", profile_id);

  if (updateError) {
    console.error("❌ Error actualizando CV:", updateError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  await recordAnalyticsEventServer({
    event_name: "payment_completed",
    user_id: profile_id,
    cv_id,
    payment_id: String(payment.id),
    template: payment.metadata?.template,
    language: payment.metadata?.language,
    landing_path: payment.metadata?.landing_path,
    cta_label: payment.metadata?.cta_label,
    source_type: payment.metadata?.source_type,
  });

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
