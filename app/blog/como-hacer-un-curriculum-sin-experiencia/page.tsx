import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";
import { seoContentLastModified } from "@/lib/seo-routes";

const path = "/blog/como-hacer-un-curriculum-sin-experiencia";

export const metadata = buildMetadata({
  title: "Cómo escribir tu primer CV a partir de una actividad real",
  description:
    "Sigue un caso paso a paso para convertir un proyecto escolar en el perfil y las actividades de tu primer CV. Incluye ejemplos de redacción y una revisión final.",
  path,
  keywords: [
    "como hacer un currículum sin experiencia",
    "cv sin experiencia",
    "hacer currículum primer empleo",
    "currículum sin experiencia laboral",
  ],
  type: "article",
  image: "/social/cv-sin-experiencia-og.png",
  imageAlt: "Cinco elementos para un CV sin experiencia laboral",
  socialTitle: "Cómo contar un proyecto en tu primer CV",
  socialDescription:
    "Estudios, proyectos, cursos, voluntariados y habilidades también pueden demostrar lo que sabes hacer.",
});

export default function ComoHacerUnCurriculumSinExperienciaPage() {
  return (
    <BlogArticlePage
      path={path}
      datePublished="2025-04-12"
      dateModified={seoContentLastModified[path]}
      image="/social/cv-sin-experiencia-og.png"
      title="Cómo hacer tu primer currículum con una actividad que ya realizaste"
      description="De una feria escolar al primer CV: elige qué contar, redacta dos frases y adáptalas al puesto."
      intro="Imagina que ayudaste en una feria escolar y ahora quieres postularte a un comercio. Durante la feria explicaste los precios a los visitantes y anotaste los pedidos en una planilla. Con esos dos datos puedes empezar a escribir. El caso es ficticio; para hacer el ejercicio, elige una actividad tuya."
      sections={[
        {
          title: "Anota qué hiciste tú",
          paragraphs: [
            "Escribe el nombre de la actividad, dónde ocurrió, cuándo participaste y qué parte te tocó. En el ejemplo, el grupo organizó la feria y tu responsabilidad fue atender el mostrador y llevar el registro.",
            "Si eliges un curso, busca un ejercicio que hayas terminado. Puedes contar qué pieza preparaste en el taller, qué campos cargaste en una planilla o qué consulta resolviste en una práctica.",
          ],
        },
        {
          title: "Redacta la entrada para tu CV",
          paragraphs: [
            "Bajo «Proyectos y actividades» puedes escribir: «Feria escolar · [Escuela] · [mes y año]. Atendí el mostrador, expliqué los precios a los visitantes y anoté sus pedidos en una planilla». Si fue un taller o un voluntariado, usa el nombre correspondiente.",
            "Para redactar la tuya, completa «Me encargué de [acción] para [persona o equipo] y usé [herramienta] para [tarea concreta]». Si ya explicaste bien tu tarea en una frase, puedes terminar ahí.",
          ],
        },
        {
          title: "Elige el perfil según el aviso",
          paragraphs: [
            "Para atención al público: «Busco mi primer puesto de atención en comercio. En una feria escolar respondí consultas sobre precios y registré pedidos en el mostrador».",
            "Para apoyo administrativo: «Busco mi primer puesto de auxiliar de oficina. En una actividad escolar llevé una planilla de pedidos mientras mis compañeros preparaban las entregas». Cambia el énfasis según el aviso y conserva los hechos.",
          ],
        },
        {
          title: "Revisa el documento antes de enviarlo",
          paragraphs: [
            "Lee cada frase como si te preguntaran por ella en una entrevista. Si el ejemplo dice que cobraste y tú solo anotaste pedidos, corrige el verbo. En formación, indica si sigues estudiando y comprueba que la disponibilidad sea compatible con tus horarios.",
            "Abre el PDF en tu teléfono, comprueba que se lean tu correo y tu número completos y revisa que hayas sustituido los campos entre corchetes.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo incluir voluntariados o actividades extracurriculares?",
          answer:
            "Sí. Si ayudan a mostrar habilidades, responsabilidad o experiencia relevante, pueden sumar bastante.",
        },
        {
          question: "¿Cómo menciono un curso que todavía estoy haciendo?",
          answer:
            "Inclúyelo en formación con el nombre de la institución y la indicación «en curso». Si ya terminaste una práctica relacionada con el puesto, describe esa práctica en una línea.",
        },
        {
          question: "¿Debo aclarar que no tengo experiencia?",
          answer:
            "No hace falta decirlo de forma literal si puedes orientar bien el perfil con estudios, proyectos y objetivo profesional.",
        },
      ]}
      relatedLinks={[
        {
          href: "/curriculum-sin-experiencia",
          title: "Modelo completo de currículum sin experiencia",
          description: "Usa el modelo de auxiliar de oficina para ordenar el perfil, los estudios y la actividad que acabas de redactar.",
        },
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "Ejemplo de CV para atención al cliente sin experiencia",
          description: "Mira cómo presentar la atención al público en un CV para mostrador o mensajería.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para currículum",
          description: "Aprovecha mejor una sección clave en perfiles iniciales.",
        },
      ]}
    />
  );
}
