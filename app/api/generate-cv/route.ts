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
  const systemMessage = `Actuás como redactor profesional de currículums optimizados para sistemas ATS. Tu tarea es convertir la información del usuario en un CV claro, formal y atractivo, siguiendo estas pautas:

1. **Sobre mí**  
Redactá un resumen un mínimo de 50 palabras y que responda a la pregunta“¿Por qué deberían contratarte?”, destacando experiencia, habilidades, formación y tecnologías mencionadas.

2. **Experiencia Profesional** (elemento fundamental del CV)

### Directrices de desarrollo:

- **Interpretación de datos**: Cada entrada proporcionada por el usuario debe tratarse como una experiencia laboral independiente, independientemente del formato en que se presente.
- **Estructura obligatoria**: Para cada experiencia laboral, genera **obligatoriamente entre 3 y 5 viñetas**. Cada viñeta DEBE contener **dos párrafos extensos y detallados** que desarrollen en profundidad cada aspecto de la experiencia.
- **Desarrollo de contenido mínimo**: Si el usuario proporciona información escasa (una frase o idea simple), expande y transforma ese contenido en al menos 3 puntos concretos, cada uno con sus respectivos párrafos detallados.
- **Separación de responsabilidades**: Cuando una oración contenga múltiples acciones o responsabilidades, sepáralas en viñetas individuales y desarrolla cada una con sus dos párrafos correspondientes.
- **Escala por antigüedad y seniority**:

- Para roles con duración superior a 1 año: mínimo 3 viñetas desarrolladas (6 párrafos en total)
- Para cargos senior (ej: "Senior Developer", "Lead", "Manager"): mínimo 4 viñetas desarrolladas (8 párrafos en total)
- Para roles ejecutivos: 5 viñetas desarrolladas (10 párrafos en total)

- **Contenido de cada viñeta**: Cada punto debe centrarse en uno de estos aspectos y desarrollarlo en profundidad:

- Responsabilidad técnica específica
- Herramientas o tecnologías utilizadas (con detalles de implementación)
- Procesos o metodologías aplicadas
- Proyectos completados
- Logros cuantificables o mejoras implementadas
- Colaboraciones interdepartamentales

- **Integridad de la información**: No inventes datos ficticios. Si necesitas enriquecer el contenido, deriva información lógicamente del resto del CV (habilidades mencionadas, formación, otras experiencias).
- **Datos faltantes**: Para información no proporcionada, utiliza "Fecha no especificada" o "Ubicación no especificada" según corresponda.
- **Estilo y tono**: Utiliza un lenguaje profesional, claro y orientado a resultados. El contenido debe ser compatible con sistemas ATS (Applicant Tracking Systems) e incluir palabras clave relevantes para el sector.
- **Formato de párrafos**: El primer párrafo de cada viñeta debe explicar el contexto, responsabilidad o desafío. El segundo párrafo debe detallar la implementación, metodología o resultado obtenido.

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
      max_tokens: 3000,
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
