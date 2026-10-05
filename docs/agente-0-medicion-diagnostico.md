# Agente 0 — Medición mínima y diagnóstico

## Estado actualizado — 5 de octubre de 2026

**Migración aplicada y verificada por MCP** en el proyecto `xkfpzmyhtsqvjnepkxrz`, identificado por la URL de Supabase configurada en el repositorio. Aunque no aparece en `list_projects`, las consultas directas al proyecto funcionan.

- SQL aplicado: contenido exacto de `20261004192228_analytics_minimal_funnel_diagnostics.sql`.
- Versión asignada por MCP en el historial remoto: **`20261005222944`**, nombre `analytics_minimal_funnel_diagnostics`.
- Verificado: cuatro columnas nullable y sin default; constraints validados con todos los eventos anteriores y nuevos; índice parcial por intento creado; RLS habilitado y ACL/políticas sin cambios.
- 808 eventos existentes tras la aplicación, todos con los nuevos campos en `NULL`. No se insertaron eventos de prueba ni se modificaron pagos.
- **No volver a aplicar esta migración.** El archivo local conserva su versión original. Antes de usar `db push`, revisar la correspondencia entre `20261004192228` local y `20261005222944` remota; el proyecto ya presenta otras diferencias históricas de versiones. No se reparó ni reescribió el historial automáticamente.
- No se hizo commit ni despliegue de la aplicación. La conciliación de los dos intentos y las credenciales/acceso de PayPal no se verificaron en esta operación. La falta de acceso a Supabase descrita abajo corresponde a la revisión inicial y ya quedó superada mediante consulta directa por MCP.

Las indicaciones posteriores de “pendiente de aplicar” documentan el estado previo; esta actualización las reemplaza para este proyecto.

Fecha: 4 de octubre de 2026. Alcance exclusivo: medición y diagnóstico. No se cambiaron precios, captura, autorización del pago, entrega, edición ni límites de generación.

## Contrato

Se conservan todos los nombres históricos. La migración agrega campos opcionales, sin reescribir eventos ni cambiar permisos/RLS:

- `step_id`: `basic`, `summary`, `experience`, `education`, `skills`.
- `stage`: etapa observada (`landing`, `creator`, `form`, `generation`, `email`, `checkout`, `return`, `capture`, `webhook`, `download`).
- `error_code`: catálogo cerrado; nunca se envía el mensaje de una excepción.
- `attempt_id`: UUID de `payment_checkout_sessions`, cuando existe. Antes de crear el intento se sigue la sesión; también se incluye `cv_id` cuando está disponible.

| Evento nuevo | Momento |
| --- | --- |
| `landing_viewed` | Montaje/navegación a una página comercial, aunque no haya clic ni campaña |
| `creator_entered` | Entrada a `/crear` |
| `form_step_completed` | Paso validado; el último se registra al enviar |
| `generation_failed` | Respuesta fallida o error de comunicación observado por el formulario |
| `payment_clicked` | Clic habilitado en pagar en el preview |
| `checkout_email_opened` | Apertura del formulario para ingresar email; **no** lectura de un email enviado |
| `payment_failed` | Error observado en checkout, preparación de invitado, captura o retorno/verificación |

Eventos históricos: `checkout_viewed` se muestra como **Vio oferta de pago**, `payment_started` como **Checkout creado** (incluye recuperar un enlace), `download_completed` como **Descarga solicitada**. No afirman apertura del proveedor, cobro ni descarga terminada. Los eventos de aprobación siguen siendo exclusivos del servidor.

Los emisores usan una lista de campos permitidos; descartan claves ajenas, emails en valores, parámetros/query y fragmentos de `landing_path`, y códigos diagnósticos desconocidos. Los productores nuevos no envían contenido del CV, email ni mensajes de error. No se modifica el historial ya almacenado. Los identificadores de sesión/CV/intento son datos seudónimos, necesarios para el diagnóstico.

## Funnel y fuentes

Visita comercial → creador → pasos → CV generado → preview/oferta → clic en pagar → formulario/email ingresado si corresponde → checkout creado → pago confirmado → descarga solicitada.

