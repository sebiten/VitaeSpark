import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;
const ROOT = process.cwd();
const OUTPUT_DIR = path.join(ROOT, "public", "social");
const LOGO = path.join(ROOT, "public", "logoreal.webp");
const DOCUMENT = path.join(ROOT, "public", "elegance-good.webp");

type Offer = {
  output: string;
  eyebrow: string;
  title: string[];
  subtitle: string;
  price: string;
  priceLabel: string;
  reassurance: string;
  cta: string;
  chips: string[];
  accent: string;
  accentAlt: string;
};

const offers: Offer[] = [
  {
    output: "cv-oferta-ars-og.png",
    eyebrow: "CV PROFESIONAL CON IA",
    title: ["Tu CV, listo", "para postular"],
    subtitle: "Rápido · Editable · Sin registro",
    price: "$1.999 ARS",
    priceLabel: "PAGO ÚNICO",
    reassurance: "Mirá el resultado antes de pagar",
    cta: "CREAR MI CV",
    chips: ["PDF limpio", "Editable", "Mercado Pago"],
    accent: "#8B5CF6",
    accentAlt: "#22D3EE",
  },
  {
    output: "cv-offer-usd-og.png",
    eyebrow: "AI RESUME BUILDER",
    title: ["Your resume, ready", "to apply"],
    subtitle: "Fast · Editable · No sign-up required",
    price: "US$2.99",
    priceLabel: "ONE-TIME PAYMENT",
    reassurance: "Preview the result before paying",
    cta: "CREATE MY RESUME",
    chips: ["Clean PDF", "Editable", "Secure PayPal"],
    accent: "#7A5CFF",
    accentAlt: "#38BDF8",
  },
];

const s = (value: number) => value * SCALE;

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

function chipsMarkup(offer: Offer) {
  let x = 70;

  return offer.chips
    .map((chip) => {
      const width = Math.max(102, chip.length * 8.4 + 34);
      const markup = `
        <rect x="${x}" y="472" width="${width}" height="34" rx="17" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.13"/>
        <circle cx="${x + 19}" cy="489" r="4" fill="${offer.accentAlt}"/>
        <text x="${x + 31}" y="495" fill="#D7D4DC" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="650">${escapeXml(chip)}</text>
      `;
      x += width + 9;
      return markup;
    })
    .join("");
}

