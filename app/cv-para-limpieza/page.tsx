import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Limpieza: Ejemplo, Perfil y Habilidades",
  description:
    "Arma un CV para limpieza con ejemplo listo, perfil profesional, habilidades, mantenimiento de espacios y opción sin experiencia.",
  path: "/cv-para-limpieza",
  keywords: [
    "cv para limpieza",
    "currículum limpieza",
    "ejemplo cv limpieza",
    "habilidades limpieza currículum",
    "cv operario limpieza",
  ],
  image: "/social/cv-limpieza-ejemplo-og.png",
  imageAlt:
    "Ejemplo de CV de limpieza con ambientes, protocolos y responsabilidades",
  socialTitle: "No pongas solo “tareas de limpieza” en tu CV",
  socialDescription:
    "Mirá cómo presentar ambientes, rutinas, productos y responsabilidades en un CV de limpieza profesional.",
});

export default function CvParaLimpiezaPage() {
  return (
    <MarketingPage
      path="/cv-para-limpieza"
      eyebrow="CV por profesión"
      title="CV para limpieza: ejemplo listo con perfil y habilidades"
      description="Prepara un currículum de limpieza claro para oficinas, edificios, comercios o casas, con perfil profesional, tareas, productos y disponibilidad."
      ctaLabel="Crear mi CV de limpieza"
      conversionGuidance={{
        message:
          "Contá qué espacios limpiaste, qué tareas hiciste y tu disponibilidad. Si no tenés experiencia formal, podés incluir tareas domésticas o trabajos informales.",
        exampleLabel: "Ver ejemplo de CV de limpieza",
        closingMessage:
          "Ahora armá el tuyo con tus tareas, habilidades y disponibilidad para trabajar en limpieza.",
      }}
      intro={[
        "Un CV para limpieza debe mostrar responsabilidad, prolijidad y capacidad para mantener espacios en condiciones. Conviene explicar si trabajaste en oficinas, casas, edificios, hospitales, comercios, escuelas o empresas, y con que rutinas o productos lo hacias.",
        "VitaeSpark te ayuda a presentar esa experiencia en un currículum limpieza más profesional, con perfil claro, habilidades útiles y estructura ATS fácil de leer para reclutadores.",
      ]}
      conversionCta={{
        title: "Presenta tus tareas de limpieza con más claridad",
        description:
          "Indica lugares, rutinas, productos y responsabilidades. VitaeSpark los convierte en experiencia concreta para tu CV.",
        label: "Crear mi CV de limpieza",
      }}
      exampleImage={{
        src: "/cv-examples/cv-limpieza.png",
        alt: "Ejemplo completo de CV para operaria de limpieza",
        caption:
          "CV ilustrativo para limpieza con rutinas, productos, desinfección y disponibilidad.",
      }}
      benefits={[
        "Destaca limpieza, orden, mantenimiento, productos y procedimientos.",
        "Sirve para oficinas, edificios, comercios, salud, escuelas y hogares.",
        "Ayuda a mostrar responsabilidad y experiencia operativa en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el lugar de trabajo",
          description:
            "Aclara si fue oficina, comercio, edificio, casa, salud, escuela o empresa.",
        },
        {
          title: "Describe tareas concretas",
          description:
            "Incluye limpieza profunda, mantenimiento, productos, rutinas y control de espacios.",
        },
        {
          title: "Descarga tu CV",
          description:
            "Obtienes un CV claro para postularte a puestos de limpieza o servicios generales.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: personal de limpieza de oficinas",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Personal de limpieza de oficinas · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Personal de limpieza con experiencia en mantenimiento de oficinas y espacios comunes. Organización de recorridos, reposición de insumos y uso de productos según indicaciones.",
            "Experiencia: Personal de limpieza · [Empresa o actividad independiente] · [Mes/año de inicio–mes/año de fin]. Limpié superficies y sanitarios según la rutina asignada, repuse insumos y comuniqué faltantes o desperfectos. Utilicé los productos y elementos de protección indicados para cada tarea.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: Organización de rutinas; identificación de productos utilizados; reposición de insumos; [equipo que sabes operar].",
            "Si tu experiencia fue en domicilios particulares, identifícala como trabajo independiente. No declares limpieza hospitalaria o manejo de maquinaria industrial si no realizaste esas tareas.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "CV para limpieza: que poner para que se vea serio",
          paragraphs: [
            "Suele sumar experiencia en limpieza de espacios, mantenimiento de áreas comunes, uso de productos, orden de materiales, cumplimiento de rutinas, reposición de insumos y cuidado de normas de higiene. Estas tareas deberían aparecer antes que frases genéricas como 'buena predisposicion'.",
            "Si trabajaste en lugares con protocolos especiales, como salud, gastronomía o edificios, conviene aclararlo porque aumenta la relevancia del perfil.",
          ],
        },
        {
          title: "CV para limpieza sin experiencia",
          paragraphs: [
            "Si no tienes experiencia formal, puedes destacar responsabilidad, puntualidad, tareas domésticas o informales, disponibilidad horaria, cuidado de espacios y capacidad para seguir instrucciones.",
            "Aclara el tipo de lugar al que apuntas: oficinas, edificios, casas, comercios, escuelas, salud o limpieza industrial. Un perfil simple y concreto funciona mejor que una lista de cualidades generales.",
          ],
        },
        {
          title: "Perfil profesional para limpieza",
          paragraphs: [
            "Una base posible es: 'Perfil orientado a limpieza y mantenimiento de espacios, con experiencia en rutinas de higiene, orden de áreas comunes, uso responsable de productos y cumplimiento de indicaciones'.",
            "Si no tienes experiencia formal, puedes cambiarlo por: 'Perfil inicial para limpieza, con responsabilidad, disponibilidad horaria, orden, puntualidad y capacidad para seguir rutinas de trabajo'.",
          ],
        },
        {
          title: "Ejemplos de experiencia para limpieza",
          paragraphs: [
            "Para oficinas o edificios puedes escribir: 'Realice limpieza de espacios comunes, sanitarios y puestos de trabajo, repuse insumos y mantuve ordenados los materiales según la rutina del lugar'.",
            "Para salud o gastronomía: 'Apliqué rutinas de limpieza y desinfección por sector, separé elementos de trabajo, repuse insumos y cumplí los protocolos y frecuencias indicados'. Usa esta estructura solo si representa tus tareas reales.",
          ],
        },
        {
          title: "Habilidades que suelen valorar",
          paragraphs: [
            "Entre las habilidades útiles estan atención al detalle, organización, responsabilidad, manejo de productos, higiene, rapidez, cuidado de espacios y cumplimiento de rutinas.",
            "Conviene incluirlas de forma natural junto a tus tareas reales para que el CV no parezca una lista vacía.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Sirve para limpieza de oficinas?",
          answer:
            "Sí. También se puede adaptar a edificios, comercios, casas, instituciones y empresas.",
        },
        {
          question: "¿Debo incluir disponibilidad horaria?",
          answer:
            "Si buscas turnos rotativos, fines de semana o media jornada, puede sumar.",
        },
        {
          question: "¿Puedo usarlo sin experiencia formal?",
          answer:
            "Sí. Puedes destacar trabajos informales, tareas domesticas, responsabilidad y disponibilidad.",
        },
        {
          question: "¿Qué poner en perfil profesional de limpieza?",
          answer:
            "Menciona limpieza de espacios, orden, uso de productos, cumplimiento de rutinas, responsabilidad, disponibilidad y el tipo de lugar donde trabajaste o quieres trabajar.",
        },
        {
          question: "¿Cómo hacer un currículum de limpieza sin experiencia?",
          answer:
            "Destaca responsabilidad, puntualidad, disponibilidad, tareas domesticas o informales, cuidado de espacios, seguimiento de indicaciones y referencias si las tienes.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Otra opción operativa cercana para comercios y supermercados.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Útil para armar un perfil inicial más solido.",
        },
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description: "Cercano si buscas puestos de servicios generales, mantenimiento o depósito.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Crea tu CV profesional en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
