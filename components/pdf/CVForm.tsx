// CVForm.tsx - Entrada principal del generador de CV
// --------------------------------------------------------------------
// Este archivo importa y organiza los subcomponentes para generar, previsualizar
// y pagar un CV profesional personalizado.

"use client";

import type { NextPage } from "next";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { ShieldCheck } from "lucide-react";
import { DocumentoCV } from "./CVDocument";
import type { RespuestaCV } from "@/lib/types/cv";
import TemplateSelector from "../TemplateSelector";
import CVFormStep from "../CVFormStep";
import CVPreviewStep from "../CVPreviewStep";
import { RoboAnimation } from "../roboto-animation";

// Subcomponentes

const CVForm: NextPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("harvard");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
  const [activeTab, setActiveTab] = useState("form");
  const [userSession, setUserSession] = useState<Session | null>(null);

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

  return (
    <div className="mx-auto py-12 mt-4 ">
      <RoboAnimation/>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto mt-12"
      >
        {/* Título y subtítulo */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C3AED] to-[#7C3AED]"
          >
            Generador de CV Profesional
          </motion.h1>
          <p className="text-base text-[#D4D4D8]/80 mt-3 max-w-2xl mx-auto">
            Crea un currículum moderno, claro y optimizado para superar filtros
            automáticos y destacar entre los demás candidatos.
          </p>
        </div>

        {/* Tabs para Formulario y Vista Previa */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <div className="flex justify-between items-center ">
            <TabsList className="bg-[#2A2A2D] border border-[#3F3F46] p-1 ">
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
          </div>

          {/* Paso 1: Formulario + Selección de plantilla */}
          <TabsContent value="form">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            <CVFormStep
              setCvData={setCvData}
              setActiveTab={setActiveTab}
              template={selectedTemplate}
            />
          </TabsContent>

          {/* Paso 2: Vista previa y pago */}
          <TabsContent value="preview">
            {cvData && (
              <CVPreviewStep
                cvData={cvData}
                template={selectedTemplate}
                onBack={() => setActiveTab("form")}
                userSession={userSession}
              />
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default CVForm;
