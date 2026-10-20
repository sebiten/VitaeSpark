import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1000;
const HEIGHT = 1500;
const SCALE = 2;
const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "output", "pinterest");
const LOGO = path.join(ROOT, "public", "logoreal.webp");

type PinKind = "document" | "comparison" | "checklist";

type Pin = {
  file: string;
  kind: PinKind;
  eyebrow: string;
  title: string[];
  subtitle: string[];
  accent: string;
  accentAlt: string;
  cta: string;
  document?: string;
  chips?: string[];
  rows?: string[];
  before?: string[];
  after?: string[];
};

const pins: Pin[] = [
  {
    file: "01-cv-para-mineria.png",
    kind: "document",
    eyebrow: "CV PARA MINERÍA",
    title: ["¿Querés entrar", "en minería?"],
    subtitle: ["Tu CV debería mostrar seguridad,", "turnos y experiencia relacionada."],
    accent: "#39D3B1",
    accentAlt: "#38BDF8",
    cta: "VER EJEMPLO COMPLETO",
    document: "cv-examples/cv-mineria.png",
    chips: ["Seguridad y EPP", "Turnos", "Licencias"],
  },
  {
    file: "02-cv-sin-experiencia.png",
    kind: "document",
    eyebrow: "PRIMER EMPLEO",
    title: ["Tu CV no está", "vacío"],
    subtitle: ["Estudios, cursos y proyectos también", "pueden demostrar lo que sabés hacer."],
    accent: "#8B5CF6",
    accentAlt: "#22D3EE",
    cta: "ARMAR MI PRIMER CV",
    document: "cv-examples/cv-primer-empleo.png",
    chips: ["Estudios", "Proyectos", "Habilidades"],
  },
  {
    file: "03-perfil-profesional-cv.png",
    kind: "comparison",
    eyebrow: "ANTES Y DESPUÉS",
    title: ["Tu perfil puede", "decir mucho más"],
    subtitle: ["Mostrá qué sabés hacer,", "no solamente cómo sos."],
    accent: "#A855F7",
    accentAlt: "#22D3EE",
    cta: "VER EJEMPLOS REALES",
    before: ["Soy responsable,", "proactivo y aprendo", "rápido."],
    after: ["Administrativo con", "experiencia en atención,", "carga de datos y Excel."],
  },
  {
    file: "04-checklist-cv-ats.png",
    kind: "checklist",
    eyebrow: "CHECKLIST ATS",
    title: ["Un CV lindo también", "puede fallar el filtro"],
    subtitle: ["Revisá estos puntos antes", "de enviar tu currículum."],
    accent: "#8B5CF6",
    accentAlt: "#22D3EE",
    cta: "REVISAR LA GUÍA ATS",
    rows: [
      "Secciones con títulos claros",
      "Texto seleccionable",
      "Palabras de la oferta",
      "Diseño simple y ordenado",
      "PDF correctamente generado",
    ],
  },
  {
    file: "05-habilidades-para-cv.png",
    kind: "document",
    eyebrow: "HERRAMIENTA GRATUITA",
    title: ["Habilidades para tu CV", "según el puesto"],
    subtitle: ["Generá una lista personalizada", "gratis y sin registro."],
    accent: "#8B5CF6",
    accentAlt: "#22D3EE",
    cta: "PROBAR GRATIS",
    document: "cv-examples/cv-administrativo.png",
    chips: ["Por puesto", "Personalizadas", "Gratis"],
  },
];

