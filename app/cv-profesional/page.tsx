import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Profesional",
  description:
    "Crea un CV profesional con mejor estructura, redaccion mas clara y una presentacion pensada para reclutadores y procesos actuales.",
  path: "/cv-profesional",
  keywords: [
    "cv profesional",
    "curriculum profesional",
    "hacer cv profesional",
    "crear curriculum profesional",
    "modelo de cv profesional",
  ],
});

export default function CvProfesionalPage() {
  return (
    <MarketingPage
      path="/cv-profesional"
      eyebrow="CV profesional"
      title="CV profesional para mostrar mejor tu experiencia y conseguir mas entrevistas"
      description="Pasa de un curriculum generico a un CV profesional con mejor redaccion, mas claridad y una presentacion mucho mas competitiva."
      intro={[
        "Muchas personas sienten que su CV no representa bien lo que saben hacer. A veces no falta experiencia, sino una forma mas profesional de contarla y presentarla.",
        "Un CV profesional combina tres cosas: estructura clara, contenido bien escrito y una plantilla que ayude a leer rapido lo importante. Ese equilibrio puede mejorar mucho tus postulaciones.",
      ]}
      benefits={[
        "Mejora el tono y la claridad del contenido.",
        "Te ayuda a ordenar mejor experiencia, logros y habilidades.",
        "Deja una impresion mas solida en procesos de seleccion reales.",
      ]}
      steps={[
        {
          title: "Carga tu informacion principal",
          description:
            "Experiencia, estudios, habilidades y objetivo profesional.",
        },
        {
          title: "Refina estructura y redaccion",
          description:
            "Transforma informacion suelta en un CV mas creible y facil de leer.",
        },
        {
          title: "Exporta una version lista para postularte",
          description:
            "Termina con una presentacion final mucho mas profesional.",
        },
      ]}
      sections={[
        {
          title: "Que hace que un CV se vea profesional",
          paragraphs: [
            "No depende solo de colores o diseño. Un CV profesional se nota cuando tiene foco, usa un lenguaje claro, evita exageraciones y hace facil entender el recorrido laboral del candidato.",
            "Tambien importa que cada bloque tenga peso real. Perfil, experiencia, estudios y habilidades deben colaborar para contar una historia coherente.",
          ],
        },
        {
          title: "Como pasar de un CV comun a uno mas fuerte",
          paragraphs: [
            "Suele haber mejoras simples con mucho impacto: resumir mejor el perfil, describir experiencias con mas criterio, eliminar ruido y usar una estructura mas limpia.",
            "Cuando ademas trabajas el documento pensando en ATS y en lectura humana, el resultado sube un escalon completo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Un CV profesional sirve para cualquier rubro?",
          answer:
            "Si. La idea se adapta a distintos perfiles, siempre que ajustes el contenido al puesto objetivo.",
        },
        {
          question: "Necesito mucha experiencia para que se vea profesional?",
          answer:
            "No. Incluso perfiles iniciales pueden verse profesionales si el contenido esta bien enfocado y ordenado.",
        },
        {
          question: "Puedo usarlo para actualizar un CV viejo?",
          answer:
            "Si. De hecho, es uno de los mejores usos: llevar un documento antiguo a una version mucho mas competitiva.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Usa un flujo guiado para convertir estas ideas en accion concreta.",
        },
        {
          href: "/generador-de-cv-con-ia",
          title: "Generador de CV con IA",
          description:
            "Refuerza tu redaccion y acelera la mejora del contenido.",
        },
        {
          href: "/blog/como-hacer-un-cv-profesional",
          title: "Como hacer un CV profesional",
          description:
            "Guia de apoyo para entender que cambios elevan realmente el documento.",
        },
      ]}
    />
  );
}
