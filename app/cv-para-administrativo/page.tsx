import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Currículum Administrativo: Ejemplo Completo y Perfil",
  description:
    "Modelo de currículum para auxiliar administrativo con ejemplo completo, perfil profesional, experiencia y habilidades de Excel, documentación y facturación.",
  path: "/cv-para-administrativo",
  keywords: [
    "cv para administrativo",
    "curriculum administrativo",
    "ejemplo cv administrativo",
    "habilidades administrativo curriculum",
    "perfil administrativo cv",
    "cv administrativa",
    "curriculum auxiliar administrativo",
    "perfil profesional administrativo ejemplo",
  ],
});

export default function CvParaAdministrativoPage() {
  return (
    <MarketingPage
      path="/cv-para-administrativo"
      eyebrow="CV por profesion"
      title="Currículum administrativo: ejemplo completo y perfil profesional"
      description="Adapta un modelo para auxiliar administrativo con experiencia de oficina, gestión documental y ejemplos concretos de habilidades en Excel."
      intro={[
        "Un buen CV administrativo permite entender rápido qué procesos manejaste: carga de datos, documentación, facturación, agenda, reportes o soporte a otras áreas. Las tareas concretas aportan más que una lista de cualidades generales.",
        "Esta guía reúne ejemplos de perfil, experiencia y habilidades para puestos administrativos y auxiliares en oficinas, comercios, consultorios, logística y estudios profesionales.",
      ]}
      conversionCta={{
        title: "Convierte tus tareas administrativas en experiencia clara",
        description:
          "Escribe qué procesos, documentos y herramientas manejaste. VitaeSpark los organiza en un CV profesional listo para revisar.",
        label: "Crear mi CV administrativo",
      }}
      exampleImage={{
        src: "/cv-examples/cv-administrativo.png",
        alt: "Ejemplo completo de CV para auxiliar administrativa",
        caption:
          "CV ilustrativo administrativo con Excel, documentación, proveedores y reportes.",
      }}
      benefits={[
        "Destaca organizacion, carga de datos, documentacion y soporte de oficina.",
        "Sirve para administracion, recepcion, facturacion y asistencia operativa.",
        "Ayuda a explicar tareas administrativas sin que el CV suene generico.",
      ]}
      steps={[
        {
          title: "Define el entorno administrativo",
          description:
            "Aclara si fue oficina, comercio, salud, estudio contable, logistica o empresa de servicios.",
        },
        {
          title: "Describe procesos y herramientas",
          description:
            "Incluye sistemas, planillas, facturacion, reportes, agenda y documentacion.",
        },
        {
          title: "Genera tu version final",
          description:
            "Obtienes un CV administrativo mas ordenado y listo para postularte.",
        },
      ]}
      sections={[
        {
          title: "Ejemplo completo de currículum de auxiliar administrativo",
          paragraphs: [
            "Modelo ficticio de una auxiliar administrativa con experiencia de oficina. Sustituye los campos entre corchetes y adapta cada responsabilidad a tu recorrido.",
            "[Nombre y apellido] · Auxiliar administrativa · [Ciudad] · [Teléfono] · [Correo electrónico].",
            "Perfil profesional: Auxiliar administrativa con experiencia en registro de comprobantes, archivo digital y seguimiento de documentación de proveedores. Manejo de Excel para actualizar planillas, filtrar información y controlar vencimientos.",
            "Experiencia: Auxiliar administrativa · [Empresa y sector] · [Mes/año de inicio–mes/año de fin]. Registré facturas y comprobantes; actualicé datos de proveedores; organicé documentación por período y preparé el listado de pendientes para revisión del responsable.",
            "Coordinación: respondí consultas por correo, solicité documentación faltante y mantuve actualizada la planilla de seguimiento para las áreas de compras y administración.",
            "Formación: [Título o estudios en curso] · [Institución] · [Año o avance]. Cursos: [Curso, entidad y fecha], si corresponde.",
            "Herramientas: Excel — filtros, fórmulas básicas y control de vencimientos; [sistema de gestión utilizado] — [operaciones que realizabas]. Incluye solo funciones que puedas demostrar.",
            "Información adicional: [Disponibilidad horaria] · [Idiomas y nivel, cuando sean relevantes]. Para un puesto de mayor responsabilidad, añade los procesos que gestionabas de forma autónoma.",
          ],
        },
        {
          title: "Qué debe mostrar un CV administrativo",
          paragraphs: [
            "Prioriza las tareas relacionadas con el puesto: carga y actualización de datos, archivo, facturación, atención telefónica, agenda, control de documentación, reportes y coordinación interna.",
            "Menciona herramientas solo cuando las hayas usado. Excel, Google Sheets, correo corporativo, CRM y sistemas de gestión ayudan a dimensionar tu autonomía y el tipo de procesos que conoces.",
          ],
        },
        {
          title: "Ejemplo de perfil profesional administrativo",
          paragraphs: [
            "Administración general: 'Administrativo con experiencia en gestión documental, registro de comprobantes y seguimiento de proveedores. Manejo de Excel y correo corporativo para organizar pendientes y coordinar entregas de documentación'.",
            "Facturación y cobranzas: 'Administrativa con experiencia en emisión de comprobantes, actualización de cuentas y seguimiento de vencimientos. Coordinación con ventas y registro de consultas para su resolución por el área responsable'.",
            "Para adaptar el perfil, combina el puesto, dos procesos que conozcas y una herramienta que utilices. Evita atribuirte tareas contables o decisiones sobre pagos si tu función era cargar información o asistir a otro responsable.",
          ],
        },
        {
          title: "Ejemplos de experiencia administrativa",
          paragraphs: [
            "Oficina: 'Actualicé bases de datos, organicé documentación, atendí consultas telefónicas y preparé reportes semanales para las áreas comercial y contable'.",
            "Comercio: 'Colaboré con la emisión y el control de comprobantes, el registro de pagos, el contacto con proveedores y la actualización de planillas de seguimiento'.",
          ],
        },
        {
          title: "Cómo adaptar el CV administrativo al sector",
          paragraphs: [
            "En salud puedes destacar gestión de turnos, documentación de pacientes y contacto con obras sociales. En comercio conviene priorizar facturación, proveedores, pagos y soporte a ventas.",
            "Para logística suma remitos, control de stock, seguimiento de entregas y coordinación con transportistas. En un estudio contable, menciona comprobantes, conciliaciones, archivo y preparación de documentación.",
          ],
        },
        {
          title: "CV para auxiliar administrativo",
          paragraphs: [
            "Para un puesto auxiliar conviene mostrar qué tareas podías resolver sin supervisión constante y en cuáles brindabas apoyo. Puedes incluir archivo, carga de datos, agenda, facturación, compras, recepción o seguimiento de solicitudes.",
            "Si colaboraste con recursos humanos, logística, ventas o contabilidad, acláralo. Ese contexto diferencia tu experiencia y evita que el cargo quede demasiado amplio.",
          ],
        },
        {
          title: "Habilidades para un CV administrativo",
          paragraphs: [
            "Escribe la herramienta junto con su aplicación: 'Excel: filtros y fórmulas para controlar vencimientos'; 'Google Sheets: actualización compartida de pedidos'; '[Sistema de gestión]: carga de comprobantes y consulta de proveedores'.",
            "En vez de indicar 'Excel avanzado' sin explicación, nombra las funciones que manejas. Tablas dinámicas, búsquedas o automatizaciones solo deben aparecer si puedes usarlas y explicar un caso concreto.",
            "Vincula las habilidades de organización y comunicación con una tarea: archivo de documentación por período, seguimiento de solicitudes o redacción de correos para pedir datos faltantes. Selecciona las más relevantes para la vacante.",
          ],
        },
        {
          title: "Cómo mostrar resultados sin inventar cifras",
          paragraphs: [
            "Una responsabilidad puede ser concreta aunque no tenga un porcentaje: 'Organicé el archivo digital por proveedor y período para facilitar la consulta de comprobantes'. Describe qué cambiaste y para qué se utilizaba.",
            "Si conservas datos verificables, añade el volumen y el período: '[Cantidad real] de comprobantes registrados por mes'. No incluyas importes, clientes ni documentos confidenciales como prueba dentro del currículum.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Que habilidades poner en un CV administrativo?",
          answer:
            "Suelen sumar organizacion, Excel, carga de datos, documentacion, atencion telefonica, reportes, agenda y manejo de sistemas administrativos.",
        },
        {
          question: "Sirve para auxiliar administrativo?",
          answer:
            "Si. Puedes adaptar el contenido a puestos de auxiliar, asistente, recepcion o soporte administrativo.",
        },
        {
          question: "Que poner en experiencia administrativa?",
          answer:
            "Carga de datos, archivo, facturacion, atencion telefonica, agenda, reportes, seguimiento de solicitudes, correo, planillas, documentacion y soporte a otras areas.",
        },
        {
          question: "Puedo usarlo si no tengo experiencia?",
          answer:
            "Si. Conviene reforzar estudios, cursos, herramientas digitales y habilidades transferibles.",
        },
        {
          question: "Como escribir un perfil profesional administrativo?",
          answer:
            "Menciona el area, las tareas principales y las herramientas usadas: documentacion, carga de datos, Excel, agenda, facturacion, reportes, correo o sistemas internos.",
        },
        {
          question: "Que debe incluir un CV de auxiliar administrativo?",
          answer:
            "Debe incluir perfil profesional, tareas de oficina, carga de datos, documentacion, Excel, reportes, atencion interna, sistemas usados y experiencia o formacion relacionada.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum desde una oferta",
          description: "Sigue un ejemplo de postulación administrativa para seleccionar tus antecedentes.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Qué poner en un currículum",
          description: "Revisa las secciones esenciales antes de completar tu versión administrativa.",
        },
        {
          href: "/blog/habilidades-para-curriculum",
          title: "Habilidades para el currículum",
          description: "Elige habilidades relacionadas con tareas y herramientas reales.",
        },
        {
          href: "/cv-para-recepcionista",
          title: "CV para recepcionista",
          description: "Conecta tareas administrativas con atencion al publico y agenda.",
        },
        {
          href: "/cv-para-administrativo-sin-experiencia",
          title: "CV administrativo sin experiencia",
          description: "Util si estas buscando tu primer puesto administrativo o auxiliar.",
        },
        {
          href: "/cv-call-center",
          title: "CV call center",
          description: "Cercano si tu experiencia administrativa incluye atencion telefonica y CRM.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "CV sin experiencia",
          description: "Util si buscas tu primer puesto administrativo.",
        },
        {
          href: "/",
          title: "Crear CV online",
          description: "Crea una version profesional lista para descargar.",
        },
      ]}
    />
  );
}
