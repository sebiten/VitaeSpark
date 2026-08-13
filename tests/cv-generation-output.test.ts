import { describe, expect, it } from "vitest";
import { CVSchema } from "../lib/schemas/cv";
import { normalizeCvGenerationOutput } from "../lib/cv-generation-output";

const fallback = {
  nombre: "Maria Lopez",
  puesto: "Operaria de produccion",
  contacto: "maria@email.com\nJujuy, Argentina",
  sobreMi: "Experiencia en produccion y control de calidad.",
  experiencia: "Controle productos, ordene el sector y registre tareas diarias.",
  formacion: "Secundario completo",
  habilidades: "Control de calidad, Produccion, Trabajo en equipo",
  idiomas: "Espanol",
  informacionAdicional: "Disponibilidad para turnos",
};

describe("normalizacion de respuesta de IA", () => {
  it("repara campos nulos o ausentes sin inventar experiencia", () => {
    const normalized = normalizeCvGenerationOutput(
      {
        nombre: "Maria Lopez",
        puesto: "Operaria de produccion",
        sobreMi: fallback.sobreMi,
        contacto: null,
        experiencia: null,
        formacion: null,
        habilidades: null,
        idiomas: null,
        informacionAdicional: null,
      },
      fallback,
    );

    expect(CVSchema.safeParse(normalized).success).toBe(true);
    expect(normalized.experiencia[0].logros[0]).toContain("Controle productos");
    expect(normalized.contacto).toContain("maria@email.com");
  });

  it("limita listas y textos al contrato del CV", () => {
    const normalized = normalizeCvGenerationOutput(
      {
        ...fallback,
        contacto: Array.from({ length: 20 }, (_, index) => `dato-${index}`),
        habilidades: Array.from(
          { length: 40 },
          (_, index) => `habilidad-${index}-${"x".repeat(100)}`,
        ),
      },
      fallback,
    );

    expect(CVSchema.safeParse(normalized).success).toBe(true);
    expect(normalized.contacto).toHaveLength(8);
    expect(normalized.habilidades).toHaveLength(32);
  });
});
