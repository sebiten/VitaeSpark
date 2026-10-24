# Recuperación SEO: comparación del pico y primera intervención

Estado: intervención del 24 de octubre de 2026, con validación previa a publicación completada en el alcance detallado abajo y push autorizado por el propietario. Build de producción local aprobado. El despliegue y el nuevo rastreo de Google siguen pendientes de confirmación; no se efectuó una compra real.

## Fuentes y alcance

- Exportación del propietario: `C:/Users/Joaqoz/Desktop/FOTOS-REMERAS-Y-CHOMBAS/vitaespark.com-Performance-on-Search-2026-10-24 (1).zip`.
- Búsqueda Web, comparación de 24/5–20/6 con 24/9–21/10 de 2026: dos ventanas de 28 días.
- Páginas.csv permite comparar URLs; Consultas.csv compara consultas de toda la propiedad, sin cruzarlas por URL. Países y dispositivos son dimensiones independientes: no permiten atribuir un país a una página concreta.
- Los totales de 127 y 63 clics y de 20.141 y 11.530 impresiones proceden del histórico diario del primer ZIP, `vitaespark.com-Performance-on-Search-2026-10-24.zip`, sumado en esas mismas ventanas. No se obtienen sumando consultas, que omiten búsquedas anonimizadas.
- GSC Wizard rechazó las consultas por falta de suscripción activa. No se volvió a consultar el servicio.

## Diagnóstico

Los clics bajaron un 50,4 % y las impresiones un 42,8 %. El CTR agregado pasó de 0,63 % a 0,55 %. La pérdida de visibilidad pesa más que la reducción del CTR, pero las páginas tienen patrones distintos.

Datos de Páginas.csv, ordenados por pérdida absoluta de clics:

| Página | Clics antes → ahora | Impresiones antes → ahora | Posición antes → ahora |
| --- | ---: | ---: | ---: |
| /cv-para-mineria | 33 → 3 | 1.905 → 742 | 6,91 → 7,39 |
| /cv-para-operario | 15 → 6 | 1.544 → 517 | 8,45 → 10,76 |
| /cv-para-cajero | 8 → 0 | 1.695 → 234 | 9,74 → 17,52 |
| /cv-para-seguridad | 7 → 0 | 941 → 224 | 10,73 → 23,84 |
| /cv-para-administrativo | 8 → 2 | 3.017 → 418 | 14,70 → 22,13 |
| /cv-para-repositor | 6 → 1 | 1.016 → 650 | 7,53 → 8,77 |
| /cv-para-limpieza | 6 → 1 | 1.237 → 905 | 13,26 → 11,69 |
| /cv-para-atencion-al-cliente | 5 → 0 | 929 → 208 | 13,75 → 44,13 |

Minería perdió 30 clics con posición agregada casi estable y CTR de 1,73 % a 0,40 %. Esto no demuestra una penalización ni que un título explique toda la pérdida. La mezcla de consultas, demanda, países y resultados de búsqueda puede haber cambiado. La consulta visible «modelo de currículum vitae para minera pdf» pasó de 31 a 12 impresiones y mejoró de posición 7,55 a 4,33; registró cero clics en ambos períodos. Sirve como señal de intención, no como explicación de los 30 clics perdidos.

Operario, cajero y administrativo combinaron menos impresiones con peor posición media. «curriculum operario de produccion» pasó de posición 4,84 a 10,29; «curriculum auxiliar administrativo», de 15,98 a 27,20. Son consultas de la propiedad, no una atribución confirmada a esas URLs.

Limpieza mejoró su posición agregada mientras perdió clics; no conviene diagnosticar toda la caída como descenso de posiciones.

Argentina pasó de 30 a 12 clics, Perú de 19 a 3 y Chile de 16 a 1: 49 de los 64 clics netos perdidos. España pasó de 22 a 19. Conviene segmentar por país al investigar, sin atribuir estas pérdidas a minería por su temática. En móviles se pasó de 70 a 36 clics y en ordenador de 56 a 27: no es un fenómeno exclusivo de un dispositivo.

Hay ganadores: atención al cliente sin experiencia subió de 14 a 16 clics; cajero sin experiencia, de 3 a 8; hacer CV con IA, de 1 a 4. La coexistencia de ganadores y perdedores no demuestra canibalización.

## Cambios aplicados

Primera tanda: minería, operario, cajero y administrativo. Suman 53 clics perdidos, equivalentes al 82,8 % de la pérdida neta del sitio; no significa que sean el 82,8 % de todas las pérdidas brutas, porque otras URLs ganaron clics.

