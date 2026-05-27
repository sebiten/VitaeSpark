"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { track } from "@vercel/analytics";
import type { Session } from "@supabase/supabase-js";
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
          : "La informacion de contacto es obligatoria",
      ),
    sobreMi: z
      .string()
      .min(
        10,
        language === "en"
          ? "Add a short professional summary"
          : "Describe un poco sobre ti",
      ),
    experiencia: z
      .string()
      .min(
        20,
        language === "en"
          ? "Describe your work experience"
          : "Describe tu experiencia profesional",
      ),
    formacion: z
      .string()
      .min(
        10,
        language === "en"
          ? "Describe your education"
          : "Describe tu formacion academica",
      ),
    habilidades: z
      .string()
      .min(
        1,
        language === "en" ? "Add at least one skill" : "Incluye al menos una habilidad",
      ),
    idiomas: z
      .string()
      .min(
        1,
        language === "en" ? "Add at least one language" : "Incluye al menos un idioma",
      ),
    informacionAdicional: z.string().optional(),
  });

const formCopy = {
  es: {
    badge: "Datos para tu CV",
    title: "Completalo simple. La IA lo ordena despues.",
    description:
      "Escribi con tus palabras: trabajos, estudios, herramientas y contacto. No hace falta que suene perfecto en esta etapa.",
    currentTemplate: "Plantilla actual",
    changeTemplate: "Cambiar plantilla",
    fillTest: "Rellenar prueba",
    clear: "Limpiar",
    basicTitle: "Datos basicos",
    basicDescription: "Lo primero que va a leer una empresa.",
    fullName: "Nombre completo",
    fullNamePlaceholder: "Ej: Sebastian Lopez",
    role: "Puesto o perfil",
    rolePlaceholder: "Ej: Desarrollador web junior",
    contact: "Contacto",
    contactPlaceholder:
      "Salta, Argentina\nsebastian@email.com\n+54 9 ...\nLinkedIn o GitHub si corresponde",
    photo: "Foto opcional",
    uploadImage: "Subir imagen",
    summaryTitle: "Perfil profesional",
    summaryDescription: "Una base corta para que la IA construya un perfil claro.",
    summaryPlaceholder:
      "Ej: Soy estudiante de programacion, trabajo con proyectos web propios y busco mi primera experiencia como desarrollador junior.",
    experienceTitle: "Experiencia",
    experienceDescription: "Separa cada trabajo o proyecto con una linea en blanco.",
    experiencePlaceholder:
      "Desarrollador web, 2024-Actualidad, proyectos propios, Salta\nCree apps con login, base de datos, pagos, panel admin y generacion de PDF.\n\nVendedor, 2021-2023, Tienda XYZ, Salta\nAtencion al cliente, caja, reposicion y control de stock.",
    educationTitle: "Estudios",
    educationDescription: "Inclui carrera, institucion, fechas y ciudad si las tenes.",
    educationPlaceholder:
      "Programacion / Desarrollo de Software, 2025-Actualidad, Universidad Nacional de Salta\n\nDesarrollo Web Full Stack, 2023-Actualidad, formacion autodidacta, online",
    skillsTitle: "Habilidades, idiomas y extras",
    skillsDescription: "Listas simples. La IA se encarga de normalizar y ordenar.",
    skills: "Habilidades",
    skillsPlaceholder: "Ej: Excel, ventas, atencion al cliente, Next.js, Supabase",
    languages: "Idiomas",
    languagesPlaceholder: "Espanol nativo\nIngles B2",
    additional: "Informacion adicional",
    additionalPlaceholder:
      "Ej: portfolio, certificaciones, disponibilidad, licencia de conducir o enlaces importantes.",
    generate: "Generar CV",
    generating: "Generando CV...",
    success: "CV generado correctamente.",
    imageSuccess: "Foto cargada correctamente.",
    imageError: "No se pudo subir la foto. Intenta con otra imagen.",
    timeout: "La generacion esta tardando demasiado. Intenta de nuevo.",
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
    fillTest: "Fill sample",
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
    imageError: "Could not upload the photo. Try another image.",
    timeout: "Generation is taking too long. Try again.",
    generationError: "Error generating the resume. Try again.",
    unknownError: "Unknown error",
  },
} as const;

