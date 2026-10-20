import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cómo Hacer un Currículum sin Experiencia Laboral",
  description:
    "Guía para hacer un currículum sin experiencia laboral destacando estudios, proyectos, cursos y habilidades.",
  path: "/blog/como-hacer-un-curriculum-sin-experiencia",
  keywords: [
    "como hacer un currículum sin experiencia",
    "cv sin experiencia",
    "hacer currículum primer empleo",
    "currículum sin experiencia laboral",
  ],
  type: "article",
  image: "/social/cv-sin-experiencia-og.png",
  imageAlt: "Cinco elementos para un CV sin experiencia laboral",
  socialTitle: "¿Sin experiencia? Tu CV no esta vacío",
  socialDescription:
    "Estudios, proyectos, cursos, voluntariados y habilidades también pueden demostrar lo que sabes hacer.",
});

export default function ComoHacerUnCurriculumSinExperienciaPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-curriculum-sin-experiencia"
      datePublished="2025-04-12"
      dateModified="2026-07-28"
      image="/social/cv-sin-experiencia-og.png"
      title="Cómo hacer un currículum sin experiencia y aun asi mostrar potencial"
      description="Guía para hacer un currículum sin experiencia laboral destacando estudios, proyectos, cursos y habilidades."
      intro="No tener experiencia laboral formal no significa no tener nada para mostrar. Un buen CV sin experiencia puede transmitir potencial, direccion profesional y capacidades reales si esta bien construido."
      sections={[
        {
          title: "Aprovecha estudios, proyectos y cursos",
          paragraphs: [
            "Cuando aun no tienes experiencia fuerte, estas secciones pasan a ser centrales. No solo importa mencionarlas, sino explicar que aprendiste y como aplicaste ese conocimiento.",
            "Ese contexto es lo que hace que el CV se vea menos vacío y más profesional.",
          ],
        },
        {
          title: "Refuerza el perfil profesional",
          paragraphs: [
            "En perfiles iniciales, un buen resumen ayuda mucho a orientar la lectura. Puede explicar hacia donde quieres crecer, que habilidades ya tienes y que tipo de rol estas buscando.",
            "Eso da una sensacion de direccion y seriedad desde el inicio.",
          ],
        },
        {
          title: "Haz que el documento se vea fuerte aunque seas junior",
          paragraphs: [
            "La diferencia esta en la claridad y en como presentas lo que si tienes. Un CV junior mejora mucho cuando ordena bien la información y evita frases genéricas.",
            "También ayuda usar una plantilla clara y un contenido bien redactado para ganar presencia profesional.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo incluir voluntariados o actividades extracurriculares?",
          answer:
            "Sí. Si ayudan a mostrar habilidades, responsabilidad o experiencia relevante, pueden sumar bastante.",
        },
        {
          question: "¿Sirve para buscar primer empleo?",
          answer:
            "Sí. Esta guía esta pensada justamente para ese escenario.",
        },
        {
          question: "¿Debo aclarar que no tengo experiencia?",
          answer:
            "No hace falta decirlo de forma literal si puedes orientar bien el perfil con estudios, proyectos y objetivo profesional.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "Landing CV sin experiencia",
          description: "Versión orientada a conversion para este mismo problema.",
        },
        {
          href: "/cv-para-estudiantes",
          title: "CV para estudiantes",
          description: "Ideal si estas buscando prácticas, pasantias o primer empleo.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description: "Aprovecha mejor una sección clave en perfiles iniciales.",
        },
      ]}
    />
  );
}
