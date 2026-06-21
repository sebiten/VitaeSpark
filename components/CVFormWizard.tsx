"use client";

import type { ChangeEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  FileText,
  GraduationCap,
  Hammer,
  Languages,
  Loader2,
  Mail,
  MoreHorizontal,
  Palette,
  Sparkles,
  Trash2,
  Upload,
  User,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getLandingAttribution } from "@/lib/analytics-attribution";
import type { AppLanguage } from "@/lib/i18n";
import type { DatosCVFormulario } from "@/lib/types/cv";
import { cn } from "@/lib/utils";

type FormCopy = {
  badge: string;
  title: string;
  description: string;
  currentTemplate: string;
  changeTemplate: string;
  fillTest: string;
  clear: string;
  basicTitle: string;
  basicDescription: string;
  fullName: string;
  fullNamePlaceholder: string;
  role: string;
  rolePlaceholder: string;
  contact: string;
  contactPlaceholder: string;
  photo: string;
  uploadImage: string;
  photoUnavailableTitle: string;
  photoUnavailableText: string;
  summaryTitle: string;
  summaryDescription: string;
  summaryPlaceholder: string;
  experienceTitle: string;
  experienceDescription: string;
  experiencePlaceholder: string;
  educationTitle: string;
  educationDescription: string;
  educationPlaceholder: string;
  skillsTitle: string;
  skillsDescription: string;
  skills: string;
  skillsPlaceholder: string;
  languages: string;
  languagesPlaceholder: string;
  additional: string;
  additionalPlaceholder: string;
  generate: string;
  generating: string;
};

type Props = {
  copy: FormCopy;
  language: AppLanguage;
  template: string;
  templateName: string;
  form: UseFormReturn<DatosCVFormulario>;
  fotoUrl: string | null;
  isGenerating: boolean;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (data: DatosCVFormulario) => Promise<void>;
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onFillSample: () => void;
  onClear: () => void;
  onChangeTemplate: () => void;
};

type WizardStep = {
  id: "basic" | "summary" | "experience" | "education" | "skills";
  icon: LucideIcon;
  title: string;
  description: string;
  example: string;
  helperTitle: string;
  helperText: string;
  fields: Path<DatosCVFormulario>[];
};

const wizardChromeCopy = {
  es: {
    opened: "CV Wizard Opened",
    stepViewed: "CV Wizard Step Viewed",
    stepCompleted: "CV Wizard Step Completed",
    abandoned: "CV Wizard Abandoned",
    stepLabel: "Paso",
    progressLabel: "Progreso",
    back: "Volver",
    continue: "Continuar",
    options: "Opciones",
    stepCount: (current: number, total: number) => `${current}/${total}`,
    wizardTitle: "Completa tus datos paso a paso",
    wizardDescription:
      "Escribe lo importante. Tus datos se conservan dentro del flujo y podes cambiar de plantilla sin volver a cargar todo.",
    exampleLabel: "Ejemplo",
    helpLabel: "Tip para esta seccion",
    changeTemplate: "Cambiar plantilla",
    fillSample: "Rellenar prueba",
    clear: "Limpiar",
    changeTemplateConfirm:
      "Vas a volver al selector de plantillas. Tus datos se mantienen en esta sesion. Quieres continuar?",
    photoFormats: "JPG, PNG o WebP",
    finalHelperTitle: "Cierra con datos concretos",
    finalHelperText:
      "No repitas habilidades en todos los campos. Deja links, portfolio, disponibilidad o certificaciones solo en extras.",
    continueTo: "Continuar a",
    suggestedPreview: "Vista sugerida",
    lockedLabel: "bloqueado",
  },
  en: {
    opened: "CV Wizard Opened",
    stepViewed: "CV Wizard Step Viewed",
    stepCompleted: "CV Wizard Step Completed",
    abandoned: "CV Wizard Abandoned",
    stepLabel: "Step",
    progressLabel: "Progress",
    back: "Back",
    continue: "Continue",
    options: "Options",
    stepCount: (current: number, total: number) => `${current}/${total}`,
    wizardTitle: "Complete your resume details step by step",
    wizardDescription:
      "Write the essentials. Your details stay in this flow, so you can change templates without starting over.",
    exampleLabel: "Example",
    helpLabel: "Tip for this section",
    changeTemplate: "Change template",
    fillSample: "Fill sample",
    clear: "Clear",
    changeTemplateConfirm:
      "You will go back to the template selector. Your details stay in this session. Do you want to continue?",
    photoFormats: "JPG, PNG or WebP",
    finalHelperTitle: "Finish with specific details",
    finalHelperText:
      "Avoid repeating the same skills in every field. Use extras only for links, portfolio, availability or certifications.",
    continueTo: "Continue to",
    suggestedPreview: "Suggested preview",
    lockedLabel: "locked",
  },
} as const;

