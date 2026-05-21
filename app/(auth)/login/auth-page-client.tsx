"use client";

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import {
  AlertCircle,
  CheckCircle,
  EyeClosed,
  EyeIcon,
  Loader2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { login, signup } from "./actions";
import { FloatingRobot } from "@/components/floating-robot";
import { OAuthButtons } from "@/components/googleButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      className="h-12 w-full rounded-2xl bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_55%,#6D28D9_100%)] text-[15px] font-semibold text-white shadow-[0_14px_34px_rgba(124,58,237,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(124,58,237,0.36)]"
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
    } catch (signupError) {
      console.error("Error during registration:", signupError);
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
        return "Credenciales invalidas";
      case "signup-failed":
        return "Error al registrarse";
      case "user-already-exists":
        return "El usuario ya existe";
      case "weak_password":
        return "Contrasena muy debil";
      case "password-mismatch":
        return "Las contrasenas no coinciden";
      default:
        return "Ocurrio un error";
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111113] px-4 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#7C3AED]/12 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#38BDF8]/8 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
      </div>

      <FloatingRobot size="sm" className="right-8 top-24 opacity-30" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(380px,460px)] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="hidden lg:flex lg:flex-col lg:justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#67D2FF]">
              <Sparkles className="h-3.5 w-3.5" />
              Accede a tu CV
            </div>
            <h1 className="mt-5 max-w-xl text-balance text-[3rem] font-semibold tracking-[-0.04em] text-white">
              Guarda tu progreso y descarga tu CV cuando quieras
            </h1>
            <p className="mt-4 max-w-lg text-[17px] leading-8 text-white/58">
              Entra con tu cuenta para editar, regenerar y descargar tus
              curriculums desde un solo lugar.
            </p>

            <div className="mt-8 grid max-w-lg gap-3">
              {[
                "Tus CVs quedan vinculados a tu perfil.",
                "Puedes actualizar texto, plantilla y PDF cuando quieras.",
                "El flujo esta pensado para ATS, claridad y velocidad.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#8B5CF6]/12 text-[#C9B3FF]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-white/72">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="w-full"
          >
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(25,25,32,0.96)_0%,rgba(16,16,22,0.98)_100%)] shadow-[0_26px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl">
              <div className="border-b border-white/8 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/52">
                  VitaeSpark
                </div>
                <h2 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.03em] text-white">
                  {activeTab === "login" ? "Bienvenido otra vez" : "Crea tu cuenta"}
                </h2>
                <p className="mt-2 max-w-md text-[14px] leading-6 text-white/56">
                  {activeTab === "login"
                    ? "Accede a tus CVs, descargas y ediciones desde el mismo perfil."
                    : "Registra tu cuenta para guardar progreso y trabajar tu CV cuando quieras."}
                </p>
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <OAuthButtons />

                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/8" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/34">
                      o continua con email
                    </span>
                    <div className="h-px flex-1 bg-white/8" />
                  </div>

                  <Tabs
                    defaultValue="login"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="mb-5 grid h-auto w-full grid-cols-2 rounded-2xl border border-white/8 bg-[#202028] p-1">
                      <TabsTrigger
                        value="login"
                        className="rounded-xl px-3 py-2.5 text-sm font-medium data-[state=active]:bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_55%,#6D28D9_100%)] data-[state=active]:text-white data-[state=active]:shadow-[0_10px_24px_rgba(124,58,237,0.25)]"
                      >
                        Iniciar sesion
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="rounded-xl px-3 py-2.5 text-sm font-medium data-[state=active]:bg-[linear-gradient(135deg,#7C3AED_0%,#8B5CF6_55%,#6D28D9_100%)] data-[state=active]:text-white data-[state=active]:shadow-[0_10px_24px_rgba(124,58,237,0.25)]"
                      >
                        Registrarse
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-0">
                      {registrationSuccess ? (
                        <Alert className="mb-4 rounded-2xl border-[#10B981]/26 bg-[#10B981]/10 text-[#A7F3D0]">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Registro exitoso. Ya puedes iniciar sesion.
                          </AlertDescription>
                        </Alert>
                      ) : null}

                      {error && activeTab === "login" ? (
                        <Alert className="mb-4 rounded-2xl border-[#EF4444]/26 bg-[#EF4444]/10 text-[#FCA5A5]">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {getErrorMessage(error)}
                          </AlertDescription>
                        </Alert>
                      ) : null}

                      <form action={login} className="space-y-4">
                        <Field>
                          <Label htmlFor="email-login" className={labelClassName}>
                            Correo
                          </Label>
                          <Input
                            id="email-login"
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            className={inputClassName}
                            required
                          />
                        </Field>

                        <Field>
                          <div className="mb-2 flex items-center justify-between">
                            <Label htmlFor="password-login" className={labelClassName}>
                              Contrasena
                            </Label>
                            <Link
                              href="/forgot-password"
                              className="text-xs font-medium text-[#67D2FF] transition-colors hover:text-white"
                            >
                              Olvide mi contrasena
                            </Link>
                          </div>
                          <Input
                            id="password-login"
                            name="password"
                            type="password"
                            className={inputClassName}
                            required
                          />
                        </Field>

                        <SubmitButton>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Iniciar sesion
                        </SubmitButton>
                      </form>
                    </TabsContent>

                    <TabsContent value="register" className="mt-0">
                      {error && activeTab === "register" ? (
                        <Alert className="mb-4 rounded-2xl border-[#EF4444]/26 bg-[#EF4444]/10 text-[#FCA5A5]">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            {getErrorMessage(error)}
                            {error === "user-already-exists" ? (
                              <button
                                type="button"
                                className="ml-1 font-medium text-[#67D2FF] hover:text-white"
                                onClick={() => setActiveTab("login")}
                              >
                                Ir a iniciar sesion
                              </button>
                            ) : null}
                          </AlertDescription>
                        </Alert>
                      ) : null}

                      <form onSubmit={handleSignup} className="space-y-4">
                        <Field>
                          <Label htmlFor="name-register" className={labelClassName}>
                            Nombre completo
                          </Label>
                          <Input
                            id="name-register"
                            name="name"
                            placeholder="Tu nombre"
                            className={inputClassName}
                            required
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="email-register" className={labelClassName}>
                            Correo
                          </Label>
                          <Input
                            id="email-register"
                            name="email"
                            type="email"
                            placeholder="tu@correo.com"
                            className={inputClassName}
                            required
                          />
                        </Field>

                        <Field className="relative">
                          <Label
                            htmlFor="password-register"
                            className={labelClassName}
                          >
                            Contrasena
                          </Label>
                          <Input
                            id="password-register"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className={`${inputClassName} pr-11`}
                            required
                          />
                          <PasswordToggle
                            active={showPassword}
                            onClick={() => setShowPassword((prev) => !prev)}
                          />
                        </Field>

                        <Field className="relative">
                          <Label
                            htmlFor="confirm-password-register"
                            className={labelClassName}
                          >
                            Confirmar contrasena
                          </Label>
                          <Input
                            id="confirm-password-register"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            className={`${inputClassName} pr-11`}
                            required
                          />
                          <PasswordToggle
                            active={showConfirmPassword}
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          />
                        </Field>

                        <SubmitButton>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Crear cuenta
                        </SubmitButton>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="mt-5 rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-3 text-center text-xs leading-6 text-white/48">
                  Al continuar aceptas nuestros{" "}
                  <Link
                    href="/terminos"
                    className="font-medium text-[#67D2FF] transition-colors hover:text-white"
                  >
                    Terminos
                  </Link>{" "}
                  y{" "}
                  <Link
                    href="/privacidad"
                    className="font-medium text-[#67D2FF] transition-colors hover:text-white"
                  >
                    Privacidad
                  </Link>
                  .
                </div>
              </div>
            </div>

            <div className="mt-5 text-center lg:hidden">
              <Link
                href="/"
                className="text-sm font-medium text-white/52 transition-colors hover:text-white"
              >
                Volver al inicio
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-2 ${className}`}>{children}</div>;
}

function PasswordToggle({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-[37px] flex h-8 w-8 items-center justify-center rounded-xl text-white/46 transition-colors hover:bg-white/[0.05] hover:text-white/78"
    >
      {active ? (
        <EyeClosed className="h-4 w-4" />
      ) : (
        <EyeIcon className="h-4 w-4" />
      )}
    </button>
  );
}

const labelClassName =
  "text-[11px] font-medium uppercase tracking-[0.14em] text-white/44";

const inputClassName =
  "h-12 rounded-2xl border-white/10 bg-white/[0.04] text-base text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] placeholder:text-white/28 focus-visible:border-[#8B5CF6]/35 focus-visible:bg-white/[0.05] focus-visible:ring-[4px] focus-visible:ring-[#8B5CF6]/12 sm:text-sm";
