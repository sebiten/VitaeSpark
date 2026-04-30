"use client";

import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const trustItems = [
  "Optimizado para ATS",
  "Redacción con IA",
  "PDF profesional",
];

const steps = [
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Cargás tus datos",
    description: "Experiencia, estudios, habilidades y el puesto que buscás.",
  },
  {
    icon: <Wand2 className="h-4 w-4" />,
    title: "La IA lo mejora",
    description: "Ordena la información y vuelve el texto más claro.",
  },
  {
    icon: <Search className="h-4 w-4" />,
    title: "Queda listo para ATS",
    description: "Con estructura limpia para postularte con más confianza.",
  },
];

export default function WelcomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F0F10] px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7C3AED]/25 blur-[130px]" />
        <div className="absolute right-0 top-40 h-[360px] w-[360px] rounded-full bg-[#38BDF8]/15 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(380px,0.96fr)]">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#F4F4F5]/75 shadow-2xl shadow-[#7C3AED]/10 backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#38BDF8]" />
            CV inteligente para buscar trabajo mejor
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Creá tu CV con IA y pasá mejor los filtros ATS
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#F4F4F5]/75 md:text-xl">
            VitaeSpark convierte tus datos en un curriculum claro, profesional y
            listo para descargar en PDF. Ideal para postularte a empleos reales
            sin perder horas editando.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/crear" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-14 w-full rounded-xl bg-[#7C3AED] px-7 text-base font-semibold text-white shadow-lg shadow-[#7C3AED]/25 transition hover:bg-[#6D28D9] sm:w-auto"
              >
                Crear mi CV ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/cv-para-cajero"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 text-base font-semibold text-white/80 transition hover:border-[#38BDF8]/30 hover:bg-white/[0.06]"
            >
              Ver ejemplo de CV
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#F4F4F5]/70">
            {trustItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
              >
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div className="mb-3 inline-flex rounded-xl bg-[#38BDF8]/10 p-2 text-[#38BDF8]">
                  {step.icon}
                </div>
                <h2 className="text-sm font-semibold text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#F4F4F5]/60">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-[#7C3AED]/30 via-transparent to-[#38BDF8]/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#17171B] p-3 shadow-2xl shadow-black/40">
            <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#38BDF8]">
                  Vista previa
                </p>
                <p className="text-sm font-semibold text-white">
                  CV generado por VitaeSpark
                </p>
              </div>
              <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
                ATS
              </span>
            </div>

            <div className="relative rounded-2xl bg-white p-2">
              <img
                src="/purple-hero.webp"
                alt="Ejemplo de curriculum vitae online creado con VitaeSpark"
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-[#0F0F10]/80 p-4 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#7C3AED] p-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Redacción mejorada por IA</p>
                    <p className="mt-1 text-sm text-white/70">
                      Textos más claros, ordenados y orientados a entrevistas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
