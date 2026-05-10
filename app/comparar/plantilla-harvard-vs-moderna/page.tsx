import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Plantilla Harvard vs Moderna: Cuál Hace que tu CV Destaque",
  description:
    "Compará la plantilla Harvard con diseños modernos. Compatibilidad ATS, impacto visual, casos de uso y cómo elegir según tu industria y experiencia.",
  path: "/comparar/plantilla-harvard-vs-moderna",
  keywords: [
    "plantilla harvard vs moderna",
    "formato harvard vs moderno curriculum",
    "mejor plantilla cv 2025",
    "plantilla cv formal vs creativa",
  ],
});

export default function PlantillaHarvardVsModernaPage() {
  return (
    <MarketingPage
      path="/comparar/plantilla-harvard-vs-moderna"
      eyebrow="Comparación"
      title="Plantilla Harvard vs Moderna: Cuál Hace que tu CV Destaque"
      description="La plantilla Harvard transmite autoridad y orden; la moderna aporta свежесть y adaptación a industrias contemporáneas. Conocé cuál conviene según tu perfil y objetivo."
      intro={[
        "Elegir entre una plantilla Harvard y una moderna no es solo una cuestión de gusto personal. Cada formato comunica algo diferente a los reclutadores y tiene distinta efectividad según la industria, el nivel de experiencia y el tipo de proceso de selección.",
        "La plantilla Harvard prioriza la claridad y la jerarquía profesional. La moderna busca un equilibrio entre diseño y legibilidad, con más flexibilidad visual.",
      ]}
      benefits={[
        "Claridad inmediata: los reclutadores encuentran la información en segundos.",
        "Proyección de profesionalismo y orden en procesos formales.",
        "Máxima compatibilidad con sistemas ATS y cribado automático.",
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
            "En VitaeSpark podés cambiar entre plantillas sin perder contenido. Compará cómo se ve tu CV en Harvard y en moderna antes de decidir.",
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
            "En una evaluación rápida, Harvard comunica orden y seriedad; moderna comunica versatilidad y adaptación. Un reclutador en un banco o estudio jurídico probablemente prefiera la claridad de Harvard; uno en una startup tecnológica puede valorar más la creatividad.",
            "Esto no significa que una sea mejor que la otra. Significa que cada una sirve para contextos distintos y que la decisión debe basarse en el objetivo laboral, no en preferencias personales.",
          ],
        },
        {
          title: "Cuál elegir según tu caso",
          paragraphs: [
            "Para perfiles senior con experiencia sólida en industrias formales, Harvard es la opción más segura y proyectualmente más fuerte. Para perfiles en industrias creativas, tecnológicas o con menos experiencia, una plantilla moderna bien diseñada puede ser más efectiva.",
            "La clave es que el diseño no sacrifique la legibilidad. Ambas plantillas de VitaeSpark están optimizadas para ATS y para lectura humana, así que la decisión se reduce a cuál transmite mejor tu perfil profesional.",
          ],
        },
      ]}
      faqs={[
        {
          question: "La plantilla moderna es compatible con sistemas ATS?",
          answer:
            "Las plantillas modernas de VitaeSpark están diseñadas para mantener compatibilidad ATS. Evitan tablas complejas, fuentes no estándar e imágenes que interfieran con la lectura automatizada.",
        },
        {
          question: "Puedo cambiar de plantilla después de crear mi CV?",
          answer:
            "Sí, en VitaeSpark podés cambiar de plantilla en cualquier momento. El contenido se adapta automáticamente al nuevo formato sin que pierdas información.",
        },
        {
          question: "Qué plantilla conviene para un primer empleo?",
          answer:
            "Harvard o moderna con diseño limpio son buenas opciones. Lo importante es que el CV se vea completo y profesional, no que tenga un diseño muy elaborada que genere expectativas.",
        },
        {
          question: "La plantilla moderna pasa desapercibida en procesos formales?",
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
            "Conocé las 5 plantillas disponibles y cuál se adapta mejor a tu perfil.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear mi CV",
          description:
            "Construí tu currículum con la plantilla que prefieras y descargalo en PDF.",
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