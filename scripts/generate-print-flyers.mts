import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import sharp from "sharp";
import {
  degrees,
  PDFDocument,
  PDFImage,
  PDFPage,
  PDFFont,
  StandardFonts,
  rgb,
} from "pdf-lib";

const MM = 72 / 25.4;
const BLEED_MM = 3;
const OUTPUT_DIR = path.join(process.cwd(), "output", "pdf", "flyers");
const ASSET_DIR = path.join(OUTPUT_DIR, "assets");

const COLORS = {
  canvas: rgb(0.047, 0.047, 0.063),
  surface: rgb(0.078, 0.078, 0.098),
  warmWhite: rgb(0.965, 0.949, 0.918),
  text: rgb(0.957, 0.957, 0.961),
  muted: rgb(0.68, 0.67, 0.7),
  violet: rgb(0.545, 0.361, 0.965),
  violetSoft: rgb(0.769, 0.71, 0.992),
  sky: rgb(0.22, 0.741, 0.973),
  ink: rgb(0.055, 0.055, 0.067),
};

type FlyerFormat = "a6" | "a4";
type FlyerPlacement = "mostrador" | "reparto" | "cartelera";

interface FlyerSpec {
  format: FlyerFormat;
  placement: FlyerPlacement;
  filename: string;
}

const flyers: FlyerSpec[] = [
  {
    format: "a6",
    placement: "mostrador",
    filename: "vitaespark-flyer-a6-mostrador.pdf",
  },
  {
    format: "a6",
    placement: "reparto",
    filename: "vitaespark-flyer-a6-reparto.pdf",
  },
  {
    format: "a4",
    placement: "cartelera",
    filename: "vitaespark-afiche-a4-cartelera.pdf",
  },
];

const urls: Record<FlyerPlacement, string> = {
  mostrador: "https://vitaespark.com/f/mostrador",
  reparto: "https://vitaespark.com/f/reparto",
  cartelera: "https://vitaespark.com/f/cartelera",
};

function mm(value: number) {
  return value * MM;
}

function drawCropMarks(page: PDFPage, trimWidth: number, trimHeight: number) {
  const bleed = mm(BLEED_MM);
  const mark = mm(2);
  const width = page.getWidth();
  const height = page.getHeight();
  const color = rgb(0.55, 0.55, 0.58);

  const lines = [
    [bleed - mark, bleed, bleed, bleed],
    [bleed, bleed - mark, bleed, bleed],
    [width - bleed, bleed - mark, width - bleed, bleed],
    [width - bleed, bleed, width - bleed + mark, bleed],
    [bleed - mark, height - bleed, bleed, height - bleed],
    [bleed, height - bleed, bleed, height - bleed + mark],
    [width - bleed, height - bleed, width - bleed + mark, height - bleed],
    [width - bleed, height - bleed, width - bleed, height - bleed + mark],
  ];

  for (const [x1, y1, x2, y2] of lines) {
    page.drawLine({
      start: { x: x1, y: y1 },
      end: { x: x2, y: y2 },
      thickness: 0.35,
      color,
    });
  }

  page.drawRectangle({
    x: bleed,
    y: bleed,
    width: trimWidth,
    height: trimHeight,
    borderColor: color,
    borderWidth: 0.2,
    opacity: 0,
    borderOpacity: 0.3,
  });
}

function drawOfficialBrand(
  page: PDFPage,
  logoImage: PDFImage,
  x: number,
  top: number,
  width: number,
) {
  const height = width * (logoImage.height / logoImage.width);
  page.drawImage(logoImage, {
    x,
    y: top - height,
    width,
    height,
  });
}

function drawBackgroundGrid(page: PDFPage, trimX: number, trimY: number) {
  const width = page.getWidth();
  const height = page.getHeight();
  const step = mm(22);

  for (let x = trimX; x < width; x += step) {
    page.drawLine({
      start: { x, y: trimY },
      end: { x, y: height - trimY },
      thickness: 0.35,
      color: COLORS.violetSoft,
      opacity: 0.055,
    });
  }

  for (let y = trimY; y < height; y += step) {
    page.drawLine({
      start: { x: trimX, y },
      end: { x: width - trimX, y },
      thickness: 0.35,
      color: COLORS.violetSoft,
      opacity: 0.055,
    });
  }
}

