import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Primer Empleo: Cómo Armarlo sin Experiencia",
  description:
    "Aprende cómo armar un CV para primer empleo destacando estudios, cursos, proyectos y habilidades de forma clara y profesional.",
  path: "/cv-para-primer-empleo",
  keywords: [
    "cv para primer empleo",
    "curriculum para primer empleo",
    "primer empleo cv",
    "primer trabajo curriculum",
    "cv primer trabajo",
  ],
});

export default function CvParaPrimerEmpleoPage() {
  return (
    <MarketingPage
      path="/cv-para-primer-empleo"
      eyebrow="Primer empleo"
      title="CV para primer empleo con una estructura mas fuerte y creible"
      description="Si estas por buscar tu primer trabajo, esta pagina te ayuda a construir un CV claro, profesional y enfocado en lo que si puedes aportar."
      intro={[
        "Un CV para primer empleo no necesita inventar experiencia. Lo que necesita es mostrar bien formacion, herramientas, actitud, proyectos y cualquier señal de que puedes aprender rapido y aportar valor.",
        "Muchas veces el problema no es la falta de experiencia, sino no saber como traducir estudios, actividades o practicas en una presentacion profesional que tenga sentido para el reclutador.",
      ]}
      benefits={[
        "Te ayuda a destacar potencial sin exagerar experiencia.",
        "Ordena estudios, cursos y proyectos en un formato profesional.",
        "Sirve para pasantias, practicas y primeros trabajos formales.",
      ]}
      steps={[
        {
          title: "Define el tipo de empleo al que apuntas",
          description:
            "Eso te permite elegir mejor que habilidades y contenidos destacar.",
        },
        {
          title: "Refuerza lo que ya tienes",
          description:
            "Cursos, practicas, voluntariados y proyectos pueden pesar mucho al inicio.",
        },
        {
          title: "Convierte eso en un CV claro",
          description:
            "La estructura final debe transmitir orden, potencial y direccion profesional.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un CV para primer empleo",
          paragraphs: [
            "Suele convenir incluir un perfil breve, formacion, cursos relevantes, proyectos, herramientas, idiomas y cualquier experiencia que demuestre responsabilidad o aprendizaje, aunque no sea un trabajo formal.",
            "La clave esta en que cada seccion tenga un sentido concreto para el rol al que apuntas, no en llenar espacio por llenar.",
          ],
        },
        {
          title: "Como hacerlo ver profesional aunque recien empieces",
          paragraphs: [
            "Un buen diseño ayuda, pero el cambio real aparece cuando el contenido esta bien orientado. Si explicas que hiciste, que aprendiste y como eso se relaciona con el puesto, el CV deja de verse vacio.",
            "Por eso conviene trabajar tanto la estructura como el texto. VitaeSpark te ayuda en las dos cosas al mismo tiempo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve aunque no haya trabajado nunca?",
          answer:
            "Si. Justamente esta pensado para quienes todavia no tienen experiencia laboral formal o estan empezando.",
        },
        {
          question: "Puedo poner practicas o voluntariados?",
          answer:
            "Si. Son muy utiles para mostrar responsabilidad, contexto de trabajo y habilidades aplicadas.",
        },
        {
          question: "Es distinto de un CV sin experiencia?",
          answer:
            "Estan muy relacionados, pero primer empleo suele apuntar a una necesidad mas concreta y transaccional de busqueda laboral.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV atencion al cliente sin experiencia",
          description:
            "Ideal si quieres entrar a soporte, retail, recepcion o atencion presencial.",
        },
        {
          href: "/cv-para-cajero-sin-experiencia",
          title: "CV para cajero sin experiencia",
          description:
            "Enfoca responsabilidad, disponibilidad y trato con clientes para puestos de caja.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "Curriculum sin experiencia",
          description:
            "Complementa esta pagina con una version mas amplia sobre perfiles iniciales.",
        },
        {
          href: "/cv-para-estudiantes",
          title: "CV para estudiantes",
          description:
            "Ideal si todavia estas cursando y buscas pasantias o primeras oportunidades.",
        },
        {
          href: "/blog/como-hacer-un-curriculum-sin-experiencia",
          title: "Como hacer un curriculum sin experiencia",
          description:
            "Guia practica para ampliar ideas antes de crear tu version final.",
        },
      ]}
    />
  );
}
