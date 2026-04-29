import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Repositor: Ejemplo, Habilidades y Formato ATS",
  description:
    "Arma un CV para repositor con ejemplo, habilidades operativas, stock, orden de gondola y formato ATS.",
  path: "/cv-para-repositor",
  keywords: [
    "cv para repositor",
    "curriculum repositor",
    "ejemplo cv repositor",
    "habilidades repositor curriculum",
    "cv repositor supermercado",
  ],
});

export default function CvParaRepositorPage() {
  return (
    <MarketingPage
      path="/cv-para-repositor"
      eyebrow="CV por profesion"
      title="CV para repositor: ejemplo, habilidades y formato ATS"
      description="Prepara un curriculum para repositor destacando stock, orden de gondola, reposicion, control de mercaderia y ritmo operativo."
      intro={[
        "Un CV para repositor debe transmitir responsabilidad, orden y capacidad fisica/operativa. Conviene mostrar experiencia en reposicion, control de stock, rotacion de productos, limpieza de sector, atencion basica y cumplimiento de procedimientos.",
        "VitaeSpark te ayuda a ordenar esa experiencia y convertirla en un CV claro para supermercados, mayoristas, farmacias, tiendas y comercios.",
      ]}
      exampleImage={{
        src: "/example.webp",
        alt: "ejemplo de cv para repositor",
        caption:
          "Ejemplo visual de CV adaptable para reposicion, supermercados y operaciones de retail.",
      }}
      benefits={[
        "Destaca reposicion, stock, orden, rotacion y control de productos.",
        "Sirve para supermercados, farmacias, mayoristas y tiendas.",
        "Ayuda a mostrar ritmo de trabajo y responsabilidad en formato ATS.",
      ]}
      steps={[
        {
          title: "Define el rubro",
          description:
            "Aclara si fue supermercado, farmacia, mayorista, tienda o deposito.",
        },
        {
          title: "Describe tareas operativas",
          description:
            "Incluye reposicion, stock, vencimientos, orden, limpieza y atencion si aplica.",
        },
        {
          title: "Descarga tu CV",
          description:
            "Obtienes una version simple y profesional para postularte mejor.",
        },
      ]}
      sections={[
        {
          title: "Que poner en un CV para repositor",
          paragraphs: [
            "Suele sumar experiencia en reposicion de mercaderia, control de fechas, rotacion, orden de gondolas, descarga, inventario, etiquetado, limpieza del sector y apoyo a clientes.",
            "Si trabajaste con volumen alto, horarios rotativos o productos especificos, conviene aclararlo porque muestra adaptacion al ritmo del puesto.",
          ],
        },
        {
          title: "CV para repositor sin experiencia",
          paragraphs: [
            "Si no tienes experiencia directa, puedes destacar disponibilidad horaria, responsabilidad, puntualidad, buena condicion para tareas operativas, estudios, cursos o trabajos informales donde hayas demostrado orden y constancia.",
            "Tambien suma mencionar atencion al publico o tareas de deposito si las tuviste, porque son experiencias cercanas al rol.",
          ],
        },
        {
          title: "Habilidades de repositor que suman",
          paragraphs: [
            "Entre las habilidades mas utiles estan orden, rapidez, control de stock, atencion al detalle, trabajo fisico, rotacion de mercaderia, trabajo en equipo y cumplimiento de procesos.",
            "Para ATS, conviene que esas palabras aparezcan dentro del perfil y la experiencia, no solo en una lista aislada.",
          ],
        },
      ]}
      faqs={[
        {
          question: "Sirve para repositor de supermercado?",
          answer:
            "Si. La estructura esta pensada para supermercados, retail, tiendas y puestos operativos similares.",
        },
        {
          question: "Debo poner disponibilidad horaria?",
          answer:
            "Si buscas puestos con turnos rotativos, puede sumar mucho mencionarla.",
        },
        {
          question: "Puedo usarlo sin experiencia laboral?",
          answer:
            "Si. En ese caso conviene reforzar responsabilidad, disponibilidad, estudios y habilidades operativas.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-para-cajero",
          title: "CV para cajero",
          description: "Otra salida frecuente para retail, supermercados y comercio.",
        },
        {
          href: "/cv-para-vendedor",
          title: "CV para vendedor",
          description: "Ideal si tambien atendias clientes o colaborabas en ventas.",
        },
        {
          href: "/crear-cv-online",
          title: "Crear CV online",
          description: "Arma tu CV en una plantilla lista para descargar.",
        },
      ]}
    />
  );
}
