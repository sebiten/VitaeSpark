# Plan de SEO y conversión para VitaeSpark

Fecha: 14 de septiembre de 2026. Estado: propuesta investigada; sin cambios en el producto.

## Decisión recomendada

Priorizar medición, experiencia del resultado y cobro internacional. Mejorar primero las páginas que ya atraen candidatos; ampliar contenido cuando podamos medir visitas orgánicas y compras por página. Mantener inicialmente los precios actuales para separar problemas de valor, usabilidad y pago.

Objetivo de negocio: compras aprobadas procedentes de Google y Bing con entrega efectiva del PDF. Generaciones y registros son pasos intermedios.

## Evidencia y límites

### Capturas del propietario: últimos 30 días

- 7 generaciones únicas, 6 antes del registro, 2 emails entregados, 2 pagos iniciados y 0 pagos completados en el recorrido de invitados.
- Cinco de las seis sesiones de invitados son de Perú o México; una es de Argentina. No representan necesariamente la distribución de todas las visitas.
- Minería registra 13 clics internos, 7 selecciones de plantilla, 4 CVs, 4 aperturas del resultado y 1 inicio de pago. Es la señal más fuerte para priorizar una página, todavía sin ventas que validen su rentabilidad.
- Dos inicios de pago son insuficientes para concluir que el precio es alto o que PayPal falla. Hay que distinguir abandono, rechazo, error técnico y pago sin atribución.

### Hallazgos del repositorio

1. **Clics internos:** `buildLandingMetrics` cuenta `landing_cta_clicked`. La tabla no muestra clics desde buscadores ni visitas a las páginas. Renombrar «Clics» a «Sesiones con clic en CTA».
2. **Resultado y checkout comparten disparador:** `CVPreviewStep.tsx` emite `preview_viewed` y `checkout_viewed` al montar el componente. El 100 % CV → checkout no prueba una decisión de compra ni que el documento haya sido visto.
3. **Vista previa móvil:** por debajo de 640 px se presenta un bloque de 360 px con candado y se pide pulsar «Ver CV» para cargar el documento. El cobro puede ser más visible que el trabajo realizado por la IA.
4. **Precio en la landing:** `MarketingPage.tsx` dice «Pago único. PDF descargable. Editable desde tu perfil», pero no muestra el importe en ese bloque. Los importes configurados son $1.999 ARS para Argentina y US$2.99 internacional.
5. **Cobro por mercado:** `lib/market.ts` selecciona Mercado Pago para Argentina y PayPal para otros países; existe selector manual. Revisar el recorrido real de Perú y México antes de integrar otro proveedor.
6. **Plantilla inicial:** `components/pdf/CVForm.tsx` inicia en `elegance`. Las seis selecciones visibles no prueban preferencia espontánea. Ya existe `operative-ats`, destinada a minería, operarios, seguridad y logística.
7. **Contexto del puesto:** minería ya pasa el puesto a `/crear`. En atención al cliente sin experiencia hay una inconsistencia: el mapa usa `/cv-para-atencion-al-cliente-sin-experiencia`, pero la ruta real es `/cv-atencion-al-cliente-sin-experiencia`. Esa entrada no obtiene el puesto por ese mapa.
8. **Atribución:** el panel conserva landing, CTA y UTM; no se encontró clasificación propia de Google/Bing/referrer en ese recorrido. GA4 sí está integrado y puede aportar adquisición: comprobar sus datos antes de duplicar funcionalidad. «Fuente: landing» describe el tipo de página, no el canal orgánico.
9. **Base SEO existente:** canonical, sitemap, fechas de cambios de contenido, redirecciones de páginas genéricas e implementación de IndexNow ya existen. No es necesario rehacerlos. Su presencia en código no acredita indexación ni envíos correctos en producción.

### Verificación pública y antecedentes

La página pública de minería se abrió correctamente en Edge y muestra el modelo completo añadido en la intervención del 8 de septiembre. La sesión del navegador estaba autenticada: esta revisión no sustituye una prueba de compra como invitado ni una prueba desde Perú/México.

