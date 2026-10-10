-- Local migration only. Apply separately after reviewing existing schema/history.
create table public.payment_cv_versions (
  cv_id uuid primary key references public.cvs(id) on delete cascade,
  root_id uuid not null references public.cvs(id) on delete cascade
);
alter table public.payment_cv_versions enable row level security;
revoke all on public.payment_cv_versions from public, anon, authenticated;
grant select, insert on public.payment_cv_versions to service_role;
create index payment_cv_versions_root_idx on public.payment_cv_versions(root_id);

-- Different browser requests may identify the same immutable snapshot. Keep aliases
-- so losing a response and then editing cannot detach that draft from its purchase.
create table public.payment_purchase_keys (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  purchase_key uuid not null,
  root_id uuid not null references public.cvs(id) on delete cascade,
  primary key(profile_id,purchase_key)
);
alter table public.payment_purchase_keys enable row level security;
revoke all on public.payment_purchase_keys from public,anon,authenticated;
grant select,insert on public.payment_purchase_keys to service_role;
create index payment_purchase_keys_root_idx on public.payment_purchase_keys(root_id);

alter table public.payment_checkout_sessions add column dispatch_started_at timestamptz;

-- Serialize snapshot creation per owner, including requests whose first response was lost.
create function public.prepare_payment_cv(p_profile_id uuid, p_previous_id uuid, p_data jsonb, p_template text, p_purchase_key uuid default null)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare v public.cvs%rowtype; original public.cvs%rowtype; root uuid; key_root uuid;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_profile_id::text, 2));
  if p_purchase_key is not null then
    select root_id into key_root from public.payment_purchase_keys where profile_id=p_profile_id and purchase_key=p_purchase_key;
  end if;
  if p_previous_id is not null then
    select * into original from public.cvs where id = p_previous_id and profile_id = p_profile_id;
    if not found then return jsonb_build_object('ok', false, 'status', 404, 'error', 'CV no encontrado'); end if;
    if original.status <> 'pending' then return jsonb_build_object('ok', false, 'status', 409, 'error', 'Este CV no está pendiente de pago'); end if;
    select root_id into root from public.payment_cv_versions where cv_id = original.id;
    root := coalesce(root, original.id);
    if key_root is not null and key_root<>root then
      return jsonb_build_object('ok',false,'status',409,'error','La referencia de compra no corresponde al CV');
    end if;
    insert into public.payment_cv_versions values (original.id, root) on conflict do nothing;
    if p_purchase_key is not null then
      insert into public.payment_purchase_keys values(p_profile_id,p_purchase_key,root) on conflict do nothing;
    end if;
    if p_data is null or (original.cv_data = p_data and original.template = p_template) then
      return jsonb_build_object('ok', true, 'cv', jsonb_build_object('id', original.id, 'template', original.template));
    end if;
  end if;
  root := coalesce(root,key_root);
  if p_data is null or p_template is null then return jsonb_build_object('ok', false, 'status', 400, 'error', 'Faltan datos del CV'); end if;
  select c.* into v from public.cvs c left join public.payment_cv_versions pv on pv.cv_id = c.id
    where c.profile_id = p_profile_id and c.cv_data = p_data and c.template = p_template
      and (root is null or coalesce(pv.root_id,c.id) = root)
    order by c.created_at desc limit 1;
  if found then
    if v.status <> 'pending' then return jsonb_build_object('ok', false, 'status', 409, 'error', 'Este CV ya está pagado', 'recoveryUrl', '/pago/resultado?cv_id=' || v.id::text); end if;
  else
    insert into public.cvs(profile_id,cv_data,foto_url,template,status)
      values(p_profile_id,p_data,p_data->>'foto_url',p_template,'pending') returning * into v;
  end if;
  root := coalesce(root,(select root_id from public.payment_cv_versions where cv_id=v.id),v.id);
  insert into public.payment_cv_versions values(v.id,root) on conflict do nothing;
  if p_purchase_key is not null then
    insert into public.payment_purchase_keys values(p_profile_id,p_purchase_key,root) on conflict do nothing;
  end if;
  return jsonb_build_object('ok',true,'cv',jsonb_build_object('id',v.id,'template',v.template));
end $$;
revoke all on function public.prepare_payment_cv(uuid,uuid,jsonb,text,uuid) from public,anon,authenticated;
grant execute on function public.prepare_payment_cv(uuid,uuid,jsonb,text,uuid) to service_role;

