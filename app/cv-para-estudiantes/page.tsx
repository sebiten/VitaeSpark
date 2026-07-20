import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Estudiantes: Cómo Armarlo sin Experiencia",
  description:
    "Crea un currículum para estudiantes destacando estudios, proyectos, prácticas, cursos y habilidades aunque tengas poca experiencia.",
  path: "/cv-para-estudiantes",
  keywords: [
    "cv para estudiantes",
    "curriculum para estudiante",
    "cv estudiante",
    "curriculum estudiante",
  ],
});

export default function CvParaEstudiantesPage() {
  return (
    <MarketingPage
      path="/cv-para-estudiantes"
      eyebrow="CV por profesion"
      title="CV para estudiantes que buscan practicas, pasantias o primer empleo"
      description="Destaca estudios, cursos, proyectos y habilidades con una estructura pensada para perfiles iniciales y postulaciones de entrada."
      intro={[
        "Un CV para estudiantes tiene que compensar la falta de experiencia formal mostrando de manera inteligente estudios, herramientas, proyectos, idiomas y actividades relevantes.",
        "VitaeSpark te ayuda a convertir ese recorrido en un perfil mas ordenado y profesional para aplicar a pasantias, practicas o primer empleo.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-estudiante.png",
        alt: "Ejemplo completo de CV para estudiante sin experiencia formal",
        caption:
          "CV ilustrativo de estudiante con proyectos, voluntariado y habilidades.",
      }}
      benefits={[
        "Mejor presentacion de estudios, cursos y proyectos.",
        "Ideal para pasantias, practicas profesionales y primer empleo.",
        "Evita el tipico CV vacio o demasiado generico.",
      ]}
      steps={[
        {
          title: "Define tu objetivo",
          description:
            "Aclara si buscas primer empleo, pasantia, practica o beca.",
        },
        {
          title: "Destaca estudios y proyectos",
          description:
            "Ordena lo mas valioso de tu perfil aunque aun no tengas experiencia extensa.",
        },
        {
          title: "Descarga un CV profesional",
          description:
            "Obtienes una version clara y lista para enviar.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un CV de estudiante",
          paragraphs: [
            "Suelen pesar mucho la carrera o estudios en curso, cursos relevantes, herramientas, proyectos, voluntariados, idiomas y cualquier experiencia que demuestre compromiso o aprendizaje aplicado.",
            "Tambien conviene incluir un perfil corto que explique hacia donde quieres crecer profesionalmente.",
          ],
        },
        {
          title: "Como lograr que el CV no se vea basico",
          paragraphs: [
            "La diferencia esta en dar contexto. Un proyecto, materia o actividad vale mas si explicas que hiciste, que aprendiste y con que herramientas trabajaste.",
            "Ese detalle transforma un perfil inicial en una presentacion mucho mas fuerte.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo usarlo si aun no trabajo?",
          answer:
            "Si. Justamente esta pensado para mostrar potencial, estudios y habilidades aunque falte experiencia formal.",
        },
        {
          question: "Sirve para pasantias?",
          answer:
            "Si. Es uno de los mejores casos de uso para este tipo de CV.",
        },
        {
          question: "Debo incluir promedio o materias?",
          answer:
            "Depende del caso. Si aportan valor a la busqueda, pueden sumar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Profundiza estrategias para perfiles que recien arrancan.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description: "Refuerza una seccion clave en perfiles iniciales.",
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
