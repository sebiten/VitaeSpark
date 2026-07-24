import type { DatosCVFormulario } from "@/lib/types/cv";

export const SKILLS_TOOL_PATH =
  "/herramientas/generador-habilidades-cv";
export const SKILLS_TOOL_TRANSFER_KEY =
  "vitaespark_skills_tool_transfer";
export const SKILLS_TOOL_TRANSFER_VERSION = 1;
export const SKILLS_TOOL_TRANSFER_TTL_MS = 2 * 60 * 60 * 1000;
export const MAX_SELECTED_SKILLS = 10;
export const INITIAL_SELECTED_SKILLS = 8;

export const experienceLevels = [
  { value: "sin-experiencia", label: "Sin experiencia" },
  { value: "inicial", label: "Experiencia inicial" },
  { value: "con-experiencia", label: "Con experiencia" },
] as const;

export type SkillsExperienceLevel =
  (typeof experienceLevels)[number]["value"];

type SkillsRole = {
  id: string;
  label: string;
  technicalSkills: string[];
  transferableSkills: string[];
};

export type SkillsToolResult = {
  technicalSkills: string[];
  transferableSkills: string[];
  summary: string;
};

export type SkillsToolTransfer = {
  version: typeof SKILLS_TOOL_TRANSFER_VERSION;
  expiresAt: number;
  role: string;
  skills: string[];
};

