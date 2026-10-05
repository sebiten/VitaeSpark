-- Apply before deploying the new event producers. All historical names remain valid.
alter table public.analytics_events
  add column if not exists step_id text check (step_id in ('basic', 'summary', 'experience', 'education', 'skills')),
  add column if not exists stage text check (stage in ('landing', 'creator', 'form', 'generation', 'email', 'checkout', 'return', 'capture', 'webhook', 'download')),
  add column if not exists error_code text check (error_code in ('generation_limit', 'generation_http_error', 'generation_network_error', 'checkout_http_error', 'checkout_network_error', 'checkout_missing_url', 'guest_session_error', 'provider_error', 'capture_error', 'invalid_capture', 'return_cancelled', 'return_failure', 'verification_error', 'session_lost')),
  add column if not exists attempt_id uuid;

alter table public.analytics_events
drop constraint if exists analytics_events_event_name_check;

alter table public.analytics_events
add constraint analytics_events_event_name_check
check (
  event_name in (
    'landing_viewed', 'creator_entered', 'form_step_completed', 'generation_failed', 'payment_clicked', 'checkout_email_opened', 'payment_failed',
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


create index if not exists analytics_events_attempt_idx
  on public.analytics_events (attempt_id, created_at) where attempt_id is not null;
-- No RLS or privilege changes. Historical rows keep NULL diagnostic fields.
