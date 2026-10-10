import { NextResponse } from "next/server";
import { verifyPayPalWebhookSignature } from "@/lib/paypal";
import { confirmPayPalOrder } from "@/lib/paypal-confirmation";
import { z } from "zod";

const Payload = z.object({ event_type: z.string(), resource: z.object({
  id: z.string().optional(), supplementary_data: z.object({ related_ids: z.object({
    order_id: z.string().optional(),
  }).optional() }).optional(),
}).optional() });

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  const parsed = Payload.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  try {
    if (!await verifyPayPalWebhookSignature({ headers: req.headers, webhookEvent: raw })) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    const { event_type, resource } = parsed.data;
    if (!["CHECKOUT.ORDER.APPROVED", "PAYMENT.CAPTURE.COMPLETED"].includes(event_type)) {
      return NextResponse.json({ received: true, ignored: true });
    }
    const orderId = event_type === "CHECKOUT.ORDER.APPROVED" ? resource?.id
      : resource?.supplementary_data?.related_ids?.order_id;
    if (!orderId) return NextResponse.json({ error: "Missing order" }, { status: 400 });
    const result = await confirmPayPalOrder(orderId, { capture: true, stage: "webhook" });
    if (result.state !== "paid" && result.state !== "expired" && result.state !== "failure") {
      return NextResponse.json({ error: "Awaiting confirmation" }, { status: 503 });
    }
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Confirmation unavailable" }, { status: 503 });
  }
}
