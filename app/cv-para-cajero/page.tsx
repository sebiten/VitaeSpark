import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum de Cajero o Cajera: Ejemplo para Supermercado",
  description:
    "Ejemplo completo de CV para cajero o cajera de supermercado. Adapta el perfil profesional, los cobros, el arqueo y la atención al cliente a tu experiencia.",
  path: "/cv-para-cajero",
  keywords: [
    "cv para cajero",
    "curriculum cajero",
    "curriculum cajero supermercado",
    "curriculum cajero sin experiencia",
    "ejemplo cv cajero",
    "habilidades cajero curriculum",
    "curriculum para supermercado",
  ],
});

export default function CvParaCajeroPage() {
  return (
    <MarketingPage
      path="/cv-para-cajero"
      eyebrow="CV por profesion"
      title="Currículum para cajero o cajera: ejemplo de supermercado"
      description="Consulta un CV completo en texto, un perfil profesional y ejemplos de tareas de caja para adaptar a supermercado o comercio."
      intro={[
        "Un CV para cajero tiene que transmitir confianza, orden y capacidad operativa desde el primer vistazo. No alcanza con poner 'manejo de caja': conviene mostrar medios de pago, cierre, atencion, control basico y ritmo de trabajo.",
        "VitaeSpark te ayuda a convertir esa experiencia en un curriculum cajero mas claro, con perfil profesional, habilidades y ejemplos para supermercados, farmacias, tiendas, estaciones de servicio o comercios de cercania.",
      ]}
      conversionCta={{
        title: "Crea tu CV para cajero y descargalo en PDF",
        description:
          "Carga tus tareas de caja, atencion, medios de pago y comercio. La IA lo convierte en un CV profesional listo para enviar.",
        label: "Crear mi CV de cajero",
      }}
      exampleImage={{
        src: "/cv-examples/cv-cajero.png",
        alt: "Ejemplo completo de CV para cajera de supermercado",
        caption:
          "CV ilustrativo para caja con medios de pago, cierre y atención al cliente.",
      }}
      benefits={[
        "Destaca cobros, medios de pago, atencion y tareas de caja reales.",
        "Sirve para retail, supermercados, farmacias y comercios en general.",
        "Ayuda a mostrar orden, confianza y ritmo de trabajo en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el contexto del puesto",
          description:
            "Aclara si fue retail, supermercado, tienda, farmacia o comercio gastronomico.",
        },
        {
          title: "Describe tareas y responsabilidades",
          description:
            "Incluye cobros, arqueo, cierre de caja, atencion al cliente y reposicion si aplica.",
        },
        {
          title: "Genera una version lista para enviar",
          description:
            "Obtienes un CV profesional y facil de leer para procesos de seleccion operativos.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo de currículum de cajera de supermercado",
          paragraphs: [
            "Este ejemplo es ficticio. Puedes adaptar la estructura a un cajero o una cajera, sustituyendo los campos entre corchetes y las tareas por tus datos reales.",
            "[Nombre y apellido] · Cajera de supermercado · [Ciudad] · [Teléfono] · [Correo electrónico].",
            "Perfil profesional: Cajera con experiencia en cobros en efectivo, tarjetas y billeteras virtuales. Atención de consultas sobre precios y promociones, control de comprobantes y cierre de caja conforme al procedimiento del comercio.",
            "Experiencia: Cajera · [Supermercado] · [Mes/año de inicio–mes/año de fin]. Registré productos y procesé cobros; verifiqué precios y promociones con el sector correspondiente; entregué comprobantes y comuniqué diferencias de caja al supervisor.",
            "Otras responsabilidades, si las realizaste: preparé el fondo de apertura, colaboré en el arqueo al cierre del turno y gestioné cambios o devoluciones con autorización del responsable.",
            "Formación: [Estudios, institución y año]. Habilidades: manejo de [sistema de caja utilizado], verificación de medios de pago, atención al público y control de comprobantes.",
            "Disponibilidad: [Horarios y días que puedes cubrir]. Incluye reposición o atención en salón si formaban parte de tu puesto, sin desplazar la experiencia principal en caja.",
          ],
        },
        {
          title: "Que destacar en un CV para cajero",
          paragraphs: [
            "Suele sumar el manejo de efectivo, tarjetas, billeteras virtuales, apertura y cierre de caja, control basico de tickets, atencion al cliente, reposicion, orden de salon y cumplimiento de procedimientos.",
            "Si ademas trabajaste con facturacion, stock o resolucion de reclamos, conviene incluirlo porque te hace ver como un perfil mas completo.",
          ],
        },
        {
          title: "Curriculum cajero para supermercado",
          paragraphs: [
            "Para supermercado conviene mencionar caja, reposicion, control de productos, atencion en salon, medios de pago, orden del sector y capacidad para trabajar con ritmo alto.",
            "Si el puesto combina caja y reposicion, no lo escondas. Muchos comercios valoran perfiles versatiles que puedan cobrar, orientar clientes y apoyar tareas operativas.",
          ],
        },
        {
          title: "Perfil profesional de una cajera o un cajero: ejemplo",
          paragraphs: [
            "Con experiencia: 'Cajero con experiencia en supermercado, procesamiento de cobros y control de comprobantes. Manejo de efectivo, tarjetas y cierre de turno, con atención de consultas y comunicación de incidencias al supervisor'.",
            "Con experiencia en ventas, pero sin un puesto previo en caja: 'Vendedora con experiencia en atención al público, registro de pedidos y organización de productos. Busco incorporarme al área de caja y aportar trato cordial, orden y disposición para aprender el sistema del comercio'.",
            "El segundo ejemplo no atribuye arqueos ni cierres a alguien que nunca los realizó. Elige el punto de partida que puedas sostener en una entrevista.",
          ],
        },
        {
          title: "Cómo describir apertura, arqueo y cierre de caja",
          paragraphs: [
            "Indica tu responsabilidad concreta: 'Verifiqué el fondo de apertura, registré los cobros y contrasté el efectivo y los comprobantes con el reporte al cierre del turno'. Usa esta redacción únicamente si participabas en esas tareas.",
            "Si el cierre lo hacía otra persona, puedes escribir: 'Entregué comprobantes y comuniqué incidencias al responsable para el cierre de caja'. No es necesario presentarte como responsable del arqueo para describir una experiencia útil.",
          ],
        },
        {
          title: "Cómo adaptar el CV a supermercado o comercio minorista",
          paragraphs: [
            "En supermercado, describe el registro de productos, la verificación de promociones y la coordinación ante diferencias de precio. En una tienda, puede ser más relevante explicar cómo combinabas cobros, asesoramiento sobre productos y cambios.",
            "Elige las tareas que coincidan con el aviso. Si también reponías mercadería, aclara cuándo y en qué sector; si utilizabas un sistema de facturación, escribe su nombre y qué operaciones hacías con él.",
          ],
        },
        {
          title: "Ejemplos de experiencia para cajero",
          paragraphs: [
            "Para una experiencia en supermercado, una frase concreta seria: 'Realice cobros en efectivo, tarjeta y billeteras virtuales, manteniendo orden en caja, buena atencion al cliente y apoyo en reposicion durante horarios de alta demanda'.",
            "Para comercio minorista, puedes escribir: 'Atendi clientes en salon, procese pagos, controle tickets y colabore con orden de productos, resolviendo consultas simples y manteniendo una experiencia de compra clara'.",
          ],
        },
        {
          title: "CV para cajero sin experiencia",
          paragraphs: [
            "Si buscás tu primer trabajo como cajero, no conviene dejar el CV vacío. Podés destacar estudios, cursos, manejo básico de herramientas digitales, atención al público, ventas informales, voluntariado o tareas donde hayas usado responsabilidad y organización.",
            "También suma mencionar disponibilidad horaria, precisión, aprendizaje rápido y trato cordial. Para puestos iniciales, el objetivo es mostrar que podés aprender el proceso de caja y sostener una atención ordenada.",
          ],
        },
        {
          title: "Habilidades que suelen mirar reclutadores",
          paragraphs: [
            "Entre las habilidades mas utiles suelen estar manejo de caja, precision, organizacion, atencion al cliente, rapidez operativa, control basico y resolucion de incidencias simples.",
            "Para ATS y reclutadores, el mejor formato sigue siendo el mas claro: titulo, perfil, experiencia, habilidades y estudios. Cuanto menos ruido visual tenga, mejor.",
          ],
        },
        {
          title: "Errores comunes en un curriculum cajero",
          paragraphs: [
            "Un error frecuente es escribir solo 'atencion al cliente' sin explicar tareas. Es mejor mencionar caja, medios de pago, cierre, arqueo, reposicion, facturacion o control de tickets si realmente lo hiciste.",
            "Otro problema es usar un perfil demasiado generico. Para cajero, el reclutador necesita ver confianza, orden, trato con clientes y capacidad para manejar dinero o transacciones sin complicar el proceso.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Como hacer un curriculum cajero para supermercado?",
          answer:
            "Incluye atencion al cliente, cobros, medios de pago, cierre o arqueo de caja, reposicion, orden de salon y disponibilidad horaria si aplica.",
        },
        {
          question: "Sirve para supermercados y farmacias?",
          answer:
            "Si. La estructura funciona bien para distintos comercios, siempre que adaptes el contexto del perfil y la experiencia.",
        },
        {
          question: "Que pasa si no tengo experiencia exacta como cajero?",
          answer:
            "Puedes destacar atencion al publico, ventas, manejo de dinero, estudios, cursos o tareas operativas relacionadas para construir una base creible.",
        },
        {
          question: "Conviene incluir reposicion o tareas de salon?",
          answer:
            "Si. En muchos puestos valoran perfiles versatiles que apoyen mas alla de la caja.",
        },
        {
          question: "Que habilidades poner en un CV de cajero?",
          answer:
            "Manejo de caja, medios de pago, atencion al cliente, cierre o arqueo, orden, precision, reposicion, facturacion basica y resolucion de consultas simples.",
        },
        {
          question: "Como escribir experiencia de cajera o cajero?",
          answer:
            "Describe tareas concretas: cobros, medios de pago, cierre de caja, atencion, orden del sector, reposicion y apoyo en momentos de alta demanda.",
        },
        {
          question: "Que debe incluir un CV de cajero para supermercado?",
          answer:
            "Debe incluir caja, medios de pago, atencion al cliente, reposicion, orden de salon, disponibilidad horaria, cierre o arqueo si aplica y experiencia en ritmo alto.",
        },
      ]}
      relatedLinks={[
        {
          href: "/modelo-de-curriculum-vitae",
          title: "Modelo de currículum para completar",
          description: "Usa una estructura en texto para ordenar contacto, experiencia y formación.",
        },
        {
          href: "/cv-para-cajero-sin-experiencia",
          title: "CV para cajero sin experiencia",
          description: "Pagina especifica si buscas tu primer puesto en caja.",
        },
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description: "Refuerza la parte comercial si tambien atendias clientes o vendias.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Refuerza la parte de trato con usuarios y resolucion de consultas.",
        },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Otra opcion cercana para perfiles de atencion presencial y organizacion.",
        },
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Cercano si tu experiencia en comercio tambien incluye stock y reposicion.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas entrar por primera vez a retail o comercio.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Pasa de estas ideas a una version lista para descargar.",
        },
      ]}
    />
  );
}
