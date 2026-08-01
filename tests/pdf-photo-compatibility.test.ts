import { afterEach, describe, expect, it, vi } from "vitest";
import { convertPhotoToDataUrl } from "../components/pdf/useCompatibleCvPhoto";

const originalCreateObjectUrl = Object.getOwnPropertyDescriptor(
  URL,
  "createObjectURL",
);
const originalRevokeObjectUrl = Object.getOwnPropertyDescriptor(
  URL,
  "revokeObjectURL",
);
const originalGetContext = Object.getOwnPropertyDescriptor(
  HTMLCanvasElement.prototype,
  "getContext",
);
const originalToDataUrl = Object.getOwnPropertyDescriptor(
  HTMLCanvasElement.prototype,
  "toDataURL",
);

describe("PDF photo compatibility", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    restoreProperty(URL, "createObjectURL", originalCreateObjectUrl);
    restoreProperty(URL, "revokeObjectURL", originalRevokeObjectUrl);
    restoreProperty(
      HTMLCanvasElement.prototype,
      "getContext",
      originalGetContext,
    );
    restoreProperty(
      HTMLCanvasElement.prototype,
      "toDataURL",
      originalToDataUrl,
    );
  });

  it("embeds a remote WebP photo as JPEG before rendering the PDF", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      blob: async () => new Blob(["photo"], { type: "image/webp" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    class FakeImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      naturalWidth = 1200;
      naturalHeight = 800;

      set src(_value: string) {
        queueMicrotask(() => this.onload?.());
      }
    }
    vi.stubGlobal("Image", FakeImage);

    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: vi.fn(() => "blob:photo"),
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: vi.fn(),
    });

    const drawImage = vi.fn();
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
      configurable: true,
      value: vi.fn(() => ({
        fillStyle: "",
        fillRect: vi.fn(),
        drawImage,
      })),
    });
    Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
      configurable: true,
      value: vi.fn(() => "data:image/jpeg;base64,prepared-photo"),
    });

    const result = await convertPhotoToDataUrl(
      "https://example.supabase.co/photo.webp",
    );

    expect(result).toBe("data:image/jpeg;base64,prepared-photo");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.supabase.co/photo.webp",
      { cache: "force-cache" },
    );
    expect(drawImage).toHaveBeenCalledOnce();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:photo");
  });
});

function restoreProperty(
  target: object,
  property: string,
  descriptor?: PropertyDescriptor,
) {
  if (descriptor) {
    Object.defineProperty(target, property, descriptor);
  } else {
    Reflect.deleteProperty(target, property);
  }
}
