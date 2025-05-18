export const runtime = "nodejs"; // Fuerza Node.js en lugar de Edge Runtime
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

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

export async function POST(req: Request): Promise<NextResponse> {
  const body: DatosCVFormulario = await req.json();
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
  const systemMessage = `Actuás como un redactor profesional especializado en currículums optimizados para sistemas de seguimiento automático de candidatos (ATS). Tu tarea es transformar la información del usuario en un CV formal, claro y persuasivo, siguiendo estas instrucciones estrictas:

1. **SOBRE MÍ**
- Redactá un párrafo formal de entre 50 y 70 palabras.
- Explicá por qué deberían contratar al candidato.
- Destacá su propuesta de valor, experiencia principal, tecnologías y fortalezas clave.

2. **EXPERIENCIA PROFESIONAL**
- Por cada experiencia laboral, incluí entre 3 y 5 logros detallados.
- Cada logro debe estar redactado como un texto cohesivo de entre 60 y 80 palabras (no frases sueltas).
- Enfocate en resultados concretos, tecnologías usadas, impacto del trabajo y responsabilidades clave.
- **No inventes cifras ni porcentajes** si no fueron proporcionados por el usuario.
- Si la información es escasa, podés enriquecerla lógicamente, pero sin agregar datos falsos ni exagerar.

3. **FORMACIÓN ACADÉMICA**
- Usá un formato breve y claro: institución, título obtenido, fechas, y ubicación.

4. **HABILIDADES E IDIOMAS**
- Listá únicamente los elementos provistos por el usuario, sin agregar otros.

5. **FORMATO Y ESTILO**
- Redactá en un tono profesional y neutro.
- Evitá errores gramaticales.
- Asegurate de que el texto sea completamente compatible con sistemas ATS.
- Evitá emojis, listas con bullets u otros formatos decorativos.

6. **SALIDA**
Respondé exclusivamente en formato JSON válido con la siguiente estructura:

{
  "nombre": string,
  "puesto": string,
  "sobreMi": string,
  "contacto": string[],
  "experiencia": [
    {
      "cargo": string,
      "empresa": string,
      "fechas": string,
      "ubicacion": string,
      "logros": string[]
    }
  ],
  "formacion": [
    {
      "institucion": string,
      "titulo": string,
      "fechas": string,
      "ubicacion": string
    }
  ],
  "habilidades": string[],
  "idiomas": string[],
  "informacionAdicional": string[]
}`;

  const userMessage = `
Nombre: ${body.nombre}
Puesto: ${body.puesto}
Sobre mí: ${body.sobreMi}
Contacto: ${body.contacto}
Experiencia: ${body.experiencia}
Formación: ${body.formacion}
Habilidades: ${body.habilidades}
Idiomas: ${body.idiomas}
Información adicional: ${body.informacionAdicional}
`.trim();

  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      max_tokens: 1400,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMessage },
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

  const response: RespuestaCV = { cv: parsed.data };
  return NextResponse.json(response);
}
