import { describe, expect, it } from "vitest";

import {
  getDetectedCountry,
  getMarketMode,
  normalizeCountryCode,
  readCookieValue,
} from "../lib/market";

describe("market detection", () => {
  it("usa Mercado Pago solo para Argentina", () => {
    expect(getMarketMode("AR")).toBe("argentina");
    expect(getMarketMode("MX")).toBe("international");
    expect(getMarketMode(null)).toBe("international");
  });

  it("respeta la seleccion manual", () => {
    expect(getMarketMode("AR", "international")).toBe("international");
    expect(getMarketMode("US", "argentina")).toBe("argentina");
  });

  it("normaliza pais desde headers y cookies", () => {
    expect(getDetectedCountry(new Headers({ "x-vercel-ip-country": "ar" }))).toBe(
      "AR",
    );
    expect(normalizeCountryCode("ARG")).toBeNull();
    expect(readCookieValue("foo=1; vitaespark-country=CL", "vitaespark-country")).toBe(
      "CL",
    );
  });
});
