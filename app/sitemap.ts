import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicRoutes = [
  "/",
  "/blog",
  "/crear",
  "/crear-cv-online",
  "/curriculum-ats",
  "/curriculum-ats",
  "/curriculum-sin-experiencia",
  "/curriculum-vitae-ejemplo",
  "/curriculum-vitae-pdf",
  "/cv-para-primer-empleo",
  "/generador-de-cv-con-ia",
  "/hacer-cv-con-ia",
  "/modelo-de-curriculum-vitae",
  "/plantilla-harvard",
  "/plantillas-curriculum",
  "/cv-profesional",
  "/cv-para-programadores",
  "/cv-para-medicos",
  "/cv-para-estudiantes",
  "/cv-para-atencion-al-cliente",
  "/cv-atencion-al-cliente-sin-experiencia",
  "/cv-call-center",
  "/cv-para-cajero",
  "/cv-para-cajero-sin-experiencia",
  "/cv-para-vendedor",
  "/cv-para-recepcionista",
  "/cv-para-administrativo",
  "/cv-para-repositor",
  "/cv-para-seguridad",
  "/cv-para-limpieza",
  "/cv-para-operario",
  "/cv-para-mineria",
  "/blog/como-hacer-un-curriculum",
  "/blog/ejemplo-de-curriculum-vitae",
  "/blog/como-hacer-un-curriculum-sin-experiencia",
  "/blog/como-hacer-un-cv-ats",
  "/blog/como-hacer-un-cv-profesional",
  "/blog/como-hacer-un-cv-para-programador",
  "/blog/como-hacer-un-cv-para-trabajo",
  "/blog/como-mejorar-mi-curriculum",
  "/blog/como-adaptar-tu-cv-a-una-vacante",
  "/blog/ejemplo-de-perfil-profesional",
  "/blog/errores-en-el-curriculum",
  "/blog/habilidades-blandas-para-cv",
  "/blog/habilidades-para-curriculum",
  "/blog/perfil-profesional-para-cv",
  "/blog/que-poner-en-un-curriculum",
  "/terminos",
  "/privacidad",
  "/reembolsos",
  "/comparar/cv-harvard-vs-cv-tradicional",
  "/comparar/cv-ats-vs-cv-convencional",
  "/comparar/plantilla-harvard-vs-moderna",
  "/glosario/que-es-ats-curriculum",
  "/glosario/que-es-currriculum-vitae",
  "/glosario/como-escribir-perfil-profesional",
  "/cv-para-vendedor-sin-experiencia",
  "/cv-para-recepcionista-sin-experiencia",
  "/cv-para-administrativo-sin-experiencia",
  "/cv-para-operario-sin-experiencia",
  "/cv-para-seguridad-sin-experiencia",
];

function getChangeFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route.startsWith("/blog/")) return "weekly";
  if (route.startsWith("/comparar/")) return "weekly";
  if (route.startsWith("/glosario/")) return "weekly";
  return "daily";
}

function getPriority(route: string): number {
  if (route === "/" || route === "/crear") return 1;
  if (route.startsWith("/blog/")) return 0.7;
  if (route.startsWith("/comparar/")) return 0.6;
  if (route.startsWith("/glosario/")) return 0.6;
  return 0.8;
}

function getLanguageAlternate(route: string, baseUrl: URL): MetadataRoute.Sitemap[number]["alternates"] {
  const url = new URL(route, baseUrl).toString();
  return {
    languages: {
      es: url,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
    ...getLanguageAlternate(route, baseUrl),
  }));
}