import { getIndexNowKey } from "@/lib/indexnow";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const key = getIndexNowKey();
  const verification = new URL(request.url).searchParams.get("verification");

  if (!key || verification !== key) {
    return new Response("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return new Response(key, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
