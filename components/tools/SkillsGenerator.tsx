"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { recordAnalyticsEvent } from "@/lib/analytics-events";
import { setLandingAttribution } from "@/lib/analytics-attribution";
import {
  createSkillsToolTransfer,
  generateSkillSuggestions,
  getSkillsRoleLabel,
  INITIAL_SELECTED_SKILLS,
  MAX_SELECTED_SKILLS,
  selectInitialSkills,
  SKILLS_TOOL_PATH,
  SKILLS_TOOL_TRANSFER_KEY,
  skillsRoles,
  experienceLevels,
  type SkillsExperienceLevel,
  type SkillsToolResult,
} from "@/lib/skills-tool";

const TOOL_CTA_LABEL = "skills_tool_continue";

type SkillsRefineResponse = SkillsToolResult & {
  error?: string;
  code?: string;
};

export default function SkillsGenerator() {
  const [roleId, setRoleId] = useState("");
  const [customRole, setCustomRole] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<SkillsExperienceLevel>("inicial");
  const [context, setContext] = useState("");
  const [result, setResult] = useState<SkillsToolResult | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isRefining, setIsRefining] = useState(false);
  const startedRef = useRef(false);

  const roleLabel = roleId
    ? getSkillsRoleLabel(roleId, customRole)
    : "";
  const canGenerate =
    Boolean(roleId) && (roleId !== "otro" || Boolean(customRole.trim()));

  const recordToolEvent = (
    eventName:
      | "tool_started"
      | "tool_result_generated"
      | "tool_ai_refined"
      | "tool_result_copied",
  ) => {
    recordAnalyticsEvent({
      event_name: eventName,
      landing_path: SKILLS_TOOL_PATH,
      source_type: "tool",
      language: "es",
    });
  };

  const ensureStarted = () => {
    setLandingAttribution({
      landing_path: SKILLS_TOOL_PATH,
      cta_label: "skills_tool_start",
      source_type: "tool",
    });
    if (startedRef.current) return;
    startedRef.current = true;
    recordToolEvent("tool_started");
  };

  const handleGenerate = () => {
    if (!canGenerate) {
      toast.error(
        roleId === "otro"
          ? "Escribí el puesto que buscás."
          : "Elegí un puesto para empezar.",
      );
      return;
    }

    ensureStarted();
    const nextResult = generateSkillSuggestions({
      roleId,
      customRole,
      experienceLevel,
    });
    setResult(nextResult);
    setSelectedSkills(selectInitialSkills(nextResult));
    recordToolEvent("tool_result_generated");

    window.requestAnimationFrame(() => {
      document
        .getElementById("skills-tool-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills((current) => {
      if (current.includes(skill)) {
        return current.filter((item) => item !== skill);
      }
      if (current.length >= MAX_SELECTED_SKILLS) {
        toast.info(`Podés elegir hasta ${MAX_SELECTED_SKILLS} habilidades.`);
        return current;
      }
      return [...current, skill];
    });
  };

  const handleRefine = async () => {
    if (!result || !roleLabel) return;

    setIsRefining(true);
    try {
      const response = await fetch("/api/tools/skills-refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: roleLabel,
          experienceLevel,
          context: context.trim() || undefined,
          baseSkills: [
            ...result.technicalSkills,
            ...result.transferableSkills,
          ],
        }),
      });
      const payload = (await response.json()) as SkillsRefineResponse;

      if (!response.ok) {
        throw new Error(
          payload.error ||
            "La personalización con IA no está disponible ahora.",
        );
      }

      const refinedResult: SkillsToolResult = {
        technicalSkills: payload.technicalSkills,
        transferableSkills: payload.transferableSkills,
        summary: payload.summary,
      };
      setResult(refinedResult);
      setSelectedSkills(selectInitialSkills(refinedResult));
      recordToolEvent("tool_ai_refined");
      toast.success("Personalizamos la selección con tu contexto.");
    } catch (error) {
      toast.info(
        error instanceof Error
          ? error.message
          : "Conservamos la selección base para que puedas continuar.",
      );
    } finally {
      setIsRefining(false);
    }
  };

  const handleCopy = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Seleccioná al menos una habilidad.");
      return;
    }

    try {
      await navigator.clipboard.writeText(selectedSkills.join(", "));
      recordToolEvent("tool_result_copied");
      toast.success("Habilidades copiadas.");
    } catch {
      toast.error("No pudimos copiar. Seleccioná el texto manualmente.");
    }
  };

  const handleContinue = () => {
    if (!roleLabel || selectedSkills.length === 0) {
      toast.error("Seleccioná al menos una habilidad para continuar.");
      return;
    }

    const transfer = createSkillsToolTransfer({
      role: roleLabel,
      skills: selectedSkills,
    });
    window.sessionStorage.setItem(
      SKILLS_TOOL_TRANSFER_KEY,
      JSON.stringify(transfer),
    );
    window.sessionStorage.setItem("vitaespark-create-intent", "skills");
    setLandingAttribution({
      landing_path: SKILLS_TOOL_PATH,
      cta_label: TOOL_CTA_LABEL,
      source_type: "tool",
    });
    recordAnalyticsEvent({
      event_name: "landing_cta_clicked",
      landing_path: SKILLS_TOOL_PATH,
      cta_label: TOOL_CTA_LABEL,
      source_type: "tool",
      language: "es",
    });

    const params = new URLSearchParams({
      intent: "skills",
      landing_path: SKILLS_TOOL_PATH,
      source_type: "tool",
      cta_label: TOOL_CTA_LABEL,
    });
    window.location.assign(`/crear?${params.toString()}`);
  };

  return (
    <section
      className={`mx-auto max-w-6xl px-4 sm:px-6 ${result ? "pb-28 md:pb-0" : ""}`}
      aria-labelledby="skills-generator-title"
    >
      <div className="grid overflow-hidden rounded-[30px] border border-white/10 bg-[#121217] shadow-[0_32px_100px_rgba(0,0,0,0.34)] lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-white/8 p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#B8A7FF]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generador gratuito
          </div>
          <h2
            id="skills-generator-title"
            className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#F6F2EA] sm:text-3xl"
          >
            Contanos qué trabajo buscás
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#C9C3BA]/68">
            Elegí el puesto y tu nivel. La primera selección se genera en el
            momento, sin registro.
          </p>

          <div className="mt-7 space-y-6">
            <div>
              <label
                htmlFor="skills-role"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-white/62"
              >
                Puesto o área
              </label>
              <select
                id="skills-role"
                value={roleId}
                onChange={(event) => {
                  setRoleId(event.target.value);
                  setResult(null);
                  setSelectedSkills([]);
                }}
                className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-[#1A1A20] px-4 text-sm text-[#F6F2EA] outline-none transition focus:border-[#8B75E8] focus:ring-2 focus:ring-[#8B75E8]/20"
              >
                <option value="">Elegí una opción</option>
                {skillsRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            {roleId === "otro" && (
              <div>
                <label
                  htmlFor="skills-custom-role"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-white/62"
                >
                  Puesto que buscás
                </label>
                <input
                  id="skills-custom-role"
                  value={customRole}
                  maxLength={80}
                  onChange={(event) => setCustomRole(event.target.value)}
                  placeholder="Ej.: auxiliar de farmacia"
                  className="mt-2 h-12 w-full rounded-xl border border-white/12 bg-[#1A1A20] px-4 text-sm text-[#F6F2EA] outline-none transition placeholder:text-white/34 focus:border-[#8B75E8] focus:ring-2 focus:ring-[#8B75E8]/20"
                />
              </div>
            )}

            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-white/62">
                Nivel de experiencia
              </legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {experienceLevels.map((level) => {
                  const active = experienceLevel === level.value;
                  return (
                    <button
                      key={level.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setExperienceLevel(level.value)}
                      className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B75E8] ${
                        active
                          ? "border-[#8068E8] bg-[#8068E8]/14 text-[#EEE9FF]"
                          : "border-white/10 bg-white/[0.025] text-white/52 hover:border-white/20 hover:text-white/78"
                      }`}
                    >
                      {level.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <div className="flex items-end justify-between gap-4">
                <label
                  htmlFor="skills-context"
                  className="text-xs font-semibold uppercase tracking-[0.14em] text-white/62"
                >
                  Tareas o herramientas
                  <span className="ml-1 normal-case tracking-normal text-white/34">
                    (opcional)
                  </span>
                </label>
                <span className="text-[11px] text-white/32">
                  {context.length}/300
                </span>
              </div>
              <textarea
                id="skills-context"
                value={context}
                maxLength={300}
                onChange={(event) => setContext(event.target.value)}
                placeholder="Ej.: atendía consultas, usaba Excel y organizaba documentación."
                className="mt-2 min-h-28 w-full resize-y rounded-xl border border-white/12 bg-[#1A1A20] px-4 py-3 text-sm leading-6 text-[#F6F2EA] outline-none transition placeholder:text-white/34 focus:border-[#8B75E8] focus:ring-2 focus:ring-[#8B75E8]/20"
              />
              <p className="mt-2 text-xs leading-5 text-white/38">
                Solo se usa si elegís personalizar el resultado con IA.
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] px-5 text-sm font-semibold text-[#111113] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7A6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#121217]"
            >
              Generar mis habilidades
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          id="skills-tool-result"
          className="scroll-mt-24 bg-[#0E0E12] p-5 sm:p-8"
          aria-live="polite"
        >
          {!result ? (
            <div className="flex min-h-[430px] flex-col justify-between rounded-[22px] border border-dashed border-white/12 p-6 sm:p-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/34">
                  Tu resultado
                </span>
                <h3 className="mt-4 max-w-md text-2xl font-semibold tracking-[-0.035em] text-white/72">
                  Una lista breve, específica y lista para tu CV.
                </h3>
              </div>
              <div className="space-y-3" aria-hidden="true">
                {[84, 70, 76, 58].map((width) => (
                  <div
                    key={width}
                    className="h-11 rounded-xl border border-white/6 bg-white/[0.025]"
                    style={{ width: `${width}%` }}
                  />
                ))}
              </div>
              <p className="max-w-md text-sm leading-6 text-white/38">
                Evitamos frases vacías como “responsable” o “proactivo” y
                priorizamos capacidades que una empresa puede reconocer.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#75D5FF]">
                    Selección para {roleLabel}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-[#F6F2EA]">
                    Elegí las que realmente te representan
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                    {result.summary} Marcamos {INITIAL_SELECTED_SKILLS} como
                    punto de partida.
                  </p>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/56">
                  {selectedSkills.length}/{MAX_SELECTED_SKILLS} elegidas
                </div>
              </div>

              <SkillGroup
                title="Habilidades técnicas"
                skills={result.technicalSkills}
                selectedSkills={selectedSkills}
                onToggle={handleToggleSkill}
              />
              <SkillGroup
                title="Habilidades transferibles"
                skills={result.transferableSkills}
                selectedSkills={selectedSkills}
                onToggle={handleToggleSkill}
              />

              <div className="mt-7 border-t border-white/8 pt-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.035] px-4 text-sm font-semibold text-white/78 transition hover:border-white/22 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B75E8]"
                  >
                    <Clipboard className="h-4 w-4" aria-hidden="true" />
                    Copiar selección
                  </button>
                  <button
                    type="button"
                    onClick={handleRefine}
                    disabled={isRefining}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#8068E8]/45 bg-[#8068E8]/10 px-4 text-sm font-semibold text-[#D9D0FF] transition hover:bg-[#8068E8]/16 disabled:cursor-wait disabled:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B75E8]"
                  >
                    {isRefining ? (
                      <LoaderCircle
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                    )}
                    Personalizar con IA
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleContinue}
                  className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] px-5 py-3 text-sm font-semibold text-[#111113] transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B7A6FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E12]"
                >
                  Usar estas habilidades en mi CV
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-white/38">
                  Conservamos tu puesto y la selección durante 2 horas en esta
                  pestaña. Podés completar o editar todo antes de generar el CV.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#111116]/95 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
          <button
            type="button"
            onClick={handleContinue}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F6F2EA] px-5 text-sm font-semibold text-[#111113]"
          >
            Usar en mi CV
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}

function SkillGroup({
  title,
  skills,
  selectedSkills,
  onToggle,
}: {
  title: string;
  skills: string[];
  selectedSkills: string[];
  onToggle: (skill: string) => void;
}) {
  return (
    <fieldset className="mt-7">
      <legend className="text-xs font-semibold uppercase tracking-[0.15em] text-white/46">
        {title}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => {
          const selected = selectedSkills.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(skill)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 py-2 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B75E8] ${
                selected
                  ? "border-[#8068E8]/70 bg-[#8068E8]/15 text-[#EEE9FF]"
                  : "border-white/10 bg-white/[0.025] text-white/52 hover:border-white/20 hover:text-white/78"
              }`}
            >
              <span
                className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                  selected
                    ? "border-[#A997FF] bg-[#8068E8]"
                    : "border-white/24"
                }`}
              >
                {selected && (
                  <Check className="h-3 w-3 text-white" aria-hidden="true" />
                )}
              </span>
              {skill}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
