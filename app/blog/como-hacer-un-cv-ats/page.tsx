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
      dateModified="2026-06-28"
      title="Cómo Hacer un CV ATS que Pase Filtros Automáticos y Llegue a Reclutadores"
      description="Guía práctica con pasos concretos, definiciones claras y ejemplos para crear un curriculum compatible con sistemas ATS y aumentar tus posibilidades de conseguir entrevistas."
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
            "Lo que parece intuitivo para una persona (una columna, un diseño creativo, un título artístico) puede hacer que el ATS no identifique correctamente dónde está tu experiencia laboral. Por ejemplo, si tuvieras el título 'Mi trayectoria profesional' en vez de 'Experiencia Laboral', el sistema podría no detectar esa sección y perder toda esa información.",
            "Usá encabezados estándar como 'Experiencia laboral', 'Educación', 'Habilidades técnicas' e 'Idiomas'. Ordená la experiencia desde la más reciente y evitá depender de tablas, imágenes o gráficos para comunicar información esencial.",
            "Ejemplo de estructura incompatible: un CV con dos columnas, colores en los títulos, fuentes decorativas y una sección de 'Sobre mí' con tipografía especial. Ejemplo de estructura compatible: texto plano con encabezados claros, secciones bien definidas, formato consistente en cada empleo con fechas en el mismo lugar, educación en otro, habilidades en otro.",
          ],
        },
        {
          title: "Palabras clave: cómo usarlas sin caer en el spam",
          paragraphs: [
            "Las palabras clave son el mecanismo principal que usa el ATS para evaluar tu CV. Cuando el reclutador configura la vacante, incluye términos que busca: habilidades técnicas, nombres de software, certificaciones, títulos, herramientas específicas. El ATS busca esas palabras en tu CV y les asigna un puntaje.",
            "Por eso el primer paso antes de enviar cualquier CV es leer la oferta detenidamente. Identificá los términos que aparecen más de una vez, los que mencionan como requisitos obligatorios y los que describen el día a día del puesto. Esas son tus palabras clave objetivo.",
            "La técnica es integrarlas de forma natural en tu CV. Si la oferta dice 'manejo de CRM Salesforce', tu CV debería decir 'Experiencia con Salesforce para gestión de clientes' en algún lugar. No hace falta repetirlo 20 veces: una mención clara y contextual es más efectiva que forzar keywords sin relación.",
            "Un error común es usar títulos genéricos como 'liderazgo', 'trabajo en equipo' o 'comunicación'. Esas palabras aparecen en casi todos los CV y no suman puntos. En cambio, 'metodología ágil Scrum', 'Power BI para reporting' o 'gestión de cartera de 50 proveedores' son específicas y contextuales, lo que las hace mucho más valiosas para el ATS.",
          ],
        },
        {
          title: "Formato de archivo y errores que destruyen tu CV antes de enviarlo",
          paragraphs: [
            "El formato de archivo importa porque un documento puede verse bien y, aun así, tener texto difícil de extraer. La primera regla es respetar el tipo de archivo solicitado por la empresa.",
            "Un PDF con texto seleccionable conserva bien la presentación y suele ser aceptado. DOCX también es habitual. Evitá enviar una imagen del CV o formatos propietarios si la oferta no los solicita.",
            "Otros errores críticos incluyen: usar fuentes no estándar que el sistema no reconoce, incluir macros o código ejecutable (esto puede incluso bloquear el archivo), enviar el CV como enlace a Google Drive o Dropbox en vez del archivo directo (el ATS necesita el archivo, no un enlace), y dejar el archivo con un nombre genérico como 'CV.pdf' en vez de 'Juan_Perez_CV_Marketing.pdf'.",
            "Antes de enviar, hacé esta prueba: copiá todo el texto de tu CV y pegalo en un documento de texto plano (como el Bloc de notas). ¿Se mantiene toda la información en orden? ¿Las fechas están donde deberían estar? ¿Las secciones están claras? Si al pegar el texto todo se mezcla o se pierde, el ATS probablemente tendrá el mismo problema.",
          ],
        },
        {
          title: "Cómo personalizar tu CV para cada oferta sin perder tiempo",
          paragraphs: [
            "No necesitás reescribir tu CV completo para cada aplicación. Lo que necesitás es ajustar las palabras clave y la descripción del perfil para cada puesto específico. Esto puede hacerse en 5 a 10 minutos si ya tenés un CV base bien estructurado.",
            "El proceso es simple: abrí la oferta, identificá las 5-7 palabras clave más importantes, revisá tu CV base y asegurate de que esas palabras aparezcan al menos una vez en contexto. Ajustá el resumen profesional para reflejar el tono y los requisitos de la vacante. Listo. No hace falta rehacer todo.",
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
            "No necesariamente, pero la información esencial no debería depender de fotos, íconos o gráficos. Algunos sistemas los ignoran y los diseños complejos pueden alterar el orden del texto. Priorizá una estructura simple y verificable.",
        },
        {
          question: "PDF o Word: cuál formato es mejor para ATS?",
          answer:
            "Seguí siempre el formato pedido por la empresa. Si no indica uno, un PDF con texto seleccionable suele conservar bien el diseño y DOCX también es ampliamente aceptado.",
        },
        {
          question: "Cómo sé si mi CV pasó el filtro ATS?",
          answer:
            "No hay una prueba universal porque cada empresa configura su proceso de manera diferente. Verificar que el texto pueda copiarse en orden ayuda a detectar problemas de formato, pero no garantiza avanzar.",
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
          href: "/crear-cv-online",
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
