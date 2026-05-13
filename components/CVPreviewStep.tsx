// components/CVPreviewStepPurple.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import type React from "react";
import dynamic from "next/dynamic";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
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
  MessageSquare,
  Send,
  LockKeyhole,
  Maximize2,
  X,
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

const PDFViewerPane = dynamic(() => import("./pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white text-sm text-slate-500">
      Preparando vista previa...
    </div>
  ),
});

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

const seoTestimonials = [
  {
    text: "Yo lo use para atencion al cliente porque tenia todo medio mezclado, trabajos, horarios y tareas. Me lo dejo bastante mas prolijo para mandar.",
    author: "Perfil atencion al cliente",
  },
  {
    text: "No tenia experiencia y no sabia que poner en el cv. Me sirvio para ordenar estudios, cursos y habilidades sin quedar como que estaba inventando.",
    author: "Primer empleo",
  },
  {
    text: "Lo arme para cajero y quedo claro lo de caja, atencion, horarios y responsabilidad con plata. Antes lo tenia escrito muy asi nomas.",
    author: "Cajero",
  },
  {
    text: "Para call center me ayudo bastante, porque yo habia puesto solo tareas sueltas. Ahora se entiende mejor llamadas, reclamos y carga de datos.",
    author: "Call center",
  },
  {
    text: "Soy programador junior y tenia una lista enorme de tecnologias. Me lo acomodo con proyectos, github y stack sin que parezca un copy paste.",
    author: "Programador",
  },
  {
    text: "En administrativo me costo explicar lo que hacia. Aca quedo mas claro carga de datos, planillas, documentos y atencion interna.",
    author: "Administrativo",
  },
  {
    text: "Para vendedor me gusto porque no quedo exagerado. Puso atencion, reposicion y trato con clientes de una forma mas profesional.",
    author: "Vendedor",
  },
  {
    text: "Lo hice para limpieza y mantenimiento. Quedo simple pero bien, con puntualidad, cuidado de espacios y experiencia en distintos lugares.",
    author: "Limpieza",
  },
  {
    text: "Para operario me sirvio porque ordeno produccion, control de tareas y disponibilidad para turnos. Antes el cv se veia muy pobre.",
    author: "Operario",
  },
  {
    text: "Queria postular a mineria y no sabia como poner cursos, seguridad y disponibilidad. Me lo dejo mas directo para ese tipo de trabajo.",
    author: "Mineria",
  },
  {
    text: "Para recepcionista quedo bien, con agenda, llamados, turnos y atencion al publico. No quedo largo ni lleno de cosas repetidas.",
    author: "Recepcionista",
  },
  {
    text: "Soy estudiante y queria algo para pasantias. Me ayudo a poner materias, proyectos y cursos sin que el cv quede vacio.",
    author: "Estudiantes",
  },
  {
    text: "Tenia experiencia de ventas, deposito y atencion todo junto. Lo bueno es que lo separo mejor y ahora se lee mas facil.",
    author: "Perfil mixto",
  },
  {
    text: "Me gusto que no tuve que escribir perfecto. Puse mis datos como pude y lo dejo con mejor tono para descargar en pdf.",
    author: "CV profesional",
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
  const [loadingPayPal, setLoadingPayPal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const handlePayPal = async () => {
    if (!userSession) return;

    let failureTracked = false;

    setLoadingPayPal(true);
    track("Payment Started", {
      template,
      price: 4.99,
      currency: "USD",
      method: "paypal",
    });
    try {
      const res = await fetch("/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        track("PayPal Order Failed", {
          status: res.status,
          template,
        });
        failureTracked = true;
        console.error("Error al crear orden PayPal:", errorData);
        toast.error("No se pudo iniciar el pago con PayPal. Intenta nuevamente.");
        return;
      }

      const { approveUrl } = await res.json();

      if (approveUrl) {
        track("Payment Redirected", {
          template,
          price: 4.99,
          currency: "USD",
          method: "paypal",
        });
        window.location.href = approveUrl;
      } else {
        track("PayPal Order Failed", { template });
        failureTracked = true;
        toast.error("No se pudo iniciar el pago con PayPal. Intenta nuevamente.");
      }
    } catch (error) {
      if (!failureTracked) {
        track("PayPal Order Failed", { template });
      }
      console.error("Error en handlePayPal:", error);
      toast.error("Error al procesar el pago. Intenta nuevamente.");
    } finally {
      setLoadingPayPal(false);
    }
  };

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
      <PDFViewerPane
        cv={cvData}
        template={template}
        watermark
        className="h-full w-full border-0"
      />
    );
  }, [cvData, template]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!feedbackSent) return;

    const timeoutId = window.setTimeout(() => {
      setFeedbackSent(false);
    }, 3800);

    return () => window.clearTimeout(timeoutId);
  }, [feedbackSent]);

  const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!feedbackText.trim()) return;

    setFeedbackText("");
    setFeedbackSent(true);
  };

  const scrollToCheckout = () => {
    document
      .getElementById("checkout-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const precioOriginal = 2500;
  const precioOferta = 1500;
  const ahorro = precioOriginal - precioOferta;
  const descuentoPorcentaje = Math.round((ahorro / precioOriginal) * 100);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 overflow-x-hidden">
      <div className="mx-auto max-w-[340px] space-y-2 text-left sm:max-w-none sm:text-center">
        <h2 className="text-[1.65rem] font-bold leading-tight text-white sm:text-3xl">
          Tu CV profesional esta listo
        </h2>
        <p className="max-w-[320px] text-sm leading-6 text-slate-400 sm:mx-auto sm:max-w-none sm:text-base">
          Desbloquea la version final y descargala en PDF sin marca de agua.
        </p>
      </div>

      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#2A2A2D] shadow-2xl shadow-black/30 sm:bg-white">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#15151A] px-4 py-3 text-white sm:hidden">
            <div className="min-w-0">
              <p className="text-sm font-semibold">Muestra protegida del CV</p>
              <p className="mt-0.5 text-xs text-white/65">
                Desbloquea para ver y descargar el documento completo.
              </p>
            </div>
            <LockKeyhole className="h-5 w-5 flex-shrink-0 text-[#38BDF8]" />
          </div>
          <div
            className="pointer-events-none relative mx-auto h-[360px] w-full max-w-full overflow-hidden sm:pointer-events-auto sm:aspect-[1/1.414] sm:h-auto sm:min-h-0"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderTemplate}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent px-4 pb-4 pt-12 text-center sm:block">
            <p className="hidden text-sm font-medium text-white sm:block">
              Desliza con el dedo para ver todo el CV
            </p>
            <p className="hidden text-xs text-white/80 sm:mt-1 sm:block">
              Vista protegida con marca de agua
            </p>
          </div>
        </div>

        <div className="-mt-3 grid grid-cols-[0.9fr_1.1fr] gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setMobilePreviewOpen(true)}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#111113] px-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:bg-[#1C1C22]"
          >
            <Maximize2 className="h-4 w-4" />
            Ver CV
          </button>
          <button
            type="button"
            onClick={scrollToCheckout}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#7C3AED] px-3 text-sm font-bold text-white shadow-lg shadow-[#7C3AED]/25 transition hover:bg-[#6D28D9]"
          >
            Desbloquear CV
          </button>
        </div>

        <Dialog open={mobilePreviewOpen} onOpenChange={setMobilePreviewOpen}>
          <DialogContent className="fixed inset-0 left-0 top-0 z-50 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-[#0F0F10] p-0 text-white shadow-none sm:hidden [&>button]:hidden">
            <DialogTitle className="sr-only">Muestra protegida del CV</DialogTitle>
            <DialogDescription className="sr-only">
              Muestra parcial del curriculum con marca de agua antes del desbloqueo.
            </DialogDescription>

            <div className="sticky top-0 z-20 border-b border-white/10 bg-[#111113]/95 px-4 py-3 backdrop-blur">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Muestra protegida del CV</p>
                  <p className="mt-0.5 text-xs text-white/65">
                    Desbloquea para acceder al CV completo sin marca de agua.
                  </p>
                </div>
                <DialogClose asChild>
                  <button className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#7C3AED] px-4 text-sm font-semibold text-white">
                    <X className="h-4 w-4" />
                    Cerrar
                  </button>
                </DialogClose>
              </div>
            </div>

            <div className="h-[calc(100dvh-96px)] touch-pan-x touch-pan-y overflow-auto bg-[#2A2A2D] px-3 py-4">
              <div className="mx-auto h-[82vh] min-h-[620px] w-[94vw] overflow-hidden rounded-xl bg-white shadow-2xl shadow-black/40">
                {renderTemplate}
              </div>
            </div>

            <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#111113]/95 px-4 py-3 backdrop-blur">
              <DialogClose asChild>
                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/20">
                  <X className="h-4 w-4" />
                  Cerrar vista del CV
                </button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>

        <Card
          id="checkout-panel"
          className="scroll-mt-24 min-w-0 border-white/10 bg-[#15151A] text-white shadow-2xl shadow-black/30"
        >
          <CardContent className="space-y-3 p-4 sm:space-y-4 sm:p-6">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver y editar datos
            </button>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:rounded-3xl">
              <div className="border-b border-white/10 p-4 text-left sm:p-5">
                <div className="flex items-center gap-3 sm:justify-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/18 text-[#C4B5FD] ring-1 ring-[#7C3AED]/25 sm:h-11 sm:w-11">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    Tu CV final esta listo
                  </h3>
                </div>
                <p className="mt-3 max-w-xs text-xs leading-5 text-white/75 sm:mx-auto sm:mt-4 sm:text-center sm:text-sm sm:leading-6">
                  Desbloquea la version profesional sin marca de agua y descargala
                  en PDF cuando quieras.
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 p-4 sm:block sm:p-5 sm:text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#38BDF8] sm:text-xs">
                  Pago unico
                </p>
                <div className="flex items-end justify-center gap-2 sm:mt-2">
                  <span className="text-4xl font-black leading-none text-white sm:text-5xl">
                    $2.500
                  </span>
                  <span className="pb-1 text-sm font-semibold text-white/62">
                    ARS
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2.5 sm:py-3">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <span className="text-sm font-semibold text-green-400 sm:text-base">
                Pago seguro con Mercado Pago
              </span>
            </div>

            <div className="space-y-2 sm:space-y-2.5">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-3.5">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#A78BFA]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    CV limpio, sin marca de agua
                  </p>
                  <p className="mt-1 hidden text-xs leading-5 text-white/68 sm:block">
                    Listo para enviar a empresas, portales de empleo y reclutadores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-3.5">
                <Download className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Descargas ilimitadas en tu perfil
                  </p>
                  <p className="mt-1 hidden text-xs leading-5 text-white/68 sm:block">
                    Queda guardado en tu{" "}
                    <Link href="/perfil" className="text-[#38BDF8] hover:underline">
                      perfil
                    </Link>{" "}
                    para volver a descargarlo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 sm:p-3.5">
                <CreditCard className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#38BDF8]" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Tarjeta, debito y mas opciones
                  </p>
                  <p className="mt-1 hidden text-xs leading-5 text-white/68 sm:block">
                    El checkout se abre en Mercado Pago con los medios disponibles.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="group relative overflow-hidden rounded-2xl border border-[#00B0FF]/30 bg-gradient-to-br from-[#00B0FF] to-[#0070BA] p-[2px] transition-all duration-300 hover:border-[#00B0FF]/60 hover:shadow-lg hover:shadow-[#00B0FF]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  disabled={loading}
                  onClick={handlePay}
                  className="relative w-full h-12 sm:h-14 rounded-[1.1rem] bg-[#00B0FF] hover:bg-[#0098E6] text-white shadow-none border-0 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Procesando pago...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Image src="/logompsolomano.png" alt="Mercado Pago" width={28} height={28} className="h-7 w-7 object-contain" />
                      <span className="text-base font-bold sm:text-lg">Mercado Pago</span>
                      <div className="h-6 w-px bg-white/30" />
                      <span className="text-sm font-semibold sm:text-base">
                        $2.500 ARS
                      </span>
                    </div>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="h-px w-8 bg-white/20" />
                  <span className="text-xs text-white/40 uppercase tracking-wider">o también</span>
                  <div className="h-px w-8 bg-white/20" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[#0070BA]/30 bg-gradient-to-br from-[#0070BA] to-[#003D82] p-[2px] transition-all duration-300 hover:border-[#0070BA]/60 hover:shadow-lg hover:shadow-[#0070BA]/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  disabled={loadingPayPal}
                  onClick={handlePayPal}
                  className="relative w-full h-12 sm:h-14 rounded-[1.1rem] bg-[#0070BA] hover:bg-[#005ea6] text-white shadow-none border-0 transition-all duration-300"
                >
                  {loadingPayPal ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Procesando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Image src="/paypal.png" alt="PayPal" width={28} height={28} className="h-7 w-7 object-contain" />
                      <span className="text-base font-bold sm:text-lg">PayPal</span>
                      <div className="h-6 w-px bg-white/30" />
                      <span className="text-sm font-semibold sm:text-base">
                        US$4.99
                      </span>
                    </div>
                  )}
                </Button>
              </div>

              <Carousel
                plugins={[Autoplay({ delay: 5000 })]}
                opts={{ align: "start", loop: true, dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-1">
                  {seoTestimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-2 pr-2 basis-full">
                      <div className="p-3 rounded-md">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}