import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { LandingAttributionSchema } from "@/lib/schemas/cv";
import { createClient } from "@/utils/supabase/server";

const PendingPaymentSchema = z.object({
  cvId: z.string().uuid(),
  attribution: LandingAttributionSchema,
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON invalido en la solicitud" },
      { status: 400 }
    );
  }

  const parsed = PendingPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos invalidos", issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { cvId, attribution } = parsed.data;
  const supabase = await createClient();
  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profileId = user.data.user.id;
  const email = user.data.user.email;

  if (!email) {
    return NextResponse.json(
      { error: "No se pudo identificar el email del usuario" },
      { status: 400 }
    );
  }

  const { data: cv, error: cvError } = await supabase
    .from("cvs")
    .select("id, profile_id, cv_data, template, status")
    .eq("id", cvId)
    .eq("profile_id", profileId)
    .single();

  if (cvError || !cv) {
    return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
  }

  if (cv.status === "paid") {
    return NextResponse.json(
      { error: "Este CV ya esta pagado" },
      { status: 409 }
    );
  }

  if (cv.status !== "pending") {
    return NextResponse.json(
      { error: "Este CV no esta pendiente de pago" },
      { status: 400 }
    );
  }

  const cvData = cv.cv_data as { language?: "es" | "en" } | null;
  const language = cvData?.language === "en" ? "en" : "es";
  const template = cv.template || "purple";

  await recordAnalyticsEventServer({
    event_name: "payment_started",
    user_id: profileId,
    language,
    payment_provider: "mercado_pago",
    template,
    cv_id: cv.id,
    ...attribution,
  });

  const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": randomUUID(),
    },
    body: JSON.stringify({
      items: [
        {
          id: `cv-${cv.id}`,
          title:
            language === "en"
              ? "ATS-friendly resume in PDF"
              : "CV optimizado con IA",
          description:
            language === "en"
              ? "Professional resume with AI writing and PDF download"
              : "Curriculum profesional con diseno moderno y textos persuasivos",
          category_id: "services",
          quantity: 1,
          unit_price: 1999,
        },
      ],
      payer: { email },
      external_reference: `cv_${cv.id}`,
      notification_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil?cv_id=${cv.id}`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL}/perfil`,
      },
      auto_return: "approved",
      metadata: {
        cv_id: cv.id,
        profile_id: profileId,
        landing_path: attribution?.landing_path,
        cta_label: attribution?.cta_label,
        source_type: attribution?.source_type,
        language,
        payment_provider: "mercado_pago",
        template,
      },
      customization: {
        visual: {
          showExternalReference: true,
        },
      },
    }),
  });

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
