import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Vendedor: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para vendedor con ejemplo de perfil, habilidades comerciales y formato ATS para retail, ventas y atención al cliente.",
  path: "/cv-para-vendedor",
  keywords: [
    "cv para vendedor",
    "currículum vendedor",
    "ejemplo cv vendedor",
    "habilidades vendedor currículum",
    "currículum para ventas",
  ],
});

export default function CvParaVendedorPage() {
  return (
    <MarketingPage
      path="/cv-para-vendedor"
      eyebrow="CV por profesión"
      title="CV para vendedor: ejemplo, habilidades y formato ATS"
      description="Arma un currículum para vendedor destacando atención al cliente, objetivos comerciales, cierre de ventas y experiencia en retail o ventas consultivas."
      intro={[
        "Un CV para vendedor tiene que mostrar más que buena comunicación. Conviene dejar claro que tipo de productos o servicios vendiste, como atendías clientes, que objetivos manejabas y que herramientas usabas para registrar o seguir oportunidades.",
        "VitaeSpark te ayuda a transformar tareas comerciales en un perfil más concreto, con habilidades relevantes, logros mejor redactados y una estructura clara para reclutadores y filtros ATS.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-vendedor.png",
        alt: "Ejemplo completo de CV para vendedor de salón",
        caption:
          "CV ilustrativo comercial con asesoramiento, seguimiento y cierre de ventas.",
      }}
      benefits={[
        "Destaca ventas, atención al cliente, objetivos y resultados comerciales.",
        "Sirve para retail, ventas consultivas, call center, ecommerce y mostrador.",
        "Ayuda a explicar logros sin sonar genérico ni exagerado.",
      ]}
      steps={[
        {
          title: "Define el tipo de venta",
          description:
            "Aclara si fue retail, telefónica, B2B, ecommerce, mostrador o ventas consultivas.",
        },
        {
          title: "Describe tareas y resultados",
          description:
            "Incluye atención, asesoramiento, seguimiento, objetivos, cierre y herramientas usadas.",
        },
        {
          title: "Genera una versión lista",
          description:
            "Obtienes un CV más ordenado para postularte a puestos comerciales.",
        },
      ]}
      sections={[
        {
          title: "Qué destacar en un CV para vendedor",
          paragraphs: [
            "Suele sumar experiencia en atención al cliente, asesoramiento, manejo de objeciones, cierre de ventas, reposición, seguimiento de clientes, cumplimiento de objetivos y uso de sistemas de facturación o CRM.",
            "Si trabajaste con metas mensuales, productos específicos o volumen de atención, conviene incluirlo. Ese contexto vuelve el perfil mucho más fuerte que una lista de tareas sueltas.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para vendedor",
          paragraphs: [
            "Una base útil puede ser: 'Perfil comercial orientado a ventas y atención al cliente, con experiencia en asesoramiento, cierre de operaciones, seguimiento de consultas y cumplimiento de objetivos en entornos de retail o venta directa'.",
            "Lo ideal es adaptarlo a tu rubro. No suena igual vender tecnologia, indumentaria, servicios, autos o productos financieros; cuanto más concreto sea el contexto, mejor.",
          ],
        },
        {
          title: "Habilidades comerciales que aportan valor",
          paragraphs: [
            "Entre las habilidades más buscadas suelen estar comunicación comercial, escucha activa, negociacion, manejo de objeciones, orientación a resultados, atención al cliente, CRM, caja y seguimiento postventa.",
            "Para ATS, conviene usar esos términos de forma natural dentro del perfil, experiencia y habilidades. No hace falta repetir palabras clave sin sentido.",
          ],
        },
        {
          title: "CV para vendedor sin experiencia",
          paragraphs: [
            "Si todavía no trabajaste como vendedor, puedes destacar atención al publico, trato con clientes, actividades comerciales informales, proyectos, cursos o experiencias donde hayas tenido que comunicar, organizar o convencer.",
            "También ayuda explicar disponibilidad, rubro objetivo y habilidades transferibles. Un CV inicial funciona mejor cuando muestra potencial concreto, no solo ganas de aprender.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Sirve para ventas en local o retail?",
          answer:
            "Sí. Puedes usarlo para tiendas, supermercados, indumentaria, tecnologia, farmacias, mostrador y comercios en general.",
        },
        {
          question: "¿Conviene poner objetivos o resultados de venta?",
          answer:
            "Si tienes datos reales, si. Cumplimiento de metas, volumen de clientes o tipo de producto vendido ayudan mucho.",
        },
        {
          question: "¿Puedo usarlo si busco mi primer trabajo en ventas?",
          answer:
            "Sí. En ese caso conviene reforzar habilidades transferibles, atención al publico, cursos y motivación comercial concreta.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description: "Refuerza la parte de trato con clientes y resolución de consultas.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description: "Útil si tu experiencia comercial fue telefónica o por canales remotos.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Complementa perfiles comerciales con manejo de caja y atención.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Convierte estas ideas en un currículum listo para descargar.",
        },
      ]}
    />
  );
}
