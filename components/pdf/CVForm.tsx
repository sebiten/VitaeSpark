"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import type { Session } from "@supabase/supabase-js";
import { Eye, FileText, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
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
    window.scrollTo(0, 0);
  };

  const handleTemplateSelected = (templateId: string) => {
    setSelectedTemplate(templateId);
    track("CV Template Selected", { template: templateId });
    setTimeout(() => {
      setActiveTab("form");
      track("CV Funnel Step Viewed", { step: "form" });
    }, 500);
  };

  const handleFormCompleted = (data: RespuestaCV["cv"]) => {
    setCvData(data);
    track("CV Generated", { template: selectedTemplate });
    setTimeout(() => {
      setActiveTab("preview");
      track("CV Funnel Step Viewed", { step: "preview" });
    }, 500);
  };

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

  const getProgress = () => {
    if (activeTab === "template") return 33;
    if (activeTab === "form") return 66;
    if (activeTab === "preview") return 100;
    return 0;
  };

  return (
    <div className="mx-auto w-full overflow-x-hidden py-1 sm:py-2">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="min-w-0 space-y-5"
        >
          <div className="mx-0 rounded-2xl border border-white/10 bg-[#15151A]/75 p-2 shadow-xl shadow-black/10 sm:mx-auto sm:max-w-3xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl border border-white/10 bg-[#0F0F10]/70 p-1 sm:flex-1">
                <TabsTrigger
                  value="template"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-white/72 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Plantilla</span>
                  <span className="sm:hidden">1</span>
                </TabsTrigger>
                <TabsTrigger
                  value="form"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-white/72 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white"
                  disabled={!selectedTemplate}
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Datos</span>
                  <span className="sm:hidden">2</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-white/72 data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white"
                  disabled={!cvData}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Vista previa</span>
                  <span className="sm:hidden">3</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3 px-1 sm:w-32">
                <div className="h-1.5 flex-1 rounded-full bg-white/10">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#38BDF8]"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-[#A78BFA]">
                  {getProgress()}%
                </span>
              </div>
            </div>
          </div>

          <TabsContent value="template" className="space-y-6">
            <div>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelected}
              />
            </div>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            <div>
              {selectedTemplate && (
                <CVFormStep
                  setCvData={handleFormCompleted}
                  setActiveTab={setActiveTab}
                  template={selectedTemplate}
                  userSession={userSession}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <div>
              {cvData && (
                <CVPreviewStep
                  cvData={cvData}
                  template={selectedTemplate}
                  onBack={() => setActiveTab("form")}
                  userSession={userSession}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CVForm;
