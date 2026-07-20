import type { RespuestaCV } from "@/lib/types/cv";
import { ModernAtsDocument } from "../ModernAtsTemplate";

export default function ModernAtsTemplatePreview({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  return <ModernAtsDocument cv={cv} watermark />;
}
