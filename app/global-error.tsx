"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="m-0 bg-[#0F0F12] text-[#F4F4F5]">
        <main className="flex min-h-screen items-center justify-center px-4">
          <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#15151A] p-7 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A78BFA]">
              VitaeSpark
            </p>
            <h1 className="mt-3 text-2xl font-semibold">
              Ocurrió un error inesperado
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/64">
              Reintentá la carga. Si estabas creando un CV, el borrador permanece
              guardado en este dispositivo.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 h-11 w-full rounded-xl bg-[#F6F2EA] px-4 text-sm font-semibold text-[#121114]"
            >
              Reintentar
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
