import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Estudiantes: Cómo Armarlo sin Experiencia",
  description:
    "Crea un currículum para estudiantes destacando estudios, proyectos, prácticas, cursos y habilidades aunque tengas poca experiencia.",
  path: "/cv-para-estudiantes",
  keywords: [
    "cv para estudiantes",
    "currículum para estudiante",
    "cv estudiante",
    "currículum estudiante",
  ],
});

export default function CvParaEstudiantesPage() {
  return (
    <MarketingPage
      path="/cv-para-estudiantes"
      eyebrow="CV por profesión"
      title="CV para estudiantes que buscan prácticas, pasantias o primer empleo"
      description="Destaca estudios, cursos, proyectos y habilidades con una estructura pensada para perfiles iniciales y postulaciones de entrada."
      intro={[
        "Un CV para estudiantes tiene que compensar la falta de experiencia formal mostrando de manera inteligente estudios, herramientas, proyectos, idiomas y actividades relevantes.",
        "VitaeSpark te ayuda a convertir ese recorrido en un perfil más ordenado y profesional para aplicar a pasantias, prácticas o primer empleo.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-estudiante.png",
        alt: "Ejemplo completo de CV para estudiante sin experiencia formal",
        caption:
          "CV ilustrativo de estudiante con proyectos, voluntariado y habilidades.",
      }}
      benefits={[
        "Mejor presentación de estudios, cursos y proyectos.",
        "Ideal para pasantias, prácticas profesionales y primer empleo.",
        "Evita el típico CV vacío o demasiado genérico.",
      ]}
      steps={[
        {
          title: "Define tu objetivo",
          description:
            "Aclara si buscas primer empleo, pasantia, práctica o beca.",
        },
        {
          title: "Destaca estudios y proyectos",
          description:
            "Ordena lo más valioso de tu perfil aunque aun no tengas experiencia extensa.",
        },
        {
          title: "Descarga un CV profesional",
          description:
            "Obtienes una versión clara y lista para enviar.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de estudiante",
          paragraphs: [
            "Suelen pesar mucho la carrera o estudios en curso, cursos relevantes, herramientas, proyectos, voluntariados, idiomas y cualquier experiencia que demuestre compromiso o aprendizaje aplicado.",
            "También conviene incluir un perfil corto que explique hacia donde quieres crecer profesionalmente.",
          ],
        },
        {
          title: "Cómo lograr que el CV no se vea básico",
          paragraphs: [
            "La diferencia esta en dar contexto. Un proyecto, materia o actividad vale más si explicas que hiciste, que aprendiste y con que herramientas trabajaste.",
            "Ese detalle transforma un perfil inicial en una presentación mucho más fuerte.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo usarlo si aun no trabajo?",
          answer:
            "Sí. Justamente esta pensado para mostrar potencial, estudios y habilidades aunque falte experiencia formal.",
        },
        {
          question: "¿Sirve para pasantias?",
          answer:
            "Sí. Es uno de los mejores casos de uso para este tipo de CV.",
        },
        {
          question: "¿Debo incluir promedio o materias?",
          answer:
            "Depende del caso. Si aportan valor a la búsqueda, pueden sumar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Profundiza estrategias para perfiles que recién arrancan.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description: "Refuerza una sección clave en perfiles iniciales.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Lleva tus estudios y proyectos a una plantilla lista para usar.",
        },
      ]}
    />
  );
}
