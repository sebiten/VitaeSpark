import "server-only";

import { randomBytes, randomUUID } from "crypto";
import type { User } from "@supabase/supabase-js";
import { recordAnalyticsEventServer } from "@/lib/analytics-events-server";
import { ensureCheckoutProfile } from "@/lib/guest-checkout-server";
import { normalizeCheckoutEmail } from "@/lib/guest-checkout";
import { supabaseAdmin } from "@/utils/supabase/admin";

type PurchaseClaim = {
  id: string;
  cv_id: string;
  temporary_profile_id: string;
  target_profile_id: string | null;
  contact_email: string;
  status: "pending" | "claimed" | "expired";
  auth_token_hash: string | null;
  auth_token_type: "signup" | "magiclink" | null;
  access_sent_at: string | null;
  last_error: string | null;
  expires_at: string;
  updated_at: string;
};

const claimColumns =
  "id, cv_id, temporary_profile_id, target_profile_id, contact_email, status, auth_token_hash, auth_token_type, access_sent_at, last_error, expires_at, updated_at";

export async function ensurePurchaseAccessForCv(cvId: string) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return { ok: false as const, reason: "email_not_configured" };
  }

  const { data: checkout, error: checkoutError } = await supabaseAdmin
    .from("payment_checkout_sessions")
    .select("profile_id, contact_email, is_guest")
    .eq("cv_id", cvId)
    .eq("is_guest", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (checkoutError) throw checkoutError;
  if (!checkout?.is_guest || !checkout.contact_email) {
    return { ok: true as const, skipped: true as const };
  }

  const { data: cv, error: cvError } = await supabaseAdmin
    .from("cvs")
    .select("id, profile_id, status, cv_data, template")
    .eq("id", cvId)
    .maybeSingle();

  if (cvError) throw cvError;
  if (!cv || cv.status !== "paid" || cv.profile_id !== checkout.profile_id) {
    return { ok: false as const, reason: "paid_cv_not_found" };
  }

  const email = normalizeCheckoutEmail(checkout.contact_email);
  let claim = await findClaimByCv(cvId);

  if (!claim) {
    const { data, error } = await supabaseAdmin
      .from("purchase_claims")
      .insert({
        cv_id: cvId,
        temporary_profile_id: cv.profile_id,
        contact_email: email,
      })
      .select(claimColumns)
      .single();

    if (error?.code === "23505") {
      claim = await findClaimByCv(cvId);
    } else if (error) {
      throw error;
    } else {
      claim = data as PurchaseClaim;
    }
  }

  if (!claim || claim.status === "claimed" || claim.access_sent_at) {
    return { ok: true as const, skipped: true as const };
  }

  const now = Date.now();
  const staleSending =
    claim.last_error === "__sending__" &&
    now - new Date(claim.updated_at).getTime() > 10 * 60 * 1000;
  if (claim.last_error === "__sending__" && !staleSending) {
    return { ok: true as const, skipped: true as const };
  }

  let claimQuery = supabaseAdmin
    .from("purchase_claims")
    .update({ last_error: "__sending__", updated_at: new Date().toISOString() })
    .eq("id", claim.id)
    .is("access_sent_at", null);

  claimQuery = claim.last_error
    ? claimQuery.eq("last_error", claim.last_error)
    : claimQuery.is("last_error", null);

  const { data: lockedClaim, error: lockError } = await claimQuery
    .select(claimColumns)
    .maybeSingle();
  if (lockError) throw lockError;
  if (!lockedClaim) return { ok: true as const, skipped: true as const };

  claim = lockedClaim as PurchaseClaim;

  try {
    const sent = await sendPurchaseAccessEmail({
      claimId: claim.id,
      email,
      cvName:
        typeof cv.cv_data?.nombre === "string" ? cv.cv_data.nombre : null,
      language: cv.cv_data?.language === "en" ? "en" : "es",
    });
    if (!sent.ok) throw new Error(sent.error);

    const sentAt = new Date().toISOString();
    const { error: sentWriteError } = await supabaseAdmin
      .from("purchase_claims")
      .update({
        access_sent_at: sentAt,
        last_error: null,
        updated_at: sentAt,
      })
      .eq("id", claim.id)
      .eq("last_error", "__sending__");
    if (sentWriteError) throw sentWriteError;

    await recordAnalyticsEventServer({
      event_name: "purchase_access_sent",
      user_id: cv.profile_id,
      cv_id: cvId,
      template: cv.template ?? undefined,
      language: cv.cv_data?.language === "en" ? "en" : "es",
      is_guest: true,
      cta_label: "guest_purchase_access_email",
      source_type: "landing",
    });

    return { ok: true as const, claimId: claim.id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_error";
    await supabaseAdmin
      .from("purchase_claims")
      .update({ last_error: message, updated_at: new Date().toISOString() })
      .eq("id", claim.id)
      .eq("last_error", "__sending__");
    console.error("No se pudo enviar el acceso de compra:", error);
    return { ok: false as const, reason: message };
  }
}

export async function claimGuestPurchase(claimId: string, user: User) {
  if (user.is_anonymous === true || !user.email) {
    throw new Error("Se requiere una cuenta permanente verificada");
  }

  await ensureCheckoutProfile(user);
  const email = normalizeCheckoutEmail(user.email);
  const { data, error } = await supabaseAdmin.rpc("claim_guest_purchase", {
    p_claim_id: claimId,
    p_target_profile_id: user.id,
    p_target_email: email,
  });
  if (error) throw error;

  const result = data as {
    cv_id: string;
    temporary_profile_id: string;
    already_claimed: boolean;
  };

  if (!result.already_claimed) {
    await transferGuestPhoto({
      cvId: result.cv_id,
      temporaryProfileId: result.temporary_profile_id,
      targetProfileId: user.id,
    });
    await recordAnalyticsEventServer({
      event_name: "purchase_claimed",
      user_id: user.id,
      cv_id: result.cv_id,
      is_guest: true,
      cta_label: "purchase_access_claimed",
      source_type: "landing",
    });
  }

  return { cvId: result.cv_id, alreadyClaimed: result.already_claimed };
}

export async function getPurchaseClaim(claimId: string) {
  const { data, error } = await supabaseAdmin
    .from("purchase_claims")
    .select(claimColumns)
    .eq("id", claimId)
    .maybeSingle();
  if (error) throw error;
  return data as PurchaseClaim | null;
}

export async function preparePurchaseClaimVerification(claimId: string) {
  const claim = await getPurchaseClaim(claimId);
  if (
    !claim ||
    claim.status !== "pending" ||
    new Date(claim.expires_at).getTime() <= Date.now()
  ) {
    return null;
  }

  const accessToken = await generatePurchaseAccessToken(claim.contact_email);
  const { error } = await supabaseAdmin
    .from("purchase_claims")
    .update({
      auth_token_hash: accessToken.tokenHash,
      auth_token_type: accessToken.tokenType,
      updated_at: new Date().toISOString(),
    })
    .eq("id", claim.id)
    .eq("status", "pending");
  if (error) throw error;

  return { claim, ...accessToken };
}

export async function retryPendingPurchaseAccess(limit = 25) {
  const { data, error } = await supabaseAdmin
    .from("purchase_claims")
    .select("cv_id")
    .eq("status", "pending")
    .is("access_sent_at", null)
    .order("created_at", { ascending: true })
    .limit(limit);
  if (error) throw error;

  const results = { checked: data?.length ?? 0, sent: 0, failed: 0 };
  for (const claim of data ?? []) {
    const result = await ensurePurchaseAccessForCv(claim.cv_id);
    if (!result.ok) {
      results.failed += 1;
    } else if ("claimId" in result) {
      results.sent += 1;
    }
  }
  return results;
}

export async function cleanupExpiredTemporaryUsers(limit = 50) {
  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const { data, error } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  if (error) throw error;

  const candidates = data.users
    .filter(
      (user) =>
        user.is_anonymous === true &&
        new Date(user.created_at).getTime() <= cutoff,
    )
    .slice(0, limit);
  let deleted = 0;

  for (const user of candidates) {
    const { count, error: paidError } = await supabaseAdmin
      .from("cvs")
      .select("id", { count: "exact", head: true })
      .eq("profile_id", user.id)
      .eq("status", "paid");
    if (paidError || (count ?? 0) > 0) continue;

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id,
    );
    if (!deleteError) deleted += 1;
  }

  return { checked: candidates.length, deleted };
}

