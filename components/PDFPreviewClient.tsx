// app/components/pdf/PDFViewerWrapper.tsx
"use client";

import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import type { RespuestaCV } from "@/lib/types/cv";

export default function PDFViewerWrapper({
  cv,
  template,
}: {
  cv: RespuestaCV["cv"];
  template: string;
}) {
  return (
    <PDFViewer style={{ width: "794px", height: "1000px", margin: "0 auto" }}>
      <DocumentoCV cv={cv} template={template} />
    </PDFViewer>
  );
}