function backgroundSvg(offer: Offer) {
  return Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="83%" cy="18%" r="72%">
          <stop offset="0" stop-color="${offer.accent}" stop-opacity="0.26"/>
          <stop offset="0.55" stop-color="${offer.accent}" stop-opacity="0.04"/>
          <stop offset="1" stop-color="#08090E" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glowB" cx="8%" cy="88%" r="48%">
          <stop offset="0" stop-color="${offer.accentAlt}" stop-opacity="0.13"/>
          <stop offset="1" stop-color="#08090E" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="74" height="74" patternUnits="userSpaceOnUse">
          <path d="M 74 0 L 0 0 0 74" fill="none" stroke="#FFFFFF" stroke-opacity="0.035"/>
        </pattern>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="#08090E"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowB)"/>
      <rect x="1" y="1" width="1198" height="628" fill="none" stroke="#FFFFFF" stroke-opacity="0.08"/>
    </svg>
  `);
}

function overlaySvg(offer: Offer) {
  const eyebrowWidth = Math.max(246, offer.eyebrow.length * 10 + 52);
  const ctaWidth = Math.max(210, offer.cta.length * 12 + 62);

  return Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-35%" y="-35%" width="170%" height="170%">
          <feDropShadow dx="0" dy="20" stdDeviation="22" flood-color="#000000" flood-opacity="0.68"/>
        </filter>
        <linearGradient id="price" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="${offer.accent}"/>
          <stop offset="1" stop-color="${offer.accentAlt}"/>
        </linearGradient>
      </defs>

      <rect x="70" y="99" width="${eyebrowWidth}" height="36" rx="18" fill="#FFFFFF" fill-opacity="0.055" stroke="#FFFFFF" stroke-opacity="0.14"/>
      <circle cx="91" cy="117" r="4" fill="${offer.accentAlt}"/>
      <text x="105" y="123" fill="#DAD7E3" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="750" letter-spacing="1.8">${escapeXml(offer.eyebrow)}</text>

      ${textLines(offer.title, { x: 70, y: 202, size: 56, lineHeight: 60, weight: 770, color: "#F7F4ED" })}
      <text x="72" y="342" fill="#C3BFC9" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="520">${escapeXml(offer.subtitle)}</text>

      <text x="70" y="421" fill="#F7F4ED" font-family="Segoe UI, Arial, sans-serif" font-size="58" font-weight="790" letter-spacing="-2.4">${escapeXml(offer.price)}</text>
      <rect x="380" y="379" width="3" height="46" rx="1.5" fill="url(#price)"/>
      <text x="400" y="399" fill="#A997FF" font-family="Segoe UI, Arial, sans-serif" font-size="13" font-weight="780" letter-spacing="1.7">${escapeXml(offer.priceLabel)}</text>
      <text x="400" y="421" fill="#AAA7B1" font-family="Segoe UI, Arial, sans-serif" font-size="15" font-weight="520">${escapeXml(offer.reassurance)}</text>

      ${chipsMarkup(offer)}

      <rect x="70" y="532" width="${ctaWidth}" height="52" rx="26" fill="#F5F2EA"/>
      <text x="94" y="565" fill="#111116" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="780" letter-spacing="0.3">${escapeXml(offer.cta)}</text>
      <path d="M ${70 + ctaWidth - 47} 550 H ${70 + ctaWidth - 28} M ${70 + ctaWidth - 36} 543 L ${70 + ctaWidth - 28} 550 L ${70 + ctaWidth - 36} 557" fill="none" stroke="#111116" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>

      <g filter="url(#shadow)">
        <rect x="778" y="54" width="348" height="522" rx="30" fill="#F1EEE7"/>
      </g>
      <rect x="790" y="66" width="324" height="498" rx="22" fill="#FFFFFF"/>
      <rect x="836" y="72" width="250" height="33" rx="16.5" fill="#111217"/>
      <circle cx="856" cy="88.5" r="4" fill="${offer.accentAlt}"/>
      <text x="870" y="94" fill="#F6F3ED" font-family="Segoe UI, Arial, sans-serif" font-size="11" font-weight="760" letter-spacing="1.15">${escapeXml(offer.reassurance.toUpperCase())}</text>
    </svg>
  `);
}

async function renderSvg(svg: Buffer) {
  return sharp(svg, { density: 72 * SCALE })
    .resize(s(WIDTH), s(HEIGHT), { fit: "fill", kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
}

async function renderOffer(offer: Offer, logo: Buffer, document: Buffer) {
  const [background, overlay] = await Promise.all([
    renderSvg(backgroundSvg(offer)),
    renderSvg(overlaySvg(offer)),
  ]);

  const composed = await sharp(background)
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: document, left: s(802), top: s(118) },
      { input: Buffer.from(logo), left: s(70), top: s(18) },
    ])
    .png()
    .toBuffer();

  await sharp(composed)
    .resize(WIDTH, HEIGHT, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(path.join(OUTPUT_DIR, offer.output));
}

await mkdir(OUTPUT_DIR, { recursive: true });

const [logo, document] = await Promise.all([
  sharp(LOGO)
    .extract({ left: 104, top: 333, width: 777, height: 350 })
    .resize({ width: s(190), kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer(),
  sharp(DOCUMENT)
    .resize({
      width: s(300),
      height: s(425),
      fit: "cover",
      position: "top",
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer(),
]);

for (const offer of offers) {
  await renderOffer(offer, logo, document);
}

console.log(`Generadas ${offers.length} previews de oferta en ${OUTPUT_DIR}`);
