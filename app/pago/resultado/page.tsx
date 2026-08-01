import type { Metadata } from "next";
import PaymentResultClient from "./payment-result-client";

export const metadata: Metadata = {
  title: "Resultado del pago",
  robots: { index: false, follow: false },
};

export default async function PaymentResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    cv_id?: string;
    provider?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <PaymentResultClient
      cvId={params.cv_id ?? ""}
      provider={params.provider === "paypal" ? "paypal" : "mercado_pago"}
      returnStatus={params.status ?? null}
    />
  );
}
