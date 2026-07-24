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
import {
  CREATE_DRAFT_KEY,
  CREATE_DRAFT_VERSION,
  parseStoredCreateDraft,
  type FlowStep,
  type ResumeAction,
  type StoredCreateDraft,
} from "@/lib/create-flow-state";
import {
  getGuestPhoto,
  guestPhotoExtension,
  isEphemeralPhotoUrl,
  removeGuestPhoto,
  type PhotoSyncState,
} from "@/lib/guest-photo";
import {
  mergeSkillsToolTransfer,
  parseSkillsToolTransfer,
  SKILLS_TOOL_TRANSFER_KEY,
} from "@/lib/skills-tool";

type CurrentUser = {
  id: string;
  email?: string | null;
};

type CVFormProps = {
  initialLanguage?: AppLanguage;
  initialIntent?: CreateIntent;
  initialResumeAction?: ResumeAction | null;
  currentUser: CurrentUser | null;
  initialCountryCode?: string | null;
};

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
  initialResumeAction = null,
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
  const [guestPhotoKey, setGuestPhotoKey] = useState<string | null>(null);
  const [photoSyncState, setPhotoSyncState] =
    useState<PhotoSyncState>("idle");
  const [photoSyncRetry, setPhotoSyncRetry] = useState(0);
  const draftRestoredRef = useRef(false);
  const selectedTemplateRef = useRef(selectedTemplate);
  const createIntentRef = useRef(createIntent);
  const generatedCvRef = useRef<RespuestaCV["cv"] | null>(null);
  const activeTabRef = useRef<FlowStep>(activeTab);
  const guestPhotoKeyRef = useRef<string | null>(null);
  const guestPhotoObjectUrlRef = useRef<string | null>(null);
  const guestPhotoHydrationRef = useRef<Promise<void> | null>(null);
  const autosaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suspendAutosaveRef = useRef(false);
  const intentMessage = getCreateIntentMessage(createIntent);

  const writeStoredDraft = useCallback(
    (
      action: ResumeAction | null = null,
      flowStep: FlowStep = activeTabRef.current,
    ) => {
      const currentData = normalizeDraft(draftDataRef.current);

      if (!hasDraftContent(currentData)) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      const data = {
        ...currentData,
        foto_url: isEphemeralPhotoUrl(currentData.foto_url)
          ? undefined
          : currentData.foto_url,
      };
      const generatedCv = generatedCvRef.current
        ? {
            ...generatedCvRef.current,
            foto_url: isEphemeralPhotoUrl(generatedCvRef.current.foto_url)
              ? undefined
              : generatedCvRef.current.foto_url,
          }
        : undefined;

      const storedDraft: StoredCreateDraft = {
        version: CREATE_DRAFT_VERSION,
        data,
        template: selectedTemplateRef.current,
        language: initialLanguage,
        intent: createIntentRef.current,
        action,
        flowStep,
        generatedCv,
        guestPhotoKey: guestPhotoKeyRef.current ?? undefined,
      };

      window.sessionStorage.setItem(
        CREATE_DRAFT_KEY,
        JSON.stringify(storedDraft),
      );
    },
    [initialLanguage],
  );

  const persistCurrentDraft = useCallback(
    (action: ResumeAction | null = null) => {
      if (suspendAutosaveRef.current) return;
      writeStoredDraft(action);
    },
    [writeStoredDraft],
  );

  const navigateToStep = useCallback(
    (step: FlowStep) => {
      if (step !== "preview") {
        suspendAutosaveRef.current = false;
      }
      activeTabRef.current = step;
      setActiveTab(step);
      if (
        generatedCvRef.current &&
        (!currentUser || step !== "preview")
      ) {
        writeStoredDraft(null, step);
      }
      track("CV Funnel Step Viewed", {
        step,
        language: initialLanguage,
        ...getLandingAttribution(),
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentUser, initialLanguage, writeStoredDraft],
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
      generatedCvRef.current = data;
      setCvData(data);
      const attribution = getLandingAttribution();
      track("CV Generated", {
        template: selectedTemplateRef.current,
        language: initialLanguage,
        ...attribution,
      });
      suspendAutosaveRef.current = true;
      setResumeAction(null);
      activeTabRef.current = "preview";

      if (currentUser) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
      } else {
        writeStoredDraft(null, "preview");
      }

      navigateToStep("preview");
    },
    [currentUser, initialLanguage, navigateToStep, writeStoredDraft],
  );

  const handleDraftChange = useCallback(
    (data: DatosCVFormulario) => {
      draftDataRef.current = normalizeDraft(data);

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
      window.setTimeout(() => persistCurrentDraft(), 0);
    },
    [persistCurrentDraft],
  );

  const handleGuestPhotoPrepared = useCallback(
    (key: string, objectUrl: string) => {
      const previousKey = guestPhotoKeyRef.current;
      const previousObjectUrl = guestPhotoObjectUrlRef.current;

      if (previousKey && previousKey !== key) {
        void removeGuestPhoto(previousKey);
      }
      if (previousObjectUrl && previousObjectUrl !== objectUrl) {
        URL.revokeObjectURL(previousObjectUrl);
      }

      guestPhotoKeyRef.current = key;
      guestPhotoObjectUrlRef.current = objectUrl;
      setGuestPhotoKey(key);
      setPhotoSyncState("idle");
      handlePhotoUrlChange(objectUrl);
      window.setTimeout(() => persistCurrentDraft(), 0);
    },
    [handlePhotoUrlChange, persistCurrentDraft],
  );

  const handleGuestPhotoDiscarded = useCallback(() => {
    const key = guestPhotoKeyRef.current;
    const objectUrl = guestPhotoObjectUrlRef.current;

    guestPhotoKeyRef.current = null;
    guestPhotoObjectUrlRef.current = null;
    setGuestPhotoKey(null);
    setPhotoSyncState("idle");

    if (key) void removeGuestPhoto(key);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }, []);

  const handleContinueWithoutGuestPhoto = useCallback(() => {
    handleGuestPhotoDiscarded();
    setDraftPhotoUrl(null);
    draftDataRef.current = {
      ...draftDataRef.current,
      foto_url: undefined,
    };

    if (generatedCvRef.current) {
      generatedCvRef.current = {
        ...generatedCvRef.current,
        foto_url: undefined,
      };
      setCvData(generatedCvRef.current);
    }

    window.setTimeout(
      () => writeStoredDraft(null, activeTabRef.current),
      0,
    );
  }, [handleGuestPhotoDiscarded, writeStoredDraft]);

  const handleRetryGuestPhotoSync = useCallback(() => {
    setPhotoSyncState("uploading");
    setPhotoSyncRetry((value) => value + 1);
  }, []);

  const handleAuthRequired = useCallback(
    (data: DatosCVFormulario, action: ResumeAction) => {
      suspendAutosaveRef.current = true;
      draftDataRef.current = normalizeDraft({
        ...data,
        foto_url: draftPhotoUrl ?? undefined,
      });
      writeStoredDraft(
        action,
        action === "checkout" ? "preview" : "form",
      );
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
    [draftPhotoUrl, initialLanguage, writeStoredDraft],
  );

  const handleCheckoutAuthRequired = useCallback(() => {
    handleAuthRequired(draftDataRef.current, "checkout");
  }, [handleAuthRequired]);

  const handleResumeActionConsumed = useCallback(() => {
    setResumeAction(null);

    const rawDraft = window.sessionStorage.getItem(CREATE_DRAFT_KEY);
    if (rawDraft) {
      try {
        const storedDraft = JSON.parse(rawDraft) as StoredCreateDraft;
        window.sessionStorage.setItem(
          CREATE_DRAFT_KEY,
          JSON.stringify({ ...storedDraft, action: null }),
        );
      } catch {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
      }
    }

    const url = new URL(window.location.href);
    if (url.searchParams.has("resume")) {
      url.searchParams.delete("resume");
      window.history.replaceState(
        {},
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const landingPath = params.get("landing_path");
    const ctaLabel = params.get("cta_label");
    const sourceType = params.get("source_type");

    if (
      landingPath &&
      ctaLabel &&
      (sourceType === "landing" ||
        sourceType === "blog" ||
        sourceType === "tool")
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
      const rawSkillsTransfer = window.sessionStorage.getItem(
        SKILLS_TOOL_TRANSFER_KEY,
      );
      const skillsTransfer = parseSkillsToolTransfer(rawSkillsTransfer);
      if (rawSkillsTransfer) {
        window.sessionStorage.removeItem(SKILLS_TOOL_TRANSFER_KEY);
      }

      const rawDraft = window.sessionStorage.getItem(CREATE_DRAFT_KEY);
      if (!rawDraft) {
        if (skillsTransfer) {
          const restoredData = mergeSkillsToolTransfer(
            createEmptyDraft(),
            skillsTransfer,
          );
          draftDataRef.current = restoredData;
          createIntentRef.current = "skills";
          setCreateIntent("skills");
          generatedCvRef.current = null;
          setCvData(null);
          activeTabRef.current = "template";
          setActiveTab("template");
          suspendAutosaveRef.current = false;
          writeStoredDraft(null, "template");
          toast.success(
            "Cargamos tu puesto y habilidades. Elegí una plantilla para continuar.",
          );
          return;
        }

        if (initialResumeAction === "checkout") {
          toast.error(
            initialLanguage === "en"
              ? "We could not recover that preview. Your saved details are still available if you return to the form."
              : "No pudimos recuperar ese preview. Volvé al formulario para generar el CV nuevamente.",
          );
        }
        return;
      }

      const storedDraft = parseStoredCreateDraft(rawDraft);
      if (!storedDraft) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      const normalizedStoredData = normalizeDraft(storedDraft.data);
      const restoredData = skillsTransfer
        ? mergeSkillsToolTransfer(normalizedStoredData, skillsTransfer)
        : normalizedStoredData;
      if (!hasDraftContent(restoredData)) {
        window.sessionStorage.removeItem(CREATE_DRAFT_KEY);
        return;
      }

      draftDataRef.current = restoredData;
      selectedTemplateRef.current = storedDraft.template;
      setSelectedTemplate(storedDraft.template);
      setDraftPhotoUrl(restoredData.foto_url ?? null);
      guestPhotoKeyRef.current = storedDraft.guestPhotoKey ?? null;
      setGuestPhotoKey(storedDraft.guestPhotoKey ?? null);
      setPhotoSyncState(
        currentUser && storedDraft.guestPhotoKey
          ? "uploading"
          : "idle",
      );
      const restoredIntent = skillsTransfer
        ? "skills"
        : normalizeCreateIntent(storedDraft.intent);
      createIntentRef.current = restoredIntent;
      setCreateIntent(restoredIntent);

      if (skillsTransfer) {
        generatedCvRef.current = null;
        setCvData(null);
        setResumeAction(null);
        activeTabRef.current = "template";
        setActiveTab("template");
        setTemplateFlowTarget("form");
        suspendAutosaveRef.current = false;
        writeStoredDraft(null, "template");
        toast.success(
          "Sumamos las nuevas habilidades sin borrar los datos que ya tenías.",
        );
        return;
      }

      const pendingAction = storedDraft.action ?? initialResumeAction;
      const shouldRestorePreview =
        Boolean(storedDraft.generatedCv) &&
        (storedDraft.flowStep === "preview" || pendingAction === "checkout");

      if (shouldRestorePreview && storedDraft.generatedCv) {
        generatedCvRef.current = storedDraft.generatedCv;
        setCvData(storedDraft.generatedCv);
        activeTabRef.current = "preview";
        setActiveTab("preview");
        suspendAutosaveRef.current = true;

        if (currentUser && pendingAction === "checkout") {
          recordAnalyticsEvent({
            event_name: "auth_completed",
            language: initialLanguage,
            template: storedDraft.template,
            ...getLandingAttribution(),
          });
          handleResumeActionConsumed();
          toast.success(
            initialLanguage === "en"
              ? "Your resume is back. You can complete the payment now."
              : "Recuperamos tu CV. Ya podés completar el pago.",
          );
        } else if (!pendingAction) {
          toast.info(
            initialLanguage === "en"
              ? "We restored your generated resume."
              : "Recuperamos el CV generado en esta pestaña.",
          );
        }

        return;
      }

      generatedCvRef.current = null;
      setCvData(null);
      activeTabRef.current = "form";
      setActiveTab("form");
      suspendAutosaveRef.current = false;

      if (storedDraft.generatedCvInvalid || pendingAction === "checkout") {
        handleResumeActionConsumed();
        writeStoredDraft(null, "form");
        toast.error(
          initialLanguage === "en"
            ? "The preview could not be recovered, but your original details are still here."
            : "No pudimos recuperar el preview, pero conservamos tus datos originales.",
        );
        return;
      }

      if (currentUser && pendingAction) {
        setResumeAction(pendingAction);
        recordAnalyticsEvent({
          event_name: "auth_completed",
          language: initialLanguage,
          template: storedDraft.template,
          ...getLandingAttribution(),
        });
        if (pendingAction === "photo") {
          toast.success(
            initialLanguage === "en"
              ? "Session ready. You can upload the photo now."
              : "Sesión lista. Ya podés subir la foto.",
          );
        }
      } else if (!pendingAction) {
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
  }, [
    currentUser,
    handleResumeActionConsumed,
    initialLanguage,
    initialResumeAction,
    writeStoredDraft,
  ]);

  useEffect(() => {
    if (!draftReady || !guestPhotoKey || guestPhotoHydrationRef.current) {
      return;
    }
    if (!currentUser && guestPhotoObjectUrlRef.current) return;

    const hydrateAndSyncPhoto = async () => {
      const blob = await getGuestPhoto(guestPhotoKey);
      if (guestPhotoKeyRef.current !== guestPhotoKey) return;

      if (!blob) {
        guestPhotoKeyRef.current = null;
        setGuestPhotoKey(null);
        setPhotoSyncState("idle");
        writeStoredDraft(null, activeTabRef.current);
        toast.error(
          initialLanguage === "en"
            ? "The temporary photo expired. Your resume details are still saved."
            : "La foto temporal venció, pero conservamos todos los datos del CV.",
        );
        return;
      }

      let objectUrl = guestPhotoObjectUrlRef.current;
      if (!objectUrl) {
        objectUrl = URL.createObjectURL(blob);
        guestPhotoObjectUrlRef.current = objectUrl;
      }

      setDraftPhotoUrl(objectUrl);
      draftDataRef.current = {
        ...draftDataRef.current,
        foto_url: objectUrl,
      };

      if (generatedCvRef.current) {
        generatedCvRef.current = {
          ...generatedCvRef.current,
          foto_url: objectUrl,
        };
        setCvData(generatedCvRef.current);
      }

      if (!currentUser) {
        setPhotoSyncState("idle");
        return;
      }

      setPhotoSyncState("uploading");
      const { createClient } = await import("@/utils/supabase/client");
      const supabase = createClient();
      const extension = guestPhotoExtension(blob);
      const filePath =
        `fotos/user-${currentUser.id}/` +
        `${Date.now()}-${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("fotos-perfil")
        .upload(filePath, blob, {
          contentType: blob.type,
          upsert: false,
        });

      if (uploadError) throw uploadError;
      if (guestPhotoKeyRef.current !== guestPhotoKey) return;

      const { data: publicPhoto } = supabase.storage
        .from("fotos-perfil")
        .getPublicUrl(filePath);
      const publicUrl = publicPhoto.publicUrl;

      setDraftPhotoUrl(publicUrl);
      draftDataRef.current = {
        ...draftDataRef.current,
        foto_url: publicUrl,
      };

      if (generatedCvRef.current) {
        generatedCvRef.current = {
          ...generatedCvRef.current,
          foto_url: publicUrl,
        };
        setCvData(generatedCvRef.current);
      }

      guestPhotoKeyRef.current = null;
      guestPhotoObjectUrlRef.current = null;
      setGuestPhotoKey(null);
      setPhotoSyncState("idle");
      await removeGuestPhoto(guestPhotoKey);
      URL.revokeObjectURL(objectUrl);
      writeStoredDraft(null, activeTabRef.current);
    };

    const hydration = hydrateAndSyncPhoto()
      .catch((photoError) => {
        console.error("No se pudo sincronizar la foto temporal", photoError);
        setPhotoSyncState("error");
        toast.error(
          initialLanguage === "en"
            ? "We could not save the photo yet. You can retry without losing your resume."
            : "Todavía no pudimos guardar la foto. Podés reintentar sin perder el CV.",
        );
      })
      .finally(() => {
        guestPhotoHydrationRef.current = null;
      });

    guestPhotoHydrationRef.current = hydration;
  }, [
    currentUser,
    draftReady,
    guestPhotoKey,
    initialLanguage,
    photoSyncRetry,
    writeStoredDraft,
  ]);

  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
      persistCurrentDraft();
      if (guestPhotoObjectUrlRef.current) {
        URL.revokeObjectURL(guestPhotoObjectUrlRef.current);
      }
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
                onGuestPhotoPrepared={handleGuestPhotoPrepared}
                onGuestPhotoDiscarded={handleGuestPhotoDiscarded}
                onChangeTemplate={() => navigateToStep("template")}
                autoGenerate={Boolean(currentUser && resumeAction === "generate")}
                onResumeActionConsumed={handleResumeActionConsumed}
              />
            ) : null}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {cvData ? (
              <CVPreviewStep
                cvData={cvData}
                template={selectedTemplate}
                onBack={() => navigateToStep("form")}
                onChangeTemplate={() => {
                  setTemplateFlowTarget("preview");
                  navigateToStep("template");
                }}
                currentUser={currentUser}
                onAuthRequired={handleCheckoutAuthRequired}
                photoSyncState={photoSyncState}
                onRetryPhotoSync={handleRetryGuestPhotoSync}
                onContinueWithoutPhoto={handleContinueWithoutGuestPhoto}
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
