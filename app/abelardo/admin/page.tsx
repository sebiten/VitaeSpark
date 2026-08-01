import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Cpu,
  FileText,
  MessageSquare,
  MousePointerClick,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { isAttributedVisitLabel } from "@/lib/analytics-event-labels";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";

type AnalyticsEventName =
  | "landing_cta_clicked"
  | "template_selected"
  | "form_started"
  | "auth_required"
  | "auth_completed"
  | "cv_generated"
  | "preview_viewed"
  | "checkout_viewed"
  | "guest_email_submitted"
  | "guest_checkout_created"
  | "payment_started"
  | "payment_completed"
  | "purchase_access_sent"
  | "purchase_claimed"
  | "recovery_email_sent"
  | "recovery_email_clicked"
  | "feedback_submitted"
  | "download_completed"
  | "tool_started"
  | "tool_result_generated"
  | "tool_ai_refined"
  | "tool_result_copied";

type AnalyticsEvent = {
  id: string;
  user_id: string | null;
  cv_id: string | null;
  payment_id: string | null;
  event_name: AnalyticsEventName;
  landing_path: string | null;
  created_at: string;
  language: "es" | "en" | null;
  payment_provider: "mercado_pago" | "paypal" | null;
  source_type: string | null;
  cta_label: string | null;
  template: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  country_code: string | null;
  session_id: string | null;
  is_guest: boolean | null;
};

type PaymentRecord = {
  amount: number | null;
  status: string | null;
  created_at: string;
  payment_type: string | null;
  payment_method: string | null;
  payer_email: string | null;
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
  sourceTypes: Set<string>;
};

type CampaignMetric = {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  visits: number;
  clicks: number;
  cvs: number;
  checkouts: number;
  paymentStarts: number;
  payments: number;
};

type PeriodMetrics = {
  users: number;
  generated: number;
  approvedPayments: number;
  revenueARS: number;
  revenueUSD: number;
};

type AiGenerationUsage = {
  user_id: string | null;
  input_tokens: number | null;
  cached_input_tokens: number | null;
  output_tokens: number | null;
  estimated_cost_usd: number | null;
  success: boolean;
  created_at: string;
};

type AiUsageMetrics = {
  requests: number;
  successful: number;
  tokens: number;
  costUsd: number;
};

type PreRegistrationJourney = {
  sessionId: string;
  generatedAt: string;
  registeredAt: string | null;
  registeredUserId: string | null;
  landingPath: string | null;
  language: "es" | "en" | null;
  template: string | null;
  countryCode: string | null;
  reachedCheckout: boolean;
  submittedEmail: boolean;
  startedPayment: boolean;
  completedPayment: boolean;
};

type LinkedProfile = {
  id: string;
  full_name: string | null;
};