El lector web de investigación recibió 403 en portada y minería, aunque Edge abrió minería. No demuestra un bloqueo a Googlebot o Bingbot. Corresponde comprobarlo con inspección de URL y registros de acceso, sin cambiar protecciones por conjetura.

`docs/seo-recovery-2026-09-08.md` documenta una caída histórica de 117 a 52 clics entre los períodos comparados de junio y agosto. Minería, operario, cajero y administrativo concentran el 63,1 % de los clics netos perdidos. Es un antecedente interno; no se revisaron aquí las exportaciones originales ni los informes actuales de Search Console/Bing.

`pseo-strategy.md` contiene estimaciones de búsquedas sin fuente verificable y acciones que ya están implementadas. No usar esos volúmenes como base de inversión ni repetir las consolidaciones de URLs ya realizadas.

## Etapa 1 — Medición y diagnóstico del pago

Prioridad P0. Esfuerzo orientativo: 1–2 días de implementación y revisión; depende del acceso a los informes.

### Cambios

- Separar resultado disponible, documento cargado/visible, apertura ampliada, clic en pagar, email confirmado, orden creada, salida hacia proveedor, retorno, pago aprobado y descarga.
- Mantener las métricas históricas identificadas como versión anterior; registrar la fecha de cambio para evitar comparaciones engañosas.
- Mantener aprobación y deduplicación del pago en servidor. Un retorno a la web no equivale a una compra aprobada.
- Conservar landing inicial y última página/CTA de conversión como datos separados. Evitar que un enlace interno sustituya el origen de adquisición.
- Segmentar Google orgánico y Bing orgánico, país, dispositivo, plantilla y proveedor. No intentar atribuir una consulta de búsqueda concreta a cada comprador: los informes de consultas se analizan de forma agregada.
- Usar GA4 como punto de partida para adquisición y validar su correspondencia con el panel. Separar campañas pagadas, sociales y visitas directas; excluir pruebas internas.
- Revisar las dos órdenes iniciadas y contrastarlas con los estados del proveedor y los eventos de aprobación. Registrar errores con identificador de orden y código, sin contenido del CV ni emails en analítica.

### Criterio de terminado

Un recorrido controlado permite distinguir dónde se abandona y contar una sola compra. El resultado automático ya no se interpreta como intención de pago. Cancelación y error son observables. La tabla no mezcla clics de buscador con clics en CTA.

Validar primero con entornos de prueba. Una comprobación real debe contemplar autorización del cobro y verificar aprobación, PDF y acceso posterior; no se realizó en esta investigación.

## Etapa 2 — Hacer visible el valor antes de cobrar

Prioridad P1. Esfuerzo orientativo: 2–3 días. Comenzar por minería y el componente de resultado.

### Landing de minería

Conservar inicialmente URL, título SEO, H1 y modelo completo recientemente actualizado. Cambiar la descripción comercial y el CTA antes de volver a reescribir el contenido que busca posicionarse.

Propuesta principal:

> Convierte tu experiencia, cursos y disponibilidad en un CV para minería. Revisa el resultado antes de pagar la descarga.
>
> **Crear mi CV para minería**
>
> Generación y vista previa sin costo. PDF por US$2.99. Pago único, sin suscripción.

En Argentina, mostrar $1.999 ARS. Confirmar que la generación gratuita se mantiene para el visitante y sus límites antes de publicar esa frase. La misma oferta debe verse en landing, creador y checkout. Precio regional con alternativa legible cuando no se detecte el país; no convertir la página en distintas versiones SEO solo por moneda.

Alternativas de CTA para una futura evaluación secuencial:

- «Preparar mi CV para minería»: enfatiza la tarea.
- «Crear mi CV y ver el resultado»: enfatiza la revisión previa.

### Resultado y elección de plantilla

