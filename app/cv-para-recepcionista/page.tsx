import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Recepcionista: Ejemplo, Habilidades y Formato ATS",
  description:
    "Arma un CV para recepcionista con ejemplo de perfil, habilidades administrativas, atencion al cliente y formato ATS.",
  path: "/cv-para-recepcionista",
  keywords: [
    "cv para recepcionista",
    "curriculum recepcionista",
    "ejemplo cv recepcionista",
    "habilidades recepcionista curriculum",
    "perfil recepcionista cv",
  ],
});

export default function CvParaRecepcionistaPage() {
  return (
    <MarketingPage
      path="/cv-para-recepcionista"
      eyebrow="CV por profesion"
      title="CV para recepcionista: ejemplo, habilidades y formato ATS"
      description="Prepara un curriculum para recepcionista destacando atencion al publico, agenda, administracion, comunicacion y organizacion diaria."
      intro={[
        "Un CV para recepcionista debe transmitir orden, trato profesional y capacidad para coordinar tareas al mismo tiempo. Este tipo de puesto suele combinar atencion al publico, agenda, llamadas, derivaciones, documentacion y soporte administrativo.",
        "VitaeSpark te ayuda a ordenar esa experiencia en un curriculum mas claro, con palabras clave utiles y una presentacion pensada para empresas, consultorios, hoteles, oficinas o centros de atencion.",
      ]}
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
          title: "Que destacar en un CV para recepcionista",
          paragraphs: [
            "Suele sumar experiencia en atencion presencial y telefonica, gestion de agenda, recepcion de visitas, derivacion de consultas, carga de datos, manejo de documentacion y coordinacion con distintas areas.",
            "Tambien conviene aclarar herramientas o sistemas usados, como planillas, calendarios, software de turnos, CRM, correo corporativo o sistemas internos.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para recepcionista",
          paragraphs: [
            "Una base posible es: 'Perfil orientado a recepcion y atencion al publico, con experiencia en gestion de agenda, llamadas, documentacion y soporte administrativo en entornos dinamicos'.",
            "Ese perfil puede adaptarse a salud, hoteleria, oficinas o comercios. Lo importante es que el resumen nombre el entorno real y las responsabilidades principales.",
          ],
        },
        {
          title: "Habilidades administrativas y de atencion",
          paragraphs: [
            "Entre las habilidades mas utiles suelen estar comunicacion clara, organizacion, manejo de agenda, atencion telefonica, trato cordial, carga de datos, resolucion de consultas y seguimiento de tareas.",
            "Para que el CV funcione mejor en ATS, esas habilidades deberian aparecer tambien dentro de la experiencia, no solo en una lista aislada.",
          ],
        },
        {
          title: "CV para recepcionista sin experiencia",
          paragraphs: [
            "Si buscas tu primer puesto en recepcion, puedes destacar atencion al publico, cursos administrativos, manejo de herramientas digitales, experiencia informal, voluntariado o tareas donde hayas organizado informacion y tratado con personas.",
            "La clave es mostrar orden, disponibilidad, buena comunicacion y capacidad para aprender procesos. Eso vuelve el CV mas creible para puestos iniciales.",
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
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Complementa la parte de trato con usuarios y resolucion de consultas.",
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
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Arma tu curriculum final en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
