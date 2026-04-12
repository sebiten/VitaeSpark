import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hacer CV Online",
  description:
    "Haz tu CV online con una herramienta pensada para ordenar tu perfil, mejorar la redaccion y descargar un PDF profesional.",
  path: "/hacer-cv-online",
  keywords: [
    "hacer cv online",
    "hacer curriculum online",
    "armar cv online",
    "crear cv online",
  ],
});

export default function HacerCvOnlinePage() {
  return (
    <MarketingPage
      path="/hacer-cv-online"
      eyebrow="Hacer CV online"
      title="Hacer un CV online sin perder tiempo ni claridad"
      description="Crea un curriculum online con una estructura profesional, redaccion mejorada y enfoque practico para conseguir entrevistas."
      intro={[
        "Si lo que necesitas es hacer un CV online rapido, la clave no es terminar cuanto antes a cualquier precio. La clave es terminar con un documento que realmente te sirva para buscar trabajo mejor.",
        "VitaeSpark combina rapidez con estructura y contenido, para que el resultado final no sea solo un PDF mas, sino un CV que comunique mejor tu perfil profesional.",
      ]}
      benefits={[
        "Te guia paso a paso incluso si partes desde cero.",
        "Reduce el tiempo entre idea, contenido y CV final.",
        "Mantiene una presentacion profesional sin complicarte.",
      ]}
      steps={[
        {
          title: "Elige una base profesional",
          description:
            "Partes de una estructura clara y una plantilla lista para adaptarse a tu perfil.",
        },
        {
          title: "Completa y mejora tu informacion",
          description:
            "Refuerza experiencia, habilidades y resumen profesional con IA.",
        },
        {
          title: "Exporta y postulate",
          description: "Descarga un PDF listo para usar en tus vacantes.",
        },
      ]}
      sections={[
        {
          title: "Cuando conviene hacer tu CV online",
          paragraphs: [
            "Es especialmente util cuando necesitas actualizarlo rapido, adaptarlo a varias postulaciones o crear una version profesional sin pelearte con el formato.",
            "Tambien ayuda mucho si tu CV actual esta desordenado o si directamente no tienes uno armado todavia.",
          ],
        },
        {
          title: "Que cambia respecto a hacerlo por tu cuenta",
          paragraphs: [
            "La mayor diferencia suele estar en el tiempo y en la claridad del resultado. Un flujo guiado evita errores comunes, vacios en el contenido y problemas de estructura.",
            "Si ademas incorpora ayuda para redactar mejor, la mejora se nota mucho mas en el resultado final.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo hacerlo aunque no tenga experiencia?",
          answer:
            "Si. La herramienta tambien sirve para destacar estudios, proyectos y habilidades cuando estas empezando.",
        },
        {
          question: "Sirve para adaptar el CV a distintas vacantes?",
          answer:
            "Si. Hacerlo online facilita mucho ajustar contenido y seguir mejorandolo.",
        },
        {
          question: "Necesito conocimientos de diseno?",
          answer:
            "No. La idea es que la estructura profesional ya venga resuelta.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Profundiza el flujo principal del producto.",
        },
        {
          href: "/generador-de-cv-con-ia",
          title: "Generador de CV con IA",
          description: "Mira una alternativa mas enfocada en la ayuda de IA.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description: "Repasa la estructura ideal antes de construirlo.",
        },
      ]}
    />
  );
}
