"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"

export default function UpdatePasswordForm() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast.error("Acceso denegado. Debes estar autenticado para cambiar tu contraseña")
        router.push("/login")
      } else {
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    checkSession()
  }, [router, supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsSubmitting(true)

    try {
      // Actualizar la contraseña del usuario
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        throw error
      }

      toast.success("¡Tu contraseña ha sido actualizada correctamente!")

      // Redirigir al usuario a la página de inicio de sesión
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error al actualizar tu contraseña")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!isAuthenticated) {
    return null // No renderizar nada si no está autenticado (será redirigido)
  }

  return (
    <Card className="w-full max-w-7xl mx-auto mt-10 bg-[#1F1F22] text-white">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <img src="/logoreal.webp" alt="VitaeSpark Logo" className="mr-2 h-10 w-10" />
          <CardTitle className="text-2xl font-bold text-white">VitaeSpark</CardTitle>
        </div>
        <CardDescription className="text-white">Establece tu nueva contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Nueva Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="bg-[#2A2A2D] border-[#3A3A3D] text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirmar Contraseña
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="bg-[#2A2A2D] border-[#3A3A3D] text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">{showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#3A3A3D] hover:bg-[#4A4A4D]" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
                Actualizando...
              </>
            ) : (
              "Actualizar Contraseña"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
