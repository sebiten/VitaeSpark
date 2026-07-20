alter table public.analytics_events
drop constraint if exists analytics_events_event_name_check;

alter table public.analytics_events
add constraint analytics_events_event_name_check
check (
  event_name in (
    'landing_cta_clicked',
    'template_selected',
    'form_started',
    'auth_required',
    'auth_completed',
    'cv_generated',
    'checkout_viewed',
    'payment_started',
    'payment_completed',
    'recovery_email_sent',
    'recovery_email_clicked',
    'feedback_submitted',
    'download_completed'
  )
);

alter table public.analytics_events
add column if not exists country_code text,
add column if not exists session_id uuid;

alter table public.analytics_events
drop constraint if exists analytics_events_country_code_check;

alter table public.analytics_events
add constraint analytics_events_country_code_check
check (country_code is null or country_code ~ '^[A-Z]{2}$');

create index if not exists analytics_events_country_created_at_idx
  on public.analytics_events (country_code, created_at desc)
  where country_code is not null;

create index if not exists analytics_events_session_created_at_idx
  on public.analytics_events (session_id, created_at desc)
  where session_id is not null;
