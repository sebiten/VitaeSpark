"use client";

import {
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  FileText,
  PenLine,
  ScanSearch,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { PRICING } from "@/lib/pricing";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import WelcomeHero from "./WelcomeHero";

const editPasses = [
  {
    title: "Perfil",
    before: "Soy responsable, proactivo y con ganas de trabajar.",
    after:
      "Perfil orientado a atención y tareas administrativas, con experiencia en agenda, trato con personas y organización de información.",
  },
  {
    title: "Experiencia",
    before: "Atención al cliente y tareas varias.",
    after:
      "Gestioné consultas presenciales y telefónicas, actualicé planillas y coordiné derivaciones internas con seguimiento diario.",
  },
  {
    title: "Habilidades",
    before: "Comunicación, puntualidad, trabajo en equipo.",
    after:
      "Agenda, atención telefónica, carga de datos, documentación, Excel básico y seguimiento de consultas.",
  },
];

const methodSteps = [
  {
    icon: FileText,
    title: "Carga lo importante",
    text: "Datos, experiencia, estudios y links. Sin pelearte con el diseño.",
  },
  {
    icon: PenLine,
    title: "La IA lo ordena",
    text: "Convierte frases sueltas en contenido claro, específico y usable.",
  },
  {
    icon: ScanSearch,
    title: "Queda editable",
    text: "Secciones simples, estructura compatible con ATS y cambios posteriores desde tu perfil.",
  },
];

const templates = [
  {
    name: "Elegante",
    image: "/elegance-good.webp",
    note: "Para perfiles administrativos, atención y oficina.",
  },
  {
    name: "Harvard",
    image: "/harvard.webp",
    note: "Para perfiles sobrios, académicos o tradicionales.",
  },
  {
    name: "Moderno",
    image: "/purple-hero.webp",
    note: "Para mostrar experiencia sin perder claridad.",
  },
];

const useCases = [
  "Primer empleo",
  "Atención al cliente",
  "Administrativo",
  "Recepcionista",
  "Operario",
  "Cajero",
  "Repositor",
  "Minería",
];

const faqQuestions = [
  {
    q: "Como funciona VitaeSpark?",
    a: "Cargas tus datos, eliges una plantilla y la IA mejora la redacción para que el CV se lea más claro.",
  },
  {
    q: "Sirve si no tengo experiencia?",
    a: "Si. Puedes armar un CV inicial destacando estudios, cursos, proyectos, habilidades y disponibilidad.",
  },
  {
    q: "Es solo una plantilla?",
    a: "No. La plantilla resuelve el diseño, pero VitaeSpark también ayuda a ordenar y redactar mejor el contenido.",
  },
  {
    q: "Puedo editarlo despues?",
    a: "Si. El CV queda guardado en tu perfil para editar datos y descargar nuevas versiones en PDF con la plantilla elegida.",
  },
  {
    q: PRICING.copy.faqQuestion,
    a: PRICING.copy.faqAnswer,
  },
];

const guideLinks = [
  { href: "/cv-para-primer-empleo", title: "CV primer empleo" },
  { href: "/cv-para-recepcionista", title: "CV recepcionista" },
  { href: "/cv-para-administrativo", title: "CV administrativo" },
  { href: "/blog/habilidades-para-curriculum", title: "Habilidades para CV" },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0D0D10] text-[#F6F2EA]">
      <WelcomeHero />

      <section className="relative border-y border-[#F6F2EA]/8 bg-[#111014] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D7C8FF]/76">
              El problema real
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-[#F6F2EA] sm:text-5xl">
              No falta experiencia. Falta forma.
            </h2>
            <p className="mt-5 max-w-[34rem] text-base leading-8 text-[#D8D2C8]/68">
              La mayoría de los CVs fallan antes de la entrevista: dicen poco,
              suenan genéricos o esconden lo importante.
            </p>
          </motion.div>

          <div className="grid gap-3">
            {editPasses.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.48, delay: index * 0.06 }}
                className="grid gap-3 rounded-[28px] border border-[#F6F2EA]/10 bg-[#F6F2EA]/[0.035] p-4 shadow-[inset_0_1px_0_rgba(246,242,234,0.05)] backdrop-blur-xl md:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.2fr)] md:items-start"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#D7C8FF]/70">
                    {item.title}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#F6F2EA]/8 bg-black/20 p-3">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#D8D2C8]/36">
                    Antes
                  </p>
                  <p className="text-sm leading-6 text-[#D8D2C8]/50">
                    {item.before}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#7A5CFF]/20 bg-[#7A5CFF]/10 p-3">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-[#D7C8FF]/80">
                    Después
                  </p>
                  <p className="text-sm leading-6 text-[#F6F2EA]/82">
                    {item.after}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-14 sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute left-[12%] top-16 h-64 w-64 rounded-full bg-[#7A5CFF]/10 blur-[120px]" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
            <div>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Un flujo corto, no una herramienta más.
              </h2>
              <p className="mt-5 max-w-[34rem] text-base leading-8 text-[#D8D2C8]/66">
                VitaeSpark guia el contenido como un editor: primero ordena,
                despues pule y al final lo deja editable en tu perfil.
              </p>
            </div>

            <div className="grid gap-3">
              {methodSteps.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                  className="group grid gap-4 rounded-[28px] border border-[#F6F2EA]/10 bg-[#18171C] p-4 shadow-[0_18px_44px_rgba(0,0,0,0.18)] sm:grid-cols-[56px_minmax(0,1fr)] sm:p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D7C8FF]/18 bg-[#7A5CFF]/14 text-[#D7C8FF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#D8D2C8]/62">
                      {text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#F6F2EA]/8 bg-[#141318] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Plantillas que no gritan.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-[#D8D2C8]/64">
                Diseños sobrios para que el contenido haga el trabajo. Podes
                comparar plantillas antes de pagar.
              </p>
            </div>
            <Link
              href="/plantillas-curriculum"
              className="inline-flex h-12 w-fit items-center rounded-full border border-[#F6F2EA]/12 px-5 text-sm font-medium text-[#F6F2EA]/78 transition hover:border-[#F6F2EA]/[0.22] hover:bg-[#F6F2EA]/[0.06] hover:text-[#F6F2EA]"
            >
              Ver plantillas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((template, index) => (
              <motion.article
                key={template.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.48, delay: index * 0.06 }}
                className={`group overflow-hidden rounded-[32px] border border-[#F6F2EA]/10 bg-[#0D0D10] shadow-[0_22px_54px_rgba(0,0,0,0.22)] ${
                  index === 1 ? "md:mt-10" : ""
                }`}
              >
                <div className="aspect-[0.78] overflow-hidden bg-[#F7F3EA] p-3">
                  <Image
                    src={template.image}
                    alt={`Plantilla ${template.name} de VitaeSpark`}
                    width={520}
                    height={680}
                    className="h-full w-full rounded-[24px] object-cover object-top shadow-[0_16px_38px_rgba(20,17,14,0.22)] transition duration-500 group-hover:scale-[1.025]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{template.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#D8D2C8]/60">
                    {template.note}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
          <div>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Hecho para casos reales.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#D8D2C8]/64">
              No todos necesitan el mismo CV. La estructura cambia según la
              búsqueda, la experiencia y el tipo de puesto.
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#F6F2EA]/10 bg-[#F6F2EA]/[0.04] px-4 py-2 text-sm text-[#F6F2EA]/76"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-[32px] border border-[#F6F2EA]/10 bg-[#18171C] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.24)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7A5CFF]/16 text-[#D7C8FF]">
                <BookOpenCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Guías por perfil</p>
                <p className="text-xs text-[#D8D2C8]/46">
                  Para empezar con mejor contexto
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              {guideLinks.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex items-center justify-between rounded-2xl border border-[#F6F2EA]/8 bg-black/18 px-4 py-3 text-sm text-[#F6F2EA]/74 transition hover:border-[#D7C8FF]/[0.22] hover:bg-[#7A5CFF]/10 hover:text-[#F6F2EA]"
                >
                  {guide.title}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#F6F2EA]/8 bg-[#111014] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="max-w-md text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Preguntas antes de crear el CV.
            </h2>
            <p className="mt-4 max-w-md text-base leading-8 text-[#D8D2C8]/64">
              Directo, sin promesas infladas.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqQuestions.map((item, index) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group overflow-hidden rounded-[24px] border border-[#F6F2EA]/10 bg-[#F6F2EA]/[0.035] shadow-[inset_0_1px_0_rgba(246,242,234,0.05)] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 text-left text-[#F6F2EA]/84 transition hover:text-[#F6F2EA]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#7A5CFF]/16 text-[#D7C8FF]">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-sm font-medium sm:text-[15px]">
                    {item.q}
                  </span>
                  <ChevronDown className="h-4 w-4 text-[#D8D2C8]/40 transition group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pl-[4.3rem]">
                  <p className="text-sm leading-7 text-[#D8D2C8]/62">
                    {item.a}
                  </p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-[#F6F2EA]/10 bg-[#18171C] shadow-[0_30px_80px_rgba(0,0,0,0.32)] lg:grid-cols-[minmax(0,1fr)_420px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(122,92,255,0.18),transparent_28%)]" />
          <div className="relative p-6 sm:p-8 lg:p-10">
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Sali con una version presentable hoy.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[#D8D2C8]/66">
              Carga tus datos, deja que la IA los ordene, editalo cuando haga
              falta y descarga un PDF listo para postular.
            </p>
            <p className="mt-3 text-sm font-medium text-[#D8D2C8]/58">
              PDF final por {PRICING.mercadoPago.label} en Argentina o {PRICING.paypal.label} en otros países. Pago único.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedCtaLink
                href="/crear"
                label="Crear mi CV"
                sourcePath="/"
                sourceType="landing"
                trackingLabel="home_final_cta"
                className="w-full sm:w-auto"
                buttonClassName="h-12 w-full rounded-full bg-[#F6F2EA] px-7 text-[15px] font-semibold text-[#121114] shadow-[0_18px_44px_rgba(246,242,234,0.18)] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
              />
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#F6F2EA]/12 px-6 text-sm font-medium text-[#F6F2EA]/76 transition hover:border-[#F6F2EA]/[0.22] hover:bg-[#F6F2EA]/[0.06] hover:text-[#F6F2EA]"
              >
                Leer guías
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[360px] overflow-hidden border-l border-[#F6F2EA]/8 lg:block">
            <Image
              src="/blue.webp"
              alt="Plantilla de CV profesional en VitaeSpark"
              width={520}
              height={680}
              className="absolute left-10 top-8 w-[340px] rotate-[-5deg] rounded-[26px] object-cover object-top shadow-[0_26px_70px_rgba(0,0,0,0.34)]"
            />
            <Image
              src="/green.webp"
              alt="Otra plantilla de CV profesional en VitaeSpark"
              width={520}
              height={680}
              className="absolute left-36 top-20 w-[320px] rotate-[7deg] rounded-[26px] object-cover object-top shadow-[0_26px_70px_rgba(0,0,0,0.34)]"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
