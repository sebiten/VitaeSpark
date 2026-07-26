import { publicSeoRoutes } from "./seo-routes";

const INDEXNOW_KEY_PATTERN = /^[A-Za-z0-9-]{8,128}$/;
const publicRouteSet = new Set<string>(publicSeoRoutes);

export type IndexNowPayload = {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};

export function getIndexNowKey(value = process.env.INDEXNOW_KEY) {
  const key = value?.trim();
  return key && INDEXNOW_KEY_PATTERN.test(key) ? key : null;
}

export function normalizeIndexNowUrls(
  values: string[],
  baseUrl: URL,
): string[] {
  const normalized = new Set<string>();

  for (const value of values) {
    const candidate = value.trim();
    if (!candidate) continue;

    let url: URL;
    try {
      url = new URL(candidate, baseUrl);
    } catch {
      continue;
    }

    if (url.origin !== baseUrl.origin || url.search || url.hash) continue;

    const pathname =
      url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    if (!publicRouteSet.has(pathname)) continue;

    normalized.add(new URL(pathname, baseUrl).toString());
  }

  return [...normalized];
}

export function createIndexNowPayload({
  values,
  baseUrl,
  key,
}: {
  values: string[];
  baseUrl: URL;
  key: string;
}): IndexNowPayload | null {
  const validKey = getIndexNowKey(key);
  if (!validKey) return null;

  const urlList = normalizeIndexNowUrls(values, baseUrl);
  if (urlList.length === 0) return null;

  return {
    host: baseUrl.host,
    key: validKey,
    keyLocation: new URL(`/${validKey}.txt`, baseUrl).toString(),
    urlList,
  };
}
