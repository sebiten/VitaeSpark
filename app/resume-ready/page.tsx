import type { Metadata } from "next";
import { FacebookOfferPage } from "@/components/FacebookOfferPage";
import { buildMetadata, getBaseUrl } from "@/lib/seo";

const campaignMetadata = buildMetadata({
  title: "Editable AI resume for US$2.99",
  description:
    "Create your resume, preview the complete result, and download a watermark-free PDF. One-time international payment with PayPal.",
  path: "/resume-ready",
  keywords: [],
  locale: "en_US",
  image: "/social/cv-offer-usd-og.png",
  imageAlt: "Create an editable professional resume for US$2.99 with VitaeSpark",
  socialTitle: "Your professional resume for US$2.99 · One-time payment",
  socialDescription:
    "Fast, editable, and no sign-up required to start. Preview the result before paying.",
});

export const metadata: Metadata = {
  ...campaignMetadata,
  alternates: { canonical: getBaseUrl() },
  robots: { index: false, follow: true },
};

export default function InternationalFacebookOfferPage() {
  return <FacebookOfferPage market="international" />;
}
