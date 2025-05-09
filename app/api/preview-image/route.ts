// /** @jsxImportSource react */
// import React from "react";
// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";
// import { DocumentoCV } from "@/components/pdf/CVDocument";
// import { renderToFile } from "@react-pdf/renderer";
// import puppeteer from "puppeteer";
// import path from "path";
// import fs from "fs";
// import type { RespuestaCV } from "@/lib/types/cv";

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   const cv_id = req.nextUrl.searchParams.get("cv_id");
//   if (!cv_id)
//     return NextResponse.json({ error: "Falta cv_id" }, { status: 400 });

//   const supabase = await createClient();
//   const { data: cv, error } = await supabase
//     .from("generated_cvs")
//     .select("cv_data, template")
//     .eq("id", cv_id)
//     .single();

//   if (error || !cv) {
//     return NextResponse.json({ error: "CV no encontrado" }, { status: 404 });
//   }

//   const tempPdfPath = path.resolve("/tmp", `preview-${cv_id}.pdf`);
//   const doc = React.createElement(DocumentoCV, {
//     cv: cv.cv_data,
//     template: cv.template || "default",
//   });

//   // Forzamos el tipo para cumplir con renderToFile
//   await renderToFile(doc as React.ReactElement, tempPdfPath);

//   const browser = await puppeteer.launch({
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//   const page = await browser.newPage();
//   await page.goto(`file://${tempPdfPath}`, { waitUntil: "networkidle0" });

//   await page.setViewport({ width: 794, height: 1123 });
//   const screenshot = await page.screenshot({ type: "jpeg", quality: 85 });
//   await browser.close();

//   return new NextResponse(screenshot, {
//     headers: {
//       "Content-Type": "image/jpeg",
//       "Content-Disposition": "inline; filename=preview.jpg",
//     },
//   });
// }
