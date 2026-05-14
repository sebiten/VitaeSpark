import { LegalPage } from "@/components/legal/LegalPage";
import { legalUpdatedAtEn, privacyContentEn } from "@/lib/legal-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "VitaeSpark privacy policy",
  description:
    "Privacy policy for VitaeSpark covering account data, resume data, payments and external providers.",
  path: "/en/privacy",
  locale: "en_US",
  keywords: ["vitaespark privacy", "resume builder privacy policy"],
  languages: {
    es: "/privacy",
    en: "/en/privacy",
    "x-default": "/privacy",
  },
});

export default function EnglishPrivacyPage() {
  return (
    <LegalPage
      updatedAt={legalUpdatedAtEn}
      language="en"
      {...privacyContentEn}
    />
  );
}
