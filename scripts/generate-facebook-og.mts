import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const RENDER_SCALE = 2;
const RENDER_WIDTH = WIDTH * RENDER_SCALE;
const RENDER_HEIGHT = HEIGHT * RENDER_SCALE;
const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "social");
const BACKGROUND = path.join(
  ROOT,
  "scripts",
  "assets",
  "facebook-og-background.png",
);
const LOGO = path.join(ROOT, "public", "logoreal.webp");

const scale = (value: number) => value * RENDER_SCALE;

const logoPromise = sharp(LOGO)
  .extract({ left: 104, top: 333, width: 777, height: 350 })
  .resize({ width: scale(200), kernel: sharp.kernel.lanczos3 })
  .png()
  .toBuffer();

const backgroundPromise = sharp(BACKGROUND)
  .resize(RENDER_WIDTH, RENDER_HEIGHT, {
    fit: "cover",
    kernel: sharp.kernel.lanczos3,
  })
  .modulate({ brightness: 0.82, saturation: 0.88 })
  .png()
  .toBuffer();

function renderSvg(svg: Buffer) {
  return sharp(svg, { density: 72 * RENDER_SCALE })
    .resize(RENDER_WIDTH, RENDER_HEIGHT, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();
}

type OgCard = {
  output: string;
  document: string;
  eyebrow: string;
  title: string[];
  subtitle: string[];
  cta: string;
  chips: string[];
  accent: string;
};

const cards: OgCard[] = [
  {
    output: "cv-atencion-sin-experiencia-og.png",
    document: "cv-examples/cv-atencion.png",
    eyebrow: "PRIMER EMPLEO",
    title: ["Tu experiencia", "sí cuenta para", "atención al cliente"],
    subtitle: ["Aunque nunca hayas tenido", "un empleo formal."],
    cta: "VER EJEMPLOS Y CREAR MI CV",
    chips: ["WhatsApp", "Mostrador", "Consultas"],
    accent: "#22D3EE",
  },
  {
    output: "generador-habilidades-cv-og.png",
    document: "modern-ats.png",
    eyebrow: "HERRAMIENTA GRATUITA",
    title: ["¿Qué habilidades", "poner en tu CV?"],
    subtitle: ["Elegí el puesto y obtené", "una lista personalizada."],
    cta: "GENERAR MIS HABILIDADES",
    chips: ["Por puesto", "Editable", "Gratis"],
    accent: "#8B5CF6",
  },
  {
    output: "cv-mineria-conversion-og.png",
    document: "cv-examples/cv-mineria.png",
    eyebrow: "CV PARA MINERÍA",
    title: ["¿Querés entrar", "a minería?"],
    subtitle: ["Mostrá seguridad, turnos", "y experiencia relacionada."],
    cta: "VER EJEMPLO COMPLETO",
    chips: ["Seguridad y EPP", "Turnos", "Licencias"],
    accent: "#38BDF8",
  },
  {
    output: "cv-limpieza-ejemplo-og.png",
    document: "cv-examples/cv-limpieza.png",
    eyebrow: "CV PARA LIMPIEZA",
    title: ["No pongas solo", "“tareas de limpieza”"],
    subtitle: ["Mostrá ambientes, protocolos", "y responsabilidades reales."],
    cta: "VER EJEMPLO Y CREAR MI CV",
    chips: ["Protocolos", "Desinfección", "Rutinas"],
    accent: "#2DD4BF",
  },
];

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function textLines(
  lines: string[],
  options: {
    x: number;
    y: number;
    size: number;
    lineHeight: number;
    weight: number;
    color: string;
  },
) {
  return `<text x="${options.x}" y="${options.y}" fill="${options.color}" font-family="Segoe UI, Arial, sans-serif" font-size="${options.size}" font-weight="${options.weight}" letter-spacing="-1.8">${lines
    .map(
      (line, index) =>
        `<tspan x="${options.x}" dy="${index === 0 ? 0 : options.lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("")}</text>`;
}

function chipsMarkup(chips: string[], accent: string) {
  let x = 804;

  return chips
    .map((chip) => {
      const width = Math.max(84, chip.length * 8.4 + 30);
      const markup = `
        <rect x="${x}" y="526" width="${width}" height="38" rx="19" fill="#0D1018" stroke="${accent}" stroke-opacity="0.55" />
        <text x="${x + width / 2}" y="551" fill="#F5F3EE" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="650" text-anchor="middle">${escapeXml(chip)}</text>
      `;
      x += width + 10;
      return markup;
    })
    .join("");
}

function baseOverlay(card: OgCard) {
  const eyebrowWidth = Math.max(176, card.eyebrow.length * 10 + 48);
  const titleEnd = 199 + (card.title.length - 1) * 67;
  const subtitleY = titleEnd + 57;

  return Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#08090D" stop-opacity="0.96"/>
          <stop offset="0.58" stop-color="#08090D" stop-opacity="0.82"/>
          <stop offset="1" stop-color="#08090D" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000000" flood-opacity="0.58"/>
        </filter>
      </defs>

      <rect width="760" height="${HEIGHT}" fill="url(#fade)"/>
      <rect x="1" y="1" width="1198" height="628" rx="2" fill="none" stroke="#FFFFFF" stroke-opacity="0.08"/>

      <rect x="58" y="112" width="${eyebrowWidth}" height="38" rx="19" fill="#FFFFFF" fill-opacity="0.055" stroke="#FFFFFF" stroke-opacity="0.14"/>
      <circle cx="79" cy="131" r="4" fill="${card.accent}"/>
      <text x="94" y="137" fill="#D9D6E6" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">${escapeXml(card.eyebrow)}</text>

      ${textLines(card.title, {
        x: 58,
        y: 199,
        size: 58,
        lineHeight: 67,
        weight: 760,
        color: "#F8F7F2",
      })}
      ${textLines(card.subtitle, {
        x: 60,
        y: subtitleY,
        size: 24,
        lineHeight: 34,
        weight: 430,
        color: "#B9B6C2",
      })}

      <rect x="58" y="528" width="${Math.max(300, card.cta.length * 10.5 + 76)}" height="52" rx="26" fill="#F5F2EA"/>
      <text x="84" y="561" fill="#111116" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="750" letter-spacing="0.5">${escapeXml(card.cta)}</text>
      <path d="M${Math.max(330, card.cta.length * 10.5 + 95)} 548H${Math.max(344, card.cta.length * 10.5 + 109)}M${Math.max(338, card.cta.length * 10.5 + 103)} 542L${Math.max(344, card.cta.length * 10.5 + 109)} 548L${Math.max(338, card.cta.length * 10.5 + 103)} 554" stroke="#111116" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      <g filter="url(#shadow)">
        <rect x="789" y="60" width="366" height="518" rx="20" fill="none" stroke="#EEEAE1" stroke-width="24"/>
      </g>
      <rect x="789" y="60" width="366" height="518" rx="20" fill="none" stroke="#DAD6CF" stroke-width="2"/>
      <rect x="968" y="70" width="160" height="34" rx="17" fill="#101117"/>
      <circle cx="988" cy="87" r="4" fill="${card.accent}"/>
      <text x="1002" y="92" fill="#F6F4EE" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" letter-spacing="1.2">EJEMPLO REAL</text>
      ${chipsMarkup(card.chips, card.accent)}
    </svg>
  `);
}

async function renderCard(card: OgCard) {
  const [background, document, logo, overlay] = await Promise.all([
    backgroundPromise,
    sharp(path.join(ROOT, "public", card.document))
      .resize({
        width: scale(342),
        height: scale(478),
        fit: "cover",
        position: "top",
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer(),
    logoPromise,
    renderSvg(baseOverlay(card)),
  ]);

  const composed = await sharp(background)
    .composite([
      { input: document, left: scale(801), top: scale(82) },
      { input: overlay, left: 0, top: 0 },
      { input: logo, left: scale(48), top: scale(18) },
    ])
    .png()
    .toBuffer();

  await sharp(composed)
    .resize(WIDTH, HEIGHT, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(path.join(OUTPUT_DIR, card.output));
}

async function renderComparison() {
  const [background, harvard, traditional, logo] = await Promise.all([
    backgroundPromise,
    sharp(path.join(ROOT, "public", "harvard.webp"))
      .resize({
        width: scale(216),
        height: scale(416),
        fit: "cover",
        position: "top",
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer(),
    sharp(path.join(ROOT, "public", "elegance-good.webp"))
      .resize({
        width: scale(216),
        height: scale(416),
        fit: "cover",
        position: "top",
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer(),
    logoPromise,
  ]);

  const overlay = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#08090D" stop-opacity="0.97"/><stop offset="0.56" stop-color="#08090D" stop-opacity="0.86"/><stop offset="1" stop-color="#08090D" stop-opacity="0"/></linearGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#000" flood-opacity="0.6"/></filter>
      </defs>
      <rect width="700" height="${HEIGHT}" fill="url(#fade)"/>
      <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#FFF" stroke-opacity="0.08"/>
      <rect x="58" y="112" width="300" height="38" rx="19" fill="#FFF" fill-opacity="0.055" stroke="#FFF" stroke-opacity="0.14"/>
      <circle cx="79" cy="131" r="4" fill="#8B5CF6"/>
      <text x="94" y="137" fill="#D9D6E6" font-family="Segoe UI, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">COMPARACIÓN DE FORMATOS</text>
      ${textLines(["Harvard o", "tradicional:", "¿cuál te conviene?"], { x: 58, y: 199, size: 58, lineHeight: 67, weight: 760, color: "#F8F7F2" })}
      ${textLines(["Compará estructura, lectura", "y presentación."], { x: 60, y: 391, size: 24, lineHeight: 34, weight: 430, color: "#B9B6C2" })}
      <rect x="58" y="528" width="356" height="52" rx="26" fill="#F5F2EA"/>
      <text x="84" y="561" fill="#111116" font-family="Segoe UI, Arial, sans-serif" font-size="16" font-weight="750" letter-spacing="0.5">COMPARAR LOS DOS FORMATOS</text>
      <path d="M380 548H394M388 542L394 548L388 554" stroke="#111116" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

      <g filter="url(#shadow)">
        <rect x="718" y="125" width="214" height="438" rx="14" fill="none" stroke="#EEEAE1" stroke-width="28"/>
        <rect x="948" y="93" width="214" height="470" rx="14" fill="none" stroke="#EEEAE1" stroke-width="28"/>
      </g>
      <rect x="718" y="125" width="214" height="438" rx="14" fill="none" stroke="#D7D2C9"/>
      <rect x="948" y="93" width="214" height="470" rx="14" fill="none" stroke="#D7D2C9"/>
      <rect x="744" y="93" width="158" height="34" rx="17" fill="#101117"/>
      <text x="823" y="115" fill="#F6F4EE" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" text-anchor="middle" letter-spacing="1.1">HARVARD</text>
      <rect x="974" y="61" width="158" height="34" rx="17" fill="#101117"/>
      <text x="1053" y="83" fill="#F6F4EE" font-family="Segoe UI, Arial, sans-serif" font-size="12" font-weight="750" text-anchor="middle" letter-spacing="1.1">TRADICIONAL</text>
    </svg>
  `);
  const renderedOverlay = await renderSvg(overlay);

  const composed = await sharp(background)
    .composite([
      { input: harvard, left: scale(718), top: scale(131) },
      { input: traditional, left: scale(948), top: scale(99) },
      { input: renderedOverlay, left: 0, top: 0 },
      { input: logo, left: scale(48), top: scale(18) },
    ])
    .png()
    .toBuffer();

  await sharp(composed)
    .resize(WIDTH, HEIGHT, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(path.join(OUTPUT_DIR, "cv-harvard-vs-tradicional-og.png"));
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  await Promise.all(cards.map(renderCard));
  await renderComparison();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
