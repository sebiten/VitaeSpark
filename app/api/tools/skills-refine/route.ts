export const runtime = "nodejs";

import { fixedWindow, shield } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { aj, authenticatedGenerationAj } from "@/lib/arcjet";
import {
  experienceLevels,
  normalizeSkills,
} from "@/lib/skills-tool";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";

const SKILLS_AI_COOKIE = "vitaespark_skills_ai_used";
const DAY_IN_SECONDS = 24 * 60 * 60;
const DEFAULT_GLOBAL_LIMIT = 100;
const DEFAULT_MODEL = "gpt-5.4-nano";

const SkillsRefineInputSchema = z.object({
  role: z.string().trim().min(2).max(80),
  experienceLevel: z.enum(
    experienceLevels.map((level) => level.value) as [
      (typeof experienceLevels)[number]["value"],
      ...(typeof experienceLevels)[number]["value"][],
    ],
  ),
  context: z.string().trim().max(300).optional(),
  baseSkills: z.array(z.string().trim().min(1).max(80)).min(7).max(12),
});

const SkillsRefineOutputSchema = z
  .object({
    technicalSkills: z.array(z.string().trim().min(1).max(80)).min(3).max(7),
    transferableSkills: z
      .array(z.string().trim().min(1).max(80))
      .min(3)
      .max(6),
    summary: z.string().trim().min(20).max(240),
  })
  .superRefine((value, context) => {
    if (
      value.technicalSkills.length + value.transferableSkills.length >
      12
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La respuesta supera el máximo de habilidades.",
      });
    }
  });

