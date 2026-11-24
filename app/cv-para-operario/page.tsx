import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum de operario de producción: ejemplo completo",
  description:
    "Copia un modelo de CV de operario de producción. Incluye frases para describir envasado, montaje y control de calidad, más un ejemplo para almacén o depósito.",
  path: "/cv-para-operario",
  keywords: [
    "cv para operario",
    "currículum operario",
    "ejemplo cv operario",
    "habilidades operario currículum",
    "cv operario producción",
    "cv operario de producción",
  ],
});

export default function CvParaOperarioPage() {
  return (
    <MarketingPage
      prioritizeExample
      path="/cv-para-operario"
      eyebrow="CV por profesión"
      title="Currículum de operario de producción: ejemplo y perfil profesional"
      description="Copia el modelo de fábrica y elige las tareas que has realizado: montaje, envasado o control de calidad. Si tu puesto es de almacén o depósito, hay un segundo ejemplo."
      intro={[
        "Piensa en tu último turno. ¿En qué punto de la línea trabajabas, qué material recibías y qué comprobabas antes de entregar el producto? Con esas respuestas puedes redactar tu experiencia para una fábrica de alimentación, una planta de montaje o un almacén.",
      ]}
      conversionCta={{
        title: "Crea tu CV de operario con estructura profesional",
        description:
          "Escribe tus tareas reales y la IA las convierte en experiencia clara, habilidades útiles y un PDF listo para postular.",
        label: "Crear mi CV de operario",
      }}
      exampleImage={{
        src: "/cv-examples/cv-operario.png",
        alt: "Ejemplo completo de CV para operario de producción",
        caption:
          "CV ilustrativo para producción con línea, calidad, herramientas y turnos.",
      }}
      benefits={[
        "Destaca producción, depósito, herramientas, procesos y seguridad.",
        "Sirve para operario general, depósito, logística, mantenimiento o fábrica.",
        "Ayuda a mostrar experiencia práctica y responsabilidad en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de operario",
          description:
            "Aclara si fue producción, depósito, mantenimiento, logística o tareas generales.",
        },
        {
          title: "Describe tareas y herramientas",
          description:
            "Incluye maquinaria, herramientas, procesos, control, embalaje o carga si aplica.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una versión clara para postularte a puestos operativos.",
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
          title: "Ejemplo de CV de operario de depósito y logística",
          paragraphs: [
            "Si tu experiencia fue en depósito, cambia el puesto objetivo y las tareas. No describas controles de línea de producción si en realidad preparabas pedidos o recibías mercadería.",
            "Perfil profesional: Operario de depósito con experiencia en recepción de mercadería, preparación de pedidos y control de cantidades. Registré diferencias en [sistema o planilla utilizada] y coordiné la entrega de bultos para despacho.",
            "Experiencia: Operario de depósito · [Empresa] · [Fechas]. Verifiqué productos contra remitos, ubiqué mercadería según indicaciones, preparé pedidos y comuniqué faltantes antes del despacho.",
            "Habilidades: lectura de remitos, control de stock, etiquetado y orden del depósito. Añade autoelevador, maquinaria o licencia solo si cuentas con experiencia o habilitación real.",
          ],
        },
        {
          title: "Currículum operario de producción: qué destacar primero",
          paragraphs: [
            "Suele sumar experiencia en producción, armado, embalaje, control de calidad, depósito, carga y descarga, uso de herramientas, limpieza del sector, mantenimiento básico y cumplimiento de normas de seguridad. Esas tareas explican mejor el perfil que una frase como 'trabajos generales'.",
            "Si trabajaste por objetivos, turnos rotativos, líneas de producción o tareas físicas, conviene incluirlo porque muestra adaptación al ritmo del puesto.",
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
          title: "Frases de experiencia para envasado, montaje y control de calidad",
          paragraphs: [
            "Envasado: «Revisé el número de lote y el cierre de los envases antes de colocarlos en cajas para expedición».",
            "Montaje: «Preparé las piezas según la orden de fabricación y comprobé el ajuste de cada conjunto antes de pasarlo al siguiente puesto».",
            "Control visual: «Separé las unidades con defectos de acabado y registré la incidencia en el parte de producción». Elige el ejemplo que corresponda a tu tarea y sustituye el producto o el control por el que utilizabas.",
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
            "Si estás empezando, puedes destacar disponibilidad horaria, responsabilidad, capacidad física, estudios técnicos, cursos, manejo básico de herramientas o experiencias informales relacionadas.",
            "Para puestos iniciales, suma mostrar ganas de aprender procesos concretos y cumplir rutinas con orden y puntualidad.",
          ],
        },
        {
          title: "Habilidades de operario que conviene incluir",
          paragraphs: [
            "Entre las habilidades más útiles están cumplimiento de procesos, orden, uso de herramientas, carga y descarga, embalaje, control de calidad, limpieza del sector, seguridad laboral y trabajo por turnos.",
            "Si tienes cursos de seguridad, conocimientos de maquinaria, licencia de conducir o experiencia con depósito, conviene incluirlo en información adicional o experiencia para que no quede perdido.",
          ],
        },
        {
          title: "Errores comunes en un currículum operario",
          paragraphs: [
            "Un error frecuente es escribir tareas demasiado generales, como 'trabajos varios'. Conviene nombrar acciones concretas: armado, embalaje, mantenimiento, carga, control, limpieza industrial o preparación de pedidos.",
            "Otro problema es no aclarar el contexto. Un operario de fábrica, depósito, mantenimiento o logística puede tener tareas muy distintas, y el reclutador necesita entender rápido dónde encaja tu experiencia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Sirve para operario de producción?",
          answer:
            "Sí. También puede adaptarse a depósito, mantenimiento, logística, embalaje o tareas generales.",
        },
        {
          question: "¿Debo incluir herramientas o maquinaria?",
          answer:
            "Sí, si las usaste. Es una de las mejores formas de hacer más concreto el perfil.",
        },
        {
          question: "¿Puedo usarlo para primer trabajo operativo?",
          answer:
            "Sí. Conviene reforzar disponibilidad, responsabilidad, estudios técnicos y habilidades prácticas.",
        },
        {
          question: "¿Qué poner en experiencia de operario?",
          answer:
            "Incluye tareas concretas como producción, armado, embalaje, depósito, carga y descarga, control de calidad, mantenimiento básico, limpieza del sector y uso de herramientas.",
        },
        {
          question: "¿Qué habilidades poner en un CV de operario?",
          answer:
            "Orden, responsabilidad, seguridad laboral, uso de herramientas, trabajo por turnos, cumplimiento de procesos, carga y descarga, control de calidad y mantenimiento básico.",
        },
        {
          question: "¿Cómo hacer un currículum operario de producción más concreto?",
          answer:
            "Nombra tareas reales como armado, empaque, control visual, depósito, carga y descarga, limpieza del sector, herramientas usadas, turnos y normas de seguridad.",
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
          title: "Errores que debilitan un currículum",
          description: "Revisa tareas genéricas, falta de contexto y problemas de lectura antes de enviarlo.",
        },
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Cercano si tu experiencia incluye stock, depósito o mercadería.",
        },
        {
          href: "/cv-para-operario-sin-experiencia",
          title: "CV para operario sin experiencia",
          description: "Útil si estás armando una versión inicial para fábrica o depósito.",
        },
        {
          href: "/cv-para-mineria",
          title: "CV para minería",
          description: "Útil si apuntas a puestos operativos, mantenimiento o terreno.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Alternativa si tu experiencia operativa incluye control, planillas o soporte de oficina.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Arma una versión profesional lista para descargar.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Útil si buscas tu primer puesto operativo o de fábrica.",
        },
      ]}
    />
  );
}
