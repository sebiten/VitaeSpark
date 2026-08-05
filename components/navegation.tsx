"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, FileText, HomeIcon, Menu, Paperclip, X } from "lucide-react";
import { AuthControls } from "@/components/auth-controls";

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

function CustomButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  ...props
}: CustomButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111113]";
  const variants = {
    primary:
      "bg-[#7C3AED] text-[#F4F4F5] hover:bg-[#7C3AED]/90 focus:ring-[#7C3AED]/20 shadow-sm",
    ghost:
      "text-[#F4F4F5]/70 hover:text-[#F4F4F5] hover:bg-[#1F1F22]/50 focus:ring-[#A78BFA]/20",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface CustomLinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
}

function CustomLinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: CustomLinkButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111113] no-underline";
  const variants = {
    primary:
      "bg-[#7C3AED] text-[#F4F4F5] hover:bg-[#7C3AED]/90 focus:ring-[#7C3AED]/20 shadow-sm",
    ghost:
      "text-[#F4F4F5]/70 hover:text-[#F4F4F5] hover:bg-[#1F1F22]/50 focus:ring-[#A78BFA]/20",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Navegation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const campaignLanguage =
    pathname === "/cv-listo-argentina"
      ? "es"
      : pathname === "/resume-ready"
        ? "en"
        : null;

  if (campaignLanguage) {
    const isEnglish = campaignLanguage === "en";
    const createHref = isEnglish ? "/crear?lang=en" : "/crear";

    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#27272A]/50 bg-[#111113]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center transition-opacity hover:opacity-85">
            <Image
              src="/logoreal.webp"
              alt="VitaeSpark"
              width={112}
              height={112}
              sizes="112px"
              className="h-24 w-24 rounded-lg object-cover"
              priority
            />
          </Link>
          <Link
            href={createHref}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#F6F2EA] px-4 text-sm font-semibold text-[#111113] transition hover:-translate-y-0.5 hover:bg-white"
          >
            {isEnglish ? "Create resume" : "Crear mi CV"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#27272A]/50 bg-[#111113]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logoreal.webp"
            alt="Logo Vitae Spark"
            width={112}
            height={112}
            sizes="112px"
            className="h-24 w-24 rounded-lg object-cover"
          />
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-3 md:flex">
          <CustomLinkButton href="/crear" variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            Crear CV
          </CustomLinkButton>
          <CustomLinkButton href="/" variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            Inicio
          </CustomLinkButton>
          <CustomLinkButton href="/blog" variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
            Guía
          </CustomLinkButton>
          <AuthControls />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <CustomLinkButton href="/crear" variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            <span className="hidden xs:inline">Crear CV</span>
          </CustomLinkButton>
          <CustomLinkButton href="/" variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            <span className="hidden xs:inline">Inicio</span>
          </CustomLinkButton>
          <CustomLinkButton href="/blog" variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
            <span className="hidden xs:inline">Guía</span>
          </CustomLinkButton>
          <CustomButton
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="p-2"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </CustomButton>
        </div>
      </div>

      {menuOpen && (
        <div className="space-y-3 border-t border-[#27272A]/50 bg-[#0F0F10] px-4 py-4 md:hidden">
          <AuthControls mobile onNavigate={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}
