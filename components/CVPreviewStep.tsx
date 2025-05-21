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
  Handshake,
  User,
  Download,
  Percent,
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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Array de testimonios
export const testimonials = [
  {
    text: "Actualicé mi CV con el nuevo formato y en pocos días ya me estaban llamando para entrevistas. La verdad, re útil.",
    author: "María S.",
  },
  {
    text: "Después de renovar mi currículum, empecé a recibir muchas más respuestas de empresas. Se nota la diferencia, buen precio.",
    author: "Carlos M.",
  },
  {
    text: "Estuve meses buscando sin suerte. Cambie el CV y al toque conseguí laburo. Muy buena la herramienta y asequible.",
    author: "Alejandra P.",
  },
  {
    text: "Varios reclutadores me remarcaron lo claro y profesional que se ve mi nuevo CV. Eso antes no pasaba.",
    author: "Roberto G.",
  },
  {
    text: "Pasé de no recibir ni un mail a tener varias propuestas encima. Me ayudó un montón y no es tan caro.",
    author: "Laura T.",
  },
  {
    text: "Antes sentia que mi cv no rendia. Con este formato, me empezaron a llegar oportunidades de verdad, vale cada peso.",
    author: "Daniel R.",
  },
  {
    text: "Fue una inversión chica pero que me sirvió un montón para mover mi carrera. Recomendado.",
    author: "Sofía V.",
  },
  {
    text: "Gracias al nuevo CV pude mostrar mejor mis logros y eso me sirvió para negociar un mejor sueldo.",
    author: "Javier M.",
  },
  {
    text: "Apenas actualicé mi CV, empezaron a escribirme directo. Se nota que ahora está mucho mejor presentado.",
    author: "Ana L.",
  },
  {
    text: "Quería cambiar de rubro y el nuevo CV me ayudó a resaltar mis habilidades. Me abrió nuevas puertas.",
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

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error al crear preferencia:", errorData);
        alert("No se pudo iniciar el pago. Intenta nuevamente.");
        return;
      }

      const { init_point } = await res.json();

      if (init_point) {
        window.location.href = init_point;
      } else {
        alert("No se pudo iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error en handlePay:", error);
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
  const precioOriginal = 2500;
  const precioOferta = 1999;
  const ahorro = precioOriginal - precioOferta;
  const descuentoPorcentaje = Math.round((ahorro / precioOriginal) * 100);

  return (
    <div className="space-y-2 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header con elementos persuasivos */}
      <div className="text-center space-y-2 mb-4">
        <div className=" rounded-lg p-3  animate-pulse">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-[#7C3AED] font-medium text-sm md:text-base">
              ¡Oferta por tiempo limitado!
            </p>
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
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
      <section className="space-y-2">


        {/* Lo que obtendrás */}
        {/* <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-400" />
            Lo que obtendrás al desbloquear:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-200 text-base">
                CV optimizado para sistemas ATS
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-200 text-base">
                Formato profesional de alta calidad
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-200 text-base">
                Descarga inmediata desde tu perfil
              </span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-gray-200 text-base">
                Acceso permanente a tu CV
              </span>
            </div>
          </div>
        </div> */}
        {/* Carrusel de testimonios */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-4 border border-blue-500/20">
          <div className="flex items-center mb-2">
            <Award className="w-5 h-5 text-purple-400 mr-2" />
            <h3 className="text-white font-medium">
              Lo que dicen nuestros clientes
            </h3>
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
                  <div className="p-2  rounded-md">
                    <p className="text-gray-300 text-sm italic">
                      "{testimonial.text}"
                    </p>
                    <p className="text-right text-purple-400 text-sm font-medium mt-2">
                      - {testimonial.author}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Garantías de seguridad */}
        <Card className="w-full border-0 bg-[#1e1e24] text-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-start gap-2 text-center text-xl font-semibold">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              Pago 100% Seguro
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white">
              <Percent className="w-4 h-4 mr-1" />
              {descuentoPorcentaje}% DE DESCUENTO
            </Badge>

            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-gray-400 text-lg line-through">
                ${precioOriginal} ARS
              </span>
              <span className="text-3xl font-bold text-white">
                ${precioOferta} ARS
              </span>
            </div>

            <p className="text-green-400 font-medium">
              ¡Ahorras ${ahorro} ARS!
            </p>
          </div>
          <CardContent className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
                <Handshake className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                <p className="text-sm text-gray-300">
                  Pago protegido por MercadoPago
                </p>
              </div>
              <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
                <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                <p className="text-sm text-gray-300">
                  Tu CV se asociará a tu cuenta una vez confirmado el pago.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
                <Download className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
                <p className="text-sm text-gray-300">
                  Podrás descargar tu CV todas las veces que quieras desde tu{" "}
                  <a href="/perfil" className="text-blue-400 hover:underline">
                    perfil.
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Botón de pago mejorado con urgencia */}
        <div className="mt-1">
          {userSession ? (
            <div className="space-y-3">
              <Button
                disabled={loading}
                className="w-full py-7 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#008cc8] hover:from-[#008cc8] hover:to-[#007ab0] text-white font-bold text-lg border-none shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
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
                      ¡COMPRAR AHORA POR ${precioOferta} ARS!
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 w-3/4 h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              </Button>

              <div className="flex items-center justify-center text-xs text-gray-400 space-x-4 mt-2">
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
      </section>
    </div>
  );
}
