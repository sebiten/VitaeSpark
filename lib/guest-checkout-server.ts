import "server-only";

import type { User } from "@supabase/supabase-js";
import { normalizeCheckoutEmail } from "@/lib/guest-checkout";
import { supabaseAdmin } from "@/utils/supabase/admin";

export function isGuestCheckoutEnabled() {
  return process.env.GUEST_CHECKOUT_ENABLED === "true";
}

export async function ensureCheckoutProfile(user: User) {
  const isTemporary = user.is_anonymous === true;
  const { data: existing, error: readError } = await supabaseAdmin
    .from("profiles")
    .select("id, is_temporary")
    .eq("id", user.id)
    .maybeSingle();

  if (readError) throw readError;

  if (!existing) {
    const { error: insertError } = await supabaseAdmin.from("profiles").insert({
      id: user.id,
      full_name: isTemporary ? "Invitado" : user.email?.split("@")[0] || "Usuario",
      avatar_url: null,
      is_temporary: isTemporary,
    });

    if (insertError && insertError.code !== "23505") throw insertError;
    return;
  }

  if (existing.is_temporary !== isTemporary) {
    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ is_temporary: isTemporary })
      .eq("id", user.id);

    if (updateError) throw updateError;
  }
}

export function resolveCheckoutEmail(user: User, contactEmail?: string) {
  if (user.is_anonymous === true) {
    return contactEmail ? normalizeCheckoutEmail(contactEmail) : "";
  }

  return normalizeCheckoutEmail(user.email ?? "");
}
