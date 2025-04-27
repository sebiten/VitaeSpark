"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface CheckPaymentStatusProps {
  onSuccess: (storedCv: any) => void;
  onPending: () => void;
  onFailure: () => void;
}

export function CheckPaymentStatus({ onSuccess, onPending, onFailure }: CheckPaymentStatusProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const collectionStatus = searchParams.get("collection_status");

    if (!status) return; // ⛔ Si no hay status, no hacemos nada

    try {
      const storedCv = localStorage.getItem("vitae-cv-data");
      const parsedCv = storedCv ? JSON.parse(storedCv) : null;

      if (status === "success" && collectionStatus === "approved") {
        onSuccess(parsedCv);
      } else if (status === "pending") {
        onPending();
      } else {
        onFailure();
      }
    } catch (error) {
      console.error("Error procesando el pago:", error);
      onFailure(); // ⛔ Si falló el parseo o algo raro, fallback a error
    }
  }, [searchParams, onSuccess, onPending, onFailure]);

  return null;
}
