"use client";
import type {
  DatosCVFormulario,
  RespuestaCV,
  PaymentStatus,
} from "@/lib/types/cv";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DocumentoCV } from "./CVDocument";
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
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PaymentModal } from "../payment-modal";
import { CheckPaymentStatus } from "../CheckPaymentStatus";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  puesto: z.string().min(1, "El puesto es obligatorio"),
  contacto: z.string().min(1, "La información de contacto es obligatoria"),
  sobreMi: z
    .string()
    .min(10, "Describe un poco sobre ti (mínimo 10 caracteres)"),
  experiencia: z
    .string()
    .min(20, "Detalla tu experiencia laboral (mínimo 20 caracteres)"),
  formacion: z
    .string()
    .min(10, "Incluye tu formación académica (mínimo 10 caracteres)"),
  habilidades: z.string().min(1, "Incluye al menos una habilidad"),
  idiomas: z.string().min(1, "Incluye al menos un idioma"),
  informacionAdicional: z.string().optional(),
});

const templates = [
  {
    id: "purple",
    name: "Morado",
    color: "#7C3AED",
    gradient: "from-[#7C3AED] to-[#6D28D9]",
  },
  {
    id: "blue",
    name: "Azul",
    color: "#1E40AF",
    gradient: "from-[#2563EB] to-[#1E40AF]",
  },
  {
    id: "green",
    name: "Verde",
    color: "#15803D",
    gradient: "from-[#22C55E] to-[#15803D]",
  },
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

const CVForm = () => {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("purple");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
  const [activeTab, setActiveTab] = useState("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: "idle",
  });
  const [hasPaid, setHasPaid] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({
    resolver: zodResolver(schema),
  });

  const loadExample = () => {
    Object.entries(ejemplo).forEach(([key, value]) => {
      setValue(key as keyof DatosCVFormulario, value);
    });
  };

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
      setActiveTab("preview");

      // NUEVO: Guardar en localStorage
      localStorage.setItem("vitae-cv-data", JSON.stringify(json.cv));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePaymentSuccess = () => {
    setHasPaid(true);
    setIsPaymentModalOpen(false);
    setPaymentStatus({
      status: "success",
      message: "¡Pago completado con éxito!",
    });

    // NUEVO: Restaurar cvData desde localStorage
    const storedCv = localStorage.getItem("vitae-cv-data");
    if (storedCv) {
      const parsedCv = JSON.parse(storedCv);
      setCvData(parsedCv);
      setActiveTab("preview"); // Ir a preview automáticamente si quieres
    }

    setTimeout(() => {
      router.push("/success");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#38BDF8]"
          >
            Generador de CV Profesional
          </motion.h1>
          <p className="text-base text-[#D4D4D8]/80 mt-3 max-w-2xl mx-auto">
            Crea un currículum moderno, claro y optimizado para superar filtros
            automáticos y destacar entre los demás candidatos.
          </p>
        </div>
        <Suspense fallback={null}>
          <CheckPaymentStatus
            onSuccess={(storedCv) => {
              setPaymentStatus({
                status: "success",
                message: "¡Pago completado con éxito!",
              });
              setHasPaid(true);
              if (storedCv) {
                setCvData(storedCv);
                setActiveTab("preview");
              }
              setIsVerifyingPayment(false); // ✅ Terminamos de verificar
            }}
            onPending={() => {
              setPaymentStatus({
                status: "pending",
                message: "Tu pago está pendiente de confirmación",
              });
              setIsVerifyingPayment(false); // ✅ Terminamos de verificar
            }}
            onFailure={() => {
              setPaymentStatus({
                status: "error",
                message: "Hubo un problema con tu pago. Intenta nuevamente.",
              });
              setIsVerifyingPayment(false); // ✅ Terminamos de verificar
            }}
            onStartVerifying={() => {
              setIsVerifyingPayment(true); // ✅ Empezamos a verificar
            }}
          />
        </Suspense>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <TabsList className="bg-[#2A2A2D] border border-[#3F3F46] p-1">
              <TabsTrigger
                value="form"
                className=" text-white data-[state=active]:bg-[#3F3F46] "
              >
                Formulario
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="data-[state=active]:bg-[#3F3F46] text-white"
                disabled={!cvData}
              >
                Vista Previa
              </TabsTrigger>
            </TabsList>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadExample}
                    className="text-xs border-[#3F3F46] "
                  >
                    Cargar ejemplo
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cargar datos de ejemplo para probar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

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
                          Nuestro generador está diseñado para ayudarte a
                          superar este filtro automatizado, maximizando tus
                          oportunidades laborales.
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

          <TabsContent value="preview" className="mt-0">
            {paymentStatus.status === "success" && !isVerifyingPayment && (
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-green-700/20 border border-green-500/30 text-green-300 font-semibold text-center">
                ¡Tu pago fue exitoso! Ahora puedes descargar tu CV optimizado.
              </div>
            )}
            {cvData && (
              <motion.div
                className="space-y-6 bg-[#1F1F22] border border-[#2A2A2D] rounded-2xl shadow-xl p-6 md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#F4F4F5]">
                    Vista previa de tu CV
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("form")}
                    className="text-xs border-[#3F3F46] "
                  >
                    Volver al formulario
                  </Button>
                </div>

                <div className="bg-[#0F0F10] border border-[#2A2A2D] rounded-xl p-4 shadow-inner">
                  <PDFViewer
                    style={{
                      width: "100%",
                      height: "650px",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <DocumentoCV cv={cvData} template={selectedTemplate} />
                  </PDFViewer>
                </div>

                {isVerifyingPayment ? (
                  <div className="flex flex-col items-center space-y-2 p-6 bg-[#1F1F22] border border-[#3F3F46] rounded-xl">
                    <Loader2 className="w-6 h-6 animate-spin text-[#38BDF8]" />
                    <p className="text-sm text-[#D4D4D8]">
                      Verificando tu pago...
                    </p>
                  </div>
                ) : hasPaid ? (
                  <PDFDownloadLink
                    document={
                      <DocumentoCV cv={cvData} template={selectedTemplate} />
                    }
                    fileName={`cv-${cvData.nombre
                      .toLowerCase()
                      .replace(/\s+/g, "-")}-${selectedTemplate}.pdf`}
                    className="block w-full"
                  >
                    {({ loading, url, blob }) => (
                      <button
                        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#22C55E] to-[#15803D] text-white font-semibold hover:shadow-lg hover:shadow-[#22C55E]/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                        disabled={loading}
                        onClick={() => {
                          // ✅ Al clickear descargar, esperamos que PDF se genere
                          if (!loading && url) {
                            // ✅ Una vez que existe url, limpiamos localStorage
                            localStorage.removeItem("vitae-cv-data");
                          }
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Preparando PDF...
                          </>
                        ) : (
                          <>
                            <Download className="w-5 h-5 mr-2" />
                            Descargar CV
                          </>
                        )}
                      </button>
                    )}
                  </PDFDownloadLink>
                ) : (
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white font-semibold hover:shadow-lg hover:shadow-[#7C3AED]/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Pagar para descargar ($100)
                  </button>
                )}

                <p className="text-center text-xs text-[#A1A1AA] mt-4">
                  {hasPaid
                    ? "Tu CV ha sido optimizado para sistemas ATS y está listo para ser descargado."
                    : "Tu CV ha sido optimizado para sistemas ATS. Realiza el pago para descargarlo."}
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Modal de pago */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={100}
        productName="CV Profesional Optimizado para ATS"
      />
    </div>
  );
};

export default CVForm;
