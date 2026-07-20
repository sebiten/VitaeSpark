import { afterEach, describe, expect, it } from "vitest";

import { CANONICAL_REDIRECTS } from "../lib/canonical-redirects";
import { buildMetadata, getBaseUrl } from "../lib/seo";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("getBaseUrl", () => {
  it("prioriza NEXT_PUBLIC_BASE_URL sobre NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://base.example.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://site.example.com";

    expect(getBaseUrl().toString()).toBe("https://base.example.com/");
  });

  it("usa el fallback si no hay variables de entorno", () => {
    delete process.env.NEXT_PUBLIC_BASE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getBaseUrl().toString()).toBe("https://vitaespark.com/");
  });
});

describe("buildMetadata", () => {
  it("arma canonical, open graph y twitter con la base actual", () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://vitaespark.test";

    const metadata = buildMetadata({
      title: "CV para cajero",
      description: "Plantilla para cajeros",
      path: "/cv-para-cajero",
      keywords: ["cv", "cajero"],
      languages: {
        "es-AR": "https://vitaespark.test/cv-para-cajero",
      },
    });

    expect(metadata.alternates?.canonical?.toString()).toBe(
      "https://vitaespark.test/cv-para-cajero"
    );
    expect(metadata.openGraph?.url?.toString()).toBe(
      "https://vitaespark.test/cv-para-cajero"
    );
    const openGraphImages = metadata.openGraph?.images;
    const firstOpenGraphImage = Array.isArray(openGraphImages)
      ? openGraphImages[0]
      : openGraphImages;

    expect(firstOpenGraphImage).toMatchObject({
      width: 1200,
      height: 630,
      alt: "Vitae Spark",
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "CV para cajero",
      description: "Plantilla para cajeros",
    });
  });
});

describe("CANONICAL_REDIRECTS", () => {
  it("consolida las variantes genericas y de IA en sus paginas principales", () => {
    expect(CANONICAL_REDIRECTS).toMatchObject({
      "/hacer-cv-online": "/",
      "/crear-curriculum-vitae": "/",
      "/crear-cv-online": "/",
      "/generador-de-cv-con-ia": "/hacer-cv-con-ia",
    });
  });

  it("no genera cadenas de redireccion", () => {
    for (const target of Object.values(CANONICAL_REDIRECTS)) {
      expect(CANONICAL_REDIRECTS[target]).toBeUndefined();
    }
  });
});
