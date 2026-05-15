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
      title="Cómo Hacer un CV ATS que Pase Filtros Automáticos y Llegue a Reclutadores"
      description="Guía práctica con pasos concretos, definiciones claras y ejemplos para crear un curriculum compatible con sistemas ATS y aumentar tus posibilidades de conseguir entrevistas."
      intro="Un sistema ATS (Applicant Tracking System) es un software que las empresas usan para filtrar currículums antes de que un humano los lea. Según Jobscan, el 75% de los currículums enviados a ofertas都会被 sistemas automatizados descartados sin ser vistos. Esto significa que si tu CV no está optimizado para estos sistemas, estás perdiendo la mayoría de tus oportunidades antes de que empezce el juego. La buena noticia es que con la estructura correcta, contenido alineado y formato limpio podés hacer que tu CV pase esos filtros y llegue a una persona real."
      sections={[
        {
          title: "Qué es un ATS y por qué tu CV necesita estar preparado",
          paragraphs: [
            "Un Applicant Tracking System (ATS) es un sistema de seguimiento de candidatos que permite a las empresas recibir, organizar y filtrar aplicaciones de forma automatizada. Cuando aplicás a una oferta, tu CV entra en una base de datos donde el sistema lo analiza, lo puntúa y lo compara con los requisitos del puesto.",
            "El proceso funciona así: el reclutador crea una vacante con palabras clave y requisitos específicos. Cuando aplicás, el ATS extrae información de tu CV (experiencia, educación, habilidades, certificaciones) y la compara con esos requisitos. Si tu perfil coincide lo suficiente, avanzás al siguiente stage. Si no, tu CV queda en el limbo digital.",
            "Según datos de la industria, el 98% de las empresas Fortune 500 utilizan algún tipo de ATS. Pero no son solo las grandes corporaciones: pequenas empresas, agencias de empleo y hasta plataformas de búsqueda como LinkedIn también usan sistemas de filtrado similares. Por eso, aprender a crear un CV compatible con ATS no es opcional si querés ser serio en tu búsqueda laboral.",
            "La diferencia clave es esta: un CV tradicional está diseñado para ser leído por una persona. Un CV optimizado para ATS también debe ser legible por una máquina que filtra antes de que alguien te vea. Esto no significa escribir para robots, sino entender qué evalúan y cómo presentarle tu información de la forma más clara posible.",
          ],
        },
        {
          title: "Estructura correcta para que el ATS lea bien tu CV",
          paragraphs: [
            "La estructura de tu CV es el factor más importante para que el ATS pueda extraer tu información correctamente. Estos sistemas esperan encontrar secciones estándar en posições predecibles: datos de contacto, perfil profesional, experiencia laboral, educación, habilidades.",
            "Lo que parece intuitivo para una persona (una columna, un diseño creativo, un título artístico) puede hacer que el ATS no identifique correctamente dónde está tu experiencia laboral. Por ejemplo, si tuvieras el título 'Mi trayectoria profesional' en vez de 'Experiencia Laboral', el sistema podría no detectar esa sección y perder toda esa información.",
            "Las mejores prácticas de estructura incluyen: usar encabezados estándar como 'Experiencia Laboral', 'Educación', 'Habilidades técnicas' y 'Idiomas'. Mantener una estructura chronological inversa (lo más reciente primero). Evitar tablas, columnas múltiples, imágenes, iconos o elementos gráficos. Guardar el archivo en PDF, que preserva el formato y es ampliamente aceptado por los ATS modernos.",
            "Ejemplo de estructura incompatible: un CV con dos columnas, colores en los títulos, fuentes decorativas y una sección de 'Sobre mí' con tipografía especial. Ejemplo de estructura compatible: texto plano con encabezados claros, secciones bien definidas, formato consistente en cada empleo con fechas en el mismo lugar, educación en otro, habilidades en otro.",
          ],
        },
        {
          title: "Palabras clave: cómo usarlas sin caer en el spamm",
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
            "El formato de archivo es un punto ciego que mucha gente ignora. Un CV puede estar perfectamente estructurado y redactado, pero si está en un formato que el ATS no puede leer, termina en la papelera digital sin chance alguna.",
            "PDF es el formato más seguro para la mayoría de los casos. Mantiene el diseño y garantiza que lo que ves sea lo que el sistema lee. Word (.docx) también funciona, pero algunos ATS más antiguos pueden interpretar mal el formato. Lo que nunca conviene usar: archivos de imagen (PNG, JPG), archivos de texto sin formato (.txt) que pierden toda la estructura, o formatos propietarios como .pages de Mac.",
            "Otros errores críticos incluyen: usar fuentes no estándar que el sistema no reconoce, incluir macros o código ejecutable (esto puede incluso bloquear el archivo), enviar el CV como enlace a Google Drive o Dropbox en vez del archivo directo (el ATS necesita el archivo, no un enlace), y dejar el archivo con un nombre genérico como 'CV.pdf' en vez de 'Juan_Perez_CV_Marketing.pdf'.",
            "Antes de enviar, hacé esta prueba: copiá todo el texto de tu CV y pegalo en un documento de texto plano (como el Bloc de notas). ¿Se mantiene toda la información en orden? ¿Las fechas están donde deberían estar? ¿Las secciones están claras? Si al pegar el texto todo se mezcla o se pierde, el ATS probablemente tendrá el mismo problema.",
          ],
        },
        {
          title: "Cómo personalizar tu CV para cada oferta sin perder tiempo",
          paragraphs: [
            "No necesitás reescribir tu CV completo para cada aplicación. Lo que necesitás es ajustar las palabras clave y la descripción del perfil para cada puesto específico. Esto puede hacerse en 5 a 10 minutos si ya tenés un CV base bien estructurado.",
            "El proceso es simple: abrí la oferta, identificá las 5-7 palabras clave más importantes, revisá tu CV base y asegurate de que esas palabras aparezcan al menos una vez en contexto. Ajustá el resumen profesional para reflejar el tono y los requisitos de la vacante. Listo. No hace falta rehacer todo.",
            "Esto no significa mentir sobre tu experiencia. Si la oferta pide 'manejo de equipos de 10 personas' y vos manejaste equipos de 5, está bien usar ese ejemplo y framing porque es real y relevante. El ATS no espera exactitud total, sino coincidencia suficiente para ponerte en el pile de 'vale la pena revisar'.",
            "Aplicá este principio: cada palabra de tu CV debe poder justificarse con algo real de tu experiencia. Las palabras clave genéricas y forzadas no solo no suman, sino que pueden hacer que tu CV parezca inflado artificialmente, lo que juega en tu contra tanto con el ATS como con el reclutador humano que eventualmente lo lea.",
          ],
        },
        {
          title: "Testea tu CV antes de enviarlo: herramientas y técnicas",
          paragraphs: [
            "Existen herramientas online que simulan el análisis de un ATS y te dan un puntaje aproximado de qué tan bien está preparado tu CV para pasar filtros automáticos. Jobscan, Resumeworded y similares permiten cargar tu CV y compararlo con una descripción de puesto para ver qué tan bien estás rankeando.",
            "También podés hacer una verificación manual: copiá el contenido de tu CV y pegalo en un documento de texto plano. Si al hacerlo la información se desordena, las secciones se mezclan o las fechas quedan en lugares raros, tu CV probablemente tiene problemas de formato que el ATS detectará.",
            "Otra opción es enviar tu CV a una cuenta de email propia y luego descargarlo desde ahí. Muchos servicios de email muestran cómo se ve el archivo adjuntado, y podés verificar si el archivo se ve bien o si llegó corrupto o en un formato inesperado.",
            "En VitaeSpark, todos los CV generados ya vienen optimizados para ATS con estructura estándar, palabras clave en contexto y formato PDF compatible. Si todavía no probaste el creador, este es el momento de verificar cómo queda tu curriculum antes de enviarlo a tus próximas oportunidades.",
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
            "Sí. Cualquier elemento visual (fotos, íconos, gráficos, texturas, colores) no es leído por el ATS. En el mejor caso, el sistema ignora esos elementos y solo extrae texto. En el peor, pueden romper la estructura del documento y hacer que perder información. Lo más seguro es un CV limpio, solo texto.",
        },
        {
          question: "PDF o Word: cuál formato es mejor para ATS?",
          answer:
            "PDF es generalmente la opción más segura porque preserva el formato en cualquier sistema. Word (.docx) también funciona, pero algunos ATS más antiguos pueden tener problemas para leer correctamente el diseño. Si la empresa especifica un formato, seguí esa indicación.",
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
            "La IA de VitaeSpark optimiza tu CV con palabras clave estratégicas automáticamente.",
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
            "5 plantillas profesionales diseñadas específicamente para pasar filtros automáticos.",
        },
      ]}
    />
  );
}
