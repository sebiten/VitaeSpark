"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Sparkles,
  Download,
  Info,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

import type {
  DatosCVFormulario,
  RespuestaCV,
  PaymentStatus,
} from "@/lib/types/cv";
import { z } from "zod";
import { DocumentoCV } from "./CVDocument";
import { PaymentModal } from "../payment-modal";
import { CheckPaymentStatus } from "../CheckPaymentStatus";

/* ----------  VALIDACIÓN  ---------- */
const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  puesto: z.string().min(1, "El puesto es obligatorio"),
  contacto: z.string().min(1),
  sobreMi: z.string().min(10),
  experiencia: z.string().min(20),
  formacion: z.string().min(10),
  habilidades: z.string().min(1),
  idiomas: z.string().min(1),
  informacionAdicional: z.string().optional(),
});

/* ----------  PLANTILLAS  ---------- */
const templates = [
  {
    id: "purple",
    name: "Morado",
    gradient: "from-[#7C3AED] to-[#6D28D9]",
    color: "#7C3AED",               // 👈 de nuevo
  },
  {
    id: "blue",
    name: "Azul",
    gradient: "from-[#2563EB] to-[#1E40AF]",
    color: "#2563EB",
  },
  {
    id: "green",
    name: "Verde",
    gradient: "from-[#22C55E] to-[#15803D]",
    color: "#22C55E",
  },
]


