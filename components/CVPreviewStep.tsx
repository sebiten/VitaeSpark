'use client'

import { Button } from '@/components/ui/button'
import { CreditCard, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface CVPreviewStepPurpleProps {
  previewImage: string
  onPay: () => Promise<void>
  precioOriginal: number
  precioOferta: number
}

export const CVPreviewStepPurple = ({
  previewImage,
  onPay,
  precioOriginal,
  precioOferta,
}: CVPreviewStepPurpleProps) => {
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    try {
      setLoading(true)
      await onPay()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-6 rounded-xl shadow-xl bg-slate-900">
      {/* Encabezado */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold text-white">Vista previa de tu CV</h2>
        <p className="text-slate-400 text-sm">
          Visualizá cómo quedará tu currículum antes de hacer el pago.
        </p>

        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-800/30 border border-purple-500/30 shadow-sm">
          <span className="text-purple-400 text-sm font-medium">
            Oferta limitada – Precio especial
          </span>
        </div>
      </div>

      {/* Vista previa */}
      <div className="relative w-full rounded-lg overflow-hidden bg-neutral-100 mb-8 shadow-lg ring-1 ring-slate-300">
        <img
          src={previewImage}
          alt="Vista previa del CV"
          className="w-full h-auto object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-4 text-center">
          <span className="text-sm text-white/80">
            Esta es una vista previa. El archivo final estará disponible luego del pago.
          </span>
        </div>
      </div>

      {/* Testimonio */}
      <div className="mb-10 rounded-xl p-6 bg-slate-800/40 border border-slate-900">
        <p className="text-slate-300 text-sm italic">
          “Gracias a este generador de CVs, conseguí entrevistas en menos de una semana.
          El diseño profesional realmente marca la diferencia.”
        </p>
        <p className="text-slate-500 text-xs mt-2 text-right">— Usuario satisfecho</p>
      </div>

      {/* Precios */}
      <div className="text-center mb-6 space-y-1">
        <span className="text-slate-400 text-sm line-through">
          ${precioOriginal} ARS
        </span>
        <div className="text-4xl font-bold text-white">
          ${precioOferta} ARS
        </div>
        <p className="text-slate-400 text-sm">Pago único. Acceso inmediato al PDF completo.</p>
      </div>

      {/* Botón */}
      <Button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base py-3"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mx-auto" />
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar y desbloquear CV
          </>
        )}
      </Button>

      {loading && (
        <p className="text-sm text-slate-400 mt-2 text-center">
          Redirigiendo a MercadoPago...
        </p>
      )}
    </div>
  )
}
