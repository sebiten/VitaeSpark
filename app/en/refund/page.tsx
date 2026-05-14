import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAtEn, refundContentEn } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "VitaeSpark refund policy",
  description:
    "Refund policy for VitaeSpark digital resume purchases and unlock requests.",
  path: "/en/refund",
  locale: "en_US",
  keywords: ["vitaespark refund policy", "resume builder refund"],
  languages: {
    es: "/refund",
    en: "/en/refund",
    "x-default": "/refund",
  },
});

export default function EnglishRefundPage() {
  return (
    <LegalPage
      updatedAt={legalUpdatedAtEn}
      language="en"
      {...refundContentEn}
    />
  );
}
