import { createHmac, timingSafeEqual } from "crypto";

function getRecoverySecret() {
  return process.env.RECOVERY_LINK_SECRET || process.env.CRON_SECRET || "";
}

export function signRecoveryLink(cvId: string, reminderType: string) {
  const secret = getRecoverySecret();
  if (!secret) throw new Error("Recovery link secret is not configured");

  return createHmac("sha256", secret)
    .update(`${cvId}:${reminderType}`)
    .digest("hex");
}

export function verifyRecoveryLink(
  cvId: string,
  reminderType: string,
  signature: string,
) {
  const secret = getRecoverySecret();
  if (!secret || !/^[a-f0-9]{64}$/i.test(signature)) return false;

  const expected = createHmac("sha256", secret)
    .update(`${cvId}:${reminderType}`)
    .digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(signature, "hex");

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}
