"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Download,
  FileText,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import WelcomeHero from "./WelcomeHero";

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 text-left sm:mb-10 sm:text-center">
      <Badge className="mb-3 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 hover:bg-white/[0.05]">
        {badge}
      </Badge>
      <h2 className="max-w-3xl text-balance text-[1.85rem] font-semibold tracking-[-0.03em] text-[#F5F2FF] sm:mx-auto sm:text-[2.35rem]">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/58 sm:mx-auto sm:text-base">
        {description}
      </p>
    </div>
  );
}

const featureCards = [
  {
    title: "Optimizacion ATS",
    desc: "Tu CV sale con una estructura pensada para filtros y lectura rapida.",
    icon: Search,
    accent: "text-[#67D2FF] bg-[#38BDF8]/10 border-[#38BDF8]/15",
  },
  {
    title: "Redaccion con IA",
    desc: "Convierte ideas sueltas en texto mas claro, ordenado y profesional.",
    icon: Sparkles,
    accent: "text-[#C9B3FF] bg-[#8B5CF6]/10 border-[#8B5CF6]/15",
  },
  {
    title: "Plantillas premium",
    desc: "Disenos sobrios y modernos para destacar sin parecer recargado.",
    icon: Target,
    accent: "text-[#A7F3D0] bg-emerald-500/10 border-emerald-500/15",
  },
  {
    title: "Descarga en PDF",
    desc: "Listo para enviar por email, subir a portales o guardar en tu perfil.",
    icon: Download,
    accent: "text-[#FCD34D] bg-amber-500/10 border-amber-500/15",
  },
];

const faqQuestions = [
  {
    q: "Como funciona VitaeSpark?",
    a: "Cargas experiencia, estudios, habilidades y datos de contacto. La IA ordena todo y genera un CV profesional con mejor redaccion.",
  },
  {
    q: "Sirve si no tengo experiencia?",
    a: "Si. Puedes armar un CV para primer empleo o perfiles iniciales sin quedarte en una plantilla vacia.",
  },
  {
    q: "Que significa enfoque ATS?",
    a: "ATS son los sistemas que muchas empresas usan para filtrar curriculums. VitaeSpark prioriza estructura clara y legibilidad.",
  },
  {
    q: "Puedo editarlo despues?",
    a: "Si. Puedes volver a tu perfil, regenerar el contenido y descargar la version actualizada en PDF.",
  },
];

