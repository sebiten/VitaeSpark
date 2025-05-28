"use client";
import {
  ArrowRight,
  Award,
  Badge,
  CheckCircle2,
  GraduationCap,
  PencilIcon,
  Sparkles,
  Zap,
} from "lucide-react";
import { NextPage } from "next";
import { RoboAnimation } from "./roboto-animation";
import { FloatingPaper } from "./floatin-paper";
import Link from "next/link";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "./CVPreviewStep";

interface Props {}

const WelcomeHero: NextPage<Props> = ({}) => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <FloatingPaper />
      <div className="absolute inset-0 opacity-40 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* IZQUIERDA */}
          <div className="flex-1 space-y-6 w-full">
            <RoboAnimation />

            <div className="flex flex-wrap gap-2">
              <span className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition">
                <Zap className="mr-1.5 h-4 w-4" />
                Impulsado por IA
              </span>
              <span className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition">
                <PencilIcon className="mr-1.5 h-4 w-4" />
                Redacción profesional
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              CVs inteligentes que{" "}
              <span className="text-[#7C3AED]">destacan</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#F4F4F5]/80 max-w-2xl">
              La forma más rápida y accesible de crear CVs profesionales y una
              herramienta poderosa para destacar en el competitivo mercado
              laboral.
            </p>

            {/* <div className="flex sm:flex-row  gap-3 text-center  px-4  rounded-lg shadow">
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse flex items-center">
                <Badge className="mr-1 h-3 w-3" />
                ¡NUEVO!
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-1 justify-center">
                <Sparkles className="h-4 w-4 text-[#38BDF8]" />
                Plantilla recomendada por
                <span className="text-[#7C3AED] ml-1">Harvard</span>
              </h3>
            </div> */}

            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg p-3 border border-blue-500/20 max-w-xl">
              <div className="flex items-center ">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-white font-medium">Lo que dicen nuestros clientes</h3>
              </div>
              <Carousel
                plugins={[Autoplay({ delay: 5000 })]}
                opts={{ align: "start", loop: true, dragFree: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-1">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-2 pr-2 basis-full">
                      <div className="p-3 rounded-md ">
                        <p className="text-gray-300 text-sm italic">"{testimonial.text}"</p>
                        <p className="text-right text-purple-400 text-sm font-medium">
                          - {testimonial.author}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/crear">
                <Button
                  size="lg"
                  className="bg-[#7C3AED] text-white shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#F4F4F5]/60">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Generado por IA
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Listo en minutos
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                Optimizado para ATS
              </div>
            </div>
          </div>

          {/* DERECHA */}
          <div className="flex-1 relative w-full max-w-md mx-auto">
            <div className="relative bg-[#1F1F22] rounded-lg shadow-lg">
              <img
                src="/purplehero.webp"
                alt="CV generado por VitaeSpark"
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute -top-3 -right-3 bg-[#38BDF8] text-[#0F0F10] font-bold px-2 py-1 rounded-full text-[10px] sm:text-xs">
                Optimizado para ATS
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#7C3AED] text-white font-bold px-2 py-1 rounded-full text-[10px] sm:text-sm flex items-center">
                <GraduationCap className="mr-1 h-4 w-4" /> Plantilla Morada
              </div>
            </div>

            <div className="absolute bottom-[-3rem] left-1 right-1 sm:bottom-[-1.5rem] sm:left-[-1.5rem] sm:right-auto bg-[#1F1F22] p-3 rounded-lg shadow-lg max-w-xs w-[95%] mx-auto sm:mx-0">
              <div className="flex items-start gap-3">
                <div className="bg-[#7C3AED] p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Redacción mejorada por IA</p>
                  <p className="text-xs text-[#F4F4F5]/60">Textos profesionales y persuasivos</p>
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
