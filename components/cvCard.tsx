"use client";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Download, Eye, User } from "lucide-react";
import { useState, useCallback, useMemo, memo } from "react";

const PDFViewerPane = dynamic(() => import("@/components/pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-white text-xs text-slate-500">
      Cargando preview...
    </div>
  ),
});
export interface CVprofile {
  id: string;
  cv_data: any;
  template: string;
  created_at: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
}
export const CVCard = memo(({ cv }: { cv: CVprofile }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formatDate = useCallback(
    (date: string) =>
      new Date(date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    []
  );

  const getTemplateColor = useCallback((template: string) => {
    const colors: Record<string, string> = {
      modern: "bg-blue-500/10 text-blue-400",
      classic: "bg-green-500/10 text-green-400",
      creative: "bg-purple-500/10 text-purple-400",
      professional: "bg-orange-500/10 text-orange-400",
    };
    return colors[template] || "bg-gray-500/10 text-gray-400";
  }, []);

  const formattedDate = useMemo(
    () => formatDate(cv.created_at),
    [cv.created_at, formatDate]
  );
  const templateColor = useMemo(
    () => getTemplateColor(cv.template),
    [cv.template, getTemplateColor]
  );

  return (
<Card className="group overflow-hidden rounded-xl bg-[#1C1C22] border border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:border-white/[0.12]">
      <CardHeader className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center">
              <User className="h-4 w-4 text-white/50" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mt-0.5">
                <Calendar className="h-3 w-3 text-white/30" />
                <span className="text-xs text-white/40">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          <Badge className={`text-xs px-2.5 py-1 font-medium ${templateColor}`}>
            {cv.template || "Estándar"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0 ">
            {isPreviewOpen ? null : (
              <div className="flex h-full w-full items-center justify-center bg-white text-xs text-slate-500">
                Preview disponible al abrir
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-black/55 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-[#7C3AED] hover:bg-[#7C3AED]/80"
                >
                  <Eye className="h-4 w-4 mr-1" /> Ver
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-[#1F1F22] border-[#7C3AED]/20">
                <DialogHeader>
                  <DialogTitle className="text-[#F4F4F5]">
                    CV de {cv.user_name} - {cv.template || "Estándar"}
                  </DialogTitle>
                </DialogHeader>
                <PDFViewerPane
                  cv={cv.cv_data}
                  template={cv.template}
                  className="h-[80vh] w-full rounded bg-white"
                />
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Download className="h-4 w-4 mr-1" /> PDF
            </Button>
          </div>
        </div>

<div className="p-4 text-sm text-white/60 bg-[#1C1C22] border-t border-white/[0.06]">
          <p className="font-medium text-white/80 truncate">
            {cv.cv_data?.nombre || "Sin nombre"}
          </p>
          <p className="text-xs text-white/40 truncate">
            {cv.cv_data?.titulo || "Sin título profesional"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
