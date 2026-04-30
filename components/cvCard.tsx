"use client";
import { DocumentoCV, DocumentoCVW } from "@/components/pdf/CVDocument";
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
import { PDFViewer } from "@react-pdf/renderer";
import { Calendar, Download, Eye, User } from "lucide-react";
import { useState, useCallback, useMemo, memo } from "react";
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
    <Card className="group overflow-hidden rounded-3xl bg-[#15151A]/85 border border-white/10 shadow-xl shadow-black/10 hover:-translate-y-1 hover:border-[#38BDF8]/30 transition-all">
      <CardHeader className="p-4 border-b border-white/10 bg-white/[0.03]">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-2xl bg-[#7C3AED]/10 ring-1 ring-[#A78BFA]/15">
              <User className="h-4 w-4 text-[#A78BFA]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-[#F4F4F5]/40" />
                <span className="text-xs text-[#F4F4F5]/40">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          <Badge className={`text-xs px-2 py-1 ${templateColor}`}>
            {cv.template || "Estándar"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative aspect-[3/4]">
          <div className="absolute inset-0 ">
            <PDFViewer
              showToolbar={false}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
              className=" origin-top-left w-[400%] h-[400%]"
            >
              <DocumentoCVW cv={cv.cv_data} template={cv.template} />
            </PDFViewer>
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
                <PDFViewer className="bg-white rounded w-full h-[80vh]">
                  <DocumentoCV cv={cv.cv_data} template={cv.template} />
                </PDFViewer>
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

        <div className="p-4 text-sm text-[#F4F4F5]/70 bg-[#15151A]">
          <p className="font-medium truncate">
            {cv.cv_data?.nombre || "Sin nombre"}
          </p>
          <p className="text-xs truncate">
            {cv.cv_data?.titulo || "Sin título profesional"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
