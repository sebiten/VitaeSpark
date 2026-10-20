import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Médicos: Estructura, Formación y Experiencia",
  description:
    "Aprende cómo estructurar un currículum para médicos destacando formación, experiencia clínica y especialidades.",
  path: "/cv-para-medicos",
  keywords: [
    "cv para médicos",
    "currículum para médico",
    "cv médico",
    "currículum médico",
  ],
});

export default function CvParaMedicosPage() {
  return (
    <MarketingPage
      path="/cv-para-medicos"
      eyebrow="CV por profesión"
      title="CV para médicos con foco en formación, experiencia clínica y especialidad"
      description="Organiza tu perfil médico con una estructura clara para destacar experiencia asistencial, rotaciones, residencia, especialidad y formación."
      intro={[
        "Un currículum para médicos necesita transmitir formación, experiencia clínica, áreas de interés y trayectoria profesional con mucha claridad. En este tipo de perfiles, el orden y la jerarquía importan tanto como el contenido.",
        "VitaeSpark te ayuda a presentar experiencia asistencial, residencia, guardias, especializacion y habilidades relevantes en un formato profesional y fácil de leer.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-medico.png",
        alt: "Ejemplo completo de CV para médica clínica",
        caption:
          "CV ilustrativo médico con matrícula, experiencia clínica y protocolos.",
      }}
      benefits={[
        "Mejor organización de formación, experiencia hospitalaria y especialidades.",
        "Ideal para postulaciones clínicas, institucionales o académicas.",
        "Ayuda a resumir trayectorias complejas de forma más clara.",
      ]}
      steps={[
        {
          title: "Ordena tu trayectoria",
          description:
            "Define que parte de tu experiencia clínica o académica quieres priorizar.",
        },
        {
          title: "Resume tu experiencia médica",
          description:
            "Explica funciones, tipo de institución, rotaciones o especialidad.",
        },
        {
          title: "Lleva tu CV a una plantilla profesional",
          description:
            "Obtienes un documento listo para procesos institucionales y laborales.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV: médico/a — [especialidad acreditada, si corresponde]",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Médico/a — [especialidad acreditada, si corresponde] · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Profesional de medicina con formación en [institución] y experiencia en [ámbito real]. Participación en atención de pacientes, registro clínico y coordinación con el equipo según las responsabilidades del cargo.",
            "Experiencia: [Cargo médico real] · [Institución de salud] · [Mes/año de inicio–mes/año de fin]. Realicé [actividad clínica dentro del alcance de mi cargo], registré la atención en [sistema utilizado] y coordiné [seguimiento o derivación] con el equipo. Describe el contexto sin incluir datos que identifiquen pacientes.",
            "Formación: Medicina · [Universidad] · [Año]. [Especialidad o residencia, institución y estado real].",
            "Habilidades: [Sistema de historia clínica] para registro; [procedimientos acreditados y pertinentes]; comunicación con equipos de salud.",
            "Matrícula y habilitación: [Jurisdicción, número y vigencia cuando corresponda]. Incluye solo credenciales vigentes y comprobables; no uses el ejemplo para atribuirte una especialidad.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Qué debe mostrar un CV médico",
          paragraphs: [
            "Lo principal suele ser formación académica, experiencia asistencial, residencia, especialidad, cursos, congresos e idiomas si aportan al perfil. Según el caso, también pueden sumar publicaciones o docencia.",
            "Lo importante es que la estructura facilite entender en que etapa profesional estas y cual es tu foco actual.",
          ],
        },
        {
          title: "Cómo ganar claridad en perfiles con mucha formación",
          paragraphs: [
            "En medicina es fácil que el CV se vuelva muy largo o desordenado si no se prioriza bien. Conviene separar con claridad experiencia, formación y actividades complementarias para que el lector pueda escanearlo sin esfuerzo.",
            "También ayuda resumir lo más relevante para el tipo de puesto o institución a la que vas a postularte.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Debo incluir congresos y cursos?",
          answer:
            "Si aportan valor al puesto o especialidad buscada, suelen sumar mucho al perfil médico.",
        },
        {
          question: "¿Sirve para médicos recién recibidos?",
          answer:
            "Sí. En ese caso cobran más peso formación, prácticas, rotaciones e intereses profesionales.",
        },
        {
          question: "¿Conviene adaptar el CV a cada institución?",
          answer:
            "Sí. Cambiar el foco según guardias, residencia, especialidad o rol objetivo puede mejorar mucho la presentación.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/plantilla-harvard",
          title: "Plantilla Harvard",
          description: "Una opción sobria y clara para perfiles profesionales.",
        },
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description: "Mantiene estructura clara también para procesos digitalizados.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Pasa tu información médica a un formato ordenado y descargable.",
        },
      ]}
    />
  );
}
