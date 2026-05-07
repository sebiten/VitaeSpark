"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV } from "./CVDocument";

type Props = {
  cv: RespuestaCV["cv"];
  template?: string | null;
  className?: string;
  label?: string;
};

export default function PDFDownloadButton({
  cv,
  template,
  className,
  label = "Descargar",
}: Props) {
  return (
    <PDFDownloadLink
      document={<DocumentoCV cv={cv} template={template || undefined} />}
      fileName={`CV-${(cv.nombre || "documento").replace(/\s+/g, "-")}.pdf`}
      className={className}
    >
      {({ loading }) => (
        <Button
          className="w-full bg-[#1A1A1D] hover:bg-[#2A2A2D] border border-[#2A2A2D] text-[#F4F4F5]"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <span className="ml-2">{loading ? "Preparando..." : label}</span>
        </Button>
      )}
    </PDFDownloadLink>
  );
}
