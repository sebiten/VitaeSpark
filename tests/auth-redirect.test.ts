import { describe, expect, it } from "vitest";

import { normalizeAuthRedirect } from "../lib/auth-redirect";

describe("auth redirect", () => {
  it("acepta rutas internas con query params", () => {
    expect(normalizeAuthRedirect("/crear?resume=generate")).toBe(
      "/crear?resume=generate",
    );
  });

  it("rechaza redirects externos y protocol-relative", () => {
    expect(normalizeAuthRedirect("https://example.com")).toBe("/crear");
    expect(normalizeAuthRedirect("//example.com")).toBe("/crear");
    expect(normalizeAuthRedirect("/\\example.com")).toBe("/crear");
    expect(normalizeAuthRedirect("/crear\n//example.com")).toBe("/crear");
  });
});
