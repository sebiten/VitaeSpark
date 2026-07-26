import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { createIndexNowPayload, getIndexNowKey } from "@/lib/indexnow";
import { getBaseUrl } from "@/lib/seo";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 100;

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return json({ error: "Unauthorized" }, 401);
  }

  const key = getIndexNowKey();
  if (!key) {
    return json({ error: "IndexNow no configurado" }, 503);
  }

  const body = await readRequestBody(request);
  if (!body) {
    return json(
      {
        error: `Se requiere un array "urls" con hasta ${MAX_URLS_PER_REQUEST} rutas`,
      },
      400,
    );
  }

  const payload = createIndexNowPayload({
    values: body.urls,
    baseUrl: getBaseUrl(),
    key,
  });

  if (!payload) {
    return json(
      { error: "No hay URLs canónicas e indexables para enviar" },
      400,
    );
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "VitaeSpark-IndexNow/1.0",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status !== 200 && response.status !== 202) {
      console.error("IndexNow rechazó el lote", {
        status: response.status,
        submitted: payload.urlList.length,
      });

      return json(
        {
          error: "IndexNow rechazó el envío",
          upstreamStatus: response.status,
        },
        response.status === 429 ? 429 : 502,
      );
    }

    return json({
      ok: true,
      upstreamStatus: response.status,
      submitted: payload.urlList.length,
      urls: payload.urlList,
    });
  } catch (error) {
    console.error("No se pudo contactar IndexNow", error);
    return json({ error: "IndexNow no disponible temporalmente" }, 502);
  }
}

function isAuthorized(request: Request) {
  const configuredSecret = process.env.CRON_SECRET?.trim();
  if (!configuredSecret) return false;

  const authorization = request.headers.get("authorization");
  const bearerSecret = authorization?.replace(/^Bearer\s+/i, "");
  const incomingSecret =
    bearerSecret || request.headers.get("x-cron-secret") || "";

  const expected = Buffer.from(configuredSecret);
  const received = Buffer.from(incomingSecret);

  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

async function readRequestBody(request: Request) {
  let value: unknown;

  try {
    value = await request.json();
  } catch {
    return null;
  }

  if (!isRecord(value) || !Array.isArray(value.urls)) return null;
  if (value.urls.length === 0 || value.urls.length > MAX_URLS_PER_REQUEST) {
    return null;
  }
  if (
    !value.urls.every(
      (url) => typeof url === "string" && url.length > 0 && url.length <= 2048,
    )
  ) {
    return null;
  }

  return { urls: value.urls as string[] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
