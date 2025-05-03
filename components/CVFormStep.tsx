"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  puesto: z.string().min(1, "El puesto es obligatorio"),
  contacto: z.string().min(1, "La información de contacto es obligatoria"),
  sobreMi: z.string().min(10, "Describe un poco sobre ti"),
  experiencia: z.string().min(20, "Describe tu experiencia profesional"),
  formacion: z.string().min(10, "Describe tu formación académica"),
  habilidades: z.string().min(1, "Incluye al menos una habilidad"),
  idiomas: z.string().min(1, "Incluye al menos un idioma"),
  informacionAdicional: z.string().optional(),
});

type Props = {
  setCvData: (data: RespuestaCV["cv"]) => void;
  setActiveTab: (value: string) => void;
  selectedTemplate: string;
};

export default function CVFormStep({ setCvData, setActiveTab }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: DatosCVFormulario) => {
    try {
      setIsGenerating(true);
      setError(null);

      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const msg =
          res.status === 504
            ? "La generación está tardando demasiado. Intenta de nuevo."
            : await res.text();
        throw new Error(`Error al generar CV: ${msg}`);
      }

      const json = (await res.json()) as RespuestaCV;
      setCvData(json.cv);
      setActiveTab("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
      {/* Nombre y puesto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-white">Nombre completo</label>
          <input
            {...register("nombre")}
            className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
            placeholder="Ej: Juan Pérez"
          />
          {errors.nombre && (
            <p className="text-red-400 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm text-white">Puesto profesional</label>
          <input
            {...register("puesto")}
            className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
            placeholder="Ej: Desarrollador Frontend"
          />
          {errors.puesto && (
            <p className="text-red-400 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.puesto.message}
            </p>
          )}
        </div>
      </div>

      {/* Contacto */}
      <div>
        <label className="text-sm text-white">Contacto (email, teléfono)</label>
        <input
          {...register("contacto")}
          className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
          placeholder="Ej: juan.perez@example.com, +54 9 387 1234567"
        />
        {errors.contacto && (
          <p className="text-red-400 text-xs mt-1 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.contacto.message}
          </p>
        )}
      </div>

      {/* Sobre mí */}
      <div>
        <label className="text-sm text-white">Sobre mí</label>
        <textarea
          {...register("sobreMi")}
          rows={3}
          className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
          placeholder="Desarrollador frontend con 5 años de experiencia..."
        />
        {errors.sobreMi && (
          <p className="text-red-400 text-xs mt-1 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.sobreMi.message}
          </p>
        )}
      </div>

      {/* Experiencia */}
      <div>
        <label className="text-sm text-white">Experiencia</label>
        <textarea
          {...register("experiencia")}
          rows={4}
          className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
          placeholder="Frontend Lead; Acme Inc; Ene 2021–Dic 2023; Lideré migración a React..."
        />
        {errors.experiencia && (
          <p className="text-red-400 text-xs mt-1 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.experiencia.message}
          </p>
        )}
      </div>

      {/* Formación */}
      <div>
        <label className="text-sm text-white">Formación</label>
        <textarea
          {...register("formacion")}
          rows={3}
          className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
          placeholder="Universidad Nacional de Salta; Lic. en Sistemas; 2016–2020"
        />
        {errors.formacion && (
          <p className="text-red-400 text-xs mt-1 flex items-center">
            <AlertCircle className="w-3 h-3 mr-1" />
            {errors.formacion.message}
          </p>
        )}
      </div>

      {/* Habilidades e Idiomas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="text-sm text-white">Habilidades</label>
          <input
            {...register("habilidades")}
            className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
            placeholder="React, Next.js, Tailwind"
          />
          {errors.habilidades && (
            <p className="text-red-400 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.habilidades.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm text-white">Idiomas</label>
          <input
            {...register("idiomas")}
            className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
            placeholder="Español, Inglés"
          />
          {errors.idiomas && (
            <p className="text-red-400 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {errors.idiomas.message}
            </p>
          )}
        </div>
      </div>

      {/* Información adicional */}
      <div>
        <label className="text-sm text-white">Información adicional</label>
        <textarea
          {...register("informacionAdicional")}
          rows={2}
          className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46]"
          placeholder="Certificaciones, publicaciones..."
        />
      </div>

      {/* Error general */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
          <p className="flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            {error}
          </p>
        </div>
      )}

      {/* Botón de generar */}
      <Button
        variant="link"
        type="submit"
        disabled={isSubmitting || isGenerating}
        className="w-full py-5 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-semibold rounded-lg flex items-center justify-center"
      >
        {isSubmitting || isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-1 animate-spin" />
            Generando...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-1" />
            Generar CV
          </>
        )}
      </Button>
    </form>
  );
}
