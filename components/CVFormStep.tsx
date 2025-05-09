"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  AlertCircle,
  User,
  Briefcase,
  Mail,
  FileText,
  GraduationCap,
  Code,
  Globe,
  PlusCircle,
  BookOpen,
  Star,
  CheckCircle2,
} from "lucide-react";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

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
  template: string;
};

export default function CVFormStep({
  setCvData,
  setActiveTab,
  template,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue, // 👈 necesario para autocompletar
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
        body: JSON.stringify({ ...data, template }),
        cache: "no-store",
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
  const rellenarDatosPrueba = () => {
    setValue("nombre", "Sebastián Burgos");
    setValue("puesto", "Desarrollador Frontend");
    setValue("contacto", "sebastian.burgos.dev@gmail.com, +54 9 387 6543210");
    setValue(
      "sobreMi",
      "Desarrollador frontend con más de 5 años de experiencia creando interfaces modernas, rápidas y accesibles. Especializado en React, TypeScript y herramientas de diseño UI/UX. Comprometido con buenas prácticas, rendimiento y experiencia del usuario."
    );
    setValue(
      "experiencia",
      `Desarrollador Frontend en VitaeSpark, Salta, 2022–2025 - Lideré el desarrollo de una plataforma de generación de CVs con inteligencia artificial usando React, Next.js y Supabase.
Diseñador Web en Agencia Creativa Salta, Salta, 2020–2022 - Rediseñé sitios corporativos, optimicé la experiencia de usuario y trabajé en posicionamiento SEO.
Pasante en Secretaría de Modernización, Gobierno de Salta, 2019–2020 - Colaboré en la digitalización de trámites administrativos y desarrollé formularios internos interactivos.`
    );
    setValue(
      "formacion",
      `Universidad Nacional de Salta, Licenciatura en Sistemas, Salta, 2016–2021 - Formación sólida en programación, estructuras de datos y arquitectura de software.
Instituto Chaucer, Inglés Avanzado, Salta, 2007–2017 - 10 años de formación integral en idioma inglés con orientación académica.
Escuela Técnica N° 3, Bachiller Técnico en Informática, Salta, 2010–2015 - Enfoque práctico en redes, hardware y desarrollo básico de software.`
    );
    setValue(
      "habilidades",
      "React, Next.js, TypeScript, TailwindCSS, Supabase, Git, Figma, Node.js"
    );
    setValue("idiomas", "Español: Nativo, Inglés: Avanzado (C1)");
    setValue(
      "informacionAdicional",
      "Certificación en Desarrollo Web Frontend (Coderhouse), Curso intensivo de UI/UX (Platzi), Participación en hackathons de diseño web en Salta y Tucumán."
    );
  };

  return (
    <div className="relative">
      {/* Fondo decorativo */}
      {/* <div className="absolute inset-0  rounded-xl -z-10 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 rounded-xl -z-10"></div> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-8 p-2 rounded-xl "
      >
        {/* <div className="w-full flex items-center justify-center ">
          <Button
            type="button"
            onClick={rellenarDatosPrueba}
            variant="default"
            className="mb-4 text-sm "
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#7C3AED]" />
            Rellenar con datos de prueba
          </Button>
        </div> */}

        {/* Sección de información personal */}
        <div className="bg-[#2A2A2D]/50 p-5 rounded-lg border border-[#3F3F46]/30">
          {/* Nombre y puesto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                Nombre completo
              </label>
              <div className="relative">
                <input
                  {...register("nombre")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              {errors.nombre && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                Puesto profesional
              </label>
              <div className="relative">
                <input
                  {...register("puesto")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="Ej: Desarrollador Frontend"
                />
              </div>
              {errors.puesto && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.puesto.message}
                </p>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className="mt-5">
            <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Contacto (email, teléfono)
            </label>
            <div className="relative">
              <input
                {...register("contacto")}
                className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Ej: juan.perez@example.com, +54 9 387 1234567"
              />
            </div>
            {errors.contacto && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.contacto.message}
              </p>
            )}
          </div>
        </div>

        {/* Sección de perfil */}
        <div className="bg-[#2A2A2D]/50 p-5 rounded-lg border border-[#3F3F46]/30">
          {/* Sobre mí */}
          <div>
            <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Sobre mí
            </label>
            <div className="relative">
              <textarea
                {...register("sobreMi")}
                rows={3}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Desarrollador frontend con 5 años de experiencia..."
              />
            </div>
            {errors.sobreMi && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.sobreMi.message}
              </p>
            )}
          </div>
        </div>

        {/* Sección de experiencia y formación */}
        <div className="bg-[#2A2A2D]/50 p-5 rounded-lg border border-[#3F3F46]/30">
          {/* Experiencia */}
          <div className="mb-5">
            <label className="text-sm font-medium text-white/90 flex items-center">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Experiencia
            </label>
            <Card className="text-sm uppercase italic text-white bg-transparent border-0">
              <p>
                Escribí la experiencia laboral de forma clara y natural,
                separando con comas los siguientes datos:{" "}
                <strong>puesto, empresa, ubicación y fechas</strong>.
              </p>
            </Card>
            <div className="relative">
              <textarea
                {...register("experiencia")}
                rows={7}
                className="w-full bg-[#2A2A2D] text-white p-3  rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder={`Frontend Developer en VitaeSpark, Salta argentina, desde el 2022 hasta el 2025 - Creación de una app de CVs con IA usando React.`}
              />
            </div>
            {errors.experiencia && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.experiencia.message}
              </p>
            )}
          </div>

          {/* Formación */}
          <div>
            <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Formación
            </label>
            <div className="relative">
              <textarea
                {...register("formacion")}
                rows={3}
                className="w-full bg-[#2A2A2D] text-white p-3  rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Estudie en laUniversidad Nacional de Salta, Lic. en Sistemas desde el 2016–2020, tambien estudie ingles en el instituto..."
              />
            </div>
            {errors.formacion && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.formacion.message}
              </p>
            )}
          </div>
        </div>

        {/* Sección de habilidades e idiomas */}
        <div className="bg-[#2A2A2D]/50 p-5 rounded-lg border border-[#3F3F46]/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
                <Code className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                Habilidades
              </label>
              <div className="relative">
                <input
                  {...register("habilidades")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="React, Next.js, Tailwind"
                />
              </div>
              {errors.habilidades && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.habilidades.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-white/90 mb-1.5 flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                Idiomas
              </label>
              <div className="relative">
                <input
                  {...register("idiomas")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="Español: Nativo, Inglés Avanzado"
                />
              </div>
              {errors.idiomas && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.idiomas.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-[#2A2A2D]/50 p-5 rounded-lg border border-[#3F3F46]/30">
          <div>
            <label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Información adicional
            </label>
            <div className="relative">
              <textarea
                {...register("informacionAdicional")}
                rows={2}
                className="w-full bg-[#2A2A2D] text-white p-3  rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Certificaciones, publicaciones..."
              />
            </div>
          </div>
        </div>

        {/* Error general */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-sm text-red-400 animate-pulse">
            <p className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </p>
          </div>
        )}
        <div></div>
        {/* Botón de generar */}
        <Button
          variant="link"
          type="submit"
          disabled={isSubmitting || isGenerating}
          className="w-full py-6 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-semibold rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          {isSubmitting || isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generar CV
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
