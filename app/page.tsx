"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { DocumentoCV } from "@/components/pdf/CVDocument";
import { motion } from "framer-motion";

const schema = z.object({
  nombre: z.string().min(1),
  puesto: z.string().min(1),
  contacto: z.string().min(1),
  sobreMi: z.string().min(10),
  experiencia: z.string().min(20),
  formacion: z.string().min(10),
  habilidades: z.string().min(1),
  idiomas: z.string().min(1),
  informacionAdicional: z.string().optional(),
});

export default function GeneradorCV() {
  const [selectedTemplate, setSelectedTemplate] = useState("purple");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({
    resolver: zodResolver(schema),
  });

  const ejemplo: DatosCVFormulario = {
    nombre: "Juan Pérez",
    puesto: "Desarrollador Frontend",
    contacto: "juan.perez@example.com, +54 9 387 1234567",
    sobreMi: "Desarrollador frontend con 5 años de experiencia...",
    experiencia:
      "Frontend Lead; Acme Inc; Ene 2021–Dic 2023; Lideré migración a React...",
    formacion: "Universidad Nacional de Salta; Lic. en Sistemas; 2016–2020",
    habilidades: "TypeScript, React, Next.js, Tailwind CSS",
    idiomas: "Español – Nativo, Inglés – B2",
    informacionAdicional: "Ponente en TechSalta 2024",
  };

  const templates = [
    { id: "purple", name: "Morado", color: "#7E22CE" },
    { id: "blue", name: "Azul", color: "#1E40AF" },
    { id: "green", name: "Verde", color: "#15803D" },
  ];

  const onSubmit = async (data: DatosCVFormulario) => {
    const res = await fetch("/api/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const fallbackMessage = res.status === 504
        ? "⚠️ La generación está tardando demasiado. Intenta de nuevo en unos segundos."
        : await res.text()
    
      throw new Error(`Error al generar CV: ${res.status} - ${fallbackMessage}`)
    }
    

    const json: RespuestaCV = await res.json();
    setCvData(json.cv);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📝 Generador de CV ATS
      </motion.h1>

      <div className="flex justify-end">
        <button
          onClick={() => reset(ejemplo)}
          className="text-sm text-blue-600 hover:underline"
        >
          Rellenar con ejemplo
        </button>
      </div>

      <div>
        <label className="font-semibold mb-2 block">
          Seleccionar plantilla
        </label>
        <div className="flex gap-4">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={`w-20 h-24 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-sm ${
                selectedTemplate === tpl.id
                  ? "border-black dark:border-white border-4 scale-110"
                  : "border-gray-300"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full mb-2"
                style={{ backgroundColor: tpl.color }}
              />
              {tpl.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {[
          { key: "nombre", label: "Nombre completo" },
          { key: "puesto", label: "Puesto profesional" },
          { key: "contacto", label: "Contacto (email, teléfono)" },
          { key: "sobreMi", label: "Sobre mí" },
          {
            key: "experiencia",
            label: "Experiencia (Cargo;Empresa;Fechas;Logros)",
          },
          { key: "formacion", label: "Formación (Institución;Título;Fechas)" },
          { key: "habilidades", label: "Habilidades (separadas por comas)" },
          { key: "idiomas", label: "Idiomas (separados por comas)" },
          {
            key: "informacionAdicional",
            label: "Información adicional (opcional)",
          },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="block font-medium mb-1">{label}</label>
            <textarea
              {...register(key as keyof DatosCVFormulario)}
              rows={key === "sobreMi" ? 4 : 2}
              className={`w-full p-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 ${
                errors[key as keyof typeof errors]
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors[key as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[key as keyof typeof errors]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {isSubmitting ? "Generando..." : "Generar CV"}
        </button>
      </form>

      {cvData && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <PDFViewer style={{ width: "100%", height: "600px" }}>
            <DocumentoCV cv={cvData} template={selectedTemplate} />
          </PDFViewer>

          <PDFDownloadLink
            document={<DocumentoCV cv={cvData} template={selectedTemplate} />}
            fileName={`cv-${selectedTemplate}.pdf`}
          >
            {({ loading }) => (
              <button className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition">
                {loading ? "Generando PDF..." : "📥 Descargar CV"}
              </button>
            )}
          </PDFDownloadLink>
        </motion.div>
      )}
    </div>
  );
}
