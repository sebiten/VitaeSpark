import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Atencion al Cliente sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para atencion al cliente sin experiencia con perfil profesional, habilidades, ejemplos y formato ATS.",
  path: "/cv-atencion-al-cliente-sin-experiencia",
  keywords: [
    "cv atencion al cliente sin experiencia",
    "curriculum atencion al cliente sin experiencia",
    "cv para atencion al cliente sin experiencia",
    "perfil atencion al cliente sin experiencia",
    "ejemplo cv atencion al cliente sin experiencia",
  ],
});

export default function CvAtencionClienteSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-atencion-al-cliente-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV atencion al cliente sin experiencia: ejemplo y habilidades"
      description="Arma un curriculum para atencion al cliente aunque no hayas trabajado formalmente, destacando estudios, trato con personas, comunicacion y disponibilidad."
      intro={[
        "Para postularte a atencion al cliente sin experiencia, el CV no tiene que fingir trayectoria. Tiene que mostrar que puedes comunicarte bien, aprender procesos, tratar con personas y sostener una atencion ordenada.",
        "VitaeSpark te ayuda a transformar estudios, cursos, voluntariados, ventas informales, proyectos o experiencias cotidianas en un perfil mas profesional y facil de leer.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv atencion al cliente sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para primer empleo en atencion al cliente, retail o soporte.",
      }}
      benefits={[
        "Te ayuda a destacar habilidades utiles aunque no tengas empleo formal previo.",
        "Sirve para retail, soporte, recepcion, call center, mostrador y comercios.",
        "Ordena estudios, cursos, disponibilidad y trato con personas en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de atencion",
          description:
            "Aclara si apuntas a mostrador, chat, telefono, retail, soporte o recepcion.",
        },
        {
          title: "Convierte experiencias en evidencia",
          description:
            "Incluye cursos, proyectos, ventas informales, voluntariado o tareas donde hayas tratado con personas.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una version clara para enviar a puestos iniciales de atencion al cliente.",
        },
      ]}
      sections={[
        {
          title: "Que poner si no tienes experiencia",
          paragraphs: [
            "Puedes incluir un perfil breve, estudios, cursos, habilidades de comunicacion, manejo basico de herramientas digitales, idiomas, disponibilidad horaria y cualquier actividad donde hayas respondido consultas, organizado tareas o tratado con personas.",
            "Tambien sirven experiencias no formales: ventas por redes, ayuda en un negocio familiar, voluntariado, eventos, proyectos escolares o atencion informal. Lo importante es explicarlas con seriedad y sin exagerar.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional",
          paragraphs: [
            "Una base posible es: 'Perfil inicial orientado a atencion al cliente, con buena comunicacion, responsabilidad y disposicion para aprender procesos de servicio, seguimiento de consultas y resolucion de necesidades de usuarios'.",
            "Si apuntas a un puesto concreto, conviene adaptar el texto: no es lo mismo retail, call center, recepcion, soporte por chat o atencion presencial.",
          ],
        },
        {
          title: "Habilidades que puedes destacar",
          paragraphs: [
            "Suelen sumar comunicacion clara, escucha activa, responsabilidad, organizacion, empatia, aprendizaje rapido, manejo basico de computadora, correo, planillas, redes sociales o herramientas de mensajeria.",
            "Para que el CV se vea mas creible, acompana esas habilidades con contexto: donde las usaste, en que actividad y para que tipo de tarea.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo postularme a atencion al cliente sin experiencia?",
          answer:
            "Si. Muchos puestos iniciales valoran trato cordial, comunicacion, disponibilidad y ganas de aprender procesos.",
        },
        {
          question: "Que pongo en experiencia si nunca trabaje?",
          answer:
            "Puedes usar proyectos, voluntariado, ventas informales, ayuda familiar, actividades academicas o una seccion de cursos y habilidades relevantes.",
        },
        {
          question: "Conviene decir que no tengo experiencia?",
          answer:
            "No hace falta remarcarlo demasiado. Es mejor enfocar el CV en lo que si puedes aportar y en tu disponibilidad para aprender.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Version general si ya tienes experiencia o quieres una guia mas amplia.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description: "Util si apuntas a soporte telefonico, chat o ventas remotas.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Complementa esta pagina si estas buscando tu primera oportunidad.",
        },
      ]}
    />
  );
}
