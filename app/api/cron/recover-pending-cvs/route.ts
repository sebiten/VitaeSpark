import { NextResponse } from "next/server";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { PRICING } from "@/lib/pricing";
import { supabaseAdmin } from "@/utils/supabase/admin";

type Reminder = {
  type: "1h" | "24h" | "72h";
  minAgeMs: number;
  subject: string;
  subjectEn: string;
};

type PendingCv = {
  id: string;
  profile_id: string;
  created_at: string;
  cv_data: {
    nombre?: string;
    puesto?: string;
    language?: "es" | "en";
  } | null;
  template: string | null;
};

type PaymentContext = {
  cv_id: string | null;
  country_code: string | null;
  payment_provider: "mercado_pago" | "paypal" | null;
};

const reminders: Reminder[] = [
  {
    type: "1h",
    minAgeMs: 60 * 60 * 1000,
    subject: "Tu CV ya esta listo para desbloquear",
    subjectEn: "Your resume is ready to unlock",
  },
  {
    type: "24h",
    minAgeMs: 24 * 60 * 60 * 1000,
    subject: "Tu CV sigue guardado en VitaeSpark",
    subjectEn: "Your resume is still saved in VitaeSpark",
  },
  {
    type: "72h",
    minAgeMs: 72 * 60 * 60 * 1000,
    subject: "Ultimo recordatorio: tu CV quedo pendiente",
    subjectEn: "Final reminder: your resume is still pending",
  },
];

export async function GET(req: Request) {
  return handleRecoveryCron(req);
}

export async function POST(req: Request) {
  return handleRecoveryCron(req);
}

