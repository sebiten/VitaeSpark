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
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  socialTitle?: string;
  socialDescription?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  locale = "es_AR",
  languages,
  image = "/logotab.webp",
  imageAlt = "Vitae Spark",
  imageWidth = 1200,
  imageHeight = 630,
  socialTitle,
  socialDescription,
}: MetadataInput): Metadata {
  const baseUrl = getBaseUrl();
  const url = new URL(path, baseUrl);
  const ogImage = new URL(image, baseUrl);
  const shareTitle = socialTitle ?? title;
  const shareDescription = socialDescription ?? description;

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
      title: shareTitle,
      description: shareDescription,
      siteName: "Vitae Spark",
      locale,
      images: [
        {
          url: ogImage,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [ogImage],
    },
  };
}
