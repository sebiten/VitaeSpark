import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum Vitae Ejemplo: Cómo Leerlo y Aplicarlo",
  description:
    "Mira un ejemplo de currículum vitae profesional y aprende qué estructura, secciones y tono conviene usar para postularte mejor.",
  path: "/curriculum-vitae-ejemplo",
  keywords: [
    "curriculum vitae ejemplo",
    "ejemplo de curriculum vitae",
    "modelo de curriculum vitae",
    "ejemplo curriculum",
    "cv ejemplo",
  ],
});

export default function CurriculumVitaeEjemploPage() {
  return (
    <MarketingPage
      path="/curriculum-vitae-ejemplo"
      eyebrow="Ejemplo de CV"
      title="Curriculum vitae ejemplo para entender como se arma un CV profesional"
      description="Usa este enfoque como referencia para crear un curriculum vitae claro, ordenado y mucho mas facil de adaptar a distintas vacantes."
      intro={[
        "Buscar un ejemplo de curriculum vitae suele ser el primer paso cuando quieres mejorar tu perfil, pero muchos modelos que circulan online estan desactualizados o no explican por que una estructura funciona mejor que otra.",
        "La idea no es copiar un CV palabra por palabra, sino entender como organizar perfil, experiencia, estudios y habilidades para que un reclutador pueda captar rapido lo importante.",
      ]}
      benefits={[
        "Te ayuda a visualizar una estructura clara antes de escribir.",
        "Reduce errores comunes de orden, extension y enfoque.",
        "Sirve como base para adaptar tu CV a distintos tipos de trabajo.",
      ]}
      steps={[
        {
          title: "Empieza por el objetivo del CV",
          description:
            "Define que tipo de puesto quieres conseguir antes de elegir que destacar.",
        },
        {
          title: "Ordena secciones y nivel de detalle",
          description:
            "Un ejemplo util te muestra como priorizar cada bloque de informacion.",
        },
        {
          title: "Llevalo a una version propia",
          description:
            "Con VitaeSpark puedes transformar la referencia en un CV listo para enviar.",
        },
      ]}
      sections={[
        {
          title: "Que deberia mostrar un buen ejemplo de curriculum vitae",
          paragraphs: [
            "Un ejemplo realmente util no solo se ve prolijo: tambien tiene un perfil profesional entendible, experiencia resumida con criterio, estudios bien ubicados y habilidades relevantes para el puesto.",
            "Eso permite ver con claridad como presentar tu recorrido sin perderte en texto de mas ni en formatos que distraen.",
          ],
        },
        {
          title: "Como usar un ejemplo sin terminar con un CV generico",
          paragraphs: [
            "El objetivo no es clonar una plantilla, sino tomar decisiones mejores. Puedes inspirarte en el orden, el nivel de detalle y el tono, pero el contenido final debe responder a tu experiencia y al trabajo que buscas.",
            "Cuando adaptas una buena referencia a tu perfil, el resultado suele ser mucho mas profesional que empezar desde una hoja vacia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene copiar un ejemplo de curriculum vitae?",
          answer:
            "Conviene usarlo como referencia estructural, no copiarlo literal. Lo importante es adaptar contenido y tono a tu perfil.",
        },
        {
          question: "Un ejemplo sirve tambien para CV sin experiencia?",
          answer:
            "Si. Puede ayudarte a ver como priorizar estudios, proyectos y habilidades cuando todavia no tienes historial laboral fuerte.",
        },
        {
          question: "Puedo pasar de un ejemplo a un CV listo para descargar?",
          answer:
            "Si. La referencia te ordena, y luego puedes llevar ese contenido a una version final dentro de VitaeSpark.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear curriculum vitae",
          description: "Pasa del ejemplo a un CV propio listo para postularte.",
        },
        {
          href: "/modelo-de-curriculum-vitae",
          title: "Modelo de curriculum vitae",
          description:
            "Explora otra pagina comercial cercana para ampliar opciones de estructura.",
        },
        {
          href: "/blog/ejemplo-de-curriculum-vitae",
          title: "Ejemplo de curriculum vitae explicado",
          description:
            "Guia editorial para entender por que cada seccion cumple una funcion.",
        },
      ]}
    />
  );
}
