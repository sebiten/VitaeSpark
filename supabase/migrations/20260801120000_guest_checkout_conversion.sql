alter table public.profiles
add column if not exists is_temporary boolean not null default false;

create index if not exists profiles_temporary_created_at_idx
  on public.profiles (is_temporary, created_at desc);

alter table public.payment_checkout_sessions
add column if not exists contact_email text,
add column if not exists is_guest boolean not null default false;

alter table public.payment_checkout_sessions
drop constraint if exists payment_checkout_sessions_contact_email_check;

alter table public.payment_checkout_sessions
add constraint payment_checkout_sessions_contact_email_check
check (
  contact_email is null
  or (
    length(contact_email) between 3 and 320
    and contact_email = lower(trim(contact_email))
  )
);

alter table public.analytics_events
add column if not exists is_guest boolean;

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
    'preview_viewed',
    'checkout_viewed',
    'guest_email_submitted',
    'guest_checkout_created',
    'payment_started',
    'payment_completed',
    'purchase_access_sent',
    'purchase_claimed',
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

create index if not exists analytics_events_guest_created_at_idx
  on public.analytics_events (is_guest, created_at desc)
  where is_guest is not null;

create table if not exists public.purchase_claims (
  id uuid primary key default gen_random_uuid(),
  cv_id uuid not null unique references public.cvs(id) on delete cascade,
  temporary_profile_id uuid not null references public.profiles(id) on delete cascade,
  target_profile_id uuid references public.profiles(id) on delete set null,
  contact_email text not null,
  status text not null default 'pending'
    check (status in ('pending', 'claimed', 'expired')),
  auth_token_hash text,
  auth_token_type text
    check (auth_token_type is null or auth_token_type in ('signup', 'magiclink')),
  access_sent_at timestamptz,
  last_error text,
  expires_at timestamptz not null default (now() + interval '30 days'),
  claimed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(contact_email) between 3 and 320),
  check (contact_email = lower(trim(contact_email)))
);

alter table public.purchase_claims enable row level security;
revoke all on table public.purchase_claims from public, anon, authenticated;
grant select, insert, update on table public.purchase_claims to service_role;

create index if not exists purchase_claims_email_status_idx
  on public.purchase_claims (contact_email, status, created_at desc);

create index if not exists purchase_claims_temporary_profile_idx
  on public.purchase_claims (temporary_profile_id, status);

create table if not exists public.ai_generation_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  session_id uuid,
  model text not null,
  input_tokens integer not null default 0 check (input_tokens >= 0),
  cached_input_tokens integer not null default 0 check (cached_input_tokens >= 0),
  output_tokens integer not null default 0 check (output_tokens >= 0),
  estimated_cost_usd numeric(12, 8) not null default 0
    check (estimated_cost_usd >= 0),
  success boolean not null,
  error_code text,
  created_at timestamptz not null default now()
);

alter table public.ai_generation_usage enable row level security;
revoke all on table public.ai_generation_usage from public, anon, authenticated;
grant select, insert on table public.ai_generation_usage to service_role;

create index if not exists ai_generation_usage_created_at_idx
  on public.ai_generation_usage (created_at desc);

create index if not exists ai_generation_usage_user_created_at_idx
  on public.ai_generation_usage (user_id, created_at desc)
  where user_id is not null;

drop policy if exists "Permanent users can read own payments" on public.payments;
create policy "Permanent users can read own payments"
on public.payments
as restrictive
for select
to authenticated
using (
  (select auth.uid()) = user_id
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false) is false
);

drop policy if exists "Permanent users can read own feedback" on public.feedback;
create policy "Permanent users can read own feedback"
on public.feedback
as restrictive
for select
to authenticated
using (
  (select auth.uid()) = user_id
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false) is false
);

drop policy if exists "Permanent users can insert own feedback" on public.feedback;
create policy "Permanent users can insert own feedback"
on public.feedback
as restrictive
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and coalesce((select (auth.jwt()->>'is_anonymous')::boolean), false) is false
);

create or replace function public.claim_guest_purchase(
  p_claim_id uuid,
  p_target_profile_id uuid,
  p_target_email text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  claim_row public.purchase_claims%rowtype;
  normalized_email text := lower(trim(p_target_email));
begin
  select *
    into claim_row
  from public.purchase_claims
  where id = p_claim_id
  for update;

  if not found then
    raise exception 'Purchase claim not found';
  end if;

  if claim_row.status = 'claimed' then
    if claim_row.target_profile_id is distinct from p_target_profile_id then
      raise exception 'Purchase already claimed by another profile';
    end if;

    return jsonb_build_object(
      'cv_id', claim_row.cv_id,
      'temporary_profile_id', claim_row.temporary_profile_id,
      'already_claimed', true
    );
  end if;

  if claim_row.status <> 'pending' or claim_row.expires_at <= now() then
    raise exception 'Purchase claim expired';
  end if;

  if claim_row.contact_email <> normalized_email then
    raise exception 'Verified email does not match purchase';
  end if;

  perform 1
  from public.profiles
  where id = p_target_profile_id
    and is_temporary = false;

  if not found then
    raise exception 'Target profile is not permanent';
  end if;

  perform 1
  from public.cvs
  where id = claim_row.cv_id
    and profile_id = claim_row.temporary_profile_id
    and status = 'paid'
  for update;

  if not found then
    raise exception 'Paid CV ownership mismatch';
  end if;

  update public.cvs
  set profile_id = p_target_profile_id
  where id = claim_row.cv_id
    and profile_id = claim_row.temporary_profile_id;

  update public.payments
  set user_id = p_target_profile_id
  where cv_id = claim_row.cv_id
    and user_id = claim_row.temporary_profile_id;

  update public.payment_checkout_sessions
  set profile_id = p_target_profile_id,
      updated_at = now()
  where cv_id = claim_row.cv_id
    and profile_id = claim_row.temporary_profile_id;

  update public.analytics_events
  set user_id = p_target_profile_id
  where cv_id = claim_row.cv_id
    and user_id = claim_row.temporary_profile_id;

  update public.cv_recovery_emails
  set profile_id = p_target_profile_id
  where cv_id = claim_row.cv_id
    and profile_id = claim_row.temporary_profile_id;

  update public.purchase_claims
  set target_profile_id = p_target_profile_id,
      status = 'claimed',
      claimed_at = now(),
      auth_token_hash = null,
      updated_at = now()
  where id = claim_row.id;

  return jsonb_build_object(
    'cv_id', claim_row.cv_id,
    'temporary_profile_id', claim_row.temporary_profile_id,
    'already_claimed', false
  );
end;
$$;

revoke all on function public.claim_guest_purchase(uuid, uuid, text)
from public, anon, authenticated;
grant execute on function public.claim_guest_purchase(uuid, uuid, text)
to service_role;
