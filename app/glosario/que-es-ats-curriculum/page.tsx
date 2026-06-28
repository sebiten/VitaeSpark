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
      dateModified="2026-06-28"
      title="Qué es ATS en un Currículum y Cómo Adaptar tu CV al Sistema"
      description="Conocé qué es un ATS, cómo procesa la información de un currículum y qué ajustes ayudan a que tu experiencia se lea con claridad."
      intro="Un ATS (Applicant Tracking System o Sistema de Seguimiento de Candidatos) es un software que ayuda a las empresas a recibir, organizar y consultar postulaciones. Puede extraer datos del CV y compararlos con criterios definidos para una vacante. Su funcionamiento cambia según la plataforma y la configuración de cada empresa."
      sections={[
        {
          title: "Qué es un sistema ATS y por qué importa",
          paragraphs: [
            "Un Applicant Tracking System (ATS) es un software de reclutamiento que gestiona postulaciones. Las empresas pueden usarlo para recibir CV, extraer información y ordenar candidatos según criterios del proceso.",
            "El objetivo principal es centralizar la información y facilitar el trabajo de selección. Un formato claro reduce errores de lectura, pero no existe una estructura que garantice superar todos los sistemas.",
            "Entender esta lógica ayuda a presentar experiencia, educación y habilidades de una manera que pueda interpretar tanto el software como el reclutador.",
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
            "VitaeSpark genera CV con secciones claras y texto legible. Revisá siempre el resultado y adaptá el contenido a la vacante antes de enviarlo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuánto tiempo tiene que tener un CV para ATS?",
          answer:
            "La extensión ideal es de 1 a 2 páginas. Menos de una puede parecer incompleto. Más de dos aumenta el riesgo de que el ATS confunda o descarte información. Si tenés mucha experiencia, priorizá lo más relevante para cada puesto.",
        },
        {
          question: "Puedo usar el mismo CV para todos los puestos?",
          answer:
            "Podés usar un CV base, pero necesitás personalizar las palabras clave y ajustar el resumen para cada oferta. Un CV genérico con las mismas palabras clave para todos los puestos tiene menos chances de pasar el ATS que uno adaptado a cada aplicación.",
        },
        {
          question: "Las fotos y gráficos arruinan el CV para el ATS?",
          answer:
            "No necesariamente, pero la información importante no debería depender de elementos visuales. Algunos sistemas los ignoran y un diseño complejo puede cambiar el orden del texto extraído.",
        },
        {
          question: "PDF o Word: cuál formato es mejor para ATS?",
          answer:
            "Usá el formato solicitado por la empresa. Si no indica uno, un PDF con texto seleccionable suele conservar bien el diseño y DOCX también es habitual.",
        },
        {
          question: "Cómo sé si mi CV pasó el filtro ATS?",
          answer:
            "No hay forma segura de saber si tu CV pasó o no, excepto aplicando y esperando respuesta. Por eso es clave testearlo antes con herramientas de simulación o haciendo la prueba del documento de texto plano. Si tu CV pasa esas pruebas, tiene muchas más chances de avanzar.",
        },
        {
          question: "Los ATS rechazan CV buenos por no tener palabras clave exactas?",
          answer:
            "Sí, puede pasar. El ATS busca coincidencia entre las palabras clave de la vacante y las de tu CV. Si tu experiencia es relevante pero usás términos diferentes a los de la oferta, el sistema puede puntuarte bajo aunque seas un buen candidato. Por eso es clave leer la oferta y alinear tu lenguaje con el de la vacante.",
        },
      ]}
      sources={[
        {
          href: "https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse",
          title: "Unsuccessful resume parse",
          organization: "Greenhouse Support",
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
            "Construí tu CV con una estructura clara y descargalo en PDF.",
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
            "Aprendé a preparar un CV legible para software y personas.",
        },
      ]}
    />
  );
}
