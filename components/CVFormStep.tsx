"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Sparkles,
  AlertCircle,
  User,
  Briefcase,
  Mail,
  GraduationCap,
  Code,
  Globe,
  PlusCircle,
  BookOpen,
  CheckCircle2,
  Star,
  Award,
  Hammer,
  Languages,
  Trash2,
} from "lucide-react";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { unstable_batchedUpdates } from "react-dom";
import { Label } from "./ui/label";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { createClient } from "@/utils/supabase/client";
import { Session } from "@supabase/supabase-js";
const schema = z.object({
  foto_url: z.string().url().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  puesto: z.string().min(1, "El puesto es obligatorio"),
  contacto: z.string().min(1, "La información de contacto es obligatoria"),
  sobreMi: z.string().min(10, "Describe un poco sobre ti"),
  experiencia: z.string().min(20, "Describe tu experiencia profesional"),
  formacion: z.string().min(10, "Describe tu formación académica"),
  habilidades: z.string().min(1, "Incluye al menos una habilidad"),
  idiomas: z.string().min(1, "Incluye al menos un idioma"),
  informacionAdicional: z.string().optional(),
});

type Props = {
  setCvData: (data: RespuestaCV["cv"]) => void;
  setActiveTab: (value: string) => void;
  template: string;
  userSession: Session | null;
};

