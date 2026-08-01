"use client";

import { PDFViewer } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV, DocumentoCVW } from "./CVDocument";
import { useCompatibleCvPhoto } from "./useCompatibleCvPhoto";

type Props = {
  cv: RespuestaCV["cv"];
  template?: string | null;
  watermark?: boolean;
  className?: string;
};

export default function PDFViewerPane({
  cv,
  template,
  watermark = false,
  className,
}: Props) {
  const { compatibleCv, isPreparingPhoto } = useCompatibleCvPhoto(cv);
  const Document = watermark ? DocumentoCVW : DocumentoCV;

  if (isPreparingPhoto) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F4F1EA] text-sm text-slate-500 ${className ?? ""}`}
      >
        Preparando vista del CV...
      </div>
    );
  }

  return (
    <PDFViewer
      showToolbar={false}
      className={className}
    >
      <Document cv={compatibleCv} template={template || undefined} />
    </PDFViewer>
  );
}
