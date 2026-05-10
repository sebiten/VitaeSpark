import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Habilidades Blandas para CV: Cuáles Poner y Cómo",
  description:
    "Aprende cómo elegir habilidades blandas para CV sin caer en frases genéricas y reforzando mejor tu perfil profesional.",
  path: "/blog/habilidades-blandas-para-cv",
  keywords: [
    "habilidades blandas para cv",
    "habilidades blandas curriculum",
    "soft skills cv",
    "habilidades blandas para curriculum",
  ],
  type: "article",
});

export default function HabilidadesBlandasParaCvPage() {
  return (
    <BlogArticlePage
      path="/blog/habilidades-blandas-para-cv"
      datePublished="2025-04-12"
      title="Habilidades blandas para CV: como incluirlas sin sonar generico"
      description="Aprende como elegir habilidades blandas para CV sin caer en frases genericas y reforzando mejor tu perfil profesional."
      intro="Las habilidades blandas pueden sumar mucho en un curriculum, pero solo cuando estan bien elegidas y tienen coherencia con tu experiencia. Si no, terminan pareciendo relleno."
      sections={[
        {
          title: "Cuando realmente aportan",
          paragraphs: [
            "Aportan cuando ayudan a entender mejor como trabajas y como encajas en el tipo de rol al que apuntas. Por ejemplo, comunicacion, organizacion o resolucion pueden tener mucho valor en puestos concretos.",
            "La clave es que no aparezcan como una lista vacia, sino relacionadas con el contexto laboral.",
          ],
        },
        {
          title: "Como evitar frases genericas",
          paragraphs: [
            "Palabras como responsable, proactivo o puntual suelen quedarse cortas si no van acompanadas de experiencia, logros o situaciones donde se noten.",
            "Cuanto mas conectes esa habilidad con una experiencia real, mejor funciona.",
          ],
        },
        {
          title: "Como combinarlas con habilidades tecnicas",
          paragraphs: [
            "Lo ideal es que la parte tecnica tenga peso, y que las habilidades blandas ayuden a completar el perfil. Esa combinacion suele dar una imagen mas equilibrada.",
            "En muchos casos, las blandas aportan mas cuando refuerzan lo que ya muestra tu experiencia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuantas habilidades blandas conviene poner?",
          answer:
            "Las justas para reforzar tu perfil sin convertir la seccion en una lista artificial.",
        },
        {
          question: "Sirven para perfiles sin experiencia?",
          answer:
            "Si, siempre que esten bien conectadas con estudios, proyectos o actividades reales.",
        },
        {
          question: "Debo mezclarlas con habilidades tecnicas?",
          answer:
            "Puede funcionar, pero muchas veces es mejor diferenciarlas para que el CV se lea mas claro.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description: "Amplia el enfoque incluyendo habilidades tecnicas y blandas.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Muy util si buscas roles donde las blandas pesan mas.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description: "Asegura que esta seccion tenga el peso correcto dentro del CV.",
        },
      ]}
    />
  );
}
