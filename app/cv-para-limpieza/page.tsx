import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Limpieza: Ejemplo, Habilidades y Formato ATS",
  description:
    "Arma un CV para limpieza con ejemplo, habilidades operativas, orden, mantenimiento de espacios y formato ATS.",
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
      title="CV para limpieza: ejemplo, habilidades y formato ATS"
      description="Prepara un curriculum para limpieza destacando mantenimiento de espacios, orden, responsabilidad, productos, procedimientos y ritmo de trabajo."
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
