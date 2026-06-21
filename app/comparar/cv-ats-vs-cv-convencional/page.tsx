import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV ATS vs CV Convencional: Guía para Elegir el Mejor Formato",
  description:
    "Entendé las diferencias entre un CV preparado para ATS y uno convencional. Compatibilidad, legibilidad, estructura y cuándo usar cada uno.",
  path: "/comparar/cv-ats-vs-cv-convencional",
  keywords: [
    "cv ats vs cv convencional",
    "curriculum ats vs tradicional",
    "formato ats curriculum",
    "pasar filtros ats",
  ],
});

export default function CvAtsVsConvencionalPage() {
  return (
    <MarketingPage
      path="/comparar/cv-ats-vs-cv-convencional"
      eyebrow="Comparación"
      title="CV ATS vs CV Convencional: Guía para Elegir el Mejor Formato"
      description="Más del 75% de los currículums son descartados antes de ser vistos por una persona. Conocé cómo un CV preparado para ATS cambia tus probabilidades de pasar la primera barrera."
      intro={[
        "Un CV ATS está diseñado específicamente para ser leído por sistemas de seguimiento de candidatos, que escanean documentos en busca de palabras clave, estructura y formato. Un CV convencional no considera estos factores y puede ser difícil de procesar para el software.",
        "La diferencia clave está en la estructura y el contenido: un CV ATS usa títulos de sección estándar, evita elementos gráficos y prioriza la claridad para que un algoritmo pueda interpretar correctamente la información.",
        "Según datos de Jobscan, el 98% de las empresas Fortune 500 usan sistemas ATS, y aproximadamente el 75% de los currículums son descartados antes de que un reclutador los vea, según TopResume.",
      ]}
      benefits={[
        "Mayor probabilidad de pasar filtros automáticos en procesos de selección.",
        "Contenido bien estructurado que también facilita la lectura humana.",
        "Palabras clave alineadas con el puesto objetivo.",
        "Formato profesional estandarizado reconocido por reclutadores.",
      ]}
      steps={[
        {
          title: "Identificá las palabras clave del puesto",
          description:
            "Revisá la oferta laboral y extraé las habilidades, herramientas y términos que aparecen. Esos conceptos deben estar en tu CV de forma natural.",
        },
        {
          title: "Usá títulos de sección estándar",
          description:
            "El ATS espera encontrar secciones como 'Experiencia Laboral', 'Educación', 'Habilidades'. Evitá títulos creativos o informales que el sistema no pueda interpretar.",
        },
        {
          title: "Descargá en formato compatible",
          description:
            "VitaeSpark genera PDFs optimizados para lectura ATS. Descargá tu CV y verificá que se lea correctamente antes de enviarlo.",
        },
      ]}
      sections={[
        {
          title: "Qué es un CV preparado para ATS",
          paragraphs: [
            "Un CV ATS está formateado para que los sistemas de seguimiento de candidatos puedan escanear, interpretar y clasificar tu información sin errores. Esto implica usar fuentes estándar, evitar tablas o columnas complejas, incluir palabras clave relevantes y estructurar las secciones de forma predecible.",
            "El objetivo no es 'engañar' al sistema sino asegurar que tu información se lea correctamente y se compare favorablemente con la de otros candidatos que pasaron por el mismo proceso.",
          ],
        },
        {
          title: "Qué es un CV convencional",
          paragraphs: [
            "Un CV convencional no está diseñado pensando en sistemas automatizados. Puede tener formato libre, elementos visuales, tablas, columnas múltiples o títulos de sección personalizados que una persona entendería bien pero un ATS no podría clasificar correctamente.",
            "Esto no significa que sea peor: puede ser más creativo y visualmente atractivo. El problema es que depende del tipo de proceso y de si el reclutador usa o no sistemas de cribado automático.",
          ],
        },
        {
          title: "Diferencias clave entre ambos formatos",
          paragraphs: [
            "Estructura: ATS requiere títulos de sección estándar y orden predecible. Convencional permite más自由.",
            "Formato visual: ATS funciona mejor con texto plano, sin elementos gráficos. Convencional puede incluir diseño.",
            "Palabras clave: ATS las usa para puntuar tu perfil contra la vacante. Convencional no las prioriza.",
            "Compatibilidad: ATS funciona en todo tipo de procesos. Convencional puede fallar en empresas que usan screening automático.",
          ],
        },
        {
          title: "Cuál conviene según tu situación",
          paragraphs: [
            "Si estás aplicando a empresas grandes, multinacionales o procesos formales, un CV ATS es casi obligatorio. Si aplicás a empresas pequeñas, startups o procesos informales, un CV convencional bien redactado puede funcionar.",
            "La buena noticia es que un CV bien estructurado para ATS también se lee perfectamente por personas, así que no perdés nada por seguir este formato.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Un CV ATS parece aburrido visualmente?",
          answer:
            "No necesariamente. VitaeSpark diseña plantillas ATS que mantienen una buena presentación visual sin sacrificar la compatibilidad con los sistemas de seguimiento.",
        },
        {
          question: "Tengo que eliminar todo diseño para que funcione en ATS?",
          answer:
            "No. Un diseño limpio y profesional es compatible con ATS. Lo que hay que evitar son elementos como tablas complejas, imágenes o columnas múltiples que el software no pueda interpretar.",
        },
        {
          question: "Las palabras clave son lo mismo que 'llenar' el CV de términos?",
          answer:
            "No. Las palabras clave deben aparecer de forma natural y representar habilidades o experiencia real. Forzarlas sin contexto hace que el CV pierda calidad y可能被 ATS penalizar.",
        },
        {
          question: "Puedo usar el mismo CV para procesos con y sin ATS?",
          answer:
            "Sí. Un CV bien estructurado para ATS también funciona en procesos convencionales. La clave es mantener siempre la claridad y estructura estándar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description:
            "Guía completa para preparar tu CV paso a paso para sistemas ATS.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV Online",
          description:
            "Construí tu CV con estructura ATS automática y descarga en PDF.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de CV",
          description:
            "6 plantillas profesionales optimizadas para ATS y con buen diseño.",
        },
        {
          href: "/blog/como-hacer-un-cv-ats",
          title: "Guía CV ATS",
          description:
            "Aprendé los conceptos básicos para que tu CV pase filtros automáticos.",
        },
      ]}
    />
  );
}