export const skillsRoles: SkillsRole[] = [
  {
    id: "administrativo",
    label: "Administración",
    technicalSkills: [
      "Excel y planillas de cálculo",
      "Carga y actualización de datos",
      "Gestión de documentación",
      "Elaboración de reportes",
      "Correo electrónico y agenda",
      "Facturación y comprobantes",
    ],
    transferableSkills: [
      "Organización de prioridades",
      "Atención al detalle",
      "Comunicación escrita",
      "Seguimiento de tareas",
    ],
  },
  {
    id: "atencion-cliente",
    label: "Atención al cliente",
    technicalSkills: [
      "Atención presencial y digital",
      "Gestión de consultas y reclamos",
      "Registro de interacciones",
      "Seguimiento de casos",
      "Uso de CRM",
      "Información sobre productos y servicios",
    ],
    transferableSkills: [
      "Escucha activa",
      "Comunicación clara",
      "Resolución de problemas",
      "Manejo de situaciones difíciles",
    ],
  },
  {
    id: "call-center",
    label: "Call center",
    technicalSkills: [
      "Atención telefónica",
      "Gestión de llamadas entrantes y salientes",
      "Registro de gestiones en CRM",
      "Seguimiento de casos",
      "Cumplimiento de guiones y protocolos",
      "Derivación de consultas",
    ],
    transferableSkills: [
      "Comunicación verbal",
      "Escucha activa",
      "Manejo de objeciones",
      "Organización del tiempo",
    ],
  },
  {
    id: "cajero",
    label: "Caja y comercio",
    technicalSkills: [
      "Manejo de caja",
      "Cobros con efectivo y medios electrónicos",
      "Apertura y cierre de caja",
      "Control de comprobantes",
      "Reposición en salón",
      "Atención al cliente",
    ],
    transferableSkills: [
      "Atención al detalle",
      "Agilidad operativa",
      "Comunicación clara",
      "Organización del puesto",
    ],
  },
  {
    id: "operario",
    label: "Operario de producción",
    technicalSkills: [
      "Operación de línea de producción",
      "Control visual de calidad",
      "Preparación de materiales",
      "Orden y limpieza del sector",
      "Cumplimiento de normas de seguridad",
      "Registro de producción",
    ],
    transferableSkills: [
      "Trabajo por turnos",
      "Coordinación con el equipo",
      "Seguimiento de procedimientos",
      "Atención al detalle",
    ],
  },
  {
    id: "mineria",
    label: "Minería",
    technicalSkills: [
      "Cumplimiento de normas de seguridad",
      "Uso de elementos de protección personal",
      "Inspección del área de trabajo",
      "Apoyo en tareas operativas",
      "Reporte de condiciones inseguras",
      "Trabajo con procedimientos y permisos",
    ],
    transferableSkills: [
      "Adaptación a turnos y roster",
      "Trabajo en equipo",
      "Comunicación de riesgos",
      "Disciplina operativa",
    ],
  },
  {
    id: "limpieza",
    label: "Limpieza",
    technicalSkills: [
      "Limpieza y desinfección de espacios",
      "Uso seguro de productos de limpieza",
      "Mantenimiento de áreas comunes",
      "Reposición de insumos",
      "Clasificación y retiro de residuos",
      "Cumplimiento de rutinas de higiene",
    ],
    transferableSkills: [
      "Organización del trabajo",
      "Atención al detalle",
      "Administración del tiempo",
      "Seguimiento de protocolos",
    ],
  },
  {
    id: "seguridad",
    label: "Seguridad",
    technicalSkills: [
      "Control de accesos",
      "Registro de ingresos y novedades",
      "Rondas preventivas",
      "Monitoreo de instalaciones",
      "Aplicación de protocolos de seguridad",
      "Comunicación de incidentes",
    ],
    transferableSkills: [
      "Observación y atención sostenida",
      "Comunicación clara",
      "Manejo de situaciones imprevistas",
      "Cumplimiento de procedimientos",
    ],
  },
  {
    id: "logistica",
    label: "Reposición y logística",
    technicalSkills: [
      "Reposición y frenteo de mercadería",
      "Control de stock",
      "Carga y descarga",
      "Preparación de pedidos",
      "Control de vencimientos",
      "Orden de depósito",
    ],
    transferableSkills: [
      "Organización de tareas",
      "Agilidad operativa",
      "Coordinación con el equipo",
      "Atención al detalle",
    ],
  },
  {
    id: "recepcionista",
    label: "Recepción",
    technicalSkills: [
      "Recepción de visitas",
      "Atención telefónica y por correo",
      "Gestión de agenda y turnos",
      "Derivación de consultas",
      "Registro y archivo de documentación",
      "Coordinación de salas y reuniones",
    ],
    transferableSkills: [
      "Comunicación cordial",
      "Organización de prioridades",
      "Atención al detalle",
      "Manejo de múltiples consultas",
    ],
  },
  {
    id: "ventas",
    label: "Ventas",
    technicalSkills: [
      "Asesoramiento comercial",
      "Detección de necesidades",
      "Seguimiento de oportunidades",
      "Registro de ventas en CRM",
      "Presentación de productos",
      "Gestión de posventa",
    ],
    transferableSkills: [
      "Comunicación persuasiva",
      "Manejo de objeciones",
      "Orientación a objetivos",
      "Construcción de relaciones",
    ],
  },
  {
    id: "primer-empleo",
    label: "Primer empleo",
    technicalSkills: [
      "Herramientas digitales básicas",
      "Correo electrónico y documentos",
      "Registro ordenado de información",
      "Seguimiento de instrucciones",
      "Preparación de tareas y materiales",
      "Uso responsable de recursos",
    ],
    transferableSkills: [
      "Aprendizaje de procedimientos",
      "Comunicación clara",
      "Organización de prioridades",
      "Colaboración con el equipo",
    ],
  },
  {
    id: "otro",
    label: "Otro puesto",
    technicalSkills: [
      "Manejo de herramientas del puesto",
      "Registro de información",
      "Seguimiento de procesos",
      "Control de calidad del trabajo",
      "Documentación de tareas",
      "Cumplimiento de procedimientos",
    ],
    transferableSkills: [
      "Organización de prioridades",
      "Comunicación clara",
      "Resolución de problemas",
      "Aprendizaje de procedimientos",
    ],
  },
];

