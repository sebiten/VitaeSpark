// app/layout.tsx (Next.js 15+) – SEO para Vitae Spark SIN Google Ads

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = new URL(
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://vitaespark.com"
);

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Vitae Spark | Generador de CV con IA, optimizado para ATS",
    template: "%s | Vitae Spark",
  },
  description:
    "Crea currículums profesionales en segundos con inteligencia artificial. Optimizado para filtros ATS, aumenta tus oportunidades laborales y consigue más entrevistas.",
  applicationName: "Vitae Spark",
  generator: "Next.js 15 – App Router",
  keywords: [
    "generador de CV",
    "currículum ATS",
    "crear currículum gratis",
    "currículum profesional",
    "resume builder",
    "inteligencia artificial CV",
    "IA para empleo",
    "optimizar CV ATS",
    "busqueda laboral",
    "crear cv",
    "ia para cv",
    "crear cv gratis",
    "crear cv online",
    "cv ya",
    "cv para medicos",
    "cv para programadores",
    "cv para barberos",
    "cv gratis",
    "CV online",
    "CV digital",
    "plantilla harvard",
  ],
  authors: [{ name: "Vitae Spark", url: baseUrl.href }],
  creator: "Vitae Spark",
  publisher: "Vitae Spark",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: baseUrl.href,
  },
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Vitae Spark | Crea currículums profesionales optimizados para ATS",
    description:
      "Usa inteligencia artificial para crear CVs atractivos y optimizados para superar filtros automáticos y destacar ante reclutadores.",
    siteName: "Vitae Spark",
    images: [
      {
        url: `${baseUrl.href}/logotab.webp`,
        width: 1200,
        height: 630,
        alt: "Vitae Spark – Generador Inteligente de Currículums con IA",
      },
      {
        url: `${baseUrl.href}/harvard.webp`,
        alt: "Vitae Spark – Plantilla recomendada por Harvard",
      },
      {
        url: `${baseUrl.href}/banner-ig.webp`,
        alt: "Vitae Spark – Generador Inteligente de Currículums con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitae Spark | Crea CVs efectivos con IA",
    description:
      "Genera tu currículum profesional optimizado para filtros ATS en segundos con inteligencia artificial.",
    images: [`${baseUrl.href}/logotab.webp`],
    creator: "@vitae.spark",
  },
  icons: {
    icon: "/logochispa.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        {/* JSON-LD: Datos estructurados SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: baseUrl.href,
              name: "Vitae Spark",
              alternateName: "Generador de CV Inteligente",
              description:
                "Genera currículums profesionales con IA optimizados para ATS y reclutadores.",
            }),
          }}
        />

        {/* MercadoPago SDK */}
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-popover-foreground antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow h-full">{children}</main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
