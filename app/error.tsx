"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#0F0F12] px-4 py-12 text-[#F4F4F5]">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#15151A] p-6 text-center shadow-2xl shadow-black/20">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-200">
          <AlertTriangle className="size-5" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
          VitaeSpark
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
          No pudimos completar esta carga
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/64">
          Tus datos siguen guardados. Reintentá la operación o volvé a tu perfil.
        </p>
        <div className="mt-6 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] px-4 text-sm font-semibold text-[#121114] transition hover:bg-white"
          >
            <RefreshCw className="size-4" />
            Reintentar
          </button>
          <a
            href="/perfil"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
          >
            Ir a mi perfil
          </a>
        </div>
      </section>
    </main>
  );
}
