"use client";

import type React from "react";

import { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { OAuthButtons } from "@/components/googleButton";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

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
  );
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<string>("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F10] p-4">
      <Card className="w-full max-w-md shadow-lg border border-[#2A2A2D] bg-[#1F1F22] text-[#F4F4F5]">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-[#7C3AED]">
            Vitae Spark
          </CardTitle>
          <CardDescription className="text-[#A1A1AA]">
            {activeTab === "login"
              ? "Ingresa tus credenciales para acceder a tu cuenta"
              : "Crea una cuenta para comenzar"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <OAuthButtons />
          <Tabs defaultValue="login" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#2A2A2D] border border-[#3F3F46]">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-[#7C3AED] text-white"
              >
                Iniciar sesión
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:bg-[#38BDF8] text-white"
              >
                Registrarse
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
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
                    <a
                      href="/forgot-password"
                      className="text-sm text-[#38BDF8] hover:underline"
                    >
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
              <form action={signup} className="space-y-4">
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
                <SubmitButton>Crear cuenta</SubmitButton>
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
  );
}
