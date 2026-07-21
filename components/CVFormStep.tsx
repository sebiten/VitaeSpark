"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { track } from "@vercel/analytics";
import { toast } from "sonner";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { createClient } from "@/utils/supabase/client";
import { getLandingAttribution } from "@/lib/analytics-attribution";
import type { AppLanguage } from "@/lib/i18n";
import CVFormWizard from "./CVFormWizard";

const createSchema = (language: AppLanguage) =>
  z.object({
    foto_url: z.string().url().optional(),
    nombre: z
      .string()
      .min(1, language === "en" ? "Name is required" : "El nombre es obligatorio"),
    puesto: z
      .string()
      .min(1, language === "en" ? "Target role is required" : "El puesto es obligatorio"),
    contacto: z
      .string()
      .min(
        1,
        language === "en"
          ? "Contact information is required"
          : "La información de contacto es obligatoria",
      ),
    sobreMi: z
      .string()
      .min(
        10,
        language === "en"
          ? "Add a short professional summary"
          : "Contá brevemente quién sos y qué puesto buscás",
      ),
    experiencia: z
      .string()
      .min(
        20,
        language === "en"
            ? "Describe work experience, a project or practical experience"
            : "Contá una experiencia, proyecto, práctica o trabajo informal",
      ),
    formacion: z.string(),
    habilidades: z
      .string()
      .min(
        1,
        language === "en" ? "Add at least one skill" : "Incluye al menos una habilidad",
      ),
    idiomas: z.string(),
    informacionAdicional: z.string().optional(),
  });

