"use client";

import {
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import HeroShowcase from "./HeroShowcase";
import { Button } from "./ui/button";

export default function WelcomeHero() {
  const reduceMotion = useReducedMotion();
  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative isolate overflow-hidden bg-[#0C0C10] px-4 pb-12 pt-5 sm:px-6 sm:pb-14 sm:pt-7 lg:min-h-[calc(100dvh-64px)] lg:pb-10 lg:pt-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8DDFF]/[0.18] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(122,92,255,0.22),transparent_30%),radial-gradient(circle_at_18%_72%,rgba(246,242,234,0.08),transparent_28%),linear-gradient(135deg,#0C0C10_0%,#141219_46%,#08080A_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(246,242,234,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.48)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="absolute -right-24 top-12 h-[34rem] w-[34rem] rounded-full bg-[#7A5CFF]/[0.12] blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0D0D10] via-[#0D0D10]/[0.74] to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1500px] items-center gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.76fr)_minmax(620px,1.24fr)] lg:gap-8 xl:gap-12">
        <div className="relative z-10 max-w-3xl lg:pt-1">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DDFF]/[0.12] bg-[#F6F2EA]/[0.045] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Documento guiado por IA
          </motion.div>

          <div className="mt-7">
            <h1 className="max-w-[14ch] text-balance text-[3.75rem] font-semibold leading-[0.84] tracking-[-0.075em] text-[#F6F2EA] sm:text-[5rem] md:text-[5.8rem] lg:text-[6.9rem] xl:text-[7.45rem]">
              CV con IA,
              <br />
              listo para postular
            </h1>
          </div>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: easeOut }}
            className="mt-6 max-w-[35rem] text-pretty text-base leading-7 text-[#D8D2C8]/[0.76] sm:text-xl sm:leading-8"
          >
            Ordena tu experiencia, mejora la redaccion y edita tu CV despues
            desde tu perfil.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14, ease: easeOut }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/crear" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-[52px] w-full rounded-full bg-[#F6F2EA] px-7 text-[15px] font-semibold text-[#121114] shadow-[0_18px_44px_rgba(246,242,234,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFFCF4] hover:shadow-[0_22px_54px_rgba(246,242,234,0.24)] active:translate-y-0 sm:w-auto sm:px-8"
              >
                Crear mi CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link
              href="/plantillas-curriculum"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-[#F6F2EA]/[0.12] bg-[#F6F2EA]/[0.035] px-6 text-sm font-medium text-[#F6F2EA]/[0.78] shadow-[inset_0_1px_0_rgba(246,242,234,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F6F2EA]/20 hover:bg-[#F6F2EA]/[0.07] hover:text-[#F6F2EA] active:translate-y-0"
            >
              Ver plantillas
            </Link>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: easeOut }}
            className="mt-4 flex w-full flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.035] px-3 py-2.5 text-[12px] font-medium text-[#D8D2C8]/[0.72] shadow-[inset_0_1px_0_rgba(246,242,234,0.04)] sm:w-fit sm:justify-start sm:rounded-full sm:px-4"
          >
            <span>Pago unico</span>
            <span className="h-1 w-1 rounded-full bg-[#D7C8FF]/40" />
            <span>PDF descargable</span>
            <span className="h-1 w-1 rounded-full bg-[#D7C8FF]/40" />
            <span>Editable desde tu perfil</span>
          </motion.div>
        </div>

        <HeroShowcase />
      </div>
    </section>
  );
}
