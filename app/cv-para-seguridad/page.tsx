import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Seguridad: Ejemplo, Habilidades y Formato ATS",
  description:
    "Crea un CV para seguridad o vigilador con ejemplo de perfil, experiencia, habilidades clave, control de accesos y formato ATS.",
  path: "/cv-para-seguridad",
  keywords: [
    "cv para seguridad",
    "curriculum seguridad",
    "cv vigilador",
    "ejemplo cv seguridad",
    "habilidades seguridad curriculum",
  ],
});

export default function CvParaSeguridadPage() {
  return (
    <MarketingPage
      path="/cv-para-seguridad"
      eyebrow="CV por profesion"
      title="CV para seguridad: ejemplo, habilidades y formato ATS"
      description="Arma un curriculum para seguridad o vigilador destacando control de accesos, recorridas, prevencion, registro de novedades y responsabilidad."
      intro={[
        "Un CV para seguridad debe transmitir confianza, atencion al detalle y criterio para actuar ante situaciones sensibles. Conviene mostrar experiencia en control de accesos, monitoreo, recorridas, registro de novedades y trato con personas.",
        "VitaeSpark te ayuda a ordenar esa experiencia en un CV profesional, claro y enfocado en puestos de vigilador, seguridad privada, control de ingreso o prevencion.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para seguridad",
        caption:
          "Ejemplo visual de CV profesional adaptable para vigilador y seguridad privada.",
      }}
      benefits={[
        "Destaca control de accesos, prevencion, recorridas y registro de novedades.",
        "Sirve para seguridad privada, vigilancia, consorcios, comercios y empresas.",
        "Ayuda a mostrar responsabilidad y criterio con formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de seguridad",
          description:
            "Aclara si fue consorcio, comercio, evento, empresa, deposito o control de ingreso.",
        },
        {
          title: "Describe tareas y protocolos",
          description:
            "Incluye rondas, monitoreo, informes, trato con personas y respuesta ante incidentes.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una version clara para postularte en seguridad privada o vigilancia.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV de seguridad",
          paragraphs: [
            "Suele sumar experiencia en control de accesos, registro de visitantes, monitoreo de camaras, rondas preventivas, informes de novedades, cumplimiento de protocolos y comunicacion con superiores.",
            "Si tienes cursos, habilitaciones, registro de conducir o experiencia nocturna, conviene incluirlo porque puede ser diferencial.",
          ],
        },
        {
          title: "Perfil profesional para seguridad",
          paragraphs: [
            "Una base util puede ser: 'Perfil orientado a seguridad y vigilancia, con experiencia en control de accesos, recorridas preventivas, registro de novedades y atencion responsable ante situaciones operativas'.",
            "No conviene exagerar. En este tipo de CV suma mas la claridad, la responsabilidad y el contexto real de tus tareas.",
          ],
        },
        {
          title: "Ejemplos de experiencia para vigilador o seguridad",
          paragraphs: [
            "Para control de accesos, puedes escribir: 'Realice control de ingreso y egreso de personas, registro de visitantes, verificacion de novedades y comunicacion con responsables del establecimiento segun protocolo'.",
            "Para recorridas preventivas, una frase util seria: 'Efectue rondas internas y externas, monitoreo visual de sectores, deteccion de incidencias y reporte de novedades para mantener condiciones de seguridad'.",
          ],
        },
        {
          title: "CV para seguridad sin experiencia",
          paragraphs: [
            "Si estas empezando, puedes destacar responsabilidad, puntualidad, disponibilidad horaria, buen trato, atencion al detalle, estudios, cursos o experiencias donde hayas cuidado espacios, personas o procedimientos.",
            "Tambien ayuda mencionar si puedes trabajar de noche, fines de semana o turnos rotativos, siempre que sea real.",
          ],
        },
        {
          title: "Habilidades de seguridad que suman",
          paragraphs: [
            "Entre las habilidades mas utiles estan control de accesos, observacion, registro de novedades, trato respetuoso, cumplimiento de protocolos, monitoreo, recorridas, comunicacion clara y respuesta ordenada ante incidentes.",
            "Si tienes curso de vigilador, habilitacion, manejo de camaras, licencia de conducir o experiencia nocturna, conviene incluirlo para que el CV sea mas competitivo.",
          ],
        },
        {
          title: "Errores comunes en un curriculum de seguridad",
          paragraphs: [
            "Un error frecuente es escribir un perfil demasiado agresivo o exagerado. Para seguridad privada suele funcionar mejor transmitir criterio, calma, responsabilidad y cumplimiento de procedimientos.",
            "Tambien conviene evitar dejar tareas en abstracto. El reclutador necesita leer control de accesos, rondas, camaras, informes, registro de visitantes o respuesta ante novedades si eso forma parte de tu experiencia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para vigilador privado?",
          answer:
            "Si. Puedes adaptar el perfil a vigilador, control de accesos, consorcios, eventos o comercios.",
        },
        {
          question: "Debo incluir cursos de seguridad?",
          answer:
            "Si los tienes, si. Tambien suma cualquier habilitacion o capacitacion relacionada.",
        },
        {
          question: "Puedo usarlo si busco mi primer trabajo en seguridad?",
          answer:
            "Si. Conviene reforzar responsabilidad, disponibilidad, puntualidad y habilidades de observacion.",
        },
        {
          question: "Que habilidades poner en un CV de seguridad?",
          answer:
            "Control de accesos, recorridas, monitoreo, observacion, registro de novedades, cumplimiento de protocolos, trato con personas y comunicacion clara.",
        },
        {
          question: "Como escribir experiencia de vigilador?",
          answer:
            "Menciona lugar o contexto, control de ingresos, rondas, monitoreo, informes, registro de visitantes, respuesta a novedades y cumplimiento de protocolos.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Cercano si tu experiencia incluye control de ingreso y atencion.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si estas entrando por primera vez al sector.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Pasa estas ideas a un CV listo para descargar.",
        },
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description: "Alternativa si buscas puestos operativos, deposito o control.",
        },
      ]}
    />
  );
}
