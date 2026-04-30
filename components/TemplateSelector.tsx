"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon,
  FileText,
  Star,
  Eye,
  Sparkles,
  Crown,
  Zap,
  Award,
  Cross,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const templates = [
  {
    id: "elegance",
    name: "Elegante",
    color: "#0A2C7C", // algo asi pero mas claro
    image: "/elegance-good.webp",
    description: "Sofisticado y único",
    category: "Moderno",
    features: ["Diseño moderno", "Elegante", "Con Foto"],
    popularity: 96,
  },

  {
    id: "purple",
    name: "Morado",
    color: "#8B5CF6",
    image: "/purple-hero.webp",
    description: "Creativo y moderno",
    category: "Creativo",
    features: ["Diseño Moderno", "Colores Vibrantes", "Con Foto"],
    popularity: 95,
  },
  {
    id: "blue",
    name: "Azul",
    color: "#1E40AF",
    image: "/blue.webp",
    description: "Corporativo y confiable",
    category: "Creativo",
    features: ["Diseño Moderno", "Colores Vibrantes", "Con Foto"],

    popularity: 92,
  },
  {
    id: "green",
    name: "Verde",
    color: "#15803D",
    image: "/green.webp",
    description: "Fresco y dinámico",
    category: "Creativo",
    features: ["Diseño Moderno", "Colores Vibrantes", "Con Foto"],

    popularity: 78,
  },
  {
    id: "harvard",
    name: "Harvard",
    color: "#fff",
    image: "/harvard.webp",
    description: "Clásico y profesional",
    category: "Tradicional",
    features: ["Diseño Clásico", "Muy Legible", "Destacado"],
    popularity: 95,
  },
];

type Props = {
  selectedTemplate: string;
  onSelectTemplate: (id: string) => void;
};

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: Props) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);

  return (
    <div className="space-y-5 sm:space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3 text-center sm:space-y-6"
      >
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
            Elige tu plantilla perfecta
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#A1A1AA] sm:text-lg">
            Selecciona el diseño que mejor represente tu estilo profesional y
            destaque tus fortalezas
          </p>
        </div>
      </motion.div>

      {/* Template Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
      >
        {templates.map((tpl, index) => (
          <motion.div
            key={tpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
            onMouseEnter={() => setHoveredTemplate(tpl.id)}
            onMouseLeave={() => setHoveredTemplate(null)}
          >
            <div
              className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-500 hover:scale-[1.02] ${
                selectedTemplate === tpl.id
                  ? "border-[#7C3AED] shadow-2xl shadow-[#7C3AED]/25 bg-gradient-to-br from-[#7C3AED]/5 to-[#06B6D4]/5"
                  : "border-[#3A3A3D] hover:border-[#7C3AED]/50 bg-gradient-to-br from-[#1C1C1E] to-[#2A2A2D]"
              }`}
              onClick={() => onSelectTemplate(tpl.id)}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
              <AnimatePresence>
                {hoveredTemplate === tpl.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#06B6D4]/10"
                  />
                )}
              </AnimatePresence>

              {/* CV Preview Image */}
              <div className="relative h-44 overflow-hidden rounded-t-xl sm:h-48">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                <img
                  src={tpl.image}
                  alt={`Vista previa ${tpl.name}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Info */}
                <div className="absolute top-3 left-3 z-20">
                  <Badge className="bg-black/50 backdrop-blur-sm text-white border-white/20">
                    {tpl.category}
                  </Badge>
                </div>

                <div className="absolute top-3 right-3 z-20">
                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-white text-xs font-medium">
                      {tpl.popularity}%
                    </span>
                  </div>
                </div>

                {/* {tpl.recommended && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white border-0 shadow-lg">
                      <Crown className="w-3 h-3 mr-1" />
                      Recomendado
                    </Badge>
                  </div>
                )} */}
              </div>

              {/* Content */}
              <div className="relative space-y-3 p-4 sm:space-y-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{
                        backgroundColor: tpl.color,
                        boxShadow: `0 4px 15px ${tpl.color}40`,
                      }}
                    />
                    <div>
                      <h4 className="font-bold text-[#F4F4F5] text-lg">
                        {tpl.name}
                      </h4>
                      <p className="text-[#A1A1AA] text-sm">
                        {tpl.description}
                      </p>
                    </div>
                  </div>

                  {selectedTemplate === tpl.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-[#7C3AED] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <CheckIcon className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Features */}
                <div className="flex gap-1  flex-wrap">
                  {tpl.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-1 py-1 bg-[#3A3A3D]/50 text-[#D4D4D8] text-xs rounded-md border border-[#4A4A4D]/30"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Preview Button */}
              </div>

              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredTemplate === tpl.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${tpl.color}10, transparent)`,
                      boxShadow: `0 0 30px ${tpl.color}20`,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
            <Dialog
              open={openDialogId === tpl.id}
              onOpenChange={(open) => setOpenDialogId(open ? tpl.id : null)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full   text-[#D4D4D8]   transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenDialogId(tpl.id);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Vista previa completa
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-5xl p-2 overflow-hidden bg-[#0F0F10] border border-[#2A2A2D] text-[#F4F4F5]">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold flex items-center"></DialogTitle>
                </DialogHeader>
                <div className="relative p-2">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
                    <img
                      src={tpl.image}
                      alt={`Vista previa completa ${tpl.name}`}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Button
                      onClick={() => {
                        onSelectTemplate(tpl.id);
                        setOpenDialogId(null);
                      }}
                      className="flex-1 mt-4 gap-2 w-full  text-white bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] transition-all duration-300 shadow-lg shadow-[#7C3AED]/25 h-12"
                    >
                      <CheckIcon className="w-5 h-5 mr-2" />
                      Seleccionar esta plantilla
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => setOpenDialogId(null)}
                      className="flex-1 w-full mt-4 gap-2  text-white bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#6D28D9] hover:to-[#5B21B6] transition-all duration-300 shadow-lg shadow-[#7C3AED]/25 h-12"
                    >
                      <X />
                      Cerrar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