export default function CVFormWizard({
  copy,
  language,
  template,
  templateName,
  form,
  fotoUrl,
  isGenerating,
  isSubmitting,
  error,
  onSubmit,
  onImageUpload,
  onFillSample,
  onClear,
  onChangeTemplate,
}: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const chrome = wizardChromeCopy[language];
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    getValues,
  } = form;

  const steps = useMemo<WizardStep[]>(
    () => [
      {
        id: "basic",
        icon: User,
        title: copy.basicTitle,
        description: copy.basicDescription,
        example: copy.contactPlaceholder,
        helperTitle:
          language === "en"
            ? "Use real contact details"
            : "Usa datos reales de contacto",
        helperText:
          language === "en"
            ? "Add your city, email, phone number and one professional link such as LinkedIn or GitHub."
            : "Agrega ciudad, email, telefono y un link profesional como LinkedIn o GitHub.",
        fields: ["nombre", "puesto", "contacto"],
      },
      {
        id: "summary",
        icon: BookOpen,
        title: copy.summaryTitle,
        description: copy.summaryDescription,
        example: copy.summaryPlaceholder,
        helperTitle:
          language === "en" ? "Write it naturally first" : "Escribelo natural primero",
        helperText:
          language === "en"
            ? "Say who you are, what you do and what kind of role you are aiming for. Clarity matters more than polish here."
            : "Cuenta quien eres, que haces y hacia que rol apuntas. Aqui importa mas la claridad que sonar perfecto.",
        fields: ["sobreMi"],
      },
      {
        id: "experience",
        icon: Briefcase,
        title: copy.experienceTitle,
        description: copy.experienceDescription,
        example: copy.experiencePlaceholder,
        helperTitle:
          language === "en"
            ? "Think one role at a time"
            : "Piensa un rol por bloque",
        helperText:
          language === "en"
            ? "Start with role, dates, company or project and location. Then explain what you actually did, without wording it like a formal resume yet."
            : "Empieza con puesto, fechas, empresa o proyecto y lugar. Luego cuenta lo que hiciste, sin preocuparte todavia por redactarlo como CV final.",
        fields: ["experiencia"],
      },
      {
        id: "education",
        icon: GraduationCap,
        title: copy.educationTitle,
        description: copy.educationDescription,
        example: copy.educationPlaceholder,
        helperTitle:
          language === "en"
            ? "Formal and self-taught both count"
            : "Formal y autodidacta, ambos suman",
        helperText:
          language === "en"
            ? "Include studies, courses or self-taught learning if they support the role you want. It helps give context to your profile."
            : "Incluye estudios, cursos o aprendizaje autodidacta si sostienen el rol que buscas. Eso le da contexto real a tu perfil.",
        fields: ["formacion"],
      },
      {
        id: "skills",
        icon: Hammer,
        title: copy.skillsTitle,
        description: copy.skillsDescription,
        example: `${copy.skillsPlaceholder}\n\n${copy.languagesPlaceholder}\n\n${copy.additionalPlaceholder}`,
        helperTitle: chrome.finalHelperTitle,
        helperText: chrome.finalHelperText,
        fields: ["habilidades", "idiomas"],
      },
    ],
    [chrome.finalHelperText, chrome.finalHelperTitle, copy, language],
  );

  const currentStep = steps[stepIndex];
  const progressValue = ((stepIndex + 1) / steps.length) * 100;
  const nextStep = steps[stepIndex + 1];
  const nextButtonLabel = nextStep
    ? `${chrome.continueTo} ${nextStep.title.toLowerCase()}`
    : chrome.continue;

  useEffect(() => {
    track(chrome.opened, {
      template,
      language,
      ...getLandingAttribution(),
    });
  }, [chrome.opened, language, template]);

  useEffect(() => {
    track(chrome.stepViewed, {
      template,
      language,
      step_id: currentStep.id,
      step_title: currentStep.title,
      step_index: stepIndex + 1,
      total_steps: steps.length,
      ...getLandingAttribution(),
    });
  }, [
    chrome.stepViewed,
    currentStep.id,
    currentStep.title,
    language,
    stepIndex,
    steps.length,
    template,
  ]);

  const hasLoadedData = () => {
    const values = getValues();
    return (
      Boolean(fotoUrl) ||
      Object.values(values).some((value) =>
        typeof value === "string" ? value.trim().length > 0 : Boolean(value),
      )
    );
  };

  const handleExit = () => {
    const shouldExit =
      !hasLoadedData() ||
      window.confirm(chrome.changeTemplateConfirm);

    if (!shouldExit) {
      return;
    }

    track(chrome.abandoned, {
      template,
      language,
      reason: "change_template",
      step_id: currentStep.id,
      step_index: stepIndex + 1,
      ...getLandingAttribution(),
    });

    onChangeTemplate();
  };

  const handleStepBack = () => {
    if (stepIndex === 0) {
      handleExit();
      return;
    }
    setStepIndex((prev) => prev - 1);
  };

  const handleNext = async () => {
    const isValid = await trigger(currentStep.fields, { shouldFocus: true });
    if (!isValid) return;

    track(chrome.stepCompleted, {
      template,
      language,
      step_id: currentStep.id,
      step_title: currentStep.title,
      step_index: stepIndex + 1,
      total_steps: steps.length,
      ...getLandingAttribution(),
    });

    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleStepSelect = (targetIndex: number) => {
    if (targetIndex > stepIndex) return;
    setStepIndex(targetIndex);
  };

  const handleFinalSubmit = handleSubmit(async (data) => {
    track(chrome.stepCompleted, {
      template,
      language,
      step_id: currentStep.id,
      step_title: currentStep.title,
      step_index: stepIndex + 1,
      total_steps: steps.length,
      ...getLandingAttribution(),
    });
    await onSubmit(data);
  });

  return (
    <form
      onSubmit={handleFinalSubmit}
      className="relative flex min-h-[calc(100dvh-8rem)] flex-col overflow-hidden rounded-[30px] border border-white/8 bg-[#0d0d11] text-white shadow-[0_24px_80px_rgba(8,8,18,0.36)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.14),_transparent_60%)]" />
      <div className="sticky top-2 z-30 px-3 pt-3 sm:px-6 sm:pt-6">
            <div className="relative rounded-[28px] border border-white/8 bg-[#141419]/96 px-3 py-3 shadow-[0_16px_40px_rgba(5,5,14,0.2)] sm:px-5 sm:py-4">
              <div className="relative flex items-start gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStepBack}
                  className="mt-0.5 h-10 rounded-2xl border-white/10 bg-white/[0.035] px-3 text-white/82 transition-all hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.07] hover:text-white sm:min-w-[96px] sm:justify-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{chrome.back}</span>
                </Button>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d1d4e6]">
                      <Wand2 className="h-3.5 w-3.5" />
                      {copy.badge}
                    </div>
                    <span className="rounded-full border border-[#7c4dd4]/18 bg-[#7c4dd4]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#d8cbf7]">
                      {chrome.stepLabel} {chrome.stepCount(stepIndex + 1, steps.length)}
                    </span>
                    <span className="inline-flex rounded-full border border-white/8 bg-[#111116] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/62">
                      {templateName}
                    </span>
                  </div>

                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="truncate text-[1.15rem] font-semibold tracking-[-0.03em] text-[#F4F4F8] sm:text-[1.35rem]">
                        {chrome.wizardTitle}
                      </h2>
                      <p className="mt-1 max-w-2xl text-[13px] leading-5 text-white/64 sm:text-sm sm:leading-6">
                        {chrome.wizardDescription}
                      </p>
                    </div>
                    <div className="hidden min-w-[120px] text-right lg:block">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">
                        {chrome.progressLabel}
                      </p>
                      <p className="mt-1 text-sm font-medium text-white/78">
                        {Math.round(progressValue)}%
                      </p>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-white/78 transition-all hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                      aria-label={chrome.options}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-2xl border-white/10 bg-[#12121A]/96 p-1.5 text-white shadow-[0_20px_60px_rgba(5,5,12,0.55)] backdrop-blur-xl"
                  >
                    <DropdownMenuItem
                      onClick={handleExit}
                      className="rounded-xl px-3 py-2.5 text-white/80 focus:bg-white/[0.06] focus:text-white"
                    >
                      <Palette className="h-4 w-4 text-[#38BDF8]" />
                      {chrome.changeTemplate}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onFillSample}
                      className="rounded-xl px-3 py-2.5 text-white/80 focus:bg-white/[0.06] focus:text-white"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#A78BFA]" />
                      {chrome.fillSample}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={onClear}
                      className="rounded-xl px-3 py-2.5 text-white/80 focus:bg-white/[0.06] focus:text-white"
                    >
                      <Trash2 className="h-4 w-4 text-white/55" />
                      {chrome.clear}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="relative mt-4">
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/46">
                  <span>{currentStep.title}</span>
                  <span className="font-medium text-white/68">
                    {chrome.stepCount(stepIndex + 1, steps.length)}
                  </span>
                </div>
                <div className="relative">
                  <Progress
                    value={progressValue}
                    className="h-1.5 rounded-full bg-white/[0.05] [&_[data-slot=progress-indicator]]:bg-[#7c4dd4]"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {steps.map((step, index) => {
                    const isActive = index === stepIndex;
                    const isDone = index < stepIndex;
                    const isLocked = index > stepIndex;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleStepSelect(index)}
                        disabled={isLocked}
                        className={cn(
                          "group inline-flex shrink-0 items-center gap-2.5 rounded-[20px] border px-3 py-2.5 text-left transition-all duration-200",
                          isActive
                            ? "border-[#8b5cf6]/26 bg-[#1b1824] text-white shadow-[0_10px_24px_rgba(90,41,179,0.14)]"
                            : isDone
                              ? "border-white/10 bg-white/[0.04] text-white/76 hover:border-white/15 hover:bg-white/[0.06]"
                              : "border-white/8 bg-white/[0.02] text-white/52",
                          isLocked && "cursor-not-allowed opacity-75",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-2xl border text-[11px] transition-colors",
                            isActive
                              ? "border-[#8b5cf6]/18 bg-[#8b5cf6]/10 text-[#efe8ff]"
                              : isDone
                                ? "border-white/10 bg-white/[0.07] text-white/76"
                                : "border-white/8 bg-white/[0.03] text-white/48",
                          )}
                        >
                          <step.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="flex min-w-0 flex-col">
                          <span className="hidden text-[10px] uppercase tracking-[0.16em] text-white/34 sm:inline">
                            {chrome.stepLabel} {index + 1}
                          </span>
                          <span className="hidden text-[12px] font-medium sm:inline">
                            {step.title}
                          </span>
                        </span>
                        {isLocked ? (
                          <span className="hidden text-[10px] uppercase tracking-[0.16em] text-white/24 sm:inline">
                            {chrome.lockedLabel}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 px-3 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
              <AnimatePresence mode="wait">
                <motion.section
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-[30px] border border-white/8 bg-[#121217] p-5 shadow-[0_18px_48px_rgba(6,6,14,0.16)] sm:p-7"
                >
                  <div className="mb-6 flex items-start gap-4 sm:mb-8">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-[22px] border border-white/8 bg-[#171720] text-[#d8cbf7] shadow-[0_10px_24px_rgba(8,8,18,0.14)]">
                      <currentStep.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/46">
                        {chrome.stepLabel} {stepIndex + 1} - {templateName}
                      </p>
                      <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#F5F5FA] sm:text-[1.45rem]">
                        {currentStep.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[14px] leading-6 text-white/67 sm:text-[15px]">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>

                  <StepFields
                    stepId={currentStep.id}
                    copy={copy}
                    template={template}
                    fotoUrl={fotoUrl}
                    register={register}
                    errors={errors}
                    onImageUpload={onImageUpload}
                    fieldClass={FIELD_CLASS}
                    textareaClass={TEXTAREA_CLASS}
                    photoFormats={chrome.photoFormats}
                  />
                </motion.section>
              </AnimatePresence>

              <aside className="space-y-3 lg:sticky lg:top-0 lg:self-start lg:space-y-4">
                <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#121217] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#8DDCFF]">
                      <FileText className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#8DDCFF]">
                      {chrome.exampleLabel}
                    </p>
                  </div>
                  <ExamplePreview step={currentStep} previewLabel={chrome.suggestedPreview} />
                </div>

                <div className="rounded-[28px] border border-white/8 bg-[#141419] p-4 shadow-[0_12px_32px_rgba(8,8,18,0.12)] sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-[#1a1822] text-[#d8cbf7]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#d8cbf7]">
                      {chrome.helpLabel}
                    </p>
                  </div>
                  <p className="text-[15px] font-medium text-[#F4F2FF]">
                    {currentStep.helperTitle}
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-white/72 sm:text-sm">
                    {currentStep.helperText}
                  </p>
                </div>

                {error ? (
                  <div className="rounded-[24px] border border-red-500/24 bg-red-500/10 p-4 text-sm text-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>

          <div className="pointer-events-none sticky bottom-3 z-30 px-3 pb-3 sm:px-6 sm:pb-6">
            <div className="pointer-events-auto rounded-[28px] border border-white/8 bg-[#111116]/96 p-2 shadow-[0_-12px_40px_rgba(7,7,16,0.12),0_18px_48px_rgba(4,4,10,0.24)] backdrop-blur-xl">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStepBack}
                  className="h-11 rounded-2xl border-white/10 bg-white/[0.035] px-4 text-white/82 transition-all hover:-translate-y-px hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{chrome.back}</span>
                </Button>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center justify-between px-1 text-[11px] text-white/46">
                    <span>{currentStep.title}</span>
                    <span>{chrome.stepCount(stepIndex + 1, steps.length)}</span>
                  </div>
                  {stepIndex < steps.length - 1 ? (
                    <Button
                      key={`next-${currentStep.id}`}
                      type="button"
                      onClick={handleNext}
                      className="h-12 w-full rounded-[22px] bg-[#6f3cd2] px-5 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(109,40,217,0.2)] transition-all hover:-translate-y-px hover:bg-[#7a47dd] hover:shadow-[0_18px_34px_rgba(109,40,217,0.26)]"
                    >
                      <span>{nextButtonLabel}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      key={`submit-${currentStep.id}`}
                      type="submit"
                      disabled={isGenerating || isSubmitting}
                      className="h-12 w-full rounded-[22px] bg-[#6f3cd2] px-5 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(109,40,217,0.2)] transition-all hover:-translate-y-px hover:bg-[#7a47dd] hover:shadow-[0_18px_34px_rgba(109,40,217,0.26)] disabled:translate-y-0 disabled:bg-[#5f34b0] disabled:shadow-[0_8px_18px_rgba(109,40,217,0.12)]"
                    >
                      <Sparkles className="h-4 w-4" />
                      {isGenerating || isSubmitting ? copy.generating : copy.generate}
                      {isGenerating || isSubmitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : null}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
    </form>
  );
}

function ExamplePreview({
  step,
  previewLabel,
}: {
  step: WizardStep;
  previewLabel: string;
}) {
  if (step.id === "basic") {
    return (
      <div className="rounded-[24px] border border-white/8 bg-[#101015] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
        <p className="text-lg font-semibold tracking-[-0.02em] text-[#F4F4F8]">
          Sebastian Lopez
        </p>
        <p className="mt-1 text-sm text-[#C9C8D7]">Desarrollador web junior</p>
        <div className="my-4 h-px bg-white/8" />
        <div className="space-y-2 text-[13px] leading-6 text-white/70">
          <p>Salta, Argentina</p>
          <p>sebastian@email.com</p>
          <p>+54 9 387 ...</p>
          <p>linkedin.com/in/sebastianlopez</p>
        </div>
      </div>
    );
  }

  const exampleLines = step.example
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="rounded-[24px] border border-white/8 bg-[#101015] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/42">
        {previewLabel}
      </p>
      <div className="mt-3 space-y-2">
        {exampleLines.map((line) => (
          <div
            key={line}
            className="rounded-2xl border border-white/6 bg-white/[0.025] px-3 py-2 text-[13px] leading-6 text-white/72"
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepFields({
  stepId,
  copy,
  template,
  fotoUrl,
  register,
  errors,
  onImageUpload,
  fieldClass,
  textareaClass,
  photoFormats,
}: {
  stepId: WizardStep["id"];
  copy: FormCopy;
  template: string;
  fotoUrl: string | null;
  register: UseFormReturn<DatosCVFormulario>["register"];
  errors: UseFormReturn<DatosCVFormulario>["formState"]["errors"];
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  fieldClass: string;
  textareaClass: string;
  photoFormats: string;
}) {
  if (stepId === "basic") {
    const allowsPhoto = template !== "harvard";

    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldError message={errors.nombre?.message}>
            <FieldLabel>{copy.fullName}</FieldLabel>
            <input
              {...register("nombre")}
              className={fieldClass}
              placeholder={copy.fullNamePlaceholder}
            />
          </FieldError>

          <FieldError message={errors.puesto?.message}>
            <FieldLabel>{copy.role}</FieldLabel>
            <input
              {...register("puesto")}
              className={fieldClass}
              placeholder={copy.rolePlaceholder}
            />
          </FieldError>
        </div>

        <div
          className={cn(
            "grid gap-4",
            allowsPhoto ? "md:grid-cols-[minmax(0,1fr)_250px]" : "",
          )}
        >
          <FieldError message={errors.contacto?.message}>
            <FieldLabel icon={Mail}>{copy.contact}</FieldLabel>
            <textarea
              {...register("contacto")}
              rows={6}
              className={textareaClass}
              placeholder={copy.contactPlaceholder}
            />
          </FieldError>

          {allowsPhoto ? (
            <div>
              <FieldLabel icon={Upload}>{copy.photo}</FieldLabel>
              <label className="group flex min-h-[172px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/12 bg-[#141419] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] transition-all hover:-translate-y-px hover:border-[#8B5CF6]/24 hover:bg-[#171720]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="sr-only"
                />
                {fotoUrl ? (
                  <img
                    src={fotoUrl}
                    alt={copy.photo}
                    className="h-24 w-24 rounded-[20px] border border-white/10 object-cover shadow-[0_12px_28px_rgba(6,6,12,0.28)]"
                  />
                ) : (
                  <>
                    <div className="mb-2 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/62 transition-colors group-hover:text-white/86">
                      <Upload className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-white/84">
                      {copy.uploadImage}
                    </span>
                    <span className="mt-1 text-xs text-white/46">{photoFormats}</span>
                  </>
                )}
              </label>
            </div>
          ) : (
            <div className="rounded-[24px] border border-white/8 bg-[#141419] p-4 text-sm leading-6 text-white/64 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
              <FieldLabel icon={Upload}>{copy.photo}</FieldLabel>
              <p className="font-medium text-white/86">{copy.photoUnavailableTitle}</p>
              <p className="mt-1">{copy.photoUnavailableText}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (stepId === "summary") {
    return (
      <FieldError message={errors.sobreMi?.message}>
        <textarea
          {...register("sobreMi")}
          rows={7}
          className={textareaClass}
          placeholder={copy.summaryPlaceholder}
        />
      </FieldError>
    );
  }

  if (stepId === "experience") {
    return (
      <FieldError message={errors.experiencia?.message}>
        <textarea
          {...register("experiencia")}
          rows={11}
          className={textareaClass}
          placeholder={copy.experiencePlaceholder}
        />
      </FieldError>
    );
  }

  if (stepId === "education") {
    return (
      <FieldError message={errors.formacion?.message}>
        <textarea
          {...register("formacion")}
          rows={9}
          className={textareaClass}
          placeholder={copy.educationPlaceholder}
        />
      </FieldError>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FieldError message={errors.habilidades?.message}>
          <FieldLabel icon={Hammer}>{copy.skills}</FieldLabel>
          <textarea
            {...register("habilidades")}
            rows={6}
            className={textareaClass}
            placeholder={copy.skillsPlaceholder}
          />
        </FieldError>

        <FieldError message={errors.idiomas?.message}>
          <FieldLabel icon={Languages}>{copy.languages}</FieldLabel>
          <textarea
            {...register("idiomas")}
            rows={6}
            className={textareaClass}
            placeholder={copy.languagesPlaceholder}
          />
        </FieldError>
      </div>

      <div>
        <FieldLabel icon={FileText}>{copy.additional}</FieldLabel>
        <textarea
          {...register("informacionAdicional")}
          rows={5}
          className={textareaClass}
          placeholder={copy.additionalPlaceholder}
        />
      </div>
    </div>
  );
}

function FieldLabel({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <Label className="mb-2.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/56">
      {Icon ? <Icon className="h-3.5 w-3.5 text-[#9AD8FF]" /> : null}
      {children}
    </Label>
  );
}

function FieldError({
  children,
  message,
}: {
  children: ReactNode;
  message?: string;
}) {
  return (
    <div>
      {children}
      {message ? (
        <p className="mt-2 flex items-center text-xs text-red-300">
          <AlertCircle className="mr-1.5 h-3.5 w-3.5 shrink-0" />
          {message}
        </p>
      ) : null}
    </div>
  );
}

const FIELD_CLASS =
  "h-12 w-full rounded-[22px] border border-white/8 bg-[#141419] px-4 text-[15px] text-[#F3F3F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] outline-none transition-all placeholder:text-white/42 focus:border-[#8B5CF6]/28 focus:bg-[#17171d] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.08),0_10px_24px_rgba(4,4,12,0.14)] sm:text-sm";
const TEXTAREA_CLASS =
  "w-full min-h-[168px] resize-y rounded-[24px] border border-white/8 bg-[#141419] px-4 py-3.5 text-[15px] leading-7 text-[#F3F3F7] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] outline-none transition-all placeholder:text-white/42 focus:border-[#8B5CF6]/28 focus:bg-[#17171d] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.08),0_10px_24px_rgba(4,4,12,0.14)] sm:text-sm";
