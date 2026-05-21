"use client";

import Image from "next/image";
import { BadgeCheck, FileDown, ScanSearch, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const floatingCards = [
  {
    label: "Lectura ATS",
    value: "98/100",
    icon: ScanSearch,
    tone: "text-[#67D2FF] bg-[#38BDF8]/10 border-[#38BDF8]/15",
  },
  {
    label: "Tiempo",
    value: "3 minutos",
    icon: Sparkles,
    tone: "text-[#C9B3FF] bg-[#8B5CF6]/10 border-[#8B5CF6]/15",
  },
  {
    label: "Entrega",
    value: "PDF listo",
    icon: FileDown,
    tone: "text-[#86EFAC] bg-emerald-500/10 border-emerald-500/15",
  },
];

export default function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
      className="relative mx-auto mt-2 w-full max-w-[560px] lg:mt-0"
    >
      <div className="absolute -left-6 top-16 h-36 w-36 rounded-full bg-[#7C3AED]/14 blur-[70px]" />
      <div className="absolute -bottom-10 right-0 h-36 w-36 rounded-full bg-[#38BDF8]/12 blur-[74px]" />

      <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,30,0.94)_0%,rgba(12,12,18,0.96)_100%)] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-4">
        <div className="mb-3 rounded-[24px] border border-white/10 bg-white/[0.03] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#67D2FF]">
                Vista previa
              </p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-[15px]">
                Currículum generado por VitaeSpark
              </p>
            </div>
            <span className="rounded-full border border-[#38BDF8]/18 bg-[#38BDF8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0F0F10] shadow-[0_8px_20px_rgba(56,189,248,0.25)]">
              ATS
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20 bg-gradient-to-b from-[#38BDF8]/18 via-[#38BDF8]/4 to-transparent" />
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-white/18 to-transparent" />
          <Image
            src="/elegance-good.webp"
            alt="Currículum profesional generado con VitaeSpark"
            width={560}
            height={680}
            priority
            fetchPriority="high"
            draggable={false}
            quality={88}
            sizes="(min-width: 1024px) 42vw, 94vw"
            className="w-full object-cover object-top"
          />

          <div className="absolute inset-x-3 bottom-3 rounded-[22px] border border-white/15 bg-[#111113]/84 p-3 shadow-[0_18px_36px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED] text-white shadow-[0_10px_24px_rgba(124,58,237,0.3)]">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white sm:text-[15px]">
                  Perfil y experiencia mejor redactados
                </p>
                <p className="mt-1 text-[12px] leading-5 text-white/65 sm:text-sm">
                  Mantiene tu información, pero la presenta con más orden,
                  claridad y foco para entrevistas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {floatingCards.map(({ label, value, icon: Icon, tone }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + index * 0.08 }}
              className="rounded-[22px] border border-white/10 bg-white/[0.03] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${tone}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/42">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto mt-3 flex max-w-[92%] items-center justify-between rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.02)_100%)] px-4 py-3 text-[12px] text-white shadow-[0_16px_34px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:hidden">
        <span className="inline-flex items-center gap-2 font-medium text-white/78">
          <BadgeCheck className="h-4 w-4 text-[#C9B3FF]" />
          Mejorado con IA
        </span>
        <span className="font-medium text-[#67D2FF]">Listo para enviar</span>
      </div>
    </motion.div>
  );
}
