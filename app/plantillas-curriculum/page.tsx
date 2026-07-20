import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Link2,
  Route,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import { PRICING } from "@/lib/pricing";
import { buildMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/seo";
import { CV_TEMPLATES } from "@/lib/cv-templates";

export const metadata = buildMetadata({
  title: "Plantillas de Curriculum Editables para Descargar en PDF | 2026",
  description:
    `Compara plantillas de curriculum profesionales, editables desde tu perfil y listas para descargar en PDF con formato ATS. ${PRICING.copy.seoLine}`,
  path: "/plantillas-curriculum",
  keywords: [
    "mejores plantillas de curriculum vitae",
    "plantillas de cv profesionales",
    "plantillas curriculum descargar",
    "modelo de curriculum vitae",
    "template cv",
    "plantillas cv ats",
    "plantillas de curriculum editables",
  ],
});

const templates = CV_TEMPLATES;

export default function PlantillasCurriculumPage() {
  const baseUrl = getBaseUrl();
  const path = "/plantillas-curriculum";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuál es la mejor plantilla de currículum para ATS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Todas las plantillas de VitaeSpark tienen una estructura clara para lectura ATS. ATS Moderna, Operativa ATS y Harvard priorizan al máximo el contenido; Elegancia, Azul, Púrpura y Verde suman una presentación más visual.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo puedo cambiar de plantilla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Podés cambiar de plantilla durante la creación, antes de pagar. Después del pago, el CV queda editable desde tu perfil, pero asociado a la plantilla elegida.",
        },
      },
      {
        "@type": "Question",
        name: "¿Las plantillas se descargan en PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todas las plantillas se descargan en formato PDF profesional. También podés editar el CV guardado y volver a descargar una nueva versión.",
        },
      },
      {
        "@type": "Question",
        name: PRICING.copy.faqQuestion,
        acceptedAnswer: {
          "@type": "Answer",
          text: PRICING.copy.faqAnswer,
        },
      },
      {
        "@type": "Question",
        name: "¿Qué plantilla conviene para mi primer empleo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para un primer empleo, ATS Moderna o Elegancia son buenas opciones porque ordenan estudios, habilidades y proyectos sin exigir una trayectoria extensa.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántas plantillas tiene VitaeSpark?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VitaeSpark ofrece 7 plantillas profesionales con estructuras de una o dos columnas, opciones con y sin foto y formatos específicos para procesos ATS y puestos operativos.",
        },
      },
    ],
  };

  const howtoSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo elegir la mejor plantilla de currículum",
    description:
      "Guía paso a paso para seleccionar la plantilla de CV ideal según tu perfil, industria y objetivo laboral.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Definí tu objetivo laboral",
        text: "Pensá en el tipo de trabajo que buscás y el nivel de formalidad del sector. Industrias como banca o derecho necesitan formatos más sobrios; tecnología o diseño permiten opciones más creativas.",
        url: new URL(path, baseUrl).toString(),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Evaluá tu nivel de experiencia",
        text: "Si tenés mucha experiencia, Harvard o ATS Moderna ayudan a ordenar la trayectoria. Para puestos operativos, Operativa ATS prioriza experiencia, licencias y disponibilidad. Si estás arrancando, Elegancia equilibra contenido y presencia visual.",
        url: new URL(path, baseUrl).toString(),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Probá la plantilla con tu contenido real",
        text: "En VitaeSpark podés ver tu CV en distintas plantillas antes de pagar. Cargá tu información y compará cómo se ve en cada formato para elegir con seguridad. Después, podés ajustar el contenido desde tu perfil.",
        url: new URL(path, baseUrl).toString(),
      },
    ],
  };

  return (
    <div className="overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
      />

      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_right,_rgba(124,58,237,0.22),_transparent_40%),#0F0F10]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Recursos", href: "/blog" },
              { label: "Plantillas de Currículum", href: path },
            ]}
          />

          <span className="mt-8 inline-flex rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
            Plantillas VitaeSpark
          </span>
          <h1 className="mt-6 text-[2.45rem] font-bold leading-tight sm:text-5xl">
            Las mejores plantillas de currículum para cada perfil profesional
          </h1>
          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
            Elegir una buena plantilla de currículum no es solo una cuestión
            estética. También define cómo se entiende tu experiencia, qué peso
            tiene tu perfil profesional y qué tan fácil es leer tu CV en pocos
            segundos. Esta guía te ayuda a elegir la mejor opción según tu
            industria, experiencia y objetivo laboral.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrackedCtaLink
              href="/crear"
              label="Crear mi CV"
              sourcePath={path}
              sourceType="landing"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
            <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
            Comparación de plantillas
          </div>
          <h2 className="text-3xl font-bold">
            Las 7 plantillas de VitaeSpark: cuál elegir según tu perfil
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
            Todas nuestras plantillas están optimizadas para sistemas ATS, se
            descargan en PDF profesional y quedan editables desde tu perfil. La
            diferencia está en el estilo visual y el tipo de industria para la
            que mejor funcionan.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-[#121217] transition hover:border-[#38BDF8]/30"
            >
              <div className="relative">
                <Image
                  src={template.image}
                  alt={`Vista previa de plantilla ${template.name} para currículum`}
                  width={420}
                  height={280}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 92vw"
                  className="h-52 w-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{template.name}</h3>
                  <span className="rounded-full bg-green-500/15 px-3 py-0.5 text-xs font-medium text-green-400">
                    ATS
                  </span>
                </div>
                <p className="text-sm leading-7 text-white/70">
                  {template.description}
                </p>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/45">
                    Ideal para
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {template.bestFor.map((industry) => (
                      <span
                        key={industry}
                        className="rounded-lg border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs text-white/72"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0A0A0C]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-12">
              <section>
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15"
                    aria-hidden="true"
                  >
                    <FileText className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug">
                    Cómo elegir la mejor plantilla para tu currículum
                  </h2>
                </div>
                <div className="space-y-5 pl-0 sm:pl-[3.75rem]">
                  <p className="text-[1.03rem] leading-8 text-white/76">
                    La mejor plantilla depende del tipo de trabajo que buscás,
                    del nivel de experiencia que tenés y del tipo de información
                    que necesitás destacar. En muchos casos, una estructura
                    clara y profesional rinde mejor que un formato demasiado
                    decorado.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                      <span className="text-[1.03rem] leading-8 text-white/76">
                        <strong className="text-white">Perfiles senior o formales:</strong>{" "}
                        Harvard o ATS Moderna proyectan autoridad y orden.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                      <span className="text-[1.03rem] leading-8 text-white/76">
                        <strong className="text-white">Industrias creativas:</strong>{" "}
                        Púrpura o Elegancia agregan identidad visual sin perder
                        legibilidad.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                      <span className="text-[1.03rem] leading-8 text-white/76">
                        <strong className="text-white">Primer empleo:</strong>{" "}
                        ATS Moderna o Elegancia ayudan a ordenar estudios y habilidades aunque
                        tengas poca experiencia.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                      <span className="text-[1.03rem] leading-8 text-white/76">
                        <strong className="text-white">Roles operativos:</strong>{" "}
                        Operativa ATS prioriza experiencia, licencias,
                        certificaciones y disponibilidad.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="mb-5 flex items-start gap-4">
                  <div
                    className="mt-1 rounded-xl bg-[#38BDF8]/10 p-2.5 text-[#38BDF8] ring-1 ring-[#38BDF8]/15"
                    aria-hidden="true"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug">
                    Qué hace que una plantilla sea buena para ATS
                  </h2>
                </div>
                <div className="space-y-5 pl-0 sm:pl-[3.75rem]">
                  <p className="text-[1.03rem] leading-8 text-white/76">
                    Un sistema ATS necesita poder leer tu CV sin errores. Las
                    plantillas de VitaeSpark están diseñadas para que eso pase:
                    estructura jerárquica clara, fuentes estándar, sin elementos
                    gráficos que confundan al software y secciones bien
                    delimitadas.
                  </p>
                  <p className="text-[1.03rem] leading-8 text-white/76">
                    No se trata solo de pasar el filtro automático: una buena
                    plantilla ATS también hace que el reclutador humano entienda
                    tu perfil en segundos. Ese equilibrio entre legibilidad
                    técnica y claridad visual es lo que buscamos en cada diseño.
                  </p>
                </div>
              </section>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="border-l border-[#7C3AED]/30 pl-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Cómo funciona
                </div>
                <div className="space-y-5">
                  {[
                    {
                      title: "Elegí tu plantilla",
                      desc: "Seleccioná entre 7 opciones profesionales y mirá cómo se ve tu CV en cada una.",
                    },
                    {
                      title: "Completá tu información",
                      desc: "Cargá experiencia, estudios y habilidades con ayuda de IA para mejorar la redacción.",
                    },
                    {
                      title: "Descargá en PDF",
                      desc: "Obtené tu CV profesional listo para enviar a reclutadores y portales de empleo.",
                    },
                  ].map((step, index) => (
                    <div
                      key={step.title}
                      className="border-b border-white/10 pb-5 last:border-b-0"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/20 text-xs font-semibold text-[#C4B5FD]">
                          {index + 1}
                        </span>
                        <h3 className="text-sm font-semibold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-7 text-white/70">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-l border-[#38BDF8]/30 pl-6">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#38BDF8]">
                  <Link2 className="h-4 w-4" aria-hidden="true" />
                  También te puede servir
                </div>
                <div className="grid gap-5">
                  <Link
                    href="/plantilla-harvard"
                    className="group block border-b border-white/10 pb-5 transition last:border-b-0 hover:border-[#38BDF8]/40"
                  >
                    <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
                      Plantilla Harvard en detalle
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                    </h3>
                    <p className="text-sm leading-7 text-white/70">
                      Cuándo conviene usarla y cómo aprovechar su estructura.
                    </p>
                  </Link>
                  <Link
                    href="/curriculum-ats"
                    className="group block border-b border-white/10 pb-5 transition last:border-b-0 hover:border-[#38BDF8]/40"
                  >
                    <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
                      Currículum ATS
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                    </h3>
                    <p className="text-sm leading-7 text-white/70">
                      Cómo optimizar tu CV para pasar filtros automáticos.
                    </p>
                  </Link>
                  <Link
                    href="/cv-profesional"
                    className="group block border-b border-white/10 pb-5 transition last:border-b-0 hover:border-[#38BDF8]/40"
                  >
                    <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
                      CV Profesional
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                    </h3>
                    <p className="text-sm leading-7 text-white/70">
                      Cómo crear un CV que destaque por su contenido y formato.
                    </p>
                  </Link>
                  <Link
                    href="/blog/errores-en-el-curriculum"
                    className="group block border-b border-white/10 pb-5 transition last:border-b-0 hover:border-[#38BDF8]/40"
                  >
                    <h3 className="mb-2 flex items-center justify-between gap-3 text-base font-semibold">
                      Errores en el currículum
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/50 transition group-hover:translate-x-1 group-hover:text-[#8B5CF6]" />
                    </h3>
                    <p className="text-sm leading-7 text-white/70">
                      Los errores más comunes y cómo evitarlos antes de enviar tu CV.
                    </p>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div
              className="rounded-xl bg-[#7C3AED]/15 p-2.5 text-[#A78BFA] ring-1 ring-[#A78BFA]/20"
              aria-hidden="true"
            >
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-semibold">Preguntas frecuentes</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="mb-2 text-base font-semibold text-white/95">
                ¿Cuál es la mejor plantilla de currículum para ATS?
              </h3>
              <p className="text-sm leading-7 text-white/75">
                Todas las plantillas de VitaeSpark están diseñadas para ser
                compatibles con sistemas ATS. ATS Moderna, Operativa ATS y
                Harvard priorizan el contenido; Elegancia, Azul, Púrpura y
                Verde suman una presentación más visual.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="mb-2 text-base font-semibold text-white/95">
                ¿Cuándo puedo cambiar de plantilla?
              </h3>
              <p className="text-sm leading-7 text-white/75">
                Podés cambiar de plantilla durante la creación, antes de pagar.
                Después del pago, el CV queda editable desde tu perfil, pero
                asociado a la plantilla elegida.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="mb-2 text-base font-semibold text-white/95">
                ¿Las plantillas se descargan en PDF?
              </h3>
              <p className="text-sm leading-7 text-white/75">
                Sí, todas las plantillas se descargan en formato PDF profesional.
                Además, el CV queda guardado para editarlo y descargar una nueva
                versión cuando lo necesites.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="mb-2 text-base font-semibold text-white/95">
                {PRICING.copy.faqQuestion}
              </h3>
              <p className="text-sm leading-7 text-white/75">
                {PRICING.copy.faqAnswer}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <h3 className="mb-2 text-base font-semibold text-white/95">
                ¿Qué plantilla conviene para mi primer empleo?
              </h3>
              <p className="text-sm leading-7 text-white/75">
                Para un primer empleo, ATS Moderna o Elegancia funcionan bien
                porque ordenan estudios, habilidades y proyectos sin exigir una
                trayectoria laboral extensa.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <TrackedCtaLink
              href="/crear"
              label="Probá las plantillas ahora"
              sourcePath={path}
              sourceType="landing"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
