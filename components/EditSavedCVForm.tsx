"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import type { RespuestaCV } from "@/lib/types/cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { validateEditedCv } from "@/lib/cv-content";
import { CVContentEditor } from "@/components/CVContentEditor";
import { getCvTemplate, isCvTemplateId } from "@/lib/cv-templates";

const PDFViewerPane = dynamic(() => import("@/components/pdf/PDFViewerPane"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl bg-white text-sm text-slate-500">
      Preparando vista previa...
    </div>
  ),
});

interface EditSavedCVFormProps {
  cvId: string;
}

interface SavedCVResponse {
  cv: {
    id: string;
    cv_data: RespuestaCV["cv"];
    template: string | null;
    status: string;
  };
}

function getTemplateLabel(value: string) {
  return getCvTemplate(value).shortName;
}

export function EditSavedCVForm({ cvId }: EditSavedCVFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<RespuestaCV["cv"] | null>(null);
  const [template, setTemplate] = useState("elegance");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCv() {
      setIsLoading(true);

      const res = await fetch(`/api/cvs/${cvId}`);

      if (!isMounted) return;

      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      if (!res.ok) {
        toast.error("No se pudo cargar este CV.");
        router.replace("/perfil");
        return;
      }

      const data = (await res.json()) as SavedCVResponse;
      const savedTemplate = data.cv.template || "elegance";
      const safeTemplate = isCvTemplateId(savedTemplate)
        ? savedTemplate
        : "elegance";

      setForm(data.cv.cv_data);
      setTemplate(safeTemplate);
      setIsLoading(false);
    }

    void loadCv();

    return () => {
      isMounted = false;
    };
  }, [cvId, router]);

  const previewCv = form;

  const handleSave = async () => {
    if (!previewCv) return;

    const edited = validateEditedCv(previewCv);
    if (!edited.success) {
      toast.error("Revisá los campos obligatorios y los límites de texto.");
      return;
    }
    setIsSaving(true);

    try {
      const res = await fetch(`/api/cvs/${cvId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: edited.data, template }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error guardando CV:", data);
        toast.error(data.error || "No se pudieron guardar los cambios.");
        return;
      }

      toast.success("CV actualizado. Ya podes descargar la nueva version.");
      router.push("/perfil");
    } catch (error) {
      console.error("Error guardando CV:", error);
      toast.error("No se pudieron guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !form || !previewCv) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#15151A] px-5 py-4 text-white">
          <Loader2 className="h-5 w-5 animate-spin text-[#A78BFA]" />
          Cargando editor...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_430px]">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#15151A]/85 p-5 text-white shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => router.push("/perfil")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al perfil
            </button>
            <h1 className="text-2xl font-bold sm:text-3xl">Edita tu CV guardado</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/62">
              Ajusta el contenido y guarda una nueva version con la misma
              plantilla comprada.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 rounded-2xl bg-[#7C3AED] px-5 text-sm font-bold text-white hover:bg-[#6D28D9]"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar cambios
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-white/62">Plantilla: {getTemplateLabel(template)}. La plantilla queda fija para este CV.</p>
        <CVContentEditor value={form} onChange={setForm} />
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <Card className="overflow-hidden border-white/10 bg-[#15151A]/85 text-white shadow-2xl shadow-black/20">
          <CardHeader>
            <CardTitle>Vista previa</CardTitle>
            <p className="text-sm leading-6 text-white/58">
              Los cambios se reflejan antes de guardar.
            </p>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/30">
              <PDFViewerPane
                cv={previewCv}
                template={template}
                className="h-full w-full border-0"
              />
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
