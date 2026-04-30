"use client";

import type { NextPage } from "next";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { createClient } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { ShieldCheck, Palette, FileText, Eye } from "lucide-react";
import type { RespuestaCV } from "@/lib/types/cv";
import TemplateSelector from "../TemplateSelector";
import CVFormStep from "../CVFormStep";
import CVPreviewStep from "../CVPreviewStep";

const CVForm: NextPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("elegance");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
  const [activeTab, setActiveTab] = useState("template");
  const [userSession, setUserSession] = useState<Session | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    track("CV Funnel Step Viewed", { step: tab });
    // Scroll to top when changing tabs
    window.scrollTo(0, 0);
  };

  const handleTemplateSelected = (templateId: string) => {
    setSelectedTemplate(templateId);
    track("CV Template Selected", { template: templateId });
    // Auto-advance to form step after template selection
    setTimeout(() => {
      setActiveTab("form");
      track("CV Funnel Step Viewed", { step: "form" });
    }, 500);
  };

  const handleFormCompleted = (data: RespuestaCV["cv"]) => {
    setCvData(data);
    track("CV Generated", { template: selectedTemplate });
    // Auto-advance to preview step after form completion
    setTimeout(() => {
      setActiveTab("preview");
      track("CV Funnel Step Viewed", { step: "preview" });
    }, 500);
  };

  // Obtener la sesión del usuario autenticado (usando Supabase)
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUserSession(session);
    };
    getUser();
  }, []);

  // Progress calculation
  const getProgress = () => {
    if (activeTab === "template") return 33;
    if (activeTab === "form") return 66;
    if (activeTab === "preview") return 100;
    return 0;
  };

  return (
    <div className="mx-auto w-full overflow-x-hidden py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-6xl min-w-0"
      >
        <div className="mb-8 rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-2xl shadow-black/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-[#D4D4D8]/60">
              Progreso en la creación del CV
            </span>
            <span className="text-sm text-[#7C3AED] font-medium">
              {getProgress()}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#38BDF8] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Tabs para Plantilla, Formulario y Vista Previa */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="min-w-0 space-y-8"
        >
          <div className="flex justify-center">
            <TabsList className="bg-[#15151A] border border-white/10 p-1 grid grid-cols-3 w-full max-w-lg rounded-2xl">
              <TabsTrigger
                value="template"
                className="text-white/70 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white flex items-center gap-2 text-xs rounded-xl"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Plantilla</span>
              </TabsTrigger>
              <TabsTrigger
                value="form"
                className="text-white/70 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white flex items-center gap-2 text-xs rounded-xl"
                disabled={!selectedTemplate}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Formulario</span>
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="text-white/70 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white flex items-center gap-2 text-xs rounded-xl"
                disabled={!cvData}
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Vista Previa</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center mb-6">
            <div className="flex w-full max-w-2xl items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-[#15151A]/70 px-3 py-3 sm:gap-3 sm:px-4">
              {/* Step 1 */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    activeTab === "template"
                      ? "bg-[#7C3AED] text-white"
                      : selectedTemplate
                      ? "bg-[#22C55E] text-white"
                      : "bg-[#3F3F46] text-[#D4D4D8]"
                  }`}
                >
                  {selectedTemplate ? <ShieldCheck className="w-4 h-4" /> : "1"}
                </div>
                <span className="ml-2 hidden text-sm text-[#D4D4D8] sm:inline">
                  Elegir Plantilla
                </span>
              </div>

              {/* Connector */}
              <div
                className={`w-7 h-0.5 ${
                  selectedTemplate ? "bg-[#22C55E]" : "bg-[#3F3F46]"
                } transition-colors`}
              />

              {/* Step 2 */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    activeTab === "form"
                      ? "bg-[#7C3AED] text-white"
                      : cvData
                      ? "bg-[#22C55E] text-white"
                      : selectedTemplate
                      ? "bg-[#3F3F46] text-[#D4D4D8]"
                      : "bg-[#2A2A2D] text-[#71717A]"
                  }`}
                >
                  {cvData ? <ShieldCheck className="w-4 h-4" /> : "2"}
                </div>
                <span className="ml-2 hidden text-sm text-[#D4D4D8] sm:inline">
                  Completar Datos
                </span>
              </div>

              {/* Connector */}
              <div
                className={`w-7 h-0.5 ${
                  cvData ? "bg-[#22C55E]" : "bg-[#3F3F46]"
                } transition-colors`}
              />

              {/* Step 3 */}
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    activeTab === "preview"
                      ? "bg-[#7C3AED] text-white"
                      : cvData
                      ? "bg-[#3F3F46] text-[#D4D4D8]"
                      : "bg-[#2A2A2D] text-[#71717A]"
                  }`}
                >
                  3
                </div>
                <span className="ml-2 hidden text-sm text-[#D4D4D8] sm:inline">
                  Vista Previa
                </span>
              </div>
            </div>
          </div>

          {/* Paso 1: Selección de plantilla */}
          <TabsContent value="template" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelected}
              />
            </motion.div>
          </TabsContent>

          {/* Paso 2: Formulario */}
          <TabsContent value="form" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {selectedTemplate && (
                <CVFormStep
                  setCvData={handleFormCompleted}
                  setActiveTab={setActiveTab}
                  template={selectedTemplate}
                  userSession={userSession}
                />
              )}
            </motion.div>
          </TabsContent>

          {/* Paso 3: Vista previa */}
          <TabsContent value="preview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {cvData && (
                <CVPreviewStep
                  cvData={cvData}
                  template={selectedTemplate}
                  onBack={() => setActiveTab("form")}
                  userSession={userSession}
                />
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CVForm;
