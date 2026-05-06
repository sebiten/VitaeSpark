// /app/api/create-payment/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import { CreatePaymentSchema } from "@/lib/schemas/cv";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido en la solicitud" },
      { status: 400 }
    );
  }

  const parsed = CreatePaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { cvData, template } = parsed.data;

  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile_id = user.data.user.id;
  const email = user.data.user.email;

  if (!profile_id || !email) {
    return NextResponse.json(
      { error: "No se pudo identificar al usuario" },
      { status: 400 }
    );
  }

  // Creamos el CV en estado temporal
  const { data: cv, error: cvError } = await supabase
    .from("cvs")
    .insert({
      profile_id,
      cv_data: cvData,
      foto_url: cvData.foto_url,
      template,
      status: "pending",
    })
    .select()
    .single();

  if (cvError) {
    console.error("Error insertando CV:", cvError);
    return NextResponse.json({ error: "Error creando CV" }, { status: 500 });
  }
  // creamos preferencia de mp y le pasamos el cv_id y el profile id, importante para verificar via webhook
  const mpRes = await fetch(
    "https://api.mercadopago.com/checkout/preferences",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify({
        items: [
          {
            id: `cv-${cv.id}`, // ✅ recomendado
            title: "CV optimizado con IA",
            description:
              "Currículum profesional con diseño moderno y textos persuasivos",
            category_id: "services", // ✅ recomendado
            quantity: 1,
            unit_price: 2500,
          },
        ],
        payer: {
          email: email, // ✅ obligatorio
        },
        external_reference: `cv_${cv.id}`, // ✅ obligatorio
        notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${cv.id}`,
          failure: `${process.env.NEXT_PUBLIC_SITE_URL}`,
          pending: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        },
        auto_return: "approved",
        metadata: {
          cv_id: cv.id,
          profile_id,
        },
        customization: {
          visual: {
            showExternalReference: true,
          },
        },
      }),
    }
  );

  const mpJson = await mpRes.json();

  if (!mpRes.ok || !mpJson.init_point) {
    console.error("Error creando preferencia de Mercado Pago:", mpJson);
    return NextResponse.json(
      { error: "No se pudo generar link de pago" },
      { status: 500 }
    );
  }

  return NextResponse.json({ init_point: mpJson.init_point });
}
