import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como Hacer un CV para Programador",
  description:
    "Guia para hacer un CV para programador destacando stack, proyectos, experiencia y criterio tecnico.",
  path: "/blog/como-hacer-un-cv-para-programador",
  keywords: [
    "como hacer un cv para programador",
    "cv para programador",
    "curriculum programador",
    "cv desarrollador",
  ],
  type: "article",
});

export default function ComoHacerUnCvParaProgramadorPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-cv-para-programador"
      datePublished="2025-04-12"
      title="Como hacer un CV para programador sin caer en listas vacias de tecnologia"
      description="Guia para hacer un CV para programador destacando stack, proyectos, experiencia y criterio tecnico."
      intro="Un CV para programador mejora mucho cuando deja de ser una lista de tecnologias y pasa a explicar que construiste, con que herramientas y en que contexto trabajaste."
      sections={[
        {
          title: "Muestra stack, pero con contexto",
          paragraphs: [
            "No alcanza con decir que sabes React, Node o Python. Lo importante es que el CV muestre donde los aplicaste, que tipo de producto construiste y cual era tu rol.",
            "Ese contexto hace que el perfil se vea mucho mas solido y creible.",
          ],
        },
        {
          title: "Haz que los proyectos sirvan a tu perfil",
          paragraphs: [
            "Los proyectos son muy utiles, sobre todo en perfiles junior o en cambios de rol. Pero suman mas cuando explican problema, solucion, stack y responsabilidad.",
            "Un proyecto bien contado puede pesar mucho mas que una simple lista de repositorios.",
          ],
        },
        {
          title: "Evita inflar el CV tecnico",
          paragraphs: [
            "En tecnologia se nota rapido cuando un perfil intenta mostrar mas de lo que realmente domina. Conviene priorizar herramientas y experiencias reales antes que una lista gigantesca.",
            "La claridad y el criterio suelen generar mas confianza que el exceso.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene poner GitHub o portfolio?",
          answer:
            "Si aporta contexto real sobre proyectos o trabajo tecnico, suele sumar bastante.",
        },
        {
          question: "Sirve para programadores junior?",
          answer:
            "Si. En juniors, proyectos, stack y claridad del perfil son especialmente importantes.",
        },
        {
          question: "Debo separar tecnologias por categorias?",
          answer:
            "Muchas veces ayuda, siempre que no complique la lectura ni duplique informacion.",
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
          title: "Como adaptar tu CV a una vacante",
          description: "Muy util para roles tecnicos con distintos stacks y focos.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para explicar mejor experiencia tecnica y proyectos.",
        },
      ]}
    />
  );
}