type FilterValue = "all" | "es" | "en";
type ProviderFilterValue = "all" | "mercado_pago" | "paypal";
type CountryFilterValue = "all" | string;

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const APPROVED_STATUSES = ["approved", "paid"];

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{
    lang?: FilterValue;
    provider?: ProviderFilterValue;
    country?: string;
  }>;
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

  if (error || !profile?.isadmin) return redirect("/");

  const params = await searchParams;
  const languageFilter =
    params?.lang === "en" || params?.lang === "es" ? params.lang : "all";
  const providerFilter =
    params?.provider === "mercado_pago" || params?.provider === "paypal"
      ? params.provider
      : "all";
  const countryFilter: CountryFilterValue = /^[A-Z]{2}$/.test(
    params?.country ?? "",
  )
    ? (params?.country as string)
    : "all";

  const now = new Date();
  const since30Days = startOfDay(new Date(Date.now() - 29 * DAY_IN_MS));
  const since60Days = startOfDay(new Date(Date.now() - 59 * DAY_IN_MS));

  const [
    { count: totalUsers },
    { data: recentFeedback },
    { data: paymentsLast60 },
    { data: recentUsers },
    { data: analyticsEvents },
    { data: aiUsageLast60 },
  ] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("is_temporary", false),
    supabaseAdmin
      .from("feedback")
      .select("message, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabaseAdmin
      .from("payments")
      .select("amount, status, created_at, payment_type, payment_method, payer_email")
      .in("status", APPROVED_STATUSES)
      .gte("created_at", since60Days.toISOString())
      .order("created_at", { ascending: false })
      .limit(500),
    supabaseAdmin
      .from("profiles")
      .select("id, created_at")
      .eq("is_temporary", false)
      .gte("created_at", since60Days.toISOString())
      .limit(5000),
    supabaseAdmin
      .from("analytics_events")
      .select(
        "id, user_id, cv_id, payment_id, event_name, landing_path, created_at, language, payment_provider, source_type, cta_label, template, utm_source, utm_medium, utm_campaign, utm_content, country_code, session_id, is_guest"
      )
      .gte("created_at", since60Days.toISOString())
      .order("created_at", { ascending: false })
      .limit(3000),
    supabaseAdmin
      .from("ai_generation_usage")
      .select(
        "user_id, input_tokens, cached_input_tokens, output_tokens, estimated_cost_usd, success, created_at",
      )
      .gte("created_at", since60Days.toISOString())
      .order("created_at", { ascending: false })
      .limit(5000),
  ]);

  const users = (recentUsers ?? []).filter((profile) => profile.id !== user.id);
  const testPaymentEmails = new Set(
    [user.email, ...(process.env.ANALYTICS_TEST_EMAILS ?? "").split(",")]
      .map((email) => email?.trim().toLowerCase())
      .filter((email): email is string => Boolean(email))
  );
  const rawPayments = (paymentsLast60 ?? []) as PaymentRecord[];
  const payments = rawPayments.filter(
    (payment) =>
      !payment.payer_email ||
      !testPaymentEmails.has(payment.payer_email.trim().toLowerCase())
  );
  const rawEvents = (analyticsEvents ?? []) as AnalyticsEvent[];
  const aiUsage = ((aiUsageLast60 ?? []) as AiGenerationUsage[]).filter(
    (usage) => usage.user_id !== user.id,
  );
  const adminSessionIds = new Set(
    rawEvents
      .filter((event) => event.user_id === user.id && event.session_id)
      .map((event) => event.session_id as string),
  );
  const trackedEvents = rawEvents.filter(
    (event) =>
      event.user_id !== user.id &&
      (!event.session_id || !adminSessionIds.has(event.session_id)),
  );
  const currentEvents = trackedEvents.filter((event) =>
    isInRange(event.created_at, since30Days, now),
  );
  const preRegistrationJourneys =
    buildPreRegistrationJourneys(currentEvents);
  const linkedUserIds = Array.from(
    new Set(
      preRegistrationJourneys
        .map((journey) => journey.registeredUserId)
        .filter((id): id is string => Boolean(id)),
    ),
  );
  let linkedProfiles: LinkedProfile[] = [];
  if (linkedUserIds.length > 0) {
    const { data } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .in("id", linkedUserIds);
    linkedProfiles = (data ?? []) as LinkedProfile[];
  }
  const linkedProfileMap = new Map(
    linkedProfiles.map((profile) => [profile.id, profile]),
  );
  const preRegistrationSummary = summarizePreRegistration(
    preRegistrationJourneys,
    currentEvents,
  );
  const events = currentEvents.filter((event) => {
    const languageMatches =
      languageFilter === "all" ? true : event.language === languageFilter;
    const countryMatches =
      countryFilter === "all" ? true : event.country_code === countryFilter;
    return languageMatches && countryMatches;
  });
  const countryOptions = buildCountryOptions(currentEvents);

  const current30 = buildPeriodMetrics({
    users,
    payments,
    events: trackedEvents,
    start: since30Days,
    end: now,
  });
  const previous30 = buildPeriodMetrics({
    users,
    payments,
    events: trackedEvents,
    start: since60Days,
    end: since30Days,
  });
  const currentAiUsage = buildAiUsageMetrics(aiUsage, since30Days, now);
  const landingMetrics = buildLandingMetrics(events, languageFilter, providerFilter);
  const campaignMetrics = buildCampaignMetrics(events, providerFilter);
  const topLanding = landingMetrics[0];

  const funnel = buildFunnelMetrics(currentEvents);

  const insights = buildInsights({
    current30,
    previous30,
    ctaClicks: funnel.ctaClicks,
    generated: funnel.generatedSessions,
    cvToCheckoutRate: funnel.generatedToPreview,
    checkoutToPaymentRate: funnel.previewToPaymentStart,
    topLanding,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0C0C10] px-4 py-8 text-[#F4F4F5] sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_8%,rgba(122,92,255,0.2),transparent_30%),radial-gradient(circle_at_18%_32%,rgba(56,189,248,0.08),transparent_26%),linear-gradient(135deg,#0C0C10_0%,#141219_48%,#08080A_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(246,242,234,0.62)_1px,transparent_1px),linear-gradient(90deg,rgba(246,242,234,0.48)_1px,transparent_1px)] [background-size:84px_84px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-8 overflow-hidden rounded-[34px] border border-white/10 bg-[#15151A]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <BadgeLike icon={<Sparkles className="h-4 w-4" />} text="Admin privado" />
              <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-[#F6F2EA] sm:text-5xl">
                Centro de datos VitaeSpark
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-[#D8D2C8]/70 sm:text-base">
                Lectura operativa con datos reales de Supabase: usuarios, CVs,
                pagos aprobados, feedback y eventos del funnel de los ultimos 30 dias.
              </p>
            </div>

            <nav className="grid gap-2 sm:grid-cols-3 lg:min-w-[430px]">
              <AdminNav href="/abelardo/admin/users" label="Usuarios" icon={<Users />} />
              <AdminNav href="/abelardo/admin/cv" label="CVs creados" icon={<FileText />} />
              <AdminNav href="/" label="Ver home" icon={<ArrowRight />} />
            </nav>
          </div>
        </header>

        <section className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          <MetricCard
            title="Ingresos ARS 30d"
            value={formatMoneyARS(current30.revenueARS)}
            helper={`${current30.approvedPayments} pagos aprobados`}
            delta={buildDelta(current30.revenueARS, previous30.revenueARS)}
            icon={<CreditCard className="h-5 w-5" />}
          />
          <MetricCard
            title="Ingresos USD 30d"
            value={formatMoneyUSD(current30.revenueUSD)}
            helper="PayPal separado para no mezclar monedas"
            delta={buildDelta(current30.revenueUSD, previous30.revenueUSD)}
            icon={<CreditCard className="h-5 w-5" />}
          />
          <MetricCard
            title="Generaciones únicas"
            value={current30.generated}
            helper={`${preRegistrationSummary.anonymousGenerated} se generaron antes del registro`}
            delta={buildDelta(current30.generated, previous30.generated)}
            icon={<FileText className="h-5 w-5" />}
          />
          <MetricCard
            title="Usuarios nuevos"
            value={current30.users}
            helper={`${Math.max(0, (totalUsers ?? 0) - 1)} usuarios historicos`}
            delta={buildDelta(current30.users, previous30.users)}
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            title="Pago / generación"
            value={formatPercent(
              rate(current30.approvedPayments, current30.generated),
            )}
            helper="Pagos aprobados sobre generaciones reales"
            delta={buildDelta(
              rate(current30.approvedPayments, current30.generated),
              rate(previous30.approvedPayments, previous30.generated)
            )}
            icon={<Target className="h-5 w-5" />}
          />
          <MetricCard
            title="Costo IA 30d"
            value={formatMoneyUSD(currentAiUsage.costUsd)}
            helper={`${currentAiUsage.tokens.toLocaleString("es-AR")} tokens · ${currentAiUsage.successful}/${currentAiUsage.requests} exitosas`}
            delta={{
              label: `${currentAiUsage.requests} solicitudes`,
              tone: "flat",
              raw: 0,
            }}
            icon={<Cpu className="h-5 w-5" />}
          />
        </section>

        <section className="mb-7 overflow-hidden rounded-[28px] border border-white/10 bg-[#15151A]/82">
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B8A7FF]">
                  Compra sin cuenta previa
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Visitantes que llegaron al resultado real
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/52">
                  El recorrido se identifica por sesión y separa el email de
                  entrega, el inicio del pago y la aprobación final.
                </p>
              </div>
              <span className="text-sm text-white/42">
                Cobertura de sesión:{" "}
                <strong className="text-white">
                  {formatPercent(preRegistrationSummary.sessionCoverage)}
                </strong>
              </span>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
              <JourneyMetric
                label="Generaron sin cuenta"
                value={preRegistrationSummary.anonymousGenerated}
                helper="Sesiones únicas en 30 días"
              />
              <JourneyMetric
                label="Dejaron su email"
                value={preRegistrationSummary.submittedEmail}
                helper={formatPercent(preRegistrationSummary.emailRate)}
              />
              <JourneyMetric
                label="Iniciaron el pago"
                value={preRegistrationSummary.startedPayment}
                helper="Mercado Pago o PayPal"
              />
              <JourneyMetric
                label="Completaron el pago"
                value={preRegistrationSummary.completedPayment}
                helper="Conversión atribuida"
              />
            </div>
          </div>

          {preRegistrationJourneys.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.15em] text-white/38">
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-3 font-medium sm:px-6">Visitante</th>
                    <th className="px-4 py-3 font-medium">Origen</th>
                    <th className="px-4 py-3 font-medium">CV</th>
                    <th className="px-4 py-3 font-medium">Resultado</th>
                    <th className="px-5 py-3 text-right font-medium sm:px-6">
                      Generado
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/68">
                  {preRegistrationJourneys.slice(0, 12).map((journey) => {
                    const profile = journey.registeredUserId
                      ? linkedProfileMap.get(journey.registeredUserId)
                      : null;

                    return (
                      <tr key={journey.sessionId}>
                        <td className="px-5 py-4 sm:px-6">
                          {journey.registeredUserId ? (
                            <Link
                              href={`/abelardo/admin/users?q=${journey.registeredUserId}`}
                              className="font-medium text-white transition hover:text-[#CFC3FF]"
                            >
                              {profile?.full_name || "Usuario registrado"}
                            </Link>
                          ) : (
                            <span className="font-medium text-white">
                              Sin registro todavía
                            </span>
                          )}
                          <span className="mt-1 block font-mono text-xs text-white/34">
                            {shortSession(journey.sessionId)}
                          </span>
                        </td>
                        <td className="max-w-[250px] px-4 py-4">
                          <span className="block truncate text-white/74">
                            {journey.landingPath || "Entrada directa"}
                          </span>
                          <span className="mt-1 block text-xs text-white/36">
                            {journey.countryCode || "País desconocido"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="block text-white/74">
                            {journey.template || "Sin plantilla"}
                          </span>
                          <span className="mt-1 block text-xs uppercase text-white/36">
                            {journey.language || "sin idioma"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <JourneyStatus journey={journey} />
                          {journey.registeredAt ? (
                            <span className="mt-1.5 block text-xs text-white/34">
                              {formatElapsed(
                                journey.generatedAt,
                                journey.registeredAt,
                              )}{" "}
                              hasta registrarse
                            </span>
                          ) : null}
                        </td>
                        <td className="px-5 py-4 text-right text-xs text-white/46 sm:px-6">
                          {formatDateTime(journey.generatedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-5 sm:p-6">
              <EmptyPanel text="Todavía no hay generaciones anónimas con sesión identificable." />
            </div>
          )}
        </section>

        <section className="mb-7 rounded-[28px] border border-white/10 bg-[#15151A]/82 p-5 sm:p-6">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Salud del funnel
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Conversiones por sesión durante los últimos 30 días.
          </p>

          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
            <FunnelRow
              label="CTA a formulario"
              value={formatPercent(funnel.ctaToForm)}
              helper={`${funnel.formSessions} sesiones iniciaron el formulario`}
            />
            <FunnelRow
              label="Formulario a CV"
              value={formatPercent(funnel.formToGenerated)}
              helper={`${funnel.generatedSessions} sesiones generaron CV`}
            />
            <FunnelRow
              label="CV a preview"
              value={formatPercent(funnel.generatedToPreview)}
              helper={`${funnel.previewSessions} resultados visibles`}
            />
            <FunnelRow
              label="Preview invitado a email"
              value={formatPercent(funnel.guestPreviewToEmail)}
              helper={`${funnel.guestEmailSessions} emails ingresados`}
            />
            <FunnelRow
              label="Preview a inicio de pago"
              value={formatPercent(funnel.previewToPaymentStart)}
              helper={`${funnel.paymentStartSessions} sesiones iniciaron`}
            />
            <FunnelRow
              label="Inicio a pago aprobado"
              value={formatPercent(funnel.paymentStartToCompleted)}
              helper={`${funnel.paymentCompletedSessions} sesiones completaron`}
            />
            <FunnelRow
              label="Pago invitado a acceso enviado"
              value={formatPercent(funnel.guestPaymentToAccessSent)}
              helper={`${funnel.purchaseAccessSentCvs} accesos enviados`}
            />
            <FunnelRow
              label="Acceso enviado a reclamado"
              value={formatPercent(funnel.accessSentToClaimed)}
              helper={`${funnel.purchaseClaimedCvs} compras guardadas`}
            />
          </div>
        </section>

        <section className="mb-7 grid gap-4 lg:grid-cols-3">
          {insights.map((insight) => (
            <DecisionCard key={insight.title} {...insight} />
          ))}
        </section>

        <section className="mb-7 rounded-[30px] border border-white/10 bg-[#15151A]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                Landings que traen demanda
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Prioriza paginas con suficiente muestra. Los pagos por landing salen de
                `analytics_events`; los ingresos reales salen de `payments`.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <FilterGroup
                title="Idioma"
                items={[
                  {
                    label: "Todos",
                    href: buildFilterHref("all", providerFilter, countryFilter),
                    active: languageFilter === "all",
                  },
                  {
                    label: "ES",
                    href: buildFilterHref("es", providerFilter, countryFilter),
                    active: languageFilter === "es",
                  },
                  {
                    label: "EN",
                    href: buildFilterHref("en", providerFilter, countryFilter),
                    active: languageFilter === "en",
                  },
                ]}
              />
              <FilterGroup
                title="Pago"
                items={[
                  {
                    label: "Todos",
                    href: buildFilterHref(languageFilter, "all", countryFilter),
                    active: providerFilter === "all",
                  },
                  {
                    label: "MP",
                    href: buildFilterHref(languageFilter, "mercado_pago", countryFilter),
                    active: providerFilter === "mercado_pago",
                  },
                  {
                    label: "PayPal",
                    href: buildFilterHref(languageFilter, "paypal", countryFilter),
                    active: providerFilter === "paypal",
                  },
                ]}
              />
              <FilterGroup
                title="País"
                items={[
                  {
                    label: "Todos",
                    href: buildFilterHref(languageFilter, providerFilter, "all"),
                    active: countryFilter === "all",
                  },
                  ...countryOptions.map((country) => ({
                    label: country,
                    href: buildFilterHref(languageFilter, providerFilter, country),
                    active: countryFilter === country,
                  })),
                ]}
              />
            </div>
          </div>

          {landingMetrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.16em] text-white/38">
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-medium">Landing</th>
                    <th className="px-3 py-3 font-medium">Fuente</th>
                    <th className="px-3 py-3 font-medium">Clicks</th>
                    <th className="px-3 py-3 font-medium">Plantilla</th>
                    <th className="px-3 py-3 font-medium">CVs</th>
                    <th className="px-3 py-3 font-medium">Checkout</th>
                    <th className="px-3 py-3 font-medium">Inicio pago</th>
                    <th className="px-3 py-3 font-medium">Pagos</th>
                    <th className="px-3 py-3 font-medium">Click a CV</th>
                    <th className="px-3 py-3 font-medium">CV a checkout</th>
                    <th className="px-3 py-3 font-medium">Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  {landingMetrics.map((row) => {
                    const decision = getLandingDecision(row);

                    return (
                      <tr key={`${row.landing}-${row.language}-${row.paymentProvider}`}>
                        <td className="max-w-[280px] py-4 pr-4 font-medium text-white">
                          <span className="block truncate">{row.landing}</span>
                          <span className="mt-1 block text-xs text-white/38">
                            {formatLanguage(row.language)} - {formatProvider(row.paymentProvider)}
                          </span>
                        </td>
                        <td className="px-3 py-4">{formatSources(row.sourceTypes)}</td>
                        <td className="px-3 py-4">{row.clicks}</td>
                        <td className="px-3 py-4">{row.templates}</td>
                        <td className="px-3 py-4">{row.cvs}</td>
                        <td className="px-3 py-4">{row.checkouts}</td>
                        <td className="px-3 py-4">{row.paymentStarts}</td>
                        <td className="px-3 py-4">{row.payments}</td>
                        <td className="px-3 py-4 text-[#38BDF8]">
                          {formatPercent(rate(row.cvs, row.clicks))}
                        </td>
                        <td className="px-3 py-4 text-[#38BDF8]">
                          {formatPercent(rate(row.checkouts, row.cvs))}
                        </td>
                        <td className="px-3 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${decision.className}`}>
                            {decision.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyPanel text="Todavia no hay eventos para este filtro." />
          )}
        </section>

        {campaignMetrics.length > 0 ? (
          <section className="mb-7 rounded-[30px] border border-white/10 bg-[#15151A]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                Campañas y UTMs
              </h2>
              <p className="mt-1 text-sm text-white/50">
                Rendimiento atribuido de flyers, emails y publicaciones.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1080px] text-left text-sm">
                <thead className="text-[11px] uppercase tracking-[0.16em] text-white/38">
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-medium">Campana</th>
                    <th className="px-3 py-3 font-medium">Fuente</th>
                    <th className="px-3 py-3 font-medium">Medio</th>
                    <th className="px-3 py-3 font-medium">Contenido</th>
                    <th className="px-3 py-3 font-medium">Visitas</th>
                    <th className="px-3 py-3 font-medium">Clicks CTA</th>
                    <th className="px-3 py-3 font-medium">CVs</th>
                    <th className="px-3 py-3 font-medium">Checkout</th>
                    <th className="px-3 py-3 font-medium">Inicio pago</th>
                    <th className="px-3 py-3 font-medium">Pagos</th>
                    <th className="px-3 py-3 font-medium">CV / visita</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/70">
                  {campaignMetrics.map((row) => (
                    <tr key={`${row.source}-${row.medium}-${row.campaign}-${row.content}`}>
                      <td className="py-4 pr-4 font-medium text-white">
                        {row.campaign}
                      </td>
                      <td className="px-3 py-4">{row.source}</td>
                      <td className="px-3 py-4">{row.medium}</td>
                      <td className="px-3 py-4">{row.content}</td>
                      <td className="px-3 py-4">{row.visits}</td>
                      <td className="px-3 py-4">{row.clicks}</td>
                      <td className="px-3 py-4">{row.cvs}</td>
                      <td className="px-3 py-4">{row.checkouts}</td>
                      <td className="px-3 py-4">{row.paymentStarts}</td>
                      <td className="px-3 py-4">{row.payments}</td>
                      <td className="px-3 py-4 text-[#38BDF8]">
                        {row.visits > 0
                          ? formatPercent(rate(row.cvs, row.visits))
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        <section className="mb-7 grid gap-4 lg:grid-cols-2">
          <Panel title="Ultimos pagos aprobados" icon={<CreditCard className="h-5 w-5" />}>
            <div className="space-y-3">
              {payments.length > 0 ? (
                payments.slice(0, 6).map((payment, index) => (
                  <InfoRow
                    key={`${payment.created_at}-${index}`}
                    title={payment.payer_email || "Email no disponible"}
                    detail={`${formatProvider(inferPaymentProvider(payment))} - ${formatPaymentAmount(payment)}`}
                    date={payment.created_at}
                  />
                ))
              ) : (
                <EmptyPanel text="Todavia no hay pagos aprobados en la ventana revisada." />
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
                <EmptyPanel text="No hay comentarios todavia." />
              )}
            </div>
          </Panel>

        </section>
      </div>
    </main>
  );
}

function buildPeriodMetrics({
  users,
  payments,
  events,
  start,
  end,
}: {
  users: Array<{ created_at: string }>;
  payments: PaymentRecord[];
  events: AnalyticsEvent[];
  start: Date;
  end: Date;
}): PeriodMetrics {
  const periodUsers = users.filter((item) => isInRange(item.created_at, start, end));
  const periodPayments = payments.filter((item) =>
    isInRange(item.created_at, start, end)
  );
  const periodEvents = events.filter((item) =>
    isInRange(item.created_at, start, end)
  );

  return {
    users: periodUsers.length,
    generated: countUniqueEvents(periodEvents, "cv_generated"),
    approvedPayments: periodPayments.length,
    revenueARS: sumPayments(periodPayments, "mercado_pago"),
    revenueUSD: sumPayments(periodPayments, "paypal"),
  };
}

function buildLandingMetrics(
  events: AnalyticsEvent[],
  language: FilterValue,
  provider: ProviderFilterValue
): LandingMetric[] {
  const metrics = new Map<string, LandingMetric>();
  const seenEvents = new Set<string>();

  events.forEach((event) => {
    if (!event.landing_path) return;

    const key = event.landing_path;
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
        sourceTypes: new Set<string>(),
      };

    if (event.source_type) current.sourceTypes.add(event.source_type);
    const uniqueEventKey = `${key}:${event.event_name}:${getUniqueEventIdentity(event)}`;
    const shouldCountEvent = !seenEvents.has(uniqueEventKey);
    seenEvents.add(uniqueEventKey);

    if (
      shouldCountEvent &&
      event.event_name === "landing_cta_clicked" &&
      !isAttributedVisitLabel(event.cta_label)
    ) {
      current.clicks += 1;
    }
    if (shouldCountEvent && event.event_name === "template_selected") {
      current.templates += 1;
    }
    if (shouldCountEvent && event.event_name === "cv_generated") current.cvs += 1;
    if (shouldCountEvent && event.event_name === "checkout_viewed") {
      current.checkouts += 1;
    }

    const providerMatches =
      provider === "all" ? true : event.payment_provider === provider;

    if (
      shouldCountEvent &&
      event.event_name === "payment_started" &&
      providerMatches
    ) {
      current.paymentStarts += 1;
    }

    if (
      shouldCountEvent &&
      event.event_name === "payment_completed" &&
      providerMatches
    ) {
      current.payments += 1;
    }

    metrics.set(key, current);
  });

  return Array.from(metrics.values())
    .sort(
      (a, b) =>
        b.payments - a.payments ||
        b.paymentStarts - a.paymentStarts ||
        b.checkouts - a.checkouts ||
        b.cvs - a.cvs ||
        b.clicks - a.clicks
    )
    .slice(0, 14);
}

function buildCampaignMetrics(
  events: AnalyticsEvent[],
  provider: ProviderFilterValue
): CampaignMetric[] {
  const metrics = new Map<string, CampaignMetric>();
  const seenEvents = new Set<string>();

  events.forEach((event) => {
    if (!event.utm_source && !event.utm_campaign && !event.utm_medium) return;

    const source = event.utm_source || "sin fuente";
    const medium = event.utm_medium || "sin medio";
    const campaign = event.utm_campaign || "sin campana";
    const content = event.utm_content || "general";
    const key = `${source}:${medium}:${campaign}:${content}`;
    const current =
      metrics.get(key) ??
      {
        source,
        medium,
        campaign,
        content,
        visits: 0,
        clicks: 0,
        cvs: 0,
        checkouts: 0,
        paymentStarts: 0,
        payments: 0,
      };

    const providerMatches =
      provider === "all" ? true : event.payment_provider === provider;
    const uniqueEventKey = `${key}:${event.event_name}:${getUniqueEventIdentity(event)}`;
    const shouldCountEvent = !seenEvents.has(uniqueEventKey);
    seenEvents.add(uniqueEventKey);

    const isAttributedVisit =
      event.event_name === "landing_cta_clicked" &&
      isAttributedVisitLabel(event.cta_label);

    if (shouldCountEvent && isAttributedVisit) {
      current.visits += 1;
    }
    if (
      shouldCountEvent &&
      event.event_name === "landing_cta_clicked" &&
      !isAttributedVisit
    ) {
      current.clicks += 1;
    }
    if (shouldCountEvent && event.event_name === "cv_generated") current.cvs += 1;
    if (shouldCountEvent && event.event_name === "checkout_viewed") {
      current.checkouts += 1;
    }
    if (
      shouldCountEvent &&
      event.event_name === "payment_started" &&
      providerMatches
    ) {
      current.paymentStarts += 1;
    }
    if (
      shouldCountEvent &&
      event.event_name === "payment_completed" &&
      providerMatches
    ) {
      current.payments += 1;
    }

    metrics.set(key, current);
  });

  return Array.from(metrics.values())
    .sort(
      (a, b) =>
        b.payments - a.payments ||
        b.paymentStarts - a.paymentStarts ||
        b.checkouts - a.checkouts ||
        b.cvs - a.cvs ||
        b.visits - a.visits ||
        b.clicks - a.clicks
    )
    .slice(0, 12);
}

function buildPreRegistrationJourneys(
  events: AnalyticsEvent[],
): PreRegistrationJourney[] {
  const sessions = new Map<string, PreRegistrationJourney>();

  events.forEach((event) => {
    if (
      event.event_name !== "cv_generated" ||
      event.user_id ||
      !event.session_id
    ) {
      return;
    }

    const current = sessions.get(event.session_id);
    if (current && current.generatedAt <= event.created_at) return;

    sessions.set(event.session_id, {
      sessionId: event.session_id,
      generatedAt: event.created_at,
      registeredAt: null,
      registeredUserId: null,
      landingPath: event.landing_path,
      language: event.language,
      template: event.template,
      countryCode: event.country_code,
      reachedCheckout: false,
      submittedEmail: false,
      startedPayment: false,
      completedPayment: false,
    });
  });

  events.forEach((event) => {
    if (!event.session_id) return;
    const journey = sessions.get(event.session_id);
    if (!journey || event.created_at < journey.generatedAt) return;

    if (
      event.event_name === "auth_completed" &&
      event.user_id &&
      !journey.registeredUserId
    ) {
      journey.registeredUserId = event.user_id;
      journey.registeredAt = event.created_at;
    }
    if (event.event_name === "checkout_viewed") journey.reachedCheckout = true;
    if (event.event_name === "guest_email_submitted") {
      journey.submittedEmail = true;
    }
    if (event.event_name === "payment_started") journey.startedPayment = true;
    if (event.event_name === "payment_completed") {
      journey.completedPayment = true;
    }
  });

  return Array.from(sessions.values()).sort(
    (a, b) =>
      new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime(),
  );
}

function summarizePreRegistration(
  journeys: PreRegistrationJourney[],
  events: AnalyticsEvent[],
) {
  const anonymousGenerated = countUniqueAnonymousGenerations(events);
  const generatedEventsWithSession = journeys.length;
  const registeredAfter = journeys.filter(
    (journey) => journey.registeredUserId,
  ).length;
  const submittedEmail = journeys.filter(
    (journey) => journey.submittedEmail,
  ).length;
  const startedPayment = journeys.filter(
    (journey) => journey.startedPayment,
  ).length;

  return {
    anonymousGenerated,
    registeredAfter,
    submittedEmail,
    startedPayment,
    reachedCheckout: journeys.filter((journey) => journey.reachedCheckout)
      .length,
    completedPayment: journeys.filter((journey) => journey.completedPayment)
      .length,
    registrationRate: rate(registeredAfter, anonymousGenerated),
    emailRate: rate(submittedEmail, anonymousGenerated),
    sessionCoverage: rate(generatedEventsWithSession, anonymousGenerated),
  };
}

function buildAiUsageMetrics(
  usage: AiGenerationUsage[],
  start: Date,
  end: Date,
): AiUsageMetrics {
  const periodUsage = usage.filter((item) =>
    isInRange(item.created_at, start, end),
  );

  return periodUsage.reduce<AiUsageMetrics>(
    (metrics, item) => ({
      requests: metrics.requests + 1,
      successful: metrics.successful + (item.success ? 1 : 0),
      tokens:
        metrics.tokens +
        Number(item.input_tokens ?? 0) +
        Number(item.output_tokens ?? 0),
      costUsd: metrics.costUsd + Number(item.estimated_cost_usd ?? 0),
    }),
    { requests: 0, successful: 0, tokens: 0, costUsd: 0 },
  );
}

function countUniqueAnonymousGenerations(events: AnalyticsEvent[]) {
  return new Set(
    events
      .filter(
        (event) => event.event_name === "cv_generated" && !event.user_id,
      )
      .map(getUniqueEventIdentity),
  ).size;
}

function buildInsights({
  current30,
  previous30,
  ctaClicks,
  generated,
  cvToCheckoutRate,
  checkoutToPaymentRate,
  topLanding,
}: {
  current30: PeriodMetrics;
  previous30: PeriodMetrics;
  ctaClicks: number;
  generated: number;
  cvToCheckoutRate: number;
  checkoutToPaymentRate: number;
  topLanding?: LandingMetric;
}) {
  const insights: Array<{
    title: string;
    value: string;
    text: string;
    tone: "good" | "warn" | "neutral";
    icon: React.ReactNode;
  }> = [];

  const paymentDelta = buildDelta(current30.approvedPayments, previous30.approvedPayments);
  insights.push({
    title: "Decision principal",
    value: generated < 10 ? "Esperar muestra" : "Optimizar con foco",
    text:
      generated < 10
        ? "Todavia hay poca muestra para concluir conversion. Prioriza trafico y registro de eventos."
        : paymentDelta.raw < 0
          ? "Los pagos bajaron contra el periodo anterior. Revisa landings con checkout pero sin pago."
          : "Hay muestra suficiente para priorizar la mejor landing y reducir friccion del checkout.",
    tone: generated < 10 ? "neutral" : paymentDelta.raw < 0 ? "warn" : "good",
    icon: <Target className="h-5 w-5" />,
  });

  insights.push({
    title: "Punto de fuga",
    value:
      generated < 10
        ? "Antes del CV"
        : cvToCheckoutRate < 30
          ? "CV a checkout"
          : checkoutToPaymentRate < 15
            ? "Checkout a pago"
            : "Funnel sano",
    text:
      generated < 10
        ? `Hay ${ctaClicks} clicks de CTA y ${generated} CVs generados. Mejora promesa, CTA y entrada al flujo.`
        : cvToCheckoutRate < 30
          ? "Mucha gente genera CV pero no llega al checkout. Revisa preview, precio visible y mensaje de desbloqueo."
          : checkoutToPaymentRate < 15
            ? "Hay intencion de pago, pero no cierre. Revisa confianza, metodo de pago y errores."
            : "No hay fuga critica. Conviene escalar trafico antes de redisenar.",
    tone:
      generated < 10 || cvToCheckoutRate < 30 || checkoutToPaymentRate < 15
        ? "warn"
        : "good",
    icon: <AlertTriangle className="h-5 w-5" />,
  });

  insights.push({
    title: "Landing a mirar",
    value: topLanding?.landing ?? "Sin datos",
    text: topLanding
      ? `${topLanding.cvs} CVs, ${topLanding.checkouts} checkouts y ${topLanding.payments} pagos atribuidos. Decision: ${getLandingDecision(topLanding).label}.`
      : "Todavia no hay landings con eventos en la ventana actual.",
    tone: topLanding?.payments ? "good" : "neutral",
    icon: <MousePointerClick className="h-5 w-5" />,
  });

  return insights;
}

function countUniqueEvents(
  events: AnalyticsEvent[],
  eventName: AnalyticsEventName
) {
  return new Set(
    events
      .filter((event) => event.event_name === eventName)
      .map(getUniqueEventIdentity)
  ).size;
}

function getUniqueEventIdentity(event: AnalyticsEvent) {
  if (event.session_id) return `session:${event.session_id}`;
  if (event.event_name === "payment_completed") {
    return event.user_id
      ? `user:${event.user_id}`
      : event.cv_id
        ? `cv:${event.cv_id}`
        : event.payment_id
          ? `payment:${event.payment_id}`
          : `event:${event.id}`;
  }
  if (event.event_name === "payment_started" && event.cv_id) {
    return `cv:${event.cv_id}`;
  }
  if (event.user_id) return `user:${event.user_id}`;
  if (event.cv_id) return `cv:${event.cv_id}`;
  return `event:${event.id}`;
}

function buildFunnelMetrics(events: AnalyticsEvent[]) {
  const identitiesFor = (eventName: AnalyticsEventName) =>
    new Set(
      events
        .filter((event) => event.event_name === eventName)
        .map(getUniqueEventIdentity)
    );
  const ctaSessions = new Set(
    events
      .filter(
        (event) =>
          event.event_name === "landing_cta_clicked" &&
          !isAttributedVisitLabel(event.cta_label),
      )
      .map(getUniqueEventIdentity),
  );
  const formSessions = identitiesFor("form_started");
  const generatedSessions = identitiesFor("cv_generated");
  const previewSessions = identitiesFor("preview_viewed");
  const checkoutSessions = identitiesFor("checkout_viewed");
  const guestPreviewSessions = new Set(
    events
      .filter(
        (event) => event.event_name === "preview_viewed" && event.is_guest,
      )
      .map(getUniqueEventIdentity),
  );
  const guestEmailSessions = identitiesFor("guest_email_submitted");
  const paymentStartSessions = identitiesFor("payment_started");
  const paymentCompletedSessions = identitiesFor("payment_completed");
  const guestPaymentCvs = new Set(
    events
      .filter(
        (event) =>
          event.event_name === "payment_completed" &&
          event.is_guest === true &&
          event.cv_id,
      )
      .map((event) => event.cv_id as string),
  );
  const purchaseAccessSentCvs = new Set(
    events
      .filter(
        (event) => event.event_name === "purchase_access_sent" && event.cv_id,
      )
      .map((event) => event.cv_id as string),
  );
  const purchaseClaimedCvs = new Set(
    events
      .filter(
        (event) => event.event_name === "purchase_claimed" && event.cv_id,
      )
      .map((event) => event.cv_id as string),
  );

  return {
    ctaClicks: ctaSessions.size,
    formSessions: formSessions.size,
    generatedSessions: generatedSessions.size,
    previewSessions: previewSessions.size,
    checkoutSessions: checkoutSessions.size,
    guestEmailSessions: guestEmailSessions.size,
    paymentStartSessions: paymentStartSessions.size,
    paymentCompletedSessions: paymentCompletedSessions.size,
    purchaseAccessSentCvs: purchaseAccessSentCvs.size,
    purchaseClaimedCvs: purchaseClaimedCvs.size,
    ctaToForm: setConversionRate(ctaSessions, formSessions),
    formToGenerated: setConversionRate(formSessions, generatedSessions),
    generatedToPreview: setConversionRate(generatedSessions, previewSessions),
    generatedToCheckout: setConversionRate(generatedSessions, checkoutSessions),
    guestPreviewToEmail: setConversionRate(
      guestPreviewSessions,
      guestEmailSessions,
    ),
    previewToPaymentStart: setConversionRate(
      previewSessions,
      paymentStartSessions,
    ),
    checkoutToPaymentStart: setConversionRate(
      checkoutSessions,
      paymentStartSessions,
    ),
    paymentStartToCompleted: setConversionRate(
      paymentStartSessions,
      paymentCompletedSessions
    ),
    guestPaymentToAccessSent: setConversionRate(
      guestPaymentCvs,
      purchaseAccessSentCvs,
    ),
    accessSentToClaimed: setConversionRate(
      purchaseAccessSentCvs,
      purchaseClaimedCvs,
    ),
  };
}

function setConversionRate(from: Set<string>, to: Set<string>) {
  if (from.size === 0) return 0;
  let converted = 0;
  from.forEach((identity) => {
    if (to.has(identity)) converted += 1;
  });
  return rate(converted, from.size);
}

function sumPayments(
  payments: PaymentRecord[],
  provider: "mercado_pago" | "paypal"
) {
  return payments
    .filter((payment) => inferPaymentProvider(payment) === provider)
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);
}

function inferPaymentProvider(payment: PaymentRecord) {
  const method = `${payment.payment_method ?? ""} ${payment.payment_type ?? ""}`.toLowerCase();
  return method.includes("paypal") ? "paypal" : "mercado_pago";
}

function getLandingDecision(row: LandingMetric) {
  if (row.clicks < 30 && row.cvs < 10) {
    return {
      label: "Esperar",
      className: "bg-white/[0.06] text-white/62",
    };
  }

  if (row.checkouts >= 10 && row.payments === 0) {
    return {
      label: "Revisar pago",
      className: "bg-amber-400/12 text-amber-200",
    };
  }

  if (row.cvs >= 10 && rate(row.checkouts, row.cvs) < 30) {
    return {
      label: "Mejorar match",
      className: "bg-sky-400/12 text-sky-200",
    };
  }

  if (row.payments > 0 || rate(row.checkouts, row.cvs) >= 45) {
    return {
      label: "Escalar",
      className: "bg-emerald-400/12 text-emerald-200",
    };
  }

  return {
    label: "Observar",
    className: "bg-violet-400/12 text-violet-200",
  };
}

function buildFilterHref(
  language: FilterValue,
  provider: ProviderFilterValue,
  country: CountryFilterValue,
) {
  const params = new URLSearchParams();
  if (language !== "all") params.set("lang", language);
  if (provider !== "all") params.set("provider", provider);
  if (country !== "all") params.set("country", country);
  const query = params.toString();
  return query ? `/abelardo/admin?${query}` : "/abelardo/admin";
}

function AdminNav({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactElement<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/78 transition hover:border-[#D7C8FF]/25 hover:bg-white/[0.07] hover:text-white"
    >
      <span className="flex items-center gap-2">
        {React.cloneElement(icon, { className: "h-4 w-4 text-[#D7C8FF]" })}
        {label}
      </span>
      <ArrowRight className="h-4 w-4 text-white/32" />
    </Link>
  );
}

function MetricCard({
  title,
  value,
  helper,
  delta,
  icon,
}: {
  title: string;
  value: number | string;
  helper: string;
  delta: { label: string; tone: "up" | "down" | "flat"; raw: number };
  icon: React.ReactNode;
}) {
  return (
    <Card className="border border-white/10 bg-[#15151A]/82 text-[#F4F4F5] shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2.5 text-[#D7C8FF]">
            {icon}
          </div>
          <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${deltaClass(delta.tone)}`}>
            {delta.label}
          </span>
        </div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white/38">
          {title}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
          {value}
        </p>
        <p className="mt-2 text-xs leading-5 text-white/48">{helper}</p>
      </CardContent>
    </Card>
  );
}

function JourneyMetric({
  label,
  value,
  helper,
}: {
  label: string;
  value: number;
  helper: string;
}) {
  return (
    <div className="bg-[#15151A] p-4 sm:p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/38">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
        {value}
      </p>
      <p className="mt-1 text-xs text-white/42">{helper}</p>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="bg-[#15151A] p-4">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-white/72">{label}</span>
        <strong className="text-white">{value}</strong>
      </div>
      <p className="mt-1 text-xs text-white/38">{helper}</p>
    </div>
  );
}

function JourneyStatus({
  journey,
}: {
  journey: PreRegistrationJourney;
}) {
  if (journey.completedPayment) {
    return (
      <span className="inline-flex rounded-full bg-emerald-400/12 px-2.5 py-1 text-xs font-semibold text-emerald-200">
        Pago completado
      </span>
    );
  }
  if (journey.startedPayment) {
    return (
      <span className="inline-flex rounded-full bg-amber-400/12 px-2.5 py-1 text-xs font-semibold text-amber-200">
        Inició pago
      </span>
    );
  }
  if (journey.submittedEmail) {
    return (
      <span className="inline-flex rounded-full bg-violet-400/12 px-2.5 py-1 text-xs font-semibold text-violet-200">
        Dejó email
      </span>
    );
  }
  if (journey.reachedCheckout) {
    return (
      <span className="inline-flex rounded-full bg-sky-400/12 px-2.5 py-1 text-xs font-semibold text-sky-200">
        Vio checkout
      </span>
    );
  }
  if (journey.registeredUserId) {
    return (
      <span className="inline-flex rounded-full bg-violet-400/12 px-2.5 py-1 text-xs font-semibold text-violet-200">
        Se registró
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-white/[0.06] px-2.5 py-1 text-xs font-semibold text-white/58">
      Solo generó
    </span>
  );
}

function DecisionCard({
  title,
  value,
  text,
  tone,
  icon,
}: {
  title: string;
  value: string;
  text: string;
  tone: "good" | "warn" | "neutral";
  icon: React.ReactNode;
}) {
  return (
    <article className={`rounded-[26px] border p-5 ${decisionClass(tone)}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3">
          {icon}
        </div>
        {tone === "good" ? <CheckCircle2 className="h-5 w-5 text-emerald-200" /> : null}
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white/42">
        {title}
      </p>
      <h3 className="mt-2 line-clamp-2 text-xl font-semibold tracking-[-0.03em] text-white">
        {value}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/62">{text}</p>
    </article>
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
    <section className="rounded-[30px] border border-white/10 bg-[#15151A]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-6">
      <h2 className="mb-5 flex items-center gap-2 text-2xl font-semibold tracking-[-0.03em] text-white">
        <span className="text-[#D7C8FF]">{icon}</span>
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
      <p className="mt-1 text-xs text-white/52">{detail}</p>
      <p className="mt-2 text-xs text-white/35">
        {new Date(date).toLocaleString("es-AR", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </p>
    </div>
  );
}

function BadgeLike({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-[#D7C8FF]">
      {icon}
      {text}
    </div>
  );
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
      <p className="px-2 pb-2 text-[11px] uppercase tracking-[0.18em] text-white/38">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
              item.active
                ? "bg-[#7A5CFF] text-white"
                : "bg-white/[0.04] text-white/62 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function EmptyPanel({ text }: { text: string }) {
  return <p className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-white/50">{text}</p>;
}

function rate(part: number, total: number) {
  if (!total) return 0;
  return Math.min(100, (part / total) * 100);
}

function buildCountryOptions(events: AnalyticsEvent[]) {
  const countries = new Map<string, Set<string>>();

  events.forEach((event) => {
    if (!event.country_code) return;
    const identities = countries.get(event.country_code) ?? new Set<string>();
    identities.add(getUniqueEventIdentity(event));
    countries.set(event.country_code, identities);
  });

  return Array.from(countries.entries())
    .sort((a, b) => b[1].size - a[1].size)
    .slice(0, 6)
    .map(([country]) => country);
}

function buildDelta(current: number, previous: number) {
  if (!previous && !current) return { label: "sin cambios", tone: "flat" as const, raw: 0 };
  if (!previous) return { label: "nuevo", tone: "up" as const, raw: current };

  const raw = ((current - previous) / previous) * 100;
  const tone: "up" | "down" | "flat" =
    raw > 2 ? "up" : raw < -2 ? "down" : "flat";
  const sign = raw > 0 ? "+" : "";

  return {
    label: `${sign}${raw.toFixed(0)}%`,
    tone,
    raw,
  };
}

function deltaClass(tone: "up" | "down" | "flat") {
  if (tone === "up") return "bg-emerald-400/12 text-emerald-200";
  if (tone === "down") return "bg-rose-400/12 text-rose-200";
  return "bg-white/[0.06] text-white/54";
}

function decisionClass(tone: "good" | "warn" | "neutral") {
  if (tone === "good") return "border-emerald-400/18 bg-emerald-400/[0.07]";
  if (tone === "warn") return "border-amber-400/18 bg-amber-400/[0.07]";
  return "border-white/10 bg-[#15151A]/82";
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

function formatSources(values: Set<string>) {
  if (!values.size) return "sin fuente";
  return Array.from(values).slice(0, 2).join(", ");
}

function formatPaymentAmount(payment: PaymentRecord) {
  const provider = inferPaymentProvider(payment);
  const amount = Number(payment.amount ?? 0);
  return provider === "paypal" ? formatMoneyUSD(amount) : formatMoneyARS(amount);
}

function formatMoneyARS(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMoneyUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(1).replace(".", ",")}%`;
}

function shortSession(sessionId: string) {
  return `sesión ${sessionId.slice(0, 8)}`;
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

function formatElapsed(from: string, to: string) {
  const minutes = Math.max(
    1,
    Math.round((new Date(to).getTime() - new Date(from).getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h`;
  return `${Math.round(hours / 24)} d`;
}

function isInRange(value: string, start: Date, end: Date) {
  const date = new Date(value);
  return date >= start && date < end;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}
