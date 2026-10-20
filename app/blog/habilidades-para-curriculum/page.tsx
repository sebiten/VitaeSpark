import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Habilidades para Currículum: Ejemplos y Que Poner",
  description:
    "Aprende que habilidades poner en un currículum con ejemplos por puesto, habilidades técnicas, blandas y consejos para evitar listas genéricas.",
  path: "/blog/habilidades-para-curriculum",
  keywords: [
    "habilidades para currículum",
    "que habilidades poner en un currículum",
    "habilidades para cv",
    "currículum habilidades",
  ],
  type: "article",
});

export default function HabilidadesParaCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/habilidades-para-curriculum"
      datePublished="2025-04-12"
      dateModified="2026-08-09"
      title="Habilidades para currículum: ejemplos y que poner en tu CV"
      description="Aprende que habilidades poner en un currículum según el puesto, con ejemplos concretos para evitar listas genéricas y reforzar tu perfil."
      intro="La sección de habilidades suele parecer fácil, pero muchas veces termina llena de frases demasiado amplias o poco útiles. Elegir bien que habilidades poner en un currículum puede ayudarte a alinear mejor tu perfil con la búsqueda laboral y a mostrar de forma rápida que sabes hacer."
      sections={[
        {
          title: "Qué habilidades poner en un currículum según el puesto",
          paragraphs: [
            "No todas las habilidades que tienes deben entrar en el CV. Conviene priorizar las que aporten más para el tipo de trabajo que buscas. Si apuntas a un rol administrativo, por ejemplo, probablemente importe más Excel, organización, carga de datos, herramientas de oficina y atención al detalle que otras capacidades más generales.",
            "La selección siempre tiene que responder a una pregunta simple: esto ayuda a que entiendan mejor por que encajo en el puesto?",
          ],
        },
        {
          title: "Ejemplos de habilidades para currículum",
          paragraphs: [
            "Para administrativo pueden sumar Excel, carga de datos, reportes, documentación y correo. Para atención al cliente: comunicación clara, CRM, resolución de consultas y seguimiento. Para operario: herramientas, seguridad, carga y descarga, control de calidad y trabajo por turnos.",
            "Estos ejemplos funcionan mejor que una lista universal porque conectan las habilidades con tareas reales y permiten entender en que contexto las aplicaste.",
          ],
        },
        {
          title: "Cómo sacar habilidades de una oferta de trabajo",
          paragraphs: [
            "Lee la vacante y separa tres tipos de información: tareas que vas a realizar, herramientas que piden y condiciones del puesto. Si la oferta menciona preparar reportes, usar Excel y atender proveedores, esas son señales más útiles que copiar adjetivos como dinamico o proactivo.",
            "Elige solo habilidades que realmente puedas sostener con estudios, proyectos o experiencia. No necesitas coincidir con toda la oferta: alcanza con priorizar las capacidades más relevantes y explicar donde las aplicaste.",
          ],
        },
        {
          title: "Combina habilidades técnicas y blandas",
          paragraphs: [
            "Las habilidades técnicas muestran herramientas, conocimientos o procesos concretos. Las habilidades blandas ayudan a completar el perfil, pero deben usarse con criterio. Frases como 'responsable' o 'proactivo' suelen quedar vacías si no estan respaldadas por experiencia o contexto.",
            "En general conviene que la parte técnica tenga bastante peso y que las habilidades blandas aparezcan solo cuando realmente aportan valor al tipo de rol.",
          ],
        },
        {
          title: "Dónde poner las habilidades dentro del CV",
          paragraphs: [
            "Puedes usar una sección breve de habilidades para facilitar la lectura, pero las más importantes también deberían aparecer dentro del perfil o la experiencia. Por ejemplo, Excel aporta más cuando explicas que lo usabas para actualizar stock, preparar reportes o controlar pagos.",
            "Ordena primero las habilidades técnicas y específicas del puesto. Después agrega dos o tres habilidades blandas que puedas respaldar con situaciones reales, como coordinación de tareas, atención de reclamos o cumplimiento de procedimientos.",
          ],
        },
        {
          title: "Haz que la sección tenga coherencia con el resto del CV",
          paragraphs: [
            "Si en habilidades dices que manejas cierta herramienta o conocimiento, lo ideal es que esa capacidad también aparezca reflejada en experiencia, proyectos o estudios. Eso hace que el CV resulte más creíble y consistente.",
            "La sección de habilidades no debe vivir aislada. Funciona mejor cuando resume y refuerza lo que ya viene mostrando el resto del documento.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Cuantas habilidades conviene poner?",
          answer:
            "Las necesarias para mostrar ajuste con el puesto sin convertir la sección en una lista interminable. La calidad pesa más que la cantidad.",
        },
        {
          question: "¿Qué habilidades poner en un currículum administrativo?",
          answer:
            "Excel, carga de datos, organización, documentación, reportes, correo, atención telefónica, agenda, planillas y sistemas de gestión si los usaste.",
        },
        {
          question: "¿Qué habilidades poner en un CV sin experiencia?",
          answer:
            "Herramientas digitales, comunicación, organización, aprendizaje rápido, responsabilidad, estudios, cursos, proyectos y habilidades vinculadas al puesto objetivo.",
        },
        {
          question: "¿Puedo poner habilidades blandas?",
          answer:
            "Sí, pero con moderacion y de forma coherente con el resto del CV y el tipo de rol que buscas.",
        },
        {
          question: "¿Cómo adapto las habilidades a una vacante?",
          answer:
            "Identifica tareas, herramientas y requisitos del aviso. Prioriza las habilidades que realmente tienes y muestra en experiencia, estudios o proyectos donde las aplicaste.",
        },
        {
          question: "¿Sirve esta sección si no tengo experiencia?",
          answer:
            "Sí. En perfiles iniciales puede ser una sección clave, sobre todo si va acompanada de cursos, proyectos o estudios.",
        },
      ]}
      relatedLinks={[
        {
          href: "/herramientas/generador-habilidades-cv",
          title: "Generador gratuito de habilidades",
          description:
            "Crea una lista por puesto y pasa la selección a tu CV.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Usa las habilidades para compensar falta de historial laboral.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description:
            "Ejemplo claro de habilidades de oficina, Excel y documentación.",
        },
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description:
            "Ejemplo de habilidades prácticas para fabrica, deposito y producción.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum",
          description:
            "Entiende donde encaja esta sección dentro del CV completo.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description:
            "Mejora la forma de presentar tus habilidades con redacción asistida.",
        },
      ]}
    />
  );
}
