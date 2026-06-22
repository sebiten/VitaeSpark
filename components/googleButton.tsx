"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type GoogleCredentialResponse = {
  credential?: string;
};

type OAuthButtonsProps = {
  onAuthStart?: () => void;
  onAuthSuccess?: () => void;
  onAuthError?: () => void;
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

export function OAuthButtons({
  onAuthStart,
  onAuthSuccess,
  onAuthError,
}: OAuthButtonsProps = {}) {
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
            setErrorMessage("Google no devolvió credenciales. Probá de nuevo.");
            onAuthError?.();
            return;
          }

          onAuthStart?.();
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
            setErrorMessage("No se pudo iniciar sesión con Google.");
            setIsLoading(false);
            onAuthError?.();
            return;
          }

          onAuthSuccess?.();
          window.setTimeout(() => {
            window.location.replace("/crear");
          }, 350);
        },
      });

      const buttonWidth = Math.min(
        420,
        Math.max(240, buttonRef.current.offsetWidth - 10),
      );

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "rectangular",
        text: "continue_with",
        logo_alignment: "left",
        width: buttonWidth,
      });
    };

    void renderGoogleButton();

    return () => {
      isMounted = false;
    };
  }, [isScriptReady, onAuthError, onAuthStart, onAuthSuccess]);

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
      <div className="relative min-h-14 overflow-visible rounded-[20px] bg-[#F7F7F5] p-[5px] shadow-[0_12px_28px_rgba(0,0,0,0.18)] ring-1 ring-white/12">
        <div
          ref={buttonRef}
          className="relative z-10 flex min-h-[44px] items-center justify-center [&>div]:!mx-auto [&_iframe]:!mx-auto"
        />
        {!isScriptReady ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-[#F7F7F5] text-sm font-semibold text-[#27272A]/60">
            Cargando Google...
          </div>
        ) : null}
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-[18px] bg-[#F7F7F5]/95 text-sm font-semibold text-[#18181B]">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Iniciando sesión...
          </div>
        ) : null}
      </div>
      {errorMessage ? (
        <p className="text-center text-xs leading-5 text-red-300">{errorMessage}</p>
      ) : null}
    </div>
  );
}