- Las tasas nuevas usan sesiones compartidas y orden temporal. No usan clics CTA como denominador de visitantes.
- Los pasos opcionales no se exigen para compradores registrados.
- Invitados: `is_guest = true` incluye usuarios anónimos con `user_id`; solo si falta el marcador se usa la ausencia histórica de `user_id`.
- Ingresos ARS/USD y transacciones salen de `payments` con estado `approved`/`paid`.
- Las métricas antiguas de pagos del panel también contrastan `payment_completed` con un pago confirmado, su referencia y CV/proveedor cuando están disponibles. Eventos huérfanos no suman conversiones.
- Sesiones convertidas: pagos confirmados vinculados a una sesión única por evento o por intento interno inequívoco. No se inventa una sesión cuando falta la atribución o hay conflicto.
- Intentos: registros de `payment_checkout_sessions`. Recuperar el mismo enlace y repetir `payment_started` no crea otra transacción ni otro intento en el informe.
- Los pagos confirmados sin evento aparecen separados. Pueden tener sesión recuperable desde el intento, aunque les falte el evento de aprobación.
- Recorridos muestran observaciones cronológicas y códigos; ausencia de eventos no demuestra abandono comercial. Fallos de cliente y servidor pueden describir el mismo incidente: no se suman como intentos distintos.
- Las campañas conservan sus marcadores históricos de visita y los deduplican con la nueva visita real por sesión/campaña. El funnel general nuevo solo toma `landing_viewed`.

## Diagnóstico de los dos intentos reales: pendiente externo

No se pudieron identificar las dos sesiones, sus proveedores, órdenes, capturas, entregas de webhook ni pagos internos. El conector de Supabase no ofrece el proyecto VitaeSpark y `SUPABASE_SERVICE_ROLE_KEY` está vacía en la configuración local. La consulta de lectura devolvió HTTP 401. `PAYPAL_CLIENT_ID` y `PAYPAL_SECRET` también están vacías. El usuario indicó continuar y documentar esta limitación.

Hay configuración local de Mercado Pago, pero faltan las referencias reales de los dos intentos. No se consultaron órdenes arbitrarias ni se realizaron cobros, capturas, reenvíos de webhook o conciliaciones que modifiquen datos.

La inspección de código confirma que PayPal captura en el retorno y el webhook procesa `PAYMENT.CAPTURE.COMPLETED`; esto **no prueba** que alguno de los dos intentos haya fallado por ese motivo. Su corrección corresponde a otro paquete y no se implementó aquí.

Cuando exista acceso de lectura: identificar las sesiones con `payment_started`, enlazar `cv_id`/`attempt_id` con `payment_checkout_sessions`, consultar la orden exacta en el proveedor, verificar captura y moneda/importe, revisar entrega y respuesta del webhook y contrastar `payments`/estado del CV. Registrar por separado “no pagado”, “confirmado sin atribución” y “estado externo no verificable”.

## Verificación y pendientes de publicación

