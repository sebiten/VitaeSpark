import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Limpieza: Ejemplo, Habilidades y Sin Experiencia",
  description:
    "Arma un CV para limpieza con ejemplo, habilidades operativas, mantenimiento de espacios, disponibilidad y opciones sin experiencia.",
  path: "/cv-para-limpieza",
  keywords: [
    "cv para limpieza",
    "curriculum limpieza",
    "ejemplo cv limpieza",
    "habilidades limpieza curriculum",
    "cv operario limpieza",
  ],
});

export default function CvParaLimpiezaPage() {
  return (
    <MarketingPage
      path="/cv-para-limpieza"
      eyebrow="CV por profesion"
      title="CV para limpieza: ejemplo, habilidades y sin experiencia"
      description="Prepara un curriculum para limpieza destacando mantenimiento de espacios, orden, responsabilidad, productos, procedimientos y disponibilidad."
      intro={[
        "Un CV para limpieza debe mostrar responsabilidad, prolijidad y capacidad para mantener espacios en condiciones. Conviene explicar si trabajaste en oficinas, casas, edificios, hospitales, comercios, escuelas o empresas.",
        "VitaeSpark te ayuda a presentar esa experiencia de forma profesional, con tareas claras, habilidades utiles y una estructura facil de leer para reclutadores.",
      ]}
      exampleImage={{
        src: "/elegance-good.webp",
        alt: "ejemplo de cv para limpieza",
        caption:
          "Ejemplo visual de CV adaptable para limpieza, mantenimiento y servicios generales.",
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
          title: "Que poner en un CV para limpieza",
          paragraphs: [
            "Suele sumar experiencia en limpieza de espacios, mantenimiento de areas comunes, uso de productos, orden de materiales, cumplimiento de rutinas, reposicion de insumos y cuidado de normas de higiene.",
            "Si trabajaste en lugares con protocolos especiales, como salud, gastronomia o edificios, conviene aclararlo porque aumenta la relevancia del perfil.",
          ],
        },
        {
          title: "CV para limpieza sin experiencia",
          paragraphs: [
            "Si no tienes experiencia formal, puedes destacar responsabilidad, puntualidad, orden, tareas domesticas, trabajos informales, disponibilidad horaria y capacidad para seguir instrucciones.",
            "Lo importante es mostrar confianza y claridad. Un perfil simple pero concreto suele funcionar mejor que frases muy generales.",
          ],
        },
        {
          title: "Curriculum de limpieza sin experiencia",
          paragraphs: [
            "Para busquedas de primer empleo, conviene mencionar disponibilidad, puntualidad, cuidado de espacios, seguimiento de indicaciones, tareas domesticas, referencias si tienes y voluntad para aprender rutinas del lugar.",
            "Tambien ayuda aclarar el tipo de lugar al que apuntas: oficinas, edificios, casas, comercios, escuelas, salud o limpieza industrial. Cada contexto cambia las palabras que conviene usar.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para limpieza",
          paragraphs: [
            "Una base posible es: 'Perfil orientado a limpieza y mantenimiento de espacios, con experiencia en rutinas de higiene, orden de areas comunes, uso responsable de productos y cumplimiento de indicaciones'.",
            "Si no tienes experiencia formal, puedes cambiarlo por: 'Perfil inicial para limpieza, con responsabilidad, disponibilidad horaria, orden, puntualidad y capacidad para seguir rutinas de trabajo'.",
          ],
        },
        {
          title: "Habilidades que suelen valorar",
          paragraphs: [
            "Entre las habilidades utiles estan atencion al detalle, organizacion, responsabilidad, manejo de productos, higiene, rapidez, cuidado de espacios y cumplimiento de rutinas.",
            "Conviene incluirlas de forma natural junto a tus tareas reales para que el CV no parezca una lista vacia.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para limpieza de oficinas?",
          answer:
            "Si. Tambien se puede adaptar a edificios, comercios, casas, instituciones y empresas.",
        },
        {
          question: "Debo incluir disponibilidad horaria?",
          answer:
            "Si buscas turnos rotativos, fines de semana o media jornada, puede sumar.",
        },
        {
          question: "Puedo usarlo sin experiencia formal?",
          answer:
            "Si. Puedes destacar trabajos informales, tareas domesticas, responsabilidad y disponibilidad.",
        },
        {
          question: "Que poner en perfil profesional de limpieza?",
          answer:
            "Menciona limpieza de espacios, orden, uso de productos, cumplimiento de rutinas, responsabilidad, disponibilidad y el tipo de lugar donde trabajaste o quieres trabajar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-repositor",
          title: "CV para repositor",
          description: "Otra opcion operativa cercana para comercios y supermercados.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util para armar un perfil inicial mas solido.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Crea tu CV profesional en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
