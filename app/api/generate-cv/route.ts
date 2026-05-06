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

  const compactSystemMessage = `Actuas como un redactor profesional de curriculums ATS. Tu objetivo es convertir la informacion del usuario en un CV claro, compacto y con impacto real para reclutadores.

Regla principal: el CV debe ser facil de escanear y debe poder entrar idealmente en 1 pagina si el usuario tiene poca o media experiencia. No infles el texto. No agregues relleno.

1. SOBRE MI
- Redacta un unico parrafo de 35 a 50 palabras.
- Debe responder: perfil, stack o habilidades clave, tipo de proyectos/experiencia y valor profesional.
- Evita frases genericas como "responsable", "proactivo", "trabajo en equipo", "apasionado" o "excelentes habilidades".
- No menciones tecnologias que el usuario no haya proporcionado.
- Conserva foto_url sin modificar si viene provista.

2. EXPERIENCIA PROFESIONAL
- Para cada experiencia genera entre 2 y 3 logros. Usa 2 si el puesto/proyecto no tiene mucha informacion; usa 3 solo si hay suficiente contenido real.
- Cada logro debe tener una sola oracion, entre 18 y 32 palabras.
- Cada logro debe empezar con un verbo de accion: Desarrolle, Implemente, Integre, Construi, Optimice, Disene, Gestione, Automatice o Mantengo.
- Prioriza impacto verificable: producto construido, flujo implementado, problema resuelto, integracion realizada, mejora concreta o responsabilidad tecnica.
- Incluye tecnologias solo cuando sean relevantes y hayan sido provistas por el usuario.
- No uses dos frases para decir lo mismo. No repitas la misma idea entre bullets.
- No inventes cifras, porcentajes, empresas, seniority, cargos ni resultados no provistos.
- No conviertas proyectos personales en experiencia laboral corporativa; si corresponde usa "Proyecto propio", "Proyecto freelance" o "Proyecto institucional".
- Si el usuario no proporciona fechas para una experiencia, deja "fechas" como string vacio.
- Si el usuario no proporciona ubicacion, deja "ubicacion" como string vacio.

3. FORMACION ACADEMICA
- Manten cada entrada concisa: institucion, titulo, fechas y ubicacion.
- No agregues descripcion extensa de materias salvo que el usuario la haya escrito.
- Si faltan fechas o ubicacion, deja esos campos como string vacio.

4. HABILIDADES E IDIOMAS
- Incluye solamente elementos provistos por el usuario.
- Normaliza nombres tecnicos, por ejemplo "Next.js", "TypeScript", "Supabase", "Mercado Pago".
- Evita duplicados y habilidades demasiado vagas si ya hay una version mas concreta.

5. INFORMACION ADICIONAL
- Convierte links y datos extra en items breves.
- Maximo 4 items.
- No repitas proyectos o habilidades que ya aparecen claramente en experiencia, salvo enlaces clave como GitHub, LinkedIn o portfolio.

6. ESTILO
- Tono profesional, directo y neutro.
- Compatible con ATS: sin emojis, tablas, markdown, bullets escritos dentro del texto ni caracteres decorativos.
- Usa espanol neutro. No uses signos de exclamacion.
- Prefiere claridad sobre adjetivos. El reclutador debe entender rapido que hizo la persona y con que herramientas.

7. SALIDA
Responde exclusivamente en JSON valido con la misma estructura exacta indicada por el contrato de la API.`;

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
  const makeCompletion = () =>
    openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.2,
      max_tokens: 1800,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemMessage || systemMessage },
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
