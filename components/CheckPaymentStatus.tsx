"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface CheckPaymentStatusProps {
  onSuccess: (storedCv: any) => void;
  onPending: () => void;
  onFailure: () => void;
  onStartVerifying: () => void;
}

export function CheckPaymentStatus({ onSuccess, onPending, onFailure, onStartVerifying }: CheckPaymentStatusProps) {
  const searchParams = useSearchParams();
  const [hasChecked, setHasChecked] = useState(false); // 👈 Nuevo estado para evitar loops

  useEffect(() => {
    if (hasChecked) return; // 👈 Si ya verificó una vez, no vuelve a hacerlo

    const status = searchParams.get("status");
    const collectionStatus = searchParams.get("collection_status");
    const paymentId = searchParams.get("payment_id");

    if (!status || !paymentId) return;

    const verifyPayment = async () => {
      try {
        onStartVerifying();
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
      } finally {
        setHasChecked(true); // 👈 Marcar como ya verificado
      }
    };

    if (status === "success" && collectionStatus === "approved") {
      verifyPayment();
    } else if (status === "pending") {
      onPending();
      setHasChecked(true);
    } else {
      onFailure();
      setHasChecked(true);
    }
  }, [searchParams, onSuccess, onPending, onFailure, onStartVerifying, hasChecked]);

  return null;
}
