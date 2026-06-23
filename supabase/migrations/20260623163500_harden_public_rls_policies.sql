drop policy if exists "Webhook puede leer" on public.cvs;
drop policy if exists "Permitir actualización por ID" on public.cvs;
drop policy if exists "Usuarios pueden insertar sus propios CVs" on public.cvs;

create policy "Users can view own CVs"
on public.cvs
for select
to authenticated
using ((select auth.uid()) = profile_id);

create policy "Users can insert own CVs"
on public.cvs
for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Webhook puede insertar" on public.payments;
drop policy if exists "Users can view their own payments" on public.payments;

create policy "Users can view their own payments"
on public.payments
for select
to authenticated
using ((select auth.uid()) = user_id);

revoke execute on function public.handle_new_profile() from public;
revoke execute on function public.handle_new_profile() from anon;
revoke execute on function public.handle_new_profile() from authenticated;
