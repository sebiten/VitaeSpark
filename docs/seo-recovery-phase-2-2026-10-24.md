# Recuperación SEO: segunda intervención independiente

Estado: segunda tanda validada el 24/10/2026 y autorizada para commit local. Push y despliegue pendientes de aprobación del propietario. Primera tanda comprobada en producción por su contenido público; no se verificó el identificador del deployment ni su hora de publicación.

## Datos y límites

Fuente primaria: `C:/Users/Joaqoz/Desktop/FOTOS-REMERAS-Y-CHOMBAS/vitaespark.com-Performance-on-Search-2026-10-24 (1).zip`, leído directamente, archivos Páginas.csv y Consultas.csv. Búsqueda Web; comparación 24/5–20/6 con 24/9–21/10 de 2026, ambas de 28 días. No se atribuyen consultas agregadas a una URL.

| URL | Clics anteriores → recientes | Impresiones | Posición media |
| --- | ---: | ---: | ---: |
| /cv-para-seguridad | 7 → 0 | 941 → 224 | 10,73 → 23,84 |
| /cv-para-atencion-al-cliente | 5 → 0 | 929 → 208 | 13,75 → 44,13 |
| /cv-para-seguridad-sin-experiencia | 2 → 2 | 186 → 517 | 9,64 → 12,10 |
| /cv-atencion-al-cliente-sin-experiencia | 14 → 16 | 1.470 → 917 | 10,89 → 10,49 |

Las dos generales perdieron 12 clics y 1.438 impresiones, calculados de Páginas.csv. La pérdida de posiciones agregadas justifica investigar relevancia y cobertura, pero no demuestra una causa única. El contenido actual incorpora cambios de octubre: no puede tratarse como si hubiera sido el mismo durante toda la caída.

La consulta agregada «curriculum atencion al cliente» pasó de 419 a 201 impresiones, con posición 14,44 → 14,72; «curriculum vigilante de seguridad», de 47 a 73 impresiones y 26,13 → 24,01. Ambas tuvieron cero clics en ambas ventanas. Esa evolución no coincide con la posición media de las generales: cambia la mezcla de consultas y/o las URLs que aparecen. No equivale a probar que una variante esté sustituyendo a otra.

GSC Wizard `list_sites` devolvió `payment_required / subscription_required`. No se repitieron llamadas bloqueadas. Para inspección de Google y consultas por URL hace falta reactivar una suscripción/prueba de GSC Wizard y mantener conectada la cuenta de Search Console, o aportar las exportaciones/inspecciones desde Search Console. No se certifican último rastreo, canonical elegido por Google, cobertura indexada ni ausencia de problemas históricos.

## Producción y rastreo técnico

Lecturas HTTPS directas el 24/10/2026, fuera del aislamiento de red después de que el entorno restringido fallara al resolver el host. Ese fallo local no se interpreta como caída del sitio.

- Las cuatro páginas protegidas (minería, operario, cajero, administrativo), las dos generales investigadas y sus dos variantes respondieron HTTP 200, con canonical absoluto propio y meta robots `index, follow`; sin cabecera X-Robots-Tag restrictiva.
- Las cuatro protegidas muestran el enlace «Ver modelo completo en texto», cada ancla existe una sola vez y el modelo está antes de la introducción en el HTML del artículo. Un H1 por página. Minería muestra el título nuevo «CV para minería: modelo para copiar y pasar a PDF». Esto confirma que el comportamiento distintivo de la primera intervención está público.
- robots.txt y sitemap.xml responden 200. Las ocho URLs están en el sitemap; la regla general permite su rastreo. No hay bloqueo técnico observable en estas comprobaciones.
- Se verificaron HTTP 200 para la guía de adaptación a vacantes, recepción y call center, destinos nuevos o reenfocados de esta tanda.
- Esto no es una inspección de URL de Google, un análisis de logs de Googlebot ni un rastreo exhaustivo del dominio. No se solicitó indexación.

## Competencia e intención

