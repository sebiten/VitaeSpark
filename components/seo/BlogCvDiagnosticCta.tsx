"use client";

import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardCheck } from "lucide-react";
import { TrackedCtaLink } from "./TrackedCtaLink";
import { cn } from "@/lib/utils";

type BlogCvDiagnosticCtaProps = {
  path: string;
};

const diagnosticItems = [
  "Falta un perfil claro para el puesto que busco",
  "Mis habilidades quedan sueltas y sin contexto",
  "Mi experiencia no se entiende rapido",
  "Todavia no tengo un PDF prolijo para enviar",
];

export function BlogCvDiagnosticCta({ path }: BlogCvDiagnosticCtaProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const selectedCount = selectedItems.length;

  const result = useMemo(() => {
    if (selectedCount >= 2) {
      return {
        icon: AlertCircle,
        title: "Conviene ordenar tu CV antes de postularte",
        text: "Si varias partes todavia generan duda, la guia te sirve mejor cuando la convertis en un CV completo y editable.",
        tone: "strong" as const,
      };
    }

    if (selectedCount === 1) {
      return {
        icon: ClipboardCheck,
        title: "Hay una mejora concreta para resolver",
        text: "Usa esta guia para ajustar esa parte y dejar el CV mas claro antes de enviarlo.",
        tone: "medium" as const,
      };
    }

    return {
      icon: CheckCircle2,
      title: "Si ya tenes todo cubierto, podes pulirlo mas rapido",
      text: "Cargar tus datos en VitaeSpark te ayuda a revisar estructura, texto y formato en un solo flujo.",
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
      className="rounded-[28px] border border-white/8 bg-[#17171C] p-5 sm:p-6"
      aria-label="Diagnostico del CV"
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/52">
            <ClipboardCheck className="h-3.5 w-3.5 text-[#A78BFA]" />
            Diagnostico rapido
          </div>
          <h2 className="text-balance text-2xl font-semibold tracking-[-0.03em] text-white">
            ¿Tu CV esta aprovechando esta guia?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-white/66">
            Marca lo que hoy falta o te genera duda. Si aparecen dos o mas
            puntos, conviene armar el CV completo antes de seguir postulando.
          </p>

          <div className="mt-5 grid gap-2">
            {diagnosticItems.map((item) => {
              const isSelected = selectedItems.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleItem(item)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "border-[#8B5CF6]/30 bg-[#8B5CF6]/12 text-white"
                      : "border-white/8 bg-white/[0.025] text-white/68 hover:border-white/14 hover:bg-white/[0.045] hover:text-white/82",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border",
                      isSelected
                        ? "border-[#C4B5FD]/40 bg-[#8B5CF6] text-white"
                        : "border-white/14 bg-white/[0.03] text-transparent",
                    )}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "rounded-2xl border p-4",
            result.tone === "strong" &&
              "border-[#8B5CF6]/26 bg-[#8B5CF6]/10",
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
          <p className="mt-2 text-sm leading-6 text-white/66">{result.text}</p>
          <div className="mt-5">
            <TrackedCtaLink
              href="/crear"
              label="Crear mi CV con esta guia"
              sourcePath={path}
              sourceType="blog"
              trackingLabel="blog_diagnostic_cta"
              buttonClassName="w-full rounded-2xl bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/18 hover:bg-[#7C3AED]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
