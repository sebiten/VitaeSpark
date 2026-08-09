import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum de Atención al Cliente: Perfil y Ejemplos",
  description:
    "Presenta tu experiencia en atención al cliente con ejemplos de perfil, reclamos, CRM, soporte, retail y habilidades en un formato claro para ATS.",
  path: "/cv-para-atencion-al-cliente",
  keywords: [
    "cv para atencion al cliente",
    "curriculum atencion al cliente",
    "cv atencion al cliente",
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
      title="Currículum de atención al cliente: perfil y ejemplos"
      description="Presenta tu experiencia con clientes, reclamos, CRM, soporte, comercio y canales de contacto en un CV claro y fácil de leer."
      intro={[
        "Un currículum de atención al cliente tiene que explicar rápido qué canales atendías, qué consultas resolvías y cómo trabajabas con reclamos, CRM, pedidos o seguimiento de casos. Decir solamente 'buena atención' no demuestra el alcance de tu experiencia.",
        "Esta guía está pensada para personas que ya atendieron clientes en soporte, retail, mostrador, chat o teléfono. Si buscas tu primer puesto, tienes una guía específica de atención al cliente sin experiencia entre los enlaces relacionados.",
      ]}
      conversionCta={{
        title: "Convierte tu experiencia con clientes en un CV concreto",
        description:
          "Describe tus canales, tareas y herramientas con tus palabras. VitaeSpark los ordena en un perfil y una experiencia listos para revisar.",
        label: "Crear mi CV de atención al cliente",
      }}
      exampleImage={{
        src: "/cv-examples/cv-atencion.png",
        alt: "Ejemplo completo de CV para atención al cliente",
        caption:
          "CV ilustrativo de atención con consultas, reclamos, seguimiento y CRM.",
      }}
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
          title: "Qué destacar en un currículum de atención al cliente",
          paragraphs: [
            "Prioriza la resolución de consultas, el manejo de reclamos, el uso de CRM o sistemas internos, el seguimiento de casos y la coordinación con otras áreas. Presenta primero las tareas más cercanas al puesto que buscas.",
            "Aclara el contexto: atención presencial, teléfono, correo, chat, redes o soporte posventa. Si conoces el volumen aproximado de consultas o los tiempos de respuesta, puedes sumarlos sin inventar cifras.",
          ],
        },
        {
          title: "Perfil profesional de atención al cliente",
          paragraphs: [
            "Para soporte: 'Perfil de atención al cliente con experiencia en gestión de consultas, seguimiento de casos y resolución de reclamos por canales telefónicos y digitales'.",
            "Para comercio: 'Perfil de atención al cliente con experiencia en asesoramiento presencial, cambios, reclamos, cobros simples y apoyo a tareas operativas de tienda'.",
          ],
        },
        {
          title: "Ejemplos de experiencia para soporte, retail y call center",
          paragraphs: [
            "Soporte o call center: 'Atendí consultas telefónicas y digitales, registré casos en CRM, derivé reclamos al área correspondiente y realicé seguimiento hasta completar la respuesta'.",
            "Retail o mostrador: 'Asesoré clientes, resolví consultas sobre productos, gestioné cambios y reclamos simples, y colaboré con caja, stock y orden del sector'.",
          ],
        },
        {
          title: "Cómo evitar un CV demasiado genérico",
          paragraphs: [
            "Frases como 'buen trato' o 'excelente comunicación' dicen poco si no están acompañadas por tareas, herramientas o situaciones concretas.",
            "Incluye el tipo de cliente, canal, consulta y sistema utilizado. Ese contexto permite que un reclutador entienda dónde trabajaste y evita que el documento parezca una plantilla general.",
          ],
        },
        {
          title: "Habilidades y resultados que sí aportan",
          paragraphs: [
            "Prioriza habilidades que puedas demostrar: manejo de reclamos, CRM, seguimiento de pedidos, soporte por chat, caja, facturación o coordinación con otras áreas.",
            "Si dispones de datos reales, agrega volumen de consultas, cumplimiento de objetivos o mejoras en tiempos de respuesta. Si no los recuerdas, describe alcance y responsabilidad sin estimarlos.",
          ],
        },
        {
          title: "Formato ATS para atención al cliente",
          paragraphs: [
            "Conviene un formato simple: título claro, perfil breve, experiencia en orden cronológico inverso, habilidades específicas y educación. Evita tablas innecesarias o bloques de texto largos.",
            "La estructura no garantiza una entrevista, pero facilita que el sistema y el reclutador encuentren canales, herramientas y responsabilidades relevantes.",
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
        {
          question: "Que poner en experiencia laboral de atencion al cliente?",
          answer:
            "Canales atendidos, tipo de consultas, reclamos, CRM o sistema usado, seguimiento de casos, ventas, caja, soporte o coordinacion con otras areas.",
        },
        {
          question: "Como escribir un perfil profesional de atencion al cliente?",
          answer:
            "Menciona el canal de atencion, tipo de consultas, reclamos, CRM, seguimiento de casos, comunicacion clara y si tu experiencia fue en soporte, comercio, call center o mostrador.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-atencion-al-cliente-sin-experiencia",
          title: "CV atencion al cliente sin experiencia",
          description: "Pagina especifica para primer empleo o perfiles iniciales.",
        },
        {
          href: "/cv-call-center",
          title: "CV call center",
          description: "Util si tu experiencia esta mas orientada a llamadas, CRM o soporte remoto.",
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
          href: "/",
          title: "Crear CV online",
          description: "Ordena tu experiencia en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
