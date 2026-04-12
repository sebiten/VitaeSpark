import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hacer un CV con IA",
  description:
    "Usa inteligencia artificial para mejorar textos, ordenar tu experiencia y crear un curriculum mas claro, profesional y listo para enviar.",
  path: "/hacer-cv-con-ia",
  keywords: [
    "hacer cv con ia",
    "curriculum con ia",
    "crear cv con inteligencia artificial",
    "ia para curriculum",
    "ia para cv",
  ],
});

export default function HacerCvConIaPage() {
  return (
    <MarketingPage
      path="/hacer-cv-con-ia"
      eyebrow="IA aplicada al CV"
      title="Hacer un CV con IA para redactar mejor y ahorrar tiempo"
      description="Usa inteligencia artificial para mejorar textos, ordenar tu experiencia y crear un curriculum mas claro, profesional y listo para enviar."
      intro={[
        "Hacer un CV con IA puede ahorrarte mucho tiempo, pero la diferencia real aparece cuando la herramienta entiende como convertir tu informacion en un perfil profesional mas fuerte. No se trata de rellenar frases bonitas, sino de explicar mejor que sabes hacer y por que deberian entrevistarte.",
        "VitaeSpark combina un formulario guiado con generacion asistida para ayudarte a redactar el resumen profesional, desarrollar experiencia y presentar mejor tus habilidades sin perder control sobre el contenido.",
      ]}
      benefits={[
        "Te ayuda a escribir mejor incluso si no sabes como describir tu experiencia.",
        "Reduce el tiempo entre tus datos crudos y un CV listo para compartir.",
        "Mejora la claridad del mensaje sin volverlo generico ni vacio.",
      ]}
      steps={[
        {
          title: "Carga tu informacion base",
          description:
            "Empiezas con tus datos reales, experiencias, estudios y habilidades.",
        },
        {
          title: "Optimiza la redaccion",
          description:
            "La IA propone una version mas profesional, clara y enfocada en resultados.",
        },
        {
          title: "Revisa y exporta",
          description:
            "Ajustas el contenido final y lo llevas a una plantilla lista para descargar.",
        },
      ]}
      sections={[
        {
          title: "Cuando conviene usar IA para un curriculum",
          paragraphs: [
            "La inteligencia artificial es especialmente util cuando sabes lo que has hecho, pero te cuesta expresarlo con claridad. Tambien ayuda mucho si llevas tiempo sin actualizar el CV o si quieres adaptar el perfil a un nuevo tipo de puesto.",
            "Lo importante es que la herramienta no reemplace tu experiencia real, sino que la traduzca a un lenguaje mas profesional, concreto y entendible. Esa es la diferencia entre usar IA como atajo y usarla como apoyo de verdad.",
          ],
        },
        {
          title: "Que revisar antes de enviar un CV hecho con IA",
          paragraphs: [
            "Siempre conviene revisar que el texto refleje tu experiencia real, que no haya exageraciones y que el puesto objetivo este claro. La IA puede ayudarte mucho, pero la version final tiene que sonar coherente contigo y con el tipo de trabajo que buscas.",
            "Tambien es importante confirmar nombres de herramientas, fechas, cargos y logros. Un buen CV con IA no inventa: ordena, mejora y comunica mejor lo que ya hiciste.",
          ],
        },
      ]}
      faqs={[
        {
          question: "La IA inventa experiencia si no le doy detalles?",
          answer:
            "No deberia hacerlo. Lo ideal es trabajar con tus datos reales y revisar el resultado antes de enviarlo.",
        },
        {
          question: "Puedo editar el contenido generado?",
          answer:
            "Si. La IA sirve como apoyo para mejorar redaccion, no para quitarte control sobre tu CV.",
        },
        {
          question: "Ayuda tambien si ya tengo un CV viejo?",
          answer:
            "Si. Puedes usarla para reescribir secciones y volver mas claro un perfil que ya existe.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description:
            "Combina plantilla, IA y exportacion en un solo flujo.",
        },
        {
          href: "/curriculum-ats",
          title: "Optimizar para ATS",
          description:
            "Alinea la redaccion mejorada con filtros de reclutamiento.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description:
            "Ideas para completar una de las secciones mas importantes del CV.",
        },
      ]}
    />
  );
}
