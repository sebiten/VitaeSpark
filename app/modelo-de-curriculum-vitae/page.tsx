import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Modelo de Currículum Vitae para Copiar y Completar",
  description:
    "Copia un modelo de currículum vitae en texto, completa cada sección con tus datos y aprende a guardarlo en PDF. Incluye variantes por profesión.",
  path: "/modelo-de-curriculum-vitae",
  keywords: [
    "modelo de curriculum vitae",
    "modelo curriculum vitae",
    "ejemplo curriculum vitae",
    "plantilla curriculum vitae",
  ],
});

export default function ModeloDeCurriculumVitaePage() {
  return (
    <MarketingPage
      path="/modelo-de-curriculum-vitae"
      eyebrow="Modelo de CV"
      title="Modelo de currículum vitae para copiar y completar"
      description="Una estructura en texto con contacto, perfil, experiencia, formación y habilidades. Reemplaza los campos entre corchetes por tus datos."
      intro={[
        "Puedes copiar el modelo de esta página en un editor de documentos y completarlo sin registrarte. Los campos entre corchetes indican qué información agregar; elimina las indicaciones antes de enviarlo.",
        "La estructura sirve para organizar tu contenido. Si necesitas ejemplos redactados para un puesto, al final encontrarás modelos de minería, producción, caja y administración.",
      ]}
      benefits={[
        "Sirve como referencia para ordenar contenido y estructura.",
        "Ayuda a entender que secciones pesan mas en un CV moderno.",
        "Te permite pasar de ejemplo a version propia sin perder tiempo.",
      ]}
      steps={[
        {
          title: "Mira una estructura clara",
          description:
            "Identifica como se ordenan perfil, experiencia, estudios y habilidades.",
        },
        {
          title: "Adapta el contenido a tu caso",
          description:
            "No copies un modelo vacio: transformalo en una version propia y util.",
        },
        {
          title: "Cierra con una plantilla final",
          description:
            "Lleva esa referencia a un CV listo para descargar y usar.",
        },
      ]}
      sections={[
        {
          title: "Modelo de currículum vitae en texto para completar",
          paragraphs: [
            "NOMBRE Y CONTACTO: [Nombre y apellido] · [Puesto al que te postulas] · [Ciudad y provincia] · [Teléfono] · [Correo profesional] · [Enlace a portfolio, si corresponde].",
            "PERFIL PROFESIONAL: [Puesto o formación] con experiencia en [dos tareas relacionadas con la vacante]. Manejo de [herramienta o proceso que dominas]. Interés en aportar [capacidad concreta] en [tipo de puesto o sector].",
            "EXPERIENCIA: [Cargo] · [Empresa o tipo de actividad] · [Mes/año de inicio–mes/año de fin]. [Acción que realizabas + tarea o proceso + contexto]. [Segunda responsabilidad relevante]. [Resultado verificable o alcance de tu trabajo]. Repite este bloque para otras experiencias, empezando por la más reciente.",
            "FORMACIÓN: [Título o estudios] · [Institución] · [Año de finalización o estado actual]. Si estudias, indica 'en curso' y el avance que puedas acreditar.",
            "CURSOS: [Nombre del curso] · [Entidad] · [Fecha]. Incluye los que aporten al puesto; elimina esta sección si no tienes cursos relevantes.",
            "HABILIDADES: [Herramienta y tarea que sabes resolver con ella] · [Conocimiento técnico] · [Idioma y nivel, si aporta a la vacante].",
            "INFORMACIÓN ADICIONAL: [Disponibilidad horaria] · [Licencia o habilitación pertinente y vigente, si corresponde]. Agrega solo datos relacionados con la postulación.",
          ],
        },
        {
          title: "Cómo completar una experiencia paso a paso",
          paragraphs: [
            "Empieza por una tarea real. Si escribiste 'atención al público', añade qué atendías y cómo: 'Atendí consultas presenciales sobre productos, registré pedidos y derivé reclamos al responsable del local'. Es un ejemplo de redacción, no una experiencia para copiar como propia.",
            "Después agrega el contexto que ayude a entender tu trabajo: tipo de comercio, herramientas utilizadas o coordinación con otras personas. Un dato concreto vale más que repetir 'responsable y proactivo'.",
            "Revisa que cargo, fechas y funciones sean coherentes. Las actividades independientes o informales también pueden describirse, identificándolas como tales.",
          ],
        },
        {
          title: "Cómo adaptar el modelo si no tienes experiencia laboral",
          paragraphs: [
            "Coloca formación, proyectos, prácticas o voluntariado antes de experiencia. Si no hay antecedentes laborales, elimina el bloque vacío y explica actividades reales que muestren herramientas, organización o trato con personas.",
            "Puedes sustituir el perfil por esta estructura: '[Estudiante o egresado de formación] con conocimientos de [herramienta]. En [proyecto o actividad] realicé [tarea concreta]. Busco mi primera oportunidad en [puesto]'. Completa cada campo con información que puedas explicar.",
          ],
        },
        {
          title: "Cómo guardar el modelo de currículum en PDF",
          paragraphs: [
            "Pega el texto en tu editor, usa títulos claros y un formato consistente para las fechas. Completa o elimina todos los campos entre corchetes y utiliza la opción de guardar o exportar como PDF.",
            "Abre el archivo exportado y verifica que puedas seleccionar el texto, que no haya secciones cortadas y que los datos de contacto se lean bien en el celular. Sigue el formato solicitado por la oferta si pide otro tipo de archivo.",
            "El modelo de esta página se puede copiar sin pagar. Si decides generar tu CV con VitaeSpark, la descarga del PDF desde la plataforma requiere un pago único.",
          ],
        },
        {
          title: "Qué modelo elegir según el puesto",
          paragraphs: [
            "Para puestos operativos, prioriza tareas, herramientas, procedimientos y turnos. Para atención al público, desarrolla consultas, cobros o resolución de incidencias. Para administración, muestra documentos, procesos y sistemas utilizados.",
            "Conserva una base con toda tu experiencia y prepara una versión para cada tipo de puesto. En los ejemplos por profesión que aparecen abajo puedes ver cómo cambia el perfil y el detalle de las tareas.",
          ],
        },
      ]}
      faqs={[
        {
          question: "¿Puedo copiar este modelo de currículum gratis?",
          answer:
            "Sí. Puedes copiar el texto de esta página, completar tus datos y guardarlo en tu editor sin registrarte. La descarga del CV generado dentro de VitaeSpark es un servicio de pago único.",
        },
        {
          question: "Conviene partir de un modelo o de una plantilla?",
          answer:
            "Ambos ayudan, pero un modelo te da referencia de contenido y una plantilla te resuelve la presentacion visual.",
        },
        {
          question: "Puedo usar este enfoque si nunca hice un CV?",
          answer:
            "Si. De hecho, es uno de los casos donde mas valor aporta empezar con una referencia clara.",
        },
        {
          question: "Sirve tambien para actualizar un CV viejo?",
          answer:
            "Si. Compararte con una estructura moderna ayuda mucho a detectar que mejorar.",
        },
      ]}
      relatedLinks={[
        {
          href: "/blog/como-hacer-un-curriculum",
          title: "Cómo hacer un currículum paso a paso",
          description: "Usa una oferta concreta para elegir qué información completar en el modelo.",
        },
        {
          href: "/cv-para-mineria",
          title: "Modelo de CV para minería",
          description: "Ejemplo de ayudante con experiencia industrial, cursos y disponibilidad.",
        },
        {
          href: "/cv-para-operario",
          title: "Currículum de operario de producción",
          description: "Ejemplo con tareas de línea, controles y herramientas.",
        },
        {
          href: "/cv-para-cajero",
          title: "Currículum de cajero o cajera",
          description: "Ejemplo de supermercado con cobros, atención y cierre de caja.",
        },
        {
          href: "/cv-para-administrativo",
          title: "Currículum de auxiliar administrativo",
          description: "Modelo con gestión documental, proveedores y aplicaciones de Excel.",
        },
        {
          href: "/plantillas-curriculum",
          title: "Plantillas de curriculum",
          description: "Pasa del modelo de referencia a una estructura lista para usar.",
        },
        {
          href: "/",
          title: "Crear curriculum vitae",
          description: "Transforma la referencia en un CV propio y profesional.",
        },
        {
          href: "/blog/que-poner-en-un-curriculum",
          title: "Que poner en un curriculum",
          description: "Asegura que el contenido del modelo tenga sentido para tu perfil.",
        },
      ]}
    />
  );
}