const MAX_PHOTO_SIZE_BYTES = 3 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const formCopy = {
  es: {
    badge: "Datos para tu CV",
    title: "Completalo simple. La IA lo ordena después.",
    description:
      "Escribí con tus palabras: trabajos, estudios, herramientas y contacto. No hace falta que suene perfecto en esta etapa.",
    currentTemplate: "Plantilla actual",
    changeTemplate: "Cambiar plantilla",
    clear: "Limpiar",
    basicTitle: "Datos básicos",
    basicDescription: "Lo primero que va a leer una empresa.",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Ej: Sebastián López",
    role: "Puesto o perfil",
    rolePlaceholder: "Ej: Desarrollador web junior",
    contact: "Contacto",
    contactPlaceholder:
      "Salta, Argentina\nsebastian@email.com\n+54 9 ...\nLinkedIn o GitHub si corresponde",
    photo: "Foto opcional",
    uploadImage: "Subir imagen",
    photoUnavailableTitle: "Esta plantilla no usa foto",
    photoUnavailableText:
      "Su estructura prioriza el contenido. Si querés incluir foto, elegí Elegancia, Azul, Púrpura o Verde.",
    summaryTitle: "Perfil profesional",
    summaryDescription: "Una base corta para que la IA construya un perfil claro.",
    summaryPlaceholder:
      "Ej: Soy estudiante de programación, desarrollo proyectos web propios y busco mi primera experiencia como desarrollador junior.",
    experienceTitle: "Experiencia o proyectos",
    experienceDescription:
      "Incluí empleos, prácticas, proyectos o trabajos informales. Separá cada experiencia con una línea en blanco.",
    experiencePlaceholder:
      "Desarrollador web, 2024-Actualidad, proyectos propios, Salta\nCreé apps con login, base de datos, pagos, panel admin y generación de PDF.\n\nVendedor, 2021-2023, Tienda XYZ, Salta\nAtención al cliente, caja, reposición y control de stock.",
    educationTitle: "Estudios",
    educationDescription:
      "Incluí carrera, cursos o formación autodidacta si aportan al puesto. Este paso es opcional.",
    educationPlaceholder:
      "Programación / Desarrollo de Software, 2025-Actualidad, Universidad Nacional de Salta\n\nDesarrollo Web Full Stack, 2023-Actualidad, formación autodidacta, online",
    skillsTitle: "Habilidades, idiomas y extras",
    skillsDescription:
      "Agregá habilidades concretas. Idiomas y datos adicionales son opcionales.",
    skills: "Habilidades",
    skillsPlaceholder: "Ej: Excel, ventas, atención al cliente, Next.js, Supabase",
    languages: "Idiomas",
    languagesPlaceholder: "Español nativo\nInglés B2",
    additional: "Información adicional",
    additionalPlaceholder:
      "Ej: portfolio, certificaciones, disponibilidad, licencia de conducir o enlaces importantes.",
    generate: "Generar CV",
    generating: "Generando CV...",
    success: "CV generado correctamente.",
    imageSuccess: "Foto cargada correctamente.",
    imageTypeError: "Subi una foto JPG, PNG o WebP.",
    imageSizeError: "La foto debe pesar menos de 3 MB.",
    imageError: "No se pudo subir la foto. Intenta con otra imagen.",
    photoAuthRequired:
      "Inicia sesión para subir la foto. Tus datos quedarán guardados.",
    timeout: "La generación está tardando demasiado. Intentá de nuevo.",
    generationError: "Error al generar el CV. Intenta nuevamente.",
    unknownError: "Error desconocido",
  },
  en: {
    badge: "Resume details",
    title: "Keep it simple. AI will organize it next.",
    description:
      "Write in your own words: jobs, education, tools and contact details. It does not need to sound perfect yet.",
    currentTemplate: "Current template",
    changeTemplate: "Change template",
    clear: "Clear",
    basicTitle: "Basic details",
    basicDescription: "The first information a recruiter will read.",
    fullName: "Full name",
    fullNamePlaceholder: "Example: Sebastian Lopez",
    role: "Target role",
    rolePlaceholder: "Example: Junior web developer",
    contact: "Contact",
    contactPlaceholder:
      "Austin, TX\nsebastian@email.com\n+1 ...\nLinkedIn or GitHub if relevant",
    photo: "Optional photo",
    uploadImage: "Upload image",
    photoUnavailableTitle: "This template does not use a photo",
    photoUnavailableText:
      "Its structure prioritizes content. For a photo, choose Elegant, Blue, Purple or Green.",
    summaryTitle: "Professional summary",
    summaryDescription: "A short base so AI can build a clear summary.",
    summaryPlaceholder:
      "Example: I build web projects with React and Next.js and I am looking for a junior developer role.",
    experienceTitle: "Work experience",
    experienceDescription: "Separate each job or project with a blank line.",
    experiencePlaceholder:
      "Web Developer, 2024-Present, freelance projects, Remote\nBuilt apps with login, database, payments, admin panels and PDF generation.\n\nSales Associate, 2021-2023, Retail Store, Austin\nCustomer service, checkout, restocking and inventory control.",
    educationTitle: "Education",
    educationDescription: "Include program, institution, dates and city if available.",
    educationPlaceholder:
      "Software Development, 2025-Present, Online\n\nFull Stack Web Development, 2023-Present, self-directed learning and projects",
    skillsTitle: "Skills, languages and extras",
    skillsDescription: "Simple lists. AI will normalize and organize them.",
    skills: "Skills",
    skillsPlaceholder: "Example: Excel, sales, customer service, Next.js, Supabase",
    languages: "Languages",
    languagesPlaceholder: "English native\nSpanish B2",
    additional: "Additional information",
    additionalPlaceholder:
      "Example: portfolio, certifications, availability, driver's license or important links.",
    generate: "Generate resume",
    generating: "Generating resume...",
    success: "Resume generated successfully.",
    imageSuccess: "Photo uploaded successfully.",
    imageTypeError: "Upload a JPG, PNG or WebP photo.",
    imageSizeError: "The photo must be smaller than 3 MB.",
    imageError: "Could not upload the photo. Try another image.",
    photoAuthRequired:
      "Sign in to upload the photo. Your details will remain saved.",
    timeout: "Generation is taking too long. Try again.",
    generationError: "Error generating the resume. Try again.",
    unknownError: "Unknown error",
  },
} as const;

type Props = {
  template: string;
  currentUserId?: string;
  language: AppLanguage;
  draftData: DatosCVFormulario;
  onGenerated: (data: RespuestaCV["cv"]) => void;
  onDraftChange: (data: DatosCVFormulario) => void;
  fotoUrl: string | null;
  onFotoUrlChange: (url: string | null) => void;
  onChangeTemplate: () => void;
  onAuthRequired: (
    data: DatosCVFormulario,
    action: "generate" | "photo",
  ) => void;
  autoGenerate?: boolean;
};

