# Conciliación de payment_recovery

Fecha: 8 de octubre de 2026. Proyecto Supabase: `xkfpzmyhtsqvjnepkxrz`.

La migración `20261005230057_payment_recovery.sql` ya tenía sus objetos creados, pero no figuraba en el historial remoto. Se verificaron las dos tablas con RLS, claves e índices, `dispatch_started_at`, cuerpos y firmas de las cuatro funciones, permisos y trigger activo. Las funciones son SECURITY INVOKER con search_path vacío; anon y authenticated no tienen EXECUTE. Las tablas no dan acceso a esos roles. service_role conserva permisos amplios por los privilegios predeterminados existentes.

Con autorización explícita del usuario se insertó exclusivamente `(version, name) = ('20261005230057', 'payment_recovery')` en `supabase_migrations.schema_migrations`, mediante MCP execute_sql y ON CONFLICT DO NOTHING. No se ejecutó el archivo de migración ni se alteraron objetos o datos de negocio. El listado MCP posterior confirma el registro. El campo statements se dejó sin contenido: esta operación registra una aplicación existente, no ejecuta ni reconstruye SQL.

Esta actualización reemplaza el pendiente de aplicar esta migración mencionado en los informes de Agentes 2 y 3. No debe reaplicarse. Las diferencias históricas de otras migraciones no se conciliaron y requieren revisión independiente antes de un db push general.

Se puede continuar con el desarrollo del Agente 4. Siguen pendientes las pruebas transaccionales sandbox y entrega de email, el estado externo de dos intentos históricos de PayPal, el visor PDF de escritorio y una muestra de generación real. No se declara listo para publicar.

Referencia del procedimiento de reparación del historial: https://supabase.com/docs/reference/cli/supabase-migration-repair
