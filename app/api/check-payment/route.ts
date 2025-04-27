import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🔥 Conexión a Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Usa la service key aquí (IMPORTANTE: solo en server side)
);

export async function POST(req: NextRequest) {
  const { payment_id } = await req.json();

  if (!payment_id) {
    return NextResponse.json({ error: "Falta payment_id" }, { status: 400 });
  }

  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN; // Tu token de MP

    const response = await fetch(`https://api.mercadopago.com/v1/payments/${payment_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Error respuesta MercadoPago:", text);
      return NextResponse.json({ error: "Error verificando pago" }, { status: 500 });
    }

    const paymentData = await response.json();

    if (paymentData.status === "approved") {
      // 💾 Guardar en Supabase
      const { error } = await supabase.from("payments").insert([
        {
          payment_id: paymentData.id.toString(),
          payer_email: paymentData.payer?.email ?? null,
          amount: Math.round(paymentData.transaction_amount * 100), // en centavos
          status: paymentData.status,
          payment_type: paymentData.payment_type_id,
        },
      ]);

      if (error) {
        console.error("Error guardando en Supabase:", error);
        return NextResponse.json({ error: "Error guardando en base de datos" }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error consultando MercadoPago:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
