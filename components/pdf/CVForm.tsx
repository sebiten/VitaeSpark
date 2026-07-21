"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import TemplateSelector from "../TemplateSelector";
import {
  getLandingAttribution,
  setLandingAttribution,
} from "@/lib/analytics-attribution";
import { recordAnalyticsEvent } from "@/lib/analytics-events";
import type { AppLanguage } from "@/lib/i18n";
import {
  getCreateIntentMessage,
  normalizeCreateIntent,
  type CreateIntent,
} from "@/lib/blog-intent";

type CurrentUser = {
  id: string;
  email?: string | null;
};

type CVFormProps = {
  initialLanguage?: AppLanguage;
  initialIntent?: CreateIntent;
  currentUser: CurrentUser | null;
  initialCountryCode?: string | null;
};

type ResumeAction = "generate" | "photo";
type FlowStep = "template" | "form" | "preview";

type StoredCreateDraft = {
  data: DatosCVFormulario;
  template: string;
  language: AppLanguage;
  intent: CreateIntent;
  action: ResumeAction | null;
};

const CREATE_DRAFT_KEY = "vitaespark_create_draft";

const CVFormStep = dynamic(() => import("../CVFormStep"), {
  ssr: false,
  loading: () => <FlowStepSkeleton label="Preparando formulario..." />,
});

const CVPreviewStep = dynamic(() => import("../CVPreviewStep"), {
  ssr: false,
  loading: () => <FlowStepSkeleton label="Preparando checkout..." />,
});

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

const draftFieldNames: Array<keyof DatosCVFormulario> = [
  "nombre",
  "puesto",
  "contacto",
  "sobreMi",
  "experiencia",
  "formacion",
  "habilidades",
  "idiomas",
  "informacionAdicional",
];

function normalizeDraft(data: DatosCVFormulario): DatosCVFormulario {
  return {
    ...createEmptyDraft(),
    ...data,
    informacionAdicional: data.informacionAdicional ?? "",
  };
}

function hasDraftContent(data: DatosCVFormulario) {
  return (
    Boolean(data.foto_url) ||
    draftFieldNames.some((field) => {
      const value = data[field];
      return typeof value === "string" && value.trim().length > 0;
    })
  );
}