function drawCvPreview(
  page: PDFPage,
  cvImage: PDFImage,
  x: number,
  y: number,
  width: number,
  height: number,
  angle: number,
) {
  page.drawRectangle({
    x: x + mm(2.6),
    y: y - mm(2.6),
    width: width + mm(1.2),
    height: height + mm(1.2),
    color: rgb(0, 0, 0),
    opacity: 0.42,
    rotate: degrees(angle),
  });
  page.drawRectangle({
    x: x - mm(1.1),
    y: y - mm(1.1),
    width: width + mm(2.2),
    height: height + mm(2.2),
    color: COLORS.warmWhite,
    borderColor: rgb(1, 1, 1),
    borderWidth: 0.45,
    borderOpacity: 0.7,
    rotate: degrees(angle),
  });
  page.drawImage(cvImage, {
    x,
    y,
    width,
    height,
    rotate: degrees(angle),
  });
}

function drawFeature(
  page: PDFPage,
  font: PDFFont,
  x: number,
  y: number,
  text: string,
  size: number,
) {
  page.drawCircle({
    x,
    y: y + size * 0.35,
    size: size * 0.23,
    color: COLORS.violetSoft,
  });
  page.drawText(text, {
    x: x + size * 0.75,
    y,
    size,
    font,
    color: COLORS.muted,
  });
}

async function createQrAssets(placement: FlyerPlacement) {
  const url = urls[placement];
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 3,
    color: {
      dark: "#0E0E11",
      light: "#F6F2EA",
    },
  });
  const png = await QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "H",
    margin: 3,
    width: 1400,
    color: {
      dark: "#0E0E11",
      light: "#F6F2EA",
    },
  });

  await writeFile(path.join(ASSET_DIR, `qr-${placement}.svg`), svg, "utf8");
  await writeFile(path.join(ASSET_DIR, `qr-${placement}.png`), png);
  return png;
}

