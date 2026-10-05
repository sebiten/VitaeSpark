import { beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { CLIENT_ANALYTICS_EVENTS } from "../lib/analytics-event-policy";

const mocks = vi.hoisted(() => ({ insert: vi.fn(), from: vi.fn(), attribution: vi.fn(), ga: vi.fn() }));
vi.mock("@/utils/supabase/admin", () => ({ supabaseAdmin: { from: mocks.from } }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/analytics-diagnostics", async () => import("../lib/analytics-diagnostics"));
vi.mock("@/lib/analytics-attribution", () => ({ getLandingAttribution: mocks.attribution }));
vi.mock("@/lib/analytics-session", () => ({ getAnalyticsSessionId: () => "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" }));
vi.mock("@/lib/ga-events", () => ({ recordGaFunnelEvent: mocks.ga, recordGaEvent: vi.fn() }));

import { recordAnalyticsEvent } from "../lib/analytics-events";
import { recordAnalyticsEventServer } from "../lib/analytics-events-server";
import { getPaymentAnalyticsContext } from "../lib/payment-analytics";

beforeEach(() => {
  mocks.insert.mockResolvedValue({ error: null });
  mocks.from.mockReturnValue({ insert: mocks.insert });
  mocks.attribution.mockReturnValue({ landing_path: "/cv-profesional?email=private@example.com", utm_content: "private%40example.com", email: "private@example.com", cv_text: "texto del CV", error_code: "excepción sensible" });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: vi.fn().mockReturnValue(false) });
});

describe("atribución de orden confirmada", () => {
  it("busca la orden exacta y recupera su sesión aunque falte payment_started", async () => {
    const attemptQuery = {
      select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [{ id: "attempt-old", attribution: { session_id: "session-old" }, is_guest: true }], error: null }),
    };
    const eventQuery = {
      select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), order: vi.fn().mockReturnThis(), limit: vi.fn().mockReturnThis(),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
    };
    mocks.from.mockImplementation(table => table === "payment_checkout_sessions" ? attemptQuery : eventQuery);
    const context = await getPaymentAnalyticsContext({ cvId: "cv-1", provider: "paypal", orderId: "order-old" });
    expect(attemptQuery.eq.mock.calls).toEqual([["cv_id", "cv-1"], ["provider", "paypal"], ["provider_checkout_id", "order-old"]]);
    expect(eventQuery.eq).toHaveBeenCalledWith("attempt_id", "attempt-old");
    expect(context).toMatchObject({ session_id: "session-old", attempt_id: "attempt-old", is_guest: true });
  });
  it("no elige arbitrariamente una orden cuando falta referencia o hay ambigüedad", async () => {
    expect(await getPaymentAnalyticsContext({ cvId: "cv-1", provider: "paypal" })).toEqual({});
    expect(mocks.from).not.toHaveBeenCalled();
    mocks.from.mockReturnValue({ select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(), limit: vi.fn().mockResolvedValue({ data: [{ id: "a" }, { id: "b" }] }) });
    expect(await getPaymentAnalyticsContext({ cvId: "cv-1", provider: "paypal", orderId: "ambiguous" })).toEqual({});
    expect(mocks.from).toHaveBeenCalledTimes(1);
  });
});

describe("transporte de eventos", () => {
  it("envía una sola vez por fetch cuando beacon no acepta y filtra datos ajenos", () => {
    recordAnalyticsEvent({ event_name: "payment_clicked", stage: "checkout" });
    expect(fetch).toHaveBeenCalledTimes(1);
    const options = vi.mocked(fetch).mock.calls[0][1]!;
    const body = JSON.parse(options.body as string);
    expect(body.landing_path).toBe("/cv-profesional");
    expect(body).not.toHaveProperty("email");
    expect(body).not.toHaveProperty("cv_text");
    expect(body).not.toHaveProperty("utm_content");
    expect(body).not.toHaveProperty("error_code");
    expect(JSON.stringify(mocks.ga.mock.calls)).not.toContain("private");
  });
  it("no duplica beacon aceptado con fetch", () => {
    vi.mocked(navigator.sendBeacon).mockReturnValue(true);
    recordAnalyticsEvent({ event_name: "checkout_email_opened" });
    expect(navigator.sendBeacon).toHaveBeenCalledTimes(1);
    expect(fetch).not.toHaveBeenCalled();
  });
  it("un fallo de almacenamiento no interrumpe el checkout", () => {
    mocks.attribution.mockImplementation(() => { throw new Error("Storage denied"); });
    expect(() => recordAnalyticsEvent({ event_name: "payment_clicked" })).not.toThrow();
  });
  it("conserva eventos históricos en servidor sin campos sensibles", async () => {
    await recordAnalyticsEventServer({ event_name: "download_completed", landing_path: "/cv-profesional?token=secret", cta_label: "private@example.com", session_id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa" });
    const payload = mocks.insert.mock.calls[0][0];
    expect(payload.event_name).toBe("download_completed");
    expect(payload.landing_path).toBe("/cv-profesional");
    expect(payload).not.toHaveProperty("cta_label");
  });
  it("un fallo del backend de analítica no cambia el resultado del pago", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mocks.insert.mockRejectedValue(new Error("sensitive failure"));
    await expect(recordAnalyticsEventServer({ event_name: "payment_completed" })).resolves.toBeUndefined();
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain("sensitive failure");
  });
});

it("la migración acepta todos los nombres históricos y nuevos sin cambiar RLS", () => {
  const sql = readFileSync("supabase/migrations/20261004192228_analytics_minimal_funnel_diagnostics.sql", "utf8");
  const old = readFileSync("supabase/migrations/20260801120000_guest_checkout_conversion.sql", "utf8");
  const constraint = old.slice(old.indexOf("add constraint analytics_events_event_name_check"), old.indexOf("create index if not exists analytics_events_guest"));
  for (const name of constraint.matchAll(/'([a-z_]+)'/g)) expect(sql).toContain(`'${name[1]}'`);
  for (const name of CLIENT_ANALYTICS_EVENTS) expect(sql).toContain(`'${name}'`);
  expect(sql).not.toMatch(/disable row level security|grant .* to (anon|authenticated)/i);
});
