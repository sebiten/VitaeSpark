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
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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
    close: "Cerrar",
    options: "Opciones",
    stepCount: (current: number, total: number) => `${current}/${total}`,
    wizardTitle: "Completa tus datos paso a paso",
    wizardDescription:
      "Escribe lo importante. La IA se encarga de convertirlo en un CV ordenado y profesional.",
    exampleLabel: "Ejemplo",
    helpLabel: "Guia breve",
    changeTemplate: "Cambiar plantilla",
    fillSample: "Rellenar prueba",
    clear: "Limpiar",
    confirmClose:
      "Hay datos cargados en el formulario. Si cierras ahora, vas a salir del paso y tendras que volver a abrirlo. Quieres continuar?",
    changeTemplateConfirm:
      "Hay datos cargados. Si cambias la plantilla volveras al selector. Quieres continuar?",
    photoFormats: "JPG, PNG o WebP",
    finalHelperTitle: "Cierra con datos concretos",
    finalHelperText:
      "No repitas habilidades en todos los campos. Deja links, portfolio, disponibilidad o certificaciones solo en extras.",
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
    close: "Close",
    options: "Options",
    stepCount: (current: number, total: number) => `${current}/${total}`,
    wizardTitle: "Complete your resume details step by step",
    wizardDescription:
      "Write the essentials. AI will turn them into a cleaner, professional resume.",
    exampleLabel: "Example",
    helpLabel: "Quick guide",
    changeTemplate: "Change template",
    fillSample: "Fill sample",
    clear: "Clear",
    confirmClose:
      "There is information in the form. If you close now, you will leave this step and need to reopen it. Do you want to continue?",
    changeTemplateConfirm:
      "There is information in the form. If you change the template, you will go back to the selector. Do you want to continue?",
    photoFormats: "JPG, PNG or WebP",
    finalHelperTitle: "Finish with specific details",
    finalHelperText:
      "Avoid repeating the same skills in every field. Use extras only for links, portfolio, availability or certifications.",
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
  const [open, setOpen] = useState(true);
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
          language === "en" ? "Use direct contact info" : "Usa contacto directo",
        helperText:
          language === "en"
            ? "Add city, email, phone and one relevant link. Recruiters should understand how to contact you in seconds."
            : "Incluye ciudad, email, telefono y un link relevante. Tiene que quedar claro como contactarte en segundos.",
        fields: ["nombre", "puesto", "contacto"],
      },
      {
        id: "summary",
        icon: BookOpen,
        title: copy.summaryTitle,
        description: copy.summaryDescription,
        example: copy.summaryPlaceholder,
        helperTitle:
          language === "en" ? "Short and concrete works better" : "Mejor corto y concreto",
        helperText:
          language === "en"
            ? "Mention your profile, your main stack or skills and the type of role you want. Do not force polished wording here."
            : "Menciona tu perfil, stack o habilidades principales y el tipo de rol que buscas. No hace falta que quede perfecto todavia.",
        fields: ["sobreMi"],
      },
      {
        id: "experience",
        icon: Briefcase,
        title: copy.experienceTitle,
        description: copy.experienceDescription,
        example: copy.experiencePlaceholder,
        helperTitle:
          language === "en" ? "One block per role or project" : "Un bloque por rol o proyecto",
        helperText:
          language === "en"
            ? "Start with role, dates, company or project and location. Then describe what you built or handled in plain language."
            : "Empieza con puesto, fechas, empresa o proyecto y lugar. Luego explica lo que hiciste con lenguaje simple.",
        fields: ["experiencia"],
      },
      {
        id: "education",
        icon: GraduationCap,
        title: copy.educationTitle,
        description: copy.educationDescription,
        example: copy.educationPlaceholder,
        helperTitle:
          language === "en" ? "Formal or self-taught both count" : "Formal o autodidacta, ambos suman",
        helperText:
          language === "en"
            ? "If you learned through projects or documentation, write it. For many entry-level profiles, that adds useful context."
            : "Si aprendiste con proyectos o documentacion, escribelo. En perfiles iniciales eso suma contexto real.",
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

  const handleExit = (reason: "close" | "change_template") => {
    const shouldExit =
      !hasLoadedData() ||
      window.confirm(
        reason === "change_template"
          ? chrome.changeTemplateConfirm
          : chrome.confirmClose,
      );

    if (!shouldExit) {
      setOpen(true);
      return;
    }

    track(chrome.abandoned, {
      template,
      language,
      reason,
      step_id: currentStep.id,
      step_index: stepIndex + 1,
      ...getLandingAttribution(),
    });

    setOpen(false);
    onChangeTemplate();
  };

  const handleStepBack = () => {
    if (stepIndex === 0) {
      handleExit("change_template");
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
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          setOpen(true);
          return;
        }
        handleExit("close");
      }}
    >
      <DialogContent className="fixed inset-0 z-50 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden rounded-none border-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_28%),linear-gradient(180deg,_#111116_0%,_#0A0A0D_100%)] p-0 text-white shadow-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[min(90vh,920px)] sm:w-[min(100vw-2rem,1100px)] sm:max-w-[1100px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px] sm:border sm:border-white/10 sm:shadow-[0_24px_80px_rgba(8,8,18,0.65)] [&>button]:hidden">
        <DialogTitle className="sr-only">{chrome.wizardTitle}</DialogTitle>
        <DialogDescription className="sr-only">
          {chrome.wizardDescription}
        </DialogDescription>

        <form onSubmit={handleFinalSubmit} className="flex h-full min-h-0 flex-col">
          <div className="sticky top-0 z-30 px-3 pt-3 sm:px-6 sm:pt-6">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(19,19,28,0.94)_0%,rgba(13,13,19,0.9)_100%)] px-3 py-3 shadow-[0_12px_40px_rgba(7,7,16,0.42),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl sm:px-5 sm:py-4">
              <div className="flex items-start gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStepBack}
                  className="mt-0.5 h-10 rounded-2xl border-white/12 bg-white/[0.04] px-3 text-white/72 transition-all hover:-translate-y-px hover:bg-white/[0.08] hover:text-white sm:min-w-[96px] sm:justify-start"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{chrome.back}</span>
                </Button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/18 bg-[#38BDF8]/8 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#67D2FF]">
                      <Wand2 className="h-3.5 w-3.5" />
                      {copy.badge}
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/45">
                      {chrome.stepCount(stepIndex + 1, steps.length)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <h2 className="truncate text-[1.2rem] font-semibold tracking-[-0.02em] text-white sm:text-[1.45rem]">
                      {currentStep.title}
                    </h2>
                    <span className="hidden rounded-full border border-white/8 bg-white/[0.03] px-2 py-1 text-[11px] text-white/45 sm:inline-flex">
                      {templateName}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 pr-3 text-[13px] leading-5 text-white/55 sm:text-sm sm:leading-6">
                    {currentStep.description}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-white/72 transition-all hover:-translate-y-px hover:bg-white/[0.08] hover:text-white"
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
                      onClick={() => handleExit("change_template")}
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
                    <DropdownMenuItem
                      onClick={() => handleExit("close")}
                      className="rounded-xl px-3 py-2.5 text-white/80 focus:bg-white/[0.06] focus:text-white"
                    >
                      <X className="h-4 w-4 text-white/55" />
                      {chrome.close}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[11px] text-white/38">
                  <span>{chrome.progressLabel}</span>
                  <span className="font-medium text-white/62">{templateName}</span>
                </div>
                <div className="relative">
                  <Progress
                    value={progressValue}
                    className="h-1.5 rounded-full bg-white/[0.06] [&_[data-slot=progress-indicator]]:bg-[linear-gradient(90deg,#7C3AED_0%,#8B5CF6_55%,#38BDF8_100%)]"
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-24 rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.22),transparent)] blur-sm" />
                </div>
                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5">
                  {steps.map((step, index) => {
                    const isActive = index === stepIndex;
                    const isDone = index < stepIndex;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => handleStepSelect(index)}
                        disabled={index > stepIndex}
                        className={cn(
                          "group inline-flex shrink-0 items-center gap-2 rounded-2xl border px-2.5 py-2 text-left transition-all",
                          isActive
                            ? "border-[#8B5CF6]/35 bg-[#8B5CF6]/14 text-white shadow-[0_8px_30px_rgba(124,58,237,0.18)]"
                            : isDone
                              ? "border-white/10 bg-white/[0.04] text-white/78 hover:bg-white/[0.07]"
                              : "border-white/8 bg-white/[0.02] text-white/28",
                          index > stepIndex && "cursor-not-allowed opacity-60",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-6 items-center justify-center rounded-xl border text-[11px]",
                            isActive
                              ? "border-[#A78BFA]/30 bg-[#A78BFA]/18 text-[#E9DDFF]"
                              : isDone
                                ? "border-white/10 bg-white/[0.06] text-white/78"
                                : "border-white/8 bg-white/[0.04] text-white/35",
                          )}
                        >
                          <step.icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="hidden text-[12px] font-medium sm:inline">
                          {step.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_312px] lg:gap-6">
              <AnimatePresence mode="wait">
                <motion.section
                  key={currentStep.id}
                  initial={{ opacity: 0, y: 18, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.985 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(21,21,28,0.92)_0%,rgba(14,14,20,0.9)_100%)] p-4 shadow-[0_18px_60px_rgba(6,6,14,0.38),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-6"
                >
                  <div className="mb-5 flex items-start gap-3 sm:mb-6">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-[#8B5CF6]/18 bg-[linear-gradient(180deg,rgba(124,58,237,0.22)_0%,rgba(124,58,237,0.08)_100%)] text-[#C9B3FF] shadow-[0_10px_28px_rgba(124,58,237,0.16)]">
                      <currentStep.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/38">
                        {chrome.stepLabel} {stepIndex + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white sm:text-[1.3rem]">
                        {currentStep.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-6 text-white/55 sm:text-sm">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>

                  <StepFields
                    stepId={currentStep.id}
                    copy={copy}
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
                <div className="rounded-[26px] border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-[#38BDF8]/10 text-[#67D2FF]">
                      <FileText className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#67D2FF]">
                      {chrome.exampleLabel}
                    </p>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-[14px] leading-6 text-white/72 sm:text-sm">
                    {currentStep.example}
                  </pre>
                </div>

                <div className="rounded-[26px] border border-[#8B5CF6]/16 bg-[linear-gradient(180deg,rgba(124,58,237,0.12)_0%,rgba(124,58,237,0.04)_100%)] p-4 shadow-[0_12px_36px_rgba(124,58,237,0.08)]">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-[#8B5CF6]/14 text-[#C9B3FF]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#C9B3FF]">
                      {chrome.helpLabel}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-white/92">
                    {currentStep.helperTitle}
                  </p>
                  <p className="mt-2 text-[14px] leading-6 text-white/65 sm:text-sm">
                    {currentStep.helperText}
                  </p>
                </div>

                {error ? (
                  <div className="rounded-[24px] border border-red-500/28 bg-red-500/10 p-4 text-sm text-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-6 sm:pb-6">
            <div className="pointer-events-auto rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,26,0.92)_0%,rgba(11,11,16,0.96)_100%)] p-2 shadow-[0_-12px_40px_rgba(7,7,16,0.18),0_18px_60px_rgba(4,4,10,0.45)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStepBack}
                  className="h-11 rounded-2xl border-white/10 bg-white/[0.04] px-4 text-white/78 transition-all hover:-translate-y-px hover:bg-white/[0.08] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{chrome.back}</span>
                </Button>

                <div className="min-w-0 flex-1">
                  <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-white/38">
                    <span>{chrome.stepLabel}</span>
                    <span>{chrome.stepCount(stepIndex + 1, steps.length)}</span>
                  </div>
                  {stepIndex < steps.length - 1 ? (
                    <Button
                      key={`next-${currentStep.id}`}
                      type="button"
                      onClick={handleNext}
                      className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_58%,#6D28D9_100%)] px-5 text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(124,58,237,0.34)] transition-all hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(124,58,237,0.42)]"
                    >
                      <span>{chrome.continue}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      key={`submit-${currentStep.id}`}
                      type="submit"
                      disabled={isGenerating || isSubmitting}
                      className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_58%,#6D28D9_100%)] px-5 text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(124,58,237,0.34)] transition-all hover:-translate-y-px hover:shadow-[0_18px_40px_rgba(124,58,237,0.42)] disabled:translate-y-0 disabled:shadow-[0_8px_20px_rgba(124,58,237,0.2)]"
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
      </DialogContent>
    </Dialog>
  );
}

function StepFields({
  stepId,
  copy,
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
  fotoUrl: string | null;
  register: UseFormReturn<DatosCVFormulario>["register"];
  errors: UseFormReturn<DatosCVFormulario>["formState"]["errors"];
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  fieldClass: string;
  textareaClass: string;
  photoFormats: string;
}) {
  if (stepId === "basic") {
    return (
      <div className="space-y-4">
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

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_250px]">
          <FieldError message={errors.contacto?.message}>
            <FieldLabel icon={Mail}>{copy.contact}</FieldLabel>
            <textarea
              {...register("contacto")}
              rows={5}
              className={textareaClass}
              placeholder={copy.contactPlaceholder}
            />
          </FieldError>

          <div>
            <FieldLabel icon={Upload}>{copy.photo}</FieldLabel>
            <label className="group flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/12 bg-white/[0.03] px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:-translate-y-px hover:border-[#8B5CF6]/28 hover:bg-[#8B5CF6]/8">
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
                  className="h-24 w-24 rounded-[20px] border border-white/12 object-cover shadow-[0_12px_28px_rgba(6,6,12,0.35)]"
                />
              ) : (
                <>
                  <div className="mb-2 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/55 transition-colors group-hover:text-white/85">
                    <Upload className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-white/78">
                    {copy.uploadImage}
                  </span>
                  <span className="mt-1 text-xs text-white/38">{photoFormats}</span>
                </>
              )}
            </label>
          </div>
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
    <div className="space-y-4">
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
    <Label className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
      {Icon ? <Icon className="h-3.5 w-3.5 text-[#67D2FF]" /> : null}
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
  "h-11 w-full rounded-[20px] border border-white/10 bg-white/[0.03] px-3.5 text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-all placeholder:text-white/28 focus:border-[#8B5CF6]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.12)] sm:text-sm";
const TEXTAREA_CLASS =
  "w-full min-h-[144px] resize-y rounded-[22px] border border-white/10 bg-white/[0.03] px-3.5 py-3 text-base leading-7 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] outline-none transition-all placeholder:text-white/28 focus:border-[#8B5CF6]/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.12)] sm:text-sm";
