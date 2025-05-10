"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import { ShieldCheck, UserCheck, Download, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PurpleTemplate from "./pdf/template/PurpleTemplate";

type Props = {
  cvData: RespuestaCV["cv"];
  template: string;
  onBack: () => void;
  userSession: Session | null;
};

export default function CVPreviewStepHTML({
  cvData,
  template,
  onBack,
  userSession,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Prevenir eventos de descarga
  useEffect(() => {
    if (open) {
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
    }
  }, [open]);

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

  // Renderizar el CV directamente en HTML
  const renderCV = () => {
    // Determinar qué plantilla mostrar
    const isPurple = template === "purple";
    const isHarvard = template === "harvard";

    return (
      <div className="bg-white p-8 w-full max-w-[800px] mx-auto shadow-lg">
        {isPurple ? (
          <PurpleTemplate cv={cvData} />
        ) : isHarvard ? (
          <div className="font-serif">
            {/* Header - Harvard Template */}
            <div className="text-center mb-4">
              <h1 className="text-xl font-bold mb-1">{cvData.nombre}</h1>
              <p className="text-sm text-blue-800">
                {cvData.contacto.join(" • ")}
              </p>
            </div>

            <p className="text-sm text-justify mb-4">{cvData.sobreMi}</p>

            {/* Experience - Harvard Template */}
            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">
                Experiencia Profesional
              </h2>
              {cvData.experiencia.map((exp, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-bold">{exp.empresa}</h3>
                      <p className="text-sm italic">{exp.cargo}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">{exp.ubicacion}</p>
                      <p className="text-xs">{exp.fechas}</p>
                    </div>
                  </div>
                  <ul className="text-xs space-y-1 ml-4 mt-1">
                    {exp.logros.map((logro, j) => (
                      <li key={j} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{logro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education - Harvard Template */}
            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">
                Educación
              </h2>
              {cvData.formacion.map((edu, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-bold">{edu.institucion}</h3>
                      <p className="text-sm italic">{edu.titulo || ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">{edu.ubicacion}</p>
                      <p className="text-xs">{edu.fechas}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills - Harvard Template */}
            <div className="mb-4">
              <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">
                Habilidades
              </h2>
              <ul className="text-xs space-y-1 ml-4">
                {cvData.habilidades.map((skill, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages - Harvard Template */}
            {cvData.idiomas.length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">
                  Idiomas
                </h2>
                <ul className="text-xs space-y-1 ml-4">
                  {cvData.idiomas.map((lang, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{lang}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Info - Harvard Template */}
            {cvData.informacionAdicional.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase border-b border-black pb-1 mb-3">
                  Información Adicional
                </h2>
                <ul className="text-xs space-y-1 ml-4">
                  {cvData.informacionAdicional.map((info, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Default Professional Template
          <div>
            {/* Header - Professional Template */}
            <div className="border-b-2 border-gray-300 pb-4 mb-6">
              <h1 className="text-xl font-bold text-gray-800">
                {cvData.nombre}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{cvData.puesto}</p>
              <p className="text-xs text-gray-500 mt-2">
                {cvData.contacto.join(" | ")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2">
                {/* Summary */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold uppercase text-gray-700 mb-2">
                    Perfil Profesional
                  </h2>
                  <p className="text-sm text-gray-600">{cvData.sobreMi}</p>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold uppercase text-gray-700 mb-3">
                    Experiencia Profesional
                  </h2>
                  {cvData.experiencia.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="text-sm font-bold">{exp.cargo}</h3>
                      <p className="text-xs text-gray-700">
                        {exp.empresa} | {exp.fechas} | {exp.ubicacion}
                      </p>
                      <ul className="text-xs text-gray-600 mt-2 space-y-1 ml-4">
                        {exp.logros.map((logro, j) => (
                          <li key={j} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{logro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column */}
              <div>
                {/* Education */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold uppercase text-gray-700 mb-3">
                    Formación
                  </h2>
                  {cvData.formacion.map((edu, i) => (
                    <div key={i} className="mb-3">
                      <h3 className="text-sm font-semibold">
                        {edu.institucion}
                      </h3>
                      <p className="text-xs text-gray-600">{edu.titulo}</p>
                      <p className="text-xs text-gray-500">
                        {edu.fechas} | {edu.ubicacion}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h2 className="text-sm font-bold uppercase text-gray-700 mb-2">
                    Habilidades
                  </h2>
                  <ul className="text-xs text-gray-600 space-y-1 ml-4">
                    {cvData.habilidades.map((skill, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                {cvData.idiomas.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-sm font-bold uppercase text-gray-700 mb-2">
                      Idiomas
                    </h2>
                    <ul className="text-xs text-gray-600 space-y-1 ml-4">
                      {cvData.idiomas.map((lang, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{lang}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Info */}
                {cvData.informacionAdicional.length > 0 && (
                  <div>
                    <h2 className="text-sm font-bold uppercase text-gray-700 mb-2">
                      Información Adicional
                    </h2>
                    <ul className="text-xs text-gray-600 space-y-1 ml-4">
                      {cvData.informacionAdicional.map((info, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{info}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text ">
          Vista previa de tu CV
        </h2>
        <p className="text-gray-300 text-sm">
          Para ver todas las páginas y en mejor calidad completa el pago
        </p>
      </div>

      {/* Botón para abrir el modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="w-full py-3 text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 border-none shadow-md transition-all duration-200"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Ver vista previa del CV
          </Button>
        </DialogTrigger>

        <DialogContent className=" max-w-7xl p-0 bg-foreground rounded-2xl border border-gray-700">
          <DialogHeader className="p-4 border-b border-gray-700">
            <DialogTitle className="text-lg text-white font-bold flex items-center">
              <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
              Vista protegida del CV
            </DialogTitle>
          </DialogHeader>

          <div className="bg-[#121214] p-4 relative">
            {/* Contenedor para la vista previa del CV */}
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

              {/* Área de visualización */}
              <div
                className="w-full overflow-auto relative z-0"
                style={{ height: "75vh", width: "100%" }}
                onContextMenu={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
              >
                {renderCV()}
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-gray-400">
              <p>
                Esta es una vista previa protegida. Para descargar el CV
                completo, realiza el pago.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
