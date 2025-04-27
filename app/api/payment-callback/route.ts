// app/api/payment-callback/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // MercadoPago te redirige aquí con ?status=approved ó ?status=failure
  const url = new URL(req.url);
  const status = url.searchParams.get("status") === "success";
  return new Response(
    `<script>
       // avisamos a la ventana padre y nos cerramos
       window.opener.postMessage({ paid: ${status} }, "*");
       window.close();
     </script>`,
    { headers: { "content-type": "text/html" } }
  );
}