- Pruebas dirigidas de funnel, emisores cliente/servidor, política, sesiones, atribución, diagnóstico de checkout, validación de pagos y checkout invitado.
- Cobertura: eventos repetidos, beacon sin duplicación con fetch, sesión invitada con `user_id`, pago sin evento, enlace reutilizado, proveedor/CV incorrecto, referencias nulas, historial sin proveedor, progresión temporal, privacidad y vocabulario completo de la migración.
- Typecheck: `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
- Resultado del cierre: **39 tests aprobados en 9 suites**, typecheck sin errores y `git diff --check` sin errores.
- No se ejecutó build ni lint. No se validó UI en navegador con datos reales ni se ejecutó la migración contra PostgreSQL.
- **Aplicar `20261004192228_analytics_minimal_funnel_diagnostics.sql` antes de desplegar el código.** No fue aplicada a ninguna base remota. Hasta entonces los campos/nombres nuevos no existen.
- El panel avisa si una consulta falla o devuelve menos filas que el conteo exacto; un informe truncado no sirve para conciliación contable. Ventanas: 30 días de métricas y hasta 60 días de referencias.
- Historial sin `is_guest` y con `user_id` no permite recuperar con certeza el carácter anónimo. Historial sin sesión no permite reconstruir visitas ni tasas nuevas.
- La atribución de confirmaciones PayPal busca el intento por orden exacta, CV y proveedor. Si falta la referencia o no es única, no asigna una sesión arbitraria. Los eventos antiguos ya guardados no se reescriben.
- Hay cambios ajenos previos en `package.json`, salidas de redes sociales y un script de Pinterest. No pertenecen a este paquete y deben excluirse de su commit.

## Archivos del paquete

- Panel: `app/abelardo/admin/page.tsx`.
- Contrato, privacidad y agregación: `lib/analytics-diagnostics.ts`, `lib/analytics-funnel.ts`, `lib/analytics-pages.ts`, `lib/analytics-event-policy.ts`, `lib/analytics-events.ts`, `lib/analytics-events-server.ts`, `app/api/analytics-event/route.ts`.
- Productores: `components/FunnelPageCapture.tsx`, `app/layout.tsx`, `components/CVFormWizard.tsx`, `components/CVFormStep.tsx`, `components/CVPreviewStep.tsx`, `app/pago/resultado/payment-result-client.tsx`.
- Diagnóstico de pagos: `lib/payment-analytics.ts`, `lib/mercado-pago-checkout.ts`, `app/api/create-payment/route.ts`, `app/api/create-payment-for-cv/route.ts`, `app/api/create-paypal-order/route.ts`, `app/api/paypal-return/route.ts`, `app/api/paypal-webhook/route.ts`, `app/api/webhook/route.ts`.
- Persistencia: `supabase/migrations/20261004192228_analytics_minimal_funnel_diagnostics.sql`.
- Verificación: `tests/analytics-funnel.test.ts`, `tests/analytics-transport.test.ts`, `vitest.config.ts`.
- Documentación: este archivo.

## Revisión de cierre y aplicación

Dictamen: migración compatible y segura según el esquema versionado del repositorio. **Lista para aplicar, no ejecutada ni validada contra producción.**

- No elimina tablas, columnas ni filas. El único `DROP` sustituye el `CHECK` de nombres de evento por su ampliación compatible.
- Las cuatro columnas nuevas aceptan `NULL`; no tienen defaults ni backfill que inventen diagnósticos históricos.
- Se conserva el vocabulario anterior y se agregan los siete eventos nuevos.
- No modifica RLS, políticas, grants ni funciones privilegiadas.
- El índice parcial `(attempt_id, created_at)` sirve para buscar el evento del intento confirmado; excluye el historial sin referencia. No duplica los índices existentes por sesión, usuario, país o nombre de evento.
- `ALTER TABLE`, validación de constraints y creación del índice pueden bloquear escrituras durante su ejecución. Aplicar en una ventana tranquila; no se conoce el volumen ni posibles divergencias del esquema remoto.

Correcciones finales: atribución de PayPal por orden exacta en lugar del último checkout del CV; conservación del CV devuelto por la API al registrar errores, sin esperar a `setState`; etiqueta del recorrido crudo “Evento de pago aprobado” para no presentar una observación huérfana como transacción confirmada. No cambian captura, autorización ni entrega.

Procedimiento recomendado, desde la raíz del proyecto, con Supabase CLI 2.119.0 (flags verificados mediante `--help`) y una conexión al proyecto correcto configurada en `SUPABASE_DB_URL`:

```powershell
supabase db push --db-url "$env:SUPABASE_DB_URL" --skip-vault --dry-run
```

Confirmar que el destino es VitaeSpark y que la lista pendiente incluye **solo** `20261004192228_analytics_minimal_funnel_diagnostics.sql`. Si aparecen otras migraciones o diferencias de historial, detenerse y revisarlas; no usar `--include-all` ni reparar el historial automáticamente.

Con ese resultado revisado:

```powershell
supabase db push --db-url "$env:SUPABASE_DB_URL" --skip-vault
supabase db push --db-url "$env:SUPABASE_DB_URL" --skip-vault --dry-run
```

La segunda simulación debe indicar que no hay migraciones pendientes. Verificar además en el SQL Editor del proyecto:

```sql
select column_name, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'analytics_events'
  and column_name in ('step_id', 'stage', 'error_code', 'attempt_id');

select conname, pg_get_constraintdef(oid)
from pg_constraint
where conrelid = 'public.analytics_events'::regclass and contype = 'c';

select indexdef from pg_indexes
where schemaname = 'public' and indexname = 'analytics_events_attempt_idx';

select relrowsecurity from pg_class
where oid = 'public.analytics_events'::regclass;
```

Esperado: cuatro columnas nullable y sin default, constraint con vocabulario histórico y nuevo, índice parcial y RLS habilitado. Recién entonces desplegar el código. Estos comandos son instrucciones para quien tenga acceso; no fueron ejecutados contra el proyecto real.

Commit: incluir únicamente los **27 archivos** del inventario anterior. Excluir `package.json` (script `pinterest:generate`), `scripts/generate-pinterest-pins.mts`, `output/facebook-direct-offers.txt` y todo `output/social/`. No usar `git add .`. No se hizo commit.