export default function CVFormStep({
  template,
  currentUserId,
  language,
  draftData,
  onGenerated,
  onDraftChange,
  fotoUrl,
  onFotoUrlChange,
  onChangeTemplate,
  onAuthRequired,
  autoGenerate = false,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copy = formCopy[language];
  const formSchema = useMemo(() => createSchema(language), [language]);
  const autoGenerationStarted = useRef(false);

  const form = useForm<DatosCVFormulario>({
    resolver: zodResolver(formSchema),
    defaultValues: draftData,
  });

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const subscription = form.watch((value) => {
      onDraftChange({
        nombre: value.nombre ?? "",
        puesto: value.puesto ?? "",
        contacto: value.contacto ?? "",
        sobreMi: value.sobreMi ?? "",
        experiencia: value.experiencia ?? "",
        formacion: value.formacion ?? "",
        habilidades: value.habilidades ?? "",
        idiomas: value.idiomas ?? "",
        informacionAdicional: value.informacionAdicional ?? "",
        foto_url: value.foto_url,
        template: value.template,
        language: value.language,
      });
    });

    return () => subscription.unsubscribe();
  }, [form, onDraftChange]);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_PHOTO_TYPES.has(file.type)) {
      toast.error(copy.imageTypeError);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PHOTO_SIZE_BYTES) {
      toast.error(copy.imageSizeError);
      event.target.value = "";
      return;
    }

    if (!currentUserId) {
      toast.info(copy.photoAuthRequired);
      onAuthRequired(form.getValues(), "photo");
      event.target.value = "";
      return;
    }

    const fileExt =
      file.name.split(".").pop() || file.type.split("/")[1] || "webp";
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `fotos/user-${currentUserId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("fotos-perfil")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error al subir la imagen", uploadError);
      toast.error(copy.imageError);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("fotos-perfil")
      .getPublicUrl(filePath);

    onFotoUrlChange(publicUrl.publicUrl);
    toast.success(copy.imageSuccess);
  };

  const onSubmit = async (data: DatosCVFormulario) => {
    if (!currentUserId) {
      onAuthRequired(data, "generate");
      return;
    }

    let failureTracked = false;

    try {
      setIsGenerating(true);
      setError(null);
      const attribution = getLandingAttribution();
      track("CV Generation Started", { template, language, ...attribution });

      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, template, language, foto_url: fotoUrl }),
      });

      if (!response.ok) {
        const isTimeout = response.status === 504;
        track("CV Generation Failed", {
          status: response.status,
          template,
          language,
          ...attribution,
        });
        failureTracked = true;
        throw new Error(isTimeout ? copy.timeout : copy.generationError);
      }

      const json = (await response.json()) as RespuestaCV;
      onGenerated(json.cv);
      toast.success(copy.success);
    } catch (submitError) {
      if (!failureTracked) {
        track("CV Generation Failed", {
          template,
          language,
          ...getLandingAttribution(),
        });
      }
      setError(
        submitError instanceof Error ? submitError.message : copy.unknownError,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!autoGenerate || !currentUserId || autoGenerationStarted.current) return;

    autoGenerationStarted.current = true;
    void form.handleSubmit(onSubmit)();
  }, [autoGenerate, currentUserId, form]);

  const limpiarCampos = () => {
    form.reset({
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
    onDraftChange(form.getValues());
    onFotoUrlChange(null);
    setError(null);
  };

  const templateName =
    (language === "en"
      ? {
          elegance: "Elegant",
          purple: "Purple",
          blue: "Blue",
          green: "Green",
          harvard: "Harvard",
          "modern-ats": "Modern ATS",
          "operative-ats": "Operational ATS",
        }
      : {
          elegance: "Elegante",
          purple: "Morado",
          blue: "Azul",
          green: "Verde",
          harvard: "Harvard",
          "modern-ats": "ATS Moderna",
          "operative-ats": "Operativa ATS",
        })[template] || template;

  return (
    <CVFormWizard
      copy={copy}
      language={language}
      template={template}
      templateName={templateName}
      form={form}
      fotoUrl={fotoUrl}
      isGenerating={isGenerating}
      isSubmitting={form.formState.isSubmitting}
      error={error}
      onSubmit={onSubmit}
      onImageUpload={handleImageUpload}
      onClear={limpiarCampos}
      onChangeTemplate={onChangeTemplate}
    />
  );
}
