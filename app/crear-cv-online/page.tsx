import { MarketingPage } from "@/components/seo/MarketingPage";
import { PRICING } from "@/lib/pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crear CV Online Editable en Minutos con IA",
  description:
    `Crea tu curriculum online con IA, editalo desde tu perfil y descargalo en PDF con enfoque ATS. ${PRICING.copy.seoLine}`,
  path: "/crear-cv-online",
  keywords: [
    "crear cv online",
    "crear curriculum online",
    "hacer curriculum vitae",
    "curriculum vitae online",
    "crear cv pdf",
  ],
});

export default function CrearCvOnlinePage() {
  return (
    <MarketingPage
      path="/crear-cv-online"
      eyebrow="Crear CV online"
      title="Crear curriculum online editable para conseguir entrevistas mas rapido"
      description="Arma tu curriculum vitae online con ayuda de IA, plantillas profesionales, edición posterior y enfoque ATS para postularte mejor."
      intro={[
        "Crear un curriculum online ya no consiste solo en llenar un formulario y descargar un PDF. Si quieres conseguir entrevistas, necesitas un CV que explique bien tu experiencia, ordene tus logros y use un formato que reclutadores y sistemas ATS puedan leer sin friccion.",
        "VitaeSpark esta pensado para personas que quieren hacer un CV profesional en poco tiempo, pero sin resignar claridad ni impacto. El flujo te ayuda a elegir una plantilla, completar tu informacion y mejorar la redaccion con inteligencia artificial para que el resultado final se vea serio y listo para enviar.",
      ]}
      benefits={[
        "Redaccion guiada para transformar datos sueltos en un curriculum mas convincente.",
        "Plantillas listas para editar, descargar en PDF y compartir en postulaciones reales.",
        "Estructura orientada a mejorar legibilidad para reclutadores y filtros ATS.",
      ]}
      steps={[
        {
          title: "Elige una plantilla",
          description:
            "Selecciona un diseno profesional alineado al tipo de trabajo que buscas.",
        },
        {
          title: "Completa tus datos",
          description:
            "Carga experiencia, estudios, habilidades e informacion adicional con una guia clara.",
        },
        {
          title: "Edita y descarga",
          description:
            "La app optimiza el contenido y deja tu CV guardado para editarlo cuando lo necesites.",
        },
      ]}
      sections={[
        {
          title: "Por qué hacer tu currículum online",
          paragraphs: [
            "Un editor online te permite ajustar rápidamente tu CV cuando cambiás de puesto objetivo, agregás una experiencia o querés adaptar tu perfil a una vacante específica. Mantenerlo actualizado y bien estructurado ayuda a que la información importante se entienda desde la primera lectura.",
            "Además, cuando el flujo está bien resuelto, también te ayuda a pensar mejor el contenido. No se trata solo del formato: un buen constructor de CV online ordena la información, prioriza lo relevante y facilita que tu propuesta profesional se entienda en segundos.",
          ],
        },
        {
          title: "Que debe tener un buen CV para trabajo",
          paragraphs: [
            "Un curriculum efectivo debe mostrar con claridad quien eres, que rol buscas y que logros o capacidades te hacen una buena opcion. Tambien necesita una estructura limpia, buena jerarquia visual y texto concreto, sin frases vacias.",
            "Para puestos competitivos, la diferencia suele estar en como resumes el impacto de tu experiencia. VitaeSpark apunta justamente a eso: ayudarte a convertir experiencia, estudios y habilidades en un mensaje mas fuerte para el mercado laboral.",
          ],
        },
        {
          title: "Que recibes al final del proceso",
          paragraphs: [
            "El objetivo no es dejarte con un borrador a medias, sino con un CV terminado y util para postularte. Al completar el flujo obtienes una version clara, profesional, editable desde tu perfil y preparada para descargar en PDF.",
            "Eso reduce mucha friccion para quien necesita avanzar rapido: no tienes que pelearte con el formato, ni pensar desde cero como redactar cada bloque, ni perder tiempo ordenando visualmente el documento.",
          ],
        },
      ]}
      faqs={[
        {
          question:
            "Puedo crear mi curriculum online aunque nunca haya hecho uno?",
          answer:
            "Si. La idea de la herramienta es guiarte paso a paso para que no tengas que empezar desde cero ni decidir solo como ordenar todo.",
        },
        {
          question: "Sirve para cualquier rubro?",
          answer:
            "Si. Puedes usarlo para perfiles junior, administrativos, tecnologia, salud, atencion al cliente y otros sectores, adaptando el contenido a tu objetivo.",
        },
        {
          question: "El CV se puede descargar en PDF?",
          answer:
            "Si. El flujo termina con un CV visualmente profesional, editable desde tu perfil y listo para descargar en PDF.",
        },
        {
          question: PRICING.copy.faqQuestion,
          answer: PRICING.copy.faqAnswer,
        },
        {
          question: "Cuanto tiempo tarda crear el CV?",
          answer:
            "Depende de cuanta informacion ya tengas preparada, pero la idea del producto es que puedas pasar de tus datos base a un CV util en minutos, no en horas.",
        },
        {
          question: "Puedo editar mi CV despues?",
          answer:
            "Si. Desde tu perfil podes ajustar contenido y descargar una nueva version en PDF con la plantilla elegida.",
        },
        {
          question: "Que pasa si no tengo mucha experiencia?",
          answer:
            "Tambien puedes usar VitaeSpark. El sistema ayuda a destacar estudios, proyectos, habilidades y otras experiencias relevantes para que el CV no se vea vacio.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Creador de CV online",
          description:
            "Vuelve a la pagina principal para crear tu CV con IA, plantillas profesionales y PDF.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description:
            "Aprende como mejorar tu CV para pasar filtros automatizados.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description:
            "Descubre como usar inteligencia artificial para redactar mejor.",
        },
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Guia paso a paso",
          description:
            "Lee una guia completa para crear un curriculum desde cero.",
        },
      ]}
    />
  );
}