async function drawFlyer(
  spec: FlyerSpec,
  cvBytes: Uint8Array,
  logoBytes: Uint8Array,
) {
  const isA4 = spec.format === "a4";
  const trimWidthMm = isA4 ? 210 : 105;
  const trimHeightMm = isA4 ? 297 : 148;
  const pageWidth = mm(trimWidthMm + BLEED_MM * 2);
  const pageHeight = mm(trimHeightMm + BLEED_MM * 2);
  const trimX = mm(BLEED_MM);
  const trimY = mm(BLEED_MM);
  const scale = isA4 ? 2 : 1;
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([pageWidth, pageHeight]);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const cvImage = await pdf.embedPng(cvBytes);
  const logoImage = await pdf.embedPng(logoBytes);
  const qrImage = await pdf.embedPng(await createQrAssets(spec.placement));

  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    color: COLORS.canvas,
  });
  drawBackgroundGrid(page, trimX, trimY);

  const bandHeight = mm(isA4 ? 78 : 40);
  page.drawRectangle({
    x: 0,
    y: 0,
    width: pageWidth,
    height: bandHeight + trimY,
    color: COLORS.warmWhite,
  });

  const left = trimX + mm(isA4 ? 20 : 9);
  const top = pageHeight - trimY - mm(isA4 ? 20 : 10);
  drawOfficialBrand(
    page,
    logoImage,
    left,
    top,
    mm(isA4 ? 48 : 29),
  );

  page.drawText("CV ONLINE DESDE EL CELULAR", {
    x: left,
    y: top - mm(isA4 ? 30 : 18),
    size: isA4 ? 10.5 : 5.4,
    font: bold,
    color: COLORS.violetSoft,
  });

  const headlineSize = isA4 ? 46 : 23;
  const headlineLeading = headlineSize * 0.91;
  const headlineY = top - mm(isA4 ? 55 : 31);
  const headlineLines = [
    "¿Buscás",
    "trabajo?",
    "Tu CV tiene",
    "que estar",
    "listo.",
  ];

  headlineLines.forEach((line, index) => {
    page.drawText(line, {
      x: left,
      y: headlineY - index * headlineLeading,
      size: headlineSize,
      font: bold,
      color: index < 2 ? COLORS.text : COLORS.warmWhite,
    });
  });

  const bodyY =
    headlineY - headlineLeading * headlineLines.length - mm(isA4 ? 8 : 4);
  const bodySize = isA4 ? 14 : 7.2;
  const bodyLines = [
    "Crealo desde el celular.",
    "Mirá el resultado antes de pagar",
    "y descargalo en PDF.",
  ];
  bodyLines.forEach((line, index) => {
    page.drawText(line, {
      x: left,
      y: bodyY - index * bodySize * 1.45,
      size: bodySize,
      font: regular,
      color: COLORS.muted,
    });
  });

  const featureY = bodyY - bodySize * 4.2;
  const featureSize = isA4 ? 10.5 : 5.4;
  drawFeature(page, bold, left, featureY, "Sin suscripción", featureSize);
  drawFeature(
    page,
    bold,
    left + mm(isA4 ? 54 : 27),
    featureY,
    "Editable",
    featureSize,
  );
  drawFeature(
    page,
    bold,
    left + mm(isA4 ? 88 : 44),
    featureY,
    "PDF listo",
    featureSize,
  );

  page.drawText("Más de 500 personas ya eligieron VitaeSpark", {
    x: left,
    y: featureY - mm(isA4 ? 12 : 6.5),
    size: isA4 ? 9.5 : 5,
    font: regular,
    color: COLORS.muted,
  });

  const cvWidth = mm(isA4 ? 88 : 44);
  const cvHeight = cvWidth * (cvImage.height / cvImage.width);
  drawCvPreview(
    page,
    cvImage,
    pageWidth - trimX - cvWidth + mm(isA4 ? 10 : 5),
    bandHeight - mm(isA4 ? 1 : 0),
    cvWidth,
    cvHeight,
    -2,
  );

  const qrSize = mm(isA4 ? 49 : 26);
  const qrX = left;
  const qrY = trimY + mm(isA4 ? 13 : 6);
  page.drawImage(qrImage, {
    x: qrX,
    y: qrY,
    width: qrSize,
    height: qrSize,
  });

  const ctaX = qrX + qrSize + mm(isA4 ? 14 : 7);
  const ctaTop = qrY + qrSize - mm(isA4 ? 4 : 2);
  page.drawText("ESCANEÁ", {
    x: ctaX,
    y: ctaTop,
    size: isA4 ? 13 : 6.8,
    font: bold,
    color: COLORS.violet,
  });
  page.drawText("Y CREÁ TU CV", {
    x: ctaX,
    y: ctaTop - mm(isA4 ? 12 : 6.2),
    size: isA4 ? 22 : 11,
    font: bold,
    color: COLORS.ink,
  });
  page.drawText("Mirá tu CV antes de pagar.", {
    x: ctaX,
    y: ctaTop - mm(isA4 ? 24 : 12.2),
    size: isA4 ? 10.5 : 5.5,
    font: regular,
    color: rgb(0.32, 0.31, 0.34),
  });
  page.drawText("vitaespark.com", {
    x: ctaX,
    y: qrY + mm(isA4 ? 2 : 1),
    size: isA4 ? 10 : 5.2,
    font: bold,
    color: COLORS.ink,
  });

  drawCropMarks(page, mm(trimWidthMm), mm(trimHeightMm));
  pdf.setTitle("VitaeSpark - Flyer para crear CV");
  pdf.setAuthor("VitaeSpark");
  pdf.setSubject(`Campaña física ${spec.placement}`);
  pdf.setCreator("VitaeSpark");

  const bytes = await pdf.save();
  await writeFile(path.join(OUTPUT_DIR, spec.filename), bytes);
}

async function main() {
  await mkdir(ASSET_DIR, { recursive: true });
  await writeFile(
    path.join(ASSET_DIR, "qr-links.json"),
    JSON.stringify(urls, null, 2),
    "utf8",
  );
  const cvBytes = await sharp(
    path.join(process.cwd(), "public", "elegance-good.webp"),
  )
    .png()
    .toBuffer();
  const logoSource = sharp(
    path.join(process.cwd(), "public", "favicons", "ms-icon-310x310.png"),
  ).trim({
      background: "#000000",
      threshold: 8,
    });
  const { data: logoPixels, info: logoInfo } = await logoSource
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 0; index < logoPixels.length; index += logoInfo.channels) {
    const brightness = Math.max(
      logoPixels[index],
      logoPixels[index + 1],
      logoPixels[index + 2],
    );
    logoPixels[index + 3] =
      brightness <= 8 ? 0 : Math.min(255, (brightness - 8) * 5);
  }

  const logoBytes = await sharp(logoPixels, {
    raw: {
      width: logoInfo.width,
      height: logoInfo.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  for (const flyer of flyers) {
    await drawFlyer(flyer, cvBytes, logoBytes);
    console.log(`Generated ${flyer.filename}`);
  }
}

await main();
