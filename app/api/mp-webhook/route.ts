// app/api/mp-webhook/route.ts
import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = await req.json();

  // Solo nos interesa payment.approved
  if (event.type !== "payment" || event.data?.status !== "approved") {
    return NextResponse.json({ received: true });
  }

  const p = event.data;
  const cvId = p.external_reference;        // lo mandaste en la preferencia

  // 1. Registrar el pago
  await supabaseAdmin.from("payments").insert({
    payment_id:   p.id,
    payer_email:  p.payer.email,
    amount:       p.transaction_amount,
    status:       "approved",
    payment_type: p.payment_type_id,
    cv_id:        cvId,
  });

  // 2. Marcar el CV como pagado
  await supabaseAdmin.from("cvs")
    .update({ pagado: true })
    .eq("id", cvId);

  return NextResponse.json({ saved: true });
}
