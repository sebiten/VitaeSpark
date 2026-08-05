import type { Metadata } from "next";
import { FacebookOfferPage } from "@/components/FacebookOfferPage";
import { buildMetadata, getBaseUrl } from "@/lib/seo";

const campaignMetadata = buildMetadata({
  title: "CV profesional editable por $1.999 ARS",
  description:
    "Creá tu CV con IA, mirá el resultado antes de pagar y descargá el PDF sin marca de agua. Pago único con Mercado Pago.",
  path: "/cv-listo-argentina",
  keywords: [],
  image: "/social/cv-oferta-ars-og.png",
  imageAlt: "Crear un CV profesional editable por $1.999 ARS con VitaeSpark",
  socialTitle: "Tu CV profesional por $1.999 ARS · Pago único",
  socialDescription:
    "Rápido, editable y sin registro para empezar. Mirá el resultado antes de pagar.",
});

export const metadata: Metadata = {
  ...campaignMetadata,
  alternates: { canonical: getBaseUrl() },
  robots: { index: false, follow: true },
};

export default function ArgentinaFacebookOfferPage() {
  return <FacebookOfferPage market="argentina" />;
}
