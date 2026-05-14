alter table public.analytics_events
add column if not exists payment_provider text
check (payment_provider in ('mercado_pago', 'paypal'));
