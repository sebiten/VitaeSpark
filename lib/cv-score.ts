import type { RespuestaCV } from "@/lib/types/cv";

type ScoreItem = {
  label: string;
  passed: boolean;
  detail: string;
};

export type CvScoreResult = {
  items: ScoreItem[];
};

const genericProfilePatterns = [
  "responsable",
  "proactivo",
  "ganas de trabajar",
  "trabajo en equipo",
];

export function calculateCvScore(cv: RespuestaCV["cv"], language = cv.language ?? "es"): CvScoreResult {
  const en = language === "en";
  const profileText = cv.sobreMi?.toLowerCase() || "";
  const hasSpecificProfile =
    cv.sobreMi.length >= 120 &&
    !genericProfilePatterns.every((pattern) => profileText.includes(pattern));
  const hasExperienceContext = cv.experiencia.some(
    (experience) =>
      experience.cargo.length > 2 &&
      experience.logros.length >= 2 &&
      experience.logros.join(" ").length >= 120,
  );
  const hasRelevantSkills = cv.habilidades.some((skill) => skill.trim().length > 0);
  const hasReadableContact = cv.contacto.length >= 2;

  const items: ScoreItem[] = [
    {
      label: en ? "Clear summary" : "Perfil claro",
      passed: hasSpecificProfile,
      detail: hasSpecificProfile
        ? (en ? "Your summary explains your target role and what you offer." : "El resumen explica mejor el puesto y tu valor.")
        : (en ? "Make it more specific to your target role." : "Conviene hacerlo mas especifico para el puesto."),
    },
    {
      label: cv.experiencia.length === 0 ? (en ? "First job" : "Primer empleo") : (en ? "Clear experience" : "Experiencia entendible"),
      passed: cv.experiencia.length === 0 || hasExperienceContext,
      detail: cv.experiencia.length === 0
        ? (en ? "You can present your skills without inventing experience." : "Podés presentar tus habilidades sin inventar antecedentes.")
        : hasExperienceContext
        ? (en ? "Your tasks have context and are easy to read." : "Las tareas tienen contexto y se leen rapido.")
        : (en ? "Describe real tasks and their context." : "Describí tareas reales y su contexto."),
    },
    {
      label: en ? "Relevant skills" : "Habilidades conectadas",
      passed: hasRelevantSkills,
      detail: hasRelevantSkills
        ? (en ? "Your resume includes skills you can discuss." : "Tu CV incluye habilidades que podés explicar.")
        : (en ? "Include only skills you actually have and can explain." : "Incluí únicamente habilidades que tengas y puedas explicar."),
    },
    {
      label: en ? "Contact details" : "Formato listo",
      passed: hasReadableContact,
      detail: hasReadableContact
        ? (en ? "Includes contact details in a clear structure." : "Incluye datos de contacto y estructura clara.")
        : (en ? "Check your city, email, phone or professional link." : "Revisa ciudad, email, telefono o link profesional."),
    },
  ];

  return {
    items,
  };
}
