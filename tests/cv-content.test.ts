import { describe, expect, it } from "vitest";
import { validateEditedCv } from "@/lib/cv-content";
import { previewCv } from "./fixtures/preview-cv";

describe("contenido editable", () => {
  it("conserva idioma, foto local y campos sin editar; limpia líneas al guardar", () => {
    const value = { ...previewCv, language: "en" as const, foto_url: "blob:https://example.com/local", habilidades: [" Excel ", "", "Trabajo en equipo"] };
    const result = validateEditedCv(value);
    expect(result.success && result.data).toEqual({ ...value, habilidades: ["Excel", "Trabajo en equipo"] });
    expect(value.habilidades).toHaveLength(3);
  });
  it("no trunca contenido que supera los límites ni acepta campos obligatorios vacíos", () => {
    expect(validateEditedCv({ ...previewCv, sobreMi: "x".repeat(901) }).success).toBe(false);
    expect(validateEditedCv({ ...previewCv, nombre: "" }).success).toBe(false);
    expect(validateEditedCv({ ...previewCv, experiencia: [] }).success).toBe(true);
    expect(validateEditedCv({ ...previewCv, habilidades: Array(33).fill("Excel") }).success).toBe(false);
  });
});
