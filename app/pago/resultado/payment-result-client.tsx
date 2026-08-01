"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FilePenLine,
  Loader2,
  MailCheck,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import type { RespuestaCV } from "@/lib/types/cv";
import { CREATE_DRAFT_KEY } from "@/lib/create-flow-state";

const PDFDownloadButton = dynamic(
  () => import("@/components/pdf/PDFDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-12 items-center justify-center rounded-xl bg-white/8 text-sm text-white/55">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Preparando PDF...
      </div>
    ),
  },
);

type PaidCv = {
  id: string;
  status: "pending" | "paid";
  cv_data: RespuestaCV["cv"];
  template: string | null;
};

type ResultState =
  | { kind: "checking" }
  | { kind: "pending" }
  | { kind: "paid"; cv: PaidCv; isGuest: boolean; accessSent: boolean }
  | { kind: "session_lost" }
  | { kind: "error"; message: string };

export default function PaymentResultClient({
  cvId,
  provider,
  returnStatus,
}: {
  cvId: string;
  provider: "mercado_pago" | "paypal";
  returnStatus: string | null;
}) {
  const [result, setResult] = useState<ResultState>({ kind: "checking" });
  const attemptsRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkPayment = useCallback(async () => {
    if (!cvId) {
      setResult({ kind: "error", message: "No pudimos identificar el CV." });
      return;
    }

    try {
      const response = await fetch(
        `/api/payment-status?cv_id=${encodeURIComponent(cvId)}`,
        { cache: "no-store" },
      );
      if (response.status === 401) {
        setResult({ kind: "session_lost" });
        return;
      }
      const payload = await response.json();
      if (!response.ok) {
        setResult({
          kind: "error",
          message: payload.error || "No pudimos verificar el pago.",
        });
        return;
      }

      if (payload.cv?.status === "paid") {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        setResult({
          kind: "paid",
          cv: payload.cv as PaidCv,
          isGuest: payload.isGuest === true,
          accessSent: payload.accessSent === true,
        });
        return;
      }

      attemptsRef.current += 1;
      setResult({ kind: "pending" });
      if (attemptsRef.current < 20) {
        timeoutRef.current = setTimeout(() => void checkPayment(), 1500);
      }
    } catch {
      setResult({
        kind: "error",
        message: "Se interrumpió la verificación. Intentá nuevamente.",
      });
    }
  }, [cvId]);

  useEffect(() => {
    void checkPayment();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [checkPayment]);

  const providerName = provider === "paypal" ? "PayPal" : "Mercado Pago";

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#101013] px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#15151A] shadow-2xl shadow-black/35">
        {result.kind === "paid" ? (
          <PaidResult result={result} />
        ) : result.kind === "session_lost" ? (
          <ResultMessage
            icon={<MailCheck className="h-6 w-6" />}
            eyebrow="Acceso protegido"
            title="El pago puede seguir procesándose"
            description="Este navegador perdió la sesión temporal. Si el pago fue aprobado, vas a recibir el acceso al CV en el email que ingresaste."
          />
        ) : result.kind === "error" ? (
          <ResultMessage
            icon={<RefreshCw className="h-6 w-6" />}
            eyebrow="No pudimos verificar"
            title="Revisemos el estado nuevamente"
            description={result.message}
            action={
              <button
                type="button"
                onClick={() => {
                  attemptsRef.current = 0;
                  setResult({ kind: "checking" });
                  void checkPayment();
                }}
                className="h-12 rounded-xl bg-[#F6F2EA] px-5 text-sm font-bold text-[#121114]"
              >
                Volver a verificar
              </button>
            }
          />
        ) : (
          <ResultMessage
            icon={
              result.kind === "checking" ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Clock3 className="h-6 w-6" />
              )
            }
            eyebrow={providerName}
            title={
              returnStatus === "failure" || returnStatus === "cancelled"
                ? "El pago no se completó"
                : "Estamos confirmando tu pago"
            }
            description={
              attemptsRef.current >= 20
                ? "La confirmación está tardando más de lo habitual. Podés volver a verificar sin pagar otra vez."
                : "No cierres esta pantalla. El PDF se habilita automáticamente cuando recibimos la confirmación."
            }
            action={
              attemptsRef.current >= 20 ? (
                <button
                  type="button"
                  onClick={() => {
                    attemptsRef.current = 0;
                    void checkPayment();
                  }}
                  className="h-12 rounded-xl border border-white/12 bg-white/[0.04] px-5 text-sm font-semibold text-white"
                >
                  Verificar nuevamente
                </button>
              ) : undefined
            }
          />
        )}
      </div>
    </main>
  );
}

function PaidResult({
  result,
}: {
  result: Extract<ResultState, { kind: "paid" }>;
}) {
  return (
    <>
      <div className="border-b border-white/8 px-6 py-7 text-center sm:px-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Pago confirmado
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]">
          Tu CV está listo para descargar
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/60">
          Ya quitamos la marca de agua. Podés descargar el PDF o editar los
          datos sin volver a pagar.
        </p>
      </div>

      <div className="space-y-3 px-6 py-6 sm:px-8">
        <PDFDownloadButton
          cv={result.cv.cv_data}
          template={result.cv.template}
          cvId={result.cv.id}
          label="Descargar PDF sin marca de agua"
          className="block w-full [&_button]:h-13 [&_button]:rounded-xl [&_button]:border-0 [&_button]:bg-[#F6F2EA] [&_button]:font-bold [&_button]:text-[#121114] [&_button:hover]:bg-white"
        />
        <Link
          href={`/editar-cv/${result.cv.id}`}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] text-sm font-semibold text-white transition hover:bg-white/[0.07]"
        >
          <FilePenLine className="h-4 w-4" />
          Editar este CV
        </Link>

        {result.isGuest ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#A78BFA]/18 bg-[#A78BFA]/[0.07] p-4">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#C4B5FD]" />
            <div>
              <p className="text-sm font-semibold">Guardalo para otro dispositivo</p>
              <p className="mt-1 text-xs leading-5 text-white/55">
                {result.accessSent
                  ? "Te enviamos un enlace para guardar este CV en una cuenta permanente."
                  : "Estamos preparando el enlace de acceso al email de la compra."}
              </p>
            </div>
          </div>
        ) : (
          <Link
            href="/perfil"
            className="block pt-2 text-center text-xs font-semibold text-[#C4B5FD]"
          >
            Ver todos mis CVs
          </Link>
        )}
      </div>
    </>
  );
}

function ResultMessage({
  icon,
  eyebrow,
  title,
  description,
  action,
}: {
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
        No vuelvas a pagar mientras verificamos
      </div>
    </div>
  );
}
