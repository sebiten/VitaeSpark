// app/api/generate-cv/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

// Esquema Zod para validar la estructura interna del CV
const CVSchema = z.object({
  nombre: z.string(),
  puesto: z.string(),
  sobreMi: z.string(),
  contacto: z.array(z.string()),
  experiencia: z.array(
    z.object({
      cargo: z.string(),
      empresa: z.string(),
      fechas: z.string(),
      logros: z.array(z.string()),
    })
  ),
  formacion: z.array(
    z.object({
      institucion: z.string(),
      titulo: z.string(),
      fechas: z.string(),
    })
  ),
  habilidades: z.array(z.string()),
  idiomas: z.array(z.string()),
  informacionAdicional: z.array(z.string()),
});

type Interna = z.infer<typeof CVSchema>;

export async function POST(req: Request): Promise<NextResponse> {
  // Parsear datos enviados
  const body: DatosCVFormulario = await req.json();
  if (!body) {
    return NextResponse.json({ error: "No se recibieron datos" }, { status: 400 });
  }

  // Protección y rate-limiting con Arcjet
  const decision = await aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(fixedWindow({ mode: "LIVE", max: 10, window: "86400s" }))
    .protect(req);

  decision.results.forEach(res => console.log("Arcjet rule:", res));
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests or Suspicious Activity", reason: decision.reason },
      { status: 403 }
    );
  }

  // Mensajes para OpenAI
  const systemMessage = `
Eres un redactor profesional de currículums en español, experto en optimización para sistemas ATS.
Tu misión es expandir y embellecer los datos del usuario para que el CV:
1. Genera la sección de Experiencia con el máximo detalle posible: expande cada cargo en viñetas claras que describan responsabilidades, logros medibles y resultados cuantificables, usando verbos de acción y palabras clave relevantes para ATS. Sé fiel a los datos proporcionados —no inventes ni falsifiques información— y presenta el contenido en un estilo profesional, atractivo y fácil de leer para reclutadores.
2. Cumpla con filtros de software ATS: usa verbos de acción, cuantifica logros y emplea palabras clave.
3. Mantenga un tono profesional y claro, solo en español.

Devuélveme solo un JSON con la siguiente estructura exacta:
- nombre: string
- puesto: string
- sobreMi: string
- contacto: string[]
- experiencia: [{ cargo: string; empresa: string; fechas: string; logros: string[] }]
- formacion: [{ institucion: string; titulo: string; fechas: string }]
- habilidades: string[]
- idiomas: string[]
- informacionAdicional: string[]
`;
  const userMessage = JSON.stringify({ datos: body });

  // Función con retries
  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage },
      ],
    });

  let completion;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      completion = await makeCompletion();
      break;
    } catch (err: any) {
      const status = err?.status ?? err?.response?.status;
      if (status >= 500 && attempt < 2) {
        console.warn(`OpenAI fallo (intento ${attempt}), reintentando...`);
        await new Promise(r => setTimeout(r, 500 * attempt));
        continue;
      }
      console.error("Error OpenAI:", err);
      return NextResponse.json({ error: "Error interno generando CV" }, { status: 502 });
    }
  }

    // Intentar extraer JSON via fallback
  if (!completion?.choices?.length) {
    console.error("No se recibieron choices en la respuesta:", completion);
    return NextResponse.json(
      { error: "Respuesta inválida del modelo" },
      { status: 500 }
    );
  }
  const rawMsg = completion.choices[0].message;
  let result: any;

  // 1) Primero, intentar si viene pre-parsed
  if ((rawMsg as any)?.json) {
    result = (rawMsg as any).json;
  } else if (rawMsg.content) {
    // 2) Fallback: parsear el content
    try {
      result = JSON.parse(rawMsg.content);
    } catch (e) {
      console.error("Error parseando contenido JSON:", e);
      return NextResponse.json(
        { error: "JSON inválido del modelo" },
        { status: 500 }
      );
    }
  } else {
    console.error(
      "No se encontró JSON ni content en la respuesta:",
      completion
    );
    return NextResponse.json(
      { error: "Respuesta inválida del modelo" },
      { status: 500 }
    );
  }

  // Validar estructura con Zod
  const parsed = CVSchema.safeParse(result as Interna);
  if (!parsed.success) {
    console.error("Validación Zod falló:", parsed.error);
    return NextResponse.json({ error: "Estructura inesperada" }, { status: 500 });
  }

  // Devolver en forma de RespuestaCV
  const response: RespuestaCV = { cv: parsed.data };
  return NextResponse.json(response);
}
