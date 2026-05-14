"use client";

import { useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { track } from "@vercel/analytics";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import {
  AlertCircle,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Hammer,
  Languages,
  Loader2,
  Mail,
  PlusCircle,
  Sparkles,
  Trash2,
  Upload,
  User,
  Wand2,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { createClient } from "@/utils/supabase/client";
import { Label } from "./ui/label";
import { getLandingAttribution } from "@/lib/analytics-attribution";
import type { AppLanguage } from "@/lib/i18n";

const createSchema = (language: AppLanguage) =>
  z.object({
  foto_url: z.string().url().optional(),
  nombre: z.string().min(1, language === "en" ? "Name is required" : "El nombre es obligatorio"),
  puesto: z.string().min(1, language === "en" ? "Target role is required" : "El puesto es obligatorio"),
  contacto: z.string().min(1, language === "en" ? "Contact information is required" : "La informacion de contacto es obligatoria"),
  sobreMi: z.string().min(10, language === "en" ? "Add a short professional summary" : "Describe un poco sobre ti"),
  experiencia: z.string().min(20, language === "en" ? "Describe your work experience" : "Describe tu experiencia profesional"),
  formacion: z.string().min(10, language === "en" ? "Describe your education" : "Describe tu formacion academica"),
  habilidades: z.string().min(1, language === "en" ? "Add at least one skill" : "Incluye al menos una habilidad"),
  idiomas: z.string().min(1, language === "en" ? "Add at least one language" : "Incluye al menos un idioma"),
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
    quickGuide: "Guia rapida",
    guideItems: [
      ["Escribi datos reales", "No hace falta redactar perfecto. Prioriza claridad y ejemplos concretos."],
      ["Fechas y lugares ayudan", "Si no los recordas, podes dejar el campo aproximado o sin fecha."],
      ["Una idea por linea", "Separar la informacion ayuda a que la IA arme mejor el CV final."],
    ],
    idealFormat: "Formato ideal",
    idealFormatText:
      "Puesto, fechas, empresa, lugar y tareas principales. Con eso ya alcanza para generar una version profesional.",
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
    quickGuide: "Quick guide",
    guideItems: [
      ["Use real information", "No need to write perfectly. Prioritize clarity and concrete examples."],
      ["Dates and locations help", "If you do not remember them, use approximate dates or leave them out."],
      ["One idea per line", "Separating information helps AI build a better final resume."],
    ],
    idealFormat: "Ideal format",
    idealFormatText:
      "Role, dates, company, location and main responsibilities. That is enough to generate a professional version.",
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
};

export default function CVFormStep({
  setCvData,
  setActiveTab,
  template,
  userSession,
  language,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foto_url, setFotoUrl] = useState<string | null>(null);
  const copy = formCopy[language];
  const formSchema = useMemo(() => createSchema(language), [language]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({
    resolver: zodResolver(formSchema),
  });

  const supabase = createClient();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

    setFotoUrl(publicUrl.publicUrl);
    toast.success(copy.imageSuccess);
  };

  const onSubmit = async (data: DatosCVFormulario) => {
    let failureTracked = false;

    try {
      setIsGenerating(true);
      setError(null);
      const attribution = getLandingAttribution();
      track("CV Generation Started", { template, language, ...attribution });

      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, template, language, foto_url }),
      });

      if (!res.ok) {
        const isTimeout = res.status === 504;
        track("CV Generation Failed", {
          status: res.status,
          template,
          language,
          ...attribution,
        });
        failureTracked = true;
        throw new Error(
          isTimeout
            ? copy.timeout
            : copy.generationError
        );
      }

      const json = (await res.json()) as RespuestaCV;
      unstable_batchedUpdates(() => {
        setCvData(json.cv);
        setActiveTab("preview");
      });
      toast.success(copy.success);
    } catch (err) {
      if (!failureTracked) {
        track("CV Generation Failed", {
          template,
          language,
          ...getLandingAttribution(),
        });
      }
      setError(err instanceof Error ? err.message : copy.unknownError);
    } finally {
      setIsGenerating(false);
    }
  };

  const rellenarDatosPrueba = () => {
    if (language === "en") {
      reset({
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
      return;
    }

    reset({
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
  };

  const limpiarCampos = () => {
    reset({
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
    setFotoUrl(null);
    setError(null);
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-sm text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 placeholder:text-white/32";
  const textareaClass =
    "w-full resize-y rounded-xl border border-white/10 bg-[#101014] px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 placeholder:text-white/32";
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-6xl">
      <div className="mb-6 rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-2xl shadow-black/10 sm:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/20 bg-[#38BDF8]/10 px-3 py-1.5 text-sm text-[#38BDF8]">
              <Wand2 className="h-4 w-4" />
              {copy.badge}
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-white/60">
              {copy.description}
            </p>
            <div className="mt-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/72">
              <Palette className="h-3.5 w-3.5 text-[#38BDF8]" />
              {copy.currentTemplate}:{" "}
              <span className="font-semibold text-white">{templateName}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              onClick={() => setActiveTab("template")}
              variant="outline"
              className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Palette className="mr-2 h-4 w-4 text-[#38BDF8]" />
              {copy.changeTemplate}
            </Button>
            <Button
              type="button"
              onClick={rellenarDatosPrueba}
              variant="outline"
              className="border-[#7C3AED]/40 bg-[#7C3AED]/10 text-white hover:bg-[#7C3AED]/20"
            >
              <CheckCircle2 className="mr-2 h-4 w-4 text-[#A78BFA]" />
              {copy.fillTest}
            </Button>
            <Button
              type="button"
              onClick={limpiarCampos}
              variant="outline"
              className="border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <Trash2 className="mr-2 h-4 w-4 text-white/65" />
              {copy.clear}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-5">
          <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10 sm:p-6">
            <SectionTitle
              icon={<User className="h-5 w-5" />}
              title={copy.basicTitle}
              description={copy.basicDescription}
            />

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

            <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
              <FieldError message={errors.contacto?.message}>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
                  <Mail className="h-4 w-4 text-[#38BDF8]" />
                  {copy.contact}
                </Label>
                <textarea
                  {...register("contacto")}
                  rows={4}
                  className={textareaClass}
                  placeholder={copy.contactPlaceholder}
                />
              </FieldError>

              <div>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
                  <Upload className="h-4 w-4 text-[#38BDF8]" />
                  {copy.photo}
                </Label>
                <label className="flex min-h-[118px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#101014] px-4 py-5 text-center transition hover:border-[#7C3AED]/45 hover:bg-[#7C3AED]/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                  {foto_url ? (
                    <img
                      src={foto_url}
                      alt={copy.photo}
                      className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="mb-2 h-5 w-5 text-white/45" />
                      <span className="text-sm text-white/70">{copy.uploadImage}</span>
                      <span className="mt-1 text-xs text-white/35">
                        JPG, PNG o WebP
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10 sm:p-6">
            <SectionTitle
              icon={<BookOpen className="h-5 w-5" />}
              title={copy.summaryTitle}
              description={copy.summaryDescription}
            />
            <FieldError message={errors.sobreMi?.message}>
              <textarea
                {...register("sobreMi")}
                rows={4}
                className={textareaClass}
                placeholder={copy.summaryPlaceholder}
              />
            </FieldError>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10 sm:p-6">
            <SectionTitle
              icon={<Briefcase className="h-5 w-5" />}
              title={copy.experienceTitle}
              description={copy.experienceDescription}
            />
            <FieldError message={errors.experiencia?.message}>
              <textarea
                {...register("experiencia")}
                rows={8}
                className={textareaClass}
                placeholder={copy.experiencePlaceholder}
              />
            </FieldError>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10 sm:p-6">
            <SectionTitle
              icon={<GraduationCap className="h-5 w-5" />}
              title={copy.educationTitle}
              description={copy.educationDescription}
            />
            <FieldError message={errors.formacion?.message}>
              <textarea
                {...register("formacion")}
                rows={5}
                className={textareaClass}
                placeholder={copy.educationPlaceholder}
              />
            </FieldError>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10 sm:p-6">
            <SectionTitle
              icon={<Hammer className="h-5 w-5" />}
              title={copy.skillsTitle}
              description={copy.skillsDescription}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FieldError message={errors.habilidades?.message}>
                <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
                  <Hammer className="h-4 w-4 text-[#38BDF8]" />
                  {copy.skills}
                </Label>
                <textarea
                  {...register("habilidades")}
                  rows={4}
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
                  rows={4}
                  className={textareaClass}
                  placeholder={copy.languagesPlaceholder}
                />
              </FieldError>
            </div>

            <div className="mt-4">
              <Label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
                <PlusCircle className="h-4 w-4 text-[#38BDF8]" />
                {copy.additional}
              </Label>
              <textarea
                {...register("informacionAdicional")}
                rows={3}
                className={textareaClass}
                placeholder={copy.additionalPlaceholder}
              />
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
              <Sparkles className="h-4 w-4 text-[#A78BFA]" />
              {copy.quickGuide}
            </h3>
            <div className="space-y-4 text-sm leading-6 text-white/70">
              {copy.guideItems.map(([title, text]) => (
                <GuideItem key={title} title={title} text={text} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#7C3AED]/20 bg-[#7C3AED]/10 p-5">
            <p className="text-sm font-medium text-white">{copy.idealFormat}</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {copy.idealFormatText}
            </p>
          </div>
        </aside>
      </div>

      {error ? (
        <div className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      ) : null}

      <div className="mt-6 flex justify-center rounded-3xl border border-white/10 bg-[#15151A]/70 p-4 shadow-xl shadow-black/10">
        <Button
          variant="default"
          type="submit"
          disabled={isGenerating || isSubmitting}
          className="h-12 w-full max-w-sm rounded-xl bg-[#7C3AED] px-6 font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition hover:bg-[#6D28D9] sm:w-auto sm:min-w-64"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isGenerating || isSubmitting ? copy.generating : copy.generate}
          {isGenerating ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : null}
        </Button>
      </div>
    </form>
  );
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/15 text-[#A78BFA] ring-1 ring-[#A78BFA]/15">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-white/60">{description}</p>
      </div>
    </div>
  );
}

function FieldError({
  children,
  message,
}: {
  children: React.ReactNode;
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

function GuideItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <p className="flex items-center gap-2 font-medium text-white/88">
        <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
        {title}
      </p>
      <p className="mt-1 pl-6 text-white/65">{text}</p>
    </div>
  );
}
