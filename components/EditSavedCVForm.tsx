"use client";

import dynamic from "next/dynamic";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { RespuestaCV } from "@/lib/types/cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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

interface EditableExperience {
  cargo: string;
  empresa: string;
  fechas: string;
  ubicacion: string;
  logrosText: string;
}

interface EditableEducation {
  titulo: string;
  institucion: string;
  fechas: string;
  ubicacion: string;
}

interface EditableCVState {
  language?: "es" | "en";
  fotoUrl?: string;
  nombre: string;
  puesto: string;
  contactoText: string;
  sobreMi: string;
  experiencia: EditableExperience[];
  formacion: EditableEducation[];
  habilidadesText: string;
  idiomasText: string;
  informacionAdicionalText: string;
}

interface SavedCVResponse {
  cv: {
    id: string;
    cv_data: RespuestaCV["cv"];
    template: string | null;
    status: string;
  };
}

const templateOptions = [
  { value: "elegance", label: "Elegante" },
  { value: "harvard", label: "Harvard" },
  { value: "blue", label: "Azul Corporativo" },
  { value: "purple", label: "Purpura Pro" },
  { value: "green", label: "Verde Energia" },
];

const emptyExperience: EditableExperience = {
  cargo: "",
  empresa: "",
  fechas: "",
  ubicacion: "",
  logrosText: "",
};

const emptyEducation: EditableEducation = {
  titulo: "",
  institucion: "",
  fechas: "",
  ubicacion: "",
};

function joinLines(items: string[]) {
  return items.filter(Boolean).join("\n");
}

function splitLines(value: string, maxItems?: number) {
  const items = value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  return typeof maxItems === "number" ? items.slice(0, maxItems) : items;
}

function cvToFormState(cv: RespuestaCV["cv"]): EditableCVState {
  return {
    language: cv.language,
    fotoUrl: cv.foto_url,
    nombre: cv.nombre,
    puesto: cv.puesto,
    contactoText: joinLines(cv.contacto),
    sobreMi: cv.sobreMi,
    experiencia:
      cv.experiencia.length > 0
        ? cv.experiencia.map((item) => ({
            cargo: item.cargo,
            empresa: item.empresa,
            fechas: item.fechas,
            ubicacion: item.ubicacion,
            logrosText: joinLines(item.logros),
          }))
        : [emptyExperience],
    formacion: cv.formacion.map((item) => ({
      titulo: item.titulo,
      institucion: item.institucion,
      fechas: item.fechas,
      ubicacion: item.ubicacion,
    })),
    habilidadesText: joinLines(cv.habilidades),
    idiomasText: joinLines(cv.idiomas),
    informacionAdicionalText: joinLines(cv.informacionAdicional),
  };
}

function formStateToCv(form: EditableCVState): RespuestaCV["cv"] {
  return {
    language: form.language,
    foto_url: form.fotoUrl,
    nombre: form.nombre.trim(),
    puesto: form.puesto.trim(),
    contacto: splitLines(form.contactoText, 8),
    sobreMi: form.sobreMi.trim(),
    experiencia: form.experiencia.slice(0, 8).map((item) => ({
      cargo: item.cargo.trim(),
      empresa: item.empresa.trim(),
      fechas: item.fechas.trim(),
      ubicacion: item.ubicacion.trim(),
      logros: splitLines(item.logrosText, 4),
    })),
    formacion: form.formacion.slice(0, 6).map((item) => ({
      titulo: item.titulo.trim(),
      institucion: item.institucion.trim(),
      fechas: item.fechas.trim(),
      ubicacion: item.ubicacion.trim(),
    })),
    habilidades: splitLines(form.habilidadesText, 32),
    idiomas: splitLines(form.idiomasText, 8),
    informacionAdicional: splitLines(form.informacionAdicionalText, 8),
  };
}

