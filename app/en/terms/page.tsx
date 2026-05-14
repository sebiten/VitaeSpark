import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAtEn, termsContentEn } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "VitaeSpark terms of service",
  description:
    "Terms of service for VitaeSpark, including platform usage, payments and digital resume delivery.",
  path: "/en/terms",
  locale: "en_US",
  keywords: ["vitaespark terms", "resume builder terms"],
  languages: {
    es: "/terms",
    en: "/en/terms",
    "x-default": "/terms",
  },
});

export default function EnglishTermsPage() {
  return (
    <LegalPage
      updatedAt={legalUpdatedAtEn}
      language="en"
      {...termsContentEn}
    />
  );
}
