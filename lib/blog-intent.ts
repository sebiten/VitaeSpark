export type CreateIntent =
  | "general"
  | "skills"
  | "profile"
  | "first-job"
  | "ats"
  | "job-specific";

export type BlogCtaContent = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  proof: string;
  intent: CreateIntent;
};

const ctaByPath: Record<string, BlogCtaContent> = {
  "/blog/habilidades-para-curriculum": {
    title: "Convertí tus habilidades en un CV listo para enviar",
    description:
      "Usá lo que aprendiste en esta guía dentro de un CV claro, editable y adaptado al puesto que buscás.",
    primaryLabel: "Usar mis habilidades en un CV",
    secondaryHref: "/plantillas-curriculum",
    secondaryLabel: "Ver plantillas",
    proof: "Habilidades conectadas con tareas reales",
    intent: "skills",
  },
  "/blog/perfil-profesional-para-cv": {
    title: "Convertí tu experiencia en un perfil profesional claro",
    description:
      "Cargá tus datos y revisá una versión concreta, editable y coherente con el resto de tu CV.",
    primaryLabel: "Crear mi perfil en el CV",
    secondaryHref: "/hacer-cv-con-ia",
    secondaryLabel: "Ver cómo funciona",
    proof: "Redacción clara, sin frases vacías",
    intent: "profile",
  },
  "/blog/ejemplo-de-perfil-profesional": {
    title: "Usá estos ejemplos como punto de partida",
    description:
      "Transformá tu información real en un perfil profesional que puedas revisar y editar antes de descargar.",
    primaryLabel: "Crear mi perfil en el CV",
    secondaryHref: "/hacer-cv-con-ia",
    secondaryLabel: "Ver cómo funciona",
    proof: "Un perfil adaptado a tu experiencia",
    intent: "profile",
  },
  "/blog/como-hacer-un-curriculum-sin-experiencia": {
    title: "Armá tu primer CV sin empezar de cero",
    description:
      "Ordená estudios, cursos, proyectos y habilidades en un documento serio aunque todavía no tengas experiencia laboral.",
    primaryLabel: "Crear mi CV sin experiencia",
    secondaryHref: "/curriculum-sin-experiencia",
    secondaryLabel: "Ver guía específica",
    proof: "Tus estudios y habilidades también cuentan",
    intent: "first-job",
  },
  "/blog/como-hacer-un-cv-ats": {
    title: "Llevá esta guía a un CV claro para ATS",
    description:
      "Elegí una estructura limpia, completá tus datos y revisá el resultado antes de descargar el PDF final.",
    primaryLabel: "Crear un CV compatible con ATS",
    secondaryHref: "/plantillas-curriculum",
    secondaryLabel: "Ver plantillas",
    proof: "Secciones simples y fáciles de reconocer",
    intent: "ats",
  },
};

const fallbackCta: BlogCtaContent = {
  title: "Aplicá esta guía a tu propio CV",
  description:
    "Ordená tu información, revisá el resultado y editá cada sección antes de descargar el PDF final.",
  primaryLabel: "Empezar mi CV",
  secondaryHref: "/plantillas-curriculum",
  secondaryLabel: "Ver plantillas",
  proof: "Crealo y revisalo gratis",
  intent: "general",
};

export function getBlogCtaContent(path: string): BlogCtaContent {
  const configured = ctaByPath[path];
  if (configured) return configured;

  if (path.startsWith("/cv-") || path.includes("cv-para-")) {
    return {
      ...fallbackCta,
      title: "Creá un CV orientado a este puesto",
      description:
        "Usá la guía como referencia, cargá tu experiencia real y revisá un resultado editable antes de descargar.",
      primaryLabel: "Crear mi CV para este puesto",
      proof: "Contenido orientado al trabajo que buscás",
      intent: "job-specific",
    };
  }

  if (path.includes("habilidad")) {
    return { ...fallbackCta, intent: "skills" };
  }

  if (path.includes("perfil-profesional")) {
    return { ...fallbackCta, intent: "profile" };
  }

  if (path.includes("sin-experiencia") || path.includes("primer-empleo")) {
    return { ...fallbackCta, intent: "first-job" };
  }

  if (path.includes("ats")) {
    return { ...fallbackCta, intent: "ats" };
  }

  return fallbackCta;
}

export function getBlogCreateHref(path: string) {
  const { intent } = getBlogCtaContent(path);
  return `/crear?intent=${intent}`;
}

export function normalizeCreateIntent(value?: string | null): CreateIntent {
  switch (value) {
    case "skills":
    case "profile":
    case "first-job":
    case "ats":
    case "job-specific":
      return value;
    default:
      return "general";
  }
}

export function getCreateIntentMessage(intent: CreateIntent) {
  switch (intent) {
    case "skills":
      return {
        title: "Venís de una guía de habilidades",
        description:
          "En el último paso vas a poder agregar habilidades y conectarlas con el puesto que buscás.",
      };
    case "profile":
      return {
        title: "Vamos a trabajar tu perfil profesional",
        description:
          "En el segundo paso cargás tu información y la convertimos en una presentación clara y editable.",
      };
    case "first-job":
      return {
        title: "Podés crear un buen CV sin experiencia laboral",
        description:
          "Prepará estudios, cursos, proyectos y habilidades: el formulario te guía para ordenarlos.",
      };
    case "ats":
      return {
        title: "Buscás un formato claro para ATS",
        description:
          "Elegí una plantilla simple y completá las secciones con información concreta y fácil de reconocer.",
      };
    case "job-specific":
      return {
        title: "Orientá el CV al puesto que buscás",
        description:
          "Usá ejemplos reales de tareas, herramientas y resultados para que el contenido no quede genérico.",
      };
    default:
      return null;
  }
}
