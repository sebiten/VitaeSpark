import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestimonialCard } from "@/components/testimonial-card";
import { FeatureCard } from "@/components/feature-card";
import { TokenCard } from "@/components/token-card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F10] text-[#F4F4F5]">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-transparent opacity-30 z-0"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
                <Zap className="mr-1 h-3 w-3" /> Impulsado por IA
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                CVs inteligentes que{" "}
                <span className="text-[#7C3AED]">destacan</span>
              </h1>
              <p className="text-lg md:text-xl text-[#F4F4F5]/80 max-w-xl">
                La forma más rápida y accesible de crear CVs profesionales que
                realmente superan los filtros de las empresas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-[#7C3AED] hover:bg-[#A78BFA] text-white"
                >
                  Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="ghost" className="border-[#1F1F22] ">
                  Ver ejemplos
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#F4F4F5]/60 pt-4">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                <span>Sin registro previo</span>
                <span className="mx-2">•</span>
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                <span>Listo en minutos</span>
                <span className="mx-2">•</span>
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                <span>Optimizado para ATS</span>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative bg-[#1F1F22] rounded-lg p-1 shadow-2xl shadow-[#7C3AED]/20">
                <img
                  src="/placeholder.svg?height=600&width=500"
                  alt="CV generado por VitaeSpark"
                  className="rounded-lg w-full"
                />
                <div className="absolute -top-4 -right-4 bg-[#38BDF8] text-[#0F0F10] font-bold px-4 py-2 rounded-full text-sm">
                  ¡Optimizado para ATS!
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
              quote="Conseguí tres entrevistas en la primera semana después de actualizar mi CV con VitaSpark. ¡Increíble servicio!"
              author="Laura Martínez"
              role="Diseñadora UX/UI"
              rating={5}
            />
            <TestimonialCard
              quote="La optimización para ATS marcó la diferencia. Después de meses buscando trabajo, finalmente empecé a recibir respuestas."
              author="Carlos Rodríguez"
              role="Desarrollador Full Stack"
              rating={5}
            />
            <TestimonialCard
              quote="Rápido, fácil y profesional. Mi CV ahora se ve increíble y refleja mejor mis habilidades y experiencia."
              author="Ana García"
              role="Marketing Digital"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Tokens System Section */}
      <section className="py-20 px-4 bg-[#0F0F10]/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 mb-4">
              Sistema de Tokens
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tokens flexibles para tus necesidades
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Nuestro sistema de tokens te permite pagar solo por lo que
              necesitas, sin suscripciones mensuales.
            </p>
          </div>

          <div className="mb-10 max-w-3xl mx-auto bg-[#1F1F22] rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#7C3AED] p-2 rounded-full shrink-0">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  ¿Qué es el sistema de tokens?
                </h3>
                <p className="text-[#F4F4F5]/80 mb-4">
                  El sistema de tokens es una forma simple y flexible de
                  controlar cuántas veces puedes generar un CV u otras acciones
                  premium dentro de la plataforma. Cada vez que generas un CV,
                  se descuenta 1 token de tu cuenta.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-[#0F0F10] p-4 rounded-lg">
                    <p className="text-sm text-[#F4F4F5]/60 mb-1">CV Básico</p>
                    <p className="font-bold text-[#38BDF8]">1 token</p>
                  </div>
                  <div className="bg-[#0F0F10] p-4 rounded-lg">
                    <p className="text-sm text-[#F4F4F5]/60 mb-1">CV Premium</p>
                    <p className="font-bold text-[#38BDF8]">2 tokens</p>
                  </div>
                  <div className="bg-[#0F0F10] p-4 rounded-lg">
                    <p className="text-sm text-[#F4F4F5]/60 mb-1">
                      Carta de Presentación
                    </p>
                    <p className="font-bold text-[#38BDF8]">3 tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2 mx-auto mb-8">
              <TabsTrigger value="individual">
                Paquetes Individuales
              </TabsTrigger>
              <TabsTrigger value="business">Empresas</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="w-full">
              <div className="grid md:grid-cols-3 gap-6">
                <TokenCard
                  title="Starter"
                  tokens={5}
                  price="$9.99"
                  description="Para quienes buscan trabajo ocasionalmente"
                  features={[
                    "5 tokens para generar CVs",
                    "Acceso a plantillas básicas",
                    "Optimización ATS básica",
                    "Exportación en PDF",
                    "Válido por 6 meses",
                  ]}
                  buttonText="Comprar tokens"
                  buttonVariant="outline"
                />
                <TokenCard
                  title="Pro"
                  tokens={15}
                  price="$19.99"
                  description="Para búsqueda activa de empleo"
                  features={[
                    "15 tokens para generar CVs",
                    "Acceso a todas las plantillas premium",
                    "Optimización ATS avanzada",
                    "Redacción mejorada por IA",
                    "Múltiples formatos de exportación",
                    "Válido por 12 meses",
                  ]}
                  buttonText="Comprar tokens"
                  buttonVariant="default"
                  popular={true}
                />
                <TokenCard
                  title="Unlimited"
                  tokens={50}
                  price="$39.99"
                  description="Para profesionales que cambian de trabajo frecuentemente"
                  features={[
                    "50 tokens para generar CVs",
                    "Acceso a todas las plantillas premium",
                    "Optimización ATS avanzada",
                    "Redacción mejorada por IA",
                    "Múltiples formatos de exportación",
                    "Soporte prioritario",
                    "Válido por 24 meses",
                  ]}
                  buttonText="Comprar tokens"
                  buttonVariant="outline"
                />
              </div>
            </TabsContent>

            <TabsContent value="business" className="w-full">
              <div className="grid md:grid-cols-3 gap-6">
                <TokenCard
                  title="Team"
                  tokens={100}
                  price="$149.99"
                  description="Para equipos pequeños"
                  features={[
                    "100 tokens para compartir",
                    "Hasta 5 usuarios",
                    "Acceso a todas las plantillas premium",
                    "Panel de administración",
                    "Análisis de CVs",
                    "Soporte prioritario",
                    "Válido por 12 meses",
                  ]}
                  buttonText="Contactar ventas"
                  buttonVariant="outline"
                />
                <TokenCard
                  title="Business"
                  tokens={300}
                  price="$299.99"
                  description="Para empresas medianas"
                  features={[
                    "300 tokens para compartir",
                    "Hasta 15 usuarios",
                    "Acceso a todas las plantillas premium",
                    "Panel de administración avanzado",
                    "Análisis de CVs y reportes",
                    "Integración con ATS",
                    "Soporte dedicado",
                    "Válido por 12 meses",
                  ]}
                  buttonText="Contactar ventas"
                  buttonVariant="default"
                  popular={true}
                />
                <TokenCard
                  title="Enterprise"
                  tokens={1000}
                  price="$799.99"
                  description="Para grandes organizaciones"
                  features={[
                    "1000 tokens para compartir",
                    "Usuarios ilimitados",
                    "Plantillas personalizadas",
                    "Panel de administración completo",
                    "API de integración",
                    "Análisis avanzado y reportes",
                    "Gestor de cuenta dedicado",
                    "Válido por 24 meses",
                  ]}
                  buttonText="Contactar ventas"
                  buttonVariant="outline"
                />
              </div>
            </TabsContent>
          </Tabs>
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

            <AccordionItem value="item-3" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Puedo personalizar las plantillas?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Sí, todas nuestras plantillas son completamente personalizables.
                Puedes ajustar colores, fuentes, espaciado y otros elementos
                para que tu CV refleje tu personalidad profesional, manteniendo
                siempre un aspecto profesional.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿En qué formatos puedo descargar mi CV?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Con el plan básico puedes descargar tu CV en formato PDF. Los
                planes premium permiten exportar en múltiples formatos como
                DOCX, TXT y HTML, facilitando su uso en diferentes plataformas y
                situaciones.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-[#1F1F22]">
              <AccordionTrigger className="text-left">
                ¿Qué pasa si no estoy satisfecho con el resultado?
              </AccordionTrigger>
              <AccordionContent className="text-[#F4F4F5]/70">
                Ofrecemos una garantía de satisfacción de 14 días. Si no estás
                completamente satisfecho con nuestro servicio, te reembolsaremos
                el 100% de tu pago sin hacer preguntas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

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
            <Button
              size="lg"
              className="bg-[#7C3AED] hover:bg-[#A78BFA] text-white"
            >
              Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="border-[#1F1F22] ">
              Ver ejemplos
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
