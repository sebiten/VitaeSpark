// app/layout.tsx (Next.js 15+)
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";

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
    default: "Vitae Spark | Generador de CVs IA",
    template: "%s | Vitae Spark",
  },
  description:
    "Crea currículums profesionales, optimizados para ATS, con inteligencia artificial. Destaca tu talento y consigue más entrevistas.",
  applicationName: "Vitae Spark",
  generator: "Next.js 15 – App Router",
  keywords: [
    "generador de CV",
    "currículum ATS",
    "resume builder",
    "inteligencia artificial",
    "IA",
    "empleo",
    "busqueda laboral",
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
    title: "Vitae Spark | Generador de CVs con IA",
    description:
      "Genera tu currículum en segundos, optimizado para superar los filtros ATS y captar la atención de los reclutadores.",
    siteName: "Vitae Spark",
    images: [
      {
        url: "/logotab.webp", // TODO: reemplaza o apunta a tu imagen estática
        width: 1200,
        height: 630,
        alt: "Vitae Spark – Generador de CVs IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitae Spark | Generador de CVs con IA ",
    description:
      "Crea currículums profesionales, optimizados para ATS, en cuestión de segundos.",
    images: ["/logotab.webp"], // TODO
    creator: "@abelardo.web", // TODO
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
    <html lang="es">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17053866569"
        ></script>                  
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17053866569');
            `,
          }}
        />
        <Script
          src="https://sdk.mercadopago.com/js/v2"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-popover-foreground antialiased `}
      >
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
