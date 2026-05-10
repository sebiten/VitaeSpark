import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como Mejorar mi Curriculum",
  description:
    "Ideas practicas para mejorar tu curriculum vitae y hacerlo mas claro, mas fuerte y mas util para tus postulaciones.",
  path: "/blog/como-mejorar-mi-curriculum",
  keywords: [
    "como mejorar mi curriculum",
    "mejorar curriculum vitae",
    "como mejorar un cv",
    "optimizar curriculum",
  ],
  type: "article",
});

export default function ComoMejorarMiCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/como-mejorar-mi-curriculum"
      datePublished="2025-04-12"
      title="Como mejorar mi curriculum para postularme con mas confianza"
      description="Ideas practicas para mejorar tu curriculum vitae y hacerlo mas claro, mas fuerte y mas util para tus postulaciones."
      intro="Mejorar un curriculum no siempre implica rehacerlo por completo. Muchas veces los cambios que mas impactan son perfil mas claro, experiencia mejor explicada y una estructura mas facil de leer."
      sections={[
        {
          title: "Empieza por el perfil profesional",
          paragraphs: [
            "Si tu resumen inicial no dice a que puesto apuntas o que valor aportas, el CV arranca flojo. Mejorarlo suele tener efecto inmediato en la percepcion general del documento.",
            "Lo ideal es que sea breve, concreto y alineado al tipo de trabajo que quieres conseguir.",
          ],
        },
        {
          title: "Haz mas fuerte la experiencia",
          paragraphs: [
            "Conviene revisar si cada experiencia explica bien funciones, herramientas y contexto. Muchas veces el problema no es la trayectoria, sino como esta contada.",
            "Desarrollar mejor logros y responsabilidades le da mucho mas peso al perfil.",
          ],
        },
        {
          title: "Ajusta el CV al puesto",
          paragraphs: [
            "No hace falta inventar una version nueva para cada oferta, pero si conviene adaptar palabras clave, orden de informacion y enfoque del perfil.",
            "Ese ajuste mejora tanto conversion con reclutadores como relevancia para ATS.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Conviene actualizar el CV aunque no este buscando trabajo activo?",
          answer:
            "Si. Tenerlo al dia hace mucho mas facil reaccionar rapido ante oportunidades.",
        },
        {
          question: "Debo cambiar tambien el diseno?",
          answer:
            "Solo si el formato actual entorpece la lectura. A veces el mayor cambio esta en el contenido, no en lo visual.",
        },
        {
          question: "Sirve usar IA para mejorar el CV?",
          answer:
            "Si, especialmente para ordenar ideas y redactar mejor, siempre que revises el resultado final.",
        },
      ]}
      relatedLinks={[
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA como apoyo para mejorar redaccion y claridad.",
        },
        {
          href: "/blog/errores-en-el-curriculum",
          title: "Errores en el curriculum",
          description: "Detecta primero que cosas estan frenando tu CV.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Pasa esa mejora a una version mas profesional.",
        },
      ]}
    />
  );
}
