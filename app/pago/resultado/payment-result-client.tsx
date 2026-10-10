"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock3, FilePenLine, Loader2, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";
import type { RespuestaCV } from "@/lib/types/cv";
import { CREATE_DRAFT_KEY, CREATE_DRAFT_VERSION, parseStoredCreateDraft } from "@/lib/create-flow-state";
import { recordAnalyticsEvent } from "@/lib/analytics-events";

const PDFDownloadButton = dynamic(() => import("@/components/pdf/PDFDownloadButton"), { ssr: false });
type PaidCv = { id: string; status: "pending" | "paid"; cv_data: RespuestaCV["cv"]; template: string | null };
type ResultState =
  | { kind: "checking" | "pending" | "cancelled" | "failure" | "expired" | "unpaid" | "session_lost" | "error" }
  | { kind: "paid"; cv: PaidCv; isGuest: boolean; accessSent: boolean };

const messages = {
  es: {
    checking: ["Comprobando el pago", "Consultamos el estado real del proveedor."],
    pending: ["El pago sigue pendiente", "La confirmación todavía no llegó. Podés volver a verificar; no hace falta mantener esta pantalla abierta."],
    cancelled: ["Cancelaste el checkout", "El proveedor no registra un pago confirmado. Tu CV y tu plantilla siguen guardados."],
    failure: ["El pago no se completó", "Podés volver a tu CV y revisar la compra antes de reintentar."],
    expired: ["El enlace de pago venció", "Volvé a tu CV para crear un nuevo intento con el mismo contenido y plantilla."],
    unpaid: ["Tu CV está guardado", "No hay un pago confirmado. Podés revisar el CV y continuar con la compra."],
    session_lost: ["Recuperá el acceso por email", "Este navegador perdió la sesión. Si el pago fue aprobado, usá el enlace enviado al email de la compra. Revisá también spam o iniciá sesión con esa misma cuenta."],
    error: ["No pudimos verificar el pago", "El estado es incierto. Volvé a verificar antes de iniciar otro pago."],
  },
  en: {
    checking: ["Checking your payment", "We are checking the provider's actual status."],
    pending: ["Payment is still pending", "Confirmation has not arrived yet. Check again later; you can safely leave this page."],
    cancelled: ["Checkout cancelled", "The provider has no confirmed payment. Your resume and template are still saved."],
    failure: ["Payment was not completed", "Return to your resume and review the purchase before trying again."],
    expired: ["The payment link expired", "Return to your resume to start a new attempt with the same content and template."],
    unpaid: ["Your resume is saved", "There is no confirmed payment. Review your resume and continue checkout."],
    session_lost: ["Recover access by email", "This browser lost its session. If payment was approved, use the link sent to your checkout email. Check spam or sign in with that same account."],
    error: ["Unable to verify payment", "The payment status is uncertain. Check again before starting another payment."],
  },
} as const;

