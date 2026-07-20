"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { CVRecord } from "@/lib/types/cv";
import { PendingPaymentRecovery } from "@/components/PendingPaymentRecovery";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  LayoutGrid,
  List,
  Loader2,
  Pencil,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import UserPayments from "@/components/UserPayment";
import { ProfileFeedbackPrompt } from "@/components/ProfileFeedbackPrompt";
import { CVThumbnail } from "./CvThumbnail";
import { getCvTemplate } from "@/lib/cv-templates";

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

type ProfileCVRecord = CVRecord & {
  created_at?: string | null;
};

type ProfileInfo = {
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

export default function PerfilCVs() {
  const [cvs, setCvs] = useState<ProfileCVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [paidCv, setPaidCv] = useState<ProfileCVRecord | null>(null);
  const [selectedCV, setSelectedCV] = useState<ProfileCVRecord | null>(null);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (!profileError && profileData) {
        setProfileInfo({
          name: profileData.full_name || user.email?.split("@")[0] || "Usuario",
          email: user.email || "No disponible",
          imgUrl: user.user_metadata?.avatar_url,
        });
      }

      const { data, error } = await supabase
        .from("cvs")
        .select("id, cv_data, template, created_at")
        .eq("profile_id", user.id)
        .eq("status", "paid")
        .order("created_at", { ascending: false });

      if (!error && data) {
        const paidCvs = data as ProfileCVRecord[];
        setCvs(paidCvs);

        const cvId = searchParams.get("cv_id");
        if (cvId) {
          const found = paidCvs.find((cv) => cv.id === cvId);
          if (found) {
            setPaidCv(found);
            setShowCongrats(true);
            router.replace("/perfil");
          }
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [router, searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#0F0F12] px-4">
        <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-[#15151A] px-5 py-4 text-white shadow-2xl shadow-black/20">
          <Loader2 className="h-5 w-5 animate-spin text-[#A78BFA]" />
          <span className="text-sm font-medium text-white/78">
            Cargando tu perfil...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F0F12] px-4 py-8 text-[#F4F4F5] sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#7C3AED]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl space-y-6">
        {profileInfo ? (
          <ProfileHeader
            profileInfo={profileInfo}
            paidCount={cvs.length}
            onCreate={() => router.push("/crear")}
          />
        ) : null}

        {showCongrats && paidCv ? <PaymentSuccessNotice cv={paidCv} /> : null}
        {showCongrats && paidCv ? (
          <ProfileFeedbackPrompt cvId={paidCv.id} />
        ) : null}

        <PendingPaymentRecovery variant="profile" />

        <section className="rounded-[30px] border border-white/8 bg-[#141419] p-4 shadow-[0_18px_48px_rgba(4,4,10,0.18)] sm:p-5">
          <Tabs defaultValue="grid" className="space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/42">
                  Biblioteca
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                  CVs pagados
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
                  Edita, revisa y descarga los CVs que ya desbloqueaste.
                </p>
              </div>

              <TabsList className="h-auto w-full rounded-2xl border border-white/8 bg-[#0F0F12] p-1 sm:w-auto">
                <TabsTrigger
                  value="grid"
                  className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/62 data-[state=active]:bg-white/[0.08] data-[state=active]:text-white sm:flex-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                  Tarjetas
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/62 data-[state=active]:bg-white/[0.08] data-[state=active]:text-white sm:flex-none"
                >
                  <List className="h-4 w-4" />
                  Lista
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
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
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <ScrollArea className="max-h-[72vh] pr-2">
                {cvs.length === 0 ? (
                  <PerfilEmptyState onCreate={() => router.push("/crear")} />
                ) : (
                  <div className="space-y-3">
                    {cvs.map((cv) => (
                      <CVListItem
                        key={cv.id}
                        cv={cv}
                        onEdit={() => router.push(`/editar-cv/${cv.id}`)}
                        onPreview={() => setSelectedCV(cv)}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </section>

        <UserPayments />
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
    <section className="rounded-[30px] border border-white/8 bg-[#141419] p-4 shadow-[0_18px_48px_rgba(4,4,10,0.18)] sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
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

        <div className="grid gap-3 sm:grid-cols-[auto_auto] sm:items-center">
          <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/8 bg-[#0F0F12]">
            <div className="border-r border-white/8 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/36">
                CVs pagados
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {paidCount}
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.16em] text-white/36">
                Estado
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Activo
              </p>
            </div>
          </div>

          <Button
            onClick={onCreate}
            className="h-12 rounded-2xl bg-[#6F3CD2] px-5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(109,40,217,0.18)] hover:bg-[#7A47DD]"
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

function CVListItem({
  cv,
  onEdit,
  onPreview,
}: {
  cv: ProfileCVRecord;
  onEdit: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="grid gap-4 rounded-[24px] border border-white/8 bg-[#101014] p-4 text-white shadow-[0_10px_28px_rgba(4,4,10,0.14)] md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="flex min-w-0 items-center gap-4">
        <button
          type="button"
          onClick={onPreview}
          className="flex h-16 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg shadow-black/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
        >
          <div className="h-full w-full scale-[0.45]">
            <CVThumbnail cv={cv} />
          </div>
        </button>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold text-white">
              {cv.cv_data.nombre}
            </h3>
            <TemplatePill template={cv.template} />
          </div>
          <p className="mt-1 truncate text-sm text-[#A78BFA]">
            {cv.cv_data.puesto}
          </p>
          <p className="mt-1 text-xs text-white/42">
            Pagado el {formatShortDate(cv.created_at)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
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
        <PDFDownloadButton
          cv={cv.cv_data}
          template={cv.template || undefined}
          cvId={cv.id}
          className="col-span-2 sm:min-w-[160px]"
        />
      </div>
    </div>
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
