"use client";

import { useState, useEffect } from "react";
import {
  CreditCard,
  Loader2,
  CheckCircle,
  AlertCircle,
  CreditCardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  amount: number;
  productName: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  productName,
}: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && !preferenceId && paymentStatus === "idle") {
      createPreference();
    }
  }, [isOpen, preferenceId]);

  useEffect(() => {
    // Limpiar el estado cuando se cierra el modal
    if (!isOpen) {
      setPaymentStatus("idle");
      setError(null);
      setPreferenceId(null); // Importante: resetear el preferenceId para forzar una nueva creación
    }
  }, [isOpen]);

  // Inicializar Mercado Pago cuando el preferenceId está disponible
  useEffect(() => {
    if (!preferenceId || typeof window === "undefined") return;

    let brickInstance: any; // ➊ para poder limpiar luego
    let cancelled = false; // ➋ evita setState si el modal se cierra rápido

    const loadMercadoPago = async () => {
      try {
        // 1. Esperar a que el SDK esté en window
        while (!(window as any).MercadoPago) {
          await new Promise((r) => setTimeout(r, 300));
        }

        if (cancelled) return; // ➋

        // 2. Instanciar MercadoPago
        const mp = new (window as any).MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
          { locale: "es-AR" }
        );

        const bricksBuilder = mp.bricks();

        // 3. Renderizar el Wallet Brick en modo modal
        bricksBuilder
          .create("wallet", "mercadopago-wallet", {
            initialization: { preferenceId },
            customization: { redirectMode: "modal" }, // ⭐ <- evita deep-link
            callbacks: {
              onReady: () => console.log("Checkout listo"),
              onSubmit: () => setPaymentStatus("loading"),
              onError: (err: any) => {
                console.error("Error en el checkout:", err);
                setPaymentStatus("error");
                setError(
                  "Hubo un problema al procesar el pago. Intenta nuevamente."
                );
              },
              onPaymentSuccess: (data: any) => {
                console.log("Pago exitoso:", data);
                setPaymentStatus("success");
                setTimeout(onSuccess, 2000);
              },
            },
          })
          .then((brick: any) => {
            brickInstance = brick;
          });
      } catch (err) {
        console.error("Error al inicializar Mercado Pago:", err);
        setPaymentStatus("error");
        setError(
          "No se pudo iniciar el procesador de pagos. Intenta nuevamente."
        );
      }
    };

    loadMercadoPago();

    // 4. Clean-up para evitar bricks duplicados o memory-leaks
    return () => {
      cancelled = true;
      if (brickInstance?.destroy) brickInstance.destroy();
    };
  }, [preferenceId, onSuccess]);

  const createPreference = async () => {
    try {
      setPaymentStatus("loading");

      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productName,
          price: amount,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error en la respuesta:", errorText);
        throw new Error(
          `Error al crear la preferencia de pago: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.preferenceId) {
        throw new Error("No se recibió un ID de preferencia válido");
      }

      setPreferenceId(data.preferenceId);
      setPaymentStatus("idle");
    } catch (err) {
      console.error("Error al crear preferencia:", err);
      setPaymentStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido al iniciar el pago"
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-[#1F1F22] border-[#2A2A2D] text-[#F4F4F5]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-[#7C3AED]" />
            Completar pago
          </DialogTitle>
          <DialogDescription className="text-[#A1A1AA]">
            Realiza el pago para descargar tu CV profesional
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {paymentStatus === "success" ? (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
              <h3 className="text-lg font-semibold text-green-400">
                ¡Pago completado con éxito!
              </h3>
              <p className="text-sm text-[#A1A1AA] mt-1">
                Tu CV está listo para descargar
              </p>
            </div>
          ) : paymentStatus === "error" ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-2" />
              <h3 className="text-lg font-semibold text-red-400">
                Error en el pago
              </h3>
              <p className="text-sm text-[#A1A1AA] mt-1">
                {error || "Hubo un problema al procesar tu pago"}
              </p>
              <Button
                variant="outline"
                className="mt-4 border-[#3F3F46]"
                onClick={createPreference}
              >
                Intentar nuevamente
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-[#2A2A2D] rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">CV Profesional</h3>
                    <p className="text-sm text-[#A1A1AA]">
                      Optimizado para ATS
                    </p>
                  </div>
                  <Badge className="bg-[#7C3AED] hover:bg-[#7C3AED]">
                    ${amount}
                  </Badge>
                </div>

                <div className="border-t border-[#3F3F46] pt-3 mt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A1A1AA]">Subtotal</span>
                    <span>${amount}</span>
                  </div>
                  <div className="flex justify-between font-medium mt-2">
                    <span>Total</span>
                    <span className="text-[#7C3AED]">${amount}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="h-px flex-1 bg-[#3F3F46]"></div>
                <span className="text-xs text-[#A1A1AA]">MÉTODOS DE PAGO</span>
                <div className="h-px flex-1 bg-[#3F3F46]"></div>
              </div>

              {paymentStatus === "loading" && !preferenceId ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <Loader2 className="w-8 h-8 text-[#7C3AED] animate-spin mb-2" />
                  <p className="text-sm text-[#A1A1AA]">
                    Preparando opciones de pago...
                  </p>
                </div>
              ) : (
                <div id="mercadopago-wallet" className="w-full"></div>
              )}

              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-center bg-[#3F3F46]/50 px-3 py-1 rounded">
                    <CreditCardIcon className="h-4 w-4 text-[#A1A1AA] mr-1" />
                    <span className="text-xs text-[#A1A1AA]">Mercado Pago</span>
                  </div>
                  <span className="text-xs text-[#A1A1AA]">Pago seguro</span>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
