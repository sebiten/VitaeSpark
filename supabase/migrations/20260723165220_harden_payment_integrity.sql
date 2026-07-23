do $$
begin
  if not exists (
    select 1
    from pg_index index_info
    join pg_attribute attribute_info
      on attribute_info.attrelid = index_info.indrelid
     and attribute_info.attnum = any(index_info.indkey)
    where index_info.indrelid = 'public.payments'::regclass
      and index_info.indisunique
      and index_info.indnkeyatts = 1
      and attribute_info.attname = 'payment_id'
  ) then
    alter table public.payments
      add constraint payments_payment_id_unique unique (payment_id);
  end if;
end
$$;

create table if not exists public.payment_checkout_sessions (
  id uuid primary key default gen_random_uuid(),
  cv_id uuid not null references public.cvs(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null check (provider in ('mercado_pago', 'paypal')),
  idempotency_key uuid not null default gen_random_uuid(),
  provider_checkout_id text,
  checkout_url text,
  status text not null default 'pending'
    check (status in ('pending', 'completed', 'failed', 'expired')),
  attribution jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_checkout_sessions_active_idx
  on public.payment_checkout_sessions (cv_id, provider)
  where status = 'pending';

create index if not exists payment_checkout_sessions_profile_created_idx
  on public.payment_checkout_sessions (profile_id, created_at desc);

alter table public.payment_checkout_sessions enable row level security;

revoke all on table public.payment_checkout_sessions from anon, authenticated;
grant select, insert, update on table public.payment_checkout_sessions to service_role;

create or replace function public.complete_cv_payment(
  p_cv_id uuid,
  p_profile_id uuid,
  p_payment_id text,
  p_amount numeric,
  p_status text,
  p_payer_email text,
  p_payment_type text,
  p_payment_method text
)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  payment_was_inserted boolean := false;
  existing_cv_id uuid;
  existing_profile_id uuid;
begin
  if p_status not in ('approved', 'paid') then
    raise exception 'Payment status is not approved';
  end if;

  if p_payment_method not in ('mercado_pago', 'paypal') then
    raise exception 'Unsupported payment provider';
  end if;

  if p_amount is null or p_amount <= 0 then
    raise exception 'Invalid payment amount';
  end if;

  perform 1
  from public.cvs
  where id = p_cv_id
    and profile_id = p_profile_id
  for update;

  if not found then
    raise exception 'CV ownership mismatch';
  end if;

  insert into public.payments (
    user_id,
    cv_id,
    payment_id,
    amount,
    status,
    payer_email,
    payment_type,
    payment_method
  )
  values (
    p_profile_id,
    p_cv_id,
    p_payment_id,
    p_amount,
    'approved',
    p_payer_email,
    p_payment_type,
    p_payment_method
  )
  on conflict (payment_id) do nothing
  returning true into payment_was_inserted;

  if not payment_was_inserted then
    select cv_id, user_id
      into existing_cv_id, existing_profile_id
    from public.payments
    where payment_id = p_payment_id;

    if existing_cv_id is distinct from p_cv_id
      or existing_profile_id is distinct from p_profile_id then
      raise exception 'Payment ownership mismatch';
    end if;
  end if;

  update public.cvs
  set status = 'paid'
  where id = p_cv_id
    and profile_id = p_profile_id;

  update public.payment_checkout_sessions
  set status = 'completed',
      updated_at = now()
  where cv_id = p_cv_id
    and profile_id = p_profile_id
    and provider = p_payment_method
    and status = 'pending';

  return jsonb_build_object(
    'payment_inserted', payment_was_inserted,
    'cv_status', 'paid'
  );
end;
$$;

revoke execute on function public.complete_cv_payment(
  uuid, uuid, text, numeric, text, text, text, text
) from public, anon, authenticated;

grant execute on function public.complete_cv_payment(
  uuid, uuid, text, numeric, text, text, text, text
) to service_role;

drop policy if exists "Users can read own profile photos" on storage.objects;
create policy "Users can read own profile photos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'fotos-perfil'
  and (storage.foldername(name))[1] = 'fotos'
  and (storage.foldername(name))[2] = ('user-' || (select auth.uid())::text)
);

drop policy if exists "Users can delete own profile photos" on storage.objects;
create policy "Users can delete own profile photos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'fotos-perfil'
  and (storage.foldername(name))[1] = 'fotos'
  and (storage.foldername(name))[2] = ('user-' || (select auth.uid())::text)
);
