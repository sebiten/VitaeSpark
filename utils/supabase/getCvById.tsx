// lib/supabase/queries.ts
import { createClient } from "@/utils/supabase/server";

export async function getCVById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("generated_cvs")
    .select("id, cv_data, template, status")
    .eq("id", id)
    .maybeSingle(); // ✅ usa maybeSingle en lugar de single

  if (error) {
    console.error("Error al obtener el CV:", error);
    return null;
  }

  return data;
}
