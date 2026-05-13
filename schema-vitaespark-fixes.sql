-- VitaeSpark: Índices y correcciones FK (idempotente)
-- Ejecutar en SQL Panel de Supabase

-- ============================================
-- analytics_events indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_cv_id ON public.analytics_events(cv_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_user_created ON public.analytics_events(user_id, created_at DESC);

-- ============================================
-- cvs indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_cvs_profile_id ON public.cvs(profile_id);
CREATE INDEX IF NOT EXISTS idx_cvs_status ON public.cvs(status);
CREATE INDEX IF NOT EXISTS idx_cvs_created_at ON public.cvs(created_at);
CREATE INDEX IF NOT EXISTS idx_cvs_profile_created ON public.cvs(profile_id, created_at DESC);

-- ============================================
-- payments indexes
-- ============================================
CREATE INDEX IF NOT EXISTS idx_payments_cv_id ON public.payments(cv_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_status ON public.payments(user_id, status);

-- payments.payment_id UNIQUE constraint already exists (implied by UNIQUE in table)

-- ============================================
-- Notes
-- ============================================
-- Los UUIDs v4 (gen_random_uuid()) pueden causar fragmentación en tablas grandes.
-- Si analytics_events crece a >100k registros, considerar migración a uuid_generate_v7().