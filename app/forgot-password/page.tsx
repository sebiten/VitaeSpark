"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Llamar a la API de Supabase para solicitar el restablecimiento de contraseña
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
      });
        
      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error: any) {
      alert({
        title: "Error",
        description:
          error.message || "Ocurrió un error al procesar tu solicitud",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center">
          <img
            src="/versus-illustration.png"
            alt="VitaeSpark Logo"
            className="mr-2 h-10 w-10"
          />
          <CardTitle className="text-2xl font-bold">VitaeSpark</CardTitle>
        </div>
        <CardDescription>
          {!isSubmitted
            ? "Ingresa tu correo electrónico para recuperar tu contraseña"
            : "Revisa tu bandeja de entrada"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Recuperar Contraseña"
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="rounded-full bg-green-100 p-3 mx-auto w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p>
              Hemos enviado un correo electrónico a <strong>{email}</strong> con
              instrucciones para restablecer tu contraseña.
            </p>
            <p className="text-sm text-muted-foreground">
              Si no recibes el correo en unos minutos, revisa tu carpeta de spam
              o intenta nuevamente.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver al inicio de sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
