"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
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
import { createClient } from "@/utils/supabase/client";
import { DocumentoCV } from "@/components/pdf/CVDocument";

import { PDFViewer } from "@react-pdf/renderer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // 12 CVs per page for a nice grid layout

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) return router.push("/login");

        setUser(user);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("isadmin")
          .eq("id", user.id)
          .single();

        if (profileError || !profile?.isadmin) {
          setError("No tienes permisos para acceder a esta página");
          return setTimeout(() => router.push("/"), 3000);
        }

        await loadCVs();
      } catch (err) {
        console.error("Error al cargar datos de usuario:", err);
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [router, supabase]);

  const loadCVs = async () => {
    try {
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const enriched = data.map((cv: any) => ({
        ...cv,
        user_name: cv.profiles?.name || "Usuario desconocido",
        user_email: cv.profiles?.email || "Email no disponible",
      }));

      setCvs(enriched);
    } catch (err) {
      console.error("Error al cargar CVs:", err);
      setError("Error al cargar los CVs");
    }
  };

  const filteredCvs = useMemo(() => {
    return cvs.filter((cv) => {
      const matchesTemplate =
        selectedTemplate === "all" || cv.template === selectedTemplate;
      const matchesSearch = [
        cv.user_name,
        cv.user_email,
        cv.cv_data?.nombre,
        cv.cv_data?.titulo,
      ]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesTemplate && matchesSearch;
    });
  }, [cvs, selectedTemplate, searchTerm]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filteredCvs.length]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredCvs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCvs = filteredCvs.slice(startIndex, endIndex);

    return { totalPages, paginatedCvs };
  }, [filteredCvs, currentPage, itemsPerPage]);

  const { totalPages, paginatedCvs } = paginationData;

  const uniqueTemplates = useMemo(
    () => Array.from(new Set(cvs.map((cv) => cv.template).filter(Boolean))),
    [cvs]
  );

  const handleSearchChange = useCallback((e: any) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTemplateChange = useCallback((value: string) => {
    setSelectedTemplate(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedTemplate("all");
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  if (loading)
    return (
      <main className="bg-[#0F0F10] min-h-screen flex justify-center items-center text-[#F4F4F5]">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#7C3AED] rounded-full mx-auto mb-4" />
          <p>Cargando currículums...</p>
        </div>
      </main>
    );

  if (error)
    return (
      <main className="bg-[#0F0F10] min-h-screen flex justify-center items-center">
        <Alert className="bg-red-900/20 border-red-500/50 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-200">{error}</AlertDescription>
        </Alert>
      </main>
    );

  return (
    <main className="bg-[#0F0F10] min-h-screen py-12 px-4 text-[#F4F4F5]">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-[#7C3AED] mb-2">
            Currículums Generados
          </h1>
          <p className="text-[#F4F4F5]/70">
            Visualiza y gestiona todos los CVs creados por los usuarios en la
            plataforma.
          </p>
          <div className="mt-4 text-sm text-[#F4F4F5]/60 flex gap-2">
            <span>Total: {cvs.length}</span>
            <span>•</span>
            <span>Filtrados: {filteredCvs.length}</span>
            <span>•</span>
            <span>
              Página {currentPage} de {totalPages}
            </span>
          </div>
        </header>

        {/* Controles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F4F4F5]/40" />
            <Input
              placeholder="Buscar por nombre, email o título..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5] placeholder:text-[#F4F4F5]/40"
            />
          </div>

          <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
            <SelectTrigger className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]">
              <SelectValue placeholder="Filtrar por plantilla" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]">
              <SelectItem value="all">Todas las plantillas</SelectItem>
              {uniqueTemplates.map((tpl) => (
                <SelectItem key={tpl} value={tpl}>
                  {tpl.charAt(0).toUpperCase() + tpl.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5] hover:bg-[#7C3AED]/10"
          >
            <Filter className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>

        {filteredCvs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedCvs.map((cv) => (
                <CVCard key={cv.id} cv={cv} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1)
                            handlePageChange(currentPage - 1);
                        }}
                        className={`${
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                        } bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]`}
                      />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(pageNum);
                            }}
                            isActive={currentPage === pageNum}
                            className={`${
                              currentPage === pageNum
                                ? "bg-[#7C3AED] text-white"
                                : "bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5] hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                            }`}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {/* Ellipsis for large page counts */}
                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis className="text-[#F4F4F5]/40" />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages)
                            handlePageChange(currentPage + 1);
                        }}
                        className={`${
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "hover:bg-[#7C3AED]/10 hover:text-[#7C3AED]"
                        } bg-[#1F1F22] border-[#7C3AED]/20 text-[#F4F4F5]`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <FileText className="h-20 w-20 mx-auto text-[#7C3AED]/30 mb-6" />
            <h3 className="text-xl font-medium mb-2">
              {searchTerm || selectedTemplate !== "all"
                ? "No se encontraron CVs"
                : "No hay CVs generados"}
            </h3>
            <p className="text-[#F4F4F5]/60">
              {searchTerm || selectedTemplate !== "all"
                ? "Intenta ajustar los filtros para encontrar resultados."
                : "Aún no se han creado currículums en la plataforma."}
            </p>
            {(searchTerm || selectedTemplate !== "all") && (
              <Button
                onClick={handleClearFilters}
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

const CVCard = memo(({ cv }: { cv: CV }) => {
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
    <Card className="bg-[#1F1F22] border border-[#7C3AED]/20 hover:shadow-[#7C3AED]/10 hover:border-[#7C3AED]/40 transition-all">
      <CardHeader className="p-4 border-b border-[#7C3AED]/10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-full bg-[#7C3AED]/10">
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
              <DocumentoCV cv={cv.cv_data} template={cv.template} />
            </PDFViewer>
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
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

        <div className="p-4 text-sm text-[#F4F4F5]/70">
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

CVCard.displayName = "CVCard";
