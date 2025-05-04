"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  ArrowRight,
  Menu,
  X,
  LogOut,
  FileText,
  HomeIcon,
  User2,
  MenuIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/login/actions";

export function Navegation({ user }: { user: User | null }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F22]/50 bg-[#0F0F10] backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition"
          >
            <Image
              src="/logoreal.webp"
              alt="Logo Vitae Spark"
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/crear"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-105 transition"
          >
            Crear CV
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-105 transition"
          >
            Inicio <HomeIcon className="ml-2 h-4 w-4" />
          </Link>

          <Link
            href="/perfil"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-105 transition"
          >
            Perfil <HomeIcon className="ml-2 h-4 w-4" />
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer hover:scale-105 transition">
                <Avatar className="h-8 w-8 border border-[#2A2A2D]">
                  <AvatarImage
                    src={user.user_metadata?.avatar_url || "/avatar.png"}
                    alt={user.user_metadata?.full_name || "User"}
                  />
                  <AvatarFallback className="bg-[#7C3AED]/30 text-white">
                    {user.user_metadata?.full_name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-[#F4F4F5]">
                  {user.user_metadata?.full_name ?? "Usuario"}
                </span>
                <MenuIcon className="text-white"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1F1F22] border-[#2A2A2D] text-white">
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
            <Link
              href="/login"
              className="text-sm font-medium text-white hover:text-[#7C3AED] transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0F0F10] border-t border-[#1F1F22]/50 px-4 py-6 space-y-6">
          <Link
            href="/crear"
            className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-105 transition"
            onClick={() => setMenuOpen(false)}
          >
            Crear mi CV ahora
          </Link>

          <Link
            href="/"
            className="block text-base font-medium text-white hover:text-[#7C3AED] transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>

          {user ? (
            <>
              <Link
                href="/perfil"
                className="block text-base font-medium text-white hover:text-[#7C3AED] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Perfil
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className="w-full text-left text-base font-medium text-white hover:text-[#7C3AED] transition-colors"
                >
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-sm font-medium text-white hover:text-[#7C3AED] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
