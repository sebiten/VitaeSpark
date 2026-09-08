# Recuperación SEO: primera intervención

Fecha de edición: 8 de septiembre de 2026. Estado: cambios locales, pendientes de publicación. Registrar la fecha real de despliegue antes de iniciar la comparación posterior.

## Datos de partida

Fuente: exportaciones de Google Search Console proporcionadas por el propietario:

- `vitaespark.com-Performance-on-Search-2026-09-08.zip`: histórico diario, búsqueda Web.
- `vitaespark.com-Performance-on-Search-2026-09-08 (2).zip`: comparación de 1–28 de junio con 3–30 de agosto de 2026, sin filtros de país o dispositivo.
- `vitaespark.com-Coverage-2026-09-08.zip` y captura de las seis URLs rastreadas sin indexar.

| Página | Clics junio | Clics agosto | Impresiones junio | Impresiones agosto | Posición junio | Posición agosto |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/cv-para-mineria` | 32 | 15 | 1.582 | 887 | 7,17 | 8,17 |
| `/cv-para-operario` | 13 | 2 | 1.170 | 695 | 8,87 | 9,79 |
| `/cv-para-cajero` | 8 | 1 | 1.351 | 484 | 9,80 | 16,65 |
| `/cv-para-administrativo` | 7 | 1 | 2.721 | 1.466 | 15,99 | 20,95 |
| Sitio completo | 117 | 52 | 18.247 | 10.973 | 14,44 | 21,25 |

La posición global se calculó ponderando las posiciones diarias por impresiones; es aproximada por el redondeo de la exportación. Las cuatro páginas concentran 41 de los 65 clics netos perdidos (63,1 %).

Las consultas exportadas son una muestra: no incluyen todas las búsquedas anónimas y no están cruzadas por URL. La asociación de consultas a profesiones orienta la intervención; no demuestra por sí sola qué URL recibió cada consulta. Las medias de posición también dependen de la mezcla de países, dispositivos y consultas.

## Hipótesis y cambios

La evidencia confirma una pérdida de visibilidad y clics. No confirma una penalización ni que una modificación anterior haya provocado la caída. Esta intervención mejora la utilidad del contenido para las búsquedas observadas, sin garantizar recuperación.

- **Minería:** modelo completo de ayudante con experiencia industrial, instrucciones para adaptarlo a las distintas áreas y explicación de cómo preparar el PDF. Se diferencia el texto consultable sin costo de la descarga de pago en la plataforma.
- **Operario:** modelo completo, perfiles diferenciados de producción y depósito, tareas antes/después y formas concretas de describir herramientas y turnos. Se reemplazan apartados repetitivos.
- **Cajero:** ejemplo completo de supermercado, perfiles según experiencia y explicación del alcance de apertura, arqueo y cierre. Título y descripción reflejan cajero y cajera.
- **Administrativo:** ejemplo completo de auxiliar, perfiles de administración general y facturación, aplicaciones concretas de Excel y resultados verificables.
- **Modelo de currículum:** estructura completa en texto para copiar y completar, adaptación sin experiencia, exportación a PDF y enlaces a las cuatro profesiones.
- **Guía para hacer un currículum:** proceso aplicado a una oferta ficticia, transformación de tareas en experiencia, revisión del PDF y enlaces a modelos. Se elimina un enlace repetido a la portada.
- **Enlaces internos:** conexiones desde las páginas profesionales hacia las dos guías y desde las guías hacia las profesiones.
- **Sitemap:** `lastModified` solo para las seis páginas con cambios sustanciales. La fecha del artículo usa el mismo registro. No se cambia la fecha en cada despliegue.

Se conservan las URLs, los canonical, las imágenes existentes y las reglas de indexación.

## Revisión técnica

Antes de publicar, ambas URLs de contenido señaladas como rastreadas sin indexar respondieron HTTP 200 en producción, con canonical propio y meta robots `index, follow`. No recibieron `X-Robots-Tag` restrictivo, robots.txt permite su rastreo y ambas están en el sitemap público.

Esto descarta un bloqueo evidente en las respuestas consultadas, pero no equivale a comprobar la versión indexada ni el acceso desde Googlebot. La confirmación corresponde a Inspección de URLs de Search Console.

Los otros cuatro ejemplos de la captura son dos fuentes WOFF2, un favicon y un manifest. No se modifican ni se bloquean estos recursos para intentar reducir el contador del informe.

Verificación local: sintaxis de los ocho archivos TypeScript/TSX modificados, 49 destinos de enlaces, imágenes referenciadas, correspondencia de rutas y canonical, y ausencia de títulos de sección duplicados. Sin incidencias. El chequeo completo de tipos no pudo completarse: la instalación local no resuelve dependencias como Next, React y sus tipos. No se ejecutaron build ni lint.

## Publicación y medición

1. Publicar los cambios y registrar la fecha y revisión desplegada. Estos cambios locales todavía no afectan al sitio público.
2. Comprobar las seis URLs publicadas: HTTP 200, títulos y contenido nuevo, canonical propio y ausencia de bloqueos. Revisar las seis fechas del sitemap.
3. Inspeccionar las dos páginas de contenido sin indexar en Search Console y solicitar indexación tras verificar la versión publicada. Para las otras cuatro, se puede solicitar un nuevo rastreo después de publicar. No se ha enviado ninguna solicitud desde esta tarea.
4. Tomar los 28 días completos anteriores al despliegue como referencia reciente. Compararlos con un período de 28 días posterior al nuevo rastreo, manteniendo las mismas URLs y filtros. Los períodos de junio/agosto documentan la caída histórica y no sustituyen esa referencia.
5. Revisar clics, impresiones, CTR y posición por URL; después segmentar consultas, país y dispositivo. Con poco volumen, usar períodos completos y evitar conclusiones por oscilaciones de un día.
6. Priorizar el seguimiento de `curriculum operario de produccion`, `currículum cajero`, `curriculum cajera`, `curriculum auxiliar administrativo`, `perfil profesional administrativo ejemplo` y `modelo de currículum vitae para minera pdf`. Comparar la misma consulta y segmento antes/después.
7. Decidir la siguiente intervención con los nuevos datos. No asumir que una mejora o caída posterior se debe únicamente a estos cambios.

Referencias: [contenido útil según Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=es), [solicitudes de nuevo rastreo](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl?hl=es) y [limitaciones de los datos de Search Console](https://support.google.com/webmasters/answer/17010575?hl=es).
