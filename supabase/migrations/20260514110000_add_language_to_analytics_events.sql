alter table public.analytics_events
  add column if not exists language text check (language in ('es', 'en'));
