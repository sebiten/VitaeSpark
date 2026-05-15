import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, privacyContent } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politica de privacidad de VitaeSpark",
  description:
    "Politica de privacidad de VitaeSpark sobre datos de cuenta, CVs, pagos y proveedores externos.",
  path: "/privacy",
  keywords: ["privacidad vitae spark", "politica de privacidad vitae spark"],
  languages: {
    es: "/privacidad",
  },
});

export default function PrivacyPage() {
  return <LegalPage updatedAt={legalUpdatedAt} {...privacyContent} />;
}
