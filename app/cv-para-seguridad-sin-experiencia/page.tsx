import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Seguridad sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para seguridad sin experiencia con ejemplo de perfil, habilidades de vigilancia, atención y formato profesional listo para descargar.",
  path: "/cv-para-seguridad-sin-experiencia",
  keywords: [
    "cv para seguridad sin experiencia",
    "curriculum seguridad sin experiencia",
    "cv seguridad sin experiencia",
    "perfil seguridad sin experiencia",
    "ejemplo cv seguridad sin experiencia",
  ],
});

export default function CvParaSeguridadSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-seguridad-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para seguridad sin experiencia: ejemplo y habilidades"
      description="Mostrá tu capacidad de vigilancia, atención y responsabilidad aunque sea tu primer empleo en seguridad privada o vigilancia."
      intro={[
        "El trabajo en seguridad privada requiere atención, responsabilidad, capacidad de reacción y trato profesional. Aunque no tengas experiencia formal, podés demostrar estas habilidades a través de estudios, cursos de seguridad, actividad física o cualquier contexto donde hayas mantenido el orden o la calma bajo presión.",
        "VitaeSpark te ayuda a crear un CV de seguridad profesional que destaque tu potencial y tu compromiso con la protección de bienes y personas.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-seguridad.png",
        alt: "Ejemplo completo de CV para vigilador de seguridad privada",
        caption:
          "CV ilustrativo de seguridad con accesos, rondas y protocolos.",
      }}
      benefits={[
        "Enfoca vigilancia, responsabilidad y capacidad de reacción.",
        "Sirve para empresas de seguridad, edificios, eventos y comercios.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Definí el tipo de seguridad",
          description:
            "Considerá si apuntás a vigilancia física, control de acceso, eventos, seguridad corporativa o vigilancia residencial. Cada contexto tiene requisitos distintos.",
        },
        {
          title: "Resaltá habilidades transferibles",
          description:
            "Atención, responsabilidad, capacidad de observación, comunicación, trabajo en equipo y calma bajo presión son relevantes aunque no tengas experiencia formal.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones de seguridad inicial.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de seguridad sin experiencia",
          paragraphs: [
            "Podés incluir cursos de seguridad privada si los tenés, cursos de primeros auxilios, manejo de herramientas de comunicación (radio), educación física o entrenamiento deportivo, y cualquier actividad que muestre atención y responsabilidad.",
            "Si participaste en actividades que involucraron vigilancia, organización de personas, manejo de conflictos o mantenimiento del orden,.presentalos como habilidades relevantes.",
          ],
        },
        {
          title: "Ejemplo de perfil para seguridad inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil orientado a la seguridad y vigilancia con capacidad de observación, responsabilidad y comunicación efectiva. Habilidad para mantener la calma en situaciones de tensión y coordinar con equipos de trabajo.'",
            "Ajustalo al contexto: vigilancia de edificio requiere kontrol de acceso y reporting, eventos requiere gestión de multitudes, seguridad corporativa requiere protocolos específicos.",
          ],
        },
        {
          title: "Habilidades clave para personal de seguridad sin experiencia",
          paragraphs: [
            "Atención y observación, Responsabilidad, Comunicación clara, Capacidad de reacción, Trabajo en equipo, Primeros auxilios básicos, Manejo de radio y comunicación, Condición física adecuada.",
            "Cursos de seguridad privada, manejo defensivo, primeros auxilios y comunicación en crisis son muy valorados incluso sin experiencia formal.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo trabajar en seguridad sin experiencia?",
          answer:
            "Sí. Muchas empresas de seguridad contratan perfiles iniciales con buena presencia, cursos básicos y disposición para aprender protocolos.",
        },
        {
          question: "Necesito cursos de seguridad para empezar?",
          answer:
            "No es obligatorio en todos los casos, pero cursos de seguridad privada, primeros auxilios y comunicación son muy valorados y mejoran significativamente tus posibilidades.",
        },
        {
          question: "Qué importa más en un CV de seguridad?",
          answer:
            "La presencia personal, la responsabilidad, la capacidad de observación y la calma bajo presión. Estas cualidades se pueden demostrar mediante experiencias previas, actividad física o cursos.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-seguridad",
          title: "CV para seguridad",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description:
            "Perfil similar enfocado en control de acceso y atención.",
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
