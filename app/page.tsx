"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import type { CVResponse } from "@/lib/types/cv";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";

const formSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  contact: z.string().min(1),
  about: z.string().min(10, "Sobre mí debe tener al menos 10 caracteres"),
  experience: z.string().min(20),
  education: z.string().min(10),
  skills: z.string().min(1),
  languages: z.string().min(1),
  additional: z.string().optional(),
});
type CVFormData = z.infer<typeof formSchema>;
type TemplateOption = "minimal" | "modern";

export default function CVGeneratorPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CVFormData>({ resolver: zodResolver(formSchema) });

  const [cvResult, setCvResult] = useState<string>("");
  const [template, setTemplate] = useState<TemplateOption>("minimal");
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    // @ts-ignore: runtime OK
    content: () => previewRef.current,
    documentTitle: `CV_${Date.now()}`,
  });

  const exampleData: CVFormData = {
    name: "Juan Pérez",
    title: "Desarrollador Frontend",
    contact: "juan.perez@example.com | +54 9 387 1234567",
    about:
      "Desarrollador frontend con 5 años de experiencia en la creación de aplicaciones web escalables y optimizadas. Apasionado por la tecnología y el aprendizaje continuo.",
    experience:
      "3 años liderando proyectos web con Next.js y React. Optimicé rendimiento en un 30% y reduje tiempos de carga en un 50%.",
    education:
      "Licenciatura en Sistemas de Información – Universidad Nacional de Salta (2016–2020)",
    skills:
      "TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, Supabase, Prisma",
    languages: "Español (nativo), Inglés (B2)",
    additional:
      "Apasionado por la IA y el desarrollo de chatbots. Ponente en la conferencia TechSalta 2024.",
  };

  const onSubmit = async (data: CVFormData) => {
    setCvResult("");
    try {
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      const json: CVResponse = await res.json();
      setCvResult(json.cv);
    } catch {
      setCvResult("❌ Error al generar el CV.");
    }
  };

  const TemplateComponent =
    template === "minimal" ? MinimalTemplate : ModernTemplate;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Generador de CV ATS</h1>

      {/* Botón de prueba: rellena con datos de ejemplo */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => reset(exampleData)}
          className="text-sm "
        >
          Rellenar Ejemplo
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* ... aquí van todos los campos (igual que antes) ... */}
        {/* Nombre */}
        <div>
          <input
            {...register("name")}
            placeholder="Nombre completo"
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        {/* Título */}
        <div>
          <input
            {...register("title")}
            placeholder="Título profesional"
            className={`w-full p-2 border rounded ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("about")}
            placeholder="Sobre mí"
            className={`w-full p-2 border rounded h-24 ${
              errors.about ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.about && (
            <p className="text-sm text-red-600">{errors.about.message}</p>
          )}
        </div>
        {/* Contacto */}
        <div>
          <input
            {...register("contact")}
            placeholder="Contacto (email o teléfono)"
            className={`w-full p-2 border rounded ${
              errors.contact ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contact && (
            <p className="text-sm text-red-600">{errors.contact.message}</p>
          )}
        </div>
        {/* Experiencia */}
        <div>
          <textarea
            {...register("experience")}
            placeholder="Experiencia laboral"
            className={`w-full p-2 border rounded h-28 ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.experience && (
            <p className="text-sm text-red-600">{errors.experience.message}</p>
          )}
        </div>
        {/* Educación */}
        <div>
          <textarea
            {...register("education")}
            placeholder="Educación"
            className={`w-full p-2 border rounded h-24 ${
              errors.education ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.education && (
            <p className="text-sm text-red-600">{errors.education.message}</p>
          )}
        </div>
        {/* Habilidades */}
        <div>
          <textarea
            {...register("skills")}
            placeholder="Habilidades técnicas"
            className={`w-full p-2 border rounded h-24 ${
              errors.skills ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.skills && (
            <p className="text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>
        {/* Idiomas */}
        <div>
          <textarea
            {...register("languages")}
            placeholder="Idiomas"
            className={`w-full p-2 border rounded h-20 ${
              errors.languages ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.languages && (
            <p className="text-sm text-red-600">{errors.languages.message}</p>
          )}
        </div>
        {/* Información adicional */}
        <div>
          <textarea
            {...register("additional")}
            placeholder="Información adicional (opcional)"
            className="w-full p-2 border rounded h-20 border-gray-300"
          />
        </div>
        {/* Selector de plantilla */}
        <div>
          <label className="block mb-1 font-medium">Plantilla</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as TemplateOption)}
            className="w-full p-2 border rounded"
          >
            <option value="minimal">Minimal</option>
            <option value="modern">Moderna</option>
          </select>
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Generando..." : "Generar CV"}
        </button>
      </form>

      {cvResult && (
        <div className="space-y-4 mt-8">
          <TemplateComponent content={cvResult} ref={previewRef} />
          <button
            onClick={() => handlePrint?.()}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            📄 Descargar como PDF
          </button>
        </div>
      )}
    </div>
  );
}
