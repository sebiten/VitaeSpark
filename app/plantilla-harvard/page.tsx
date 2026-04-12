import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plantilla Harvard para Curriculum",
  description:
    "Descubre cuando conviene usar una plantilla Harvard y como aprovechar su estructura para un curriculum claro, serio y profesional.",
  path: "/plantilla-harvard",
  keywords: [
    "plantilla harvard curriculum",
    "cv harvard",
    "plantilla harvard cv",
    "curriculum harvard",
    "formato harvard curriculum",
  ],
});

export default function PlantillaHarvardPage() {
  return (
    <MarketingPage
      path="/plantilla-harvard"
      eyebrow="Plantilla Harvard"
      title="Plantilla Harvard para un curriculum claro, serio y profesional"
      description="Descubre cuando conviene usar una plantilla Harvard, como aprovechar su estructura y por que sigue siendo una referencia fuerte para CVs formales y legibles."
      intro={[
        "La plantilla Harvard sigue siendo una de las referencias mas buscadas porque prioriza claridad, orden y contenido. Es una opcion muy valorada cuando quieres un curriculum profesional sin distracciones visuales y con foco en experiencia, formacion y habilidades.",
        "En VitaeSpark puedes trabajar con una estructura orientada a este tipo de presentacion, cuidando la legibilidad y la forma en que se cuenta tu perfil profesional. Eso la vuelve especialmente util para postulaciones academicas, corporativas o tecnicas.",
      ]}
      benefits={[
        "Formato sobrio y facil de leer para reclutadores y equipos de seleccion.",
        "Buena estructura para perfiles profesionales, tecnicos y academicos.",
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
          title: "Exporta una version limpia",
          description:
            "Obtienes un CV serio y listo para procesos de seleccion exigentes.",
        },
      ]}
      sections={[
        {
          title: "Cuando conviene una plantilla Harvard",
          paragraphs: [
            "Suele ser una buena opcion cuando quieres que el contenido tenga todo el protagonismo. Funciona muy bien en perfiles con experiencia, postulaciones corporativas, consultoria, tecnologia, salud y entornos donde se valora una presentacion clara y formal.",
            "Tambien es util cuando necesitas adaptar el CV a varias vacantes, porque su estructura ordenada facilita actualizar logros, responsabilidades y resumen profesional sin perder consistencia visual.",
          ],
        },
        {
          title: "Que cuidar al usar esta estructura",
          paragraphs: [
            "El principal riesgo de una plantilla sobria es pensar que cualquier texto funciona. En realidad, cuanto mas limpia es la presentacion, mas importante se vuelve la calidad del contenido. Si el resumen es generico o la experiencia esta mal explicada, se nota enseguida.",
            "Por eso conviene combinar un formato tipo Harvard con una redaccion clara, enfocada en logros y alineada al puesto buscado. Esa mezcla suele generar el mejor resultado.",
          ],
        },
      ]}
      faqs={[
        {
          question: "La plantilla Harvard sirve para ATS?",
          answer:
            "Suele funcionar bien porque prioriza estructura clara y contenido legible, dos cosas muy valiosas para procesos automatizados.",
        },
        {
          question: "Es solo para perfiles senior?",
          answer:
            "No. Tambien puede servir para perfiles junior si quieres una presentacion sobria y profesional.",
        },
        {
          question: "Conviene mas que una plantilla muy visual?",
          answer:
            "Depende del rubro, pero para muchas postulaciones laborales la claridad suele rendir mejor que el exceso de diseno.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Prepara el contenido y llevalo a una plantilla lista para descargar.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description:
            "Descubre por que una estructura clara tambien ayuda en filtros automaticos.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description:
            "Repasa la base del contenido antes de elegir tu formato final.",
        },
      ]}
    />
  );
}
