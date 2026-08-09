import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum de Cajera o Cajero: Ejemplo para Supermercado",
  description:
    "Crea un currículum de cajera o cajero con ejemplos de caja, medios de pago, supermercado, retail, atención al cliente y cierre diario.",
  path: "/cv-para-cajero",
  keywords: [
    "cv para cajero",
    "curriculum cajero",
    "curriculum cajero supermercado",
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
      title="Currículum de cajera o cajero para supermercado y comercio"
      description="Presenta tu experiencia de caja, medios de pago, atención al cliente, cierre y tareas de comercio con ejemplos concretos."
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
          title: "Perfil profesional para cajero o cajera",
          paragraphs: [
            "Una base util puede ser: 'Perfil orientado a atencion al cliente y operacion de caja, con experiencia en cobros, manejo de distintos medios de pago, cierre diario y trabajo en entornos dinamicos'.",
            "Si todavia no trabajaste en caja, puedes apoyarte en experiencia de atencion al publico, ventas o tareas operativas donde hayas demostrado responsabilidad y trato con clientes.",
          ],
        },
        {
          title: "Ejemplo de CV para cajero",
          paragraphs: [
            "Una frase concreta puede ser: 'Procese cobros en efectivo, tarjeta y billeteras virtuales, mantuve orden y control en caja, y colabore con atencion al cliente y reposicion en horarios de alta demanda'.",
            "El ejemplo explica tareas reales, nivel de responsabilidad y contacto con clientes sin dejar el perfil en abstracto.",
          ],
        },
        {
          title: "Ejemplos de experiencia para supermercado y comercio",
          paragraphs: [
            "Para una experiencia en supermercado, una frase concreta seria: 'Realice cobros en efectivo, tarjeta y billeteras virtuales, manteniendo orden en caja, buena atencion al cliente y apoyo en reposicion durante horarios de alta demanda'.",
            "Para comercio minorista, puedes escribir: 'Atendi clientes en salon, procese pagos, controle tickets y colabore con orden de productos, resolviendo consultas simples y manteniendo una experiencia de compra clara'.",
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
