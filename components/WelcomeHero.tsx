import {
  ArrowRight,
  CheckCircle2,
  FileText,
  PenLine,
  ScanSearch,
  Sparkles,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const benefits = [
  "Redacción profesional",
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
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(124,58,237,0.18)_0%,rgba(15,15,16,0.9)_38%,rgba(15,15,16,1)_64%,rgba(56,189,248,0.14)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.11]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F10] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)] lg:gap-12">
        <div className="min-w-0 max-w-[358px] sm:max-w-3xl">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-[#F4F4F5]/76 shadow-2xl shadow-black/20 backdrop-blur">
            <Sparkles className="h-4 w-4 shrink-0 text-[#38BDF8]" />
            <span className="truncate">CV con IA para postulaciones reales</span>
          </div>

          <h1 className="max-w-full text-pretty text-[2.45rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.8rem] lg:leading-[0.96]">
            Convertí tu historia en un CV listo para entrevistas
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#F4F4F5]/74 sm:mt-6 sm:text-lg md:text-xl md:leading-8">
            VitaeSpark transforma tus datos en un currículum claro, profesional
            y listo para descargar. Ideal para presentar tu experiencia sin
            sonar genérico ni perder horas editando.
          </p>

          <div className="mt-6 flex max-w-[358px] flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center">
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
                Redacción
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

        <div className="relative mx-0 mt-1 w-full min-w-0 max-w-[358px] px-0 sm:mx-auto sm:mt-2 sm:max-w-xl sm:px-8 lg:mx-0 lg:mt-0 lg:max-w-none lg:px-0">
          <div className="absolute -left-3 top-10 z-0 w-[88px] rotate-[-6deg] overflow-hidden rounded-2xl border border-black/60 bg-[#0F0F10] shadow-2xl shadow-black/35 sm:left-0 sm:w-[120px] md:w-[140px] lg:-left-12 lg:w-[155px]">
            <Image
              src="/blue.webp"
              alt="Plantilla azul de curriculum"
              width={320}
              height={450}
              className="aspect-[0.48] w-full object-cover object-left-top opacity-95"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#0F0F10]/35 to-[#0F0F10]/82" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/55" />
          </div>

          <div className="absolute -right-3 bottom-24 z-0 w-[108px] rotate-[6deg] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/35 sm:right-0 sm:w-[164px] md:w-[205px] lg:-right-5 lg:bottom-12 lg:w-[220px]">
            <Image
              src="/green.webp"
              alt="Plantilla verde de curriculum"
              width={320}
              height={450}
              className="aspect-[0.72] w-full object-cover object-top opacity-95"
            />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[560px] rounded-[1.35rem] border border-white/12 bg-[#17171C]/88 p-2.5 shadow-2xl shadow-black/45 backdrop-blur sm:rounded-[1.7rem] sm:p-3">
            <div className="mb-2.5 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-3 sm:mb-3 sm:px-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#38BDF8]">
                  Vista previa
                </p>
                <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                  Currículum generado por VitaeSpark
                </p>
              </div>
              <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
                ATS
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white">
              <Image
                src="/purple-hero.webp"
                alt="Ejemplo de curriculum vitae creado con VitaeSpark"
                width={760}
                height={900}
                priority
                sizes="(min-width: 1024px) 42vw, 92vw"
                className="aspect-[0.82] w-full object-cover object-top"
              />

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-[#111113]/88 p-4 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#7C3AED] p-2">
                    <PenLine className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold sm:text-base">
                      Perfil y logros mejor redactados
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/70 sm:text-sm">
                      El resultado mantiene tu información, pero la presenta
                      con orden y criterio profesional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 -mt-4 mx-auto flex max-w-[92%] items-center justify-between rounded-2xl border border-[#7C3AED]/25 bg-[#111113]/90 px-4 py-3 text-xs text-white shadow-2xl shadow-black/40 backdrop-blur sm:hidden">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" />
              Texto mejorado
            </span>
            <span className="text-[#38BDF8]">Listo para enviar</span>
          </div>
        </div>

        <div className="grid gap-3 lg:col-span-2 lg:grid-cols-3">
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
