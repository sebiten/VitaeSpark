export const CV_TEMPLATE_IDS = [
  "elegance",
  "modern-ats",
  "operative-ats",
  "harvard",
  "blue",
  "purple",
  "green",
] as const;

export type CvTemplateId = (typeof CV_TEMPLATE_IDS)[number];

export type CvTemplateDefinition = {
  id: CvTemplateId;
  name: string;
  shortName: string;
  description: string;
  category: string;
  features: readonly string[];
  bestFor: readonly string[];
  image: string;
  accent: string;
  allowsPhoto: boolean;
  recommended?: boolean;
};

export const CV_TEMPLATES: readonly CvTemplateDefinition[] = [
  {
    id: "elegance",
    name: "Elegancia",
    shortName: "Elegante",
    description: "Equilibrada y visual para perfiles versatiles.",
    category: "Versatil",
    features: ["Con foto", "ATS", "Editable"],
    bestFor: ["Ventas", "RRHH", "Atencion", "Marketing"],
    image: "/elegance-good.webp",
    accent: "#2563EB",
    allowsPhoto: true,
    recommended: true,
  },
  {
    id: "modern-ats",
    name: "ATS Moderna",
    shortName: "ATS Moderna",
    description: "Una columna, sin foto y lectura inmediata.",
    category: "ATS",
    features: ["Sin foto", "1 columna", "ATS"],
    bestFor: ["Administracion", "Tecnologia", "Salud", "Primer empleo"],
    image: "/modern-ats.png",
    accent: "#315A72",
    allowsPhoto: false,
  },
  {
    id: "operative-ats",
    name: "Operativa ATS",
    shortName: "Operativa ATS",
    description: "Prioriza experiencia, licencias y disponibilidad.",
    category: "Oficios",
    features: ["Sin foto", "Certificaciones", "ATS"],
    bestFor: ["Mineria", "Operarios", "Seguridad", "Logistica"],
    image: "/operative-ats.png",
    accent: "#1E6650",
    allowsPhoto: false,
  },
  {
    id: "harvard",
    name: "Harvard",
    shortName: "Harvard",
    description: "Clasica y sobria para procesos formales.",
    category: "Formal",
    features: ["Sin foto", "Tradicional", "ATS"],
    bestFor: ["Derecho", "Finanzas", "Consultoria", "Academico"],
    image: "/harvard.webp",
    accent: "#D4D4D8",
    allowsPhoto: false,
  },
  {
    id: "blue",
    name: "Azul Corporativo",
    shortName: "Azul Corporativo",
    description: "Estructura visual para empresas tradicionales.",
    category: "Corporativo",
    features: ["Con foto", "2 columnas", "Editable"],
    bestFor: ["Banca", "Seguros", "Logistica", "Comercial"],
    image: "/blue.webp",
    accent: "#1E40AF",
    allowsPhoto: true,
  },
  {
    id: "purple",
    name: "Purpura Pro",
    shortName: "Purpura Pro",
    description: "Identidad visual para perfiles contemporaneos.",
    category: "Moderna",
    features: ["Con foto", "2 columnas", "Editable"],
    bestFor: ["Tecnologia", "Startups", "Diseno", "Marketing"],
    image: "/purple-hero.webp",
    accent: "#8B5CF6",
    allowsPhoto: true,
  },
  {
    id: "green",
    name: "Verde Energia",
    shortName: "Verde Energia",
    description: "Dos columnas con una presencia mas operativa.",
    category: "Servicios",
    features: ["Con foto", "2 columnas", "Editable"],
    bestFor: ["Comercio", "Servicios", "Gastronomia", "Oficios"],
    image: "/green.webp",
    accent: "#15803D",
    allowsPhoto: true,
  },
] as const;

export function isCvTemplateId(value: string): value is CvTemplateId {
  return CV_TEMPLATE_IDS.includes(value as CvTemplateId);
}

export function getCvTemplate(value?: string | null) {
  return (
    CV_TEMPLATES.find((template) => template.id === value) ?? CV_TEMPLATES[0]
  );
}

export function templateAllowsPhoto(value?: string | null) {
  return getCvTemplate(value).allowsPhoto;
}
