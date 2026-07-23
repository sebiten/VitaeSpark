export const GUEST_CV_GENERATION_COOKIE =
  "vitaespark_guest_cv_generated";
export const GUEST_CV_GENERATION_MAX_AGE_SECONDS = 24 * 60 * 60;
export const GUEST_CV_GENERATION_IP_LIMIT = 5;
export const AUTHENTICATED_CV_GENERATION_USER_LIMIT = 12;
export const AUTHENTICATED_CV_GENERATION_IP_LIMIT = 30;

export function hasGuestCvGeneration(cookieValue?: string | null) {
  return cookieValue === "1";
}
