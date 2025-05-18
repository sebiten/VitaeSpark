import type React from "react";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("isadmin")
    .eq("id", user.id)
    .single();

  if (error || !profile || !profile.isadmin) return redirect("/");

  // 👥 Total de usuarios
  const { count: totalUsers } = await supabaseAdmin
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // 💳 Pagos aprobados
  const { count: totalPayments } = await supabaseAdmin
    .from("payments")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  // 💬 Comentarios
  const { count: totalFeedback } = await supabaseAdmin
    .from("feedback")
    .select("*", { count: "exact", head: true });

  // Últimos 5 comentarios
  const { data: recentFeedback } = await supabaseAdmin
    .from("feedback")
    .select("message, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main className="bg-[#0F0F10] min-h-screen py-12 px-4 text-[#F4F4F5]">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7C3AED] mb-2">
            Panel de Administración
          </h1>
          <p className="text-[#F4F4F5]/70">
            Visualizá estadísticas clave de tu plataforma en un vistazo.
          </p>
        </div>

        {/* Estadísticas clave */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatsCard
            title="Usuarios registrados"
            value={totalUsers ?? 0}
            icon={<Users className="h-8 w-8 text-[#38BDF8]" />}
          />
          <StatsCard
            title="Pagos confirmados"
            value={totalPayments ?? 0}
            icon={<CreditCard className="h-8 w-8 text-[#7C3AED]" />}
          />
          <StatsCard
            title="Comentarios recibidos"
            value={totalFeedback ?? 0}
            icon={<MessageSquare className="h-8 w-8 text-[#A78BFA]" />}
          />
        </div>

        {/* Últimos comentarios */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-[#A78BFA] mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Últimos comentarios
          </h2>

          <div className="space-y-4">
            {recentFeedback && recentFeedback.length > 0 ? (
              recentFeedback.map((item, index) => (
                <Card
                  key={index}
                  className="bg-[#1F1F22] border border-[#7C3AED]/10 text-[#F4F4F5]"
                >
                  <CardContent className="p-4">
                    <p className="text-sm">{item.message}</p>
                    <p className="text-xs text-[#F4F4F5]/50 mt-2">
                      {new Date(item.created_at).toLocaleString("es-AR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-[#F4F4F5]/60">No hay comentarios aún.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}) {
  return (
      <Card className="bg-[#1F1F22] text-[#F4F4F5] border border-[#7C3AED]/20 shadow-md hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-[#A78BFA]">{title}</p>
              <p className="text-3xl font-bold mt-1">{value}</p>
            </div>
            {icon}
          </div>
        </CardContent>
      </Card>
  );
}
