"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, Sparkles } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1F22] bg-[#0F0F10]/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-[#7C3AED] p-1.5 rounded-md">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">VitaeSpark</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#"
            className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
          >
            Características
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
          >
            Plantillas
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
          >
            Precios
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
          >
            Blog
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#1F1F22] bg-[#0F0F10] p-4">
          <nav className="flex flex-col gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
            >
              Características
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
            >
              Plantillas
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
            >
              Precios
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#F4F4F5]/70 hover:text-[#F4F4F5]"
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
