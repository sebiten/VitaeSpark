import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/utils/supabase/server";
import { CreatePaymentSchema } from "@/lib/schemas/cv";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";

const PAYPAL_API_BASE = process.env.NODE_ENV === "production" 
  ? "https://api-m.paypal.com" 
  : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;

  if (!clientId || !secret) {
    throw new Error("PayPal credentials not configured");
  }

  const credentials = Buffer.from(`${clientId}:${secret}`).toString("base64");

  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("PayPal auth error:", error);
    throw new Error("Failed to get PayPal access token");
  }

  const json = await res.json();
  return json.access_token;
}

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

  const { cvData, template, attribution } = parsed.data;

  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile_id = user.data.user.id;
  const email = user.data.user.email;

  if (!profile_id || !email) {
    return NextResponse.json(
      { error: "No se pudo identificar al usuario" },
      { status: 400 }
    );
  }

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

  await recordAnalyticsEventServer({
    event_name: "payment_started",
    user_id: profile_id,
    template,
    cv_id: cv.id,
    ...attribution,
  });

  try {
    const accessToken = await getPayPalAccessToken();

    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `cv_${cv.id}`,
          custom_id: cv.id,
          description: "CV optimizado con IA - VitaeSpark",
          amount: {
            currency_code: "USD",
            value: "4.99",
          },
        },
      ],
      payer: {
        email_address: email,
      },
      application_context: {
        brand_name: "VitaeSpark",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${cv.id}&method=paypal`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/crear`,
      },
    };

    const paypalRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": randomUUID(),
      },
      body: JSON.stringify(orderPayload),
    });

    const paypalJson = await paypalRes.json();

    if (!paypalRes.ok || !paypalJson.id) {
      console.error("PayPal order error:", paypalJson);
      return NextResponse.json(
        { error: "No se pudo crear la orden de PayPal" },
        { status: 500 }
      );
    }

    const approveUrl = paypalJson.links?.find(
      (link: { rel: string; href: string }) => link.rel === "approve"
    )?.href;

    return NextResponse.json({
      orderId: paypalJson.id,
      approveUrl: approveUrl || null,
    });
  } catch (error) {
    console.error("PayPal error:", error);
    return NextResponse.json(
      { error: "Error comunicándose con PayPal" },
      { status: 500 }
    );
  }
}
