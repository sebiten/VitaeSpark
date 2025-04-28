"use client";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import { logout } from "@/app/(auth)/login/actions";
import { useState } from "react";
import { User } from "@supabase/supabase-js";

export function Navegation({
  user,
}: {
  user: User | null; // Uncomment this line if you have a User type defined
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F22]/50 bg-[#0F0F10] backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* Logo */}
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/crear"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 hover:scale-105 transition"
          >
            Crear mi CV ahora
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Link>

          <Link
            href="/"
            className="text-base font-medium text-white hover:text-[#7C3AED] transition-colors"
          >
            Inicio
          </Link>

          {user ? (
            <div className="flex items-center gap-3 ml-6">
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

              <form action={logout}>
                <Button variant="ghost" size="sm" className="text-white">
                  Cerrar sesión
                </Button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-white hover:text-[#7C3AED] transition-colors"
            >
              Iniciar sesión
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F0F10] border-t border-[#1F1F22]/50 px-4 py-6 space-y-4">
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
            <div className="flex items-center gap-3 mt-4">
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

              <form action={logout}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Cerrar sesión
                </Button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="block text-sm font-medium text-white hover:text-[#7C3AED] transition-colors mt-4"
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
