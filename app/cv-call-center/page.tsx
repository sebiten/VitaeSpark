import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Call Center: Perfil, Experiencia y Ejemplos Listos",
  description:
    "Crea un CV para call center con perfil profesional, experiencia, habilidades y ejemplos para atencion telefonica, ventas, chat o soporte.",
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
      title="CV call center: perfil, experiencia y ejemplos listos"
      description="Prepara un curriculum para call center con frases concretas para atencion telefonica, soporte, ventas, cobranzas, chat y CRM."
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
          title: "Ejemplos de experiencia para call center",
          paragraphs: [
            "Para atencion al cliente, puedes escribir: 'Gestione llamadas entrantes, registre consultas en CRM y realice seguimiento de casos, manteniendo comunicacion clara y resolucion ordenada de reclamos frecuentes'.",
            "Para ventas telefonicas, una version mas comercial seria: 'Contacte potenciales clientes, explique beneficios del servicio, respondi objeciones y cargue resultados en sistema para dar continuidad al proceso comercial'.",
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
          title: "Ejemplos de perfil profesional call center",
          paragraphs: [
            "Para atencion: 'Perfil orientado a call center y atencion al cliente, con experiencia en gestion de consultas, registro de datos, seguimiento de casos y comunicacion clara por telefono o canales digitales'.",
            "Para ventas: 'Perfil comercial con experiencia en contacto telefonico, explicacion de servicios, manejo de objeciones, carga de resultados en CRM y seguimiento de potenciales clientes'.",
          ],
        },
        {
          title: "Curriculum call center para chat, ventas o soporte",
          paragraphs: [
            "Si el puesto es por chat, conviene nombrar escritura clara, seguimiento de tickets, CRM y tiempos de respuesta. Si es ventas, prioriza llamadas salientes, objeciones, objetivos y cierre.",
            "Para soporte tecnico, suma diagnostico inicial, derivacion de casos, registro de incidencias y comunicacion con otras areas. Esa precision mejora la lectura y evita un CV demasiado general.",
          ],
        },
        {
          title: "Como hacer que tu CV de call center se vea mas concreto",
          paragraphs: [
            "El problema mas comun es escribir solo 'atencion al cliente' sin explicar canales, herramientas ni tipo de campana. Es mejor aclarar si atendias llamadas entrantes, ventas salientes, chat, cobranzas, soporte o reclamos.",
            "Tambien suma mencionar CRM, tickets, carga de datos, seguimiento de casos, metricas de calidad o cumplimiento de objetivos si realmente formaban parte del trabajo.",
          ],
        },
        {
          title: "Habilidades clave y formato ATS",
          paragraphs: [
            "Entre las habilidades mas buscadas suelen estar comunicacion oral, escucha activa, digitacion, manejo de CRM, resolucion de conflictos, trabajo por objetivos y tolerancia a entornos dinamicos.",
            "En el formato, conviene evitar florituras y usar una estructura directa: titulo, perfil, experiencia, habilidades y estudios. Eso ayuda tanto a filtros ATS como a reclutadores.",
          ],
        },
        {
          title: "Errores comunes en un curriculum call center",
          paragraphs: [
            "No alcanza con decir 'buena comunicacion'. Es mejor explicar si atendiste llamadas, chat, ventas, cobranzas, reclamos, soporte tecnico o seguimiento de tickets.",
            "Tambien conviene evitar frases exageradas. Un CV de call center funciona mejor cuando muestra canales atendidos, herramientas usadas, tipo de campana y responsabilidades concretas.",
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
        {
          question: "Que habilidades poner en un CV de call center?",
          answer:
            "Comunicacion oral, escucha activa, CRM, digitacion, resolucion de reclamos, seguimiento de casos, ventas telefonicas, manejo de objeciones y trabajo por objetivos.",
        },
        {
          question: "Como escribir experiencia de call center?",
          answer:
            "Menciona si atendias llamadas entrantes o salientes, chat, ventas, soporte o cobranzas, y agrega tareas como registro en CRM, seguimiento y resolucion de consultas.",
        },
        {
          question: "Que poner si trabaje por chat y no por telefono?",
          answer:
            "Aclara el canal, seguimiento de tickets, escritura clara, tiempos de respuesta, CRM, resolucion de consultas y coordinacion con otras areas.",
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
