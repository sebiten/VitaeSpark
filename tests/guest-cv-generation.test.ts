import { describe, expect, it } from "vitest";
import {
  AUTHENTICATED_CV_GENERATION_IP_LIMIT,
  AUTHENTICATED_CV_GENERATION_USER_LIMIT,
  GUEST_CV_GENERATION_IP_LIMIT,
  GUEST_CV_GENERATION_MAX_AGE_SECONDS,
  hasGuestCvGeneration,
} from "../lib/guest-cv-generation";

describe("guest CV generation policy", () => {
  it("limits each browser for exactly 24 hours", () => {
    expect(GUEST_CV_GENERATION_MAX_AGE_SECONDS).toBe(86_400);
    expect(hasGuestCvGeneration("1")).toBe(true);
    expect(hasGuestCvGeneration(undefined)).toBe(false);
  });

  it("allows at most five anonymous generations per IP window", () => {
    expect(GUEST_CV_GENERATION_IP_LIMIT).toBe(5);
  });

  it("limits authenticated usage by user and IP", () => {
    expect(AUTHENTICATED_CV_GENERATION_USER_LIMIT).toBe(12);
    expect(AUTHENTICATED_CV_GENERATION_IP_LIMIT).toBe(30);
  });
});
