import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Atencion al Cliente",
  description:
    "Prepara un curriculum para atencion al cliente destacando comunicacion, resolucion de problemas y experiencia con usuarios.",
  path: "/cv-para-atencion-al-cliente",
  keywords: [
    "cv para atencion al cliente",
    "curriculum atencion al cliente",
    "cv atencion al cliente",
    "curriculum para atencion al cliente",
  ],
});

export default function CvParaAtencionAlClientePage() {
  return (
    <MarketingPage
      path="/cv-para-atencion-al-cliente"
      eyebrow="CV por profesion"
      title="CV para atencion al cliente con foco en comunicacion y resolucion"
      description="Muestra experiencia con clientes, canales de atencion, organizacion y resolucion de problemas con un formato profesional y claro."
      intro={[
        "En atencion al cliente, el CV tiene que mostrar mucho mas que amabilidad. Debe reflejar capacidad para resolver problemas, organizar tareas, manejar volumen de consultas y sostener una buena experiencia para el usuario.",
        "VitaeSpark te ayuda a convertir experiencia operativa y de contacto con clientes en un perfil mas claro, profesional y alineado a busquedas laborales reales.",
      ]}
      benefits={[
        "Mejor forma de explicar experiencia con clientes y canales de atencion.",
        "Util para soporte, customer service, recepcion y roles similares.",
        "Ayuda a destacar habilidades practicas y resultados del dia a dia.",
      ]}
      steps={[
        {
          title: "Define el tipo de rol",
          description:
            "Aclara si apuntas a soporte, customer service, ventas o recepcion.",
        },
        {
          title: "Describe tu experiencia real",
          description:
            "Explica volumen, canales, tareas y habilidades aplicadas en la operacion.",
        },
        {
          title: "Exporta tu CV final",
          description:
            "Obtienes una version lista para procesos de seleccion comerciales u operativos.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV de atencion al cliente",
          paragraphs: [
            "Suele sumar experiencia con clientes, resolucion de consultas, manejo de reclamos, uso de sistemas, seguimiento de casos y coordinacion con otras areas. Tambien ayudan habilidades como comunicacion clara, orden y empatia.",
            "Lo ideal es que esas cualidades no aparezcan solas, sino respaldadas por experiencia y contexto laboral.",
          ],
        },
        {
          title: "Como evitar un perfil demasiado generico",
          paragraphs: [
            "Muchas veces estos CVs repiten frases como 'buen trato con el cliente' sin explicar nada mas. Mejora mucho cuando cuentas en que contexto trabajabas, que volumen manejabas o que responsabilidades concretas tenias.",
            "Ese tipo de detalle hace que el perfil se vea mas profesional y creible.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para roles de call center?",
          answer:
            "Si. La estructura tambien funciona para soporte telefonico, chat o canales digitales.",
        },
        {
          question: "Debo incluir habilidades blandas?",
          answer:
            "Si, pero idealmente acompanadas por experiencia o ejemplos que les den contexto.",
        },
        {
          question: "Puedo usarlo para cambiar de rubro?",
          answer:
            "Si. Muchas habilidades de atencion al cliente son transferibles a otros roles operativos o comerciales.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si estas entrando por primera vez a roles de contacto con clientes.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description: "Elige mejor que habilidades destacar para este tipo de puesto.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Ordena tu experiencia en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
