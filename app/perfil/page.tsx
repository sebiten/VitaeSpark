import { Suspense } from "react";
import { redirect } from "next/navigation";
import type { PendingCVRecord } from "@/components/PendingPaymentRecovery";
import type { ProfilePayment } from "@/components/UserPayment";
import { createClient } from "@/utils/supabase/server";
import PerfilCVs, {
  type ProfileCVRecord,
  type ProfileInfo,
} from "./PerfilCVs";

function PerfilFallback() {
  return (
    <main className="min-h-screen bg-[#0D0D10] px-4 py-10 text-white sm:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="h-32 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
          <div className="h-52 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.035]" />
        </div>
      </div>
    </main>
  );
}

export default async function PerfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  if (user.is_anonymous === true) {
    const { data: temporaryCv } = await supabase
      .from("cvs")
      .select("id")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    redirect(
      temporaryCv
        ? `/pago/resultado?cv_id=${temporaryCv.id}`
        : "/crear",
    );
  }

  const [profileResult, cvsResult, paymentsResult, pendingResult] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle(),
      supabase
        .from("cvs")
        .select("id, cv_data, template, created_at")
        .eq("profile_id", user.id)
        .eq("status", "paid")
        .order("created_at", { ascending: false }),
      supabase
        .from("payments")
        .select(
          `
          *,
          cv:cvs(
            cv_data,
            template
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("cvs")
        .select("id, cv_data, template, created_at, status")
        .eq("profile_id", user.id)
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  const firstError =
    profileResult.error ||
    cvsResult.error ||
    paymentsResult.error ||
    pendingResult.error;

  if (firstError) {
    throw new Error(`No se pudo cargar el perfil: ${firstError.message}`);
  }

  const profileInfo: ProfileInfo = {
    name:
      profileResult.data?.full_name ||
      user.email?.split("@")[0] ||
      "Usuario",
    email: user.email || "No disponible",
    imgUrl:
      profileResult.data?.avatar_url || user.user_metadata?.avatar_url,
  };

  return (
    <Suspense fallback={<PerfilFallback />}>
      <PerfilCVs
        initialCvs={(cvsResult.data ?? []) as ProfileCVRecord[]}
        initialProfileInfo={profileInfo}
        initialPayments={(paymentsResult.data ?? []) as ProfilePayment[]}
        initialPendingCv={
          (pendingResult.data as PendingCVRecord | null) ?? null
        }
      />
    </Suspense>
  );
}
