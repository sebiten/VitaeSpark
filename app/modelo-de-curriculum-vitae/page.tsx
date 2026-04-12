import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Modelo de Curriculum Vitae",
  description:
    "Encuentra un modelo de curriculum vitae profesional y claro para usar como referencia antes de crear tu CV final.",
  path: "/modelo-de-curriculum-vitae",
  keywords: [
    "modelo de curriculum vitae",
    "modelo curriculum vitae",
    "ejemplo curriculum vitae",
    "plantilla curriculum vitae",
  ],
});

export default function ModeloDeCurriculumVitaePage() {
  return (
    <MarketingPage
      path="/modelo-de-curriculum-vitae"
      eyebrow="Modelo de CV"
      title="Modelo de curriculum vitae para usar como referencia profesional"
      description="Explora una estructura clara y profesional para entender como deberia verse un curriculum antes de crear el tuyo."
      intro={[
        "Buscar un modelo de curriculum vitae suele ser el primer paso cuando no sabes por donde empezar. La ventaja de una buena referencia es que te ayuda a entender orden, secciones y nivel de detalle sin improvisar todo desde cero.",
        "En VitaeSpark puedes tomar esa referencia y convertirla en un CV propio, con contenido mejor redactado y una presentacion lista para enviar.",
      ]}
      benefits={[
        "Sirve como referencia para ordenar contenido y estructura.",
        "Ayuda a entender que secciones pesan mas en un CV moderno.",
        "Te permite pasar de ejemplo a version propia sin perder tiempo.",
      ]}
      steps={[
        {
          title: "Mira una estructura clara",
          description:
            "Identifica como se ordenan perfil, experiencia, estudios y habilidades.",
        },
        {
          title: "Adapta el contenido a tu caso",
          description:
            "No copies un modelo vacio: transformalo en una version propia y util.",
        },
        {
          title: "Cierra con una plantilla final",
          description:
            "Lleva esa referencia a un CV listo para descargar y usar.",
        },
      ]}
      sections={[
        {
          title: "Para que sirve un modelo de curriculum vitae",
          paragraphs: [
            "Sirve para darte una base mental clara: que va primero, que secciones incluir y como presentar tu informacion con mas criterio.",
            "Eso reduce bastante el bloqueo inicial y ayuda a evitar errores comunes de estructura o contenido.",
          ],
        },
        {
          title: "Que no deberias hacer con un modelo",
          paragraphs: [
            "Lo peor que puedes hacer es copiar frases genericas sin adaptar nada. Un modelo es una referencia, no una solucion final.",
            "La verdadera mejora aparece cuando usas esa base para construir un CV alineado con tu perfil, tu experiencia y el puesto que buscas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene partir de un modelo o de una plantilla?",
          answer:
            "Ambos ayudan, pero un modelo te da referencia de contenido y una plantilla te resuelve la presentacion visual.",
        },
        {
          question: "Puedo usar este enfoque si nunca hice un CV?",
          answer:
            "Si. De hecho, es uno de los casos donde mas valor aporta empezar con una referencia clara.",
        },
        {
          question: "Sirve tambien para actualizar un CV viejo?",
          answer:
            "Si. Compararte con una estructura moderna ayuda mucho a detectar que mejorar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de curriculum",
          description: "Pasa del modelo de referencia a una estructura lista para usar.",
        },
        {
          href: "/crear-curriculum-vitae",
          title: "Crear curriculum vitae",
          description: "Transforma la referencia en un CV propio y profesional.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description: "Asegura que el contenido del modelo tenga sentido para tu perfil.",
        },
      ]}
    />
  );
}
