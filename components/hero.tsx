"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
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
  ChevronDown,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Shield,
  Target,
  Layers,
  Sparkle,
} from "lucide-react";
import { TestimonialCard } from "@/components/testimonial-card";
import { FeatureCard } from "@/components/feature-card";
import Link from "next/link";
import WelcomeHero from "./WelcomeHero";
import Image from "next/image";
import { motion } from "motion/react";

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Badge className="bg-white/[0.06] text-white/70 hover:bg-white/[0.08] border border-white/[0.08] mb-4 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
          {badge}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#F0EBFF]">
          {title}
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6]">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-white">{value}</p>
        <p className="text-xs text-white/50">{label}</p>
      </div>
    </motion.div>
  );
}

const featureCards = [
  { title: "Optimización ATS", desc: "Tu CV pasa los filtros de las empresas.", tag: "ATS", color: "#8B5CF6", icon: "Search" },
  { title: "Redacción con IA", desc: "Genera contenido profesional automáticamente.", tag: "IA", color: "#38BDF8", icon: "Sparkles" },
  { title: "Plantillas Premium", desc: "Diseños exclusivos que destacan.", tag: "Premium", color: "#10B981", icon: "Target" },
  { title: "Descarga PDF", desc: "Obtén tu CV listo para enviar.", tag: "PDF", color: "#F59E0B", icon: "Download" },
  { title: "Edición Fácil", desc: "Modifica todo sin complicaciones.", tag: "Fácil", color: "#EC4899", icon: "PencilLine" },
  { title: "Actualizaciones", desc: "Mejora tu CV cuando quieras.", tag: "Ilimitado", color: "#6366F1", icon: "Layers" },
];

const faqQuestions = [
  { q: "¿Cómo funciona VitaeSpark?", a: "Responde algunas preguntas sobre tu experiencia y la IA genera un CV profesional optimizado para ATS." },
  { q: "¿Necesito experiencia?", a: "No. Puedes crear un CV sin experiencia usando plantillas diseñadas para primer empleo." },
  { q: "¿Es gratuito?", a: "Puedes crear tu CV gratis con funciones básicas. El plan premium incluye descargas ilimitadas y plantillas exclusivas." },
  { q: "¿Qué es el enfoque ATS?", a: "ATS son los sistemas que las empresas usan para filtrar currículums. Optimizamos tu CV para que pase esos filtros." },
  { q: "¿Puedo descargar mi CV?", a: "Sí. Descarga tu CV en PDF optimizado para enviar por email o subir a portales de empleo." },
];

