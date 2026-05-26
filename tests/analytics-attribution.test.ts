import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  getLandingAttribution,
  setLandingAttribution,
} from "../lib/analytics-attribution";

const ATTRIBUTION_KEY = "vitaespark_landing_attribution";

describe("landing attribution", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
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

    expect(getLandingAttribution()).toEqual({});
    expect(window.localStorage.getItem(ATTRIBUTION_KEY)).toBeNull();
  });

  it("retorna vacio si el json guardado esta corrupto", () => {
    window.localStorage.setItem(ATTRIBUTION_KEY, "{broken");

    expect(getLandingAttribution()).toEqual({});
  });
});
