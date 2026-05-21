"use client";

import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export function OAuthButtons() {
  const handleOAuth = async (provider: "google" | "github") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/crear`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        size="lg"
        onClick={() => handleOAuth("google")}
        className="h-12 w-full justify-center gap-3 rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.03)_100%)] px-4 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.08]"
      >
        <img src="/google.png" alt="Google" className="h-5 w-5" />
        <span>Continuar con Google</span>
      </Button>
    </div>
  );
}
