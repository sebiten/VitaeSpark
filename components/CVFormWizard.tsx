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
import { templateAllowsPhoto } from "@/lib/cv-templates";

type FormCopy = {
  badge: string;
  title: string;
  description: string;
  currentTemplate: string;
  changeTemplate: string;
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
  initialStepIndex?: number;
  error: string | null;
  onSubmit: (data: DatosCVFormulario) => Promise<void>;
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
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
    autosave: "Tu avance se guarda en esta pestaña.",
    exampleLabel: "Ejemplo",
    helpLabel: "Ayuda para esta sección",
    changeTemplate: "Cambiar plantilla",
    clear: "Limpiar",
    changeTemplateConfirm:
      "Vas a volver al selector de plantillas. Tus datos se mantienen en esta sesión. ¿Querés continuar?",
    photoFormats: "JPG, PNG o WebP",
    finalHelperTitle: "Cerrá con datos concretos",
    finalHelperText:
      "No repitas habilidades en todos los campos. Dejá links, portfolio, disponibilidad o certificaciones solo en extras.",
    continueTo: "Continuar a",
    suggestedPreview: "Así puede verse",
    optional: "Opcional",
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
    autosave: "Your progress is saved in this tab.",
    exampleLabel: "Example",
    helpLabel: "Tip for this section",
    changeTemplate: "Change template",
    clear: "Clear",
    changeTemplateConfirm:
      "You will go back to the template selector. Your details stay in this session. Do you want to continue?",
    photoFormats: "JPG, PNG or WebP",
    finalHelperTitle: "Finish with specific details",
    finalHelperText:
      "Avoid repeating the same skills in every field. Use extras only for links, portfolio, availability or certifications.",
    continueTo: "Continue to",
    suggestedPreview: "Suggested preview",
    optional: "Optional",
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
  initialStepIndex = 0,
  error,
  onSubmit,
  onImageUpload,
  onClear,
  onChangeTemplate,
}: Props) {
  const [stepIndex, setStepIndex] = useState(() =>
    Math.min(Math.max(initialStepIndex, 0), 4),
  );
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
            : "Usá datos reales de contacto",
        helperText:
          language === "en"
            ? "Add your city, email, phone number and one professional link such as LinkedIn or GitHub."
            : "Agregá ciudad, email, teléfono y un link profesional como LinkedIn o GitHub.",
        fields: ["nombre", "puesto", "contacto"],
      },
      {
        id: "summary",
        icon: BookOpen,
        title: copy.summaryTitle,
        description: copy.summaryDescription,
        example: copy.summaryPlaceholder,
        helperTitle:
          language === "en" ? "Write it naturally first" : "Escribilo natural primero",
        helperText:
          language === "en"
            ? "Say who you are, what you do and what kind of role you are aiming for. Clarity matters more than polish here."
            : "Contá quién sos, qué hacés y hacia qué rol apuntás. Acá importa más la claridad que sonar perfecto.",
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
            : "Pensá una experiencia por bloque",
        helperText:
          language === "en"
            ? "Start with role, dates, company or project and location. Then explain what you actually did, without wording it like a formal resume yet."
            : "Empezá con puesto, fechas, empresa o proyecto y lugar. Luego contá lo que hiciste sin preocuparte todavía por la redacción final.",
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
            : "Incluí estudios, cursos o aprendizaje autodidacta si aportan al rol que buscás. Si no corresponde, podés continuar sin completar este paso.",
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
      className="relative mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-5xl flex-col text-white"
    >
      <div className="hidden" />

      <div className="border-b border-white/9 px-1 pb-4 pt-2 sm:px-0 sm:pb-5">
        <div className="relative flex items-start gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleStepBack}
            className="hidden"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">{chrome.back}</span>
          </Button>

          <div className="min-w-0 flex-1">
            <div className="hidden">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/62">
                <Wand2 className="h-3.5 w-3.5 text-[#A78BFA]" />
                {copy.badge}
              </span>
              <span className="rounded-full border border-[#7c4dd4]/18 bg-[#7c4dd4]/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#d8cbf7]">
                {chrome.stepLabel} {chrome.stepCount(stepIndex + 1, steps.length)}
              </span>
              <span className="hidden rounded-full border border-white/8 bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/52 sm:inline-flex">
                {templateName}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#C4B5FD]">
                  {chrome.stepLabel} {stepIndex + 1} de {steps.length} · {templateName}
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-[#F6F2EA]">
                  {currentStep.title}
                </h1>
                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-white/66">
                  {currentStep.description}
                </p>
                <p className="mt-1 text-xs text-white/52">{chrome.autosave}</p>
              </div>
              <div className="hidden min-w-[104px] text-right lg:block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/34">
                  {chrome.progressLabel}
                </p>
                <p className="mt-1 text-sm font-medium text-white/74">
                  {Math.round(progressValue)}%
                </p>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/76 transition-colors hover:border-white/18 hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/45"
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
                <Palette className="h-4 w-4 text-[#A78BFA]" />
                {chrome.changeTemplate}
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

        <div className="relative mt-3">
          <div className="hidden">
            <span>{currentStep.title}</span>
            <span className="font-medium text-white/64">
              {chrome.stepCount(stepIndex + 1, steps.length)}
            </span>
          </div>
          <Progress
            value={progressValue}
            aria-label={`${chrome.progressLabel}: ${Math.round(progressValue)}%`}
            className="h-1 rounded-full bg-white/[0.06] [&_[data-slot=progress-indicator]]:bg-[#7c4dd4]"
          />
          <div className="mt-3 grid grid-cols-5 gap-2" aria-label={chrome.progressLabel}>
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
                    "group inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-2xl border px-2 py-2 text-left transition-colors duration-200 lg:justify-start lg:px-3",
                    isActive
                      ? "border-[#8b5cf6]/28 bg-[#1a1723] text-white"
                      : isDone
                        ? "border-white/10 bg-white/[0.035] text-white/72 hover:border-white/15 hover:bg-white/[0.055]"
                        : "border-white/8 bg-white/[0.018] text-white/45",
                    isLocked && "cursor-not-allowed",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-xl border text-[11px] transition-colors",
                      isActive
                        ? "border-[#8b5cf6]/22 bg-[#8b5cf6]/12 text-[#efe8ff]"
                        : isDone
                          ? "border-white/10 bg-white/[0.06] text-white/72"
                          : "border-white/8 bg-white/[0.025] text-white/42",
                    )}
                  >
                    <step.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="hidden min-w-0 flex-col lg:flex">
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/32">
                      {chrome.stepLabel} {index + 1}
                    </span>
                    <span className="text-[12px] font-medium">{step.title}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 py-5 sm:py-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_268px] lg:gap-10">
          <AnimatePresence mode="wait">
            <motion.section
              key={currentStep.id}
              initial={{ opacity: 0, y: 14, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="min-w-0"
            >
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
                optionalLabel={chrome.optional}
              />
            </motion.section>
          </AnimatePresence>

          <aside className="border-t border-white/9 pt-6 lg:sticky lg:top-20 lg:self-start lg:border-t-0 lg:border-l lg:border-white/9 lg:pl-6 lg:pt-0">
            <section>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-white/[0.04] text-[#A78BFA]">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/54">
                  {chrome.exampleLabel}
                </p>
              </div>
              <ExamplePreview step={currentStep} previewLabel={chrome.suggestedPreview} />
            </section>

            <div className="my-4 h-px bg-white/8" />

            <section>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-xl bg-[#8B5CF6]/10 text-[#d8cbf7]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/54">
                  {chrome.helpLabel}
                </p>
              </div>
              <p className="text-[15px] font-medium text-[#F4F2FF]">
                {currentStep.helperTitle}
              </p>
              <p className="mt-2 text-[14px] leading-6 text-white/68">
                {currentStep.helperText}
              </p>
            </section>

            {error ? (
              <div role="alert" aria-live="polite" className="mt-4 rounded-2xl border border-red-500/24 bg-red-500/10 p-3 text-sm text-red-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      </div>

      <div className="pointer-events-none sticky bottom-0 z-30 mt-auto border-t border-white/9 bg-[#111113]/96 py-3 backdrop-blur-md">
        <div className="pointer-events-auto flex items-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleStepBack}
            className="h-11 rounded-full border-white/10 bg-white/[0.025] px-4 text-white/80 transition-colors hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{chrome.back}</span>
          </Button>

          <div className="min-w-0 flex-1">
            <div className="hidden">
              <span>{currentStep.title}</span>
              <span>{chrome.stepCount(stepIndex + 1, steps.length)}</span>
            </div>
            {stepIndex < steps.length - 1 ? (
              <Button
                key={`next-${currentStep.id}`}
                type="button"
                onClick={handleNext}
                className="h-12 w-full rounded-full bg-[#F6F2EA] px-5 text-[15px] font-semibold text-[#111113] shadow-none transition-colors hover:bg-[#EDE8DE] focus-visible:ring-[#A78BFA]/55"
              >
                <span>{nextButtonLabel}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                key={`submit-${currentStep.id}`}
                type="submit"
                disabled={isGenerating || isSubmitting}
                className="h-12 w-full rounded-full bg-[#F6F2EA] px-5 text-[15px] font-semibold text-[#111113] shadow-none transition-colors hover:bg-[#EDE8DE] focus-visible:ring-[#A78BFA]/55 disabled:bg-[#8D8982] disabled:text-[#27262A]"
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
      <div className="border-y border-white/9 py-4">
        <p className="text-lg font-semibold tracking-[-0.02em] text-[#F4F4F8]">
          Sebastian Lopez
        </p>
        <p className="mt-1 text-sm text-[#C9C8D7]">Desarrollador web junior</p>
        <div className="my-3 h-px bg-white/8" />
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
    <div className="border-y border-white/9 py-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/42">
        {previewLabel}
      </p>
      <div className="mt-3 space-y-2">
        {exampleLines.map((line, index) => (
          <p
            key={line}
            className={cn(
              "text-[13px] leading-6 text-white/72",
              index > 0 && "border-t border-white/8 pt-2",
            )}
          >
            {line}
          </p>
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
  optionalLabel,
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
  optionalLabel: string;
}) {
  if (stepId === "basic") {
    const allowsPhoto = templateAllowsPhoto(template);

    return (
      <div className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FieldError id="nombre-error" message={errors.nombre?.message}>
            <FieldLabel htmlFor="nombre">{copy.fullName}</FieldLabel>
            <input
              id="nombre"
              {...register("nombre")}
              className={fieldClass}
              placeholder={copy.fullNamePlaceholder}
              aria-invalid={Boolean(errors.nombre)}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
          </FieldError>

          <FieldError id="puesto-error" message={errors.puesto?.message}>
            <FieldLabel htmlFor="puesto">{copy.role}</FieldLabel>
            <input
              id="puesto"
              {...register("puesto")}
              className={fieldClass}
              placeholder={copy.rolePlaceholder}
              aria-invalid={Boolean(errors.puesto)}
              aria-describedby={errors.puesto ? "puesto-error" : undefined}
            />
          </FieldError>
        </div>

        <div
          className={cn(
            "grid gap-4",
            allowsPhoto ? "md:grid-cols-[minmax(0,1fr)_228px]" : "",
          )}
        >
          <FieldError id="contacto-error" message={errors.contacto?.message}>
            <FieldLabel htmlFor="contacto" icon={Mail}>{copy.contact}</FieldLabel>
            <textarea
              id="contacto"
              {...register("contacto")}
              rows={6}
              className={textareaClass}
              placeholder={copy.contactPlaceholder}
              aria-invalid={Boolean(errors.contacto)}
              aria-describedby={errors.contacto ? "contacto-error" : undefined}
            />
          </FieldError>

          {allowsPhoto ? (
            <div>
              <FieldLabel htmlFor="foto-cv" icon={Upload}>{copy.photo}</FieldLabel>
              <label className="group flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/12 bg-white/[0.025] px-4 py-4 text-center transition-all hover:border-[#8B5CF6]/24 hover:bg-white/[0.045]">
                <input
                  id="foto-cv"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onImageUpload}
                  className="sr-only"
                />
                {fotoUrl ? (
                  <img
                    src={fotoUrl}
                    alt={copy.photo}
                    className="size-20 rounded-2xl border border-white/10 object-cover"
                  />
                ) : (
                  <>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/62 transition-colors group-hover:text-white/86">
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
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-white/64">
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
      <FieldError id="sobre-mi-error" message={errors.sobreMi?.message}>
        <FieldLabel htmlFor="sobre-mi">{copy.summaryTitle}</FieldLabel>
        <textarea
          id="sobre-mi"
          {...register("sobreMi")}
          rows={7}
          className={textareaClass}
          placeholder={copy.summaryPlaceholder}
          aria-invalid={Boolean(errors.sobreMi)}
          aria-describedby={errors.sobreMi ? "sobre-mi-error" : undefined}
        />
      </FieldError>
    );
  }

  if (stepId === "experience") {
    return (
      <FieldError id="experiencia-error" message={errors.experiencia?.message}>
        <FieldLabel htmlFor="experiencia">{copy.experienceTitle}</FieldLabel>
        <textarea
          id="experiencia"
          {...register("experiencia")}
          rows={11}
          className={textareaClass}
          placeholder={copy.experiencePlaceholder}
          aria-invalid={Boolean(errors.experiencia)}
          aria-describedby={errors.experiencia ? "experiencia-error" : undefined}
        />
      </FieldError>
    );
  }

  if (stepId === "education") {
    return (
      <FieldError id="formacion-error" message={errors.formacion?.message}>
        <FieldLabel htmlFor="formacion">
          {copy.educationTitle}
          <span className="font-normal text-white/52">({optionalLabel})</span>
        </FieldLabel>
        <textarea
          id="formacion"
          {...register("formacion")}
          rows={9}
          className={textareaClass}
          placeholder={copy.educationPlaceholder}
          aria-invalid={Boolean(errors.formacion)}
          aria-describedby={errors.formacion ? "formacion-error" : undefined}
        />
      </FieldError>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FieldError id="habilidades-error" message={errors.habilidades?.message}>
          <FieldLabel htmlFor="habilidades" icon={Hammer}>{copy.skills}</FieldLabel>
          <textarea
            id="habilidades"
            {...register("habilidades")}
            rows={6}
            className={textareaClass}
            placeholder={copy.skillsPlaceholder}
            aria-invalid={Boolean(errors.habilidades)}
            aria-describedby={errors.habilidades ? "habilidades-error" : undefined}
          />
        </FieldError>

        <FieldError id="idiomas-error" message={errors.idiomas?.message}>
          <FieldLabel htmlFor="idiomas" icon={Languages}>
            {copy.languages}
            <span className="font-normal text-white/52">({optionalLabel})</span>
          </FieldLabel>
          <textarea
            id="idiomas"
            {...register("idiomas")}
            rows={6}
            className={textareaClass}
            placeholder={copy.languagesPlaceholder}
            aria-invalid={Boolean(errors.idiomas)}
            aria-describedby={errors.idiomas ? "idiomas-error" : undefined}
          />
        </FieldError>
      </div>

      <div>
        <FieldLabel htmlFor="informacion-adicional" icon={FileText}>
          {copy.additional}
          <span className="font-normal text-white/52">({optionalLabel})</span>
        </FieldLabel>
        <textarea
          id="informacion-adicional"
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
  htmlFor,
}: {
  children: ReactNode;
  icon?: LucideIcon;
  htmlFor?: string;
}) {
  return (
    <Label htmlFor={htmlFor} className="mb-2 flex items-center gap-2 text-xs font-medium text-white/72">
      {Icon ? <Icon className="h-3.5 w-3.5 text-[#A78BFA]" /> : null}
      {children}
    </Label>
  );
}

function FieldError({
  children,
  id,
  message,
}: {
  children: ReactNode;
  id?: string;
  message?: string;
}) {
  return (
    <div>
      {children}
      {message ? (
        <p id={id} role="alert" className="mt-2 flex items-center text-xs text-red-300">
          <AlertCircle className="mr-1.5 h-3.5 w-3.5 shrink-0" />
          {message}
        </p>
      ) : null}
    </div>
  );
}

const FIELD_CLASS =
  "h-12 w-full rounded-2xl border border-white/12 bg-white/[0.04] px-4 text-[16px] text-[#F3F3F7] outline-none transition-colors placeholder:text-white/52 focus:border-[#A78BFA]/48 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#8B5CF6]/10 aria-invalid:border-red-400/60 sm:text-sm";
const TEXTAREA_CLASS =
  "w-full min-h-[140px] resize-y rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-3.5 text-[16px] leading-7 text-[#F3F3F7] outline-none transition-colors placeholder:text-white/52 focus:border-[#A78BFA]/48 focus:bg-white/[0.06] focus:ring-4 focus:ring-[#8B5CF6]/10 aria-invalid:border-red-400/60 sm:text-sm";
