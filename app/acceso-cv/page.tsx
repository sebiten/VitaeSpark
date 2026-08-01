import type { Metadata } from "next";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { getPurchaseClaim } from "@/lib/purchase-access";

const ClaimSchema = z.string().uuid();

export const metadata: Metadata = {
  title: "Guardar CV comprado",
  robots: { index: false, follow: false },
};

export default async function PurchaseAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ claim?: string; error?: string }>;
}) {
  const params = await searchParams;
  const parsedClaim = ClaimSchema.safeParse(params.claim);
  const claim = parsedClaim.success
    ? await getPurchaseClaim(parsedClaim.data).catch(() => null)
    : null;
  const isExpired = claim ? new Date(claim.expires_at).getTime() <= Date.now() : false;
  const canContinue = claim?.status === "pending" && !isExpired;

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#101013] px-4 py-14 text-white sm:px-6">
      <div className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-[#15151A] shadow-2xl shadow-black/35">
        <div className="border-b border-white/8 px-6 py-7 sm:px-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A78BFA]/25 bg-[#A78BFA]/10 text-[#C4B5FD]">
            <FileText className="h-5 w-5" />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A78BFA]">
            Acceso VitaeSpark
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
            Guardá tu CV en una cuenta permanente
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60">
            La compra ya está identificada. Confirmá el email para editar y
            descargar tu CV desde cualquier dispositivo.
          </p>
        </div>

        <div className="space-y-5 px-6 py-6 sm:px-8">
          {canContinue ? (
            <>
              <div className="space-y-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <AccessPoint text="La compra y el CV se conservan" />
                <AccessPoint text="No se crea ninguna suscripción" />
                <AccessPoint text={`Acceso para ${maskEmail(claim.contact_email)}`} />
              </div>
              <form action="/api/purchase-access/confirm" method="post">
                <input type="hidden" name="claim" value={claim.id} />
                <button
                  type="submit"
                  className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] px-5 text-sm font-bold text-[#121114] transition hover:bg-white"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Confirmar y guardar mi CV
                </button>
              </form>
              <p className="text-center text-[11px] leading-5 text-white/40">
                La confirmación es segura y solo vincula el CV comprado.
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.07] p-5">
              <p className="font-semibold text-amber-100">
                {claim?.status === "claimed"
                  ? "Este CV ya fue guardado en una cuenta."
                  : "Este enlace no está disponible o venció."}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Iniciá sesión con el mismo email de compra o escribinos a
                soporte@vitaespark.com.
              </p>
            </div>
          )}

          {params.error ? (
            <p className="text-center text-xs text-rose-300">
              No pudimos confirmar el acceso. Intentá nuevamente.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function AccessPoint({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-white/70">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
      <span>{text}</span>
    </div>
  );
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return `${local.slice(0, 2)}${"•".repeat(Math.max(2, local.length - 2))}@${domain}`;
}
