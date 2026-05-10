import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Administrativo sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para administrativo sin experiencia con ejemplo de perfil, habilidades de organización, manejo de sistemas y formato profesional listo para descargar.",
  path: "/cv-para-administrativo-sin-experiencia",
  keywords: [
    "cv para administrativo sin experiencia",
    "curriculum administrativo sin experiencia",
    "cv administrativo sin experiencia",
    "perfil administrativo sin experiencia",
    "ejemplo cv administrativo sin experiencia",
  ],
});

export default function CvParaAdministrativoSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-administrativo-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para administrativo sin experiencia: ejemplo y habilidades"
      description="Mostrá tu capacidad organizativa, manejo de herramientas digitales y atención al detalle aunque sea tu primer empleo en administración."
      intro={[
        "El trabajo administrativo requiere organización, precisión, manejo de información y herramientas digitales. Aunque no tengas experiencia formal, podés demostrar estas habilidades a través de estudios, cursos, proyectos académicos o experiencia informal.",
        "VitaeSpark te ayuda a crear un CV administrativo profesional que destaque tu potencial desde el primer envío.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para administrativo sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para puesto administrativo inicial en empresas, oficinas y estudios.",
      }}
      benefits={[
        "Enfoca organización, precisión y manejo de herramientas digitales.",
        "Sirve para empresas, oficinas, estudios profesionales y consultoras.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Identificá el área administrativa",
          description:
            "Considerá si apuntás a recursos humanos, finanzas, logística, atención al cliente interno o asistencia de dirección. Cada área valora habilidades distintas.",
        },
        {
          title: "Resaltá habilidades transferibles",
          description:
            "Manejo de datos, organización de archivos, Microsoft Office, comunicación escrita, precisión y gestión del tiempo son relevantes sin importar la experiencia previa.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones administrativas iniciales.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de administrativo sin experiencia",
          paragraphs: [
            "Podés incluir estudios en administración, comercio, contabilidad o carreras afines. También cursos de manejo de herramientas informáticas, gestión documental, atención telefónica y comunicación escrita.",
            "Si realizaste prácticas, trabajos de apoyo en oficinas, o proyectos académicos que involucraron manejo de datos o documentos, presentalos como experiencia relevante.",
          ],
        },
        {
          title: "Ejemplo de perfil para administrativo inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil organizado y detallista orientado a la gestión administrativa, con habilidades en manejo de herramientas digitales, procesamiento de datos y comunicación escrita. Capacidad para aprender procesos rápidamente y mantener la confidencialidad de la información.'",
            "Ajustalo al área específica: recursos humanos valora reclutamiento y rrhh, finanzas valora precisión con números, logística valora organización de inventarios.",
          ],
        },
        {
          title: "Habilidades clave para administrativos sin experiencia",
          paragraphs: [
            "Microsoft Office intermedio, Organización y gestión documental, Comunicación escrita clara, Precisión y atención al detalle, Capacidad de aprendizaje rápido, Confidencialidad, Capacidad de trabajar bajo presión leve.",
            "Cursos de Excel avanzado, gestión de base de datos o Administración son muy valorados incluso sin experiencia formal.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo trabajar en administración sin experiencia?",
          answer:
            "Sí. Muchas empresas toman perfiles iniciales con buenos estudios, cursos relacionados y habilidades digitales, aunque no tengan experiencia formal.",
        },
        {
          question: "Qué habilidades son más importantes para un administrativo?",
          answer:
            "Organización, precisión, manejo de herramientas digitales (especialmente Excel), comunicación escrita y capacidad de mantener confidencialidad.",
        },
        {
          question: "Los cursos de administración suman aunque no tenga experiencia?",
          answer:
            "Sí, especialmente si son prácticos y generan habilidades aplicables como Excel avanzado, gestión documental o atención telefónica.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-administrativo",
          title: "CV para administrativo",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description:
            "Perfil similar enfocado en comunicación y resolución de consultas.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description:
            "Guía general para armar tu primer currículum laboral.",
        },
      ]}
    />
  );
}