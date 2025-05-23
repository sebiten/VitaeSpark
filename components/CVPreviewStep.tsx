// components/CVPreviewStepPurple.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCVW } from "./pdf/CVDocument";
import type { RespuestaCV } from "@/lib/types/cv";
import type { Session } from "@supabase/supabase-js";
import {
  Clock,
  Lock,
  Award,
  Percent,
  ShieldCheck,
  Handshake,
  User,
  Loader2,
  LockOpen,
  CreditCard,
  CheckCircle,
  Download,
  Phone,
  CheckCheck,
  CheckCheckIcon,
  CheckCircle2Icon,
  CheckIcon,
  Unlock,
  CheckCircleIcon,
  TouchpadIcon,
  HandIcon,
  Pointer,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Array de testimonios
export const testimonials = [
  {
    text: "Actualicé mi CV con el nuevo formato y en pocos días ya me estaban llamando para entrevistas, la verdad, re útil gracias.",
    author: "María S.",
  },
  {
    text: "Después de renovar mi currículum, empecé a recibir muchas más respuestas de empresas, se nota la diferencia, buen precio.",
    author: "Carlos M.",
  },
  {
    text: "Estuve meses buscando sin suerte. Cambie el CV y al toque conseguí laburo, muy buena la herramienta y asequible.",
    author: "Alejandra P.",
  },
  {
    text: "Pasé de no recibir ni un mail a tener varias propuestas encima, me ayudaron un montón y no es tan caro, muchas gracias.",
    author: "Laura T.",
  },
  {
    text: "Antes sentia que mi cv no rendia. Con este formato, me empezaron a llegar oportunidades de verdad, vale cada peso.",
    author: "Daniel R.",
  },
  {
    text: "Fue una inversión chica pero que me sirvió un montón para mover mi carrera, la verdad lo recomiendo.",
    author: "Sofía V.",
  },
  {
    text: "Gracias al nuevo CV pude mostrar mejor mis logros y eso me sirvió para negociar un mejor sueldo, muchas gracias!.",
    author: "Javier M.",
  },
  {
    text: "Quería cambiar de rubro y el nuevo CV me ayudó a resaltar mis habilidades, me abrió nuevas puertas se los agradezco.",
    author: "Miguel Á.",
  },
  {
    text: "Bastante rapido y profesional el curriculum, muy buen precio",
    author: "Joaquin B.",
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

  const renderTemplate = useMemo(() => {
    return (
      <PDFViewer showToolbar={false} className="w-full h-full">
        <DocumentoCVW cv={cvData} template={template} />
      </PDFViewer>
    );
  }, [cvData, template]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const precioOriginal = 2500;
  const precioOferta = 1999;
  const ahorro = precioOriginal - precioOferta;
  const descuentoPorcentaje = Math.round((ahorro / precioOriginal) * 100);

  return (
    <div className="w-full p-2 rounded-xl shadow-xl">
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

      <div className="relative w-full rounded-lg overflow-hidden bg-white mb-6 shadow-lg">
        <div
          className="w-full relative"
          style={{
            aspectRatio: "1/1.414",
            maxHeight: "60vh",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderTemplate}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/60 py-3 px-4 text-center">
          <p className="text-white text-sm font-medium flex items-center justify-center">
            Desliza con el dedo para ver todo el CV
          </p>
          <p className="text-sm text-white italic">
            Vista protegida con marca de agua
          </p>
        </div>
      </div>

      <div className="mb-2 rounded-lg p-4 bg-slate-800/40 border border-slate-900">
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
      <Card className="border-0 bg-slate-800/40 text-white">
        <CardContent className="space-y-4">
          {/* Pricing */}
          <div className="pb-2">
            <p className="flex items-center text-lg font-medium">
              <ShieldCheck className="h-5 w-5 text-green-400 mr-2" />
              Pago 100% Seguro
            </p>
          </div>
          {/* <div className="space-y-2">
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
          </div> */}

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
                Tras el pago Descargalo desde tu{" "}
                <Link href="/perfil" className="text-blue-400 hover:underline">
                  perfil
                </Link>{" "}
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
          <Button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#009ee3] to-[#008cc8] hover:from-[#00a9f0] hover:to-[#0095d4] text-white font-bold text-lg border-none 
      shadow-[0_10px_25px_-5px_rgba(0,158,227,0.4)] transition-all duration-300 
      hover:shadow-[0_15px_30px_-5px_rgba(0,158,227,0.6)] 
      hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group py-6"
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
              <div className="flex items-center justify-center gap-1">
                <img src="/logompsolomano.png" className="h-10 w-10" />
                <span className="font-semibold tracking-wide mb-0.5">
                  Desbloquear por $1999 ARS
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
        </CardContent>
      </Card>
    </div>
  );
}
