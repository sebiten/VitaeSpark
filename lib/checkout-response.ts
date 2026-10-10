import { NextResponse } from "next/server";
import { CheckoutConflict } from "@/lib/payment-recovery";

export function checkoutErrorResponse(error: unknown, cvId: string) {
  return NextResponse.json({ cvId,
    error: error instanceof CheckoutConflict ? error.message : "No se pudo comprobar la compra. Reintentá sin volver a generar el CV.",
    recoveryUrl: error instanceof CheckoutConflict ? error.recoveryUrl : undefined,
    paymentState: error instanceof CheckoutConflict ? error.state : "unknown",
  }, { status: error instanceof CheckoutConflict ? 409 : 503 });
}
