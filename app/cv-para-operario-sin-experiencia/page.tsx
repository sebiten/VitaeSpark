import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Operario sin Experiencia: Ejemplo y Habilidades",
  description:
    "Crea un CV para operario sin experiencia con ejemplo de perfil, habilidades operativas, disposición física y formato profesional listo para descargar.",
  path: "/cv-para-operario-sin-experiencia",
  keywords: [
    "cv para operario sin experiencia",
    "curriculum operario sin experiencia",
    "cv operario sin experiencia",
    "perfil operario sin experiencia",
    "ejemplo cv operario sin experiencia",
  ],
});

export default function CvParaOperarioSinExperienciaPage() {
  return (
    <MarketingPage
      path="/cv-para-operario-sin-experiencia"
      eyebrow="CV sin experiencia"
      title="CV para operario sin experiencia: ejemplo y habilidades"
      description="Presentá tu disposición para el trabajo operativo, capacidad de aprendizaje y responsabilidad aunque sea tu primera experiencia en planta o producción."
      intro={[
        "El trabajo operario valora especialmente la responsabilidad, la puntualidad, la capacidad de seguir instrucciones y la disposición física. Aunque no tengas experiencia en producción o planta, podés demostrar这些都是 habilidades a través de cualquier actividad previa.",
        "VitaeSpark te ayuda a crear un CV operario profesional que comunique tu potencial y disposición para el trabajo.",
      ]}
      exampleImage={{
        src: "/purple-hero.webp",
        alt: "ejemplo de cv para operario sin experiencia",
        caption:
          "Ejemplo visual de CV adaptable para puesto operario en fábricas, almacenes y producción.",
      }}
      benefits={[
        "Enfoca responsabilidad, capacidad de aprendizaje y disposición operativa.",
        "Sirve para fábricas, almacenes, producción, logística y manufactura.",
        "Estructura profesional con formato optimizado para ATS.",
      ]}
      steps={[
        {
          title: "Definí el sector operativo",
          description:
            "Considerá si apuntás a producción, almacén, logística, empaque o manufacturing. Cada sector tiene requisitos distintos en cuanto a seguridad y procedimientos.",
        },
        {
          title: "Resaltá habilidades operativas transferibles",
          description:
            "Puntualidad, responsabilidad, trabajo en equipo, capacidad de seguimiento de instrucciones, disposición física y aprendizaje rápido son relevantes para cualquier puesto operario.",
        },
        {
          title: "Generá tu CV profesional",
          description:
            "Obtenés un currículum listo para aplicar a posiciones operativas iniciales.",
        },
      ]}
      sections={[
        {
          title: "Qué poner en un CV de operario sin experiencia",
          paragraphs: [
            "Podés incluir estudios técnicos, cursos de seguridad e higiene, licencias de conducir si tenés, y cualquier actividad que muestre responsabilidad y trabajo en equipo.",
            "Si participaste en actividades agrícolas, construction de apoyo, mantenimiento del hogar, o cualquier tarea física, podés presentarlas como experiencia relevante mostrando habilidades transferibles.",
          ],
        },
        {
          title: "Ejemplo de perfil para operario inicial",
          paragraphs: [
            "Una base útil puede ser: 'Perfil orientado al trabajo operativo con disposición para aprender procesos de producción, responsabilidad, puntualidad y capacidad para trabajar en equipo. Habilidad para seguir instrucciones y mantener estándares de seguridad.'",
            "Ajustalo al sector: producción requiere atención a procedimientos, almacén requiere organización, logística requiere manejo de documentación.",
          ],
        },
        {
          title: "Habilidades clave para operarios sin experiencia",
          paragraphs: [
            "Puntualidad y responsabilidad, Capacidad de aprendizaje rápido, Trabajo en equipo, Disposición física,following de instrucciones, Conocimiento básico de seguridad e higiene, Disponibilidad para turnos rotativos.",
            "Licencia de conducir, cursos de mantenimiento, manejo de herramientas básicas y conocimiento de normas de seguridad son siempre un plus.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Puedo trabajar como operario sin experiencia?",
          answer:
            "Sí. Muchas fábricas, almacenes y empresas de producción contratan perfiles iniciales que muestren responsabilidad, disposición física y capacidad de aprendizaje.",
        },
        {
          question: "Qué es más importante en un CV de operario: experiencia o actitud?",
          answer:
            "La actitud. La responsabilidad, la puntualidad y la disposición para aprender pesan más que la experiencia formal en puestos operarios.",
        },
        {
          question: "Necesito estudios técnicos para ser operario?",
          answer:
            "No siempre. Many posiciones accept profiles with basic education, cursos de seguridad, y disposición para aprender. Estudios técnicos son un plus especialmente en posiciones más especializadas.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description:
            "Versión general con más detalle si ya tenés algo de experiencia.",
        },
        {
          href: "/cv-para-limpieza",
          title: "CV para limpieza",
          description:
            "Perfil similar enfocado en tareas de limpieza industrial.",
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