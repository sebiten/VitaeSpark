import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Seguridad: Ejemplo, Perfil y Habilidades de Vigilador",
  description:
    "Crea un CV para seguridad o vigilador con ejemplo, perfil profesional, control de accesos, rondas, cámaras, protocolos y formato ATS.",
  path: "/cv-para-seguridad",
  keywords: [
    "cv para seguridad",
    "currículum seguridad",
    "cv vigilador",
    "cv para vigilador",
    "currículum vigilador",
    "ejemplo cv seguridad",
    "habilidades seguridad currículum",
    "cv de seguridad",
  ],
});

export default function CvParaSeguridadPage() {
  return (
    <MarketingPage
      path="/cv-para-seguridad"
      eyebrow="CV por profesión"
      title="CV para seguridad: ejemplo, perfil y habilidades de vigilador"
      description="Armá un currículum para seguridad o vigilador destacando control de accesos, recorridas, prevención, cámaras, registro de novedades y responsabilidad."
      intro={[
        "Un CV para seguridad debe transmitir confianza, atención al detalle y criterio para actuar ante situaciones sensibles. Conviene mostrar experiencia en control de accesos, monitoreo, recorridas, registro de novedades y trato con personas.",
        "VitaeSpark te ayuda a ordenar esa experiencia en un currículum de seguridad más claro, con perfil profesional, habilidades útiles y estructura ATS para vigilancia, control de ingreso o prevención.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-seguridad.png",
        alt: "Ejemplo completo de CV para vigilador de seguridad privada",
        caption:
          "CV ilustrativo de seguridad con accesos, rondas, CCTV y protocolos.",
      }}
      benefits={[
        "Destaca control de accesos, prevención, recorridas y registro de novedades.",
        "Sirve para seguridad privada, vigilancia, consorcios, comercios y empresas.",
        "Ayuda a mostrar responsabilidad y criterio con formato ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de seguridad",
          description:
            "Aclara si fue consorcio, comercio, evento, empresa, depósito o control de ingreso.",
        },
        {
          title: "Describe tareas y protocolos",
          description:
            "Incluye rondas, monitoreo, informes, trato con personas y respuesta ante incidentes.",
        },
        {
          title: "Genera tu CV final",
          description:
            "Obtienes una versión clara para postularte en seguridad privada o vigilancia.",
        },
      ]}
      sections={[
        {
          title: "CV de seguridad: que destacar para que se entienda rápido",
          paragraphs: [
            "Suele sumar experiencia en control de accesos, registro de visitantes, monitoreo de camaras, rondas preventivas, informes de novedades, cumplimiento de protocolos y comunicación con superiores.",
            "Si tienes cursos, habilitaciones, registro de conducir o experiencia nocturna, conviene incluirlo porque puede ser diferencial.",
          ],
        },
        {
          title: "Perfil profesional para seguridad",
          paragraphs: [
            "Una base útil puede ser: 'Perfil orientado a seguridad y vigilancia, con experiencia en control de accesos, recorridas preventivas, registro de novedades y atención responsable ante situaciones operativas'.",
            "No conviene exagerar. En este tipo de CV suma más la claridad, la responsabilidad y el contexto real de tus tareas.",
          ],
        },
        {
          title: "Ejemplo completo de CV: vigilador/a",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Vigilador/a · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Vigilador con experiencia en control de accesos, registro de novedades y recorridas en [tipo de establecimiento]. Aplicación de procedimientos y comunicación con el supervisor.",
            "Experiencia: Vigilador/a · [Empresa y tipo de servicio] · [Mes/año de inicio–mes/año de fin]. Verifiqué ingresos según las autorizaciones del servicio, registré novedades del turno y comuniqué incidencias al supervisor. Realicé recorridas conforme al procedimiento asignado.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Registro de novedades; control de accesos; [equipo de comunicación realmente utilizado]; lectura de procedimientos.",
            "Habilitaciones: [Credencial, jurisdicción y vigencia, si corresponde]. Comprueba los requisitos del puesto y no declares cursos o autorizaciones que no tengas.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "CV para vigilador privado",
          paragraphs: [
            "Usa términos concretos: control de accesos, rondas, registro de visitantes, monitoreo de cámaras, parte diario, prevención, custodia de instalaciones y cumplimiento de protocolos.",
            "Si trabajaste en consorcios, comercios, eventos, empresas o depósitos, menciónalo. El contexto ayuda a entender el nivel de exposición, trato con personas y responsabilidad del puesto.",
          ],
        },
        {
          title: "CV para seguridad sin experiencia",
          paragraphs: [
            "Si estás empezando, podés destacar responsabilidad, puntualidad, disponibilidad horaria, buen trato, atención al detalle, estudios, cursos o experiencias donde hayas cuidado espacios, personas o procedimientos.",
            "También ayuda mencionar si podés trabajar de noche, fines de semana o turnos rotativos, siempre que sea real.",
          ],
        },
        {
          title: "Habilidades de seguridad que suman",
          paragraphs: [
            "Entre las habilidades más útiles estan control de accesos, observacion, registro de novedades, trato respetuoso, cumplimiento de protocolos, monitoreo, recorridas, comunicación clara y respuesta ordenada ante incidentes.",
            "Si tienes curso de vigilador, habilitacion, manejo de camaras, licencia de conducir o experiencia nocturna, conviene incluirlo para que el CV sea más competitivo.",
          ],
        },
        {
          title: "Errores comunes en un currículum de seguridad",
          paragraphs: [
            "Un error frecuente es escribir un perfil demasiado agresivo o exagerado. Para seguridad privada suele funcionar mejor transmitir criterio, calma, responsabilidad y cumplimiento de procedimientos.",
            "También conviene evitar dejar tareas en abstracto. El reclutador necesita leer control de accesos, rondas, camaras, informes, registro de visitantes o respuesta ante novedades si eso forma parte de tu experiencia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Sirve para vigilador privado?",
          answer:
            "Sí. Puedes adaptar el perfil a vigilador, control de accesos, consorcios, eventos o comercios.",
        },
        {
          question: "¿Debo incluir cursos de seguridad?",
          answer:
            "Si los tienes, si. También suma cualquier habilitacion o capacitación relacionada.",
        },
        {
          question: "¿Puedo usarlo si busco mi primer trabajo en seguridad?",
          answer:
            "Sí. Conviene reforzar responsabilidad, disponibilidad, puntualidad y habilidades de observacion.",
        },
        {
          question: "¿Qué habilidades poner en un CV de seguridad?",
          answer:
            "Control de accesos, recorridas, monitoreo, observacion, registro de novedades, cumplimiento de protocolos, trato con personas y comunicación clara.",
        },
        {
          question: "¿Cómo escribir experiencia de vigilador?",
          answer:
            "Menciona lugar o contexto, control de ingresos, rondas, monitoreo, informes, registro de visitantes, respuesta a novedades y cumplimiento de protocolos.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Cercano si tu experiencia incluye control de ingreso y atención.",
        },
        {
          href: "/cv-para-seguridad-sin-experiencia",
          title: "CV para seguridad sin experiencia",
          description: "Útil si estas entrando por primera vez al sector.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Pasa estas ideas a un CV listo para descargar.",
        },
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description: "Alternativa si buscas puestos operativos, depósito o control.",
        },
        {
          href: "/cv-para-primer-empleo",
          title: "CV para primer empleo",
          description: "Útil si estas armando una primera postulación sería.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV administrativo",
          description: "Cercano si tu experiencia incluye registros, informes o control documental.",
        },
      ]}
    />
  );
}
