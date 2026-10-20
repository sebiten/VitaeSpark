import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Profesional: Cómo Crearlo paso a Paso",
  description:
    "Crea un CV profesional con mejor estructura, redacción más clara y una presentación pensada para reclutadores y procesos actuales.",
  path: "/cv-profesional",
  keywords: [
    "cv profesional",
    "currículum profesional",
    "hacer cv profesional",
    "crear currículum profesional",
    "modelo de cv profesional",
  ],
});

export default function CvProfesionalPage() {
  return (
    <MarketingPage
      path="/cv-profesional"
      eyebrow="CV profesional"
      title="CV profesional para mostrar mejor tu experiencia y conseguir más entrevistas"
      description="Pasa de un currículum genérico a un CV profesional con mejor redacción, más claridad y una presentación mucho más competitiva."
      intro={[
        "Muchas personas sienten que su CV no representa bien lo que saben hacer. A veces no falta experiencia, sino una forma más profesional de contarla y presentarla.",
        "Un CV profesional combina tres cosas: estructura clara, contenido bien escrito y una plantilla que ayude a leer rápido lo importante. Ese equilibrio puede mejorar mucho tus postulaciones.",
      ]}
      benefits={[
        "Mejora el tono y la claridad del contenido.",
        "Te ayuda a ordenar mejor experiencia, logros y habilidades.",
        "Deja una impresión más solida en procesos de selección reales.",
      ]}
      steps={[
        {
          title: "Carga tu información principal",
          description:
            "Experiencia, estudios, habilidades y objetivo profesional.",
        },
        {
          title: "Refina estructura y redacción",
          description:
            "Transforma información suelta en un CV más creíble y fácil de leer.",
        },
        {
          title: "Exporta una versión lista para postularte",
          description:
            "Termina con una presentación final mucho más profesional.",
        },
      ]}
      sections={[
        {
          title: "Qué hace que un CV se vea profesional",
          paragraphs: [
            "No depende solo de colores o diseño. Un CV profesional se nota cuando tiene foco, usa un lenguaje claro, evita exageraciones y hace fácil entender el recorrido laboral del candidato.",
            "La claridad visual y la calidad del contenido permiten entender rápido si el perfil coincide con el puesto. Un diseño atractivo no compensa información genérica, desordenada o difícil de comprobar.",
            "También importa que cada bloque tenga peso real. Perfil, experiencia, estudios y habilidades deben colaborar para contar una historia coherente sobre quién sos y para qué puesto encajás.",
          ],
        },
        {
          title: "Cómo pasar de un CV común a uno más fuerte",
          paragraphs: [
            "Suele haber mejoras simples con mucho impacto: resumir mejor el perfil, describir experiencias con más criterio, eliminar ruido y usar una estructura más limpia.",
            "Cuando ademas trabajas el documento pensando en ATS y en lectura humana, el resultado sube un escalon completo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Un CV profesional sirve para cualquier rubro?",
          answer:
            "Sí. La idea se adapta a distintos perfiles, siempre que ajustes el contenido al puesto objetivo.",
        },
        {
          question: "¿Necesito mucha experiencia para que se vea profesional?",
          answer:
            "No. Incluso perfiles iniciales pueden verse profesionales si el contenido esta bien enfocado y ordenado.",
        },
        {
          question: "¿Puedo usarlo para actualizar un CV viejo?",
          answer:
            "Sí. De hecho, es uno de los mejores usos: llevar un documento antiguo a una versión mucho más competitiva.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Usa un flujo guiado para convertir estas ideas en accion concreta.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Generador de CV con IA",
          description:
            "Refuerza tu redacción y acelera la mejora del contenido.",
        },
        {
          href: "/blog/como-hacer-un-cv-profesional",
          title: "Cómo hacer un CV profesional",
          description:
            "Guía de apoyo para entender que cambios elevan realmente el documento.",
        },
      ]}
    />
  );
}
