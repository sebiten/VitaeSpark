"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PublicFeedback = {
  rating: number | null;
  message: string | null;
  source: string | null;
};

type ConversionProofProps = {
  variant?: "home" | "landing" | "checkout";
  className?: string;
};

const fallbackExamples = [
  {
    title: "Perfil menos generico",
    before: "Soy responsable y con ganas de trabajar.",
    after:
      "Perfil orientado a tareas operativas, disponibilidad horaria y trabajo por objetivos.",
  },
  {
    title: "Experiencia mas clara",
    before: "Hacia tareas varias.",
    after:
      "Reposicion, control de stock, orden de deposito y atencion de consultas en salon.",
  },
  {
    title: "CV listo para enviar",
    before: "Datos sueltos en Word.",
    after:
      "PDF prolijo, editable desde perfil y asociado a la plantilla elegida.",
  },
];

export function ConversionProof({
  variant = "home",
  className,
}: ConversionProofProps) {
  const [feedback, setFeedback] = useState<PublicFeedback[]>([]);

  useEffect(() => {
    let isMounted = true;

    fetch("/api/public-feedback")
      .then((res) => (res.ok ? res.json() : { feedback: [] }))
      .then((data) => {
        if (isMounted) setFeedback(data.feedback ?? []);
      })
      .catch(() => {
        if (isMounted) setFeedback([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const compact = variant === "checkout";

  return (
    <section
      className={cn(
        "overflow-hidden rounded-[30px] border border-white/10 bg-[#15151A]/88 text-white shadow-[0_20px_54px_rgba(0,0,0,0.18)]",
        compact ? "p-4" : "p-5 sm:p-6",
        className,
      )}
      aria-label="Confianza y ejemplos de VitaeSpark"
    >
      <div
        className={cn(
          "grid gap-5",
          compact ? "" : "lg:grid-cols-[0.85fr_1.15fr] lg:items-start",
        )}
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#A78BFA]/18 bg-[#7C3AED]/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D7C8FF]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Confianza antes de pagar
          </div>
          <h2
            className={cn(
              "mt-4 font-semibold tracking-[-0.035em]",
              compact ? "text-lg" : "text-2xl sm:text-3xl",
            )}
          >
            CV serio, pago unico y sin promesas infladas.
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/62">
            VitaeSpark no promete entrevistas. Te ayuda a ordenar datos reales,
            mejorar redaccion y descargar un PDF mas claro para postularte hoy.
          </p>
          <div className="mt-4 grid gap-2 text-sm text-white/70">
            {[
              "Preview antes de pagar",
              "PDF sin marca de agua despues del pago",
              "Edicion posterior desde tu perfil",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {feedback.length > 0 ? (
          <div
            className={cn(
              "grid gap-3",
              compact ? "" : "md:grid-cols-3 lg:grid-cols-1",
            )}
          >
            {feedback.slice(0, compact ? 2 : 3).map((item, index) => (
              <article
                key={`${item.message}-${index}`}
                className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-[#D7C8FF]">
                  <MessageSquareQuote className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Opinion anonima
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/76">
                  &quot;{item.message}&quot;
                </p>
                {item.rating ? (
                  <p className="mt-3 text-xs font-medium text-white/42">
                    {item.rating}/5 - Usuario verificado
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-3",
              compact ? "" : "md:grid-cols-3 lg:grid-cols-1",
            )}
          >
            {fallbackExamples.slice(0, compact ? 2 : 3).map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/8 bg-white/[0.035] p-4"
              >
                <div className="mb-3 flex items-center gap-2 text-[#D7C8FF]">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.14em]">
                    Ejemplo de mejora
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-white/42">
                  Antes: {item.before}
                </p>
                <p className="mt-1 text-sm leading-6 text-white/76">
                  Despues: {item.after}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
