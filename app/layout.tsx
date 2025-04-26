// app/layout.tsx (Next.js 15+)
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

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

/** URL base de la aplicación — cámbiala si usas otro dominio  */
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
        url: "/api/og?title=Vitae%20Spark", // TODO: reemplaza o apunta a tu imagen estática
        width: 1200,
        height: 630,
        alt: "Vitae Spark – Generador de CVs IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitae Spark | Generador de CVs con IA",
    description:
      "Crea currículums profesionales, optimizados para ATS, en cuestión de segundos.",
    images: ["/api/og?title=Vitae%20Spark"], // TODO
    creator: "@tu_handle", // TODO
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000", // adapta al color principal de tu UI
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: metadata.themeColor as string,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
