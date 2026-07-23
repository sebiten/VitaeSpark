import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { createMercadoPagoCheckout } from "@/lib/mercado-pago-checkout";
import { LandingAttributionSchema } from "@/lib/schemas/cv";
import { createClient } from "@/utils/supabase/server";
import { getRequestCountry } from "@/lib/market";

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
  const countryCode = getRequestCountry(req.headers);
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

  let checkout: Awaited<ReturnType<typeof createMercadoPagoCheckout>>;
  try {
    checkout = await createMercadoPagoCheckout({
      cvId: cv.id,
      profileId,
      email,
      language,
      template,
      countryCode,
      attribution,
    });
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error);
    return NextResponse.json(
      { error: "No se pudo generar link de pago" },
      { status: 500 }
    );
  }

  await recordAnalyticsEventServer({
    event_name: "payment_started",
    user_id: profileId,
    language,
    payment_provider: "mercado_pago",
    template,
    cv_id: cv.id,
    country_code: countryCode,
    ...checkout.attribution,
  });

  return NextResponse.json({ cvId: cv.id, init_point: checkout.initPoint });
}
