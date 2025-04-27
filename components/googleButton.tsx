"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const supabase = createClient();

export function OAuthButtons() {
  const router = useRouter();

  const handleOAuth = async (provider: "google" | "github") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/crear`,
        // si necesitas tokens de Google:
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      console.error("OAuth error:", error.message);
    } else if (data.url) {
      // redirige al endpoint de Supabase para iniciar el flujo PKCE
      window.location.href = data.url;
    }
  };

  return (
    <div className="space-x-4">
      <Button
        variant="default"
        size="lg"
        onClick={() => handleOAuth("google")}
        className="
          w-full
          flex items-center justify-center gap-2
          border-gray-600 text-gray-200
          bg-[#1F1F22] hover:bg-[#2A2A2D] hover:text-gray-100
          transition
          my-2
        "
      >
        <img src="/google.png" alt="Google" className="w-5 h-5" />
        <span className="font-medium">Continuar con Google</span>
      </Button>
    </div>
  );
}
