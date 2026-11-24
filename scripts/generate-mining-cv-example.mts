import { writeFile } from "node:fs/promises";
import { PDFDocument, PageSizes, StandardFonts, rgb } from "pdf-lib";

// Regenerate the public, fictional example with: node scripts/generate-mining-cv-example.mts
const pdf = await PDFDocument.create();
pdf.setLanguage("es");
pdf.setTitle("Ejemplo de CV para ayudante de mina");
pdf.setAuthor("VitaeSpark");
const page = pdf.addPage(PageSizes.A4);
const regular = await pdf.embedFont(StandardFonts.Helvetica);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const ink = rgb(0.12, 0.15, 0.18);
const accent = rgb(0.12, 0.33, 0.33);
const margin = 52;
const textWidth = page.getWidth() - 2 * margin;
let y = page.getHeight() - 66;

function paragraph(text: string, size = 12, font = regular, color = ink) {
  const lineHeight = size * 1.45;
  for (const line of text.split("\n")) {
    let current = "";
    for (const word of line.split(" ")) {
      const next = current ? current + " " + word : word;
      if (current && font.widthOfTextAtSize(next, size) > textWidth) {
        page.drawText(current, { x: margin, y, font, size, color });
        y -= lineHeight;
        current = word;
      } else {
        current = next;
      }
    }
    page.drawText(current, { x: margin, y, font, size, color });
    y -= lineHeight;
  }
}

function section(title: string, body: string) {
  y -= 15;
  paragraph(title, 14, bold, accent);
  y -= 2;
  paragraph(body);
}

paragraph("VitaeSpark   /   Ejemplo ficticio de currículum", 10, bold, accent);
y -= 21;
paragraph("[Nombre y apellido]", 27, bold);
paragraph("Ayudante operativo para minería", 17);
paragraph("[Ciudad, provincia]   ·   [Teléfono]   ·   [Correo electrónico]", 11);
y -= 6;
page.drawLine({ start: { x: margin, y }, end: { x: margin + textWidth, y }, thickness: 1, color: accent });

section("Perfil profesional", "Ayudante de taller con experiencia en preparación de herramientas y traslado de materiales. Busco mi primera oportunidad en minería para apoyar al equipo de mantenimiento.");
section("Experiencia", "Ayudante de taller industrial   ·   [Empresa]   ·   [Mes/año de inicio y fin]\nPreparé herramientas para las reparaciones y ordené las piezas al cierre del turno. Registré faltantes y comuniqué las novedades al encargado. Utilicé los elementos de protección indicados para mi tarea.");
section("Formación y cursos", "[Estudios]   ·   [Institución]   ·   [Estado y año]\n[Curso realizado]   ·   [Entidad que lo dictó]   ·   [Fecha]");
section("Habilidades", "Organización de herramientas y materiales, registro de faltantes y comunicación de novedades entre turnos.");
section("Disponibilidad", "[Turnos que puedes cubrir]   ·   [Disponibilidad para viajar]\n[Licencia y categoría vigentes, si corresponde]");

if (y < 85) throw new Error("El ejemplo de CV supera el espacio disponible en una página.");
page.drawText("Adapta el ejemplo a tus tareas reales. Guía: vitaespark.com/cv-para-mineria", {
  x: margin, y: margin, font: regular, size: 10, color: accent,
});
await writeFile(new URL("../public/cv-examples/cv-ayudante-de-mina.pdf", import.meta.url), await pdf.save());
