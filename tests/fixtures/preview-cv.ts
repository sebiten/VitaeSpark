import type { CV } from "@/lib/types/cv";
export const previewCv: CV = {
  language: "es", nombre: "Ana Pérez", puesto: "Administrativa", contacto: ["ana@example.com"],
  sobreMi: "Perfil original para revisar.",
  experiencia: [{ cargo: "Administrativa", empresa: "Empresa", fechas: "2022-2025", ubicacion: "Salta", logros: ["Organicé la documentación."] }],
  formacion: [], habilidades: ["Excel"], idiomas: ["Español"], informacionAdicional: [],
};
export const previewDraft = {
  version: 3, data: { nombre: "Ana Pérez", puesto: "Administrativa", contacto: "ana@example.com", sobreMi: "Perfil original para revisar.", experiencia: "Administrativa", formacion: "", habilidades: "Excel", idiomas: "", informacionAdicional: "" },
  template: "elegance", language: "es", intent: "general", action: null, flowStep: "preview", generatedCv: previewCv,
};
