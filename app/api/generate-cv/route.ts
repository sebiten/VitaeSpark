export const runtime = "nodejs"; // Fuerza Node.js en lugar de Edge Runtime
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/chat/completions";
import type { RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj, authenticatedGenerationAj } from "@/lib/arcjet";
import { CVSchema, GenerateCVInputSchema } from "@/lib/schemas/cv";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import {
  GUEST_CV_GENERATION_COOKIE,
  GUEST_CV_GENERATION_IP_LIMIT,
  GUEST_CV_GENERATION_MAX_AGE_SECONDS,
  AUTHENTICATED_CV_GENERATION_IP_LIMIT,
  AUTHENTICATED_CV_GENERATION_USER_LIMIT,
  hasGuestCvGeneration,
} from "@/lib/guest-cv-generation";
import { getRequestCountry } from "@/lib/market";
import { createClient } from "@/utils/supabase/server";
import { recordAiGenerationUsage } from "@/lib/ai-generation-usage";
import { normalizeCvGenerationOutput } from "@/lib/cv-generation-output";
import { CV_GENERATION_MODEL } from "@/lib/ai-generation-model";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type Gpt56CompletionParams = Omit<
  ChatCompletionCreateParamsNonStreaming,
  "reasoning_effort"
> & {
  reasoning_effort: "none";
};

const limitWords = (text: string, maxWords: number) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(" ")}.`;
};

const compactText = (text: string, maxWords: number) => {
  const clean = text.replace(/\s+/g, " ").trim();
  const firstSentence = clean.split(/(?<=[.!?])\s+/)[0]?.trim();
  return limitWords(firstSentence || clean, maxWords);
};

const normalizeAchievement = (text: string) => {
  return compactText(text, 36)
    .replace(/\bAutomatiz(?:e|é)\b/gi, "Automaticé")
    .replace(/\bautomatiz(?:e|é)\b/g, "automaticé")
    .replace(/^Cree\b/i, "Creé")
    .replace(/^Desarrolle\b/i, "Desarrollé")
    .replace(/^Implemente\b/i, "Implementé")
    .replace(/^Integre\b/i, "Integré")
    .replace(/^Optimice\b/i, "Optimicé")
    .replace(/^Disene\b/i, "Diseñé")
    .replace(/^Constru(?:i|í)\b/i, "Construí")
    .replace(/^Gestione\b/i, "Gestioné")
    .replace(/^Automatice\b/i, "Automaticé")
    .replace(/^He desarrollado/i, "Desarrollé")
    .replace(/^He implementado/i, "Implementé")
    .replace(/^He integrado/i, "Integré")
    .replace(/, lo que ha .*/i, ".")
    .replace(/, mejorando significativamente .*/i, ".")
    .replace(/\s+/g, " ")
    .trim();
};

const compactSkills = (skills: string[]) => {
  return skills
    .map((skill) => skill.trim())
    .filter(Boolean)
    .filter(
      (skill, index, list) =>
        list.findIndex(
          (item) => item.toLowerCase() === skill.toLowerCase()
        ) === index
    )
    .slice(0, 22);
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isGuest = !user || user.is_anonymous === true;

  if (
    isGuest &&
    hasGuestCvGeneration(req.cookies.get(GUEST_CV_GENERATION_COOKIE)?.value)
  ) {
    return NextResponse.json(
      {
        error: "Ya generaste un CV gratis durante las últimas 24 horas.",
        code: "guest_generation_limit",
      },
      { status: 429 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido en la solicitud" },
      { status: 400 }
    );
  }

  const input = GenerateCVInputSchema.safeParse(rawBody);
  if (!input.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: input.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const body = isGuest
    ? { ...input.data, foto_url: undefined }
    : input.data;

  const decision = isGuest
    ? await aj
        .withRule(shield({ mode: "LIVE" }))
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: GUEST_CV_GENERATION_IP_LIMIT,
            window: "86400s",
          }),
        )
        .protect(req)
    : await authenticatedGenerationAj
        .withRule(shield({ mode: "LIVE" }))
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: AUTHENTICATED_CV_GENERATION_USER_LIMIT,
            window: "86400s",
          }),
        )
        .withRule(
          fixedWindow({
            mode: "LIVE",
            max: AUTHENTICATED_CV_GENERATION_IP_LIMIT,
            window: "86400s",
            characteristics: ["ip.src"],
          }),
        )
        .protect(req, { userId: user.id });

  if (decision.isDenied()) {
    const rateLimited = decision.reason.isRateLimit();
    return NextResponse.json(
      {
        error: rateLimited
          ? isGuest
            ? "Se alcanzó el límite diario de generaciones gratuitas desde esta red."
            : "Alcanzaste el límite diario de generaciones."
          : "Actividad sospechosa bloqueada.",
        code: rateLimited
          ? isGuest
            ? "guest_ip_generation_limit"
            : "authenticated_generation_limit"
          : "suspicious_activity",
        reason: decision.reason,
      },
      { status: rateLimited ? 429 : 403 },
    );
  }

  const compactSystemMessage = `Redacta un CV profesional en español neutro, optimizado para ATS y fácil de escanear.

