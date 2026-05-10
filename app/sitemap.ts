import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicRoutes = [
  "/",
  "/blog",
  "/crear-cv-online",
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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  return publicRoutes.map((route) => ({
    url: new URL(route, baseUrl).toString(),
    changeFrequency: route.startsWith("/blog/") ? "weekly" : "daily",
    priority: route === "/" ? 1 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }));
}
