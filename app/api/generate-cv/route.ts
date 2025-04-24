// app/api/generate-cv/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import type { DatosCVFormulario, RespuestaCV } from "@/lib/types/cv";
import { fixedWindow, shield } from "@arcjet/next";
import { aj } from "@/lib/arcjet";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request): Promise<NextResponse> {
  const body: DatosCVFormulario = await req.json();
  if (!body) {
    return NextResponse.json({ error: "No se recibieron datos" }, { status: 400 });
  }
  const decision = await aj
    .withRule(
      shield({
        mode: "LIVE", // o "DRY_RUN" en desarrollo
      })
    )
    .withRule(
      fixedWindow({
        mode: "LIVE",
        max: 3,
        window: "180s",
      })
    )
    .protect(req);

  for (const result of decision.results) {
    console.log("Arcjet rule:", result);
  }

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
Eres un redactor profesional de currículums en español, experto en optimización para sistemas ATS.  
Tu misión es **expandir** y **embellecer** los datos del usuario para que el CV:

1. Sea más atractivo y legible para reclutadores.  
2. Cumpla con filtros de software ATS: usa verbos de acción, cuantifica logros y emplea palabras clave.  
3. Mantenga un tono profesional y claro, **solo en español**.

Devuélveme **solo** un JSON con esta estructura EXACTA:

{
  "nombre": string,
  "puesto": string,
  "sobreMi": string,
  "contacto": string[],
  "experiencia": { cargo: string; empresa: string; fechas: string; logros: string[] }[],
  "formacion": { institucion: string; titulo: string; fechas: string }[],
  "habilidades": string[],
  "idiomas": string[],
  "informacionAdicional": string[]
}
`;

  const userMessage = `
Estos son los datos brutos:
- Nombre: ${body.nombre}
- Puesto: ${body.puesto}
- Sobre mí: ${body.sobreMi}
- Contacto (coma-separado): ${body.contacto}
- Experiencia (cada línea “Cargo;Empresa;Fechas;Logro1,Logro2”):  
  ${body.experiencia}
- Formación (cada línea “Institución;Título;Fechas”):  
  ${body.formacion}
- Habilidades (coma-separado): ${body.habilidades}
- Idiomas (coma-separado): ${body.idiomas}
- Información adicional: ${body.informacionAdicional ?? ""}

**Instrucciones extra**:  
- Para “Sobre mí” genera un párrafo de **2–3 oraciones** con logros y palabras clave.  
- En “Experiencia” crea **3–5 viñetas** por cargo, con métricas cuando sea posible.  
- En “Habilidades” y “Idiomas” asegúrate de listarlos como array de cadenas.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.5,
    max_tokens: 600,
    messages: [
      { role: "system", content: systemMessage.trim() },
      { role: "user", content: userMessage.trim() },
    ],
  });

  // Para depurar, puedes loguear:
  // console.log(completion.choices[0].message.content);

  let parsed;
  try {
    parsed = JSON.parse(completion.choices[0].message.content!);
  } catch (e) {
    console.error("Error parseando JSON de la IA:", e);
    return NextResponse.json({ error: "JSON inválido" }, { status: 500 });
  }

  return NextResponse.json({ cv: parsed } as RespuestaCV);
}