- `MarketingPage` incorpora una opción explícita `prioritizeExample`, activada solo en esas cuatro páginas.
- Su enlace desde la cabecera lleva directamente al encabezado del modelo completo en texto.
- El modelo existente se presenta una sola vez al comienzo del artículo, antes de la introducción y del CTA comercial contextual. Se conservan el hero, la oferta inicial, las imágenes, los demás apartados y la numeración.
- Minería tiene un título y una descripción que explican la posibilidad de copiar el modelo y exportarlo desde un editor. La introducción visible distingue esa alternativa de la descarga de pago del generador. No se promete un archivo PDF gratuito que no existe.
- No se añadieron URLs, redirecciones ni bloques repetitivos de contenido. Se conserva la indexación y los canonical.
- No se adelantaron fechas de modificación en el sitemap: esta tanda reordena contenido existente y aclara su presentación, sin crear un modelo nuevo.

Es una intervención de utilidad y presentación basada en la intención observada; no una causa probada ni una garantía de recuperación. Los modelos completos ya existían. Los cambios editoriales del 20 de octubre son demasiado recientes respecto del corte del 21 para evaluar su efecto.

## Verificación

- `pnpm lint`: aprobado, sin advertencias ni errores de ESLint. Next informa que el comando `next lint` está deprecado; no se migró la configuración en esta intervención.
- `pnpm exec tsc --noEmit --incremental false`: aprobado, incluida la prueba nueva.
- `pnpm build`: aprobado en la versión final, con compilación, lint, comprobación de tipos, generación de las 104 páginas y trazas de producción. Las cuatro páginas SEO siguen siendo estáticas.
- `pnpm test`: **203 pruebas aprobadas en 38 suites; 10 pruebas omitidas en una suite**. La suite omitida es `payment-recovery-db.test.ts`, condicionada a `PAYMENT_TEST_PGLITE`; no está instalada/configurada esa base PostgreSQL/WASM aislada. No se ejecutaron migraciones remotas.
- Los primeros intentos aislados de build y pruebas fallaron por `EPERM` al escribir `.next` y temporales de Vitest. Se repitieron fuera del aislamiento y pasaron; no se modificó código para ocultar esos errores.
- Nueva regresión `tests/seo-marketing.test.ts`: cuatro casos sobre las páginas reales. Comprueba prioridad del modelo, ancla única, contenido conservado, un H1, igual número de H2 y mismos textos y destinos de CTA con la opción activada/desactivada. También valida el orden predeterminado y ausencia del margen de ancla en las páginas no intervenidas.
- Durante esta revisión se restringió `scroll-mt-24` al modelo destacado. El cambio anterior alcanzaba encabezados de todas las páginas que usan el componente; ahora el comportamiento predeterminado se conserva.
- Revisión React: componente de servidor, sin nuevos efectos, estado, peticiones ni dependencias; claves estables.

### Revisión visual y SEO sobre el build local

Playwright con Chromium sobre `next start`, en **1440 × 1000** y **390 × 844**. Se inspeccionaron capturas de cabecera y modelo de las cuatro páginas, y se repitió la comprobación sobre la compilación final.

| Página | Desktop/mobile | Modelo | CTA principal | Canonical |
| --- | --- | --- | --- | --- |
| Minería | Sin desborde horizontal | Legible, una sola instancia, acceso directo | Visible; conserva su destino | https://vitaespark.com/cv-para-mineria |
| Operario | Sin desborde horizontal | Legible, una sola instancia, acceso directo | Visible; conserva su destino | https://vitaespark.com/cv-para-operario |
| Cajero | Sin desborde horizontal | Legible, una sola instancia, acceso directo | Visible; conserva su destino | https://vitaespark.com/cv-para-cajero |
| Administrativo | Sin desborde horizontal | Legible, una sola instancia, acceso directo | Visible; conserva su destino | https://vitaespark.com/cv-para-administrativo |

Las ocho vistas respondieron 200; no se detectaron imágenes rotas ni excepciones JavaScript de página. El enlace al modelo coloca su encabezado aproximadamente a 80 px del borde superior, debajo de la navegación fija. El CTA principal continúa antes del enlace secundario; el CTA contextual sigue presente después del ejemplo y la introducción. Esto verifica funcionamiento y presentación, no garantiza una tasa de conversión invariable.

Títulos y metadescripciones se comprobaron en el DOM renderizado: únicos, descriptivos y coherentes con cada profesión. Solo se modificaron los de minería. Su promesa de PDF se limita a copiar el ejemplo en un editor y exportarlo; se aclara que la descarga del generador tiene pago único. No se agregaron repeticiones de palabras clave ni se reescribieron los modelos.

Cada página tiene exactamente un H1, secciones H2 y subsecciones H3, sin saltos ascendentes de nivel. Canonical absoluto propio y robots `index, follow`. Los **23 destinos internos distintos** encontrados en el contenido principal devolvieron 200 al consultarlos localmente. No se alteraron canonical, robots, sitemap ni redirecciones.