type Props = {
  setCvData: (data: RespuestaCV["cv"]) => void;
  setActiveTab: (value: string) => void;
  template: string;
  userSession: Session | null;
  language: AppLanguage;
  draftData: DatosCVFormulario;
  onDraftChange: (data: DatosCVFormulario) => void;
  fotoUrl: string | null;
  onFotoUrlChange: (url: string | null) => void;
};

export default function CVFormStep({
  setCvData,
  setActiveTab,
  template,
  userSession,
  language,
  draftData,
  onDraftChange,
  fotoUrl,
  onFotoUrlChange,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const copy = formCopy[language];
  const formSchema = useMemo(() => createSchema(language), [language]);

  const form = useForm<DatosCVFormulario>({
    resolver: zodResolver(formSchema),
    defaultValues: draftData,
  });

  const supabase = createClient();

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

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `fotos/user-${userSession?.user.id}/${fileName}`;

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
      unstable_batchedUpdates(() => {
        setCvData(json.cv);
        setActiveTab("preview");
      });
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

  const rellenarDatosPrueba = () => {
    if (language === "en") {
      form.reset({
        nombre: "Sebastian Lopez",
        puesto: "Junior Full Stack Developer",
        contacto:
          "Austin, TX\nsebastian@example.com\nGitHub: https://github.com/sebiten\nPortfolio: https://sebdevspace.me\nLinkedIn: https://www.linkedin.com/in/sebdevspace",
        sobreMi:
          "I am a web developer building full stack projects with Next.js, React, TypeScript, Supabase and Tailwind CSS. I focus on complete products that include authentication, databases, payments, admin panels, SEO, PDF generation and AI integrations.",
        experiencia:
          "Web Developer, 2024-Present, freelance and personal projects, Remote\n" +
          "Built complete web applications with login, databases, admin dashboards, payments, webhooks, SEO, PDF generation and OpenAI integration.\n\n" +
          "Developer of VitaeSpark, 2026-Present, personal project, Remote\n" +
          "Created an AI resume builder that lets users register, complete a guided form, generate resume content, choose a template, preview the document, pay with PayPal or Mercado Pago and download a PDF.\n\n" +
          "Developer of Romi Tienda, 2026, e-commerce project, Remote\n" +
          "Built an online clothing store with product catalog, product pages, shopping cart, user profile, authentication, admin panel, order management, stock updates, shipping calculation and checkout.\n\n" +
          "Developer of Lumi People, 2024-2026, institutional website, Remote\n" +
          "Built the website for a human resources consulting firm, including landing page, services, team, jobs, news and blog sections using Next.js, TypeScript, Tailwind, MDX, metadata and Schema.org.",
        formacion:
          "Software Development, 2025-Present, National University of Salta, Remote\n" +
          "Studying programming fundamentals, logic and C language.\n\n" +
          "Full Stack Web Development, 2023-Present, self-directed learning and personal projects, online\n" +
          "Learned web development by building real projects and reading official documentation. Practiced HTML, CSS, JavaScript, React, Next.js, TypeScript, Supabase, MongoDB, Tailwind, Git, GitHub, Vercel, APIs, authentication, payments and AI integrations.",
        habilidades:
          "Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, shadcn/ui, Radix UI, Node.js, Supabase, MongoDB, OpenAI API, Mercado Pago, PayPal, Zod, Git, GitHub, Vercel, pnpm, npm, Framer Motion, technical SEO, REST APIs, authentication, webhooks, PDF generation",
        idiomas: "Spanish native\nEnglish B2",
        informacionAdicional:
          "Portfolio: https://sebdevspace.me\nGitHub: https://github.com/sebiten\nLinkedIn: https://www.linkedin.com/in/sebdevspace\nOwn product: https://vitaespark.com\nAvailable for remote freelance or full-time work",
      });
      onDraftChange(form.getValues());
      setError(null);
      return;
    }

    form.reset({
      nombre: "Sebastian",
      puesto: "Desarrollador Full Stack",
      contacto:
        "Salta, Argentina\nsebdevspace@gmail.com\nGitHub: https://github.com/sebiten\nPortfolio: https://sebdevspace.me\nLinkedIn: https://www.linkedin.com/in/sebdevspace",
      sobreMi:
        "Soy de Salta, Argentina. Me dedico al desarrollo web y estoy creando proyectos propios con Next.js, React, TypeScript, Supabase y Tailwind. Me gusta hacer productos completos: login, base de datos, pagos, panel admin, SEO, generacion de PDF e integraciones con IA.",
      experiencia:
        "Desarrollador web, 2024-Actualidad, proyectos propios / freelance, Salta, Argentina\n" +
        "Hice varios proyectos web completos usando Next.js, React, TypeScript, Supabase, Tailwind y Vercel. Los mas importantes son VitaeSpark, Romi Tienda y Lumi People. En esos proyectos trabaje con login, bases de datos, paneles de administracion, pagos, webhooks, SEO, blogs, generacion de PDF e integracion con OpenAI.\n\n" +
        "Desarrollador de VitaeSpark, 2026-Actualidad, proyecto propio, Salta, Argentina\n" +
        "Cree VitaeSpark, una app para generar curriculums con inteligencia artificial. La app permite registrarse, completar un formulario, generar contenido con OpenAI, elegir plantilla, ver preview, pagar con Mercado Pago y descargar el CV en PDF. Tambien tiene perfil de usuario, CVs guardados, webhook de pago y panel interno.\n\n" +
        "Desarrollador de Romi Tienda, 2026, proyecto ecommerce, Salta, Argentina\n" +
        "Desarrolle una tienda online de indumentaria con Next.js, Supabase y Mercado Pago. Tiene catalogo, producto individual, carrito, perfil, login, panel admin para productos e imagenes, pedidos, stock, calculo de envio y checkout.\n\n" +
        "Desarrollador de Lumi People, 2024-2026, proyecto institucional, Salta, Argentina\n" +
        "Trabaje en el sitio web de Lumi People, una consultora de recursos humanos de Salta. Hice landing, servicios, equipo, vacantes, noticias y blog. Use Next.js, TypeScript, Tailwind, MDX, sitemap, metadata, Open Graph y Schema.org para SEO.",
      formacion:
        "Estudiante de Programacion / Desarrollo de Software, 2025-Actualidad, Universidad Nacional de Salta, Salta, Argentina\n" +
        "Estoy estudiando fundamentos de programacion, logica y lenguaje C.\n\n" +
        "Desarrollo Web Full Stack, 2023-Actualidad, formacion autodidacta / proyectos propios, online\n" +
        "Aprendi desarrollo web construyendo proyectos reales y leyendo documentacion oficial. Practique HTML, CSS, JavaScript, React, Next.js, TypeScript, Supabase, MongoDB, Tailwind, Git, GitHub, Vercel, APIs, autenticacion, pagos e integracion con inteligencia artificial.",
      habilidades:
        "Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, shadcn/ui, Radix UI, Node.js, Supabase, MongoDB, OpenAI API, Mercado Pago, Stripe, Zod, Git, GitHub, Vercel, pnpm, npm, Framer Motion, SEO tecnico, APIs REST, autenticacion, webhooks, generacion de PDF, C",
      idiomas: "Espanol nativo\nIngles B2",
      informacionAdicional:
        "Portfolio: https://sebdevspace.me\nGitHub: https://github.com/sebiten\nLinkedIn: https://www.linkedin.com/in/sebdevspace\nProducto propio: https://vitaespark.com\nDisponibilidad para trabajo remoto, freelance o presencial en Salta",
    });
    onDraftChange(form.getValues());
    setError(null);
  };

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
        }
      : {
          elegance: "Elegante",
          purple: "Morado",
          blue: "Azul",
          green: "Verde",
          harvard: "Harvard",
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
      onFillSample={rellenarDatosPrueba}
      onClear={limpiarCampos}
      onChangeTemplate={() => setActiveTab("template")}
    />
  );
}
