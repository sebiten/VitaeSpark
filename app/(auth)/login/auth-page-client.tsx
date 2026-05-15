"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { login, signup } from "./actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  EyeClosed,
  EyeIcon,
  Sparkles,
} from "lucide-react";
import { OAuthButtons } from "@/components/googleButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FloatingRobot } from "@/components/floating-robot";

export function SubmitButton({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full bg-[#7C3AED] rounded-xl hover:bg-[#6D28D9] transition-colors shadow-lg shadow-[#7C3AED]/20"
      disabled={pending || disabled}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        children
      )}
    </Button>
  );
}

export default function AuthPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);

      if (
        errorParam === "user-already-exists" ||
        errorParam === "signup-failed" ||
        errorParam === "missing-fields"
      ) {
        setActiveTab("register");
      }
    } else {
      setError(null);
    }
  }, [searchParams]);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("password-mismatch");
      return;
    }

    try {
      await signup(formData);
      setRegistrationSuccess(true);
      setActiveTab("login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  useEffect(() => {
    if (activeTab === "register") {
      setRegistrationSuccess(false);
    }
  }, [activeTab]);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "missing-fields":
        return "Completa todos los campos";
      case "invalid-credentials":
        return "Credenciales inválidas";
      case "signup-failed":
        return "Error al registrarse";
      case "user-already-exists":
        return "El usuario ya existe";
      case "weak_password":
        return "Contraseña muy débil";
      case "password-mismatch":
        return "Las contraseñas no coinciden";
      default:
        return "Ocurrió un error";
    }
  };

  const switchToLogin = () => {
    setActiveTab("login");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#111113] p-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#38BDF8]/8 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
      <FloatingRobot size="sm" className="top-20 right-8 opacity-40" />

      <div className="relative w-full max-w-[420px]">

        <Card className="w-full shadow-2xl shadow-black/20 border border-white/10 bg-[#1C1C22]/95 backdrop-blur rounded-2xl">
          <CardHeader className="space-y-1 text-center py-4">
            <CardTitle className="text-xl font-semibold text-white">
              {activeTab === "login" ? "¡Bienvenido!" : "Crear cuenta"}
            </CardTitle>
            <CardDescription className="text-white/50">
              {activeTab === "login" ? "Ingresa tus datos para continuar" : "Regístrate para empezar"}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <OAuthButtons />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1C1C22] px-3 text-white/60">o continúa con email</span>
              </div>
            </div>

            <Tabs
              defaultValue="login"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-2 mb-5 bg-[#27272A] rounded-xl p-1">
                <TabsTrigger
                  value="login"
                  className="rounded-lg text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                >
                  Iniciar sesión
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="rounded-lg text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
                >
                  Registrarse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {registrationSuccess && (
                  <Alert className="mb-4 bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] rounded-xl">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>
                      ¡Registro exitoso! Ahora puedes iniciar sesión.
                    </AlertDescription>
                  </Alert>
                )}

                {error && activeTab === "login" && (
                  <Alert className="mb-4 bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] rounded-xl">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>{getErrorMessage(error)}</AlertDescription>
                  </Alert>
                )}

                <form action={login} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email-login" className="text-sm text-white/70">Correo</Label>
                    <Input
                      id="email-login"
                      name="email"
                      type="email"
                      placeholder="tu@correo.com"
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-login" className="text-sm text-white/70">Contraseña</Label>
                      <a
                        href="/forgot-password"
                        className="text-xs text-[#8B5CF6] hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    <Input
                      id="password-login"
                      name="password"
                      type="password"
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11"
                      required
                    />
                  </div>
                  <SubmitButton >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Iniciar sesión
                  </SubmitButton>
                </form>
              </TabsContent>

              <TabsContent value="register">
                {error && activeTab === "register" && (
                  <Alert className="mb-4 bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444] rounded-xl">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>
                      {getErrorMessage(error)}
                      {error === "user-already-exists" && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-[#8B5CF6] ml-1"
                          onClick={switchToLogin}
                        >
                          Ir a iniciar sesión
                        </Button>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-register" className="text-sm text-white/70">Nombre completo</Label>
                    <Input
                      id="name-register"
                      name="name"
                      placeholder="Tu nombre"
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-register" className="text-sm text-white/70">Correo</Label>
                    <Input
                      id="email-register"
                      name="email"
                      type="email"
                      placeholder="tu@correo.com"
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11"
                      required
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <Label htmlFor="password-register" className="text-sm text-white/70">Contraseña</Label>
                    <Input
                      id="password-register"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11 pr-10"
                      required
                    />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-[34px] text-white/60 hover:text-white/80 transition-colors"
                  >
                      {showPassword ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="confirm-password-register" className="text-sm text-white/70">Confirmar contraseña</Label>
                    <Input
                      id="confirm-password-register"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="bg-[#27272A] border-white/10 text-white rounded-xl h-11 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-[34px] text-white/60 hover:text-white/80 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeClosed className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <SubmitButton>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Crear cuenta
                  </SubmitButton>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-center pt-2">
            <p className="text-xs text-white/60 text-center">
              Al registrarte aceptas nuestros{" "}
              <a href="/terminos" className="text-[#8B5CF6] hover:underline">
                Términos
              </a>{" "}
              y{" "}
              <a href="/privacidad" className="text-[#8B5CF6] hover:underline">
                Privacidad
              </a>
              .
            </p>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-sm text-white/60">
          <Link href="/" className="text-[#8B5CF6] hover:underline">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}