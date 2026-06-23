alter table public.analytics_events
drop constraint if exists analytics_events_event_name_check;

alter table public.analytics_events
add constraint analytics_events_event_name_check
check (
  event_name in (
    'landing_cta_clicked',
    'template_selected',
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
add column if not exists utm_source text,
add column if not exists utm_medium text,
add column if not exists utm_campaign text,
add column if not exists utm_content text;

create index if not exists analytics_events_utm_campaign_created_at_idx
  on public.analytics_events (utm_campaign, created_at desc)
  where utm_campaign is not null;

grant insert, select on public.analytics_events to service_role;

create table if not exists public.cv_recovery_emails (
  id uuid primary key default gen_random_uuid(),
  cv_id uuid not null references public.cvs(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reminder_type text not null check (reminder_type in ('1h', '24h', '72h')),
  sent_to text not null,
  sent_at timestamptz not null default now(),
  clicked_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  unique (cv_id, reminder_type)
);

alter table public.cv_recovery_emails enable row level security;

create index if not exists cv_recovery_emails_cv_id_idx
  on public.cv_recovery_emails (cv_id);

create index if not exists cv_recovery_emails_sent_at_idx
  on public.cv_recovery_emails (sent_at desc);

grant select, insert, update on public.cv_recovery_emails to service_role;

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  message text not null
);

alter table public.feedback
add column if not exists rating integer check (rating between 1 and 5),
add column if not exists can_use_anonymously boolean not null default false,
add column if not exists cv_id uuid references public.cvs(id) on delete set null,
add column if not exists source text,
add column if not exists created_at timestamptz not null default now();

do $$
begin
  execute 'alter table public.feedback enable row level security';
  execute 'grant select, insert on public.feedback to authenticated';
  execute 'grant select, insert, update on public.feedback to service_role';

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'feedback'
      and policyname = 'Users can insert their own feedback'
  ) then
    execute $policy$
      create policy "Users can insert their own feedback"
      on public.feedback
      for insert
      to authenticated
      with check ((select auth.uid()) = user_id)
    $policy$;
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'feedback'
      and policyname = 'Users can read their own feedback'
  ) then
    execute $policy$
      create policy "Users can read their own feedback"
      on public.feedback
      for select
      to authenticated
      using ((select auth.uid()) = user_id)
    $policy$;
  end if;
end $$;
