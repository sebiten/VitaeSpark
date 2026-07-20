import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum Administrativo: Perfil y Ejemplos de Experiencia",
  description:
    "Guía para crear un currículum administrativo con perfil profesional, tareas de oficina, Excel, facturación y ejemplos para auxiliar administrativo.",
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
      title="Currículum administrativo: perfil y ejemplos de experiencia"
      description="Aprende a presentar tareas de oficina, documentación, Excel, facturación y soporte operativo en un CV administrativo claro."
      intro={[
        "Un buen currículum administrativo permite entender rápido qué procesos manejaste: carga de datos, documentación, facturación, agenda, reportes o soporte a otras áreas. Las tareas concretas aportan más que una lista de cualidades generales.",
        "Esta guía reúne ejemplos para perfiles administrativos y auxiliares en oficinas, comercios, consultorios, logística y estudios profesionales.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-administrativo.png",
        alt: "Ejemplo completo de CV para auxiliar administrativa",
        caption:
          "CV ilustrativo administrativo con Excel, documentación, proveedores y reportes.",
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
          title: "Qué debe mostrar un currículum administrativo",
          paragraphs: [
            "Prioriza las tareas relacionadas con el puesto: carga y actualización de datos, archivo, facturación, atención telefónica, agenda, control de documentación, reportes y coordinación interna.",
            "Menciona herramientas solo cuando las hayas usado. Excel, Google Sheets, correo corporativo, CRM y sistemas de gestión ayudan a dimensionar tu autonomía y el tipo de procesos que conoces.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional administrativo",
          paragraphs: [
            "Ejemplo: 'Auxiliar administrativo con experiencia en gestión documental, carga de datos, atención interna y seguimiento de tareas operativas. Manejo de Excel, correo corporativo y sistemas de gestión'.",
            "Adapta la última parte al entorno donde trabajaste. En salud puedes mencionar turnos y documentación de pacientes; en comercio, facturación y proveedores; en logística, remitos, stock y entregas.",
          ],
        },
        {
          title: "Ejemplos de experiencia administrativa",
          paragraphs: [
            "Oficina: 'Actualicé bases de datos, organicé documentación, atendí consultas telefónicas y preparé reportes semanales para las áreas comercial y contable'.",
            "Comercio: 'Colaboré con la emisión y el control de comprobantes, el registro de pagos, el contacto con proveedores y la actualización de planillas de seguimiento'.",
          ],
        },
        {
          title: "Currículum para auxiliar administrativo",
          paragraphs: [
            "Para un puesto auxiliar conviene mostrar qué tareas podías resolver sin supervisión constante y en cuáles brindabas apoyo. Puedes incluir archivo, carga de datos, agenda, facturación, compras, recepción o seguimiento de solicitudes.",
            "Si colaboraste con recursos humanos, logística, ventas o contabilidad, acláralo. Ese contexto diferencia tu experiencia y evita que el cargo quede demasiado amplio.",
          ],
        },
        {
          title: "Cómo armar un CV administrativo sin experiencia",
          paragraphs: [
            "Puedes destacar estudios, cursos, manejo de Excel, atención al público, proyectos académicos o experiencias informales donde hayas organizado información y dado seguimiento a tareas.",
            "En lugar de afirmar que eres organizado, muestra una situación concreta: preparación de planillas, control de entregas, coordinación de un proyecto o administración de pedidos en un negocio familiar.",
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
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Revisa las secciones esenciales antes de completar tu versión administrativa.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para el currículum",
          description: "Elige habilidades relacionadas con tareas y herramientas reales.",
        },
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
          href: "/",
          title: "Crear CV online",
          description: "Crea una version profesional lista para descargar.",
        },
      ]}
    />
  );
}
