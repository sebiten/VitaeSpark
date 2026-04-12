import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plantillas de Curriculum Vitae",
  description:
    "Explora plantillas de curriculum vitae profesionales, claras y listas para descargar en PDF segun tu perfil y objetivo laboral.",
  path: "/plantillas-curriculum",
  keywords: [
    "plantillas de curriculum vitae",
    "plantillas de cv",
    "plantillas curriculum",
    "modelo de curriculum vitae",
    "template cv",
  ],
});

const templates = [
  {
    href: "/plantilla-harvard",
    title: "Plantilla Harvard",
    description:
      "Sobria, clara y muy buena para perfiles profesionales, tecnicos o academicos.",
  },
  {
    href: "/crear-cv-online",
    title: "Plantilla moderna para crear tu CV online",
    description:
      "Ideal si quieres combinar una estructura profesional con un flujo guiado y rapido.",
  },
  {
    href: "/curriculum-ats",
    title: "Plantilla orientada a ATS",
    description:
      "Pensada para priorizar lectura clara, secciones ordenadas y contenido facil de procesar.",
  },
];

export default function PlantillasCurriculumPage() {
  return (
    <div className="min-h-screen bg-[#0F0F10] text-[#F4F4F5]">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_right,_rgba(124,58,237,0.22),_transparent_40%),#0F0F10]">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 px-4 py-1 text-sm font-medium text-[#38BDF8]">
            Plantillas VitaeSpark
          </span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Plantillas de curriculum para distintos perfiles y objetivos
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
            Elegir una buena plantilla de curriculum no es solo una cuestion
            estetica. Tambien define como se entiende tu experiencia, que peso
            tiene tu perfil profesional y que tan facil es leer tu CV en pocos
            segundos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Link
              key={template.href}
              href={template.href}
              className="rounded-3xl border border-white/10 bg-[#121217] p-8 transition hover:border-[#38BDF8]/40 hover:bg-[#15151B]"
            >
              <h2 className="text-2xl font-semibold">{template.title}</h2>
              <p className="mt-3 text-base leading-8 text-white/70">
                {template.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-[#121217] p-8">
          <h2 className="text-2xl font-semibold">
            Como elegir la mejor plantilla para tu curriculum
          </h2>
          <div className="mt-4 space-y-4 text-base leading-8 text-white/75">
            <p>
              La mejor plantilla depende del tipo de trabajo que buscas, del
              nivel de experiencia que tienes y del tipo de informacion que
              necesitas destacar. En muchos casos, una estructura clara y
              profesional rinde mejor que un formato demasiado decorado.
            </p>
            <p>
              Si quieres maximizar claridad y empleabilidad, conviene priorizar
              una plantilla que ordene bien perfil, experiencia, estudios y
              habilidades. Y si ademas apuntas a procesos digitales, mejor aun
              si mantiene buena compatibilidad con ATS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
