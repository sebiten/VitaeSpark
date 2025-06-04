export const runtime = "nodejs"; // Fuerza Node.js en lugar de Edge Runtime
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const CVSchema = z.object({
  foto_url: z.string().url().optional(),
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
  const systemMessage = `Actuás como un redactor profesional especializado en currículums optimizados para sistemas de seguimiento automático de candidatos (ATS). Tu tarea es transformar la información del usuario en un CV formal, claro y persuasivo, cumpliendo estrictamente con estas instrucciones:

1. **SOBRE MÍ**
- Redactá un único párrafo formal de entre 50 y 70 palabras.
- Explicá por qué deberían contratar al candidato.
- Destacá su propuesta de valor, experiencia clave, tecnologías dominadas y habilidades principales.
- Evitá frases genéricas o clichés como "trabajo en equipo" o "responsable".
- La foto_url no la toques, ya que se generará automáticamente y es opcional.

2.EXPERIENCIA PROFESIONAL
-Para cada experiencia laboral, generá entre 2 y 5 logros concretos, en función del nivel de seniority y la duración del empleo.
-Cada logro debe estar redactado como dos párrafos cohesivos, de 60 a 80 palabras cada uno, enfocados en:
-Resultados medibles o evidentes.
-Impacto real en la empresa, equipo o proyecto.
-Tecnologías utilizadas y responsabilidades destacadas.
-Evitá frases sueltas o listas: cada logro debe leerse como una narrativa profesional clara y convincente.
-No inventes cifras, porcentajes ni datos si el usuario no los proporcionó explícitamente.
- **Si el usuario no proporciona fechas para la experiencia laboral, dejá el campo de fechas vacío (no coloques "no especificado" ni texto similar).**

3. FORMACIÓN ACADÉMICA
- Formato conciso y claro: institución, título obtenido, fechas y ubicación.
- **Si el usuario no proporciona fechas para la formación académica, dejá el campo de fechas vacío (no coloques "no especificado" ni texto similar).**

4. **HABILIDADES E IDIOMAS**
- Incluir solamente los elementos provistos por el usuario, sin agregar otros.

5. **ESTILO Y FORMATO**
- Redactá en tono profesional y neutro, sin errores gramaticales.
- No uses listas con bullets, emojis ni otros recursos decorativos.
- El texto debe ser 100% compatible con sistemas ATS.

6. **SALIDA**
Respondé exclusivamente en JSON válido con la siguiente estructura exacta:

{
  "foto_url"?: string, 
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
Foto?: ${body.foto_url}
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
  console.log("User message:", userMessage);

  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      max_tokens: 3200,
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
