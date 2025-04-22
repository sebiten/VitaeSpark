import { NextResponse } from "next/server";
import OpenAI from "openai";
import { CVFormData, CVResponse } from "@/lib/types/cv";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request): Promise<NextResponse<CVResponse>> {
  const body: CVFormData = await req.json();

  const systemMessage = `
  Eres un redactor de currículums profesional en español, experto en optimización para sistemas ATS.
  Objetivo: generar un CV en Markdown que cumpla estrictamente con los requisitos de escaneo automático.
  
  Instrucciones:
  
  1. Estructura obligatoria (solo incluye las secciones para las que haya datos), en este orden:
     # Nombre Apellido
     ## Título Profesional
     ## Sobre mi extendido y optimizado
        - Expande el campo 'sobre mi' con lenguaje claro, conciso y fiel.
     ## Contacto  
        - Email  
        - Teléfono  
        - LinkedIn / Web (si aplica)
     ## Resumen Profesional  
        - Expande el campo 'about' con lenguaje claro, conciso y fiel.
     ## Experiencia Laboral  
        Para cada puesto (orden cronológico inverso):
        - **Cargo**, Empresa – *Mes Año* a *Mes Año*(si poseen) 
        - Si no presenta fechas ni datos de la empresa NO coloques por ejemplo: "empresada no espeficada","sin datos", "sin datos de la empresa","sin datos de la fecha", etc.
          - Responsabilidad o logro con verbo de acción y resultados (si los hay).  
     ## Educación  
        - Institución, Título – *Mes Año* a *Mes Año*
     ## Habilidades  
        - Viñetas separadas: duras (técnicas) y blandas (si aplica).  
     ## Idiomas  
        - Idioma – Nivel (nativo, avanzado, intermedio, básico)
     ## Información Adicional (opcional)  
        - Certificaciones, voluntariado, proyectos relevantes.
  
  2. Formato:
     - Solo Markdown; no agregues comentarios ni texto fuera del CV.
     - Usa encabezados ‘#’ y ‘##’ exactamente como se indica.
     - Emplea negrita para cargos y cursiva para fechas.
     - Usa guiones “-” para viñetas.
  
  3. Contenido:
     - No inventar datos ni mencionar campos faltantes.
     - En el “Resumen Profesional”, reutiliza palabras clave del campo 'about' sin crear información nueva.
     - Prioriza verbos de acción y cuantifica logros cuando sea posible.
  
  4. Salida:
     - Devuelve únicamente el documento Markdown del CV, sin explicaciones adicionales ni metadatos.
  `;

  // Construcción de user prompt con condicionales
  const userMessage = `
Genera un currículum en Markdown usando estos datos:

Nombre: ${body.name}
Título Profesional: ${body.title}
Contacto: ${body.contact}
Sobre mí: ${body.about}
Experiencia Laboral: ${body.experience}
Educación: ${body.education}
Habilidades: ${body.skills}
Idiomas: ${body.languages}
${body.additional ? `Información Adicional: ${body.additional}` : ""}

Usa solo las secciones correspondientes. No agregues secciones vacías ni comentes datos faltantes.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemMessage.trim() },
      { role: "user", content: userMessage.trim() },
    ],
    temperature: 0.2,
    max_tokens: 600,
  });

  const generatedCV = completion.choices[0]?.message.content?.trim() ?? "";

  return NextResponse.json({ cv: generatedCV });
}
