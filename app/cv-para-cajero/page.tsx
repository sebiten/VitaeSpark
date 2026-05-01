import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Cajero: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea tu CV para cajero en minutos con IA, ejemplo de perfil, habilidades clave y formato ATS listo para descargar.",
  path: "/cv-para-cajero",
  keywords: [
    "cv para cajero",
    "curriculum cajero",
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
      title="CV para cajero: ejemplo, habilidades y formato ATS"
      description="Crea tu CV para cajero en minutos con IA, ejemplo de perfil, habilidades clave y formato ATS listo para descargar."
      intro={[
        "Un CV para cajero tiene que transmitir confianza, orden y capacidad operativa. No alcanza con poner 'manejo de caja': conviene mostrar atencion al cliente, medios de pago, cierre de caja, control basico y trabajo en entornos con ritmo alto.",
        "VitaeSpark te ayuda a convertir esa experiencia en un CV mas claro y competitivo para supermercados, farmacias, tiendas, estaciones de servicio o comercios de cercania.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para cajero",
        caption:
          "Ejemplo visual de CV profesional adaptable para puestos de cajero, retail y atencion al cliente.",
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
          title: "Ejemplo de perfil profesional para cajero",
          paragraphs: [
            "Una base util puede ser: 'Perfil orientado a atencion al cliente y operacion de caja, con experiencia en cobros, manejo de distintos medios de pago, cierre diario y trabajo en entornos dinamicos'.",
            "Si todavia no trabajaste en caja, puedes apoyarte en experiencia de atencion al publico, ventas o tareas operativas donde hayas demostrado responsabilidad y trato con clientes.",
          ],
        },
        {
          title: "CV para cajero sin experiencia",
          paragraphs: [
            "Si buscas tu primer trabajo como cajero, no conviene dejar el CV vacio. Puedes destacar estudios, cursos, manejo basico de herramientas digitales, atencion al publico, ventas informales, voluntariado o tareas donde hayas usado responsabilidad y organizacion.",
            "Tambien suma mencionar disponibilidad horaria, buena comunicacion, precision, aprendizaje rapido y trato cordial. Para puestos iniciales, el objetivo es mostrar que puedes aprender el proceso de caja y sostener una atencion ordenada.",
          ],
        },
        {
          title: "Habilidades que suelen mirar reclutadores",
          paragraphs: [
            "Entre las habilidades mas utiles suelen estar manejo de caja, precision, organizacion, atencion al cliente, rapidez operativa, control basico y resolucion de incidencias simples.",
            "Para ATS y reclutadores, el mejor formato sigue siendo el mas claro: titulo, perfil, experiencia, habilidades y estudios. Cuanto menos ruido visual tenga, mejor.",
          ],
        },
      ]}
      faqs={[
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
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas entrar por primera vez a retail o comercio.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Pasa de estas ideas a una version lista para descargar.",
        },
      ]}
    />
  );
}
