"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface CheckPaymentStatusProps {
  onSuccess: (storedCv: any) => void;
  onPending: () => void;
  onFailure: () => void;
  onStartVerifying: () => void;
}

export function CheckPaymentStatus({ onSuccess, onPending, onFailure, onStartVerifying }: CheckPaymentStatusProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const collectionStatus = searchParams.get("collection_status");
    const paymentId = searchParams.get("payment_id");

    if (!status || !paymentId) return;

    const verifyPayment = async () => {
      try {
        onStartVerifying(); // 👈 Cuando empieza la verificación
        const res = await fetch("/api/check-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id: paymentId }),
        });

        const data = await res.json();

        if (data.success) {
          const storedCv = localStorage.getItem("vitae-cv-data");
          onSuccess(storedCv ? JSON.parse(storedCv) : null);
        } else {
          onFailure();
        }
      } catch (error) {
        console.error("Error verificando pago:", error);
        onFailure();
      }
    };

    if (status === "success" && collectionStatus === "approved") {
      verifyPayment();
    } else if (status === "pending") {
      onPending();
    } else {
      onFailure();
    }
  }, [searchParams, onSuccess, onPending, onFailure, onStartVerifying]);

  return null;
}
