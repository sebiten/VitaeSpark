import { MarketingPage } from "@/components/seo/MarketingPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "CV para Repositor: Ejemplo para Supermercado y Stock",
  description:
    "Arma un CV para repositor con ejemplo de perfil, experiencia, habilidades de stock, góndola, supermercado, depósito y formato ATS.",
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
      title="CV para repositor: ejemplo para supermercado, stock y gondola"
      description="Prepara un curriculum para repositor destacando stock, orden de gondola, reposicion, control de mercaderia, deposito y ritmo operativo."
      intro={[
        "Un CV para repositor debe transmitir responsabilidad, orden y capacidad fisica/operativa. Conviene mostrar experiencia en reposicion, control de stock, rotacion de productos, limpieza de sector, atencion basica y cumplimiento de procedimientos.",
        "VitaeSpark te ayuda a ordenar esa experiencia y convertirla en un CV claro para supermercados, mayoristas, farmacias, tiendas y comercios.",
      ]}
      exampleImage={{
        src: "/elegance-good.webp",
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
          title: "Ejemplo de perfil profesional para repositor",
          paragraphs: [
            "Una base clara puede ser: 'Perfil operativo orientado a reposicion y orden de mercaderia, con experiencia en control de stock, rotacion de productos, limpieza de sector y apoyo a clientes en comercios de alto movimiento'.",
            "Si tambien hiciste deposito, caja o atencion al cliente, conviene mencionarlo porque muchas empresas valoran perfiles que puedan cubrir varias tareas dentro del salon o supermercado.",
          ],
        },
        {
          title: "Ejemplos de experiencia para repositor",
          paragraphs: [
            "Para supermercado, puedes escribir: 'Realice reposicion de gondolas, control de fechas de vencimiento, rotacion de productos y orden del sector, colaborando con descarga y atencion basica a clientes'.",
            "Para deposito o mayorista, una frase util seria: 'Colabore en recepcion de mercaderia, inventario, ubicacion de productos, preparacion de pedidos y mantenimiento de pasillos ordenados para facilitar el trabajo operativo'.",
          ],
        },
        {
          title: "CV de repositor de supermercado",
          paragraphs: [
            "Si apuntas a supermercado, incluye palabras como gondola, stock, vencimientos, rotacion, precios, reposicion, pasillos, limpieza del sector, deposito y atencion al cliente. Son terminos que ayudan a que el puesto se entienda rapido.",
            "Tambien conviene aclarar disponibilidad para turnos, fines de semana o horarios rotativos si realmente la tienes, porque muchos procesos de retail filtran por ese dato.",
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
        {
          title: "Errores comunes en un curriculum repositor",
          paragraphs: [
            "Un error comun es quedarse solo en 'reposicion de productos'. Conviene agregar stock, vencimientos, rotacion, orden, limpieza, descarga, inventario o atencion basica si corresponden.",
            "Otro error es no aclarar el rubro. Repositor de supermercado, farmacia, mayorista, tienda o deposito pueden parecer puestos parecidos, pero las tareas y exigencias cambian bastante.",
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
        {
          question: "Que habilidades poner en un CV de repositor?",
          answer:
            "Orden, reposicion, control de stock, rotacion de mercaderia, atencion al detalle, carga y descarga, limpieza del sector, inventario y atencion basica al cliente.",
        },
        {
          question: "Como describir experiencia de repositor?",
          answer:
            "Describe tareas como reposicion de gondolas, control de vencimientos, rotacion de productos, descarga, inventario, orden del sector y apoyo a clientes.",
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
        {
          href: "/cv-para-operario",
          title: "CV para operario",
          description: "Buena alternativa si tambien hiciste deposito, carga o tareas operativas.",
        },
      ]}
    />
  );
}
