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
  FileText,
  GraduationCap,
  Hammer,
  Languages,
  Loader2,
  Mail,
  Palette,
  Sparkles,
  Trash2,
  Upload,
  User,
  Wand2,
  X,
} from "lucide-react";
import type { Path, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getLandingAttribution } from "@/lib/analytics-attribution";
import type { AppLanguage } from "@/lib/i18n";
import type { DatosCVFormulario } from "@/lib/types/cv";

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
      <DialogContent className="fixed inset-0 z-50 h-[100dvh] w-screen max-w-none translate-x-0 translate-y-0 gap-0 overflow-hidden overscroll-contain rounded-none border-0 bg-[#0F0F10] p-0 text-white shadow-none sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-[min(90vh,920px)] sm:w-[min(100vw-2rem,1100px)] sm:max-w-[1100px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:border sm:border-white/10 sm:bg-[#121217] [&>button]:hidden">
        <DialogTitle className="sr-only">{chrome.wizardTitle}</DialogTitle>
        <DialogDescription className="sr-only">
          {chrome.wizardDescription}
        </DialogDescription>

        <form onSubmit={handleFinalSubmit} className="flex h-full min-h-0 touch-pan-y flex-col">
          <div className="sticky top-0 z-20 border-b border-white/10 bg-[#121217]/96 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-3 py-1.5 text-[11px] text-[#38BDF8] sm:text-sm">
                  <Wand2 className="h-4 w-4" />
                  {copy.badge}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/45 sm:text-xs">
                  <span>{chrome.stepLabel}</span>
                  <span className="font-semibold text-[#A78BFA]">
                    {chrome.stepCount(stepIndex + 1, steps.length)}
                  </span>
                  <span className="text-white/25">•</span>
                  <span>{copy.currentTemplate}</span>
                  <span className="font-semibold text-white">{templateName}</span>
                </div>
                <h2 className="mt-2 text-[1.7rem] font-bold leading-tight text-white sm:text-3xl">
                  {currentStep.title}
                </h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-6 text-white/60 sm:text-sm">
                  {currentStep.description}
                </p>
              </div>

              <div className="flex w-full snap-x snap-mandatory items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:justify-end sm:overflow-visible sm:pb-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleExit("change_template")}
                  className="h-10 shrink-0 snap-start border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Palette className="h-4 w-4 text-[#38BDF8]" />
                  {chrome.changeTemplate}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onFillSample}
                  className="h-10 shrink-0 snap-start border-[#7C3AED]/40 bg-[#7C3AED]/10 text-white hover:bg-[#7C3AED]/20"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#A78BFA]" />
                  {chrome.fillSample}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClear}
                  className="h-10 shrink-0 snap-start border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                >
                  <Trash2 className="h-4 w-4 text-white/65" />
                  {chrome.clear}
                </Button>
                <button
                  type="button"
                  onClick={() => handleExit("close")}
                  className="inline-flex h-10 w-10 shrink-0 snap-start items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label={chrome.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-white/45">
                <span>{chrome.progressLabel}</span>
                <span className="font-semibold text-[#A78BFA]">
                  {chrome.stepCount(stepIndex + 1, steps.length)}
                </span>
              </div>
              <Progress value={progressValue} className="h-2 bg-white/10" />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-5">
              <section className="rounded-[24px] border border-white/10 bg-[#15151A]/80 p-4 shadow-xl shadow-black/10 sm:p-6">
                <div className="mb-5 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/15 text-[#A78BFA] ring-1 ring-[#A78BFA]/15">
                    <currentStep.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{currentStep.title}</h3>
                    <p className="mt-1 text-[15px] leading-6 text-white/60 sm:text-sm">
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
              </section>

              <aside className="space-y-3 lg:sticky lg:top-0 lg:self-start lg:space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-[#15151A]/80 p-4 shadow-xl shadow-black/10 sm:p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">
                    {chrome.exampleLabel}
                  </p>
                  <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-white/72 sm:text-sm">
                    {currentStep.example}
                  </pre>
                </div>

                <div className="rounded-[24px] border border-[#7C3AED]/20 bg-[#7C3AED]/10 p-4 sm:p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Sparkles className="h-4 w-4 text-[#C4B5FD]" />
                    {chrome.helpLabel}
                  </p>
                  <p className="mt-3 text-sm font-medium text-white/92">
                    {currentStep.helperTitle}
                  </p>
                  <p className="mt-2 text-[15px] leading-6 text-white/70 sm:text-sm">
                    {currentStep.helperText}
                  </p>
                </div>

                {error ? (
                  <div className="rounded-[24px] border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>

          <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#121217]/96 px-4 py-3 backdrop-blur sm:px-6 sm:py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleStepBack}
                className="h-12 w-full border-white/15 bg-white/5 text-white/85 hover:bg-white/10 hover:text-white sm:min-w-40 sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4" />
                {chrome.back}
              </Button>

              {stepIndex < steps.length - 1 ? (
                <Button
                  key={`next-${currentStep.id}`}
                  type="button"
                  onClick={handleNext}
                  className="h-12 w-full bg-[#7C3AED] px-6 text-base font-semibold text-white hover:bg-[#6D28D9] sm:min-w-48 sm:w-auto"
                >
                  {chrome.continue}
                </Button>
              ) : (
                <Button
                  key={`submit-${currentStep.id}`}
                  type="submit"
                  disabled={isGenerating || isSubmitting}
                  className="h-12 w-full bg-[#7C3AED] px-6 text-base font-semibold text-white hover:bg-[#6D28D9] sm:min-w-48 sm:w-auto"
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
            <Label className="mb-2 block text-sm font-medium text-white/85">
              {copy.fullName}
            </Label>
            <input
              {...register("nombre")}
              className={fieldClass}
              placeholder={copy.fullNamePlaceholder}
            />
          </FieldError>

          <FieldError message={errors.puesto?.message}>
            <Label className="mb-2 block text-sm font-medium text-white/85">
              {copy.role}
            </Label>
            <input
              {...register("puesto")}
              className={fieldClass}
              placeholder={copy.rolePlaceholder}
            />
          </FieldError>
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
          <FieldError message={errors.contacto?.message}>
            <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
              <Mail className="h-4 w-4 text-[#38BDF8]" />
              {copy.contact}
            </Label>
            <textarea
              {...register("contacto")}
              rows={5}
              className={textareaClass}
              placeholder={copy.contactPlaceholder}
            />
          </FieldError>

          <div>
            <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
              <Upload className="h-4 w-4 text-[#38BDF8]" />
              {copy.photo}
            </Label>
            <label className="flex min-h-[152px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#101014] px-4 py-5 text-center transition hover:border-[#7C3AED]/45 hover:bg-[#7C3AED]/5">
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
                  className="h-24 w-24 rounded-2xl border border-white/10 object-cover"
                />
              ) : (
                <>
                  <Upload className="mb-2 h-5 w-5 text-white/45" />
                  <span className="text-sm text-white/70">{copy.uploadImage}</span>
                  <span className="mt-1 text-xs text-white/35">{photoFormats}</span>
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
          <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
            <Hammer className="h-4 w-4 text-[#38BDF8]" />
            {copy.skills}
          </Label>
          <textarea
            {...register("habilidades")}
            rows={6}
            className={textareaClass}
            placeholder={copy.skillsPlaceholder}
          />
        </FieldError>

        <FieldError message={errors.idiomas?.message}>
          <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
            <Languages className="h-4 w-4 text-[#38BDF8]" />
            {copy.languages}
          </Label>
          <textarea
            {...register("idiomas")}
            rows={6}
            className={textareaClass}
            placeholder={copy.languagesPlaceholder}
          />
        </FieldError>
      </div>

      <div>
        <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
          <FileText className="h-4 w-4 text-[#38BDF8]" />
          {copy.additional}
        </Label>
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
  "w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-base text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 placeholder:text-white/32 sm:text-sm";
const TEXTAREA_CLASS =
  "w-full min-h-[140px] resize-y rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-base leading-7 text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 placeholder:text-white/32 sm:text-sm";
