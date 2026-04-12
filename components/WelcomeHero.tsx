"use client";

import {
  ArrowRight,
  Award,
  CheckCircle2,
  Image,
  Paintbrush,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { NextPage } from "next";
import { testimonials } from "./CVPreviewStep";
import { FloatingPaper } from "./floatin-paper";
import { RoboAnimation } from "./roboto-animation";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

interface Props {}

const WelcomeHero: NextPage<Props> = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:py-32">
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="pointer-events-none absolute inset-0 -z-30 opacity-100">
          <FloatingPaper />
        </div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="w-full flex-1 space-y-6">
            <RoboAnimation />

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center rounded-full bg-[#7C3AED]/20 px-3 py-1.5 text-sm font-medium text-[#7C3AED] transition hover:bg-[#7C3AED]/30">
                <Zap className="mr-1.5 h-4 w-4" />
                Crear curriculum con IA
              </span>
              <span className="flex items-center rounded-full bg-[#38BDF8]/20 px-3 py-1.5 text-sm font-medium text-[#38BDF8] transition hover:bg-[#38BDF8]/30">
                <Image className="mr-1.5 h-4 w-4" />
                Listo para descargar en PDF
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Crea tu <span className="text-[#7C3AED]">curriculum online</span>{" "}
              y consigue mas entrevistas
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#F4F4F5] sm:text-lg md:text-lg">
              Genera un CV profesional con IA, optimizado para ATS y listo para
              descargar en PDF en minutos. VitaeSpark te ayuda a ordenar tu
              experiencia, mejorar la redaccion y postularte mejor a trabajos
              reales.
            </p>

            <div className="max-w-xl rounded-lg border border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-purple-400" />
                  <h2 className="font-medium text-white">
                    Hecho para convertir mejor
                  </h2>
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-purple-300">
                  CV + ATS + PDF
                </span>
              </div>
              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-md bg-white/5 px-3 py-2 text-sm text-white/80">
                  Plantillas profesionales
                </div>
                <div className="rounded-md bg-white/5 px-3 py-2 text-sm text-white/80">
                  Redaccion asistida
                </div>
                <div className="rounded-md bg-white/5 px-3 py-2 text-sm text-white/80">
                  Listo para descargar
                </div>
              </div>
              <Carousel
                plugins={[Autoplay({ delay: 5000 })]}
                opts={{ align: "start", loop: true, dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-1">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="basis-full pl-2 pr-2">
                      <div className="rounded-md p-3">
                        <p className="text-sm italic text-gray-300">
                          "{testimonial.text}"
                        </p>
                        <p className="text-right text-sm font-medium text-purple-400">
                          - {testimonial.author}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/crear">
                <Button
                  size="lg"
                  className="bg-[#7C3AED] text-white shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Crear mi CV ahora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#F4F4F5]/60">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Crear CV online
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Optimizado para ATS
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Descarga en PDF
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md flex-1">
            <div className="relative rounded-lg bg-[#1F1F22] shadow-lg">
              <img
                src="/purple-hero.webp"
                alt="Ejemplo de curriculum vitae online creado con VitaeSpark"
                className="h-full w-full rounded-lg object-cover"
              />
              <div className="absolute -right-3 -top-3 rounded-full bg-[#38BDF8] px-2 py-1 text-[10px] font-bold text-[#0F0F10] sm:text-xs">
                <Paintbrush className="mr-1 inline h-4 w-4 mb-1" />
                Plantilla profesional
              </div>
            </div>

            <div className="absolute bottom-[-3rem] left-1 right-1 mx-auto w-[95%] max-w-xs rounded-lg bg-[#1F1F22] p-3 shadow-lg sm:bottom-[-1.5rem] sm:left-[-1.5rem] sm:right-auto sm:mx-0">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-[#7C3AED] p-2">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Redaccion mejorada por IA</p>
                  <p className="text-xs text-[#F4F4F5]/60">
                    Textos mas claros, profesionales y listos para postularte
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHero;
