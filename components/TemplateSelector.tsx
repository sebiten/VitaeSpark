"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckIcon } from "lucide-react"

const templates = [
  {
    id: "purple",
    name: "Morado",
    color: "#8B5CF6",
    gradient: "from-[#9333EA] to-[#7C3AED]",
  },
  {
    id: "blue",
    name: "Azul",
    color: "#1E40AF",
    gradient: "from-[#2563EB] to-[#1E40AF]",
  },
  {
    id: "green",
    name: "Verde",
    color: "#15803D",
    gradient: "from-[#22C55E] to-[#15803D]",
  },
  {
    id: "harvard",
    name: "Recomendada por Harvard",
    color: "#000000",
    gradient: "from-[#000000] to-[#333333]",
  },
]

type Props = {
  selectedTemplate: string
  onSelectTemplate: (id: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: Props) {
  const [openDialogId, setOpenDialogId] = useState<string | null>(null)

  return (
    <div className="">
      {/* 🧠 Tips para completar el CV */}
      <div className="bg-[#1A1A1C] border border-[#2A2A2D] text-[#D4D4D8] rounded-xl p-4 mb-4 text-sm leading-relaxed space-y-2">
        <p className="font-semibold text-[#F4F4F5]">🧠 Consejos para completar tu CV</p>
        <ul className="list-disc list-inside text-[#A1A1AA] space-y-1">
          <li>Escribe oraciones claras, evita listas sin contexto.</li>
          <li>Incluye logros medibles en tu experiencia (ej: "Aumenté ventas un 20%").</li>
          <li>No uses emojis ni símbolos extraños.</li>
          <li>Evita copiar directamente desde tu perfil de LinkedIn.</li>
          <li>Verificá la ortografía y asegurate de que el contenido te refleje cómo profesional.</li>
        </ul>
        <p className="text-[#7F7F89] text-xs pt-2 border-t border-[#2A2A2D]">
          Estos tips ayudan a que tu CV generado sea más efectivo y compatible con sistemas de selección automatizados
          (ATS).
        </p>
      </div>

      {/* 🎨 Selector de plantilla */}
      <label className="font-semibold mb-3 block text-sm tracking-wide text-[#E4E4E7]">Seleccionar plantilla</label>

      <div className="flex gap-3 flex-wrap">
        {templates.map((tpl) => (
          <div key={tpl.id} className="relative">
            <div
              className={`w-[70px] h-[70px] rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center transition-all ${
                selectedTemplate === tpl.id ? "border-[#38BDF8]" : "border-[#2A2A2D]"
              } bg-[#1C1C1E]`}
              onClick={() => onSelectTemplate(tpl.id)}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${tpl.gradient}`} />

              {selectedTemplate === tpl.id && (
                <div className="absolute top-1 right-1">
                  <CheckIcon className="w-4 h-4 text-[#38BDF8]" />
                </div>
              )}
            </div>

            <div className="text-xs text-center text-[#D4D4D8] mt-1 w-[70px]">{tpl.name}</div>

            <Dialog open={openDialogId === tpl.id} onOpenChange={(open) => setOpenDialogId(open ? tpl.id : null)}>
              <DialogTrigger asChild>
                <button
                  className="w-full text-center text-xs text-[#38BDF8] mt-1 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDialogId(tpl.id)
                  }}
                >
                  Vista previa
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#0F0F10] border border-[#2A2A2D] text-[#F4F4F5]">
                <DialogHeader className="p-4">
                  <DialogTitle className="text-[#E4E4E7]">Vista previa: {tpl.name}</DialogTitle>
                </DialogHeader>
                <div className="w-full bg-[#1C1C1E]">
                  <img src={`/${tpl.id}.png`} alt={`Vista previa ${tpl.name}`} className="w-full rounded-b-lg" />
                </div>
                <div className="p-4">
                  <Button
                    onClick={() => {
                      onSelectTemplate(tpl.id)
                      setOpenDialogId(null)
                    }}
                    className="w-full text-white bg-[#7C3AED] hover:bg-[#6D28D9]"
                  >
                    Usar esta plantilla
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}
