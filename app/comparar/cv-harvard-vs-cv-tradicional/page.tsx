import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Harvard vs CV Tradicional: Cual Conviene en 2026",
  description:
    "Compará el formato Harvard y el currículum tradicional. Estructura, compatibilidad ATS, casos de uso y cuál conviene según tu perfil profesional.",
  path: "/comparar/cv-harvard-vs-cv-tradicional",
  keywords: [
    "cv harvard vs cv tradicional",
    "formato harvard curriculum",
    "curriculum tradicional vs moderno",
    "mejor formato cv",
  ],
});

export default function CvHarvardVsTradicionalPage() {
  return (
    <MarketingPage
      path="/comparar/cv-harvard-vs-cv-tradicional"
      eyebrow="Comparación"
      title="CV Harvard vs CV Tradicional: Cual Conviene en 2026"
      description="Si tenés que elegir entre el formato Harvard y un currículum tradicional, esta guía te ayuda a decidir cuál se adapta mejor a tu perfil, industria y objetivo laboral."
      intro={[
        "El formato Harvard es uno de los más reconocidos a nivel mundial para presentar trayectoria profesional. Su estructura clara y jerárquica lo hace fácil de leer tanto para personas como para sistemas automatizados. El CV tradicional, en cambio, tiene variantes muy diversas y no siempre garantiza la misma legibilidad.",
        "La diferencia entre ambos formatos no es solo visual: afecta cómo un reclutador interpreta tu experiencia, qué peso da a cada sección y qué tan rápido puede encontrar la información que busca.",
      ]}
      benefits={[
        "Estructura clara que facilita la lectura rápida por parte de recruiters.",
        "Mejor compatibilidad con sistemas ATS por su formato estandarizado.",
        "Proyección de seriedad y orden profesional en procesos formales.",
        "Facilita la comparación entre candidatos en etapas iniciales.",
      ]}
      steps={[
        {
          title: "Evaluá tu industria y nivel de formalidad",
          description:
            "Si buscás empleo en consultoría, finanzas, derecho o académico, Harvard suele ser la opción más segura. Para industrias creativas o startups, evaluá si el perfil lo permite.",
        },
        {
          title: "Analizá tu nivel de experiencia",
          description:
            "Harvard funciona bien con trayectorias longas y bien definidas. Si recién arrancás, un formato más moderno podría ayudarte a compensar la falta de experiencia.",
        },
        {
          title: "Testeá ambos formatos con tu contenido real",
          description:
            "En VitaeSpark podés ver cómo queda tu información en ambas estructuras antes de decidir. Cargá tus datos y compará.",
        },
      ]}
      sections={[
        {
          title: "Qué es el formato Harvard para CV",
          paragraphs: [
            "El formato Harvard de currículum se caracteriza por una estructura cronológica inversa: la experiencia más reciente aparece primero, con títulos claros, fechas en orden descendente y secciones bien delimitadas. Busca transmitir orden, jerarquía y profesionalismo sin elementos decorativos.",
            "Este formato nació en el ámbito académico y corporativo, y se consolidó como estándar en procesos de selección formales. Su diseño limpio facilita que un reclutador escanee el documento en segundos y encuentre lo que busca.",
          ],
        },
        {
          title: "Qué es un CV tradicional",
          paragraphs: [
            "Un CV tradicional puede referirse a cualquier formato que no siga reglas estandarizadas tan estrictas. Incluye estructuras cronológicas simples, sin diseño visual, a veces con secciones informales o poco definidas.",
            "La ventaja es la flexibilidad; la desventaja es que la legibilidad depende completamente de quién lo escribió. No hay garantías de que un reclutador pueda encontrar la información clave rápidamente.",
          ],
        },
        {
          title: "Comparación directa: Harvard vs Tradicional",
          paragraphs: [
            "La principal diferencia está en la consistencia. Harvard siempre tiene la misma estructura: datos de contacto, perfil profesional, experiencia, educación y habilidades. Un reclutador sabe exactamente dónde buscar cada cosa.",
            "El formato tradicional puede variar enormemente de un candidato a otro, lo cual puede funcionar bien si el contenido es fuerte, pero puede jugar en contra si la estructura confunde más de lo que ayuda.",
          ],
        },
        {
          title: "Cuál elegir según tu situación",
          paragraphs: [
            "Para perfiles senior en industrias formales, Harvard gana por claridad y proyección de autoridad. Para candidatos con poca experiencia o industrias creativas, un formato más moderno puede ser más adecuado si la presentación visual suma.",
            "Lo más importante es que el formato que elijas no sacrifique legibilidad. Si tenés dudas, Harvard es la opción más segura para la mayoría de los casos en el mercado argentino.",
          ],
        },
      ]}
      faqs={[
        {
          question: "El CV Harvard es compatible con sistemas ATS?",
          answer:
            "Sí. Su estructura estandarizada, sin elementos gráficos ni columnas complejas, lo hace muy compatible con sistemas ATS. Es uno de los formatos más seguros para pasar filtros automáticos.",
        },
        {
          question: "Puedo usar el formato Harvard si no tengo experiencia?",
          answer:
            "Si, pero necesitas compensar la falta de experiencia con un perfil profesional bien redactado y una seccion de educacion o logros que cubra el espacio. Harvard funciona para todos los niveles, solo hay que saber como estructurar el contenido.",
        },
        {
          question: "Cuál formato prefieren los reclutadores en Argentina?",
          answer:
            "En industrias corporativas y formales (banca, consultoria, derecho, tecnologia empresarial), Harvard suele ser bien recibido. En industrias creativas o startups, hay mas apertura a formatos modernos. Depende del sector.",
        },
        {
          question: "El CV tradicional es menos profesional?",
          answer:
            "No necesariamente. Un CV tradicional bien redactado puede ser igual de efectivo. El problema es que sin una estructura estandarizada, depende más de la habilidad de quien lo escribe y puede variar mucho en calidad.",
        },
      ]}
      relatedLinks={[
        {
          href: "/plantilla-harvard",
          title: "Plantilla Harvard",
          description:
            "Descargá la plantilla Harvard optimizada para procesos formales.",
        },
        {
          href: "/curriculum-ats",
          title: "CV ATS",
          description:
            "Aprendé a preparar tu currículum para pasar filtros automáticos.",
        },
        {
          href: "/cv-profesional",
          title: "CV Profesional",
          description:
            "Guía para crear un currículum que destaque por contenido y formato.",
        },
        {
          href: "/",
          title: "Crear CV Online",
          description:
            "Construí tu currículum paso a paso con ayuda de inteligencia artificial.",
        },
      ]}
    />
  );
}