Se comprobó en el HTML del build que las páginas ganadoras `/cv-atencion-al-cliente-sin-experiencia`, `/cv-para-cajero-sin-experiencia` y `/hacer-cv-con-ia` mantienen «Ver la guía» y no reciben el enlace nuevo al modelo.

Capturas y resultados detallados de la revisión local: `C:/Users/Joaqoz/.codex/visualizations/2026/10/24/01a16ea7-53f1-7c41-9dde-dd4345ee5012/`. Incluyen las capturas por profesión, los mosaicos `review-*-*.png` y `browser-audit-final.txt`. Son evidencias locales, no archivos de aplicación.

### CTA, generación y pagos: cobertura y límites

Se siguió el CTA principal de cada página en una sesión de prueba limpia, se eligió la plantilla recomendada y se abrió el formulario:

| Origen | Puesto precargado | Plantilla recomendada |
| --- | --- | --- |
| Minería | Minería | Operativa ATS |
| Operario | Operario/a de producción | Operativa ATS |
| Cajero | Cajero/a | Elegancia |
| Administrativo | Administrativo/a | Elegancia |

En las cuatro rutas se conservaron `intent=job-specific`, `role`, `landing_path`, `source_type=landing`, `cta_label=profession_hero_cta` y `lang=es`. Se capturaron los eventos `landing_viewed`, `landing_cta_clicked`, `creator_entered`, `template_selected` y `form_started` con la atribución correspondiente. Para no contaminar la analítica, las solicitudes de eventos de esta auditoría se interceptaron localmente: esto verifica su emisión y contenido, **no su persistencia en producción**.

La suite automatizada aprobada incluye generación de CV, primer empleo, edición y PDF, checkout de invitados, validación y acceso a pagos, confirmaciones de Mercado Pago y PayPal, recuperación, atribución y embudo. Son pruebas automatizadas con el aislamiento y simulaciones de cada suite; no equivalen a cobrar a través del proveedor real.

Limitaciones pendientes:

- No se realizó una generación real contra el servicio de IA ni una transacción completa en Mercado Pago/PayPal. No se certifica en esta revisión una integración externa de extremo a extremo.
- En `localhost`, el script de Vercel Analytics devuelve 404 y el intento inicial de analítica del servidor registró falta de IP para Arcjet. Son condiciones observadas en local; la recepción real de eventos debe comprobarse en un entorno desplegado. No se cambiaron analytics ni protecciones para forzar un resultado positivo.
- La suite opcional de PostgreSQL aislado sigue omitida. Los tests de confirmación, acceso y validación de pagos sí pasaron.
- No hay evidencia todavía de efecto sobre ventas o posicionamiento. Deben medirse después de publicar.

### Alcance del diff y preparación de publicación

El diff funcional queda en cinco archivos: las cuatro páginas y `components/seo/MarketingPage.tsx`. Se agregan la prueba de regresión y este informe. No hay cambios en APIs, precios, autenticación, generación, pagos, webhooks, esquema de base de datos, dependencias ni configuración de despliegue. `git diff --check` pasó.

La compilación local está preparada para publicación, con los límites externos indicados. El propietario autorizó el push a los repositorios configurados. El push no confirma que el despliegue haya terminado: registrar la revisión publicada, comprobar eventos y el recorrido hasta checkout en el entorno desplegado y, si se exige certificar al proveedor, ejecutar una transacción con credenciales de prueba. No marcar como validada una compra real a partir de los tests unitarios.

## Publicación y siguiente decisión

1. Publicar esta tanda y registrar fecha y revisión reales. Hasta entonces no afecta al sitio público.
2. Comprobar las cuatro URLs en producción: respuesta 200, título correcto, canonical propio, modelo visible y destino del enlace. Inspeccionar su versión en Google y el último rastreo.
3. Tomar una referencia de los 28 días completos anteriores a la publicación y compararla con 28 días completos posteriores al nuevo rastreo, dejando fuera los días de datos incompletos. El pico de mayo/junio sigue siendo la referencia histórica, no el control causal de esta intervención.
4. Medir por URL y después por consulta, país y dispositivo. En minería vigilar impresiones y CTR de las mismas consultas y segmentos; en operario, cajero y administrativo, también posiciones.
5. Para seguridad y atención al cliente, obtener consultas filtradas por cada URL general y su variante sin experiencia. Revisar coincidencias de intención y alternancia antes de consolidar o redirigir. Mantener las variantes que están creciendo.
6. Repositor y limpieza quedan como siguiente grupo para revisar presentación en resultados si mantienen posición y bajo CTR. No reescribir masivamente mientras se evalúa la tanda del 20 de octubre.

