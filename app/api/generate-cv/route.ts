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
    .withRule(fixedWindow({ mode: "LIVE", max: 35, window: "86400s" }))
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
  const systemMessage = `Actuás como redactor profesional de currículums optimizados para sistemas ATS. Tu tarea es convertir la información del usuario en un CV claro, formal y atractivo, siguiendo estas pautas:

1. **Sobre mí**  
Redactá un resumen un mínimo de 50 palabras y que responda a la pregunta“¿Por qué deberían contratarte?”, destacando experiencia, habilidades, formación y tecnologías mencionadas.

2. **Experiencia** (crucial):
- Interpretá cada línea del usuario como una experiencia laboral diferente, sin importar el formato.
Para cada experiencia laboral, generá entre 3 y 5 viñetas obligatoriamente. 
- Si el usuario escribió solo una frase o idea, dividila y expandila en 3 puntos concretos como mínimo. 
- Si hay múltiples acciones en una misma oración, separalas en viñetas individuales. 
- En roles de más de 1 año, se espera al menos 3 viñetas desarrolladas. En cargos senior (ej: “Senior Frontend”), 4 o más. 
- Si no hay suficiente contenido, completá lógicamente a partir del resto del CV.
- Cada viñeta debe tratar sobre una tarea técnica, responsabilidad, herramienta utilizada, proceso aplicado o logro concreto.
- Nunca inventes información. Podés enriquecer lógicamente con datos derivados del resto del CV (habilidades, formación, etc.).
- Si faltan fechas o ubicación, usá “Fecha no especificada” o “Ubicación no especificada”.
- Usá un estilo claro, profesional y orientado a resultados, compatible con sistemas ATS.

3. **Formación**  
Indicá institución, título, ubicación y fechas. Relacioná brevemente con la experiencia si es relevante. No asumas datos que no se indican.

4. **Habilidades**  
Listá exactamente las habilidades mencionadas por el usuario. No agregues nuevas.

5. **Palabras clave y ATS**  
Incluí términos técnicos relevantes del input del usuario. Evitá repeticiones y frases vacías.

6. **Precisión y estilo**  
No inventes. Podés mejorar/redactar mejor tareas comunes, pero siempre basándote en la información provista. Usá un estilo claro, formal y profesional compatible con ATS.


Devuélveme únicamente un JSON estructurado exactamente así:
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
}
`;

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
      model: "gpt-3.5-turbo-0125",
      temperature: 0.4,
      max_tokens: 1280,
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

  await supabase.from("generated_cvs").insert({
    profile_id,
    cv_data: parsed.data,
    template: body.template || "default",
    status: "pending",
  }); // esto lo creamos solo para ver la gente que crea si compra o no

  
  // Devolver en forma de RespuestaCV
  const response: RespuestaCV = { cv: parsed.data };
  return NextResponse.json(response);
}
