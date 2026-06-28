import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Vendedor sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para vendedor sin experiencia con ejemplo de perfil, habilidades comerciales, atención al cliente y formato profesional listo para descargar.",
  path: "/cv-para-vendedor-sin-experiencia",
  keywords: [
    "cv para vendedor sin experiencia",
    "curriculum vendedor sin experiencia",
    "cv vendedor sin experiencia",
    "perfil vendedor sin experiencia",
    "ejemplo cv vendedor sin experiencia",
  ],
});

export default function CvParaVendedorSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-vendedor-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para vendedor sin experiencia: ejemplo y habilidades"
      description="Destacá tu perfil comercial aunque sea tu primera experiencia laboral. Enfocá comunicación, orientación a resultados, manejo de objections y disposición para aprender."
      intro={[
        "Un puesto de vendedor suele requerir resultados concretos, pero hay formas de presentar tu potencial aunque no tengas números previos. Lo que valoran los reclutadores en perfiles sin experiencia es la comunicación, la orientación a objetivos, la capacidad de negociación y el aprendizaje rápido.",
        "VitaeSpark te ayuda a construir un CV que comunique tu potencial comercial y que se vea profesional desde el primer envío.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para vendedor sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para vendedor inicial en retail,telecomunicaciones o servicios.",
      }}
      benefits={[
        "Enfoca habilidades comerciales transferibles y orientación a resultados.",
        "Sirve para retail, call center, comercio electrónico y ventas presenciales.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Identificá tu tipo de venta objetivo",
          description:
            "Definí si buscás ventas presenciales, por teléfono, online o puerta a puerta. Cada tipo valora habilidades distintas.",
        },
        {
          title: "Resaltá habilidades transferibles",
          description:
            "Comunicación, manejo deobjeciones, orientación a metas, trabajo en equipo y capacidad de aprendizaje son relevantes aunque no tengas experiencia formal.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones de venta inicial en distintos sectores.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de vendedor sin experiencia",
          paragraphs: [
            "Podés incluir estudios relacionados con comercio o administración, cursos de ventas o atención al cliente, experiencia informal (venta en redes, ayuda en negocio familiar), y habilidades como comunicación, negociación y orientación a resultados.",
            "Si participaste en proyectos académicos que involucraron presentación de ideas, manejo de datos o trabajo en equipo, podés presentarlos como experiencia relevante.",
          ],
        },
        {
          title: "Ejemplo de perfil para vendedor inicial",
          paragraphs: [
            "Una base util puede ser: 'Perfil orientado a ventas con habilidades de comunicación, negociación y orientación a resultados. Capacidad para aprender procesos comerciales rapidamente y gestionarobjeciones de forma efectiva.'.",
            "Ajustá el perfil al canal donde quieres trabajar: retail, call center, e-commerce o venta directa.",
          ],
        },
        {
          title: "Habilidades clave para vendedores sin experiencia",
          paragraphs: [
            "Comunicación, Orientación a resultados, Manejo deobjeciones, Trabajo en equipo, Resiliencia, Capacidad de aprendizaje, Conocimiento de herramientas digitales básicas.",
            "Incluir disponibilidad horaria, willingness para travel si aplica, y actitud positiva hacia metas comerciales genera buena impresión en reclutadores.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo ser vendedor sin experiencia previa?",
          answer:
            "Sí. Many positions welcome profiles with strong communication skills and a results-oriented mindset, even without formal sales experience.",
        },
        {
          question: "Debo inventar logros de ventas?",
          answer:
            "No. En vez de inventar números, destacá habilidades transferibles, actitud y capacidad de aprendizaje. Los reclutadores saben distinguir un perfil inicial.",
        },
        {
          question: "Qué tipo de empresas contratan vendedores sin experiencia?",
          answer:
            "Retail, call center, e-commerce, empresas de servicios, tiendas y venta directa suelen contratar perfiles iniciales con buena actitud y comunicación.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description:
            "Perfil similar enfocado en ventas telefónicas y atención.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Guía general para armar tu primer currículum laboral.",
        },
      ]}
    />
  );
}
