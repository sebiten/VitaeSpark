"use client"

import type { RespuestaCV } from "@/lib/types/cv"
import { useMobile } from "@/utils/hooks/hook"
import { useEffect, useState } from "react"

// Componente para renderizar la plantilla Harvard en HTML
const HarvardTemplateHTML = ({ cv }: { cv: RespuestaCV["cv"] }) => {
  const isMobile = useMobile()
  const [scale, setScale] = useState(1)

  // Calcular el factor de escala basado en el ancho de la ventana
  useEffect(() => {
    const calculateScale = () => {
      // A4 es aproximadamente 210mm de ancho
      const a4WidthInPx = 794 // Aproximadamente 210mm en píxeles
      const windowWidth = window.innerWidth

      // Si estamos en móvil, calculamos la escala para que el A4 completo quepa en la pantalla
      if (isMobile) {
        // Usamos todo el ancho disponible (sin márgenes)
        const availableWidth = windowWidth
        const newScale = availableWidth / a4WidthInPx
        setScale(newScale)
      } else {
        setScale(1) // Tamaño normal en desktop
      }
    }

    calculateScale()
    window.addEventListener("resize", calculateScale)
    return () => window.removeEventListener("resize", calculateScale)
  }, [isMobile])

  // Componente para listas con viñetas
  const BulletList = ({ items }: { items: string[] }) => (
    <div className="ml-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-row items-center">
          <span className="w-2 text-center mr-1.5">•</span>
          <p className="text-xs flex-1 m-0.5">{item}</p>
        </div>
      ))}
    </div>
  )

  return (
    <div className="overflow-auto w-full flex justify-center p-0 ">
      {/* Contenedor principal con dimensiones A4 y escalado */}
      <div
        className="bg-white text-black p-8 font-sans origin-top "
        style={{
          width: "55rem", // Ancho estándar A4
          minHeight: "297mm", // Alto mínimo estándar A4
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          marginBottom: isMobile ? `${(1 - scale) * -100}%` : 0, // Ajustar el margen inferior para compensar el escalado
        }}
      >
        {/* Header */}
        <div className="text-center mb-2.5">
          <p className="text-lg font-extrabold ">{cv.nombre}</p>
          <p className="text-sm text-[#1E40AF] mb-0.5">{cv.contacto.join(" • ")}</p>
        </div>

        <p className="text-[11px] text-justify mb-3 leading-relaxed">{cv.sobreMi}</p>

        {/* Experience */}
        <div className="mb-2.5">
          <p className="text-sm font-bold uppercase border-b border-black pb-1 mb-1.5">Experiencia Profesional</p>
          {cv.experiencia.map((exp, i) => (
            <div key={i} className="mb-2.5">
              <div className="flex justify-between mb-0.5">
                <div>
                  <p className="text-xs font-bold">{exp.empresa}</p>
                  <p className="text-[11px] italic mb-1">{exp.cargo}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px]">{exp.ubicacion}</p>
                  <p className="text-[10px]">{exp.fechas}</p>
                </div>
              </div>
              <BulletList items={exp.logros} />
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="mb-2.5">
          <p className="text-sm font-bold uppercase border-b border-black pb-1 mb-1.5">Educación</p>
          {cv.formacion.map((edu, i) => (
            <div key={i} className="mb-1.5">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-bold my-0.5">{edu.institucion}</p>
                  <p className="text-xs italic">{edu.titulo || ""}</p>
                </div>
                <div className="text-right mt-0.5">
                  <p className="text-[10px]">{edu.ubicacion}</p>
                  <p className="text-[10px]">{edu.fechas}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="mb-2.5">
          <p className="text-sm font-bold uppercase border-b border-black pb-1 mb-1.5">Habilidades</p>
          <BulletList items={cv.habilidades} />
        </div>

        {/* Languages */}
        {cv.idiomas.length > 0 && (
          <div className="mb-2.5">
            <p className="text-sm font-bold uppercase border-b border-black pb-1 mb-1.5">Idiomas</p>
            <BulletList items={cv.idiomas} />
          </div>
        )}

        {/* Additional Info */}
        {cv.informacionAdicional.length > 0 && (
          <div>
            <p className="text-sm font-bold uppercase border-b border-black pb-1 mb-1.5">Información Adicional</p>
            <BulletList items={cv.informacionAdicional} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HarvardTemplateHTML
