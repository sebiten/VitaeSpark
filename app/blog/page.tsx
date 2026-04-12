import Link from "next/link";
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
    href: "/blog/como-hacer-un-curriculum",
    title: "Como hacer un curriculum paso a paso",
    description:
      "Una guia base para estructurar tu CV y mejorar su claridad desde el principio.",
  },
  {
    href: "/blog/como-hacer-un-cv-ats",
    title: "Como hacer un CV ATS",
    description:
      "Consejos practicos para pasar mejor filtros automatizados y procesos actuales.",
  },
  {
    href: "/blog/habilidades-para-curriculum",
    title: "Habilidades para curriculum",
    description:
      "Como elegir habilidades relevantes y evitar listas genericas que no aportan.",
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#F4F4F5]">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.20),_transparent_35%),#0F0F10]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1 text-sm font-medium text-[#A78BFA]">
            Blog VitaeSpark
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Guias para crear un mejor curriculum y encontrar trabajo
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Reunimos contenido pensado para personas que quieren crear su CV,
            mejorar postulaciones, entender ATS y prepararse mejor para el
            mercado laboral.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="rounded-3xl border border-white/10 bg-[#121217] p-8 transition hover:border-[#38BDF8]/40 hover:bg-[#15151B]"
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="mt-3 max-w-3xl text-base leading-8 text-white/70">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
