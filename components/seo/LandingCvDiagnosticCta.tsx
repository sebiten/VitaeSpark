"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrackedCtaLink } from "./TrackedCtaLink";

type LandingCvDiagnosticCtaProps = {
  path: string;
  title: string;
  description: string;
  items: string[];
  ctaLabel: string;
  trackingLabel: string;
};

export function LandingCvDiagnosticCta({
  path,
  title,
  description,
  items,
  ctaLabel,
  trackingLabel,
}: LandingCvDiagnosticCtaProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedCount = selectedItems.length;

  const result = useMemo(() => {
    if (selectedCount >= 2) {
      return {
        icon: AlertCircle,
        title: "Conviene ordenar tu CV antes de postular",
        text: "Si faltan datos clave del puesto, seguridad o disponibilidad, un reclutador puede descartar el CV aunque tengas buen perfil.",
        tone: "strong" as const,
      };
    }

    if (selectedCount === 1) {
      return {
        icon: ClipboardCheck,
        title: "Hay una mejora concreta para resolver",
        text: "Corregir ese punto puede hacer que el CV se lea con más claridad antes de enviarlo.",
        tone: "medium" as const,
      };
    }

    return {
      icon: CheckCircle2,
      title: "Buen punto de partida",
      text: "Si ya tenes esos puntos cubiertos, podes usar VitaeSpark para pulir redaccion, estructura y PDF final.",
      tone: "soft" as const,
    };
  }, [selectedCount]);

  const ResultIcon = result.icon;

  const toggleItem = (item: string) => {
    setSelectedItems((current) =>
      current.includes(item)
        ? current.filter((selected) => selected !== item)
        : [...current, item],
    );
  };

  return (
    <section
      className="overflow-hidden rounded-[28px] border border-white/10 bg-[#17171B] p-5 sm:p-7"
      aria-label="Diagnostico para mejorar el CV"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/58">
            <ClipboardCheck className="h-3.5 w-3.5 text-[#A78BFA]" />
            Chequeo antes de enviar
          </div>
          <h2 className="text-2xl font-semibold leading-tight tracking-[-0.025em] text-white">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
            {description}
          </p>

          <div className="mt-6 grid gap-2.5">
            {items.map((item) => {
              const isSelected = selectedItems.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleItem(item)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3.5 py-3 text-left text-sm transition-colors",
                    isSelected
                      ? "border-[#A78BFA]/35 bg-[#8B5CF6]/12 text-white"
                      : "border-white/10 bg-white/[0.025] text-white/70 hover:border-white/18 hover:bg-white/[0.045] hover:text-white/86",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isSelected
                        ? "border-[#C4B5FD]/45 bg-[#8B5CF6] text-white"
                        : "border-white/16 bg-white/[0.03] text-transparent",
                    )}
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "rounded-3xl border p-5",
            result.tone === "strong" &&
              "border-[#A78BFA]/28 bg-[#8B5CF6]/10",
            result.tone === "medium" &&
              "border-white/10 bg-white/[0.035]",
            result.tone === "soft" &&
              "border-emerald-400/18 bg-emerald-400/8",
          )}
        >
          <div className="flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[#C4B5FD]">
            <ResultIcon className="h-5 w-5" />
          </div>
          <p className="mt-4 text-base font-semibold leading-6 text-white">
            {result.title}
          </p>
          <p className="mt-2 text-sm leading-6 text-white/68">{result.text}</p>
          <div className="mt-5">
            <TrackedCtaLink
              href="/crear?intent=job-specific"
              label={ctaLabel}
              sourcePath={path}
              sourceType="landing"
              trackingLabel={trackingLabel}
              buttonClassName="w-full rounded-2xl bg-[#F6F2EA] text-[#111113] shadow-lg shadow-black/20 hover:bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
