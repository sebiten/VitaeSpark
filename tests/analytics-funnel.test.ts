import { describe, expect, it } from "vitest";
import { matchesConfirmedPayment, reconcileFunnel, sessionProgression, sessionTimelines, type FunnelEvent, type CheckoutAttempt, type ConfirmedPayment } from "../lib/analytics-funnel";
import { analyticsDiagnosticSchema, isGuestAnalyticsEvent, ANALYTICS_EVENT_LABELS } from "../lib/analytics-diagnostics";
import { isCommercialPath } from "../lib/analytics-pages";

const event = (name: string, extra: Partial<FunnelEvent> = {}): FunnelEvent => ({ id: name, event_name: name, created_at: "2026-10-01T10:00:00Z", session_id: "session-1", cv_id: "cv-1", payment_id: null, payment_provider: "paypal", ...extra });
const attempt: CheckoutAttempt = { id: "attempt-1", cv_id: "cv-1", profile_id: "guest-1", provider: "paypal", provider_checkout_id: "order-1", status: "pending", created_at: "2026-10-01T10:00:00Z", attribution: { session_id: "session-1" } };
const payment: ConfirmedPayment = { id: "payment-row-1", cv_id: "cv-1", payment_id: "capture-1", status: "approved", payment_method: "paypal", payment_type: "paypal" };

describe("conciliación mínima", () => {
  it("rechaza IDs nulos y CV equivocado, pero permite proveedor ausente en historial", () => {
    expect(matchesConfirmedPayment(event("payment_completed"), { ...payment, payment_id: null })).toBe(false);
    expect(matchesConfirmedPayment(event("payment_completed", { payment_id: "capture-1", cv_id: "other-cv" }), payment)).toBe(false);
    expect(matchesConfirmedPayment(event("payment_completed", { payment_id: "capture-1", payment_provider: null }), payment)).toBe(true);
  });
  it("separa dos transacciones, una sesión convertida y un intento reutilizado", () => {
    const completion = event("payment_completed", { payment_id: "capture-1" });
    const result = reconcileFunnel([event("payment_started"), event("payment_started"), completion, completion], [payment, { ...payment, id: "payment-row-2", payment_id: "capture-2" }], [attempt]);
    expect(result).toMatchObject({ checkoutAttempts: 1, convertedSessions: 1, confirmedTransactions: 2, attributedTransactions: 1, unattributedTransactions: 1, historicalAttemptsWithoutRecord: 0 });
  });
  it("no convierte eventos de pago en transacciones reales", () => {
    expect(reconcileFunnel([event("payment_completed", { payment_id: "capture-1" })], [], []).confirmedTransactions).toBe(0);
    expect(reconcileFunnel([], [{ ...payment, status: "pending" }], []).confirmedTransactions).toBe(0);
  });
  it("conserva referencias históricas y evita atribuir por proveedor equivocado", () => {
    const result = reconcileFunnel([event("payment_started"), event("payment_started"), event("payment_completed", { payment_id: "capture-1", payment_provider: "mercado_pago" })], [payment], []);
    expect(result.historicalAttemptsWithoutRecord).toBe(1);
    expect(result.attributedTransactions).toBe(0);
    expect(result.convertedSessions).toBe(0);
  });
  it("no asigna una venta a dos sesiones si el enlace histórico es ambiguo", () => {
    expect(reconcileFunnel([], [payment], [attempt, { ...attempt, id: "attempt-2", attribution: { session_id: "session-2" } }]).convertedSessions).toBe(0);
  });
});

describe("recorrido por sesión", () => {
  it("recorre visita → creación → checkout → pago confirmado → descarga", () => {
    const stages = ["landing_viewed", "creator_entered", "form_step_completed", "cv_generated", "preview_viewed", "checkout_viewed", "payment_clicked", "checkout_email_opened", "guest_email_submitted", "payment_started", "payment_completed", "download_completed"];
    const events = stages.map((name, index) => event(name, {
      created_at: new Date(Date.UTC(2026, 9, 1, 10, index)).toISOString(),
      payment_id: name === "payment_completed" ? "capture-1" : null,
      attempt_id: name === "payment_started" ? attempt.id : null,
    }));
    events.push({ ...events[9], id: "reused-link" });
    const measured = events.filter(e => e.event_name !== "payment_completed" || matchesConfirmedPayment(e, payment));
    expect(sessionProgression(measured, "landing_viewed", "creator_entered").rate).toBe(100);
    expect(sessionProgression(measured, "payment_clicked", "payment_started").rate).toBe(100);
    expect(sessionProgression(measured, "payment_completed", "download_completed").rate).toBe(100);
    expect(reconcileFunnel(events, [payment], [attempt])).toMatchObject({ checkoutAttempts: 1, confirmedTransactions: 1, convertedSessions: 1 });
  });
  it("mide visitas reales, deduplica y exige progresión temporal", () => {
    const events = [event("landing_cta_clicked", { session_id: "cta-only" }), event("landing_viewed"), event("landing_viewed"), event("creator_entered", { created_at: "2026-10-01T11:00:00Z" }), event("landing_viewed", { session_id: "session-2" }), event("creator_entered", { session_id: "session-2", created_at: "2026-10-01T09:00:00Z" })];
    expect(sessionProgression(events, "landing_viewed", "creator_entered")).toEqual({ total: 2, converted: 1, rate: 50 });
    expect(sessionProgression([event("landing_cta_clicked")], "landing_viewed", "creator_entered").total).toBe(0);
  });
  it("ordena los pasos y permite ver el último error sin inventar un abandono", () => {
    const timelines = sessionTimelines([event("generation_failed", { created_at: "2026-10-01T11:00:00Z", error_code: "generation_limit", stage: "generation" }), event("form_step_completed", { step_id: "skills" }), event("cv_generated", { session_id: null })]);
    expect(timelines).toHaveLength(1);
    expect(timelines[0].events.at(-1)?.error_code).toBe("generation_limit");
  });
  it("incluye anónimos Supabase y respeta el marcador histórico explícito", () => {
    expect(isGuestAnalyticsEvent({ user_id: "anonymous-id", is_guest: true })).toBe(true);
    expect(isGuestAnalyticsEvent({ user_id: null, is_guest: null })).toBe(true);
    expect(isGuestAnalyticsEvent({ user_id: null, is_guest: false })).toBe(false);
    expect(isGuestAnalyticsEvent({ user_id: "registered-id", is_guest: null })).toBe(false);
  });
});

describe("contrato y privacidad", () => {
  it("acepta códigos cerrados y descarta datos personales fuera del contrato", () => {
    expect(analyticsDiagnosticSchema.parse({ stage: "form", step_id: "basic", email: "private@example.com", cv_text: "private" })).toEqual({ stage: "form", step_id: "basic" });
    expect(analyticsDiagnosticSchema.safeParse({ error_code: "private@example.com" }).success).toBe(false);
    expect(analyticsDiagnosticSchema.safeParse({ attempt_id: "email@example.com" }).success).toBe(false);
  });
  it("excluye URLs privadas y no confunde clic de descarga con archivo entregado", () => {
    for (const path of ["/", "/cv-para-mineria", "/curriculum-sin-experiencia", "/resume-ready"]) expect(isCommercialPath(path)).toBe(true);
    for (const path of ["/crear", "/perfil", "/pago/resultado", "/acceso-cv", "/cv-private?email=a@b.com"]) expect(isCommercialPath(path)).toBe(false);
    expect(ANALYTICS_EVENT_LABELS.download_completed).toBe("Descarga solicitada");
  });
});
