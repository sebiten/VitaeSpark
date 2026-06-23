import type { RespuestaCV } from "@/lib/types/cv";

type ScoreItem = {
  label: string;
  passed: boolean;
  detail: string;
};

export type CvScoreResult = {
  score: number;
  label: string;
  items: ScoreItem[];
};

const genericProfilePatterns = [
  "responsable",
  "proactivo",
  "ganas de trabajar",
  "trabajo en equipo",
];

export function calculateCvScore(cv: RespuestaCV["cv"]): CvScoreResult {
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
  const hasRelevantSkills = cv.habilidades.length >= 5;
  const hasReadableContact = cv.contacto.length >= 2;

  const items: ScoreItem[] = [
    {
      label: "Perfil claro",
      passed: hasSpecificProfile,
      detail: hasSpecificProfile
        ? "El resumen explica mejor el puesto y tu valor."
        : "Conviene hacerlo mas especifico para el puesto.",
    },
    {
      label: "Experiencia entendible",
      passed: hasExperienceContext,
      detail: hasExperienceContext
        ? "Las tareas tienen contexto y se leen rapido."
        : "Agrega tareas concretas, herramientas o contexto.",
    },
    {
      label: "Habilidades conectadas",
      passed: hasRelevantSkills,
      detail: hasRelevantSkills
        ? "Hay suficientes habilidades para orientar el CV."
        : "Suma habilidades del puesto para mejorar el match.",
    },
    {
      label: "Formato listo",
      passed: hasReadableContact,
      detail: hasReadableContact
        ? "Incluye datos de contacto y estructura clara."
        : "Revisa ciudad, email, telefono o link profesional.",
    },
  ];

  const passed = items.filter((item) => item.passed).length;
  const score = Math.min(96, 64 + passed * 8);

  return {
    score,
    label:
      score >= 88
        ? "Muy buen punto de partida"
        : score >= 80
          ? "Listo para pulir"
          : "Conviene revisarlo antes de enviar",
    items,
  };
}
