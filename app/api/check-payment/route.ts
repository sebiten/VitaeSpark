import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { payment_id } = await req.json();

  if (!payment_id) {
    return NextResponse.json({ error: "Falta payment_id" }, { status: 400 });
  }

  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN; // ⚡ Token de tu app

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
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error consultando MercadoPago:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
