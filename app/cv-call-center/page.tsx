import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Call Center: Perfil Profesional y Habilidades",
  description:
    "Crea un CV para call center con perfil profesional, habilidades, ejemplo para atencion telefonica, soporte, ventas y formato ATS.",
  path: "/cv-call-center",
  keywords: [
    "cv para call center",
    "curriculum call center",
    "ejemplo cv call center",
    "perfil profesional call center",
    "perfil call center curriculum",
    "habilidades call center curriculum",
    "cv atencion telefonica",
  ],
});

export default function CvCallCenterPage() {
  return (
    <MarketingPage
      path="/cv-call-center"
      eyebrow="CV por profesion"
      title="CV para call center: perfil profesional, habilidades y ejemplo"
      description="Prepara un curriculum para call center orientado a atencion telefonica, soporte, ventas, cobranzas, chat y procesos ATS."
      intro={[
        "Un CV para call center necesita mostrar mucho mas que buena diccion. Las empresas suelen buscar capacidad para atender volumen, seguir guiones, resolver consultas, registrar informacion y sostener una conversacion clara aun bajo presion.",
        "VitaeSpark te ayuda a ordenar esa experiencia y traducirla a un formato mas profesional, con foco en soporte telefonico, ventas, cobranzas o atencion multicanal.",
      ]}
      benefits={[
        "Enfoca tu experiencia en atencion telefonica, chat o soporte remoto.",
        "Ayuda a destacar logros, tiempos de respuesta y manejo de objeciones.",
        "Usa estructura clara y keywords utiles para procesos ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de campana o servicio",
          description:
            "Aclara si trabajaste en soporte, ventas, cobranzas, retencion o atencion general.",
        },
        {
          title: "Explica volumen y resultados",
          description:
            "Muestra cantidad de llamadas, cumplimiento de metricas o resolucion de casos.",
        },
        {
          title: "Descarga una version lista para postularte",
          description:
            "Obtienes un CV mas claro para empresas de atencion, soporte o contact center.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un CV para call center",
          paragraphs: [
            "Conviene destacar experiencia en llamadas entrantes o salientes, atencion por chat, seguimiento de casos, carga de datos, uso de CRM y cumplimiento de objetivos operativos o comerciales.",
            "Tambien ayuda aclarar si trabajaste con ventas, soporte tecnico, cobranzas, encuestas o fidelizacion, porque cada contexto cambia bastante el perfil.",
          ],
        },
        {
          title: "Perfil profesional para call center",
          paragraphs: [
            "Una base posible es: 'Perfil orientado a atencion telefonica y seguimiento de consultas, con experiencia en gestion de llamadas, registro en CRM y resolucion de casos en entornos de alto volumen'.",
            "Si tu experiencia fue mas comercial, suma terminos como ventas, objeciones, cierre o recuperacion de clientes. Si fue mas operativa, prioriza soporte, tiempos de respuesta y calidad de atencion.",
          ],
        },
        {
          title: "Perfil profesional call center sin experiencia",
          paragraphs: [
            "Si todavia no trabajaste en call center, puedes enfocar el perfil en comunicacion clara, escucha activa, aprendizaje rapido, manejo basico de computadora y disponibilidad para trabajar con objetivos.",
            "Tambien suma cualquier experiencia en atencion al publico, ventas, recepcion, chat, redes sociales o tareas donde hayas respondido consultas y registrado informacion.",
          ],
        },
        {
          title: "Habilidades clave y formato ATS",
          paragraphs: [
            "Entre las habilidades mas buscadas suelen estar comunicacion oral, escucha activa, digitacion, manejo de CRM, resolucion de conflictos, trabajo por objetivos y tolerancia a entornos dinamicos.",
            "En el formato, conviene evitar florituras y usar una estructura directa: titulo, perfil, experiencia, habilidades y estudios. Eso ayuda tanto a filtros ATS como a reclutadores.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Que poner en perfil profesional call center?",
          answer:
            "Conviene mencionar atencion telefonica, comunicacion clara, registro de datos, CRM, resolucion de consultas, objetivos y el tipo de servicio: soporte, ventas, cobranzas o chat.",
        },
        {
          question: "Sirve para ventas telefonicas?",
          answer:
            "Si. Puedes adaptar la misma base para ventas, cobranzas, soporte o atencion general cambiando el lenguaje del perfil y la experiencia.",
        },
        {
          question: "Debo incluir metricas?",
          answer:
            "Si puedes, si. Cantidad de llamadas, cumplimiento de objetivos o tiempos de resolucion suelen sumar mucho.",
        },
        {
          question: "Este formato tambien sirve para soporte por chat?",
          answer:
            "Si. Solo conviene dejar claro el canal y las tareas especificas para que el CV no se vea ambiguo.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV atencion al cliente sin experiencia",
          description: "Cercano si buscas entrar a soporte, chat o atencion inicial.",
        },
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description: "Conecta tu experiencia telefonica con objetivos comerciales y ventas.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atencion al cliente",
          description: "Una guia mas general para roles de soporte, recepcion y servicio.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description: "Refuerza palabras clave y estructura para pasar mejor filtros.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Lleva estas ideas a una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
