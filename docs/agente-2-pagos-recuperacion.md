# Agente 2 — Pagos, cancelaciones y recuperación

Fecha: 5 de octubre de 2026. Proyecto: `F:\PROGR\vitaespark`. Base: Agente 0 (`93ccf15`) y cambios sin commit de Agente 1.

## Estado de entrega

Implementación y pruebas locales terminadas. **No está validado para publicar todavía**: falta aplicar la migración nueva en un entorno de prueba y verificar transacciones y notificaciones con los proveedores en sandbox. No se hizo commit, push, despliegue, captura, compra, reenvío de webhook ni envío de email real.

La migración de Agente 0 ya está aplicada; no se volvió a ejecutar. Las consultas remotas de esta tarea fueron exclusivamente SELECT en el proyecto `xkfpzmyhtsqvjnepkxrz`.

## Conciliación de los dos intentos reales

Se identificaron ambos mediante `analytics_events.payment_started`, su sesión, CV y registro en `payment_checkout_sessions`. Se contrastaron los pagos internos y accesos enviados. Fechas en Buenos Aires (UTC−3):

| Referencia | Intento del 7 de septiembre, 13:49 | Intento del 11 de septiembre, 05:01 |
| --- | --- | --- |
| Sesión analítica | `e0cb2dc8-2a21-442f-b1e2-99e58accc8c9` | `cf320f03-f329-4598-a7a2-1602c79fb757` |
| CV | `5c4e5e4e-269f-40a7-aea7-7cdfc85de0c0` | `f2d258c0-0035-494e-8dec-eaee4bc6eb06` |
| Intento interno | `3f63040d-7581-4d2a-92e0-7b89d0016a6d` | `f7bc8783-c98c-44c2-9bcf-361e4c586aba` |
| Orden PayPal | `9LD51790DT596022T` | `25R34395D0783592N` |
| Invitado | Sí | Sí |
| Estado interno del CV/intento | `pending` / `pending` | `pending` / `pending` |
| Filas en `payments` para el CV | 0 | 0 |
| Accesos con `purchase_claims.access_sent_at` | 0 | 0 |
| Clasificación | **Estado externo no verificable** | **Estado externo no verificable** |

En ambas sesiones aparecen `guest_email_submitted`, `payment_started` y `guest_checkout_created`. En las consultas de esos recorridos no aparecen confirmación, acceso enviado ni descarga solicitada. Eso demuestra el estado interno observado, **no que PayPal no haya cobrado**.

`PAYPAL_CLIENT_ID`, `PAYPAL_SECRET` y `PAYPAL_WEBHOOK_ID` están vacíos en la configuración local. No hubo acceso autenticado a Orders/Captures ni al historial de entregas de webhook de PayPal. No se usó el endpoint de retorno de la aplicación para investigar: podría capturar una orden y no está autorizado para estos dos intentos.

Pendiente concreto: con acceso de lectura al comercio/aplicación de PayPal, consultar las dos órdenes exactas, sus capturas e importe/moneda, y los eventos/entregas de `CHECKOUT.ORDER.APPROVED` y `PAYMENT.CAPTURE.COMPLETED` —incluyendo fecha, respuesta HTTP y reintentos—. Clasificar entonces como no realizado, confirmado sin atribución o todavía no verificable. Cualquier captura, reenvío o modificación de estos intentos requiere autorización específica.

Consultas de evidencia utilizadas, sin contenido de CV ni emails:

```sql
select e.session_id,e.cv_id,e.payment_provider,e.created_at,
       s.id as attempt_id,s.provider_checkout_id,s.status as attempt_status,
       c.status as cv_status,
       exists(select 1 from public.payments p
              where p.cv_id=e.cv_id and p.status in ('approved','paid')) as has_payment
from public.analytics_events e
left join public.payment_checkout_sessions s on s.cv_id=e.cv_id
left join public.cvs c on c.id=e.cv_id
where e.event_name='payment_started' and e.created_at >= '2026-09-01'
order by e.created_at desc limit 30;

select c.id,c.status,s.id as attempt_id,s.provider,s.provider_checkout_id,s.status,
       (select count(*) from public.payments p where p.cv_id=c.id) as payments_count,
       (select count(*) from public.purchase_claims pc
        where pc.cv_id=c.id and pc.access_sent_at is not null) as access_sent_count
from public.cvs c join public.payment_checkout_sessions s on s.cv_id=c.id
where c.id in ('5c4e5e4e-269f-40a7-aea7-7cdfc85de0c0',
               'f2d258c0-0035-494e-8dec-eaee4bc6eb06');
```

