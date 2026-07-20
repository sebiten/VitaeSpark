import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum para Recepcionista: Perfil, Tareas y Ejemplos",
  description:
    "Guía para crear un currículum de recepcionista con perfil profesional, agenda, llamadas y ejemplos para oficina, consultorio u hotel.",
  path: "/cv-para-recepcionista",
  keywords: [
    "cv para recepcionista",
    "curriculum recepcionista",
    "ejemplo cv recepcionista",
    "habilidades recepcionista curriculum",
    "perfil recepcionista cv",
    "cv para recepcionista sin experiencia",
    "curriculum vitae de recepcionista",
  ],
});

export default function CvParaRecepcionistaPage() {
  return (
    <MarketingPage
      path="/cv-para-recepcionista"
      eyebrow="CV por profesion"
      title="Currículum para recepcionista: perfil, tareas y ejemplos"
      description="Presenta con claridad tu experiencia en agenda, llamadas, turnos, atención al público y soporte administrativo."
      intro={[
        "Un currículum de recepcionista debe permitir entender rápido qué tipo de atención realizaste y qué tareas coordinabas: agenda, llamadas, turnos, correo, documentación, carga de datos o recepción de visitas.",
        "Los ejemplos de esta guía se pueden adaptar a oficinas, consultorios, hoteles, comercios y centros de atención sin mezclar responsabilidades que no forman parte de tu experiencia.",
      ]}
      conversionCta={{
        title: "Crea tu CV para recepcionista sin empezar de cero",
        description:
          "Escribe tus tareas de recepcion, agenda y atencion. La IA arma una version profesional, ordenada y lista para descargar en PDF.",
        label: "Crear mi CV de recepcionista",
      }}
      benefits={[
        "Destaca atencion al publico, agenda, llamadas y tareas administrativas.",
        "Sirve para recepcion en oficinas, salud, hoteleria, comercios y empresas.",
        "Ayuda a mostrar organizacion y trato profesional con formato ATS.",
      ]}
      steps={[
        {
          title: "Define el entorno de recepcion",
          description:
            "Aclara si fue oficina, consultorio, hotel, comercio, edificio o centro de atencion.",
        },
        {
          title: "Describe tareas diarias",
          description:
            "Incluye agenda, llamadas, visitas, documentacion, derivaciones y sistemas usados.",
        },
        {
          title: "Descarga tu CV final",
          description:
            "Obtienes una version profesional para procesos administrativos y de atencion.",
        },
      ]}
      sections={[
        {
          title: "Qué debe mostrar un CV para recepcionista",
          paragraphs: [
            "Prioriza atención presencial y telefónica, gestión de agenda, recepción de visitas, derivación de consultas, carga de datos y coordinación con otras áreas.",
            "Añade las herramientas que realmente utilizaste: calendarios, software de turnos, planillas, CRM, correo corporativo o sistemas internos.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para recepcionista",
          paragraphs: [
            "Oficina: 'Recepcionista con experiencia en atención presencial y telefónica, gestión de agenda, documentación y soporte administrativo. Manejo de correo corporativo y planillas'.",
            "Consultorio: 'Recepcionista con experiencia en coordinación de turnos, recepción de pacientes, actualización de agenda y derivación de consultas con trato claro y respetuoso'.",
          ],
        },
        {
          title: "Ejemplos de experiencia para oficina y consultorio",
          paragraphs: [
            "Oficina: 'Gestioné la recepción de visitas, la atención telefónica, el correo, la agenda de reuniones y la actualización de documentación y planillas internas'.",
            "Consultorio: 'Coordiné turnos, recibí pacientes, actualicé la agenda, organicé documentación y derivé consultas al profesional correspondiente'.",
          ],
        },
        {
          title: "Cómo adaptar el contenido a hotelería o comercio",
          paragraphs: [
            "En hotelería conviene describir reservas, ingresos, consultas de huéspedes, coordinación con limpieza y manejo de sistemas de recepción. En comercio, atención presencial, reclamos, cobros simples y derivación de consultas.",
            "El contexto importa porque permite distinguir una recepción administrativa de una función orientada a huéspedes o clientes.",
          ],
        },
        {
          title: "Currículum para recepcionista sin experiencia",
          paragraphs: [
            "Puedes destacar cursos administrativos, herramientas digitales, atención al público informal, voluntariado o actividades donde hayas organizado información y tratado con personas.",
            "Acompaña habilidades como comunicación y organización con un ejemplo concreto. También ayuda indicar disponibilidad horaria, idiomas y manejo básico de correo, calendarios o planillas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para recepcion en consultorios?",
          answer:
            "Si. Solo conviene adaptar el contenido a turnos, pacientes, agenda medica y documentacion si ese fue tu contexto.",
        },
        {
          question: "Que habilidades poner para recepcionista?",
          answer:
            "Suelen sumar organizacion, comunicacion, agenda, atencion telefonica, trato cordial, carga de datos y manejo de herramientas administrativas.",
        },
        {
          question: "Puedo usarlo si no tengo experiencia?",
          answer:
            "Si. En ese caso conviene reforzar cursos, herramientas, experiencia de atencion al publico y habilidades transferibles.",
        },
        {
          question: "Que poner en experiencia de recepcionista?",
          answer:
            "Agenda, llamadas, recepcion de visitas, turnos, documentacion, carga de datos, derivacion de consultas, correo, planillas y soporte administrativo.",
        },
        {
          question: "Como hacer un CV para recepcionista sin experiencia?",
          answer:
            "Enfoca cursos, herramientas digitales, atencion al publico, organizacion, disponibilidad y ejemplos donde hayas tratado con personas o administrado informacion.",
        },
        {
          question: "Que debe incluir un curriculum recepcionista para consultorio?",
          answer:
            "Debe incluir agenda, turnos, recepcion de pacientes o visitas, llamadas, documentacion, trato claro, correo, planillas y sistemas usados si corresponde.",
        },
        {
          question: "Como hacer un curriculum para recepcionista?",
          answer:
            "Empieza con un perfil breve, agrega experiencia en agenda, llamadas, recepcion de visitas, turnos, documentacion, planillas y adapta el contenido al lugar: oficina, consultorio, hotel, comercio o restaurante.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Comprueba que tu CV tenga todas las secciones necesarias.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Complementa la parte de trato con usuarios y resolucion de consultas.",
        },
        {
          href: "/cv-para-recepcionista-sin-experiencia",
          title: "CV para recepcionista sin experiencia",
          description: "Util si estas armando una version inicial para consultorio, oficina o comercio.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas tu primer puesto administrativo o de recepcion.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Otra opcion cercana para perfiles de atencion presencial.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Cercano si tu experiencia de recepcion incluye archivo, planillas o soporte de oficina.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Arma tu curriculum final en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
