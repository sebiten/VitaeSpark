import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Curriculum Vitae en PDF",
  description:
    "Crea y descarga tu curriculum vitae en PDF con una presentacion profesional y lista para enviar a reclutadores.",
  path: "/curriculum-vitae-pdf",
  keywords: [
    "curriculum vitae pdf",
    "cv en pdf",
    "descargar curriculum pdf",
    "curriculum pdf",
  ],
});

export default function CurriculumVitaePdfPage() {
  return (
    <MarketingPage
      path="/curriculum-vitae-pdf"
      eyebrow="CV en PDF"
      title="Curriculum vitae en PDF listo para enviar a vacantes reales"
      description="Prepara un CV profesional y descargalo en PDF con una estructura clara, buena presentacion y enfoque laboral."
      intro={[
        "El formato PDF sigue siendo una de las formas mas practicas y profesionales de enviar un curriculum. Mantiene la estructura, evita cambios inesperados y transmite una imagen mas cuidada en procesos de seleccion.",
        "VitaeSpark te permite llegar a ese resultado sin tener que resolver por separado contenido, diseno y exportacion. Todo el flujo esta orientado a terminar con un CV util, claro y listo para compartir.",
      ]}
      benefits={[
        "Mantiene el formato del CV tal como lo preparaste.",
        "Se ve mas profesional al compartirlo por email o formularios.",
        "Te permite cerrar el proceso con un documento listo para usar.",
      ]}
      steps={[
        {
          title: "Prepara tu contenido",
          description:
            "Organiza experiencia, estudios y habilidades en una estructura clara.",
        },
        {
          title: "Refuerza redaccion y formato",
          description:
            "Mejora el contenido y llevalo a una plantilla profesional.",
        },
        {
          title: "Descarga tu PDF",
          description:
            "Obtienes una version lista para adjuntar y postularte.",
        },
      ]}
      sections={[
        {
          title: "Por que el PDF sigue siendo importante",
          paragraphs: [
            "El PDF conserva mejor la presentacion del documento y evita muchos problemas de formato que aparecen al enviar archivos editables.",
            "Eso es especialmente importante cuando quieres que reclutadores vean tu CV tal como lo preparaste, sin movimientos de texto ni cambios visuales.",
          ],
        },
        {
          title: "Que revisar antes de descargarlo",
          paragraphs: [
            "Antes de exportar el CV, conviene revisar el perfil profesional, la claridad de la experiencia, la consistencia de fechas y el puesto objetivo.",
            "Un buen PDF no arregla un contenido flojo, pero si ayuda mucho cuando el contenido ya esta bien resuelto.",
          ],
        },
      ]}
      faqs={[
        {
          question: "El PDF sirve tambien para postulaciones online?",
          answer:
            "Si. En muchos casos es el formato mas comodo para adjuntar y compartir.",
        },
        {
          question: "Puedo volver a editar el CV despues?",
          answer:
            "Si. La descarga en PDF es el cierre de una version, pero puedes seguir ajustando el contenido cuando lo necesites.",
        },
        {
          question: "Un PDF garantiza que el CV se vea bien?",
          answer:
            "Ayuda mucho a mantener el formato, pero lo principal sigue siendo que el contenido y la estructura esten bien armados.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-curriculum-vitae",
          title: "Crear curriculum vitae",
          description: "Primero arma una buena base antes de descargarla.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de curriculum",
          description: "Explora estructuras y formatos para tu version final.",
        },
        {
          href: "/blog/errores-en-el-curriculum",
          title: "Errores en el curriculum",
          description: "Corrige lo principal antes de exportar tu PDF final.",
        },
      ]}
    />
  );
}
