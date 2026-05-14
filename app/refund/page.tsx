import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAt, refundContent } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Politica de reembolsos de VitaeSpark",
  description:
    "Politica de reembolsos de VitaeSpark para compras digitales y desbloqueo de CVs profesionales.",
  path: "/refund",
  keywords: ["reembolsos vitae spark", "politica de reembolsos vitae spark"],
  languages: {
    es: "/refund",
    en: "/en/refund",
    "x-default": "/refund",
  },
});

export default function RefundPage() {
  return <LegalPage updatedAt={legalUpdatedAt} {...refundContent} />;
}
