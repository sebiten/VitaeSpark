"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFViewer } from "@react-pdf/renderer";
import { RespuestaCV } from "@/lib/types/cv";
import { ShieldCheck, UserCheck, Download, Loader2, Lock } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(false);

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
    <div className="space-y-4 md:space-y-6 border border-[#2A2A2D] rounded-2xl shadow-xl w-full md:p-8">
      {/* Header optimizado para mobile */}
      {/* <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="text-xs border-[#3F3F46] w-full md:w-auto"
      >
        Volver al formulario
      </Button> */}
      <div className="flex flex-col md:items-center justify-between gap-3 p-4">
        <h2 className="text-lg md:text-xl text-center font-bold text-[#F4F4F5] ">
          Vista previa de tu CV
        </h2>
        <p className="text-white text-center italic">
          Para ver todas las paginas y en mejor calidad completa el pago y
          descarga el cv desde tu{" "}
          <Link className="text-blue-500" href="/perfil">
            Perfil
          </Link>
        </p>
      </div>
      <div className="text-center"></div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            className="mt-4 text-white border border-gray-600"
          >
            Ver CV completo
          </Button>
        </DialogTrigger>

        <DialogContent className=" w-full h-fautop-0 bg-accent ">
          <DialogHeader className="p-4 border-b">
            <DialogTitle className="text-lg">CV Completo</DialogTitle>
          </DialogHeader>

          <div className=" overflow-hidden bg-accent">
            <PDFViewer className="min-h-[50vh] w-[50-vw]" showToolbar={false}>
              <DocumentoCV cv={cvData} template={template} />
            </PDFViewer>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contenedor PDF optimizado para mobile */}
      <div className="w-full md:flex md:justify-center">
        <div className="relative scale-100 w-[calc(100vw-32px)] h-[calc(100vw-35px)] md:w-[210mm] md:h-[297mm] md:scale-100 mx-auto bg-white shadow-md overflow-hidden">
          {/* Capa protectora */}
          <div className="absolute inset-0 z-10" />
          {/* PDFViewer ajustado para mostrar solo una página */}
          <PDFViewer
            className="absolute inset-0 w-full h-full"
            showToolbar={false}
          >
            <DocumentoCV cv={cvData} template={template} />
          </PDFViewer>
        </div>
      </div>

      {/* Información de pago optimizada */}
      <div className="bg-[#0F0F10] border border-[#2A2A2D] rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-2 text-white font-semibold mb-3 text-base">
          <ShieldCheck className="text-green-500 w-4 h-4 md:w-5 md:h-5" />
          <span>Pago 100% Seguro</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2 md:gap-3">
            <UserCheck className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-[#A1A1AA]">
              Tu CV se asociará automáticamente a tu cuenta una vez confirmado
              el pago.
            </p>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <Download className="text-indigo-400 w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-[#A1A1AA]">
              Podrás descargar tu CV{" "}
              <strong>todas las veces que quieras</strong> desde tu perfil.
            </p>
          </div>

          <div className="flex items-start gap-2 md:gap-3">
            <Lock className="text-purple-400 w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-[#A1A1AA]">
              Si realizás el pago desde la app o la web,{" "}
              <strong>al iniciar sesión</strong> el sistema reconocerá tu
              compra.
            </p>
          </div>
        </div>
      </div>

      {/* Botón de pago optimizado */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                variant="link"
                disabled={!userSession || loading}
                className="w-full py-4 md:py-5 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#0094d8] text-white font-semibold duration-200 transform flex items-center justify-center text-sm md:text-base"
                onClick={handlePay}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                    Redirigiendo...
                  </>
                ) : (
                  <>
                    <Image
                      src="/logompsolomano.png"
                      width={20}
                      height={20}
                      alt="MercadoPago"
                      className="rounded-md"
                    />
                    <span className="">Pagar con MercadoPago 1500 ARS</span>
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
