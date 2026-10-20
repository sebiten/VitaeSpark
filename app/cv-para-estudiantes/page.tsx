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
      title="CV para estudiantes que buscan prácticas, pasantías o primer empleo"
      description="Destaca estudios, cursos, proyectos y habilidades con una estructura pensada para perfiles iniciales y postulaciones de entrada."
      intro={[
        "Un CV para estudiantes tiene que compensar la falta de experiencia formal mostrando de manera inteligente estudios, herramientas, proyectos, idiomas y actividades relevantes.",
        "VitaeSpark te ayuda a convertir ese recorrido en un perfil más ordenado y profesional para aplicar a pasantías, prácticas o primer empleo.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Mejor presentación de estudios, cursos y proyectos.",
        "Ideal para pasantías, prácticas profesionales y primer empleo.",
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
          title: "Ejemplo completo de CV: estudiante de [carrera] — postulación a pasantía",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Estudiante de [carrera] — postulación a pasantía · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Estudiante de [carrera y avance real] interesado en una pasantía de [área]. En [materia o proyecto] utilicé [herramienta] para organizar datos y presentar conclusiones.",
            "Proyecto o actividad real: Proyecto académico de análisis de datos · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Recopilé información para el trabajo de [materia], organicé una tabla compartida y preparé una presentación con el equipo. Mi aporte específico fue [tarea realizada].",
            "Formación: [Carrera] · [Institución] · En curso desde [año]. [Avance verificable].",
            "Habilidades: [Herramienta] aplicada al proyecto; búsqueda de información; presentación de resultados; coordinación de entregas.",
            "Disponibilidad académica: [Horarios compatibles con las clases]. Si la pasantía requiere convenio, consulta las condiciones con tu institución antes de afirmarlo en el CV.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
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
          question: "¿Sirve para pasantías?",
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
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
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
