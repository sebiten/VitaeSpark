import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Operario: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para operario con ejemplo, habilidades de produccion, deposito, mantenimiento y formato ATS.",
  path: "/cv-para-operario",
  keywords: [
    "cv para operario",
    "curriculum operario",
    "ejemplo cv operario",
    "habilidades operario curriculum",
    "cv operario produccion",
  ],
});

export default function CvParaOperarioPage() {
  return (
    <MarketingPage
      path="/cv-para-operario"
      eyebrow="CV por profesion"
      title="CV para operario: ejemplo, habilidades y formato ATS"
      description="Arma un curriculum para operario destacando produccion, deposito, mantenimiento, herramientas, seguridad y trabajo por procesos."
      intro={[
        "Un CV para operario debe mostrar experiencia practica, responsabilidad y capacidad para seguir procedimientos. Conviene aclarar si trabajaste en produccion, deposito, mantenimiento, logistica, embalaje, control de calidad o tareas generales.",
        "VitaeSpark te ayuda a ordenar esas tareas y convertirlas en un perfil mas claro para empresas industriales, depositos, comercios y servicios.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para operario",
        caption:
          "Ejemplo visual de CV adaptable para operario, produccion, deposito y mantenimiento.",
      }}
      benefits={[
        "Destaca produccion, deposito, herramientas, procesos y seguridad.",
        "Sirve para operario general, deposito, logistica, mantenimiento o fabrica.",
        "Ayuda a mostrar experiencia practica y responsabilidad en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de operario",
          description:
            "Aclara si fue produccion, deposito, mantenimiento, logistica o tareas generales.",
        },
        {
          title: "Describe tareas y herramientas",
          description:
            "Incluye maquinaria, herramientas, procesos, control, embalaje o carga si aplica.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una version clara para postularte a puestos operativos.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV para operario",
          paragraphs: [
            "Suele sumar experiencia en produccion, armado, embalaje, control de calidad, deposito, carga y descarga, uso de herramientas, limpieza del sector, mantenimiento basico y cumplimiento de normas de seguridad.",
            "Si trabajaste por objetivos, turnos rotativos, lineas de produccion o tareas fisicas, conviene incluirlo porque muestra adaptacion al ritmo del puesto.",
          ],
        },
        {
          title: "Perfil profesional para operario",
          paragraphs: [
            "Una base posible es: 'Perfil operativo con experiencia en tareas de produccion, deposito y cumplimiento de procesos, con enfoque en responsabilidad, orden, seguridad y trabajo en equipo'.",
            "Lo ideal es adaptar el texto a tu experiencia real: fabrica, deposito, mantenimiento, logistica o servicios generales.",
          ],
        },
        {
          title: "CV para operario sin experiencia",
          paragraphs: [
            "Si estas empezando, puedes destacar disponibilidad horaria, responsabilidad, capacidad fisica, estudios tecnicos, cursos, manejo basico de herramientas o experiencias informales relacionadas.",
            "Para puestos iniciales, suma mostrar ganas de aprender procesos concretos y cumplir rutinas con orden y puntualidad.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para operario de produccion?",
          answer:
            "Si. Tambien puede adaptarse a deposito, mantenimiento, logistica, embalaje o tareas generales.",
        },
        {
          question: "Debo incluir herramientas o maquinaria?",
          answer:
            "Si las usaste, si. Es una de las mejores formas de hacer mas concreto el perfil.",
        },
        {
          question: "Puedo usarlo para primer trabajo operativo?",
          answer:
            "Si. Conviene reforzar disponibilidad, responsabilidad, estudios tecnicos y habilidades practicas.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Cercano si tu experiencia incluye stock, deposito o mercaderia.",
        },
        {
          href: "/cv-para-mineria",
          title: "CV para mineria",
          description: "Util si apuntas a puestos operativos, mantenimiento o terreno.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Arma una version profesional lista para descargar.",
        },
      ]}
    />
  );
}
