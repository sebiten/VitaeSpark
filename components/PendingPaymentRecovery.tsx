"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { CreditCard, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

type PendingPaymentRecoveryVariant = "global" | "profile";

type PendingCVRecord = {
  id: string;
  cv_data?: {
    nombre?: string;
    puesto?: string;
    language?: "es" | "en";
  } | null;
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

  useEffect(() => {
    let isMounted = true;

    async function fetchPendingCv() {
      if (shouldHideGlobal) {
        setPendingCv(null);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (!user) {
        setPendingCv(null);
        return;
      }

      const { data, error } = await supabase
        .from("cvs")
        .select("id, cv_data, template, created_at, status")
        .eq("profile_id", user.id)
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
                  Completalo por $1.999 ARS y descargalo sin marca de agua
                  desde tu perfil. Pago unico, sin suscripcion.
                </p>
              </div>
            </div>

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
          </CardContent>
        </Card>
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
              Desbloquea el PDF final por $1.999, sin recrearlo desde cero.
            </p>
          </div>
        </div>

        <Button
          onClick={handleCompletePayment}
          disabled={isLoadingPayment}
          className="h-10 shrink-0 rounded-xl bg-[#00B0FF] px-4 text-sm font-bold text-white hover:bg-[#0098E6]"
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
  );
}