## Estados y recuperación

`GET /api/payment-status?cv_id=...` mantiene autenticación y propiedad. Sin sesión devuelve 401, sin exponer CV ni datos del pago. Conserva `cv`, `isGuest`, `accessSent`; agrega `paymentState`, `canRetry` y `recoveryUrl` cuando existe otra versión relacionada.

| Estado del servidor | Significado y acción |
| --- | --- |
| `paid` | Pago interno confirmado; habilita el CV pagado con su plantilla. |
| `pending` | Aprobación/captura pendiente verificada o compra de otra versión que debe recuperarse. No iniciar otro pago. |
| `unpaid` | No hay pago confirmado y el checkout consultado permite continuar. El reintento vuelve a verificar. |
| `expired` | El proveedor indica una orden cerrada/vencida o una preferencia vencida sin pagos pendientes encontrados. Puede reemplazarse el intento. |
| `failure` | Fallo/rechazo observado; revisar el CV antes de reintentar. |
| `unknown` | Falló la consulta, falta referencia, la respuesta no permite concluir o el resultado está incompleto. No emitir otro cobro a ciegas. |

La interfaz separa `checking`, `pending`, `cancelled`, `failure`, `expired`, `unpaid`, `paid`, `session_lost` y `error`. Un retorno `cancelled` solo se presenta como cancelación tras comprobar `unpaid`; no prevalece sobre un pago confirmado. `approved` en la URL nunca desbloquea nada.

Cada consulta del navegador tiene límite de 20 segundos. El polling de pendientes se detiene después de cinco consultas; quedan las acciones de volver a verificar y volver al CV. Al desmontar, se abortan consultas y temporizadores. El estado desconocido no se presenta como un pago rechazado.

Se conserva el borrador existente en `vitaespark_create_draft`. Si hay una revisión local, volver al CV la conserva. Si no hay borrador y el propietario recuperó el CV remoto, se prepara el preview con ese contenido y plantilla. Una confirmación tardía **no borra** un borrador más reciente. No se agregó otra plataforma de almacenamiento o emails.

El acceso invitado sigue usando `purchase_claims`, el email existente y `/acceso-cv` → `/auth/confirm` → `/acceso-cv/finalizar`. La cuenta permanente autenticada sigue siendo necesaria para reclamar el CV. Perder la sesión temporal no autoriza acceso por un simple ID de CV ni por parámetros de retorno.

## Versiones, enlaces e idempotencia

Se conserva el contrato de Agente 1: mismo contenido normalizado, foto, idioma y plantilla reutilizan el CV; un cambio crea otra fila y conserva la anterior. Los rechazos por CV ajeno, pagado o no pendiente permanecen. El ID histórico sin documento sigue funcionando.

Se agrega `purchaseKey?: UUID` a **ese mismo borrador** y al payload del checkout. Se genera/persiste antes de pagar, se conserva al editar, cambiar plantilla o recargar, y cambia al generar un CV nuevo. Resuelve la edición posterior a una respuesta perdida, cuando el cliente todavía no recibió `cvId`. Es una clave de correlación, nunca una credencial.

La migración agrega dos relaciones pequeñas con RLS y acceso solo de `service_role`:

- `payment_cv_versions`: CV → CV raíz de la compra.
- `payment_purchase_keys`: propietario + clave del borrador → raíz. Permite alias si dos borradores recuperan el mismo snapshot, sin desvincular una edición posterior.

`prepare_payment_cv` serializa por propietario mediante advisory lock transaccional. Compara JSONB normalizado y plantilla, verifica propiedad y evita crear otra fila al repetir una petición o perder su respuesta. `reserve_payment_checkout` usa el mismo bloqueo y reserva un solo intento pendiente entre versiones y proveedores de esa compra. Una versión pagada bloquea otra compra de su misma raíz.

**Decisión sobre enlaces anteriores:** no se reasigna ni modifica el contenido bajo una orden emitida. Si el enlace previo sigue cobrable, tiene un pago pendiente o no puede comprobarse, la nueva versión se guarda pero no obtiene otro enlace; se muestra “Revisar compra anterior”. Esto también puede impedir comprar inmediatamente una revisión después de cancelar un checkout: cancelar el navegador no anula la orden del proveedor. La edición manual y la elección de plantilla siguen disponibles.

