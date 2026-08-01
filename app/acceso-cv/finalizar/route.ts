import { NextResponse } from "next/server";
import { z } from "zod";
import { claimGuestPurchase } from "@/lib/purchase-access";
import { createClient } from "@/utils/supabase/server";

const ClaimSchema = z.string().uuid();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || url.origin;
  const claimId = ClaimSchema.safeParse(url.searchParams.get("claim"));
  if (!claimId.success) {
    return NextResponse.redirect(new URL("/acceso-cv?error=invalid", siteUrl));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.is_anonymous === true) {
    return NextResponse.redirect(
      new URL(`/acceso-cv?claim=${claimId.data}&error=session`, siteUrl),
    );
  }

  try {
    const result = await claimGuestPurchase(claimId.data, user);
    return NextResponse.redirect(
      new URL(`/perfil?cv_id=${result.cvId}&purchase_claimed=1`, siteUrl),
    );
  } catch (error) {
    console.error("No se pudo reclamar la compra invitada:", error);
    return NextResponse.redirect(
      new URL(`/acceso-cv?claim=${claimId.data}&error=claim`, siteUrl),
    );
  }
}
