import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Qué Poner en un Currículum: Secciones y Contenido",
  description:
    "Guía clara sobre qué poner en un currículum vitae para que se vea profesional, completo y útil para buscar trabajo.",
  path: "/blog/que-poner-en-un-curriculum",
  keywords: [
    "que poner en un currículum",
    "que lleva un currículum vitae",
    "que incluir en un cv",
    "contenido currículum vitae",
  ],
  type: "article",
});

export default function QuePonerEnUnCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/que-poner-en-un-curriculum"
      datePublished="2025-04-12"
      title="Qué poner en un currículum para que se vea profesional y útil"
      description="Guía clara sobre que poner en un currículum vitae para que se vea profesional, completo y útil para buscar trabajo."
      intro="Saber que poner en un currículum es una de las dudas más comunes al buscar trabajo. La clave no es llenar espacio, sino elegir la información correcta y presentarla con orden."
      sections={[
        {
          title: "Las secciones básicas que casi siempre necesitas",
          paragraphs: [
            "En general conviene incluir datos de contacto, perfil profesional, experiencia, estudios, habilidades e idiomas si aportan valor. En perfiles iniciales también pueden pesar proyectos, cursos o voluntariados.",
            "Lo importante es que el lector entienda rápido quien eres, a que apuntas y que sabes hacer.",
          ],
        },
        {
          title: "Qué información suele sobrar o restar",
          paragraphs: [
            "No todo dato personal suma. Muchas veces agregar información irrelevante hace que el CV pierda foco o se vea anticuado.",
            "También conviene evitar frases genéricas o listas interminables de habilidades sin contexto.",
          ],
        },
        {
          title: "Cómo priorizar según tu etapa profesional",
          paragraphs: [
            "Si tienes experiencia, esa sección suele ser el centro del CV. Si estas empezando, entonces estudios, proyectos y habilidades pueden ocupar un lugar más fuerte.",
            "La estructura ideal cambia según tu perfil, pero siempre debe responder a una logica clara.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Debo poner todos mis trabajos?",
          answer:
            "No siempre. Conviene priorizar lo más relevante para el puesto o etapa que quieres mostrar.",
        },
        {
          question: "¿Puedo incluir cursos cortos?",
          answer:
            "Sí, cuando ayuden a reforzar tu perfil o el tipo de trabajo que buscas.",
        },
        {
          question: "¿Es obligatorio incluir un perfil profesional?",
          answer:
            "No es obligatorio, pero suele ayudar mucho a dar contexto y orientar la lectura del CV.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description: "Profundiza una de las secciones más consultadas.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Prioriza mejor contenido si estas empezando.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Aplica esta estructura dentro de un flujo guiado.",
        },
      ]}
    />
  );
}
