"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Receipt, AlertCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

// Tipo para los pagos
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
  cv?: {
    cv_data: {
      nombre: string;
      puesto: string;
    };
    template: string;
  };
};

// Función para formatear fechas sin date-fns
function formatDate(
  date: Date | string,
  formatType: "short" | "long" = "short"
): string {
  if (typeof date === "string") {
    date = new Date(date);
  }

  try {
    if (formatType === "short") {
      // Formato corto: "dd MMM yyyy" (ej: "15 May 2023")
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date);
    } else {
      // Formato largo: "dd MMMM yyyy, HH:mm" (ej: "15 Mayo 2023, 14:30")
      return new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    }
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return String(date);
  }
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

        // Ahora podemos consultar directamente usando el campo user_id
        const { data: paymentsData, error: paymentsError } = await supabase
          .from("payments")
          .select(
            `
            *,
            cv:cvs(
              cv_data,
              template
            )
          `
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (paymentsError) {
          console.error("Error obteniendo pagos:", paymentsError);
          setLoading(false);
          return;
        }
        setPayments(paymentsData || []);
        setLoading(false);
      } catch (error) {
        console.error("Error general:", error);
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Función para formatear el monto
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(amount);
  };

  // Función para obtener el color del badge según el estado
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "approved":
        return "bg-green-500 hover:bg-green-600";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "rejected":
      case "failed":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="bg-[#1A1A1D] p-6 rounded-xl shadow-xl border border-[#2A2A2D] flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
          <span className="text-[#F4F4F5] font-medium">
            Cargando tus pagos...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-0 py-10 space-y-8 bg-transparent">
      <div className="text-center space-y-2 mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#38BDF8]/10 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
          <Receipt className="h-6 w-6" />
        </div>
        <h2 className="text-3xl font-bold text-white">
          Historial de Pagos
        </h2>
        <p className="text-[#A1A1AA] max-w-md mx-auto">
          Aquí encontrarás todos los pagos realizados por tus currículums
        </p>
      </div>

      <Card className="bg-[#15151A]/85 border border-white/10 text-[#F4F4F5] shadow-2xl shadow-black/10 max-w-6xl mx-auto rounded-3xl overflow-hidden">
        <CardHeader className="bg-white/[0.03] border-b border-white/10">
          <CardTitle className="text-[#F4F4F5] flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Tus Facturas
          </CardTitle>
          <CardDescription className="text-[#A1A1AA]">
            Historial completo de tus transacciones
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="text-center py-16 px-6">
              <AlertCircle className="w-12 h-12 text-[#7C3AED] mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-[#F4F4F5] mb-2">
                Sin pagos registrados
              </h3>
              <p className="text-[#A1A1AA]">
                No tienes pagos registrados en el sistema.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#2A2A2D] hover:bg-[#1A1A1D]">
                    <TableHead className="text-[#A1A1AA]">Estado</TableHead>
                    <TableHead className="text-[#A1A1AA]">Fecha</TableHead>
                    <TableHead className="text-[#A1A1AA]">CV</TableHead>
                    <TableHead className="text-[#A1A1AA]">ID de Pago</TableHead>
                    <TableHead className="text-[#A1A1AA]">Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="border-[#2A2A2D] hover:bg-[#1A1A1D]"
                    >
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            payment.status
                          )} text-white`}
                        >
                          {payment.status === "approved"
                            ? "Aprobado"
                            : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#F4F4F5]">
                        {formatDate(payment.created_at, "short")}
                      </TableCell>
                      <TableCell className="text-[#F4F4F5]">
                        {payment.cv?.cv_data?.nombre || "CV sin nombre"}
                      </TableCell>
                      <TableCell className="text-[#F4F4F5] font-mono text-xs">
                        {payment.payment_id}
                      </TableCell>
                      <TableCell className="text-[#F4F4F5]">
                        {formatAmount(payment.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
