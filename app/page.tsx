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
        name: "¿Qué es un creador de CV online con IA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es una herramienta web que te guía para cargar tus datos, ordenar experiencia, elegir plantilla y descargar un curriculum listo para postular. VitaeSpark suma redacción con IA, estructura ATS y PDF profesional.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué se diferencia de una plantilla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Una plantilla solo resuelve el diseño. Un creador de CV también te ayuda a ordenar contenido, redactar mejor y preparar el documento para recruiters y filtros ATS.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es un sistema ATS y por qué importa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un ATS (Applicant Tracking System) filtra CVs automáticamente. Aproximadamente el 75% son rechazados antes de ser vistos. VitaeSpark asegura que tu CV pase estos filtros.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo mejora la IA mi currículum?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Analiza tu información y mejora redacción para que sea más impactante. Identifica palabras clave de tu industria y las incorpora estratégicamente.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué formatos puedo descargar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PDF profesional, cuántas veces quieras desde tu perfil. El mismo archivo actualizado.",
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
