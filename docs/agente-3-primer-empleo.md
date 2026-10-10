# Agente 3 — Primer empleo y formulario contextual

Cierre: 7 de octubre de 2026. Integrado sobre las entregas sin commit de Agentes 1 y 2. No se hizo commit, push, despliegue, build, lint ni migración remota. Se preservaron los cambios ajenos en `package.json`, `output/` y el script de Pinterest.

## Resultado y contrato

- El creador permite elegir «Tengo experiencia o proyectos para incluir» o «Todavía no tengo experiencia ni proyectos», en español e inglés.
- `DatosCVFormulario.experienceMode` es opcional por compatibilidad y admite `with-experience` / `no-experience`. Los formularios nuevos comienzan en `with-experience`. Un borrador o request antiguo sin campo se interpreta como `with-experience`, incluso si llegó desde una landing de primer empleo. No se descartan antecedentes por la intención de entrada.
- Cambiar de modo conserva el texto de `experiencia` en el formulario y en `vitaespark_create_draft`. Al enviar `no-experience`, el cliente manda `experiencia: ""`; la API vuelve a imponerlo aunque reciba texto oculto. Volver a `with-experience` recupera el texto y exige un antecedente real de al menos 20 caracteres.
- Nombre, puesto, contacto, perfil breve y habilidades conservan su obligatoriedad. Formación, idiomas e información adicional son opcionales. Se mantienen límites de longitud. En el CV estructurado, contacto y habilidades requieren al menos un elemento no vacío.
- El CV generado/guardado conserva su estructura histórica; no necesita guardar un modo adicional: `experiencia: []` representa la ausencia de antecedentes. Cada antecedente mantiene cargo, empresa, fechas, ubicación y logros.

## Integración

- Entrada: los enlaces mantienen simultáneamente el puesto y `intent=first-job` en las rutas sin experiencia, primer empleo y estudiantes. La precarga del puesto ya no reemplaza esa intención por `job-specific`. Se mantienen las rutas públicas, metadatos, H1, canonicals, artículos, enlaces editoriales y datos estructurados.
- Formulario contextual: ejemplos de atención al cliente, caja, minería y demás roles del catálogo; ejemplos neutrales cuando no hay coincidencia. Se reutiliza el catálogo de habilidades, con textos en inglés. Ninguna sugerencia se agrega automáticamente: cada botón incorpora únicamente la habilidad elegida y evita duplicarla.
- Generación: reglas bilingües de fidelidad y modo explícito en el mensaje. La API impone `experiencia: []` para `no-experience`, incluso frente a una respuesta del modelo estructuralmente válida que incluya antecedentes. Formación no informada produce `formacion: []`.
- Normalización: eliminado el fallback que convertía el puesto buscado en un cargo previo. Tampoco se completa un cargo ausente usando el puesto objetivo. Si se aportaron antecedentes pero la respuesta no permite recuperar ninguno, la API falla en vez de fabricar uno o entregar silenciosamente un CV sin ellos.
- Modelo, límite gratuito, límites de uso y contratos de eventos no cambiaron. No se agregaron datos personales ni textos del CV a analítica.
- Editor compartido: permite borrar el último antecedente, guardar sin experiencia y agregar antecedentes reales después. Se mantiene la validación por entrada, Guardar/Cancelar del preview y la edición poscompra con plantilla fija.
- Borrador: mismo almacenamiento y versión compatible; conserva elección activa, texto oculto, CV generado, foto, plantilla, `pendingCvId` y `purchaseKey`. Editar o cambiar plantilla no genera otra identidad de compra.
- Preview/PDF: las siete plantillas y sus versiones con marca de agua ocultan el bloque completo de experiencia cuando está vacío. También se oculta formación vacía, evitando títulos huérfanos y márgenes de esas secciones. La vista móvil ya tenía ese comportamiento y se verificó.
- Checkout: recibe el contenido revisado exacto, incluido el array vacío. La comparación/persistencia de versiones sigue usando el esquema compartido; no se reescribieron captura, webhooks, recuperación ni reservas. Un checkout anterior activo o incierto sigue bloqueando otro relacionado.
- Claridad: ausencia de antecedentes no penalizada; se mantienen controles de perfil y contacto, se evita exigir cinco habilidades como incentivo para rellenar y se indica usar únicamente habilidades reales. El bloque está disponible en español e inglés.

## Archivos propios

Nuevos:

- `lib/cv-form-context.ts`.
- `tests/first-job.test.ts`, `tests/first-job-form.test.ts`, `tests/first-job-generation.test.ts`, `tests/first-job-pdf.test.ts`, `tests/first-job-saved-editor.test.ts`.
- Este informe.

Cambios propios sobre archivos existentes, incluidos los heredados sin commit:

