import type { RespuestaCV } from "@/lib/types/cv";
import { OperativeAtsDocument } from "../OperativeAtsTemplate";

export default function OperativeAtsTemplatePreview({
  cv,
}: {
  cv: RespuestaCV["cv"];
}) {
  return <OperativeAtsDocument cv={cv} watermark />;
}
