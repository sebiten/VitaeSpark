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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111113] text-[#F4F4F5]">
      <WelcomeHero />

      {/* Stats + Steps Section */}
      <section className="border-y border-white/[0.06] bg-[#15151A] py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Proceso simple"
            title="Tu CV listo en minutos"
            description="Solo seguí estos pasos y ottené un CV profesional."
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
              <h3 className="text-base font-semibold text-white">Cargá tus datos</h3>
              <p className="mt-2 text-sm text-white/50">Experiencia, estudios, habilidades y links.</p>
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
              <h3 className="text-base font-semibold text-white">La IA ordena</h3>
              <p className="mt-2 text-sm text-white/50">Convierte frases sueltas en contenido claro.</p>
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
              <h3 className="text-base font-semibold text-white">Descargá tu CV</h3>
              <p className="mt-2 text-sm text-white/50">PDF profesional listo para enviar.</p>
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
                  <p className="text-xs text-white/50">usuarios registrados</p>
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
                <span className="text-xs text-white/50">más entrevistas</span>
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
            badge="Características"
            title="Todo lo que necesitas para un CV perfecto"
            description="VitaeSpark combina tecnología avanzada con diseño profesional para crear CVs que impresionan."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Search className="h-6 w-6" />,
                color: "#8B5CF6",
                title: "Optimizado para ATS",
                desc: "Supera filtros automáticos con palabras clave estratégicas.",
                tag: "ATS Ready",
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                color: "#38BDF8",
                title: "Redacción con IA",
                desc: "Textos más impactantes y profesionales en segundos.",
                tag: "AI Power",
              },
              {
                icon: <Target className="h-6 w-6" />,
                color: "#10B981",
                title: "Enfoque estratégico",
                desc: "Estructura que destaca tus logros y habilidades.",
                tag: "Strategic",
              },
              {
                icon: <Layers className="h-6 w-6" />,
                color: "#F59E0B",
                title: "Plantillas premium",
                desc: "Diseños modernos adaptados a cada industria.",
                tag: "Premium",
              },
              {
                icon: <Zap className="h-6 w-6" />,
                color: "#EC4899",
                title: "Proceso express",
                desc: "De datos sueltos a CV profesional en 10 minutos.",
                tag: "Fast",
              },
              {
                icon: <Download className="h-6 w-6" />,
                color: "#6366F1",
                title: "Descarga ilimitada",
                desc: "PDF profesional desde tu perfil, cuántas veces quieras.",
                tag: "Unlimited",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 hover:border-[#8B5CF6]/30 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/60">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-[#111113]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Comparativa"
            title="La diferencia VitaeSpark"
            description="Verás por qué un CV optimizado marca la diferencia."
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
                  alt="CV tradicional"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover object-top opacity-40 grayscale"
                />
              </div>
              <div className="space-y-3">
                {[
                  { text: "Rechazado por filtros ATS", ok: false },
                  { text: "Diseño genérico", ok: false },
                  { text: "Horas de edición manual", ok: false },
                  { text: "Sin diferenciación", ok: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.ok ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">✕</span>}
                    </div>
                    <span className="text-sm text-white/50">{item.text}</span>
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
                  ATS ✓
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { text: "Supera filtros ATS", ok: true },
                  { text: "Diseño profesional único", ok: true },
                  { text: "Listo en minutos", ok: true },
                  { text: "Destaque entre candidatos", ok: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-[#15151A]">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Testimonios"
            title="Lo que dicen nuestros usuarios"
            description="Miles de profesionales ya mejoraron sus oportunidades."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Actualicé mi CV con VitaeSpark y a la semana ya tenía entrevistas. Súper práctico y fácil de usar.",
                author: "Laura Martínez",
                role: "Diseñadora UX/UI",
                avatar: "LM",
              },
              {
                quote: "Me ayudó un montón con el tema de los filtros de las empresas. Después de varios meses, por fin empecé a recibir respuestas.",
                author: "Carlos Rodríguez",
                role: "Desarrollador Full Stack",
                avatar: "CR",
              },
              {
                quote: "Muy simple de usar y el resultado quedó re bien. Ahora mi CV muestra mejor lo que sé hacer.",
                author: "Ana García",
                role: "Marketing Digital",
                avatar: "AG",
              },
            ].map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-[#1C1C22] p-6 hover:border-[#8B5CF6]/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-white/70 leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B5CF6]/20 text-[#8B5CF6] font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
            description="Todo lo que necesitas saber."
          />

          <div className="space-y-2">
            {[
              {
                q: "¿Qué es un creador de CV online?",
                a: "Es una herramienta web que te guía para cargar tus datos, ordenar experiencia, elegir plantilla y descargar un curriculum listo para postular. VitaeSpark suma redacción con IA, estructura ATS y PDF.",
                icon: <FileText className="h-5 w-5" />,
              },
              {
                q: "¿En qué se diferencia de una plantilla?",
                a: "Una plantilla solo resuelve el diseño. Un creador de CV también te ayuda a ordenar contenido, redactar mejor y preparar el documento para recruiters y filtros ATS.",
                icon: <Layers className="h-5 w-5" />,
              },
              {
                q: "¿Qué es un sistema ATS y por qué importa?",
                a: "Un ATS (Applicant Tracking System) filtra CVs automáticamente. Aproximadamente el 75% son rechazados antes de ser vistos. VitaeSpark asegura que tu CV pase estos filtros.",
                icon: <Search className="h-5 w-5" />,
              },
              {
                q: "¿Cómo mejora la IA mi currículum?",
                a: "Analiza tu información y mejora redacción para que sea más impactante. Identifica palabras clave de tu industria y las incorpora estratégicamente.",
                icon: <Sparkles className="h-5 w-5" />,
              },
              {
                q: "¿En qué formatos puedo descargar?",
                a: "PDF profesional,多少次 quieras desde tu perfil. El mismo archivo actualizado.",
                icon: <Download className="h-5 w-5" />,
              },
            ].map((item, i) => (
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
                    {item.icon}
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
                  Empezá ahora
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">
                  Tu próximo CV puede estar listo en minutos
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  Completá tus datos, dejá que la IA mejore la redacción y descargá un PDF profesional preparado para filtros ATS.
                </p>
                <Link href="/crear">
                  <Button size="lg" className="h-12 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-lg shadow-[#8B5CF6]/30 transition-all duration-300 font-semibold px-8">
                    Crear mi CV ahora
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
                    alt="CV Preview"
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
            title="Encuentra la guía para tu CV"
            description="Páginas pensadas para cada tipo de necesidad."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { href: "/crear-cv-online", title: "Crear CV online", icon: "→" },
              { href: "/curriculum-ats", title: "CV para ATS", icon: "→" },
              { href: "/hacer-cv-con-ia", title: "CV con IA", icon: "→" },
              { href: "/plantilla-harvard", title: "Plantilla Harvard", icon: "→" },
              { href: "/cv-sin-experiencia", title: "Sin experiencia", icon: "→" },
              { href: "/cv-para-programadores", title: "Programadores", icon: "→" },
              { href: "/cv-para-medicos", title: "Médicos", icon: "→" },
              { href: "/cv-para-vendedor", title: "Vendedores", icon: "→" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#1C1C22] px-4 py-4 transition-all duration-300 hover:border-[#8B5CF6]/30 hover:bg-[#1C1C22]/80 hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {item.title}
                </span>
                <span className="text-[#8B5CF6] transition-transform group-hover:translate-x-1">
                  {item.icon}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog" className="text-sm text-[#38BDF8] hover:text-white transition-colors">
              Ver más guías en el blog →
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
            mainEntity: [
              {
                "@type": "Question",
                name: "Que es un creador de CV online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un creador de CV online es una herramienta web que te guia para cargar tus datos, ordenar tu experiencia, elegir una plantilla y descargar un curriculum listo para protestar. VitaeSpark agrega redaccion con IA, estructura ATS y descarga en PDF.",
                },
              },
              {
                "@type": "Question",
                name: "Cual es la diferencia entre un creador de CV y una plantilla?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Una plantilla solo resuelve el diseño. Un creador de CV tambien ayuda a ordenar el contenido, mejorar la redaccion, completar secciones clave y preparar el documento final para reclutadores y filtros ATS.",
                },
              },
              {
                "@type": "Question",
                name: "¿Qué es un sistema ATS y por qué es importante?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Un ATS (Applicant Tracking System) es un software que utilizan las empresas para filtrar automáticamente los CVs. Es importante que tu CV esté optimizado para estos sistemas, ya que aproximadamente el 75% de los currículos son rechazados antes de que un reclutador los vea. VitaeSpark asegura que tu CV pase estos filtros.",
                },
              },
              {
                "@type": "Question",
                name: "¿Cómo mejora la IA mi currículum?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Nuestra IA analiza tu información y mejora la redacción para hacerla más impactante y profesional. También identifica palabras clave relevantes para tu industria y las incorpora estratégicamente, aumentando tus posibilidades de superar los filtros ATS.",
                },
              },
              {
                "@type": "Question",
                name: "¿En qué formatos puedo descargar mi CV?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Con la generación de tu CV puedes descargarlo en formato PDF las veces que sean necesarias desde tu perfil.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}