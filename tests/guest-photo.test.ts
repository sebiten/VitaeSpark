import { describe, expect, it } from "vitest";
import {
  GUEST_PHOTO_TTL_MS,
  MAX_GUEST_PHOTO_STORED_BYTES,
  isEphemeralPhotoUrl,
  isGuestPhotoKey,
} from "../lib/guest-photo";

describe("guest photo policy", () => {
  it("accepts only generated temporary photo keys", () => {
    expect(
      isGuestPhotoKey(
        "guest-photo-550e8400-e29b-41d4-a716-446655440000",
      ),
    ).toBe(true);
    expect(isGuestPhotoKey("guest-photo-arbitrary")).toBe(false);
  });

  it("keeps temporary photos below the Supabase bucket limit", () => {
    expect(MAX_GUEST_PHOTO_STORED_BYTES).toBeLessThan(2 * 1024 * 1024);
    expect(GUEST_PHOTO_TTL_MS).toBe(24 * 60 * 60 * 1000);
  });

  it("recognizes object URLs that must not enter session storage", () => {
    expect(isEphemeralPhotoUrl("blob:https://vitaespark.com/123")).toBe(true);
    expect(isEphemeralPhotoUrl("https://cdn.example.com/photo.webp")).toBe(
      false,
    );
  });
});
