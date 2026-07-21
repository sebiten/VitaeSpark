"use client";

import Image from "next/image";
import { ArrowRight, Check, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_TEMPLATES, type CvTemplateDefinition } from "@/lib/cv-templates";
import { cn } from "@/lib/utils";

type Props = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
  onContinue: () => void;
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
        "group relative w-full overflow-hidden rounded-[20px] border text-left outline-none transition-[border-color,background-color,transform] duration-200 focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113] active:scale-[0.99]",
        compact
          ? "grid min-h-[126px] grid-cols-[104px_minmax(0,1fr)] bg-white/[0.018] sm:grid-cols-[118px_minmax(0,1fr)]"
          : "flex h-full flex-col bg-[#151519]",
        selected
          ? "border-[#A78BFA]/70 bg-[#1A1720]"
          : "border-white/9 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.035]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-[#E9E9E6]",
          compact ? "h-full min-h-[126px]" : "h-56 sm:h-64",
        )}
      >
        <Image
          src={template.image}
          alt={`Vista previa de la plantilla ${template.name}`}
          fill
          sizes={
            compact
              ? "118px"
              : "(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.012]"
        />
      </div>

      <div className={cn("min-w-0", compact ? "p-4" : "flex flex-1 flex-col p-4")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/58">{template.category}</p>
            <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.025em] text-[#F4F4F5]">
              {template.name}
            </h3>
          </div>
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors",
              selected
                ? "border-[#A78BFA] bg-[#7C3AED] text-white"
                : "border-white/14 bg-white/[0.025] text-transparent",
            )}
            aria-hidden="true"
          >
            <Check className="size-3.5" strokeWidth={2.2} />
          </span>
        </div>

        <p className="mt-2 text-[13px] leading-5 text-white/66">
          {template.description}
        </p>

        {!compact ? (
          <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-white/8 pt-3 text-xs text-white/58">
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
  onContinue,
}: Props) {
  const recommendedTemplates = CV_TEMPLATES.slice(0, 3);
  const alternativeTemplates = CV_TEMPLATES.slice(3);
  const selected =
    CV_TEMPLATES.find((template) => template.id === selectedTemplate) ??
    CV_TEMPLATES[0];

  return (
    <div className="space-y-7 sm:space-y-9">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium text-[#C4B5FD]">Elegí la base de tu CV</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#F6F2EA] sm:text-3xl">
          Una estructura clara vale más que un diseño llamativo
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/68 sm:text-base">
          Compará cómo organiza cada plantilla tu experiencia. Antes de pagar podés
          cambiarla sin volver a cargar tus datos.
        </p>
      </header>

      <div className="mx-auto flex max-w-3xl flex-col gap-3 border-y border-white/9 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs text-white/56">Plantilla seleccionada</p>
          <p className="mt-1 truncate text-base font-semibold text-[#F4F4F5]">
            {selected.name}
          </p>
        </div>
        <Button
          type="button"
          onClick={onContinue}
          className="h-12 w-full rounded-full bg-[#F6F2EA] px-6 text-sm font-semibold text-[#111113] shadow-none hover:bg-[#EDE8DE] focus-visible:ring-[#A78BFA]/55 sm:w-auto"
        >
          Usar {selected.name} y continuar
          <ArrowRight className="size-4" />
        </Button>
      </div>

      <section aria-labelledby="recommended-templates-title">
        <div className="mb-4 border-b border-white/9 pb-3">
          <h2
            id="recommended-templates-title"
            className="text-base font-semibold text-[#F4F4F5]"
          >
            Recomendadas
          </h2>
          <p className="mt-1 text-sm text-white/58">
            Tres opciones para la mayoría de las postulaciones.
          </p>
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

      <details className="group border-y border-white/9">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-white/76 outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/45 [&::-webkit-details-marker]:hidden">
          <span>Ver {alternativeTemplates.length} estilos más</span>
          <ChevronDown className="size-4 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="grid gap-3 pb-5 lg:grid-cols-2">
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
      </details>

      <div className="mx-auto flex max-w-3xl items-start gap-3 text-left text-sm leading-6 text-white/66">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#A78BFA]" />
        <p>
          Podés completar todo sin registrarte. El inicio de sesión aparece recién
          cuando generás el CV para guardar el resultado de forma segura.
        </p>
      </div>
    </div>
  );
}
