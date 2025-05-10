"use client"

import { useState, useEffect } from "react"

interface WindowSize {
  width: number | undefined
  height: number | undefined
  isMobile: boolean
}

export function useWindowSize(): WindowSize {
  // Inicializar con undefined para evitar errores de hidratación
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    isMobile: false,
  })

  useEffect(() => {
    // Función para actualizar el estado
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      })
    }

    // Agregar event listener
    window.addEventListener("resize", handleResize)

    // Llamar al handler inmediatamente para establecer el tamaño inicial
    handleResize()

    // Limpiar event listener al desmontar
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
