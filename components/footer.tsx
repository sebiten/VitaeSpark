"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { FloatingRobot } from "@/components/floating-robot";

export function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const homeHref = isEnglish ? "/en" : "/";
  const createHref = isEnglish ? "/crear?lang=en" : "/crear";
  const guideHref = isEnglish ? "/en/ai-resume-builder" : "/blog";
  const legalHref = {
    terms: isEnglish ? "/en/terms" : "/terms",
    privacy: isEnglish ? "/en/privacy" : "/privacy",
    refund: isEnglish ? "/en/refund" : "/refund",
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#111113] px-4 py-14 md:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-0 top-8 h-48 w-48 rounded-full bg-[#8B5CF6]/6 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-8 right-0 h-32 w-32 rounded-full bg-[#38BDF8]/5 blur-[100px]" />

      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[280px]">
            <Link href={homeHref} className="group mb-4 flex items-center gap-3">
              <Image
                src="/logoreal.webp"
                alt="VitaeSpark"
                width={40}
                height={40}
                className="rounded-xl transition-transform group-hover:scale-105"
              />
              <span className="text-lg font-semibold text-white">VitaeSpark</span>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-white/50">
              {isEnglish
                ? "Build ATS-friendly resumes with AI and unlock a clean PDF ready to send."
                : "Crea curriculum profesionales optimizados para ATS con inteligencia artificial."}
            </p>
            <a
              href="https://www.instagram.com/vitae.spark/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#8B5CF6]"
            >
              <Instagram className="h-4 w-4" />
              @vitae.spark
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                {isEnglish ? "Product" : "Producto"}
              </h3>
              <ul className="space-y-2.5">
                <FooterLink href={createHref}>
                  {isEnglish ? "Create resume" : "Crear CV"}
                </FooterLink>
                <FooterLink href="/perfil">
                  {isEnglish ? "My profile" : "Mi perfil"}
                </FooterLink>
                <FooterLink href={guideHref}>
                  {isEnglish ? "Guide" : "Blog"}
                </FooterLink>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                {isEnglish ? "Resources" : "Recursos"}
              </h3>
              <ul className="space-y-2.5">
                {isEnglish ? (
                  <>
                    <FooterLink href="/en">AI resume builder</FooterLink>
                    <FooterLink href="/en/ai-resume-builder">
                      ATS-friendly resume guide
                    </FooterLink>
                    <FooterLink href="/crear?lang=en">Start your resume</FooterLink>
                  </>
                ) : (
                  <>
                    <FooterLink href="/crear-cv-online">Crear CV online</FooterLink>
                    <FooterLink href="/curriculum-ats">Curriculum ATS</FooterLink>
                    <FooterLink href="/curriculum-sin-experiencia">
                      CV sin experiencia
                    </FooterLink>
                    <FooterLink href="/plantilla-harvard">Plantilla Harvard</FooterLink>
                    <FooterLink href="/generador-de-cv-con-ia">
                      Generador con IA
                    </FooterLink>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <FooterLink href={legalHref.terms}>
                  {isEnglish ? "Terms" : "Terminos"}
                </FooterLink>
                <FooterLink href={legalHref.privacy}>
                  {isEnglish ? "Privacy" : "Privacidad"}
                </FooterLink>
                <FooterLink href={legalHref.refund}>
                  {isEnglish ? "Refunds" : "Reembolsos"}
                </FooterLink>
              </ul>

              <div className="mt-5">
                <a
                  href="mailto:soporte@vitaespark.com"
                  className="text-xs text-white/60 transition-colors hover:text-white/80"
                >
                  soporte@vitaespark.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/5 py-6">
          <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/40 shadow-[0_0_12px_2px_rgba(139,92,246,0.3)]" />
          <FloatingRobot size="sm" className="-top-10 right-4 opacity-20" />
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} VitaeSpark
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/50">
              <Sparkles className="h-3 w-3" />
              <span>
                {isEnglish
                  ? "Built with AI for your career"
                  : "Hecho con IA para tu carrera"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-white/50 transition-colors hover:text-[#8B5CF6]"
      >
        {children}
      </Link>
    </li>
  );
}
