import { CVSchema } from "@/lib/schemas/cv";
import { supabaseAdmin } from "@/utils/supabase/admin";
import type { createClient } from "@/utils/supabase/server";
import type { AppLanguage } from "@/lib/i18n";
import type { RespuestaCV } from "@/lib/types/cv";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

type PaymentCvInput = {
  supabase: SupabaseServerClient;
  cvId?: string;
  purchaseKey?: string;
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
  recoveryUrl?: string;
};

export async function getOrCreatePendingPaymentCv({
  supabase,
  cvId,
  purchaseKey,
  profileId,
  cvData,
  template,
  language,
}: PaymentCvInput): Promise<PaymentCvSuccess | PaymentCvFailure> {
  if (cvId) {
    const { data: existingCv, error } = await supabase
      .from("cvs")
      .select("id, template, status, cv_data")
      .eq("id", cvId)
      .eq("profile_id", profileId)
      .single();

    if (error || !existingCv) {
      return { ok: false, status: 404, error: "CV no encontrado" };
    }

    if (existingCv.status === "paid") {
      return { ok: false, status: 409, error: "Este CV ya esta pagado", recoveryUrl: `/pago/resultado?cv_id=${existingCv.id}` };
    }

    if (existingCv.status !== "pending") {
      return {
        ok: false,
        status: 400,
        error: "Este CV no esta pendiente de pago",
      };
    }

    // A provider link is bound to this snapshot. Never rewrite it under an
    // existing order: a late confirmation must still deliver that version.
    const storedContent = CVSchema.safeParse(existingCv.cv_data);
    const requestedContent = cvData ? CVSchema.safeParse(cvData) : null;
    const sameContent =
      !cvData ||
      (storedContent.success &&
        requestedContent?.success &&
        JSON.stringify(storedContent.data) === JSON.stringify(requestedContent.data) &&
        (existingCv.cv_data?.language ?? "es") === language);
    const sameTemplate = !template || template === (existingCv.template || "elegance");
    if (!sameContent || !sameTemplate) {
      if (!cvData || !template) {
        return {
          ok: false,
          status: 409,
          error: "La versión revisada requiere contenido y plantilla",
        };
      }
      return prepareSnapshot(profileId, cvId, cvData, template, language, purchaseKey);
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

  return prepareSnapshot(profileId, null, cvData, template, language, purchaseKey);
}

async function prepareSnapshot(profileId: string, previousId: string | null,
  cvData: RespuestaCV["cv"], template: string, language: AppLanguage, purchaseKey?: string,
): Promise<PaymentCvSuccess | PaymentCvFailure> {
  const { data, error } = await supabaseAdmin.rpc("prepare_payment_cv", {
    p_profile_id: profileId, p_previous_id: previousId,
    p_data: { ...CVSchema.parse(cvData), language }, p_template: template,
    p_purchase_key: purchaseKey ?? null,
  });
  if (error || !data) return { ok: false, status: 503, error: "No se pudo preparar la compra. Reintentá sin generar otro CV." };
  return data as PaymentCvSuccess | PaymentCvFailure;
}