- Mostrar una vista previa útil del CV personal en móvil, con marca de agua discreta y opción de ampliación. Evitar un bloque vacío como primera demostración del producto. Medir carga y errores para no empeorar el rendimiento.
- Presentar resumen, experiencia y habilidades generados de forma legible, con edición accesible y precio junto a la descarga.
- Recomendar `operative-ats` a minería/operarios/seguridad, manteniendo la elección manual. La imagen de ejemplo, la plantilla recomendada y el documento final deben guardar coherencia.
- Corregir la clave de atención al cliente sin experiencia para preservar el puesto.
- Aprovechar el email ya disponible cuando sea fiable y dejar que la persona lo confirme o cambie; no obligarla a escribirlo otra vez sin necesidad.
- Mantener pago como invitado y recuperación del mismo CV. No usar el email de entrega para campañas: actualmente el producto promete ausencia de mensajes promocionales.

### Criterio de terminado

En móvil se puede revisar contenido personal antes de pagar, comprender qué se obtiene y conocer el importe. La ruta profesional conserva el puesto y una plantilla pertinente. No hay obligación de registro añadida.

## Etapa 3 — Validar el cobro internacional

Prioridad P1, en paralelo temporal con la etapa 2 si hay capacidad. Primero diagnóstico, después una eventual integración.