export function getSkillsRole(roleId: string) {
  return (
    skillsRoles.find((role) => role.id === roleId) ??
    skillsRoles[skillsRoles.length - 1]
  );
}

export function getSkillsRoleLabel(roleId: string, customRole?: string) {
  const role = getSkillsRole(roleId);
  if (role.id === "otro") {
    return customRole?.trim().slice(0, 80) || role.label;
  }
  return role.label;
}

export function generateSkillSuggestions({
  roleId,
  customRole,
  experienceLevel,
}: {
  roleId: string;
  customRole?: string;
  experienceLevel: SkillsExperienceLevel;
}): SkillsToolResult {
  const role = getSkillsRole(roleId);
  const roleLabel = getSkillsRoleLabel(roleId, customRole);
  const experienceSkill =
    experienceLevel === "sin-experiencia"
      ? "Aprendizaje de procedimientos"
      : experienceLevel === "con-experiencia"
        ? "Coordinación de tareas"
        : "Adaptación a procedimientos";

  const technicalSkills = normalizeSkills(role.technicalSkills).slice(0, 6);
  const transferableSkills = normalizeSkills([
    ...role.transferableSkills,
    experienceSkill,
  ]).slice(0, 5);

  return {
    technicalSkills,
    transferableSkills,
    summary: `Selección orientada a ${roleLabel.toLowerCase()}, equilibrando tareas concretas y capacidades transferibles.`,
  };
}

export function normalizeSkills(skills: string[], limit = 12) {
  const seen = new Set<string>();

  return skills
    .map((skill) => skill.replace(/\s+/g, " ").trim().slice(0, 80))
    .filter(Boolean)
    .filter((skill) => {
      const key = normalizeComparable(skill);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

export function selectInitialSkills(result: SkillsToolResult) {
  return normalizeSkills([
    ...result.technicalSkills,
    ...result.transferableSkills,
  ]).slice(0, INITIAL_SELECTED_SKILLS);
}

export function createSkillsToolTransfer({
  role,
  skills,
  now = Date.now(),
}: {
  role: string;
  skills: string[];
  now?: number;
}): SkillsToolTransfer {
  return {
    version: SKILLS_TOOL_TRANSFER_VERSION,
    expiresAt: now + SKILLS_TOOL_TRANSFER_TTL_MS,
    role: role.replace(/\s+/g, " ").trim().slice(0, 80),
    skills: normalizeSkills(skills, MAX_SELECTED_SKILLS),
  };
}

export function parseSkillsToolTransfer(
  raw: string | null,
  now = Date.now(),
): SkillsToolTransfer | null {
  if (!raw) return null;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!isRecord(value)) return null;
  if (value.version !== SKILLS_TOOL_TRANSFER_VERSION) return null;
  if (typeof value.expiresAt !== "number" || value.expiresAt <= now) return null;
  if (typeof value.role !== "string" || !Array.isArray(value.skills)) return null;

  const role = value.role.replace(/\s+/g, " ").trim().slice(0, 80);
  const skills = normalizeSkills(
    value.skills.filter((skill): skill is string => typeof skill === "string"),
    MAX_SELECTED_SKILLS,
  );

  if (!role || skills.length === 0) return null;

  return {
    version: SKILLS_TOOL_TRANSFER_VERSION,
    expiresAt: value.expiresAt,
    role,
    skills,
  };
}

export function mergeSkillsToolTransfer(
  draft: DatosCVFormulario,
  transfer: SkillsToolTransfer,
): DatosCVFormulario {
  const existingSkills = splitSkills(draft.habilidades);
  const mergedSkills = normalizeSkills(
    [...existingSkills, ...transfer.skills],
    24,
  );

  return {
    ...draft,
    puesto: draft.puesto.trim() || transfer.role,
    habilidades: mergedSkills.join(", "),
  };
}

function splitSkills(value: string) {
  return value
    .split(/[,;\n|•]+/)
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function normalizeComparable(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
