"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import { recordAnalyticsEvent } from "@/lib/analytics-events";
import { DocumentoCV } from "./CVDocument";
import { useCompatibleCvPhoto } from "./useCompatibleCvPhoto";

type Props = {
  cv: RespuestaCV["cv"];
  template?: string | null;
  cvId?: string;
  className?: string;
  label?: string;
};

export default function PDFDownloadButton({
  cv,
  template,
  cvId,
  className,
  label,
}: Props) {
  const { compatibleCv, isPreparingPhoto } = useCompatibleCvPhoto(cv);

  if (isPreparingPhoto) {
    return (
      <div className={className}>
        <Button
          className="w-full border border-[#2A2A2D] bg-[#1A1A1D] text-[#F4F4F5]"
          disabled
        >
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2">Preparando foto...</span>
        </Button>
      </div>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <DocumentoCV cv={compatibleCv} template={template || undefined} />
      }
      fileName={`CV-${(cv.nombre || "documento").replace(/\s+/g, "-")}.pdf`}
      className={className}
    >
      {({ loading }) => (
        <Button
          className="w-full bg-[#1A1A1D] hover:bg-[#2A2A2D] border border-[#2A2A2D] text-[#F4F4F5]"
          disabled={loading}
          onClick={() => {
            if (!cvId || loading) return;
            recordAnalyticsEvent({
              event_name: "download_completed",
              cv_id: cvId,
              template: template || undefined,
            });
          }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="ml-2">{loading ? "Descargando..." : (label || "Descargar PDF")}</span>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
