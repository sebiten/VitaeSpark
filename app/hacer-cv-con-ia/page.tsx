import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crear CV con IA Online: Editable y en PDF",
  description:
    "Creá tu CV con IA usando experiencia real. VitaeSpark mejora perfil, tareas y habilidades, permite editarlo y descargar un PDF profesional.",
  path: "/hacer-cv-con-ia",
  keywords: [
    "crear cv con ia",
    "hacer cv con ia",
    "generador de cv con ia",
    "generador de curriculum con ia",
    "curriculum con ia",
    "crear cv con inteligencia artificial",
  ],
});

export default function HacerCvConIaPage() {
  return (
    <MarketingPage
      path="/hacer-cv-con-ia"
      eyebrow="Crear CV con IA"
      title="Crear un CV con IA sin inventar experiencia"
      description="VitaeSpark transforma tus datos reales en un currículum claro, editable y listo para descargar en PDF, sin quitarte el control del contenido."
      intro={[
        "Un generador de CV con IA sirve cuando sabés qué hiciste, pero te cuesta convertirlo en un perfil profesional y experiencias fáciles de leer. La herramienta debe ayudarte a ordenar y redactar, no agregar empresas, fechas o logros que nunca existieron.",
        "En VitaeSpark primero completás tus datos con tus propias palabras. No necesitás registrarte para empezar. Al generar el CV, la IA mejora la redacción, conserva la información importante y deja el resultado guardado para que puedas revisarlo antes de pagar.",
      ]}
      benefits={[
        "Convierte tareas generales en experiencia concreta y fácil de escanear.",
        "Mantenés el control: podés revisar y editar el contenido generado.",
        "Combina redacción, plantilla profesional y descarga en PDF en un solo flujo.",
      ]}
      steps={[
        {
          title: "Escribí tu experiencia real",
          description:
            "Cargá trabajos, tareas, estudios, herramientas y el puesto que buscás, aunque todavía no esté bien redactado.",
        },
        {
          title: "La IA ordena y mejora",
          description:
            "El generador organiza la información y propone textos más claros sin inventar experiencia.",
        },
        {
          title: "Revisá, editá y descargá",
          description:
            "Comprobá el resultado, ajustalo desde tu perfil y descargá el PDF con la plantilla elegida.",
        },
      ]}
      sections={[
        {
          title: "Qué mejora el generador de CV con IA",
          paragraphs: [
            "La IA trabaja sobre las secciones que más suelen costar: perfil profesional, responsabilidades, habilidades y presentación de la experiencia. Su función es reducir repeticiones, ordenar ideas y usar frases concretas que un reclutador pueda entender rápidamente.",
            "No cambia nombres de empresas, cargos, fechas ni herramientas. Esos datos siguen siendo tuyos. Antes de descargar podés revisar que cada frase represente lo que realmente hiciste.",
          ],
        },
        {
          title: "Ejemplo: de una tarea genérica a experiencia concreta",
          paragraphs: [
            "Antes: 'Hacía tareas varias y atendía clientes'. La frase no permite entender el tipo de trabajo ni las responsabilidades principales.",
            "Después: 'Atención de consultas, reposición de productos, control visual de stock y orden del sector'. La información sigue siendo la misma, pero ahora comunica tareas concretas sin inventar resultados.",
          ],
        },
        {
          title: "Qué podés controlar antes de descargar",
          paragraphs: [
            "Podés cambiar de plantilla antes del pago sin volver a cargar los datos, revisar el CV completo con marca de agua y corregir cualquier información que no esté clara.",
            "Después del pago, el CV queda asociado a la plantilla elegida y guardado en tu perfil. Podés editar sus datos y descargar nuevas versiones sin reconstruirlo desde cero.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿La IA puede inventar experiencia o logros?",
          answer:
            "VitaeSpark está configurado para trabajar con los datos que proporcionás y no agregar empresas, fechas, herramientas o cifras inexistentes. Siempre debés revisar el resultado final.",
        },
        {
          question: "¿Tengo que registrarme antes de completar el CV?",
          answer:
            "No. Podés elegir plantilla y completar el formulario sin registrarte. Te pediremos iniciar sesión al generar el CV para guardar el borrador y el resultado de forma segura.",
        },
        {
          question: "¿Puedo editar el CV generado?",
          answer:
            "Sí. Podés revisar el resultado antes de pagar y, después de desbloquearlo, editar los datos guardados desde tu perfil y descargar nuevas versiones.",
        },
        {
          question: "¿Sirve para crear un CV sin experiencia?",
          answer:
            "Sí. Podés organizar estudios, cursos, proyectos, habilidades y experiencias informales para construir un primer currículum claro sin inventar empleos.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Crear CV online",
          description:
            "Empezá en VitaeSpark, elegí una plantilla y completá tus datos sin registrarte.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum compatible con ATS",
          description:
            "Entendé cómo ordenar el contenido para sistemas de selección y reclutadores.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de curriculum",
          description:
            "Compará formatos profesionales antes de elegir el diseño de tu CV.",
        },
        {
          href: "/blog/perfil-profesional-para-cv",
          title: "Como escribir el perfil profesional",
          description:
            "Aprendé qué información necesita el primer bloque de tu currículum.",
        },
      ]}
      ctaLabel="Crear mi CV con IA"
    />
  );
}
