import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hacer CV con IA: Redacta, Ordena y Descarga en PDF",
  description:
    "Haz un CV con IA usando tus datos reales. Mejora perfil, experiencia y habilidades, elige una plantilla y descarga tu curriculum en PDF.",
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
      title="Hacer CV con IA para redactar mejor y descargar en PDF"
      description="Usa inteligencia artificial para ordenar tu experiencia, mejorar el perfil profesional y crear un curriculum mas claro sin partir de una plantilla vacia."
      intro={[
        "Hacer un CV con IA puede ahorrarte tiempo, pero la diferencia real aparece cuando la herramienta trabaja con tus datos reales y los convierte en un perfil mas claro. No se trata de rellenar frases bonitas, sino de explicar mejor que sabes hacer y por que deberian entrevistarte.",
        "VitaeSpark combina formulario guiado, redaccion asistida, plantillas profesionales y descarga en PDF para que puedas pasar de informacion suelta a un curriculum listo para enviar.",
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
            "La inteligencia artificial es especialmente util cuando sabes lo que hiciste, pero te cuesta expresarlo con claridad. Puede ayudarte a ordenar tareas, elegir palabras mas concretas y convertir experiencia dispersa en secciones faciles de leer.",
            "Lo importante es que la herramienta no reemplace tu experiencia real, sino que la traduzca a un lenguaje mas profesional, concreto y entendible. Esa es la diferencia entre usar IA como atajo y usarla como apoyo de verdad.",
          ],
        },
        {
          title: "Hacer CV con IA vs usar una plantilla vacia",
          paragraphs: [
            "Una plantilla vacia resuelve el diseño, pero te deja solo frente a lo mas dificil: explicar tu experiencia con claridad. Por eso muchas personas terminan con un CV prolijo visualmente, pero generico en contenido.",
            "Un creador de CV con IA ayuda a transformar datos simples en secciones mas utiles: perfil profesional, experiencia, habilidades y resumen de logros. La clave es que la IA trabaje sobre informacion real, no sobre frases inventadas.",
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
            "No deberia hacerlo. Lo ideal es trabajar con tus datos reales, revisar el resultado y ajustar cualquier frase que no represente tu experiencia.",
        },
        {
          question: "Puedo editar el contenido generado?",
          answer:
            "Si. La IA sirve como apoyo para mejorar redaccion, no para quitarte control sobre tu CV.",
        },
        {
          question: "Sirve para hacer mi primer CV?",
          answer:
            "Si. Puede ayudarte a ordenar estudios, cursos, proyectos, habilidades y experiencias informales para que el curriculum no se vea vacio.",
        },
        {
          question: "Es mejor que bajar una plantilla gratis?",
          answer:
            "Depende de lo que necesites. Una plantilla ayuda con el diseño; VitaeSpark tambien ayuda a mejorar contenido, estructura y redaccion antes de descargar el PDF.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Creador de CV online",
          description:
            "Usa VitaeSpark como punto de partida para crear tu CV con IA y descargarlo en PDF.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Combina plantilla, IA y exportacion en un solo flujo.",
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
