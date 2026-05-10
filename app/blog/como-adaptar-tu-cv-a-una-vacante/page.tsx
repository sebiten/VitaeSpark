import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Como Adaptar tu CV a una Vacante",
  description:
    "Aprende como adaptar tu CV a una vacante para mejorar relevancia, claridad y posibilidades de conseguir entrevistas.",
  path: "/blog/como-adaptar-tu-cv-a-una-vacante",
  keywords: [
    "como adaptar tu cv a una vacante",
    "adaptar curriculum a una oferta",
    "personalizar cv para trabajo",
    "ajustar cv a vacante",
  ],
  type: "article",
});

export default function ComoAdaptarTuCvAUnaVacantePage() {
  return (
    <BlogArticlePage
      path="/blog/como-adaptar-tu-cv-a-una-vacante"
      datePublished="2025-04-12"
      title="Como adaptar tu CV a una vacante sin rehacerlo por completo"
      description="Aprende como adaptar tu CV a una vacante para mejorar relevancia, claridad y posibilidades de conseguir entrevistas."
      intro="Adaptar el CV a una vacante es una de las practicas que mas impacto puede tener en tus postulaciones. No se trata de inventar una version nueva cada vez, sino de hacer ajustes inteligentes."
      sections={[
        {
          title: "Empieza por el puesto y las palabras clave",
          paragraphs: [
            "Lo primero es entender que esta buscando realmente la vacante: herramientas, responsabilidades, tipo de rol y nivel de experiencia.",
            "Esa lectura te permite decidir que partes de tu CV conviene acercar mas a esa necesidad.",
          ],
        },
        {
          title: "Prioriza experiencias y habilidades relevantes",
          paragraphs: [
            "No todo tu recorrido tiene que tener el mismo peso. Al adaptar el CV, lo mas util es destacar primero las experiencias que mas dialogan con la oferta.",
            "Eso hace que el documento se sienta mas orientado y menos generico.",
          ],
        },
        {
          title: "Ajusta el perfil profesional",
          paragraphs: [
            "El perfil es uno de los bloques mas faciles de adaptar y uno de los que mas cambia la lectura general. Ajustar esas primeras lineas ya puede mejorar bastante la relevancia del CV.",
            "No hace falta exagerar: basta con alinear mejor el foco del resumen.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Debo cambiar el CV para cada postulacion?",
          answer:
            "No siempre, pero si conviene ajustar las vacantes que mas te importan o donde tienes mejor encaje.",
        },
        {
          question: "Esto ayuda tambien para ATS?",
          answer:
            "Si. Un CV mas alineado con la vacante suele tener mejor relevancia en procesos automatizados.",
        },
        {
          question: "Puedo adaptarlo rapido si ya tengo una buena base?",
          answer:
            "Si. Cuando el CV base esta bien armado, los cambios necesarios suelen ser mucho mas simples.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Entiende por que la relevancia importa tanto tambien en filtros automatizados.",
        },
        {
          href: "/blog/como-hacer-un-cv-para-trabajo",
          title: "Como hacer un CV para trabajo",
          description: "Primero arma una base fuerte y luego adaptala mejor.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Haz estos ajustes dentro de un flujo pensado para iterar rapido.",
        },
      ]}
    />
  );
}
