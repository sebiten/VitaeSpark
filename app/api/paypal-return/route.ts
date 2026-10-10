import { NextResponse } from "next/server";
import { z } from "zod";
import { confirmPayPalOrder } from "@/lib/paypal-confirmation";
import { recordPaymentFailure } from "@/lib/payment-analytics";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const orderId = url.searchParams.get("token");
  const cvId = z.string().uuid().safeParse(url.searchParams.get("cv_id"));
  const target = new URL("/pago/resultado", process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com");
  target.searchParams.set("provider", "paypal");
  if (!orderId || !cvId.success) {
    target.searchParams.set("status", "missing");
    return NextResponse.redirect(target);
  }
  target.searchParams.set("cv_id", cvId.data);
  try {
    const result = await confirmPayPalOrder(orderId, { cvId: cvId.data, capture: true, stage: "capture" });
    target.searchParams.set("status", result.state === "paid" ? "approved" : result.state);
  } catch {
    await recordPaymentFailure({ cvId: cvId.data, provider: "paypal", orderId, stage: "capture", errorCode: "capture_error" });
    target.searchParams.set("status", "pending");
  }
  return NextResponse.redirect(target);
}
