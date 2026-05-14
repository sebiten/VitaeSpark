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
    en: "/en",
    "x-default": "/",
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

  return (
    <div className="mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <Hero />
    </div>
  );
}
