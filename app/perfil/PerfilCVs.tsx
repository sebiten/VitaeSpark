"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import type { CVRecord } from "@/lib/types/cv";
import {
  PendingPaymentRecovery,
  type PendingCVRecord,
} from "@/components/PendingPaymentRecovery";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  Pencil,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import UserPayments, {
  type ProfilePayment,
} from "@/components/UserPayment";
import { ProfileFeedbackPrompt } from "@/components/ProfileFeedbackPrompt";
import { CVThumbnail } from "./CvThumbnail";
import { getCvTemplate } from "@/lib/cv-templates";
import { recordGaFunnelEvent } from "@/lib/analytics-events";

const PDFViewerPane = dynamic(() => import("@/components/pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white text-sm text-slate-500">
      Preparando vista previa...
    </div>
  ),
});

const PDFDownloadButton = dynamic(
  () => import("@/components/pdf/PDFDownloadButton"),
  {
    ssr: false,
    loading: () => (
      <Button
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] text-[#F4F4F5]"
        disabled
      >
        Preparando...
      </Button>
    ),
  },
);

export type ProfileCVRecord = CVRecord & {
  created_at?: string | null;
};

export type ProfileInfo = {
  name: string;
  email: string;
  imgUrl?: string;
};

function getTemplateLabel(template: string): string {
  return getCvTemplate(template).name;
}

function getTemplateDotClass(template?: string | null) {
  switch (template) {
    case "green":
      return "bg-emerald-400";
    case "blue":
      return "bg-sky-400";
    case "elegance":
      return "bg-blue-300";
    case "harvard":
      return "bg-zinc-200";
    case "modern-ats":
      return "bg-slate-300";
    case "operative-ats":
      return "bg-emerald-600";
    default:
      return "bg-violet-400";
  }
}

function formatShortDate(value?: string | null) {
  if (!value) return "Sin fecha";

  try {
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "Sin fecha";
  }
}

type PerfilCVsProps = {
  initialCvs: ProfileCVRecord[];
  initialProfileInfo: ProfileInfo;
  initialPayments: ProfilePayment[];
  initialPendingCv: PendingCVRecord | null;
};

export default function PerfilCVs({
  initialCvs,
  initialProfileInfo,
  initialPayments,
  initialPendingCv,
}: PerfilCVsProps) {
  const cvs = initialCvs;
  const [showCongrats, setShowCongrats] = useState(false);
  const [paidCv, setPaidCv] = useState<ProfileCVRecord | null>(null);
  const [selectedCV, setSelectedCV] = useState<ProfileCVRecord | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const cvId = searchParams.get("cv_id");
    if (!cvId) return;

    const found = cvs.find((cv) => cv.id === cvId);
    if (!found) return;

    const payment = initialPayments.find(
      (candidate) =>
        candidate.cv_id === cvId &&
        ["approved", "paid"].includes(candidate.status.toLowerCase()),
    );

    if (payment) {
      const transactionId = payment.payment_id || payment.id;
      const storageKey = `vitaespark_ga_purchase_${transactionId}`;
      let wasTracked = false;

      try {
        wasTracked = window.localStorage.getItem(storageKey) === "1";
      } catch {
        // GA4 also deduplicates purchases by transaction_id.
      }

      if (!wasTracked) {
        const isPayPal =
          payment.payment_method === "paypal" ||
          payment.payment_type === "paypal";

        recordGaFunnelEvent("payment_completed", {
          transaction_id: transactionId,
          cv_id: cvId,
          value: Number(payment.amount),
          currency: isPayPal ? "USD" : "ARS",
          payment_type: isPayPal ? "paypal" : "mercado_pago",
        });

        try {
          window.localStorage.setItem(storageKey, "1");
        } catch {
          // Storage can be unavailable in strict privacy modes.
        }
      }
    }

    setPaidCv(found);
    setShowCongrats(true);
    router.replace("/perfil");
  }, [cvs, initialPayments, router, searchParams]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F0F12] px-4 py-8 text-[#F4F4F5] sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#7C3AED]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl space-y-6">
        <ProfileHeader
          profileInfo={initialProfileInfo}
          paidCount={cvs.length}
          onCreate={() => router.push("/crear")}
        />

        {showCongrats && paidCv ? <PaymentSuccessNotice cv={paidCv} /> : null}
        {showCongrats && paidCv ? (
          <ProfileFeedbackPrompt cvId={paidCv.id} />
        ) : null}

        <PendingPaymentRecovery
          variant="profile"
          initialPendingCv={initialPendingCv}
        />

        <section className="border-t border-white/10 pt-7 sm:pt-8">
          <div className="mb-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/46">
              Tus documentos
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
              CVs pagados
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
              Editá, revisá y descargá los CVs que ya desbloqueaste.
            </p>
          </div>

          {cvs.length === 0 ? (
            <PerfilEmptyState onCreate={() => router.push("/crear")} />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cvs.map((cv) => (
                <CVGridCard
                  key={cv.id}
                  cv={cv}
                  onEdit={() => router.push(`/editar-cv/${cv.id}`)}
                  onPreview={() => setSelectedCV(cv)}
                />
              ))}
            </div>
          )}
        </section>

        <UserPayments initialPayments={initialPayments} />
      </div>

      <PreviewDialog
        cv={selectedCV}
        onOpenChange={(open) => {
          if (!open) setSelectedCV(null);
        }}
      />
    </main>
  );
}

