import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
title: "CV para Atención al Cliente: Ejemplo y Habilidades",
  description:
    "Crea un currículum de atención al cliente con ejemplo de perfil, habilidades, experiencia, reclamos, CRM y formato ATS.",
  path: "/cv-para-atencion-al-cliente",
  keywords: [
    "cv para atencion al cliente",
    "curriculum atencion al cliente",
    "cv atencion al cliente",
    "curriculum atencion al cliente sin experiencia",
    "curriculum para atencion al cliente",
    "ejemplo cv atencion al cliente",
    "habilidades atencion al cliente curriculum",
  ],
});

export default function CvParaAtencionAlClientePage() {
  return (
    <MarketingPage
      path="/cv-para-atencion-al-cliente"
      eyebrow="CV por profesion"
      title="CV para atencion al cliente: ejemplo, habilidades y perfil"
      description="Prepara un curriculum para atencion al cliente con perfil profesional, reclamos, CRM, canales de contacto y estructura clara para ATS."
      intro={[
        "En atencion al cliente, el CV tiene que mostrar mucho mas que amabilidad. Debe dejar claro como respondes consultas, resuelves reclamos, organizas volumen de trabajo y sostienes una experiencia positiva para el usuario en canales como telefono, chat, mostrador o mail.",
        "VitaeSpark te ayuda a convertir experiencia operativa y contacto real con clientes en un curriculum mas claro, con palabras clave utiles, logros mejor explicados y una estructura compatible con procesos de seleccion actuales.",
      ]}
      benefits={[
        "Mejor forma de explicar experiencia con clientes, reclamos y canales de atencion.",
        "Util para customer service, soporte, recepcion, call center y caja.",
        "Ayuda a destacar habilidades practicas, resultados y lenguaje ATS real.",
      ]}
      steps={[
        {
          title: "Define el tipo de rol",
          description:
            "Aclara si apuntas a soporte, customer service, ventas, call center o recepcion.",
        },
        {
          title: "Describe experiencia y logros",
          description:
            "Explica volumen de consultas, canales usados, problemas resueltos y resultados concretos.",
        },
        {
          title: "Exporta tu CV final",
          description:
            "Obtienes una version clara, profesional y lista para procesos de seleccion operativos o comerciales.",
        },
      ]}
      sections={[
        {
          title: "Que destacar en un CV de atencion al cliente",
          paragraphs: [
            "Suele sumar experiencia con clientes, resolucion de consultas, manejo de reclamos, uso de CRM o sistemas internos, seguimiento de casos y coordinacion con otras areas. Tambien ayudan habilidades como comunicacion clara, orden, escucha activa y empatia.",
            "Lo ideal es que esas cualidades no aparezcan solas, sino respaldadas por contexto laboral, tipo de canal, volumen gestionado y responsabilidades concretas.",
          ],
        },
        {
          title: "Curriculum atencion al cliente sin experiencia",
          paragraphs: [
            "Si buscas un puesto inicial, puedes destacar estudios, cursos, atencion informal, ventas por redes, voluntariado, manejo de herramientas digitales y disponibilidad para aprender procesos.",
            "En ese caso conviene usar un perfil breve que muestre comunicacion, responsabilidad y trato con personas, sin exagerar experiencia laboral que todavia no tienes.",
          ],
        },
        {
          title: "Como evitar un perfil demasiado generico",
          paragraphs: [
            "Muchas veces estos CVs repiten frases como 'buen trato con el cliente' o 'excelente comunicacion' sin explicar nada mas. Mejora mucho cuando cuentas en que contexto trabajabas, que tipo de consultas atendias, que herramientas usabas o que volumen manejabas por dia.",
            "Ese nivel de detalle hace que el perfil se vea mas profesional, mas creible y mejor alineado a lo que buscan tanto un ATS como un reclutador.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional para atencion al cliente",
          paragraphs: [
            "Puedes usar una base como esta: 'Perfil orientado a atencion al cliente con experiencia en gestion de consultas, seguimiento de casos y resolucion de reclamos por canales telefonicos y digitales. Manejo de CRM, organizacion de tareas y enfoque en brindar respuestas claras y eficientes'.",
            "No se trata de copiarlo literal, sino de adaptarlo a tu realidad. Si trabajaste en retail, soporte, recepcion o caja, conviene que el perfil nombre ese contexto para ganar relevancia.",
          ],
        },
        {
          title: "Habilidades y logros que si suman",
          paragraphs: [
            "En habilidades, prioriza las que realmente aparecen en avisos del sector: atencion al cliente, manejo de reclamos, CRM, ventas cruzadas, seguimiento de pedidos, soporte por chat, caja, facturacion o coordinacion con otras areas.",
            "En experiencia, intenta sumar logros medibles como tiempos de respuesta, cantidad de consultas diarias, nivel de satisfaccion, cumplimiento de objetivos o mejora en procesos. Aunque no tengas numeros perfectos, cualquier contexto concreto ayuda mucho.",
          ],
        },
        {
          title: "Formato ATS para este tipo de puestos",
          paragraphs: [
            "Para atencion al cliente conviene un formato simple: titulo claro, perfil breve, experiencia en orden cronologico, habilidades especificas y educacion. Evita disenos demasiado decorativos, tablas innecesarias o bloques de texto largos.",
            "Un CV ATS no garantiza entrevistas, pero si mejora la lectura del documento y ayuda a que las palabras clave correctas aparezcan en el lugar adecuado.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Como hacer un curriculum de atencion al cliente?",
          answer:
            "Usa un perfil breve, experiencia con canales de atencion, reclamos, CRM, habilidades de comunicacion y ejemplos concretos de tareas o volumen atendido.",
        },
        {
          question: "Sirve para roles de call center?",
          answer:
            "Si. La estructura tambien funciona para soporte telefonico, chat o canales digitales.",
        },
        {
          question: "Que habilidades poner en un CV de atencion al cliente?",
          answer:
            "Suelen sumar comunicacion clara, resolucion de problemas, gestion de reclamos, manejo de CRM, organizacion, empatia y seguimiento de casos, siempre que representen tu experiencia real.",
        },
        {
          question: "Debo incluir habilidades blandas?",
          answer:
            "Si, pero idealmente acompanadas por experiencia o ejemplos que les den contexto.",
        },
        {
          question: "Puedo usarlo para cambiar de rubro?",
          answer:
            "Si. Muchas habilidades de atencion al cliente son transferibles a otros roles operativos o comerciales.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV atencion al cliente sin experiencia",
          description: "Pagina especifica para primer empleo o perfiles iniciales.",
        },
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description: "Ideal si tu experiencia con clientes tambien incluye ventas u objetivos.",
        },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Enfoca tu experiencia en atencion presencial, agenda y administracion.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si estas entrando por primera vez a roles de contacto con clientes.",
        },
        {
          href: "/cv-call-center",
          title: "CV para call center",
          description: "Adapta tu experiencia a soporte telefonico, ventas o atencion por canales remotos.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para curriculum",
          description: "Elige mejor que habilidades destacar para este tipo de puesto.",
        },
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Enfoca experiencia con caja, clientes, cobros y orden operativo.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Ordena tu experiencia en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
