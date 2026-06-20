"use client";

import Image from "next/image";
import { FileDown, PencilLine, ScanSearch, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const marginNotes = [
  {
    icon: PencilLine,
    title: "Perfil más claro",
    text: "Resume experiencia sin sonar genérico.",
  },
  {
    icon: ScanSearch,
    title: "Lectura ATS",
    text: "Estructura simple, secciones reconocibles.",
  },
  {
    icon: FileDown,
    title: "PDF listo",
    text: "Diseño serio para enviar o guardar.",
  },
];

export default function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[640px] lg:mr-0"
    >
      <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-[#7A5CFF]/12 blur-[90px]" />
      <div className="absolute bottom-6 right-4 h-52 w-52 rounded-full bg-[#F6F2EA]/8 blur-[100px]" />

      <div className="relative overflow-hidden rounded-[34px] border border-[#F6F2EA]/10 bg-[#18171C] p-3 shadow-[0_36px_90px_rgba(0,0,0,0.46)] sm:p-4">
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(135deg,rgba(246,242,234,0.5)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="relative grid gap-3 lg:grid-cols-[minmax(0,1fr)_184px]">
          <div className="relative overflow-hidden rounded-[28px] border border-[#F6F2EA]/10 bg-[#F7F3EA] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-3">
            <div className="absolute inset-y-6 left-7 z-10 hidden w-px bg-[#7A5CFF]/25 sm:block" />
            <div className="absolute left-5 top-5 z-10 hidden h-2 w-2 rounded-full bg-[#7A5CFF] shadow-[0_0_0_6px_rgba(122,92,255,0.12)] sm:block" />

            <div className="relative overflow-hidden rounded-[22px] bg-white shadow-[0_18px_44px_rgba(20,17,14,0.18)]">
              <Image
                src="/elegance-good.webp"
                alt="Vista previa de currículum profesional generado con VitaeSpark"
                width={560}
                height={680}
                priority
                fetchPriority="high"
                draggable={false}
                quality={90}
                sizes="(min-width: 1024px) 36vw, 94vw"
                className="w-full object-cover object-top"
              />

              <div className="absolute inset-x-4 top-4 rounded-2xl border border-[#141114]/8 bg-white/88 px-3 py-2 shadow-[0_12px_30px_rgba(20,17,14,0.12)] backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A3B7A]">
                    VitaeSpark
                  </span>
                  <span className="rounded-full bg-[#141114] px-2.5 py-1 text-[10px] font-medium text-[#F6F2EA]">
                    editable
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-[#F6F2EA]/12 bg-[#111014]/90 p-3 shadow-[0_18px_38px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7A5CFF] text-white shadow-[0_12px_28px_rgba(122,92,255,0.32)]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F6F2EA]">
                      La IA no inventa: ordena
                    </p>
                    <p className="mt-1 text-[12px] leading-5 text-[#D8D2C8]/70">
                      Tus datos siguen siendo tuyos. El resultado se lee más
                      claro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="grid gap-2.5 lg:content-center">
            {marginNotes.map(({ icon: Icon, title, text }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: 0.2 + index * 0.08 }}
                className="group relative rounded-[22px] border border-[#F6F2EA]/10 bg-[#F6F2EA]/[0.045] p-4 shadow-[inset_0_1px_0_rgba(246,242,234,0.06)] backdrop-blur-xl"
              >
                <div className="absolute -left-3 top-1/2 hidden h-px w-3 bg-[#7A5CFF]/55 lg:block" />
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#D7C8FF]/18 bg-[#7A5CFF]/14 text-[#D7C8FF]">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-[#F6F2EA]">{title}</p>
                <p className="mt-1 text-[12px] leading-5 text-[#D8D2C8]/62">
                  {text}
                </p>
              </motion.div>
            ))}
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
