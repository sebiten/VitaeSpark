import Link from "next/link";
import Image from "next/image";
import { Instagram, Sparkles } from "lucide-react";
import { FloatingRobot } from "@/components/floating-robot";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#111113] px-4 py-14 md:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-8 h-48 w-48 rounded-full bg-[#8B5CF6]/6 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-8 h-32 w-32 rounded-full bg-[#38BDF8]/5 blur-[100px]" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-12">
          <div className="max-w-[280px]">
            <Link href="/" className="group flex items-center gap-3 mb-4">
              <Image
                src="/logoreal.webp"
                alt="VitaeSpark"
                width={40}
                height={40}
                className="rounded-xl transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-semibold text-white">VitaeSpark</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Crea curriculum profesionales optimizados para ATS con inteligencia artificial.
            </p>
            <a
              href="https://www.instagram.com/vitae.spark/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#8B5CF6] transition-colors"
            >
              <Instagram className="h-4 w-4" />
              @vitae.spark
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="mb-4 text-xs font-semibold text-white uppercase tracking-wider">
                Producto
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/crear"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Crear CV
                  </Link>
                </li>
                <li>
                  <Link
                    href="/perfil"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plantillas-curriculum"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Plantillas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-4 text-xs font-semibold text-white uppercase tracking-wider">
                Recursos
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/crear-cv-online"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Crear CV online
                  </Link>
                </li>
                <li>
                  <Link
                    href="/curriculum-ats"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Curriculum ATS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/curriculum-sin-experiencia"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    CV sin experiencia
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plantilla-harvard"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Plantilla Harvard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/generador-de-cv-con-ia"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Generador con IA
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold text-white uppercase tracking-wider">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Términos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="text-sm text-white/50 hover:text-[#8B5CF6] transition-colors"
                  >
                    Reembolsos
                  </Link>
                </li>
              </ul>

              <div className="mt-5">
                <a
                  href="mailto:soporte@vitaespark.com"
                  className="text-xs text-white/35 hover:text-white/50 transition-colors"
                >
                  soporte@vitaespark.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-6 border-t border-white/5">
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/40 shadow-[0_0_12px_2px_rgba(139,92,246,0.3)]" />
          <FloatingRobot size="sm" className="-top-10 right-4 opacity-20" />
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} VitaeSpark
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/30">
              <Sparkles className="h-3 w-3" />
              <span>Hecho con IA para tu carrera</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
