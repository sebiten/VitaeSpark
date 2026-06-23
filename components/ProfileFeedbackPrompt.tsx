"use client";

import { useState } from "react";
import { Loader2, MessageSquareQuote, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProfileFeedbackPromptProps = {
  cvId: string;
};

export function ProfileFeedbackPrompt({ cvId }: ProfileFeedbackPromptProps) {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [canUseAnonymously, setCanUseAnonymously] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="rounded-[26px] border border-emerald-400/18 bg-emerald-400/10 p-4 text-white">
        <p className="text-sm font-semibold text-emerald-200">
          Gracias por el feedback.
        </p>
        <p className="mt-1 text-sm leading-6 text-white/64">
          Esto ayuda a mejorar VitaeSpark sin mostrar tus datos personales.
        </p>
      </section>
    );
  }

  const handleSubmit = async () => {
    if (message.trim().length < 8) {
      toast.error("Escribi una opinion corta para enviarla.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          message,
          can_use_anonymously: canUseAnonymously,
          cv_id: cvId,
          source: "profile_success",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "No se pudo enviar el feedback.");
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error enviando feedback:", error);
      toast.error("No se pudo enviar el feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-[26px] border border-white/8 bg-[#141419] p-4 text-white shadow-[0_18px_48px_rgba(4,4,10,0.18)]">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#D7C8FF]">
          <MessageSquareQuote className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            Te sirvio el CV generado?
          </p>
          <p className="mt-1 text-sm leading-6 text-white/58">
            Deja una opinion breve. Si aceptas, podemos usarla anonimamente como
            prueba social.
          </p>

          <div className="mt-4 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={cn(
                  "rounded-xl border p-2 transition",
                  value <= rating
                    ? "border-amber-300/30 bg-amber-300/12 text-amber-200"
                    : "border-white/10 bg-white/[0.03] text-white/32",
                )}
                aria-label={`${value} estrellas`}
              >
                <Star className="h-4 w-4 fill-current" />
              </button>
            ))}
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Ej: Me ayudo a ordenar mejor mi experiencia y descargar un CV mas prolijo."
            className="mt-4 min-h-24 w-full rounded-2xl border border-white/10 bg-[#0F0F12] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/32 focus:border-[#A78BFA]/40"
            maxLength={600}
          />

          <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-white/58">
            <input
              type="checkbox"
              checked={canUseAnonymously}
              onChange={(event) => setCanUseAnonymously(event.target.checked)}
              className="mt-1"
            />
            Pueden usar mi opinion anonimamente, sin mostrar nombre, email ni CV.
          </label>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 h-11 rounded-2xl bg-[#6F3CD2] px-5 text-sm font-semibold text-white hover:bg-[#7A47DD]"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Enviar opinion
          </Button>
        </div>
      </div>
    </section>
  );
}