Reglas:
- No copies literalmente el texto del usuario: mejora claridad y concisión. Convierte responsabilidades en logros solo cuando la entrada incluya un resultado comprobable.
- No inventes cifras, empresas, seniority, fechas, ubicaciones ni tecnologías.
- Perfil profesional: un único párrafo de 45 a 60 palabras, con perfil, stack/habilidades clave, tipo de proyectos y valor profesional concreto.
- Evita clichés y adjetivos vacíos: no uses "apasionado", "innovador", "eficiente", "proactivo", "responsable", "dinámico", "excelente", "gran capacidad" ni frases similares salvo que el usuario lo haya escrito explícitamente.
- El perfil debe sonar como resumen profesional real: qué hace, con qué herramientas, en qué tipo de productos y qué problema ayuda a resolver.
- Experiencia: 2 logros por experiencia. Usa 3 solo si la entrada tiene mucha información real. Cada logro debe ser una sola oración de 20 a 36 palabras.
- Cada logro debe describir una contribución concreta. Incluye impacto solo cuando esté respaldado por la entrada; de lo contrario, expresa la acción y su alcance sin adjudicar mejoras no informadas.
- Prioriza frases con estructura "acción + alcance + resultado": qué hizo, dónde se aplicó y qué permitió mejorar, ordenar, integrar o resolver.
- Los logros deben empezar con verbos en pasado correcto: Desarrollé, Implementé, Integré, Construí, Optimicé, Diseñé, Gestioné, Automaticé o Mantengo.
- No uses "Automatizé", "Cree", "Implemente" ni verbos sin tilde cuando correspondan.
- Evita repetir el stack completo en cada experiencia; si ya aparece en perfil o habilidades, menciona solo tecnologías necesarias.
- Varía los verbos y la estructura entre logros. No empieces todos con "Desarrollé" ni repitas la misma idea con otras palabras.
- No uses "soluciones innovadoras", "aportando valor", "mejorando significativamente" ni expresiones vagas. Reemplázalas por resultados observables y específicos.
- Si un proyecto es propio, freelance o institucional, dilo así. No lo presentes como empleo corporativo.
- Formación: concisa. Si el usuario no proporciona formación, responde con un array vacío.
- Habilidades e idiomas: usa solo datos provistos, normaliza nombres técnicos y elimina duplicados. Si no proporciona idiomas, responde con un array vacío.
- Información adicional: máximo 4 items breves. Conserva links clave provistos por el usuario, especialmente Portfolio, GitHub y LinkedIn. También puedes incluir disponibilidad, certificaciones o datos útiles sin repetir habilidades.
- Si la información del usuario es breve, mejora la redacción sin inflar artificialmente el contenido.
- Si faltan fechas o ubicación, deja el campo como string vacío.
- Compatible con ATS: sin markdown, emojis, tablas ni adornos.

Reglas prioritarias de fidelidad:
- Cada afirmación debe poder rastrearse a un dato explícito del usuario.
- No conviertas una responsabilidad en un resultado o mejora si el usuario no indicó ese resultado.
- No atribuyas experiencia en el sector objetivo, licencias, herramientas, cursos, jerarquía, liderazgo ni disponibilidad ausentes en la entrada.
- No agregues habilidades solo porque suelen pedirse para el puesto buscado.
- Conserva la naturaleza real de cada antecedente: empleo, trabajo informal, proyecto, práctica, voluntariado o curso.
- En perfiles de primer empleo, destaca evidencia real transferible sin contradecir la falta de experiencia formal.
- Antes de responder, verifica que nombres, empresas, fechas, ubicaciones, herramientas y alcances provengan de la entrada.
- La precisión factual tiene prioridad sobre hacer que el CV suene más impactante.

