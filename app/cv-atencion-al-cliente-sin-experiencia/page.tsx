import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Atención al Cliente sin Experiencia: Ejemplo, Perfil y Habilidades",
  description:
    "Crea un CV para atención al cliente sin experiencia con ejemplo, perfil profesional, habilidades y formato ATS para primer empleo.",
  path: "/cv-atencion-al-cliente-sin-experiencia",
  keywords: [
    "cv atención al cliente sin experiencia",
    "currículum atención al cliente sin experiencia",
    "cv para atención al cliente sin experiencia",
    "perfil atención al cliente sin experiencia",
    "ejemplo cv atención al cliente sin experiencia",
    "primer empleo atención al cliente",
  ],
  image: "/social/cv-atencion-sin-experiencia-og.png",
  imageAlt:
    "Ejemplo de CV para atención al cliente aunque no exista experiencia formal",
  socialTitle: "Tu experiencia sí cuenta para atención al cliente",
  socialDescription:
    "Aprendé a presentar ventas informales, ayuda familiar o atención por redes y convertí esa experiencia en un CV claro.",
});

export default function CvAtencionClienteSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-atencion-al-cliente-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV atención al cliente sin experiencia: ejemplo, perfil y habilidades"
      description="Arma un currículum para atención al cliente sin experiencia destacando estudios, trato con personas, comunicación y disponibilidad."
      intro={[
        "Para postularte a atención al cliente sin experiencia, el CV no tiene que inventar trabajo previo. Tiene que mostrar que sabes comunicarte, aprender procesos, tratar con personas y sostener una atención ordenada desde el primer día.",
        "VitaeSpark te ayuda a transformar estudios, cursos, ventas informales, voluntariados, proyectos o experiencias cotidianas en un currículum más claro para retail, soporte, recepción, chat o mostrador.",
      ]}
      conversionCta={{
        title: "Tu experiencia informal también puede convertirse en un CV",
        description:
          "Incluye ventas por redes, ayuda familiar, estudios, cursos o voluntariado. VitaeSpark te ayuda a presentarlos sin inventar empleos.",
        label: "Crear mi primer CV",
      }}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Te ayuda a destacar habilidades útiles aunque no tengas empleo formal previo.",
        "Sirve para retail, soporte, recepción, call center, mostrador y comercios.",
        "Ordena estudios, cursos, disponibilidad y trato con personas en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de atención",
          description:
            "Aclara si apuntas a mostrador, chat, teléfono, retail, soporte o recepción.",
        },
        {
          title: "Convierte experiencias en evidencia",
          description:
            "Incluye cursos, proyectos, ventas informales, voluntariado o tareas donde hayas tratado con personas.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una versión clara para enviar a puestos iniciales de atención al cliente.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de atención al cliente sin experiencia",
          paragraphs: [
            "Puedes incluir un perfil breve, estudios, cursos, habilidades de comunicación, manejo básico de herramientas digitales, idiomas, disponibilidad horaria y cualquier actividad donde hayas respondido consultas, organizado tareas o tratado con personas.",
            "También sirven experiencias no formales: ventas por redes, ayuda en un negocio familiar, voluntariado, eventos, proyectos escolares o atención informal. Lo importante es explicarlas con seriedad y sin exagerar.",
          ],
        },
        {
          title: "Perfil profesional atención al cliente sin experiencia",
          paragraphs: [
            "Una base posible es: 'Perfil inicial orientado a atención al cliente, con buena comunicación, responsabilidad y disposición para aprender procesos de servicio, seguimiento de consultas y resolución de necesidades de usuarios'.",
            "Si apuntas a un puesto concreto, conviene adaptar el texto: no es lo mismo retail, call center, recepción, soporte por chat o atención presencial.",
          ],
        },
        {
          title: "Ejemplo completo de CV: atención al cliente — perfil inicial",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Atención al cliente — perfil inicial · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado] con participación en [actividad real] que incluyó orientación de personas y respuesta a consultas. Interés en atención presencial o por mensajería.",
            "Proyecto o actividad real: Voluntariado de orientación a participantes · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Recibí a participantes, expliqué horarios y ubicaciones, y derivé consultas al responsable de la actividad cuando no tenía la respuesta.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Escucha y explicación de indicaciones; registro de consultas; [herramienta de mensajería utilizada].",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Habilidades que puedes destacar",
          paragraphs: [
            "Suelen sumar comunicación clara, escucha activa, responsabilidad, organización, empatía, aprendizaje rápido, manejo básico de computadora, correo, planillas, redes sociales o herramientas de mensajería.",
            "Para que el CV se vea más creíble, acompaña esas habilidades con contexto: donde las usaste, en que actividad y para que tipo de tarea.",
          ],
        },
        {
          title: "Cómo hacer que el CV no se vea vacío",
          paragraphs: [
            "Si no tienes empleo formal previo, usa secciones cortas pero concretas: perfil, estudios, cursos, actividades, herramientas, idiomas y disponibilidad. Lo que importa es que el documento explique por que puedes aprender el puesto.",
            "También conviene enlazar este perfil con roles cercanos como call center, recepción o primer empleo, para que el CV pueda adaptarse según la vacante.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo postularme a atención al cliente sin experiencia?",
          answer:
            "Sí. Muchos puestos iniciales valoran trato cordial, comunicación, disponibilidad y ganas de aprender procesos.",
        },
        {
          question: "¿Qué pongo en experiencia si nunca trabaje?",
          answer:
            "Puedes usar proyectos, voluntariado, ventas informales, ayuda familiar, actividades académicas o una sección de cursos y habilidades relevantes.",
        },
        {
          question: "¿Conviene decir que no tengo experiencia?",
          answer:
            "No hace falta remarcarlo demasiado. Es mejor enfocar el CV en lo que si puedes aportar y en tu disponibilidad para aprender.",
        },
        {
          question: "¿Qué habilidades poner en un CV de atención al cliente sin experiencia?",
          answer:
            "Comunicación, escucha activa, responsabilidad, orden, manejo básico de computadora, trato con personas, aprendizaje rápido e idiomas si aplican.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Ordena las secciones esenciales cuando todavía no tienes experiencia formal.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "Currículum de atención al cliente con experiencia",
          description: "Modelo completo para describir canales, reclamos, herramientas y resultados de un trabajo previo.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description: "Útil si apuntas a soporte telefónico, chat o ventas remotas.",
        },
        {
          href: "/cv-para-recepcionista-sin-experiencia",
          title: "CV para recepcionista sin experiencia",
          description: "Buena alternativa si apuntas a agenda, front desk o atención presencial.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Complementa esta página si estas buscando tu primera oportunidad.",
        },
      ]}
    />
  );
}