export default function CVFormStep({
  setCvData,
  setActiveTab,
  template,
  userSession,
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foto_url, setFotoUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DatosCVFormulario>({
    resolver: zodResolver(schema),
  });
  const supabase = createClient();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `fotos/user-${userSession?.user.id}/${fileName}`;

    const { data, error } = await supabase.storage
      .from("fotos-perfil")
      .upload(filePath, file);

    if (error) {
      console.error("Error al subir la imagen", error);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("fotos-perfil")
      .getPublicUrl(filePath);

    setFotoUrl(publicUrl.publicUrl);
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Scroll to top when changing tabs
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: DatosCVFormulario) => {
    let failureTracked = false;

    try {
      setIsGenerating(true);
      setError(null);
      track("CV Generation Started", { template });

      const res = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, template, foto_url }),
        keepalive: true,
      });

      if (!res.ok) {
        const isTimeout = res.status === 504;
        track("CV Generation Failed", {
          status: res.status,
          template,
        });
        failureTracked = true;
        throw new Error(
          isTimeout
            ? "La generación está tardando demasiado. Intenta de nuevo."
            : "Error al generar el CV. Intenta nuevamente."
        );
      }

      const json = (await res.json()) as RespuestaCV;
      // Agrupar actualizaciones de estado
      unstable_batchedUpdates(() => {
        setCvData(json.cv);
        setActiveTab("preview");
      });
    } catch (err) {
      if (!failureTracked) {
        track("CV Generation Failed", { template });
      }
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsGenerating(false);
    }
  };

  const rellenarDatosPrueba = () => {
    reset({
      nombre: "Sebastián López",
      puesto: "Desarrollador Web Full Stack",
      contacto: "sebastian.lopez.dev@gmail.com, +54 9 387 456 7890",
      sobreMi:
        "Desarrollador web full stack con más de 5 años de experiencia en la creación de aplicaciones robustas, escalables y centradas en el usuario. Manejo sólido de tecnologías modernas tanto del lado del cliente como del servidor. Me especializo en el desarrollo de soluciones completas, desde el diseño de bases de datos hasta la integración de servicios externos y la optimización del rendimiento.",
      experiencia:
        "Desarrollador Full Stack en VitaeSpark, Salta, 2022–2025. Diseñé e implementé una plataforma de generación de CVs basada en inteligencia artificial. Integré sistemas de autenticación con Clerk, base de datos con Supabase y sistema de pagos con MercadoPago. Optimizamos tiempos de carga y escalabilidad utilizando Next.js 15 y funciones serverless.\n\n" +
        "Desarrollador Web en Agencia Creativa Salta, 2020–2022. Trabajé en más de 20 proyectos de clientes desarrollando soluciones a medida con stacks MERN y JAMstack. Participé en la planificación de arquitectura, creación de APIs REST y GraphQL, diseño de bases de datos relacionales y no relacionales, y despliegue en entornos cloud como Vercel y Heroku.",
      formacion:
        "Licenciatura en Sistemas, Universidad Nacional de Salta, 2016–2021. Promedio: 8.4/10.\n\n" +
        "Curso Profesional de Backend con Node.js, Udemy, 2022.",
      habilidades:
        "JavaScript, TypeScript, React, Next.js, Node.js, Express, PostgreSQL, Supabase, Prisma, Git, Docker, Clerk, MercadoPago API, REST, GraphQL, CI/CD, Vercel.",
      idiomas: "Español: Nativo\nInglés: Intermedio-avanzado (B2/C1)",
      informacionAdicional:
        "Certificación en Desarrollo Web Full Stack (2023).\nMentor en programas de formación para jóvenes desarrolladores.\nParticipación activa en comunidades como DevSalta y NodeConf Argentina.",
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

  return (
    <div className="relative">
      {/* Fondo decorativo */}
      {/* <div className="absolute inset-0  rounded-xl -z-10 opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 rounded-xl -z-10"></div> */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-2xl"
      >
        {/* Consejos para completar tu CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/10 via-transparent to-[#06B6D4]/10 rounded-3xl" />
          <div className="relative rounded-2xl border border-white/10 bg-[#15151A]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            {/* <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#7C3AED]/20 to-transparent rounded-full -translate-y-20 translate-x-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#06B6D4]/20 to-transparent rounded-full translate-y-16 -translate-x-16" /> */}

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#7C3AED]/25">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-full flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#F4F4F5] text-xl">
                    Tips para tu CV
                  </h3>
                  <p className="text-[#A1A1AA] text-sm">
                    Consejos simples para hacerlo mejor
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-2">
                {[
                  "Usá un lenguaje claro y directo",
                  "Incluí solo lo más relevante",
                  "Agregá fechas y lugares de cada trabajo o estudio",
                  "No uses emojis ni símbolos raros",
                ].map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3 rounded-xl backdrop-blur-sm"
                  >
                    <div className="w-2 h-2 bg-gradient-to-br from-[#7C3AED]  rounded-full mt-2 flex-shrink-0" />
                    <div className="flex items-center justify-center">
                      <span className="text-[#D4D4D8] text-sm leading-relaxed">
                        {tip}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-[#7C3AED]/20">
                <Award className="w-5 h-5 text-[#7C3AED]" />
                <p className="text-[#A1A1AA] text-sm">
                  Estos consejos ayudan a que tu CV sea más claro y fácil de
                  leer
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="w-full flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={rellenarDatosPrueba}
            variant="outline"
            className="mb-4 border-[#7C3AED]/40 bg-[#7C3AED]/10 text-white hover:bg-[#7C3AED]/20"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#7C3AED]" />
            Rellenar con datos de prueba
          </Button>
          <Button
            type="button"
            onClick={limpiarCampos}
            variant="outline"
            className="mb-4 border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <Trash2 className="w-4 h-4 mr-1.5 text-white/60" />
            Limpiar todos los campos
          </Button>
        </div>

        {/* Datos personales */}
        <div className="rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
          {/* Nombre y puesto */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                Nombre completo
              </Label>
              <div className="relative">
                <input
                  {...register("nombre")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="Ej: Ana Gómez"
                />
              </div>
              {errors.nombre && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.nombre.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label className="text-white">Foto de perfil (opcional)</Label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-1 block w-full text-sm text-gray-300 file:bg-[#7C3AED] file:border-0 file:text-white file:py-1 file:px-3 file:rounded"
              />
              {foto_url && (
                <div className="mt-2">
                  <img
                    src={foto_url}
                    alt="Foto de perfil"
                    className="w-24 h-24 object-cover rounded-lg border border-[#3F3F46]"
                  />
                </div> // YA TENGO LA FOTO URL DE LA PERSONA, AHORA SOLO QUEDARIA IDENTIFICARLA EN EL CV
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
                ¿A qué te dedicás?
              </Label>
              <div className="relative">
                <input
                  {...register("puesto")}
                  className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                  placeholder="Ej: Mecánico, Docente, Programador..."
                />
              </div>
              {errors.puesto && (
                <p className="text-red-400 text-xs mt-1.5 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                  {errors.puesto.message}
                </p>
              )}
            </div>
          </div>

          {/* Contacto */}
          <div className="mt-5">
            <Label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              ¿Cómo te contactamos?
            </Label>
            <div className="relative">
              <input
                {...register("contacto")}
                className="w-full bg-[#2A2A2D] text-white p-3 pr-3 py-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Email, teléfono o redes (ej: juan@email.com)"
              />
            </div>
            {errors.contacto && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.contacto.message}
              </p>
            )}
          </div>
        </div>

        {/* Sobre mí */}
        <div className="rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
          <div>
            <Label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Sobre vos
            </Label>
            <div className="relative">
              <textarea
                {...register("sobreMi")}
                rows={3}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Contá quién sos y qué sabés hacer"
              />
            </div>
            {errors.sobreMi && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.sobreMi.message}
              </p>
            )}
          </div>
        </div>

        {/* Experiencia y formación */}
        <div className="rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
          {/* Experiencia */}
          <div className="mb-5">
            <Label className="text-sm font-medium text-white/90 flex items-center">
              <Briefcase className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Experiencia
            </Label>
            <div className="text-sm ml-1 italic my-2 text-white bg-transparent border-0">
              <p>
                Escribí cada trabajo con:{" "}
                <strong>puesto, fechas, empresa, lugar y tareas</strong>.
              </p>
            </div>
            <div className="relative">
              <textarea
                {...register("experiencia")}
                rows={7}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Ej: Vendedor, 2019-2022, Tienda XYZ, Salta, atención al cliente y caja"
              />
            </div>
            {errors.experiencia && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.experiencia.message}
              </p>
            )}
          </div>

          {/* Formación */}
          <div>
            <Label className="text-sm font-medium text-white/90 flex items-center">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Estudios
            </Label>
            <div className="text-sm ml-1 italic my-2 text-white bg-transparent border-0">
              <p>
                Escribí cada estudio con:{" "}
                <strong>nombre, fechas, institución y lugar</strong>.
              </p>
            </div>
            <div className="relative">
              <textarea
                {...register("formacion")}
                rows={6}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Ej: Secundario completo, 2015-2019, Escuela N°123, Jujuy"
              />
            </div>
            {errors.formacion && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.formacion.message}
              </p>
            )}
          </div>
        </div>

        {/* Idiomas y habilidades */}
        <div className="rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
          {/* Idiomas */}
          <div className="mb-5">
            <Label className="text-sm font-medium text-white/90 flex items-center">
              <Languages className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Idiomas que sabés
            </Label>
            <div className="text-sm ml-1 italic my-2 text-white bg-transparent border-0">
              <p>Ej: Español nativo, Inglés básico</p>
            </div>
            <div className="relative">
              <textarea
                {...register("idiomas")}
                rows={2}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Español nativo, Inglés básico"
              />
            </div>
            {errors.idiomas && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.idiomas.message}
              </p>
            )}
          </div>

          {/* Habilidades */}
          <div>
            <Label className="text-sm font-medium text-white/90 flex items-center">
              <Hammer className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Habilidades o herramientas que usás
            </Label>
            <div className="text-sm ml-1 italic my-2 text-white bg-transparent border-0">
              <p>Ej: Excel, Mecánica, Costura, Ventas, Redes sociales</p>
            </div>
            <div className="relative">
              <textarea
                {...register("habilidades")}
                rows={3}
                className="w-full bg-[#2A2A2D] text-white p-3 rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Ej: Excel, Mecánica, Costura, Ventas, Redes sociales"
              />
            </div>
            {errors.habilidades && (
              <p className="text-red-400 text-xs mt-1.5 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1.5 flex-shrink-0" />
                {errors.habilidades.message}
              </p>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
          <div>
            <Label className="text-sm font-medium text-white/90 block mb-1.5 flex items-center">
              <PlusCircle className="w-3.5 h-3.5 mr-1.5 text-[#7C3AED]" />
              Información adicional
            </Label>
            <div className="relative">
              <textarea
                {...register("informacionAdicional")}
                rows={2}
                className="w-full bg-[#2A2A2D] text-white p-3  rounded-lg border border-[#3F3F46] focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all duration-200 outline-none"
                placeholder="Ej: Certificaciones, cursos, premios, etc."
              />
            </div>
          </div>
        </div>
        {/* Botón continuar */}
        <div className="w-full flex justify-end">
          <Button
            variant="default"
            type="submit"
            className="h-14 w-full rounded-xl bg-[#7C3AED] px-6 text-white shadow-lg shadow-[#7C3AED]/25 transition duration-200 hover:opacity-90 font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isSubmitting ? "Generando..." : "Generar CV"}

            {isGenerating && <Loader2 className="animate-spin ml-2 w-4 h-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
