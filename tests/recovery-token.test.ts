import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { signRecoveryLink, verifyRecoveryLink } from "../lib/recovery-token";

const previousSecret = process.env.RECOVERY_LINK_SECRET;

describe("recovery link signatures", () => {
  beforeEach(() => {
    process.env.RECOVERY_LINK_SECRET = "test-recovery-secret";
  });

  afterEach(() => {
    process.env.RECOVERY_LINK_SECRET = previousSecret;
  });

  it("accepts a valid signature", () => {
    const signature = signRecoveryLink("cv-123", "24h");
    expect(verifyRecoveryLink("cv-123", "24h", signature)).toBe(true);
  });

  it("rejects altered CVs, reminder types and signatures", () => {
    const signature = signRecoveryLink("cv-123", "24h");
    expect(verifyRecoveryLink("cv-456", "24h", signature)).toBe(false);
    expect(verifyRecoveryLink("cv-123", "72h", signature)).toBe(false);
    expect(verifyRecoveryLink("cv-123", "24h", "invalid")).toBe(false);
  });
});
