// @vitest-environment node
import React, { createElement as h, type ReactNode } from "react";
import { expect, it } from "vitest";
import { renderToBuffer } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DocumentoCV, DocumentoCVW } from "@/components/pdf/CVDocument";
import { CV_TEMPLATE_IDS } from "@/lib/cv-templates";
import { previewCv } from "./fixtures/preview-cv";

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(" ");
  if (!React.isValidElement<{ children?: ReactNode }>(node)) return "";
  if (typeof node.type === "function") return textOf((node.type as (props: unknown) => ReactNode)(node.props));
  return textOf(node.props.children);
}

for (const template of CV_TEMPLATE_IDS) {
  for (const watermark of [false, true]) {
    it(`${template} ${watermark ? "preview" : "final"}: genera PDF con y sin antecedentes, sin secciones vacías`, async () => {
      for (const hasExperience of [false, true]) {
        const cv = { ...previewCv, foto_url: undefined, experiencia: hasExperience ? previewCv.experiencia : [] };
        const element = h(watermark ? DocumentoCVW : DocumentoCV, { cv, template });
        const text = textOf(element);
        expect(text.includes("Experiencia laboral")).toBe(hasExperience);
        expect(text).not.toContain("Formación");
        expect(text.includes("Organicé la documentación.")).toBe(hasExperience);
        const buffer = await renderToBuffer(element as unknown as Parameters<typeof renderToBuffer>[0]);
        expect((await PDFDocument.load(buffer)).getPageCount()).toBe(1);
        if (process.env.CV_PDF_REVIEW_DIR) {
          mkdirSync(process.env.CV_PDF_REVIEW_DIR, { recursive: true });
          writeFileSync(join(process.env.CV_PDF_REVIEW_DIR, `${template}-${watermark ? "preview" : "final"}-${hasExperience ? "with" : "without"}.pdf`), buffer);
        }
      }
    }, 15000);
  }
}
