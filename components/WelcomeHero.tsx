"use client";

import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import AnimatedHeroTitle from "./AnimatedHeroTitle";
import HeroShowcase from "./HeroShowcase";
import { Button } from "./ui/button";

const benefits = [
  "CV optimizado para ATS",
  "Plantillas profesionales",
  "Descarga en PDF",
  "Actualizaciones ilimitadas",
];

export default function WelcomeHero() {
  return (
    <section className="relative isolate overflow-x-hidden bg-[#111113] px-2 pb-14 pt-8 sm:px-6 sm:pt-10 lg:pb-20 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="hero-ambient absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.18)_0%,rgba(15,15,16,0.9)_38%,rgba(15,15,16,1)_64%,rgba(56,189,248,0.14)_100%)]" />
        <div className="hero-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.11]" />
        <div className="hero-robot absolute right-5 top-[430px] flex h-28 w-28 items-center justify-center rounded-full border border-[#38BDF8]/15 bg-[#38BDF8]/[0.045] text-[#38BDF8]/45 blur-0 sm:right-[46%] sm:top-[260px] sm:h-40 sm:w-40 sm:text-[#38BDF8]/28 lg:right-[52%] lg:top-[300px] lg:h-48 lg:w-48 xl:right-[55%] xl:top-[330px]">
          <div className="absolute inset-3 rounded-full border border-[#7C3AED]/15" />
          <Bot className="h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24" strokeWidth={1.5} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111113] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,1fr)] lg:gap-6">
        <div className="mx-auto min-w-0 max-w-xl text-left sm:mx-0 sm:max-w-2xl">
          <div className="hero-fade-up mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-[#F4F4F5]/76 shadow-2xl shadow-black/20 backdrop-blur">
            <Sparkles className="h-4 w-4 shrink-0 text-[#38BDF8]" />
            <span className="truncate">Creador de CV con IA para postulaciones reales</span>
          </div>

          <AnimatedHeroTitle />

          <p className="hero-fade-up hero-fade-up-3 mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-[#F4F4F5]/74 sm:mx-0 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
            VitaeSpark es un creador de CV online que transforma tus datos en un currículum claro, profesional y listo para descargar. Ideal para presentar tu experiencia sin sonar genérico ni perder horas editando.
          </p>

          <div className="hero-fade-up hero-fade-up-4 mx-auto mt-6 flex max-w-xl flex-col items-stretch gap-3 sm:mx-0 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center">
            <Link href="/crear" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-[52px] w-full rounded-xl bg-[#7C3AED] px-6 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition hover:bg-[#6D28D9] sm:h-14 sm:w-auto sm:px-7"
              >
                Crear mi CV ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/plantillas-curriculum"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white/78 transition hover:border-[#38BDF8]/30 hover:bg-white/[0.07] sm:h-14 sm:px-7 sm:text-base"
            >
              Ver plantillas
            </Link>
          </div>

          <div className="mt-7 hidden max-w-xl flex-wrap gap-3 text-sm text-[#F4F4F5]/72 sm:flex sm:max-w-full">
            {benefits.map((item) => (
              <span
                key={item}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5"
              >
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                {item}
              </span>
            ))}
          </div>

          <div className="hero-fade-up hero-fade-up-4 mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-3 shadow-xl shadow-black/10 backdrop-blur sm:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/15 ring-1 ring-[#7C3AED]/25">
                <Sparkles className="h-5 w-5 text-[#38BDF8]" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Descarga tu CV en PDF
                </p>
                <p className="mt-0.5 text-xs leading-5 text-white/68">
                  Listo para enviar a empresas
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/65">
              <span className="rounded-xl bg-black/20 px-2 py-2">ES</span>
              <span className="rounded-xl bg-black/20 px-2 py-2 text-[#38BDF8]">ATS</span>
              <span className="rounded-xl bg-black/20 px-2 py-2">PDF</span>
            </div>
          </div>

          <div className="mt-7 hidden max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-center shadow-xl shadow-black/15 backdrop-blur sm:max-w-full lg:hidden">
            <div className="border-r border-white/10 px-3 py-3">
              <p className="text-sm font-bold text-white">ES</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/60">
                Redacción
              </p>
            </div>
            <div className="border-r border-white/10 px-3 py-3">
              <p className="text-sm font-bold text-[#38BDF8]">ATS</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/60">
                Optimizado
              </p>
            </div>
            <div className="px-3 py-3">
              <p className="text-sm font-bold text-white">PDF</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/60">
                Descarga
              </p>
            </div>
          </div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}