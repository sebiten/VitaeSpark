// components/PaymentBrick.tsx
"use client";

import { initMercadoPago, CardPayment } from "@mercadopago/sdk-react";
import { useState, useEffect } from "react";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  cvId: string;
  price: number;
  email: string;
  onSuccess: (paymentId: string) => void;
};

export default function PaymentBrick({ cvId, price, email, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!, {
      locale: "es-AR",
    });
  }, []);

  const handleSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          token: data.token,
          payment_method_id: data.payment_method_id,
          installments: data.installments,
          email,
          external_reference: cvId,
        }),
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.error || "Error procesando pago");
      }

      setSuccess(true);
      onSuccess(result.paymentId);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h3 className="font-semibold text-green-800">Pago exitoso</h3>
        <p className="text-green-600">Tu CV está listo para descargar</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-red-600 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <CardPayment
        initialization={{
          amount: price,
          payer: { email },
        }}
        customization={{
          visual: {
            style: {
              theme: "dark" as any, // Forzado temporal
              customVariables: {
                baseColor: "#7C3AED",
                headerColor: "#7C3AED",
              },
            },
          },
        }}
        onSubmit={handleSubmit}
      />

      {loading && (
        <div className="flex justify-center items-center p-4">
          <Loader2 className="w-6 h-6 animate-spin text-purple-500" />
          <span className="ml-2">Procesando pago...</span>
        </div>
      )}
    </div>
  );
}