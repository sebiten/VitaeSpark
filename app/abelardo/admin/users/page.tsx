import Link from "next/link";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  FileText,
  Search,
  Shield,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const runtime = "nodejs";

const PAGE_SIZE = 25;
const FILTER_FETCH_LIMIT = 1000;

type SearchParams = Record<string, string | string[] | undefined>;

type ProfileRow = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  isadmin: boolean | null;
};

type UserMetrics = {
  cvs: number;
  paidCvs: number;
  payments: number;
  revenue: number;
};

type AdminUserRow = {
  auth: User;
  profile: ProfileRow | null;
  metrics: UserMetrics;
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = (await searchParams) ?? {};
  const query = getParam(params.q).trim();
  const role = normalizeOption(getParam(params.role), ["all", "admin", "user"]);
  const status = normalizeOption(getParam(params.status), [
    "all",
    "confirmed",
    "unconfirmed",
  ]);
  const page = Math.max(1, Number(getParam(params.page)) || 1);
  const hasFilters = Boolean(query) || role !== "all" || status !== "all";

  await assertAdmin();

  const authResult = await supabaseAdmin.auth.admin.listUsers({
    page: hasFilters ? 1 : page,
    perPage: hasFilters ? FILTER_FETCH_LIMIT : PAGE_SIZE,
  });

  if (authResult.error) {
    throw new Error("No se pudieron cargar los usuarios registrados.");
  }

  const authUsers = authResult.data.users ?? [];
  const profileMap = await getProfilesMap(authUsers.map((user) => user.id));
  const { count: permanentUserCount } = await supabaseAdmin
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("is_temporary", false);

  const filteredUsers = authUsers.filter((user) => {
    if (user.is_anonymous === true) return false;
    const profile = profileMap.get(user.id) ?? null;
    const matchesQuery = query
      ? [user.email, profile?.full_name, user.id]
          .filter(Boolean)
          .some((value) =>
            value!.toLowerCase().includes(query.toLowerCase())
          )
      : true;
    const matchesRole =
      role === "all" ||
      (role === "admin" && Boolean(profile?.isadmin)) ||
      (role === "user" && !profile?.isadmin);
    const matchesStatus =
      status === "all" ||
      (status === "confirmed" && Boolean(user.email_confirmed_at)) ||
      (status === "unconfirmed" && !user.email_confirmed_at);

    return matchesQuery && matchesRole && matchesStatus;
  });

  const totalUsers = hasFilters
    ? filteredUsers.length
    : permanentUserCount ?? filteredUsers.length;
  const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));
  const visibleUsers = hasFilters
    ? filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : filteredUsers;
  const visibleIds = visibleUsers.map((user) => user.id);
  const metricsMap = await getMetricsMap(visibleIds);
  const rows: AdminUserRow[] = visibleUsers.map((user) => ({
    auth: user,
    profile: profileMap.get(user.id) ?? null,
    metrics: metricsMap.get(user.id) ?? emptyMetrics(),
  }));

  const confirmedVisible = rows.filter((row) => row.auth.email_confirmed_at);
  const adminsVisible = rows.filter((row) => row.profile?.isadmin);
  const cvsVisible = rows.reduce((total, row) => total + row.metrics.cvs, 0);
  const revenueVisible = rows.reduce(
    (total, row) => total + row.metrics.revenue,
    0
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F0F10] px-4 py-12 text-[#F4F4F5]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#38BDF8]/10 blur-[130px]" />
      <div className="relative container mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl border border-white/10 bg-[#15151A]/80 p-6 shadow-2xl shadow-black/10">
          <Link
            href="/abelardo/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al panel
          </Link>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#38BDF8]">
            <Users className="h-4 w-4" />
            Admin usuarios
          </div>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Usuarios registrados
              </h1>
              <p className="mt-2 max-w-2xl text-[#F4F4F5]/70">
                Vista liviana para revisar cuentas, actividad basica, CVs y
                pagos sin cargar todo el historial en el navegador.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-white/60">
              <Pill>Total: {totalUsers}</Pill>
              <Pill>Pagina: {page} de {totalPages}</Pill>
              {hasFilters ? <Pill>Filtro activo</Pill> : null}
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <QuickStat
            label="Usuarios visibles"
            value={rows.length}
            icon={<Users className="h-5 w-5" />}
          />
          <QuickStat
            label="Confirmados"
            value={confirmedVisible.length}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />
          <QuickStat
            label="Admins"
            value={adminsVisible.length}
            icon={<Shield className="h-5 w-5" />}
          />
          <QuickStat
            label="CVs visibles"
            value={cvsVisible}
            icon={<FileText className="h-5 w-5" />}
            helper={formatCurrency(revenueVisible)}
          />
        </section>

        <form
          action="/abelardo/admin/users"
          className="mb-8 grid gap-4 rounded-3xl border border-white/10 bg-[#15151A]/80 p-4 shadow-xl shadow-black/10 md:grid-cols-[1fr_180px_180px_auto]"
        >
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Buscar por email, nombre o ID..."
              className="border-white/10 bg-[#0F0F10]/70 pl-10 text-[#F4F4F5] placeholder:text-[#F4F4F5]/40"
            />
          </label>

          <select
            name="role"
            defaultValue={role}
            className="h-10 rounded-md border border-white/10 bg-[#0F0F10]/70 px-3 text-sm text-[#F4F4F5]"
          >
            <option value="all">Todos los roles</option>
            <option value="user">Usuarios</option>
            <option value="admin">Admins</option>
          </select>

          <select
            name="status"
            defaultValue={status}
            className="h-10 rounded-md border border-white/10 bg-[#0F0F10]/70 px-3 text-sm text-[#F4F4F5]"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmados</option>
            <option value="unconfirmed">Sin confirmar</option>
          </select>

          <div className="flex gap-2">
            <Button type="submit" className="bg-[#7C3AED] text-white">
              Filtrar
            </Button>
            <Link href="/abelardo/admin/users">
              <Button
                type="button"
                variant="outline"
                className="border-white/10 bg-[#0F0F10]/70 text-white hover:bg-white/10"
              >
                Limpiar
              </Button>
            </Link>
          </div>
        </form>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#15151A]/80 shadow-2xl shadow-black/10">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="px-5 text-white/55">Usuario</TableHead>
                <TableHead className="text-white/55">Estado</TableHead>
                <TableHead className="text-white/55">Actividad</TableHead>
                <TableHead className="text-white/55">Pagos</TableHead>
                <TableHead className="text-white/55">Fechas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.auth.id}
                    className="border-white/10 hover:bg-white/[0.035]"
                  >
                    <TableCell className="px-5">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#38BDF8]/10 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
                          <UserRound className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {row.profile?.full_name || "Sin nombre"}
                          </p>
                          <p className="text-xs text-white/50">
                            {row.auth.email || "Sin email"}
                          </p>
                          <p className="mt-1 max-w-[260px] truncate text-[11px] text-white/28">
                            {row.auth.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <StatusBadge
                          active={Boolean(row.auth.email_confirmed_at)}
                          activeText="Email confirmado"
                          inactiveText="Sin confirmar"
                        />
                        {row.profile?.isadmin ? (
                          <span className="inline-flex rounded-full border border-[#A78BFA]/25 bg-[#7C3AED]/15 px-2.5 py-1 text-xs text-[#C4B5FD]">
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-xs text-white/55">
                            Usuario
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[150px] text-sm text-white/70">
                        <p>{row.metrics.cvs} CVs creados</p>
                        <p className="text-xs text-white/45">
                          {row.metrics.paidCvs} CVs pagos
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[150px] text-sm text-white/70">
                        <p className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-[#38BDF8]" />
                          {row.metrics.payments} aprobados
                        </p>
                        <p className="text-xs text-white/45">
                          {formatCurrency(row.metrics.revenue)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="min-w-[190px] text-xs leading-6 text-white/50">
                        <p>Registro: {formatDate(row.auth.created_at)}</p>
                        <p>
                          Ultimo acceso:{" "}
                          {row.auth.last_sign_in_at
                            ? formatDate(row.auth.last_sign_in_at)
                            : "Sin datos"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-white/10">
                  <TableCell colSpan={5} className="px-5 py-10 text-center">
                    <p className="text-white/60">
                      No hay usuarios para los filtros seleccionados.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </section>

        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-white/45">
            Los filtros se resuelven en servidor. Cuando hay busqueda, se revisan
            hasta {FILTER_FETCH_LIMIT} usuarios para mantener la consulta liviana.
          </p>
          <div className="flex gap-2">
            <PageLink
              disabled={page <= 1}
              href={buildPageHref(params, page - 1)}
              label="Anterior"
              direction="prev"
            />
            <PageLink
              disabled={page >= totalPages}
              href={buildPageHref(params, page + 1)}
              label="Siguiente"
              direction="next"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

async function assertAdmin() {
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

  if (error || !profile?.isadmin) return redirect("/");
}

async function getProfilesMap(ids: string[]) {
  if (ids.length === 0) return new Map<string, ProfileRow>();

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("id, full_name, avatar_url, created_at, isadmin")
    .in("id", ids);

  if (error) {
    throw new Error("No se pudieron cargar los perfiles.");
  }

  return new Map((data ?? []).map((profile) => [profile.id, profile]));
}

async function getMetricsMap(ids: string[]) {
  const map = new Map<string, UserMetrics>();
  ids.forEach((id) => map.set(id, emptyMetrics()));

  if (ids.length === 0) return map;

  const [{ data: cvs, error: cvsError }, { data: payments, error: paymentsError }] =
    await Promise.all([
      supabaseAdmin
        .from("cvs")
        .select("profile_id, status")
        .in("profile_id", ids),
      supabaseAdmin
        .from("payments")
        .select("user_id, amount, status")
        .in("user_id", ids),
    ]);

  if (cvsError || paymentsError) {
    throw new Error("No se pudieron cargar metricas de usuarios.");
  }

  (cvs ?? []).forEach((cv) => {
    const userId = cv.profile_id;
    const current = map.get(userId) ?? emptyMetrics();
    current.cvs += 1;
    if (cv.status === "paid") current.paidCvs += 1;
    map.set(userId, current);
  });

  (payments ?? []).forEach((payment) => {
    if (payment.status !== "approved") return;
    const userId = payment.user_id;
    const current = map.get(userId) ?? emptyMetrics();
    current.payments += 1;
    current.revenue += Number(payment.amount) || 0;
    map.set(userId, current);
  });

  return map;
}

function emptyMetrics(): UserMetrics {
  return {
    cvs: 0,
    paidCvs: 0,
    payments: 0,
    revenue: 0,
  };
}

function QuickStat({
  label,
  value,
  icon,
  helper,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  helper?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-5 shadow-xl shadow-black/10">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#38BDF8]/10 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/50">{label}</p>
      {helper ? <p className="mt-1 text-xs text-white/35">{helper}</p> : null}
    </div>
  );
}

function StatusBadge({
  active,
  activeText,
  inactiveText,
}: {
  active: boolean;
  activeText: string;
  inactiveText: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
        active
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
          : "border-amber-400/20 bg-amber-400/10 text-amber-200"
      }`}
    >
      {active ? (
        <CheckCircle2 className="h-3.5 w-3.5" />
      ) : (
        <XCircle className="h-3.5 w-3.5" />
      )}
      {active ? activeText : inactiveText}
    </span>
  );
}

function PageLink({
  href,
  label,
  disabled,
  direction,
}: {
  href: string;
  label: string;
  disabled: boolean;
  direction: "prev" | "next";
}) {
  if (disabled) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 px-4 text-sm text-white/25">
        {label}
      </span>
    );
  }

  return (
    <Link href={href}>
      <Button
        variant="outline"
        className="border-white/10 bg-[#15151A] text-white hover:bg-white/10"
      >
        {direction === "prev" ? <ArrowLeft className="h-4 w-4" /> : null}
        {label}
        {direction === "next" ? <ArrowRight className="h-4 w-4" /> : null}
      </Button>
    </Link>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">
      {children}
    </span>
  );
}

function getParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function normalizeOption<T extends string>(value: string, allowed: T[]): T {
  return allowed.includes(value as T) ? (value as T) : allowed[0];
}

function buildPageHref(params: SearchParams, page: number) {
  const next = new URLSearchParams();
  const q = getParam(params.q).trim();
  const role = getParam(params.role);
  const status = getParam(params.status);

  if (q) next.set("q", q);
  if (role && role !== "all") next.set("role", role);
  if (status && status !== "all") next.set("status", status);
  next.set("page", String(page));

  return `/abelardo/admin/users?${next.toString()}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
