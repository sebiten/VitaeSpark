// app/admin/dashboard/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Obtener perfil del usuario actual (solo para validar admin)

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("isadmin")
    .eq("id", user?.id)
    .single();

  if (!profile?.isadmin) redirect("/");

  // Usuarios registrados
  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, created_at")
    .order("created_at", { ascending: false });

  // Pagos realizados
  const { data: payments } = await supabase
    .from("payments")
    .select(
      `
      id,
      amount,
      status,
      payment_type,
      payer_email,
      created_at,
      profiles:user_id (
        full_name
      )
    `
    )
    .order("created_at", { ascending: false });

  return (
    <section className="w-full min-h-screen bg-[#1A1A1A] py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Usuarios */}
        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-4 text-center">
            Usuarios registrados
          </h2>
          <div className="overflow-x-auto bg-[#2C2C2C] border border-[#444] rounded-lg">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="text-[#D4AF37]">
                <tr>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Avatar</th>
                  <th className="px-4 py-3 text-left">Registro</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-[#444] hover:bg-[#3A3A3A] transition"
                  >
                    <td className="px-4 py-3">{user.full_name ?? "—"}</td>
                    <td className="px-4 py-3">
                      {user.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt="avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagos */}
        <div>
          <h2 className="text-3xl font-bold text-[#D4AF37] mb-4 text-center">
            Pagos realizados
          </h2>
          <div className="overflow-x-auto bg-[#2C2C2C] border border-[#444] rounded-lg">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="text-[#D4AF37]">
                <tr>
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Monto</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">Método</th>
                  <th className="px-4 py-3 text-left">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-[#444] hover:bg-[#3A3A3A] transition"
                  >
                    <td className="px-4 py-3">{payment.payer_email}</td>
                    <td className="px-4 py-3">${payment.amount}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        payment.status === "approved"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {payment.status}
                    </td>
                    <td className="px-4 py-3">{payment.payment_type ?? "—"}</td>
                    <td className="px-4 py-3">{payment.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