const publicationGuide = `PINES DE PINTEREST - VITAESPARK
================================

Formato: 1000 x 1500 px (2:3)
Frecuencia inicial: 3 Pines por semana, sin publicar los cinco el mismo día.

PIN 1 - CV PARA MINERÍA
Tablero: CV para minería
Archivo: 01-cv-para-mineria.png
Título: CV para minería: qué información debería incluir
Descripción: Ejemplo y guía para mostrar seguridad, turnos, herramientas, licencias y experiencia relacionada en un currículum para minería.
Enlace: https://vitaespark.com/cv-para-mineria?utm_source=pinterest&utm_medium=organic_social&utm_campaign=cv_mineria&utm_content=pin_ejemplo_real
Texto alternativo: Ejemplo de currículum para minería con seguridad, turnos, licencias y experiencia relacionada.
Temas relacionados: Currículum vitae, búsqueda de empleo, minería, desarrollo profesional, consejos laborales.
Hashtags opcionales: #CVParaMinería #CurriculumVitae #BúsquedaLaboral

PIN 2 - CV SIN EXPERIENCIA
Tablero: CV sin experiencia y primer empleo
Archivo: 02-cv-sin-experiencia.png
Título: Cómo hacer un CV sin experiencia laboral
Descripción: Estudios, cursos, proyectos, voluntariados y habilidades pueden ayudarte a crear un currículum sólido para tu primer empleo.
Enlace: https://vitaespark.com/blog/como-hacer-un-curriculum-sin-experiencia?utm_source=pinterest&utm_medium=organic_social&utm_campaign=primer_empleo&utm_content=pin_cv_no_vacio
Texto alternativo: Ejemplo de CV sin experiencia que destaca estudios, proyectos y habilidades.
Temas relacionados: Currículum vitae, primer empleo, búsqueda de empleo, estudiantes, desarrollo profesional.
Hashtags opcionales: #CVSinExperiencia #PrimerEmpleo #CurriculumVitae

PIN 3 - PERFIL PROFESIONAL
Tablero: Perfil profesional para CV
Archivo: 03-perfil-profesional-cv.png
Título: Ejemplos de perfil profesional para tu CV
Descripción: Compará un perfil genérico con uno concreto y aprendé a explicar qué sabés hacer, qué experiencia tenés y a qué puesto apuntás.
Enlace: https://vitaespark.com/blog/perfil-profesional-para-cv?utm_source=pinterest&utm_medium=organic_social&utm_campaign=perfil_profesional&utm_content=pin_antes_despues
Texto alternativo: Comparación entre un perfil profesional genérico y uno específico para administrativo.
Temas relacionados: Currículum vitae, perfil profesional, búsqueda de empleo, desarrollo profesional, marca personal.
Hashtags opcionales: #PerfilProfesional #CurriculumVitae #ConsejosLaborales

PIN 4 - CHECKLIST ATS
Tablero: Plantillas y consejos para CV ATS
Archivo: 04-checklist-cv-ats.png
Título: Checklist para crear un CV compatible con ATS
Descripción: Revisá secciones, texto, palabras clave, diseño y PDF antes de enviar tu currículum a una oferta laboral.
Enlace: https://vitaespark.com/blog/como-hacer-un-cv-ats?utm_source=pinterest&utm_medium=organic_social&utm_campaign=cv_ats&utm_content=pin_checklist_ats
Texto alternativo: Checklist de cinco puntos para revisar si un currículum puede ser leído por sistemas ATS.
Temas relacionados: Currículum vitae, búsqueda de empleo, filtros ATS, plantillas de currículum, consejos laborales.
Hashtags opcionales: #CVATS #CurriculumVitae #BúsquedaLaboral

PIN 5 - HABILIDADES
Tablero: Habilidades para currículum
Archivo: 05-habilidades-para-cv.png
Título: Generador gratuito de habilidades para CV
Descripción: Elegí el puesto y obtené una lista personalizada de habilidades para adaptar a tu currículum. Gratis y sin registro.
Enlace: https://vitaespark.com/herramientas/generador-habilidades-cv?utm_source=pinterest&utm_medium=organic_social&utm_campaign=generador_habilidades&utm_content=pin_herramienta_gratis
Texto alternativo: Herramienta gratuita para generar habilidades de currículum según el puesto.
Temas relacionados: Currículum vitae, habilidades laborales, búsqueda de empleo, desarrollo profesional, carrera profesional.
Hashtags opcionales: #HabilidadesParaCV #CurriculumVitae #HerramientaGratis

ORDEN DE PUBLICACIÓN
====================
Día 1: CV para minería
Día 3: CV sin experiencia
Día 6: Generador de habilidades
Día 9: Perfil profesional
Día 12: Checklist ATS
`;

const s = (value: number) => value * SCALE;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function linesMarkup(
  lines: string[],
  options: {
    x: number;
    y: number;
    size: number;
    lineHeight: number;
    weight: number;
    color: string;
    letterSpacing?: number;
  },
) {
  return `<text x="${options.x}" y="${options.y}" fill="${options.color}" font-family="Segoe UI, Arial, sans-serif" font-size="${options.size}" font-weight="${options.weight}" letter-spacing="${options.letterSpacing ?? -1.5}">${lines
    .map(
      (line, index) =>
        `<tspan x="${options.x}" dy="${index === 0 ? 0 : options.lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("")}</text>`;
}

