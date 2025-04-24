"use client";
import { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DocumentoCV } from "./CVDocument";
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
const templates = [
  { id: "purple", name: "Morado", color: "#7E22CE" },
  { id: "blue", name: "Azul", color: "#1E40AF" },
  { id: "green", name: "Verde", color: "#15803D" },
];

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

const CVForm: NextPage = () => {
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

  const onSubmit = async (data: DatosCVFormulario) => {
    const res = await fetch("/api/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const fallbackMessage =
        res.status === 504
          ? "⚠️ La generación está tardando demasiado. Intenta de nuevo en unos segundos."
          : await res.text();

      throw new Error(
        `Error al generar CV: ${res.status} - ${fallbackMessage}`
      );
    }

    const json: RespuestaCV = await res.json();
    setCvData(json.cv);
  };
  return (
    <section className="max-w-3xl mx-auto p-6 rounded-2xl bg-[#1F1F22] shadow-lg text-[#F4F4F5] space-y-6 border border-[#2A2A2D]">
      <div className="space-y-6">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extrabold tracking-tight text-[#F4F4F5]"
          >
            Generador de CV Profesional
          </motion.h1>
          <p className="text-sm text-[#D4D4D8]/80 mt-2">
            Crea un currículum moderno, claro y optimizado para superar filtros
            automáticos.
          </p>
        </div>

        <div className="bg-[#2A2A2D] border border-[#3F3F46] rounded-xl p-4 text-sm text-[#E4E4E7] space-y-2">
          <h2 className="text-lg font-semibold text-[#38BDF8]">
            ¿Qué es un CV a prueba de ATS?
          </h2>
          <p>
            Un sistema de seguimiento de candidatos (ATS) es un software
            utilizado por reclutadores para filtrar currículums. Evalúa el
            formato, estructura y palabras clave para decidir si un perfil
            avanza en el proceso.
          </p>
          <p>
            Nuestro generador está diseñado para ayudarte a superar este filtro
            automatizado, maximizando tus oportunidades laborales.
          </p>
        </div>

        <div>
          <label className="font-semibold mb-2 block text-sm tracking-wide text-[#F4F4F5]/90">
            Seleccionar color de la plantilla
          </label>
          <div className="flex gap-4">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`w-20 h-24 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-xs font-medium ${
                  selectedTemplate === tpl.id
                    ? "border-[#38BDF8] scale-105 ring-2 ring-[#38BDF8]"
                    : "border-[#3A3A3D]"
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full mb-2"
                  style={{ backgroundColor: tpl.color }}
                />
                <span className="text-[#E4E4E7]">{tpl.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1 text-[#F4F4F5]/80">
              {label}
            </label>
            <textarea
              {...register(key as keyof DatosCVFormulario)}
              rows={key === "experiencia" || key === "formacion" ? 4 : 1}
              className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                errors[key as keyof typeof errors]
                  ? "border-red-500 focus:ring-red-400"
                  : "border-[#3F3F46] focus:ring-[#38BDF8]"
              }`}
            />
            {errors[key as keyof typeof errors] && (
              <p className="text-red-400 text-sm mt-1">
                {errors[key as keyof typeof errors]?.message}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-[#38BDF8] text-black font-semibold hover:bg-[#0EA5E9] transition"
        >
          {isSubmitting ? "Generando..." : "✨ Generar CV"}
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
              <button className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
                {loading ? "Generando PDF..." : "📥 Descargar CV"}
              </button>
            )}
          </PDFDownloadLink>
        </motion.div>
      )}
    </section>
  );
};

export default CVForm;