export default function PaymentResultClient({ cvId, provider, returnStatus }: {
  cvId: string; provider: "mercado_pago" | "paypal"; returnStatus: string | null;
}) {
  const [result, setResult] = useState<ResultState>({ kind: "checking" });
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [canRetry, setCanRetry] = useState(false);
  const [recoveryUrl, setRecoveryUrl] = useState<string>();
  const savedCv = useRef<PaidCv | null>(null);
  const attempts = useRef(0);
  const observedFailures = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(false);

  const checkPayment = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    const deadline = setTimeout(() => request.abort(), 20000);
    setResult({ kind: "checking" });
    setCanRetry(false);
    try {
      if (!cvId) throw new Error("Missing CV");
      const response = await fetch(`/api/payment-status?cv_id=${encodeURIComponent(cvId)}`, { cache: "no-store", signal: request.signal });
      if (!mounted.current || controller.current !== request) return;
      if (response.status === 401) { setResult({ kind: "session_lost" }); return; }
      if (!response.ok) throw new Error("Verification unavailable");
      const payload = await response.json();
      if (!mounted.current || controller.current !== request) return;
      savedCv.current = payload.cv;
      if (payload.cv?.cv_data?.language) setLanguage(payload.cv.cv_data.language === "en" ? "en" : "es");
      setRecoveryUrl(payload.recoveryUrl);
      if (payload.cv?.status === "paid") {
        // A late payment may belong to an older revision: never discard the current draft.
        setResult({ kind: "paid", cv: payload.cv, isGuest: payload.isGuest === true, accessSent: payload.accessSent === true });
        return;
      }
      setCanRetry(payload.canRetry === true);
      const state = payload.paymentState;
      const kind = state === "unpaid" && returnStatus === "cancelled" ? "cancelled"
        : state === "unpaid" && returnStatus === "failure" ? "failure"
        : ["pending", "unpaid", "failure", "expired"].includes(state) ? state : "error";
      setResult({ kind });
      attempts.current += 1;
      if (kind === "pending" && attempts.current < 5) timer.current = setTimeout(() => void checkPayment(), 3000);
    } catch {
      if (mounted.current && controller.current === request) setResult({ kind: "error" });
    } finally { clearTimeout(deadline); }
  }, [cvId, returnStatus]);

  useEffect(() => {
    mounted.current = true;
    try { const raw = sessionStorage.getItem(CREATE_DRAFT_KEY); const draft = raw && parseStoredCreateDraft(raw); if (draft) setLanguage(draft.language); } catch { /* Storage is optional. */ }
    void checkPayment();
    return () => { mounted.current = false; controller.current?.abort(); if (timer.current) clearTimeout(timer.current); };
  }, [checkPayment]);
  useEffect(() => {
    const code = result.kind === "session_lost" ? "session_lost" : result.kind === "error" ? "verification_error"
      : result.kind === "cancelled" ? "return_cancelled" : result.kind === "failure" ? "return_failure" : null;
    if (!code || observedFailures.current.has(code) || !cvId) return;
    observedFailures.current.add(code);
    recordAnalyticsEvent({ event_name: "payment_failed", stage: "return", error_code: code, cv_id: cvId, payment_provider: provider });
  }, [cvId, provider, result.kind]);

  const restore = () => {
    try {
      const raw = sessionStorage.getItem(CREATE_DRAFT_KEY);
      if (raw && parseStoredCreateDraft(raw)?.generatedCv) return;
      const cv = savedCv.current;
      if (!cv) return;
      sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify({ version: CREATE_DRAFT_VERSION,
        data: { nombre: cv.cv_data.nombre, puesto: cv.cv_data.puesto, contacto: cv.cv_data.contacto.join("\n"), sobreMi: cv.cv_data.sobreMi,
          experiencia: "", formacion: "", habilidades: "", idiomas: "", informacionAdicional: "" },
        generatedCv: cv.cv_data, template: cv.template, pendingCvId: cv.id, language, intent: "general", action: null, flowStep: "preview" }));
    } catch { /* The existing remote CV remains accessible through the account. */ }
  };
  const text = result.kind === "paid" ? null : messages[language][result.kind];
  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#101013] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#15151A] shadow-2xl shadow-black/35" aria-live="polite">
        {result.kind === "paid" ? <PaidResult result={result} /> : <ResultMessage language={language}
          icon={result.kind === "checking" ? <Loader2 className="h-6 w-6 animate-spin" /> : <Clock3 className="h-6 w-6" />}
          eyebrow={provider === "paypal" ? "PayPal" : "Mercado Pago"} title={text![0]} description={text![1]}
          action={<div className="flex flex-col gap-3">
            {result.kind !== "checking" && result.kind !== "session_lost" ? <button type="button" onClick={() => { attempts.current = 0; void checkPayment(); }} className="rounded-xl border border-white/15 px-5 py-3">{language === "en" ? "Check again" : "Volver a verificar"}</button> : null}
            <Link href={language === "en" ? "/crear?lang=en" : "/crear"} onClick={restore} className="rounded-xl bg-[#F6F2EA] px-5 py-3 font-bold text-[#121114]">{language === "en" ? "Back to my resume" : "Volver a mi CV"}</Link>
            {canRetry ? <p className="text-xs text-white/65">{language === "en" ? "Retry from your resume. We will check the order again before opening checkout." : "Reintentá desde tu CV. Comprobaremos otra vez la orden antes de abrir el checkout."}</p> : null}
            {recoveryUrl ? <Link href={recoveryUrl} className="text-sm text-[#C4B5FD]">{language === "en" ? "Review previous purchase" : "Revisar compra anterior"}</Link> : null}
            {result.kind === "session_lost" ? <Link href="/login" className="text-sm text-[#C4B5FD]">{language === "en" ? "Sign in" : "Iniciar sesión"}</Link> : null}
          </div>} />}
      </div>
    </main>
  );
}
function PaidResult({
  result,
}: {
  result: Extract<ResultState, { kind: "paid" }>;
}) {
  const en = result.cv.cv_data.language === "en";
  return (
    <>
      <div className="border-b border-white/8 px-6 py-7 text-center sm:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
          {en ? "Payment confirmed" : "Pago confirmado"}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
          {en ? "Your resume is ready to download" : "Tu CV está listo para descargar"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          {en ? "The watermark is removed. Download your PDF or edit the content without paying again." : "Ya quitamos la marca de agua. Podés descargar el PDF o editar los datos sin volver a pagar."}
        </p>
      </div>

      <div className="space-y-3 px-6 py-6 sm:px-8">
        <PDFDownloadButton
          cv={result.cv.cv_data}
          template={result.cv.template}
          cvId={result.cv.id}
          label={en ? "Download PDF without watermark" : "Descargar PDF sin marca de agua"}
          className="block w-full [&_button]:h-13 [&_button]:rounded-xl [&_button]:border-0 [&_button]:bg-[#F6F2EA] [&_button]:font-bold [&_button]:text-[#121114] [&_button:hover]:bg-white"
        />
        <Link
          href={`/editar-cv/${result.cv.id}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] text-sm font-semibold text-white transition hover:bg-white/[0.07]"
        >
          <FilePenLine className="h-4 w-4" />
          {en ? "Edit this resume" : "Editar este CV"}
        </Link>

        {result.isGuest ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#A78BFA]/18 bg-[#A78BFA]/[0.07] p-4">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C4B5FD]" />
            <div>
              <p className="text-sm font-semibold">{en ? "Save it for another device" : "Guardalo para otro dispositivo"}</p>
              <p className="mt-1 text-xs leading-5 text-white/55">
                {result.accessSent
                  ? en ? "We emailed a link to save this resume in a permanent account." : "Te enviamos un enlace para guardar este CV en una cuenta permanente."
                  : en ? "We are preparing the access link for your checkout email." : "Estamos preparando el enlace de acceso al email de la compra."}
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/perfil"
            className="block pt-2 text-center text-xs font-semibold text-[#C4B5FD]"
          >
            {en ? "View all my resumes" : "Ver todos mis CVs"}
          </Link>
        )}
      </div>
    </>
  );
}

function ResultMessage({
  language,
  icon,
  eyebrow,
  title,
  description,
  action,
}: {
  language: "es" | "en";
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#A78BFA]/20 bg-[#A78BFA]/10 text-[#C4B5FD]">
        {icon}
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
        {eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/58">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
      <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-white/38">
        <ShieldCheck className="h-3.5 w-3.5" />
        {language === "en" ? "Check the previous purchase before paying again" : "Verificá la compra anterior antes de volver a pagar"}
      </div>
    </div>
  );
}
