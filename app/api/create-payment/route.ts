// /app/api/create-payment/route.ts
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { cvData, template } = body;

  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile_id = user.data.user.id;

  console.log("profile_id", profile_id);
  console.log("user", user.data.user.user_metadata);

  if (!profile_id) {
    return NextResponse.json({ error: "No profile_id found" }, { status: 400 });
  }

  // Creamos el CV en estado temporal
  const { data: cv, error: cvError } = await supabase
    .from("cvs")
    .insert({
      profile_id,
      cv_data: cvData,
      template,
      status: "pending", // 👈 asegurate de tener el campo "status" creado en la DB
    })
    .select()
    .single();

  if (cvError) {
    console.error("Error insertando CV:", cvError);
    return NextResponse.json({ error: "Error creando CV" }, { status: 500 });
  }



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
            title: "Descarga de CV Profesional",
            quantity: 1,
            unit_price: 500,
          },
        ],
        back_urls: {
          success: `${process.env.NGROK_URL}/perfil?cv_id=${cv.id}`,
          failure: `${process.env.NGROK_URL}/error`,
        },
        notification_url: `${process.env.NGROK_URL}/api/webhook`,
        metadata: {
          cv_id: cv.id,
          profile_id,
        },
      }),
    }
  );

  const mpJson = await mpRes.json();
  console.log("CV creado con ID:", cv.id);

  if (!mpJson.init_point) {
    return NextResponse.json(
      { error: "No se pudo generar link de pago" },
      { status: 500 }
    );
  }

  return NextResponse.json({ init_point: mpJson.init_point });
}
