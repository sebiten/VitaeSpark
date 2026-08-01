import { NextResponse } from "next/server";
import { z } from "zod";
import { preparePurchaseClaimVerification } from "@/lib/purchase-access";

const ClaimSchema = z.string().uuid();

export async function POST(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  const formData = await req.formData();
  const parsed = ClaimSchema.safeParse(formData.get("claim"));
  if (!parsed.success) {
    return NextResponse.redirect(new URL("/acceso-cv?error=invalid", siteUrl), 303);
  }

  const prepared = await preparePurchaseClaimVerification(parsed.data);
  if (!prepared) {
    return NextResponse.redirect(
      new URL(`/acceso-cv?claim=${parsed.data}&error=expired`, siteUrl),
      303,
    );
  }

  const confirmUrl = new URL("/auth/confirm", siteUrl);
  confirmUrl.searchParams.set("token_hash", prepared.tokenHash);
  confirmUrl.searchParams.set("type", prepared.tokenType);
  confirmUrl.searchParams.set(
    "next",
    `/acceso-cv/finalizar?claim=${prepared.claim.id}`,
  );
  return NextResponse.redirect(confirmUrl, 303);
}
