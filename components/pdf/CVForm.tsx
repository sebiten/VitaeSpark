"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import type { Session } from "@supabase/supabase-js";
import { Eye, FileText, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/client";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import TemplateSelector from "../TemplateSelector";
import CVFormStep from "../CVFormStep";
import CVPreviewStep from "../CVPreviewStep";
import {
  getLandingAttribution,
  setLandingAttribution,
} from "@/lib/analytics-attribution";
import { recordAnalyticsEvent } from "@/lib/analytics-events";
import type { AppLanguage } from "@/lib/i18n";

type CVFormProps = {
  initialLanguage?: AppLanguage;
};

const createEmptyDraft = (): DatosCVFormulario => ({
  nombre: "",
  puesto: "",
  contacto: "",
  sobreMi: "",
  experiencia: "",
  formacion: "",
  habilidades: "",
  idiomas: "",
  informacionAdicional: "",
});

const CVForm: NextPage<CVFormProps> = ({ initialLanguage = "es" }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("elegance");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
  const [activeTab, setActiveTab] = useState("template");
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [draftData, setDraftData] = useState(createEmptyDraft);
  const [draftPhotoUrl, setDraftPhotoUrl] = useState<string | null>(null);
  const [templateFlowTarget, setTemplateFlowTarget] = useState<"form" | "preview">(
    "form",
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    track("CV Funnel Step Viewed", {
      step: tab,
      language: initialLanguage,
      ...getLandingAttribution(),
    });
    window.scrollTo(0, 0);
  };

  const handleTemplateSelected = (templateId: string) => {
    setSelectedTemplate(templateId);
    const attribution = getLandingAttribution();
    const nextStep = templateFlowTarget === "preview" && cvData ? "preview" : "form";
    track("CV Template Selected", {
      template: templateId,
      language: initialLanguage,
      target_step: nextStep,
      ...attribution,
    });
    recordAnalyticsEvent({
      event_name: "template_selected",
      language: initialLanguage,
      template: templateId,
      ...attribution,
    });
    setTimeout(() => {
      setActiveTab(nextStep);
      track("CV Funnel Step Viewed", {
        step: nextStep,
        language: initialLanguage,
        ...attribution,
      });
      setTemplateFlowTarget("form");
    }, 500);
  };

  const handleFormCompleted = (data: RespuestaCV["cv"]) => {
    setCvData(data);
    const attribution = getLandingAttribution();
    track("CV Generated", {
      template: selectedTemplate,
      language: initialLanguage,
      ...attribution,
    });
    recordAnalyticsEvent({
      event_name: "cv_generated",
      language: initialLanguage,
      template: selectedTemplate,
      ...attribution,
    });
    setTimeout(() => {
      setActiveTab("preview");
      track("CV Funnel Step Viewed", {
        step: "preview",
        language: initialLanguage,
        ...attribution,
      });
    }, 500);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const landingPath = params.get("landing_path");
    const ctaLabel = params.get("cta_label");
    const sourceType = params.get("source_type");

    if (
      landingPath &&
      ctaLabel &&
      (sourceType === "landing" || sourceType === "blog")
    ) {
      setLandingAttribution({
        landing_path: landingPath,
        cta_label: ctaLabel,
        source_type: sourceType,
      });
    }

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
          className="min-w-0 space-y-4"
        >
          <div className="mx-0 rounded-[22px] border border-white/8 bg-[#101014]/72 p-1.5 sm:mx-auto sm:max-w-2xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <TabsList className="grid h-auto w-full grid-cols-3 rounded-[18px] border border-white/8 bg-white/[0.025] p-1 sm:flex-1">
                <TabsTrigger
                  value="template"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs text-white/68 transition-colors data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {initialLanguage === "en" ? "Template" : "Plantilla"}
                  </span>
                  <span className="sm:hidden">1</span>
                </TabsTrigger>
                <TabsTrigger
                  value="form"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs text-white/68 transition-colors data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
                  disabled={!selectedTemplate}
                >
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {initialLanguage === "en" ? "Details" : "Datos"}
                  </span>
                  <span className="sm:hidden">2</span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex min-w-0 items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs text-white/68 transition-colors data-[state=active]:bg-white/[0.08] data-[state=active]:text-white"
                  disabled={!cvData}
                >
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {initialLanguage === "en" ? "Preview" : "Vista previa"}
                  </span>
                  <span className="sm:hidden">3</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3 px-1 sm:w-32">
                <div className="h-1 flex-1 rounded-full bg-white/10">
                  <div
                    className="h-1 rounded-full bg-[#7C3AED]"
                    style={{ width: `${getProgress()}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs font-semibold text-[#A78BFA]">
                  {getProgress()}%
                </span>
              </div>
            </div>
            <p className="px-2 pb-1 pt-2 text-center text-[11px] leading-5 text-white/48">
              {initialLanguage === "en"
                ? "You can switch templates without reloading your details."
                : "Podés cambiar de plantilla sin volver a cargar tus datos."}
            </p>
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
                  language={initialLanguage}
                  draftData={draftData}
                  onDraftChange={(data) =>
                    setDraftData({
                      ...createEmptyDraft(),
                      ...data,
                      informacionAdicional: data.informacionAdicional ?? "",
                    })
                  }
                  fotoUrl={draftPhotoUrl}
                  onFotoUrlChange={setDraftPhotoUrl}
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
                  onChangeTemplate={() => {
                    setTemplateFlowTarget("preview");
                    setActiveTab("template");
                  }}
                  userSession={userSession}
                  language={initialLanguage}
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
