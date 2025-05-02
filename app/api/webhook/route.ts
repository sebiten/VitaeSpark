import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  // (opcional) Validar con clave secreta si la configuraste en MercadoPago
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  const signature = req.headers.get("x-signature");
  if (secret && signature !== secret) {
    console.error("❌ Webhook rechazado: clave inválida");
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await req.json();

  const type = body.type;
  const id = body.data?.id;

  if (type !== "payment" || !id) {
    console.log("ℹ️ Webhook ignorado:", body);
    return NextResponse.json({ message: "Ignored" }, { status: 200 });
  }

  // Consultar a MP por detalles del pago
  const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
    },
  });

  const payment = await mpRes.json();

  if (payment.status === "approved") {
    const supabase = await createClient();

    // Reintentar hasta encontrar el CV en DB (por si aún no fue insertado)
    let cv = null;
    let retries = 10;

    while (retries > 0 && !cv) {
      const { data, error } = await supabase
        .from("cvs")
        .select("profile_id")
        .eq("id", payment.metadata.cv_id)
        .maybeSingle();

      if (data) {
        cv = data;
        break;
      }

      console.log(
        `⏳ CV aún no disponible. Reintentando... (${10 - retries + 1}/10)`
      );
      await new Promise((r) => setTimeout(r, 1000)); // esperar 1 segundo
      retries--;
    }

    if (!cv || cv.profile_id !== payment.metadata.profile_id) {
      console.error("❌ Mismatch entre metadata y CV:", {
        cv,
        metadata: payment.metadata,
      });
      return NextResponse.json({ error: "Metadata mismatch" }, { status: 400 });
    }

    // Insertar pago si no existía aún
    const { data: existing } = await supabase
      .from("payments")
      .select("id")
      .eq("payment_id", payment.id)
      .maybeSingle();

    if (!existing) {
      await supabase.from("payments").insert({
        cv_id: payment.metadata.cv_id,
        payment_id: payment.id,
        amount: payment.transaction_amount,
        status: payment.status,
        payer_email: payment.payer.email,
        payment_type: payment.payment_type_id,
      });

      await supabase
        .from("cvs")
        .update({ status: "paid" })
        .eq("id", payment.metadata.cv_id);
    }
  }

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
