import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Zap,
  Sparkles,
  Search,
  Clock,
  Award,
  ArrowRight,
  Bot,
  Download,
  HelpCircle,
  PencilLine,
  BookOpen,
} from "lucide-react";
import { TestimonialCard } from "@/components/testimonial-card";
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import WelcomeHero from "./WelcomeHero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#F4F4F5]">
      {/* Hero Section */}

      <WelcomeHero />

      <section className="relative overflow-hidden bg-[#111113] px-4 py-16">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[110px]" />
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <Badge className="mb-4 border border-white/[0.08] bg-white/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70 hover:bg-white/[0.08]">
              Creador de CV online
            </Badge>
            <h2 className="text-3xl font-bold leading-tight text-[#F0EBFF] md:text-4xl">
              Un generador de CV que no te deja con una plantilla vacia
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/64 md:text-lg">
              VitaeSpark combina formulario guiado, redaccion con IA,
              plantillas profesionales y descarga en PDF. El objetivo es simple:
              pasar de datos sueltos a un curriculum claro para enviar a
              empresas, portales de empleo o reclutadores.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Completa tus datos",
                description:
                  "Escribe experiencia, estudios, habilidades y links sin preocuparte por sonar perfecto.",
              },
              {
                title: "La IA ordena el contenido",
                description:
                  "Convierte frases simples en un perfil mas claro, con logros y estructura profesional.",
              },
              {
                title: "Descarga tu CV en PDF",
                description:
                  "Obtienes una version lista para postular y guardar en tu perfil.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/[0.06] bg-[#1C1C22] p-5"
              >
                <h3 className="text-base font-semibold text-[#F0EBFF]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-white/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section — Bento Grid */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#111113]">
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-[110px]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Características
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              Todo lo que necesitas para un CV perfecto
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              VitaeSpark combina tecnología avanzada con diseño profesional para
              crear CVs que impresionan a reclutadores y sistemas ATS.
            </p>
          </div>

          {/* Bento: 2 grandes arriba + 4 chicas abajo */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Grande 1 — ATS */}
            <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:col-span-2">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#F0EBFF]">
                Optimizado para ATS
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">
                Superá los filtros automáticos de las empresas con palabras clave
                estratégicas y estructura compatible.
              </p>
            </div>

            {/* Grande 2 — IA */}
            <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] sm:col-span-2">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#F0EBFF]">
                Redacción inteligente
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/50">
                La IA mejora tus textos para hacerlos más impactantes,
                profesionales y adaptados a tu industria.
              </p>
            </div>

            {/* Chica 1 */}
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Plantillas profesionales"
              description="Diseños modernos que destacan tu experiencia."
            />
            {/* Chica 2 */}
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="Rápido y sencillo"
              description="Creá un CV en minutos, sin complicaciones."
            />
            {/* Chica 3 */}
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Personalización total"
              description="Adaptá cada sección a tus necesidades."
            />
            {/* Chica 4 */}
            <FeatureCard
              icon={<Award className="h-5 w-5" />}
              title="Resultados comprobados"
              description="Aumentá tus chances de entrevistas."
            />
          </div>
        </div>
      </section>

      {/* How it Works — Connected Stepper */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#111113]/50">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/15 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Proceso
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              Creá tu CV en tres simples pasos
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Nuestro proceso está diseñado para ser rápido, intuitivo y
              efectivo.
            </p>
          </div>

          {/* Desktop: horizontal timeline / Mobile: vertical */}
          <div className="relative">
            {/* Connector line — desktop horizontal */}
          
            {/* Connector line — mobile vertical */}
            <div className="pointer-events-none absolute left-[2.25rem] top-0 bottom-0 hidden h-full w-px bg-gradient-to-b from-[#8B5CF6]/40 via-[#38BDF8]/40 to-[#8B5CF6]/40 md:hidden" />

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  number: "01",
                  icon: <PencilLine className="h-5 w-5" />,
                  title: "Ingresá tus datos",
                  description:
                    "Completá un formulario simple con tu experiencia, educación y habilidades.",
                },
                {
                  number: "02",
                  icon: <Bot className="h-5 w-5" />,
                  title: "La IA optimiza",
                  description:
                    "Mejorá automáticamente la redacción, el orden y la estructura de tu CV.",
                },
                {
                  number: "03",
                  icon: <Download className="h-5 w-5" />,
                  title: "Descargá tu CV",
                  description:
                    "Obtené un PDF profesional listo para enviar a empresas.",
                },
              ].map((step, i) => (
                <div key={step.number} className="relative flex gap-5 md:block md:text-center">
                  {/* Icon node */}
                  <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#1C1C22] shadow-lg shadow-black/20 md:mx-auto md:mb-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6]">
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1 md:pt-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                      Paso {step.number}
                    </span>
                    <h3 className="mt-1 text-base font-semibold text-[#F0EBFF]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Comparativa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              La diferencia VitaeSpark
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Descubre por qué un CV optimizado marca la diferencia en tu
              búsqueda de empleo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* CV Tradicional */}
            <div className="rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1C1C22] px-4 py-1 rounded-full border border-white/[0.06]">
                <span className="text-xs font-medium text-white/50">
                  CV Tradicional
                </span>
              </div>

              <div className="relative mb-6 bg-[#111113] rounded-lg p-2 shadow-md">
                <div className="overflow-hidden aspect-[4/3]">
                  <Image
                    src="/hamdu.webp"
                    alt="CV tradicional no optimizado"
                    className="rounded-lg w-full h-full object-cover object-top opacity-50 grayscale"
                    width={500}
                    height={375}
                    sizes="(min-width: 1024px) 500px, 92vw"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <Search className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60">Invisible para ATS</h3>
                    <p className="text-xs text-white/40 mt-0.5">
                      Rechazado automáticamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60">Formato genérico</h3>
                    <p className="text-xs text-white/40 mt-0.5">
                      No destaca entre candidatos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-white/50" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/60">Proceso lento</h3>
                    <p className="text-xs text-white/40 mt-0.5">
                      Horas de edición manual.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV VitaeSpark */}
            <div className="rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 relative transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#8B5CF6] px-4 py-1 rounded-full">
                <span className="text-xs font-semibold text-white">
                  VitaeSpark
                </span>
              </div>

              <div className="relative mb-6 bg-[#111113] rounded-lg p-2 shadow-md">
                <div className="overflow-hidden aspect-[4/3]">
                  <Image
                    width={500}
                    height={375}
                    src="/purple-hero.webp"
                    alt="CV optimizado por VitaeSpark"
                    className="rounded-lg w-full h-full object-cover object-top opacity-90"
                    sizes="(min-width: 1024px) 500px, 92vw"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-white/10 text-white/70 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                  ATS
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <Search className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80">Visible para reclutadores</h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Supera filtros ATS.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80">Diseño profesional</h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Moderno y atractivo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/80">Redacción con IA</h3>
                    <p className="text-xs text-white/50 mt-0.5">
                      Textos optimizados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Testimonios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Miles de profesionales ya han mejorado sus oportunidades laborales
              con VitaeSpark.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Actualicé mi CV con VitaeSpark y a la semana ya tenía entrevistas. Súper práctico y fácil de usar."
              author="Laura Martínez"
              role="Diseñadora UX/UI"
            />
            <TestimonialCard
              quote="Me ayudó un montón con el tema de los filtros de las empresas. Después de varios meses, por fin empecé a recibir respuestas."
              author="Carlos Rodríguez"
              role="Desarrollador Full Stack"
            />
            <TestimonialCard
              quote="Muy simple de usar y el resultado quedó re bien. Ahora mi CV muestra mejor lo que sé hacer."
              author="Ana García"
              role="Marketing Digital"
            />
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Que es un creador de CV online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un creador de CV online es una herramienta web que te guia para cargar tus datos, ordenar tu experiencia, elegir una plantilla y descargar un curriculum listo para postular. VitaeSpark agrega redaccion con IA, estructura ATS y descarga en PDF.",
                },
              },
              {
                "@type": "Question",
                name: "Cual es la diferencia entre un creador de CV y una plantilla?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Una plantilla solo resuelve el diseño. Un creador de CV tambien ayuda a ordenar el contenido, mejorar la redaccion, completar secciones clave y preparar el documento final para reclutadores y filtros ATS.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué es un sistema ATS y por qué es importante?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un ATS (Applicant Tracking System) es un software que utilizan las empresas para filtrar automáticamente los CVs. Es importante que tu CV esté optimizado para estos sistemas, ya que aproximadamente el 75% de los currículums son rechazados antes de que un reclutador los vea. VitaeSpark asegura que tu CV pase estos filtros.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cómo mejora la IA mi currículum?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nuestra IA analiza tu información y mejora la redacción para hacerla más impactante y profesional. También identifica palabras clave relevantes para tu industria y las incorpora estratégicamente, aumentando tus posibilidades de superar los filtros ATS.",
                },
              },
              {
                "@type": "Question",
                name: "¿En qué formatos puedo descargar mi CV?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Con la generación de tu CV puedes descargarlo en formato PDF las veces que sean necesarias desde tu perfil.",
                },
              },
            ],
          }),
        }}
      />

      {/* FAQ Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#111113]">
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Preguntas Frecuentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              Resolvemos tus dudas
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
              Todo lo que necesitas saber sobre VitaeSpark.
            </p>
          </div>

          <div className="relative w-full rounded-xl border border-white/[0.06] bg-[#1C1C22] p-4">
            <details className="group border-b border-white/[0.06] px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white/80 transition hover:text-[#8B5CF6]">
                <FileText className="mr-3 h-5 w-5 text-[#8B5CF6]" />
                Que es un creador de CV online?
                <span className="ml-auto text-xl text-white/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-white/50">
                Es una herramienta web para cargar tus datos, ordenar tu
                experiencia, elegir una plantilla y descargar un curriculum
                listo para postular. VitaeSpark suma redaccion con IA,
                estructura ATS y PDF final.
              </p>
            </details>

            <details className="group border-b border-white/[0.06] px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white/80 transition hover:text-[#8B5CF6]">
                <Sparkles className="mr-3 h-5 w-5 text-[#8B5CF6]" />
                En que se diferencia de una plantilla?
                <span className="ml-auto text-xl text-white/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-white/50">
                Una plantilla resuelve el diseño. Un creador de CV tambien te
                ayuda a ordenar contenido, redactar mejor el perfil profesional
                y preparar el documento para reclutadores y filtros ATS.
              </p>
            </details>

            <details className="group border-b border-white/[0.06] px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white/80 transition hover:text-[#8B5CF6]">
                <HelpCircle className="mr-3 h-5 w-5 text-[#8B5CF6]" />
                ¿Qué es un sistema ATS y por qué es importante?
                <span className="ml-auto text-xl text-white/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-white/50">
                Un ATS (Applicant Tracking System) es un software que utilizan
                las empresas para filtrar automáticamente los CVs. Es importante
                que tu CV esté optimizado para estos sistemas, ya que
                aproximadamente el 75% de los currículums son rechazados antes
                de que un reclutador los vea. VitaeSpark asegura que tu CV pase
                estos filtros.
              </p>
            </details>

            <details className="group border-b border-white/[0.06] px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white/80 transition hover:text-[#8B5CF6]">
                <Sparkles className="mr-3 h-5 w-5 text-[#8B5CF6]" />
                ¿Cómo mejora la IA mi currículum?
                <span className="ml-auto text-xl text-white/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-white/50">
                Nuestra IA analiza tu información y mejora la redacción para
                hacerla más impactante y profesional. También identifica
                palabras clave relevantes para tu industria y las incorpora
                estratégicamente, aumentando tus posibilidades de superar los
                filtros ATS.
              </p>
            </details>

            <details className="group px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-white/80 transition hover:text-[#8B5CF6]">
                <Download className="mr-3 h-5 w-5 text-[#8B5CF6]" />
                ¿En qué formatos puedo descargar mi CV?
                <span className="ml-auto text-xl text-white/50 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-[#F4F4F5]/70">
                Con la generación de tu cv puedes descargarlo en formato PDF las
                veces que sean necesesarias desde tu perfil.
              </p>
            </details>

            {/* <AccordionItem value="item-5" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Qué pasa si no estoy satisfecho con el resultado?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Ofrecemos una garantía de satisfacción de 14 días. Si no estás
                completamente satisfecho con nuestro servicio, te reembolsaremos
                el 100% de tu pago sin hacer preguntas.
              </AccordionContent>
            </AccordionItem> */}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative px-4 py-20 bg-[#111113]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 md:grid-cols-[1fr_360px] md:p-8">
          <div>
            <Badge className="mb-5 bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Listo para postularte
            </Badge>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl text-[#F0EBFF]">
              Tu próximo CV puede estar listo en minutos
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/60">
              Completá tus datos, dejá que la IA mejore la redacción y descargá
              un PDF profesional preparado para filtros ATS.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: <Search className="h-5 w-5 text-[#8B5CF6]" />,
                  title: "ATS",
                  desc: "enfoque en filtros",
                },
                {
                  icon: <FileText className="h-5 w-5 text-[#8B5CF6]" />,
                  title: "PDF",
                  desc: "descarga profesional",
                },
                {
                  icon: <Sparkles className="h-5 w-5 text-[#8B5CF6]" />,
                  title: "IA",
                  desc: "redacción mejorada",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/10">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#F0EBFF]">{item.title}</p>
                    <p className="text-xs text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/crear">
                <Button
                  size="lg"
                  className="h-14 rounded-xl bg-[#7C3AED] px-8 hover:bg-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-300"
                  variant="default"
                >
                  Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-4 rounded-[2rem] " />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111113] p-3">
              <div className="mb-3 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-[#38BDF8]">
                  Preview
                </span>
                <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
                  ATS
                </span>
              </div>
              <Image
                src="/purple-hero.webp"
                alt="Vista previa de CV profesional creado con VitaeSpark"
                width={560}
                height={616}
                sizes="(min-width: 1024px) 560px, 92vw"
                className="aspect-[4/4.4] w-full rounded-2xl object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Guías y recursos */}
      <section className="py-20 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              Guias y recursos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
              Encuentra la guia correcta para tu tipo de CV
            </h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
              Si llegaste buscando como hacer un curriculum, mejorar tu CV para
              ATS o armar un perfil sin experiencia, aqui tienes paginas
              pensadas para esa necesidad concreta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                href: "/crear-cv-online",
                title: "Crear CV online",
                description:
                  "Aprende como crear un curriculum profesional y dejarlo listo para descargar.",
              },
              {
                href: "/curriculum-ats",
                title: "Curriculum ATS",
                description:
                  "Consejos y estructura para pasar mejor filtros de seleccion automatizados.",
              },
              {
                href: "/hacer-cv-con-ia",
                title: "Hacer CV con IA",
                description:
                  "Usa inteligencia artificial para redactar mejor y ahorrar tiempo.",
              },
              {
                href: "/plantilla-harvard",
                title: "Plantilla Harvard",
                description:
                  "Una referencia clara y sobria para CVs profesionales y faciles de leer.",
              },
              {
                href: "/curriculum-sin-experiencia",
                title: "CV sin experiencia",
                description:
                  "Ideas para destacar estudios, proyectos y habilidades si buscas primer empleo.",
              },
              {
                href: "/cv-para-primer-empleo",
                title: "CV para primer empleo",
                description:
                  "Una pagina mas directa para quienes necesitan postularse pronto a su primer trabajo.",
              },
              {
                href: "/curriculum-vitae-ejemplo",
                title: "Curriculum vitae ejemplo",
                description:
                  "Usa una referencia clara para entender como deberia verse un buen CV.",
              },
              {
                href: "/cv-para-programadores",
                title: "CV para programadores",
                description:
                  "Aprende como mostrar stack, proyectos y experiencia tecnica de forma clara.",
              },
              {
                href: "/cv-para-medicos",
                title: "CV para medicos",
                description:
                  "Organiza formacion, experiencia clinica y especialidades en un solo CV.",
              },
              {
                href: "/cv-para-estudiantes",
                title: "CV para estudiantes",
                description:
                  "Ideal para pasantias, practicas y primeros pasos laborales.",
              },
              {
                href: "/cv-para-atencion-al-cliente",
                title: "CV para atencion al cliente",
                description:
                  "Destaca experiencia con usuarios, reclamos, CRM y habilidades operativas.",
              },
              {
                href: "/cv-para-vendedor",
                title: "CV para vendedor",
                description:
                  "Muestra ventas, atencion al cliente, objetivos y resultados comerciales.",
              },
              {
                href: "/cv-para-recepcionista",
                title: "CV para recepcionista",
                description:
                  "Organiza experiencia en recepcion, agenda, llamadas y tareas administrativas.",
              },
              {
                href: "/cv-para-administrativo",
                title: "CV para administrativo",
                description:
                  "Ordena tareas de oficina, documentacion, datos y soporte administrativo.",
              },
              {
                href: "/cv-para-repositor",
                title: "CV para repositor",
                description:
                  "Destaca reposicion, stock, orden de gondola y tareas operativas.",
              },
              {
                href: "/cv-para-operario",
                title: "CV para operario",
                description:
                  "Muestra produccion, deposito, herramientas, procesos y seguridad.",
              },
              {
                href: "/cv-para-mineria",
                title: "CV para mineria",
                description:
                  "Enfoca seguridad, turnos, maquinaria, campamento y experiencia operativa.",
              },
              {
                href: "/cv-para-seguridad",
                title: "CV para seguridad",
                description:
                  "Enfoca control de accesos, recorridas, prevencion y responsabilidad.",
              },
              {
                href: "/cv-para-limpieza",
                title: "CV para limpieza",
                description:
                  "Presenta experiencia en limpieza, orden, mantenimiento y servicios generales.",
              },
              {
                href: "/cv-profesional",
                title: "CV profesional",
                description:
                  "Mejora la estructura y la presentacion si quieres una version mas competitiva.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#1C1C22] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                </div>
                <h3 className="text-base font-semibold text-[#F0EBFF] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-sm text-[#38BDF8] hover:text-[#F4F4F5]"
            >
              Ver mas guias en el blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
