import type { RespuestaCV } from "@/lib/types/cv";

export function getCvLabels(cv: RespuestaCV["cv"]) {
  if (cv.language === "en") {
    return {
      contact: "Contact",
      languages: "Languages",
      additional: "Additional information",
      summary: "Professional summary",
      keySkills: "Key skills",
      skills: "Skills",
      experience: "Work experience",
      education: "Education",
    };
  }

  return {
    contact: "Contacto",
    languages: "Idiomas",
    additional: "Información adicional",
    summary: "Perfil profesional",
    keySkills: "Habilidades clave",
    skills: "Habilidades",
    experience: "Experiencia laboral",
    education: "Formación",
  };
}
