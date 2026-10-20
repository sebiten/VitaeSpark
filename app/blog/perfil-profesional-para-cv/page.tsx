import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Perfil Profesional para CV: Ejemplos y Como Escribirlo",
  description:
    "Aprende como escribir un perfil profesional para CV con ejemplos para administrativo, call center, operario y perfiles sin experiencia.",
  path: "/blog/perfil-profesional-para-cv",
  keywords: [
    "perfil profesional para cv",
    "perfil profesional currículum",
    "resumen profesional cv",
    "perfil para currículum vitae",
  ],
  type: "article",
  image: "/social/perfil-profesional-antes-despues-og.png",
  imageAlt: "Ejemplo de perfil profesional antes y después",
  socialTitle: "Tu perfil profesional: antes vs. después",
  socialDescription:
    "Aprende a reemplazar frases genéricas por un perfil claro, concreto y alineado con el puesto.",
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
      intro="El perfil profesional suele ser una de las primeras cosas que se leen en un currículum. Cuando esta bien escrito, ordena toda la lectura. Cuando es genérico, hace que el CV pierda fuerza desde el inicio."
      sections={[
        {
          title: "Qué debe decir un buen perfil profesional",
          paragraphs: [
            "Lo ideal es resumir quien eres profesionalmente, a que rol apuntas y que elementos de tu experiencia o habilidades te hacen una buena opción. Todo eso en pocas lineas, con palabras del puesto y sin frases vacías.",
            "No se trata de sonar grandilocuente, sino de orientar rápido al lector.",
          ],
        },
        {
          title: "Ejemplos de perfil profesional para CV",
          paragraphs: [
            "Administrativo: 'Perfil administrativo con experiencia en carga de datos, documentación, atención interna, Excel y soporte operativo para distintas áreas'.",
            "Call center: 'Perfil orientado a atención telefónica y seguimiento de consultas, con experiencia en CRM, registro de casos, comunicación clara y resolución ordenada'.",
          ],
        },
        {
          title: "Perfil profesional para operario o primer empleo",
          paragraphs: [
            "Operario: 'Perfil operativo con experiencia en producción, deposito, armado, empaque, orden del sector y cumplimiento de procedimientos de seguridad'.",
            "Sin experiencia: 'Perfil inicial con formación, responsabilidad, aprendizaje rápido, manejo básico de herramientas digitales y disponibilidad para incorporarse a un equipo de trabajo'.",
          ],
        },
        {
          title: "Errores comunes en esta sección",
          paragraphs: [
            "Los más frecuentes suelen ser exagerar, decir cosas demasiado genéricas o no vincular el perfil con el puesto buscado. Frases como 'soy una persona responsable y proactiva' casi nunca suman por si solas.",
            "Conviene bajar a algo más concreto, relacionado con experiencia, herramientas o foco profesional.",
          ],
        },
        {
          title: "Cómo adaptarlo según tu experiencia",
          paragraphs: [
            "En perfiles con experiencia, el resumen puede destacar trayectoria, especializacion y aporte. En perfiles junior, puede enfocarse más en formación, direccion profesional y habilidades aplicadas.",
            "Lo importante es que refleje tu momento real y el tipo de oportunidad que buscas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Cuánto debe medir el perfil profesional?",
          answer:
            "En la mayoria de los casos, entre 3 y 5 lineas bien escritas alcanzan.",
        },
        {
          question: "¿Cómo escribir un perfil profesional administrativo?",
          answer:
            "Menciona tareas de oficina, carga de datos, documentación, Excel, atención interna, reportes y el tipo de empresa o área donde trabajaste.",
        },
        {
          question: "¿Cómo escribir un perfil profesional call center?",
          answer:
            "Aclara si apuntas a atención, ventas, soporte o cobranzas, y menciona llamadas, chat, CRM, seguimiento de casos y comunicación clara.",
        },
        {
          question: "¿Es mejor escribirlo en primera o tercera persona?",
          answer:
            "Suele funcionar mejor de forma directa y profesional, sin necesidad de usar una voz demasiado formal.",
        },
        {
          question: "¿Debo cambiarlo para cada vacante?",
          answer:
            "Si puedes adaptarlo un poco al rol objetivo, suele mejorar mucho la relevancia del CV.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Cómo mejorar mi currículum",
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
          description: "Ejemplo aplicado de perfil para atención, ventas o soporte.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Entiende como encaja esta sección en el CV completo.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para desarrollar un perfil inicial más fuerte.",
        },
      ]}
    />
  );
}
