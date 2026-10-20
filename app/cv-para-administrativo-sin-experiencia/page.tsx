import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Administrativo sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para administrativo sin experiencia con ejemplo de perfil, habilidades de organización, manejo de sistemas y formato profesional listo para descargar.",
  path: "/cv-para-administrativo-sin-experiencia",
  keywords: [
    "cv para administrativo sin experiencia",
    "currículum administrativo sin experiencia",
    "cv administrativo sin experiencia",
    "perfil administrativo sin experiencia",
    "ejemplo cv administrativo sin experiencia",
  ],
});

export default function CvParaAdministrativoSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-administrativo-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para administrativo sin experiencia: ejemplo y habilidades"
      description="Mostrá tu capacidad organizativa, manejo de herramientas digitales y atención al detalle aunque sea tu primer empleo en administración."
      intro={[
        "El trabajo administrativo requiere organización, precisión, manejo de información y herramientas digitales. Aunque no tengas experiencia formal, podés demostrar estas habilidades a través de estudios, cursos, proyectos académicos o experiencia informal.",
        "VitaeSpark te ayuda a crear un CV administrativo profesional que destaque tu potencial desde el primer envío.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Enfoca organización, precisión y manejo de herramientas digitales.",
        "Sirve para empresas, oficinas, estudios profesionales y consultoras.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Identificá el área administrativa",
          description:
            "Considerá si apuntás a recursos humanos, finanzas, logística, atención al cliente interno o asistencia de dirección. Cada área valora habilidades distintas.",
        },
        {
          title: "Resaltá habilidades transferibles",
          description:
            "Manejo de datos, organización de archivos, Microsoft Office, comunicación escrita, precisión y gestión del tiempo son relevantes sin importar la experiencia previa.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones administrativas iniciales.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: auxiliar administrativo — perfil inicial",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Auxiliar administrativo — perfil inicial · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado de formación real] con práctica en carga de datos y organización de documentos mediante [herramienta]. Interés en tareas de apoyo de oficina.",
            "Proyecto o actividad real: Proyecto académico de registro de compras · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Cargué comprobantes de práctica en una planilla, ordené archivos por fecha y revisé importes contra los documentos del ejercicio. Presenté el registro al docente.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: [Funciones de planilla que dominas]; clasificación de documentos; revisión de datos; redacción de correos.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué poner en un CV de administrativo sin experiencia",
          paragraphs: [
            "Podés incluir estudios en administración, comercio, contabilidad o carreras afines. También cursos de manejo de herramientas informáticas, gestión documental, atención telefónica y comunicación escrita.",
            "Si realizaste prácticas, trabajos de apoyo en oficinas, o proyectos académicos que involucraron manejo de datos o documentos, presentalos como experiencia relevante.",
          ],
        },
        {
          title: "Ejemplo de perfil para administrativo inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil organizado y detallista orientado a la gestión administrativa, con habilidades en manejo de herramientas digitales, procesamiento de datos y comunicación escrita. Capacidad para aprender procesos rápidamente y mantener la confidencialidad de la información.'",
            "Ajustalo al aviso: para recursos humanos, menciona organización de documentación si la practicaste; para finanzas, registro de datos; para logística, una actividad de inventario. No presentes conocimientos de estudio como experiencia laboral.",
          ],
        },
        {
          title: "Habilidades clave para administrativos sin experiencia",
          paragraphs: [
            "Indica funciones concretas que hayas practicado: filtros y fórmulas en Excel, organización de archivos o redacción de correos. Describe una actividad que las respalde y evita asignarte un nivel intermedio sin poder demostrarlo.",
            "Cursos de Excel avanzado, gestión de base de datos o Administración son muy valorados incluso sin experiencia formal.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo trabajar en administración sin experiencia?",
          answer:
            "Sí. Muchas empresas toman perfiles iniciales con buenos estudios, cursos relacionados y habilidades digitales, aunque no tengan experiencia formal.",
        },
        {
          question: "¿Qué habilidades son más importantes para un administrativo?",
          answer:
            "Organización, precisión, manejo de herramientas digitales (especialmente Excel), comunicación escrita y capacidad de mantener confidencialidad.",
        },
        {
          question: "¿Los cursos de administración suman aunque no tenga experiencia?",
          answer:
            "Sí, especialmente si son prácticos y generan habilidades aplicables como Excel avanzado, gestión documental o atención telefónica.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-para-administrativo",
          title: "CV para administrativo",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description:
            "Perfil similar enfocado en comunicación y resolución de consultas.",
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
