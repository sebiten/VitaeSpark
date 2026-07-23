"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Eye,
  ImageIcon,
  ImageOff,
  UserRound,
} from "lucide-react";
import type { AdminCvRecord } from "@/lib/admin-cvs";
import { getCvTemplate } from "@/lib/cv-templates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PDFViewerPane = dynamic(() => import("@/components/pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[520px] items-center justify-center bg-[#F4F1EA] text-sm text-slate-500">
      Preparando documento...
    </div>
  ),
});

export type CVprofile = AdminCvRecord;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getStatus(status: string | null) {
  if (status === "paid" || status === "approved") {
    return {
      label: "Pagado",
      className: "border-emerald-400/18 bg-emerald-400/8 text-emerald-300",
    };
  }

  return {
    label: "Pendiente",
    className: "border-amber-300/16 bg-amber-300/8 text-amber-200",
  };
}

function PhotoPreview({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-400">
        <ImageOff className="size-4" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      className="size-11 shrink-0 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function AdminCvPreview({ cv }: { cv: CVprofile }) {
  const template = getCvTemplate(cv.template);
  const experience = Array.isArray(cv.cv_data.experiencia)
    ? cv.cv_data.experiencia.slice(0, 2)
    : [];
  const skills = Array.isArray(cv.cv_data.habilidades)
    ? cv.cv_data.habilidades.slice(0, 5)
    : [];
  const canShowPhoto = template.allowsPhoto && Boolean(cv.cv_data.foto_url);

  return (
    <div className="relative mx-auto aspect-[210/297] w-full overflow-hidden bg-[#FBFBFA] p-[7%] text-left text-slate-800 shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
      <div className="flex items-start gap-3 border-b border-slate-700 pb-3">
        {canShowPhoto ? (
          <PhotoPreview src={cv.cv_data.foto_url!} name={cv.cv_data.nombre} />
        ) : null}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[clamp(10px,1.2vw,15px)] font-bold leading-tight">
            {cv.cv_data.nombre || "Sin nombre"}
          </p>
          <p className="mt-1 truncate text-[clamp(6px,.75vw,9px)] font-semibold text-[#315A72]">
            {cv.cv_data.puesto || "Sin puesto definido"}
          </p>
          <div className="mt-1.5 space-y-0.5">
            {(cv.cv_data.contacto ?? []).slice(0, 2).map((item, index) => (
              <p
                key={`${item}-${index}`}
                className="truncate text-[clamp(4px,.5vw,6px)] text-slate-500"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-3">
        <p className="border-b border-slate-200 pb-1 text-[clamp(5px,.58vw,7px)] font-bold uppercase tracking-[0.12em] text-[#315A72]">
          Perfil profesional
        </p>
        <p className="mt-1.5 line-clamp-3 text-[clamp(4px,.52vw,6px)] leading-relaxed text-slate-600">
          {cv.cv_data.sobreMi || "Perfil profesional no disponible."}
        </p>
      </section>

      <section className="mt-3">
        <p className="border-b border-slate-200 pb-1 text-[clamp(5px,.58vw,7px)] font-bold uppercase tracking-[0.12em] text-[#315A72]">
          Experiencia
        </p>
        <div className="mt-1.5 space-y-2">
          {experience.map((item, index) => (
            <div key={`${item.cargo}-${index}`}>
              <div className="flex items-start justify-between gap-2">
                <p className="truncate text-[clamp(4px,.55vw,6.5px)] font-bold">
                  {item.cargo}
                </p>
                <p className="shrink-0 text-[clamp(3.5px,.45vw,5px)] text-slate-400">
                  {item.fechas}
                </p>
              </div>
              <p className="truncate text-[clamp(3.5px,.48vw,5.5px)] text-slate-500">
                {item.empresa}
              </p>
            </div>
          ))}
        </div>
      </section>

      {skills.length > 0 ? (
        <section className="mt-3">
          <p className="border-b border-slate-200 pb-1 text-[clamp(5px,.58vw,7px)] font-bold uppercase tracking-[0.12em] text-[#315A72]">
            Habilidades
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {skills.map((skill) => (
              <span
                key={skill}
                className="max-w-full truncate rounded bg-slate-100 px-1.5 py-1 text-[clamp(3.5px,.45vw,5px)] text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FBFBFA] to-transparent" />
    </div>
  );
}

export function CVCard({ cv }: { cv: CVprofile }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const template = getCvTemplate(cv.template);
  const status = getStatus(cv.status);
  const hasPhoto = Boolean(cv.cv_data.foto_url);
  const photoLabel = !template.allowsPhoto
    ? "Plantilla sin foto"
    : hasPhoto
      ? "Foto cargada"
      : "Sin foto";

  return (
    <article className="overflow-hidden rounded-2xl border border-white/8 bg-[#17171C]">
      <div className="flex items-start justify-between gap-3 border-b border-white/7 px-4 py-3.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#F6F2EA]">
            {cv.cv_data.nombre || "CV sin nombre"}
          </p>
          <p className="mt-1 truncate text-xs text-white/48">
            {cv.cv_data.puesto || "Sin puesto definido"}
          </p>
        </div>
        <Badge
          variant="outline"
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative block w-full bg-[#101014] px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
            aria-label={`Abrir CV de ${cv.cv_data.nombre || "usuario"}`}
          >
            <AdminCvPreview cv={cv} />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/28 group-focus-visible:bg-black/28">
              <span className="flex translate-y-2 items-center gap-2 rounded-full border border-white/14 bg-[#121216]/94 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <Eye className="size-3.5" />
                Ver CV completo
              </span>
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="flex h-[92vh] w-[min(1120px,96vw)] max-w-none flex-col gap-0 overflow-hidden border-white/10 bg-[#111115] p-0 text-[#F6F2EA]">
          <DialogHeader className="border-b border-white/8 px-5 py-4 text-left">
            <div className="flex flex-wrap items-start justify-between gap-3 pr-8">
              <div>
                <DialogTitle className="text-lg">
                  {cv.cv_data.nombre || "CV sin nombre"}
                </DialogTitle>
                <DialogDescription className="mt-1 text-white/52">
                  {cv.cv_data.puesto || "Sin puesto"} · {template.name}
                </DialogDescription>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="rounded-full border-white/10 bg-white/[0.035] text-white/62"
                >
                  {photoLabel}
                </Badge>
                <Badge
                  variant="outline"
                  className={`rounded-full ${status.className}`}
                >
                  {status.label}
                </Badge>
              </div>
            </div>
          </DialogHeader>
          <div className="min-h-0 flex-1 bg-[#29292D] p-2 sm:p-4">
            <PDFViewerPane
              cv={cv.cv_data}
              template={cv.template}
              className="h-full w-full rounded-lg bg-white"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-3 px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-white/45">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatDate(cv.created_at)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <UserRound className="size-3.5" />
            {cv.user_name || `Usuario ${cv.profile_id.slice(0, 8)}`}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {template.allowsPhoto ? (
              hasPhoto ? (
                <CheckCircle2 className="size-3.5 text-emerald-300" />
              ) : (
                <ImageOff className="size-3.5" />
              )
            ) : (
              <ImageIcon className="size-3.5" />
            )}
            {photoLabel}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPreviewOpen(true)}
          className="h-9 w-full border-white/10 bg-white/[0.035] text-xs text-white hover:bg-white/[0.07] hover:text-white"
        >
          <Eye className="mr-2 size-3.5" />
          Abrir CV
        </Button>
      </div>
    </article>
  );
}
