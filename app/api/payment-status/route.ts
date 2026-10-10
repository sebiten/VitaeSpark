import { NextResponse } from "next/server";
import { z } from "zod";
import { ensurePurchaseAccessForCv } from "@/lib/purchase-access";
import { createClient } from "@/utils/supabase/server";
import { getRelatedCheckouts, inspectCheckout, type PaymentState } from "@/lib/payment-recovery";

const CvIdSchema = z.string().uuid();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const cvId = CvIdSchema.safeParse(url.searchParams.get("cv_id"));
  if (!cvId.success) {
    return NextResponse.json({ error: "CV inválido" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Sesión no disponible" }, { status: 401 });
  }

  const { data: initialCv, error } = await supabase
    .from("cvs")
    .select("id, status, cv_data, template, created_at")
    .eq("id", cvId.data)
    .eq("profile_id", user.id)
    .maybeSingle();
  if (error || !initialCv) {
    return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
  }

  let cv = initialCv;
  let paymentState: PaymentState = cv.status === "paid" ? "paid" : "unpaid";
  let recoveryUrl: string | undefined;
  if (cv.status !== "paid") {
    try {
      const sessions = await getRelatedCheckouts(cv.id, user.id);
      const states: PaymentState[] = [];
      for (const session of sessions.filter((item) => item.status === "pending" || item.status === "completed")) {
        const state = await inspectCheckout(session);
        states.push(state);
        if (session.cv_id !== cv.id && !["expired"].includes(state)) {
          recoveryUrl = `/pago/resultado?cv_id=${session.cv_id}&provider=${session.provider}`;
        }
      }
      paymentState = states.includes("paid") ? "paid" : states.includes("unknown") ? "unknown"
        : states.includes("pending") ? "pending" : states.includes("unpaid") ? "unpaid"
        : states.includes("failure") ? "failure" : states.includes("expired") ? "expired" : "unpaid";
      if (paymentState === "paid") {
        const { data: refreshed, error: refreshError } = await supabase.from("cvs")
          .select("id, status, cv_data, template, created_at").eq("id", cv.id).eq("profile_id", user.id).single();
        if (refreshError || !refreshed) throw new Error("Payment read unavailable");
        cv = refreshed;
        if (cv.status !== "paid") paymentState = "pending";
      }
    } catch { paymentState = "unknown"; }
  }

  let accessSent = false;
  if (cv.status === "paid" && user.is_anonymous === true) {
    const access = await ensurePurchaseAccessForCv(cv.id).catch((accessError) => {
      console.error("No se pudo preparar el acceso postcompra:", accessError);
      return null;
    });
    accessSent = Boolean(access?.ok && "sent" in access && access.sent);
  }

  return NextResponse.json(
    {
      cv,
      isGuest: user.is_anonymous === true,
      accessSent,
      paymentState,
      canRetry: !recoveryUrl && ["unpaid", "expired", "failure"].includes(paymentState),
      recoveryUrl,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
