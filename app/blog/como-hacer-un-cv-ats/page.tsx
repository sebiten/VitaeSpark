import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un CV ATS que Pase Filtros Automáticos",
  description:
    "Consejos prácticos para crear un CV ATS con buena estructura, mejor uso de palabras clave y contenido orientado a procesos de selección actuales.",
  path: "/blog/como-hacer-un-cv-ats",
  keywords: [
    "como hacer un cv ats",
    "cv ats",
    "curriculum ats",
    "pasar filtros ats",
  ],
  type: "article",
});

export default function ComoHacerUnCvAtsPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-cv-ats"
      datePublished="2025-04-12"
      title="Como hacer un CV ATS que tenga mas posibilidades de pasar filtros"
      description="Consejos practicos para crear un CV ATS con buena estructura, mejor uso de palabras clave y contenido orientado a procesos de seleccion actuales."
      intro="Un CV ATS no se trata de engañar al sistema, sino de facilitar que tu perfil sea interpretado correctamente. Según Jobscan (2023), el 75% de los currículums nunca llega a ser visto por un reclutador porque los sistemas ATS los descartan primero. La mejor forma de evitarlo es combinar estructura simple, contenido relevante y una redacción alineada al puesto que buscás."
      sections={[
        {
          title: "Usa secciones claras y faciles de leer",
          paragraphs: [
            "Titulos como perfil, experiencia, formacion y habilidades ayudan a que tanto sistemas como personas ubiquen rapido la informacion. Cuanto mas claro sea el orden, mejor se procesa tu CV.",
            "Evita elementos innecesarios que rompan la lectura del documento. La prioridad es que la informacion principal sea entendible en pocos segundos.",
          ],
        },
        {
          title: "Alinea el lenguaje con el puesto objetivo",
          paragraphs: [
            "Si una vacante habla de gestion de clientes, soporte tecnico, analisis de datos o coordinacion de proyectos, intenta reflejar ese lenguaje cuando sea real para tu experiencia. Esa coincidencia ayuda a contextualizar mejor tu perfil.",
            "No hace falta repetir palabras clave sin sentido. Lo importante es que tu experiencia real este descrita con terminos utiles para el mercado laboral.",
          ],
        },
        {
          title: "Evita perfiles genericos",
          paragraphs: [
            "Uno de los errores mas comunes es abrir el CV con una descripcion demasiado amplia y vacia. Un resumen profesional corto, concreto y orientado al rol suele funcionar mejor.",
            "Tambien ayuda que cada experiencia explique que hacias, con que herramientas y en que contexto. Eso le da mas valor al documento frente a procesos automatizados y humanos.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Los ATS leen PDFs?",
          answer:
            "En muchos casos si, pero depende del sistema. Lo importante es que el PDF sea limpio, con texto real y estructura clara.",
        },
        {
          question: "Conviene repetir exactamente palabras de la vacante?",
          answer:
            "Conviene usar lenguaje alineado cuando describe tu experiencia real, no copiar sin criterio.",
        },
        {
          question: "Un CV ATS tiene que verse aburrido?",
          answer:
            "No. Debe ser claro y profesional. La legibilidad es mas importante que los adornos.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-ats",
          title: "Landing CV ATS",
          description:
            "Ve una pagina enfocada por completo en este tipo de curriculum.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description:
            "Usa IA para mejorar la redaccion sin perder claridad.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Pasa de teoria a accion con un flujo guiado y descargable.",
        },
      ]}
    />
  );
}
