import type { User } from "@supabase/supabase-js";

export const GUEST_CHECKOUT_EMAIL_KEY = "vitaespark_guest_checkout_email";

export type CheckoutUser = {
  id: string;
  email?: string | null;
  isAnonymous: boolean;
};

export function isAnonymousUser(user?: Pick<User, "is_anonymous"> | null) {
  return user?.is_anonymous === true;
}

export function normalizeCheckoutEmail(value: string) {
  return value.trim().toLowerCase();
}