Una orden cerrada/vencida verificable se marca `expired` y permite reservar otro intento. Una confirmación tardía se resuelve siempre con su intento, CV y plantilla originales. No se borran versiones ni órdenes como atajo. Las relaciones nuevas respetan los borrados/retención ya existentes mediante sus claves foráneas; no se cambió el cron de limpieza.

Para emitir la solicitud externa se toma un CAS persistido en `dispatch_started_at`. Dos clics o procesos no despachan simultáneamente la creación del mismo intento. El cliente también usa refs para bloquear clics y preparación de sesión invitada concurrentes.

- **PayPal:** reintento con la misma `PayPal-Request-Id`; espera mínima de 30 segundos tras un despacho ambiguo y ventana conservadora de cinco horas desde la reserva. Fuera de ella se bloquea la recreación automática. El email de la solicitud se toma del intento conservado.
- **Mercado Pago:** no se asume que `X-Idempotency-Key` vuelva idempotente crear preferencias. Ante una respuesta perdida se busca por referencia y se valida `metadata.attempt_id`; se guarda el ID recuperado y se vuelve a consultar el pago/vencimiento. Si no puede identificarse inequívocamente, se bloquea otro POST. Las preferencias nuevas vencen en una hora; tras confirmar el pago se solicita cerrar la preferencia exacta para limitar su reutilización.
- Rechazos de creación HTTP 400/401/403 sin orden devuelta cierran el intento fallido. Timeouts, respuestas incompletas, errores 5xx y otros estados ambiguos no lo cierran como si nada se hubiera creado.

`complete_registered_cv_payment` exige un intento registrado y comprueba proveedor e importe. Inserta el pago y marca el CV pagado en una transacción. La repetición del mismo `payment_id` debe coincidir con CV, propietario, proveedor, importe y estado; devuelve `payment_inserted=false`. Solo completa el intento exacto, sin completar arbitrariamente todas las órdenes del CV. Un trigger protege contenido, foto y plantilla de snapshots pendientes con checkout; los permisos existentes de edición del CV pagado siguen funcionando.

La entrega conserva la claim única por CV y la clave de idempotencia de Resend. El CAS de envío ahora compara también `updated_at`, para que dos procesos no recuperen simultáneamente un envío antiguo. La UI solo dice que el email fue enviado si hay evidencia de envío, no por una reserva de entrega en curso. Se elige un checkout completado para determinar el email de entrega.

## Confirmación de proveedores

`lib/paypal-confirmation.ts` es la única lógica de captura/confirmación, compartida por retorno, webhook y conciliación al reintentar:

1. Resuelve la orden exacta en `payment_checkout_sessions` con proveedor PayPal **antes de capturar**.
2. Consulta Orders en el servidor; verifica ID, intención `CAPTURE`, una única unidad, referencia al CV, US$2.99/USD y ausencia de referencias contradictorias.
3. Captura solo una aprobación real cuando corresponde. Tras respuesta perdida o captura concurrente vuelve a hacer GET; no considera la excepción prueba de fallo.
4. Confirma únicamente una captura `COMPLETED` con ID e importe/moneda correctos.
5. Ejecuta la confirmación transaccional, la entrega idempotente y los eventos existentes.

El webhook verifica firma también en desarrollo y atiende `CHECKOUT.ORDER.APPROVED` y `PAYMENT.CAPTURE.COMPLETED`. Para capturas usa `supplementary_data.related_ids.order_id`; no exige `resource.custom_id`. Las carreras de registro o errores transitorios responden 503 para permitir reintentos. No se modificó ninguna suscripción remota de webhooks.

Mercado Pago comparte su confirmación entre webhook y consulta. Obtiene el pago autenticado, valida $1.999 ARS, referencia, propietario y proveedor; resuelve el intento por metadata o por la preferencia de la merchant order. Los pagos pendientes no entregan ni habilitan otra orden. Si no puede cerrar la preferencia ya pagada, conserva el pago interno y deja la notificación reintentable.

`PAYPAL_ENVIRONMENT=sandbox|live` permite elegir explícitamente ambiente; si falta, se conserva el comportamiento anterior basado en `NODE_ENV`. Antes de pruebas transaccionales configurar expresamente `sandbox` y credenciales de prueba correspondientes.

## Presentación y conservación de contratos

Mercado Pago es la opción argentina; en región internacional solo aparece después de elegir Argentina. PayPal mantiene el precio US$2.99. El precio sigue visible en el botón y barra móvil. No se promete tarjeta sin cuenta PayPal.

