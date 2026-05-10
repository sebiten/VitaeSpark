import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Habilidades para tu Currículum: Cómo Elegirlas Bien",
  description:
    "Aprende cómo elegir habilidades para tu currículum según el puesto, evitando listas genéricas y reforzando tu perfil con información más útil.",
  path: "/blog/habilidades-para-curriculum",
  keywords: [
    "habilidades para curriculum",
    "que habilidades poner en un curriculum",
    "habilidades para cv",
    "curriculum habilidades",
  ],
  type: "article",
});

export default function HabilidadesParaCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/habilidades-para-curriculum"
      datePublished="2025-04-12"
      title="Habilidades para curriculum: como elegir las que si suman"
      description="Aprende como elegir habilidades para tu curriculum segun el puesto, evitando listas genericas y reforzando tu perfil con informacion mas util."
      intro="La seccion de habilidades suele parecer facil, pero muchas veces termina llena de frases demasiado amplias o poco utiles. Elegir bien que habilidades poner en un curriculum puede ayudarte a alinear mejor tu perfil con la busqueda laboral y a mostrar de forma rapida que sabes hacer."
      sections={[
        {
          title: "Prioriza habilidades relevantes para el puesto",
          paragraphs: [
            "No todas las habilidades que tienes deben entrar en el CV. Conviene priorizar las que aporten mas para el tipo de trabajo que buscas. Si apuntas a un rol administrativo, por ejemplo, probablemente importe mas organizacion, manejo de herramientas de oficina y atencion al detalle que otras capacidades mas generales.",
            "La seleccion siempre tiene que responder a una pregunta simple: esto ayuda a que entiendan mejor por que encajo en el puesto?",
          ],
        },
        {
          title: "Combina tecnicas y blandas",
          paragraphs: [
            "Las habilidades tecnicas muestran herramientas, conocimientos o procesos concretos. Las habilidades blandas ayudan a completar el perfil, pero deben usarse con criterio. Frases como 'responsable' o 'proactivo' suelen quedar vacias si no estan respaldadas por experiencia o contexto.",
            "En general conviene que la parte tecnica tenga bastante peso y que las habilidades blandas aparezcan solo cuando realmente aportan valor al tipo de rol.",
          ],
        },
        {
          title: "Haz que la seccion tenga coherencia con el resto del CV",
          paragraphs: [
            "Si en habilidades dices que manejas cierta herramienta o conocimiento, lo ideal es que esa capacidad tambien aparezca reflejada en experiencia, proyectos o estudios. Eso hace que el CV resulte mas creible y consistente.",
            "La seccion de habilidades no debe vivir aislada. Funciona mejor cuando resume y refuerza lo que ya viene mostrando el resto del documento.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuantas habilidades conviene poner?",
          answer:
            "Las necesarias para mostrar ajuste con el puesto sin convertir la seccion en una lista interminable. La calidad pesa mas que la cantidad.",
        },
        {
          question: "Puedo poner habilidades blandas?",
          answer:
            "Si, pero con moderacion y de forma coherente con el resto del CV y el tipo de rol que buscas.",
        },
        {
          question: "Sirve esta seccion si no tengo experiencia?",
          answer:
            "Si. En perfiles iniciales puede ser una seccion clave, sobre todo si va acompanada de cursos, proyectos o estudios.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Usa las habilidades para compensar falta de historial laboral.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description:
            "Entiende donde encaja esta seccion dentro del CV completo.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description:
            "Mejora la forma de presentar tus habilidades con redaccion asistida.",
        },
      ]}
    />
  );
}
