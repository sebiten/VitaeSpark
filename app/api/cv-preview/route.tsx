/*
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { cvId } = await req.json();

  if (!cvId) {
    return NextResponse.json({ error: "Falta el ID del CV" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const previewUrl = `${baseUrl}/cv/preview/${cvId}`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(previewUrl, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 794, height: 1123 });

  const buffer = await page.screenshot({ type: "jpeg", quality: 90 });
  await browser.close();

  const supabase = await createClient();

  const path = `${cvId}.jpg`; // ✅ nombre limpio
  const { error } = await supabase.storage
    .from("cvpreview")
    .upload(path, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.error("Error al subir imagen:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, path });
}
*/
