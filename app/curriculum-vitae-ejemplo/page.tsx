import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ejemplos de Currículum Vitae para Copiar y Adaptar",
  description: "Dos ejemplos completos de currículum vitae: con experiencia y para primer empleo. Copia el texto y adapta perfil, formación y habilidades a tu puesto.",
  path: "/curriculum-vitae-ejemplo",
  keywords: ["ejemplos de curriculum vitae", "curriculum completo", "cv con experiencia", "ejemplo cv primer empleo"],
});

export default function CurriculumVitaeEjemploPage() {
  return (
    <MarketingPage
      path="/curriculum-vitae-ejemplo"
      eyebrow="Modelos completos"
      title="Ejemplos de currículum vitae con y sin experiencia"
      description="Copia una estructura completa y reemplaza los campos con tus datos antes de postularte."
      intro={[
        "Estos modelos son ficticios: muestran cómo organizar un CV, no antecedentes que debas atribuirte. Reemplaza los campos entre corchetes y conserva únicamente tareas, estudios y herramientas que puedas demostrar.",
        "El primer ejemplo corresponde a administración con experiencia; el segundo, a una postulación inicial en atención al cliente. Consultar y copiar estos textos es gratis. En VitaeSpark, la descarga del PDF requiere un pago único.",
      ]}
      benefits={["Contacto, perfil, antecedentes, formación y habilidades en un mismo ejemplo.", "Una alternativa para quienes todavía no tienen empleo formal.", "Texto editable en el editor que prefieras."]}
      steps={[
        { title: "Elige el caso más cercano", description: "Usa el modelo con experiencia si tus tareas anteriores se relacionan con el aviso; en caso contrario, destaca formación y proyectos relevantes." },
        { title: "Reemplaza cada campo", description: "Completa fechas, instituciones y contacto. Elimina tareas que no realizaste y campos que no correspondan." },
        { title: "Revisa la versión final", description: "Comprueba el teléfono, la ortografía y la lectura del documento en el celular antes de enviarlo." },
      ]}
      sections={[
        {
          title: "Ejemplo completo de CV con experiencia administrativa",
          paragraphs: [
            "[Nombre y apellido] · Auxiliar administrativo · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: Auxiliar administrativo con experiencia en registro de comprobantes, organización de documentación y seguimiento de consultas de proveedores. Manejo de [herramientas que utilizas] para actualizar registros y controlar pendientes.",
            "Experiencia: Auxiliar administrativo · [Empresa] · [Mes/año de inicio–mes/año de fin]. Registré facturas y comprobantes; actualicé planillas de vencimientos; archivé documentación y derivé consultas de proveedores al área responsable.",
            "Formación: [Título o estudios] · [Institución] · [Año o estado actual]. Cursos: [Curso relacionado, institución y año; elimina este campo si no corresponde].",
            "Habilidades: [Herramienta] para registrar y filtrar datos; organización de archivos; seguimiento por correo de consultas y documentación. Incluye solo las aplicaciones que puedas explicar en una entrevista.",
            "Disponibilidad: [Días y horarios reales]. Si el aviso solicita una modalidad presencial, indica tu ciudad sin publicar el domicilio completo.",
          ],
        },
        {
          title: "Ejemplo completo de CV sin experiencia laboral",
          paragraphs: [
            "[Nombre y apellido] · Postulación a atención al cliente · [Ciudad] · [Teléfono] · [Correo profesional].",
            "Perfil: [Estudiante o egresado de formación real] interesado en atención al cliente. En [proyecto, voluntariado o actividad real] participé en la recepción de consultas y organización de materiales. Disponibilidad [horarios reales].",
            "Formación: [Estudios] · [Institución] · [En curso o año de finalización]. Curso relacionado: [Nombre, institución y año, únicamente si lo realizaste].",
            "Proyecto o actividad: [Nombre de actividad escolar, comunitaria o personal] · [Organización o contexto] · [Fechas]. Colaboré en [tarea real], organicé [materiales o información] y comuniqué [indicaciones o respuestas] a [participantes]. No presentes esta sección como empleo si no lo fue.",
            "Habilidades: [Herramienta] utilizada para [aplicación concreta]; comunicación con participantes durante [actividad]; organización de [materiales o registros]. Si no realizaste el proyecto del ejemplo, reemplázalo por una práctica real o elimina esa sección.",
            "Idiomas: [Idioma y nivel que puedes demostrar, si corresponde]. Disponibilidad: [Días, horarios y fecha posible de incorporación].",
          ],
        },
        {
          title: "Cómo adaptar estos modelos al aviso",
          paragraphs: [
            "Subraya las tareas que pide el empleador y busca cuáles aparecen en tu recorrido. Si solicita control de documentación, describe qué documentos organizaste y con qué herramienta; no agregues experiencia de caja si nunca cobraste.",
            "Ubica los antecedentes más relevantes al principio. Antes de exportar, busca corchetes y elimina todos los campos pendientes. Abre el PDF y comprueba que puedas seleccionar el texto.",
          ],
        },
      ]}
      faqs={[
        { question: "¿Puedo copiar estos ejemplos?", answer: "Sí. Puedes copiar la estructura y adaptarla con tus antecedentes reales. No copies tareas, cursos ni habilidades que no tengas." },
        { question: "¿Qué pongo si no tengo experiencia ni proyectos?", answer: "Incluye formación, cursos realizados, herramientas que hayas practicado y disponibilidad. No necesitas inventar un proyecto para completar una sección." },
        { question: "¿Copiar el ejemplo incluye una descarga gratuita?", answer: "Los textos de esta página son de consulta libre. Puedes usarlos en tu editor; la descarga del PDF generado en VitaeSpark requiere un pago único." },
      ]}
      relatedLinks={[
        { href: "/blog/ejemplo-de-curriculum-vitae", title: "Un CV explicado: antes y después", description: "Descubre por qué cambia cada frase en una postulación administrativa." },
        { href: "/cv-para-cajero", title: "Ejemplo de CV para cajero", description: "Consulta un modelo con cobros, arqueo y atención al público." },
        { href: "/modelo-de-curriculum-vitae", title: "Estructura para completar", description: "Organiza tus propios datos con un modelo de referencia." },
      ]}
    />
  );
}
