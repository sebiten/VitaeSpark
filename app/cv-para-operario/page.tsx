import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Operario: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para operario con ejemplo de perfil, experiencia, habilidades de produccion, deposito, mantenimiento y formato ATS.",
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
          title: "Ejemplos de experiencia para operario",
          paragraphs: [
            "Para produccion, puedes escribir: 'Realice tareas de armado, control visual, embalaje y apoyo en linea de produccion, cumpliendo procedimientos de seguridad, orden del sector y objetivos diarios'.",
            "Para deposito, una frase util seria: 'Colabore en carga y descarga, preparacion de pedidos, orden de mercaderia, control basico de stock y mantenimiento de espacios operativos limpios y seguros'.",
          ],
        },
        {
          title: "CV para operario sin experiencia",
          paragraphs: [
            "Si estas empezando, puedes destacar disponibilidad horaria, responsabilidad, capacidad fisica, estudios tecnicos, cursos, manejo basico de herramientas o experiencias informales relacionadas.",
            "Para puestos iniciales, suma mostrar ganas de aprender procesos concretos y cumplir rutinas con orden y puntualidad.",
          ],
        },
        {
          title: "Habilidades de operario que conviene incluir",
          paragraphs: [
            "Entre las habilidades mas utiles estan cumplimiento de procesos, orden, uso de herramientas, carga y descarga, embalaje, control de calidad, limpieza del sector, seguridad laboral y trabajo por turnos.",
            "Si tienes cursos de seguridad, conocimientos de maquinaria, licencia de conducir o experiencia con deposito, conviene incluirlo en informacion adicional o experiencia para que no quede perdido.",
          ],
        },
        {
          title: "Errores comunes en un curriculum operario",
          paragraphs: [
            "Un error frecuente es escribir tareas demasiado generales, como 'trabajos varios'. Conviene nombrar acciones concretas: armado, embalaje, mantenimiento, carga, control, limpieza industrial o preparacion de pedidos.",
            "Otro problema es no aclarar el contexto. Un operario de fabrica, deposito, mantenimiento o logistica puede tener tareas muy distintas, y el reclutador necesita entender rapido donde encaja tu experiencia.",
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
        {
          question: "Que poner en experiencia de operario?",
          answer:
            "Incluye tareas concretas como produccion, armado, embalaje, deposito, carga y descarga, control de calidad, mantenimiento basico, limpieza del sector y uso de herramientas.",
        },
        {
          question: "Que habilidades poner en un CV de operario?",
          answer:
            "Orden, responsabilidad, seguridad laboral, uso de herramientas, trabajo por turnos, cumplimiento de procesos, carga y descarga, control de calidad y mantenimiento basico.",
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
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas tu primer puesto operativo o de fabrica.",
        },
      ]}
    />
  );
}