const guides = [
  { href: "/curriculum-ats", title: "CV para ATS" },
  { href: "/plantilla-harvard", title: "Plantilla Harvard" },
  { href: "/curriculum-sin-experiencia", title: "Sin experiencia" },
  { href: "/crear-cv-online", title: "Crear CV online" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#F4F4F5]">
      <WelcomeHero />

      {/* Stats + Steps Section */}
      <section className="border-y border-white/[0.06] bg-[#15151A] py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Cómo funciona"
            title="Crea tu CV en 3 pasos"
            description="Genera un currículum profesional en minutos, sin complicaciones."
          />

          {/* Steps + Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group relative flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 text-center hover:border-[#8B5CF6]/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
            >
              <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B5CF6] text-sm font-bold text-white shadow-lg shadow-[#8B5CF6]/30">
                1
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white shadow-lg shadow-[#8B5CF6]/30">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Ingresa tus datos</h3>
              <p className="mt-2 text-sm text-white/50">Responde preguntas simples sobre tu experiencia.</p>
              <div className="mt-auto h-1 w-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 text-center hover:border-[#38BDF8]/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]"
            >
              <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#38BDF8] text-sm font-bold text-white shadow-lg shadow-[#38BDF8]/30">
                2
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#0284C7] text-white shadow-lg shadow-[#38BDF8]/30">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">IA genera el CV</h3>
              <p className="mt-2 text-sm text-white/50">Nuestra IA crea contenido profesional optimizado.</p>
              <div className="mt-auto h-1 w-8 rounded-full bg-gradient-to-r from-[#38BDF8] to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative flex flex-col items-center rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 text-center hover:border-[#10B981]/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
            >
              <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#10B981] text-sm font-bold text-white shadow-lg shadow-[#10B981]/30">
                3
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg shadow-[#10B981]/30">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="text-base font-semibold text-white">Descarga PDF</h3>
              <p className="mt-2 text-sm text-white/50">Recibe tu CV listo para enviar a empresas.</p>
              <div className="mt-auto h-1 w-8 rounded-full bg-gradient-to-r from-[#10B981] to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col justify-center rounded-2xl border border-[#8B5CF6]/20 bg-gradient-to-br from-[#8B5CF6]/10 to-[#1C1C22] p-6"
            >
              <div className="mb-4 flex items-center justify-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/15 text-[#8B5CF6]">
                  <Users className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-white">500+</span>
                  <p className="text-xs text-white/50">Usuarios registrados</p>
                </div>
              </div>
              <div className="mb-3 flex items-center justify-center gap-2">
                <FileText className="h-4 w-4 text-[#38BDF8]" />
                <span className="text-xl font-bold text-white">1.2k+</span>
                <span className="text-xs text-white/50">CVs creados</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#10B981]" />
                <span className="text-lg font-bold text-white">85%</span>
                <span className="text-xs text-white/50">Más entrevistas</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden py-16 px-4 bg-[#111113]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Funciones"
            title="Todo lo que necesitas"
            description="Herramientas diseñadas para que tu currículum destaque."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((item, i) => {
              const iconMap: Record<string, React.ReactNode> = {
                Search: <Search className="h-6 w-6" />,
                Sparkles: <Sparkles className="h-6 w-6" />,
                Target: <Target className="h-6 w-6" />,
                Layers: <Layers className="h-6 w-6" />,
                Zap: <Zap className="h-6 w-6" />,
                Download: <Download className="h-6 w-6" />,
              };
              return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 hover:border-[#8B5CF6]/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: item.color + "15", color: item.color }}>
                    {iconMap[item.icon]}
                  </div>
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/60">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-16 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Ventajas"
            title="Compara y decide"
            description="Descubre por qué VitaeSpark supera a un CV tradicional."
          />

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] text-white/40">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-white/50">CV Tradicional</span>
              </div>
              <div className="aspect-[4/3] rounded-xl bg-[#0F0F10] mb-6 overflow-hidden">
                <Image
                  src="/hamdu.webp"
                  alt="CV Tradicional"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-top opacity-40 grayscale"
                />
              </div>
              <div className="space-y-3">
                {["Sin optimización ATS", "Diseño básico", "Sin IA"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                      <span className="text-xs">✕</span>
                    </div>
                    <span className="text-sm text-white/50">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-[#8B5CF6]/30 bg-gradient-to-b from-[#8B5CF6]/5 to-[#1C1C22] p-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B5CF6] via-[#38BDF8] to-transparent" />
              <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#8B5CF6]/10 blur-xl">
                <Sparkle className="h-8 w-8 text-[#8B5CF6]" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-[#8B5CF6]">VitaeSpark</span>
              </div>
              <div className="relative aspect-[4/3] rounded-xl bg-[#0F0F10] mb-6 overflow-hidden">
                <Image
                  src="/purple-hero.webp"
                  alt="CV VitaeSpark"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-2 right-2 rounded-full bg-[#8B5CF6] px-2 py-1 text-xs font-bold text-white shadow-lg">
                  ATS
                </div>
              </div>
              <div className="space-y-3">
                {["Optimizado para ATS", "Diseño profesional con IA", "Descarga PDF"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative overflow-hidden py-16 px-4 bg-[#111113]">
        <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="FAQ"
            title="Preguntas frecuentes"
            description="Resolvemos tus dudas sobre VitaeSpark."
          />

          <div className="space-y-2">
            {faqQuestions.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group rounded-xl border border-white/[0.06] bg-[#1C1C22] overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 text-left font-medium text-white/80 transition-colors hover:text-white">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B5CF6]/10 text-[#8B5CF6]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="flex-1">{item.q}</span>
                  <ChevronDown className="h-5 w-5 text-white/40 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 pl-[4.5rem]">
                  <p className="text-sm leading-relaxed text-white/50">{item.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#111113]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#1C1C22] via-[#15151A] to-[#1C1C22] p-8 md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/5 via-transparent to-[#38BDF8]/5" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-[80px]" />
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-[#38BDF8]/10 blur-[80px]" />

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-[#8B5CF6]/20 text-[#8B5CF6] border-[#8B5CF6]/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
                  Empieza gratis
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                  Crea tu CV profesional ahora
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Genera un currículum optimizado para ATS en minutos. Sin experiencia previa.
                </p>
                <Link href="/crear">
                  <Button size="lg" className="h-12 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-lg shadow-[#8B5CF6]/30 transition-all duration-300 font-semibold px-8">
                    Crear mi CV gratis
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="hidden md:block">
                <div className="relative rounded-2xl border border-white/[0.08] bg-[#0F0F10] overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                      <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                      <div className="h-3 w-3 rounded-full bg-[#28CA41]" />
                    </div>
                    <span className="ml-2 text-xs text-white/40">preview</span>
                  </div>
                  <Image
                    src="/purple-hero.webp"
                    alt="Vista previa del CV"
                    width={480}
                    height={560}
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides Compact */}
      <section className="py-16 px-4 bg-[#15151A]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Recursos"
            title="Guías rápidas"
            description="Aprende a crear el mejor currículum con nuestros artículos."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {guides.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#1C1C22] px-4 py-4 transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-[#1C1C22]/80 hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <span className="text-[#8B5CF6] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-[#38BDF8] hover:text-white transition-colors">
              Ver todas las guías →
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqQuestions.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
}