import type { Metadata } from "next";

const fallbackBaseUrl = "https://vitaespark.com";

export function getBaseUrl() {
  return new URL(
    process.env.NEXT_PUBLIC_BASE_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      fallbackBaseUrl
  );
}

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
  type?: "website" | "article";
  locale?: string;
  languages?: Record<string, string>;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  locale = "es_AR",
  languages,
}: MetadataInput): Metadata {
  const baseUrl = getBaseUrl();
  const url = new URL(path, baseUrl);
  const ogImage = new URL("/logotab.webp", baseUrl);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "Vitae Spark",
      locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Vitae Spark",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
