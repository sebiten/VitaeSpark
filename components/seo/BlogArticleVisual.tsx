import { Check, FileText } from "lucide-react";
import type { CreateIntent } from "@/lib/blog-intent";

type BlogArticleVisualProps = {
  intent: CreateIntent;
};

const visualByIntent: Record<
  CreateIntent,
  {
    eyebrow: string;
    title: string;
    lines: string[];
    note: string;
  }
> = {
  skills: {
    eyebrow: "Habilidades",
    title: "Competencias clave",
    lines: [
      "Excel y carga de datos",
      "Atención al cliente",
      "Organización de documentación",
    ],
    note: "Conectadas con tareas reales",
  },
  profile: {
    eyebrow: "Perfil profesional",
    title: "Una presentación concreta",
    lines: [
      "Experiencia y objetivo claros",
      "Fortalezas relevantes",
      "Sin frases genéricas",
    ],
    note: "Editable antes de descargar",
  },
  "first-job": {
    eyebrow: "Primer empleo",
    title: "Experiencia que también cuenta",
    lines: [
      "Estudios y cursos",
      "Proyectos personales",
      "Habilidades para el puesto",
    ],
    note: "Sin inventar experiencia",
  },
  ats: {
    eyebrow: "Lectura ATS",
    title: "Estructura simple",
    lines: [
      "Perfil profesional",
      "Experiencia",
      "Estudios y habilidades",
    ],
    note: "Secciones fáciles de reconocer",
  },
  "job-specific": {
    eyebrow: "CV por puesto",
    title: "Contenido relevante",
    lines: [
      "Tareas concretas",
      "Herramientas utilizadas",
      "Resultados y responsabilidades",
    ],
    note: "Orientado a la vacante",
  },
  general: {
    eyebrow: "Currículum",
    title: "Información bien ordenada",
    lines: [
      "Perfil profesional",
      "Experiencia concreta",
      "Habilidades relevantes",
    ],
    note: "Listo para revisar",
  },
};

export function BlogArticleVisual({ intent }: BlogArticleVisualProps) {
  const visual = visualByIntent[intent];

  return (
    <figure className="relative mx-auto w-full max-w-[340px]" aria-label={visual.title}>
      <div className="absolute -inset-4 rounded-[30px] bg-[#7A5CFF]/8 blur-2xl" />
      <div className="relative rotate-[1.2deg] rounded-[22px] bg-[#D8D2C8] p-2 shadow-[0_28px_70px_rgba(0,0,0,0.34)]">
        <div className="min-h-[330px] rounded-[16px] bg-[#F6F2EA] p-5 text-[#19181C]">
          <div className="flex items-center justify-between border-b border-black/12 pb-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#6E50E8]">
              VitaeSpark
            </span>
            <FileText className="h-4 w-4 text-black/38" aria-hidden="true" />
          </div>

          <div className="mt-5">
            <div className="h-3.5 w-32 rounded-full bg-[#1B1A1E]" />
            <div className="mt-2 h-2 w-24 rounded-full bg-black/24" />
          </div>

          <div className="mt-7 rounded-xl border border-[#6E50E8]/20 bg-[#6E50E8]/7 p-4">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#6E50E8]">
              {visual.eyebrow}
            </p>
            <p className="mt-2 text-sm font-bold tracking-[-0.02em]">
              {visual.title}
            </p>
            <ul className="mt-3 space-y-2.5">
              {visual.lines.map((line) => (
                <li key={line} className="flex items-center gap-2 text-[11px] font-medium text-black/64">
                  <span className="flex size-4 items-center justify-center rounded-full bg-[#6E50E8] text-white">
                    <Check className="h-2.5 w-2.5" aria-hidden="true" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 space-y-2">
            <div className="h-1.5 w-full rounded-full bg-black/10" />
            <div className="h-1.5 w-10/12 rounded-full bg-black/10" />
            <div className="h-1.5 w-7/12 rounded-full bg-black/10" />
          </div>

          <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold text-[#4E3CB2]">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {visual.note}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs leading-5 text-white/48">
        Un ejemplo visual de cómo se ordena esta parte del CV.
      </figcaption>
    </figure>
  );
}
