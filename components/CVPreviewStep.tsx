"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { PDFViewer } from "@react-pdf/renderer"
import type { RespuestaCV } from "@/lib/types/cv"
import { ShieldCheck, UserCheck, Download, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Session } from "@supabase/supabase-js"
import { DocumentoCV } from "./pdf/CVDocument"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Props = {
  cvData: RespuestaCV["cv"]
  template: string
  onBack: () => void
  userSession: Session | null
}

export default function CVPreviewStep({ cvData, template, onBack, userSession }: Props) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Prevenir eventos de descarga
  useEffect(() => {
    if (open) {
      const preventContextMenu = (e: Event) => {
        e.preventDefault()
        return false
      }

      const preventCopy = (e: Event) => {
        e.preventDefault()
        return false
      }

      const preventSelect = (e: Event) => {
        e.preventDefault()
        return false
      }

      // Agregar listeners para prevenir descargas
      document.addEventListener("contextmenu", preventContextMenu)
      document.addEventListener("copy", preventCopy)
      document.addEventListener("selectstart", preventSelect)

      return () => {
        // Limpiar listeners al cerrar
        document.removeEventListener("contextmenu", preventContextMenu)
        document.removeEventListener("copy", preventCopy)
        document.removeEventListener("selectstart", preventSelect)
      }
    }
  }, [open])

  // Prevenir interacciones con el iframe del PDF
  useEffect(() => {
    if (open) {
      // Función para interceptar y prevenir eventos de clic en el iframe
      const preventIframeInteraction = () => {
        const iframes = document.querySelectorAll("iframe")
        iframes.forEach((iframe) => {
          // Aplicar estilos para prevenir interacciones directas
          iframe.style.pointerEvents = "none"
        })
      }

      // Ejecutar inmediatamente y también después de un breve retraso para asegurar que se aplique
      preventIframeInteraction()
      const timer = setTimeout(preventIframeInteraction, 500)

      return () => clearTimeout(timer)
    }
  }, [open])

  const handlePay = async () => {
    if (!userSession) return

    setLoading(true)
    try {
      const res = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvData, template }),
      })

      const { init_point } = await res.json()
      if (init_point) {
        window.location.href = init_point
      } else {
        alert("No se pudo iniciar el pago. Intenta nuevamente.")
      }
    } catch (error) {
      alert("Error al procesar el pago. Intenta nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 border border-[#2A2A2D] rounded-2xl shadow-xl w-full p-4 md:p-8 bg-gradient-to-b from-[#1A1A1D] to-[#0F0F10]">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
          Vista previa de tu CV
        </h2>
        <p className="text-gray-300 text-sm">Para ver todas las páginas y en mejor calidad completa el pago</p>
      </div>

      {/* Botón para abrir el modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="w-full py-3 text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 border-none shadow-md transition-all duration-200"
          >
            <ShieldCheck className="w-5 h-5 mr-2" />
            Ver vista previa del CV
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[95vw] max-w-5xl p-0 bg-foreground rounded-2xl border border-gray-700">
          <DialogHeader className="p-4 border-b border-gray-700">
            <DialogTitle className="text-lg text-white font-bold flex items-center">
              <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
              Vista protegida del CV
            </DialogTitle>
          </DialogHeader>

          <div className="bg-[#121214] p-4 relative">
            {/* Contenedor con scroll para el PDF */}
            <div
              ref={scrollContainerRef}
              className="relative w-full rounded-lg shadow-lg overflow-auto bg-white"
              style={{
                height: "75vh",
                scrollBehavior: "smooth",
              }}
            >
              {/* Visor de PDF con estilos para prevenir interacciones */}
              <div className="w-full h-full" style={{ pointerEvents: "none" }}>
                <PDFViewer
                  className="w-full bg-white pointer-events-none"
                  showToolbar={false}
                  style={{
                    border: "none",
                    height: "150vh", // Hacer el PDF más alto que el contenedor para permitir scroll
                  }}
                >
                  <DocumentoCV cv={cvData} template={template} />
                </PDFViewer>
              </div>

              {/* Capa protectora transparente para prevenir descargas - AHORA CON POINTER-EVENTS ACTIVADOS */}
              <div
                className="absolute inset-0 z-10 cursor-not-allowed"
                onContextMenu={(e) => e.preventDefault()}
                onClick={(e) => e.preventDefault()}
                onDoubleClick={(e) => e.preventDefault()}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => e.preventDefault()}
                onKeyDown={(e) => e.preventDefault()}
                style={{
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                  pointerEvents: "auto", // Asegurar que esta capa capture todos los eventos
                }}
              >
                {/* Marca de agua */}
                <div className="sticky text-center transform bottom-8/12 top-1/2 -translate-x-1/12 -translate-y-0 pointer-events-none">
                  <div className="z-100 text-gray-600 text-4xl md:text-6xl font-bold transform rotate-45 opacity-10 whitespace-nowrap">
                    VitaeSpark
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center text-xs text-gray-400">
              <p>Esta es una vista previa protegida. Para descargar el CV completo, realiza el pago.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Información de pago */}
      <div className="bg-[#0F0F10] border border-[#2A2A2D] rounded-lg p-4 shadow-inner">
        <div className="flex items-center gap-2 text-white font-semibold mb-4">
          <ShieldCheck className="text-green-500 w-5 h-5" />
          <span>Pago 100% Seguro</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <UserCheck className="text-blue-500 w-5 h-5 flex-shrink-0" />
            <p className="text-gray-300">Tu CV se asociará a tu cuenta una vez confirmado el pago.</p>
          </div>

          <div className="flex items-start gap-3">
            <Download className="text-indigo-400 w-5 h-5 flex-shrink-0" />
            <p className="text-gray-300">Podrás descargar tu CV todas las veces que quieras desde tu perfil.</p>
          </div>
        </div>
      </div>

      {/* Botón de pago */}
      {userSession ? (
        <Button
          disabled={loading}
          className="w-full py-4 rounded-lg bg-gradient-to-r from-[#009ee3] to-[#0094d8] hover:from-[#008cc8] hover:to-[#0082c0] text-white font-semibold border-none shadow-lg transition-all duration-200"
          onClick={handlePay}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Redirigiendo...
            </>
          ) : (
            <>
              <div className=" p-1 rounded-md flex items-center justify-center">
                <Image src="/logompsolomano.png" width={25} height={25} alt="MercadoPago" className="rounded-md" />
              </div>
              <span>Pagar con MercadoPago 1500 ARS</span>
            </>
          )}
        </Button>
      ) : (
        <Link href="/login" className="block w-full">
          <Button
            variant="outline"
            className="w-full text-white border border-white/20 rounded-lg py-3 hover:bg-white/5 transition-colors duration-200"
          >
            Iniciar sesión para pagar
          </Button>
        </Link>
      )}
    </div>
  )
}
