"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FileText, HomeIcon, Menu, Paperclip, User2, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isEnglish = pathname === "/en" || pathname.startsWith("/en/");
  const homeHref = isEnglish ? "/en" : "/";
  const createHref = isEnglish ? "/crear?lang=en" : "/crear";
  const guideHref = isEnglish ? "/en/ai-resume-builder" : "/blog";
  const labels = {
    create: isEnglish ? "Create resume" : "Crear CV",
    home: isEnglish ? "Home" : "Inicio",
    guide: isEnglish ? "Guide" : "Blog",
    profile: isEnglish ? "Profile" : "Perfil",
    openMenu: isEnglish ? "Open menu" : "Abrir menu",
    closeMenu: isEnglish ? "Close menu" : "Cerrar menu",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#27272A]/50 bg-[#111113]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-0">
        <Link
          href={homeHref}
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

        <nav aria-label="Navegacion principal" className="hidden items-center gap-3 md:flex">
          <CustomLinkButton href={createHref} variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            {labels.create}
          </CustomLinkButton>
          <CustomLinkButton href={homeHref} variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            {labels.home}
          </CustomLinkButton>
          <CustomLinkButton href={guideHref} variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
            {labels.guide}
          </CustomLinkButton>
          <div className="ml-1 flex rounded-lg border border-white/10 bg-white/[0.03] p-1 text-xs font-semibold">
            <Link
              href="/"
              className={`rounded-md px-2 py-1 transition ${!isEnglish ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                }`}
            >
              ES
            </Link>
            <Link
              href="/en"
              className={`rounded-md px-2 py-1 transition ${isEnglish ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
                }`}
            >
              EN
            </Link>
          </div>
          <AuthControls />
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <CustomLinkButton href={createHref} variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            <span className="hidden xs:inline">{labels.create}</span>
          </CustomLinkButton>
          <CustomLinkButton href={homeHref} variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            <span className="hidden xs:inline">{labels.home}</span>
          </CustomLinkButton>
          <CustomLinkButton href={guideHref} variant="ghost" size="sm">
            <FileText className="h-4 w-4" />
            <span className="hidden xs:inline">{labels.guide}</span>
          </CustomLinkButton>
          <CustomLinkButton href={isEnglish ? "/" : "/en"} variant="ghost" size="sm">
            {isEnglish ? "ES" : "EN"}
          </CustomLinkButton>
          <CustomButton
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
            className="p-2"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </CustomButton>
        </div>
      </div>

      {menuOpen && (
        <div className="space-y-3 border-t border-[#27272A]/50 bg-[#0F0F10] px-4 py-4 md:hidden">
          <AuthControls mobile onNavigate={() => setMenuOpen(false)} />
          <CustomLinkButton href="/perfil" variant="ghost" size="sm">
            <User2 className="h-4 w-4" />
            <span className="hidden xs:inline">{labels.profile}</span>
          </CustomLinkButton>

        </div>
      )}
    </header>
  );
}
