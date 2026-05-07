import {
  ArrowRight,
  CheckCircle2,
  FileText,
  ScanSearch,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import AnimatedHeroTitle from "./AnimatedHeroTitle";
import HeroShowcase from "./HeroShowcase";
import { Button } from "./ui/button";

const benefits = [
  "Redaccion profesional",
  "Estructura compatible con ATS",
  "Descarga en PDF",
];

const steps = [
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Cargas tus datos",
    description: "Experiencia, estudios, habilidades y links.",
  },
  {
    icon: <Wand2 className="h-4 w-4" />,
    title: "La IA ordena",
    description: "Convierte frases sueltas en contenido claro.",
  },
  {
    icon: <ScanSearch className="h-4 w-4" />,
    title: "Postulas mejor",
    description: "Te llevas un CV listo para enviar.",
  },
];

export default function WelcomeHero() {
  return (
    <section className="relative isolate overflow-x-hidden bg-[#0F0F10] px-4 pb-14 pt-8 sm:px-6 sm:pt-10 lg:pb-20 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="hero-ambient absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.18)_0%,rgba(15,15,16,0.9)_38%,rgba(15,15,16,1)_64%,rgba(56,189,248,0.14)_100%)]" />
        <div className="hero-grid absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.11]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F10] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)] lg:gap-12">
        <div className="min-w-0 max-w-[358px] sm:max-w-3xl">
          <div className="hero-fade-up mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-[#F4F4F5]/76 shadow-2xl shadow-black/20 backdrop-blur">
            <Sparkles className="h-4 w-4 shrink-0 text-[#38BDF8]" />
            <span className="truncate">CV con IA para postulaciones reales</span>
          </div>

          <AnimatedHeroTitle />

          <p className="hero-fade-up hero-fade-up-3 mt-5 max-w-2xl text-pretty text-base leading-7 text-[#F4F4F5]/74 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
            VitaeSpark transforma tus datos en un curriculum claro, profesional
            y listo para descargar. Ideal para presentar tu experiencia sin
            sonar generico ni perder horas editando.
          </p>

          <div className="hero-fade-up hero-fade-up-4 mt-6 flex max-w-[358px] flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center">
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

          <div className="mt-7 hidden max-w-[358px] flex-wrap gap-3 text-sm text-[#F4F4F5]/72 sm:flex sm:max-w-full">
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

          <div className="mt-7 hidden max-w-[358px] grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] text-center shadow-xl shadow-black/15 backdrop-blur sm:max-w-full lg:hidden">
            <div className="border-r border-white/10 px-3 py-3">
              <p className="text-sm font-bold text-white">IA</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/50">
                Redaccion
              </p>
            </div>
            <div className="border-r border-white/10 px-3 py-3">
              <p className="text-sm font-bold text-[#38BDF8]">ATS</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/50">
                Lectura
              </p>
            </div>
            <div className="px-3 py-3">
              <p className="text-sm font-bold text-white">PDF</p>
              <p className="mt-1 text-[10px] uppercase tracking-wide text-white/50">
                Descarga
              </p>
            </div>
          </div>
        </div>

        <HeroShowcase />

        <div className="hero-fade-up hero-fade-up-4 grid gap-3 lg:col-span-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-xl shadow-black/10 backdrop-blur"
            >
              <span className="absolute right-4 top-3 text-xs font-semibold text-white/35">
                0{index + 1}
              </span>
              <div className="mb-4 inline-flex rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                {step.icon}
              </div>
              <h2 className="text-sm font-semibold text-white">{step.title}</h2>
              <p className="mt-1 text-sm leading-6 text-[#F4F4F5]/62">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
