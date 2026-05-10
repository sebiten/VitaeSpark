import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, termsContent } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Términos de Servicio de VitaeSpark",
  description:
    "Términos de servicio de VitaeSpark para uso de la plataforma, pagos y generación de CVs digitales.",
  path: "/terms",
  keywords: ["terminos vitae spark", "terminos vitae spark cv"],
});

export default function TermsPage() {
  return <LegalPage updatedAt={legalUpdatedAt} {...termsContent} />;
}
