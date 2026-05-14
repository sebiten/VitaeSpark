import type React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Activity,
  ArrowRight,
  CreditCard,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

type DailyMetric = {
  label: string;
  users: number;
  cvs: number;
  payments: number;
};

type AnalyticsEvent = {
  event_name: string;
  landing_path: string | null;
  created_at: string;
  language: "es" | "en" | null;
  payment_provider: "mercado_pago" | "paypal" | null;
};

type LandingMetric = {
  landing: string;
  language: "es" | "en" | "all";
  paymentProvider: "mercado_pago" | "paypal" | "all";
  clicks: number;
  templates: number;
  cvs: number;
  checkouts: number;
  paymentStarts: number;
  payments: number;
};

type FilterValue = "all" | "es" | "en";
type ProviderFilterValue = "all" | "mercado_pago" | "paypal";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: FilterValue; provider?: ProviderFilterValue }>;
}) {
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

  const params = await searchParams;
  const languageFilter = params?.lang === "en" || params?.lang === "es" ? params.lang : "all";
  const providerFilter =
    params?.provider === "mercado_pago" || params?.provider === "paypal"
      ? params.provider
      : "all";

  const since7Days = new Date(Date.now() - 6 * DAY_IN_MS);
  since7Days.setHours(0, 0, 0, 0);

  const [
    { count: totalUsers },
    { count: totalCvs },
    { count: totalPayments },
    { count: totalFeedback },
    { data: recentFeedback },
    { data: recentPayments },
    { data: recentUsers },
    { data: recentCvs },
    { data: analyticsEvents },
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("cvs").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("payments")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
    supabaseAdmin.from("feedback").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("feedback")
      .select("message, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("payments")
      .select("amount, status, created_at, payment_type, payer_email")
      .order("created_at", { ascending: false })
      .limit(6),
    supabaseAdmin
      .from("profiles")
      .select("created_at")
      .gte("created_at", since7Days.toISOString()),
    supabaseAdmin
      .from("cvs")
      .select("created_at, status")
      .gte("created_at", since7Days.toISOString()),
    supabaseAdmin
      .from("analytics_events")
      .select("event_name, landing_path, created_at, language, payment_provider")
      .not("landing_path", "is", null)
      .order("created_at", { ascending: false })
      .limit(1500),
  ]);

  const filteredAnalyticsEvents = (analyticsEvents ?? []).filter((event) =>
    languageFilter === "all" ? true : event.language === languageFilter
  );

  const usersLast7 = recentUsers ?? [];
  const cvsLast7 = recentCvs ?? [];
  const paidCvsLast7 = cvsLast7.filter((cv) => cv.status === "paid");
  const paymentsLast7 = (analyticsEvents ?? []).filter(
    (event) =>
      event.event_name === "payment_completed" &&
      new Date(event.created_at) >= since7Days
  );
  const dailyMetrics = buildDailyMetrics(usersLast7, cvsLast7, paymentsLast7);
  const landingMetrics = buildLandingMetrics(
    filteredAnalyticsEvents,
    languageFilter,
    providerFilter
  );
  const maxDailyValue = Math.max(
    1,
    ...dailyMetrics.map((day) => day.users + day.cvs + day.payments)
  );
  const cvToPaymentRate =
    totalCvs && totalCvs > 0 ? ((totalPayments ?? 0) / totalCvs) * 100 : 0;
  const paidCvRate =
    cvsLast7.length > 0 ? (paidCvsLast7.length / cvsLast7.length) * 100 : 0;
  const englishEvents = (analyticsEvents ?? []).filter((event) => event.language === "en");
  const paypalEvents = (analyticsEvents ?? []).filter(
    (event) => event.payment_provider === "paypal"
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F0F10] px-4 py-12 text-[#F4F4F5]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[130px]" />
      <div className="relative container mx-auto max-w-7xl">
        <div className="mb-10 rounded-3xl border border-white/10 bg-[#15151A]/80 p-6 shadow-2xl shadow-black/10">
          <BadgeLike icon={<Sparkles className="h-4 w-4" />} text="Admin" />
          <h1 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Panel de crecimiento
          </h1>
          <p className="mt-2 max-w-2xl text-[#F4F4F5]/70">
            Metricas de usuarios, CVs, pagos y conversion por landing. Los
            filtros de idioma y medio de pago usan eventos reales del funnel.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="Pagos aprobados"
            value={totalPayments ?? 0}
            helper={`Ultimos 7 dias: ${paymentsLast7.length}`}
            icon={<CreditCard className="h-8 w-8 text-[#7C3AED]" />}
          />
          <StatsCard
            title="CVs generados"
            value={totalCvs ?? 0}
            helper={`Ultimos 7 dias: ${cvsLast7.length}`}
            icon={<FileText className="h-8 w-8 text-[#A78BFA]" />}
          />
          <StatsCard
            title="Usuarios registrados"
            value={totalUsers ?? 0}
            helper={`Ultimos 7 dias: ${usersLast7.length}`}
            icon={<Users className="h-8 w-8 text-[#38BDF8]" />}
            href="/abelardo/admin/users"
          />
          <StatsCard
            title="Feedback"
            value={totalFeedback ?? 0}
            helper={`Eventos EN: ${englishEvents.length} · PayPal: ${paypalEvents.length}`}
            icon={<MessageSquare className="h-8 w-8 text-[#38BDF8]" />}
          />
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-[#15151A]/85 text-white shadow-2xl shadow-black/10">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Movimiento 7 dias</h2>
                  <p className="text-sm text-white/55">
                    Altura combinada de usuarios, CVs y pagos aprobados.
                  </p>
                </div>
                <BadgeLike
                  icon={<TrendingUp className="h-4 w-4" />}
                  text={`${paymentsLast7.length} pagos en 7 dias`}
                />
              </div>
              <div className="grid h-52 grid-cols-7 items-end gap-3">
                {dailyMetrics.map((day) => {
                  const total = day.users + day.cvs + day.payments;
                  return (
                    <div key={day.label} className="flex h-full flex-col justify-end gap-2">
                      <div className="flex flex-1 items-end rounded-2xl bg-white/[0.035] p-1.5">
                        <div
                          className="w-full rounded-xl bg-gradient-to-t from-[#7C3AED] to-[#38BDF8]"
                          style={{
                            height: `${Math.max(8, (total / maxDailyValue) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-center text-xs text-white/45">{day.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 grid gap-3 text-sm text-white/72 sm:grid-cols-3">
                <MiniMetric label="Usuarios" value={usersLast7.length} />
                <MiniMetric label="CVs" value={cvsLast7.length} />
                <MiniMetric label="Pagos" value={paymentsLast7.length} />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border border-white/10 bg-[#15151A]/85 text-white shadow-2xl shadow-black/10">
            <CardContent className="space-y-5 p-6">
              <h2 className="text-2xl font-semibold">Salud del funnel</h2>
              <FunnelRow
                icon={<Target className="h-5 w-5" />}
                label="Pago / CV generado"
                value={formatPercent(cvToPaymentRate)}
              />
              <FunnelRow
                icon={<Activity className="h-5 w-5" />}
                label="CVs pagos ultimos 7 dias"
                value={formatPercent(paidCvRate)}
              />
              <FunnelRow
                icon={<CreditCard className="h-5 w-5" />}
                label="Eventos PayPal"
                value={paypalEvents.length}
              />
              <p className="rounded-2xl border border-[#38BDF8]/15 bg-[#38BDF8]/10 p-4 text-sm leading-6 text-[#BFEFFF]">
                Con trafico internacional, lo importante ya no es solo visitas:
                mira que landing llega a checkout y cual termina en pago.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12 rounded-3xl border border-white/10 bg-[#15151A]/80 p-6 shadow-2xl shadow-black/10">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Conversion por landing
              </h2>
              <p className="text-sm text-white/55">
                Segmentado por idioma y medio de pago usando analytics_events.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <FilterGroup
                title="Idioma"
                items={[
                  { label: "Todos", href: buildFilterHref("all", providerFilter), active: languageFilter === "all" },
                  { label: "ES", href: buildFilterHref("es", providerFilter), active: languageFilter === "es" },
                  { label: "EN", href: buildFilterHref("en", providerFilter), active: languageFilter === "en" },
                ]}
              />
              <FilterGroup
                title="Pago"
                items={[
                  { label: "Todos", href: buildFilterHref(languageFilter, "all"), active: providerFilter === "all" },
                  { label: "Mercado Pago", href: buildFilterHref(languageFilter, "mercado_pago"), active: providerFilter === "mercado_pago" },
                  { label: "PayPal", href: buildFilterHref(languageFilter, "paypal"), active: providerFilter === "paypal" },
                ]}
              />
            </div>
          </div>

          {landingMetrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.16em] text-white/40">
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-medium">Landing</th>
                    <th className="px-3 py-3 font-medium">Idioma</th>
                    <th className="px-3 py-3 font-medium">Pago</th>
                    <th className="px-3 py-3 font-medium">Clicks</th>
                    <th className="px-3 py-3 font-medium">Plantilla</th>
                    <th className="px-3 py-3 font-medium">CVs</th>
                    <th className="px-3 py-3 font-medium">Checkout</th>
                    <th className="px-3 py-3 font-medium">Pago inicio</th>
                    <th className="px-3 py-3 font-medium">Pagos</th>
                    <th className="pl-3 py-3 font-medium">Conv.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/72">
                  {landingMetrics.map((row) => (
                    <tr key={`${row.landing}-${row.language}-${row.paymentProvider}`}>
                      <td className="max-w-[260px] py-4 pr-4 font-medium text-white">
                        <span className="block truncate">{row.landing}</span>
                      </td>
                      <td className="px-3 py-4">{formatLanguage(row.language)}</td>
                      <td className="px-3 py-4">{formatProvider(row.paymentProvider)}</td>
                      <td className="px-3 py-4">{row.clicks}</td>
                      <td className="px-3 py-4">{row.templates}</td>
                      <td className="px-3 py-4">{row.cvs}</td>
                      <td className="px-3 py-4">{row.checkouts}</td>
                      <td className="px-3 py-4">{row.paymentStarts}</td>
                      <td className="px-3 py-4">{row.payments}</td>
                      <td className="pl-3 py-4 text-[#38BDF8]">
                        {formatPercent(row.clicks > 0 ? (row.payments / row.clicks) * 100 : 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyPanel text="Todavia no hay eventos para este filtro." />
          )}
        </section>

        <Link
          href="/abelardo/admin/cv"
          className="mb-12 flex items-center justify-between rounded-3xl border border-white/10 bg-[#15151A]/80 p-6 text-white shadow-2xl shadow-black/10 transition hover:-translate-y-1 hover:border-[#38BDF8]/30"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-[#38BDF8]/10 p-4 text-[#38BDF8] ring-1 ring-[#38BDF8]/15">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Ver curriculums generados</h2>
              <p className="text-sm text-white/55">
                Revisa CVs creados por usuarios, filtros y vistas previas.
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-white/40" />
        </Link>

        <div className="grid gap-6 lg:grid-cols-2">
          <Panel title="Ultimos pagos" icon={<CreditCard className="h-5 w-5" />}>
            <div className="space-y-3">
              {recentPayments && recentPayments.length > 0 ? (
                recentPayments.map((payment, index) => (
                  <InfoRow
                    key={`${payment.created_at}-${index}`}
                    title={payment.payer_email || "Email no disponible"}
                    detail={`${payment.payment_type || "sin metodo"} · ${payment.status}`}
                    date={payment.created_at}
                  />
                ))
              ) : (
                <EmptyPanel text="Todavia no hay pagos registrados." />
              )}
            </div>
          </Panel>

          <Panel title="Ultimos comentarios" icon={<MessageSquare className="h-5 w-5" />}>
            <div className="space-y-3">
              {recentFeedback && recentFeedback.length > 0 ? (
                recentFeedback.map((item, index) => (
                  <InfoRow
                    key={`${item.created_at}-${index}`}
                    title={item.message}
                    detail="Feedback de usuario"
                    date={item.created_at}
                  />
                ))
              ) : (
                <EmptyPanel text="No hay comentarios aun." />
              )}
            </div>
          </Panel>
        </div>
      </div>
    </main>
  );
}

function buildLandingMetrics(
  events: AnalyticsEvent[],
  language: FilterValue,
  provider: ProviderFilterValue
): LandingMetric[] {
  const metrics = new Map<string, LandingMetric>();

  events.forEach((event) => {
    if (!event.landing_path) return;

    const key = `${event.landing_path}-${language}-${provider}`;
    const current =
      metrics.get(key) ??
      {
        landing: event.landing_path,
        language,
        paymentProvider: provider,
        clicks: 0,
        templates: 0,
        cvs: 0,
        checkouts: 0,
        paymentStarts: 0,
        payments: 0,
      };

    if (event.event_name === "landing_cta_clicked") current.clicks += 1;
    if (event.event_name === "template_selected") current.templates += 1;
    if (event.event_name === "cv_generated") current.cvs += 1;
    if (event.event_name === "checkout_viewed") current.checkouts += 1;

    const providerMatches =
      provider === "all" ? true : event.payment_provider === provider;

    if (event.event_name === "payment_started" && providerMatches) {
      current.paymentStarts += 1;
    }

    if (event.event_name === "payment_completed" && providerMatches) {
      current.payments += 1;
    }

    metrics.set(key, current);
  });

  return Array.from(metrics.values())
    .sort((a, b) => b.payments - a.payments || b.cvs - a.cvs || b.clicks - a.clicks)
    .slice(0, 12);
}

function buildDailyMetrics(
  users: Array<{ created_at: string }>,
  cvs: Array<{ created_at: string }>,
  payments: Array<{ created_at: string }>
): DailyMetric[] {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(Date.now() - (6 - index) * DAY_IN_MS);
    const key = toDateKey(date);

    return {
      label: date.toLocaleDateString("es-AR", { weekday: "short" }),
      users: users.filter((item) => toDateKey(new Date(item.created_at)) === key).length,
      cvs: cvs.filter((item) => toDateKey(new Date(item.created_at)) === key).length,
      payments: payments.filter((item) => toDateKey(new Date(item.created_at)) === key).length,
    };
  });
}

function buildFilterHref(language: FilterValue, provider: ProviderFilterValue) {
  const params = new URLSearchParams();
  if (language !== "all") params.set("lang", language);
  if (provider !== "all") params.set("provider", provider);
  const query = params.toString();
  return query ? `/abelardo/admin?${query}` : "/abelardo/admin";
}

function formatLanguage(value: "all" | "es" | "en") {
  if (value === "es") return "ES";
  if (value === "en") return "EN";
  return "Todos";
}

function formatProvider(value: "all" | "mercado_pago" | "paypal") {
  if (value === "mercado_pago") return "Mercado Pago";
  if (value === "paypal") return "PayPal";
  return "Todos";
}

function StatsCard({
  title,
  value,
  helper,
  icon,
  href,
}: {
  title: string;
  value: number | string;
  helper: string;
  icon: React.ReactNode;
  href?: string;
}) {
  const card = (
    <Card className="group overflow-hidden border border-white/10 bg-[#15151A]/85 text-[#F4F4F5] shadow-xl shadow-black/10 transition-all hover:-translate-y-1 hover:border-[#38BDF8]/30">
      <CardContent className="p-6">
        <div className="flex justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#A78BFA]">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            <p className="mt-2 text-sm text-white/45">{helper}</p>
          </div>
          <div className="self-start rounded-2xl bg-white/[0.04] p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} className="block no-underline">
      {card}
    </Link>
  ) : (
    card
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#15151A]/80 p-6 shadow-2xl shadow-black/10">
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-semibold text-white">
        <span className="text-[#38BDF8]">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function InfoRow({
  title,
  detail,
  date,
}: {
  title: string;
  detail: string;
  date: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="line-clamp-2 text-sm font-medium text-white">{title}</p>
      <p className="mt-1 text-xs text-white/55">{detail}</p>
      <p className="mt-2 text-xs text-white/35">
        {new Date(date).toLocaleString("es-AR", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/45">{label}</p>
    </div>
  );
}

function FunnelRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-[#7C3AED]/15 p-2 text-[#A78BFA]">{icon}</div>
        <span className="text-sm text-white/70">{label}</span>
      </div>
      <strong className="text-white">{value}</strong>
    </div>
  );
}

function BadgeLike({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-[#38BDF8]">
      {icon}
      {text}
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return <p className="text-sm text-white/50">{text}</p>;
}

function FilterGroup({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; href: string; active: boolean }>;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-2">
      <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`rounded-xl px-3 py-2 text-sm transition ${
              item.active
                ? "bg-[#7C3AED] text-white"
                : "bg-white/[0.04] text-white/65 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function formatPercent(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}
