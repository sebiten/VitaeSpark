export const runtime = "nodejs"; // Fuerza Node.js en lugar de Edge Runtime
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const CVSchema = z.object({
  foto_url: z.preprocess((value) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === "undefined"
    ) {
      return undefined;
    }

    return value;
  }, z.string().url().optional()),
  nombre: z.string(),
  puesto: z.string(),
  sobreMi: z.string(),
  contacto: z.array(z.string()),
  experiencia: z.array(
    z.object({
      cargo: z.string(),
      empresa: z.string(),
      fechas: z.string(),
      ubicacion: z.string(),
      logros: z.array(z.string()),
    })
  ),
  formacion: z.array(
    z.object({
      institucion: z.string(),
      titulo: z.string(),
      fechas: z.string(),
      ubicacion: z.string(),
    })
  ),
  habilidades: z.array(z.string()),
  idiomas: z.array(z.string()),
  informacionAdicional: z.array(z.string()),
});

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

export async function POST(req: Request): Promise<NextResponse> {
  let body: DatosCVFormulario;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido en la solicitud" },
      { status: 400 }
    );
  }

  if (!body) {
    return NextResponse.json(
      { error: "No se recibieron datos" },
      { status: 400 }
    );
  }

  const decision = await aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(fixedWindow({ mode: "LIVE", max: 85, window: "86400s" }))
    .protect(req);

  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Too Many Requests or Suspicious Activity",
        reason: decision.reason,
      },
      { status: 403 }
    );
  }

  const compactSystemMessage = `Redacta un CV profesional en español neutro, optimizado para ATS y fácil de escanear.

Reglas:
- No copies literal el texto del usuario: reescribe responsabilidades como logros claros.
- No inventes cifras, empresas, seniority, fechas, ubicaciones ni tecnologías.
- Perfil profesional: un único párrafo de 55 a 70 palabras, con perfil, stack/habilidades clave, tipo de proyectos y valor profesional.
- Experiencia: 2 logros por experiencia. Usa 3 solo si la entrada tiene mucha información real. Cada logro debe ser una sola oración de 20 a 36 palabras.
- Los logros deben empezar con verbos en pasado correcto: Desarrollé, Implementé, Integré, Construí, Optimicé, Diseñé, Gestioné, Automaticé o Mantengo.
- No uses "Automatizé", "Cree", "Implemente" ni verbos sin tilde cuando correspondan.
- Evita repetir el stack completo en cada experiencia; si ya aparece en perfil o habilidades, menciona solo tecnologías necesarias.
- Si un proyecto es propio, freelance o institucional, dilo así. No lo presentes como empleo corporativo.
- Formación: concisa. Sin descripciones largas salvo que el usuario las haya escrito.
- Habilidades e idiomas: usa solo datos provistos, normaliza nombres técnicos y elimina duplicados.
- Información adicional: máximo 4 items breves. Mantén links importantes, disponibilidad, certificaciones o datos útiles.
- Si faltan fechas o ubicación, deja el campo como string vacío.
- Compatible con ATS: sin markdown, emojis, tablas ni adornos.

Responde exclusivamente JSON válido con esta estructura:
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
  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: compactSystemMessage },
        { role: "user", content: userMessage },
      ],
    });

  let completion;
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
      return NextResponse.json(
        { error: "Error interno generando CV" },
        { status: 502 }
      );
    }
  }

  const raw = completion?.choices?.[0]?.message?.content;
  if (!raw) {
    return NextResponse.json(
      { error: "Respuesta inválida del modelo" },
      { status: 500 }
    );
  }

  let result;
  try {
    result = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json(
      { error: "JSON inválido del modelo" },
      { status: 500 }
    );
  }

  const parsed = await CVSchema.safeParseAsync(result);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Estructura inesperada" },
      { status: 500 }
    );
  }

  const cv: RespuestaCV["cv"] = {
    ...parsed.data,
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
  return NextResponse.json(response);
}
