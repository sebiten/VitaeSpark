"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import { ShieldCheck, UserCheck, Download, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import PurpleTemplateHTML from "./pdf/template/preview-components/purple-template";
import HarvardTemplateHTML from "./pdf/template/preview-components/harvard-template";
import BlueTemplateHTML from "./pdf/template/preview-components/blue-template";
import GreenTemplateHTML from "./pdf/template/preview-components/green-template";

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
  const [open, setOpen] = useState(false);

  // Prevenir eventos de descarga
  useEffect(() => {
    const preventActions = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Agregar listeners para prevenir descargas
    document.addEventListener("contextmenu", preventActions);
    document.addEventListener("copy", preventActions);
    document.addEventListener("selectstart", preventActions);
    document.addEventListener("dragstart", preventActions);

    return () => {
      // Limpiar listeners al cerrar
      document.removeEventListener("contextmenu", preventActions);
      document.removeEventListener("copy", preventActions);
      document.removeEventListener("selectstart", preventActions);
      document.removeEventListener("dragstart", preventActions);
    };
  }, []);

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

  // Renderizar la plantilla según el template seleccionado
  const renderTemplate = () => {
    switch (template) {
      case "purple":
        return <PurpleTemplateHTML cv={cvData} />;
      case "harvard":
        return <HarvardTemplateHTML cv={cvData} />;
      case "blue":
        return <BlueTemplateHTML cv={cvData} />;
      case "green":
        return <GreenTemplateHTML cv={cvData} />;
      default:
        return <PurpleTemplateHTML cv={cvData} />;
    }
  };

  return (
    <div className="space-y-4 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Vista previa de tu CV
        </h2>
        <p className="text-gray-300 text-sm">
          Para ver todas las páginas y en mejor calidad completa el pago
        </p>
      </div>

      {/* Contenedor para la vista previa del CV con aspect ratio A4 */}
      <div className="relative w-full rounded-lg shadow-lg overflow-hidden bg-white flex flex-col items-center">
        {/* Marca de agua */}
        <div className="absolute inset-0 pointer-events-none select-none z-10">
          <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute text-gray-300 opacity-10 text-2xl font-bold whitespace-nowrap"
                  style={{
                    top: `${i * 100 - 1000}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "200%",
                  }}
                >
                  {Array.from({ length: 20 }).map((_, j) => (
                    <span key={j} className="mx-8">
                      VISTA PREVIA
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Área de visualización con aspect ratio A4 (1:√2 o aproximadamente 1:1.414) */}
        <div
          className="w-full relative z-0"
          style={{
            aspectRatio: "1/1.414" /* A4 aspect ratio */,
            maxHeight: "80vh",
            overflow: "auto",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onCopy={(e) => e.preventDefault()}
        >
          {renderTemplate()}
        </div>
      </div>

      <div className="mt-3 text-center text-xs text-gray-400">
        <p>
          Esta es una vista previa protegida. Para descargar el CV completo,
          realiza el pago.
        </p>
      </div>

      {/* Información de pago */}
      <div className="bg-[#0F0F10] border border-[#2A2A2D] rounded-lg p-4 shadow-inner">
        <div className="flex items-center gap-2 text-white font-semibold mb-4">
          <ShieldCheck className="text-green-500 w-5 h-5" />
          <span>Pago 100% Seguro</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <UserCheck className="text-blue-500 w-5 h-5 flex-shrink-0" />
            <p className="text-gray-300">
              Tu CV se asociará a tu cuenta una vez confirmado el pago.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Download className="text-indigo-400 w-5 h-5 flex-shrink-0" />
            <p className="text-gray-300">
              Podrás descargar tu CV todas las veces que quieras desde tu
              perfil.
            </p>
          </div>
        </div>
      </div>

      {/* Botón de pago */}
      {userSession ? (
        <Button
          disabled={loading}
          className="w-full py-4 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#0094d8] hover:from-[#008cc8] hover:to-[#0082c0] text-white font-semibold border-none shadow-lg transition-all duration-200"
          onClick={handlePay}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Redirigiendo...
            </>
          ) : (
            <>
              <div className="bg-white p-1 rounded-md mr-2 flex items-center justify-center">
                <Image
                  src="/logompsolomano.png"
                  width={20}
                  height={20}
                  alt="MercadoPago"
                  className="rounded-md"
                />
              </div>
              <span>Pagar con MercadoPago 1500 ARS</span>
            </>
          )}
        </Button>
      ) : (
        <Link href="/login" className="block w-full">
          <Button
            variant="outline"
            className="w-full text-white border border-white/20 rounded-lg py-3 hover:bg-white/5 transition-colors duration-200"
          >
            Iniciar sesión para pagar
          </Button>
        </Link>
      )}
    </div>
  );
}
