import { getSkillsRole } from "./skills-tool";
import type { AppLanguage } from "./i18n";

const rolePatterns: [RegExp, string][] = [
  [/atencion|customer/, "atencion-cliente"], [/caj|cashier|checkout/, "cajero"],
  [/miner|mining/, "mineria"], [/administr/, "administrativo"],
  [/call.center/, "call-center"], [/operari|production/, "operario"],
  [/limpieza|clean/, "limpieza"], [/seguridad|security/, "seguridad"],
  [/repositor|logistic|stock/, "logistica"], [/recepcion|reception/, "recepcionista"],
  [/vendedor|ventas|sales/, "ventas"], [/primer empleo|first job|estudiante|student/, "primer-empleo"],
];

const englishSkills: Record<string, string[]> = {
  "atencion-cliente": ["Active listening", "Clear communication", "Problem solving"],
  cajero: ["Cash handling", "Attention to detail", "Customer service"],
  mineria: ["Following safety procedures", "Teamwork", "Attention to detail"],
  administrativo: ["Excel and spreadsheets", "Data entry", "Document management"],
  "call-center": ["Telephone support", "Handling incoming and outgoing calls", "Recording interactions in CRM"],
  operario: ["Production line operation", "Visual quality checks", "Material preparation"],
  limpieza: ["Cleaning and disinfecting spaces", "Safe use of cleaning products", "Maintaining shared areas"],
  seguridad: ["Access control", "Recording arrivals and incidents", "Preventive patrols"],
  logistica: ["Restocking merchandise", "Inventory control", "Loading and unloading"],
  recepcionista: ["Welcoming visitors", "Phone and email support", "Scheduling appointments"],
  ventas: ["Sales advice", "Identifying customer needs", "Following up on opportunities"],
  "primer-empleo": ["Basic digital tools", "Email and documents", "Organized record keeping"],
};

export function getCvFormContext(role: string, language: AppLanguage, noExperience = false) {
  const normalized = role.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const roleId = rolePatterns.find(([pattern]) => pattern.test(normalized))?.[1] ?? "otro";
  const catalog = getSkillsRole(roleId);
  const en = language === "en";
  const target = role.trim() || (en ? "the role I am applying for" : "el puesto al que me postulo");
  const suggestions = en
    ? englishSkills[roleId] ?? ["Clear communication", "Problem solving", "Following procedures"]
    : [...catalog.technicalSkills.slice(0, 3), ...catalog.transferableSkills.slice(0, 3)];
  const tasks: Record<string, [string, string]> = {
    "atencion-cliente": ["Respondí consultas y derivé reclamos al área correspondiente.", "Answered questions and referred complaints to the appropriate team."],
    cajero: ["Registré cobros y revisé comprobantes al cerrar la caja.", "Processed payments and checked receipts at the end of the shift."],
    mineria: ["Organicé materiales y seguí los procedimientos de seguridad indicados.", "Organized materials and followed the specified safety procedures."],
    administrativo: ["Ordené documentación y actualicé registros.", "Organized documents and updated records."],
    "call-center": ["Respondí llamadas y registré las consultas recibidas.", "Answered calls and recorded incoming requests."],
    operario: ["Preparé materiales y revisé la calidad de los productos.", "Prepared materials and checked product quality."],
    limpieza: ["Limpié espacios y repuse los insumos necesarios.", "Cleaned spaces and replenished supplies."],
    seguridad: ["Registré ingresos y comuniqué novedades del turno.", "Recorded arrivals and reported shift updates."],
    logistica: ["Repuse mercadería y revisé las existencias.", "Restocked merchandise and checked inventory."],
    recepcionista: ["Recibí visitas y organicé turnos.", "Welcomed visitors and scheduled appointments."],
    ventas: ["Respondí consultas sobre productos y seguí pedidos.", "Answered product questions and followed up on orders."],
  };
  const task = tasks[roleId]?.[en ? 1 : 0] ?? (en ? "Describe a task you actually performed and its result." : "Describí una tarea que realmente hiciste y su resultado.");
  return {
    suggestions,
    rolePlaceholder: role.trim() || (en ? "Example: Customer service" : "Ej: Atención al cliente"),
    summaryPlaceholder: en
      ? `I am looking for ${target}. Describe a real skill or interest related to this role${noExperience ? "; this will be my first job" : ""}.`
      : `Busco trabajar en ${target}. Contá una habilidad o interés real relacionado con el puesto${noExperience ? "; este será mi primer empleo" : ""}.`,
    experiencePlaceholder: en
      ? `Only if it happened: role, organization or project, dates.\n${task}`
      : `Solo si lo hiciste: puesto, organización o proyecto, fechas.\n${task}`,
    educationPlaceholder: en ? "Qualification or course, institution, dates. Leave blank if not applicable." : "Estudio o curso, institución, fechas. Dejalo vacío si no corresponde.",
    skillsPlaceholder: suggestions.join(", "),
    experienceDescription: en ? "Include only real jobs or projects, or choose that you have none yet." : "Incluí solo trabajos o proyectos reales, o indicá que todavía no tenés antecedentes.",
  };
}