export async function POST(request: NextRequest) {
  if (process.env.SKILLS_AI_ENABLED === "false") {
    return NextResponse.json(
      {
        error:
          "La personalización con IA está pausada. Podés usar la selección base.",
        code: "skills_ai_disabled",
      },
      { status: 503 },
    );
  }

  const apiKey =
    process.env.OPENAI_TOOLS_API_KEY ?? process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "La personalización con IA no está disponible. Podés usar la selección base.",
        code: "skills_ai_unavailable",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "La solicitud no tiene un JSON válido." },
      { status: 400 },
    );
  }

  const input = SkillsRefineInputSchema.safeParse(body);
  if (!input.success) {
    return NextResponse.json(
      { error: "Revisá el puesto y el contexto ingresado." },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isGuest = !user;

  if (isGuest && request.cookies.get(SKILLS_AI_COOKIE)?.value === "1") {
    return NextResponse.json(
      {
        error:
          "Ya usaste la personalización gratuita hoy. La selección base sigue disponible.",
        code: "skills_ai_browser_limit",
      },
      { status: 429 },
    );
  }

  const decision = isGuest
    ? await aj
        .withRule(shield({ mode: "LIVE" }))
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: 5,
            window: "86400s",
          }),
        )
        .protect(request)
    : await authenticatedGenerationAj
        .withRule(shield({ mode: "LIVE" }))
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: 3,
            window: "86400s",
          }),
        )
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: 10,
            window: "86400s",
            characteristics: ["ip.src"],
          }),
        )
        .protect(request, { userId: user.id });

  if (decision.isDenied()) {
    const rateLimited = decision.reason.isRateLimit();
    return NextResponse.json(
      {
        error: rateLimited
          ? "Alcanzaste el límite diario de personalizaciones. La selección base sigue disponible."
          : "La solicitud fue bloqueada por seguridad.",
        code: rateLimited
          ? "skills_ai_rate_limit"
          : "skills_ai_suspicious_activity",
      },
      { status: rateLimited ? 429 : 403 },
    );
  }

  const globalLimit = getGlobalDailyLimit();
  const { data: reserved, error: reserveError } = await supabaseAdmin.rpc(
    "reserve_skills_ai_daily",
    { p_limit: globalLimit },
  );

  if (reserveError) {
    console.error("No se pudo reservar el cupo diario de skills AI.");
    return NextResponse.json(
      {
        error:
          "La personalización con IA no está disponible. Podés usar la selección base.",
        code: "skills_ai_counter_unavailable",
      },
      { status: 503 },
    );
  }

  if (reserved !== true) {
    return NextResponse.json(
      {
        error:
          "Se alcanzó el cupo de personalizaciones de hoy. La selección base sigue disponible.",
        code: "skills_ai_global_limit",
      },
      { status: 429 },
    );
  }

  const openai = new OpenAI({ apiKey, maxRetries: 0, timeout: 8_000 });
  const requestBody = {
    model: process.env.SKILLS_AI_MODEL?.trim() || DEFAULT_MODEL,
    reasoning_effort: "none",
    max_completion_tokens: 300,
    response_format: { type: "json_object" as const },
    messages: [
      {
        role: "system" as const,
        content: `Sos especialista en redacción de currículums en español neutro.
Personalizá una lista breve de habilidades para un puesto sin inventar experiencia, herramientas, certificaciones ni tareas.
Usá exclusivamente el puesto, el nivel, el contexto opcional y la lista base recibida.
Evitá adjetivos vacíos como responsable, proactivo, dinámico o excelente.
Devolvé entre 7 y 12 habilidades sin duplicados: capacidades técnicas concretas y capacidades transferibles observables.
La síntesis debe explicar en una sola oración el criterio usado, sin prometer entrevistas ni empleo.
Respondé únicamente JSON válido con esta estructura:
{"technicalSkills":["string"],"transferableSkills":["string"],"summary":"string"}`,
      },
      {
        role: "user" as const,
        content: JSON.stringify({
          role: input.data.role,
          experienceLevel: input.data.experienceLevel,
          context: input.data.context || "",
          baseSkills: normalizeSkills(input.data.baseSkills),
        }),
      },
    ],
  } as unknown as OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

  try {
    const completion = await openai.chat.completions.create(requestBody);
    const raw = completion.choices[0]?.message?.content;
    if (!raw) throw new Error("empty_model_response");

    const parsedJson: unknown = JSON.parse(raw);
    const parsedOutput = SkillsRefineOutputSchema.safeParse(parsedJson);
    if (!parsedOutput.success) throw new Error("invalid_model_response");

    const technicalSkills = normalizeSkills(
      parsedOutput.data.technicalSkills,
      7,
    );
    const technicalKeys = new Set(
      technicalSkills.map((skill) => comparableSkill(skill)),
    );
    const transferableSkills = normalizeSkills(
      parsedOutput.data.transferableSkills.filter(
        (skill) => !technicalKeys.has(comparableSkill(skill)),
      ),
      5,
    );

    if (
      technicalSkills.length < 3 ||
      transferableSkills.length < 3 ||
      technicalSkills.length + transferableSkills.length < 7
    ) {
      throw new Error("insufficient_model_response");
    }

    const response = NextResponse.json({
      technicalSkills,
      transferableSkills,
      summary: parsedOutput.data.summary,
    });

    if (isGuest) {
      response.cookies.set(SKILLS_AI_COOKIE, "1", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: DAY_IN_SECONDS,
      });
    }

    return response;
  } catch {
    console.error("Falló la personalización de habilidades con IA.");
    return NextResponse.json(
      {
        error:
          "No pudimos personalizar ahora. Conservamos la selección base para que puedas continuar.",
        code: "skills_ai_model_error",
      },
      { status: 502 },
    );
  }
}

function getGlobalDailyLimit() {
  const configured = Number.parseInt(
    process.env.SKILLS_AI_GLOBAL_DAILY_LIMIT ?? "",
    10,
  );
  if (!Number.isFinite(configured) || configured < 1) {
    return DEFAULT_GLOBAL_LIMIT;
  }
  return Math.min(configured, 1_000);
}

function comparableSkill(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}
