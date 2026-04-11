import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const type = body.type;
  const id = body.data?.id;

  // Ignorar eventos que no son pagos
  if (type !== "payment" || !id) {
    return NextResponse.json({ message: "Ignored" }, { status: 200 });
  }

  // 1. Consultar el pago directamente a MercadoPago (nunca confiar en el body)
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });

  if (!mpRes.ok) {
    console.error("❌ Error consultando MercadoPago:", mpRes.status);
    return NextResponse.json({ error: "MP error" }, { status: 500 });
  }

  const payment = await mpRes.json();

  if (payment.status !== "approved") {
    return NextResponse.json({ message: "Payment not approved" }, { status: 200 });
  }

  // 2. Extraer cv_id y profile_id del metadata (lo pusiste vos al crear la preferencia)
  const cv_id = payment.metadata?.cv_id;
  const profile_id = payment.metadata?.profile_id;

  if (!cv_id || !profile_id) {
    console.error("❌ Metadata incompleto:", payment.metadata);
    return NextResponse.json({ error: "Metadata inválido" }, { status: 400 });
  }

  const supabase = await createClient();

  // 3. Verificar que el CV existe Y pertenece al profile_id del metadata
  //    Esto evita que alguien manipule un cv_id ajeno
  const { data: cv } = await supabase
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
  const { data: existing } = await supabase
    .from("payments")
    .select("id")
    .eq("payment_id", payment.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  // 5. Insertar el pago
  const { error: insertError } = await supabase.from("payments").insert({
    user_id: profile_id,
    cv_id,
    payment_id: payment.id,
    amount: payment.transaction_amount,
    status: payment.status,
    payer_email: payment.payer.email,
    payment_type: payment.payment_type_id,
  });

  if (insertError) {
    console.error("❌ Error insertando pago:", insertError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  // 6. Marcar el CV como pagado
  const { error: updateError } = await supabase
    .from("cvs")
    .update({ status: "paid" })
    .eq("id", cv_id);

  if (updateError) {
    console.error("❌ Error actualizando CV:", updateError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}