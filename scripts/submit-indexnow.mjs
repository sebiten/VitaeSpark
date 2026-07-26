import { existsSync, readFileSync } from "node:fs";

loadEnvFile(".env.local");
loadEnvFile(".env");

const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL").replace(/\/+$/, "");
const cronSecret = requireEnv("CRON_SECRET");
const args = process.argv.slice(2);

if (args.length === 0) {
  throw new Error(
    "Indicá las rutas modificadas o usa --all para el primer envío.",
  );
}

const urls = args.includes("--all")
  ? await readSitemapUrls()
  : args.filter((arg) => !arg.startsWith("--"));

if (urls.length === 0) {
  throw new Error("No hay URLs para enviar.");
}

const response = await fetch(`${siteUrl}/api/indexnow`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-cron-secret": cronSecret,
  },
  body: JSON.stringify({ urls }),
});

const text = await response.text();
const data = text ? JSON.parse(text) : {};

if (!response.ok) {
  throw new Error(
    `IndexNow falló (${response.status}): ${JSON.stringify(data)}`,
  );
}

console.log(
  `IndexNow recibió ${data.submitted} URL(s), estado ${data.upstreamStatus}.`,
);
for (const url of data.urls ?? []) {
  console.log(`- ${url}`);
}

async function readSitemapUrls() {
  const response = await fetch(`${siteUrl}/sitemap.xml`, {
    headers: { "User-Agent": "VitaeSpark-IndexNow/1.0" },
  });

  if (!response.ok) {
    throw new Error(`No se pudo leer el sitemap (${response.status}).`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decodeXml(match[1]),
  );
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  const lines = readFileSync(path, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (process.env[key]) continue;

    process.env[key] = rawValue
      .trim()
      .replace(/^"(.*)"$/, "$1")
      .replace(/^'(.*)'$/, "$1");
  }
}
