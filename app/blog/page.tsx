import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  Code2,
  FileText,
  GraduationCap,
  Layers3,
  ListChecks,
  PenLine,
  SearchCheck,
  Sparkles,
  Target,
  UserRound,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog de CV y Empleo",
  description:
    "Guias practicas sobre curriculum vitae, ATS, habilidades, primer empleo y como mejorar tus postulaciones con VitaeSpark.",
  path: "/blog",
  keywords: [
    "blog curriculum vitae",
    "guias de cv",
    "como hacer curriculum",
    "consejos para cv",
    "empleo y curriculum",
  ],
});

const posts = [
  {
    href: "/blog/que-poner-en-un-curriculum",
    title: "Que poner en un curriculum",
    description:
      "Guia clara para elegir el contenido correcto y armar un CV mas profesional.",
    category: "Contenido",
    icon: ListChecks,
  },
  {
    href: "/blog/como-hacer-un-curriculum",
    title: "Como hacer un curriculum paso a paso",
    description:
      "Una guia base para estructurar tu CV y mejorar su claridad desde el principio.",
    category: "Guia base",
    icon: BookOpen,
  },
  {
    href: "/blog/ejemplo-de-curriculum-vitae",
    title: "Ejemplo de curriculum vitae",
    description:
      "Aprende a usar ejemplos de CV como referencia sin terminar con un documento generico.",
    category: "Ejemplos",
    icon: FileText,
  },
  {
    href: "/blog/como-hacer-un-cv-para-trabajo",
    title: "Como hacer un CV para trabajo",
    description:
      "Aprende como orientar tu curriculum a vacantes reales y postularte mejor.",
    category: "Postulacion",
    icon: BriefcaseBusiness,
  },
  {
    href: "/blog/como-hacer-un-cv-ats",
    title: "Como hacer un CV ATS",
    description:
      "Consejos practicos para pasar mejor filtros automatizados y procesos actuales.",
    category: "ATS",
    icon: SearchCheck,
  },
  {
    href: "/blog/habilidades-para-curriculum",
    title: "Habilidades para curriculum",
    description:
      "Como elegir habilidades relevantes y evitar listas genericas que no aportan.",
    category: "Habilidades",
    icon: BadgeCheck,
  },
  {
    href: "/blog/habilidades-blandas-para-cv",
    title: "Habilidades blandas para CV",
    description:
      "Aprende como usarlas sin sonar generico ni vacio.",
    category: "Habilidades",
    icon: UserRound,
  },
  {
    href: "/blog/errores-en-el-curriculum",
    title: "Errores en el curriculum",
    description:
      "Detecta fallos comunes que pueden hacerte perder entrevistas antes de empezar.",
    category: "Errores",
    icon: AlertTriangle,
  },
  {
    href: "/blog/como-mejorar-mi-curriculum",
    title: "Como mejorar mi curriculum",
    description:
      "Ideas practicas para hacer tu CV mas claro, mas fuerte y mas util.",
    category: "Mejora",
    icon: Sparkles,
  },
  {
    href: "/blog/como-hacer-un-cv-profesional",
    title: "Como hacer un CV profesional",
    description:
      "Descubre que cambios vuelven mas profesional tu CV sin hacerlo artificial.",
    category: "Profesional",
    icon: Layers3,
  },
  {
    href: "/blog/perfil-profesional-para-cv",
    title: "Perfil profesional para CV",
    description:
      "Aprende a escribir un resumen profesional breve pero convincente.",
    category: "Perfil",
    icon: PenLine,
  },
  {
    href: "/blog/ejemplo-de-perfil-profesional",
    title: "Ejemplo de perfil profesional",
    description:
      "Toma una referencia clara para adaptar tu resumen profesional.",
    category: "Ejemplos",
    icon: ClipboardCheck,
  },
  {
    href: "/blog/como-hacer-un-curriculum-sin-experiencia",
    title: "Como hacer un curriculum sin experiencia",
    description:
      "Guia para mostrar potencial aunque todavia no tengas historial laboral fuerte.",
    category: "Primer empleo",
    icon: GraduationCap,
  },
  {
    href: "/blog/como-adaptar-tu-cv-a-una-vacante",
    title: "Como adaptar tu CV a una vacante",
    description:
      "Ajusta tu CV a ofertas concretas sin rehacerlo por completo.",
    category: "Vacantes",
    icon: Target,
  },
  {
    href: "/blog/como-hacer-un-cv-para-programador",
    title: "Como hacer un CV para programador",
    description:
      "Destaca stack, proyectos y criterio tecnico sin caer en listas vacias.",
    category: "Tecnologia",
    icon: Code2,
  },
] satisfies Array<{
  href: string;
  title: string;
  description: string;
  category: string;
  icon: LucideIcon;
}>;

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F0F10] text-[#F4F4F5]">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),_transparent_35%),#0F0F10]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1 text-sm font-medium text-[#A78BFA]">
            Blog VitaeSpark
          </span>
          <h1 className="mt-6 max-w-[358px] text-pretty text-[2.45rem] font-bold leading-tight sm:max-w-4xl sm:text-5xl">
            Guias para crear un mejor curriculum y encontrar trabajo
          </h1>
          <p className="mt-6 max-w-[358px] text-base leading-8 text-white/75 sm:max-w-3xl sm:text-lg">
            Reunimos contenido pensado para personas que quieren crear su CV,
            mejorar postulaciones, entender ATS y prepararse mejor para el
            mercado laboral.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#121217]">
<Image
              src="/purple-hero.webp"
              alt="Ejemplo visual de CV moderno creado con VitaeSpark"
              width={1200}
              height={630}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-64 w-full object-cover object-top"
            />
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-white/65">
              Ejemplo de CV moderno optimizado para ATS.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#121217]">
<Image
              src="/elegance-good.webp"
              alt="Ejemplo visual de CV elegante creado con VitaeSpark"
              width={1200}
              height={630}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-64 w-full object-cover object-top"
            />
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-white/65">
              Ejemplo de CV profesional con diseño elegante.
            </figcaption>
          </figure>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((post, index) => {
            const Icon = post.icon;

            return (
              <Link
                key={post.href}
                href={post.href}
                className="group relative min-h-[206px] overflow-hidden rounded-3xl border border-white/10 bg-[#121217] p-6 shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-[#38BDF8]/40 hover:bg-[#15151B]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/30 to-transparent opacity-0 transition group-hover:opacity-100" />

                <div className="relative mb-5 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-[#38BDF8]/10 p-3 text-[#38BDF8] ring-1 ring-[#38BDF8]/15 transition group-hover:bg-[#7C3AED]/15 group-hover:text-[#A78BFA]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                      {post.category}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="relative text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {post.title}
                </h2>
                <p className="relative mt-3 text-sm leading-7 text-white/68 sm:text-base">
                  {post.description}
                </p>
                <span className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8]">
                  Leer guia
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-[#121217] p-8">
          <h2 className="text-2xl font-semibold">
            Recursos recomendados para seguir creciendo
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/plantillas-curriculum"
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-[#38BDF8]/40 hover:bg-black/30"
            >
              <h3 className="text-lg font-semibold">Plantillas de curriculum</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Explora formatos y estructuras para distintos perfiles y
                objetivos laborales.
              </p>
            </Link>
            <Link
              href="/generador-de-cv-con-ia"
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-[#38BDF8]/40 hover:bg-black/30"
            >
              <h3 className="text-lg font-semibold">Generador de CV con IA</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Lleva estas guias a la practica dentro del flujo de VitaeSpark.
              </p>
            </Link>
            <Link
              href="/cv-profesional"
              className="rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-[#38BDF8]/40 hover:bg-black/30"
            >
              <h3 className="text-lg font-semibold">CV profesional</h3>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Da el siguiente paso si quieres una version mas seria y competitiva.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
