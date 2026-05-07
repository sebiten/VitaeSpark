"use client";

import { PDFViewer } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV, DocumentoCVW } from "./CVDocument";

type Props = {
  cv: RespuestaCV["cv"];
  template?: string | null;
  watermark?: boolean;
  className?: string;
  style?: any;
};

export default function PDFViewerPane({
  cv,
  template,
  watermark = false,
  className,
  style,
}: Props) {
  const Document = watermark ? DocumentoCVW : DocumentoCV;

  return (
    <PDFViewer
      showToolbar={false}
      className={className}
      style={style}
    >
      <Document cv={cv} template={template || undefined} />
    </PDFViewer>
  );
}
