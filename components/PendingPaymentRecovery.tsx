"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { CreditCard, Eye, Loader2, LockKeyhole, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PRICING } from "@/lib/pricing";
import type { RespuestaCV } from "@/lib/types/cv";
import { createClient } from "@/utils/supabase/client";

const PDFViewerPane = dynamic(() => import("@/components/pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[520px] items-center justify-center rounded-2xl bg-white text-sm text-slate-500">
      Preparando vista previa...
    </div>
  ),
});

type PendingPaymentRecoveryVariant = "global" | "profile";

type PendingCVRecord = {
  id: string;
  cv_data?: RespuestaCV["cv"] | null;
  template?: string | null;
  created_at?: string | null;
  status?: string | null;
};

type PendingPaymentRecoveryProps = {
  variant?: PendingPaymentRecoveryVariant;
};

const hiddenGlobalPathPrefixes = [
  "/crear",
  "/perfil",
  "/login",
  "/forgot-password",
  "/update-password",
  "/editar-cv",
  "/abelardo",
  "/auth",
];

function isHiddenGlobalPath(pathname: string) {
  return hiddenGlobalPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function getSourceType(pathname: string) {
  return pathname.startsWith("/blog") ? "blog" : "landing";
}

function getCtaLabel(variant: PendingPaymentRecoveryVariant) {
  return variant === "profile"
    ? "pending_payment_profile_banner"
    : "pending_payment_global_banner";
}

export function PendingPaymentRecovery({
  variant = "global",
}: PendingPaymentRecoveryProps) {
  const pathname = usePathname() || "/";
  const shouldHideGlobal = variant === "global" && isHiddenGlobalPath(pathname);
  const [pendingCv, setPendingCv] = useState<PendingCVRecord | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchPendingCv() {
      if (shouldHideGlobal) {
        setPendingCv(null);
        return;
      }

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      const userId = session?.user.id;

      if (!userId) {
        setPendingCv(null);
        return;
      }

      const { data, error } = await supabase
        .from("cvs")
        .select("id, cv_data, template, created_at, status")
        .eq("profile_id", userId)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1);

      if (!isMounted) return;

      if (error) {
        console.error("Error cargando CV pendiente:", error);
        setPendingCv(null);
        return;
      }

      setPendingCv((data?.[0] as PendingCVRecord | undefined) ?? null);
    }

    void fetchPendingCv();

    return () => {
      isMounted = false;
    };
  }, [shouldHideGlobal, pathname]);

  const attribution = useMemo(
    () => ({
      landing_path: pathname,
      cta_label: getCtaLabel(variant),
      source_type: getSourceType(pathname),
    }),
    [pathname, variant]
  );

  const handleCompletePayment = useCallback(async () => {
    if (!pendingCv) return;

    setIsLoadingPayment(true);

    try {
      const res = await fetch("/api/create-payment-for-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvId: pendingCv.id, attribution }),
      });

      const data = await res.json();

      if (!res.ok || !data.init_point) {
        toast.error(data.error || "No se pudo iniciar el pago.");
        return;
      }

      window.location.href = data.init_point;
    } catch (error) {
      console.error("Error retomando pago:", error);
      toast.error("No se pudo iniciar el pago. Intenta nuevamente.");
    } finally {
      setIsLoadingPayment(false);
    }
  }, [attribution, pendingCv]);

  if (!pendingCv) return null;

  const previewTemplate =
    pendingCv.template === "ats-compact"
      ? "elegance"
      : pendingCv.template || "elegance";
  const previewDialog = (
    <PendingCvPreviewDialog
      open={isPreviewOpen}
      onOpenChange={setIsPreviewOpen}
      cv={pendingCv}
      template={previewTemplate}
    />
  );

  if (variant === "profile") {
    return (
      <div className="relative mx-auto max-w-5xl">
        <Card className="overflow-hidden rounded-3xl border border-[#7C3AED]/25 bg-[#17141F]/95 text-white shadow-2xl shadow-black/20">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#7C3AED]/20 blur-3xl" />
          <CardContent className="relative grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/18 text-[#C4B5FD] ring-1 ring-[#C4B5FD]/20">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#C4B5FD]">
                  CV pendiente de pago
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#F4F4F5]">
                  Tu CV ya esta generado. Falta desbloquear el PDF final.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#D4D4D8]">
                  Completalo por {PRICING.mercadoPago.label} y descargalo sin
                  marca de agua desde tu perfil. {PRICING.copy.singlePayment},{" "}
                  {PRICING.copy.noSubscription.toLowerCase()}.
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:min-w-[330px] sm:grid-cols-2">
              <Button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                variant="outline"
                className="h-12 rounded-2xl border-white/12 bg-white/[0.04] px-5 text-sm font-bold text-white hover:bg-white/[0.08] hover:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver CV creado
              </Button>

              <Button
                onClick={handleCompletePayment}
                disabled={isLoadingPayment}
                className="h-12 rounded-2xl bg-[#00B0FF] px-5 text-sm font-bold text-white hover:bg-[#0098E6]"
              >
                {isLoadingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Iniciando pago
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Completar pago
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {previewDialog}
      </div>
    );
  }

  return (
    <div className="border-b border-[#7C3AED]/20 bg-[#17141F] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-0">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C3AED]/18 text-[#C4B5FD] ring-1 ring-[#C4B5FD]/20 sm:mt-0">
            <LockKeyhole className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F4F4F5]">
              Tenes un CV pendiente de pago.
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[#D4D4D8] sm:text-sm">
              Desbloquea el PDF final por {PRICING.mercadoPago.shortLabel}, sin
              recrearlo desde cero.
            </p>
          </div>
        </div>

        <div className="grid shrink-0 grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            variant="outline"
            className="h-10 rounded-xl border-white/12 bg-white/[0.04] px-4 text-sm font-bold text-white hover:bg-white/[0.08] hover:text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver CV
          </Button>

          <Button
            onClick={handleCompletePayment}
            disabled={isLoadingPayment}
            className="h-10 rounded-xl bg-[#00B0FF] px-4 text-sm font-bold text-white hover:bg-[#0098E6]"
          >
            {isLoadingPayment ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Completar pago
              </>
            )}
          </Button>
        </div>
      </div>
      {previewDialog}
    </div>
  );
}

function PendingCvPreviewDialog({
  open,
  onOpenChange,
  cv,
  template,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cv: PendingCVRecord;
  template: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden border-white/10 bg-[#111113] p-0 text-white sm:rounded-3xl [&>button]:hidden">
        <DialogTitle className="sr-only">Vista previa del CV pendiente</DialogTitle>
        <DialogDescription className="sr-only">
          Vista protegida del CV generado con marca de agua antes de completar el
          pago.
        </DialogDescription>

        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-[#15151A] px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#F4F4F5]">
              CV creado con marca de agua
            </p>
            <p className="mt-0.5 text-xs leading-5 text-white/58">
              Completa el pago para descargar el PDF final sin marca de agua.
            </p>
          </div>
          <DialogClose asChild>
            <button className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/72 transition hover:bg-white/[0.08] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </div>

        <div className="h-[calc(92vh-74px)] overflow-auto bg-[#2A2A2D] p-3 sm:p-5">
          <div className="mx-auto h-[82vh] min-h-[620px] max-w-[720px] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/40">
            {cv.cv_data ? (
              <PDFViewerPane
                cv={cv.cv_data}
                template={template}
                watermark
                className="h-full w-full border-0"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-500">
                No se pudo preparar la vista previa.
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
