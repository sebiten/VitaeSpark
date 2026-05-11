import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  ClipboardCheck,
  Code2,
  FileText,
  GraduationCap,
  HardHat,
  Headset,
  Landmark,
  Layers3,
  ListChecks,
  PenLine,
  Pickaxe,
  SearchCheck,
  Shield,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Target,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ListChecks,
  BookOpen,
  FileText,
  BriefcaseBusiness,
  SearchCheck,
  BadgeCheck,
  UserRound,
  AlertTriangle,
  Sparkles,
  Layers3,
  PenLine,
  ClipboardCheck,
  GraduationCap,
  Target,
  Code2,
  Pickaxe,
  Users,
  Headset,
  HardHat,
  ShoppingCart,
  Shield,
  Stethoscope,
  Landmark,
};

export type BlogPost = {
  href: string;
  title: string;
  description: string;
  category: string;
  iconKey: string;
};

export const blogPosts = [
  {
    href: "/blog/que-poner-en-un-curriculum",
    title: "Que poner en un curriculum",
    description:
      "Guia clara para elegir el contenido correcto y armar un CV mas profesional.",
    category: "Contenido",
    iconKey: "ListChecks",
  },
  {
    href: "/blog/como-hacer-un-curriculum",
    title: "Como hacer un curriculum paso a paso",
    description:
      "Una guia base para estructurar tu CV y mejorar su claridad desde el principio.",
    category: "Guia base",
    iconKey: "BookOpen",
  },
  {
    href: "/blog/ejemplo-de-curriculum-vitae",
    title: "Ejemplo de curriculum vitae",
    description:
      "Aprende a usar ejemplos de CV como referencia sin terminar con un documento generico.",
    category: "Ejemplos",
    iconKey: "FileText",
  },
  {
    href: "/blog/como-hacer-un-cv-para-trabajo",
    title: "Como hacer un CV para trabajo",
    description:
      "Aprende como orientar tu curriculum a vacantes reales y postularte mejor.",
    category: "Postulacion",
    iconKey: "BriefcaseBusiness",
  },
  {
    href: "/blog/como-hacer-un-cv-ats",
    title: "Como hacer un CV ATS",
    description:
      "Consejos practicos para pasar mejor filtros automatizados y procesos actuales.",
    category: "ATS",
    iconKey: "SearchCheck",
  },
  {
    href: "/blog/habilidades-para-curriculum",
    title: "Habilidades para curriculum",
    description:
      "Como elegir habilidades relevantes y evitar listas genericas que no aportan.",
    category: "Habilidades",
    iconKey: "BadgeCheck",
  },
  {
    href: "/blog/habilidades-blandas-para-cv",
    title: "Habilidades blandas para CV",
    description:
      "Aprende como usarlas sin sonar generico ni vacio.",
    category: "Habilidades",
    iconKey: "UserRound",
  },
  {
    href: "/blog/errores-en-el-curriculum",
    title: "Errores en el curriculum",
    description:
      "Detecta fallos comunes que pueden hacerte perder entrevistas antes de empezar.",
    category: "Errores",
    iconKey: "AlertTriangle",
  },
  {
    href: "/blog/como-mejorar-mi-curriculum",
    title: "Como mejorar mi curriculum",
    description:
      "Ideas practicas para hacer tu CV mas claro, mas fuerte y mas util.",
    category: "Mejora",
    iconKey: "Sparkles",
  },
  {
    href: "/blog/como-hacer-un-cv-profesional",
    title: "Como hacer un CV profesional",
    description:
      "Descubre que cambios vuelven mas profesional tu CV sin hacerlo artificial.",
    category: "Profesional",
    iconKey: "Layers3",
  },
  {
    href: "/blog/perfil-profesional-para-cv",
    title: "Perfil profesional para CV",
    description:
      "Aprende a escribir un resumen profesional breve pero convincente.",
    category: "Perfil",
    iconKey: "PenLine",
  },
  {
    href: "/blog/ejemplo-de-perfil-profesional",
    title: "Ejemplo de perfil profesional",
    description:
      "Toma una referencia clara para adaptar tu resumen profesional.",
    category: "Ejemplos",
    iconKey: "ClipboardCheck",
  },
  {
    href: "/blog/como-hacer-un-curriculum-sin-experiencia",
    title: "Como hacer un curriculum sin experiencia",
    description:
      "Guia para mostrar potencial aunque todavia no tengas historial laboral fuerte.",
    category: "Primer empleo",
    iconKey: "GraduationCap",
  },
  {
    href: "/blog/como-adaptar-tu-cv-a-una-vacante",
    title: "Como adaptar tu CV a una vacante",
    description:
      "Ajusta tu CV a ofertas concretas sin rehacerlo por completo.",
    category: "Vacantes",
    iconKey: "Target",
  },
  {
    href: "/blog/como-hacer-un-cv-para-programador",
    title: "Como hacer un CV para programador",
    description:
      "Destaca stack, proyectos y criterio tecnico sin caer en listas vacias.",
    category: "Tecnologia",
    iconKey: "Code2",
  },
] satisfies BlogPost[];