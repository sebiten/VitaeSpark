import type { createClient } from "@/utils/supabase/server";
import type { AppLanguage } from "@/lib/i18n";
import type { RespuestaCV } from "@/lib/types/cv";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

type PaymentCvInput = {
  supabase: SupabaseServerClient;
  cvId?: string;
  profileId: string;
  cvData?: RespuestaCV["cv"];
  template?: string;
  language: AppLanguage;
};

type PaymentCvSuccess = {
  ok: true;
  cv: {
    id: string;
    template: string;
  };
};

type PaymentCvFailure = {
  ok: false;
  status: number;
  error: string;
};

export async function getOrCreatePendingPaymentCv({
  supabase,
  cvId,
  profileId,
  cvData,
  template,
  language,
}: PaymentCvInput): Promise<PaymentCvSuccess | PaymentCvFailure> {
  if (cvId) {
    const { data: existingCv, error } = await supabase
      .from("cvs")
      .select("id, template, status")
      .eq("id", cvId)
      .eq("profile_id", profileId)
      .single();

    if (error || !existingCv) {
      return { ok: false, status: 404, error: "CV no encontrado" };
    }

    if (existingCv.status === "paid") {
      return { ok: false, status: 409, error: "Este CV ya esta pagado" };
    }

    if (existingCv.status !== "pending") {
      return {
        ok: false,
        status: 400,
        error: "Este CV no esta pendiente de pago",
      };
    }

    return {
      ok: true,
      cv: {
        id: existingCv.id,
        template: existingCv.template || template || "elegance",
      },
    };
  }

  if (!cvData || !template) {
    return {
      ok: false,
      status: 400,
      error: "Faltan datos para crear el CV pendiente",
    };
  }

  const { data: cv, error } = await supabase
    .from("cvs")
    .insert({
      profile_id: profileId,
      cv_data: { ...cvData, language },
      foto_url: cvData.foto_url,
      template,
      status: "pending",
    })
    .select("id, template")
    .single();

  if (error || !cv) {
    console.error("Error insertando CV:", error);
    return { ok: false, status: 500, error: "Error creando CV" };
  }

  return {
    ok: true,
    cv: {
      id: cv.id,
      template: cv.template || template,
    },
  };
}
