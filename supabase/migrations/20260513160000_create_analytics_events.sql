create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  event_name text not null check (
    event_name in (
      'landing_cta_clicked',
      'template_selected',
      'cv_generated',
      'checkout_viewed',
      'payment_started',
      'payment_completed'
    )
  ),
  landing_path text,
  cta_label text,
  source_type text check (source_type in ('landing', 'blog')),
  template text,
  cv_id uuid references public.cvs(id) on delete set null,
  payment_id text,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

create index if not exists analytics_events_event_name_created_at_idx
  on public.analytics_events (event_name, created_at desc);

create index if not exists analytics_events_landing_path_created_at_idx
  on public.analytics_events (landing_path, created_at desc)
  where landing_path is not null;

create index if not exists analytics_events_user_id_created_at_idx
  on public.analytics_events (user_id, created_at desc)
  where user_id is not null;
