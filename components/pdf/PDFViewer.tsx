"use client";

import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import type { RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV } from "./CVDocument";

export function PDFViewerComponent({ cvData }: { cvData: RespuestaCV["cv"] }) {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setShowPDF(!showPDF)}>
          {showPDF ? "Ocultar Vista Previa" : "Mostrar Vista Previa"}
        </button>

        <PDFDownloadLink
          document={<DocumentoCV cv={cvData} />}
          fileName="cv.pdf"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {({ loading }) => (loading ? "Generando PDF..." : "Descargar PDF")}
        </PDFDownloadLink>
      </div>

      {showPDF && (
        <div className="w-full h-[800px] border border-gray-300 rounded-md overflow-hidden">
          <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
            <DocumentoCV cv={cvData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}
