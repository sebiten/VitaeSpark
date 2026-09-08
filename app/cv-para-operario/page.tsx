import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV de Operario de Producción: Ejemplo y Perfil Profesional",
  description:
    "Ejemplo completo de currículum de operario de producción con perfil profesional, experiencia y habilidades. Adáptalo a fábrica, empaque o depósito.",
  path: "/cv-para-operario",
  keywords: [
    "cv para operario",
    "curriculum operario",
    "ejemplo cv operario",
    "habilidades operario curriculum",
    "cv operario produccion",
    "cv operario de produccion",
  ],
});

export default function CvParaOperarioPage() {
  return (
    <MarketingPage
      path="/cv-para-operario"
      eyebrow="CV por profesion"
      title="Currículum de operario de producción: ejemplo y perfil profesional"
      description="Adapta un modelo completo con tareas de línea, controles, herramientas y turnos. Incluye ejemplos de perfil para producción y depósito."
      intro={[
        "Un curriculum operario de produccion tiene que mostrar rapido que tareas sabes hacer: linea de produccion, deposito, mantenimiento, embalaje, control de calidad, carga y descarga o logistica. Esa claridad suele importar mas que un texto largo.",
        "VitaeSpark te ayuda a ordenar esas tareas en un CV para operario mas claro, con perfil profesional, habilidades utiles y estructura ATS para empresas industriales, depositos, comercios y servicios.",
      ]}
      conversionCta={{
        title: "Crea tu CV de operario con estructura profesional",
        description:
          "Escribe tus tareas reales y la IA las convierte en experiencia clara, habilidades utiles y un PDF listo para postular.",
        label: "Crear mi CV de operario",
      }}
      exampleImage={{
        src: "/cv-examples/cv-operario.png",
        alt: "Ejemplo completo de CV para operario de producción",
        caption:
          "CV ilustrativo para producción con línea, calidad, herramientas y turnos.",
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
          title: "Ejemplo completo de currículum de operario de producción",
          paragraphs: [
            "Modelo ficticio para adaptar a tu experiencia. Sustituye los campos entre corchetes y elimina cualquier tarea que no hayas realizado.",
            "[Nombre y apellido] · Operario de producción · [Ciudad] · [Teléfono] · [Correo electrónico].",
            "Perfil profesional: Operario con experiencia en armado, control visual y embalaje de productos en línea. Manejo de registros de producción, identificación de unidades defectuosas y preparación del puesto para el siguiente turno.",
            "Experiencia: Operario de producción · [Empresa y rubro] · [Mes/año de inicio–mes/año de fin]. Realicé el armado y empaque según la orden de trabajo; separé unidades con defectos visibles; registré las cantidades terminadas e informé incidencias al encargado de línea.",
            "Formación: [Estudios y estado: completos o en curso] · [Institución] · [Año]. Capacitación: [Curso relacionado con el puesto, entidad y fecha], si corresponde.",
            "Habilidades: interpretación de órdenes de trabajo, control visual, etiquetado, embalaje y registro de producción. Herramientas o máquinas: [Nombre y tareas que sabes realizar con cada una].",
            "Disponibilidad: [Horarios o turnos que puedes cubrir] · [Fecha de incorporación]. No incluyas cifras de productividad ni certificaciones que no puedas respaldar.",
          ],
        },
        {
          title: "Curriculum operario de produccion: que destacar primero",
          paragraphs: [
            "Suele sumar experiencia en produccion, armado, embalaje, control de calidad, deposito, carga y descarga, uso de herramientas, limpieza del sector, mantenimiento basico y cumplimiento de normas de seguridad. Esas tareas explican mejor el perfil que una frase como 'trabajos generales'.",
            "Si trabajaste por objetivos, turnos rotativos, lineas de produccion o tareas fisicas, conviene incluirlo porque muestra adaptacion al ritmo del puesto.",
          ],
        },
        {
          title: "Perfil profesional de operario de producción: ejemplos",
          paragraphs: [
            "Producción: 'Operario con experiencia en armado, empaque y control visual en línea. Acostumbrado a registrar cantidades, detectar desvíos y coordinar la entrega del puesto entre turnos'.",
            "Depósito o almacén: 'Operario con experiencia en recepción de mercadería, preparación de pedidos y control de stock. Manejo de remitos, ubicación de productos y registro de diferencias para su revisión'.",
            "Elige la versión cercana a tu recorrido y concreta el rubro y las herramientas que utilizaste. El perfil puede ocupar tres o cuatro líneas; las tareas detalladas van en experiencia.",
          ],
        },
        {
          title: "Cómo convertir una tarea general en experiencia concreta",
          paragraphs: [
            "En lugar de 'tareas de fábrica', escribe la acción, el producto o proceso y el control realizado: 'Embalé piezas terminadas según la orden de trabajo, verifiqué cantidades y etiqueté los bultos para despacho'.",
            "Si puedes comprobar un resultado, añade el dato y su contexto. Si no tienes registros, describe tu alcance sin inventar porcentajes: sector atendido, tipo de producto, frecuencia del control o coordinación con otro turno.",
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
          title: "Qué cambiar según el tipo de fábrica",
          paragraphs: [
            "En alimentos, puedes describir envasado, identificación de lotes y registros de limpieza si realizabas esas tareas. En metalurgia, detalla las piezas, herramientas y controles de medidas que conoces.",
            "En empaque o logística, prioriza armado de pedidos, etiquetado, control de cantidades y preparación de despachos. No copies una lista de máquinas de una oferta: diferencia las que operabas de aquellas con las que solo colaborabas.",
          ],
        },
        {
          title: "Cómo indicar herramientas, maquinaria y turnos",
          paragraphs: [
            "Relaciona cada herramienta con una tarea: 'Lectura de medidas con calibre para control de piezas' aporta más información que 'manejo de herramientas'. Indica si tu función era operar, abastecer, limpiar o asistir en el equipo.",
            "Separa experiencia de disponibilidad. 'Trabajé en turno nocturno' describe un antecedente; 'disponibilidad para turnos rotativos' indica lo que puedes aceptar ahora. Si una habilitación es relevante, anota su nombre y vigencia reales.",
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
        {
          question: "Como hacer un curriculum operario de produccion mas concreto?",
          answer:
            "Nombra tareas reales como armado, empaque, control visual, deposito, carga y descarga, limpieza del sector, herramientas usadas, turnos y normas de seguridad.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo redactar tu currículum paso a paso",
          description: "Convierte tus tareas en experiencia y revisa el documento antes de enviarlo.",
        },
        {
          href: "/blog/errores-en-el-curriculum",
          title: "Errores que debilitan un curriculum",
          description: "Revisa tareas genericas, falta de contexto y problemas de lectura antes de enviarlo.",
        },
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Cercano si tu experiencia incluye stock, deposito o mercaderia.",
        },
        {
          href: "/cv-para-operario-sin-experiencia",
          title: "CV para operario sin experiencia",
          description: "Util si estas armando una version inicial para fabrica o deposito.",
        },
        {
          href: "/cv-para-mineria",
          title: "CV para mineria",
          description: "Util si apuntas a puestos operativos, mantenimiento o terreno.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Alternativa si tu experiencia operativa incluye control, planillas o soporte de oficina.",
        },
        {
          href: "/",
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
