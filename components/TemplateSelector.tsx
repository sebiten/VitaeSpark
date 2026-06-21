"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, FileText, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

const templates = [
  {
    id: "elegance",
    name: "Elegancia",
    description: "Clasica, clara y profesional",
    category: "Versatil",
    features: ["ATS", "PDF", "Editable"],
    recommended: true,
  },
  {
    id: "harvard",
    name: "Harvard",
    description: "Sobria para perfiles formales",
    category: "Formal",
    features: ["ATS", "Sin foto", "Editable"],
    recommended: false,
  },
  {
    id: "blue",
    name: "Azul Corporativo",
    description: "Ordenada para empresas",
    category: "Corporativo",
    features: ["ATS", "PDF", "Editable"],
    recommended: false,
  },
  {
    id: "purple",
    name: "Purpura Pro",
    description: "Moderna sin perder legibilidad",
    category: "Moderno",
    features: ["ATS", "PDF", "Editable"],
    recommended: false,
  },
  {
    id: "green",
    name: "Verde Energia",
    description: "Simple para roles operativos",
    category: "Operativo",
    features: ["ATS", "PDF", "Editable"],
    recommended: false,
  },
] as const;

const templateColors: Record<(typeof templates)[number]["id"], string> = {
  elegance: "#0A2C7C",
  harvard: "#E4E4E7",
  blue: "#1E40AF",
  purple: "#8B5CF6",
  green: "#15803D",
};

const templateImages: Record<(typeof templates)[number]["id"], string> = {
  elegance: "/elegance-good.webp",
  harvard: "/harvard.webp",
  blue: "/blue.webp",
  purple: "/purple-hero.webp",
  green: "/green.webp",
};

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#D8CBF7]">
          <FileText className="h-5 w-5" />
        </div>
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/48">
          Paso 1 de 3
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#F5F5FA] sm:text-3xl">
          Elegi una base para tu CV
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/64 sm:text-base">
          No es una decision final. Podes cambiar la plantilla despues sin perder
          los datos que cargues.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
        {templates.map((tpl) => {
          const isSelected = selectedTemplate === tpl.id;

          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => onSelectTemplate(tpl.id)}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-[24px] border bg-[#141419] text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-white/18 hover:bg-[#17171d]",
                isSelected
                  ? "border-[#8B5CF6]/42 shadow-[0_18px_44px_rgba(82,43,148,0.22)]"
                  : "border-white/8 shadow-[0_12px_30px_rgba(5,5,12,0.12)]",
              )}
            >
              <div className="relative h-52 overflow-hidden bg-[#ECEAE4] sm:h-48 lg:h-56">
                <Image
                  src={templateImages[tpl.id]}
                  alt={`Vista previa de plantilla ${tpl.name}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141419] to-transparent" />
                {isSelected ? (
                  <div className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-white/14 bg-[#6F3CD2] text-white shadow-[0_10px_24px_rgba(70,30,140,0.28)]">
                    <CheckIcon className="h-4 w-4" />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Badge className="border-white/10 bg-white/[0.05] text-[10px] font-medium uppercase tracking-[0.14em] text-white/62 hover:bg-white/[0.05]">
                    {tpl.category}
                  </Badge>
                  {tpl.recommended ? (
                    <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#C9B8FF]">
                      Recomendada
                    </span>
                  ) : null}
                </div>

                <div className="flex items-start gap-3">
                  <span
                    className="mt-1 size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: templateColors[tpl.id] }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#F4F4F8]">
                      {tpl.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-5 text-white/58">
                      {tpl.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {tpl.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/8 bg-white/[0.035] px-2 py-1 text-[11px] text-white/58"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-[22px] border border-white/8 bg-white/[0.035] px-4 py-3 text-left text-sm leading-6 text-white/66">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#A78BFA]" />
        <p>
          Todas las plantillas generan un PDF profesional. La IA ordena el
          contenido y vos podes editar el CV guardado desde tu perfil.
        </p>
      </div>
    </div>
  );
}
