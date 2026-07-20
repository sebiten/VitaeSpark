import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como Hacer un Curriculum: Guia Paso a Paso y Ejemplo",
  description:
    "Aprende como hacer un curriculum desde cero con estructura, checklist, ejemplo de perfil, errores comunes y consejos para postularte mejor.",
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
      dateModified="2026-05-13"
      title="Como hacer un curriculum paso a paso y con ejemplo"
      description="Guia practica para hacer un curriculum vitae desde cero, con estructura, checklist, ejemplo de perfil y errores comunes que conviene evitar."
      intro="Si estas buscando trabajo, aprender como hacer un curriculum bien armado puede ahorrarte semanas de postulaciones mal enfocadas. Un CV no solo resume tu experiencia: tambien comunica que tipo de perfil eres, que valor aportas y que tan facil es entender tu propuesta profesional."
      sections={[
        {
          title: "Empieza por definir el puesto que buscas",
          paragraphs: [
            "Antes de escribir, conviene tener claro a que roles vas a postularte. Un curriculum para soporte tecnico no deberia decir exactamente lo mismo que uno para ventas, administracion o marketing.",
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
          title: "Checklist para revisar antes de enviar",
          paragraphs: [
            "Revisa que el CV tenga contacto actualizado, puesto objetivo claro, fechas consistentes, experiencia ordenada de mas reciente a mas antigua, habilidades relevantes y un archivo con nombre profesional.",
            "Tambien conviene comprobar que no haya bloques enormes de texto, errores de ortografia, datos irrelevantes o frases demasiado generales como 'soy responsable' sin contexto.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para curriculum",
          paragraphs: [
            "Un ejemplo simple para perfil administrativo puede ser: 'Perfil orientado a tareas administrativas y atencion al cliente, con experiencia en carga de datos, organizacion de documentacion, manejo de planillas y seguimiento de solicitudes internas'.",
            "Si apuntas a otro rubro, cambia el contexto: ventas, reposicion, limpieza, soporte, call center o recepcion. El perfil debe explicar rapido donde encaja tu experiencia.",
          ],
        },
        {
          title: "Escribe experiencia con foco en impacto",
          paragraphs: [
            "No basta con listar tareas. Lo que mas suma es explicar responsabilidades, herramientas utilizadas y resultados. Incluso si no tienes cifras exactas, puedes mostrar contexto, tipo de trabajo realizado y como aportabas en cada experiencia.",
            "Cuando describes mejor tu experiencia, el CV deja de verse como una lista generica y empieza a funcionar como una presentacion profesional mas convincente.",
          ],
        },
        {
          title: "Errores comunes al hacer un curriculum",
          paragraphs: [
            "Uno de los errores mas frecuentes es usar el mismo CV para todo. Si el puesto pide atencion al cliente, administracion o produccion, el perfil y las habilidades deberian reflejar esa busqueda.",
            "Otro error comun es priorizar diseño sobre claridad. Un CV puede verse moderno, pero si no se entiende rapido que hiciste, que sabes hacer y como contactarte, pierde fuerza.",
          ],
        },
        {
          title: "Cierra con una version lista para enviar",
          paragraphs: [
            "Antes de postularte, revisa errores, unifica tono, confirma fechas y adapta palabras clave al puesto objetivo. Ese ultimo ajuste puede mejorar mucho la calidad final.",
            "Si quieres acelerar ese proceso, VitaeSpark puede ayudarte a pasar de informacion suelta a un curriculum mejor redactado, visualmente ordenado y listo para descargar en PDF.",
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
        {
          question: "Como hago un curriculum si no tengo experiencia?",
          answer:
            "Puedes reforzar estudios, cursos, proyectos, habilidades, voluntariado, practicas o experiencias informales relacionadas con el puesto objetivo.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Creador de CV online",
          description:
            "Crea tu curriculum con IA, plantillas profesionales y descarga en PDF.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Aplica estos consejos dentro de un flujo guiado y listo para exportar.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "Curriculum sin experiencia",
          description:
            "Guia especifica si estas armando tu primer CV laboral.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV para administrativo",
          description:
            "Mira una estructura concreta para puestos administrativos y de oficina.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description:
            "Complementa esta guia con claves para filtros automaticos.",
        },
      ]}
    />
  );
}
