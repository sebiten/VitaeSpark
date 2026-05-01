import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  FileText,
  Zap,
  Sparkles,
  Search,
  Clock,
  Award,
  ArrowRight,
  Bot,
  Download,
  HelpCircle,
  PencilLine,
  BookOpen,
} from "lucide-react";
import { TestimonialCard } from "@/components/testimonial-card";
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import WelcomeHero from "./WelcomeHero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0F0F10] text-[#F4F4F5]">
      {/* Hero Section */}

      <WelcomeHero />

      {/* Features Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#0F0F10]">
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-[110px]" />
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
              icon={<FileText className="h-6 w-6 text-[#38BDF8] " />}
              title="Plantillas profesionales"
              description="Diseños modernos y efectivos que destacan tu experiencia y habilidades."
            />
            <FeatureCard
              icon={<Search className="h-6 w-6 text-[#38BDF8] " />}
              title="Optimizado para ATS"
              description="Supera los filtros automáticos de las empresas con palabras clave estratégicas."
            />
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-[#38BDF8] " />}
              title="Redacción inteligente"
              description="La IA mejora tus textos para hacerlos más impactantes y profesionales."
            />
            <FeatureCard
              icon={<Clock className="h-6 w-6 text-[#38BDF8] " />}
              title="Rápido y sencillo"
              description="Crea un CV profesional en minutos, sin complicaciones ni conocimientos técnicos."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-[#38BDF8] " />}
              title="Personalización total"
              description="Adapta cada sección a tus necesidades específicas y al puesto que buscas."
            />
            <FeatureCard
              icon={<Award className="h-6 w-6 text-[#38BDF8] " />}
              title="Resultados comprobados"
              description="Aumenta tus posibilidades de conseguir entrevistas con un CV que realmente funciona."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#0F0F10]/50">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/15 to-transparent" />
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

          <div className="grid md:grid-cols-3 gap-6 relative">
            {[
              {
                number: "01",
                icon: <PencilLine className="h-6 w-6" />,
                title: "Ingresa tus datos",
                description:
                  "Completa un formulario simple con tu experiencia, educación y habilidades.",
              },
              {
                number: "02",
                icon: <Bot className="h-6 w-6" />,
                title: "La IA optimiza tu CV",
                description:
                  "Mejora automáticamente la redacción, el orden y la estructura de tu CV.",
              },
              {
                number: "03",
                icon: <Download className="h-6 w-6" />,
                title: "Descarga tu CV listo",
                description:
                  "Obtén un PDF profesional y preparado para enviar a empresas.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15151A] p-6 shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:border-[#38BDF8]/25"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
                <div className="relative mb-8 flex items-center justify-between">
                  <div className="rounded-2xl bg-[#38BDF8]/10 p-4 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-white/[0.06]">
                    {step.number}
                  </span>
                </div>
                <h3 className="relative text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="relative text-[#F4F4F5]/70 leading-7">
                  {step.description}
                </p>
                <div className="relative mt-6 h-1 rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#38BDF8]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
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
                  <Image
                    src="/hamdu.webp"
                    alt="CV tradicional no optimizado"
                    className="rounded-lg w-full h-full object-cover opacity-70"
                    width={500}
                    height={300}
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
                  <Image
                    width={500}
                    height={  300}
                    src="/purple-hero.webp"
                    alt="CV optimizado por VitaeSpark"
                    className="rounded-lg w-full h-full object-cover opacity-90"
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
            <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 mb-4">
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

          <div className="relative grid md:grid-cols-3 gap-6">
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
          <div className="mt-8 grid gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-center sm:grid-cols-3">
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-2xl font-bold text-white">ATS</p>
              <p className="text-sm text-white/55">enfoque en filtros</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-2xl font-bold text-[#38BDF8]">PDF</p>
              <p className="text-sm text-white/55">descarga profesional</p>
            </div>
            <div className="rounded-2xl bg-black/20 p-4">
              <p className="text-2xl font-bold text-white">IA</p>
              <p className="text-sm text-white/55">redacción mejorada</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#0F0F10]">
        <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-[#7C3AED]/20 text-[#7C3AED] hover:bg-[#7C3AED]/30 mb-4">
              Preguntas Frecuentes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Resolvemos tus dudas
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-2xl mx-auto">
              Todo lo que necesitas saber sobre VitaeSpark.
            </p>
          </div>

          <div className="relative w-full rounded-3xl border border-white/10 bg-[#15151A]/80 p-3 shadow-2xl shadow-black/10">
            <details className="group border-b border-white/10 px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium transition hover:text-[#38BDF8]">
                <HelpCircle className="mr-3 h-5 w-5 text-[#38BDF8]" />
                ¿Qué es un sistema ATS y por qué es importante?
                <span className="ml-auto text-xl text-white/35 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-[#F4F4F5]/70">
                Un ATS (Applicant Tracking System) es un software que utilizan
                las empresas para filtrar automáticamente los CVs. Es importante
                que tu CV esté optimizado para estos sistemas, ya que
                aproximadamente el 75% de los currículums son rechazados antes
                de que un reclutador los vea. VitaeSpark asegura que tu CV pase
                estos filtros.
              </p>
            </details>

            <details className="group border-b border-white/10 px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium transition hover:text-[#38BDF8]">
                <Sparkles className="mr-3 h-5 w-5 text-[#A78BFA]" />
                ¿Cómo mejora la IA mi currículum?
                <span className="ml-auto text-xl text-white/35 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-[#F4F4F5]/70">
                Nuestra IA analiza tu información y mejora la redacción para
                hacerla más impactante y profesional. También identifica
                palabras clave relevantes para tu industria y las incorpora
                estratégicamente, aumentando tus posibilidades de superar los
                filtros ATS.
              </p>
            </details>

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

            <details className="group px-4 py-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium transition hover:text-[#38BDF8]">
                <Download className="mr-3 h-5 w-5 text-[#38BDF8]" />
                ¿En qué formatos puedo descargar mi CV?
                <span className="ml-auto text-xl text-white/35 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 pl-8 leading-7 text-[#F4F4F5]/70">
                Con la generación de tu cv puedes descargarlo en formato PDF las
                veces que sean necesesarias desde tu perfil.
              </p>
            </details>

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
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0F0F10]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <Badge className="bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8]/30 mb-4">
              Guias y recursos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra la guia correcta para tu tipo de CV
            </h2>
            <p className="text-[#F4F4F5]/70 max-w-3xl mx-auto">
              Si llegaste buscando como hacer un curriculum, mejorar tu CV para
              ATS o armar un perfil sin experiencia, aqui tienes paginas
              pensadas para esa necesidad concreta.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                href: "/crear-cv-online",
                title: "Crear CV online",
                description:
                  "Aprende como crear un curriculum profesional y dejarlo listo para descargar.",
              },
              {
                href: "/curriculum-ats",
                title: "Curriculum ATS",
                description:
                  "Consejos y estructura para pasar mejor filtros de seleccion automatizados.",
              },
              {
                href: "/hacer-cv-con-ia",
                title: "Hacer CV con IA",
                description:
                  "Usa inteligencia artificial para redactar mejor y ahorrar tiempo.",
              },
              {
                href: "/plantilla-harvard",
                title: "Plantilla Harvard",
                description:
                  "Una referencia clara y sobria para CVs profesionales y faciles de leer.",
              },
              {
                href: "/curriculum-sin-experiencia",
                title: "CV sin experiencia",
                description:
                  "Ideas para destacar estudios, proyectos y habilidades si buscas primer empleo.",
              },
              {
                href: "/cv-para-primer-empleo",
                title: "CV para primer empleo",
                description:
                  "Una pagina mas directa para quienes necesitan postularse pronto a su primer trabajo.",
              },
              {
                href: "/curriculum-vitae-ejemplo",
                title: "Curriculum vitae ejemplo",
                description:
                  "Usa una referencia clara para entender como deberia verse un buen CV.",
              },
              {
                href: "/cv-para-programadores",
                title: "CV para programadores",
                description:
                  "Aprende como mostrar stack, proyectos y experiencia tecnica de forma clara.",
              },
              {
                href: "/cv-para-medicos",
                title: "CV para medicos",
                description:
                  "Organiza formacion, experiencia clinica y especialidades en un solo CV.",
              },
              {
                href: "/cv-para-estudiantes",
                title: "CV para estudiantes",
                description:
                  "Ideal para pasantias, practicas y primeros pasos laborales.",
              },
              {
                href: "/cv-para-atencion-al-cliente",
                title: "CV para atencion al cliente",
                description:
                  "Destaca experiencia con usuarios, reclamos, CRM y habilidades operativas.",
              },
              {
                href: "/cv-para-vendedor",
                title: "CV para vendedor",
                description:
                  "Muestra ventas, atencion al cliente, objetivos y resultados comerciales.",
              },
              {
                href: "/cv-para-recepcionista",
                title: "CV para recepcionista",
                description:
                  "Organiza experiencia en recepcion, agenda, llamadas y tareas administrativas.",
              },
              {
                href: "/cv-para-administrativo",
                title: "CV para administrativo",
                description:
                  "Ordena tareas de oficina, documentacion, datos y soporte administrativo.",
              },
              {
                href: "/cv-para-repositor",
                title: "CV para repositor",
                description:
                  "Destaca reposicion, stock, orden de gondola y tareas operativas.",
              },
              {
                href: "/cv-para-operario",
                title: "CV para operario",
                description:
                  "Muestra produccion, deposito, herramientas, procesos y seguridad.",
              },
              {
                href: "/cv-para-mineria",
                title: "CV para mineria",
                description:
                  "Enfoca seguridad, turnos, maquinaria, campamento y experiencia operativa.",
              },
              {
                href: "/cv-para-seguridad",
                title: "CV para seguridad",
                description:
                  "Enfoca control de accesos, recorridas, prevencion y responsabilidad.",
              },
              {
                href: "/cv-para-limpieza",
                title: "CV para limpieza",
                description:
                  "Presenta experiencia en limpieza, orden, mantenimiento y servicios generales.",
              },
              {
                href: "/cv-profesional",
                title: "CV profesional",
                description:
                  "Mejora la estructura y la presentacion si quieres una version mas competitiva.",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#15151A] p-6 transition hover:-translate-y-1 hover:border-[#38BDF8]/40 hover:bg-[#181821]"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#7C3AED]/10 blur-2xl transition group-hover:bg-[#38BDF8]/10" />
                <div className="relative mb-5 flex items-center justify-between">
                  <div className="rounded-2xl bg-[#38BDF8]/10 p-3 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-1 group-hover:text-[#38BDF8]" />
                </div>
                <h3 className="relative text-xl font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="relative text-[#F4F4F5]/70 leading-7">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-sm text-[#38BDF8] hover:text-[#F4F4F5]"
            >
              Ver mas guias en el blog
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="relative overflow-hidden px-4 py-20 bg-[#0F0F10]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="pointer-events-none absolute right-1/4 top-20 h-72 w-72 rounded-full bg-[#7C3AED]/12 blur-[110px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] border border-white/10 bg-[#15151A]/85 p-6 shadow-2xl shadow-black/20 md:grid-cols-[1fr_360px] md:p-8">
          <div>
            <Badge className="mb-5 bg-[#7C3AED]/20 text-[#C4B5FD] hover:bg-[#7C3AED]/30">
              Listo para postularte
            </Badge>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              Tu próximo CV puede estar listo en minutos
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#F4F4F5]/75">
              Completá tus datos, dejá que la IA mejore la redacción y descargá
              un PDF profesional preparado para filtros ATS.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                "Redacción más clara",
                "Estructura ATS",
                "Descarga en PDF",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/crear">
                <Button
                  size="lg"
                  className="h-14 rounded-xl bg-[#7C3AED] px-8 hover:bg-[#6D28D9] text-white shadow-lg shadow-[#7C3AED]/30 transition-all duration-300"
                  variant="default"
                >
                  Crear mi CV ahora <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#7C3AED]/25 to-[#38BDF8]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F10] p-3">
              <div className="mb-3 flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3">
                <span className="text-xs uppercase tracking-[0.22em] text-[#38BDF8]">
                  Preview
                </span>
                <span className="rounded-full bg-[#38BDF8] px-3 py-1 text-xs font-bold text-[#0F0F10]">
                  ATS
                </span>
              </div>
              <img
                src="/purple-hero.webp"
                alt="Vista previa de CV profesional creado con VitaeSpark"
                className="aspect-[4/4.4] w-full rounded-2xl object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
