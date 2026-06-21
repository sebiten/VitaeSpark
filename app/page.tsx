import Hero from "@/components/hero";
import { buildMetadata, getBaseUrl } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Creador de CV Online con IA | VitaeSpark",
  description:
    "Crea tu CV online con IA, plantillas profesionales, enfoque ATS y descarga en PDF. VitaeSpark te ayuda a armar un curriculum claro y listo para postular.",
  path: "/",
  keywords: [
    "creador de cv",
    "creador de cv online",
    "creador de curriculum",
    "generador de cv",
    "crear curriculum online",
    "crear cv online",
    "hacer curriculum vitae",
    "curriculum ats",
    "crear cv con ia",
  ],
  languages: {
    es: "/",
  },
});

export default function GeneradorCV() {
  const baseUrl = getBaseUrl();

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "VitaeSpark",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: baseUrl.toString(),
    description:
      "Creador de CV online con IA, plantillas profesionales, enfoque ATS y descarga en PDF.",
    offers: {
      "@type": "Offer",
      price: "2500",
      priceCurrency: "ARS",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Como funciona VitaeSpark?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cargas tus datos, eliges una plantilla y la IA mejora la redacción para que el CV se lea más claro.",
        },
      },
      {
        "@type": "Question",
        name: "Sirve si no tengo experiencia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Puedes armar un CV inicial destacando estudios, cursos, proyectos, habilidades y disponibilidad.",
        },
      },
      {
        "@type": "Question",
        name: "Es solo una plantilla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. La plantilla resuelve el diseño, pero VitaeSpark también ayuda a ordenar y redactar mejor el contenido.",
        },
      },
      {
        "@type": "Question",
        name: "Puedo editarlo despues?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Puedes volver, cambiar datos, probar otra plantilla y descargar una nueva versión en PDF.",
        },
      },
    ],
  };

  const howtoSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo crear tu CV online con VitaeSpark",
    description: "Paso a paso para generar un curriculum profesional con IA, estructura ATS y descarga en PDF.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Cargá tus datos",
        text: "Experiencia, estudios, habilidades y links. Sin complicaciones.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "La IA ordena",
        text: "Convierte frases sueltas en contenido claro y profesional.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Descargá tu CV",
        text: "PDF profesional listo para enviar a cualquier oferta.",
      },
    ],
  };

  return (
    <div className="mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
      />
      <Hero />
    </div>
  );
}
