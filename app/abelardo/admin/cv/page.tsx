"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FileText,
  User,
  Filter,
  Download,
  Search,
  Eye,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import { createClient } from "@/utils/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PDFViewer } from "@react-pdf/renderer";

interface CV {
  id: string;
  cv_data: any;
  template: string;
  created_at: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
}

export default function CVsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [cvs, setCvs] = useState<CV[]>([]);
  const [filteredCvs, setFilteredCvs] = useState<CV[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Cargar datos del usuario y verificar si es admin
  useEffect(() => {
    async function loadUserData() {
      try {
        setLoading(true);
        setError(null);

        // Obtener usuario actual
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }

        setUser(user);

        // Verificar si es admin
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("isadmin")
          .eq("id", user.id)
          .single();

        if (profileError || !profileData || !profileData.isadmin) {
          setError("No tienes permisos para acceder a esta página");
          setTimeout(() => router.push("/"), 3000);
          return;
        }

        // Cargar los CVs
        await loadCVs();
      } catch (error) {
        console.error("Error al cargar datos de usuario:", error);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, [router, supabase]);

  // Función para cargar los CVs con información del usuario
  async function loadCVs() {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select(
          `
          *
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al obtener CVs:", error);
        setError("Error al cargar los CVs");
        return;
      }

      // Mapear los datos para incluir información del usuario
      const cvsWithUserInfo = (data || []).map((cv: any) => ({
        ...cv,
        user_name: cv.profiles?.name || "Usuario desconocido",
        user_email: cv.profiles?.email || "Email no disponible",
      }));

      setCvs(cvsWithUserInfo);
      setFilteredCvs(cvsWithUserInfo);
    } catch (error) {
      console.error("Error al cargar CVs:", error);
      setError("Error al cargar los CVs");
    }
  }

  // Filtrar CVs cuando cambian los filtros
  useEffect(() => {
    let filtered = cvs;

    // Filtrar por plantilla
    if (selectedTemplate !== "all") {
      filtered = filtered.filter((cv) => cv.template === selectedTemplate);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (cv) =>
          cv.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cv.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cv.cv_data?.nombre
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          cv.cv_data?.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCvs(filtered);
  }, [cvs, selectedTemplate, searchTerm]);

  // Obtener plantillas únicas
  const uniqueTemplates = Array.from(
    new Set(cvs.map((cv) => cv.template).filter(Boolean))
  );

  if (loading) {
    return (
      <main className="bg-[#0F0F10] min-h-screen py-12 px-4 text-[#F4F4F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED] mx-auto mb-4"></div>
          <p className="text-lg">Cargando currículums...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#0F0F10] min-h-screen py-12 px-4 text-[#F4F4F5] flex items-center justify-center">
        <Alert className="max-w-md bg-red-900/20 border-red-500/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <main className="bg-[#0F0F10] min-h-screen py-12 px-4 text-[#F4F4F5]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7C3AED] mb-2">
            Currículums Generados
          </h1>
          <p className="text-[#F4F4F5]/70">
            Visualiza y gestiona todos los CVs creados por los usuarios en la
            plataforma.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-[#F4F4F5]/60">
            <span>Total: {cvs.length} CVs</span>
            <span>•</span>
            <span>Mostrando: {filteredCvs.length} CVs</span>
          </div>
        </div>

        {/* Filtros y controles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#F4F4F5]/40" />
            <Input
              placeholder="Buscar por nombre, email o título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5] placeholder:text-[#F4F4F5]/40"
            />
          </div>

          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]">
              <SelectValue placeholder="Filtrar por plantilla" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]">
              <SelectItem value="all">Todas las plantillas</SelectItem>
              {uniqueTemplates.map((template) => (
                <SelectItem key={template} value={template}>
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedTemplate("all");
            }}
            className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5] hover:bg-[#7C3AED]/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>

        {/* Lista de CVs */}
        {filteredCvs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCvs.map((cv) => (
              <CVCard key={cv.id} cv={cv} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="h-20 w-20 mx-auto text-[#7C3AED]/30 mb-6" />
            <h3 className="text-xl font-medium text-[#F4F4F5] mb-2">
              {searchTerm || selectedTemplate !== "all"
                ? "No se encontraron CVs"
                : "No hay CVs generados"}
            </h3>
            <p className="text-[#F4F4F5]/60 max-w-md mx-auto">
              {searchTerm || selectedTemplate !== "all"
                ? "Intenta ajustar los filtros de búsqueda para encontrar los CVs que buscas."
                : "Aún no se han creado currículums en la plataforma."}
            </p>
            {(searchTerm || selectedTemplate !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTemplate("all");
                }}
                className="mt-4 bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]"
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function CVCard({ cv }: { cv: CV }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTemplateColor = (template: string) => {
    const colors: Record<string, string> = {
      modern: "bg-blue-500/10 text-blue-400",
      classic: "bg-green-500/10 text-green-400",
      creative: "bg-purple-500/10 text-purple-400",
      professional: "bg-orange-500/10 text-orange-400",
    };
    return colors[template] || "bg-gray-500/10 text-gray-400";
  };

  return (
    <Card className="bg-[#1F1F22] border border-[#7C3AED]/20 overflow-hidden hover:shadow-xl hover:shadow-[#7C3AED]/10 transition-all duration-300 hover:border-[#7C3AED]/40 group">
      <CardHeader className="p-4 border-b border-[#7C3AED]/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="p-2 rounded-full bg-[#7C3AED]/10">
              <User className="h-4 w-4 text-[#A78BFA]" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-[#F4F4F5] truncate">
                {cv.user_name}
              </h3>
              <p className="text-xs text-[#F4F4F5]/60 truncate">
                {cv.user_email}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-[#F4F4F5]/40" />
                <span className="text-xs text-[#F4F4F5]/40">
                  {formatDate(cv.created_at)}
                </span>
              </div>
            </div>
          </div>
          <Badge
            className={`text-xs px-2 py-1 ${getTemplateColor(
              cv.template || "standard"
            )}`}
          >
            {cv.template || "Estándar"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Vista previa del CV */}
        <div className="relative aspect-[3/4] bg-white overflow-hidden">
          <div className="absolute inset-0 p-2">
            <div className="w-full h-full bg-white rounded shadow-sm overflow-hidden">
              <PDFViewer className="scale-[0.25] origin-top-left w-[400%] h-[400%]">
                <DocumentoCV cv={cv.cv_data} template={cv.template} />
              </PDFViewer>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F1F22]/80"></div>

          {/* Overlay con acciones */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-[#7C3AED] hover:bg-[#7C3AED]/80"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-full bg-[#1F1F22] border-[#7C3AED]/20">
                  <DialogHeader>
                    <DialogTitle className="text-[#F4F4F5]">
                      CV de {cv.user_name} - {cv.template || "Estándar"}
                    </DialogTitle>
                  </DialogHeader>
                  <PDFViewer className="overflow-auto bg-white rounded">
                    <DocumentoCV cv={cv.cv_data} template={cv.template} />
                  </PDFViewer>
                </DialogContent>
              </Dialog>

              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="p-4">
          <div className="text-sm text-[#F4F4F5]/70">
            <p className="font-medium truncate">
              {cv.cv_data?.nombre || "Sin nombre"}
            </p>
            <p className="text-xs truncate">
              {cv.cv_data?.titulo || "Sin título profesional"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