Responde exclusivamente JSON válido con esta estructura:
{"foto_url"?:string,"nombre":string,"puesto":string,"sobreMi":string,"contacto":string[],"experiencia":[{"cargo":string,"empresa":string,"fechas":string,"ubicacion":string,"logros":string[]}],"formacion":[{"institucion":string,"titulo":string,"fechas":string,"ubicacion":string}],"habilidades":string[],"idiomas":string[],"informacionAdicional":string[]}`;

  const englishSystemMessage = `Write a professional resume in natural U.S. English, optimized for ATS and easy for recruiters to scan.

Rules:
- Do not copy the user's text literally: rewrite responsibilities into clear resume achievements.
- Do not invent numbers, companies, seniority, dates, locations or technologies.
- Professional Summary: one paragraph of 45 to 60 words with profile, key skills/tools, type of work and concrete professional value.
- Avoid empty clichés: do not use "passionate", "innovative", "efficient", "proactive", "responsible", "dynamic", "excellent" or similar filler unless the user wrote it explicitly.
- The summary must sound like a real resume summary: what the person does, with which tools, in what kind of work and what problem they help solve.
- Work Experience: 2 achievements per experience. Use 3 only when the user provided enough real information. Each achievement must be one sentence of 20 to 36 words.
- Each achievement must show observable impact without inventing metrics: product delivered, workflow implemented, integration completed, process organized, user experience improved, data managed, automation or concrete functionality.
- Prefer "action + scope + result": what they did, where it applied and what it helped improve, organize, integrate or solve.
- Start achievements with varied action verbs such as Built, Implemented, Integrated, Designed, Optimized, Managed, Automated, Created or Maintained.
- Do not repeat the full tech stack in every experience; mention only technologies that matter for that bullet.
- If a project is personal, freelance or institutional, label it that way. Do not present it as corporate employment.
- Education: concise. If the user provides no education, return an empty array.
- Skills and languages: use only user-provided data, normalize technical names and remove duplicates. If no languages are provided, return an empty array.
- Additional Information: maximum 4 brief items. Keep key links provided by the user, especially Portfolio, GitHub and LinkedIn. You may include availability, certifications or useful details without repeating skills.
- If the user's information is brief, improve wording without artificially inflating content.
- If dates or locations are missing, leave the field as an empty string.
- ATS-compatible: no markdown, emojis, tables or decorative characters.
- Output section concepts should use U.S. resume language, but keep the JSON keys exactly as requested.

Priority fidelity rules:
- Every resume claim must be traceable to explicit user input.
- Do not turn a responsibility into a result unless the user provided that result. Use action plus scope when impact is unknown.
- Do not infer industry experience, licenses, tools, courses, seniority, leadership or availability from the target role.
- Do not add skills merely because they are commonly requested for the target role.
- Preserve whether an item was employment, informal work, a project, internship, volunteer work or a course.
- For first-job profiles, highlight real transferable evidence without contradicting the lack of formal experience.
- Verify that names, companies, dates, locations, tools and scope come from the input.
- Factual accuracy takes priority over making the resume sound more impressive.

