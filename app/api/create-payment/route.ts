// app/api/create-payment/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, price, quantity } = await request.json();
    if (!title || !price || !quantity) {
      return NextResponse.json(
        { error: "Faltan datos requeridos (title, price, quantity)" },
        { status: 400 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    // Construimos el body
    const body: Record<string, any> = {
      items: [
        {
          id: "cv-premium",
          title,
          quantity: Number(quantity),
          unit_price: Number(price),
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${siteUrl}/crear?status=success`,
        failure: `${siteUrl}/crear?status=failure`,
        pending: `${siteUrl}/crear?status=pending`,
      },
      auto_return: "approved", 
      statement_descriptor: "VitaeSpark CV",
      payment_methods: {
        excluded_payment_types: [{ id: "ticket" }],
        installments: 3,
      },
      binary_mode: true,
    };

    // Solo en producción (https) habilitamos auto_return
    if (siteUrl.startsWith("https://")) {
      body.auto_return = "approved";
    }

    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!mpResponse.ok) {
      const errorData = await mpResponse.json().catch(() => ({
        message: "Error desconocido",
      }));
      console.error("Error de Mercado Pago:", errorData);
      return NextResponse.json(
        {
          error: `Error al comunicarse con Mercado Pago: ${JSON.stringify(
            errorData
          )}`,
        },
        { status: mpResponse.status }
      );
    }

    const data = await mpResponse.json();
    return NextResponse.json({ preferenceId: data.id });
  } catch (e) {
    console.error("Error al crear preferencia de pago:", e);
    return NextResponse.json(
      { error: "Error interno al crear la preferencia de pago" },
      { status: 500 }
    );
  }
}