function ProfileHeader({
  profileInfo,
  paidCount,
  onCreate,
}: {
  profileInfo: ProfileInfo;
  paidCount: number;
  onCreate: () => void;
}) {
  return (
    <section className="border-b border-white/10 pb-6 sm:pb-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-1">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={profileInfo.imgUrl}
                alt={profileInfo.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#1B1B22] text-lg font-semibold text-white">
                {profileInfo.name?.charAt(0) ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/42">
              Mi perfil
            </p>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              {profileInfo.name}
            </h1>
            <p className="mt-1 truncate text-sm text-white/56">
              {profileInfo.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <p className="text-sm text-white/58">
            {paidCount === 1 ? "1 CV desbloqueado" : `${paidCount} CVs desbloqueados`}
          </p>
          <Button
            onClick={onCreate}
            className="h-12 rounded-full bg-[#F6F2EA] px-5 text-sm font-semibold text-[#121114] shadow-none hover:bg-white"
          >
            <Plus className="h-4 w-4" />
            Crear otro CV
          </Button>
        </div>
      </div>
    </section>
  );
}

function PaymentSuccessNotice({ cv }: { cv: ProfileCVRecord }) {
  return (
    <div className="rounded-[26px] border border-emerald-400/18 bg-emerald-400/10 p-4 text-white">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-emerald-200">
            Pago aprobado
          </p>
          <p className="mt-1 text-sm leading-6 text-white/72">
            Tu CV de {cv.cv_data.nombre} ya esta listo para editar y descargar
            sin marca de agua.
          </p>
        </div>
      </div>
    </div>
  );
}

function CVGridCard({
  cv,
  onEdit,
  onPreview,
}: {
  cv: ProfileCVRecord;
  onEdit: () => void;
  onPreview: () => void;
}) {
  return (
    <Card className="group overflow-hidden rounded-[28px] border-white/8 bg-[#101014] text-[#F4F4F5] shadow-[0_14px_36px_rgba(4,4,10,0.16)] transition duration-200 hover:border-white/14">
      <CardHeader className="space-y-4 border-b border-white/8 bg-white/[0.025] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">
              {cv.cv_data.nombre}
            </p>
            <p className="mt-1 line-clamp-1 text-sm text-[#A78BFA]">
              {cv.cv_data.puesto}
            </p>
          </div>
          <TemplatePill template={cv.template} />
        </div>
        <p className="text-xs text-white/42">
          Pagado el {formatShortDate(cv.created_at)}
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <button
          type="button"
          onClick={onPreview}
          className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
        >
          <CVThumbnail cv={cv} />
        </button>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t border-white/8 bg-[#101014] p-4">
        <div className="grid w-full grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-10 rounded-2xl border-white/10 bg-white/[0.035] text-white/78 hover:bg-white/[0.07] hover:text-white"
            onClick={onEdit}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </Button>

          <Button
            variant="outline"
            className="h-10 rounded-2xl border-white/10 bg-white/[0.035] text-white/78 hover:bg-white/[0.07] hover:text-white"
            onClick={onPreview}
          >
            <Eye className="h-4 w-4" />
            Ver
          </Button>
        </div>

        <PDFDownloadButton
          cv={cv.cv_data}
          template={cv.template || undefined}
          cvId={cv.id}
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}

function TemplatePill({ template }: { template?: string | null }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/62">
      <span className={`h-1.5 w-1.5 rounded-full ${getTemplateDotClass(template)}`} />
      {getTemplateLabel(template || "purple")}
    </span>
  );
}

function PreviewDialog({
  cv,
  onOpenChange,
}: {
  cv: ProfileCVRecord | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={Boolean(cv)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden border-white/10 bg-[#111113] p-0 text-white sm:rounded-3xl [&>button]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-white/10 bg-[#15151A] px-4 py-3 text-left sm:px-5">
          <DialogTitle className="min-w-0 truncate text-base font-semibold text-white">
            Vista previa {cv?.cv_data.nombre ? `, ${cv.cv_data.nombre}` : ""}
          </DialogTitle>
          <DialogClose asChild>
            <button className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/72 transition hover:bg-white/[0.08] hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="h-[calc(92vh-64px)] bg-[#2A2A2D] p-3 sm:p-5">
          {cv ? (
            <PDFViewerPane
              cv={cv.cv_data}
              template={cv.template || undefined}
              className="h-full w-full rounded-2xl border-0 bg-white"
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PerfilEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mx-auto max-w-xl rounded-[28px] border border-white/8 bg-[#101014] px-6 py-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#A78BFA]">
        <Sparkles className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-semibold text-white">Todavia no tenes CVs pagados</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/58">
        Crea tu primer CV, revisa la vista previa y desbloquea el PDF final
        cuando este listo.
      </p>
      <Button
        onClick={onCreate}
        className="mt-6 h-11 rounded-2xl bg-[#6F3CD2] px-5 text-sm font-semibold text-white hover:bg-[#7A47DD]"
      >
        Crear mi CV
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
