import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getLandingAttribution,
  setLandingAttribution,
} from "../lib/analytics-attribution";

const ATTRIBUTION_KEY = "vitaespark_landing_attribution";

describe("landing attribution", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
    window.history.replaceState({}, "", "/");
  });

  it("guarda y recupera attribution desde localStorage", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));

    setLandingAttribution({
      landing_path: "/cv-para-cajero",
      cta_label: "Crear CV",
      source_type: "landing",
    });

    expect(getLandingAttribution()).toMatchObject({
      landing_path: "/cv-para-cajero",
      cta_label: "Crear CV",
      source_type: "landing",
      landing_ts: Date.now(),
    });
  });

  it("expira attribution vencida y limpia el storage", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-05-26T12:00:00.000Z"));

    window.localStorage.setItem(
      ATTRIBUTION_KEY,
      JSON.stringify({
        landing_path: "/landing",
        landing_ts: Date.now() - 8 * 24 * 60 * 60 * 1000,
      })
    );

    expect(getLandingAttribution()).toMatchObject({
      session_id: expect.any(String),
    });
    expect(window.localStorage.getItem(ATTRIBUTION_KEY)).toBeNull();
  });

  it("retorna vacio si el json guardado esta corrupto", () => {
    window.localStorage.setItem(ATTRIBUTION_KEY, "{broken");

    expect(getLandingAttribution()).toMatchObject({
      session_id: expect.any(String),
    });
  });

  it("conserva los parametros UTM al registrar la landing", () => {
    window.history.replaceState(
      {},
      "",
      "/cv-para-mineria?utm_source=facebook&utm_medium=organic_social&utm_campaign=grupos_facebook&utm_content=cv_mineria_checklist",
    );

    setLandingAttribution({
      landing_path: "/cv-para-mineria",
      cta_label: "campaign_landing_view",
      source_type: "landing",
    });

    expect(getLandingAttribution()).toMatchObject({
      landing_path: "/cv-para-mineria",
      utm_source: "facebook",
      utm_medium: "organic_social",
      utm_campaign: "grupos_facebook",
      utm_content: "cv_mineria_checklist",
    });
  });
});
