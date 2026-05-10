import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Recepcionista sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para recepcionista sin experiencia con ejemplo de perfil, habilidades de atención, organización y formato profesional listo para descargar.",
  path: "/cv-para-recepcionista-sin-experiencia",
  keywords: [
    "cv para recepcionista sin experiencia",
    "curriculum recepcionista sin experiencia",
    "cv recepcionista sin experiencia",
    "perfil recepcionista sin experiencia",
    "ejemplo cv recepcionista sin experiencia",
  ],
});

export default function CvParaRecepcionistaSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-recepcionista-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para recepcionista sin experiencia: ejemplo y habilidades"
      description="Presentá tu capacidad de atención, organización y trato cordial aunque sea tu primer empleo. Ideal para hoteles, clínicas, oficinas y empresas de servicios."
      intro={[
        "El puesto de recepcionista valora especialmente la presencia, la comunicación clara, la organización y la capacidad de manejar múltiples tareas simultáneas. Aunque no tengas experiencia formal, podés demostrar这些都是 habilidades a través de actividades académicas, voluntariados o experiencia informal.",
        "VitaeSpark te ayuda a crear un CV que muestre tu potencial como recepcionista desde el primer contacto.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para recepcionista sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para recepcionista inicial en hoteles, clínicas y oficinas.",
      }}
      benefits={[
        "Enfoca atención al cliente, organización y habilidades comunicacionales.",
        "Sirve para hoteles, clínicas, oficinas, consultorios y empresas de servicios.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Definí el tipo de recepción",
          description:
            "Considerá si apuntás a hoteles, clínicas, oficinas corporativas, consultorios o eventos. Cada contexto valora habilidades ligeramente distintas.",
        },
        {
          title: "Resaltá habilidades transferibles",
          description:
            "Comunicación, organización, manejo de información, trato cordial, responsabilidad y capacidad de learning rápido son relevantes para cualquier tipo de recepción.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones de recepción inicial.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de recepcionista sin experiencia",
          paragraphs: [
            "Podés incluir estudios en administración, turismo, comunicaciones o carreras afines. También cursos de atención al cliente, manejo de herramientas informáticas, idiomas y disponibilidad horaria.",
            "Si atendiste personas en algún contexto (voluntariado, trabajo informal, actividades académicas), inclúyelo highlighting tu capacidad de comunicación y organización.",
          ],
        },
        {
          title: "Ejemplo de perfil para recepcionista inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil orientado a la atención al cliente con habilidades comunicacionales, organización y trato cordial. Capacidad para gestionar múltiples tareas, manejar información con confidencialidad y proyectar una imagen profesional.'",
            "Ajustalo al contexto: hotel requiere orientación a huéspedes, clínica requiere discreción y orden, oficina corporativa requiere manejo de agenda y visitas.",
          ],
        },
        {
          title: "Habilidades clave para recepcionistas sin experiencia",
          paragraphs: [
            "Comunicación verbal y escrita, Organización y gestión del tiempo, Manejo de información confidencial, Trato cordial y profesional, Microsoft Office básico, Capacidad de aprendizaje rápido, Disponibilidad horaria.",
            "Idiomas son siempre un plus, especialmente inglés. Si tenés algún nivel, incluyanlo aunque sea básico.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo trabajar de recepcionista sin experiencia?",
          answer:
            "Sí. Muchos hoteles, clínicas y oficinas contratan perfiles iniciales que muestren buena presencia, comunicación clara y disposición para aprender.",
        },
        {
          question: "Qué importa más en un CV de recepcionista inicial?",
          answer:
            "La presentación personal, la comunicación, la organización y la disponibilidad. Si no tenés experiencia, tu perfil y tus estudios pueden compensar.",
        },
        {
          question: "Necesito saber idiomas para ser recepcionista?",
          answer:
            "Depende del lugar. Hotels y oficinas国际化 usually requieren inglés. Para contextos locales, español bien escrito y buena dicción son suficientes.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description:
            "Perfil similar enfocado en atención y manejo de consultas.",
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