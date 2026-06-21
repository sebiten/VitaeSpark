"use client";

import Image from "next/image";
import { FileDown, PencilLine, ScanSearch, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const inspectorRows = [
  {
    icon: PencilLine,
    label: "Perfil",
    value: "más claro",
  },
  {
    icon: ScanSearch,
    label: "Lectura",
    value: "ATS",
  },
  {
    icon: FileDown,
    label: "Salida",
    value: "PDF",
  },
];

const secondaryDocuments = [
  {
    src: "/harvard.webp",
    alt: "Plantilla Harvard de curriculum en VitaeSpark",
    className:
      "left-2 top-24 w-[31%] -rotate-[9deg] opacity-[0.62] xl:left-0 xl:top-28",
  },
  {
    src: "/purple-hero.webp",
    alt: "Plantilla moderna de curriculum en VitaeSpark",
    className:
      "right-4 top-32 w-[31%] rotate-[8deg] opacity-[0.58] xl:right-8 xl:top-36",
  },
  {
    src: "/green.webp",
    alt: "Plantilla profesional de curriculum en VitaeSpark",
    className:
      "bottom-16 left-[12%] w-[24%] rotate-[7deg] opacity-[0.44] xl:bottom-20",
  },
];

export default function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
      className="relative mx-auto min-h-[520px] w-full max-w-[820px] sm:min-h-[700px] lg:mr-0 lg:min-h-[700px]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-[#7A5CFF]/[0.16] blur-[120px]" />
        <div className="absolute bottom-[8%] right-[8%] h-80 w-80 rounded-full bg-[#F6F2EA]/10 blur-[130px]" />
        <div className="absolute left-[4%] right-[3%] top-[52%] h-28 -translate-y-1/2 rounded-[999px] bg-[#7A5CFF]/10 blur-[54px]" />
      </div>

      <div className="absolute inset-x-4 bottom-4 top-4 rounded-[40px] border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.025] shadow-[inset_0_1px_0_rgba(246,242,234,0.05)]" />

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {secondaryDocuments.map((doc, index) => (
          <motion.div
            key={doc.src}
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24 }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 1,
                    y: index === 1 ? [0, -8, 0] : [0, 7, 0],
                  }
            }
            transition={{
              opacity: {
                duration: 0.5,
                delay: 0.14 + index * 0.07,
                ease: easeOut,
              },
              y: {
                duration: reduceMotion ? 0 : 6 + index,
                delay: 0.14 + index * 0.07,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              },
            }}
            className={`absolute overflow-hidden rounded-[26px] border border-[#F6F2EA]/[0.12] bg-[#EEE9DE] p-2 shadow-[0_26px_70px_rgba(0,0,0,0.34)] ${doc.className}`}
          >
            <Image
              src={doc.src}
              alt={doc.alt}
              width={420}
              height={560}
              draggable={false}
              sizes="(min-width: 1024px) 18vw, 30vw"
              className="aspect-[0.76] w-full rounded-[18px] object-cover object-top"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 34, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.72, delay: 0.12, ease: easeOut }}
        className="relative z-10 mx-auto w-[min(88vw,500px)] pt-10 sm:pt-10 lg:w-[500px] xl:w-[540px]"
      >
        <div className="relative rounded-[36px] border border-[#F6F2EA]/[0.16] bg-[#ECE8DE] p-3 shadow-[0_42px_110px_rgba(0,0,0,0.58),0_0_0_1px_rgba(246,242,234,0.05)] sm:p-4">
          <div className="absolute -inset-3 -z-10 rounded-[44px] bg-[linear-gradient(135deg,rgba(246,242,234,0.2),rgba(122,92,255,0.08)_42%,rgba(12,12,16,0))]" />

          <div className="relative h-[500px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(20,17,14,0.22)] sm:h-[590px] xl:h-[610px]">
            <Image
              src="/elegance-good.webp"
              alt="Vista previa de curriculum profesional generado con VitaeSpark"
              width={720}
              height={920}
              priority
              fetchPriority="high"
              draggable={false}
              sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 38vw, 88vw"
              className="h-full w-full object-cover object-top"
            />

            <div className="hero-scan-line pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(122,92,255,0.12),transparent)]" />

            <div className="absolute left-5 top-5 rounded-2xl border border-[#141114]/10 bg-white/[0.92] px-3 py-2 shadow-[0_14px_32px_rgba(20,17,14,0.12)] backdrop-blur-md">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4A3B7A]">
                VitaeSpark
              </span>
            </div>

            <div className="absolute right-5 top-5 rounded-full bg-[#141114] px-3 py-1.5 text-[10px] font-medium text-[#F6F2EA] shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
              editable
            </div>

            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-5 left-5 right-5 rounded-[24px] border border-[#F6F2EA]/[0.14] bg-[#111014]/[0.92] p-4 shadow-[0_22px_48px_rgba(0,0,0,0.38)] backdrop-blur-xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7A5CFF] text-[#F6F2EA] shadow-[0_14px_30px_rgba(122,92,255,0.34)]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#F6F2EA]">
                    La IA convierte borradores en perfil profesional
                  </p>
                  <div className="mt-3 hidden gap-2 text-[12px] leading-5 sm:grid sm:grid-cols-2">
                    <p className="rounded-2xl bg-[#F6F2EA]/[0.06] px-3 py-2 text-[#D8D2C8]/[0.62]">
                      Antes: responsable y proactivo.
                    </p>
                    <p className="rounded-2xl bg-[#7A5CFF]/[0.16] px-3 py-2 text-[#F6F2EA]/[0.84]">
                      Después: perfil claro, concreto y listo para leer.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.aside
        initial={reduceMotion ? false : { opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.58, delay: 0.32, ease: easeOut }}
        className="absolute right-0 top-24 z-20 hidden w-[210px] rounded-[30px] border border-[#F6F2EA]/[0.12] bg-[#18171C]/[0.92] p-3 shadow-[0_26px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(246,242,234,0.06)] backdrop-blur-xl xl:block"
      >
        <div className="border-b border-[#F6F2EA]/[0.08] px-2 pb-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF]/[0.82]">
            Revisión IA
          </p>
        </div>
        <div className="divide-y divide-[#F6F2EA]/[0.08]">
          {inspectorRows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 px-2 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D7C8FF]/[0.18] bg-[#7A5CFF]/[0.14] text-[#D7C8FF]">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[12px] text-[#D8D2C8]/[0.54]">{label}</p>
                <p className="mt-0.5 text-sm font-semibold text-[#F6F2EA]">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.38, ease: easeOut }}
        className="absolute bottom-5 left-1/2 z-20 hidden w-[min(88%,600px)] -translate-x-1/2 rounded-full border border-[#F6F2EA]/[0.12] bg-[#111014]/[0.86] px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(246,242,234,0.06)] backdrop-blur-xl sm:block"
      >
        <div className="grid grid-cols-3 gap-2 text-center text-[12px] font-medium text-[#F6F2EA]/[0.78]">
          <span>Plantillas editables</span>
          <span className="border-x border-[#F6F2EA]/10">Texto mejorado</span>
          <span>PDF listo</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
