import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Perfil Profesional para CV: Qué Es y Cómo Escribirlo Bien",
  description:
    "Aprendé qué es un perfil profesional en el currículum, cómo redactarlo según tu nivel de experiencia, ejemplos por sector y errores comunes que debés evitar.",
  path: "/glosario/como-escribir-perfil-profesional",
  keywords: [
    "perfil profesional cv",
    "como escribir perfil profesional",
    "ejemplo perfil profesional cv",
    "perfil profesional sin experiencia",
    "objetivo laboral cv",
  ],
});

export default function PerfilProfesionalPage() {
  return (
    <BlogArticlePage
      path="/glosario/como-escribir-perfil-profesional"
      title="Perfil Profesional para CV: Qué Es y Cómo Escribirlo Bien"
      description="El perfil profesional es la primera sección que lee un reclutador después del título. Aprendé qué poner, cómo adaptarlo a tu experiencia y ejemplos por nivel para que tu CV destaque."
      intro="El perfil profesional (también llamado 'objetivo profesional' o 'resumen ejecutivo') es el párrafo inicial de tu CV que presenta quién sos, qué hacés y qué podés aportar a la empresa. Es la primera impresión que causás en un reclutador, y según estudios de CareerBuilder, los reclutadores pasan solo 6 segundos en la primera lectura de un CV. Por eso, un buen perfil puede ser la diferencia entre que sigan leyendo o descarten tu aplicación."
      sections={[
        {
          title: "Qué es un perfil profesional y por qué importa",
          paragraphs: [
            "El perfil profesional es un párrafo breve (3 a 5 líneas) que sintetiza tu experiencia, habilidades más relevantes y objetivo laboral. Aparece después de tus datos de contacto y antes de la experiencia laboral.",
            "Su función es responder rápidamente la pregunta que todo reclutador se hace al revisar un CV: '¿Este candidato es relevante para el puesto?'. Si el perfil no comunica claramente tu propuesta de valor, el reclutador puede descartar el CV antes de leer tus logros.",
            "Un perfil bien redactado genera contexto y facilita que el reclutador entienda tu perfil profesional en segundos, antes de sumergirse en los detalles de tu experiencia.",
          ],
        },
        {
          title: "Estructura ideal de un perfil profesional",
          paragraphs: [
            "Un perfil profesional efectivo sigue una estructura clara: mencioná tu experiencia o领域, tus habilidades principales, lo que podés aportar y tu objetivo profesional.",
            "Para perfiles con experiencia: 'Profesional con [X] años de experiencia en [área]. Especializado en [habilidades clave]. Orientado a [tipo de resultados]. Busco aplicar mi experiencia en [sector/objetivo].'",
            "Para perfiles sin experiencia: 'Egresado de [carrera] con conocimientos en [áreas]. Habilidades en [herramientas/metodologías]. Orientado a [sector/rol objetivo]. busco desarrollarme en [área específica].'",
          ],
        },
        {
          title: "Ejemplos de perfil profesional por nivel de experiencia",
          paragraphs: [
            "Sin experiencia: 'Egresado de Administración de Empresas con conocimientos en gestión de proyectos y herramientas de Microsoft Office. Habilidad para el análisis de datos y comunicación efectiva. Busco desarrollarme en el área administrativa de una empresa FMCG.'",
            "Con experiencia media: 'Profesional de marketing digital con 4 años de experiencia en gestión de campañas en Google Ads y Meta Ads. Especializado en seo y content marketing con resultados medibles: aumento del 30% en tráfico orgánico en el último año. Busco aplicar mis conocimientos en una empresa de e-commerce.'",
            "Perfil senior: 'Director comercial con 10 años de experiencia en el sector farmacéutico. Leadership de equipos de +15 personas y cierre de negocios anuales por $50M. Historial de expansión de cartera de clientes en Latinoamérica. Busco oportunidad como Director de Ventas en empresa multinacional del sector salud.'",
          ],
        },
        {
          title: "Errores comunes al escribir el perfil profesional",
          paragraphs: [
            "Genéricos: 'Soy una persona responsable, proactiva y con buena comunicación' no dice nada que no aplique a miles de candidatos. El perfil debe ser específico sobre tu области y resultados.",
            "Muy largo: Más de 5-6 líneas empieza a perder impacto. El reclutador quiere escanear, no leer una introducción completa.",
            "Sin keywords: No incluir términos relevantes para el puesto. El perfil debe incluir palabras clave de la industria o del puesto al que aplicás.",
            "No adaptado: Usar el mismo perfil para todas las aplicaciones. Cada CV debería tener un perfil ligeramente ajustado al puesto específico.",
            "Errores ortográficos o de redacción: Como es la primera sección que se lee, cualquier error pega mal y genera una impresión de descuido.",
          ],
        },
        {
          title: "Cómo adaptar tu perfil profesional a cada oferta",
          paragraphs: [
            "Primero, leé bien la descripción del puesto. Identificá las habilidades y términos que más se repiten. Esos son los keywords que tu perfil debe incluir.",
            "Segundo, ajustá tu experiencia y habilidades para priorizar las que son relevantes para esa oferta específica. No mentías, pero sí ordená la información para que lo más relacionado aparezca primero.",
            "Tercero, si la oferta menciona un sector específico (ej: 'sector fintech', 'industria farmacológica'), nombralo en tu perfil. Esto le dice al reclutador que entendés el contexto y que tu interés es genuino.",
          ],
        },
        {
          title: "Herramientas para mejorar tu perfil profesional",
          paragraphs: [
            "Si no estás seguro de cómo redactar tu perfil, VitaeSpark ofrece ayuda de inteligencia artificial que analiza tu experiencia y genera un perfil profesional adaptado al puesto que buscás.",
            "Además de redactarlo, la herramienta te sugiere palabras clave basándose en la oferta y te muestra cómo queda tu perfil dentro del contexto general del CV antes de descargarlo.",
            "Un buen perfil no nace de la inspiración: nace de entender qué busca el empleador y saber comunicar tu propuesta de valor de forma clara y concreta.",
          ],
        },
      ]}
      faqs={[
        {
          question: "El perfil profesional es obligatorio en un CV?",
          answer:
            "No es obligatorio, pero es altamente recomendado. Si no lo incluís, el reclutador empieza directamente con tu experiencia, sin contexto previo. Un buen perfil acelera la comprensión de tu perfil.",
          },
        {
          question: "Puedo usar el mismo perfil para todos los CV que envío?",
          answer:
            "No es lo ideal. Lo mejor es adaptar ligeramente el perfil a cada oferta, especialmente las palabras clave y el enfoque. Un perfil genérico tiene menos impacto que uno específico.",
          },
        {
          question: "Un perfil sin experiencia debe ser diferente?",
          answer:
            "Sí. Sin experiencia, el perfil debe enfocarse en lo que sabes hacer (formación, cursos, habilidades) y en qué sector o rol te querés desarrollar. No en logros laborales porque aún no tenés.",
          },
        {
          question: "Cuántas líneas debe tener un perfil profesional?",
          answer:
            "Entre 3 y 5 líneas es lo ideal. Menos puede ser demasiado escueto; más puede perder impacto. La clave es que cada palabra sume y comunique algo relevante.",
          },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV Online",
          description:
            "Construí tu CV con un perfil profesional adaptado a tu objetivo.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Guía para armar tu primer currículum cuando aún no tenés experiencia.",
        },
        {
          href: "/cv-profesional",
          title: "CV Profesional",
          description:
            "Todo lo que necesitás saber para crear un CV profesional desde cero.",
        },
        {
          href: "/blog/ejemplo-de-perfil-profesional",
          title: "Ejemplo de Perfil Profesional",
          description:
            "Ejemplos concretos de perfiles profesionales por sector y nivel.",
        },
      ]}
    />
  );
}