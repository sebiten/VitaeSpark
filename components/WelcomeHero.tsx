"use client";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import AnimatedHeroTitle from "./AnimatedHeroTitle";
import HeroShowcase from "./HeroShowcase";
import { Button } from "./ui/button";

export default function WelcomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0D0D10] px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-7 lg:min-h-[calc(100dvh-76px)] lg:pb-16 lg:pt-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8DDFF]/16 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(112,82,190,0.18),transparent_32%),linear-gradient(135deg,#0D0D10_0%,#141318_47%,#09090B_100%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(246,242,234,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.45)_1px,transparent_1px)] [background-size:88px_88px]" />
        <div className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-[#7A5CFF]/10 blur-[110px]" />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#111113] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:gap-12">
        <div className="relative max-w-2xl lg:pt-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DDFF]/12 bg-[#F6F2EA]/[0.045] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Documento guiado por IA
          </motion.div>

          <div className="mt-6 max-w-2xl">
            <AnimatedHeroTitle />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
            className="mt-5 max-w-[34rem] text-pretty text-base leading-7 text-[#D8D2C8]/72 sm:text-lg sm:leading-8"
          >
            Ordena tu experiencia, mejora el texto y descarga un PDF serio sin
            pelearte con plantillas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: "easeOut" }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/crear" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full rounded-full bg-[#F6F2EA] px-6 text-[15px] font-semibold text-[#121114] shadow-[0_16px_36px_rgba(246,242,234,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(246,242,234,0.22)] active:translate-y-0 sm:w-auto sm:px-7"
              >
                Crear mi CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/plantillas-curriculum"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#F6F2EA]/12 bg-[#F6F2EA]/[0.035] px-5 text-sm font-medium text-[#F6F2EA]/76 shadow-[inset_0_1px_0_rgba(246,242,234,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F6F2EA]/20 hover:bg-[#F6F2EA]/[0.07] hover:text-[#F6F2EA] active:translate-y-0 sm:px-6"
            >
              Ver plantillas
            </Link>
          </motion.div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
