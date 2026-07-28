import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Perfil Profesional para CV: Ejemplos y Como Escribirlo",
  description:
    "Aprende como escribir un perfil profesional para CV con ejemplos para administrativo, call center, operario y perfiles sin experiencia.",
  path: "/blog/perfil-profesional-para-cv",
  keywords: [
    "perfil profesional para cv",
    "perfil profesional curriculum",
    "resumen profesional cv",
    "perfil para curriculum vitae",
  ],
  type: "article",
  image: "/social/perfil-profesional-antes-despues-og.png",
  imageAlt: "Ejemplo de perfil profesional antes y despues",
  socialTitle: "Tu perfil profesional: antes vs. despues",
  socialDescription:
    "Aprende a reemplazar frases genericas por un perfil claro, concreto y alineado con el puesto.",
});

export default function PerfilProfesionalParaCvPage() {
  return (
    <BlogArticlePage
      path="/blog/perfil-profesional-para-cv"
      datePublished="2025-04-12"
      dateModified="2026-07-28"
      image="/social/perfil-profesional-antes-despues-og.png"
      title="Perfil profesional para CV: ejemplos y como escribirlo"
      description="Aprende como escribir un perfil profesional para CV con ejemplos concretos para administrativo, call center, operario y perfiles iniciales."
      intro="El perfil profesional suele ser una de las primeras cosas que se leen en un curriculum. Cuando esta bien escrito, ordena toda la lectura. Cuando es generico, hace que el CV pierda fuerza desde el inicio."
      sections={[
        {
          title: "Que debe decir un buen perfil profesional",
          paragraphs: [
            "Lo ideal es resumir quien eres profesionalmente, a que rol apuntas y que elementos de tu experiencia o habilidades te hacen una buena opcion. Todo eso en pocas lineas, con palabras del puesto y sin frases vacias.",
            "No se trata de sonar grandilocuente, sino de orientar rapido al lector.",
          ],
        },
        {
          title: "Ejemplos de perfil profesional para CV",
          paragraphs: [
            "Administrativo: 'Perfil administrativo con experiencia en carga de datos, documentacion, atencion interna, Excel y soporte operativo para distintas areas'.",
            "Call center: 'Perfil orientado a atencion telefonica y seguimiento de consultas, con experiencia en CRM, registro de casos, comunicacion clara y resolucion ordenada'.",
          ],
        },
        {
          title: "Perfil profesional para operario o primer empleo",
          paragraphs: [
            "Operario: 'Perfil operativo con experiencia en produccion, deposito, armado, empaque, orden del sector y cumplimiento de procedimientos de seguridad'.",
            "Sin experiencia: 'Perfil inicial con formacion, responsabilidad, aprendizaje rapido, manejo basico de herramientas digitales y disponibilidad para incorporarse a un equipo de trabajo'.",
          ],
        },
        {
          title: "Errores comunes en esta seccion",
          paragraphs: [
            "Los mas frecuentes suelen ser exagerar, decir cosas demasiado genericas o no vincular el perfil con el puesto buscado. Frases como 'soy una persona responsable y proactiva' casi nunca suman por si solas.",
            "Conviene bajar a algo mas concreto, relacionado con experiencia, herramientas o foco profesional.",
          ],
        },
        {
          title: "Como adaptarlo segun tu experiencia",
          paragraphs: [
            "En perfiles con experiencia, el resumen puede destacar trayectoria, especializacion y aporte. En perfiles junior, puede enfocarse mas en formacion, direccion profesional y habilidades aplicadas.",
            "Lo importante es que refleje tu momento real y el tipo de oportunidad que buscas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuanto debe medir el perfil profesional?",
          answer:
            "En la mayoria de los casos, entre 3 y 5 lineas bien escritas alcanzan.",
        },
        {
          question: "Como escribir un perfil profesional administrativo?",
          answer:
            "Menciona tareas de oficina, carga de datos, documentacion, Excel, atencion interna, reportes y el tipo de empresa o area donde trabajaste.",
        },
        {
          question: "Como escribir un perfil profesional call center?",
          answer:
            "Aclara si apuntas a atencion, ventas, soporte o cobranzas, y menciona llamadas, chat, CRM, seguimiento de casos y comunicacion clara.",
        },
        {
          question: "Es mejor escribirlo en primera o tercera persona?",
          answer:
            "Suele funcionar mejor de forma directa y profesional, sin necesidad de usar una voz demasiado formal.",
        },
        {
          question: "Debo cambiarlo para cada vacante?",
          answer:
            "Si puedes adaptarlo un poco al rol objetivo, suele mejorar mucho la relevancia del CV.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Como mejorar mi curriculum",
          description: "Haz del perfil profesional uno de los primeros puntos a optimizar.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Ejemplo aplicado de perfil profesional administrativo.",
        },
        {
          href: "/cv-call-center",
          title: "CV call center",
          description: "Ejemplo aplicado de perfil para atencion, ventas o soporte.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description: "Entiende como encaja esta seccion en el CV completo.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para desarrollar un perfil inicial mas fuerte.",
        },
      ]}
    />
  );
}
