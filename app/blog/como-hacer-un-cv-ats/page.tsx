import { seoContentLastModified } from "@/lib/seo-routes";
import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un CV ATS: Estructura y Revisión del Archivo",
  description:
    "Consejos prácticos para crear un CV ATS con buena estructura, mejor uso de palabras clave y contenido orientado a procesos de selección actuales.",
  path: "/blog/como-hacer-un-cv-ats",
  keywords: [
    "como hacer un cv ats",
    "cv ats",
    "currículum ats",
    "pasar filtros ats",
  ],
  type: "article",
  image: "/social/cv-ats-filtro-og.png",
  imageAlt: "Cinco pautas para facilitar la lectura de un CV",
  socialTitle: "Un CV lindo también puede fallar el filtro ATS",
  socialDescription:
    "Revisa estructura, texto, palabras clave, diseño y archivo antes de enviar tu CV.",
});

export default function ComoHacerUnCvAtsPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-cv-ats"
      datePublished="2025-04-12"
      dateModified={seoContentLastModified["/blog/como-hacer-un-cv-ats"]}
      image="/social/cv-ats-filtro-og.png"
      title="Cómo preparar un CV para facilitar su lectura en sistemas ATS"
      description="Guía práctica para organizar las secciones, revisar el texto del PDF y describir antecedentes relevantes para la oferta."
      intro="Un ATS es un software que ayuda a las empresas a recibir, ordenar y consultar postulaciones. Para reducir errores de lectura, usá secciones claras, texto seleccionable, títulos estándar y el formato solicitado en la oferta. Ningún diseño garantiza avanzar: el contenido real y su relación con la vacante siguen siendo decisivos."
      sections={[
        {
          title: "Qué es un ATS y por qué tu CV necesita estar preparado",
          paragraphs: [
            "Un Applicant Tracking System (ATS) es un sistema de seguimiento de candidatos que permite recibir, organizar y buscar postulaciones. Según la configuración de cada empresa, puede extraer datos del CV, aplicar preguntas de descarte o ayudar a comparar perfiles con los requisitos del puesto.",
            "No todos los ATS funcionan igual ni deciden por sí solos quién avanza. Por eso conviene preparar un documento que pueda ser interpretado por software y, al mismo tiempo, resulte claro para la persona que lo revisa.",
            "La diferencia práctica es esta: además de verse profesional, el CV debe conservar una estructura reconocible cuando el sistema extrae su texto. Eso no significa escribir para robots, sino presentar la información sin obstáculos innecesarios.",
          ],
        },
        {
          title: "Estructura correcta para que el ATS lea bien tu CV",
          paragraphs: [
            "Una estructura clara facilita que el ATS extraiga tu información correctamente. Usá secciones reconocibles para datos de contacto, perfil profesional, experiencia laboral, educación y habilidades.",
            "Si una sección tiene un nombre ambiguo, puede dificultar identificar su contenido. Usa encabezados reconocibles y comprueba que las fechas y los cargos permanezcan juntos al copiar el texto.",
            "Usá encabezados estándar como 'Experiencia laboral', 'Educación', 'Habilidades técnicas' e 'Idiomas'. Ordená la experiencia desde la más reciente y evitá depender de tablas, imágenes o gráficos para comunicar información esencial.",
            "Compara el orden del texto extraído con el orden visual del CV. Si se mezclan columnas, cargos o fechas, simplifica el diseño. La apariencia por sí sola no permite certificar compatibilidad con todos los sistemas.",
          ],
        },
        {
          title: "Palabras clave: cómo usarlas sin caer en el spam",
          paragraphs: [
            "Los sistemas pueden permitir búsquedas por términos y otros filtros definidos por la empresa. Nombra herramientas, tareas y formación con precisión, sin asumir una puntuación universal ni añadir requisitos que no cumples.",
            "Por eso el primer paso antes de enviar cualquier CV es leer la oferta detenidamente. Identificá los términos que aparecen más de una vez, los que mencionan como requisitos obligatorios y los que describen el día a día del puesto. Esas son tus palabras clave objetivo.",
            "Si usaste Salesforce, explica para qué: por ejemplo, registrar consultas y actualizar datos de clientes. Si no lo usaste, no lo incluyas solo porque aparece en el aviso.",
            "Describe aplicaciones concretas de tus habilidades: por ejemplo, una herramienta utilizada para elaborar reportes. Incluye cifras o nombres de metodologías únicamente si puedes respaldarlos con tu experiencia.",
          ],
        },
        {
          title: "Formato de archivo y errores que destruyen tu CV antes de enviarlo",
          paragraphs: [
            "El formato de archivo importa porque un documento puede verse bien y, aun así, tener texto difícil de extraer. La primera regla es respetar el tipo de archivo solicitado por la empresa.",
            "Un PDF con texto seleccionable conserva bien la presentación y suele ser aceptado. DOCX también es habitual. Evitá enviar una imagen del CV o formatos propietarios si la oferta no los solicita.",
            "Respeta las instrucciones de envío y el tipo de archivo aceptado por el portal. Usa un nombre reconocible, como Nombre-Apellido-CV.pdf, y verifica que se abra correctamente; el nombre del archivo no determina tu avance.",
            "Antes de enviar, hacé esta prueba: copiá todo el texto de tu CV y pegalo en un documento de texto plano (como el Bloc de notas). ¿Se mantiene toda la información en orden? ¿Las fechas están donde deberían estar? ¿Las secciones están claras? Si al pegar el texto todo se mezcla o se pierde, el ATS probablemente tendrá el mismo problema.",
          ],
        },
        {
          title: "Cómo personalizar tu CV para cada oferta sin perder tiempo",
          paragraphs: [
            "No necesitás reescribir tu CV completo para cada aplicación. Lo que necesitás es ajustar las palabras clave y la descripción del perfil para cada puesto específico. Esto puede hacerse en 5 a 10 minutos si ya tenés un CV base bien estructurado.",
            "Lee las tareas y requisitos del aviso, selecciona los antecedentes relacionados y revisa que el perfil los resuma con precisión. No necesitas alcanzar una cantidad fija de palabras clave.",
            "Esto no significa exagerar tu experiencia. Si la oferta pide manejo de equipos y vos coordinaste a cinco personas, describí ese dato real y el contexto. La coincidencia de términos nunca debe reemplazar la precisión.",
            "Aplicá este principio: cada palabra de tu CV debe poder justificarse con algo real de tu experiencia. Las palabras clave genéricas y forzadas no solo no suman, sino que pueden hacer que tu CV parezca inflado artificialmente, lo que juega en tu contra tanto con el ATS como con el reclutador humano que eventualmente lo lea.",
          ],
        },
        {
          title: "Testea tu CV antes de enviarlo: herramientas y técnicas",
          paragraphs: [
            "Podés hacer una verificación manual: seleccioná y copiá el contenido del CV en un documento de texto plano. Si la información se desordena, las secciones se mezclan o las fechas quedan fuera de contexto, conviene simplificar el formato.",
            "Otra opción es enviar tu CV a una cuenta de email propia y luego descargarlo desde ahí. Muchos servicios de email muestran cómo se ve el archivo adjuntado, y podés verificar si el archivo se ve bien o si llegó corrupto o en un formato inesperado.",
            "VitaeSpark prioriza secciones claras, texto legible y una salida en PDF. Antes de postularte, revisá siempre el archivo final y adaptá el contenido a la vacante concreta.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Qué extensión conviene para un CV?",
          answer:
            "La extensión depende de tus antecedentes y de lo solicitado. Una o dos páginas pueden ser suficientes, pero no existe un límite universal de páginas que determine el rechazo de un ATS. Prioriza información relevante y una lectura clara.",
        },
        {
          question: "¿Puedo usar el mismo CV para todos los puestos?",
          answer:
            "Puedes partir de un CV base y seleccionar antecedentes para cada oferta. Usa el vocabulario del aviso cuando describa tu experiencia real; repetir palabras clave no garantiza avanzar en el proceso.",
        },
        {
          question: "¿Las fotos y gráficos arruinan el CV para el ATS?",
          answer:
            "No necesariamente, pero la información esencial no debería depender de fotos, íconos o gráficos. Algunos sistemas los ignoran y los diseños complejos pueden alterar el orden del texto. Priorizá una estructura simple y verificable.",
        },
        {
          question: "¿PDF o Word: cuál formato es mejor para ATS?",
          answer:
            "Seguí siempre el formato pedido por la empresa. Si no indica uno, un PDF con texto seleccionable suele conservar bien el diseño y DOCX también es ampliamente aceptado.",
        },
        {
          question: "¿Cómo sé si mi CV pasó el filtro ATS?",
          answer:
            "No hay una prueba universal porque cada empresa configura su proceso de manera diferente. Verificar que el texto pueda copiarse en orden ayuda a detectar problemas de formato, pero no garantiza avanzar.",
        },
        {
          question: "¿Los ATS rechazan CV buenos por no tener palabras clave exactas?",
          answer:
            "Cada sistema y cada empresa pueden usar funciones y criterios diferentes. Describe tus herramientas y tareas con nombres claros y relaciona tu experiencia real con el aviso, sin asumir que todos los ATS asignan una puntuación por palabras clave.",
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
          title: "Currículum ATS: Guía completa",
          description:
            "Todo lo que necesitás saber sobre qué es un CV ATS y cómo preparar el tuyo desde cero.",
        },
        {
          href: "/glosario/que-es-ats-curriculum",
          title: "Qué es un sistema ATS",
          description:
            "Definición detallada de cómo funcionan los sistemas de seguimiento de candidatos.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description:
            "Usá IA para mejorar la claridad del contenido sin inventar experiencia.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Armá tu CV con estructura optimizada para ATS desde cero con guía paso a paso.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas compatibles con ATS",
          description:
            "Plantillas profesionales con estructura clara y texto legible.",
        },
      ]}
    />
  );
}
