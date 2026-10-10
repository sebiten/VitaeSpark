import React, { act, createElement as h } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";
import { EditSavedCVForm } from "@/components/EditSavedCVForm";
import { previewCv } from "./fixtures/preview-cv";

const router = { push: vi.fn(), replace: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router }));
vi.mock("next/dynamic", () => ({ default: () => () => null }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

it.each([false, true])("poscompra guarda antecedentes vacíos o agrega uno real: %s", async (addExperience) => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  const fetchMock = vi.fn(async (_url: string, options?: RequestInit) => new Response(JSON.stringify(options?.method === "PATCH" ? { cv: {} } : { cv: { id: "saved", cv_data: { ...previewCv, experiencia: addExperience ? [] : previewCv.experiencia }, template: "harvard", status: "paid" } })));
  vi.stubGlobal("fetch", fetchMock);
  const host = document.createElement("div"); document.body.append(host);
  const root = createRoot(host);
  try {
    await act(async () => root.render(h(EditSavedCVForm, { cvId: "saved" })));
    if (addExperience) {
      await act(async () => [...host.querySelectorAll("button")].find((el) => el.textContent?.includes("Agregar"))!.click());
      for (const [label, value] of [["Cargo", "Asistente"], ["Logros o tareas", "Organicé los materiales de una actividad comunitaria."]]) {
        const field = [...host.querySelectorAll("label")].find((el) => el.textContent?.includes(label))!.querySelector("input,textarea")!;
        await act(async () => {
          Object.getOwnPropertyDescriptor(field.tagName === "INPUT" ? HTMLInputElement.prototype : HTMLTextAreaElement.prototype, "value")!.set!.call(field, value);
          field.dispatchEvent(new Event("input", { bubbles: true }));
        });
      }
    } else {
      await act(async () => host.querySelector('[aria-label="Eliminar"]')!.closest("button")!.click());
    }
    await act(async () => [...host.querySelectorAll("button")].find((el) => el.textContent?.includes("Guardar cambios"))!.click());
    const saved = JSON.parse(fetchMock.mock.calls.find(([, options]) => options?.method === "PATCH")![1]!.body as string);
    expect(saved.template).toBe("harvard");
    expect(saved.cvData.experiencia).toEqual(addExperience ? [{ cargo: "Asistente", empresa: "", fechas: "", ubicacion: "", logros: ["Organicé los materiales de una actividad comunitaria."] }] : []);
    expect(fetchMock.mock.calls.some(([url]) => url.includes("generate-cv"))).toBe(false);
  } finally {
    await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals();
  }
});
