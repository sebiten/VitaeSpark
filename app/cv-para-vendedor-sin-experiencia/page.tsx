import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Vendedor sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para vendedor sin experiencia con ejemplo de perfil, habilidades comerciales, atención al cliente y formato profesional listo para descargar.",
  path: "/cv-para-vendedor-sin-experiencia",
  keywords: [
    "cv para vendedor sin experiencia",
    "currículum vendedor sin experiencia",
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
      description="Destacá tu perfil comercial aunque sea tu primera experiencia laboral. Enfocá comunicación, orientación a resultados, manejo de objeciones y disposición para aprender."
      intro={[
        "Un puesto de vendedor suele requerir resultados concretos, pero hay formas de presentar tu potencial aunque no tengas números previos. Lo que valoran los reclutadores en perfiles sin experiencia es la comunicación, la orientación a objetivos, la capacidad de negociación y el aprendizaje rápido.",
        "VitaeSpark te ayuda a construir un CV que comunique tu potencial comercial y que se vea profesional desde el primer envío.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
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
            "Comunicación, manejo de objeciones, orientación a metas, trabajo en equipo y capacidad de aprendizaje son relevantes aunque no tengas experiencia formal.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones de venta inicial en distintos sectores.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: vendedor/a — perfil inicial",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Vendedor/a — perfil inicial · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado] interesado en ventas de [tipo de producto]. En [actividad real] expliqué productos a participantes y registré consultas y pedidos.",
            "Proyecto o actividad real: Emprendimiento escolar o colaboración en feria · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Presenté productos del proyecto, respondí consultas sobre características y anoté pedidos para confirmar disponibilidad con el responsable.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Explicación de productos; escucha de consultas; registro de pedidos; [herramienta digital utilizada].",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
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
            "Una base útil puede ser: 'Perfil orientado a ventas con habilidades de comunicación, negociación y orientación a resultados. Capacidad para aprender procesos comerciales rápidamente y gestionar objeciones de forma efectiva'.",
            "Ajustá el perfil al canal donde quieres trabajar: retail, call center, e-commerce o venta directa.",
          ],
        },
        {
          title: "Habilidades clave para vendedores sin experiencia",
          paragraphs: [
            "Comunicación, Orientación a resultados, Manejo de objeciones, Trabajo en equipo, Resiliencia, Capacidad de aprendizaje, Conocimiento de herramientas digitales básicas.",
            "Incluir disponibilidad horaria, disponibilidad para viajar si corresponde, y actitud positiva hacia metas comerciales genera buena impresión en reclutadores.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo ser vendedor sin experiencia previa?",
          answer:
            "Hay búsquedas de ventas iniciales que no exigen experiencia. Revisa los requisitos del aviso y muestra una actividad real en la que hayas atendido consultas o explicado un producto.",
        },
        {
          question: "¿Debo inventar logros de ventas?",
          answer:
            "No. En vez de inventar números, destacá habilidades transferibles, actitud y capacidad de aprendizaje. Los reclutadores saben distinguir un perfil inicial.",
        },
        {
          question: "¿Qué tipo de empresas contratan vendedores sin experiencia?",
          answer:
            "Retail, call center, e-commerce, empresas de servicios, tiendas y venta directa suelen contratar perfiles iniciales con buena actitud y comunicación.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
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
