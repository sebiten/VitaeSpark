import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Mineria: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para mineria o minera con ejemplo de perfil, experiencia, habilidades operativas, seguridad, turnos, maquinaria y formato ATS.",
  path: "/cv-para-mineria",
  keywords: [
    "cv para mineria",
    "cv para minera",
    "curriculum para mineria",
    "curriculum para minera",
    "cv minero",
    "cv operario minero",
    "ejemplo cv mineria",
  ],
});

export default function CvParaMineriaPage() {
  return (
    <MarketingPage
      path="/cv-para-mineria"
      eyebrow="CV por profesion"
      title="CV para mineria: ejemplo, habilidades y formato ATS"
      description="Arma un curriculum para minera destacando seguridad, experiencia operativa, turnos, maquinaria, mantenimiento, campamento y disponibilidad."
      intro={[
        "Un CV para mineria tiene que transmitir responsabilidad, resistencia al ritmo de trabajo y respeto por los procedimientos de seguridad. Conviene aclarar si tienes experiencia en yacimientos, plantas, mantenimiento, transporte, laboratorio, deposito, campamento o tareas operativas.",
        "VitaeSpark te ayuda a convertir esa experiencia en un CV claro para postularte a mineras, contratistas, servicios industriales y puestos vinculados al sector.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para mineria",
        caption:
          "Ejemplo visual de CV adaptable para puestos en mineria, operaciones, mantenimiento y servicios industriales.",
      }}
      benefits={[
        "Destaca seguridad, turnos, maquinaria, mantenimiento y experiencia en terreno.",
        "Sirve para operario minero, ayudante, chofer, mantenimiento, planta o servicios.",
        "Ayuda a ordenar habilidades tecnicas y disponibilidad en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el puesto minero",
          description:
            "Aclara si apuntas a operacion, mantenimiento, planta, transporte, seguridad, deposito o campamento.",
        },
        {
          title: "Describe experiencia y requisitos",
          description:
            "Incluye turnos, disponibilidad, cursos, maquinaria, herramientas, EPP, licencias o trabajo en altura si aplica.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una version clara para enviar a mineras, contratistas o bolsas de empleo.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV para mineria",
          paragraphs: [
            "Suele sumar experiencia en seguridad, uso de EPP, cumplimiento de procedimientos, trabajo por turnos, mantenimiento, carga y descarga, operacion de equipos, control de calidad, limpieza industrial, deposito o logistica.",
            "Tambien conviene mencionar disponibilidad para viajar, campamento, roster, turnos rotativos, altura geografica, licencias de conducir, cursos tecnicos y cualquier capacitacion vinculada a seguridad laboral.",
          ],
        },
        {
          title: "Perfil profesional para minera",
          paragraphs: [
            "Una base posible es: 'Perfil operativo orientado a mineria e industria, con experiencia en tareas de terreno, cumplimiento de normas de seguridad, trabajo por turnos y apoyo a procesos de mantenimiento, logistica u operacion'.",
            "Lo importante es adaptar el texto al puesto real. No es lo mismo postularse como operario, ayudante, chofer, tecnico, mecanico, electricista o personal de campamento.",
          ],
        },
        {
          title: "Ejemplos de experiencia para CV minero",
          paragraphs: [
            "Para un perfil operativo, puedes escribir: 'Realice tareas de apoyo en operaciones, orden de area, uso de EPP, cumplimiento de procedimientos y colaboracion con equipos de mantenimiento o logistica en entornos industriales'.",
            "Para mantenimiento o servicios, una frase util seria: 'Colabore en inspecciones, limpieza tecnica, traslado de materiales, asistencia a tecnicos y registro de novedades, respetando normas de seguridad y trabajo por turnos'.",
          ],
        },
        {
          title: "CV para mineria sin experiencia",
          paragraphs: [
            "Si estas buscando entrar al sector, puedes destacar disponibilidad horaria, responsabilidad, condicion fisica, estudios tecnicos, cursos de seguridad e higiene, manejo de herramientas, licencia de conducir o experiencia en industria, deposito, construccion, transporte o mantenimiento.",
            "Para puestos iniciales, ayuda mostrar que entiendes la importancia de seguir procedimientos, usar EPP y trabajar con orden en entornos exigentes.",
          ],
        },
        {
          title: "Requisitos y datos que pueden sumar",
          paragraphs: [
            "En mineria suelen ser relevantes la disponibilidad para roster o campamento, licencia de conducir, cursos de seguridad, experiencia en altura, manejo de herramientas, mantenimiento, transporte, deposito o industria pesada.",
            "No conviene inventar requisitos. Pero si los tienes, deben aparecer de forma visible porque muchas busquedas y filtros se apoyan en palabras como minera, seguridad, turnos, campamento, maquinaria, EPP y mantenimiento.",
          ],
        },
        {
          title: "Errores comunes en un curriculum para mineria",
          paragraphs: [
            "Un error frecuente es hacer un CV demasiado general, sin aclarar si apuntas a operacion, mantenimiento, chofer, ayudante, deposito, planta o campamento.",
            "Otro problema es no mencionar seguridad. Aunque el puesto sea inicial, respetar procedimientos, usar EPP y trabajar con orden son senales importantes para empresas mineras y contratistas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene usar 'CV para mineria' o 'CV para minera'?",
          answer:
            "Ambas busquedas pueden servir. 'Mineria' apunta al rubro y 'minera' suele usarse cuando la persona quiere postularse a una empresa minera.",
        },
        {
          question: "Que habilidades poner para trabajar en mineria?",
          answer:
            "Suelen sumar seguridad, cumplimiento de procedimientos, trabajo por turnos, uso de EPP, herramientas, mantenimiento, logistica, responsabilidad y disponibilidad para viajar o trabajar en campamento.",
        },
        {
          question: "Sirve si no tengo experiencia minera?",
          answer:
            "Si. Puedes enfocar experiencia en industria, deposito, construccion, transporte, mantenimiento, estudios tecnicos, cursos y disponibilidad.",
        },
        {
          question: "Que poner en un CV para trabajar en minera?",
          answer:
            "Puesto objetivo, experiencia operativa o tecnica, seguridad, EPP, turnos, disponibilidad, licencia, cursos, herramientas, maquinaria, mantenimiento o experiencia en industria.",
        },
        {
          question: "Conviene mencionar campamento o roster?",
          answer:
            "Si tienes disponibilidad real para campamento, viaje, roster o turnos rotativos, conviene incluirlo porque puede ser clave para el sector.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description: "Cercano si tu experiencia es operativa, industrial o de produccion.",
        },
        {
          href: "/cv-para-seguridad",
          title: "CV para seguridad",
          description: "Util si apuntas a control, prevencion o cumplimiento de protocolos.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Arma una version profesional lista para descargar.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Refuerza estructura y palabras clave para procesos digitales.",
        },
      ]}
    />
  );
}