function baseSvg(pin: Pin) {
  return Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glowA" cx="85%" cy="18%" r="72%">
          <stop offset="0" stop-color="${pin.accent}" stop-opacity="0.22"/>
          <stop offset="0.52" stop-color="${pin.accent}" stop-opacity="0.035"/>
          <stop offset="1" stop-color="#07080D" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowB" cx="5%" cy="82%" r="58%">
          <stop offset="0" stop-color="${pin.accentAlt}" stop-opacity="0.14"/>
          <stop offset="1" stop-color="#07080D" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${pin.accent}"/>
          <stop offset="1" stop-color="${pin.accentAlt}"/>
        </linearGradient>
        <pattern id="grid" width="82" height="82" patternUnits="userSpaceOnUse">
          <path d="M 82 0 L 0 0 0 82" fill="none" stroke="#FFFFFF" stroke-opacity="0.035" stroke-width="1"/>
        </pattern>
        <filter id="shadow" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.72"/>
        </filter>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#08090E"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowA)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowB)"/>
      <rect x="1" y="1" width="998" height="1498" fill="none" stroke="#FFFFFF" stroke-opacity="0.08"/>
      <rect x="72" y="1437" width="856" height="2" rx="1" fill="url(#accentLine)" opacity="0.55"/>
    </svg>
  `);
}

function headerSvg(pin: Pin) {
  const badgeWidth = Math.max(224, pin.eyebrow.length * 12 + 58);
  return `
    <rect x="72" y="154" width="${badgeWidth}" height="44" rx="22" fill="#FFFFFF" fill-opacity="0.055" stroke="#FFFFFF" stroke-opacity="0.15"/>
    <circle cx="96" cy="176" r="5" fill="${pin.accent}"/>
    <text x="112" y="182" fill="#D9D6E6" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="750" letter-spacing="2.1">${escapeXml(pin.eyebrow)}</text>
    ${linesMarkup(pin.title, { x: 72, y: 284, size: 74, lineHeight: 82, weight: 760, color: "#F7F5EF" })}
    ${linesMarkup(pin.subtitle, { x: 74, y: 480, size: 28, lineHeight: 41, weight: 430, color: "#B8B6C1", letterSpacing: -0.3 })}
  `;
}

function footerSvg(pin: Pin) {
  const buttonWidth = Math.max(360, pin.cta.length * 16 + 92);
  return `
    <rect x="72" y="1340" width="${buttonWidth}" height="64" rx="32" fill="#F4F1E9"/>
    <text x="${72 + buttonWidth / 2 - 12}" y="1381" text-anchor="middle" fill="#101116" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="780" letter-spacing="0.2">${escapeXml(pin.cta)}</text>
    <path d="M ${72 + buttonWidth - 48} 1372 H ${72 + buttonWidth - 26} M ${72 + buttonWidth - 35} 1363 L ${72 + buttonWidth - 26} 1372 L ${72 + buttonWidth - 35} 1381" fill="none" stroke="#101116" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="928" y="1381" text-anchor="end" fill="#8D8B95" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="650">vitaespark.com</text>
  `;
}

function documentSvg(pin: Pin) {
  const chips = pin.chips ?? [];
  return `
    <rect x="500" y="610" width="424" height="666" rx="34" fill="#F4F1E9" fill-opacity="0.13" stroke="#FFFFFF" stroke-opacity="0.13" filter="url(#shadow)"/>
    <rect x="518" y="628" width="388" height="630" rx="24" fill="#F7F6F1"/>
    <rect x="72" y="718" width="356" height="382" rx="30" fill="#12131A" stroke="#FFFFFF" stroke-opacity="0.11"/>
    <text x="104" y="770" fill="#8D8B95" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.9">LO QUE CONVIENE MOSTRAR</text>
    ${chips
      .map(
        (chip, index) => `
          <circle cx="109" cy="${835 + index * 82}" r="17" fill="${pin.accent}" fill-opacity="0.14" stroke="${pin.accent}" stroke-opacity="0.7"/>
          <path d="M 101 ${835 + index * 82} L 107 ${841 + index * 82} L 118 ${828 + index * 82}" fill="none" stroke="${pin.accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="145" y="${844 + index * 82}" fill="#F4F1E9" font-family="Segoe UI, Arial, sans-serif" font-size="23" font-weight="650">${escapeXml(chip)}</text>
        `,
      )
      .join("")}
    <rect x="92" y="1048" width="316" height="1" fill="#FFFFFF" fill-opacity="0.1"/>
    <text x="104" y="1085" fill="#9E9CA7" font-family="Segoe UI, Arial, sans-serif" font-size="17">Información concreta, sin relleno.</text>
  `;
}

function comparisonSvg(pin: Pin) {
  return `
    <rect x="72" y="640" width="856" height="565" rx="34" fill="#111219" stroke="#FFFFFF" stroke-opacity="0.11" filter="url(#shadow)"/>
    <rect x="104" y="690" width="792" height="200" rx="24" fill="#FFFFFF" fill-opacity="0.025" stroke="#FFFFFF" stroke-opacity="0.12"/>
    <rect x="128" y="716" width="114" height="36" rx="18" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.13"/>
    <text x="185" y="740" text-anchor="middle" fill="#84828C" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="780" letter-spacing="1.6">ANTES</text>
    ${linesMarkup(pin.before ?? [], { x: 128, y: 793, size: 29, lineHeight: 37, weight: 560, color: "#85838D", letterSpacing: -0.3 })}
    <rect x="104" y="922" width="792" height="235" rx="24" fill="${pin.accent}" fill-opacity="0.075" stroke="${pin.accentAlt}" stroke-opacity="0.72"/>
    <rect x="128" y="949" width="138" height="36" rx="18" fill="${pin.accent}" fill-opacity="0.17" stroke="${pin.accentAlt}" stroke-opacity="0.72"/>
    <text x="197" y="973" text-anchor="middle" fill="#F5F3EE" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="780" letter-spacing="1.6">DESPUÉS</text>
    ${linesMarkup(pin.after ?? [], { x: 128, y: 1027, size: 32, lineHeight: 40, weight: 680, color: "#F5F3EE", letterSpacing: -0.6 })}
  `;
}

function checklistSvg(pin: Pin) {
  return `
    <rect x="72" y="620" width="856" height="620" rx="34" fill="#111219" stroke="#FFFFFF" stroke-opacity="0.11" filter="url(#shadow)"/>
    ${(pin.rows ?? [])
      .map(
        (row, index) => `
          <rect x="104" y="${663 + index * 105}" width="792" height="82" rx="20" fill="#FFFFFF" fill-opacity="${index === 0 ? 0.055 : 0.032}" stroke="#FFFFFF" stroke-opacity="0.075"/>
          <circle cx="145" cy="${704 + index * 105}" r="18" fill="${pin.accent}" fill-opacity="0.14" stroke="${pin.accentAlt}" stroke-opacity="0.65"/>
          <path d="M 136 ${704 + index * 105} L 143 ${711 + index * 105} L 155 ${696 + index * 105}" fill="none" stroke="${pin.accentAlt}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="184" y="${713 + index * 105}" fill="#F2F0EA" font-family="Segoe UI, Arial, sans-serif" font-size="25" font-weight="620">${escapeXml(row)}</text>
        `,
      )
      .join("")}
  `;
}

async function renderSvg(svg: Buffer) {
  return sharp(svg, { density: 72 * SCALE })
    .resize(s(WIDTH), s(HEIGHT), { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}

async function createDocument(pin: Pin) {
  if (!pin.document) return null;

  const source = path.join(ROOT, "public", pin.document);
  const width = s(388);
  const height = s(630);
  const document = await sharp(source)
    .resize({
      width,
      height,
      fit: "cover",
      position: "top",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();
  const mask = await sharp(
    Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${s(24)}" fill="#fff"/></svg>`),
  )
    .png()
    .toBuffer();

  return sharp(document).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
}

