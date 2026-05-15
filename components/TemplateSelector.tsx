"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, Crown, Eye, FileText, Star, X } from "lucide-react";

type Props = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

const templates = [
  {
    id: "elegance",
    name: "Elegancia",
    description: "Diseño profesional clásico",
    category: "Clásico",
    features: ["ATS Optimizado", "PDF", "Editable"],
  },
  {
    id: "purple",
    name: "Púrpura Pro",
    description: "Moderno y llamativo",
    category: "Moderno",
    features: ["ATS Optimizado", "PDF", "Colores vibrantes"],
  },
  {
    id: "blue",
    name: "Azul Corporativo",
    description: "Ideal para empresas",
    category: "Corporativo",
    features: ["ATS Optimizado", "PDF", "Profesional"],
  },
  {
    id: "green",
    name: "Verde Energía",
    description: "Creativo y dinámico",
    category: "Creativo",
    features: ["ATS Optimizado", "PDF", "Diseño fresco"],
  },
  {
    id: "harvard",
    name: "Harvard",
    description: "El prestigio del estilo Harvard",
    category: "Premium",
    features: ["ATS Optimizado", "PDF", "Diseño exclusivo"],
  },
];

const templateColors: Record<string, string> = {
  elegance: "#0A2C7C",
  purple: "#8B5CF6",
  blue: "#1E40AF",
  green: "#15803D",
  harvard: "#F4F4F5",
};

const templateImages: Record<string, string> = {
  elegance: "/elegance-good.webp",
  purple: "/purple-hero.webp",
  blue: "/blue.webp",
  green: "/green.webp",
  harvard: "/harvard.webp",
};

const templatePopularity: Record<string, number> = {
  elegance: 96,
  purple: 95,
  blue: 92,
  green: 78,
  harvard: 95,
};

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: Props) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  return (
    <div className="space-y-5 sm:space-y-8">
      <div className="space-y-3 text-center sm:space-y-6">
        <div className="relative inline-block">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] shadow-xl shadow-[#7C3AED]/20 sm:h-24 sm:w-24 sm:rounded-3xl sm:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <FileText className="relative z-10 h-7 w-7 text-white sm:h-12 sm:w-12" />
          </div>
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] shadow-lg sm:h-8 sm:w-8">
            <Crown className="h-3 w-3 text-white sm:h-4 sm:w-4" />
          </div>
        </div>

        <div>
          <h2 className="mb-2 bg-gradient-to-r from-white via-[#F4F4F5] to-[#D4D4D8] bg-clip-text text-2xl font-bold leading-tight text-transparent sm:mb-3 sm:text-3xl">
            Elige tu plantilla
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#A1A1AA] sm:text-lg">
            Selecciona el diseño perfecto para tu currículum
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {templates.map((tpl, idx) => {
          return (
            <div key={tpl.id} className="relative group">
              <button
                type="button"
                className={`relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  selectedTemplate === tpl.id
                    ? "border-[#7C3AED] bg-gradient-to-br from-[#7C3AED]/5 to-[#06B6D4]/5 shadow-2xl shadow-[#7C3AED]/25"
                    : "border-[#3A3A3D] bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2D] hover:border-[#7C3AED]/50"
                }`}
                onClick={() => onSelectTemplate(tpl.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#06B6D4]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative h-44 overflow-hidden rounded-t-xl sm:h-48">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent" />
                  <Image
                    src={templateImages[tpl.id]}
                    alt={`Vista previa de ${tpl.name}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3 z-20">
                    <Badge className="border-white/20 bg-black/50 text-white backdrop-blur-sm">
                      {tpl.category}
                    </Badge>
                  </div>

                  <div className="absolute right-3 top-3 z-20">
                    <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs font-medium text-white">
                        {templatePopularity[tpl.id]}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="relative space-y-3 p-4 sm:space-y-4 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full shadow-lg"
                        style={{
                          backgroundColor: templateColors[tpl.id],
                          boxShadow: `0 4px 15px ${templateColors[tpl.id]}40`,
                        }}
                      />
                      <div>
                        <h4 className="text-lg font-bold text-[#F4F4F5]">
                          {tpl.name}
                        </h4>
                        <p className="text-sm text-[#A1A1AA]">
                          {tpl.description}
                        </p>
                      </div>
                    </div>

                    {selectedTemplate === tpl.id && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C3AED] shadow-lg">
                        <CheckIcon className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tpl.features.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-md border border-[#4A4A4D]/30 bg-[#3A3A3D]/50 px-2 py-1 text-xs text-[#D4D4D8]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${templateColors[tpl.id]}10, transparent)`,
                    boxShadow: `0 0 30px ${templateColors[tpl.id]}20`,
                  }}
                />
              </button>

              <Dialog
                open={openDialogId === tpl.id}
                onOpenChange={(open) => setOpenDialogId(open ? tpl.id : null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full text-[#D4D4D8] transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDialogId(tpl.id);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver plantilla
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-5xl overflow-hidden border border-[#2A2A2D] bg-[#0F0F10] p-2 text-[#F4F4F5]">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                      {tpl.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="relative p-2">
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
                      <Image
                        src={templateImages[tpl.id]}
                        alt={`Vista previa de ${tpl.name}`}
                        width={980}
                        height={1280}
                        sizes="(min-width: 1024px) 980px, 92vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Button
                        onClick={() => {
                          onSelectTemplate(tpl.id);
                          setOpenDialogId(null);
                        }}
                        className="mt-4 h-12 w-full flex-1 gap-2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 hover:from-[#6D28D9] hover:to-[#5B21B6]"
                      >
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Seleccionar
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setOpenDialogId(null)}
                        className="mt-4 h-12 w-full flex-1 gap-2 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 hover:from-[#6D28D9] hover:to-[#5B21B6]"
                      >
                        <X className="h-4 w-4" />
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          );
        })}
      </div>
    </div>
  );
}