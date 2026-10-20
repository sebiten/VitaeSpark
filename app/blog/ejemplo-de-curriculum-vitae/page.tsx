import { BlogArticlePage } from "@/components/seo/BlogArticlePage";
import { buildMetadata } from "@/lib/seo";
import { seoContentLastModified } from "@/lib/seo-routes";

export const metadata = buildMetadata({
  title: "Un CV Administrativo Explicado: Antes y Después",
  description: "Analiza un CV administrativo antes y después: cómo concretar el perfil, describir tareas y elegir habilidades sin inventar experiencia ni resultados.",
  path: "/blog/ejemplo-de-curriculum-vitae",
  keywords: ["currículum explicado", "cv antes y después", "análisis cv administrativo"],
  type: "article",
});

export default function EjemploDeCurriculumVitaePage() {
  return (
    <BlogArticlePage
      path="/blog/ejemplo-de-curriculum-vitae"
      datePublished="2025-04-15"
      dateModified={seoContentLastModified["/blog/ejemplo-de-curriculum-vitae"]}
      title="Un currículum explicado: qué cambiar y por qué"
      description="Analizamos una postulación administrativa para convertir frases vagas en información que un empleador pueda evaluar."
      intro="Este caso es ficticio. La persona ya registró facturas, actualizó planillas y respondió correos de proveedores. El aviso pide esas tareas: vamos a hacerlas visibles sin agregar experiencia, herramientas ni resultados que no consten en sus antecedentes."
      sections={[
        { title: "Primero: qué pide el aviso y qué puede demostrar la persona", paragraphs: [
          "El aviso solicita registro de comprobantes, seguimiento de vencimientos y atención a proveedores. El CV inicial dice 'administración y tareas varias': no permite saber si la experiencia coincide con el puesto.",
          "La revisión comienza anotando tres correspondencias: comprobantes con registro de facturas; vencimientos con actualización de planillas; proveedores con respuesta a correos. Si un requisito no está respaldado, no se incorpora como habilidad adquirida.",
        ] },
        { title: "Perfil: reemplazar adjetivos por contexto", paragraphs: [
          "Antes: 'Soy una persona responsable, dinámica y proactiva que busca crecer en una empresa'.",
          "Después: 'Auxiliar administrativo con experiencia en registro de facturas, actualización de planillas de vencimientos y atención por correo a proveedores'.",
          "La nueva versión responde qué hizo la persona y en qué procesos trabajó. No agrega años de experiencia ni niveles de dominio. La responsabilidad puede demostrarse después con una situación concreta, en lugar de ocupar todo el perfil.",
        ] },
        { title: "Experiencia: explicar acciones sin inventar métricas", paragraphs: [
          "Antes: 'Tareas administrativas. Manejo de documentación. Atención'.",
          "Después: 'Registré facturas en la planilla del área, actualicé fechas de vencimiento y derivé consultas de proveedores al responsable de pagos'. Bajo esa descripción deben figurar el cargo, la empresa y las fechas reales.",
          "Cada verbo describe una acción verificable. No convertimos 'derivé consultas' en 'gestioné pagos': sería atribuir una responsabilidad diferente. Tampoco añadimos porcentajes de mejora sin registros que los respalden.",
        ] },
        { title: "Habilidades: indicar para qué se usó cada herramienta", paragraphs: [
          "Antes: 'Office avanzado, liderazgo y trabajo bajo presión'.",
          "Después: 'Excel para cargar y filtrar comprobantes; correo corporativo para responder y derivar consultas; organización de archivos digitales'.",
          "Esta redacción es válida solo si esas fueron las tareas reales. Usar una planilla no equivale a dominar macros o tablas dinámicas. Si el aviso exige una función que todavía no conoce, la persona debe distinguir ese aprendizaje de su experiencia actual.",
        ] },
        { title: "Orden: facilitar la comprobación de lo que dice el perfil", paragraphs: [
          "Para este caso, el orden es contacto, perfil, experiencia, formación y habilidades. La experiencia relacionada queda cerca del perfil para que el lector encuentre su respaldo.",
          "El encabezado necesita nombre, ciudad, teléfono y correo. La formación debe indicar institución y estado real: 'en curso' no equivale a un título obtenido. Si se trata de un primer empleo, la formación y un proyecto relevante pueden ocupar el lugar destacado.",
        ] },
        { title: "Revisión final: comparar el CV con el aviso", paragraphs: [
          "Comprueba que el documento explique las tareas solicitadas que efectivamente realizaste. Pide a otra persona que identifique el puesto objetivo y señale dónde encuentra evidencia para cada habilidad.",
          "Verifica fechas y contacto, elimina campos pendientes y abre el PDF en el celular. Seleccionar su texto ayuda a detectar un documento exportado como imagen, pero no garantiza compatibilidad con todos los sistemas de selección.",
        ] },
      ]}
      faqs={[
        { question: "¿Debo copiar las mismas frases?", answer: "Solo si describen tus tareas reales. El valor del caso es el método: sustituir una expresión vaga por una acción, su objeto y el contexto en que la realizaste." },
        { question: "¿Hace falta agregar números a cada tarea?", answer: "No. Un resultado medible aporta información cuando tienes datos que lo respaldan. Una descripción precisa sin cifras es preferible a un porcentaje inventado." },
        { question: "¿Dónde encuentro un CV completo para adaptar?", answer: "En la página de ejemplos de currículum tienes modelos completos con y sin experiencia. Esta guía explica las decisiones de redacción de un caso particular." },
      ]}
      relatedLinks={[
        { href: "/curriculum-vitae-ejemplo", title: "CV completos para copiar y adaptar", description: "Consulta los modelos con experiencia y para primer empleo." },
        { href: "/cv-para-administrativo", title: "Ejemplo para administración", description: "Revisa tareas, perfil y habilidades del puesto del caso." },
        { href: "/blog/como-adaptar-tu-cv-a-una-vacante", title: "Adaptar el CV a una oferta", description: "Selecciona antecedentes según los requisitos de tu próxima postulación." },
      ]}
    />
  );
}
