import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Primer Empleo: Ejemplo sin Experiencia",
  description:
    "Aprende como armar un CV para primer empleo sin experiencia con perfil, estudios, cursos, proyectos, habilidades y ejemplo listo.",
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
      title="CV para primer empleo: ejemplo sin experiencia laboral"
      description="Si estas por buscar tu primer trabajo, arma un CV claro con perfil, estudios, cursos, proyectos, habilidades y una estructura profesional."
      intro={[
        "Un CV para primer empleo no necesita inventar experiencia. Lo que necesita es mostrar bien formacion, herramientas, actitud, proyectos y cualquier señal de que puedes aprender rapido y aportar valor.",
        "Muchas veces el problema no es la falta de experiencia, sino no saber como traducir estudios, actividades o practicas en una presentacion profesional que tenga sentido para el reclutador.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-primer-empleo.png",
        alt: "Ejemplo completo de CV para primer empleo",
        caption:
          "CV ilustrativo de primer empleo con proyectos, estudios y habilidades transferibles.",
      }}
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
            "Suele convenir incluir un perfil breve, formacion, cursos relevantes, proyectos, herramientas, idiomas y cualquier experiencia que demuestre responsabilidad o aprendizaje, aunque no sea un trabajo formal. Para busquedas como primer empleo curriculum, el contenido tiene que resolver esa duda sin vueltas.",
            "La clave esta en que cada seccion tenga un sentido concreto para el rol al que apuntas, no en llenar espacio por llenar.",
          ],
        },
        {
          title: "Ejemplo de perfil para primer empleo",
          paragraphs: [
            "Una base posible es: 'Perfil inicial con formacion secundaria completa, manejo basico de herramientas digitales, responsabilidad, buena comunicacion y disponibilidad para aprender procesos de trabajo en atencion, comercio o tareas operativas'.",
            "Si apuntas a un rubro concreto, cambia el cierre. Para comercio, menciona atencion al cliente y orden. Para oficina, herramientas digitales y documentacion. Para operario, puntualidad, seguridad y tareas practicas.",
          ],
        },
        {
          title: "Experiencia informal, proyectos y cursos",
          paragraphs: [
            "Si todavia no tuviste empleo formal, puedes incluir practicas escolares, voluntariado, emprendimientos, ayuda familiar, ventas informales, proyectos academicos, cursos o actividades donde hayas cumplido responsabilidades concretas.",
            "Lo importante es redactarlo con claridad: que hiciste, que herramientas usaste, que aprendiste y como eso se conecta con el puesto al que quieres postular.",
          ],
        },
        {
          title: "Habilidades para un primer trabajo",
          paragraphs: [
            "Para perfiles iniciales suelen sumar comunicacion, responsabilidad, puntualidad, aprendizaje rapido, organizacion, herramientas digitales, atencion al publico, trabajo en equipo y disponibilidad horaria.",
            "No conviene poner una lista demasiado larga. Es mejor elegir habilidades relacionadas con el empleo objetivo y reforzarlas con estudios, cursos o ejemplos simples.",
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
        {
          question: "Que poner en experiencia si busco mi primer empleo?",
          answer:
            "Puedes poner practicas, voluntariado, proyectos, cursos aplicados, ayuda familiar, ventas informales o actividades donde hayas demostrado responsabilidad y aprendizaje.",
        },
        {
          question: "Que habilidades sirven para primer empleo?",
          answer:
            "Responsabilidad, puntualidad, comunicacion, herramientas digitales, organizacion, atencion al publico, trabajo en equipo, aprendizaje rapido y disponibilidad horaria.",
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
          href: "/cv-para-administrativo-sin-experiencia",
          title: "CV administrativo sin experiencia",
          description:
            "Util si quieres entrar a oficina, recepcion o tareas administrativas iniciales.",
        },
        {
          href: "/cv-para-operario-sin-experiencia",
          title: "CV para operario sin experiencia",
          description:
            "Buena opcion si buscas tu primer puesto en fabrica, deposito o tareas operativas.",
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
