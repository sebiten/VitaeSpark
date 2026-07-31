import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Mineria: Ejemplo Listo para Minera y Ayudante",
  description:
    "Arma tu CV para mineria con ejemplo, perfil profesional, seguridad, turnos, campamento y formato claro para postular a mineras.",
  path: "/cv-para-mineria",
  keywords: [
    "cv para mineria",
    "cv para minera",
    "curriculum para mineria",
    "curriculum para minera",
    "cv minero",
    "cv operario minero",
    "cv para ayudante de mina",
    "ejemplo cv mineria",
  ],
  image: "/social/cv-mineria-conversion-og.png",
  imageAlt:
    "Ejemplo completo de CV para postular a trabajos de minería",
  socialTitle: "¿Querés entrar a minería? Mirá qué debería mostrar tu CV",
  socialDescription:
    "Revisá un ejemplo con seguridad, turnos, licencias y experiencia relacionada antes de postularte.",
});

export default function CvParaMineriaPage() {
  return (
    <MarketingPage
      path="/cv-para-mineria"
      eyebrow="CV por profesion"
      title="CV para mineria listo para postular a mineras"
      description="Ejemplo de curriculum para mineria con perfil profesional, experiencia operativa, seguridad, turnos y datos que suelen mirar las empresas."
      intro={[
        "Si buscas trabajo en mineria, el CV tiene que mostrar rapido puesto objetivo, experiencia operativa, seguridad, disponibilidad y antecedentes cercanos al rubro. El reclutador no deberia tener que adivinar si apuntas a planta, mina, mantenimiento, transporte, deposito o campamento.",
        "VitaeSpark te ayuda a ordenar esa informacion en un curriculum para mineria claro, con perfil profesional, habilidades utiles y estructura ATS para mineras, contratistas y servicios industriales.",
      ]}
      conversionCta={{
        title: "Crea tu CV para mineria en minutos",
        description:
          "Carga tu experiencia, cursos, disponibilidad y puesto objetivo. La IA lo ordena en un CV profesional listo para descargar en PDF.",
        label: "Crear mi CV para mineria",
      }}
      diagnosticCta={{
        title: "Antes de postular a una minera, revisa si tu CV pasa este chequeo",
        description:
          "Marca los puntos que hoy faltan o no se ven claros. Si aparecen dos o mas, conviene ordenar el CV antes de enviarlo.",
        items: [
          "No queda claro si apunto a ayudante, operario, mantenimiento, transporte o campamento.",
          "No menciono seguridad, EPP, turnos, roster o disponibilidad para viajar.",
          "Mi experiencia industrial esta muy general y no conecta con mineria.",
          "Todavia no tengo un PDF prolijo, editable y listo para enviar.",
        ],
        label: "Crear mi CV para mineria",
        trackingLabel: "mineria_diagnostic_cta",
      }}
      exampleImage={{
        src: "/cv-examples/cv-mineria.png",
        alt: "Ejemplo completo de CV para operario de planta minera",
        caption:
          "CV ilustrativo para minería con seguridad, turnos, mantenimiento y disponibilidad.",
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
          title: "Qué destacar en un CV para minería",
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
          title: "Ejemplo de CV para ayudante de mina",
          paragraphs: [
            "Una formula simple puede ser: 'Colabore en tareas de apoyo operativo, traslado de materiales, orden de herramientas, uso de EPP y cumplimiento de procedimientos de seguridad en entornos industriales y de terreno'.",
            "El ejemplo deja claro el tipo de trabajo, el entorno y las medidas de seguridad sin atribuir experiencia que la persona no tenga.",
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
          title: "CV para ayudante de mina: que poner",
          paragraphs: [
            "Para ayudante de mina conviene enfocar el CV en apoyo operativo, orden de herramientas, asistencia a tecnicos, carga y descarga, limpieza de sector, cumplimiento de indicaciones y disponibilidad para turnos o campamento.",
            "Si no tienes experiencia directa, usa antecedentes cercanos: construccion, deposito, mantenimiento, transporte, industria o cursos de seguridad. La clave es mostrar que puedes integrarte a una operacion con disciplina y cuidado.",
          ],
        },
        {
          title: "Modelo de curriculum para minera en PDF",
          paragraphs: [
            "Quien busca un modelo de curriculum para minera suele necesitar un documento simple, claro y listo para enviar. Lo mas importante es que el PDF mantenga buena lectura y no esconda requisitos clave.",
            "Antes de descargarlo, revisa que aparezcan puesto objetivo, experiencia operativa, cursos, licencias, disponibilidad, seguridad, EPP y cualquier antecedente industrial relacionado.",
          ],
        },
        {
          title: "Requisitos y datos que pueden sumar",
          paragraphs: [
            "En mineria suelen ser relevantes la disponibilidad para roster o campamento, licencia de conducir, cursos de seguridad, experiencia en altura, manejo de herramientas, mantenimiento, transporte, deposito o industria pesada.",
            "No conviene inventar requisitos. Si realmente cuentas con ellos, menciona de forma visible experiencia en seguridad, turnos, campamento, maquinaria, EPP o mantenimiento.",
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
          href: "/cv-para-operario-sin-experiencia",
          title: "CV para operario sin experiencia",
          description: "Buena base si quieres entrar a mineria desde industria, deposito o mantenimiento.",
        },
        {
          href: "/cv-para-seguridad",
          title: "CV para seguridad",
          description: "Util si apuntas a control, prevencion o cumplimiento de protocolos.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Alternativa si tu experiencia minera incluye documentacion, control o soporte operativo.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Util si quieres entrar a mineria desde un perfil inicial o sin experiencia directa.",
        },
        {
          href: "/",
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
