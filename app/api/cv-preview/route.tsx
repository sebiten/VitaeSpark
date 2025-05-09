// app/api/cv-preview/generate.ts
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { cvId } = await req.json();
  const previewUrl = `http://localhost:3000/cv/preview/${cvId}`;

  const browser = await puppeteer.launch({
    headless: "shell",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto(previewUrl, { waitUntil: "networkidle0" });
  await page.setViewport({ width: 794, height: 1123 });

  const buffer = await page.screenshot({ type: "jpeg", quality: 90 });
  await browser.close();

  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("cvpreview")
    .upload(`${cvId}.jpg`, buffer, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
