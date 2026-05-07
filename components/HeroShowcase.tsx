"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BadgeCheck, FileDown, PenLine, ScanSearch, Sparkles } from "lucide-react";

const floatingCards = [
  {
    label: "Lectura ATS",
    value: "Estructura clara",
    icon: <ScanSearch className="h-4 w-4" />,
    delay: 0.1,
  },
  {
    label: "IA aplicada",
    value: "Logros reescritos",
    icon: <Sparkles className="h-4 w-4" />,
    delay: 0.35,
  },
  {
    label: "PDF final",
    value: "Listo para enviar",
    icon: <FileDown className="h-4 w-4" />,
    delay: 0.55,
  },
];

export default function HeroShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-0 mt-1 w-full min-w-0 max-w-[358px] px-0 sm:mx-auto sm:mt-2 sm:max-w-xl sm:px-8 lg:mx-0 lg:mt-0 lg:max-w-none lg:px-0"
    >
      <motion.div
        initial={{ opacity: 0, x: 20, rotate: -9 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-3 top-10 z-0 w-[88px] overflow-hidden rounded-2xl border border-black/60 bg-[#0F0F10] shadow-2xl shadow-black/35 sm:left-0 sm:w-[120px] md:w-[140px] lg:-left-12 lg:w-[155px]"
      >
        <Image
          src="/blue.webp"
          alt="Plantilla azul de curriculum"
          width={320}
          height={450}
          className="aspect-[0.48] w-full object-cover object-left-top opacity-95"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#0F0F10]/35 to-[#0F0F10]/82" />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/55" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20, rotate: 9 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 bottom-24 z-0 w-[108px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/35 sm:right-0 sm:w-[164px] md:w-[205px] lg:-right-5 lg:bottom-12 lg:w-[220px]"
      >
        <Image
          src="/green.webp"
          alt="Plantilla verde de curriculum"
          width={320}
          height={450}
          className="aspect-[0.72] w-full object-cover object-top opacity-95"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        
        className="relative z-10 mx-auto w-full max-w-[560px] rounded-[1.35rem] border border-white/12 bg-[#17171C]/88 p-2.5 shadow-2xl shadow-black/45 backdrop-blur sm:rounded-[1.7rem] sm:p-3"
      >
        <div className="mb-2.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-3 sm:mb-3 sm:px-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#38BDF8]">
              Vista previa
            </p>
            <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
              Curriculum generado por VitaeSpark
            </p>
          </div>
          <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
            ATS
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white">
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-[#38BDF8]/16 to-transparent"
            animate={{ y: ["-110%", "720%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 5.8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.18, 0.65, 1],
            }}
          />
          <Image
            src="/purple-hero.webp"
            alt="Ejemplo de curriculum vitae creado con VitaeSpark"
            width={760}
            height={900}
            priority
            sizes="(min-width: 1024px) 42vw, 92vw"
            className="aspect-[0.82] w-full object-cover object-top"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-[#111113]/88 p-4 text-white shadow-xl backdrop-blur-md"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#7C3AED] p-2">
                <PenLine className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold sm:text-base">
                  Perfil y logros mejor redactados
                </p>
                <p className="mt-1 text-xs leading-5 text-white/70 sm:text-sm">
                  El resultado mantiene tu informacion, pero la presenta con
                  orden y criterio profesional.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-20 mx-auto mt-3 hidden max-w-[560px] grid-cols-3 gap-2 sm:grid">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              opacity: { duration: 0.45, delay: card.delay },
              scale: { duration: 0.45, delay: card.delay },
              y: { duration: 0.45, delay: card.delay },
            }}
            className="rounded-xl border border-white/10 bg-[#111113]/78 px-2.5 py-2 text-white shadow-xl shadow-black/25 backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-[#38BDF8]/10 p-1.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                {card.icon}
              </span>
              <span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  {card.label}
                </span>
                <span className="block whitespace-nowrap text-[11px] font-semibold">
                  {card.value}
                </span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-20 -mt-4 mx-auto flex max-w-[92%] items-center justify-between rounded-2xl border border-[#7C3AED]/25 bg-[#111113]/90 px-4 py-3 text-xs text-white shadow-2xl shadow-black/40 backdrop-blur sm:hidden">
        <span className="inline-flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-[#A78BFA]" />
          Texto mejorado
        </span>
        <span className="text-[#38BDF8]">Listo para enviar</span>
      </div>
    </motion.div>
  );
}
