"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { login, signup } from "./actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useFormStatus } from "react-dom"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { OAuthButtons } from "@/components/googleButton"
import { Alert, AlertDescription } from "@/components/ui/alert"

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Un momento...
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default function AuthPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("login")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Obtener error de los parámetros de URL
  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam) {
      setError(errorParam)

      // Si el error es específico de registro, cambiar a la pestaña de registro
      if (errorParam === "user-already-exists" || errorParam === "signup-failed" || errorParam === "missing-fields") {
        setActiveTab("register")
      }
    } else {
      setError(null)
    }
  }, [searchParams])

  // Función para manejar el registro
  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
      // Llamamos a la acción del servidor
      await signup(formData)
      // Si llegamos aquí, el registro fue exitoso
      setRegistrationSuccess(true)
      setActiveTab("login")
    } catch (error) {
      // Si hay un error, asumimos que la acción del servidor ya manejó la redirección
      console.error("Error durante el registro:", error)
    }
  }

  // Resetear el mensaje de éxito cuando el usuario cambie manualmente a la pestaña de registro
  useEffect(() => {
    if (activeTab === "register") {
      setRegistrationSuccess(false)
    }
  }, [activeTab])

  // Función para mostrar mensaje de error
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "missing-fields":
        return "Por favor completa todos los campos requeridos."
      case "invalid-credentials":
        return "Email o contraseña incorrectos."
      case "signup-failed":
        return "No se pudo completar el registro. Intenta nuevamente."
      case "user-already-exists":
        return "Este email ya está registrado. Por favor inicia sesión o usa otro email."
      default:
        return "Ocurrió un error. Intenta nuevamente."
    }
  }

  // Función para cambiar a la pestaña de login (para el mensaje de error)
  const switchToLogin = () => {
    setActiveTab("login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F10] p-4">
      <Card className="w-full max-w-md shadow-lg border border-[#2A2A2D] bg-[#1F1F22] text-[#F4F4F5]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-[#7C3AED]">Vitae Spark</CardTitle>
          <CardDescription className="text-[#A1A1AA]">
            {activeTab === "login"
              ? "Inicia sesión para gestionar y crear tu CV fácilmente."
              : "Regístrate para comenzar a crear y personalizar tu CV."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <OAuthButtons />
          <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#2A2A2D] border border-[#3F3F46]">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#7C3AED] text-white">
                Iniciar sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-[#38BDF8] text-white">
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              {registrationSuccess && (
                <Alert className="mb-4 bg-[#10B981]/10 border-[#10B981] text-[#10B981]">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    ¡Registro exitoso! Ahora puedes iniciar sesión con tus credenciales.
                  </AlertDescription>
                </Alert>
              )}

              {error && activeTab === "login" && (
                <Alert className="mb-4 bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>{getErrorMessage(error)}</AlertDescription>
                </Alert>
              )}

              <form action={login} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input
                    id="email-login"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-[#2A2A2D] border-[#3F3F46] text-[#F4F4F5]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password-login">Contraseña</Label>
                    <a href="/forgot-password" className="text-sm text-[#38BDF8] hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input
                    id="password-login"
                    name="password"
                    type="password"
                    className="bg-[#2A2A2D] border-[#3F3F46] text-[#F4F4F5]"
                    required
                  />
                </div>
                <SubmitButton>Ingresar</SubmitButton>
              </form>
            </TabsContent>

            <TabsContent value="register">
              {error && activeTab === "register" && (
                <Alert className="mb-4 bg-[#EF4444]/10 border-[#EF4444] text-[#EF4444]">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertDescription>
                    {getErrorMessage(error)}
                    {error === "user-already-exists" && (
                      <Button variant="link" className="p-0 h-auto text-[#38BDF8] ml-1" onClick={switchToLogin}>
                        Iniciar sesión
                      </Button>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-register">Nombre completo</Label>
                  <Input
                    id="name-register"
                    name="name"
                    placeholder="Juan Pérez"
                    className="bg-[#2A2A2D] border-[#3F3F46] text-[#F4F4F5]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-register">Email</Label>
                  <Input
                    id="email-register"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-[#2A2A2D] border-[#3F3F46] text-[#F4F4F5]"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-register">Contraseña</Label>
                  <Input
                    id="password-register"
                    name="password"
                    type="password"
                    className="bg-[#2A2A2D] border-[#3F3F46] text-[#F4F4F5]"
                    required
                  />
                </div>
                <SubmitButton>
                  Crear cuenta
                </SubmitButton>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-xs text-[#A1A1AA] text-center">
            Al continuar, aceptas nuestros{" "}
            <a href="/terms" className="text-[#38BDF8] hover:underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="/privacy" className="text-[#38BDF8] hover:underline">
              Política de Privacidad
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
