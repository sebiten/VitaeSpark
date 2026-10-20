import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plantilla Harvard vs Moderna: Cuál Hace que tu CV Destaque",
  description:
    "Compará la plantilla Harvard con diseños modernos. Compatibilidad ATS, impacto visual, casos de uso y cómo elegir según tu industria y experiencia.",
  path: "/comparar/plantilla-harvard-vs-moderna",
  keywords: [
    "plantilla harvard vs moderna",
    "formato harvard vs moderno currículum",
    "mejor plantilla cv 2026",
    "plantilla cv formal vs creativa",
  ],
});

export default function PlantillaHarvardVsModernaPage() {
  return (
    <MarketingPage
      path="/comparar/plantilla-harvard-vs-moderna"
      eyebrow="Comparación"
      title="Plantilla Harvard vs Moderna: Cuál Hace que tu CV Destaque"
      description="La plantilla Harvard transmite autoridad y orden; la moderna aporta frescura y adaptación a industrias contemporaneas. Conoce cual conviene según tu perfil y objetivo."
      intro={[
        "Elegir entre una plantilla Harvard y una moderna no es solo una cuestión de gusto personal. Cada formato comunica algo diferente a los reclutadores y tiene distinta efectividad según la industria, el nivel de experiencia y el tipo de proceso de selección.",
        "La plantilla Harvard prioriza la claridad y la jerarquía profesional. La moderna busca un equilibrio entre diseño y legibilidad, con más flexibilidad visual.",
      ]}
      benefits={[
        "Claridad inmediata: los reclutadores encuentran la información en segundos.",
        "Proyección de profesionalismo y orden en procesos formales.",
        "Secciones reconocibles y texto legible para facilitar la lectura del CV.",
        "Diseño limpio que no distrae del contenido.",
      ]}
      steps={[
        {
          title: "Definí el nivel de formalidad de tu industria",
          description:
            "Consultoría, finanzas, derecho, salud e instituciones académicas suelen valorar formatos más sobrios. Tecnología, marketing digital, diseño y startups admiten más flexibilidad visual.",
        },
        {
          title: "Evaluá cuánto contenido tenés para mostrar",
          description:
            "Harvard funciona mejor con trayectorias extensas y bien definidas. Para perfiles con menos experiencia, una plantilla moderna puede equilibrar mejor el espacio.",
        },
        {
          title: "Probá ambas con tu información real",
          description:
            "En VitaeSpark podés comparar plantillas antes de pagar sin perder contenido. Después, ese CV queda asociado a la plantilla elegida.",
        },
      ]}
      sections={[
        {
          title: "Características de la plantilla Harvard",
          paragraphs: [
            "La plantilla Harvard se distingue por su diseño limpio, monocromático o con acentos muy sutiles. Usa fuentes profesionales (generalmente sans-serif), secciones bien definidas y orden cronológico inverso. No incluye elementos decorativos ni colores llamativos.",
            "Su principal ventaja es la consistencia: los reclutadores saben exactamente dónde buscar cada sección. Esta familiaridad reduce la fricción en la lectura y transmite profesionalismo de forma inmediata.",
          ],
        },
        {
          title: "Características de una plantilla moderna",
          paragraphs: [
            "Las plantillas modernas de CV incluyen elementos gráficos como íconos, barras de habilidades visuales, gradientes sutiles o secciones con diseño más elaborado. Buscan diferenciarse visualmente mientras mantienen la legibilidad.",
            "Funcionan bien en industrias donde la creatividad o la capacidad de innovación son valoradas. El riesgo es que un diseño demasiado elaborado pueda distraer o no ser compatible con sistemas ATS.",
          ],
        },
        {
          title: "Comparación visual: Harvard vs Moderna",
          paragraphs: [
            "Observa la jerarquía de ambos diseños: dónde aparecen el nombre, el puesto y los antecedentes relevantes. No asumas que todos los empleadores de un sector prefieren una apariencia concreta.",
            "Esto no significa que una sea mejor que la otra. Significa que cada una sirve para contextos distintos y que la decisión debe basarse en el objetivo laboral, no en preferencias personales.",
          ],
        },
        {
          title: "Cuál elegir según tu caso",
          paragraphs: [
            "Compara cómo queda tu información en ambos formatos. Elige el que permita leer cargos, fechas y formación sin cortes ni bloques demasiado densos. La plantilla no sustituye experiencia ni determina la preferencia de cada reclutador.",
            "Revisa el documento exportado, además de la vista previa. Comprueba el tamaño del texto y el orden de lectura, y sigue las indicaciones del portal de empleo antes de decidir el formato.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿La plantilla moderna es compatible con sistemas ATS?",
          answer:
            "Las plantillas modernas de VitaeSpark están diseñadas para mantener compatibilidad ATS. Evitan tablas complejas, fuentes no estándar e imágenes que interfieran con la lectura automatizada.",
        },
        {
          question: "¿Cuándo puedo cambiar de plantilla?",
          answer:
            "Podés comparar plantillas durante la creación antes de pagar. Después del pago, ese CV queda editable desde tu perfil, pero asociado a la plantilla elegida.",
        },
        {
          question: "¿Qué plantilla conviene para un primer empleo?",
          answer:
            "Ambas pueden servir para un primer empleo si permiten destacar formación, proyectos y habilidades reales. Elige según la claridad del contenido y los requisitos de la postulación.",
        },
        {
          question: "¿La plantilla moderna pasa desapercibida en procesos formales?",
          answer:
            "Depende del nivel de formalidad del proceso. En un banco o estudio jurídico, una plantilla moderna podría no ser la mejor opción. En una empresa tecnológica o agencia creativa, puede ser bien recibida.",
        },
      ]}
      relatedLinks={[
        {
          href: "/plantilla-harvard",
          title: "Plantilla Harvard",
          description:
            "Descargá la plantilla Harvard con estructura optimizada para procesos formales.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Todas las Plantillas",
          description:
            "Conocé las 7 plantillas disponibles y cuál se adapta mejor a tu perfil.",
        },
        {
          href: "/",
          title: "Crear mi CV",
          description:
            "Construí tu currículum con la plantilla que prefieras y descárgalo en PDF.",
        },
        {
          href: "/curriculum-ats",
          title: "CV ATS",
          description:
            "Optimizá tu currículum para pasar filtros automáticos sin sacrificar diseño.",
        },
      ]}
    />
  );
}
