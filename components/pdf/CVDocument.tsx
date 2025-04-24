import { Font } from "@react-pdf/renderer"
import type { RespuestaCV } from "@/lib/types/cv"
import BlueTemplate from "./template/BlueTemplate";
import GreenTemplate from "./template/GreenTemplate";
import PurpleTemplate from "./template/PurpleTemplate";



export function DocumentoCV({ cv, template = "purple" }: { cv: RespuestaCV["cv"]; template?: string }) {
  // Renderizar el template seleccionado
  switch (template) {
    case "blue":
      return <BlueTemplate cv={cv} />
    case "green":
      return <GreenTemplate cv={cv} />
    case "purple":
    default:
      return <PurpleTemplate cv={cv} />
  }
}