export default function CVForm() {
  const router = useRouter();

  /* ----------  ESTADOS  ---------- */
  const [selectedTemplate, setSelectedTemplate] = useState("purple");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>();
  const [cvId, setCvId] = useState<string>(); // 👈 nuevo
  const [activeTab, setActiveTab] = useState("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentModalOpen, setModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: "idle",
  });
  const [hasPaid, setHasPaid] = useState(false);
  const [isVerifyingPayment, setVerifying] = useState(false);

  /* ----------  FORM  ---------- */
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({ resolver: zodResolver(schema) });

  /* ----------  GENERAR CV  ---------- */
  const onSubmit = async (data: DatosCVFormulario) => {
    try {
      setIsGenerating(true);
      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      const json: RespuestaCV & { cvId: string } = await res.json();
      setCvData(json.cv);
      setCvId(json.cvId); // 💾 guardamos id para el pago
      setActiveTab("preview");
      localStorage.setItem("vitae-cv-data", JSON.stringify(json.cv));
    } catch (e: any) {
      setError(e.message ?? "Error desconocido");
    } finally {
      setIsGenerating(false);
    }
  };

  /* ----------  ÉXITO DE PAGO  ---------- */
  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setModal(false);
    setPaymentStatus({
      status: "success",
      message: "¡Pago completado con éxito!",
    });
    localStorage.removeItem("vitae-cv-data"); // limpiamos
    router.refresh(); // opcional
  };

  /* ----------  UI  ---------- */
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Cabecera */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-4xl font-extrabold bg-gradient-to-r from-[#7C3AED] to-[#38BDF8] bg-clip-text text-transparent text-center"
      >
        Generador de CV Profesional
      </motion.h1>

      {/* Verificador de pago (query params) */}
      <Suspense>
        <CheckPaymentStatus
          onStartVerifying={() => setVerifying(true)}
          onSuccess={(stored) => {
            setHasPaid(true);
            setVerifying(false);
            if (stored) {
              setCvData(stored);
              setActiveTab("preview");
            }
          }}
          onPending={() => {
            setPaymentStatus({ status: "pending" });
            setVerifying(false);
          }}
          onFailure={() => {
            setPaymentStatus({ status: "error" });
            setVerifying(false);
          }}
        />
      </Suspense>

      {/* Tabs Form / Preview */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="form">Formulario</TabsTrigger>
          <TabsTrigger value="preview" disabled={!cvData}>
            Vista previa
          </TabsTrigger>
        </TabsList>

        {/* ----------  FORM  ---------- */}

        <TabsContent value="form" className="mt-0">
          <div className="bg-[#1F1F22] border border-[#2A2A2D] rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-[#2A2A2D] to-[#1F1F22] border border-[#3F3F46] rounded-xl p-5 text-sm text-[#E4E4E7] space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#38BDF8]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-[#38BDF8] mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-[#38BDF8] mb-2">
                        ¿Qué es un CV a prueba de ATS?
                      </h2>
                      <p className="mb-2 text-[#D4D4D8]">
                        Un sistema de seguimiento de candidatos (ATS) es un
                        software utilizado por reclutadores para filtrar
                        currículums. Evalúa el formato, estructura y palabras
                        clave para decidir si un perfil avanza en el proceso.
                      </p>
                      <p className="text-[#D4D4D8]">
                        Nuestro generador está diseñado para ayudarte a superar
                        este filtro automatizado, maximizando tus oportunidades
                        laborales.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold mb-3 block text-sm tracking-wide text-[#F4F4F5]/90">
                    Seleccionar color de la plantilla
                  </label>
                  <div className="flex gap-4 flex-wrap">
                    {templates.map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`w-24 h-28 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center text-xs font-medium ${
                          selectedTemplate === tpl.id
                            ? `border-${tpl.gradient} scale-105 shadow-lg shadow-${tpl.color}/20`
                            : "border-[#3A3A3D]"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-full mb-2 bg-gradient-to-br ${tpl.gradient} shadow-md`}
                        />
                        <span className="text-[#E4E4E7]">{tpl.name}</span>
                        {selectedTemplate === tpl.id && (
                          <CheckCircle className="w-4 h-4 text-[#38BDF8] mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                        Nombre completo
                      </label>
                      <input
                        {...register("nombre")}
                        className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                          errors.nombre
                            ? "border-red-500/70 focus:ring-red-500/30"
                            : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                        }`}
                        placeholder="Ej: Juan Pérez"
                      />
                      {errors.nombre && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.nombre.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                        Puesto profesional
                      </label>
                      <input
                        {...register("puesto")}
                        className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                          errors.puesto
                            ? "border-red-500/70 focus:ring-red-500/30"
                            : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                        }`}
                        placeholder="Ej: Desarrollador Frontend"
                      />
                      {errors.puesto && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.puesto.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                      Contacto (email, teléfono)
                    </label>
                    <input
                      {...register("contacto")}
                      className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                        errors.contacto
                          ? "border-red-500/70 focus:ring-red-500/30"
                          : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                      }`}
                      type="text"
                      autoComplete="email"
                      placeholder="Ej: juan.perez@example.com, +54 9 387 1234567"
                    />
                    {errors.contacto && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.contacto.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                      Sobre mí
                    </label>
                    <textarea
                      {...register("sobreMi")}
                      rows={2}
                      className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                        errors.sobreMi
                          ? "border-red-500/70 focus:ring-red-500/30"
                          : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                      }`}
                      placeholder="Breve descripción profesional..."
                    />
                    {errors.sobreMi && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.sobreMi.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-[#F4F4F5]/90">
                        Experiencia
                      </label>
                      <span className="text-xs text-[#A1A1AA]">
                        Formato: Cargo; Empresa; Fechas; Logros
                      </span>
                    </div>
                    <textarea
                      {...register("experiencia")}
                      rows={4}
                      className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                        errors.experiencia
                          ? "border-red-500/70 focus:ring-red-500/30"
                          : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                      }`}
                      placeholder="Frontend Lead; Acme Inc; Ene 2021–Dic 2023; Lideré migración a React..."
                    />
                    {errors.experiencia && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.experiencia.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-[#F4F4F5]/90">
                        Formación
                      </label>
                      <span className="text-xs text-[#A1A1AA]">
                        Formato: Institución; Título; Fechas
                      </span>
                    </div>
                    <textarea
                      {...register("formacion")}
                      rows={3}
                      className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                        errors.formacion
                          ? "border-red-500/70 focus:ring-red-500/30"
                          : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                      }`}
                      placeholder="Universidad Nacional de Salta; Lic. en Sistemas; 2016–2020"
                    />
                    {errors.formacion && (
                      <p className="text-red-400 text-xs mt-1.5 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.formacion.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                        Habilidades (separadas por comas)
                      </label>
                      <input
                        {...register("habilidades")}
                        className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                          errors.habilidades
                            ? "border-red-500/70 focus:ring-red-500/30"
                            : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                        }`}
                        placeholder="TypeScript, React, Next.js, Tailwind CSS"
                      />
                      {errors.habilidades && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.habilidades.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#F4F4F5]/90">
                        Idiomas (separados por comas)
                      </label>
                      <input
                        {...register("idiomas")}
                        className={`w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border focus:outline-none focus:ring-2 shadow-sm transition ${
                          errors.idiomas
                            ? "border-red-500/70 focus:ring-red-500/30"
                            : "border-[#3F3F46] focus:ring-[#7C3AED]/30"
                        }`}
                        placeholder="Español – Nativo, Inglés – B2"
                      />
                      {errors.idiomas && (
                        <p className="text-red-400 text-xs mt-1.5 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.idiomas.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-sm font-medium text-[#F4F4F5]/90">
                        Información adicional (opcional)
                      </label>
                      <span className="text-xs text-[#A1A1AA]">
                        Certificaciones, logros, etc.
                      </span>
                    </div>
                    <textarea
                      {...register("informacionAdicional")}
                      rows={2}
                      className="w-full bg-[#2A2A2D] text-[#F4F4F5] placeholder:text-[#A1A1AA] p-3 rounded-lg border border-[#3F3F46] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 shadow-sm transition"
                      placeholder="Ponente en TechSalta 2024, Certificación AWS..."
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-400">
                      <p className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                        {error}
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || isGenerating}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-semibold hover:shadow-lg hover:shadow-[#7C3AED]/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
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
                  </button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ----------  PREVIEW  ---------- */}
        <TabsContent value="preview">
          {cvData && (
            <>
              {paymentStatus.status === "success" && !isVerifyingPayment && (
                <div className="mb-4 p-3 rounded bg-green-500/20 text-green-300 text-center">
                  ¡Pago confirmado! Descarga disponible.
                </div>
              )}

              <div className="mb-6 h-[650px] border rounded">
                <PDFViewer width="100%" height="100%">
                  <DocumentoCV cv={cvData} template={selectedTemplate} />
                </PDFViewer>
              </div>

              {hasPaid ? (
                <PDFDownloadLink
                  document={
                    <DocumentoCV cv={cvData} template={selectedTemplate} />
                  }
                  fileName={`cv-${cvData.nombre
                    .toLowerCase()
                    .replace(/\s+/g, "-")}.pdf`}
                >
                  {({ loading }) => (
                    <Button disabled={loading}>
                      {loading ? (
                        <Loader2 className="animate-spin mr-2" />
                      ) : (
                        <Download className="mr-2" />
                      )}
                      Descargar CV
                    </Button>
                  )}
                </PDFDownloadLink>
              ) : (
                <Button onClick={() => setModal(true)}>
                  <Lock className="mr-2" /> Pagar para descargar ($100)
                </Button>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* ----------  MODAL DE PAGO  ---------- */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setModal(false)}
        onSuccess={handlePaymentSuccess}
        amount={100}
        productName="CV Profesional Optimizado para ATS"
        cvId={cvId!}
      />
    </div>
  );
}
