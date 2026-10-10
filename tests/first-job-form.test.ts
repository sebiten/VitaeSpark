import React, { act, createElement as h } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import CVFormStep from "@/components/CVFormStep";
import { previewCv, previewDraft } from "./fixtures/preview-cv";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
vi.mock("@/lib/analytics-events", () => ({ recordAnalyticsEvent: vi.fn() }));
vi.mock("@/utils/supabase/client", () => ({ createClient: () => ({}) }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("motion/react", () => ({ AnimatePresence: ({ children }: { children: React.ReactNode }) => children, motion: { section: ({ children }: { children: React.ReactNode }) => h("section", null, children) } }));

let root: Root;
let host: HTMLDivElement;
beforeEach(() => { vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true); host = document.createElement("div"); document.body.append(host); root = createRoot(host); });
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });
async function click(text: string) {
  const button = [...host.querySelectorAll("button")].find((el) => el.textContent?.includes(text));
  expect(button, text).toBeTruthy();
  await act(async () => button!.click());
}

it.each(["es", "en"] as const)("conserva texto al alternar, envía solo elección activa y agrega solo habilidades elegidas (%s)", async (language) => {
  const onDraftChange = vi.fn();
  const fetchMock = vi.fn(async () => new Response(JSON.stringify({ cv: { ...previewCv, experiencia: [] } })));
  vi.stubGlobal("fetch", fetchMock);
  await act(async () => root.render(h(CVFormStep, {
    template: "harvard", language, draftData: { ...previewDraft.data, puesto: language === "en" ? "Cashier" : "Cajero/a", experiencia: "Atendí consultas reales en un comercio familiar.", habilidades: "", experienceMode: "with-experience" },
    onGenerated: vi.fn(), onDraftChange, fotoUrl: null, onFotoUrlChange: vi.fn(), onGuestPhotoPrepared: vi.fn(), onGuestPhotoDiscarded: vi.fn(), onChangeTemplate: vi.fn(), onResumeActionConsumed: vi.fn(),
  })));
  const next = language === "en" ? "Continue to" : "Continuar a";
  await click(next); await click(next);
  const toggle = async (mode: string) => act(async () => host.querySelector<HTMLInputElement>(`input[value="${mode}"]`)!.click());
  await toggle("no-experience");
  expect(host.querySelector("#experiencia")).toBeNull();
  await toggle("with-experience");
  expect(host.querySelector<HTMLTextAreaElement>("#experiencia")?.value).toBe("Atendí consultas reales en un comercio familiar.");
  await toggle("no-experience");
  await click(next); await click(next);
  expect(host.querySelector<HTMLTextAreaElement>("#habilidades")?.value).toBe("");
  await click(language === "en" ? "Cash handling" : "Manejo de caja");
  expect(host.querySelector<HTMLTextAreaElement>("#habilidades")?.value).toBe(language === "en" ? "Cash handling" : "Manejo de caja");
  await click(language === "en" ? "Generate resume" : "Generar CV");
  expect(fetchMock).toHaveBeenCalledTimes(1);
  const options = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
  expect(JSON.parse(options[1].body as string)).toMatchObject({ experiencia: "", experienceMode: "no-experience", formacion: "", habilidades: language === "en" ? "Cash handling" : "Manejo de caja" });
  expect(onDraftChange.mock.lastCall?.[0]).toMatchObject({ experiencia: "Atendí consultas reales en un comercio familiar.", experienceMode: "no-experience" });
});
