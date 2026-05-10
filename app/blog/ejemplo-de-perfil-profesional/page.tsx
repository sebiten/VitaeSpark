import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ejemplo de Perfil Profesional para CV",
  description:
    "Mira un ejemplo de perfil profesional para CV y aprende cómo adaptarlo a tu experiencia, puesto y objetivo laboral.",
  path: "/blog/ejemplo-de-perfil-profesional",
  keywords: [
    "ejemplo de perfil profesional",
    "perfil profesional ejemplo cv",
    "ejemplo perfil curriculum",
    "resumen profesional ejemplo",
  ],
  type: "article",
});

export default function EjemploDePerfilProfesionalPage() {
  return (
    <BlogArticlePage
      path="/blog/ejemplo-de-perfil-profesional"
      datePublished="2025-04-12"
      title="Ejemplo de perfil profesional para CV y como adaptarlo a tu caso"
      description="Mira un ejemplo de perfil profesional para CV y aprende como adaptarlo a tu experiencia, puesto y objetivo laboral."
      intro="Muchas personas entienden que el perfil profesional es importante, pero se traban al momento de escribirlo. Ver un buen ejemplo ayuda, siempre que luego lo adaptes a tu perfil real."
      sections={[
        {
          title: "Como se ve un buen ejemplo",
          paragraphs: [
            "Un buen perfil profesional suele combinar puesto objetivo, experiencia relevante y propuesta de valor en pocas lineas. Tiene que sonar claro, no recargado.",
            "La idea no es copiar una frase prefabricada, sino entender la logica detras del resumen.",
          ],
        },
        {
          title: "Como adaptarlo segun experiencia",
          paragraphs: [
            "Si tienes experiencia, puedes destacar trayectoria, especializacion o resultados. Si estas empezando, puedes poner mas peso en estudios, direccion profesional y habilidades.",
            "La adaptacion es lo que hace que el ejemplo sea realmente util.",
          ],
        },
        {
          title: "Que evitar al inspirarte en un ejemplo",
          paragraphs: [
            "Evita copiar frases vacias o demasiado generales. Lo que funciona en otro perfil no necesariamente sirve para el tuyo.",
            "El valor del ejemplo esta en la estructura y el enfoque, no en repetir palabras sin contexto.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Es mejor un perfil corto o largo?",
          answer:
            "En la mayoria de los casos, un perfil corto y bien enfocado funciona mejor.",
        },
        {
          question: "Conviene cambiarlo para distintas vacantes?",
          answer:
            "Si. Ajustar el enfoque al puesto buscado suele hacerlo mucho mas relevante.",
        },
        {
          question: "Sirve ver ejemplos si no tengo experiencia?",
          answer:
            "Si. Justamente te ayuda a entender como orientar mejor estudios, habilidades y objetivo profesional.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/perfil-profesional-para-cv",
          title: "Perfil profesional para CV",
          description: "Profundiza como escribir esta seccion desde cero.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para construir un primer borrador mas fuerte.",
        },
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Como mejorar mi curriculum",
          description: "Haz del perfil profesional uno de los primeros bloques a optimizar.",
        },
      ]}
    />
  );
}
