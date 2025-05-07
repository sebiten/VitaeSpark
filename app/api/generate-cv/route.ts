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
    return NextResponse.json(
      { error: "No se recibieron datos" },
      { status: 400 }
    );
  }

  // Protección y rate-limiting con Arcjet
  const decision = await aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(fixedWindow({ mode: "LIVE", max: 34, window: "86400s" }))
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

  const systemMessage = `
Eres un experto redactor profesional de currículums en español, especializado en optimización para sistemas ATS.

Tu objetivo es transformar la información proporcionada por el usuario en un currículum profesional altamente efectivo para superar filtros ATS y atractivo para reclutadores humanos. Sigue estas reglas estrictamente:

1. **Sección "Sobre mí"**:
   Redacta esta sección respondiendo directamente a la pregunta "¿Por qué deberíamos contratarte?". Expande significativamente generando un resumen profesional robusto, basado exclusivamente en los datos proporcionados (puesto, habilidades, experiencia, formación). Realiza inferencias coherentes y resalta claramente años de experiencia, tecnologías clave, especialización, enfoque práctico, fortalezas personales y valor añadido profesional, asegurate que no sean mas de 3 renglones.

2. **Sección "Experiencia"**:
   - Desarrolla cada experiencia profesional en formato de viñetas detalladas (mínimo 3 viñetas por puesto).
   - Destaca claramente tareas técnicas realizadas, responsabilidades específicas, tecnologías o herramientas empleadas y logros concretos (medibles cuando sea posible o inferibles por contexto).
   - Usa verbos de acción y lenguaje enfocado en resultados y desempeño.
   - Enriquece de forma lógica usando información relacionada que provenga exclusivamente del resto del CV (habilidades, formación, tecnologías claramente mencionadas).

3. **Sección "Formación Académica"**:
   Describe brevemente cómo la formación académica fortalece o respalda las experiencias profesionales mencionadas, sin inventar detalles adicionales.

4. **Sección "Habilidades"**:
   Enumera claramente todas las habilidades técnicas y personales mencionadas explícitamente por el usuario.

5. **Cumplimiento estricto con prácticas ATS**:
   Incorpora siempre palabras clave técnicas y específicas mencionadas explícitamente por el usuario.

6. **Precisión y coherencia**:
   Nunca inventes empresas, tecnologías, puestos, certificaciones o responsabilidades que no estén explícitamente mencionadas por el usuario. Sin embargo, puedes enriquecer de forma lógica y coherente tareas habituales del rol, basándote únicamente en las tecnologías y herramientas claramente indicadas por el usuario.

7. **Estilo profesional**:
   Usa un lenguaje profesional, neutro, claro y formal. Evita exageraciones subjetivas, términos coloquiales o información poco específica.

Devuelve únicamente un JSON estructurado exactamente así:
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
      "logros": string[]
    }
  ],
  "formacion": [
    {
      "institucion": string,
      "titulo": string,
      "fechas": string
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

  // Función con retries
  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 800,
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

  // Devolver en forma de RespuestaCV
  const response: RespuestaCV = { cv: parsed.data };
  return NextResponse.json(response);
}
