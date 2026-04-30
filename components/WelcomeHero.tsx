import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  Search,
  Sparkles,
  Wand2,
} from "lucide-react";
import Image from "next/image";
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
    title: "Queda listo En PDF",
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
        <div className="relative max-w-3xl">
          <div className="pointer-events-none absolute -right-2 -top-4 z-0 flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-[#7C3AED]/20 backdrop-blur-md sm:hidden">
            <div className="absolute inset-2 rounded-2xl bg-gradient-to-br from-[#7C3AED]/30 to-[#38BDF8]/20 blur-md" />
            <Bot className="relative h-9 w-9 text-[#A78BFA]" />
          </div>

          <div className="relative z-10 mb-6 inline-flex max-w-[78%] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#F4F4F5]/75 shadow-2xl shadow-[#7C3AED]/10 backdrop-blur sm:max-w-none">
            <Sparkles className="h-4 w-4 shrink-0 text-[#38BDF8]" />
            <span className="truncate">CV inteligente para buscar trabajo mejor</span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Creá tu CV con{" "}
            <span className="bg-gradient-to-t from-white via-[#C4B5FD] to-[#38BDF8]/80 bg-clip-text text-transparent">
              IA
            </span>{" "}
            y pasá mejor los filtros ATS
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[#F4F4F5]/75 md:text-xl">
            VitaeSpark convierte tus datos en un curriculum claro, profesional y
            listo para descargar en PDF. Ideal para postularte a empleos reales
            sin perder horas editando.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
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
              href="/cv-para-cajero"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] px-5 text-sm font-semibold text-white/75 transition hover:border-[#38BDF8]/30 hover:bg-white/[0.06] sm:h-14 sm:px-7 sm:text-base"
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

          <div className="mt-7 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-center shadow-2xl shadow-[#7C3AED]/10 lg:hidden">
            <div className="border-r border-white/10 p-3">
              <p className="text-lg font-bold text-white">1</p>
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                Datos
              </p>
            </div>
            <div className="border-r border-white/10 p-3">
              <p className="text-lg font-bold text-[#38BDF8]">IA</p>
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                Mejora
              </p>
            </div>
            <div className="p-3">
              <p className="text-lg font-bold text-white">PDF</p>
              <p className="text-[11px] uppercase tracking-wide text-white/55">
                Listo
              </p>
            </div>
          </div>

          <div className="mt-8 hidden gap-3 sm:grid-cols-3 lg:grid">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15151A]/80 p-4 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-[#38BDF8]/25 hover:bg-[#171720]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex rounded-2xl bg-[#38BDF8]/10 p-3 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                    {step.icon}
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/55">
                    0{index + 1}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-white">
                  {step.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#F4F4F5]/60">
                  {step.description}
                </p>
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#38BDF8]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:mx-0">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-[#7C3AED]/30 via-transparent to-[#38BDF8]/25 blur-2xl" />
          <div className="absolute -left-2 top-20 z-10 hidden rounded-2xl border border-[#38BDF8]/20 bg-[#0F0F10]/85 px-3 py-2 text-xs text-white shadow-xl shadow-[#38BDF8]/10 backdrop-blur sm:block lg:hidden">
            <span className="mr-1 text-[#38BDF8]">✦</span> ATS friendly
          </div>
          <div className="absolute -right-2 bottom-24 z-10 hidden rounded-2xl border border-[#7C3AED]/25 bg-[#0F0F10]/85 px-3 py-2 text-xs text-white shadow-xl shadow-[#7C3AED]/10 backdrop-blur sm:block lg:hidden">
            <span className="mr-1 text-[#A78BFA]">✦</span> IA incluida
          </div>
          <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#17171B] p-2 shadow-2xl shadow-black/40 sm:rounded-[2rem] sm:p-3">
            <div className="mb-2 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5 sm:mb-3 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/15 text-[#A78BFA] ring-1 ring-[#A78BFA]/20 sm:flex">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#38BDF8]">
                    Vista previa
                  </p>
                  <p className="text-sm font-semibold text-white">
                    CV generado por VitaeSpark
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
                ATS
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-inner shadow-black/10">
              <Image
                src="/purple-hero.webp"
                alt="Ejemplo de curriculum vitae online creado con VitaeSpark"
                width={760}
                height={950}
                priority
                sizes="(min-width: 1024px) 44vw, 92vw"
                className="aspect-[4/4.35] w-full object-cover object-top sm:aspect-[4/5]"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/15 bg-[#0F0F10]/82 p-3 text-white shadow-xl backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-[#7C3AED] p-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold sm:text-base">
                      Redacción mejorada por IA
                    </p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                      Textos más claros, ordenados y orientados a entrevistas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3 lg:hidden">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15151A]/85 p-4 shadow-xl shadow-black/10"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-2xl" />
              <div className="absolute right-3 top-2 text-5xl font-black text-white/[0.035]">
                0{index + 1}
              </div>
              <div className="relative flex items-start gap-3">
                <div className="rounded-2xl bg-[#38BDF8]/10 p-3 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                  {step.icon}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">
                      {step.title}
                    </h2>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                  </div>
                  <p className="mt-1 text-sm leading-6 text-[#F4F4F5]/60">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
