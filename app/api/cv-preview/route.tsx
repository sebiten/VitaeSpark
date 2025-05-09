// app/api/cv-preview/route.ts
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { cvId } = await req.json();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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
  console.log(buffer);

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from("cvpreview")
    .upload(`${cvId}.jpg`, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    console.error("Error al subir imagen:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