Búsquedas realizadas: «curriculum vigilante seguridad ejemplo experiencia habilidades» y «curriculum atención al cliente ejemplo experiencia habilidades». Muestra de competidores encontrados y páginas leídas el 24/10/2026; no es un ranking localizado de Google para Argentina, Perú o Chile ni permite conocer sus clics/posiciones históricas.

| Competidor | Propuesta observada | Diferencia útil para VitaeSpark |
| --- | --- | --- |
| [CVonline: vigilante](https://cvonline.me/es/curriculum-online/ejemplos/vigilante-de-seguridad) | Modelo en PDF/texto y perfiles copiables; ejemplos de experiencia y especialización. | El modelo completo de VitaeSpark ya existía. Faltaban fragmentos diferenciados por consorcio, planta y CCTV para adaptar una experiencia concreta. |
| [Jobseeker: vigilante](https://www.jobseeker.com/es/curriculum-vitae/ejemplos/vigilante-seguridad) | Comparación de experiencias vagas y específicas, logros cuantificados y habilidades técnicas. | Dar alternativas útiles sin métricas: tareas, registro y entrega de turno. No inducir a copiar porcentajes ni funciones de supervisión ajenas. |
| [Indeed: atención al cliente](https://es.indeed.com/orientacion-laboral/cv-cartas-presentacion/curriculum-atencion-cliente-ejemplo) | Plantilla y trayectoria ilustrativa desde call center hasta responsable de equipo; funciones y habilidades. | Separar atención por canal y alcance real del puesto, con campos editables y sin confundir atención con ventas o supervisión. |
| [AyudaCV: atención al cliente](https://www.ayudacv.es/ejemplos-de-curriculum/atencion-al-cliente) | Guía, ejemplo, elementos del CV y acceso al creador. | Mantener la conexión al creador y resolver antes una tarea concreta: redactar experiencia propia para mostrador, teléfono, chat o posventa. |

La intención compartida es obtener un ejemplo y saber cómo redactar perfil, experiencia y habilidades. No se necesita otra guía extensa ni repetir palabras clave. La oportunidad editorial identificada es transformar listas de tareas en fragmentos utilizables y distinguir los contextos de trabajo.

## Conflictos de intención

Atención general ya declara que se dirige a personas que atendieron clientes; la variante aborda primer empleo y actividades informales. Seguridad general repetía consejos para principiantes: ese bloque ahora deriva brevemente a la guía específica, conservando el enlace existente. Las variantes permanecen intactas.

No se consolidan URLs ni cambian canonical, títulos o redirecciones. Para probar canibalización se necesitan consultas filtradas por cada URL en ambas ventanas y evolución por fecha, con país/dispositivo comparables. Dos páginas visibles para una consulta tampoco bastan: hay que verificar alternancia y pérdida conjunta. La variante de seguridad conserva clics mientras crece en impresiones; la de atención gana clics. No hay evidencia suficiente para sacrificar ninguna.

## Enlaces internos

Auditoría del código con `rg`: enlaces literales `href` en páginas de `app`, no censo de todos los enlaces dinámicos del sitio. Seguridad recibe enlaces de minería y seguridad sin experiencia. Atención recibe enlaces de 11 páginas: curriculum-ats, curriculum-sin-experiencia, call center, atención sin experiencia, administrativo sin experiencia, cajero, cajero sin experiencia, habilidades blandas, recepcionista, recepcionista sin experiencia y vendedor.

- Seguridad no está huérfana, pero su conexión editorial es limitada. Oportunidad futura: enlace contextual desde recepción cuando se explique la diferencia entre recibir visitantes y vigilar accesos. Se difiere hasta comprobar el rendimiento de esa fuente; no se modifica una tercera página a ciegas.
- Atención ya recibe enlaces de roles próximos. Más enlaces indiscriminados no resuelven por sí solos su pérdida de posiciones.
- En ambas generales se sustituye un enlace genérico de primer empleo, redundante con la variante específica, por la guía de adaptación a una vacante. Se precisan los textos y descripciones de recepción y call center para orientar según las tareas.
- No se insertan enlaces entrantes desde las cuatro protegidas ni las páginas ganadoras. Los ajustes usan el bloque de relacionados existente; no se presentan como enlaces nuevos dentro del cuerpo del artículo.

## Intervención y prioridad

1. Seguridad: dos perfiles según función; tres fragmentos de experiencia para consorcio, planta y CCTV; habilidades con evidencia; distinción de formación, habilitación y disponibilidad. Reemplaza consejos repetidos y mantiene el modelo completo.
2. Atención: cuatro fragmentos para chat/correo, llamadas, mostrador y posventa; competencias vinculadas a tareas y herramientas; ejemplos con y sin métricas comprobables. Conserva perfil, modelo completo y CTA.

Los fragmentos se pueden seleccionar y copiar como texto HTML, sin registro ni JavaScript. No se añadió botón de portapapeles ni se promete un PDF gratuito. Son modelos ilustrativos para adaptar a experiencias reales del visitante, no testimonios o empleos verificados de terceros.

Archivos funcionales: `app/cv-para-seguridad/page.tsx` y `app/cv-para-atencion-al-cliente/page.tsx`. Pruebas: `tests/seo-marketing.test.ts`. Informe: este archivo. Sin cambios al componente compartido, páginas protegidas, ganadoras, pagos, APIs, dependencias o configuración.

## Verificación inicial

- `pnpm exec vitest run tests/seo-marketing.test.ts tests/seo.test.ts`: **11 pruebas aprobadas, 2 suites**. El primer intento no ejecutó pruebas por EPERM en temporales; repetición fuera del aislamiento aprobada.
- Incluye las cuatro regresiones de la primera tanda y dos comprobaciones nuevas sobre las páginas editadas: contenido renderizado en servidor, un H1, IDs únicos, anclas existentes, destinos locales y parámetros de atribución en CTA.
- Pruebas SEO existentes: metadatos, base URL y redirecciones. `git diff --check`: aprobado.
- Revisión React: se mantienen componentes de servidor, sin hooks, estado, dependencias o cambios de estructura visual. No se ejecutaron build ni lint por tratarse de cambios editoriales acotados. No hubo prueba visual de navegador ni compra real; estas verificaciones no certifican el embudo externo ni una mejora de conversión.

## Validación completa antes del commit (24/10/2026)

Solicitada expresamente por el propietario después de la revisión inicial:

| Comprobación | Resultado |
| --- | --- |
| `pnpm lint` | Aprobado, sin errores ni advertencias de ESLint. Next advierte que `next lint` está deprecado; no se cambia la configuración en esta tanda. |
| `pnpm exec tsc --noEmit --incremental false` | Aprobado. |
| `pnpm build` | Aprobado: compilación, tipos y generación de 104 páginas. Ambas landings siguen estáticas. Advertencia no bloqueante de caché de webpack por serialización de cadenas grandes. |
| `pnpm test` | 205 pruebas aprobadas en 38 suites; 10 omitidas en la suite opcional `payment-recovery-db.test.ts`, condicionada a `PAYMENT_TEST_PGLITE`. |
| `git diff --check` | Aprobado. |

Revisión visual con Chromium/Playwright sobre `next start` del build final, en 1440 × 1000 y 390 × 844. Se inspeccionaron cabeceras y ejemplos de ambas páginas: texto legible, espacios adecuados, sin desbordes horizontales, imágenes rotas ni encabezados truncados. Texto de ejemplos de 16,48 px e interlineado de 32 px; selección de fragmentos comprobada en el navegador. Las capturas de elemento completo en mobile incluyen una superposición del encabezado fijo causada por el desplazamiento automático de la captura: se usaron las capturas de viewport para evaluar el encabezado y su lectura normal.

Las cuatro vistas respondieron 200, con un H1, jerarquía H2/H3 coherente, títulos y descripciones propios, canonical de producción correcto, robots index/follow y anclas válidas. Los 13 destinos internos distintos del contenido principal respondieron 200 en local.

Se recorrió el CTA principal de ambas páginas en ambos tamaños, pasando por la selección de plantilla hasta el formulario. Seguridad precarga «Personal de seguridad» y recomienda Operativa ATS; atención precarga «Atención al cliente» y recomienda Elegancia. También se recorrió el CTA contextual de atención en ambos tamaños. Conservan `intent=job-specific`, `role`, `landing_path`, `source_type=landing`, `cta_label` y `lang=es`.

Los cuatro recorridos principales emitieron `landing_viewed`, `landing_cta_clicked`, `creator_entered`, `template_selected` y `form_started` con atribución de su landing. Se interceptaron las solicitudes de analítica durante esos recorridos para no contaminar las métricas. Se verifica emisión y contenido, no persistencia en producción. No hubo excepciones JavaScript de página. La consola registra el 404/MIME del script de Vercel Analytics, no disponible en localhost; la primera visita previa a la interceptación registró el conocido aviso de Arcjet por falta de IP local. No se alteraron protecciones ni analítica.

La comprobación adicional del CTA contextual tuvo un primer timeout del script de auditoría: el navegador conservaba el formulario previo y no volvía al selector de plantilla. Repetida con almacenamiento limpio, pasó en ambos tamaños; no requirió corregir la aplicación.

Revisión editorial: los ejemplos distinguen tareas, herramientas y contextos reales; no atribuyen a los visitantes cifras, experiencia ni habilitaciones ficticias. La repetición de «registro» o «seguimiento» responde a funciones compartidas, con diferencias concretas por puesto. No se agregaron listas de keywords, títulos redundantes ni nuevas secciones generales. Se conserva la oferta comercial y no se promete descarga gratuita del generador.

Alcance confirmado mediante diff: solo las dos páginas, `tests/seo-marketing.test.ts` y este informe. Las cuatro páginas de la primera intervención y `components/seo/MarketingPage.tsx` son idénticos a HEAD previo al commit. Tampoco cambiaron las variantes sin experiencia, las páginas ganadoras ni las candidatas de fase 3. Las capturas y scripts de auditoría se guardan fuera del repositorio.

Evidencia local: `C:/Users/Joaqoz/.codex/visualizations/2026/10/24/01a16fca-9df9-7da3-ba1d-b1c878f546ba/`, archivos `phase2-browser-audit.ts`, `phase2-browser-result.txt`, `phase2-context-cta.ts` y capturas por página/tamaño. La investigación de fase 3 se entrega aparte y no forma parte del commit funcional.

Límites: no se ejecutó generación real contra IA, transacción real, ni validación de recepción de eventos en producción. Las pruebas automatizadas correspondientes pasaron; esto no equivale a certificar proveedores externos ni una mejora de conversión. La suite opcional de base de datos permanece omitida por falta de configuración y no afecta los cambios editoriales revisados.

## Impacto esperado y medición

Hipótesis: ejemplos específicos permiten resolver mejor consultas de experiencia/perfil y preparar datos más útiles para el creador. La recuperación histórica de estas dos URLs equivale a 12 clics por 28 días; es una referencia, no un pronóstico. Por sí solas no cerrarían la brecha total de 63 a 127 clics documentada en la primera fase. No hay base para prometer impresiones, ventas o una fecha de recuperación.

Antes de publicar: autorización del propietario, registrar revisión/hora reales y revisar el diff. Actualizar únicamente las fechas de contenido de estas dos URLs cuando se confirme la fecha de publicación; no adelantar lastmod de contenido todavía local.

Después: comprobar producción y primer rastreo con Search Console. Comparar 28 días completos previos al despliegue con 28 posteriores al nuevo rastreo; mantener el pico histórico como referencia separada. Revisiones de días 7/14/21 sirven para detectar fallos, no para reescribir por oscilaciones pequeñas. La medición de la primera tanda sigue independiente.

Por URL: impresiones, clics y posición de consultas comparables; sesiones que entran al creador, inician formulario, generan CV, llegan a checkout y pagan. Conservar `landing_path`; distinguir canal orgánico de `source_type=landing`, que no identifica origen orgánico. Usar sesiones únicas y pagos confirmados, separar monedas y reportar numeradores/denominadores. Sin acceso a esas conversiones no se calcula un retorno económico inventado.
