// app/api/generate-cv/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

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
      ubicacion: z.string(), // ✅ nuevo
      logros: z.array(z.string()),
    })
  ),
  formacion: z.array(
    z.object({
      institucion: z.string(),
      titulo: z.string(),
      fechas: z.string(),
      ubicacion: z.string(), // ✅ nuevo
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
    return NextResponse.json(
      { error: "No se recibieron datos" },
      { status: 400 }
    );
  }

  // Protección y rate-limiting con Arcjet
  const decision = await aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(fixedWindow({ mode: "LIVE", max: 85, window: "86400s" }))
    .protect(req);

  decision.results.forEach((res) => console.log("Arcjet rule:", res));
  if (decision.isDenied()) {
    return NextResponse.json(
      {
        error: "Too Many Requests or Suspicious Activity",
        reason: decision.reason,
      },
      { status: 403 }
    );
  }
  const systemMessage = `Eres un redactor de CVs optimizados para ATS. Transforma la información en un CV profesional siguiendo estas reglas:

1. SOBRE MÍ: Párrafo formal (~50 palabras) que responda "¿Por qué contratarme?", destacando experiencia y habilidades.

2. EXPERIENCIA: Punto crítico - Aplica estas reglas:
   - MÍNIMO 3 logros por experiencia (sin excepciones)
   - Cada logro: párrafo detallado (~80 palabras)
   - Roles senior/liderazgo (>5 años): 5 logros
   - Usa lenguaje formal orientado a resultados con métricas
   - Si falta información, infiere lógicamente según el cargo

3. FORMACIÓN: Incluye institución, título, ubicación y fechas.

4. HABILIDADES: Solo las proporcionadas por el usuario.

5. ESTILO: Compatible con ATS, sin inventar información.

Responde únicamente con un JSON con esta estructura:
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
Experiencia:${body.experiencia}
Formación: ${body.formacion}
Habilidades: ${body.habilidades}
Idiomas: ${body.idiomas}
Información adicional: ${body.informacionAdicional}
`.trim();

  // Función con retries
  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      max_tokens: 2500,
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
        await new Promise((r) => setTimeout(r, 500 * attempt));
        continue;
      }
      console.error("Error OpenAI:", err);
      return NextResponse.json(
        { error: "Error interno generando CV" },
        { status: 502 }
      );
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
    return NextResponse.json(
      { error: "Estructura inesperada" },
      { status: 500 }
    );
  }
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const profile_id = user.data.user.id;

  const { data: cv, error } = await supabase
    .from("generated_cvs")
    .insert({
      profile_id,
      cv_data: parsed.data,
      template: body.template || "default",
      status: "pending",
    })
    .select()
    .single();

  if (error || !cv) {
    console.error("Error al insertar el CV:", error?.message);
    return NextResponse.json(
      { error: "No se pudo guardar el CV" },
      { status: 500 }
    );
  }

  // // Después de guardar el CV en la DB
  // await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cv-preview`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ cvId: cv.id }),
  // });

  // Devolver en forma de RespuestaCV
  const response: RespuestaCV = { cv: parsed.data };
  return NextResponse.json(response);
}
