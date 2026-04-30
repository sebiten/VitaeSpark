"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { createClient } from "@/utils/supabase/client";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import type { CVRecord } from "@/lib/types/cv";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Eye, FileText, Loader2, Sparkles, User, X } from "lucide-react";
import UserPayments from "@/components/UserPayment";
import { CVThumbnail } from "./CvThumbnail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Componente para generar una miniatura del CV

export default function PerfilCVs() {
  const [cvs, setCvs] = useState<CVRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCongrats, setShowCongrats] = useState(false);
  const [paidCv, setPaidCv] = useState<CVRecord | null>(null);
  const [selectedCV, setSelectedCV] = useState<CVRecord | null>(null);
  const [profileInfo, setProfileInfo] = useState<{
    name: string;
    email: string;
    imgUrl: string;
  } | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  function getTemplateClass(template: string) {
    switch (template) {
      case "green":
        return "bg-green-600 text-white";
      case "blue":
        return "bg-blue-600 text-white";
      case "elegance":
        return "bg-sky-800 text-white"; // o el azul que uses para "elegance"
      case "purple":
        return "bg-purple-600 text-white";
      case "harvard":
        return "bg-white text-black"; // o el rojo que uses para "harvard"
      default:
        return "bg-purple-600 text-white";
    }
  }
  function getTemplateLabel(template: string): string {
    switch (template) {
      case "green":
        return "Verde";
      case "blue":
        return "Azul";
      case "elegance":
        return "Elegance";
      case "purple":
        return "Púrpura";
      case "harvard":
        return "Harvard";
      default:
        return "Púrpura";
    }
  }

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

      // Fetch user profile information
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
        setCvs(data);
        const cvId = searchParams.get("cv_id");
        if (cvId) {
          const found = data.find((cv) => cv.id === cvId);
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="bg-gradient-to-br from-[#1F1F22] to-[#141416] px-8 py-6 rounded-2xl shadow-2xl border border-[#2A2A2D] flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-white" />
          <span className="text-[#E4E4E7] font-semibold text-lg tracking-wide">
            Cargando tus CVs...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto overflow-hidden px-4 py-10 space-y-8 bg-[#0F0F10]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
      {/* Profile Information Card */}
      {profileInfo && (
        <div className="relative max-w-5xl mx-auto mb-8">
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-[#15151A]/85 text-white shadow-2xl shadow-black/20 transition-all duration-300">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#38BDF8]/10 blur-3xl" />
            <CardHeader className="pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0 p-5">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] p-3 rounded-full shadow-md ">
                  <Avatar>
                    <AvatarImage
                      src={profileInfo.imgUrl}
                      alt={profileInfo.name}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="bg-transparent text-white text-xl">
                      {profileInfo.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-[#F4F4F5] flex items-center gap-2">
                    ¡Hola, {profileInfo.name}!{" "}
                    <span className="animate-wave inline-block">👋</span>
                  </h3>
                  <p className="text-sm text-[#A1A1AA] flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400"></span>
                    {profileInfo.email}
                  </p>
                </div>
              </div>
              <div className="bg-white/[0.04] px-4 py-1.5 rounded-full text-sm font-medium text-[#E4E4E7] flex items-center gap-2 shadow-inner border border-white/10">
                <span className="text-[#7C3AED]">{cvs.length}</span>
                <span>
                  {cvs.length === 1 ? "CV" : "CVs"} disponible
                  {cvs.length !== 1 && "s"}
                </span>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Notificación de pago aprobado */}
      {showCongrats && paidCv && (
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-green-500/20 hover:shadow-xl">
            <CardHeader className="pb-2 flex flex-row items-center space-y-0 gap-2">
              <div className="w-6 h-6 text-white flex items-center justify-center">
                ✓
              </div>
              <div className="text-xl font-bold">¡Pago Aprobado!</div>
            </CardHeader>
            <CardContent>
              <p className="text-green-100">
                Tu pago para el CV de{" "}
                <strong className="text-white">{paidCv.cv_data.nombre}</strong>{" "}
                ha sido confirmado. ¡Ahora puedes descargarlo!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="relative text-center space-y-2 mb-8 ">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C3AED]/15 text-[#A78BFA] ring-1 ring-[#A78BFA]/20">
          <FileText className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold text-white">Tus CVs Aprobados</h2>
        <p className="text-[#A1A1AA] max-w-md mx-auto">
          Aquí encontrarás todos tus currículums generados y listos para
          descargar
        </p>
      </div>

      <Tabs defaultValue="grid" className="relative max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <TabsList className="bg-[#15151A] border border-white/10 p-1 rounded-2xl text-white">
            <TabsTrigger
              value="grid"
              className="text-white/70 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white rounded-xl"
            >
              Vista Grid
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="text-white/70 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white rounded-xl"
            >
              Vista Lista
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="grid" className="mt-0">
          {cvs.length === 0 ? (
            <EmptyState router={router} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <Card
                  key={cv.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#15151A]/85 text-[#F4F4F5] shadow-xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#38BDF8]/30"
                >
                  <CardHeader className="bg-white/[0.03] p-4 relative border-b border-white/10">
                    <div className="mt-2">
                      <div
                        className={`
      text-xs font-medium px-2 py-0.5 rounded inline-block uppercase
      ${getTemplateClass(cv.template || "purple")}
    `}
                      >
                        Plantilla: {getTemplateLabel(cv.template || "purple")}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="bg-[#2A2A2D] p-2 rounded-full">
                        <User className="w-4 h-4 text-[#F4F4F5]" />
                      </div>
                      <div className="flex flex-col">
                        <div className="text-[#F4F4F5] font-medium">
                          {cv.cv_data.nombre}
                        </div>
                        <div className="text-sm text-[#7C3AED]">
                          {cv.cv_data.puesto}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <CVThumbnail cv={cv} />
                  </CardContent>

                  <CardFooter className="p-4 flex flex-col gap-2 bg-[#15151A]">
                    <div className="text-center w-full mb-1">
                      <div className="font-medium text-[#F4F4F5]">
                        CV Profesional
                      </div>
                      <div className="text-xs text-[#A1A1AA]">
                        Listo para descargar
                      </div>
                    </div>

                    <div className="flex gap-2 w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 bg-[#1A1A1D]  border-[#2A2A2D] text-[#F4F4F5]"
                            onClick={() => setSelectedCV(cv)}
                          >
                            <Eye className="w-4 h-4 mr-2" /> Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl h-[90vh] p-0 bg-[#0F0F10] border-[#2A2A2D]">
                          <DialogHeader className="p-4 border-b border-[#2A2A2D] flex flex-row justify-between items-center text-white">
                            <DialogTitle className="text-lg font-semibold text-[#F4F4F5]">
                              Vista previa: {selectedCV?.cv_data.nombre}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="p-4 h-[calc(90vh-70px)]">
                            {selectedCV && (
                              <PDFViewer
                                style={{ width: "100%", height: "100%" }}
                                className="rounded-md border border-[#2A2A2D]"
                                showToolbar={false}
                              >
                                <DocumentoCV
                                  cv={selectedCV.cv_data}
                                  template={selectedCV.template || undefined}
                                />
                              </PDFViewer>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <PDFDownloadLink
                        document={
                          <DocumentoCV
                            cv={cv.cv_data}
                            template={cv.template || undefined}
                          />
                        }
                        fileName={`CV-${cv.cv_data.nombre.replace(
                          /\s+/g,
                          "-"
                        )}.pdf`}
                        className="flex-1"
                      >
                        {({ loading: dlLoading }) => (
                          <Button
                            className="w-full bg-[#1A1A1D] hover:bg-[#2A2A2D] border border-[#2A2A2D] text-[#F4F4F5]"
                            disabled={dlLoading}
                          >
                            {dlLoading ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                            <span className="ml-2">
                              {dlLoading ? "Preparando..." : "Descargar"}
                            </span>
                          </Button>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <ScrollArea className="max-h-[70vh] pr-4 pb-4">
            {cvs.length === 0 ? (
              <EmptyState router={router} />
            ) : (
              <div className="space-y-4">
                {cvs.map((cv) => (
                  <Card
                    key={cv.id}
                    className="bg-[#0F0F10] border border-[#2A2A2D] text-[#F4F4F5] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/50"
                  >
                    <div className="flex flex-col md:flex-row">
                      <CardHeader className="bg-[#1A1A1D] md:w-1/3 p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#2A2A2D] p-2 rounded-full">
                            <User className="w-4 h-4 text-[#F4F4F5]" />
                          </div>
                          <div className="flex flex-col">
                            <div className="text-[#F4F4F5] font-medium">
                              {cv.cv_data.nombre}
                            </div>
                            <div className="text-xs text-[#7C3AED]">
                              {cv.cv_data.puesto}
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="bg-primary text-xs font-medium text-primary-foreground px-2 py-0.5 rounded inline-block uppercase">
                            {cv.template || "purple"}
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 md:w-2/3 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-[60px] h-[80px] bg-white rounded shadow-md flex flex-col p-1">
                            <div className="w-full h-2 bg-primary mb-1 rounded-sm"></div>
                            <div className="w-3/4 h-1 bg-gray-300 mb-0.5 rounded-sm"></div>
                            <div className="w-1/2 h-1 bg-gray-300 mb-1 rounded-sm"></div>
                            <div className="w-full h-1 bg-gray-200 mb-0.5 rounded-sm"></div>
                            <div className="w-full h-1 bg-gray-200 mb-0.5 rounded-sm"></div>
                            <div className="w-3/4 h-1 bg-gray-200 mb-1 rounded-sm"></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-[#F4F4F5]">
                              CV Profesional
                            </h3>
                            <p className="text-xs text-[#A1A1AA]">
                              Listo para descargar
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="bg-[#1A1A1D] hover:bg-[#2A2A2D] border-[#2A2A2D] text-[#F4F4F5]"
                                onClick={() => setSelectedCV(cv)}
                              >
                                <Eye className="w-4 h-4 mr-2" /> Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[90vh] p-0 bg-[#0F0F10] border-[#2A2A2D]">
                              <DialogHeader className="p-4 border-b border-[#2A2A2D] flex flex-row justify-between items-center">
                                <DialogTitle className="text-lg font-semibold text-[#F4F4F5]">
                                  Vista previa: {selectedCV?.cv_data.nombre}
                                </DialogTitle>
                                <DialogClose asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full text-[#F4F4F5]"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </DialogClose>
                              </DialogHeader>
                              <div className="p-4 h-[calc(90vh-70px)]">
                                {selectedCV && (
                                  <PDFViewer
                                    style={{ width: "100%", height: "100%" }}
                                    className="rounded-md border border-[#2A2A2D]"
                                    showToolbar={false}
                                  >
                                    <DocumentoCV
                                      cv={selectedCV.cv_data}
                                      template={
                                        selectedCV.template || undefined
                                      }
                                    />
                                  </PDFViewer>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <PDFDownloadLink
                            document={
                              <DocumentoCV
                                cv={cv.cv_data}
                                template={cv.template || undefined}
                              />
                            }
                            fileName={`CV-${cv.cv_data.nombre.replace(
                              /\s+/g,
                              "-"
                            )}.pdf`}
                          >
                            {({ loading: dlLoading }) => (
                              <Button
                                className="bg-[#1A1A1D] hover:bg-[#2A2A2D] border border-[#2A2A2D] text-[#F4F4F5]"
                                disabled={dlLoading}
                              >
                                {dlLoading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Preparando...
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-4 h-4 mr-2" />{" "}
                                    Descargar
                                  </>
                                )}
                              </Button>
                            )}
                          </PDFDownloadLink>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="relative">
        <UserPayments />
      </div>
    </div>
  );
}

// Componente para estado vacío
function EmptyState({ router }: { router: any }) {
  return (
    <div className="text-center py-16 px-6 bg-[#15151A]/85 rounded-3xl border border-white/10 max-w-md mx-auto shadow-2xl shadow-black/10">
      <Sparkles className="w-12 h-12 text-[#7C3AED] mx-auto mb-4 opacity-80" />
      <h3 className="text-xl font-semibold text-[#F4F4F5] mb-2">
        Sin CVs disponibles
      </h3>
      <p className="text-[#A1A1AA] mb-6">
        No tienes CVs generados y aprobados aún.
      </p>
      <Button
        onClick={() => router.push("/crear")}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Crear mi primer CV
      </Button>
    </div>
  );
}
