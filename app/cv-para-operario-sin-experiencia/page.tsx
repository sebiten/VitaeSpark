import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Operario sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para operario sin experiencia con ejemplo de perfil, habilidades operativas, disposición física y formato profesional listo para descargar.",
  path: "/cv-para-operario-sin-experiencia",
  keywords: [
    "cv para operario sin experiencia",
    "currículum operario sin experiencia",
    "cv operario sin experiencia",
    "perfil operario sin experiencia",
    "ejemplo cv operario sin experiencia",
  ],
});

export default function CvParaOperarioSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-operario-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para operario sin experiencia: ejemplo y habilidades"
      description="Presentá tu disposición para el trabajo operativo, capacidad de aprendizaje y responsabilidad aunque sea tu primera experiencia en planta o producción."
      intro={[
        "El trabajo operario valora especialmente la responsabilidad, la puntualidad, la capacidad de seguir instrucciones y la disposición física. Aunque no tengas experiencia en producción o planta, podés demostrar esas habilidades a través de otras actividades previas.",
        "VitaeSpark te ayuda a crear un CV operario profesional que comunique tu potencial y disposición para el trabajo.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Enfoca responsabilidad, capacidad de aprendizaje y disposición operativa.",
        "Sirve para fábricas, almacenes, producción, logística y manufactura.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Definí el sector operativo",
          description:
            "Considerá si apuntás a producción, almacén, logística, empaque o manufactura. Cada sector tiene requisitos distintos en cuanto a seguridad y procedimientos.",
        },
        {
          title: "Resaltá habilidades operativas transferibles",
          description:
            "Puntualidad, responsabilidad, trabajo en equipo, capacidad de seguimiento de instrucciones, disposición física y aprendizaje rápido son relevantes para cualquier puesto operario.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones operativas iniciales.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: ayudante de producción — perfil inicial",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Ayudante de producción — perfil inicial · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado] interesado en tareas de empaque y apoyo de producción. En [actividad real] organicé materiales y seguí una secuencia de armado con supervisión.",
            "Proyecto o actividad real: Proyecto de taller o actividad comunitaria · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Preparé materiales, conté unidades y colaboré en el armado de paquetes siguiendo las instrucciones del responsable. Mantuve ordenado el espacio al finalizar.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Conteo y clasificación de materiales; seguimiento de instrucciones; trabajo coordinado; [herramientas que realmente utilizaste].",
            "No declares manejo de maquinaria ni certificaciones de seguridad sin formación y práctica reales. Indica turnos rotativos únicamente si puedes cumplirlos.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué poner en un CV de operario sin experiencia",
          paragraphs: [
            "Podés incluir estudios técnicos, cursos de seguridad e higiene, licencias de conducir si tenés, y cualquier actividad que muestre responsabilidad y trabajo en equipo.",
            "Si participaste en actividades agrícolas, apoyo en construcción, mantenimiento del hogar, o cualquier tarea física, podés presentarlas como experiencia relevante mostrando habilidades transferibles.",
          ],
        },
        {
          title: "Ejemplo de perfil para operario inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil orientado al trabajo operativo con disposición para aprender procesos de producción, responsabilidad, puntualidad y capacidad para trabajar en equipo. Habilidad para seguir instrucciones y mantener estándares de seguridad.'",
            "Ajustalo al sector: producción requiere atención a procedimientos, almacén requiere organización, logística requiere manejo de documentación.",
          ],
        },
        {
          title: "Habilidades clave para operarios sin experiencia",
          paragraphs: [
            "Puntualidad y responsabilidad, Capacidad de aprendizaje rápido, Trabajo en equipo, Disposición física, seguimiento de instrucciones, Conocimiento básico de seguridad e higiene, Disponibilidad para turnos rotativos.",
            "Licencia de conducir, cursos de mantenimiento, manejo de herramientas básicas y conocimiento de normas de seguridad son siempre un plus.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo trabajar como operario sin experiencia?",
          answer:
            "Sí. Muchas fábricas, almacenes y empresas de producción contratan perfiles iniciales que muestren responsabilidad, disposición física y capacidad de aprendizaje.",
        },
        {
          question: "¿Qué es más importante en un CV de operario: experiencia o actitud?",
          answer:
            "Depende de los requisitos del puesto. Si el aviso acepta postulantes sin experiencia, muestra cómo seguiste instrucciones y cumpliste tareas en estudios, proyectos o actividades reales. No atribuyas manejo de máquinas que no utilizaste.",
        },
        {
          question: "¿Necesito estudios técnicos para ser operario?",
          answer:
            "Depende del puesto. Revisa el nivel educativo y las capacitaciones que solicita el aviso. Indica tus estudios reales y distingue los cursos completados de los que aún estás realizando.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-limpieza",
          title: "CV para limpieza",
          description:
            "Perfil similar enfocado en tareas de limpieza industrial.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Guía general para armar tu primer currículum laboral.",
        },
      ]}
    />
  );
}
