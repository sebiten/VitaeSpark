import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum sin Experiencia para Primer Empleo",
  description:
    "Aprende cómo armar un currículum sin experiencia laboral destacando estudios, habilidades, proyectos y potencial profesional.",
  path: "/curriculum-sin-experiencia",
  keywords: [
    "currículum sin experiencia",
    "cv sin experiencia",
    "primer empleo currículum",
    "hacer currículum sin experiencia",
    "currículum para primer trabajo",
  ],
});

export default function CurriculumSinExperienciaPage() {
  return (
    <MarketingPage
      path="/curriculum-sin-experiencia"
      eyebrow="Primer empleo"
      title="Currículum sin experiencia para postularte mejor a tu primer trabajo"
      description="Aprende como armar un CV sin experiencia laboral destacando estudios, habilidades, proyectos y potencial profesional de manera clara y creíble."
      intro={[
        "Hacer un currículum sin experiencia puede sentirse difícil porque muchas personas creen que no tienen nada valioso para mostrar. En realidad, un buen CV para primer empleo no depende solo de trabajos previos: también puede destacar estudios, proyectos, prácticas, herramientas, cursos y habilidades relevantes.",
        "La clave esta en presentar esa información con orden, criterio y enfoque en el puesto que buscas. VitaeSpark te ayuda a estructurar ese contenido para que tu perfil se vea más solido, incluso si todavía estas construyendo experiencia laboral formal.",
      ]}
      benefits={[
        "Ayuda a transformar estudios, cursos y proyectos en un perfil más competitivo.",
        "Sirve para primer empleo, pasantias, prácticas y cambios de rubro.",
        "Te guía para evitar el clasico CV vacío o demasiado genérico.",
      ]}
      steps={[
        {
          title: "Empieza por tu objetivo",
          description:
            "Aclara que tipo de trabajo buscas para definir mejor el tono del CV.",
        },
        {
          title: "Completa estudios, proyectos y habilidades",
          description:
            "Estas secciones pueden ser tu mayor fortaleza al inicio de carrera.",
        },
        {
          title: "Refuerza la presentación final",
          description:
            "La IA te ayuda a escribir con más claridad y profesionalismo.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un currículum sin experiencia",
          paragraphs: [
            "Lo más importante es aprovechar todo lo que si tienes: formación académica, cursos, prácticas, proyectos personales, herramientas, idiomas, voluntariados o actividades donde hayas demostrado responsabilidad y aprendizaje.",
            "También conviene incluir un breve perfil profesional enfocado en tu objetivo. Aunque todavía no tengas historial laboral fuerte, puedes mostrar motivación, base técnica y direccion profesional si el contenido esta bien armado.",
          ],
        },
        {
          title: "Cómo hacer que no se vea vacío",
          paragraphs: [
            "Un CV sin experiencia se ve vacío cuando solo enumera datos. En cambio, mejora mucho cuando describe proyectos, conocimientos aplicados y resultados concretos, aunque hayan ocurrido en contexto académico o personal.",
            "Por ejemplo, no es lo mismo poner 'curso de Excel' que explicar que trabajaste con tablas dinamicas, reportes y organización de información. Ese tipo de detalle suma mucho en perfiles iniciales.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo poner proyectos personales en el CV?",
          answer:
            "Sí. Si muestran habilidades relevantes para el trabajo que buscas, pueden ser una parte muy valiosa del perfil.",
        },
        {
          question: "¿Debo aclarar que busco mi primer empleo?",
          answer:
            "Sí, pero de forma profesional, enfocandote en lo que puedes aportar y en el tipo de rol al que apuntas.",
        },
        {
          question: "¿Sirve también para cambiar de rubro?",
          answer:
            "Sí. Muchas ideas aplican igual cuando quieres reposicionar tu perfil y todavía no tienes experiencia directa en el nuevo sector.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description:
            "Una buena salida para primer empleo si quieres entrar en roles de contacto con clientes.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description:
            "Otra opción frecuente para primer empleo, retail y atención presencial.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Empieza tu currículum con una guía paso a paso y plantillas claras.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum",
          description:
            "Repasa la estructura básica para armar un CV desde cero.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description:
            "Encuentra ideas para reforzar una sección clave cuando hay poca experiencia.",
        },
      ]}
    />
  );
}