Se conservaron español/inglés, precios, URLs públicas, metadatos y contenido SEO, límite de nuevas generaciones y derechos de edición/descarga. Se mantuvieron nombres y campos permitidos de analítica de Agente 0. No se mandan textos del CV, emails, claves de borrador ni mensajes de excepción a analítica. Los eventos de aprobación siguen siendo del servidor; la contabilidad sigue saliendo de `payments`.

## Verificación

Resultado final dirigido: **123 tests aprobados en 22 suites**. Incluye los contratos de Agentes 0 y 1, además de:

- Cancelación sin pago y cancelación aparente con pago confirmado.
- Parámetro `approved` sin autorización, estado desconocido y polling acotado.
- Pendiente real, vencimiento, misma versión, cambio de plantilla/contenido y confirmación tardía.
- Doble clic, reserva repetida, respuesta perdida, claves/alias de borrador y rechazo de otra compra relacionada.
- PayPal aprobado sin retorno, captura con respuesta perdida, webhook duplicado/sin custom_id, firma inválida y asociación/proveedor/importe/moneda incorrectos.
- Mercado Pago pendiente, validaciones y cierre repetido de la preferencia pagada.
- Acceso sin sesión original mediante el flujo existente de email y entrega concurrente con un solo envío simulado.
- Privacidad analítica y recorrido de edición sin regeneración.

La migración se ejecutó únicamente en **PostgreSQL/WASM aislado (PGlite)** con tablas de prueba. Sus diez tests ejercitan las funciones SQL, inserción única, relaciones de versiones, confirmación tardía, protección del snapshot y permisos de ejecución. PGlite usa una conexión: las llamadas concurrentes prueban intercalado de solicitudes en esa instancia, **no sustituyen una prueba de bloqueo entre conexiones/procesos en PostgreSQL de staging**. Los tipos relevantes del esquema real se contrastaron por SELECT, sin cambios remotos.

Typecheck: `node node_modules/typescript/bin/tsc --noEmit --incremental false`, aprobado. `git diff --check`, aprobado. No se ejecutó lint ni build.

Las llamadas a pagos, autenticación y correo de las pruebas fueron simuladas. No hubo transacciones sandbox ni reales, prueba de entrega de email real, navegación visual o validación de PDF nueva. Se instaló PGlite solo en un directorio temporal de pruebas; no se modificaron dependencias ni lockfile del proyecto.

Los tests y el typecheck se ejecutaron fuera del sandbox porque dentro hubo fallos de resolución de dependencias ya observados en Agente 1. Una tanda fue rechazada por la revisión automática por límite de uso; se reintentó tras la indicación del usuario y pasó.

Reproducción de pruebas SQL aisladas en PowerShell:

```powershell
npm install --prefix "$env:TEMP\vitaespark-payment-db-tests" --no-save --package-lock=false @electric-sql/pglite
$env:PAYMENT_TEST_PGLITE = "$env:TEMP\vitaespark-payment-db-tests\node_modules\@electric-sql\pglite"
node node_modules/vitest/vitest.mjs run tests/payment-recovery-db.test.ts
```

Sin `PAYMENT_TEST_PGLITE`, esa suite se omite explícitamente. Para el cierre se incluyó, no se omitió. La lista de las otras 21 suites corresponde a los archivos de pruebas nuevos y los tests dirigidos enumerados en `docs/agente-1-preview-edicion.md`.

## Condiciones antes de publicar y límites

