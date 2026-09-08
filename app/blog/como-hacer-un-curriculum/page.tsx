import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";
import { seoContentLastModified } from "@/lib/seo-routes";

export const metadata = buildMetadata({
  title: "Cómo Hacer un Currículum: Pasos y Ejemplo Práctico",
  description:
    "Aprende a hacer un currículum desde una oferta: elige la información, redacta perfil y experiencia, adapta tu CV y revisa el PDF antes de enviarlo.",
  path: "/blog/como-hacer-un-curriculum",
  keywords: [
    "como hacer un curriculum",
    "hacer curriculum vitae",
    "como hacer un cv",
    "estructura curriculum",
  ],
  type: "article",
});

export default function ComoHacerUnCurriculumPage() {
  return (
    <BlogArticlePage
      path="/blog/como-hacer-un-curriculum"
      datePublished="2025-04-12"
      dateModified={seoContentLastModified["/blog/como-hacer-un-curriculum"]}
      title="Cómo hacer un currículum paso a paso y con un ejemplo práctico"
      description="Parte de una oferta de trabajo, selecciona tus antecedentes y conviértelos en un perfil y una experiencia claros."
      intro="Para hacer un currículum, reúne tus datos de contacto, formación y antecedentes; elige lo que se relaciona con la vacante; redacta el perfil y las tareas; y revisa el documento antes de enviarlo. Aquí puedes seguir el proceso con un ejemplo ficticio de postulación administrativa y adaptarlo a tu puesto."
      sections={[
        {
          title: "Empieza por definir el puesto que buscas",
          paragraphs: [
            "Antes de escribir, elige una oferta y anota el puesto, las tareas y las herramientas que solicita. Marca qué requisitos puedes respaldar con experiencia, estudios o proyectos.",
            "Ejemplo ficticio: un aviso de auxiliar administrativo pide registrar facturas, actualizar planillas y responder consultas a proveedores. Si ya hiciste esas tareas, serán el centro del CV; si conoces solo una parte, describe ese alcance sin completar los requisitos con experiencia inventada.",
          ],
        },
        {
          title: "Reúne tus datos y organiza las secciones",
          paragraphs: [
            "Prepara nombre, ciudad, teléfono y correo; cargos y fechas de tus trabajos; formación y estado de los estudios; cursos; y herramientas que sabes utilizar. No necesitas publicar tu dirección completa para explicar dónde resides.",
            "Si tienes experiencia relacionada, usa este orden: contacto, perfil, experiencia de la más reciente a la más antigua, formación y habilidades. Si buscas tu primer empleo, puedes colocar formación, proyectos o prácticas antes de los antecedentes laborales.",
            "Para el ejemplo administrativo, selecciona tareas de documentación y planillas antes que experiencias poco relacionadas. Conserva el resto en una versión base para futuras postulaciones.",
          ],
        },
        {
          title: "Transforma tus tareas en experiencia: antes y después",
          paragraphs: [
            "Antes: 'Tareas administrativas y atención'. Después: 'Registré comprobantes, actualicé la planilla de vencimientos y respondí consultas de proveedores por correo'. La segunda versión explica acciones que el empleador puede relacionar con el aviso.",
            "Para redactar tu propia experiencia, combina una acción, el proceso y el contexto: 'Preparé pedidos según el remito y verifiqué cantidades antes del despacho'. Añade un resultado medible solo si tienes datos reales que lo respalden.",
            "Bajo cada cargo, elige las tareas que mejor muestran tu capacidad para el nuevo puesto. Evita copiar funciones de la oferta que nunca realizaste.",
          ],
        },
        {
          title: "Redacta el perfil profesional a partir de tu experiencia",
          paragraphs: [
            "En el ejemplo de esta guía, el perfil podría quedar así: 'Auxiliar administrativo con experiencia en registro de comprobantes, seguimiento de vencimientos y atención a proveedores. Manejo de Excel y correo corporativo para organizar documentación y pendientes'.",
            "Escribe primero la experiencia y después resúmela en tres o cuatro líneas de perfil. Así cada afirmación tiene un respaldo dentro del mismo documento.",
            "Si no tienes experiencia laboral, empieza por la formación y una actividad real: 'Estudiante de administración con conocimientos de Excel. En un proyecto académico organicé un registro de compras y preparé reportes de gastos'. Sustituye este ejemplo por tu propio proyecto.",
          ],
        },
        {
          title: "Selecciona habilidades que puedas demostrar",
          paragraphs: [
            "Relaciona cada herramienta con una aplicación: 'Excel para filtrar registros y controlar vencimientos' o 'Sistema de caja para registrar productos y procesar cobros'. Evita asignarte un nivel avanzado sin poder explicar qué sabes hacer.",
            "Para la vacante administrativa, prioriza las herramientas de oficina que ya usaste. Si también tienes conocimientos de otra área, inclúyelos cuando ayuden a entender tu candidatura, sin desplazar los requisitos principales.",
          ],
        },
        {
          title: "Errores comunes al hacer un curriculum",
          paragraphs: [
            "Uno de los errores mas frecuentes es usar el mismo CV para todo. Si el puesto pide atencion al cliente, administracion o produccion, el perfil y las habilidades deberian reflejar esa busqueda.",
            "Otro error comun es priorizar diseño sobre claridad. Un CV puede verse moderno, pero si no se entiende rapido que hiciste, que sabes hacer y como contactarte, pierde fuerza.",
          ],
        },
        {
          title: "Revisa el contenido y guarda tu currículum en PDF",
          paragraphs: [
            "Comprueba contacto, fechas, ortografía y nombre del puesto. Elimina campos vacíos, indicaciones del modelo y frases que no describan tu experiencia. Pide a otra persona que identifique a qué trabajo te postulas leyendo solo el inicio.",
            "Exporta el documento a PDF si ese es el formato solicitado. Ábrelo en el celular, verifica que no haya texto cortado y prueba seleccionar o copiar una frase para comprobar que el contenido no quedó como una imagen. Usa un nombre de archivo reconocible, por ejemplo 'Nombre-Apellido-CV-Administrativo.pdf'.",
            "Puedes preparar el documento en tu editor o utilizar VitaeSpark para generar tu versión. En la plataforma, la descarga del PDF requiere un pago único; consultar esta guía y copiar su modelo de referencia no tiene costo.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Cuanto debe medir un curriculum?",
          answer:
            "En la mayoria de los casos, una o dos paginas alcanzan. Lo importante es que cada seccion aporte valor y sea facil de leer.",
        },
        {
          question: "Necesito foto en el CV?",
          answer:
            "Depende del mercado y del tipo de puesto. En muchos casos no es obligatoria; la prioridad sigue siendo el contenido.",
        },
        {
          question: "Conviene adaptar el CV a cada oferta?",
          answer:
            "Si. Ajustar perfil, palabras clave y experiencias destacadas suele mejorar el rendimiento del CV.",
        },
        {
          question: "Como hago un curriculum si no tengo experiencia?",
          answer:
            "Puedes reforzar estudios, cursos, proyectos, habilidades, voluntariado, practicas o experiencias informales relacionadas con el puesto objetivo.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-mineria",
          title: "Ejemplo de CV para minería",
          description: "Aplica el proceso a experiencia industrial y puestos de ayudante.",
        },
        {
          href: "/cv-para-operario",
          title: "Ejemplo de currículum de operario",
          description: "Redacta tareas de producción, controles y herramientas.",
        },
        {
          href: "/cv-para-cajero",
          title: "Ejemplo de currículum de cajero o cajera",
          description: "Describe cobros, atención al público y responsabilidades de caja.",
        },
        {
          href: "/",
          title: "Creador de CV online",
          description:
            "Crea tu curriculum con IA, plantillas profesionales y descarga en PDF.",
        },
        {
          href: "/modelo-de-curriculum-vitae",
          title: "Modelo de currículum para copiar y completar",
          description:
            "Completa contacto, perfil, experiencia y formación en una estructura de texto.",
        },
        {
          href: "/curriculum-sin-experiencia",
          title: "Curriculum sin experiencia",
          description:
            "Guia especifica si estas armando tu primer CV laboral.",
        },
        {
          href: "/cv-para-administrativo",
          title: "CV para administrativo",
          description:
            "Mira una estructura concreta para puestos administrativos y de oficina.",
        },
        {
          href: "/curriculum-ats",
          title: "Curriculum ATS",
          description:
            "Complementa esta guia con claves para filtros automaticos.",
        },
      ]}
    />
  );
}
