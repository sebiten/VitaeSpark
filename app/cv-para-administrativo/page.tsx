import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Administrativo: Ejemplo, Perfil Profesional y Habilidades",
  description:
    "Crea un CV administrativo o auxiliar administrativo con ejemplo, perfil profesional, habilidades de oficina y estructura ATS para postularte mejor.",
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
      title="CV administrativo: ejemplo, perfil profesional y habilidades"
      description="Arma un curriculum administrativo claro, con tareas de oficina, documentacion, sistemas, reportes, soporte operativo y enfoque ATS."
      intro={[
        "Si buscas un puesto administrativo o de auxiliar administrativo, el reclutador necesita ver rapido con que procesos trabajaste: carga de datos, documentacion, facturacion, agenda, reportes, atencion interna o soporte a distintas areas. Un CV administrativo funciona mejor cuando muestra tareas concretas y no solo frases generales.",
        "VitaeSpark te ayuda a ordenar esa experiencia en un curriculum administrativo mas claro, con perfil profesional, habilidades de oficina y una estructura ATS facil de leer para empresas, estudios, consultorios o comercios.",
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
          title: "CV administrativo: que destacar para llamar mas entrevistas",
          paragraphs: [
            "Suele sumar experiencia en carga de datos, archivo, facturacion, atencion telefonica, gestion de agenda, control de documentacion, reportes y coordinacion con otras areas. Conviene mostrar primero las tareas que mas se parecen al puesto al que vas a postularte.",
            "Tambien conviene mencionar herramientas como Excel, Google Sheets, sistemas de gestion, correo corporativo, CRM o software administrativo si realmente los usaste. Son palabras simples, pero ayudan a que el perfil se entienda rapido.",
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
          title: "Como adaptar el CV administrativo al puesto",
          paragraphs: [
            "El reclutador espera ver herramientas, procesos, tareas de oficina y responsabilidad sobre informacion o documentacion. Es mejor describir que hacias y con que recursos que limitarse a nombrar el cargo.",
            "Si tu experiencia fue en ventas, salud, contabilidad, recursos humanos o logistica, menciona el area. Ese detalle ayuda a que el CV conecte mejor con avisos reales.",
          ],
        },
        {
          title: "Ejemplo de CV administrativo para auxiliar administrativo",
          paragraphs: [
            "Una formula simple puede ser: 'Auxiliar administrativo con experiencia en carga y actualizacion de datos, archivo de documentacion, control de planillas, atencion interna y seguimiento de tareas operativas con uso de Excel y sistemas de gestion'.",
            "La frase funciona porque muestra tareas, herramientas y nivel de responsabilidad sin depender de cualidades generales como 'proactividad' u 'organizacion'.",
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
            "Para logistica o deposito, suma remitos, control de stock, planillas, coordinacion de entregas y comunicacion con transportes. Ajustar el contenido al area permite que la experiencia se entienda sin explicaciones adicionales.",
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
        {
          question: "Que debe incluir un CV de auxiliar administrativo?",
          answer:
            "Debe incluir perfil profesional, tareas de oficina, carga de datos, documentacion, Excel, reportes, atencion interna, sistemas usados y experiencia o formacion relacionada.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Conecta tareas administrativas con atencion al publico y agenda.",
        },
        {
          href: "/cv-para-administrativo-sin-experiencia",
          title: "CV administrativo sin experiencia",
          description: "Util si estas buscando tu primer puesto administrativo o auxiliar.",
        },
        {
          href: "/cv-call-center",
          title: "CV call center",
          description: "Cercano si tu experiencia administrativa incluye atencion telefonica y CRM.",
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
