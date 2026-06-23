import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { supabaseAdmin } from "@/utils/supabase/admin";

const MercadoPagoWebhookSchema = z.object({
  type: z.string().optional(),
  data: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

type MercadoPagoMetadata = Record<string, unknown> | null | undefined;

type MercadoPagoPayment = {
  id?: string | number;
  status?: string;
  metadata?: MercadoPagoMetadata;
  external_reference?: string | null;
  transaction_amount?: number;
  payer?: {
    email?: string | null;
  };
  payment_type_id?: string | null;
};

function metadataString(metadata: MercadoPagoMetadata, key: string) {
  const value = metadata?.[key];
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function parseCvIdFromExternalReference(reference: unknown) {
  if (typeof reference !== "string") return "";
  const match = reference.trim().match(/^cv_(.+)$/);
  return match?.[1] ?? "";
}

function parseSignatureHeader(signature: string) {
  return signature.split(",").reduce<Record<string, string>>((acc, part) => {
    const [key, value] = part.split("=");
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
  }, {});
}

function verifyMercadoPagoSignature(req: NextRequest, dataId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) return true;

  const signature = req.headers.get("x-signature");
  const requestId = req.headers.get("x-request-id");
  if (!signature || !requestId || !dataId) return false;

  const parsedSignature = parseSignatureHeader(signature);
  const timestamp = parsedSignature.ts;
  const receivedHash = parsedSignature.v1;
  if (!timestamp || !receivedHash) return false;

  const manifest = `id:${dataId};request-id:${requestId};ts:${timestamp};`;
  const expectedHash = createHmac("sha256", secret)
    .update(manifest)
    .digest("hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const receivedBuffer = Buffer.from(receivedHash, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  let body: unknown = {};

  if (rawBody.trim()) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
  }

  const parsed = MercadoPagoWebhookSchema.safeParse(body);
  const queryType =
    req.nextUrl.searchParams.get("type") ??
    req.nextUrl.searchParams.get("topic");
  const queryId =
    req.nextUrl.searchParams.get("data.id") ??
    req.nextUrl.searchParams.get("id");

  if (!parsed.success && !queryId) {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }

  const type = parsed.success ? parsed.data.type ?? queryType : queryType;
  const id = parsed.success ? parsed.data.data?.id ?? queryId : queryId;
  if (type !== "payment" || !id) {
    return NextResponse.json({ message: "Ignored" }, { status: 200 });
  }

  if (!verifyMercadoPagoSignature(req, String(id))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const mpRes = await fetch(
    `https://api.mercadopago.com/v1/payments/${encodeURIComponent(String(id))}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
      },
    }
  );

  if (!mpRes.ok) {
    console.error("Error consultando Mercado Pago:", mpRes.status);
    return NextResponse.json({ error: "MP error" }, { status: 500 });
  }

  const payment = (await mpRes.json()) as MercadoPagoPayment;
  if (payment.status !== "approved") {
    return NextResponse.json({ message: "Payment not approved" }, { status: 200 });
  }

  const cv_id =
    metadataString(payment.metadata, "cv_id") ||
    parseCvIdFromExternalReference(payment.external_reference);
  const metadataProfileId = metadataString(payment.metadata, "profile_id");

  if (!cv_id) {
    console.error("No se pudo resolver el CV del pago:", {
      metadata: payment.metadata,
      external_reference: payment.external_reference,
    });
    return NextResponse.json({ error: "CV invalido" }, { status: 400 });
  }

  const { data: cv } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id, template")
    .eq("id", cv_id)
    .maybeSingle();

  if (!cv) {
    console.error("CV no encontrado para pago aprobado:", { cv_id });
    return NextResponse.json({ error: "CV not found" }, { status: 404 });
  }

  if (metadataProfileId && cv.profile_id !== metadataProfileId) {
    console.error("Profile ID de metadata no coincide con el CV:", {
      cv_id,
      metadata_profile_id: metadataProfileId,
      cv_profile_id: cv.profile_id,
    });
    return NextResponse.json({ error: "Invalid profile" }, { status: 400 });
  }

  const profile_id = cv.profile_id;

  const { data: existing } = await supabaseAdmin
    .from("payments")
    .select("id")
    .eq("payment_id", payment.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ message: "Already processed" }, { status: 200 });
  }

  const { error: insertError } = await supabaseAdmin.from("payments").insert({
    user_id: profile_id,
    cv_id,
    payment_id: payment.id,
    amount: payment.transaction_amount,
    status: payment.status,
    payer_email: payment.payer?.email ?? null,
    payment_type: payment.payment_type_id,
    payment_method: "mercado_pago",
  });

  if (insertError) {
    if (insertError.code === "23505") {
      return NextResponse.json({ message: "Already processed" }, { status: 200 });
    }

    console.error("Error insertando pago:", insertError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const { error: updateError } = await supabaseAdmin
    .from("cvs")
    .update({ status: "paid" })
    .eq("id", cv_id)
    .eq("profile_id", profile_id);

  if (updateError) {
    console.error("Error actualizando CV:", updateError);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const { data: startedEvent } = await supabaseAdmin
    .from("analytics_events")
    .select(
      "landing_path, cta_label, source_type, language, payment_provider, template, utm_source, utm_medium, utm_campaign, utm_content"
    )
    .eq("event_name", "payment_started")
    .eq("cv_id", cv_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const metadataLanguage = metadataString(payment.metadata, "language");
  const metadataSourceType = metadataString(payment.metadata, "source_type");

  await recordAnalyticsEventServer({
    event_name: "payment_completed",
    user_id: profile_id,
    cv_id,
    payment_id: String(payment.id),
    template:
      metadataString(payment.metadata, "template") ||
      startedEvent?.template ||
      cv.template,
    language:
      metadataLanguage === "en" || metadataLanguage === "es"
        ? metadataLanguage
        : startedEvent?.language,
    payment_provider: "mercado_pago",
    landing_path:
      metadataString(payment.metadata, "landing_path") ||
      startedEvent?.landing_path,
    cta_label:
      metadataString(payment.metadata, "cta_label") || startedEvent?.cta_label,
    source_type:
      metadataSourceType === "landing" || metadataSourceType === "blog"
        ? metadataSourceType
        : startedEvent?.source_type,
    utm_source:
      metadataString(payment.metadata, "utm_source") || startedEvent?.utm_source,
    utm_medium:
      metadataString(payment.metadata, "utm_medium") || startedEvent?.utm_medium,
    utm_campaign:
      metadataString(payment.metadata, "utm_campaign") ||
      startedEvent?.utm_campaign,
    utm_content:
      metadataString(payment.metadata, "utm_content") ||
      startedEvent?.utm_content,
  });

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