export default function CVForm({
  initialLanguage = "es",
  initialIntent = "general",
  currentUser,
  initialCountryCode,
}: CVFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("elegance");
  const [cvData, setCvData] = useState<RespuestaCV["cv"] | null>(null);
  const [activeTab, setActiveTab] = useState<FlowStep>("template");
  const draftDataRef = useRef<DatosCVFormulario>(createEmptyDraft());
  const [draftPhotoUrl, setDraftPhotoUrl] = useState<string | null>(null);
  const [templateFlowTarget, setTemplateFlowTarget] = useState<"form" | "preview">(
    "form",
  );
  const [createIntent, setCreateIntent] = useState<CreateIntent>(initialIntent);
  const [draftReady, setDraftReady] = useState(false);
  const [resumeAction, setResumeAction] = useState<ResumeAction | null>(null);
  const draftRestoredRef = useRef(false);
  const selectedTemplateRef = useRef(selectedTemplate);
  const createIntentRef = useRef(createIntent);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suspendAutosaveRef = useRef(false);
  const intentMessage = getCreateIntentMessage(createIntent);

  const persistCurrentDraft = useCallback(
    (action: ResumeAction | null = null) => {
      if (suspendAutosaveRef.current) return;

      const data = normalizeDraft(draftDataRef.current);

      if (!hasDraftContent(data)) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      const storedDraft: StoredCreateDraft = {
        data,
        template: selectedTemplateRef.current,
        language: initialLanguage,
        intent: createIntentRef.current,
        action,
      };

      window.sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify(storedDraft));
    },
    [initialLanguage],
  );

  const navigateToStep = useCallback(
    (step: FlowStep) => {
      if (step === "form") {
        suspendAutosaveRef.current = false;
      }
      setActiveTab(step);
      track("CV Funnel Step Viewed", {
        step,
        language: initialLanguage,
        ...getLandingAttribution(),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [initialLanguage],
  );

  const handleTemplateChoice = useCallback(
    (templateId: string) => {
      selectedTemplateRef.current = templateId;
      setSelectedTemplate(templateId);
      persistCurrentDraft();
    },
    [persistCurrentDraft],
  );

  const handleTemplateContinue = useCallback(() => {
      const templateId = selectedTemplateRef.current;
      const attribution = getLandingAttribution();
      const nextStep =
        templateFlowTarget === "preview" && cvData ? "preview" : "form";

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

      if (nextStep === "form") {
        recordAnalyticsEvent({
          event_name: "form_started",
          language: initialLanguage,
          template: templateId,
          ...attribution,
        });
      }

      navigateToStep(nextStep);
      setTemplateFlowTarget("form");
    }, [cvData, initialLanguage, navigateToStep, templateFlowTarget]);

  const handleFormCompleted = useCallback(
    (data: RespuestaCV["cv"]) => {
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

      window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
      suspendAutosaveRef.current = true;
      setResumeAction(null);

      navigateToStep("preview");
    },
    [initialLanguage, navigateToStep, selectedTemplate],
  );

  const handleDraftChange = useCallback(
    (data: DatosCVFormulario) => {
      draftDataRef.current = normalizeDraft(data);
      setResumeAction(null);

      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }

      autosaveTimerRef.current = setTimeout(() => {
        persistCurrentDraft();
      }, 300);
    },
    [persistCurrentDraft],
  );

  const handlePhotoUrlChange = useCallback(
    (url: string | null) => {
      setDraftPhotoUrl(url);
      draftDataRef.current = {
        ...draftDataRef.current,
        foto_url: url ?? undefined,
      };
      setResumeAction(null);
      window.setTimeout(() => persistCurrentDraft(), 0);
    },
    [persistCurrentDraft],
  );

  const handleAuthRequired = useCallback(
    (data: DatosCVFormulario, action: ResumeAction) => {
      suspendAutosaveRef.current = true;
      const storedDraft: StoredCreateDraft = {
        data: normalizeDraft({ ...data, foto_url: draftPhotoUrl ?? undefined }),
        template: selectedTemplateRef.current,
        language: initialLanguage,
        intent: createIntentRef.current,
        action,
      };

      window.sessionStorage.setItem(CREATE_DRAFT_KEY, JSON.stringify(storedDraft));
      recordAnalyticsEvent({
        event_name: "auth_required",
        language: initialLanguage,
        template: selectedTemplateRef.current,
        ...getLandingAttribution(),
      });

      const nextParams = new URLSearchParams();
      if (initialLanguage === "en") nextParams.set("lang", "en");
      if (createIntentRef.current !== "general") {
        nextParams.set("intent", createIntentRef.current);
      }
      nextParams.set("resume", action);
      const nextPath = `/crear?${nextParams.toString()}`;
      window.location.assign(`/login?next=${encodeURIComponent(nextPath)}`);
    },
    [draftPhotoUrl, initialLanguage],
  );

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

    const storedIntent = window.sessionStorage.getItem(
      "vitaespark-create-intent",
    );
    if (storedIntent) {
      const normalizedIntent = normalizeCreateIntent(storedIntent);
      createIntentRef.current = normalizedIntent;
      setCreateIntent(normalizedIntent);
      window.sessionStorage.removeItem("vitaespark-create-intent");
    }
  }, []);

  useEffect(() => {
    if (draftRestoredRef.current) return;
    draftRestoredRef.current = true;

    try {
      const rawDraft = window.sessionStorage.getItem(CREATE_DRAFT_KEY);
      if (!rawDraft) return;

      const storedDraft = JSON.parse(rawDraft) as StoredCreateDraft;
      if (!storedDraft.data || !storedDraft.template) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      const restoredData = normalizeDraft(storedDraft.data);
      if (!hasDraftContent(restoredData)) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      draftDataRef.current = restoredData;
      selectedTemplateRef.current = storedDraft.template;
      setSelectedTemplate(storedDraft.template);
      setDraftPhotoUrl(restoredData.foto_url ?? null);
      const restoredIntent = normalizeCreateIntent(storedDraft.intent);
      createIntentRef.current = restoredIntent;
      setCreateIntent(restoredIntent);
      setActiveTab("form");
      suspendAutosaveRef.current = false;

      if (currentUser && storedDraft.action) {
        setResumeAction(storedDraft.action);
        recordAnalyticsEvent({
          event_name: "auth_completed",
          language: initialLanguage,
          template: storedDraft.template,
          ...getLandingAttribution(),
        });
        if (storedDraft.action === "photo") {
          toast.success(
            initialLanguage === "en"
              ? "Session ready. You can upload the photo now."
              : "Sesión lista. Ya podés subir la foto.",
          );
        }
      } else if (!storedDraft.action) {
        toast.info(
          initialLanguage === "en"
            ? "We restored your saved progress."
            : "Recuperamos el avance guardado en esta pestaña.",
        );
      }
    } catch {
      window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
    } finally {
      setDraftReady(true);
    }
  }, [currentUser, initialLanguage]);

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      persistCurrentDraft();
    };
  }, [persistCurrentDraft]);

  if (!draftReady) {
    return <FlowStepSkeleton label="Preparando tu espacio de trabajo..." />;
  }

  return (
    <div className="mx-auto w-full overflow-x-hidden py-1 sm:py-2">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        {activeTab === "template" && intentMessage ? (
          <div className="mx-auto mb-4 max-w-2xl border-b border-white/8 px-2 pb-4 text-center">
            <p className="text-sm font-semibold text-[#F6F2EA]">
              {intentMessage.title}
            </p>
            <p className="mx-auto mt-1 max-w-xl text-xs leading-5 text-white/48">
              {intentMessage.description}
            </p>
          </div>
        ) : null}
        <Tabs
          value={activeTab}
          onValueChange={(step) => navigateToStep(step as FlowStep)}
          className="min-w-0 space-y-4"
        >
          <TabsContent value="template" className="space-y-6">
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleTemplateChoice}
              onContinue={handleTemplateContinue}
            />
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            {selectedTemplate ? (
              <CVFormStep
                template={selectedTemplate}
                currentUserId={currentUser?.id}
                language={initialLanguage}
                draftData={draftDataRef.current}
                onGenerated={handleFormCompleted}
                onDraftChange={handleDraftChange}
                fotoUrl={draftPhotoUrl}
                onFotoUrlChange={handlePhotoUrlChange}
                onChangeTemplate={() => navigateToStep("template")}
                onAuthRequired={handleAuthRequired}
                autoGenerate={Boolean(currentUser && resumeAction === "generate")}
              />
            ) : null}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {cvData && currentUser ? (
              <CVPreviewStep
                cvData={cvData}
                template={selectedTemplate}
                onBack={() => navigateToStep("form")}
                onChangeTemplate={() => {
                  setTemplateFlowTarget("preview");
                  navigateToStep("template");
                }}
                currentUser={currentUser}
                language={initialLanguage}
                initialCountryCode={initialCountryCode}
              />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function FlowStepSkeleton({ label }: { label: string }) {
  return (
    <div className="min-h-[320px] border-y border-white/8 text-white">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 py-20 text-center">
        <div className="size-8 animate-pulse rounded-full border border-white/12 bg-white/[0.04]" />
        <p className="text-sm font-medium text-white/58">{label}</p>
      </div>
    </div>
  );
}
