"use client";

import { CommercialOffer } from "@/components/CommercialOffer";
import { GUEST_CV_GENERATION_MAX_AGE_SECONDS } from "@/lib/guest-cv-generation";

export function LandingOffer() {
  const guestWindowHours = GUEST_CV_GENERATION_MAX_AGE_SECONDS / 3600;

  return (
    <div className="space-y-1.5 text-sm leading-6 text-white/75">
      <CommercialOffer />
      <p className="text-xs leading-5 text-white/55">
        Sin cuenta: 1 CV cada {guestWindowHours} horas. Aplican límites de uso.
      </p>
    </div>
  );
}
