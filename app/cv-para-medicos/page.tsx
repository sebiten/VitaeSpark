import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Médicos: Estructura, Formación y Experiencia",
  description:
    "Aprende cómo estructurar un currículum para médicos destacando formación, experiencia clínica y especialidades.",
  path: "/cv-para-medicos",
  keywords: [
    "cv para medicos",
    "curriculum para medico",
    "cv medico",
    "curriculum medico",
  ],
});

export default function CvParaMedicosPage() {
  return (
    <MarketingPage
      path="/cv-para-medicos"
      eyebrow="CV por profesion"
      title="CV para medicos con foco en formacion, experiencia clinica y especialidad"
      description="Organiza tu perfil medico con una estructura clara para destacar experiencia asistencial, rotaciones, residencia, especialidad y formacion."
      intro={[
        "Un curriculum para medicos necesita transmitir formacion, experiencia clinica, areas de interes y trayectoria profesional con mucha claridad. En este tipo de perfiles, el orden y la jerarquia importan tanto como el contenido.",
        "VitaeSpark te ayuda a presentar experiencia asistencial, residencia, guardias, especializacion y habilidades relevantes en un formato profesional y facil de leer.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-medico.png",
        alt: "Ejemplo completo de CV para médica clínica",
        caption:
          "CV ilustrativo médico con matrícula, experiencia clínica y protocolos.",
      }}
      benefits={[
        "Mejor organizacion de formacion, experiencia hospitalaria y especialidades.",
        "Ideal para postulaciones clinicas, institucionales o academicas.",
        "Ayuda a resumir trayectorias complejas de forma mas clara.",
      ]}
      steps={[
        {
          title: "Ordena tu trayectoria",
          description:
            "Define que parte de tu experiencia clinica o academica quieres priorizar.",
        },
        {
          title: "Resume tu experiencia medica",
          description:
            "Explica funciones, tipo de institucion, rotaciones o especialidad.",
        },
        {
          title: "Lleva tu CV a una plantilla profesional",
          description:
            "Obtienes un documento listo para procesos institucionales y laborales.",
        },
      ]}
      sections={[
        {
          title: "Que debe mostrar un CV medico",
          paragraphs: [
            "Lo principal suele ser formacion academica, experiencia asistencial, residencia, especialidad, cursos, congresos e idiomas si aportan al perfil. Segun el caso, tambien pueden sumar publicaciones o docencia.",
            "Lo importante es que la estructura facilite entender en que etapa profesional estas y cual es tu foco actual.",
          ],
        },
        {
          title: "Como ganar claridad en perfiles con mucha formacion",
          paragraphs: [
            "En medicina es facil que el CV se vuelva muy largo o desordenado si no se prioriza bien. Conviene separar con claridad experiencia, formacion y actividades complementarias para que el lector pueda escanearlo sin esfuerzo.",
            "Tambien ayuda resumir lo mas relevante para el tipo de puesto o institucion a la que vas a postularte.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Debo incluir congresos y cursos?",
          answer:
            "Si aportan valor al puesto o especialidad buscada, suelen sumar mucho al perfil medico.",
        },
        {
          question: "Sirve para medicos recien recibidos?",
          answer:
            "Si. En ese caso cobran mas peso formacion, practicas, rotaciones e intereses profesionales.",
        },
        {
          question: "Conviene adaptar el CV a cada institucion?",
          answer:
            "Si. Cambiar el foco segun guardias, residencia, especialidad o rol objetivo puede mejorar mucho la presentacion.",
        },
      ]}
      relatedLinks={[
        {
          href: "/plantilla-harvard",
          title: "Plantilla Harvard",
          description: "Una opcion sobria y clara para perfiles profesionales.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Mantiene estructura clara tambien para procesos digitalizados.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Pasa tu informacion medica a un formato ordenado y descargable.",
        },
      ]}
    />
  );
}
