"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { FileText, LogIn, LogOut, MenuIcon, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";

type AuthControlsProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

type CachedDisplay = {
  name: string;
  avatarUrl?: string;
};

const AUTH_DISPLAY_CACHE_KEY = "vitaespark-auth-display";

function getUserDisplay(user: User): CachedDisplay {
  const metadata = user.user_metadata || {};
  const name =
    metadata.full_name ||
    metadata.name ||
    user.email?.split("@")[0] ||
    "Usuario";

  return {
    name,
    avatarUrl: metadata.avatar_url || metadata.picture,
  };
}

function readCachedDisplay(): CachedDisplay | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(AUTH_DISPLAY_CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachedDisplay) : null;
  } catch {
    return null;
  }
}

function writeCachedDisplay(display: CachedDisplay | null) {
  if (typeof window === "undefined") return;

  if (!display) {
    window.localStorage.removeItem(AUTH_DISPLAY_CACHE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_DISPLAY_CACHE_KEY, JSON.stringify(display));
}

function useAuthUser() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [cachedDisplay, setCachedDisplay] = useState<CachedDisplay | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const cached = readCachedDisplay();

    if (cached) {
      setCachedDisplay(cached);
    }

    supabase.auth.getSession().then(({ data }) => {
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        const display = getUserDisplay(sessionUser);
        setCachedDisplay(display);
        writeCachedDisplay(display);
      } else {
        setCachedDisplay(null);
        writeCachedDisplay(null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);

      if (sessionUser) {
        const display = getUserDisplay(sessionUser);
        setCachedDisplay(display);
        writeCachedDisplay(display);
      } else {
        setCachedDisplay(null);
        writeCachedDisplay(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, cachedDisplay, setUser, setCachedDisplay };
}

export function AuthControls({ mobile = false, onNavigate }: AuthControlsProps) {
  const router = useRouter();
  const { user, cachedDisplay, setUser, setCachedDisplay } = useAuthUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const display = user ? getUserDisplay(user) : cachedDisplay;

  const handleLogout = async () => {
    const previousUser = user;
    const previousDisplay = display;

    setIsLoggingOut(true);
    setUser(null);
    setCachedDisplay(null);
    writeCachedDisplay(null);
    onNavigate?.();

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      setUser(previousUser ?? null);
      setCachedDisplay(previousDisplay ?? null);
      writeCachedDisplay(previousDisplay ?? null);
      setIsLoggingOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  if (user === undefined) {
    return display ? (
      <UserButton display={display} isPending />
    ) : (
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
          Mi perfil
        </Link>
        <div className="w-full">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#EF4444] px-4 py-2 text-sm font-medium text-[#F4F4F5] hover:bg-[#EF4444]/90 disabled:cursor-wait disabled:opacity-70"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </>
    ) : (
      <Link
        href="/login"
        onClick={onNavigate}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9] transition-colors shadow-lg shadow-[#7C3AED]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111113]"
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
        Mi perfil
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-opacity hover:bg-[#1F1F22]/50 hover:opacity-80">
          <UserAvatar display={display || getUserDisplay(user)} />
          <span className="hidden max-w-28 truncate text-sm text-[#F4F4F5]/70 lg:block">
            {(display || getUserDisplay(user)).name}
          </span>
          <MenuIcon className="h-4 w-4 text-[#F4F4F5]/50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-white/10 bg-[#1C1C22] text-[#F4F4F5] shadow-xl shadow-black/20 rounded-xl">
          <DropdownMenuItem asChild>
            <Link href="/perfil" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Mi perfil
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-2 text-left disabled:cursor-wait disabled:opacity-70"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ) : (
    <Link
      href="/login"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D28D9] transition-colors shadow-lg shadow-[#7C3AED]/20"
    >
      <LogIn className="h-4 w-4" />
      Iniciar sesión
    </Link>
  );
}

function UserButton({
  display,
  isPending = false,
}: {
  display: CachedDisplay;
  isPending?: boolean;
}) {
  return (
    <Link
      href="/perfil"
      className={`inline-flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-medium text-[#F4F4F5]/70 transition hover:bg-[#1F1F22]/50 hover:text-[#F4F4F5] ${
        isPending ? "opacity-80" : ""
      }`}
    >
      <UserAvatar display={display} />
      <span className="hidden max-w-28 truncate lg:block">{display.name}</span>
      <MenuIcon className="h-4 w-4 text-[#F4F4F5]/50" />
    </Link>
  );
}

function UserAvatar({ display }: { display: CachedDisplay }) {
  return (
    <Avatar className="h-7 w-7 border border-[#1F1F22]">
      <AvatarImage src={display.avatarUrl} alt={display.name} />
      <AvatarFallback className="bg-[#1F1F22] text-xs text-[#F4F4F5]">
        {display.name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
