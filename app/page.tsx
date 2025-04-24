import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import { motion } from "framer-motion";
import CVForm from "@/components/pdf/CVForm";
import Hero from "@/components/hero";

export default function GeneradorCV() {
  return (
    <div className=" mx-auto space-y-10">
      <Hero/>
    </div>
  );
}
