import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { confirmMercadoPagoPayment } from "@/lib/mercado-pago-confirmation";

const MercadoPagoWebhookSchema = z.object({
  type: z.string().optional(),
  data: z
    .object({
      id: z.union([z.string(), z.number()]).optional(),
    })
    .optional(),
});

function parseSignatureHeader(signature: string) {
  return signature.split(",").reduce<Record<string, string>>((acc, part) => {
    const [key, value] = part.split("=");
    if (key && value) acc[key.trim()] = value.trim();
    return acc;
  }, {});
}

function verifyMercadoPagoSignature(req: NextRequest, dataId: string) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
  if (!secret) {
    console.error("MERCADOPAGO_WEBHOOK_SECRET no está configurado");
    return false;
  }

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

  try {
    const result = await confirmMercadoPagoPayment(String(id));
    return NextResponse.json({ received: true, state: result.state });
  } catch {
    return NextResponse.json({ error: "Confirmation unavailable" }, { status: 503 });
  }
}
