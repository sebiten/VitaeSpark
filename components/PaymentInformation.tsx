import {
  Check,
  Download,
  Handshake,
  Shield,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentConfirmation() {
  return (
    <div className="flex w-full items-center justify-center ">
      <Card className="w-full border-0 bg-[#1e1e24] text-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-start gap-2 text-center text-xl font-semibold">
            <ShieldCheck className="h-5 w-5 text-green-400" />
            Pago 100% seguro
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
              <Handshake className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
              <p className="text-sm text-gray-300">
                Pago protegido por MercadoPago
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
              <User className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
              <p className="text-sm text-gray-300">
                Tu CV se asociará a tu cuenta una vez confirmado el pago.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md bg-[#252530] p-3">
              <Download className="mt-0.5 h-5 w-5 flex-shrink-0 text-white" />
              <p className="text-sm text-gray-300">
                Podras editar y descargar tu CV todas las veces que quieras desde tu{" "}
                <a href="/perfil" className="text-blue-400">
                  perfil.
                </a>
              </p>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
