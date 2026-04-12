import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Programadores",
  description:
    "Crea un curriculum para programadores destacando stack, proyectos, logros y experiencia de forma clara y profesional.",
  path: "/cv-para-programadores",
  keywords: [
    "cv para programadores",
    "curriculum para programador",
    "curriculum programador",
    "cv desarrollador",
  ],
});

export default function CvParaProgramadoresPage() {
  return (
    <MarketingPage
      path="/cv-para-programadores"
      eyebrow="CV por profesion"
      title="CV para programadores que muestre stack, proyectos y criterio tecnico"
      description="Crea un curriculum para programadores destacando tecnologias, experiencia real y resultados sin caer en descripciones genericas."
      intro={[
        "Un buen CV para programadores no depende solo de listar tecnologias. Tiene que explicar que construiste, en que contexto trabajaste y cual fue tu aporte real en productos, sistemas o equipos.",
        "VitaeSpark te ayuda a ordenar experiencia, stack y proyectos en una estructura profesional para que tu perfil tecnico se entienda rapido, tanto por reclutadores como por hiring managers.",
      ]}
      benefits={[
        "Mejor presentacion de stack, responsabilidades y logros tecnicos.",
        "Ideal para perfiles frontend, backend, full stack o software en general.",
        "Ayuda a bajar experiencia compleja a un CV claro y legible.",
      ]}
      steps={[
        {
          title: "Define tu foco tecnico",
          description:
            "Aclara si apuntas a frontend, backend, full stack, datos o mobile.",
        },
        {
          title: "Resume proyectos y experiencia",
          description:
            "Explica que construiste, con que herramientas y con que impacto.",
        },
        {
          title: "Exporta tu version final",
          description:
            "Obtienes un CV listo para procesos de seleccion tecnica y reclutamiento.",
        },
      ]}
      sections={[
        {
          title: "Que debe incluir un CV de programador",
          paragraphs: [
            "Lo central suele ser stack, experiencia profesional, proyectos relevantes, herramientas, metodologias y un resumen profesional claro. Tambien puede sumar GitHub o portfolio si aporta contexto real a tu trabajo.",
            "Lo importante es que la tecnologia no aparezca aislada, sino vinculada a soluciones concretas, responsabilidades y resultados.",
          ],
        },
        {
          title: "Como destacar sin inflar el perfil",
          paragraphs: [
            "En tecnologia se nota rapido cuando un CV esta inflado. Conviene ser preciso con frameworks, lenguajes y alcance del trabajo realizado. Eso genera mas confianza que una lista enorme de herramientas sin contexto.",
            "Tambien suma priorizar las experiencias mas cercanas al tipo de puesto que buscas, en vez de intentar mostrar absolutamente todo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene incluir proyectos personales?",
          answer:
            "Si, sobre todo si muestran habilidades relevantes o compensan poca experiencia laboral.",
        },
        {
          question: "Debo listar todas las tecnologias que conozco?",
          answer:
            "No. Conviene priorizar las que realmente usas y son relevantes para el puesto objetivo.",
        },
        {
          question: "Sirve para perfiles junior?",
          answer:
            "Si. En juniors, proyectos, practicas, estudios y stack bien explicado pueden marcar diferencia.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Mejora la lectura de tu CV tecnico en procesos automatizados.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para redactar experiencia tecnica con mas claridad.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description: "Refuerza la base antes de adaptar tu CV al sector tech.",
        },
      ]}
    />
  );
}
