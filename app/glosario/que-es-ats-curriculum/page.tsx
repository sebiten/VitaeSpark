import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Qué es ATS en un Currículum y Cómo Adaptar tu CV al Sistema",
  description:
    "Entendé qué es un sistema ATS (Applicant Tracking System), cómo funciona, cómo puntúa tu CV y las mejores estrategias para que tu currículum pase filtros automáticos.",
  path: "/glosario/que-es-ats-curriculum",
  keywords: [
    "que es ats curriculum",
    "sistema ats currículum",
    "como funciona ats",
    "cv ats como hacerlo",
    "filtrar cv ats",
  ],
});

export default function QueEsAtsCurriculumPage() {
  return (
    <BlogArticlePage
      path="/glosario/que-es-ats-curriculum"
      title="Qué es ATS en un Currículum y Cómo Adaptar tu CV al Sistema"
      description="Más del 75% de los currículums son descartados por sistemas automáticos antes de ser vistos por una persona. Conocé qué es un ATS, cómo funciona y cómo hacer que tu CV pase la primera barrera."
      intro="Un sistema ATS (Applicant Tracking System o Sistema de Seguimiento de Candidatos) es el software que las empresas usan para filtrar, clasificar y evaluar currículums antes de que un reclutador humano los vea. Si tu CV no está preparado para ser leído por estos sistemas, puede ser descartado automáticamente aunque seas el candidato perfecto para el puesto. Esta guía explica cómo funcionan, cómo evalúan tu perfil y qué podés hacer para que tu currículum llegue a la siguiente etapa."
      sections={[
        {
          title: "Qué es un sistema ATS y por qué importa",
          paragraphs: [
            "Un Applicant Tracking System (ATS) es un software de reclutamiento que gestiona el proceso de selección de candidatos. Las empresas lo usan para recibir cv, escanearlos, extraer información clave y compararla con los requisitos del puesto.",
            "Según datos de Jobscan, el 98% de las empresas Fortune 500 utilizan sistemas ATS en sus procesos de selección. Además, aproximadamente el 75% de los currículums son descartados antes de que un reclutador humano los vea, según TopResume. Esto significa que la diferencia entre que tu CV llegue o no a una persona puede depender de qué tan bien esté preparado para estos sistemas.",
            "El objetivo del ATS no es исключить buenos candidatos, sino reducir el volumen de aplicaciones a un grupo manejable. Por eso, entender cómo funciona es clave para cualquier persona que busque empleo de forma seria.",
          ],
        },
        {
          title: "Cómo funciona el análisis de CV en un ATS",
          paragraphs: [
            "Cuando enviás tu CV a una oferta, el ATS lo recibe y comienza el análisis. El sistema extrae información de cada sección: datos de contacto, experiencia laboral, educación, habilidades y otros datos estructurados.",
            "Luego, compara esa información con las palabras clave y requisitos del puesto. Si tu CV tiene suficientes coincidencias con lo que la empresa busca, obtiene un puntaje alto y avanza. Si no, puede ser descartado automáticamente.",
            "Esto no significa que el ATS sea perfecto. A veces descartda currículums válidos porque el formato no permite leer correctamente la información. Por eso la forma en que escribís y das formato a tu CV influye directamente.",
          ],
        },
        {
          title: "Factores que el ATS evalúa en tu CV",
          paragraphs: [
            "Palabras clave: El sistema busca términos específicos relacionados con habilidades, experiencias, herramientas, certificaciones y títulos. Estos términos deben aparecer de forma natural en tu CV, no forzados.",
            "Formato del CV: El ATS tiene dificultades con formatos complejos como columnas múltiples, tablas, imágenes, iconos, gráficos o fuentes no estándar. Un CV en texto plano con estructura clara es más seguro.",
            "Secciones estándar: El ATS espera encontrar secciones predecibles como 'Experiencia Laboral', 'Educación', 'Habilidades'. Títulos creativos o informales pueden hacer que el sistema no identifique correctamente tu experiencia.",
            "Consistencia: Los CV con información incompleta, fechas incoherentes o formato irregular pueden recibir puntajes más bajos, aunque el contenido sea bueno.",
          ],
        },
        {
          title: "Estrategias para que tu CV pase el filtro ATS",
          paragraphs: [
            "Usá palabras clave de la oferta: Leé la publicación del puesto y extraé los términos que aparecen. Incluí esas palabras clave de forma natural en tu CV, especialmente en la sección de habilidades y en la descripción de experiencia.",
            "Mantené un formato simple: Evitá tablas, columnas múltiples, imágenes, iconos y fuentes decorativas. Usá texto plano con encabezados claros y secciones bien definidas.",
            "Usá títulos de sección estándar: 'Experiencia Laboral' en vez de 'Mi Trayectoria', 'Educación' en vez de 'Formación Académica'. Esto ayuda al ATS a identificar correctamente cada parte.",
            "Optimizá la longitud: Un CV de 1 a 2 páginas es ideal. Demasiado largo puede confundir al sistema; demasiado corto puede parecer incompleto.",
            "Guardalo en formato compatible: PDF es generalmente seguro, pero algunos ATS prefieren Word (.docx). Si la empresa no especifica, PDF suele ser la mejor opción.",
          ],
        },
        {
          title: "Errores comunes que hacen que un CV sea descartado por el ATS",
          paragraphs: [
            "Diseño excesivamente creativo: Un CV con colores llamativos, fuentes decorativas o elementos gráficos puede ser completamente ilegible para el ATS. El sistema solo extrae texto, no información visual.",
            "Palabras clave genéricas: 'Trabajo en equipo', 'liderazgo' y 'comunicación' son tan genéricas que no suman puntos. Las palabras clave específicas del puesto son las que marcan la diferencia.",
            "Formato de archivo incompatible: Un CV en un formato que el ATS no puede leer se descarta automáticamente. PDF es generalmente seguro, pero siempre verificá que sea legible.",
            "Secciones con títulos no estándar: Si el ATS no puede identificar una sección, no la tiene en cuenta. Usá títulos universales y evitá la creatividad en los encabezados de sección.",
          ],
        },
        {
          title: "Testeá tu CV antes de enviarlo",
          paragraphs: [
            "Antes de enviar tu CV a una oferta, podés hacer una verificación rápida: copiá el contenido de tu CV y pegalo en un documento de texto plano. ¿Se mantiene toda la información legible y en orden? Si no, probablemente el ATS tendrá problemas para leerlo.",
            "También existen herramientas online que simulan el análisis de un ATS y te dan un puntaje aproximado de qué tan bien está preparado tu CV. Usarlas antes de enviar puede ahorrarte muchos descartes automáticos.",
            "En VitaeSpark, todos los CV se generan en formato optimizado para ATS con estructura estándar, palabras clave relevantes y formato compatible. Probalo gratis y verificá cómo queda tu currículum.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Un CV para ATS tiene que ser aburrido visualmente?",
          answer:
            "No. Un CV bien diseñado para ATS puede mantener una presentación profesional y limpia, sin elementos gráficos que interfieran con la lectura del sistema. VitaeSpark diseña plantillas que son compatibles con ATS sin sacrificar la apariencia.",
          },
        {
          question: "Las palabras clave son lo mismo que 'spammear' el CV con términos?",
          answer:
            "No. Forzar palabras clave sin contexto puede perjudicar tu CV. Las palabras clave deben aparecer de forma natural y representar habilidades o experiencias reales. La calidad del contenido sigue siendo más importante que la cantidad.",
          },
        {
          question: "Puedo usar el mismo CV para todos los puestos?",
          answer:
            "Se recomienda personalizarlo según cada oferta, especialmente las palabras clave. Un CV base adaptado a cada puesto tiene muchas más posibilidades de pasar el filtro ATS que uno genérico.",
          },
        {
          question: "Qué formato de archivo es más seguro para el ATS?",
          answer:
            "PDF es generalmente el más seguro porque preserva el formato. Algunos ATS más antiguos tienen dificultades con PDF, pero en la mayoría de los casos modernos, PDF funciona correctamente. Si la empresa indica otro formato, seguí esa indicación.",
          },
        ]}
      relatedLinks={[
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description:
            "Guía completa para preparar tu CV paso a paso para sistemas ATS.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV Online",
          description:
            "Construí tu CV con estructura optimizada para ATS y descargalo en PDF.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de CV",
          description:
            "5 plantillas profesionales compatibles con sistemas ATS.",
        },
        {
          href: "/blog/como-hacer-un-cv-ats",
          title: "Guía para CV ATS",
          description:
            "Aprendé los conceptos básicos para que tu CV pase filtros automáticos.",
        },
      ]}
    />
  );
}