# Agente 4 — Oferta, confianza y plantillas

Fecha: 8 de octubre de 2026. Alcance exclusivo del paquete 4, integrado sobre los cambios locales de los agentes 1, 2 y 3. Sin commit, push, despliegue, build, lint ni operaciones remotas de administración, pagos o migraciones.

## Resultado

- `CommercialOffer` reutiliza «Creación y vista previa sin costo. PDF final por [precio]. Pago único, sin suscripción.» y su equivalente en inglés. Usa `PRICING` y `useMarket`, incluidas las cookies de país y elección regional del checkout. Antes de resolver la región en el cliente muestra ambos precios con su región, evitando atribuir un precio internacional a una visita argentina en el HTML estático.
- Oferta junto al CTA principal de las landings que usan `MarketingPage`, incluida minería mediante `LandingOffer`; en el selector, el formulario directo y el resumen del checkout. No se modificaron importes: $1.999 ARS y US$2.99.
- Selector: crear y previsualizar no exige registro, de acuerdo con la API de generación. El mensaje de compra cambia con `guestCheckoutEnabled`: email para compra invitada o inicio de sesión para comprar. La generación invitada no depende de esa bandera de checkout.
- Checkout: un resumen de compra especifica un CV, edición posterior y nuevas descargas con la plantilla elegida. Se mantienen acciones de edición, cambio de plantilla, selección regional, email, sincronización de foto, recuperación y barra móvil de precio/pago. El chequeo de claridad queda disponible en un bloque desplegable.
- Se retiran del checkout los ejemplos comerciales repetidos y el segundo listado de beneficios. `ConversionProof` y su fuente de opiniones consentidas no se modifican: sus ejemplos identificados y opiniones reales siguen disponibles en las demás superficies que lo usan.
- Soporte (`soporte@vitaespark.com`) y política vigente (`/reembolsos`, alias `/refund` en el enlace inglés) quedan al lado del bloque de pago. No se modificó la política, no se añadieron garantías ni promesas sobre tarjetas sin cuenta PayPal.
- Eliminados los precios tachados y sus campos obsoletos; retirada la cifra estática de 500 personas de home y ofertas de Facebook, sin sustituirla por otra estimación.
- Cada una de las siete tarjetas del catálogo tiene «Usar esta plantilla». Se reutiliza el enlace con atribución existente y se conserva `template` junto a sus parámetros analíticos.

## Entrada con plantilla y conservación del borrador

- `/crear?template=harvard` abre directamente el formulario Harvard cuando no hay borrador. La validación usa el catálogo existente tanto en la página como en el componente. Valores inválidos, incluida capitalización distinta, recuperan el selector normal. No se modifica el recorrido sin plantilla explícita.
- Se mantienen puesto e intención de entrada, incluido `first-job`. Una plantilla no cambia el modo de experiencia: el formulario nuevo sigue en `with-experience` hasta la elección explícita del usuario.
- Con un borrador válido y plantilla explícita, aparece una elección antes de restaurar o escribir datos: continuar el borrador o empezar de nuevo. Salir de esa pantalla no modifica el borrador.
- Continuar restaura contenido original y generado, plantilla del borrador, puesto, intención, modo de experiencia, foto y referencias `pendingCvId`/`purchaseKey`. No mezcla una transferencia de habilidades pendiente ni ejecuta una generación automática por el parámetro de retorno. Una transferencia anterior queda consumida para que tampoco se mezcle al recargar.
- Empezar de nuevo requiere pulsar el botón explícitamente, descarta el borrador y su foto local y abre la plantilla y contexto de la nueva entrada.
- **Barrera conservadora de reinicio:** si el borrador tiene `pendingCvId` o `purchaseKey`, el reinicio está deshabilitado. Se invita a continuar para revisar/recuperar la compra. Una clave sola puede representar una respuesta de checkout perdida; no demuestra que hubo pago, pero tampoco permite descartar su identidad con seguridad. Esto también puede bloquear reiniciar un CV generado que todavía no llegó al pago. No se consulta ni captura una orden para habilitar el reinicio.
- Se conserva un formulario que solo tenga la elección explícita sin experiencia; el guardado tampoco elimina un borrador vacío si conserva CV generado o referencias de compra.

## Contratos preservados

