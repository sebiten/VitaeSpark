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
    "ejemplo perfil currículum",
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
          title: "Cómo se ve un buen ejemplo",
          paragraphs: [
            "Un buen perfil profesional suele combinar puesto objetivo, experiencia relevante y propuesta de valor en pocas lineas. Tiene que sonar claro, no recargado.",
            "La idea no es copiar una frase prefabricada, sino entender la logica detras del resumen.",
          ],
        },
        {
          title: "Cómo adaptarlo según experiencia",
          paragraphs: [
            "Si tienes experiencia, puedes destacar trayectoria, especializacion o resultados. Si estas empezando, puedes poner más peso en estudios, direccion profesional y habilidades.",
            "La adaptación es lo que hace que el ejemplo sea realmente útil.",
          ],
        },
        {
          title: "Qué evitar al inspirarte en un ejemplo",
          paragraphs: [
            "Evita copiar frases vacías o demasiado generales. Lo que funciona en otro perfil no necesariamente sirve para el tuyo.",
            "El valor del ejemplo esta en la estructura y el enfoque, no en repetir palabras sin contexto.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Es mejor un perfil corto o largo?",
          answer:
            "En la mayoria de los casos, un perfil corto y bien enfocado funciona mejor.",
        },
        {
          question: "¿Conviene cambiarlo para distintas vacantes?",
          answer:
            "Sí. Ajustar el enfoque al puesto buscado suele hacerlo mucho más relevante.",
        },
        {
          question: "¿Sirve ver ejemplos si no tengo experiencia?",
          answer:
            "Sí. Justamente te ayuda a entender como orientar mejor estudios, habilidades y objetivo profesional.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/perfil-profesional-para-cv",
          title: "Perfil profesional para CV",
          description: "Profundiza como escribir esta sección desde cero.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Usa IA para construir un primer borrador más fuerte.",
        },
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Cómo mejorar mi currículum",
          description: "Haz del perfil profesional uno de los primeros bloques a optimizar.",
        },
      ]}
    />
  );
}
