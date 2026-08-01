import { describe, expect, it } from "vitest";
import {
  isAnonymousUser,
  normalizeCheckoutEmail,
} from "../lib/guest-checkout";

describe("guest checkout helpers", () => {
  it("normaliza el email antes de crear el checkout", () => {
    expect(normalizeCheckoutEmail("  Persona@Example.COM ")).toBe(
      "persona@example.com",
    );
  });

  it("distingue una sesión temporal de una cuenta permanente", () => {
    expect(isAnonymousUser({ is_anonymous: true })).toBe(true);
    expect(isAnonymousUser({ is_anonymous: false })).toBe(false);
    expect(isAnonymousUser(null)).toBe(false);
  });
});
