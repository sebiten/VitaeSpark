import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Minería: Modelo, Perfil y Ejemplo para Minera",
  description:
    "Consulta un modelo de CV para minería con perfil, experiencia, cursos y disponibilidad. Adáptalo a ayudante de mina y prepara tu versión en PDF.",
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
      title="CV para minería: modelo y ejemplo para postular a una minera"
      description="Usa un ejemplo completo en texto para ordenar tu perfil, experiencia, cursos y disponibilidad antes de preparar tu CV en PDF."
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
          title: "Modelo de currículum vitae para minera: ejemplo completo",
          paragraphs: [
            "Ejemplo ficticio de un ayudante con experiencia industrial que busca ingresar a minería. Reemplaza los campos entre corchetes y conserva solo las tareas y capacitaciones que puedas acreditar.",
            "[Nombre y apellido] · Ayudante operativo para minería · [Ciudad, provincia] · [Teléfono] · [Correo electrónico].",
            "Perfil profesional: Ayudante con experiencia en traslado de materiales, preparación de herramientas y apoyo a mantenimiento en un taller industrial. Acostumbrado a seguir instrucciones de seguridad, utilizar elementos de protección personal y comunicar novedades al responsable del sector.",
            "Experiencia: Ayudante de taller · [Empresa] · [Mes/año de inicio–mes/año de fin]. Preparé herramientas y materiales para las reparaciones; colaboré con el movimiento y orden de piezas; registré faltantes y mantuve despejada el área de trabajo según las indicaciones del encargado.",
            "Formación: [Título o estudios cursados] · [Institución] · [Estado y año]. Cursos: [Capacitación de seguridad o técnica] · [Entidad] · [Fecha], únicamente si la realizaste.",
            "Habilidades: organización de herramientas, identificación de materiales, registro de novedades y trabajo con procedimientos. Detalla equipos o instrumentos solo si sabes utilizarlos.",
            "Información adicional: [Disponibilidad real para viajar y trabajar por turnos] · [Licencia de conducir y categoría, si corresponde]. Si no trabajaste en una mina, presenta tu experiencia como industrial; no la conviertas en experiencia minera.",
          ],
        },
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
          title: "Cómo describir experiencia como ayudante de mina",
          paragraphs: [
            "Si ya trabajaste en mina, especifica el sector, a quién asistías y qué tareas realizabas. Por ejemplo: 'Preparé y trasladé materiales para el equipo de mantenimiento, mantuve ordenadas las herramientas y comuniqué faltantes al supervisor al cierre del turno'.",
            "Distingue asistencia de operación: ayudar a un operador no equivale a estar habilitado para manejar su equipo. Añade el nombre de la maquinaria y tu responsabilidad concreta solo cuando formen parte de tu experiencia.",
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
          title: "Cómo adaptar el modelo a planta, mantenimiento o campamento",
          paragraphs: [
            "Para planta, desarrolla las tareas de operación, controles y registros que conoces. Para mantenimiento, especifica la especialidad, las herramientas y si hacías inspecciones, reparaciones o asistencia a técnicos.",
            "Para servicios de campamento, prioriza tu experiencia real en limpieza, cocina, depósito o atención. Cambia el puesto objetivo y el perfil para esa vacante: un mismo currículum no tiene que presentarte como candidato a todas las áreas.",
          ],
        },
        {
          title: "Cómo pasar este modelo de currículum para minera a PDF",
          paragraphs: [
            "Puedes copiar la estructura del ejemplo en tu editor de documentos, completar tus datos y exportarla como PDF. Comprueba que el texto se pueda seleccionar y que teléfono, correo, fechas y cursos se lean correctamente en el celular.",
            "Si prefieres usar VitaeSpark, crea tu CV con tus propios datos, revisa el contenido y realiza el pago único para descargar el PDF. El modelo en texto de esta guía se puede consultar sin pagar; la descarga del CV generado en la plataforma es de pago.",
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
          question: "¿Puedo usar este modelo de CV para minera en PDF?",
          answer:
            "Sí. Copia la estructura en un editor, reemplaza los datos y exporta tu documento como PDF. También puedes crear tu versión en VitaeSpark, donde la descarga del CV generado requiere un pago único.",
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
          href: "/modelo-de-curriculum-vitae",
          title: "Modelo de currículum para completar",
          description: "Copia la estructura en texto y reemplaza cada sección con tus datos.",
        },
        {
          href: "/curriculum-vitae-pdf",
          title: "Cómo preparar tu currículum en PDF",
          description: "Revisa el formato y la lectura del documento antes de enviarlo a una minera.",
        },
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
