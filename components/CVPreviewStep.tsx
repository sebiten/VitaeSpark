// components/CVPreviewStepPurple.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import type React from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@react-pdf/renderer";
import { DocumentoCVW } from "./pdf/CVDocument";
import type { RespuestaCV } from "@/lib/types/cv";
import type { Session } from "@supabase/supabase-js";
import {
  ShieldCheck,
  Handshake,
  User,
  Loader2,
  CreditCard,
  Download,
  CheckCircle,
  Globe2,
  ArrowLeft,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { toast } from "sonner";

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
    text: "Fue una inversión chica pero que me sirvió un montón para mover mi carrera, la verdad lo recomiendo podria agregar para colocar fotos tambien.",
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
    text: "Bastante rapido y profesional el curriculum, muy buen precio pero estaria bueno que tenga mas plantillas.",
    author: "Joaquin B.",
  },
  {
    text: "Me ayudó a destacar mis habilidades y logros de una manera clara y atractiva, muy buena la herramienta.",
    author: "Lucía G.",
  },
  {
    text: "Nunca pense que pagar 2500 por un cv valiera la pena, pero realmente marcó la diferencia, super recomendable.",
    author: "Federico L.",
  },
  {
    text: "El diseño es limpio y claro, consegui entrevistas al toque. Lo mejor es que no tenes que saber nada tecnico.",
    author: "Valeria D.",
  },
  {
    text: "Hice el cv en 10 minutos y al dia siguiente ya me estaban escribiendo, muy practica la herramienta.",
    author: "Nicolas G.",
  },
  {
    text: "Por ese precio esperaba algo basico, pero salio un cv profesional que me ayudo a conseguir trabajo rapido.",
    author: "Andrea T.",
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

  // Función para manejar el pago
  const handlePay = async () => {
    if (!userSession) return;

    let failureTracked = false;

    setLoading(true);
    track("Payment Started", {
      template,
      price: 2500,
      currency: "ARS",
    });
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        track("Payment Preference Failed", {
          status: res.status,
          template,
        });
        failureTracked = true;
        console.error("Error al crear preferencia:", errorData);
        toast.error("No se pudo iniciar el pago. Intenta nuevamente.");
        return;
      }

      const { init_point } = await res.json();

      if (init_point) {
        track("Payment Redirected", {
          template,
          price: 2500,
          currency: "ARS",
        });
        window.location.href = init_point;
      } else {
        track("Payment Preference Failed", { template });
        failureTracked = true;
        toast.error("No se pudo iniciar el pago. Intenta nuevamente.");
      }
    } catch (error) {
      if (!failureTracked) {
        track("Payment Preference Failed", { template });
      }
      console.error("Error en handlePay:", error);
      toast.error("Error al procesar el pago. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = useMemo(() => {
    return (
      <PDFViewer showToolbar={false} className="h-full w-full border-0">
        <DocumentoCVW cv={cvData} template={template} />
      </PDFViewer>
    );
  }, [cvData, template]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const precioOriginal = 2500;
  const precioOferta = 1500;
  const ahorro = precioOriginal - precioOferta;
  const descuentoPorcentaje = Math.round((ahorro / precioOriginal) * 100);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">
          ¡Tu CV Profesional está listo!
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Desbloquea ahora y aumenta tus posibilidades de conseguir entrevistas
        </p>
      </div>

      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      {/* CV Preview */}
      <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/30">
        <div
          className="relative mx-auto h-[72vh] min-h-[430px] w-full max-w-full overflow-hidden sm:aspect-[1/1.414] sm:h-auto sm:min-h-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderTemplate}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-4 text-center">
          <p className="text-white text-sm font-medium">
            Desliza con el dedo para ver todo el CV
          </p>
          <p className="text-white/80 text-xs mt-1">
            Vista protegida con marca de agua
          </p>
        </div>
      </div>

      {/* Pricing Card */}
      <Card className="min-w-0 border-white/10 bg-[#15151A] text-white shadow-2xl shadow-black/30">
        <CardContent className="p-6 space-y-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="w-full rounded-xl border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver y editar datos
          </Button>

          {/* Price Section */}
          <div className="text-center space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-xl font-bold text-white font-sans">
              Accede a tu CV Profesional
              <p className="text-sm text-slate-400 font-normal mt-1">
                Destácate en el mercado laboral con un CV diseñado para
                impresionar
              </p>
            </h3>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-white">$2.500</span>
              <span className="text-slate-400 font-medium">ARS</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 py-3 px-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-medium">Pago 100% Seguro</span>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <CheckCircle className="h-4 w-4 flex-shrink-0 text-purple-300" />
            <p className="text-sm leading-6 text-purple-100">
              Al pagar se desbloquea la version final de tu CV sin marcas de
              agua, lista para descargar en PDF desde tu perfil.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Globe2 className="h-4 w-4 flex-shrink-0 text-blue-300" />
            <p className="text-sm leading-6 text-blue-100">
              El pago se procesa con MercadoPago y depende de los medios
              disponibles para tu pais. Luego puedes descargar tu CV en PDF
              optimizado para ATS desde tu perfil.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
              <Handshake className="h-4 w-4 flex-shrink-0 text-blue-400 " />
              <p className="text-sm text-slate-300">
                Invertis una vez y obtienes tu CV profesional para siempre
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
              <User className="h-4 w-4 flex-shrink-0 text-blue-400 " />
              <p className="text-sm text-slate-300">
                Tu CV se vinculará a tu cuenta al pagar
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
              <Download className="h-4 w-4 flex-shrink-0 text-blue-400" />
              <p className="text-sm text-slate-300">
                Descárgalo desde tu{" "}
                <Link href="/perfil" className="text-blue-400 hover:underline">
                  perfil
                </Link>{" "}
                las veces que quieras
              </p>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30">
              <CreditCard className="h-4 w-4 flex-shrink-0 text-blue-400 " />
              <p className="text-sm text-slate-300">
                Tarjeta de crédito, débito y más opciones
              </p>
            </div>
          </div>
          {/* Payment Button */}
          <div className="flex flex-col gap-3">
            <Button
              disabled={loading}
              onClick={handlePay}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-[#009ee3] to-[#00c6ff] hover:brightness-110 text-white font-semibold text-base shadow-xl shadow-[#009ee3]/20 transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Procesando pago...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center justify-center gap-1  ">
                    <img
                      src="/logompsolomano.png"
                      className="h-7 w-7"
                      alt="MercadoPago"
                    />
                    <span className="text-base font-semibold">
                      Desbloquear por $2.500 ARS
                    </span>
                  </div>
                </div>
              )}
            </Button>
            {/* <PDFDownloadLink
              document={<DocumentoCVW cv={cvData} template={template} />}
              fileName={`CV-${cvData.nombre.replace(/\s+/g, "-")}.pdf`}
            >
              {({ loading: dlLoading }) => (
                <Button
                  className="bg-slate-700/30 hover:bg-[#2A2A2D] rounded-lg p-6  w-full     text-[#F4F4F5]"
                  disabled={dlLoading}
                >
                  {dlLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Generando archivo...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 font-semibold" />
                      Descargar versión gratuita (con marca de agua)
                    </>
                  )}
                </Button>
              )}
            </PDFDownloadLink> */}
            <Carousel
              plugins={[Autoplay({ delay: 5000 })]}
              opts={{ align: "start", loop: true, dragFree: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 pr-2 basis-full">
                    <div className="p-3 rounded-md ">
                      <p className="text-gray-300 text-sm italic">
                        "{testimonial.text}"
                      </p>
                      <p className="text-right text-purple-400 text-sm font-medium">
                        - {testimonial.author}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-blue-300 text-lg font-sans">
              💡 Tras pagar, podras ver tu cv completo y sin marca de
              agua desde tu{" "}
              <Link
                href="/perfil"
                className="text-blue-400 hover:underline font-medium"
              >
                perfil
              </Link>{" "}
            </p>
          </div> */}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
