import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Curriculum sin Experiencia para Primer Empleo",
  description:
    "Aprende como armar un curriculum sin experiencia laboral destacando estudios, habilidades, proyectos y potencial profesional.",
  path: "/curriculum-sin-experiencia",
  keywords: [
    "curriculum sin experiencia",
    "cv sin experiencia",
    "primer empleo curriculum",
    "hacer curriculum sin experiencia",
    "curriculum para primer trabajo",
  ],
});

export default function CurriculumSinExperienciaPage() {
  return (
    <MarketingPage
      path="/curriculum-sin-experiencia"
      eyebrow="Primer empleo"
      title="Curriculum sin experiencia para postularte mejor a tu primer trabajo"
      description="Aprende como armar un CV sin experiencia laboral destacando estudios, habilidades, proyectos y potencial profesional de manera clara y creible."
      intro={[
        "Hacer un curriculum sin experiencia puede sentirse dificil porque muchas personas creen que no tienen nada valioso para mostrar. En realidad, un buen CV para primer empleo no depende solo de trabajos previos: tambien puede destacar estudios, proyectos, practicas, herramientas, cursos y habilidades relevantes.",
        "La clave esta en presentar esa informacion con orden, criterio y enfoque en el puesto que buscas. VitaeSpark te ayuda a estructurar ese contenido para que tu perfil se vea mas solido, incluso si todavia estas construyendo experiencia laboral formal.",
      ]}
      benefits={[
        "Ayuda a transformar estudios, cursos y proyectos en un perfil mas competitivo.",
        "Sirve para primer empleo, pasantias, practicas y cambios de rubro.",
        "Te guia para evitar el clasico CV vacio o demasiado generico.",
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
          title: "Refuerza la presentacion final",
          description:
            "La IA te ayuda a escribir con mas claridad y profesionalismo.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un curriculum sin experiencia",
          paragraphs: [
            "Lo mas importante es aprovechar todo lo que si tienes: formacion academica, cursos, practicas, proyectos personales, herramientas, idiomas, voluntariados o actividades donde hayas demostrado responsabilidad y aprendizaje.",
            "Tambien conviene incluir un breve perfil profesional enfocado en tu objetivo. Aunque todavia no tengas historial laboral fuerte, puedes mostrar motivacion, base tecnica y direccion profesional si el contenido esta bien armado.",
          ],
        },
        {
          title: "Como hacer que no se vea vacio",
          paragraphs: [
            "Un CV sin experiencia se ve vacio cuando solo enumera datos. En cambio, mejora mucho cuando describe proyectos, conocimientos aplicados y resultados concretos, aunque hayan ocurrido en contexto academico o personal.",
            "Por ejemplo, no es lo mismo poner 'curso de Excel' que explicar que trabajaste con tablas dinamicas, reportes y organizacion de informacion. Ese tipo de detalle suma mucho en perfiles iniciales.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo poner proyectos personales en el CV?",
          answer:
            "Si. Si muestran habilidades relevantes para el trabajo que buscas, pueden ser una parte muy valiosa del perfil.",
        },
        {
          question: "Debo aclarar que busco mi primer empleo?",
          answer:
            "Si, pero de forma profesional, enfocandote en lo que puedes aportar y en el tipo de rol al que apuntas.",
        },
        {
          question: "Sirve tambien para cambiar de rubro?",
          answer:
            "Si. Muchas ideas aplican igual cuando quieres reposicionar tu perfil y todavia no tienes experiencia directa en el nuevo sector.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description:
            "Una buena salida para primer empleo si quieres entrar en roles de contacto con clientes.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description:
            "Otra opcion frecuente para primer empleo, retail y atencion presencial.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Empieza tu curriculum con una guia paso a paso y plantillas claras.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Como hacer un curriculum",
          description:
            "Repasa la estructura basica para armar un CV desde cero.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description:
            "Encuentra ideas para reforzar una seccion clave cuando hay poca experiencia.",
        },
      ]}
    />
  );
}
