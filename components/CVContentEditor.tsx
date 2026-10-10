"use client";

import type React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { RespuestaCV } from "@/lib/types/cv";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  return items.join("\n");
}

function splitLines(value: string) {
  return value === "" ? [] : value.split(/\r?\n/);
}

function cvToFormState(cv: RespuestaCV["cv"]): EditableCVState {
  return {
    language: cv.language,
    fotoUrl: cv.foto_url,
    nombre: cv.nombre,
    puesto: cv.puesto,
    contactoText: joinLines(cv.contacto),
    sobreMi: cv.sobreMi,
    experiencia: cv.experiencia.map((item) => ({
      cargo: item.cargo,
      empresa: item.empresa,
      fechas: item.fechas,
      ubicacion: item.ubicacion,
      logrosText: joinLines(item.logros),
    })),
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
    nombre: form.nombre,
    puesto: form.puesto,
    contacto: splitLines(form.contactoText),
    sobreMi: form.sobreMi,
    experiencia: form.experiencia.map((item) => ({
      cargo: item.cargo,
      empresa: item.empresa,
      fechas: item.fechas,
      ubicacion: item.ubicacion,
      logros: splitLines(item.logrosText),
    })),
    formacion: form.formacion.map((item) => ({
      titulo: item.titulo,
      institucion: item.institucion,
      fechas: item.fechas,
      ubicacion: item.ubicacion,
    })),
    habilidades: splitLines(form.habilidadesText),
    idiomas: splitLines(form.idiomasText),
    informacionAdicional: splitLines(form.informacionAdicionalText),
  };
}

export function CVContentEditor({ value, onChange, language = value.language ?? "es" }: {
  value: RespuestaCV["cv"];
  onChange: (cv: RespuestaCV["cv"]) => void;
  language?: "es" | "en";
}) {
  const en = language === "en";
  const form = cvToFormState(value);
  const setForm = (update: (current: EditableCVState) => EditableCVState) => {
    onChange({ ...value, ...formStateToCv(update(form)) });
  };
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
      current && current.experiencia.length > 0
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

  return (
    <div className="space-y-5">
      <Card className="border-white/10 bg-[#15151A]/85 text-white">
        <CardHeader>
          <CardTitle>{en ? "Main details" : "Datos principales"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={en ? "Full name" : "Nombre completo"}>
              <Input
                value={form.nombre}
                onChange={(event) => updateField("nombre", event.target.value)}
                className="border-white/10 bg-[#0F0F10] text-white"
              />
            </Field>
            <Field label={en ? "Target role" : "Puesto objetivo"}>
              <Input
                value={form.puesto}
                onChange={(event) => updateField("puesto", event.target.value)}
                className="border-white/10 bg-[#0F0F10] text-white"
              />
            </Field>
          </div>

          <Field label={en ? "Contact" : "Contacto"}>
            <Textarea
              value={form.contactoText}
              onChange={(event) => updateField("contactoText", event.target.value)}
              rows={4}
              className="border-white/10 bg-[#0F0F10] text-white"
              placeholder={en ? "City\nemail@example.com\nPhone\nLinkedIn or GitHub" : "Ciudad\nemail@dominio.com\n+54 9 ...\nLinkedIn o GitHub"}
            />
          </Field>

          <Field label={en ? "Professional summary" : "Perfil profesional"}>
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
          <CardTitle>{en ? "Experience" : "Experiencia"}</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            disabled={form.experiencia.length >= 8}
            className="border-white/10 bg-[#0F0F10] text-white hover:bg-white/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            {en ? "Add" : "Agregar"}
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
                  {en ? "Experience" : "Experiencia"} {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeExperience(index)}
                  className="h-9 text-white/55 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 aria-label={en ? "Remove" : "Eliminar"} className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={en ? "Role" : "Cargo"}>
                  <Input
                    value={item.cargo}
                    onChange={(event) =>
                      updateExperience(index, "cargo", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Company" : "Empresa"}>
                  <Input
                    value={item.empresa}
                    onChange={(event) =>
                      updateExperience(index, "empresa", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Dates" : "Fechas"}>
                  <Input
                    value={item.fechas}
                    onChange={(event) =>
                      updateExperience(index, "fechas", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Location" : "Ubicación"}>
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
                <Field label={en ? "Achievements or tasks" : "Logros o tareas"}>
                  <Textarea
                    value={item.logrosText}
                    onChange={(event) =>
                      updateExperience(index, "logrosText", event.target.value)
                    }
                    rows={4}
                    className="border-white/10 bg-[#111113] text-white"
                    placeholder={en ? "One achievement or task per line. Maximum 4." : "Un logro o tarea por linea. Maximo 4."}
                  />
                </Field>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-[#15151A]/85 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{en ? "Education" : "Formación"}</CardTitle>
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            disabled={form.formacion.length >= 6}
            className="border-white/10 bg-[#0F0F10] text-white hover:bg-white/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            {en ? "Add" : "Agregar"}
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
                  {en ? "Education" : "Formación"} {index + 1}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => removeEducation(index)}
                  className="h-9 text-white/55 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 aria-label={en ? "Remove" : "Eliminar"} className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={en ? "Degree" : "Título"}>
                  <Input
                    value={item.titulo}
                    onChange={(event) =>
                      updateEducation(index, "titulo", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Institution" : "Institución"}>
                  <Input
                    value={item.institucion}
                    onChange={(event) =>
                      updateEducation(index, "institucion", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Dates" : "Fechas"}>
                  <Input
                    value={item.fechas}
                    onChange={(event) =>
                      updateEducation(index, "fechas", event.target.value)
                    }
                    className="border-white/10 bg-[#111113] text-white"
                  />
                </Field>
                <Field label={en ? "Location" : "Ubicación"}>
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
          <CardTitle>{en ? "Skills, languages and additional information" : "Habilidades, idiomas y extras"}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label={en ? "Skills" : "Habilidades"}>
            <Textarea
              value={form.habilidadesText}
              onChange={(event) => updateField("habilidadesText", event.target.value)}
              rows={5}
              className="border-white/10 bg-[#0F0F10] text-white"
              placeholder={en ? "One skill per line." : "Una habilidad por linea."}
            />
          </Field>
          <Field label={en ? "Languages" : "Idiomas"}>
            <Textarea
              value={form.idiomasText}
              onChange={(event) => updateField("idiomasText", event.target.value)}
              rows={3}
              className="border-white/10 bg-[#0F0F10] text-white"
              placeholder={en ? "Native Spanish\nEnglish B2" : "Espanol nativo\nIngles B2"}
            />
          </Field>
          <Field label={en ? "Additional information" : "Información adicional"}>
            <Textarea
              value={form.informacionAdicionalText}
              onChange={(event) =>
                updateField("informacionAdicionalText", event.target.value)
              }
              rows={4}
              className="border-white/10 bg-[#0F0F10] text-white"
              placeholder={en ? "Portfolio, certifications, availability or links." : "Portfolio, certificaciones, disponibilidad o links."}
            />
          </Field>
        </CardContent>
      </Card>
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
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-white/72">{label}</span>
      {children}
    </label>
  );
}
