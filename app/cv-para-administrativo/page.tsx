import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Administrativo: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para administrativo con ejemplo de perfil, habilidades de oficina, tareas administrativas y formato ATS.",
  path: "/cv-para-administrativo",
  keywords: [
    "cv para administrativo",
    "curriculum administrativo",
    "ejemplo cv administrativo",
    "habilidades administrativo curriculum",
    "perfil administrativo cv",
  ],
});

export default function CvParaAdministrativoPage() {
  return (
    <MarketingPage
      path="/cv-para-administrativo"
      eyebrow="CV por profesion"
      title="CV para administrativo: ejemplo, habilidades y formato ATS"
      description="Arma un curriculum administrativo claro, con tareas de oficina, manejo de documentacion, sistemas, organizacion y soporte operativo."
      intro={[
        "Un CV para administrativo tiene que mostrar orden, criterio y capacidad para sostener procesos del dia a dia. Conviene explicar si trabajaste con documentacion, facturacion, atencion, carga de datos, reportes, agenda o soporte a distintas areas.",
        "VitaeSpark te ayuda a convertir esas tareas en un perfil profesional mas claro, con palabras clave utiles para reclutadores y una estructura compatible con filtros ATS.",
      ]}
      exampleImage={{
        src: "/example.webp",
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
          title: "Ejemplo de perfil profesional administrativo",
          paragraphs: [
            "Una base posible es: 'Perfil administrativo con experiencia en gestion documental, carga de datos, atencion interna y soporte operativo, con manejo de herramientas digitales y enfoque en orden, seguimiento y cumplimiento de procesos'.",
            "La clave es adaptarlo al tipo de empresa. No es lo mismo administracion en salud, comercio, logistica o un estudio contable; ese contexto vuelve el CV mas relevante.",
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
          question: "Puedo usarlo si no tengo experiencia?",
          answer:
            "Si. Conviene reforzar estudios, cursos, herramientas digitales y habilidades transferibles.",
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
