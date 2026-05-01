import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Cajero sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para cajero sin experiencia con ejemplo de perfil, habilidades de caja, atencion al cliente y formato ATS.",
  path: "/cv-para-cajero-sin-experiencia",
  keywords: [
    "cv para cajero sin experiencia",
    "curriculum cajero sin experiencia",
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
      description="Prepara un curriculum para cajero aunque sea tu primer trabajo, destacando responsabilidad, precision, atencion al cliente y disponibilidad."
      intro={[
        "Para un puesto de cajero sin experiencia, el CV debe mostrar confianza, orden y capacidad para aprender procesos. No necesitas inventar manejo de caja: puedes destacar responsabilidad, trato con personas, estudios, cursos y disponibilidad.",
        "VitaeSpark te ayuda a convertir ese punto de partida en un CV claro para supermercados, tiendas, farmacias, estaciones de servicio y comercios.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para cajero sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para cajero inicial, retail y atencion al cliente.",
      }}
      benefits={[
        "Enfoca responsabilidad, precision, atencion al cliente y aprendizaje rapido.",
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
            "Incluye trato con personas, orden, matematicas basicas, herramientas digitales y disponibilidad.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una version simple y profesional para puestos iniciales de caja.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un CV de cajero sin experiencia",
          paragraphs: [
            "Puedes incluir estudios, cursos, disponibilidad horaria, manejo basico de computadora, responsabilidad, puntualidad, trato cordial, organizacion y aprendizaje rapido.",
            "Si hiciste ventas informales, ayudaste en un negocio familiar, manejaste dinero en actividades escolares o atendiste personas en voluntariados, puedes contarlo como experiencia relevante sin presentarlo como un empleo formal.",
          ],
        },
        {
          title: "Ejemplo de perfil para cajero inicial",
          paragraphs: [
            "Una base util puede ser: 'Perfil inicial orientado a caja y atencion al cliente, con responsabilidad, buena comunicacion, precision en tareas operativas y disposicion para aprender procesos de cobro, orden y atencion en comercio'.",
            "Conviene ajustar ese perfil al lugar donde quieres postularte: supermercado, farmacia, tienda, estacion de servicio o comercio local.",
          ],
        },
        {
          title: "Habilidades para puestos de caja",
          paragraphs: [
            "Suelen sumar atencion al cliente, precision, organizacion, responsabilidad, manejo basico de dinero, aprendizaje rapido, resolucion de consultas simples y cumplimiento de procedimientos.",
            "Si tienes disponibilidad para turnos rotativos, fines de semana o horarios comerciales, incluyelo solo si realmente puedes cumplirlo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo ser cajero sin experiencia?",
          answer:
            "Si. Muchos comercios toman perfiles iniciales si muestran responsabilidad, buen trato, disponibilidad y capacidad para aprender.",
        },
        {
          question: "Debo poner manejo de caja si nunca use una?",
          answer:
            "No conviene inventarlo. Puedes poner predisposicion para aprender procesos de caja y destacar habilidades relacionadas como precision, orden y trato con clientes.",
        },
        {
          question: "Sirve para supermercado?",
          answer:
            "Si. Tambien se puede adaptar a farmacias, tiendas, estaciones de servicio y comercios.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Version general si ya tienes experiencia o quieres ampliar la guia.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Refuerza trato con personas, reclamos y atencion presencial.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Util si estas armando tu primer curriculum laboral.",
        },
      ]}
    />
  );
}
