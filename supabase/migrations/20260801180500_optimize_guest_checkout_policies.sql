create index if not exists purchase_claims_target_profile_id_idx
  on public.purchase_claims (target_profile_id)
  where target_profile_id is not null;

drop policy if exists "Permanent users can read own payments" on public.payments;
create policy "Permanent users can read own payments"
on public.payments
as restrictive
for select
to authenticated
using (
  (select auth.uid()) = user_id
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) is false
);

drop policy if exists "Permanent users can read own feedback" on public.feedback;
create policy "Permanent users can read own feedback"
on public.feedback
as restrictive
for select
to authenticated
using (
  (select auth.uid()) = user_id
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) is false
);

drop policy if exists "Permanent users can insert own feedback" on public.feedback;
create policy "Permanent users can insert own feedback"
on public.feedback
as restrictive
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
  and coalesce(((select auth.jwt()) ->> 'is_anonymous')::boolean, false) is false
);
