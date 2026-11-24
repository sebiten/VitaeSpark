import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum sin experiencia: modelo para tu primer empleo",
  description:
    "Copia un modelo completo de CV para tu primer empleo. Incluye perfil, estudios, proyectos y disponibilidad, con un ejemplo de auxiliar de oficina.",
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
      prioritizeExample
      path="/curriculum-sin-experiencia"
      eyebrow="Primer empleo"
      title="Currículum sin experiencia: modelo para tu primer empleo"
      description="Usa el ejemplo de auxiliar de oficina como base y reemplaza los campos entre corchetes con tus estudios, proyectos y disponibilidad."
      intro={[
        "Hacer un currículum sin experiencia puede sentirse difícil porque muchas personas creen que no tienen nada valioso para mostrar. En realidad, un buen CV para primer empleo no depende solo de trabajos previos: también puede destacar estudios, proyectos, prácticas, herramientas, cursos y habilidades relevantes.",
        "La clave está en presentar esa información con orden, criterio y enfoque en el puesto que buscas. VitaeSpark te ayuda a estructurar ese contenido para que tu perfil se vea más sólido, incluso si todavía estás construyendo experiencia laboral formal.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Ayuda a transformar estudios, cursos y proyectos en un perfil más competitivo.",
        "Sirve para primer empleo, pasantías, prácticas y cambios de rubro.",
        "Te guía para evitar el clásico CV vacío o demasiado genérico.",
      ]}
      steps={[
        {
          title: "Empieza por tu objetivo",
          description:
            "Aclara qué tipo de trabajo buscas para definir mejor el tono del CV.",
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
          title: "Ejemplo completo de CV: auxiliar de oficina — perfil inicial",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Auxiliar de oficina — perfil inicial · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado de formación] con conocimientos de [herramienta practicada]. En [actividad real] organicé archivos y preparé un registro de información. Busco mi primera oportunidad en tareas de apoyo administrativo.",
            "Proyecto o actividad real: Proyecto de organización de documentación · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Clasifiqué documentos por fecha, cargué datos en una planilla y revisé registros repetidos antes de entregar el trabajo.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: [Herramienta] para carga y revisión de datos; clasificación de archivos; seguimiento de instrucciones.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué poner en un currículum sin experiencia",
          paragraphs: [
            "Lo más importante es aprovechar todo lo que sí tienes: formación académica, cursos, prácticas, proyectos personales, herramientas, idiomas, voluntariados o actividades donde hayas demostrado responsabilidad y aprendizaje.",
            "También conviene incluir un breve perfil profesional enfocado en tu objetivo. Aunque todavía no tengas historial laboral fuerte, puedes mostrar motivación, base técnica y dirección profesional si el contenido está bien armado.",
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
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV para atención al cliente sin experiencia",
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
          href: "/blog/como-hacer-un-curriculum-sin-experiencia",
          title: "Cómo contar una actividad en tu primer CV",
          description:
            "Convierte un proyecto escolar en una descripción de tus tareas y adáptala al aviso.",
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
