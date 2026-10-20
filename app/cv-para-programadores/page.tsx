import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Programadores: Stack, Proyectos y Experiencia",
  description:
    "Crea un currículum para programadores destacando stack, proyectos, logros y experiencia de forma clara y profesional.",
  path: "/cv-para-programadores",
  keywords: [
    "cv para programadores",
    "currículum para programador",
    "currículum programador",
    "cv desarrollador",
  ],
});

export default function CvParaProgramadoresPage() {
  return (
    <MarketingPage
      path="/cv-para-programadores"
      eyebrow="CV por profesión"
      title="CV para programadores que muestre stack, proyectos y criterio técnico"
      description="Crea un currículum para programadores destacando tecnologias, experiencia real y resultados sin caer en descripciones genéricas."
      intro={[
        "Un buen CV para programadores no depende solo de listar tecnologias. Tiene que explicar que construiste, en que contexto trabajaste y cual fue tu aporte real en productos, sistemas o equipos.",
        "VitaeSpark te ayuda a ordenar experiencia, stack y proyectos en una estructura profesional para que tu perfil técnico se entienda rápido, tanto por reclutadores como por hiring managers.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-programador.png",
        alt: "Ejemplo completo de CV para desarrollador Full Stack junior",
        caption:
          "CV ilustrativo de programación con proyectos, stack y formación técnica.",
      }}
      benefits={[
        "Mejor presentación de stack, responsabilidades y logros técnicos.",
        "Ideal para perfiles frontend, backend, full stack o software en general.",
        "Ayuda a bajar experiencia compleja a un CV claro y legible.",
      ]}
      steps={[
        {
          title: "Define tu foco técnico",
          description:
            "Aclara si apuntas a frontend, backend, full stack, datos o mobile.",
        },
        {
          title: "Resume proyectos y experiencia",
          description:
            "Explica que construiste, con que herramientas y con que impacto.",
        },
        {
          title: "Exporta tu versión final",
          description:
            "Obtienes un CV listo para procesos de selección técnica y reclutamiento.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: desarrollador frontend",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Desarrollador frontend · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Desarrollador con experiencia en interfaces con [tecnologías utilizadas]. Implementación de formularios, integración de servicios y revisión de cambios con Git. Portfolio: [Enlace a trabajos propios].",
            "Experiencia: Desarrollador frontend · [Empresa o contexto profesional] · [Mes/año de inicio–mes/año de fin]. Implementé formularios con validación, conecté pantallas con una API y corregí estados de carga y error. Revisé cambios mediante pull requests y documenté cómo ejecutar el proyecto.",
            "Formación: [Carrera, tecnicatura o formación realizada] · [Institución] · [Estado y fechas].",
            "Habilidades: [Lenguaje] aplicado a interfaces; Git para control de versiones; consumo de API; [herramienta de pruebas realmente utilizada].",
            "Proyecto: [Nombre y enlace al repositorio o demo]. Explica qué parte desarrollaste, qué problema resuelve y cómo probarla. No presentes un tutorial copiado como un producto propio.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué debe incluir un CV de programador",
          paragraphs: [
            "Lo central suele ser stack, experiencia profesional, proyectos relevantes, herramientas, metodologías y un resumen profesional claro. También puede sumar GitHub o portfolio si aporta contexto real a tu trabajo.",
            "Lo importante es que la tecnología no aparezca aislada, sino vinculada a soluciones concretas, responsabilidades y resultados.",
          ],
        },
        {
          title: "Cómo destacar sin inflar el perfil",
          paragraphs: [
            "En tecnología se nota rápido cuando un CV esta inflado. Conviene ser preciso con frameworks, lenguajes y alcance del trabajo realizado. Eso genera más confianza que una lista enorme de herramientas sin contexto.",
            "También suma priorizar las experiencias más cercanas al tipo de puesto que buscas, en vez de intentar mostrar absolutamente todo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Conviene incluir proyectos personales?",
          answer:
            "Sí, sobre todo si muestran habilidades relevantes o compensan poca experiencia laboral.",
        },
        {
          question: "¿Debo listar todas las tecnologias que conozco?",
          answer:
            "No. Conviene priorizar las que realmente usas y son relevantes para el puesto objetivo.",
        },
        {
          question: "¿Sirve para perfiles junior?",
          answer:
            "Sí. En juniors, proyectos, prácticas, estudios y stack bien explicado pueden marcar diferencia.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description: "Mejora la lectura de tu CV técnico en procesos automatizados.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para redactar experiencia técnica con más claridad.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum",
          description: "Refuerza la base antes de adaptar tu CV al sector tech.",
        },
      ]}
    />
  );
}
