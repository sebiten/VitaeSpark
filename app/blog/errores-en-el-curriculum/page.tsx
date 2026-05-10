import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Errores en el Currículum: Los Más Comunes y Cómo Evitarlos",
  description:
    "Descubre los errores más comunes en un currículum vitae y cómo corregirlos para mejorar tus postulaciones.",
  path: "/blog/errores-en-el-curriculum",
  keywords: [
    "errores en el curriculum",
    "errores curriculum vitae",
    "errores en un cv",
    "fallos curriculum",
  ],
  type: "article",
});

export default function ErroresEnElCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/errores-en-el-curriculum"
      datePublished="2025-04-12"
      title="Errores en el curriculum que pueden frenarte antes de una entrevista"
      description="Descubre los errores mas comunes en un curriculum vitae y como corregirlos para mejorar tus postulaciones."
      intro="Muchos CVs no fallan porque la persona no tenga perfil, sino porque el documento comunica mal. Según encuestas de CareerBuilder, un CV con errores ortográficos reduce un 59% las posibilidades de conseguir una entrevista. Un currículum desordenado, genérico o poco claro puede hacerte perder oportunidades incluso si encajás en el puesto."
      sections={[
        {
          title: "Tener un perfil demasiado generico",
          paragraphs: [
            "Uno de los errores mas repetidos es abrir el CV con frases amplias que podrian pertenecer a cualquier candidato. Si no queda claro a que rol apuntas o que valor aportas, el perfil pierde fuerza desde el inicio.",
            "Conviene escribir un resumen mas concreto, con foco en experiencia, herramientas o tipo de puesto buscado.",
          ],
        },
        {
          title: "Listar tareas sin contexto ni impacto",
          paragraphs: [
            "Cuando la experiencia se resume solo con tareas, el CV se vuelve plano. Mejora mucho cuando explicas en que entorno trabajabas, con que herramientas y que tipo de resultados o responsabilidades tenias.",
            "No necesitas inflar cifras. Lo importante es dar contexto para que el lector entienda tu aporte real.",
          ],
        },
        {
          title: "Descuidar formato y legibilidad",
          paragraphs: [
            "Otro error frecuente es usar estructuras confusas, exceso de bloques o textos muy comprimidos. Eso dificulta la lectura y hace que el CV se vea menos profesional.",
            "Un formato claro, con buena jerarquia y secciones bien ordenadas, casi siempre funciona mejor.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Un error de ortografia puede afectar mucho?",
          answer:
            "Si. Puede transmitir falta de cuidado y bajar bastante la percepcion profesional del CV.",
        },
        {
          question: "Conviene rehacer todo el CV o corregir lo principal?",
          answer:
            "Depende del caso, pero muchas veces ajustar estructura, perfil y experiencia ya mejora mucho el resultado.",
        },
        {
          question: "Esto tambien aplica a CVs ATS?",
          answer:
            "Si. De hecho, varios de estos errores afectan tanto a filtros automatizados como a reclutadores.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description: "Vuelve a la base para reconstruir mejor tu CV.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Evita errores que tambien perjudican lectura automatizada.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Pasa de teoria a una version mejor estructurada.",
        },
      ]}
    />
  );
}
