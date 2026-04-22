import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Generador de CV con IA",
  description:
    "Usa un generador de CV con IA para ordenar tu experiencia, mejorar la redaccion y descargar un curriculum profesional en PDF.",
  path: "/generador-de-cv-con-ia",
  keywords: [
    "generador de cv con ia",
    "generador de curriculum con ia",
    "crear cv con ia",
    "ia para cv",
    "generador de cv ia",
  ],
});

export default function GeneradorDeCvConIaPage() {
  return (
    <MarketingPage
      path="/generador-de-cv-con-ia"
      eyebrow="Generador de CV con IA"
      title="Generador de CV con IA para crear un curriculum mejor en menos tiempo"
      description="Usa inteligencia artificial para ordenar tu experiencia, mejorar tus textos y crear un CV profesional listo para postularte."
      intro={[
        "Si ya sabes que quieres usar un generador de CV con IA, lo que buscas no es solo un editor bonito. Necesitas una herramienta que te ayude a bajar tu experiencia a un formato claro, profesional y util para procesos de seleccion reales.",
        "VitaeSpark esta pensado justo para eso: combinar una estructura guiada, plantillas profesionales y mejora de redaccion para que el resultado final no se sienta generico ni improvisado.",
      ]}
      benefits={[
        "Convierte datos sueltos en un curriculum mas claro y profesional.",
        "Ahorra tiempo al redactar perfil, experiencia y habilidades.",
        "Terminas con un CV pensado para reclutadores, ATS y descarga en PDF.",
      ]}
      steps={[
        {
          title: "Carga tu informacion",
          description:
            "Empiezas con experiencia, estudios, habilidades y el puesto al que apuntas.",
        },
        {
          title: "Mejora el contenido con IA",
          description:
            "La herramienta optimiza redaccion, orden y claridad sin perder tu experiencia real.",
        },
        {
          title: "Descarga tu CV",
          description: "Te llevas una version profesional lista para enviar.",
        },
      ]}
      sections={[
        {
          title: "Que debe hacer bien un generador de CV con IA",
          paragraphs: [
            "Lo importante no es solo que escriba por ti, sino que te ayude a presentar mejor tu perfil. Eso implica estructura clara, enfoque en el puesto objetivo y textos que expliquen tu experiencia con mas fuerza.",
            "Una buena herramienta de IA para CV no inventa, no rellena sin sentido y no te deja con un resultado plano. Te ayuda a convertir informacion real en una propuesta mas competitiva.",
          ],
        },
        {
          title: "Cuando mas se nota la diferencia",
          paragraphs: [
            "La mejora suele sentirse mucho cuando tienes experiencia pero no sabes como contarla, cuando tu CV esta viejo o cuando quieres adaptarlo a una nueva busqueda laboral.",
            "Tambien es muy util para perfiles junior o personas que parten desde cero y necesitan una guia para ordenar bien el documento.",
          ],
        },
      ]}
      faqs={[
        {
          question: "La IA reemplaza mi criterio al hacer el CV?",
          answer:
            "No. Te ayuda a redactar mejor y ordenar el contenido, pero siempre puedes revisar y ajustar el resultado final.",
        },
        {
          question: "Sirve si ya tengo un CV viejo?",
          answer:
            "Si. Puede ayudarte a reescribirlo, actualizarlo y volverlo mas claro para nuevas postulaciones.",
        },
        {
          question: "El resultado final queda en PDF?",
          answer:
            "Si. El objetivo es terminar con un CV profesional listo para descargar y usar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description:
            "Un caso practico para usar IA y adaptar tu CV a un rol con alta demanda.",
        },
        {
          href: "/hacer-cv-con-ia",
          title: "Hacer CV con IA",
          description: "Otra landing enfocada en el uso practico de IA para tu curriculum.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Combina plantilla, contenido y exportacion en un solo flujo.",
        },
        {
          href: "/blog/como-mejorar-mi-curriculum",
          title: "Como mejorar mi curriculum",
          description: "Refuerza la parte estrategica antes de regenerar tu CV.",
        },
      ]}
    />
  );
}
