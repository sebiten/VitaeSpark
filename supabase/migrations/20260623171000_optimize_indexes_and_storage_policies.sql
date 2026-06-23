create index if not exists cv_recovery_emails_profile_id_idx
  on public.cv_recovery_emails (profile_id);

create index if not exists feedback_user_id_idx
  on public.feedback (user_id);

create index if not exists feedback_cv_id_idx
  on public.feedback (cv_id)
  where cv_id is not null;

drop index if exists public.payments_payment_id_unique;

drop policy if exists "foto-perfil nz2uei_0" on storage.objects;
drop policy if exists "foto-perfil nz2uei_1" on storage.objects;
drop policy if exists "s achmgl_0" on storage.objects;
drop policy if exists "s achmgl_1" on storage.objects;

create policy "Users can upload own profile photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'fotos-perfil'
  and (storage.foldername(name))[1] = 'fotos'
  and (storage.foldername(name))[2] = ('user-' || (select auth.uid())::text)
);

update storage.buckets
set file_size_limit = 2097152,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'fotos-perfil';
