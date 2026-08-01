"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { preconnect, preload } from "react-dom";
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
import { createClient } from "@/utils/supabase/client";
import { normalizeAuthRedirect } from "@/lib/auth-redirect";

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
      className="h-12 w-full rounded-full bg-[#F6F2EA] text-[15px] font-semibold text-[#121114] shadow-[0_18px_44px_rgba(246,242,234,0.16)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FFFCF4] hover:shadow-[0_22px_54px_rgba(246,242,234,0.22)]"
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

type AuthTransitionState = "checking" | "idle" | "signing-in" | "confirmed";

export default function AuthPageClient() {
  preconnect("https://accounts.google.com", { crossOrigin: "anonymous" });
  preconnect("https://accounts.googleusercontent.com", {
    crossOrigin: "anonymous",
  });
  preload("https://accounts.google.com/gsi/client", { as: "script" });

  const searchParams = useSearchParams();
  const redirectStartedRef = useRef(false);
  const [activeTab, setActiveTab] = useState<string>("login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authTransition, setAuthTransition] =
    useState<AuthTransitionState>("checking");
  const redirectTarget = normalizeAuthRedirect(searchParams.get("next"));
  const isResumingCv =
    redirectTarget.startsWith("/crear") && redirectTarget.includes("resume=");
  const isResumingCheckout =
    redirectTarget.startsWith("/crear") &&
    redirectTarget.includes("resume=checkout");

  const redirectToCreate = useCallback(() => {
    if (redirectStartedRef.current) return;

    redirectStartedRef.current = true;
    window.location.replace(redirectTarget);
  }, [redirectTarget]);

  useEffect(() => {
    let isMounted = true;
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;

      if (data.session && data.session.user.is_anonymous !== true) {
        setAuthTransition("confirmed");
        redirectToCreate();
        return;
      }

      setAuthTransition("idle");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "SIGNED_IN" &&
        session &&
        session.user.is_anonymous !== true
      ) {
        setAuthTransition("confirmed");
        redirectToCreate();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [redirectToCreate]);

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

  if (authTransition === "checking" || authTransition === "confirmed") {
    return (
      <AuthTransitionScreen
        state={authTransition}
        isResumingCv={isResumingCv}
        isResumingCheckout={isResumingCheckout}
        redirectTarget={redirectTarget}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0C0C10] px-4 py-6 text-[#F6F2EA] sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8DDFF]/[0.18] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(122,92,255,0.24),transparent_30%),radial-gradient(circle_at_16%_80%,rgba(246,242,234,0.08),transparent_28%),linear-gradient(135deg,#0C0C10_0%,#141219_46%,#08080A_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(246,242,234,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.48)_1px,transparent_1px)] [background-size:84px_84px]" />
        <div className="absolute -right-24 top-12 h-[34rem] w-[34rem] rounded-full bg-[#7A5CFF]/[0.12] blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#0D0D10] via-[#0D0D10]/[0.74] to-transparent" />
      </div>

      <FloatingRobot size="sm" className="hero-robot right-8 top-24 opacity-30" />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(390px,470px)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="hidden lg:flex lg:flex-col lg:justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E8DDFF]/[0.12] bg-[#F6F2EA]/[0.045] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF] shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5" />
              Perfil VitaeSpark
            </div>
            <h1 className="mt-6 max-w-xl text-balance text-[3.7rem] font-semibold leading-[0.88] tracking-[-0.065em] text-[#F6F2EA]">
              Entrá y seguí tu CV con IA
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-8 text-[#D8D2C8]/[0.76]">
              Guardá tus currículums, editá datos y descargá nuevas versiones
              desde el mismo perfil.
            </p>

            <div className="mt-8 flex max-w-lg flex-wrap gap-2">
              {[
                "CV editable",
                "PDF descargable",
                "Pago único",
                "Plantilla elegida",
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.035] px-3 py-2 text-[12px] font-medium text-[#D8D2C8]/[0.72] shadow-[inset_0_1px_0_rgba(246,242,234,0.04)]"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-[#D7C8FF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mx-auto w-full max-w-[460px] lg:mx-0 lg:justify-self-end"
          >
            <div className="overflow-hidden rounded-[34px] border border-[#F6F2EA]/[0.1] bg-[#111014]/[0.92] shadow-[0_26px_80px_rgba(0,0,0,0.36)] backdrop-blur-xl">
              <div className="border-b border-[#F6F2EA]/[0.08] px-5 pb-5 pt-6 text-center sm:px-7 sm:pb-6 sm:pt-7">
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[#E8DDFF]/[0.12] bg-[#F6F2EA]/[0.045] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF]">
                  VitaeSpark
                </div>
                <h2 className="mt-5 text-[1.85rem] font-semibold tracking-[-0.04em] text-[#F6F2EA]">
                  {isResumingCheckout
                    ? activeTab === "login"
                      ? "Tu CV ya está listo"
                      : "Creá tu cuenta para desbloquearlo"
                    : isResumingCv
                    ? activeTab === "login"
                      ? "Tu CV está listo para generarse"
                      : "Guardá tu CV antes de generarlo"
                    : activeTab === "login"
                      ? "Bienvenido otra vez"
                      : "Crea tu cuenta"}
                </h2>
                <p className="mx-auto mt-2 max-w-[340px] text-[14px] leading-6 text-[#D8D2C8]/[0.68]">
                  {isResumingCheckout
                    ? "Iniciá sesión para volver al mismo preview y completar el pago, sin generar el CV otra vez."
                    : isResumingCv
                    ? "Tus datos siguen guardados. Iniciá sesión y generaremos tu CV automáticamente, sin volver a completar el formulario."
                    : activeTab === "login"
                      ? "Accedé a tus CVs, descargas y ediciones desde el mismo perfil."
                      : "Registrá tu cuenta para guardar progreso y trabajar tu CV cuando quieras."}
                </p>
              </div>

              <div className="px-5 py-5 sm:px-7 sm:py-6">
                <div className="rounded-[28px] border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.035] p-3.5 shadow-[inset_0_1px_0_rgba(246,242,234,0.04)] sm:p-4">
                  <OAuthButtons
                    onAuthStart={() => setAuthTransition("signing-in")}
                    onAuthSuccess={() => {
                      setAuthTransition("confirmed");
                      redirectToCreate();
                    }}
                    onAuthError={() => setAuthTransition("idle")}
                    redirectTo={redirectTarget}
                  />

                  <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[#F6F2EA]/[0.08]" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#D8D2C8]/[0.42]">
                      o continúa con email
                    </span>
                    <div className="h-px flex-1 bg-[#F6F2EA]/[0.08]" />
                  </div>

                  <Tabs
                    defaultValue="login"
                    value={activeTab}
                    onValueChange={setActiveTab}
                  >
                    <TabsList className="mb-5 grid h-auto w-full grid-cols-2 rounded-full border border-[#F6F2EA]/[0.09] bg-[#0C0C10]/70 p-1">
                      <TabsTrigger
                        value="login"
                        className="rounded-full px-3 py-2.5 text-sm font-medium text-[#D8D2C8]/[0.58] data-[state=active]:bg-[#F6F2EA] data-[state=active]:text-[#121114] data-[state=active]:shadow-[0_12px_28px_rgba(246,242,234,0.12)]"
                      >
                        Iniciar sesión
                      </TabsTrigger>
                      <TabsTrigger
                        value="register"
                        className="rounded-full px-3 py-2.5 text-sm font-medium text-[#D8D2C8]/[0.58] data-[state=active]:bg-[#F6F2EA] data-[state=active]:text-[#121114] data-[state=active]:shadow-[0_12px_28px_rgba(246,242,234,0.12)]"
                      >
                        Registrarse
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="mt-0">
                      {registrationSuccess ? (
                        <Alert className="mb-4 rounded-2xl border-[#10B981]/26 bg-[#10B981]/10 text-[#A7F3D0]">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>
                            Registro exitoso. Ya podés iniciar sesión.
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
                        <input type="hidden" name="next" value={redirectTarget} />
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
                              Contraseña
                            </Label>
                            <Link
                              href="/forgot-password"
                              className="text-xs font-medium text-[#67D2FF] transition-colors hover:text-white"
                            >
                              Olvidé mi contraseña
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
                          Iniciar sesión
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
                                Ir a iniciar sesión
                              </button>
                            ) : null}
                          </AlertDescription>
                        </Alert>
                      ) : null}

                      <form onSubmit={handleSignup} className="space-y-4">
                        <input type="hidden" name="next" value={redirectTarget} />
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
                            Contraseña
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
                            Confirmar contraseña
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

                <div className="mt-5 rounded-[24px] border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.03] px-4 py-3 text-center text-xs leading-6 text-[#D8D2C8]/[0.54]">
                  Al continuar aceptás nuestros{" "}
                  <Link
                    href="/terminos"
                    className="font-medium text-[#67D2FF] transition-colors hover:text-white"
                  >
                    Términos
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

function AuthTransitionScreen({
  state,
  isResumingCv,
  isResumingCheckout,
  redirectTarget,
}: {
  state: AuthTransitionState;
  isResumingCv: boolean;
  isResumingCheckout: boolean;
  redirectTarget: string;
}) {
  const isConfirmed = state === "confirmed";
  const title =
    state === "checking"
      ? "Revisando sesión"
      : isConfirmed
        ? isResumingCheckout
          ? "CV recuperado"
          : isResumingCv
            ? "Datos recuperados"
          : "Sesión confirmada"
        : "Confirmando acceso con Google";
  const description =
    state === "checking"
      ? "Estamos verificando si ya tenés una sesión activa."
      : isConfirmed
        ? isResumingCheckout
          ? "Volvemos a tu preview para que completes el pago sin generar el CV otra vez."
          : isResumingCv
            ? "Tu cuenta ya está lista. Ahora generamos tu CV y te llevamos al pago."
          : "Tu cuenta ya está lista. Te llevamos al creador de CV."
        : "Volvimos de Google y estamos preparando tu espacio.";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0C0C10] px-4 py-6 text-[#F6F2EA] sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8DDFF]/[0.18] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(122,92,255,0.22),transparent_30%),radial-gradient(circle_at_24%_74%,rgba(246,242,234,0.08),transparent_28%),linear-gradient(135deg,#0C0C10_0%,#141219_46%,#08080A_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(246,242,234,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.48)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] max-w-xl items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="w-full rounded-[34px] border border-[#F6F2EA]/[0.1] bg-[#111014]/[0.94] p-6 text-center shadow-[0_26px_80px_rgba(0,0,0,0.36)] sm:p-8"
        >
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-[#E8DDFF]/[0.14] bg-[#F6F2EA]/[0.045] text-[#D7C8FF]">
            {isConfirmed ? (
              <CheckCircle className="h-6 w-6" />
            ) : (
              <Loader2 className="h-6 w-6 animate-spin" />
            )}
          </div>
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D7C8FF]/80">
            VitaeSpark
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#F6F2EA] sm:text-3xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#D8D2C8]/[0.68]">
            {description}
          </p>
          <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-2 rounded-2xl border border-[#F6F2EA]/[0.08] bg-[#F6F2EA]/[0.035] px-4 py-3 text-xs font-medium text-[#D8D2C8]/[0.72]">
            <ShieldCheck className="h-4 w-4 text-[#D7C8FF]" />
            Sesión segura, sin volver a cargar tus datos.
          </div>
          {isConfirmed ? (
            <Link
              href={redirectTarget}
              className="mx-auto mt-4 inline-flex h-11 items-center justify-center rounded-full bg-[#F6F2EA] px-5 text-sm font-semibold text-[#121114] transition hover:bg-[#FFFCF4]"
            >
              {isResumingCheckout
                ? "Volver a mi CV"
                : isResumingCv
                  ? "Generar mi CV"
                  : "Continuar al creador"}
            </Link>
          ) : null}
        </motion.div>
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