1. Revisar y aplicar **solo la nueva migración** `20261005230057_payment_recovery.sql` primero en staging y después, con el procedimiento aprobado, en producción. Es requisito del código nuevo. No hacer `db push` indiscriminado: persisten las diferencias históricas de versiones documentadas por Agente 0; no reaplicar su migración ni reparar automáticamente el historial.
2. Probar con conexiones concurrentes reales en staging, RLS/roles reales y el recorrido completo contra sandbox: creación, cancelación, vencimiento, respuesta perdida, captura, webhook duplicado, entrega y reclamación de acceso.
3. Configurar PayPal sandbox y verificar la suscripción a los dos eventos indicados, firma y reintentos. Configurar credenciales de prueba de Mercado Pago y verificar búsqueda/expiración de preferencias y pagos pendientes. No usar las credenciales locales de Mercado Pago sin comprobar su ambiente.
4. Conciliar las dos órdenes reales en modo lectura. No convertirlas en fallidas por antigüedad ni capturarlas automáticamente durante el diagnóstico.
5. Un 404/timeout del proveedor **no prueba vencimiento**; esos casos quedan bloqueados para conciliación. Una preferencia ambigua de Mercado Pago o una creación PayPal sin ID fuera de la ventana de idempotencia requieren resolver su referencia antes de abrir otro cobro.
6. La política conservadora bloquea comprar otra versión mientras haya un enlace anterior activo. No implementa una cancelación remota inmediata de órdenes PayPal `CAPTURE`; no anuncia esa capacidad. La compra nueva continúa cuando la anterior está verificablemente cerrada y sin pago pendiente.
7. No se promete ausencia absoluta de cobros externos duplicados: preferencias históricas abiertas en varias pestañas y pagos iniciados antes del vencimiento pueden notificarse tarde; su comportamiento y la visibilidad de búsquedas deben validarse en sandbox. Se evita emitir órdenes nuevas ante incertidumbre conocida y se conserva cada transacción con su versión. Los enlaces históricos ya emitidos no fueron revocados en producción.
8. Borradores históricos sin ID ni clave, o sesiones anónimas perdidas antes de recibir cualquier referencia, no permiten reconstruir inequívocamente compras entre identidades/dispositivos. El acceso por email recupera una compra confirmada; no concede acceso al CV por conocer su UUID.
9. No se agregó una cola/outbox de analítica ni se cambió la política de retención del producto. Un fallo de analítica después del commit puede seguir dejando un pago confirmado sin evento; el panel de Agente 0 ya distingue ese caso. Tampoco se rediseñó la gestión de reembolsos o disputas.

## Archivos del paquete

Nuevos de Agente 2:

- `lib/paypal-confirmation.ts`, `lib/mercado-pago-confirmation.ts`, `lib/payment-recovery.ts`, `lib/checkout-response.ts`.
- `supabase/migrations/20261005230057_payment_recovery.sql`.
- `tests/paypal-confirmation.test.ts`, `tests/mercado-pago-confirmation.test.ts`, `tests/payment-recovery.test.ts`, `tests/payment-recovery-db.test.ts`, `tests/payment-result.test.ts`, `tests/payment-access.test.ts`, `tests/purchase-access-delivery.test.ts`.
- `docs/agente-2-pagos-recuperacion.md`.

Modificados por Agente 2:

- `app/api/create-payment/route.ts`, `app/api/create-payment-for-cv/route.ts`, `app/api/create-paypal-order/route.ts`.
- `app/api/payment-status/route.ts`, `app/api/paypal-return/route.ts`, `app/api/paypal-webhook/route.ts`, `app/api/webhook/route.ts`.
- `app/pago/resultado/payment-result-client.tsx`.
- `lib/paypal.ts`, `lib/mercado-pago-checkout.ts`, `lib/payment-checkout-session.ts`, `lib/purchase-access.ts`, `lib/schemas/cv.ts`.
- Integración sobre cambios de Agente 1: `components/CVPreviewStep.tsx`, `components/pdf/CVForm.tsx`, `lib/create-flow-state.ts`, `lib/payment-cv.ts`, `tests/payment-cv-snapshot.test.ts`, `tests/preview-editing.test.ts`.

Se preservaron los otros archivos de Agente 1 y los cambios ajenos en `package.json`, `output/` y `scripts/generate-pinterest-pins.mts`. El diff contra HEAD incluye esos cambios anteriores y no representa únicamente este paquete. No se hizo commit ni push.

## Fuentes oficiales consultadas

- [PayPal: flujo de Orders y captura](https://developer.paypal.com/api/rest/integration/orders-api/).
- [PayPal: idempotencia y solicitudes simultáneas](https://developer.paypal.com/api/rest/reference/idempotency/).
- [PayPal: creación de órdenes](https://developer.paypal.com/api/orders/v2/orders-create).
- [PayPal: ventana de idempotencia de creación](https://developer.paypal.com/api/rest/integration/orders-api/api-use-cases/advanced/).
- [PayPal: eventos de aprobación y captura](https://developer.paypal.com/api/rest/webhooks/event-names/).
- [PayPal: disponibilidad condicionada de Guest Checkout](https://www.paypal.com/ca/cshelp/article/how-do-i-accept-cards-with-checkout-using-the-guest-checkout-option--help307).
- [Mercado Pago: preferencias y vencimiento](https://www.mercadopago.com.ar/developers/es/docs/checkout-bricks/payment-brick/advanced-features/preferences).
- [Mercado Pago: búsqueda de preferencias y pagos](https://www.mercadopago.com.ar/developers/en/reference/online-payments/checkout-pro-preferences/overview).
- [Supabase: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) y [changelog](https://supabase.com/changelog).
