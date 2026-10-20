import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV Call Center: Ejemplo, Perfil Profesional y Habilidades",
  description:
    "Arma un CV call center con ejemplo listo, perfil profesional, habilidades, CRM, llamadas, chat, ventas, soporte y formato ATS.",
  path: "/cv-call-center",
  keywords: [
    "cv para call center",
    "currículum call center",
    "ejemplo cv call center",
    "perfil profesional call center",
    "perfil call center currículum",
    "habilidades call center currículum",
    "cv atención telefónica",
  ],
});

export default function CvCallCenterPage() {
  return (
    <MarketingPage
      path="/cv-call-center"
      eyebrow="CV por profesión"
      title="CV call center: ejemplo listo para atención, ventas o soporte"
      description="Ejemplo de currículum call center con perfil profesional, llamadas, chat, CRM, ventas, soporte, habilidades y estructura ATS."
      intro={[
        "Un CV call center tiene que explicar rápido el tipo de gestión: llamadas entrantes, ventas salientes, cobranzas, soporte, chat, tickets o seguimiento de casos. Si también usaste CRM o sistemas internos, conviene que aparezca desde el inicio para dar contexto a tu experiencia.",
        "VitaeSpark te ayuda a convertir esa experiencia en un currículum call center más concreto, con perfil profesional, habilidades y palabras clave útiles para contact centers, soporte y atención multicanal.",
      ]}
      exampleImage={{
        src: "/cv-examples/cv-call-center.png",
        alt: "Ejemplo completo de CV para asesora de call center",
        caption:
          "CV ilustrativo de call center con atención telefónica, CRM y seguimiento.",
      }}
      conversionCta={{
        title: "Crea tu CV call center y adaptalo al puesto",
        description:
          "Carga tu experiencia en llamadas, chat, ventas o soporte. La IA la ordena en un CV claro, compatible con ATS y listo para descargar.",
        label: "Crear mi CV call center",
      }}
      benefits={[
        "Enfoca tu experiencia en atención telefónica, chat o soporte remoto.",
        "Ayuda a destacar logros, tiempos de respuesta y manejo de objeciones.",
        "Usa estructura clara y keywords útiles para procesos ATS.",
      ]}
      steps={[
        {
          title: "Define el tipo de campana o servicio",
          description:
            "Aclara si trabajaste en soporte, ventas, cobranzas, retencion o atención general.",
        },
        {
          title: "Explica volumen y resultados",
          description:
            "Muestra cantidad de llamadas, cumplimiento de metricas o resolución de casos.",
        },
        {
          title: "Descarga una versión lista para postularte",
          description:
            "Obtienes un CV más claro para empresas de atención, soporte o contact center.",
        },
      ]}
      sections={[
        {
          title: "CV call center: que poner para que se entienda rápido",
          paragraphs: [
            "Conviene destacar experiencia en llamadas entrantes o salientes, atención por chat, seguimiento de casos, carga de datos, uso de CRM y cumplimiento de objetivos operativos o comerciales.",
            "También ayuda aclarar si trabajaste con ventas, soporte técnico, cobranzas, encuestas o fidelizacion, porque cada contexto cambia bastante el perfil.",
          ],
        },
        {
          title: "Perfil profesional call center",
          paragraphs: [
            "Una base posible es: 'Perfil orientado a atención telefónica y seguimiento de consultas, con experiencia en gestión de llamadas, registro en CRM y resolución de casos en entornos de alto volumen'.",
            "Si tu experiencia fue más comercial, suma términos como ventas, objeciones, cierre o recuperación de clientes. Si fue más operativa, prioriza soporte, tiempos de respuesta, calidad de atención y seguimiento de tickets.",
          ],
        },
        {
          title: "Ejemplo completo de CV: operador de atención telefónica",
          paragraphs: [
            "Modelo ficticio para adaptar. Reemplaza los campos entre corchetes y conserva solo actividades, formación y habilidades reales. Elimina cualquier sección que no corresponda.",
            "[Nombre y apellido] · Operador de atención telefónica · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Operador con experiencia en llamadas entrantes y seguimiento de consultas. Uso de [CRM utilizado] para registrar motivos de contacto, actualizar casos y derivar incidencias.",
            "Experiencia: Operador de atención · [Empresa o contexto profesional] · [Mes/año de inicio–mes/año de fin]. Atendí llamadas sobre [servicio], registré consultas en el CRM, derivé incidencias según el procedimiento y consulté el estado de los casos para informar al cliente.",
            "Formación: [Estudios realizados] · [Institución] · [Año de finalización o estado actual]. Cursos: [Curso relacionado, entidad y fecha; elimina este campo si no corresponde].",
            "Habilidades: [CRM] para seguimiento de casos; atención telefónica; redacción de notas; consulta de procedimientos.",
            "Disponibilidad: [Días y horarios reales]. Revisa el contacto y elimina todos los campos pendientes antes de enviar el documento."
          ]
        },
        {
          title: "Ejemplos de experiencia para call center",
          paragraphs: [
            "Para atención al cliente, puedes escribir: 'Gestioné llamadas entrantes, registré consultas en CRM y realicé seguimiento de casos, manteniendo comunicación clara y resolución ordenada de reclamos frecuentes'.",
            "Para ventas telefónicas, una versión más comercial sería: 'Contacté potenciales clientes, expliqué beneficios del servicio, respondí objeciones y cargué resultados en sistema para dar continuidad al proceso comercial'.",
          ],
        },
        {
          title: "Perfil profesional call center sin experiencia",
          paragraphs: [
            "Si todavía no trabajaste en call center, puedes enfocar el perfil en comunicación clara, escucha activa, aprendizaje rápido, manejo básico de computadora y disponibilidad para trabajar con objetivos.",
            "También suma cualquier experiencia en atención al público, ventas, recepción, chat, redes sociales o tareas donde hayas respondido consultas y registrado información.",
          ],
        },
        {
          title: "Ejemplos de perfil profesional call center",
          paragraphs: [
            "Para atención: 'Perfil orientado a call center y atención al cliente, con experiencia en gestión de consultas, registro de datos, seguimiento de casos y comunicación clara por teléfono o canales digitales'.",
            "Para ventas: 'Perfil comercial con experiencia en contacto telefónico, explicación de servicios, manejo de objeciones, carga de resultados en CRM y seguimiento de potenciales clientes'. Adapta el perfil a las tareas que efectivamente realizaste.",
          ],
        },
        {
          title: "Currículum call center para chat, ventas o soporte",
          paragraphs: [
            "Si el puesto es por chat, conviene nombrar escritura clara, seguimiento de tickets, CRM y tiempos de respuesta. Si es ventas, prioriza llamadas salientes, objeciones, objetivos y cierre.",
            "Para soporte técnico, suma diagnóstico inicial, derivacion de casos, registro de incidencias y comunicación con otras áreas. Esa precisión mejora la lectura y evita un CV demasiado general.",
          ],
        },
        {
          title: "Cómo hacer que tu CV de call center se vea más concreto",
          paragraphs: [
            "El problema más común es escribir solo 'atención al cliente' sin explicar canales, herramientas ni tipo de campana. Es mejor aclarar si atendías llamadas entrantes, ventas salientes, chat, cobranzas, soporte o reclamos.",
            "También suma mencionar CRM, tickets, carga de datos, seguimiento de casos, metricas de calidad o cumplimiento de objetivos si realmente formaban parte del trabajo.",
          ],
        },
        {
          title: "Habilidades clave y formato ATS",
          paragraphs: [
            "Entre las habilidades más buscadas suelen estar comunicación oral, escucha activa, digitación, manejo de CRM, resolución de conflictos, trabajo por objetivos y tolerancia a entornos dinamicos.",
            "En el formato, conviene evitar florituras y usar una estructura directa: título, perfil, experiencia, habilidades y estudios. Eso ayuda tanto a filtros ATS como a reclutadores.",
          ],
        },
        {
          title: "Errores comunes en un currículum call center",
          paragraphs: [
            "No alcanza con decir 'buena comunicación'. Es mejor explicar si atendiste llamadas, chat, ventas, cobranzas, reclamos, soporte técnico o seguimiento de tickets.",
            "También conviene evitar frases exageradas. Un CV de call center funciona mejor cuando muestra canales atendidos, herramientas usadas, tipo de campana y responsabilidades concretas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Qué poner en perfil profesional call center?",
          answer:
            "Conviene mencionar atención telefónica, comunicación clara, registro de datos, CRM, resolución de consultas, objetivos y el tipo de servicio: soporte, ventas, cobranzas o chat.",
        },
        {
          question: "¿Sirve para ventas telefónicas?",
          answer:
            "Sí. Puedes adaptar la misma base para ventas, cobranzas, soporte o atención general cambiando el lenguaje del perfil y la experiencia.",
        },
        {
          question: "¿Debo incluir metricas?",
          answer:
            "Si puedes, si. Cantidad de llamadas, cumplimiento de objetivos o tiempos de resolución suelen sumar mucho.",
        },
        {
          question: "¿Este formato también sirve para soporte por chat?",
          answer:
            "Sí. Solo conviene dejar claro el canal y las tareas específicas para que el CV no se vea ambiguo.",
        },
        {
          question: "¿Qué habilidades poner en un CV de call center?",
          answer:
            "Comunicación oral, escucha activa, CRM, digitación, resolución de reclamos, seguimiento de casos, ventas telefónicas, manejo de objeciones y trabajo por objetivos.",
        },
        {
          question: "¿Cómo escribir experiencia de call center?",
          answer:
            "Menciona si atendías llamadas entrantes o salientes, chat, ventas, soporte o cobranzas, y agrega tareas como registro en CRM, seguimiento y resolución de consultas.",
        },
        {
          question: "¿Cómo hacer un perfil profesional call center con buen enfoque?",
          answer:
            "Define si apuntas a atención, ventas, soporte o cobranzas, y menciona canales, CRM, seguimiento de casos, comunicación clara y objetivos si corresponde.",
        },
        {
          question: "¿Qué poner si trabaje por chat y no por teléfono?",
          answer:
            "Aclara el canal, seguimiento de tickets, escritura clara, tiempos de respuesta, CRM, resolución de consultas y coordinación con otras áreas.",
        },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "Más ejemplos completos de CV", description: "Compara modelos con y sin experiencia y adapta sus secciones a tus antecedentes." },
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV atención al cliente sin experiencia",
          description: "Cercano si buscas entrar a soporte, chat o atención inicial.",
        },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Útil si tu experiencia telefónica también incluye agenda y atención presencial.",
        },
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description: "Conecta tu experiencia telefónica con objetivos comerciales y ventas.",
        },
        {
          href: "/cv-para-atencion-al-cliente",
          title: "CV para atención al cliente",
          description: "Una guía más general para roles de soporte, recepción y servicio.",
        },
        {
          href: "/curriculum-ats",
          title: "Currículum ATS",
          description: "Refuerza palabras clave y estructura para pasar mejor filtros.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Lleva estas ideas a una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
