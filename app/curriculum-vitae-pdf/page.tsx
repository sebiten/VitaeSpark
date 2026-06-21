import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum Vitae en PDF Editable: Crea, Formatea y Descarga",
  description:
    "Creá, editá y descargá tu currículum vitae en PDF con formato profesional, compatible con ATS y listo para enviar.",
  path: "/curriculum-vitae-pdf",
  keywords: [
    "curriculum vitae pdf",
    "cv en pdf",
    "descargar curriculum pdf",
    "curriculum pdf",
    "exportar cv a pdf",
    "formato pdf curriculum",
    "cv pdf ats",
  ],
});

export default function CurriculumVitaePdfPage() {
  return (
    <MarketingPage
      path="/curriculum-vitae-pdf"
      eyebrow="CV en PDF"
      title="Curriculum vitae en PDF editable listo para enviar a vacantes reales"
      description="Prepará un CV profesional, editalo desde tu perfil y descargalo en PDF con estructura clara y formato compatible con ATS."
      intro={[
        "El formato PDF sigue siendo una de las formas más prácticas y profesionales de enviar un currículum. Mantiene la estructura, evita cambios inesperados y transmite una imagen más cuidada en procesos de selección.",
        "VitaeSpark te permite llegar a ese resultado sin tener que resolver por separado contenido, diseño y exportación. Todo el flujo está orientado a terminar con un CV útil, claro y listo para compartir, con texto real que los sistemas ATS pueden leer.",
      ]}
      benefits={[
        "Mantiene el formato del CV tal como lo preparaste, sin desajustes.",
        "Se ve más profesional al compartirlo por email o formularios de empleo.",
        "Incluye texto seleccionable, no imágenes, para máxima compatibilidad ATS.",
        "Descarga lista para imprimir o adjuntar en postulaciones online.",
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
          title: "Por qué el PDF sigue siendo importante",
          paragraphs: [
            "El PDF conserva mejor la presentación del documento y evita muchos problemas de formato que aparecen al enviar archivos editables.",
            "Eso es especialmente importante cuando querés que reclutadores vean tu CV tal como lo preparaste, sin movimientos de texto ni cambios visuales inesperados.",
          ],
        },
        {
          title: "Qué revisar antes de descargarlo",
          paragraphs: [
            "Antes de exportar el CV, conviene revisar el perfil profesional, la claridad de la experiencia, la consistencia de fechas y el puesto objetivo.",
            "Un buen PDF no arregla un contenido flojo, pero sí ayuda mucho cuando el contenido ya está bien resuelto.",
          ],
        },
        {
          title: "CV en PDF y sistemas ATS: lo que necesitás saber",
          paragraphs: [
            "La mayoría de los sistemas ATS modernos pueden leer PDFs sin problema, siempre que el archivo use fuentes estándar y no tenga elementos gráficos que interfieran con la extracción de texto.",
            "Las plantillas de VitaeSpark están optimizadas para esto: estructura clara, texto real (no imágenes de texto) y secciones bien delimitadas que los sistemas ATS procesan correctamente.",
            "Un tip importante: evitá guardar tu CV como imagen dentro de un PDF. Asegurate de que el texto sea seleccionable. En VitaeSpark, todas las descargas incluyen texto real, no capturas.",
          ],
        },
        {
          title: "Consejos prácticos para tu CV en PDF",
          paragraphs: [
            "Nombrá el archivo de forma profesional: 'CV-Nombre-Apellido.pdf' en lugar de 'curriculum_final_v3.pdf'. Es un detalle chico que habla bien de vos.",
            "Mantené el tamaño del archivo por debajo de 2 MB. Muchos portales de empleo tienen límites de carga y un archivo muy pesado puede fallar al enviarse.",
            "Si vas a imprimir el CV para una entrevista presencial, usá papel de buena calidad (90-120 g/m²) y asegurate de que los márgenes sean adecuados. La plantilla Harvard es especialmente buena para versión impresa.",
            "Antes de enviar, abrí el PDF en otro dispositivo (celular, tablet) para confirmar que se ve bien. Muchos reclutadores revisan CVs desde el teléfono.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿El PDF sirve también para postulaciones online?",
          answer:
            "Sí. En muchos casos es el formato más cómodo para adjuntar y compartir en portales de empleo, email y formularios web.",
        },
        {
          question: "¿Puedo volver a editar el CV después de descargarlo?",
          answer:
            "Sí. La descarga en PDF es el cierre de una versión, pero podés seguir ajustando el contenido desde tu perfil cuando lo necesites.",
        },
        {
          question: "¿Un PDF garantiza que el CV se vea bien en todos lados?",
          answer:
            "Ayuda mucho a mantener el formato, pero lo principal sigue siendo que el contenido y la estructura estén bien armados. Las plantillas de VitaeSpark usan fuentes estándar compatibles con la mayoría de los dispositivos.",
        },
        {
          question: "¿Los ATS pueden leer mi CV en PDF?",
          answer:
            "Sí, los sistemas ATS modernos procesan PDFs correctamente. La clave es que el PDF contenga texto real, no imágenes escaneadas. Todos los PDFs de VitaeSpark incluyen texto seleccionable.",
        },
      ]}
      relatedLinks={[
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Primero armá una buena base antes de descargarla en PDF.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de currículum",
          description: "Explorá estructuras y formatos para tu versión final.",
        },
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description: "Asegurate de que tu PDF pase los filtros automáticos.",
        },
        {
          href: "/blog/errores-en-el-curriculum",
          title: "Errores en el currículum",
          description: "Corregí lo principal antes de exportar tu PDF final.",
        },
      ]}
    />
  );
}
