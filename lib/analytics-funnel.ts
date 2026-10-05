export type FunnelEvent = {
  id: string;
  event_name: string;
  created_at: string;
  session_id: string | null;
  cv_id: string | null;
  payment_id: string | null;
  payment_provider: string | null;
  attempt_id?: string | null;
  step_id?: string | null;
  stage?: string | null;
  error_code?: string | null;
};

export type ConfirmedPayment = {
  id: string;
  cv_id: string | null;
  payment_id: string | null;
  status: string | null;
  payment_method: string | null;
  payment_type: string | null;
};

export type CheckoutAttempt = {
  id: string;
  cv_id: string;
  profile_id: string;
  provider: string;
  provider_checkout_id: string | null;
  status: string;
  created_at: string;
  attribution: { session_id?: string } | null;
};

function paymentProvider(payment: ConfirmedPayment) {
  return `${payment.payment_method ?? ""} ${payment.payment_type ?? ""}`.toLowerCase().includes("paypal") ? "paypal" : "mercado_pago";
}

export function matchesConfirmedPayment(event: FunnelEvent, payment: ConfirmedPayment) {
  return (payment.status === "approved" || payment.status === "paid") &&
    event.event_name === "payment_completed" && Boolean(payment.payment_id) &&
    event.payment_id === payment.payment_id &&
    (!event.cv_id || event.cv_id === payment.cv_id) &&
    (event.payment_provider === paymentProvider(payment) || event.payment_provider == null);
}

// Never infer revenue or a transaction from an analytics event.
export function reconcileFunnel(events: FunnelEvent[], payments: ConfirmedPayment[], attempts: CheckoutAttempt[]) {
  const confirmed = [...new Map(payments.filter(p => p.status === "approved" || p.status === "paid").map(p => [p.id, p])).values()];
  const attributed = confirmed.filter(payment => events.some(event => matchesConfirmedPayment(event, payment)));
  const convertedSessions = new Set<string>();
  for (const payment of confirmed) {
    const completion = events.filter(e => matchesConfirmedPayment(e, payment));
    const candidates = completion.map(e => e.session_id).filter((id): id is string => Boolean(id));
    // Older server events may have lost their session. Use only an unambiguous CV/provider link.
    if (!candidates.length && payment.cv_id) {
      candidates.push(...attempts.filter(a => a.cv_id === payment.cv_id && a.provider === paymentProvider(payment))
        .map(a => a.attribution?.session_id).filter((id): id is string => Boolean(id)));
    }
    const unique = new Set(candidates);
    if (unique.size === 1) convertedSessions.add([...unique][0]);
  }
  const historicalAttempts = new Set(events.filter(e => e.event_name === "payment_started" &&
    !attempts.some(a => (e.attempt_id ? a.id === e.attempt_id : a.cv_id === e.cv_id && a.provider === e.payment_provider)))
    .map(e => e.attempt_id ?? `${e.payment_provider}:${e.cv_id ?? e.session_id ?? e.id}`));
  return {
    confirmedTransactions: confirmed.length,
    attributedTransactions: attributed.length,
    unattributedTransactions: confirmed.length - attributed.length,
    convertedSessions: convertedSessions.size,
    checkoutAttempts: new Set(attempts.map(a => a.id)).size,
    historicalAttemptsWithoutRecord: historicalAttempts.size,
    unmatchedCompletionEvents: events.filter(e => e.event_name === "payment_completed" && !confirmed.some(p => matchesConfirmedPayment(e, p))).length,
  };
}

// Rates use actual session intersections and chronological progression, never CTA counts as visits.
export function sessionProgression(events: FunnelEvent[], from: string, to: string) {
  const starts = new Map<string, string>();
  for (const event of events) {
    if (event.event_name !== from || !event.session_id) continue;
    const previous = starts.get(event.session_id);
    if (!previous || event.created_at < previous) starts.set(event.session_id, event.created_at);
  }
  const converted = new Set(events.filter(e => e.event_name === to && e.session_id && starts.has(e.session_id) && e.created_at >= starts.get(e.session_id)!).map(e => e.session_id));
  return { total: starts.size, converted: converted.size, rate: starts.size ? converted.size / starts.size * 100 : 0 };
}

export function sessionTimelines(events: FunnelEvent[]) {
  const sessions = new Map<string, FunnelEvent[]>();
  for (const event of events) {
    if (!event.session_id) continue;
    const timeline = sessions.get(event.session_id) ?? [];
    timeline.push(event);
    sessions.set(event.session_id, timeline);
  }
  return [...sessions].map(([sessionId, timeline]) => ({ sessionId, events: timeline.sort((a, b) => a.created_at.localeCompare(b.created_at)) }))
    .sort((a, b) => b.events.at(-1)!.created_at.localeCompare(a.events.at(-1)!.created_at));
}