- Revisar idioma, moneda, disponibilidad de tarjeta, solicitud de cuenta, errores y retorno de PayPal para usuarios de Perú y México.
- PayPal explica que el pago sin cuenta no aparece siempre y depende de factores como ubicación e historial. Por tanto, no prometer «sin cuenta de PayPal» de forma universal. [Fuente oficial](https://www.paypal.com/us/cshelp/article/how-do-i-accept-cards-with-checkout-using-the-guest-checkout-option--help307).
- Si se confirma una barrera de método, evaluar una alternativa disponible para el país del comercio y los compradores, incluyendo comisión fija, comisión variable, moneda de liquidación e integración. No elegir un proveedor solo porque opere en el país del comprador.
- Mantener inicialmente US$2.99 y $1.999 ARS. Evaluar cambios de precio con margen neto por venta y visitas, no solo número de generaciones.

## Etapa 4 — Recuperar y ampliar SEO útil

Prioridad P2. Trabajo durante las semanas 2–4; evaluación de resultados después del rastreo y con períodos completos.

### Orden editorial

| Grupo | Motivo | Trabajo propuesto |
| --- | --- | --- |
| Minería | Mayor actividad de conversión en la captura | Mejorar puente entre ejemplo y creación; conservar el contenido reciente |
| Seguridad y seguridad sin experiencia | Ya produjeron CVs; una sesión inició pago | Ejemplo completo, tareas concretas, CTA contextual y condiciones de descarga |
| Operario, cajero y administrativo | Visibilidad previa documentada | Revisar evolución tras el 8 de septiembre antes de otra reescritura |
| Atención al cliente sin experiencia | Ya generó un CV | Corregir continuidad del puesto y revisar CTA |
| Plantillas ATS y guías | Apoyo a la decisión | Comparaciones verificables y enlaces a la plantilla adecuada |

La prioridad combina señales; una generación aislada no convierte una página en ganadora. Confirmar consultas y páginas en Google/Bing antes de abrir nuevas URLs.

### Contenido que aporta una diferencia

- Ejemplos completos en texto e imagen, claramente identificados como ilustrativos.
- Casos con y sin experiencia y transformación de tareas reales en frases concretas, sin inventar experiencia o certificaciones.
- Mostrar qué hace la IA con los datos y qué revisa la persona antes de descargar.
- Explicar la lectura del PDF por sistemas ATS con evidencia. Greenhouse identifica posibles problemas con columnas, gráficos y datos en encabezados: comprobar extracción y orden del texto de cada plantilla; no presentar un checklist de contenido como una certificación universal ATS. [Fuente oficial](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse).
- Añadir autor/revisor real cuando exista y mantener fechas de actualización solo ante cambios sustanciales.
- Conectar guías, páginas de oficio y creador con enlaces pertinentes. Explorar menciones editoriales de centros de formación u orientación laboral mediante recursos que les resulten útiles; no comprar paquetes de enlaces.

Google recomienda contenido útil y original y desaconseja generar páginas masivamente sin valor añadido. Por eso no priorizar una matriz de profesión × ciudad ni decenas de variantes casi idénticas. [Contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [políticas sobre contenido a escala y páginas puerta](https://developers.google.com/search/docs/essentials/spam-policies).

### Google

- Verificar las URLs prioritarias en Search Console: versión publicada, canonical elegido, indexación, acceso y última lectura.
- Obtener consultas, páginas, países y dispositivos de 90 días y comparar ventanas completas de 28 días con filtros consistentes.
- Cambiar títulos/descripciones solo con hipótesis de intención y CTR por consulta; no usar una media global de posición como explicación única.
- Revisar experiencia móvil y métricas reales de carga/interacción. Una prueba de laboratorio aislada no demuestra mejora de conversión.
- No priorizar más FAQ schema ni `llms.txt` para obtener posiciones. Google anunció la retirada de resultados enriquecidos FAQ en mayo de 2026 y aclara que `llms.txt` no afecta positiva ni negativamente a visibilidad/ranking. Las preguntas frecuentes siguen siendo útiles para las personas. [Registro oficial de cambios](https://developers.google.com/search/updates).

### Bing

- Revisar Bing Webmaster Tools por separado: sitemap, inspección de URLs, consultas, páginas y clics. No extrapolar Google a Bing.
- Validar la implementación existente de IndexNow: clave accesible y respuestas de envíos de cambios reales. No reenviar todas las URLs diariamente. IndexNow facilita descubrir cambios y no garantiza indexación. [FAQ oficial](https://www.indexnow.org/faq).
- Usar AI Performance, si está disponible en la propiedad, como dato complementario de citas y visibilidad. Una cita de Copilot no es una visita ni una compra. [Anuncio oficial de Bing](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview).

## Medición y decisiones

Métrica principal: sesiones orgánicas con compra aprobada / sesiones orgánicas de entrada, por buscador y landing, con una ventana de atribución definida. Informar también ventas e ingresos por moneda y descargas exitosas posteriores al pago.

Indicadores de diagnóstico: visitas → CTA → formulario → CV generado → vista previa realmente abierta/cargada → clic de pago → orden → aprobación → descarga. Deduplícar por sesión para tasas de recorrido y por transacción para ventas; no dividir conteos con identidades incompatibles.

Con el volumen actual, aplicar cambios secuenciales y verificaciones cualitativas. No repartir el tráfico entre varias variantes A/B. Un antes/después orienta, pero no prueba causalidad: cambian países, consultas y composición del tráfico.

### Calendario

1. Semana 1: validar eventos y órdenes; publicar correcciones de medición y continuidad del puesto.
2. Semana 2: publicar precio y propuesta comercial en minería; mejorar vista previa móvil y recomendación de plantilla. Registrar versiones y fechas.
3. Semanas 2–4: verificar cobro internacional y rastreo; trabajar las páginas priorizadas según los informes recientes.
4. Semana 4: revisar progreso operativo y primeras señales. Si hay pocos casos, ampliar observación; no declarar ganador por una compra.
5. Semanas 6–8: comparar SEO con ventanas de 28 días tras la nueva lectura de las páginas. Ampliar a otro grupo solo si hay oportunidad de consultas y una experiencia de compra comprobada.

### Datos necesarios para afinar el plan

- Search Console y Bing Webmaster Tools: exportaciones recientes por página, consulta, país y dispositivo.
- GA4: sesiones y compras por fuente/medio y landing; revisar si las compras se registran cuando el usuario no vuelve desde el proveedor.
- Estados de las dos órdenes iniciadas y errores correspondientes.
- Fecha real de publicación de las mejoras del 8 de septiembre; se verificó públicamente el contenido de minería, no todo el conjunto.

No se generaron CVs, no se iniciaron cobros ni se modificaron configuraciones externas durante esta investigación. No se ejecutaron build, lint ni tests: el único archivo añadido es este plan.
