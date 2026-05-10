import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { getBaseUrl } from "@/lib/seo";

import "./globals.css";

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

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Vitae Spark | Crear curriculum online con IA",
    template: "%s | Vitae Spark",
  },
  description:
    "Crea tu curriculum vitae online con inteligencia artificial, plantillas profesionales y enfoque ATS para conseguir mas entrevistas.",
  applicationName: "Vitae Spark",
  generator: "Next.js 15 - App Router",
  keywords: [
    "crear curriculum online",
    "crear cv online",
    "hacer curriculum vitae",
    "curriculum ats",
    "curriculum profesional",
    "ia para cv",
    "crear cv con ia",
    "plantilla harvard",
    "curriculum sin experiencia",
    "cv online",
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
  manifest: "/favicons/manifest.json",
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Vitae Spark | Crea curriculum online optimizado para ATS",
    description:
      "Usa inteligencia artificial para crear CVs atractivos y optimizados para superar filtros ATS y destacar ante reclutadores.",
    siteName: "Vitae Spark",
    locale: "es_AR",
    images: [
      {
        url: `${baseUrl.href}/logotab.webp`,
        width: 1200,
        height: 630,
        alt: "Vitae Spark - Generador inteligente de curriculum con IA",
      },
      {
        url: `${baseUrl.href}/purple-hero.webp`,
        width: 1200,
        height: 630,
        alt: "Vitae Spark - Ejemplo de curriculum con plantilla moderna",
      },
      {
        url: `${baseUrl.href}/elegance-good.webp`,
        width: 1200,
        height: 630,
        alt: "Vitae Spark - Ejemplo de curriculum profesional elegante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitae Spark | Crea CVs efectivos con IA",
    description:
      "Genera tu curriculum profesional optimizado para filtros ATS con inteligencia artificial.",
    images: [`${baseUrl.href}/logotab.webp`],
    creator: "@vitae.spark",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/favicons/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/favicons/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vitae Spark",
              url: baseUrl.href,
              logo: `${baseUrl.href}/logoreal.webp`,
              description:
                "Herramienta web para crear curriculum vitae online con IA, plantillas profesionales y enfoque ATS.",
              email: "soporte@vitaespark.com",
              sameAs: [
                "https://www.instagram.com/vitae.spark/",
                "https://www.facebook.com/profile.php?id=61572162699853",
                "https://www.tiktok.com/@vitaesapark",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "soporte",
                email: "soporte@vitaespark.com",
                availableLanguage: "Spanish",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: baseUrl.href,
              name: "Vitae Spark",
              alternateName: "Creador de curriculum online",
              description:
                "Genera curriculum vitae online con IA, optimizado para ATS y reclutadores.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Vitae Spark",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: baseUrl.href,
              description:
                "Herramienta web para crear curriculum vitae online con IA, plantillas profesionales y enfoque ATS.",
              publisher: {
                "@type": "Organization",
                name: "Vitae Spark",
                url: baseUrl.href,
                logo: {
                  "@type": "ImageObject",
                  url: `${baseUrl.href}/logoreal.webp`,
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-popover-foreground antialiased flex min-h-screen flex-col`}
      >
        <Navbar />
        <main className="h-full flex-grow">{children}</main>
        <Toaster />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
