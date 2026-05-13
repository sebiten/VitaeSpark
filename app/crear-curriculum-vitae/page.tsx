import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crear Currículum Vitae Online con IA y Plantillas",
  description:
    "Crea tu currículum vitae online con IA, plantillas profesionales y estructura clara para buscar trabajo mejor.",
  path: "/crear-curriculum-vitae",
  keywords: [
    "crear curriculum vitae",
    "curriculum vitae online",
    "hacer curriculum vitae",
    "crear curriculum vitae online",
  ],
});

export default function CrearCurriculumVitaePage() {
  return (
    <MarketingPage
      path="/crear-curriculum-vitae"
      eyebrow="Curriculum vitae"
      title="Crear curriculum vitae online con una estructura clara y profesional"
      description="Arma un curriculum vitae que se vea profesional, sea facil de leer y te ayude a postularte mejor a nuevas oportunidades laborales."
      intro={[
        "Muchas personas buscan como crear un curriculum vitae cuando necesitan resolver rapido algo importante: postularse mejor. El problema es que la mayoria termina entre plantillas viejas, documentos desordenados o textos demasiado genericos.",
        "VitaeSpark te ayuda a pasar de esa confusion a un CV mas claro, con una estructura profesional y contenido mejor redactado para mostrar tu perfil con mas fuerza.",
      ]}
      benefits={[
        "Ordena experiencia, estudios y habilidades sin perder claridad.",
        "Te ayuda a redactar mejor sin empezar desde cero.",
        "Terminas con un curriculum listo para descargar y compartir.",
      ]}
      steps={[
        {
          title: "Completa tus datos base",
          description:
            "Carga la informacion principal de tu perfil profesional.",
        },
        {
          title: "Optimiza el contenido",
          description: "Mejora redaccion, estructura y enfoque del CV.",
        },
        {
          title: "Llevalo a una plantilla final",
          description: "Descarga una version lista para tus postulaciones.",
        },
      ]}
      sections={[
        {
          title: "Que diferencia a un buen curriculum vitae",
          paragraphs: [
            "No es solo un tema de formato. Un buen CV tiene un objetivo claro, experiencia bien contada, habilidades relevantes y una estructura que facilite leerlo rapido.",
            "La diferencia real suele estar en como resumes lo que sabes hacer y como haces que el lector entienda por que deberia considerarte para el puesto.",
          ],
        },
        {
          title: "Por que hacerlo online puede ayudarte mas",
          paragraphs: [
            "Crear el curriculum online hace mucho mas facil actualizarlo, adaptarlo y mantenerlo ordenado. Tambien te ahorra tiempo cuando necesitas hacer ajustes para nuevas vacantes.",
            "Si ademas el flujo te ayuda a mejorar contenido, el resultado final suele ser bastante mejor que editar una plantilla vacia por tu cuenta.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Esto sirve para cualquier tipo de trabajo?",
          answer:
            "Si. Puedes adaptarlo a distintos rubros y etapas profesionales segun tu objetivo.",
        },
        {
          question: "Puedo usarlo aunque no tenga un CV previo?",
          answer:
            "Si. El flujo esta pensado tanto para crear uno desde cero como para mejorar uno existente.",
        },
        {
          question: "El curriculum vitae se puede editar despues?",
          answer:
            "Si. La idea es que puedas seguir ajustandolo y mejorandolo segun nuevas postulaciones.",
        },
      ]}
      relatedLinks={[
        {
          href: "/",
          title: "Creador de CV online",
          description:
            "Usa VitaeSpark para crear tu curriculum con IA, plantillas y descarga en PDF.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Version enfocada en la accion rapida y el flujo guiado.",
        },
        {
          href: "/curriculum-vitae-pdf",
          title: "Curriculum vitae en PDF",
          description: "Descubre por que el formato final importa tanto al postularte.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description: "Aclara el contenido ideal antes de armar tu version final.",
        },
      ]}
    />
  );
}