export function EditSavedCVForm({ cvId }: EditSavedCVFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<EditableCVState | null>(null);
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
      const safeTemplate = templateOptions.some(
        (option) => option.value === savedTemplate,
      )
        ? savedTemplate
        : "elegance";

      setForm(cvToFormState(data.cv.cv_data));
      setTemplate(safeTemplate);
      setIsLoading(false);
    }

    void loadCv();

    return () => {
      isMounted = false;
    };
  }, [cvId, router]);

  const previewCv = useMemo(() => (form ? formStateToCv(form) : null), [form]);

  const updateField = (field: keyof EditableCVState, value: string) => {
    setForm((current) => (current ? { ...current, [field]: value } : current));
  };

  const updateExperience = (
    index: number,
    field: keyof EditableExperience,
    value: string,
  ) => {
    setForm((current) =>
      current
        ? {
            ...current,
            experiencia: current.experiencia.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          }
        : current,
    );
  };

  const updateEducation = (
    index: number,
    field: keyof EditableEducation,
    value: string,
  ) => {
    setForm((current) =>
      current
        ? {
            ...current,
            formacion: current.formacion.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          }
        : current,
    );
  };

  const addExperience = () => {
    setForm((current) =>
      current && current.experiencia.length < 8
        ? {
            ...current,
            experiencia: [...current.experiencia, { ...emptyExperience }],
          }
        : current,
    );
  };

  const removeExperience = (index: number) => {
    setForm((current) =>
      current && current.experiencia.length > 1
        ? {
            ...current,
            experiencia: current.experiencia.filter((_, itemIndex) => itemIndex !== index),
          }
        : current,
    );
  };

  const addEducation = () => {
    setForm((current) =>
      current && current.formacion.length < 6
        ? { ...current, formacion: [...current.formacion, { ...emptyEducation }] }
        : current,
    );
  };

  const removeEducation = (index: number) => {
    setForm((current) =>
      current
        ? {
            ...current,
            formacion: current.formacion.filter((_, itemIndex) => itemIndex !== index),
          }
        : current,
    );
  };

  const handleSave = async () => {
    if (!previewCv) return;

    setIsSaving(true);

    try {
      const res = await fetch(`/api/cvs/${cvId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData: previewCv, template }),
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
              Ajusta contenido, cambia plantilla y guarda una nueva version sin
              volver a pagar.
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

        <Card className="border-white/10 bg-[#15151A]/85 text-white">
          <CardHeader>
            <CardTitle>Datos principales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo">
                <Input
                  value={form.nombre}
                  onChange={(event) => updateField("nombre", event.target.value)}
                  className="border-white/10 bg-[#0F0F10] text-white"
                />
              </Field>
              <Field label="Puesto objetivo">
                <Input
                  value={form.puesto}
                  onChange={(event) => updateField("puesto", event.target.value)}
                  className="border-white/10 bg-[#0F0F10] text-white"
                />
              </Field>
            </div>

            <Field label="Plantilla">
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="border-white/10 bg-[#0F0F10] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#18181D] text-white">
                  {templateOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Contacto">
              <Textarea
                value={form.contactoText}
                onChange={(event) => updateField("contactoText", event.target.value)}
                rows={4}
                className="border-white/10 bg-[#0F0F10] text-white"
                placeholder="Ciudad&#10;email@dominio.com&#10;+54 9 ...&#10;LinkedIn o GitHub"
              />
            </Field>

            <Field label="Perfil profesional">
              <Textarea
                value={form.sobreMi}
                onChange={(event) => updateField("sobreMi", event.target.value)}
                rows={5}
                className="border-white/10 bg-[#0F0F10] text-white"
              />
            </Field>
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#15151A]/85 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Experiencia</CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={addExperience}
              disabled={form.experiencia.length >= 8}
              className="border-white/10 bg-[#0F0F10] text-white hover:bg-white/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {form.experiencia.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#0F0F10]/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white/78">
                    Experiencia {index + 1}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeExperience(index)}
                    disabled={form.experiencia.length <= 1}
                    className="h-9 text-white/55 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Cargo">
                    <Input
                      value={item.cargo}
                      onChange={(event) =>
                        updateExperience(index, "cargo", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Empresa">
                    <Input
                      value={item.empresa}
                      onChange={(event) =>
                        updateExperience(index, "empresa", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Fechas">
                    <Input
                      value={item.fechas}
                      onChange={(event) =>
                        updateExperience(index, "fechas", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Ubicacion">
                    <Input
                      value={item.ubicacion}
                      onChange={(event) =>
                        updateExperience(index, "ubicacion", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label="Logros o tareas">
                    <Textarea
                      value={item.logrosText}
                      onChange={(event) =>
                        updateExperience(index, "logrosText", event.target.value)
                      }
                      rows={4}
                      className="border-white/10 bg-[#111113] text-white"
                      placeholder="Un logro o tarea por linea. Maximo 4."
                    />
                  </Field>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#15151A]/85 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Formacion</CardTitle>
            <Button
              type="button"
              variant="outline"
              onClick={addEducation}
              disabled={form.formacion.length >= 6}
              className="border-white/10 bg-[#0F0F10] text-white hover:bg-white/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            {form.formacion.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#0F0F10]/70 p-4"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white/78">
                    Formacion {index + 1}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeEducation(index)}
                    className="h-9 text-white/55 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Titulo">
                    <Input
                      value={item.titulo}
                      onChange={(event) =>
                        updateEducation(index, "titulo", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Institucion">
                    <Input
                      value={item.institucion}
                      onChange={(event) =>
                        updateEducation(index, "institucion", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Fechas">
                    <Input
                      value={item.fechas}
                      onChange={(event) =>
                        updateEducation(index, "fechas", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                  <Field label="Ubicacion">
                    <Input
                      value={item.ubicacion}
                      onChange={(event) =>
                        updateEducation(index, "ubicacion", event.target.value)
                      }
                      className="border-white/10 bg-[#111113] text-white"
                    />
                  </Field>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-[#15151A]/85 text-white">
          <CardHeader>
            <CardTitle>Habilidades, idiomas y extras</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field label="Habilidades">
              <Textarea
                value={form.habilidadesText}
                onChange={(event) => updateField("habilidadesText", event.target.value)}
                rows={5}
                className="border-white/10 bg-[#0F0F10] text-white"
                placeholder="Una habilidad por linea."
              />
            </Field>
            <Field label="Idiomas">
              <Textarea
                value={form.idiomasText}
                onChange={(event) => updateField("idiomasText", event.target.value)}
                rows={3}
                className="border-white/10 bg-[#0F0F10] text-white"
                placeholder="Espanol nativo&#10;Ingles B2"
              />
            </Field>
            <Field label="Informacion adicional">
              <Textarea
                value={form.informacionAdicionalText}
                onChange={(event) =>
                  updateField("informacionAdicionalText", event.target.value)
                }
                rows={4}
                className="border-white/10 bg-[#0F0F10] text-white"
                placeholder="Portfolio, certificaciones, disponibilidad o links."
              />
            </Field>
          </CardContent>
        </Card>
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-white/72">{label}</Label>
      {children}
    </div>
  );
}
