import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un Currículum Paso a Paso",
  description:
    "Guía práctica para hacer un currículum vitae desde cero, con estructura, secciones recomendadas y consejos para mejorar tus postulaciones.",
  path: "/blog/como-hacer-un-curriculum",
  keywords: [
    "como hacer un curriculum",
    "hacer curriculum vitae",
    "como hacer un cv",
    "estructura curriculum",
  ],
  type: "article",
});

export default function ComoHacerUnCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-curriculum"
      datePublished="2025-04-12"
      title="Como hacer un curriculum paso a paso y sin perder tiempo"
      description="Guia practica para hacer un curriculum vitae desde cero, con estructura, secciones recomendadas y consejos para mejorar tus postulaciones."
      intro="Si estas buscando trabajo, aprender como hacer un curriculum bien armado puede ahorrarte semanas de postulaciones mal enfocadas. Un CV no solo resume tu experiencia: tambien comunica que tipo de perfil eres, que valor aportas y que tan facil es entender tu propuesta profesional."
      sections={[
        {
          title: "Empieza por definir el puesto que buscas",
          paragraphs: [
            "Antes de escribir, conviene tener claro a que roles vas a postularte. Un curriculum para soporte tecnico no deberia decir exactamente lo mismo que uno para ventas, administracion o marketing. Cuanto mas claro sea el objetivo, mejor podras seleccionar informacion relevante.",
            "Esto tambien te ayuda a decidir que habilidades priorizar, que experiencias resumir con mas detalle y que tipo de lenguaje usar. Un CV orientado siempre funciona mejor que uno demasiado amplio.",
          ],
        },
        {
          title: "Organiza las secciones basicas",
          paragraphs: [
            "En la mayoria de los casos necesitas datos de contacto, perfil profesional, experiencia, formacion, habilidades e idiomas si aportan valor. Si no tienes experiencia laboral fuerte, puedes reforzar proyectos, cursos o practicas.",
            "El orden debe facilitar la lectura. Reclutadores y ATS valoran una estructura clara, con titulos evidentes y contenido facil de escanear.",
          ],
        },
        {
          title: "Escribe experiencia con foco en impacto",
          paragraphs: [
            "No basta con listar tareas. Lo que mas suma es explicar responsabilidades, herramientas utilizadas y resultados. Incluso si no tienes cifras exactas, puedes mostrar contexto, tipo de trabajo realizado y como aportabas en cada experiencia.",
            "Cuando describes mejor tu experiencia, el CV deja de verse como una lista generica y empieza a funcionar como una presentacion profesional mas convincente. Esto se nota mucho en roles de atencion al cliente, donde frases vagas suelen esconder experiencia valiosa.",
          ],
        },
        {
          title: "Cierra con una version lista para enviar",
          paragraphs: [
            "Antes de postularte, revisa errores, unifica tono, confirma fechas y adapta palabras clave al puesto objetivo. Ese ultimo ajuste puede mejorar mucho la calidad final.",
            "Si quieres acelerar ese proceso, una herramienta como VitaeSpark puede ayudarte a pasar de informacion suelta a un curriculum mejor redactado y visualmente ordenado.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuanto debe medir un curriculum?",
          answer:
            "En la mayoria de los casos, una o dos paginas alcanzan. Lo importante es que cada seccion aporte valor y sea facil de leer.",
        },
        {
          question: "Necesito foto en el CV?",
          answer:
            "Depende del mercado y del tipo de puesto. En muchos casos no es obligatoria; la prioridad sigue siendo el contenido.",
        },
        {
          question: "Conviene adaptar el CV a cada oferta?",
          answer:
            "Si. Ajustar perfil, palabras clave y experiencias destacadas suele mejorar el rendimiento del CV.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description:
            "Mira un ejemplo concreto para customer service, soporte o recepcion.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Aplica estos consejos dentro de un flujo guiado y listo para exportar.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description:
            "Complementa esta guia con claves para filtros automaticos.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description:
            "Refuerza una de las secciones mas consultadas por reclutadores.",
        },
      ]}
    />
  );
}