-- One outstanding provider/order across all revisions of a purchase. Historical roots are their CV ID.
create function public.reserve_payment_checkout(p_cv_id uuid,p_profile_id uuid,p_provider text,p_attribution jsonb,p_email text,p_guest boolean)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare root uuid; existing public.payment_checkout_sessions%rowtype; paid_id uuid;
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_profile_id::text,2));
  if not exists(select 1 from public.cvs where id=p_cv_id and profile_id=p_profile_id and status='pending') then
    if exists(select 1 from public.cvs where id=p_cv_id and profile_id=p_profile_id and status='paid') then
      return jsonb_build_object('conflict_cv_id',p_cv_id,'provider',p_provider,'reason','paid');
    end if;
    raise exception 'CV is not pending for this owner';
  end if;
  select root_id into root from public.payment_cv_versions where cv_id=p_cv_id;
  root := coalesce(root,p_cv_id);
  select c.id into paid_id from public.cvs c left join public.payment_cv_versions v on v.cv_id=c.id
    where coalesce(v.root_id,c.id)=root and c.status='paid' limit 1;
  if paid_id is not null then return jsonb_build_object('conflict_cv_id',paid_id,'reason','paid'); end if;
  select s.* into existing from public.payment_checkout_sessions s left join public.payment_cv_versions v on v.cv_id=s.cv_id
    where coalesce(v.root_id,s.cv_id)=root and s.status='pending'
    order by s.created_at limit 1;
  if found then
    if existing.cv_id<>p_cv_id or existing.provider<>p_provider then
      return jsonb_build_object('conflict_cv_id',existing.cv_id,'provider',existing.provider,'reason','active_version');
    end if;
    return to_jsonb(existing);
  end if;
  insert into public.payment_checkout_sessions(cv_id,profile_id,provider,attribution,contact_email,is_guest)
    values(p_cv_id,p_profile_id,p_provider,coalesce(p_attribution,'{}'::jsonb),p_email,p_guest) returning * into existing;
  return to_jsonb(existing);
end $$;
revoke all on function public.reserve_payment_checkout(uuid,uuid,text,jsonb,text,boolean) from public,anon,authenticated;
grant execute on function public.reserve_payment_checkout(uuid,uuid,text,jsonb,text,boolean) to service_role;

-- Confirmation is tied to an exact registered attempt. A duplicate payment ID must
-- match provider, amount and CV; do not let ON CONFLICT silently authorize another CV.
create function public.complete_registered_cv_payment(p_attempt_id uuid,p_payment_id text,p_amount numeric,p_provider text,p_payer_email text,p_payment_type text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare a public.payment_checkout_sessions%rowtype; existing public.payments%rowtype; inserted boolean := false;
begin
  select * into a from public.payment_checkout_sessions where id=p_attempt_id;
  if not found or a.provider<>p_provider or a.provider_checkout_id is null then raise exception 'Unregistered payment'; end if;
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(a.profile_id::text,2));
  perform 1 from public.cvs where id=a.cv_id and profile_id=a.profile_id for update;
  if not found then raise exception 'CV ownership mismatch'; end if;
  if (p_provider='paypal' and p_amount<>2.99) or (p_provider='mercado_pago' and p_amount<>1999) or p_amount is null then
    raise exception 'Invalid amount';
  end if;
  insert into public.payments(user_id,cv_id,payment_id,amount,status,payer_email,payment_type,payment_method)
    values(a.profile_id,a.cv_id,p_payment_id,p_amount,'approved',p_payer_email,p_payment_type,p_provider)
    on conflict(payment_id) do nothing returning true into inserted;
  if not coalesce(inserted,false) then
    select * into existing from public.payments where payment_id=p_payment_id;
    if existing.cv_id is distinct from a.cv_id or existing.user_id is distinct from a.profile_id
       or existing.payment_method is distinct from p_provider or existing.amount is distinct from p_amount
       or existing.status not in ('approved','paid') then raise exception 'Payment association mismatch'; end if;
  end if;
  update public.cvs set status='paid' where id=a.cv_id;
  update public.payment_checkout_sessions set status='completed',updated_at=now() where id=a.id;
  return jsonb_build_object('payment_inserted',coalesce(inserted,false),'cv_status','paid');
end $$;
revoke all on function public.complete_registered_cv_payment(uuid,text,numeric,text,text,text) from public,anon,authenticated;
grant execute on function public.complete_registered_cv_payment(uuid,text,numeric,text,text,text) to service_role;

-- An issued checkout keeps its pending snapshot immutable, including direct Data API writes.
create function public.protect_checkout_snapshot() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if old.status='pending' then
    if new.cv_data is distinct from old.cv_data or new.template is distinct from old.template or new.foto_url is distinct from old.foto_url then
      if exists(select 1 from public.payment_checkout_sessions where cv_id=old.id) then
        raise exception 'Issued checkout snapshot is immutable';
      end if;
    end if;
  end if;
  return new;
end $$;
-- Pending snapshots are server-managed; paid edits keep their existing RLS permissions.
revoke all on function public.protect_checkout_snapshot() from public,anon,authenticated;
create trigger protect_checkout_snapshot before update of cv_data,template,foto_url on public.cvs
for each row execute function public.protect_checkout_snapshot();
