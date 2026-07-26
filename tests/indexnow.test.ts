import { describe, expect, it } from "vitest";
import {
  createIndexNowPayload,
  getIndexNowKey,
  normalizeIndexNowUrls,
} from "../lib/indexnow";

const baseUrl = new URL("https://vitaespark.com");

describe("IndexNow", () => {
  it("acepta una clave válida y rechaza formatos inseguros", () => {
    expect(getIndexNowKey("abcDEF-12345678")).toBe("abcDEF-12345678");
    expect(getIndexNowKey("short")).toBeNull();
    expect(getIndexNowKey("key_with_underscore")).toBeNull();
  });

  it("solo conserva URLs canónicas publicadas en el sitemap", () => {
    expect(
      normalizeIndexNowUrls(
        [
          "/",
          "/cv-para-mineria",
          "/cv-para-mineria/",
          "https://vitaespark.com/blog/habilidades-para-curriculum",
          "https://example.com/cv-para-mineria",
          "/api/generate-cv",
          "/perfil",
          "/cv-para-mineria?utm_source=test",
        ],
        baseUrl,
      ),
    ).toEqual([
      "https://vitaespark.com/",
      "https://vitaespark.com/cv-para-mineria",
      "https://vitaespark.com/blog/habilidades-para-curriculum",
    ]);
  });

  it("crea un lote verificable en la raíz del dominio", () => {
    const key = "1234567890abcdef";
    const payload = createIndexNowPayload({
      values: ["/herramientas/generador-habilidades-cv"],
      baseUrl,
      key,
    });

    expect(payload).toEqual({
      host: "vitaespark.com",
      key,
      keyLocation: `https://vitaespark.com/${key}.txt`,
      urlList: [
        "https://vitaespark.com/herramientas/generador-habilidades-cv",
      ],
    });
  });
});
