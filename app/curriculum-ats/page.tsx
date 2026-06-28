import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum ATS para Pasar Filtros Automáticos",
  description:
    "Mejora tu currículum para ATS con estructura clara, palabras clave relevantes y contenido pensado para procesos de selección actuales.",
  path: "/curriculum-ats",
  keywords: [
    "curriculum ats",
    "cv ats",
    "hacer cv ats",
    "curriculum para ats",
    "mejorar curriculum ats",
  ],
});

export default function CurriculumAtsPage() {
  return (
    <MarketingPage
      path="/curriculum-ats"
      eyebrow="CV ATS"
      title="Curriculum ATS para pasar filtros y llegar a reclutadores"
      description="Mejora tu curriculum para sistemas ATS con una estructura clara, palabras clave relevantes y contenido facil de leer para software y personas."
      intro={[
        "Muchas empresas usan software ATS para filtrar candidatos antes de que una persona vea el CV. Si tu curriculum esta mal organizado, tiene texto poco claro o no refleja bien tu perfil profesional, puede perder oportunidades incluso cuando eres una buena opcion para el puesto.",
        "VitaeSpark te ayuda a construir un curriculum ATS mas legible y mejor redactado, con enfoque en contenido concreto, experiencia bien descrita y una presentacion ordenada que funcione mejor en procesos de seleccion modernos.",
      ]}
      benefits={[
        "Contenido mas claro y util para filtros automaticos y reclutadores.",
        "Enfoque en palabras clave y funciones propias del puesto que buscas.",
        "Formato profesional que evita el caos visual de plantillas poco practicas.",
      ]}
      steps={[
        {
          title: "Define el puesto objetivo",
          description:
            "Cuanto mas claro sea tu objetivo profesional, mas facil sera orientar el contenido del CV.",
        },
        {
          title: "Describe logros y responsabilidades",
          description:
            "La IA te ayuda a transformar tareas sueltas en experiencia mejor explicada.",
        },
        {
          title: "Descarga una version lista para postularte",
          description:
            "Obtienes un CV pensado para verse bien y leerse mejor en procesos reales.",
        },
      ]}
      sections={[
        {
          title: "Qué es un currículum ATS y por qué importa",
          paragraphs: [
            "Un currículum ATS es un CV preparado para que los sistemas de seguimiento de candidatos puedan interpretar correctamente tu información. Eso implica estructura ordenada, secciones claras, títulos entendibles y contenido alineado a la búsqueda laboral.",
            "Estos sistemas pueden extraer datos, ordenar postulaciones y ayudar a comparar perfiles con los requisitos de una vacante. Como su funcionamiento varía según cada empresa, conviene priorizar una estructura clara y contenido preciso.",
            "No significa llenar el documento con palabras clave sin sentido. Significa describir experiencia y habilidades de forma natural, pero usando el lenguaje profesional que también aparece en ofertas reales de empleo.",
          ],
        },
        {
          title: "Errores comunes que frenan un CV ATS",
          paragraphs: [
            "Entre los errores mas frecuentes estan los formatos recargados, los perfiles demasiado genericos, los logros mal explicados y la falta de coincidencia entre el puesto buscado y el contenido del CV. Todo eso hace que el documento pierda claridad.",
            "Tambien suele fallar la forma en que se resumen experiencias. Un ATS no premia frases decorativas: necesita estructura y contexto. Y un reclutador tampoco se convence con texto vacio. Por eso el contenido es tan importante como el diseno.",
          ],
        },
        {
          title: "Checklist rapida para mejorar tu CV ATS",
          paragraphs: [
            "Antes de enviar tu curriculum, revisa cinco puntos: que el puesto objetivo este claro, que las secciones principales sean faciles de identificar, que las habilidades coincidan con la vacante, que la experiencia este explicada con contexto y que el formato no entorpezca la lectura.",
            "Si esas bases estan cubiertas, el CV suele tener muchas mas posibilidades de pasar filtros y, sobre todo, de resultar convincente cuando lo revisa una persona real.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Un CV ATS tiene que ser muy simple visualmente?",
          answer:
            "Tiene que ser claro y legible. No necesita verse aburrido, pero si debe evitar formatos que rompan la lectura del contenido.",
        },
        {
          question: "Las palabras clave importan?",
          answer:
            "Si, siempre que aparezcan de forma natural y representen tu experiencia real, habilidades y puesto objetivo.",
        },
        {
          question: "Sirve solo para tecnologia?",
          answer:
            "No. Los filtros ATS se usan en muchos sectores, desde administracion hasta salud, ventas y atencion al cliente.",
        },
        {
          question: "Como se si mi CV esta demasiado generico?",
          answer:
            "Suele notarse cuando podria enviarse a cualquier puesto sin cambios. Si no deja claro tu objetivo, herramientas o experiencia relevante, conviene ajustarlo.",
        },
        {
          question: "Un CV ATS garantiza entrevistas?",
          answer:
            "No puede garantizarlo, pero si mejora mucho la claridad del perfil y tus posibilidades de pasar mejor las primeras barreras del proceso.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description:
            "Ejemplo concreto de como aplicar estructura ATS a un rol muy buscado.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Construye un curriculum listo para descargar y adaptar a vacantes.",
        },
        {
          href: "/blog/como-hacer-un-cv-ats",
          title: "Guia para CV ATS",
          description:
            "Aprende que mirar antes de enviar tu curriculum a una empresa.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Ideas para destacar aunque estes empezando tu carrera laboral.",
        },
      ]}
    />
  );
}
