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
    'download_completed',
    'tool_started',
    'tool_result_generated',
    'tool_ai_refined',
    'tool_result_copied'
  )
);

alter table public.analytics_events
drop constraint if exists analytics_events_source_type_check;

alter table public.analytics_events
add constraint analytics_events_source_type_check
check (source_type is null or source_type in ('landing', 'blog', 'tool'));

create table if not exists public.skills_ai_daily_usage (
  usage_date date primary key default current_date,
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.skills_ai_daily_usage enable row level security;

revoke all on table public.skills_ai_daily_usage from anon, authenticated;

create or replace function public.reserve_skills_ai_daily(p_limit integer default 100)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  reserved_count integer;
begin
  if p_limit < 1 then
    return false;
  end if;

  insert into public.skills_ai_daily_usage (
    usage_date,
    request_count,
    updated_at
  )
  values (current_date, 1, now())
  on conflict (usage_date)
  do update
    set request_count = public.skills_ai_daily_usage.request_count + 1,
        updated_at = now()
    where public.skills_ai_daily_usage.request_count < p_limit
  returning request_count into reserved_count;

  return reserved_count is not null;
end;
$$;

revoke all on function public.reserve_skills_ai_daily(integer) from public;
revoke all on function public.reserve_skills_ai_daily(integer) from anon;
revoke all on function public.reserve_skills_ai_daily(integer) from authenticated;
grant execute on function public.reserve_skills_ai_daily(integer) to service_role;
