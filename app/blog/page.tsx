import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { BlogGrid } from "@/components/blog/BlogGrid";
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

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111113] text-[#F4F4F5]">
      <section className="border-b border-white/10 bg-gradient-to-b from-[#1C1C22] to-[#111113]">
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
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#1C1C22]">
            <Image
              src="/purple-hero.webp"
              alt="Ejemplo visual de CV moderno creado con VitaeSpark"
              width={1200}
              height={630}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-64 w-full object-cover object-top"
            />
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-white/72">
              Ejemplo de CV moderno optimizado para ATS.
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#1C1C22]">
            <Image
              src="/elegance-good.webp"
              alt="Ejemplo visual de CV elegante creado con VitaeSpark"
              width={1200}
              height={630}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-64 w-full object-cover object-top"
            />
            <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-white/72">
              Ejemplo de CV profesional con diseño elegante.
            </figcaption>
          </figure>
        </div>

        <BlogGrid posts={blogPosts} />

        <div className="mt-12 rounded-3xl border border-white/10 bg-[#1C1C22] p-8">
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