async function findClaimByCv(cvId: string) {
  const { data, error } = await supabaseAdmin
    .from("purchase_claims")
    .select(claimColumns)
    .eq("cv_id", cvId)
    .maybeSingle();
  if (error) throw error;
  return data as PurchaseClaim | null;
}

async function generatePurchaseAccessToken(email: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  let generated = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: `${siteUrl}/perfil` },
  });

  if (generated.error) {
    generated = await supabaseAdmin.auth.admin.generateLink({
      type: "signup",
      email,
      password: randomBytes(32).toString("base64url"),
      options: { redirectTo: `${siteUrl}/perfil` },
    });
  }

  const properties = generated.data.properties;
  if (generated.error || !properties?.hashed_token) {
    throw generated.error ?? new Error("Supabase no devolvió un token de acceso");
  }

  const tokenType = properties.verification_type;
  if (tokenType !== "magiclink" && tokenType !== "signup") {
    throw new Error("Tipo de acceso no compatible");
  }

  return {
    tokenHash: properties.hashed_token,
    tokenType,
  };
}

async function sendPurchaseAccessEmail({
  claimId,
  email,
  cvName,
  language,
}: {
  claimId: string;
  email: string;
  cvName: string | null;
  language: "es" | "en";
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitaespark.com";
  const accessUrl = new URL("/acceso-cv", siteUrl);
  accessUrl.searchParams.set("claim", claimId);
  const safeName = escapeHtml(cvName?.trim() || (language === "en" ? "your resume" : "tu CV"));
  const title =
    language === "en"
      ? "Your resume is unlocked"
      : "Tu CV ya está desbloqueado";
  const description =
    language === "en"
      ? `Open permanent access to ${safeName} to edit it and download it again from any device.`
      : `Activá el acceso permanente a ${safeName} para editarlo y volver a descargarlo desde cualquier dispositivo.`;
  const button = language === "en" ? "Save my resume" : "Guardar mi CV";
  const footer =
    language === "en"
      ? "This link expires in 30 days and only works for the email used at checkout."
      : "Este enlace vence en 30 días y solo funciona para el email usado en la compra.";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `purchase-access/${claimId}`,
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: title,
      html: `
        <div style="font-family:Arial,sans-serif;background:#101013;color:#f6f2ea;padding:32px;border-radius:20px">
          <p style="margin:0 0 12px;color:#a78bfa;font-size:12px;letter-spacing:.18em;text-transform:uppercase">VitaeSpark</p>
          <h1 style="margin:0 0 12px;font-size:26px;line-height:1.2">${title}</h1>
          <p style="margin:0 0 22px;color:#d4d4d8;font-size:15px;line-height:1.7">${description}</p>
          <a href="${accessUrl.toString()}" style="display:inline-block;border-radius:12px;background:#f6f2ea;color:#121114;padding:14px 20px;text-decoration:none;font-weight:700">${button}</a>
          <p style="margin:22px 0 0;color:#a1a1aa;font-size:12px;line-height:1.6">${footer}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, error: await response.text() };
  }
  return { ok: true as const };
}

async function transferGuestPhoto({
  cvId,
  temporaryProfileId,
  targetProfileId,
}: {
  cvId: string;
  temporaryProfileId: string;
  targetProfileId: string;
}) {
  const { data: cv, error } = await supabaseAdmin
    .from("cvs")
    .select("cv_data, foto_url")
    .eq("id", cvId)
    .eq("profile_id", targetProfileId)
    .maybeSingle();
  if (error || !cv) return;

  const cvData = (cv.cv_data ?? {}) as Record<string, unknown>;
  const photoUrl =
    typeof cv.foto_url === "string"
      ? cv.foto_url
      : typeof cvData.foto_url === "string"
        ? cvData.foto_url
        : "";
  const marker = "/storage/v1/object/public/fotos-perfil/";
  const markerIndex = photoUrl.indexOf(marker);
  if (markerIndex < 0) return;

  const oldPath = decodeURIComponent(photoUrl.slice(markerIndex + marker.length));
  if (!oldPath.startsWith(`fotos/user-${temporaryProfileId}/`)) return;

  const { data: photoBlob, error: downloadError } = await supabaseAdmin.storage
    .from("fotos-perfil")
    .download(oldPath);
  if (downloadError || !photoBlob) return;

  const extension = oldPath.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "webp";
  const newPath = `fotos/user-${targetProfileId}/${Date.now()}-${randomUUID()}.${extension}`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("fotos-perfil")
    .upload(newPath, photoBlob, {
      contentType: photoBlob.type || `image/${extension}`,
      upsert: false,
    });
  if (uploadError) return;

  const { data: publicPhoto } = supabaseAdmin.storage
    .from("fotos-perfil")
    .getPublicUrl(newPath);
  await supabaseAdmin
    .from("cvs")
    .update({
      foto_url: publicPhoto.publicUrl,
      cv_data: { ...cvData, foto_url: publicPhoto.publicUrl },
    })
    .eq("id", cvId)
    .eq("profile_id", targetProfileId);
  await supabaseAdmin.storage.from("fotos-perfil").remove([oldPath]);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
