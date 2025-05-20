"use client";

import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { RespuestaCV } from "@/lib/types/cv";
import {
  ShieldCheck,
  UserCheck,
  Loader2,
  CheckCircle,
  Lock,
  Clock,
  Award,
  Zap,
  Star,
  Unlock,
} from "lucide-react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCVW } from "./pdf/CVDocument";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import PaymentConfirmation from "./PaymentInformation";

// Array de testimonios
const testimonials = [
  {
    text: "Gracias al nuevo formato de mi CV conseguí varias entrevistas rápidamente. Muy recomendable.",
    author: "María S.",
  },
  {
    text: "Noté una clara mejora en las respuestas de las empresas después de actualizar mi currículum.",
    author: "Carlos M.",
  },
  {
    text: "Había estado buscando trabajo varios meses sin éxito, pero con este CV profesional finalmente conseguí empleo en pocas semanas.",
    author: "Alejandra P.",
  },
  {
    text: "Me sorprendió que los reclutadores destacaran lo ordenado y claro que estaba mi nuevo CV.",
    author: "Roberto G.",
  },
  {
    text: "Antes ni siquiera recibía respuestas, y ahora he tenido que elegir entre varias ofertas laborales. ¡Funcionó genial!",
    author: "Laura T.",
  },
  {
    text: "Mi currículum nunca había pasado tantos filtros automáticos. Definitivamente el formato ATS marcó la diferencia.",
    author: "Daniel R.",
  },
  {
    text: "Sin duda, una excelente inversión para impulsar mi carrera profesional. Valió cada peso.",
    author: "Sofía V.",
  },
  {
    text: "Logré negociar un mejor salario gracias a que ahora puedo mostrar claramente mis logros en mi CV.",
    author: "Javier M.",
  },
  {
    text: "Los reclutadores empezaron a contactarme directamente tras mejorar la presentación de mi experiencia profesional.",
    author: "Ana L.",
  },
  {
    text: "Pude cambiar de sector laboral fácilmente porque mi nuevo CV destaca claramente mis habilidades transferibles.",
    author: "Miguel Á.",
  },
];

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
  const renderTemplate = useMemo(() => {
    switch (template) {
      case "purple":
      case "harvard":
      case "blue":
      case "green":
      default:
        return (
          <PDFViewer showToolbar={false} className="w-full h-full">
            <DocumentoCVW cv={cvData} template={template} />
          </PDFViewer>
        );
    }
  }, [cvData, template]); // Solo re-renderizar cuando cambian estos valores

  // Formato para el contador de tiempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    // Scroll to the top of the container when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-4 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header con elementos persuasivos */}
      <div className="text-center space-y-2 mb-4">
        <div className="flex justify-center mb-2">
          <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold px-3 py-1">
            <Clock className="w-4 h-4 mr-1" /> Oferta por tiempo limitado
          </Badge>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          ¡Tu CV Profesional está listo!
        </h2>
        <p className="text-gray-300 text-sm">
          Desbloquea ahora y aumenta tus posibilidades de conseguir entrevistas
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
            overflow: "hidden", // Cambiado de "auto" a "hidden"
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform", // Ayuda a estabilizar el renderizado
            transform: "translateZ(0)", // Fuerza la aceleración por hardware
          }}
          onDoubleClick={handleDoubleClick}
        >
          {renderTemplate}
        </div>

        {/* Watermark notice overlay mejorado */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4 text-center">
          <p className="text-white text-sm font-medium flex items-center justify-center">
            <Lock className="w-4 h-4 mr-1" />
            Versión de muestra con marca de agua
          </p>
        </div>
      </div>

      {/* Beneficios destacados antes del componente PaymentConfirmation */}
      <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-500/20">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
          <Award className="w-5 h-5 mr-2 text-purple-400" />
          Lo que obtendrás al desbloquear:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200 text-sm">
              CV optimizado para sistemas ATS
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200 text-sm">
              Formato profesional de alta calidad
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200 text-sm">
              Descarga inmediata en PDF
            </span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-gray-200 text-sm">
              Acceso permanente a tu CV
            </span>
          </div>
        </div>
      </div>

      {/* Carrusel de testimonios con shadcn/ui */}
      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-3 border border-blue-500/20">
        <div className="flex">
          <Award className="w-5 h-5 text-purple-400 mb-1 inline-block mr-2" />
          <h3 className="text-white">Testimonios</h3>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            active: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-full">
                <div className="p-1">
                  <p className="text-gray-300 text-sm italic">
                    "{testimonial.text}" - {testimonial.author}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <PaymentConfirmation />

      {/* Botón de pago mejorado */}
      <div className="mt-5">
        {userSession ? (
          <div className="space-y-3">
            <Button
              disabled={loading}
              className="w-full py-6 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#008cc8] hover:from-[#008cc8] hover:to-[#007ab0] text-white font-semibold text-lg border-none shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
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
                  <span className="text-sm">
                    Pagar en MercadoPago $2000 ARS
                  </span>
                </div>
              )}
            </Button>
            <div className="flex items-center justify-center text-xs ml-6 md:ml-0 text-gray-400 space-x-3">
              <div className="flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 text-green-400" />
                <span>Pago 100% seguro</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1 text-yellow-400" />
                <span>Acceso inmediato</span>
              </div>
              <div className="flex items-center">
                <UserCheck className="w-3 h-3 mr-1 text-blue-400" />
                <span>Soporte incluido</span>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="block w-full">
            <Button
              variant="outline"
              className="w-full text-white border border-white/20 rounded-lg py-6 hover:bg-white/5 transition-colors duration-200 text-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-white/5 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              <span className="relative z-10 flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                Iniciar sesión para desbloquear
              </span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
