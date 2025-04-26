"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para cambiar estilos del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[#1F1F22] bg-[#0F0F10]/95 backdrop-blur-md shadow-md"
          : "border-[#1F1F22]/50 bg-[#0F0F10]/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0F0F10] rounded-md"
          >
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] p-1.5 rounded-md shadow-lg shadow-[#7C3AED]/20">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              VitaeSpark
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/crear"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-2 text-sm font-medium text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-[#0F0F10]"
          >
            Crear mi CV ahora{" "}
            <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden relative z-50 text-white hover:bg-[#1F1F22] focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#0F0F10]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu con animación */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-16 bg-[#0F0F10] border-t border-[#1F1F22] shadow-lg transition-all duration-300 ease-in-out transform",
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
          <Link
            href="/crear"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-4 py-3 text-base font-medium text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200"
          >
            Crear mi CV ahora{" "}
            <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