## Medición de los 28 días completos posteriores al rastreo

### Inicio y ventanas

- Registrar fecha/hora y revisión de publicación, y para cada URL el primer rastreo de Google posterior a esa publicación, mediante Inspección de URL. Confirmar que el contenido publicado es el aprobado; solicitar indexación no confirma que el rastreo haya ocurrido.
- Para cada URL, llamar **R** al día de ese rastreo según las fechas del informe de Search Console. Su ventana será **R+1 a R+28 inclusive**. El día parcial R queda fuera.
- Para un resultado agregado comparable de las cuatro URLs, usar como R el último de esos cuatro días de rastreo. No sumar cuatro ventanas con fechas distintas y presentarlas como un mismo período del sitio.
- Comparador reciente: 28 días completos previos al despliegue. Referencia histórica: 24/5–20/6. Registrar por separado el intervalo entre publicación y rastreo; no atribuirlo por completo a la nueva versión indexada.
- Cerrar la lectura cuando Search Console haya consolidado el último día, habitualmente 2–3 días después. No se asignan fechas de calendario hasta conocer publicación y rastreo reales. Conservar la misma zona horaria y filtros dentro de cada fuente.

### Métricas de tráfico y ventas

| Objetivo | Métrica | Fuente y precaución |
| --- | --- | --- |
| Recuperar visibilidad | Clics, impresiones, CTR y posición por URL | Search Console, Web; mismas consultas, país y dispositivo al interpretar cambios de posición |
| Recuperar minería | Impresiones y CTR de consultas comparables | Separar caída de demanda/cobertura de caída de posición; no usar solo posición agregada |
| Proteger entrada al creador | Sesiones con CTA / sesiones de landing; sesiones que entran al creador / sesiones de landing | Embudo por `session_id` y `landing_path`; contar sesiones únicas, no clics repetidos |
| Proteger generación | Sesiones con generación/preview correcta / sesiones que iniciaron el formulario; errores de generación | Eventos y diagnóstico existentes; distinguir eventos emitidos de generación confirmada |
| Proteger checkout | Intentos de checkout y pagos confirmados; fallos por proveedor | Registros de checkout y pagos; un evento del navegador no prueba que se cobró |
| Proteger ventas | Sesiones con pago confirmado / sesiones de landing; ingresos confirmados | Conciliar atribución con pagos, separar no atribuibles y monedas; no sumar ARS y USD |

Filtrar tráfico orgánico en GA4 mediante la fuente/medio de sesión o el canal Organic Search cuando esa información esté disponible y validada. `source_type=landing` solo describe el tipo de página: **no identifica tráfico orgánico**. Si el embudo interno no permite separar canales, reportarlo como todas las sesiones atribuidas a esas landings y no dividir sus ventas por los clics de Search Console. Anotar límites de atribución y comparar cobertura antes/después.

Mantener como referencia orientativa las páginas ganadoras sin editar, pero no tratarlas como un grupo de control experimental: tienen consultas e intenciones distintas. Registrar campañas, cambios de precio, caídas de proveedores y cualquier modificación simultánea que pueda influir en ventas.

### Revisiones y decisiones

- Publicación: comprobar HTTP, canonical, enlaces, CTA, atribución y recepción de eventos. Un error reproducible de creación, checkout o acceso al CV exige corregirlo o revertir la intervención sin esperar 28 días.
- Días 7, 14 y 21: revisar datos ya completos, cobertura de rastreo, errores y embudo. Lectura orientativa; no reescribir por oscilaciones de pocos clics.
- Día 28 consolidado: comparar valores absolutos y tasas frente a la referencia reciente e histórica. Mostrar numerador y denominador de cada conversión. Con pocos pagos, declarar resultado inconcluso en vez de asegurar una mejora o deterioro porcentual.
- Considerar favorable una recuperación de clics/impresiones que no venga acompañada de un deterioro consistente del embudo o ingresos comparables. Si crecen clics pero cae la conversión, revisar primero cambio de mezcla de tráfico, disponibilidad de proveedores y atribución; después evaluar la ubicación del CTA contextual.
- Si no mejora visibilidad, profundizar por consulta y URL antes de ampliar la intervención. La meta histórica de 127 clics corresponde a todo el sitio; para estas cuatro páginas la referencia de pico es **64 clics por 28 días**, frente a **11** en la comparación reciente.

Este documento define el seguimiento; no se creó una automatización ni se programaron revisiones sin conocer el día del nuevo rastreo.

Referencias: [diagnóstico de caídas de Google](https://developers.google.com/search/docs/monitor-debug/debugging-search-traffic-drops) y [títulos descriptivos en resultados](https://developers.google.com/search/docs/appearance/title-link). Google puede reescribir el título mostrado y los cambios requieren rastreo y evaluación.
