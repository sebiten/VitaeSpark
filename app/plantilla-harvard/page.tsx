import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plantilla Harvard para Currículum: Cuándo y Cómo Usarla",
  description:
    "Descubre cuándo conviene usar una plantilla Harvard y cómo aprovechar su estructura para un currículum claro, serio y profesional.",
  path: "/plantilla-harvard",
  keywords: [
    "plantilla harvard currículum",
    "cv harvard",
    "plantilla harvard cv",
    "currículum harvard",
    "formato harvard currículum",
  ],
});

export default function PlantillaHarvardPage() {
  return (
    <MarketingPage
      path="/plantilla-harvard"
      eyebrow="Plantilla Harvard"
      title="Plantilla Harvard para un currículum claro, serio y profesional"
      description="Descubre cuando conviene usar una plantilla Harvard, como aprovechar su estructura y por que sigue siendo una referencia fuerte para CVs formales y legibles."
      intro={[
        "La plantilla Harvard sigue siendo una de las referencias más buscadas porque prioriza claridad, orden y contenido. Es una opción muy valorada cuando quieres un currículum profesional sin distracciones visuales y con foco en experiencia, formación y habilidades.",
        "En VitaeSpark puedes trabajar con una estructura orientada a este tipo de presentación, cuidando la legibilidad y la forma en que se cuenta tu perfil profesional. Eso la vuelve especialmente útil para postulaciones académicas, corporativas o técnicas.",
      ]}
      benefits={[
        "Formato sobrio y fácil de leer para reclutadores y equipos de selección.",
        "Buena estructura para perfiles profesionales, técnicos y académicos.",
        "Ideal para priorizar contenido antes que efectos visuales.",
      ]}
      steps={[
        {
          title: "Define tu objetivo profesional",
          description:
            "La estructura funciona mejor cuando sabes a que tipo de rol apuntas.",
        },
        {
          title: "Resume tu experiencia con criterio",
          description:
            "Una plantilla Harvard luce mejor cuando el contenido es concreto y bien jerarquizado.",
        },
        {
          title: "Exporta una versión limpia",
          description:
            "Obtienes un CV serio y listo para procesos de selección exigentes.",
        },
      ]}
      sections={[
        {
          title: "Cuándo conviene una plantilla Harvard",
          paragraphs: [
            "Suele ser una buena opción cuando quieres que el contenido tenga todo el protagonismo. Funciona muy bien en perfiles con experiencia, postulaciones corporativas, consultoria, tecnologia, salud y entornos donde se valora una presentación clara y formal.",
            "También es útil cuando necesitas adaptar el CV a varias vacantes, porque su estructura ordenada facilita actualizar logros, responsabilidades y resumen profesional sin perder consistencia visual.",
          ],
        },
        {
          title: "Qué cuidar al usar esta estructura",
          paragraphs: [
            "El principal riesgo de una plantilla sobria es pensar que cualquier texto funciona. En realidad, cuanto más limpia es la presentación, más importante se vuelve la calidad del contenido. Si el resumen es genérico o la experiencia esta mal explicada, se nota enseguida.",
            "Por eso conviene combinar un formato tipo Harvard con una redacción clara, enfocada en logros y alineada al puesto buscado. Esa mezcla suele generar el mejor resultado.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿La plantilla Harvard sirve para ATS?",
          answer:
            "Suele funcionar bien porque prioriza estructura clara y contenido legible, dos cosas muy valiosas para procesos automatizados.",
        },
        {
          question: "¿Es solo para perfiles senior?",
          answer:
            "No. También puede servir para perfiles junior si quieres una presentación sobria y profesional.",
        },
        {
          question: "¿Conviene más que una plantilla muy visual?",
          answer:
            "Depende del rubro, pero para muchas postulaciones laborales la claridad suele rendir mejor que el exceso de diseño.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Prepara el contenido y llévalo a una plantilla lista para descargar.",
        },
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description:
            "Descubre por que una estructura clara también ayuda en filtros automáticos.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum",
          description:
            "Repasa la base del contenido antes de elegir tu formato final.",
        },
      ]}
    />
  );
}
