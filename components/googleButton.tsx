"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type GoogleCredentialResponse = {
  credential?: string;
};

type GoogleAccountsId = {
  initialize: (options: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    nonce?: string;
    use_fedcm_for_prompt?: boolean;
  }) => void;
  renderButton: (
    parent: HTMLElement,
    options: {
      type?: "standard" | "icon";
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      shape?: "rectangular" | "pill" | "circle" | "square";
      text?: "signin_with" | "signup_with" | "continue_with" | "signin";
      logo_alignment?: "left" | "center";
      width?: number;
    },
  ) => void;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

async function generateNoncePair() {
  const nonce = btoa(
    String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))),
  );
  const encodedNonce = new TextEncoder().encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashedNonce = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return { nonce, hashedNonce };
}

export function OAuthButtons() {
  const router = useRouter();
  const buttonRef = useRef<HTMLDivElement>(null);
  const nonceRef = useRef<string | null>(null);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const renderGoogleButton = async () => {
      if (!googleClientId || !isScriptReady || !window.google || !buttonRef.current) {
        return;
      }

      setErrorMessage(null);
      buttonRef.current.innerHTML = "";

      const { nonce, hashedNonce } = await generateNoncePair();
      if (!isMounted) return;

      nonceRef.current = nonce;

      window.google.accounts.id.initialize({
        client_id: googleClientId,
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
        callback: async (response) => {
          if (!response.credential) {
            setErrorMessage("Google no devolvio credenciales. Proba de nuevo.");
            return;
          }

          setIsLoading(true);
          setErrorMessage(null);

          const supabase = createClient();
          const { error } = await supabase.auth.signInWithIdToken({
            provider: "google",
            token: response.credential,
            nonce: nonceRef.current ?? undefined,
          });

          if (error) {
            console.error("Google sign in error:", error.message);
            setErrorMessage("No se pudo iniciar sesion con Google.");
            setIsLoading(false);
            return;
          }

          router.replace("/crear");
          router.refresh();
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "continue_with",
        logo_alignment: "left",
        width: Math.min(420, Math.max(280, buttonRef.current.offsetWidth)),
      });
    };

    void renderGoogleButton();

    return () => {
      isMounted = false;
    };
  }, [isScriptReady, router]);

  if (!googleClientId) {
    return (
      <div className="rounded-2xl border border-amber-400/18 bg-amber-400/8 p-3 text-sm leading-6 text-amber-100">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-1 h-4 w-4 shrink-0" />
          <span>Falta configurar NEXT_PUBLIC_GOOGLE_CLIENT_ID.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
        onReady={() => setIsScriptReady(true)}
      />
      <div className="relative min-h-12 overflow-hidden rounded-2xl border border-white/10 bg-[#101014] p-[1px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div
          ref={buttonRef}
          className="relative z-10 flex min-h-[46px] items-center justify-center [&>div]:!mx-auto [&>div]:!w-full [&_iframe]:!mx-auto [&_iframe]:!w-full [&_iframe]:!rounded-[15px]"
        />
        {!isScriptReady ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/[0.035] text-sm font-medium text-white/58">
            Cargando Google...
          </div>
        ) : null}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/10 bg-[#17171D]/90 text-sm font-medium text-white">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesion...
          </div>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="text-center text-xs leading-5 text-red-300">{errorMessage}</p>
      ) : null}
    </div>
  );
}
