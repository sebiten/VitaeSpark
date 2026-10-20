import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Cajero sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para cajero sin experiencia con ejemplo de perfil, habilidades de caja, atención al cliente y formato ATS.",
  path: "/cv-para-cajero-sin-experiencia",
  keywords: [
    "cv para cajero sin experiencia",
    "currículum cajero sin experiencia",
    "cv cajero sin experiencia",
    "perfil cajero sin experiencia",
    "ejemplo cv cajero sin experiencia",
  ],
});

export default function CvParaCajeroSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-cajero-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para cajero sin experiencia: ejemplo y habilidades"
      description="Prepara un currículum para cajero aunque sea tu primer trabajo, destacando responsabilidad, precisión, atención al cliente y disponibilidad."
      intro={[
        "Para un puesto de cajero sin experiencia, el CV debe mostrar confianza, orden y capacidad para aprender procesos. No necesitas inventar manejo de caja: puedes destacar responsabilidad, trato con personas, estudios, cursos y disponibilidad.",
        "VitaeSpark te ayuda a convertir ese punto de partida en un CV claro para supermercados, tiendas, farmacias, estaciones de servicio y comercios.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Referencia visual de un CV inicial con actividades escolares y comunitarias",
        caption: "Referencia visual general de primer empleo. El modelo en texto de esta página está adaptado al puesto; identifica proyectos y voluntariado como actividades, sin presentarlos como empleos."
      }}
      benefits={[
        "Enfoca responsabilidad, precisión, atención al cliente y aprendizaje rápido.",
        "Sirve para supermercados, tiendas, farmacias y comercios de cercania.",
        "Ayuda a presentar un primer CV de caja con estructura ATS.",
      ]}
      steps={[
        {
          title: "Define el comercio objetivo",
          description:
            "Aclara si apuntas a supermercado, farmacia, tienda, local gastronomico o comercio general.",
        },
        {
          title: "Refuerza habilidades transferibles",
          description:
            "Incluye trato con personas, orden, matematicas básicas, herramientas digitales y disponibilidad.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una versión simple y profesional para puestos iniciales de caja.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: auxiliar de caja — primer empleo",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Auxiliar de caja — primer empleo · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado] interesado en aprender tareas de caja. En [actividad real] practiqué registro de cantidades, revisión de importes y atención de consultas.",
            "Proyecto o actividad real: Proyecto escolar de feria o emprendimiento · [Institución, organización o contexto] · [Mes/año de inicio–mes/año de fin]. Preparé una lista de productos y precios, registré cantidades vendidas y comparé el registro con el inventario del proyecto, bajo supervisión del docente.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Cálculo y revisión de importes; planilla de registro; atención a participantes. No declares arqueo profesional ni dominio de un sistema de caja si no los practicaste.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué poner en un CV de cajero sin experiencia",
          paragraphs: [
            "Puedes incluir estudios, cursos, disponibilidad horaria, manejo básico de computadora, responsabilidad, puntualidad, trato cordial, organización y aprendizaje rápido.",
            "Si hiciste ventas informales, ayudaste en un negocio familiar, manejaste dinero en actividades escolares o atendiste personas en voluntariados, puedes contarlo como experiencia relevante sin presentarlo como un empleo formal.",
          ],
        },
        {
          title: "Ejemplo de perfil para cajero inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil inicial orientado a caja y atención al cliente, con responsabilidad, buena comunicación, precisión en tareas operativas y disposición para aprender procesos de cobro, orden y atención en comercio'.",
            "Conviene ajustar ese perfil al lugar donde quieres postularte: supermercado, farmacia, tienda, estación de servicio o comercio local.",
          ],
        },
        {
          title: "Habilidades para puestos de caja",
          paragraphs: [
            "Suelen sumar atención al cliente, precisión, organización, responsabilidad, manejo básico de dinero, aprendizaje rápido, resolución de consultas simples y cumplimiento de procedimientos.",
            "Si tienes disponibilidad para turnos rotativos, fines de semana o horarios comerciales, inclúyelo solo si realmente puedes cumplirlo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo ser cajero sin experiencia?",
          answer:
            "Sí. Muchos comercios toman perfiles iniciales si muestran responsabilidad, buen trato, disponibilidad y capacidad para aprender.",
        },
        {
          question: "¿Debo poner manejo de caja si nunca use una?",
          answer:
            "No conviene inventarlo. Puedes poner predisposicion para aprender procesos de caja y destacar habilidades relacionadas como precisión, orden y trato con clientes.",
        },
        {
          question: "¿Sirve para supermercado?",
          answer:
            "Sí. También se puede adaptar a farmacias, tiendas, estaciones de servicio y comercios.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Versión general si ya tienes experiencia o quieres ampliar la guía.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description: "Refuerza trato con personas, reclamos y atención presencial.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Útil si estas armando tu primer currículum laboral.",
        },
      ]}
    />
  );
}
