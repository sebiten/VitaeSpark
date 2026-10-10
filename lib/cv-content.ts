import { CVSchema } from "@/lib/schemas/cv";
import { isEphemeralPhotoUrl } from "@/lib/guest-photo";
import type { CV } from "@/lib/types/cv";

// Empty lines are useful while typing; discard them only at the save boundary.
export function validateEditedCv(value: CV) {
  const lines = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);
  const result = CVSchema.safeParse({
    ...value,
    foto_url: isEphemeralPhotoUrl(value.foto_url) ? undefined : value.foto_url,
    contacto: lines(value.contacto),
    experiencia: value.experiencia.map((item) => ({ ...item, logros: lines(item.logros) })),
    habilidades: lines(value.habilidades),
    idiomas: lines(value.idiomas),
    informacionAdicional: lines(value.informacionAdicional),
  });
  if (!result.success) return result;
  return { success: true as const, data: { ...value, ...result.data, language: value.language, foto_url: isEphemeralPhotoUrl(value.foto_url) ? value.foto_url : result.data.foto_url } };
}
