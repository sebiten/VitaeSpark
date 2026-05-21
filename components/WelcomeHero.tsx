"use client";

import {
  ArrowRight,
  CheckCircle2,
  Download,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import AnimatedHeroTitle from "./AnimatedHeroTitle";
import HeroShowcase from "./HeroShowcase";
import { Button } from "./ui/button";

const benefits = [
  { icon: Search, label: "Optimizado para ATS" },
  { icon: Sparkles, label: "Redacción con IA" },
  { icon: Download, label: "PDF profesional" },
  { icon: ShieldCheck, label: "Edición ilimitada" },
];

export default function WelcomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#111113] px-4 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6 lg:pb-20 lg:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_30%),linear-gradient(140deg,rgba(10,10,15,0.92)_0%,rgba(17,17,19,1)_42%,rgba(9,9,13,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:74px_74px] opacity-[0.09]" />
        <div className="absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#7C3AED]/12 blur-[120px] sm:h-[440px] sm:w-[440px]" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111113] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:gap-10">
        <div className="relative m-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[#67D2FF] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            CV con IA para postulaciones reales
          </motion.div>

          <div className="mt-5 max-w-2xl">
            <AnimatedHeroTitle />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-5 max-w-xl text-pretty text-[15px] leading-7 text-white/68 sm:text-[17px] sm:leading-8"
          >
            VitaeSpark es un creador de CV online que transforma tus datos en un
            currículum claro, profesional y listo para descargar. Ideal para
            presentar tu experiencia sin sonar genérico ni perder horas
            editando.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
            className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center"
          >
            <Link href="/crear" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_55%,#6D28D9_100%)] px-6 text-[15px] font-semibold text-white shadow-[0_14px_36px_rgba(124,58,237,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(124,58,237,0.38)] sm:h-13 sm:w-auto sm:px-7"
              >
                Crear mi CV ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/plantillas-curriculum"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-white/74 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07] hover:text-white sm:px-6"
            >
              Ver plantillas
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-3"
          >
            {benefits.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] text-white/74 shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#67D2FF]">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="leading-5">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.26, ease: "easeOut" }}
            className="mt-5 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.025)_100%)] p-3 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:hidden"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/14 ring-1 ring-[#7C3AED]/18">
                <Sparkles className="h-5 w-5 text-[#67D2FF]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Genera un CV que se lee mejor
                </p>
                <p className="mt-1 text-[13px] leading-5 text-white/62">
                  Ordena experiencia, mejora redacción y descarga un PDF listo
                  para enviar.
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-white/52">
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5">
                ATS
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5">
                IA
              </span>
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5">
                PDF
              </span>
            </div>
          </motion.div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
