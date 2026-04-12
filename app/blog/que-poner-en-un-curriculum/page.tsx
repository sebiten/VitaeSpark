import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Que Poner en un Curriculum",
  description:
    "Guia clara sobre que poner en un curriculum vitae para que se vea profesional, completo y util para buscar trabajo.",
  path: "/blog/que-poner-en-un-curriculum",
  keywords: [
    "que poner en un curriculum",
    "que lleva un curriculum vitae",
    "que incluir en un cv",
    "contenido curriculum vitae",
  ],
  type: "article",
});

export default function QuePonerEnUnCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/que-poner-en-un-curriculum"
      title="Que poner en un curriculum para que se vea profesional y util"
      description="Guia clara sobre que poner en un curriculum vitae para que se vea profesional, completo y util para buscar trabajo."
      intro="Saber que poner en un curriculum es una de las dudas mas comunes al buscar trabajo. La clave no es llenar espacio, sino elegir la informacion correcta y presentarla con orden."
      sections={[
        {
          title: "Las secciones basicas que casi siempre necesitas",
          paragraphs: [
            "En general conviene incluir datos de contacto, perfil profesional, experiencia, estudios, habilidades e idiomas si aportan valor. En perfiles iniciales tambien pueden pesar proyectos, cursos o voluntariados.",
            "Lo importante es que el lector entienda rapido quien eres, a que apuntas y que sabes hacer.",
          ],
        },
        {
          title: "Que informacion suele sobrar o restar",
          paragraphs: [
            "No todo dato personal suma. Muchas veces agregar informacion irrelevante hace que el CV pierda foco o se vea anticuado.",
            "Tambien conviene evitar frases genericas o listas interminables de habilidades sin contexto.",
          ],
        },
        {
          title: "Como priorizar segun tu etapa profesional",
          paragraphs: [
            "Si tienes experiencia, esa seccion suele ser el centro del CV. Si estas empezando, entonces estudios, proyectos y habilidades pueden ocupar un lugar mas fuerte.",
            "La estructura ideal cambia segun tu perfil, pero siempre debe responder a una logica clara.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Debo poner todos mis trabajos?",
          answer:
            "No siempre. Conviene priorizar lo mas relevante para el puesto o etapa que quieres mostrar.",
        },
        {
          question: "Puedo incluir cursos cortos?",
          answer:
            "Si, cuando ayuden a reforzar tu perfil o el tipo de trabajo que buscas.",
        },
        {
          question: "Es obligatorio incluir un perfil profesional?",
          answer:
            "No es obligatorio, pero suele ayudar mucho a dar contexto y orientar la lectura del CV.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description: "Profundiza una de las secciones mas consultadas.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Prioriza mejor contenido si estas empezando.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Aplica esta estructura dentro de un flujo guiado.",
        },
      ]}
    />
  );
}