async function createPin(pin: Pin, logo: Buffer) {
  const background = await renderSvg(baseSvg(pin));
  const visual =
    pin.kind === "document"
      ? documentSvg(pin)
      : pin.kind === "comparison"
        ? comparisonSvg(pin)
        : checklistSvg(pin);
  const overlay = await renderSvg(
    Buffer.from(`
      <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="22" stdDeviation="28" flood-color="#000000" flood-opacity="0.72"/>
          </filter>
        </defs>
        ${headerSvg(pin)}
        ${visual}
        ${footerSvg(pin)}
      </svg>
    `),
  );
  const document = await createDocument(pin);
  const composites: sharp.OverlayOptions[] = [
    { input: overlay, left: 0, top: 0 },
    { input: logo, left: s(72), top: s(50) },
  ];

  if (document) {
    composites.splice(1, 0, { input: document, left: s(518), top: s(628) });
  }

  const composed = await sharp(background)
    .composite(composites)
    .png()
    .toBuffer();

  await sharp(composed)
    .resize(WIDTH, HEIGHT, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(OUTPUT_DIR, pin.file));
}

await mkdir(OUTPUT_DIR, { recursive: true });

const logo = await sharp(LOGO)
  .extract({ left: 104, top: 333, width: 777, height: 350 })
  .resize({ width: s(218), kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

for (const pin of pins) {
  await createPin(pin, logo);
}

await writeFile(path.join(OUTPUT_DIR, "PUBLICACION-PINTEREST.txt"), publicationGuide, "utf8");

console.log(`Generados ${pins.length} Pines en ${OUTPUT_DIR}`);
