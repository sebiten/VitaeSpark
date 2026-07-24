import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardCheck, Sparkles } from "lucide-react";
import SkillsGenerator from "@/components/tools/SkillsGenerator";
import { buildMetadata, getBaseUrl } from "@/lib/seo";
import { SKILLS_TOOL_PATH } from "@/lib/skills-tool";

const pageMetadata = buildMetadata({
  title: "Generador de Habilidades para CV con IA Gratis",
  description:
    "Generá habilidades técnicas y transferibles para tu CV según el puesto y tu experiencia. Resultado gratis, editable y listo para copiar.",
  path: SKILLS_TOOL_PATH,
  keywords: [
    "generador de habilidades para cv",
    "habilidades para cv con ia",
    "habilidades para curriculum",
    "que habilidades poner en un cv",
  ],
});

export const metadata = {
  ...pageMetadata,
  title: {
    absolute: "Generador de Habilidades para CV con IA Gratis | VitaeSpark",
  },
};

const faqs = [
  {
    question: "¿Qué habilidades conviene poner en un CV?",
    answer:
      "Las que ayudan a entender cómo encajás en el puesto. Conviene combinar tareas o herramientas concretas con pocas capacidades transferibles que puedas respaldar.",
  },
  {
    question: "¿Puedo usar el generador sin registrarme?",
    answer:
      "Sí. La selección base es gratuita, aparece al instante y se puede copiar completa sin crear una cuenta.",
  },
  {
    question: "¿La herramienta inventa experiencia?",
    answer:
      "No. La lista funciona como una guía. Debés elegir únicamente habilidades que realmente tengas o puedas explicar en una entrevista.",
  },
  {
    question: "¿Cómo paso el resultado a mi CV?",
    answer:
      "Seleccioná hasta diez habilidades y elegí usar el resultado en tu CV. Se abrirá el creador con el puesto y las habilidades cargados para que completes el resto.",
  },
  {
    question: "¿Cómo genera VitaeSpark estas sugerencias?",
    answer:
      "La selección inicial parte de un catálogo organizado por puesto y nivel de experiencia. Después podés agregar contexto para personalizarla con IA. En ambos casos, vos decidís qué habilidades conservar.",
  },
];

const quickAnswers = [
  {
    question: "¿Qué habilidades poner en un CV sin experiencia?",
    answer:
      "Aprendizaje de procedimientos, organización, herramientas digitales básicas, comunicación clara y trabajo en equipo, siempre que puedas respaldarlas con estudios, proyectos o actividades reales.",
  },
  {
    question: "¿Qué habilidades administrativas conviene destacar?",
    answer:
      "Excel, carga de datos, gestión de documentación, elaboración de reportes, correo electrónico y seguimiento de tareas.",
  },
  {
    question: "¿Qué habilidades sirven para un CV de operario?",
    answer:
      "Producción, control visual de calidad, preparación de materiales, normas de seguridad, registro de producción y seguimiento de procedimientos.",
  },
  {
    question: "¿Qué habilidades incluir para trabajar en minería?",
    answer:
      "Uso de EPP, cumplimiento de procedimientos, inspección del área, reporte de riesgos, disciplina operativa y adaptación a turnos o roster.",
  },
];