async function handleRecoveryCron(req: Request) {
  const configuredSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const headerSecret = req.headers.get("x-cron-secret");
  const incomingSecret = authHeader?.replace(/^Bearer\s+/i, "") || headerSecret;

  if (!configuredSecret || incomingSecret !== configuredSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return NextResponse.json(
      { error: "Resend no configurado" },
      { status: 500 },
    );
  }

  const since = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id, created_at, cv_data, template")
    .eq("status", "pending")
    .gte("created_at", since)
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) {
    console.error("Error buscando CVs pendientes:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  const pendingCvs = (data ?? []) as PendingCv[];
  const pendingCvIds = pendingCvs.map((cv) => cv.id);
  const { data: paymentContextRows, error: paymentContextError } = pendingCvIds.length
    ? await supabaseAdmin
        .from("analytics_events")
        .select("cv_id, country_code, payment_provider")
        .eq("event_name", "payment_started")
        .in("cv_id", pendingCvIds)
        .order("created_at", { ascending: false })
    : { data: [], error: null };

  if (paymentContextError) {
    console.error("Error cargando paises de recovery:", paymentContextError);
  }

  const paymentContextByCv = new Map<string, PaymentContext>();
  ((paymentContextRows ?? []) as PaymentContext[]).forEach((context) => {
    if (context.cv_id && !paymentContextByCv.has(context.cv_id)) {
      paymentContextByCv.set(context.cv_id, context);
    }
  });
  const results = {
    checked: pendingCvs.length,
    sent: 0,
    skipped: 0,
    failed: 0,
  };

  for (const cv of pendingCvs) {
    const reminder = getDueReminder(cv);
    if (!reminder) {
      results.skipped += 1;
      continue;
    }

    const { data: existing, error: existingError } = await supabaseAdmin
      .from("cv_recovery_emails")
      .select("id, last_error")
      .eq("cv_id", cv.id)
      .eq("reminder_type", reminder.type)
      .maybeSingle();

    if (existingError) {
      console.error("Error revisando recovery email existente:", existingError);
      results.failed += 1;
      continue;
    }

    if (existing && !existing.last_error) {
      results.skipped += 1;
      continue;
    }

    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(cv.profile_id);
    const email = userData?.user?.email;

    if (userError || !email) {
      results.failed += 1;
      continue;
    }

    const paymentContext = paymentContextByCv.get(cv.id);
    const sent = await sendRecoveryEmail({
      cv,
      reminder,
      email,
      paymentContext,
    });

    const recoveryPayload = {
      sent_to: email,
      sent_at: new Date().toISOString(),
      last_error: sent.ok ? null : sent.error,
    };

    const { error: writeError } = existing
      ? await supabaseAdmin
          .from("cv_recovery_emails")
          .update(recoveryPayload)
          .eq("id", existing.id)
      : await supabaseAdmin.from("cv_recovery_emails").insert({
          cv_id: cv.id,
          profile_id: cv.profile_id,
          reminder_type: reminder.type,
          ...recoveryPayload,
        });

    if (writeError) {
      console.error("Error registrando recovery email:", writeError);
      results.failed += 1;
      continue;
    }

    if (sent.ok) {
      results.sent += 1;
      await recordAnalyticsEventServer({
        event_name: "recovery_email_sent",
        user_id: cv.profile_id,
        cv_id: cv.id,
        template: cv.template ?? undefined,
        cta_label: `pending_cv_email_${reminder.type}`,
        source_type: "landing",
        utm_source: "recovery_email",
        utm_medium: "email",
        utm_campaign: "pending_cv",
        utm_content: reminder.type,
        country_code: paymentContext?.country_code,
        payment_provider: paymentContext?.payment_provider ?? undefined,
      });
    } else {
      results.failed += 1;
    }
  }

  return NextResponse.json({ ok: true, ...results });
}

function getDueReminder(cv: PendingCv) {
  const ageMs = Date.now() - new Date(cv.created_at).getTime();
  const due = reminders
    .filter((reminder) => ageMs >= reminder.minAgeMs)
    .sort((a, b) => b.minAgeMs - a.minAgeMs)[0];

  return due ?? null;
}

async function sendRecoveryEmail({
  cv,
  reminder,
  email,
  paymentContext,
}: {
  cv: PendingCv;
  reminder: Reminder;
  email: string;
  paymentContext?: PaymentContext;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  const nextPath = `/perfil?cv_id=${cv.id}&utm_source=recovery_email&utm_medium=email&utm_campaign=pending_cv&utm_content=${reminder.type}`;
  const recoveryUrl = new URL("/api/recovery-click", siteUrl);
  recoveryUrl.searchParams.set("cv_id", cv.id);
  recoveryUrl.searchParams.set("type", reminder.type);
  recoveryUrl.searchParams.set("next", nextPath);

  const name = escapeHtml(cv.cv_data?.nombre?.trim() || "tu CV");
  const role = cv.cv_data?.puesto?.trim()
    ? escapeHtml(cv.cv_data.puesto.trim())
    : "";
  const language = cv.cv_data?.language === "en" ? "en" : "es";
  const isInternational = paymentContext?.payment_provider
    ? paymentContext.payment_provider === "paypal"
    : paymentContext?.country_code
      ? paymentContext.country_code !== "AR"
      : language === "en";
  const price = isInternational ? PRICING.paypal.label : PRICING.mercadoPago.label;
  const title =
    language === "en"
      ? "Your resume is ready. Unlock the final PDF."
      : "Tu CV ya esta listo. Falta desbloquear el PDF final.";
  const description =
    language === "en"
      ? `You left ${name}${role ? ` for ${role}` : ""} saved with a watermark. Unlock it for ${price}, with a one-time payment and no subscription.`
      : `Dejaste ${name}${role ? ` para ${role}` : ""} generado con marca de agua. Podes completarlo por ${price}, pago unico y sin suscripcion.`;
  const buttonText = language === "en" ? "Unlock my resume" : "Desbloquear mi CV";
  const footerText =
    language === "en"
      ? "If you already completed the payment, ignore this email."
      : "Si ya completaste el pago, ignora este mensaje.";

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#0f0f12;color:#f4f4f5;padding:28px;border-radius:18px">
      <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#a78bfa;margin:0 0 14px">VitaeSpark</p>
      <h1 style="font-size:24px;line-height:1.2;margin:0 0 12px">${title}</h1>
      <p style="font-size:15px;line-height:1.7;color:#d4d4d8;margin:0 0 18px">
        ${description}
      </p>
      <a href="${recoveryUrl.toString()}" style="display:inline-block;background:#009ee3;color:white;text-decoration:none;font-weight:700;border-radius:14px;padding:14px 18px">
        ${buttonText}
      </a>
      <p style="font-size:12px;line-height:1.6;color:#a1a1aa;margin:20px 0 0">
        ${footerText}
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: language === "en" ? reminder.subjectEn : reminder.subject,
      html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Error enviando recovery email:", error);
    return { ok: false, error };
  }

  return { ok: true, error: null };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
