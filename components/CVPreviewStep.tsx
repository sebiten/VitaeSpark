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
  CreditCard,
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
import Image from "next/image";

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
    <div className="w-full p-6 rounded-xl  shadow-xl">
      {/* Header */}
      <div className="text-center space-y-3 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/30 border border-purple-500/30">
          <p className="text-purple-400 font-medium text-sm">
            ¡Oferta por tiempo limitado!
          </p>
          <Clock className="w-4 h-4 text-purple-400 ml-2" />
        </div>

        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
          ¡Tu CV Profesional está listo!
        </h2>

        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Desbloquea ahora y aumenta tus posibilidades de conseguir entrevistas
        </p>
      </div>

      {/* CV Preview */}
      <div className="relative w-full rounded-lg overflow-hidden bg-white mb-6 shadow-lg">
        <div
          className="w-full relative"
          style={{
            aspectRatio: "1/1.414" /* A4 aspect ratio */,
            maxHeight: "60vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onDoubleClick={handleDoubleClick}
        >
          {renderTemplate}
        </div>

        {/* Watermark overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4 text-center">
          <p className="text-white text-sm font-medium flex items-center justify-center">
            <Lock className="w-4 h-4 mr-2" />
            Versión de muestra con marca de agua
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-6 rounded-lg p-4 bg-slate-800/40 border border-slate-900">
        <div className="flex items-center mb-3">
          <Award className="w-5 h-5 text-purple-400 mr-2" />
          <h3 className="text-white font-medium">
            Lo que dicen nuestros clientes
          </h3>
        </div>

        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-full">
                <div className="p-2">
                  <p className="text-slate-300 text-sm italic">
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

      {/* Pricing and Security */}
      <Card className="mb-6 border-0 bg-slate-800/40 text-white">
        <CardContent className="space-y-4">
          {/* Pricing */}
          <div className="pb-2">
            <p className="flex items-center text-lg font-medium">
              <ShieldCheck className="h-5 w-5 text-green-400 mr-2" />
              Pago 100% Seguro
            </p>
          </div>
          <div className="space-y-2">
            <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 text-white uppercase">
              <Percent className="w-4 h-4 mr-1" />
              {descuentoPorcentaje}% DE DESCUENTO
            </Badge>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-lg line-through">
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

          {/* Security features */}
          <div className="grid gap-2">
            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <Handshake className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Pago seguro con MercadoPago.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <User className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Tu CV se vinculará a tu cuenta al pagar.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <Download className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Descargalo desde tu{" "}
                <Link href="/perfil" className="text-blue-400 hover:underline">
                  perfil
                </Link>{" "}
                siempre que quieras.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Tras el pago, serás redirigido a tu{" "}
                <Link href="/perfil" className="text-blue-400 hover:underline">
                  perfil
                </Link>
                .
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <User className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Si pagas desde la app, iniciá sesión y accedé a tu{" "}
                <Link href="/perfil" className="text-blue-400 hover:underline">
                  perfil para descargar tu cv
                </Link>
                .
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-slate-700/50 p-3">
              <CreditCard className="h-5 w-5 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Pagá con tarjeta de credito, débito y más en MercadoPago.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Button */}
      {userSession ? (
        <div className="space-y-3 mx-1">
          <Button
            disabled={loading}
            className="w-full py-6 rounded-xl bg-gradient-to-r from-[#009ee3] to-[#008cc8] hover:from-[#00a9f0] hover:to-[#0095d4] text-white font-bold text-lg border-none 
      shadow-[0_10px_25px_-5px_rgba(0,158,227,0.4)] transition-all duration-300 
      hover:shadow-[0_15px_30px_-5px_rgba(0,158,227,0.6)] 
      hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            onClick={handlePay}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="relative w-6 h-6">
                  <Loader2 className="w-6 h-6 animate-spin absolute" />
                  <div className="w-6 h-6 rounded-full border-2 border-white/20 absolute"></div>
                </div>
                <span className="font-medium tracking-wide">
                  Procesando pago...
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="relative  p-1.5 rounded-md shadow-inner">
                  <img
                    src="/logompsolomano.png"
                    width={32}
                    height={32}
                    alt="MercadoPago"
                    className="rounded-sm"
                  />
                </div>
                <span className=" font-semibold tracking-wide">
                  Continuar en Mercado Pago
                </span>
              </div>
            )}

            {/* Efecto de brillo */}
            <div className="absolute inset-0 w-1/4 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out"></div>

            {/* Efecto de borde brillante */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-xl border border-white/30 scale-[1.02] blur-[1px]"></div>
            </div>
          </Button>

          <div className="flex items-center justify-center text-xs text-slate-400 space-x-4 md:ml-0 ml-6">
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
            className="w-full text-white border border-slate-700 rounded-lg py-6 hover:bg-slate-800 transition-colors duration-200 text-lg"
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Iniciar sesión para desbloquear
          </Button>
        </Link>
      )}
    </div>
  );
}
