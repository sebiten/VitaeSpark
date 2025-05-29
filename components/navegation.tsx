"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
  FileText,
  HomeIcon,
  User2,
  MenuIcon,
  LogIn,
  Paperclip,
  PersonStanding,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { User } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/login/actions";

// Custom Button Component - Sober and Modern
interface CustomButtonProps {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "accent"
    | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

function CustomButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: CustomButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F10] disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#7C3AED] text-[#F4F4F5] hover:bg-[#7C3AED]/90 focus:ring-[#7C3AED]/20 shadow-sm",
    secondary:
      "bg-[#38BDF8] text-[#0F0F10] hover:bg-[#38BDF8]/90 focus:ring-[#38BDF8]/20 shadow-sm",
    ghost:
      "text-[#F4F4F5]/70 hover:text-[#F4F4F5] hover:bg-[#1F1F22]/50 focus:ring-[#A78BFA]/20",
    link: "text-[#F4F4F5]/70 hover:text-[#A78BFA] underline-offset-4 hover:underline focus:ring-[#A78BFA]/20",
    accent:
      "bg-[#A78BFA] text-[#0F0F10] hover:bg-[#A78BFA]/90 focus:ring-[#A78BFA]/20 shadow-sm",
    destructive:
      "bg-[#EF4444] text-[#F4F4F5] hover:bg-[#EF4444]/90 focus:ring-[#EF4444]/20 shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}

// Custom Link Button Component
interface CustomLinkButtonProps {
  href: string;
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "link"
    | "accent"
    | "destructive";
  size?: "sm" | "md" | "lg";
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
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0F0F10] no-underline";

  const variants = {
    primary:
      "bg-[#7C3AED] text-[#F4F4F5] hover:bg-[#7C3AED]/90 focus:ring-[#7C3AED]/20 shadow-sm",
    secondary:
      "bg-[#38BDF8] text-[#0F0F10] hover:bg-[#38BDF8]/90 focus:ring-[#38BDF8]/20 shadow-sm",
    ghost:
      "text-[#F4F4F5]/70 hover:text-[#F4F4F5] hover:bg-[#1F1F22]/50 focus:ring-[#A78BFA]/20",
    link: "text-[#F4F4F5]/70 hover:text-[#A78BFA] underline-offset-4 hover:underline focus:ring-[#A78BFA]/20",
    accent:
      "bg-[#A78BFA] text-[#0F0F10] hover:bg-[#A78BFA]/90 focus:ring-[#A78BFA]/20 shadow-sm",
    destructive:
      "bg-[#EF4444] text-[#F4F4F5] hover:bg-[#EF4444]/90 focus:ring-[#EF4444]/20 shadow-sm",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-lg",
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

export function Navegation({ user }: { user: User | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F22]/50 bg-[#0F0F10]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logoreal.webp"
              alt="Logo Vitae Spark"
              width={95}
              height={95}
              className="rounded-lg object-cover"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <CustomLinkButton href="/crear" variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            Crear CV
          </CustomLinkButton>

          <CustomLinkButton href="/" variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            Inicio
          </CustomLinkButton>

          {user && (
            <CustomLinkButton href="/perfil" variant="ghost" size="sm">
              <User2 className="h-4 w-4" />
              Perfil
            </CustomLinkButton>
          )}

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-[#1F1F22]/50">
                <Avatar className="h-7 w-7 border border-[#1F1F22]">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url}
                    alt={user.user_metadata?.full_name || "User"}
                  />
                  <AvatarFallback className="bg-[#1F1F22] text-[#F4F4F5] text-xs">
                    {user.user_metadata?.full_name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-[#F4F4F5]/70 hidden lg:block">
                  {user.user_metadata?.full_name ?? "Usuario"}
                </span>
                <MenuIcon className="text-[#F4F4F5]/50 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#0F0F10] border-[#1F1F22] text-[#F4F4F5]">
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <form action={logout} className="w-full">
                    <button
                      type="submit"
                      className="w-full flex items-center gap-2 text-left"
                    >
                      <LogOut className="h-4 w-4" /> Cerrar sesión
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <CustomLinkButton href="/login" variant="secondary" size="sm">
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </CustomLinkButton>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <CustomLinkButton href="/crear" variant="primary" size="sm">
            <Paperclip className="h-4 w-4" />
            <span className="hidden xs:inline">Crear CV</span>
          </CustomLinkButton>

          <CustomLinkButton href="/" variant="ghost" size="sm">
            <HomeIcon className="h-4 w-4" />
            <span className="hidden xs:inline">Inicio</span>
          </CustomLinkButton>
          <CustomLinkButton href="/perfil" variant="ghost" size="sm">
            <User2 className="h-4 w-4" />
            <span className="hidden xs:inline">Perfil</span>
          </CustomLinkButton>

          <CustomButton
            variant="ghost"
            size="sm"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </CustomButton>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F0F10] border-t border-[#1F1F22]/50 px-4 py-4 space-y-3">
          {user ? (
            <>
              <CustomLinkButton
                href="/perfil"
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                <User2 className="h-4 w-4" />
                Perfil
              </CustomLinkButton>

              <form action={logout} className="w-full">
                <CustomButton
                  type="submit"
                  variant="destructive"
                  size="md"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </CustomButton>
              </form>
            </>
          ) : (
            <CustomLinkButton
              href="/login"
              variant="accent"
              size="md"
              className="w-full"
              onClick={() => setMenuOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Iniciar sesión
            </CustomLinkButton>
          )}
        </div>
      )}
    </header>
  );
}
