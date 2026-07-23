import { describe, expect, it } from "vitest";
import {
  CREATE_DRAFT_VERSION,
  parseStoredCreateDraft,
} from "../lib/create-flow-state";

const draftData = {
  nombre: "Ana Perez",
  puesto: "Administrativa",
  contacto: "ana@email.com",
  sobreMi: "Experiencia en tareas administrativas y atención al cliente.",
  experiencia: "Administrativa en Empresa, 2022-2025",
  formacion: "Secundario completo",
  habilidades: "Excel, atención al cliente",
  idiomas: "Español",
  informacionAdicional: "",
};

const generatedCv = {
  nombre: "Ana Perez",
  puesto: "Administrativa",
  sobreMi: "Perfil administrativo con experiencia en atención al cliente.",
  contacto: ["ana@email.com"],
  experiencia: [
    {
      cargo: "Administrativa",
      empresa: "Empresa",
      fechas: "2022-2025",
      ubicacion: "Salta",
      logros: ["Organicé documentación y seguimiento de consultas internas."],
    },
  ],
  formacion: [],
  habilidades: ["Excel", "Atención al cliente"],
  idiomas: ["Español"],
  informacionAdicional: [],
};

describe("create flow state", () => {
  it("restores a generated checkout preview", () => {
    const parsed = parseStoredCreateDraft(
      JSON.stringify({
        version: CREATE_DRAFT_VERSION,
        data: draftData,
        template: "elegance",
        language: "es",
        intent: "job-specific",
        action: "checkout",
        flowStep: "preview",
        guestPhotoKey:
          "guest-photo-550e8400-e29b-41d4-a716-446655440000",
        generatedCv: {
          ...generatedCv,
          foto_url: "blob:https://vitaespark.com/local-photo",
        },
      }),
    );

    expect(parsed?.action).toBe("checkout");
    expect(parsed?.flowStep).toBe("preview");
    expect(parsed?.generatedCv?.nombre).toBe("Ana Perez");
    expect(parsed?.generatedCv?.foto_url).toBeUndefined();
    expect(parsed?.guestPhotoKey).toBe(
      "guest-photo-550e8400-e29b-41d4-a716-446655440000",
    );
    expect(parsed?.generatedCvInvalid).toBe(false);
  });

  it("keeps original details when the generated preview is corrupt", () => {
    const parsed = parseStoredCreateDraft(
      JSON.stringify({
        data: draftData,
        template: "elegance",
        language: "es",
        action: "checkout",
        generatedCv: { nombre: "incompleto" },
      }),
    );

    expect(parsed?.data.nombre).toBe("Ana Perez");
    expect(parsed?.flowStep).toBe("form");
    expect(parsed?.generatedCv).toBeUndefined();
    expect(parsed?.generatedCvInvalid).toBe(true);
  });

  it("supports old form-only drafts", () => {
    const parsed = parseStoredCreateDraft(
      JSON.stringify({
        data: draftData,
        template: "elegance",
        language: "es",
        intent: "general",
        action: null,
      }),
    );

    expect(parsed?.version).toBe(1);
    expect(parsed?.flowStep).toBe("form");
    expect(parsed?.data.puesto).toBe("Administrativa");
  });
});
