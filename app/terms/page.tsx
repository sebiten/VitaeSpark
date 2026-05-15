import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, termsContent } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terminos de servicio de VitaeSpark",
  description:
    "Terminos de servicio de VitaeSpark para uso de la plataforma, pagos y generacion de CVs digitales.",
  path: "/terms",
  keywords: ["terminos vitae spark", "terminos vitae spark cv"],
  languages: {
    es: "/terminos",
  },
});

export default function TermsPage() {
  return <LegalPage updatedAt={legalUpdatedAt} {...termsContent} />;
}
