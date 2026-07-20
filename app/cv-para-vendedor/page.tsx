import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Vendedor: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para vendedor con ejemplo de perfil, habilidades comerciales y formato ATS para retail, ventas y atención al cliente.",
  path: "/cv-para-vendedor",
  keywords: [
    "cv para vendedor",
    "curriculum vendedor",
    "ejemplo cv vendedor",
    "habilidades vendedor curriculum",
    "curriculum para ventas",
  ],
});

export default function CvParaVendedorPage() {
  return (
    <MarketingPage
      path="/cv-para-vendedor"
      eyebrow="CV por profesion"
      title="CV para vendedor: ejemplo, habilidades y formato ATS"
      description="Arma un curriculum para vendedor destacando atencion al cliente, objetivos comerciales, cierre de ventas y experiencia en retail o ventas consultivas."
      intro={[
        "Un CV para vendedor tiene que mostrar mas que buena comunicacion. Conviene dejar claro que tipo de productos o servicios vendiste, como atendias clientes, que objetivos manejabas y que herramientas usabas para registrar o seguir oportunidades.",
        "VitaeSpark te ayuda a transformar tareas comerciales en un perfil mas concreto, con habilidades relevantes, logros mejor redactados y una estructura clara para reclutadores y filtros ATS.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-vendedor.png",
        alt: "Ejemplo completo de CV para vendedor de salón",
        caption:
          "CV ilustrativo comercial con asesoramiento, seguimiento y cierre de ventas.",
      }}
      benefits={[
        "Destaca ventas, atencion al cliente, objetivos y resultados comerciales.",
        "Sirve para retail, ventas consultivas, call center, ecommerce y mostrador.",
        "Ayuda a explicar logros sin sonar generico ni exagerado.",
      ]}
      steps={[
        {
          title: "Define el tipo de venta",
          description:
            "Aclara si fue retail, telefonica, B2B, ecommerce, mostrador o ventas consultivas.",
        },
        {
          title: "Describe tareas y resultados",
          description:
            "Incluye atencion, asesoramiento, seguimiento, objetivos, cierre y herramientas usadas.",
        },
        {
          title: "Genera una version lista",
          description:
            "Obtienes un CV mas ordenado para postularte a puestos comerciales.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV para vendedor",
          paragraphs: [
            "Suele sumar experiencia en atencion al cliente, asesoramiento, manejo de objeciones, cierre de ventas, reposicion, seguimiento de clientes, cumplimiento de objetivos y uso de sistemas de facturacion o CRM.",
            "Si trabajaste con metas mensuales, productos especificos o volumen de atencion, conviene incluirlo. Ese contexto vuelve el perfil mucho mas fuerte que una lista de tareas sueltas.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para vendedor",
          paragraphs: [
            "Una base util puede ser: 'Perfil comercial orientado a ventas y atencion al cliente, con experiencia en asesoramiento, cierre de operaciones, seguimiento de consultas y cumplimiento de objetivos en entornos de retail o venta directa'.",
            "Lo ideal es adaptarlo a tu rubro. No suena igual vender tecnologia, indumentaria, servicios, autos o productos financieros; cuanto mas concreto sea el contexto, mejor.",
          ],
        },
        {
          title: "Habilidades comerciales que aportan valor",
          paragraphs: [
            "Entre las habilidades mas buscadas suelen estar comunicacion comercial, escucha activa, negociacion, manejo de objeciones, orientacion a resultados, atencion al cliente, CRM, caja y seguimiento postventa.",
            "Para ATS, conviene usar esos terminos de forma natural dentro del perfil, experiencia y habilidades. No hace falta repetir palabras clave sin sentido.",
          ],
        },
        {
          title: "CV para vendedor sin experiencia",
          paragraphs: [
            "Si todavia no trabajaste como vendedor, puedes destacar atencion al publico, trato con clientes, actividades comerciales informales, proyectos, cursos o experiencias donde hayas tenido que comunicar, organizar o convencer.",
            "Tambien ayuda explicar disponibilidad, rubro objetivo y habilidades transferibles. Un CV inicial funciona mejor cuando muestra potencial concreto, no solo ganas de aprender.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para ventas en local o retail?",
          answer:
            "Si. Puedes usarlo para tiendas, supermercados, indumentaria, tecnologia, farmacias, mostrador y comercios en general.",
        },
        {
          question: "Conviene poner objetivos o resultados de venta?",
          answer:
            "Si tienes datos reales, si. Cumplimiento de metas, volumen de clientes o tipo de producto vendido ayudan mucho.",
        },
        {
          question: "Puedo usarlo si busco mi primer trabajo en ventas?",
          answer:
            "Si. En ese caso conviene reforzar habilidades transferibles, atencion al publico, cursos y motivacion comercial concreta.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Refuerza la parte de trato con clientes y resolucion de consultas.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description: "Util si tu experiencia comercial fue telefonica o por canales remotos.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Complementa perfiles comerciales con manejo de caja y atencion.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Convierte estas ideas en un curriculum listo para descargar.",
        },
      ]}
    />
  );
}
