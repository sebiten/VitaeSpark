import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { BlogArticleVisual } from "@/components/seo/BlogArticleVisual";
import { TrackedCtaLink } from "@/components/seo/TrackedCtaLink";
import { blogPosts } from "@/data/blog-posts";

export const metadata = buildMetadata({
  title: "Blog de CV y Empleo: Guías para Mejorar tu Currículum",
  description:
    "Guías prácticas sobre currículum vitae, ATS, habilidades, primer empleo y cómo mejorar tus postulaciones con VitaeSpark.",
  path: "/blog",
  keywords: [
    "blog curriculum vitae",
    "guias de cv",
    "como hacer curriculum",
    "consejos para cv",
    "empleo y curriculum",
  ],
});

const featuredHref = "/blog/habilidades-para-curriculum";
const orderedPosts = [
  ...blogPosts.filter((post) => post.href === featuredHref),
  ...blogPosts.filter((post) => post.href !== featuredHref),
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <header className="relative border-b border-white/8 bg-[#0E0E12]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(122,92,255,0.13),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center lg:px-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.17em] text-[#B9A7FF]">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              Guías VitaeSpark
            </div>
            <h1 className="mt-5 max-w-3xl text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[#F6F2EA] sm:text-5xl lg:text-[3.65rem]">
              Guías para crear el mejor currículum
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
              Respuestas claras, ejemplos por puesto y decisiones concretas para mejorar tu CV sin llenarlo de frases genéricas.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <TrackedCtaLink
                href="/crear?intent=general"
                label="Empezar mi CV"
                sourcePath="/blog"
                sourceType="blog"
                trackingLabel="blog_index_hero_cta"
                buttonClassName="w-full rounded-full bg-[#F6F2EA] text-[#121114] shadow-none hover:bg-white sm:w-auto"
              />
              <p className="text-xs leading-5 text-white/44">
                Crealo y revisalo gratis. Pagás solo si descargás el PDF final.
              </p>
            </div>
          </div>

          <Link href={featuredHref} className="group block">
            <div className="hidden sm:block">
              <BlogArticleVisual intent="skills" />
            </div>
            <div className="mx-auto mt-5 flex max-w-[340px] items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A78BFA]">
                  Guía recomendada
                </p>
                <p className="mt-1 text-sm font-semibold text-white/80 group-hover:text-white">
                  Habilidades para currículum
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-white/44 transition-transform group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#A78BFA]">
            Biblioteca práctica
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
            Encontrá la guía que necesitás ahora
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/52">
            Buscá por problema, etapa o tipo de trabajo. Cada guía termina en una acción concreta para aplicar lo aprendido.
          </p>
        </div>

        <BlogGrid posts={orderedPosts} />

        <section className="mt-16 border-t border-white/10 pt-9" aria-labelledby="blog-resources">
          <div className="max-w-2xl">
            <h2 id="blog-resources" className="text-2xl font-semibold tracking-[-0.035em] text-white">
              Herramientas para pasar de la lectura a la acción
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Elegí una plantilla, entendé cómo funciona el creador o revisá qué hace profesional a un CV.
            </p>
          </div>
          <div className="mt-6 grid gap-x-8 md:grid-cols-3">
            {[
              {
                href: "/herramientas/generador-habilidades-cv",
                title: "Generar habilidades para tu CV",
                description:
                  "Obtené una selección por puesto, gratis y sin registro.",
              },
              {
                href: "/plantillas-curriculum",
                title: "Ver plantillas",
                description: "Compará formatos claros antes de empezar.",
              },
              {
                href: "/cv-profesional",
                title: "Qué debe tener un CV profesional",
                description: "Revisá estructura, contenido y presentación.",
              },
            ].map((resource) => (
              <Link key={resource.href} href={resource.href} className="group border-t border-white/10 py-5">
                <h3 className="flex items-center justify-between gap-3 text-sm font-semibold text-white/78 transition group-hover:text-white">
                  {resource.title}
                  <ArrowRight className="h-4 w-4 text-[#A78BFA] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/46">{resource.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
