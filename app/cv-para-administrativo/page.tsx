import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Administrativo: Auxiliar, Perfil Profesional y Ejemplos",
  description:
    "Crea un CV administrativo o auxiliar administrativo con perfil profesional, ejemplos de experiencia, habilidades de oficina y formato ATS.",
  path: "/cv-para-administrativo",
  keywords: [
    "cv para administrativo",
    "curriculum administrativo",
    "ejemplo cv administrativo",
    "habilidades administrativo curriculum",
    "perfil administrativo cv",
    "cv administrativa",
    "curriculum auxiliar administrativo",
    "perfil profesional administrativo ejemplo",
  ],
});

export default function CvParaAdministrativoPage() {
  return (
    <MarketingPage
      path="/cv-para-administrativo"
      eyebrow="CV por profesion"
      title="CV administrativo: auxiliar, perfil profesional y ejemplos"
      description="Arma un curriculum administrativo claro, con tareas de oficina, documentacion, sistemas, organizacion, reportes y soporte operativo."
      intro={[
        "Un CV para administrativo tiene que mostrar orden, criterio y capacidad para sostener procesos del dia a dia. Conviene explicar si trabajaste con documentacion, facturacion, atencion, carga de datos, reportes, agenda o soporte a distintas areas.",
        "VitaeSpark te ayuda a convertir esas tareas en un perfil profesional mas claro, con palabras clave utiles para reclutadores y una estructura compatible con filtros ATS.",
      ]}
      exampleImage={{
        src: "/elegance-good.webp",
        alt: "ejemplo de cv para administrativo",
        caption:
          "Ejemplo visual de CV profesional adaptable para puestos administrativos y de oficina.",
      }}
      benefits={[
        "Destaca organizacion, carga de datos, documentacion y soporte de oficina.",
        "Sirve para administracion, recepcion, facturacion y asistencia operativa.",
        "Ayuda a explicar tareas administrativas sin que el CV suene generico.",
      ]}
      steps={[
        {
          title: "Define el entorno administrativo",
          description:
            "Aclara si fue oficina, comercio, salud, estudio contable, logistica o empresa de servicios.",
        },
        {
          title: "Describe procesos y herramientas",
          description:
            "Incluye sistemas, planillas, facturacion, reportes, agenda y documentacion.",
        },
        {
          title: "Genera tu version final",
          description:
            "Obtienes un CV administrativo mas ordenado y listo para postularte.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV administrativo",
          paragraphs: [
            "Suele sumar experiencia en carga de datos, archivo, facturacion, atencion telefonica, gestion de agenda, control de documentacion, reportes y coordinacion con otras areas.",
            "Tambien conviene mencionar herramientas como Excel, Google Sheets, sistemas de gestion, correo corporativo, CRM o software administrativo si realmente los usaste.",
          ],
        },
        {
          title: "Perfil profesional administrativo ejemplo",
          paragraphs: [
            "Una base posible es: 'Perfil administrativo con experiencia en gestion documental, carga de datos, atencion interna y soporte operativo, con manejo de herramientas digitales y enfoque en orden, seguimiento y cumplimiento de procesos'.",
            "La clave es adaptarlo al tipo de empresa. No es lo mismo administracion en salud, comercio, logistica o un estudio contable; ese contexto vuelve el CV mas relevante.",
          ],
        },
        {
          title: "CV administrativa: como adaptar el lenguaje",
          paragraphs: [
            "Muchas personas buscan 'cv administrativa' o 'curriculum administrativo'. En ambos casos, el reclutador espera ver herramientas, procesos, tareas de oficina y responsabilidad sobre informacion o documentacion.",
            "Si tu experiencia fue en ventas, salud, contabilidad, recursos humanos o logistica, menciona el area. Ese detalle ayuda a que el CV conecte mejor con avisos reales.",
          ],
        },
        {
          title: "Ejemplos de experiencia administrativa",
          paragraphs: [
            "Para auxiliar administrativo, puedes escribir: 'Realice carga y actualizacion de datos, archivo de documentacion, seguimiento de solicitudes internas, atencion telefonica y soporte a tareas operativas de oficina'.",
            "Para facturacion o comercio, una frase util seria: 'Colabore en emision y control de comprobantes, organizacion de planillas, contacto con clientes o proveedores y registro de informacion en sistema de gestion'.",
          ],
        },
        {
          title: "Ejemplo curriculum administrativo segun el area",
          paragraphs: [
            "Para administracion comercial, conviene mencionar pedidos, facturacion, contacto con clientes, proveedores y soporte a ventas. Para recursos humanos, destaca legajos, documentacion, asistencia a entrevistas, carga de novedades y seguimiento interno.",
            "Para logistica o deposito, suma remitos, control de stock, planillas, coordinacion de entregas y comunicacion con transportes. Ajustar el area hace que el CV responda mejor a busquedas como cv administrativa o curriculum auxiliar administrativo.",
          ],
        },
        {
          title: "Curriculum auxiliar administrativo",
          paragraphs: [
            "Si apuntas a auxiliar administrativo, conviene que el CV muestre herramientas concretas: Excel, planillas, correo, agenda, documentacion, carga de datos, archivo, facturacion, CRM o sistemas internos.",
            "Tambien suma aclarar si diste soporte a compras, ventas, recursos humanos, logistica, recepcion o contabilidad, porque cada area usa palabras clave distintas.",
          ],
        },
        {
          title: "CV administrativo sin experiencia",
          paragraphs: [
            "Si buscas tu primer trabajo administrativo, puedes destacar estudios, cursos, manejo de Excel, organizacion, atencion al publico, proyectos academicos o experiencias donde hayas trabajado con informacion y seguimiento de tareas.",
            "Para perfiles iniciales, el objetivo es mostrar orden, responsabilidad, aprendizaje rapido y herramientas concretas que puedas aplicar desde el primer dia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Que habilidades poner en un CV administrativo?",
          answer:
            "Suelen sumar organizacion, Excel, carga de datos, documentacion, atencion telefonica, reportes, agenda y manejo de sistemas administrativos.",
        },
        {
          question: "Sirve para auxiliar administrativo?",
          answer:
            "Si. Puedes adaptar el contenido a puestos de auxiliar, asistente, recepcion o soporte administrativo.",
        },
        {
          question: "Que poner en experiencia administrativa?",
          answer:
            "Carga de datos, archivo, facturacion, atencion telefonica, agenda, reportes, seguimiento de solicitudes, correo, planillas, documentacion y soporte a otras areas.",
        },
        {
          question: "Puedo usarlo si no tengo experiencia?",
          answer:
            "Si. Conviene reforzar estudios, cursos, herramientas digitales y habilidades transferibles.",
        },
        {
          question: "Como escribir un perfil profesional administrativo?",
          answer:
            "Menciona el area, las tareas principales y las herramientas usadas: documentacion, carga de datos, Excel, agenda, facturacion, reportes, correo o sistemas internos.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Conecta tareas administrativas con atencion al publico y agenda.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas tu primer puesto administrativo.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Crea una version profesional lista para descargar.",
        },
      ]}
    />
  );
}
