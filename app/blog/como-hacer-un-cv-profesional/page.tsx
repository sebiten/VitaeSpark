import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un CV Profesional: Guía con Pasos Claros",
  description:
    "Descubre cómo hacer un CV profesional con mejor estructura, contenido más claro y una presentación lista para postularte mejor.",
  path: "/blog/como-hacer-un-cv-profesional",
  keywords: [
    "como hacer un cv profesional",
    "hacer cv profesional",
    "curriculum profesional",
    "como mejorar un cv profesional",
  ],
  type: "article",
});

export default function ComoHacerUnCvProfesionalPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-cv-profesional"
      datePublished="2025-04-15"
      title="Como hacer un CV profesional sin complicarlo de mas"
      description="Descubre como hacer un CV profesional con mejor estructura, contenido mas claro y una presentacion lista para postularte mejor."
      intro="Hacer un CV profesional no significa escribir dificil ni usar una plantilla recargada. Significa presentar tu perfil con claridad, criterio y una estructura que haga facil entender por que encajas en una oportunidad laboral."
      sections={[
        {
          title: "Empieza por lo que quieres conseguir",
          paragraphs: [
            "Un CV se vuelve mas profesional cuando tiene direccion. Antes de editar, define a que tipo de roles vas a apuntar y que parte de tu experiencia tiene mas valor para ese objetivo.",
            "Eso te ayuda a seleccionar mejor logros, palabras clave y habilidades, en lugar de mostrar todo con el mismo peso.",
          ],
        },
        {
          title: "Cuida estructura, tono y foco",
          paragraphs: [
            "La estructura debe ser simple y escaneable. El tono debe sonar claro y confiable. Y el foco debe estar puesto en experiencia, proyectos o formacion que realmente respalden tu perfil.",
            "Un CV profesional evita frases infladas y se apoya mas en hechos, contexto y capacidades aplicadas.",
          ],
        },
        {
          title: "Haz una version lista para procesos actuales",
          paragraphs: [
            "Hoy conviene pensar tanto en lectores humanos como en sistemas ATS. Eso significa secciones claras, palabras relevantes y una plantilla que no complique la lectura.",
            "Si ademas quieres ahorrar tiempo, una herramienta como VitaeSpark puede ayudarte a llevar esa mejora a la practica mucho mas rapido.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuanto influye el diseño en un CV profesional?",
          answer:
            "Influye, pero menos que la claridad del contenido. Un buen diseño acompana; no reemplaza una estructura bien pensada.",
        },
        {
          question: "Se puede hacer un CV profesional con poca experiencia?",
          answer:
            "Si. El secreto esta en el enfoque, no solo en la cantidad de anos trabajados.",
        },
        {
          question: "Conviene adaptar el CV a cada busqueda?",
          answer:
            "Si. Un documento profesional suele ajustarse segun puesto, industria y prioridad de habilidades.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-profesional",
          title: "CV profesional",
          description:
            "Pasa de la guia a una pagina de conversion centrada en ese objetivo.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Generador de CV con IA",
          description: "Acelera la mejora del texto sin perder claridad.",
        },
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Como mejorar mi curriculum",
          description:
            "Complementa esta guia con ideas concretas para iterar tu version actual.",
        },
      ]}
    />
  );
}
