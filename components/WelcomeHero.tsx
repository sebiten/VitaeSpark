import {
  ArrowRight,
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

interface Props {}

const WelcomeHero: NextPage<Props> = ({}) => {
  return (
    <section className="px-4 py-20 md:py-32 relative overflow-hidden">
      <FloatingPaper />
      <div className="absolute inset-0  opacity-40 z-0"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <RoboAnimation />
            <div className="flex flex-wrap gap-1">
              <div className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 px-2 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors duration-200">
                <Zap className="mr-1.5 h-3.5 w-3.5" />
                <span>Impulsado por IA</span>
              </div>
                <div className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 px-2 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors duration-200">
                <PencilIcon className="mr-1.5 h-3.5 w-3.5" />
                <span>Redacción profesional</span>
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              CVs inteligentes que{" "}
              <span className="text-[#7C3AED]">destacan</span>
            </h1>
            <p className="text-lg md:text-xl text-[#F4F4F5]/80 max-w-xl">
              La forma más rápida y accesible de crear CVs profesionales y una
              herramienta poderosa para destacar en el competitivo mercado
              laboral.
            </p>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#1F1F22] to-[#141415] border-l-4 border-[#38BDF8] rounded-lg p-5 shadow-xl group hover:shadow-2xl hover:shadow-[#38BDF8]/10 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#38BDF8]/10 to-transparent blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#7C3AED]/10 to-transparent blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="bg-gradient-to-br from-[#38BDF8] to-[#7C3AED] p-3 rounded-lg shrink-0 shadow-lg shadow-[#38BDF8]/20 group-hover:shadow-[#38BDF8]/30 transition-all duration-300">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-[#7C3AED]/20 text-[#7C3AED] text-xs font-semibold px-2 py-1 rounded-full animate-pulse">
                      ¡NUEVO!
                    </span>
                    <h3 className="text-base font-bold text-white">
                      Plantilla Recomendada por Harvard
                    </h3>
                  </div>

                  <p className="text-sm text-[#F4F4F5]/90">
                    Ahora la puedes elegir a la hora de crear tu CV. Diseñada
                    para maximizar tus oportunidades laborales.
                  </p>

                  {/* <div className="flex items-center gap-2 pt-1">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-[#38BDF8]" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
                          <Award className="h-3 w-3 text-[#7C3AED]" />
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#38BDF8]/20 flex items-center justify-center">
                          <FileText className="h-3 w-3 text-[#38BDF8]" />
                        </div>
                      </div>
                      <span className="text-xs text-[#F4F4F5]/60">Formato profesional certificado</span>
                    </div> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/crear">
                <Button
                  size="lg"
                  className="bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-300 hover:bg-[#5B21B6] hover:scale-105 hover:shadow-xl hover:shadow-[#7C3AED]/50 focus:ring-2 focus:ring-[#7C3AED]/60"
                  variant="default"
                >
                  Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#F4F4F5]/60 pt-4">
              <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
              <span>Generado por IA</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
              <span>Listo en minutos</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
              <span>Optimizado para ATS</span>
            </div>
          </div>
          <div className="flex-1 relative mt-2 ">
            <div className="relative bg-[#1F1F22] rounded-lg p-1 shadow-2xl shadow-[#7C3AED]/20">
              <img
                src="/purplehero.webp"
                alt="CV generado por VitaeSpark"
                className="rounded-lg w-full h-auto"
              />
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-[#38BDF8] text-[#0F0F10] font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                ¡Optimizado para ATS!
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#7C3AED] text-white font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm flex items-center">
                <GraduationCap className="mr-1 h-4 w-4" /> Plantilla Morada
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#1F1F22] p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-start gap-3">
                <div className="bg-[#7C3AED] p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Redacción mejorada por IA
                  </p>
                  <p className="text-xs text-[#F4F4F5]/60">
                    Textos profesionales y persuasivos
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
