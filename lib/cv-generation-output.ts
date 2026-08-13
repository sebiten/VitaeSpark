type CvGenerationFallback = {
  nombre: string;
  puesto: string;
  contacto: string;
  sobreMi: string;
  experiencia: string;
  formacion?: string;
  habilidades: string;
  idiomas?: string;
  informacionAdicional?: string;
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : {};
}

function text(value: unknown, fallback = "", max = 240) {
  const candidate = typeof value === "string" ? value : fallback;
  return candidate.replace(/\s+/g, " ").trim().slice(0, max);
}

function sourceList(value: unknown, fallback = "") {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") return value.split(/[\n;,]+/);
  return fallback.split(/[\n;,]+/);
}

function textList(
  value: unknown,
  fallback: string,
  maxItems: number,
  maxLength: number,
) {
  return sourceList(value, fallback)
    .map((item) => text(item, "", maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function normalizeExperience(value: unknown, fallback: CvGenerationFallback) {
  const source = Array.isArray(value) ? value : [];
  const normalized = source
    .map((entry) => {
      const item = asRecord(entry);
      const logros = textList(item.logros, "", 4, 320);
      return {
        cargo: text(item.cargo, fallback.puesto, 140),
        empresa: text(item.empresa, "", 140),
        fechas: text(item.fechas, "", 80),
        ubicacion: text(item.ubicacion, "", 120),
        logros,
      };
    })
    .filter((item) => item.cargo && item.logros.length > 0)
    .slice(0, 8);

  if (normalized.length > 0) return normalized;

  return [
    {
      cargo: text(fallback.puesto, "Experiencia relevante", 140),
      empresa: "",
      fechas: "",
      ubicacion: "",
      logros: textList(fallback.experiencia, fallback.experiencia, 3, 320),
    },
  ];
}

function normalizeEducation(value: unknown, fallback = "") {
  const source = Array.isArray(value) ? value : [];
  const normalized = source
    .map((entry) => {
      const item = asRecord(entry);
      return {
        institucion: text(item.institucion, "", 180),
        titulo: text(item.titulo, "", 180),
        fechas: text(item.fechas, "", 80),
        ubicacion: text(item.ubicacion, "", 120),
      };
    })
    .filter((item) => item.institucion || item.titulo)
    .slice(0, 6);

  if (normalized.length > 0 || !fallback.trim()) return normalized;

  return [
    {
      institucion: "",
      titulo: text(fallback, "", 180),
      fechas: "",
      ubicacion: "",
    },
  ];
}

export function normalizeCvGenerationOutput(
  value: unknown,
  fallback: CvGenerationFallback,
) {
  const result = asRecord(value);

  return {
    nombre: text(result.nombre, fallback.nombre, 120),
    puesto: text(result.puesto, fallback.puesto, 140),
    sobreMi: text(result.sobreMi, fallback.sobreMi, 900),
    contacto: textList(result.contacto, fallback.contacto, 8, 240),
    experiencia: normalizeExperience(result.experiencia, fallback),
    formacion: normalizeEducation(result.formacion, fallback.formacion),
    habilidades: textList(result.habilidades, fallback.habilidades, 32, 80),
    idiomas: textList(result.idiomas, fallback.idiomas ?? "", 8, 80),
    informacionAdicional: textList(
      result.informacionAdicional,
      fallback.informacionAdicional ?? "",
      8,
      240,
    ),
  };
}
