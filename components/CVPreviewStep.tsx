"use client";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCVW } from "./pdf/CVDocument";
import type { RespuestaCV } from "@/lib/types/cv";
import type { Session } from "@supabase/supabase-js";
import {
  Award,
  ShieldCheck,
  User,
  Loader2,
  CreditCard,
  Download,
  TrendingUp,
  Target,
  Star,
  CheckCircle,
  Zap,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";

// Array de testimonios
export const testimonials = [
  {
    text: "Actualicé mi CV con el nuevo formato y en pocos días ya me estaban llamando para entrevistas, la verdad, re útil gracias.",
    author: "María S.",
    rating: 5,
  },
  {
    text: "Después de renovar mi currículum, empecé a recibir muchas más respuestas de empresas, se nota la diferencia, buen precio.",
    author: "Carlos M.",
    rating: 5,
  },
  {
    text: "Estuve meses buscando sin suerte. Cambie el CV y al toque conseguí laburo, muy buena la herramienta y asequible.",
    author: "Alejandra P.",
    rating: 5,
  },
  {
    text: "Pasé de no recibir ni un mail a tener varias propuestas encima, me ayudaron un montón y no es tan caro, muchas gracias.",
    author: "Laura T.",
    rating: 5,
  },
  {
    text: "Antes sentia que mi cv no rendia. Con este formato, me empezaron a llegar oportunidades de verdad, vale cada peso.",
    author: "Daniel R.",
    rating: 5,
  },
];

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

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Header mejorado */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle className="w-8 h-8 text-green-400" />
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-1">
            ¡CV Generado!
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text">
          Tu CV Profesional está Listo
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Desbloquea tu CV optimizado y aumenta tus posibilidades de conseguir
          entrevistas
        </p>
      </div>

      {/* Preview del CV mejorado */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
        <CardContent className="p-6">
          <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-2xl">
            <div
              className="w-full relative"
              style={{
                aspectRatio: "1/1.414",
                maxHeight: "70vh",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {renderTemplate}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent py-4 px-6">
              <div className="text-center space-y-2">
                <p className="text-white text-sm font-medium">
                  📱 Desliza para ver todo el contenido
                </p>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                  Vista protegida con marca de agua
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficios destacados */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">
                Impulsa tu Carrera Profesional
              </h2>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center space-y-2">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto" />
                <h3 className="font-semibold text-white">Más Entrevistas</h3>
                <p className="text-slate-300 text-sm">CV optimizado para ATS</p>
              </div>
              <div className="text-center space-y-2">
                <Award className="w-12 h-12 text-blue-400 mx-auto" />
                <h3 className="font-semibold text-white">Diseño Profesional</h3>
                <p className="text-slate-300 text-sm">Formato que destaca</p>
              </div>
              <div className="text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto" />
                <h3 className="font-semibold text-white">Resultados Rápidos</h3>
                <p className="text-slate-300 text-sm">Descarga inmediata</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección de pago mejorada */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50">
        <CardContent className="p-6 space-y-6">
          {/* Precio destacado */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">
              Desbloquea tu CV Profesional
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl font-bold text-white">$3.000</span>
              <span className="text-slate-400">ARS</span>
            </div>
            <p className="text-slate-300">
              Inversión única • Descarga inmediata • Sin suscripciones
            </p>
          </div>

          {/* Características de seguridad simplificadas */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
              <ShieldCheck className="w-6 h-6 text-green-400 flex-shrink-0" />
              <span className="text-white font-medium">Pago 100% Seguro</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
              <Download className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <span className="text-white font-medium">Descarga Inmediata</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
              <CreditCard className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <span className="text-white font-medium">Todos los medios de pago</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30">
              <User className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <span className="text-white font-medium">
                Acceso en tu Perfil
              </span>
            </div>
          </div>

          {/* Botón de pago mejorado */}
          <Button
            disabled={loading}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#009ee3] to-[#008cc8] hover:from-[#00a9f0] hover:to-[#0095d4] text-white font-bold text-xl border-none 
            shadow-[0_15px_35px_-5px_rgba(0,158,227,0.4)] transition-all duration-300 
            hover:shadow-[0_20px_40px_-5px_rgba(0,158,227,0.6)] 
            hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            onClick={handlePay}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-bold tracking-wide">Procesando...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <img src="/logompsolomano.png" className="h-12 w-12" />
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold leading-tight">
                    Pagar con Mercado Pago
                  </span>
                </div>
              </div>
            )}

            {/* Efecto de brillo mejorado */}
            <div className="absolute inset-0 w-1/3 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out"></div>
          </Button>

          {/* Nota de acceso */}
          <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 text-sm">
              💡 Después del pago, accede a tu CV desde tu{" "}
              <Link
                href="/perfil"
                className="text-blue-400 hover:underline font-medium"
              >
                perfil
              </Link>{" "}
              para descargarlo sin marca de agua
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
