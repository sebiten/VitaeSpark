"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { FileText, LogIn, LogOut, MenuIcon, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/(auth)/login/actions";
import { createClient } from "@/utils/supabase/client";

type AuthControlsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function useAuthUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return user;
}

export function AuthControls({ mobile = false, onNavigate }: AuthControlsProps) {
  const user = useAuthUser();

  if (user === undefined) {
    return (
      <div
        className={
          mobile
            ? "h-10 w-full rounded-lg bg-[#1F1F22]/50"
            : "h-8 w-28 rounded-lg bg-[#1F1F22]/50"
        }
      />
    );
  }

  if (mobile) {
    return user ? (
      <>
        <Link
          href="/perfil"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-[#F4F4F5]/70 hover:bg-[#1F1F22]/50 hover:text-[#F4F4F5]"
        >
          <User2 className="h-4 w-4" />
          Perfil
        </Link>
        <form action={logout} className="w-full">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#EF4444] px-4 py-2 text-sm font-medium text-[#F4F4F5] hover:bg-[#EF4444]/90"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </form>
      </>
    ) : (
      <Link
        href="/login"
        onClick={onNavigate}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#A78BFA] px-4 py-2 text-sm font-medium text-[#0F0F10] hover:bg-[#A78BFA]/90"
      >
        <LogIn className="h-4 w-4" />
        Iniciar sesión
      </Link>
    );
  }

  return user ? (
    <>
      <Link
        href="/perfil"
        className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-[#F4F4F5]/70 hover:bg-[#1F1F22]/50 hover:text-[#F4F4F5]"
      >
        <User2 className="h-4 w-4" />
        Perfil
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-opacity hover:bg-[#1F1F22]/50 hover:opacity-80">
          <Avatar className="h-7 w-7 border border-[#1F1F22]">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={user.user_metadata?.full_name || "Usuario"}
            />
            <AvatarFallback className="bg-[#1F1F22] text-xs text-[#F4F4F5]">
              {user.user_metadata?.full_name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm text-[#F4F4F5]/70 lg:block">
            {user.user_metadata?.full_name ?? "Usuario"}
          </span>
          <MenuIcon className="h-4 w-4 text-[#F4F4F5]/50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-[#1F1F22] bg-[#0F0F10] text-[#F4F4F5]">
          <DropdownMenuItem asChild>
            <Link href="/perfil" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <form action={logout} className="w-full">
              <button type="submit" className="flex w-full items-center gap-2 text-left">
                <LogOut className="h-4 w-4" /> Cerrar sesión
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-[#38BDF8] px-3 py-1.5 text-sm font-medium text-[#0F0F10] shadow-sm hover:bg-[#38BDF8]/90"
    >
      <LogIn className="h-4 w-4" />
      Iniciar sesión
    </Link>
  );
}
