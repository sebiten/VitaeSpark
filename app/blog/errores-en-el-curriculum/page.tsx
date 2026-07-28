import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Errores en el Currículum: 5 Fallos que Debes Evitar",
  description:
    "Descubre cinco errores comunes en un currículum y cómo corregirlos para mejorar tus postulaciones y entrevistas.",
  path: "/blog/errores-en-el-curriculum",
  keywords: [
    "errores en el curriculum",
    "errores curriculum vitae",
    "errores en un cv",
    "fallos curriculum",
  ],
  type: "article",
  image: "/social/errores-cv-facebook-og.png",
  imageAlt: "Cinco errores que pueden hacer que descarten tu CV",
  socialTitle: "5 errores que pueden hacer que descarten tu CV",
  socialDescription:
    "Revisá diseño, perfil, experiencia, datos y adaptación antes de tu próxima postulación.",
});

export default function ErroresEnElCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/errores-en-el-curriculum"
      datePublished="2025-04-12"
      dateModified="2026-07-28"
      title="5 errores en el curriculum que pueden frenarte antes de una entrevista"
      description="Descubre los errores mas comunes en un curriculum vitae y como corregirlos antes de tu proxima postulacion."
      intro="Muchos CV no fallan por falta de experiencia, sino porque el documento comunica mal. Los errores ortográficos, el desorden y las frases genéricas dificultan que un reclutador entienda rápido el perfil, incluso cuando la persona encaja en el puesto."
      image="/social/errores-cv-facebook-og.png"
      sections={[
        {
          title: "Usar un diseño demasiado cargado",
          paragraphs: [
            "Demasiados colores, gráficos, columnas o adornos compiten con la información importante. El reclutador necesita identificar rápido tu perfil, experiencia, estudios y habilidades.",
            "También conviene evitar estructuras complejas que puedan dificultar la lectura de los sistemas ATS. Priorizá una jerarquía clara, tipografía legible y secciones fáciles de recorrer.",
          ],
        },
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
          title: "Dejar errores o datos desactualizados",
          paragraphs: [
            "Una falta de ortografía, un teléfono incorrecto o un enlace que ya no funciona pueden generar una mala primera impresión y dificultar que la empresa se comunique con vos.",
            "Antes de enviar el archivo, comprobá los datos de contacto, las fechas, los nombres de empresas y la redacción. Una revisión breve puede evitar errores simples pero costosos.",
          ],
        },
        {
          title: "Enviar el mismo CV a todas las ofertas",
          paragraphs: [
            "Cada búsqueda laboral prioriza responsabilidades, herramientas y palabras clave diferentes. Un CV completamente genérico puede ocultar la experiencia que mejor responde a la vacante.",
            "No hace falta rehacer todo desde cero. Ajustá el perfil profesional, el orden de las habilidades y los logros destacados para que la relación con el puesto sea evidente.",
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
      sources={[
        {
          href: "https://europass.europa.eu/es/create-europass-cv",
          title: "Crear tu CV Europass",
          organization: "Unión Europea",
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
          href: "/",
          title: "Crear CV online",
          description: "Pasa de teoria a una version mejor estructurada.",
        },
      ]}
    />
  );
}
