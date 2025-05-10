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
  const systemMessage = `Actuás como redactor profesional de currículums optimizados para sistemas ATS. Tu tarea es transformar la información del usuario en un CV profesional, claro y detallado. Seguí estas pautas estrictas:

1. **Sobre mí**  
Redactá un párrafo formal de al menos 50 palabras que responda “¿Por qué deberían contratarme?”, resaltando experiencia, habilidades y tecnologías.

2. **Experiencia Profesional (parte clave del CV)**  
Aplicá las siguientes reglas sin omitir ninguna:

- Cada experiencia laboral debe incluir **entre 3 y 5 logros**.
- Cada logro debe ser un **párrafo largo y detallado** (mínimo 80 palabras), no frases breves.
- Si el input es breve, expandí lógicamente sin inventar datos.
- Separá claramente responsabilidades diferentes en puntos distintos.
- Escalá según el rol:
  - Más de 1 año → mínimo 3 logros
  - Senior o líder → mínimo 4
  - Ejecutivo → 5 logros detallados
- Usá lenguaje formal y orientado a resultados. Incluir herramientas, metodologías, métricas o impactos.

3. **Formación**  
Incluí institución, título, ubicación y fechas. Si aplica, relacioná brevemente con la experiencia laboral.

4. **Habilidades**  
Listá únicamente las habilidades provistas por el usuario. No agregues nuevas.

5. **Palabras clave y ATS**  
Usá términos técnicos del input y evitá repeticiones. Nada de frases vacías.

6. **Estilo**  
No inventes. Mejorá la redacción pero sin añadir información falsa. Usá un estilo compatible con sistemas ATS.

---

📌 **Ejemplo de experiencia esperada:**

"experiencia": [
  {
    "cargo": "Desarrollador Frontend",
    "empresa": "VitaeSpark",
    "fechas": "2022–2025",
    "ubicacion": "Salta",
    "logros": [
      "Lideré el desarrollo completo de una plataforma de generación de currículums con inteligencia artificial, utilizando tecnologías como React, Next.js y Supabase. Definí la arquitectura técnica, desarrollé componentes reutilizables y aseguré la escalabilidad del sistema.\n\nAdemás, colaboré en el diseño de una experiencia de usuario intuitiva, realizando pruebas de usabilidad y ajustando flujos en función del feedback de usuarios reales. Esto resultó en una mejora del 40% en la tasa de conversión en la plataforma.",
      "Implementé mecanismos de seguridad y protección de datos personales, asegurando el cumplimiento con normativas locales. Coordiné la integración de pagos con Mercado Pago y logré reducir los errores de transacción en un 70% mediante testing automatizado.\n\nTambién lideré reuniones semanales con el equipo de producto para iterar sobre nuevas funcionalidades, priorizando la mejora continua del sistema."
    ]
  }
]

—

🔁 Respondé únicamente con un JSON con esta estructura:
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
      model: "gpt-3.5-turbo-1106",
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
