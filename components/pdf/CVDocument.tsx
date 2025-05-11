"use client"
import type { RespuestaCV } from "@/lib/types/cv"
import BlueTemplate from "./template/BlueTemplate"
import GreenTemplate from "./template/GreenTemplate"
import PurpleTemplate from "./template/PurpleTemplate"
import HarvardTemplate from "./template/harvard-cv-template"
import BlueTemplateW from "./template/preview-components/blue-template"
import GreenTemplateW from "./template/preview-components/green-template"
import HarvardTemplateW from "./template/preview-components/harvard-template"
import PurpleTemplateW from "./template/preview-components/purple-template"

export function DocumentoCV({ cv, template }: { cv: RespuestaCV["cv"]; template?: string }) {
  // Renderizar el template seleccionado
  switch (template) {
    case "blue":
      return <BlueTemplate cv={cv} />
    case "green":
      return <GreenTemplate cv={cv} />
    case "harvard":
      return <HarvardTemplate cv={cv} />
    case "purple":
    default:
      return <PurpleTemplate cv={cv} />
  }
}
export function DocumentoCVW({ cv, template }: { cv: RespuestaCV["cv"]; template?: string }) {
  // Renderizar el template seleccionado
  switch (template) {
    case "blue":
      return <BlueTemplateW cv={cv} />
    case "green":
      return <GreenTemplateW cv={cv} />
    case "harvard":
      return <HarvardTemplateW cv={cv} />
    case "purple":
    default:
      return <PurpleTemplateW cv={cv} />
  }
}
