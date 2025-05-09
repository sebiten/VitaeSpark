"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFViewer } from "@react-pdf/renderer";
import { RespuestaCV } from "@/lib/types/cv";
import {
  ShieldCheck,
  UserCheck,
  Download,
  AlertCircleIcon,
  Loader2,
  Lock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import type { Session } from "@supabase/supabase-js";
import { DocumentoCV } from "./pdf/CVDocument";

type Props = {
  cvData: RespuestaCV["cv"];
  template: string;
  onBack: () => void;
  userSession: Session | null;
};

export default function CVPreviewStep({
  cvData,
  template,
  onBack,
  userSession,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!userSession) return;

    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-[#1F1F22] border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-3 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#F4F4F5]">
          Vista previa de tu CV
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="text-xs border-[#3F3F46]"
        >
          Volver al formulario
        </Button>
      </div>
      {/* Visualizador de PDF */}

      {/* PDFViewer ajustado responsivamente */}
      <div className="w-full">
        <div className="relative h-[50vh] md:h-screen w-full overflow-hidden rounded-lg border border-[#2A2A2D]">
          {/* Capa protectora */}
          <div
            className="absolute inset-0 z-10"
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.preventDefault()}
            style={{ userSelect: "none", WebkitUserSelect: "none" }}
          />

          {/* Visor PDF */}
          <PDFViewer className="w-full h-full" showToolbar={false}>
            <DocumentoCV cv={cvData} template={template} />
          </PDFViewer>
        </div>
      </div>

      {/* Información de seguridad y beneficios */}
      <Card className="bg-[#0F0F10] border-[#2A2A2D] text-[#D4D4D8] ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-base">
            <ShieldCheck className="text-green-500 w-5 h-5" />
            Pago 100% Seguro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start text-center gap-3">
            <UserCheck className="text-blue-500 w-5 h-5 mt-1" />
            <p className="text-sm text-[#A1A1AA] mt-1">
              Tu CV se asociará automáticamente a tu cuenta una vez confirmado
              el pago.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Download className="text-indigo-400 w-5 h-5 mt-1" />
            <p className="text-sm text-[#A1A1AA] mt-1">
              Podrás descargar tu CV{" "}
              <strong>todas las veces que quieras</strong> desde tu perfil.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Lock className="text-purple-400 w-5 h-5 mt-1" />
            <p className="text-sm text-[#A1A1AA] mt-1">
              Si realizás el pago desde la app o la web,{" "}
              <strong>al iniciar sesión</strong> el sistema reconocerá tu compra
              y habilitará automáticamente la descarga. No hace falta que subas
              comprobantes.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Botón de pago */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                variant="link"
                disabled={!userSession || loading}
                className="w-full py-5 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#0094d8] text-white font-semibold duration-200 transform flex items-center justify-center"
                onClick={handlePay}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Redirigiendo...
                  </>
                ) : (
                  <>
                    <Image
                      src="/logompsolomano.png"
                      width={24}
                      height={24}
                      alt="MercadoPago"
                      className="rounded-md"
                    />
                    <span className="ml-2">Pagar con MercadoPago 1500 ARS</span>
                  </>
                )}
              </Button>

              {!userSession && (
                <div className="flex flex-col items-center justify-start mt-2 gap-1">
                  <Link href="/login">
                    <Button
                      variant="link"
                      className="text-xs text-white font-bold hover:underline"
                    >
                      <Lock className="w-3 h-3 mr-1" />
                      Iniciar sesión ahora
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </TooltipTrigger>
          {!userSession && (
            <TooltipContent>
              <p>Debes iniciar sesión para pagar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
