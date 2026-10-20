import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un CV para Programador",
  description:
    "Guía para hacer un CV para programador destacando stack, proyectos, experiencia y criterio técnico.",
  path: "/blog/como-hacer-un-cv-para-programador",
  keywords: [
    "como hacer un cv para programador",
    "cv para programador",
    "currículum programador",
    "cv desarrollador",
  ],
  type: "article",
});

export default function ComoHacerUnCvParaProgramadorPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-cv-para-programador"
      datePublished="2025-04-12"
      title="Cómo hacer un CV para programador sin caer en listas vacías de tecnologia"
      description="Guía para hacer un CV para programador destacando stack, proyectos, experiencia y criterio técnico."
      intro="Un CV para programador mejora mucho cuando deja de ser una lista de tecnologias y pasa a explicar que construiste, con que herramientas y en que contexto trabajaste."
      sections={[
        {
          title: "Muestra stack, pero con contexto",
          paragraphs: [
            "No alcanza con decir que sabes React, Node o Python. Lo importante es que el CV muestre donde los aplicaste, que tipo de producto construiste y cual era tu rol.",
            "Ese contexto hace que el perfil se vea mucho más solido y creíble.",
          ],
        },
        {
          title: "Haz que los proyectos sirvan a tu perfil",
          paragraphs: [
            "Los proyectos son muy útiles, sobre todo en perfiles junior o en cambios de rol. Pero suman más cuando explican problema, solucion, stack y responsabilidad.",
            "Un proyecto bien contado puede pesar mucho más que una simple lista de repositorios.",
          ],
        },
        {
          title: "Evita inflar el CV técnico",
          paragraphs: [
            "En tecnologia se nota rápido cuando un perfil intenta mostrar más de lo que realmente domina. Conviene priorizar herramientas y experiencias reales antes que una lista gigantesca.",
            "La claridad y el criterio suelen generar más confianza que el exceso.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Conviene poner GitHub o portfolio?",
          answer:
            "Si aporta contexto real sobre proyectos o trabajo técnico, suele sumar bastante.",
        },
        {
          question: "¿Sirve para programadores junior?",
          answer:
            "Sí. En juniors, proyectos, stack y claridad del perfil son especialmente importantes.",
        },
        {
          question: "¿Debo separar tecnologias por categorias?",
          answer:
            "Muchas veces ayuda, siempre que no complique la lectura ni duplique información.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-programadores",
          title: "CV para programadores",
          description: "Landing orientada a conversion para este mismo perfil.",
        },
        {
          href: "/blog/como-adaptar-tu-cv-a-una-vacante",
          title: "Cómo adaptar tu CV a una vacante",
          description: "Muy útil para roles técnicos con distintos stacks y focos.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para explicar mejor experiencia técnica y proyectos.",
        },
      ]}
    />
  );
}
