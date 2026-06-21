import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crear Curriculum Vitae Online Editable: Estructura y PDF",
  description:
    "Crea tu curriculum vitae online con estructura clara, ayuda de IA, plantillas profesionales, edicion posterior y descarga en PDF.",
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
      title="Crear curriculum vitae online editable con estructura clara y PDF"
      description="Arma un curriculum vitae que se vea profesional, sea facil de leer y te ayude a postularte mejor a nuevas oportunidades laborales."
      intro={[
        "Muchas personas buscan crear un curriculum vitae cuando necesitan resolver rapido algo importante: postularse mejor. El problema es que suelen terminar entre plantillas viejas, documentos desordenados o textos demasiado genericos.",
        "VitaeSpark te ayuda a pasar de esa confusion a un CV mas claro, con una estructura profesional y contenido mejor redactado para mostrar tu perfil con mas fuerza.",
      ]}
      benefits={[
        "Ordena experiencia, estudios y habilidades sin perder claridad.",
        "Te ayuda a redactar mejor sin empezar desde cero.",
        "Terminas con un curriculum listo para editar, descargar y compartir.",
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
          title: "Llevalo a una plantilla editable",
          description: "Guarda una version lista para tus postulaciones y ajustala cuando haga falta.",
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
          title: "Estructura recomendada para un curriculum vitae",
          paragraphs: [
            "Una estructura simple suele funcionar mejor: datos de contacto, perfil profesional, experiencia, formacion, habilidades, idiomas e informacion adicional si aporta valor. Si no tienes experiencia, puedes sumar cursos, proyectos o practicas.",
            "El orden puede cambiar segun tu perfil, pero la prioridad siempre es la misma: que el reclutador entienda rapido quien eres, que buscas y que puedes aportar.",
          ],
        },
        {
          title: "Ejemplo de contenido para empezar",
          paragraphs: [
            "Un perfil inicial podria decir: 'Perfil orientado a administracion y atencion al cliente, con experiencia en carga de datos, trato con personas, organizacion de tareas y manejo basico de herramientas digitales'.",
            "Ese ejemplo no debe copiarse literal. Sirve como base para que reemplaces el rubro, las tareas y las herramientas por informacion real de tu trayectoria.",
          ],
        },
        {
          title: "Por que hacerlo online puede ayudarte mas",
          paragraphs: [
            "Crear el curriculum online hace mas facil actualizarlo, adaptarlo y mantenerlo ordenado. Tambien te ahorra tiempo cuando necesitas hacer ajustes para nuevas vacantes.",
            "Si ademas el flujo te ayuda a mejorar contenido, el resultado final suele ser mejor que editar una plantilla vacia por tu cuenta.",
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
          question: "Que secciones debe tener un curriculum vitae?",
          answer:
            "Contacto, perfil profesional, experiencia, formacion, habilidades e idiomas si suman. En perfiles iniciales tambien pueden entrar cursos, proyectos o practicas.",
        },
        {
          question: "El curriculum vitae se puede editar despues?",
          answer:
            "Si. El CV queda guardado en tu perfil para seguir ajustandolo, cambiar plantilla y descargar nuevas versiones.",
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
          description:
            "Descubre por que el formato final importa tanto al postularte.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description:
            "Aclara el contenido ideal antes de armar tu version final.",
        },
      ]}
    />
  );
}
