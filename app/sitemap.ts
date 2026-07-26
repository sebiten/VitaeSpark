import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";
import { publicSeoRoutes } from "@/lib/seo-routes";

export const dynamic = "force-static";

function getChangeFrequency(
  route: string,
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route.startsWith("/blog/")) return "weekly";
  if (route.startsWith("/comparar/")) return "weekly";
  if (route.startsWith("/glosario/")) return "weekly";
  if (route.startsWith("/herramientas/")) return "weekly";
  return "daily";
}

function getPriority(route: string): number {
  if (route === "/") return 1;
  if (route.startsWith("/blog/")) return 0.7;
  if (route.startsWith("/comparar/")) return 0.6;
  if (route.startsWith("/glosario/")) return 0.6;
  if (route.startsWith("/herramientas/")) return 0.85;
  return 0.8;
}

function getLanguageAlternate(
  route: string,
  baseUrl: URL,
): MetadataRoute.Sitemap[number]["alternates"] {
  const url = new URL(route, baseUrl).toString();
  return {
    languages: {
      es: url,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicSeoRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
    ...getLanguageAlternate(route, baseUrl),
  }));
}
