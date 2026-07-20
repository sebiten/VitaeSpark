"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { AlertCircle, CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Payment = {
  id: string;
  cv_id: string;
  user_id: string;
  payment_id: string;
  amount: number;
  status: string;
  payer_email: string;
  created_at: string;
  payment_type: string;
  payment_method?: string | null;
  cv?: {
    cv_data: {
      nombre: string;
      puesto?: string;
    };
    template: string;
  };
};

function formatDate(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;

  try {
    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return String(value);
  }
}

function isPayPalPayment(payment: Payment) {
  return payment.payment_method === "paypal" || payment.payment_type === "paypal";
}

function formatAmount(amount: number, currency: "ARS" | "USD") {
  return new Intl.NumberFormat(currency === "ARS" ? "es-AR" : "en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function normalizeStatus(status: string) {
  const value = status.toLowerCase();

  if (value === "approved" || value === "paid") {
    return {
      label: "Aprobado",
      className:
        "border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10",
    };
  }

  if (value === "pending") {
    return {
      label: "Pendiente",
      className:
        "border-amber-400/20 bg-amber-400/10 text-amber-300 hover:bg-amber-400/10",
    };
  }

  return {
    label: "No aprobado",
    className:
      "border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/10",
  };
}

function formatPaymentMethod(paymentType?: string) {
  if (!paymentType) return "Pago online";

  const normalized = paymentType.replaceAll("_", " ").trim();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default function UserPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data: paymentsData, error: paymentsError } = await supabase
          .from("payments")
          .select(
            `
            *,
            cv:cvs(
              cv_data,
              template
            )
          `,
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (paymentsError) {
          console.error("Error obteniendo pagos:", paymentsError);
          setLoading(false);
          return;
        }

        setPayments((paymentsData || []) as Payment[]);
        setLoading(false);
      } catch (error) {
        console.error("Error general:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const approvedPayments = useMemo(
    () =>
      payments.filter((payment) =>
        ["approved", "paid"].includes(payment.status.toLowerCase()),
      ),
    [payments],
  );

  const totals = useMemo(
    () => ({
      ars: approvedPayments
        .filter((payment) => !isPayPalPayment(payment))
        .reduce((total, payment) => total + (payment.amount || 0), 0),
      usd: approvedPayments
        .filter(isPayPalPayment)
        .reduce((total, payment) => total + (payment.amount || 0), 0),
    }),
    [approvedPayments],
  );

  if (loading) {
    return (
      <div className="rounded-[30px] border border-white/8 bg-[#141419] p-6">
        <div className="flex items-center justify-center gap-3 text-white/72">
          <Loader2 className="h-5 w-5 animate-spin text-[#A78BFA]" />
          <span className="text-sm font-medium">Cargando pagos realizados...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-[30px] border border-white/8 bg-[#141419] p-4 shadow-[0_18px_48px_rgba(4,4,10,0.18)] sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/42">
            Historial
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
            Pagos realizados
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">
            Registro de CVs desbloqueados y pagos aprobados en tu cuenta.
          </p>
        </div>

        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/8 bg-[#0F0F12] sm:min-w-[260px]">
          <div className="border-r border-white/8 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/36">
              CVs pagados
            </p>
            <p className="mt-1 text-2xl font-semibold text-white">
              {approvedPayments.length}
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.16em] text-white/36">
              Total
            </p>
            <div className="mt-1 text-sm font-semibold leading-5 text-white">
              {totals.ars > 0 ? <p>{formatAmount(totals.ars, "ARS")}</p> : null}
              {totals.usd > 0 ? <p>{formatAmount(totals.usd, "USD")}</p> : null}
              {totals.ars === 0 && totals.usd === 0 ? <p>—</p> : null}
            </div>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden rounded-[26px] border-white/8 bg-[#101014] text-[#F4F4F5] shadow-none">
        <CardHeader className="border-b border-white/8 bg-white/[0.025] p-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-white">
            <CreditCard className="h-4 w-4 text-[#A78BFA]" />
            Movimientos de pago
          </CardTitle>
          <CardDescription className="text-sm text-white/50">
            Solo se muestran pagos asociados a CVs generados en tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/46">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                Todavia no hay pagos realizados
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/56">
                Cuando desbloquees un CV, el pago aprobado va a aparecer aca.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/8 hover:bg-transparent">
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      Estado
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      CV
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      Fecha
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      Metodo
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      Monto
                    </TableHead>
                    <TableHead className="text-xs font-medium uppercase tracking-[0.14em] text-white/38">
                      ID
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const status = normalizeStatus(payment.status);

                    return (
                      <TableRow
                        key={payment.id}
                        className="border-white/8 hover:bg-white/[0.025]"
                      >
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`rounded-full px-2.5 py-1 text-xs ${status.className}`}
                          >
                            {status.label === "Aprobado" ? (
                              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                            ) : null}
                            {status.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="min-w-[160px]">
                            <p className="truncate text-sm font-medium text-white">
                              {payment.cv?.cv_data?.nombre || "CV sin nombre"}
                            </p>
                            {payment.cv?.cv_data?.puesto ? (
                              <p className="mt-0.5 truncate text-xs text-white/42">
                                {payment.cv.cv_data.puesto}
                              </p>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-white/66">
                          {formatDate(payment.created_at)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm text-white/66">
                          {formatPaymentMethod(payment.payment_method || payment.payment_type)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-sm font-semibold text-white">
                          {formatAmount(
                            payment.amount,
                            isPayPalPayment(payment) ? "USD" : "ARS",
                          )}
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate font-mono text-xs text-white/40">
                          {payment.payment_id}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