export default function SkillsGeneratorPage() {
  const baseUrl = getBaseUrl();
  const url = new URL(SKILLS_TOOL_PATH, baseUrl).toString();
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Generador de Habilidades para CV",
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: "es",
    description:
      "Herramienta gratuita para elegir habilidades técnicas y transferibles según el puesto y el nivel de experiencia.",
    dateModified: "2026-07-23",
    creator: {
      "@type": "Organization",
      name: "VitaeSpark",
      url: baseUrl.toString(),
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
    },
    featureList: [
      "Selección por puesto",
      "Resultado sin registro",
      "Personalización opcional con IA",
      "Transferencia al creador de CV",
    ],
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: baseUrl.toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Generador de habilidades para CV",
        item: url,
      },
    ],
  };

  return (
    <div className="relative overflow-hidden bg-[#0B0B0F] text-[#F6F2EA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(109,84,210,0.2),transparent_28%),radial-gradient(circle_at_18%_28%,rgba(56,189,248,0.06),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative">
        <header className="mx-auto max-w-5xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pb-16 sm:pt-24">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#CFC3FF]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Gratis y sin registro
          </div>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#F6F2EA] sm:text-6xl lg:text-7xl">
            Habilidades para tu CV, según el trabajo que buscás
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#CBC5BC]/66 sm:text-lg">
            Generá una selección clara de habilidades técnicas y transferibles.
            Elegí las que realmente tenés, copialas o llevalas directo a tu CV.
          </p>
        </header>

        <section
          aria-labelledby="skills-direct-answer"
          className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-12"
        >
          <div className="grid gap-4 border-y border-white/10 py-6 md:grid-cols-[0.52fr_1.48fr] md:items-start md:gap-10">
            <h2
              id="skills-direct-answer"
              className="text-lg font-semibold tracking-[-0.025em] text-white/88"
            >
              ¿Qué habilidades poner en un CV?
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-white/58">
              Incluí habilidades relacionadas con el puesto que puedas demostrar
              con tareas, estudios o proyectos reales. Combiná herramientas y
              conocimientos concretos con pocas capacidades transferibles, como
              organización o comunicación. Evitá listas genéricas y priorizá
              entre seis y diez habilidades relevantes.
            </p>
          </div>
        </section>

        <SkillsGenerator />

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9F8BFF]">
                Respuestas rápidas
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Habilidades según tu búsqueda
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/52">
                Una buena selección cambia con el trabajo y la experiencia. Estas
                respuestas sirven como punto de partida, no como una lista para
                copiar sin revisar.
              </p>
            </div>
            <div className="border-t border-white/10">
              {quickAnswers.map((item) => (
                <div
                  key={item.question}
                  className="border-b border-white/10 py-5"
                >
                  <h3 className="font-semibold leading-6 text-white/84">
                    {item.question}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/50">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/8 bg-white/[0.018]">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 md:py-20">
            {[
              {
                icon: <ClipboardCheck className="h-5 w-5" />,
                title: "1. Elegí tu contexto",
                text: "Indicá el puesto y el nivel de experiencia para evitar una lista universal.",
              },
              {
                icon: <CheckCircle2 className="h-5 w-5" />,
                title: "2. Revisá la selección",
                text: "Marcá solo habilidades reales que puedas respaldar con ejemplos.",
              },
              {
                icon: <ArrowRight className="h-5 w-5" />,
                title: "3. Usalas en tu CV",
                text: "Pasá el resultado al creador y completá el documento sin volver a escribirlo.",
              },
            ].map((step) => (
              <article key={step.title} className="border-t border-white/10 pt-5">
                <div className="text-[#A997FF]" aria-hidden="true">
                  {step.icon}
                </div>
                <h2 className="mt-4 text-lg font-semibold">{step.title}</h2>
                <p className="mt-2 text-sm leading-6 text-white/48">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9F8BFF]">
                Criterio de selección
              </span>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                Cómo armamos cada sugerencia
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/52">
                La herramienta busca relevancia, claridad y honestidad. No
                reemplaza tu experiencia ni agrega conocimientos que no tenés.
              </p>
              <p className="mt-5 text-xs text-white/34">
                Última revisión de contenido: 23 de julio de 2026.
              </p>
            </div>
            <div className="border-t border-white/10">
              {[
                {
                  title: "Catálogo por puesto",
                  text: "La selección base reúne tareas, herramientas y capacidades habituales de cada área.",
                },
                {
                  title: "Contexto opcional con IA",
                  text: "Si agregás información propia, la IA adapta la selección sin inventar experiencia laboral.",
                },
                {
                  title: "Control final de la persona",
                  text: "Vos elegís qué conservar y deberías incluir únicamente lo que puedas explicar en una entrevista.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="grid gap-3 border-b border-white/10 py-5 sm:grid-cols-[42px_0.45fr_1fr] sm:items-start sm:gap-6"
                >
                  <span className="text-sm font-semibold text-[#A997FF]">
                    0{index + 1}
                  </span>
                  <h3 className="font-semibold text-white/82">{item.title}</h3>
                  <p className="text-sm leading-7 text-white/50">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9F8BFF]">
            Preguntas frecuentes
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
            Antes de copiar tu resultado
          </h2>
          <div className="mt-8 border-t border-white/10">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-white/10 py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold text-white/82">
                  {faq.question}
                  <span className="text-xl font-normal text-[#A997FF] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pt-3 text-sm leading-7 text-white/50">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
          <div className="flex flex-col justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/38">
                ¿Querés entender mejor la selección?
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.035em]">
                Leé la guía de habilidades antes de completar tu CV.
              </h2>
            </div>
            <Link
              href="/blog/habilidades-para-curriculum"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#CFC3FF] transition hover:text-white"
            >
              Ver guía completa
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
