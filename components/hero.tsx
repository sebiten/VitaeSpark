import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  FileText,
  Zap,
  Sparkles,
  Search,
  Clock,
  Award,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { TestimonialCard } from "@/components/testimonial-card";
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import { RoboAnimation } from "./roboto-animation";
import { FloatingPaper } from "./floatin-paper";
import { Textarea } from "./ui/textarea";
import { sendFeedback } from "@/app/(auth)/login/actions";
import { SubmitButton } from "@/app/(auth)/login/auth-page-client";
import { Label } from "./ui/label";
import WelcomeHero from "./WelcomeHero";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F10] text-[#F4F4F5]">
      {/* Hero Section */}
      <WelcomeHero />

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
              Características
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas para un CV perfecto
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              VitaeSpark combina tecnología avanzada con diseño profesional para
              crear CVs que impresionan a reclutadores y sistemas ATS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-[#7C3AED]" />}
              title="Plantillas profesionales"
              description="Diseños modernos y efectivos que destacan tu experiencia y habilidades."
            />
            <FeatureCard
              icon={<Search className="h-6 w-6 text-[#7C3AED]" />}
              title="Optimizado para ATS"
              description="Supera los filtros automáticos de las empresas con palabras clave estratégicas."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-[#7C3AED]" />}
              title="Redacción inteligente"
              description="La IA mejora tus textos para hacerlos más impactantes y profesionales."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-[#7C3AED]" />}
              title="Rápido y sencillo"
              description="Crea un CV profesional en minutos, sin complicaciones ni conocimientos técnicos."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-[#7C3AED]" />}
              title="Personalización total"
              description="Adapta cada sección a tus necesidades específicas y al puesto que buscas."
            />
            <FeatureCard
              icon={<Award className="h-6 w-6 text-[#7C3AED]" />}
              title="Resultados comprobados"
              description="Aumenta tus posibilidades de conseguir entrevistas con un CV que realmente funciona."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 px-4 bg-[#0F0F10]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 mb-4">
              Proceso
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Crea tu CV en tres simples pasos
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Nuestro proceso está diseñado para ser rápido, intuitivo y
              efectivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-[#1F1F22] border border-[#7C3AED]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#7C3AED]">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Ingresa tus datos</h3>
              <p className="text-[#F4F4F5]/70">
                Completa un formulario simple con tu experiencia, educación y
                habilidades.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-[#1F1F22] border border-[#38BDF8]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#38BDF8]">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">La IA optimiza tu CV</h3>
              <p className="text-[#F4F4F5]/70">
                Nuestro sistema mejora automáticamente la redacción y estructura
                de tu CV.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-[#1F1F22] border border-[#7C3AED]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-[#7C3AED]">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Descarga tu CV listo</h3>
              <p className="text-[#F4F4F5]/70">
                Obtén tu CV profesional en PDF, listo para enviar a cualquier
                empresa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 mb-4">
              Comparativa
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              La diferencia VitaeSpark
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Descubre por qué un CV optimizado marca la diferencia en tu
              búsqueda de empleo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* CV Tradicional */}
            <div className="bg-[#1F1F22] rounded-lg p-6 border border-[#F4F4F5]/10 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#1F1F22] px-4 py-1 rounded-full border border-[#F4F4F5]/10">
                <span className="text-sm font-medium text-[#F4F4F5]/70">
                  CV Tradicional
                </span>
              </div>

              <div className="relative mb-6 bg-[#0F0F10] rounded-lg p-2 shadow-md">
                <div className=" overflow-hidden">
                  <img
                    src="/hamdu.webp"
                    alt="CV tradicional no optimizado"
                    className="rounded-lg w-full h-full object-cover opacity-70"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-[#FF4A4A]/20 text-[#FF4A4A] text-xs font-bold px-2 py-1 rounded-full">
                  No optimizado
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#FF4A4A]/20 p-2 rounded-full shrink-0">
                    <Search className="h-4 w-4 text-[#FF4A4A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Invisible para ATS</h3>
                    <p className="text-xs text-[#F4F4F5]/60">
                      Rechazado automáticamente por sistemas de filtrado sin
                      llegar a reclutadores.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FF4A4A]/20 p-2 rounded-full shrink-0">
                    <FileText className="h-4 w-4 text-[#FF4A4A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Formato genérico</h3>
                    <p className="text-xs text-[#F4F4F5]/60">
                      Diseño básico que no destaca entre cientos de candidatos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-[#FF4A4A]/20 p-2 rounded-full shrink-0">
                    <Clock className="h-4 w-4 text-[#FF4A4A]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Proceso lento</h3>
                    <p className="text-xs text-[#F4F4F5]/60">
                      Horas de edición manual sin garantía de resultados
                      profesionales.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CV VitaeSpark */}
            <div className="bg-gradient-to-br from-[#1F1F22] to-[#141415] rounded-lg p-6 border border-[#7C3AED]/30 relative shadow-lg shadow-[#7C3AED]/5">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] px-4 py-1 rounded-full">
                <span className="text-sm font-bold text-white">
                  CV VitaeSpark
                </span>
              </div>

              <div className="relative mb-6 bg-[#0F0F10] rounded-lg p-2 shadow-xl">
                <div className=" overflow-hidden">
                  <img
                    src="/purplehero.webp"
                    alt="CV optimizado por VitaeSpark"
                    className="rounded-lg w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-[#38BDF8] text-[#0F0F10] text-xs font-bold px-2 py-1 rounded-full">
                  Optimizado para ATS
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/20 p-2 rounded-full shrink-0">
                    <Search className="h-4 w-4 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">
                      Visible para reclutadores
                    </h3>
                    <p className="text-xs text-[#F4F4F5]/80">
                      Optimizado con palabras clave que superan filtros ATS y
                      llegan a los reclutadores.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/20 p-2 rounded-full shrink-0">
                    <FileText className="h-4 w-4 text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">Diseño profesional</h3>
                    <p className="text-xs text-[#F4F4F5]/80">
                      Plantillas modernas y profesionales que captan la atención
                      inmediatamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/20 p-2 rounded-full shrink-0">
                    <Sparkles className="h-4 w-4 text-[#38BDF8]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">
                      Redacción mejorada por IA
                    </h3>
                    <p className="text-xs text-[#F4F4F5]/80">
                      Textos persuasivos que destacan tus logros y competencias
                      de forma impactante.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-[#1F1F22] to-[#141415] rounded-lg border border-[#7C3AED]/20">
            <h3 className="text-xl font-bold mb-4 text-center">
              ¿Por qué elegir VitaeSpark?
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-[#7C3AED]/20 p-3 rounded-full mb-4">
                  <CheckCircle2 className="h-6 w-6 text-[#7C3AED]" />
                </div>
                <h4 className="font-bold mb-2">300% más entrevistas</h4>
                <p className="text-sm text-[#F4F4F5]/70">
                  Nuestros usuarios reciben hasta 3 veces más llamadas para
                  entrevistas.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-[#38BDF8]/20 p-3 rounded-full mb-4">
                  <Zap className="h-6 w-6 text-[#38BDF8]" />
                </div>
                <h4 className="font-bold mb-2">90% de ahorro de tiempo</h4>
                <p className="text-sm text-[#F4F4F5]/70">
                  Crea un CV profesional en minutos, no en horas o días.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-[#7C3AED]/20 p-3 rounded-full mb-4">
                  <Award className="h-6 w-6 text-[#7C3AED]" />
                </div>
                <h4 className="font-bold mb-2">Tecnología de vanguardia</h4>
                <p className="text-sm text-[#F4F4F5]/70">
                  Inteligencia artificial que se adapta a las últimas tendencias
                  del mercado laboral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
              Testimonios
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Miles de profesionales ya han mejorado sus oportunidades laborales
              con VitaeSpark.
            </p>
          </div>

            <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Actualicé mi CV con VitaeSpark y a la semana ya tenía entrevistas. Súper práctico y fácil de usar."
              author="Laura Martínez"
              role="Diseñadora UX/UI"
            />
            <TestimonialCard
              quote="Me ayudó un montón con el tema de los filtros de las empresas. Después de varios meses, por fin empecé a recibir respuestas."
              author="Carlos Rodríguez"
              role="Desarrollador Full Stack"
            />
            <TestimonialCard
              quote="Muy simple de usar y el resultado quedó re bien. Ahora mi CV muestra mejor lo que sé hacer."
              author="Ana García"
              role="Marketing Digital"
             
            />
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
              Preguntas frecuentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resolvemos tus dudas
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre VitaeSpark.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Qué es un sistema ATS y por qué es importante?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Un ATS (Applicant Tracking System) es un software que utilizan
                las empresas para filtrar automáticamente los CVs. Es importante
                que tu CV esté optimizado para estos sistemas, ya que
                aproximadamente el 75% de los currículums son rechazados antes
                de que un reclutador los vea. VitaeSpark asegura que tu CV pase
                estos filtros.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Cómo mejora la IA mi currículum?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Nuestra IA analiza tu información y mejora la redacción para
                hacerla más impactante y profesional. También identifica
                palabras clave relevantes para tu industria y las incorpora
                estratégicamente, aumentando tus posibilidades de superar los
                filtros ATS.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-3" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Puedo personalizar las plantillas?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Sí, todas nuestras plantillas son completamente personalizables.
                Puedes ajustar colores, fuentes, espaciado y otros elementos
                para que tu CV refleje tu personalidad profesional, manteniendo
                siempre un aspecto profesional.
              </AccordionContent>
            </AccordionItem> */}

            <AccordionItem value="item-4" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿En qué formatos puedo descargar mi CV?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Con la generación de tu cv puedes descargarlo en formato PDF las
                veces que sean necesesarias desde tu perfil.
              </AccordionContent>
            </AccordionItem>

            {/* <AccordionItem value="item-5" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Qué pasa si no estoy satisfecho con el resultado?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Ofrecemos una garantía de satisfacción de 14 días. Si no estás
                completamente satisfecho con nuestro servicio, te reembolsaremos
                el 100% de tu pago sin hacer preguntas.
              </AccordionContent>
            </AccordionItem> */}
          </Accordion>
        </div>
      </section>
      <div>
        <div className="max-w-3xl mx-auto mb-12">
          <div className=" rounded-lg p-6 shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-2 text-[#7C3AED]">
              ¿Te gustó VitaeSpark?
            </h3>
            <p className="text-[#F4F4F5]/80 mb-4 text-center">
              Déjanos tu comentario o testimonio si te ayudamos, o cuéntanos qué
              podemos mejorar. ¡Tu opinión nos importa!
            </p>
            <form action={sendFeedback} className="space-y-4 w-full">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Tu comentario</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Escribí tu comentario o sugerencia..."
                  required
                  className="min-h-[120px]"
                  disabled={!user}
                />
              </div>
              <SubmitButton disabled={!user}>
                Enviar comentario
              </SubmitButton>
              {!user && (
                <div className="flex flex-col items-center justify-center">
                  <span className="text-center mx-auto  text-white/50">
                    Debes iniciar sesion para enviar un comentario
                  </span>
                  <Link href={"/login"} className="text-[#7C3AED] border-b">Iniciar sesion</Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#38BDF8]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Destaca en el mercado laboral hoy mismo
          </h2>
          <p className="text-xl text-[#F4F4F5]/80 mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya han mejorado sus oportunidades
            con VitaeSpark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/crear">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] hover:opacity-90 text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-300"
                variant="default"
              >
                Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
