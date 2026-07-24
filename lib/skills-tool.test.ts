import { describe, expect, it } from "vitest";
import {
  createSkillsToolTransfer,
  generateSkillSuggestions,
  mergeSkillsToolTransfer,
  parseSkillsToolTransfer,
} from "@/lib/skills-tool";
import type { DatosCVFormulario } from "@/lib/types/cv";

const emptyDraft: DatosCVFormulario = {
  nombre: "",
  puesto: "",
  contacto: "",
  sobreMi: "",
  experiencia: "",
  formacion: "",
  habilidades: "",
  idiomas: "",
  informacionAdicional: "",
};

describe("skills tool", () => {
  it("genera una lista determinística sin duplicados", () => {
    const result = generateSkillSuggestions({
      roleId: "administrativo",
      experienceLevel: "inicial",
    });
    const skills = [
      ...result.technicalSkills,
      ...result.transferableSkills,
    ];

    expect(skills.length).toBeGreaterThanOrEqual(7);
    expect(new Set(skills.map((skill) => skill.toLowerCase())).size).toBe(
      skills.length,
    );
  });

  it("rechaza transferencias vencidas", () => {
    const transfer = createSkillsToolTransfer({
      role: "Administración",
      skills: ["Excel"],
      now: 1_000,
    });

    expect(
      parseSkillsToolTransfer(JSON.stringify(transfer), transfer.expiresAt + 1),
    ).toBeNull();
  });

  it("preserva el puesto existente y agrega solo habilidades nuevas", () => {
    const transfer = createSkillsToolTransfer({
      role: "Administración",
      skills: ["Excel", "Gestión documental"],
    });
    const merged = mergeSkillsToolTransfer(
      {
        ...emptyDraft,
        puesto: "Recepcionista",
        habilidades: "Excel, Comunicación clara",
      },
      transfer,
    );

    expect(merged.puesto).toBe("Recepcionista");
    expect(merged.habilidades).toBe(
      "Excel, Comunicación clara, Gestión documental",
    );
  });
});