const guides = [
  { href: "/curriculum-ats", title: "CV para ATS" },
  { href: "/plantilla-harvard", title: "Plantilla Harvard" },
  { href: "/curriculum-sin-experiencia", title: "Sin experiencia" },
  { href: "/crear-cv-online", title: "Crear CV online" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#F4F4F5]">
      <WelcomeHero />

      <section className="border-y border-white/[0.06] bg-[#141419] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Como funciona"
            title="Carga tus datos, la IA los ordena y sales con un CV listo para enviar"
            description="El flujo esta pensado para ir rapido: escribes lo importante, eliges plantilla y obtienes un PDF profesional."
          />

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.2fr)_320px]">
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Cargas tu historia",
                  desc: "Experiencia, estudios, links y herramientas.",
                  icon: FileText,
                  accent: "bg-[#8B5CF6]/14 text-[#C9B3FF]",
                },
                {
                  step: "02",
                  title: "La IA la mejora",
                  desc: "Ordena, resume y vuelve el texto mas claro.",
                  icon: Bot,
                  accent: "bg-[#38BDF8]/12 text-[#67D2FF]",
                },
                {
                  step: "03",
                  title: "Descargas el PDF",
                  desc: "Queda listo para postularte sin editar de mas.",
                  icon: Download,
                  accent: "bg-emerald-500/12 text-emerald-300",
                },
              ].map(({ step, title, desc, icon: Icon, accent }) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(28,28,34,0.92)_0%,rgba(18,18,24,0.94)_100%)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/34">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/56">{desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="rounded-[30px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(124,58,237,0.12)_0%,rgba(28,28,34,0.96)_100%)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B5CF6]/14 text-[#C9B3FF]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/36">
                    Senales del producto
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    VitaeSpark en uso real
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <StatRow icon={Users} value="500+" label="Usuarios registrados" />
                <StatRow icon={FileText} value="1.2k+" label="CVs creados" />
                <StatRow icon={TrendingUp} value="85%" label="Mas entrevistas" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Funciones"
            title="Lo importante para crear un CV mejor, sin agregar ruido"
            description="Herramientas enfocadas en claridad, presentacion y velocidad para postularte con menos friccion."
          />

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {featureCards.map(({ title, desc, icon: Icon, accent }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(28,28,34,0.92)_0%,rgba(18,18,24,0.94)_100%)] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.12]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                    VitaeSpark
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Comparativa"
            title="No es solo una plantilla: es una capa de orden y presentacion"
            description="La diferencia principal es que no partes de una hoja vacia ni de un diseño suelto: partes de tu experiencia y la app la estructura mejor."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <ComparisonCard
              title="CV tradicional"
              tone="muted"
              tag="Sin ayuda"
              image="/hamdu.webp"
              items={[
                "Solo resuelve el diseño",
                "No mejora redacción",
                "Más tiempo editando a mano",
              ]}
            />
            <ComparisonCard
              title="VitaeSpark"
              tone="accent"
              tag="Con IA + ATS"
              image="/purple-hero.webp"
              items={[
                "Organiza y mejora el contenido",
                "Estructura mas clara para recruiters",
                "PDF listo para enviar o guardar",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#38BDF8]/8 blur-[120px]" />
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            badge="FAQ"
            title="Dudas comunes antes de crear tu CV"
            description="Respuestas directas para entender si VitaeSpark encaja con tu caso."
          />

          <div className="space-y-2.5">
            {faqQuestions.map((item, i) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="group overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(28,28,34,0.92)_0%,rgba(18,18,24,0.94)_100%)] shadow-[0_12px_28px_rgba(0,0,0,0.12)] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 text-left text-white/84 transition-colors hover:text-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#8B5CF6]/12 text-[#C9B3FF]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium sm:text-[15px]">
                    {item.q}
                  </span>
                  <ChevronDown className="h-4 w-4 text-white/36 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pl-[4.6rem]">
                  <p className="text-sm leading-6 text-white/56">{item.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 pt-4 sm:px-6 sm:pb-14 sm:pt-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(23,23,30,0.96)_0%,rgba(16,16,22,1)_40%,rgba(29,18,44,0.98)_100%)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.12),transparent_28%)]" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center">
              <div>
                <Badge className="mb-4 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/12 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C9B3FF]">
                  Empieza ahora
                </Badge>
                <h2 className="max-w-2xl text-balance text-[2rem] font-semibold tracking-[-0.03em] text-white sm:text-[2.5rem]">
                  Crea tu CV profesional y sal con una version lista para postularte
                </h2>
                <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/58 sm:text-base">
                  En minutos, con una estructura moderna, mejor redacción y descarga
                  en PDF desde tu perfil.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/crear" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_60%,#6D28D9_100%)] px-6 text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(124,58,237,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(124,58,237,0.36)]"
                    >
                      Crear mi CV
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-white/72 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:text-white"
                  >
                    Ver guias
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/[0.08] bg-black/18 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-2 border-b border-white/8 px-1 pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#28CA41]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/38">
                    Preview
                  </span>
                </div>
                <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white">
                  <Image
                    src="/purple-hero.webp"
                    alt="Vista previa del CV"
                    width={480}
                    height={560}
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#15151A] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Recursos"
            title="Guias cortas para mejorar tu CV segun tu caso"
            description="Entradas pensadas para resolver dudas concretas sin perder tiempo entre contenido generico."
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {guides.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(28,28,34,0.92)_0%,rgba(18,18,24,0.94)_100%)] px-4 py-4 shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.12]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium leading-6 text-white/82">
                    {item.title}
                  </span>
                  <span className="text-[#67D2FF] transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="text-sm font-medium text-[#67D2FF] transition-colors hover:text-white"
            >
              Ver todas las guias
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqQuestions.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}

function StatRow({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[22px] border border-white/8 bg-white/[0.03] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/[0.05] text-[#C9B3FF]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-base font-semibold text-white">{value}</p>
        <p className="text-xs text-white/46">{label}</p>
      </div>
    </div>
  );
}

function ComparisonCard({
  title,
  tone,
  tag,
  image,
  items,
}: {
  title: string;
  tone: "muted" | "accent";
  tag: string;
  image: string;
  items: string[];
}) {
  const accent =
    tone === "accent"
      ? "border-[#8B5CF6]/20 bg-[linear-gradient(180deg,rgba(124,58,237,0.08)_0%,rgba(28,28,34,0.96)_100%)]"
      : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(28,28,34,0.92)_0%,rgba(18,18,24,0.94)_100%)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={`overflow-hidden rounded-[30px] border p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] ${accent}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
              tone === "accent"
                ? "bg-[#8B5CF6]/14 text-[#C9B3FF]"
                : "bg-white/[0.05] text-white/46"
            }`}
          >
            {tone === "accent" ? (
              <Sparkles className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 text-xs text-white/44">{tag}</p>
          </div>
        </div>
      </div>

      <div className="mb-5 overflow-hidden rounded-[24px] border border-white/8 bg-[#0F0F10]">
        <Image
          src={image}
          alt={title}
          width={480}
          height={320}
          className={`aspect-[4/3] w-full object-cover object-top ${
            tone === "muted" ? "opacity-45 grayscale" : ""
          }`}
        />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                tone === "accent"
                  ? "bg-emerald-500/14 text-emerald-300"
                  : "bg-white/[0.05] text-white/40"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-sm leading-6 text-white/62">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
