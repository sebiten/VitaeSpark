// components/CheckPaymentStatus.tsx
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

    if (status) {
      const storedCv = localStorage.getItem("vitae-cv-data");
      const parsedCv = storedCv ? JSON.parse(storedCv) : null;

      switch (status) {
        case "success":
          onSuccess(parsedCv);
          break;
        case "pending":
          onPending();
          break;
        case "failure":
          onFailure();
          break;
      }
    }
  }, [searchParams, onSuccess, onPending, onFailure]);

  return null;
}
