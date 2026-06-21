import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Qué es un Currículum Vitae y Cómo Hacer uno Profesional",
  description:
    "Entendé qué es un currículum vitae, en qué se diferencia del CV y del resume, qué secciones debe tener, cómo estructurarlo y qué errores evitar para que destaque.",
  path: "/glosario/que-es-currriculum-vitae",
  keywords: [
    "que es curriculum vitae",
    "currriculum vitae definicion",
    "diferencia cv y resume",
    "como hacer curriculum vitae",
    "secciones curriculum vitae",
  ],
});

export default function QueEsCurrriculumVitaePage() {
  return (
    <BlogArticlePage
      path="/glosario/que-es-currriculum-vitae"
      title="Qué es un Currículum Vitae y Cómo Hacer uno Profesional"
      description="Un currículum vitae es el documento más importante para presentar tu perfil profesional. Conocé qué es, cómo se diferencia del CV simple y del resume, qué secciones debe tener y cómo armar uno que destaque."
      intro="El término 'currículum vitae' viene del latín y significa literalmente 'carrera de vida'. Es un documento que resume tu trayectoria profesional, académica y tus habilidades para presentarte ante un potencial empleador. En Argentina y Latinoamérica, se lo conoce comúnmente como 'CV' y es el instrumento principal para aplicar a trabajos, prácticas profesionales o oportunidades laborales."
      sections={[
        {
          title: "Definición y propósito del currículum vitae",
          paragraphs: [
            "Un currículum vitae es un documento formal que presenta tu información personal, experiencia laboral, educación, habilidades y logros de manera estructurada. Su propósito es dar a un reclutador una visión rápida y clara de tu perfil profesional para que pueda evaluar si sos candidato para el puesto.",
            "A diferencia de una simple lista de empleos, un CV bien estructurado cuenta una historia: muestra tu evolución profesional, destaca tus logros más relevantes y comunica qué tipo de profesional sos. Un reclutador dedica en promedio solo 6 segundos a la primera lectura de un CV, según estudios de The Ladders, por eso la claridad y el impacto son fundamentales.",
            "En el contexto laboral argentino, el CV es prácticamente obligatorio para cualquier proceso de selección formal, desde grandes empresas hastaPyMEs y organizaciones públicas.",
          ],
        },
        {
          title: "Diferencia entre currículum vitae, CV y resume",
          paragraphs: [
            "En Argentina y Latinoamérica, 'currículum vitae' y 'CV' se usan como sinónimos. Sin embargo, en otros contextos, especialmente en países anglosajones, existen diferencias importantes.",
            "El 'resume' es un documento más corto (1 página máximo) enfocado en lo más relevante para el puesto específico. Es más escueto y se adapta a cada aplicación. El 'currículum vitae' es más extenso (2 o más páginas) y detalla toda la trayectoria académica y profesional sin adaptación por contexto.",
            "En la práctica argentina, cuando alguien dice 'enviame tu CV' se refiere a un documento completo pero no necesariamente tan extenso como un CV académico completo. Lo importante es que sea claro, completo y profesional.",
          ],
        },
        {
          title: "Secciones fundamentales de un currículum vitae",
          paragraphs: [
            "Datos de contacto: Nombre completo, teléfono, email, ciudad/país. LinkedIn si es relevante. No agregar datos personales como estado civil o documento.",
            "Perfil profesional o objetivo: Breve párrafo (3-5 líneas) que sintetiza tu experiencia, habilidades y objetivo laboral. Es lo primero que lee el reclutador después del título.",
            "Experiencia laboral: En orden cronológico inverso (del más reciente al más antiguo). Cada empleo incluye empresa, puesto, fechas y logros o responsabilidades destacadas.",
            "Educación: Títulos obtenidos, instituciones, fechas. Solo lo más relevante para el puesto.",
            "Habilidades: Competencias técnicas e idiomáticas, herramientas, certificaciones.",
            "Información adicional: Cursos, logros, voluntariado, disponibilidad. Solo lo que sume.",
          ],
        },
        {
          title: "Errores comunes en los currículums vitae",
          paragraphs: [
            "Exceso de información: Incluir todo lo que hiciste en 20 años de carrera sin selectivity. El reclutador busca relevancia, no exhaustividad. Solo lo que se relaciona con el puesto cuenta.",
            "Diseño recargado: Fuentes decorativas, colores llamativos, columnas múltiples, iconos creativos. Todo eso dificulta la lectura y puede afectar la compatibilidad con sistemas ATS.",
            "Perfil genérico: 'Soy una persona responsable y proactiva' no dice nada. El perfil debe ser específico y comunicar qué podés aportar al雇主.",
            "Errores ortográficos y de formato: Revisar siempre. Un CV con errores transmite descuido y falta de atención al detalle.",
            " Información desactualizada: Fechas que no cierran, referencias a tecnologías obsoletas, experiencia de hace 15 años como si fuera reciente. Mantener el CV actualizado es fundamental.",
          ],
        },
        {
          title: "Cómo hacer un CV que destaque",
          paragraphs: [
            "Comenzá con un perfil claro y específico. No uses frases genéricas: indicá qué hacés, en qué sector, con qué herramientas o metodologías, y qué tipo de resultados lograste.",
            "Usá verbos de acción y logros medibles: 'Lideré equipo de 5 personas' > 'Responsable del equipo'. 'Aumenté ventas un 20%' > 'Mejoré performance'. Los números hablan más que las descripciones vagas.",
            "Adaptá el CV a cada puesto: No existe un CV único que sirva para todo. Revisá la oferta, identificá las palabras clave y ajustá tu contenido para maximizar coincidencias.",
            "Mantenelo conciso: 1 a 2 páginas es el rango ideal. Cada línea debe aportar información relevante. Si podés eliminate una frase sin perder sentido, eliminarla.",
            "Usá formato profesional y limpio: Fuente sans-serif tamaño 11-12, títulos claros, espacio en blanco suficiente. Que se vea fácil de escanear.",
          ],
        },
        {
          title: "Herramientas para crear tu currículum vitae",
          paragraphs: [
            "Crear un CV desde cero puede ser difícil si no sabés por dónde empezar. VitaeSpark te permite construir tu currículum paso a paso con ayuda de inteligencia artificial que mejora la redacción de cada sección.",
            "Podés elegir entre 6 plantillas profesionales, cambiar de diseño sin perder contenido, y descargar tu CV en formato PDF optimizado para ATS. Todo gratis para empezar.",
            "Lo más importante es que el proceso te guía para que cada sección quede bien redactada, con palabras clave relevantes y estructura clara. No necesitás ser diseñador ni especialista en recursos humanos para tener un CV profesional.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuántas páginas debe tener un CV?",
          answer:
            "En Argentina, 1 a 2 páginas es lo más recomendado. Perfiles muy senior pueden usar 2-3 páginas, pero cada línea debe justificar su presencia. Menos es más.",
          },
        {
          question: "Debo incluir foto en el CV?",
          answer:
            "En Argentina es común incluir foto, pero cada vez más empresas prefieren evitarla para reducir sesgos. Si la incluís, debe ser profesional, de frente, fondo neutro. No selfies ni fotos de vacaciones.",
          },
        {
          question: "Es mejor un CV cronológico o por habilidades?",
          answer:
            "Depende de tu trayectoria. El cronológico funciona mejor para perfiles con experiencia lineal y consistente. El funcional funciona mejor para transiciones de carrera o perfiles con lagunas. VitaeSpark permite elegir el formato que mejor se adapte.",
          },
        {
          question: "Cómo incluyoachievements sin parecer arrogante?",
          answer:
            "Usá datos y resultados concretos en vez de adjetivos. 'Aumenté la satisfaction del cliente en un 15%' es más creíble que 'Soy excelente en atención al cliente'. Los números hablan por sí solos.",
          },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV Online",
          description:
            "Construí tu currículum paso a paso con ayuda de inteligencia artificial.",
        },
        {
          href: "/cv-profesional",
          title: "CV Profesional",
          description:
            "Guía para crear un CV que destaque por contenido y formato.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de CV",
          description:
            "6 plantillas profesionales para dar formato a tu currículum.",
        },
        {
          href: "/curriculum-vitae-ejemplo",
          title: "Ejemplo de Currículum Vitae",
          description:
            "参考 visual de currículum bien estructurado y redactado.",
        },
      ]}
    />
  );
}