- `lib/types/cv.ts`, `lib/schemas/cv.ts`, `lib/create-flow-state.ts`, `lib/job-landing.ts`, `lib/blog-intent.ts`, `lib/cv-generation-output.ts`, `lib/cv-score.ts`.
- `app/api/generate-cv/route.ts`.
- `components/CVFormStep.tsx`, `components/CVFormWizard.tsx`, `components/pdf/CVForm.tsx`, `components/CVContentEditor.tsx`, `components/CVPreviewStep.tsx`.
- `components/pdf/template/{BlueTemplate,GreenTemplate,PurpleTemplate,ModernAtsTemplate,OperativeAtsTemplate,Elegance-template,harvard-cv-template}.tsx` y previews `blue-template`, `green-template`, `purple-template`, `elegance-template`, `harvard-template`. Los previews ATS reutilizan sus documentos principales.
- `tests/cv-content.test.ts`, `tests/cv-generation-output.test.ts`, `tests/preview-editing.test.ts`.

Los archivos del editor compartido y varias pruebas ya existían sin seguimiento por Agente 1: no atribuir su creación completa a este paquete. El diff contra HEAD contiene también los cambios anteriores de pagos.

## Verificaciones

- Regresión local: `node node_modules/vitest/vitest.mjs run --maxWorkers=2`: **178 pruebas aprobadas, 36 suites aprobadas; 10 pruebas de una suite PostgreSQL omitidas** por ausencia de `PAYMENT_TEST_PGLITE`. No se ejecutó la migración para habilitarlas. La primera pasada sin límite de concurrencia tuvo timeouts al iniciar workers; la repetición con dos workers terminó sin errores.
- Pruebas DOM reales con React: alternar modo conserva texto, sugerencias no precargadas, selección agrega solo una habilidad, envío activo sin antecedentes ocultos y formación vacía, español/inglés.
- Pruebas de API con OpenAI, autenticación, limitador y analítica simulados: rechazo de obligatorios antes de llamar al modelo, aplicación del modo aun ante antecedentes devueltos por el modelo, cookie de consumo sin cambios y rechazo de salida incompleta cuando se aportó experiencia.
- Preview con generación consumida: eliminación del último antecedente, Cancelar, Guardar, agregar/cancelar, cambio de plantilla, recarga, referencias de pago estables y payload exacto sin otra generación. Editor poscompra: guardar array vacío y agregar/guardar un antecedente real, con red simulada.
- PDFs reales con `@react-pdf/renderer`, sin simular el renderizador: **28 documentos** (siete plantillas × preview/final × con/sin experiencia). Validación del contenido del árbol y de una página PDF válida por fixture, sin títulos de experiencia/formación vacíos.
- Typecheck: `node node_modules/typescript/bin/tsc --noEmit --incremental false`, aprobado. Se ejecutó fuera del sandbox para resolver dependencias completas. Se regeneraron tipos con `next typegen` y se retiró exclusivamente la caché de tipos de la ruta temporal eliminada.
- `git diff --check`, aprobado. Sin build ni lint.
- Después de los últimos ajustes de claridad bilingüe y enlaces, se repitieron las suites de primer empleo, preview, SEO y landings: **30 pruebas aprobadas en cuatro suites**; typecheck y `git diff --check` nuevamente aprobados.

## Revisión visual y límites de la evidencia

- Revisados visualmente los PDFs finales Elegancia con/sin experiencia mediante PNG de Poppler: sin solapamientos, títulos vacíos ni separación artificial entre bloques. El espacio restante corresponde a la brevedad del fixture. Poppler emitió advertencias sobre fuentes de sustitución del sistema; las imágenes revisadas se veían legibles.
- En navegador integrado, viewport de 390 × 844: revisada la vista móvil real con/sin experiencia y formación vacía; la experiencia aparece solo con datos, sin desbordamiento horizontal visible.
- En escritorio, viewport de 1440 × 1000: el iframe del PDF permaneció en blanco en el navegador integrado, sin errores capturados de consola. **No se declara validado visualmente ese visor**. Los documentos reales se verificaron por separado. Falta revisar el visor en un navegador con soporte de PDF.
- La página temporal de fixtures y los archivos temporales de render se retiraron; el servidor local de revisión se detuvo.
- No se hizo una generación contra el modelo real, compra sandbox/real, entrega de correo ni persistencia remota. Las pruebas simuladas verifican contratos y barreras deterministas, no demuestran fidelidad semántica del modelo real ni validación transaccional de proveedores.

## Pendientes y contexto para Agente 4

1. Antes de publicar el código de pagos sigue pendiente aplicar remotamente `20261005230057_payment_recovery.sql` y completar las verificaciones transaccionales de Agente 2. La migración de Agente 0 ya aplicada no debe repetirse.
2. Los dos intentos históricos PayPal siguen con estado externo no verificable. No se consultaron endpoints de captura, capturaron órdenes, reenviaron webhooks ni alteraron esos intentos.
3. Completar revisión del visor PDF de escritorio en navegador compatible y una muestra de fidelidad con el modelo real antes de dar por validada toda la experiencia de producción.
4. Agente 4 debe conservar el modo explícito, compatibilidad histórica, edición sin regenerar, `pendingCvId`/`purchaseKey` y política de bloqueo de checkout relacionado. Una elección de plantilla o entrada comercial no debe borrar el borrador ni inferir ausencia de antecedentes.
5. Oferta comercial, CTA por plantilla, recomendaciones y feedback no se implementaron: siguen fuera de este paquete. **El producto no se declara listo para publicar.**