Respond exclusively with valid JSON using this exact structure:
{"foto_url"?:string,"nombre":string,"puesto":string,"sobreMi":string,"contacto":string[],"experiencia":[{"cargo":string,"empresa":string,"fechas":string,"ubicacion":string,"logros":string[]}],"formacion":[{"institucion":string,"titulo":string,"fechas":string,"ubicacion":string}],"habilidades":string[],"idiomas":string[],"informacionAdicional":string[]}`;

  const userMessage = JSON.stringify({
    foto_url: body.foto_url,
    nombre: body.nombre,
    puesto: body.puesto,
    sobreMi: body.sobreMi,
    contacto: body.contacto,
    experiencia: body.experiencia,
    formacion: body.formacion,
    habilidades: body.habilidades,
    idiomas: body.idiomas,
    informacionAdicional: body.informacionAdicional,
  });
  const messages: ChatCompletionCreateParamsNonStreaming["messages"] = [
    {
      role: "system",
      content: body.language === "en" ? englishSystemMessage : compactSystemMessage,
    },
    { role: "user", content: userMessage },
  ];
  const makeCompletion = () => {
    if (CV_GENERATION_MODEL === "gpt-4o") {
      return openai.chat.completions.create({
        model: CV_GENERATION_MODEL,
        temperature: 0.2,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages,
      });
    }

    const params: Gpt56CompletionParams = {
      model: CV_GENERATION_MODEL,
      reasoning_effort: "none",
      max_completion_tokens: 1800,
      response_format: { type: "json_object" },
      messages,
    };

    // El SDK instalado aún no incluye "none" en su unión de tipos, pero la API
    // de GPT-5.6 lo soporta y evita tokens de razonamiento en esta tarea estructurada.
    return openai.chat.completions.create(
      params as unknown as ChatCompletionCreateParamsNonStreaming,
    );
  };

  let completion: Awaited<ReturnType<typeof makeCompletion>> | undefined;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      completion = await makeCompletion();
      break;
    } catch (err: any) {
      const status = err?.status ?? err?.response?.status;
      if (status >= 500 && attempt < 3) {
        // Exponential backoff: 500ms, 1000ms, 1500ms
        await new Promise((r) => setTimeout(r, 500 * attempt));
        continue;
      }
      await recordAiGenerationUsage({
        userId: user?.id,
        sessionId: body.attribution?.session_id,
        model: CV_GENERATION_MODEL,
        success: false,
        errorCode: status ? `openai_${status}` : "openai_request_failed",
      });
      return NextResponse.json(
        { error: "Error interno generando CV" },
        { status: 502 }
      );
    }
  }

  const raw = completion?.choices?.[0]?.message?.content;
  if (!raw) {
    await recordAiGenerationUsage({
      userId: user?.id,
      sessionId: body.attribution?.session_id,
      model: CV_GENERATION_MODEL,
      success: false,
      errorCode: "empty_model_response",
    });
    return NextResponse.json(
      { error: "Respuesta inválida del modelo" },
      { status: 500 }
    );
  }

  let result;
  try {
    result = JSON.parse(raw);
  } catch (e) {
    await recordAiGenerationUsage({
      userId: user?.id,
      sessionId: body.attribution?.session_id,
      model: CV_GENERATION_MODEL,
      success: false,
      errorCode: "invalid_model_json",
    });
    return NextResponse.json(
      { error: "JSON inválido del modelo" },
      { status: 500 }
    );
  }

  const directParse = await CVSchema.safeParseAsync(result);
  const parsed = directParse.success
    ? directParse
    : await CVSchema.safeParseAsync(normalizeCvGenerationOutput(result, body));
  if (!parsed.success) {
    console.error(
      "La respuesta del modelo no pudo normalizarse:",
      parsed.error.issues.map((issue) => ({
        code: issue.code,
        path: issue.path.join("."),
      })),
    );
    await recordAiGenerationUsage({
      userId: user?.id,
      sessionId: body.attribution?.session_id,
      model: CV_GENERATION_MODEL,
      success: false,
      errorCode: "invalid_model_schema",
    });
    return NextResponse.json(
      { error: "Estructura inesperada" },
      { status: 500 }
    );
  }

  const cv: RespuestaCV["cv"] = {
    ...parsed.data,
    language: body.language,
    // La foto es un dato del usuario; no debe depender de que el modelo la repita.
    foto_url: body.foto_url,
    sobreMi: limitWords(parsed.data.sobreMi.replace(/\s+/g, " "), 70),
    experiencia: parsed.data.experiencia.map((item) => ({
      ...item,
      logros: item.logros
        .map((logro) => normalizeAchievement(logro))
        .filter(Boolean)
        .slice(0, 3),
    })),
    habilidades: compactSkills(parsed.data.habilidades),
    informacionAdicional: parsed.data.informacionAdicional
      .map((item) => compactText(item, 18))
      .filter(Boolean)
      .slice(0, 4),
  };

  const response: RespuestaCV = { cv };
  const promptTokenDetails = completion?.usage?.prompt_tokens_details as
    | { cached_tokens?: number; cache_write_tokens?: number }
    | undefined;
  await recordAiGenerationUsage({
    userId: user?.id,
    sessionId: body.attribution?.session_id,
    model: CV_GENERATION_MODEL,
    inputTokens: completion?.usage?.prompt_tokens,
    cachedInputTokens: promptTokenDetails?.cached_tokens,
    cacheWriteTokens: promptTokenDetails?.cache_write_tokens,
    outputTokens: completion?.usage?.completion_tokens,
    success: true,
    errorCode: directParse.success ? null : "schema_repaired",
  });
  await recordAnalyticsEventServer({
    event_name: "cv_generated",
    user_id: user?.id ?? null,
    language: body.language,
    template: body.template,
    country_code: getRequestCountry(req.headers),
    is_guest: isGuest,
    ...body.attribution,
  });

  const nextResponse = NextResponse.json(response);

  if (isGuest) {
    nextResponse.cookies.set(GUEST_CV_GENERATION_COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: GUEST_CV_GENERATION_MAX_AGE_SECONDS,
    });
  }

  return nextResponse;
}
