import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Habilidades Blandas para CV: Cuáles Poner y Cómo",
  description:
    "Aprende cómo elegir habilidades blandas para CV sin caer en frases genéricas y reforzando mejor tu perfil profesional.",
  path: "/blog/habilidades-blandas-para-cv",
  keywords: [
    "habilidades blandas para cv",
    "habilidades blandas currículum",
    "soft skills cv",
    "habilidades blandas para currículum",
  ],
  type: "article",
});

export default function HabilidadesBlandasParaCvPage() {
  return (
    <BlogArticlePage
      path="/blog/habilidades-blandas-para-cv"
      datePublished="2025-04-12"
      title="Habilidades blandas para CV: como incluirlas sin sonar genérico"
      description="Aprende como elegir habilidades blandas para CV sin caer en frases genéricas y reforzando mejor tu perfil profesional."
      intro="Las habilidades blandas pueden sumar mucho en un currículum, pero solo cuando estan bien elegidas y tienen coherencia con tu experiencia. Si no, terminan pareciendo relleno."
      sections={[
        {
          title: "Cuándo realmente aportan",
          paragraphs: [
            "Aportan cuando ayudan a entender mejor como trabajas y como encajas en el tipo de rol al que apuntas. Por ejemplo, comunicación, organización o resolución pueden tener mucho valor en puestos concretos.",
            "La clave es que no aparezcan como una lista vacía, sino relacionadas con el contexto laboral.",
          ],
        },
        {
          title: "Cómo evitar frases genéricas",
          paragraphs: [
            "Palabras como responsable, proactivo o puntual suelen quedarse cortas si no van acompanadas de experiencia, logros o situaciones donde se noten.",
            "Cuanto más conectes esa habilidad con una experiencia real, mejor funciona.",
          ],
        },
        {
          title: "Cómo combinarlas con habilidades técnicas",
          paragraphs: [
            "Lo ideal es que la parte técnica tenga peso, y que las habilidades blandas ayuden a completar el perfil. Esa combinacion suele dar una imagen más equilibrada.",
            "En muchos casos, las blandas aportan más cuando refuerzan lo que ya muestra tu experiencia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Cuantas habilidades blandas conviene poner?",
          answer:
            "Las justas para reforzar tu perfil sin convertir la sección en una lista artificial.",
        },
        {
          question: "¿Sirven para perfiles sin experiencia?",
          answer:
            "Sí, siempre que estén bien conectadas con estudios, proyectos o actividades reales.",
        },
        {
          question: "¿Debo mezclarlas con habilidades técnicas?",
          answer:
            "Puede funcionar, pero muchas veces es mejor diferenciarlas para que el CV se lea más claro.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description: "Amplia el enfoque incluyendo habilidades técnicas y blandas.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description: "Muy útil si buscas roles donde las blandas pesan más.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Asegura que esta sección tenga el peso correcto dentro del CV.",
        },
      ]}
    />
  );
}
