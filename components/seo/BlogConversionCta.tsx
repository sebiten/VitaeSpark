import Link from "next/link";
import { ArrowRight, BadgeCheck, FileText, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrackedCtaLink } from "./TrackedCtaLink";

export type BlogCtaVariant = "inline" | "mid" | "final" | "stickyMobile";

export type BlogCtaContent = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  bullets: string[];
};

type BlogConversionCtaProps = {
  path: string;
  content: BlogCtaContent;
  variant: BlogCtaVariant;
};

const fallbackCta: BlogCtaContent = {
  title: "Usa esta guia para armar tu CV",
  description:
    "Ordena tu informacion, elegi una plantilla clara, editalo desde tu perfil y genera un PDF listo para enviar.",
  primaryLabel: "Crear mi CV con IA",
  secondaryHref: "/plantillas-curriculum",
  secondaryLabel: "Ver plantillas",
  bullets: ["Contenido guiado", "CV editable", "PDF listo para descargar"],
};

const ctaByPath: Record<string, BlogCtaContent> = {
  "/blog/habilidades-para-curriculum": {
    title: "Converti tus habilidades en un CV listo para enviar",
    description:
      "Toma las habilidades de esta guia y usalas dentro de un CV ordenado, claro y pensado para postulaciones reales.",
    primaryLabel: "Usar mis habilidades en un CV",
    secondaryHref: "/plantillas-curriculum",
    secondaryLabel: "Ver plantillas",
    bullets: ["Habilidades por puesto", "Texto editable", "Formato profesional"],
  },
  "/blog/perfil-profesional-para-cv": {
    title: "Escribi tu perfil profesional con IA sin sonar generico",
    description:
      "Transforma tus datos en un resumen claro para abrir el CV con mas fuerza y coherencia.",
    primaryLabel: "Crear mi perfil en el CV",
    secondaryHref: "/hacer-cv-con-ia",
    secondaryLabel: "Ver como funciona",
    bullets: ["Resumen profesional", "Redaccion editable", "Menos frases vacias"],
  },
  "/blog/ejemplo-de-perfil-profesional": {
    title: "Escribi tu perfil profesional con IA sin sonar generico",
    description:
      "Usa los ejemplos como punto de partida y genera una version adaptada a tu experiencia real.",
    primaryLabel: "Crear mi perfil en el CV",
    secondaryHref: "/hacer-cv-con-ia",
    secondaryLabel: "Ver como funciona",
    bullets: ["Ejemplos adaptables", "Perfil editable", "CV mas consistente"],
  },
  "/blog/como-hacer-un-curriculum-sin-experiencia": {
    title: "Arma tu primer CV sin empezar de cero",
    description:
      "Completa estudios, cursos, habilidades y datos reales para generar un CV serio aunque todavia no tengas experiencia laboral.",
    primaryLabel: "Crear mi CV sin experiencia",
    secondaryHref: "/curriculum-sin-experiencia",
    secondaryLabel: "Ver guia especifica",
    bullets: ["Primer empleo", "Habilidades y estudios", "CV editable"],
  },
  "/blog/como-hacer-un-cv-ats": {
    title: "Genera un CV claro para ATS",
    description:
      "Usa una estructura limpia, secciones reconocibles y contenido facil de leer para sistemas de seleccion.",
    primaryLabel: "Crear un CV compatible con ATS",
    secondaryHref: "/plantillas-curriculum",
    secondaryLabel: "Ver plantillas",
    bullets: ["Secciones claras", "Formato simple", "Editable despues"],
  },
};

export function getBlogCtaContent(path: string) {
  return ctaByPath[path] || fallbackCta;
}

export function BlogConversionCta({
  path,
  content,
  variant,
}: BlogConversionCtaProps) {
  if (variant === "stickyMobile") {
    return (
      <div
        className="fixed inset-x-0 bottom-0 z-40 px-3 md:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#18181D]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white/92">
              Crear mi CV
            </p>
            <p className="truncate text-xs text-white/56">
              Usa esta guia como base.
            </p>
          </div>
          <TrackedCtaLink
            href="/crear"
            label="Crear"
            sourcePath={path}
            sourceType="blog"
            trackingLabel={`${content.primaryLabel} - sticky mobile`}
            buttonSize="sm"
            showIcon={false}
            buttonClassName="rounded-xl bg-[#8B5CF6] px-4 text-white shadow-lg shadow-[#8B5CF6]/25 hover:bg-[#7C3AED]"
          />
        </div>
      </div>
    );
  }

  const isFinal = variant === "final";
  const isMid = variant === "mid";

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#18181D] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-7",
        isMid && "border-[#8B5CF6]/20 bg-[#191820]",
        isFinal && "border-[#38BDF8]/18 bg-[#17191E]"
      )}
      aria-label="Crear CV con VitaeSpark"
    >
      <div className="pointer-events-none absolute right-6 top-6 h-24 w-24 rounded-full bg-[#8B5CF6]/10 blur-2xl" />
      <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div className="min-w-0">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/56">
            <Sparkles className="h-3.5 w-3.5 text-[#A78BFA]" aria-hidden="true" />
            Siguiente paso
          </div>
          <h2 className="text-balance text-2xl font-semibold leading-tight text-white">
            {content.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
            {content.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {content.bullets.map((bullet) => (
              <span
                key={bullet}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-xs text-white/64"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-[#A78BFA]" aria-hidden="true" />
                {bullet}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedCtaLink
              href="/crear"
              label={content.primaryLabel}
              sourcePath={path}
              sourceType="blog"
              trackingLabel={`${content.primaryLabel} - ${variant}`}
              buttonClassName="w-full rounded-xl bg-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 hover:bg-[#7C3AED] sm:w-auto"
            />
            <Link
              href={content.secondaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.035] px-5 py-2.5 text-sm font-medium text-white/74 transition hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white"
            >
              {content.secondaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="hidden rounded-2xl border border-white/[0.08] bg-[#0F0F12] p-4 lg:block">
          <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-3">
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#A78BFA]">
              VitaeSpark
            </span>
            <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-[0.65rem] text-white/60">
              editable
            </span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="h-3 w-28 rounded-full bg-white/80" />
              <div className="mt-2 h-2 w-20 rounded-full bg-white/24" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded-full bg-white/18" />
              <div className="h-2 w-10/12 rounded-full bg-white/14" />
              <div className="h-2 w-8/12 rounded-full bg-white/14" />
            </div>
            <div className="rounded-xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 p-3">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-white/82">
                <FileText className="h-3.5 w-3.5 text-[#C4B5FD]" aria-hidden="true" />
                PDF listo
              </div>
              <div className="h-2 w-full rounded-full bg-white/16" />
              <div className="mt-1.5 h-2 w-3/4 rounded-full bg-white/12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
