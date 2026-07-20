"use client";

import { useMemo, useRef, useState } from "react";
import { AlertCircle, Check, CheckCircle2, ClipboardCheck } from "lucide-react";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { getBlogCreateHref } from "@/lib/blog-intent";
import { recordGaEvent } from "@/lib/analytics-events";
import { cn } from "@/lib/utils";

type BlogCvDiagnosticCtaProps = {
  path: string;
};

const diagnosticItems = [
  "No queda claro qué puesto busco",
  "Mis habilidades aparecen sin contexto",
  "Mi experiencia cuesta leer rápido",
  "El formato todavía no está listo para enviar",
];

export function BlogCvDiagnosticCta({ path }: BlogCvDiagnosticCtaProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const completionTracked = useRef(false);
  const selectedCount = selectedItems.length;

  const result = useMemo(() => {
    if (selectedCount >= 2) {
      return {
        icon: AlertCircle,
        title: "Conviene ordenar tu CV antes de postularte",
        text: "Ya detectaste varias mejoras concretas. Podés resolverlas juntas en un CV completo.",
        className: "border-[#A78BFA]/22 bg-[#A78BFA]/8",
      };
    }

    if (selectedCount === 1) {
      return {
        icon: ClipboardCheck,
        title: "Hay una mejora concreta para resolver",
        text: "Usá la guía para ajustar ese punto y revisá cómo queda dentro del CV completo.",
        className: "border-white/12 bg-white/[0.035]",
      };
    }

    return {
      icon: CheckCircle2,
      title: "Hacé un chequeo rápido",
      text: "Marcá los puntos que hoy no se ven claros en tu currículum.",
      className: "border-white/10 bg-transparent",
    };
  }, [selectedCount]);

  const ResultIcon = result.icon;

  const toggleItem = (item: string) => {
    setSelectedItems((current) => {
      const next = current.includes(item)
        ? current.filter((selected) => selected !== item)
        : [...current, item];

      recordGaEvent("blog_diagnostic_interaction", {
        article_path: path,
        issues_selected: next.length,
      });

      if (next.length >= 2 && !completionTracked.current) {
        completionTracked.current = true;
        recordGaEvent("blog_diagnostic_completed", {
          article_path: path,
          issues_selected: next.length,
        });
      }

      return next;
    });
  };

  return (
    <section className="border-y border-white/10 py-7 sm:py-8" aria-label="Diagnóstico del CV">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
        <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
        Diagnóstico rápido
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-end">
        <div>
          <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white">
            ¿Tu CV está aprovechando esta guía?
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/58">
            Marcá lo que hoy falta o todavía genera dudas.
          </p>
        </div>
        <p className="text-xs leading-5 text-white/42 sm:text-right">
          Dos o más puntos suelen indicar que conviene revisar el documento completo.
        </p>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {diagnosticItems.map((item) => {
          const isSelected = selectedItems.includes(item);

          return (
            <button
              key={item}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggleItem(item)}
              className={cn(
                "flex min-h-12 items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm leading-5 transition-colors",
                isSelected
                  ? "border-[#A78BFA]/30 bg-[#A78BFA]/10 text-white"
                  : "border-white/8 bg-white/[0.02] text-white/64 hover:border-white/14 hover:text-white/84",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  isSelected
                    ? "border-[#A78BFA] bg-[#A78BFA] text-[#111113]"
                    : "border-white/18 text-transparent",
                )}
              >
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {item}
            </button>
          );
        })}
      </div>

      <div className={cn("mt-4 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center", result.className)}>
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <ResultIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#C4B5FD]" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-white">{result.title}</p>
            <p className="mt-1 text-xs leading-5 text-white/56">{result.text}</p>
          </div>
        </div>
        <TrackedCtaLink
          href={getBlogCreateHref(path)}
          label="Aplicar mejoras a mi CV"
          sourcePath={path}
          sourceType="blog"
          trackingLabel="blog_diagnostic_cta"
          buttonSize="sm"
          buttonClassName="w-full shrink-0 rounded-full bg-[#F6F2EA] text-[#121114] shadow-none hover:bg-white sm:w-auto"
        />
      </div>
    </section>
  );
}
