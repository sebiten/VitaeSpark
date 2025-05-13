"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import {
  ShieldCheck,
  UserCheck,
  Download,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCVW } from "./pdf/CVDocument";
import PaymentConfirmation from "./PaymentInformation";

type Props = {
  cvData: RespuestaCV["cv"];
  template: string;
  onBack: () => void;
  userSession: Session | null;
};

export default function CVPreviewStepPurple({
  cvData,
  template,
  onBack,
  userSession,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!userSession) return;

    setLoading(true);
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template }),
      });

      const { init_point } = await res.json();
      if (init_point) {
        window.location.href = init_point;
      } else {
        alert("No se pudo iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      alert("Error al procesar el pago. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Prevent double-click
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Renderizar la plantilla según el template seleccionado
  const renderTemplate = () => {
    switch (template) {
      case "purple":
      case "harvard":
      case "blue":
      case "green":
      default:
        return (
          <PDFViewer showToolbar={false}>
            <DocumentoCVW cv={cvData} template={template} />
          </PDFViewer>
        );
    }
  };

  return (
    <div className="space-y-4 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header */}
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text ">
          Vista previa de tu CV
        </h2>
        <p className="text-gray-300 text-sm">
          Para ver todas las páginas y en mejor calidad completa el pago
        </p>
      </div>

      {/* Contenedor para la vista previa del CV con aspect ratio A4 */}
      <div className="relative w-full rounded-lg shadow-lg overflow-hidden bg-white flex flex-col items-center">
        {/* Área de visualización con aspect ratio A4 (1:√2 o aproximadamente 1:1.414) */}
        <div
          className="w-full relative z-0 cv-preview-container bg-center"
          style={{
            aspectRatio: "1/1.414" /* A4 aspect ratio */,
            maxHeight: "80vh",
            width: "full",
            overflow: "auto",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onDoubleClick={handleDoubleClick}
        >
          {renderTemplate()}
        </div>

        {/* Watermark notice overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-2 px-4 text-center">
          <p className="text-white text-sm font-medium">
            Versión de muestra con marca de agua
          </p>
        </div>
      </div>

      {/* Sección de beneficios y pago unificada */}
      <PaymentConfirmation />

      {/* Botón de pago */}
      <div className="mt-5">
        {userSession ? (
          <Button
            disabled={loading}
            className="w-full py-5 rounded-lg bg-[#009ee3] hover:bg-[#008cc8] text-white font-semibold text-lg border-none shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            onClick={handlePay}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Redirigiendo...
              </>
            ) : (
              <div className="flex items-center justify-center">
                <img
                  src="/logompsolomano.png"
                  width={36}
                  height={36}
                  alt="MercadoPago"
                  className="rounded-md mr-3"
                />
                <span className="text-sm">Pagar en MercadoPago $1500 ARS</span>
              </div>
            )}
          </Button>
        ) : (
          <Link href="/login" className="block w-full">
            <Button
              variant="outline"
              className="w-full text-white border border-white/20 rounded-lg py-4 hover:bg-white/5 transition-colors duration-200 text-lg"
            >
              Iniciar sesión para pagar
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