- Editor manual sin IA, Guardar/Cancelar y persistencia en el almacenamiento existente. No se modificaron el editor, los proveedores ni la lógica de comparación de snapshots de pago.
- Checkout recibe el contenido y plantilla revisados. Las identidades de compra y barreras entre versiones se mantienen al continuar, editar o cambiar plantilla.
- `experiencia: []`, formación opcional y compatibilidad histórica continúan funcionando; no se añadieron secciones ficticias.
- No se añadieron eventos nuevos ni datos de CV/emails a analítica. Los enlaces usan los emisores existentes.
- URLs públicas existentes, títulos, H1, canonicals, textos editoriales, enlaces internos anteriores y datos estructurados se mantienen. Se añadieron CTAs y el texto comercial sin reescribir artículos ni metadatos.

## Verificación

- **51 pruebas aprobadas en cinco suites:** `template-entry`, `preview-editing`, `first-job`, `seo`, `job-landing`.
- La suite nueva contiene **21 pruebas**: las siete plantillas válidas; entradas inválidas y sin parámetro; puesto/intención; continuar y reiniciar; bloqueo por cada referencia de compra; compatibilidad de formularios antiguos; transferencia de habilidades y retorno de generación ignorados al continuar; región e inglés; mensaje de checkout invitado activado/desactivado.
- Último ajuste: repetidas las 21 pruebas nuevas con una transferencia de habilidades válida y el fallback regional inicial, todas aprobadas.
- Regresión de preview: Guardar/Cancelar, edición sin generación, referencias estables, cambio de plantilla y payload exacto de checkout. React/DOM real; generación, PDF, autenticación y llamadas de pago simulados. No son transacciones sandbox.
- Pruebas SEO/landings y revisión del diff: sin cambios en metadatos, estructuras de datos ni contenido editorial. Catálogo real en navegador: los siete enlaces conservan el ID y la atribución; clic en Harvard abre el formulario Harvard con oferta visible.
- Navegador integrado: revisados entrada directa y checkout local con fixture, resumen, oferta ARS/USD, cambio regional y barra móvil. Sin desbordamiento horizontal observado. El navegador aplicó escala: configuración móvil 390×844, viewport CSS observado 325×703; configuración escritorio 1440×1000, ancho CSS observado 1200. Precio y CTA legibles en ambas vistas.
- **Visor PDF de escritorio pendiente:** el iframe vuelve a quedar en blanco en el navegador integrado. La vista de lectura móvil sí muestra el fixture. No se atribuye validación del PDF a esta revisión.
- Typecheck (`tsc --noEmit --incremental false`) aprobado y `git diff --check` sin errores. Sin build ni lint.
- El sandbox produjo errores de temporales EPERM en Vitest y resolución incompleta de tipos de dependencias. Las verificaciones indicadas pasaron fuera del sandbox. La revisión de escritorio se interrumpió por límite de créditos de la revisión automática y se completó tras la indicación del usuario.
- Página temporal `app/agent4-review/page.tsx` y su tipo generado retirados; navegador de prueba cerrado y servidor local detenido. Los eventos locales usaron el mecanismo existente; el servidor informó que no pudo registrar analítica. No se generó con IA, inició checkout, compró, envió correo ni alteró información de negocio remota.

## Archivos propios

Nuevos: `components/CommercialOffer.tsx`, `tests/template-entry.test.ts` y este informe.

Modificados: `app/crear/page.tsx`, `app/plantillas-curriculum/page.tsx`, `components/TemplateSelector.tsx`, `components/pdf/CVForm.tsx`, `components/CVPreviewStep.tsx`, `components/seo/MarketingPage.tsx`, `components/seo/LandingOffer.tsx`, `components/WelcomeHero.tsx`, `components/FacebookOfferPage.tsx`, `lib/pricing.ts`.

Los cambios previos en creador, preview y `MarketingPage` se conservaron; su diff contra HEAD incluye trabajo de otros agentes. También se conservaron todos los demás cambios locales previos, incluidos los de `package.json` y `output/`.

## Pendientes externos y publicación

`payment_recovery` ya está aplicada y su versión `20261005230057` fue conciliada el 8 de octubre de 2026, según `docs/conciliacion-payment-recovery.md`. Reemplaza los pendientes antiguos de los agentes 2 y 3. No se reaplicó esta migración ni la de medición; no se hizo `db push` ni otra reparación histórica.

Persisten las verificaciones sandbox de pagos/correos, el estado externo de los dos intentos históricos de PayPal, el visor PDF de escritorio y una muestra de generación real. No se tocaron esos intentos ni se implementó Agente 5. **El producto no se declara listo para publicar.**
