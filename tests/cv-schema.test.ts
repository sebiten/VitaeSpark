import { describe, expect, it } from "vitest";

import { GenerateCVInputSchema } from "../lib/schemas/cv";

describe("GenerateCVInputSchema", () => {
  it("normaliza foto_url vacia y aplica language por defecto", () => {
    const result = GenerateCVInputSchema.parse({
      foto_url: "",
      nombre: "  Juan Perez  ",
      puesto: "Desarrollador",
      contacto: "juan@example.com",
      sobreMi: "Desarrollador con experiencia en productos digitales.",
      experiencia:
        "Trabaje en equipos de producto construyendo interfaces y flujos internos.",
      formacion: "Tecnicatura en programacion.",
      habilidades: "TypeScript, React",
      idiomas: "Español",
    });

    expect(result.language).toBe("es");
    expect(result.foto_url).toBeUndefined();
    expect(result.nombre).toBe("Juan Perez");
    expect(result.informacionAdicional).toBe("");
  });

  it("rechaza sobreMi demasiado corto", () => {
    const result = GenerateCVInputSchema.safeParse({
      nombre: "Juan Perez",
      puesto: "Desarrollador",
      contacto: "juan@example.com",
      sobreMi: "Muy corto",
      experiencia:
        "Trabaje en equipos de producto construyendo interfaces y flujos internos.",
      formacion: "Tecnicatura en programacion.",
      habilidades: "TypeScript, React",
      idiomas: "Español",
    });

    expect(result.success).toBe(false);
  });
});
