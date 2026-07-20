"use client";

import Image from "next/image";
import { Check, FileText, ShieldCheck } from "lucide-react";
import { CV_TEMPLATES, type CvTemplateDefinition } from "@/lib/cv-templates";
import { cn } from "@/lib/utils";

type Props = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

function TemplateChoice({
  template,
  selected,
  compact = false,
  onSelect,
}: {
  template: CvTemplateDefinition;
  selected: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group relative w-full overflow-hidden rounded-[22px] border text-left outline-none transition-[border-color,background-color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] active:scale-[0.99]",
        compact
          ? "grid min-h-[138px] grid-cols-[112px_minmax(0,1fr)] bg-white/[0.025] sm:grid-cols-[128px_minmax(0,1fr)]"
          : "flex h-full flex-col bg-[#151519]",
        selected
          ? "border-[#9A76ED]/70 bg-[#1A1720]"
          : "border-white/9 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.045]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#E9E9E6]",
          compact ? "h-full min-h-[138px]" : "h-64 sm:h-72",
        )}
      >
        <Image
          src={template.image}
          alt={`Vista previa de la plantilla ${template.name}`}
          fill
          sizes={
            compact
              ? "128px"
              : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.018]"
        />
      </div>

      <div className={cn("min-w-0", compact ? "p-4" : "flex flex-1 flex-col p-5")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/48">
              {template.category}
            </p>
            <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.025em] text-[#F4F4F5]">
              {template.name}
            </h3>
          </div>
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
              selected
                ? "border-[#A78BFA] bg-[#7C3AED] text-white"
                : "border-white/12 bg-white/[0.035] text-transparent",
            )}
            aria-hidden="true"
          >
            <Check className="size-3.5" strokeWidth={2.2} />
          </span>
        </div>

        <p className="mt-2 text-[13px] leading-5 text-white/62">
          {template.description}
        </p>

        {!compact ? (
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-white/8 pt-4 text-[11px] text-white/55">
            {template.features.map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        ) : null}
      </div>
    </button>
  );
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: Props) {
  const recommendedTemplates = CV_TEMPLATES.slice(0, 3);
  const alternativeTemplates = CV_TEMPLATES.slice(3);

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-4 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-[#D8CBF7]">
          <FileText className="size-5" />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/48">
          Paso 1 de 3
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#F5F5FA] sm:text-3xl">
          Elegí la estructura, no solo el color
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/65 sm:text-base">
          Compará cómo prioriza cada formato tu experiencia. Podés cambiarlo
          antes de pagar sin volver a cargar los datos.
        </p>
      </div>

      <section aria-labelledby="recommended-templates-title">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-white/9 pb-3">
          <div>
            <h3
              id="recommended-templates-title"
              className="text-base font-semibold text-[#F4F4F5]"
            >
              Empezá por estas opciones
            </h3>
            <p className="mt-1 text-sm text-white/52">
              Tres estructuras distintas para la mayoría de las postulaciones.
            </p>
          </div>
          <span className="hidden text-xs text-white/42 sm:block">3 recomendadas</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recommendedTemplates.map((template) => (
            <TemplateChoice
              key={template.id}
              template={template}
              selected={selectedTemplate === template.id}
              onSelect={() => onSelectTemplate(template.id)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="alternative-templates-title">
        <div className="mb-4 border-b border-white/9 pb-3">
          <h3
            id="alternative-templates-title"
            className="text-base font-semibold text-[#F4F4F5]"
          >
            Más estilos
          </h3>
          <p className="mt-1 text-sm text-white/52">
            Cambian la presencia visual, pero mantienen el contenido editable.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {alternativeTemplates.map((template) => (
            <TemplateChoice
              key={template.id}
              template={template}
              selected={selectedTemplate === template.id}
              compact
              onSelect={() => onSelectTemplate(template.id)}
            />
          ))}
        </div>
      </section>

      <div className="mx-auto flex max-w-3xl items-start gap-3 border-t border-white/9 pt-4 text-left text-sm leading-6 text-white/64">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#A78BFA]" />
        <p>
          Todas generan un PDF profesional. Después del pago podés editar el
          contenido y volver a descargarlo con la plantilla elegida.
        </p>
      </div>
    </div>
  );
}
