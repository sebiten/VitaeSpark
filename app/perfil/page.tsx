"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import { Loader2, Download, BadgeCheck, User, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CVRecord } from "@/lib/types/cv";

export default function PerfilCVs() {
  const [cvs, setCvs] = useState<CVRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVs = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("cvs")
        .select("id, cv_data, template")
        .eq("profile_id", user.id)
        .eq("status", "paid")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error cargando CVs:", error);
      } else {
        setCvs(data);
      }

      setLoading(false);
    };

    fetchCVs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-3 text-white">Cargando CVs...</span>
      </div>
    );
  }

  if (!cvs.length) {
    return (
      <p className="text-center text-sm text-[#A1A1AA] py-10">
        No tienes CVs generados y aprobados aún.
      </p>
    );
  }

  return (
    <div className="w-full  mx-auto px-4 py-10 space-y-10 bg-[#121214]">
      <h2 className="text-3xl font-bold text-white text-center mb-4">
        <BadgeCheck className="inline-block w-6 h-6 mr-2 text-green-400" />
        Tus CVs Aprobados
      </h2>
      <ScrollArea className="space-y-8 max-h-[90vh] pr-2 max-w-3xl mx-auto">
        {cvs.map((cv) => (
          <Card
            key={cv.id}
            className="bg-[#1F1F22] border border-[#2A2A2D] text-white shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-3">
                <User className="w-5 h-5 text-[#38BDF8]" />
                {cv.cv_data.nombre}
              </CardTitle>
              <p className="text-sm flex items-center gap-2 text-[#A1A1AA]">
                <Briefcase className="w-4 h-4" /> {cv.cv_data.puesto}
              </p>
            </CardHeader>
            <Separator className="bg-[#2A2A2D]" />
            <CardContent className="space-y-4">
              <PDFViewer
                style={{ width: "100%", height: "600px", borderRadius: "0.5rem" }}
                className="mb-2"
                showToolbar={false}
              >
                <DocumentoCV
                  cv={cv.cv_data}
                  template={cv.template || undefined}
                />
              </PDFViewer>

              <PDFDownloadLink
                document={
                  <DocumentoCV
                    cv={cv.cv_data}
                    template={cv.template || undefined}
                  />
                }
                fileName={`CV-${cv.cv_data.nombre.replace(/\s+/g, "-")}.pdf`}
                className="block w-full"
              >
                {({ loading }) => (
                  <Button
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#15803D] text-white font-semibold hover:shadow-lg hover:shadow-[#22C55E]/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Preparando descarga...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" /> Descargar PDF
                      </>
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
