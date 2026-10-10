# Agente 1 — Edición del preview sin regeneración

Fecha: 5 de octubre de 2026. Base: 93ccf15 (Agente 0). Alcance exclusivo: edición manual y contrato de contenido del checkout.

## Resultado y contrato del editor

- `CVContentEditor` recibe `value: CV`, `onChange: (cv: CV) => void` y `language?: "es" | "en"`. Es controlado: devuelve objetos nuevos sin mutar el valor recibido. No autentica, genera, persiste, cobra ni llama APIs.
- Campos extraídos del editor poscompra: nombre, puesto, contacto, perfil, experiencia/logros, formación, habilidades, idiomas e información adicional. Foto e idioma se conservan. Se mantienen los límites estructurales vigentes; admitir CV sin experiencia pertenece a Agente 3.
- Los campos multilínea conservan espacios y líneas vacías mientras se escribe. Al guardar se normalizan y validan con el esquema existente, sin truncamiento silencioso. Un valor inválido permanece en edición y no sustituye el borrador guardado.
- `CVPreviewEditor` mantiene una copia temporal. Guardar valida y entrega el CV a `CVForm`; Cancelar descarta esa copia. Una sincronización de foto concurrente se conserva al guardar.
- `CVForm` actualiza tanto estado como referencia del CV generado, y escribe inmediatamente en el borrador existente. El checkout invitado toma esa misma referencia cuando prepara la sesión/foto.
- `EditSavedCVForm` reutiliza los campos y mantiene su carga y PATCH remotos. El endpoint poscompra sigue exigiendo propietario, estado pagado y plantilla comprada; no se modificó.

## Borrador y navegación

Se reutilizan `vitaespark_create_draft` en sessionStorage y el mecanismo de fotos existente. No hay otro almacenamiento ni emails nuevos.

El borrador admite `pendingCvId?: string` (UUID validado al restaurar), como ampliación opcional compatible con versiones anteriores. La referencia vive en el padre y sobrevive al desmontaje del preview, la edición y el selector. Una nueva generación la reinicia.

Todo borrador con CV generado válido vuelve al preview, incluso si se recargó mientras estaba en plantillas. Conserva el contenido guardado y la última plantilla elegida. Los cambios aún no guardados se descartan al recargar. La recuperación histórica de formularios sin CV generado se mantiene.

El límite gratuito de IA no cambió. La edición no monta el formulario generador ni solicita `/api/generate-cv`. Plantillas y compra tampoco dependen de ese límite.

## Contrato del checkout y dependencia con Agente 2

Ambos proveedores siguen recibiendo `cvId?`, `cvData`, `template` y `language` desde el preview. El servidor compara el CV normalizado, foto, idioma y plantilla del pendiente del propietario:

1. Si coinciden, reutiliza el mismo CV y mantiene la lógica de checkout existente.
2. Si cambian y se recibió el documento completo con plantilla, crea otro CV pendiente con la versión revisada. No modifica el documento asociado a un enlace ya emitido. La respuesta conserva el formato existente; el cliente guarda el ID devuelto, también en errores que lo incluyen.
3. Una petición histórica con solo ID mantiene su comportamiento. IDs ajenos/inexistentes y estados no pendientes conservan sus rechazos; un CV ya pagado no origina otra compra desde ese ID.

El preview avisa que los enlaces anteriores corresponden a la versión anterior y que una compra ya realizada debe recuperarse antes de pagar otra vez. Durante una petición de checkout se deshabilitan edición y cambio de plantilla para mantener estable la versión enviada.

**Pendientes de Agente 2:** verificar el estado real del proveedor antes de reutilizar enlaces; reconciliar aprobaciones/capturas, cancelaciones y vencimientos; decidir cómo invalidar o presentar enlaces de versiones anteriores; evitar compras duplicadas entre versiones, pestañas y respuestas de red perdidas. Los enlaces anteriores pueden seguir activos: este paquete no los cancela ni confirma cobros. Una confirmación tardía debe entregar el CV de su orden, sin apuntarlo silenciosamente a la nueva versión. Los borradores históricos sin ID no permiten reconstruir por sí solos un intento previo.

Los dos intentos reales siguen **pendientes de conciliación**, no son fallos confirmados. No se implementó captura, retorno, webhook ni el paquete de Agente 2.

## Conservación de Agente 0

Se conservan nombres, productores, campos permitidos, privacidad y compatibilidad histórica de eventos. No se agregó contenido del CV ni email a analítica. Tampoco se cambiaron precios, derechos de descarga/edición, rutas, metadatos ni contenido SEO.

La migración de Agente 0 ya está aplicada. No se ejecutaron migraciones ni escrituras remotas, cobros o emails.

## Verificaciones

- **68 tests aprobados en 15 suites.** Incluyen interacción React/DOM del creador y preview con PDF, autenticación y red simulados: cookie de generación consumida, edición de frase, guardado, cambio de plantilla, recarga desde selector y payload exacto de Mercado Pago; invitado sin sesión en inglés hasta PayPal; cancelación; validación; ID previo conservado; comparación de versiones y propiedad; compatibilidad histórica; límites, fotos y analítica de Agente 0.
- El generador simulado respondería 429 y su componente falla si se monta. Los recorridos de edición prueban que no se invoca.
- Typecheck: `node node_modules/typescript/bin/tsc --noEmit --incremental false`, aprobado.
- `git diff --check`, aprobado.
- Vitest requiere transformar TSX: se añadió configuración JSX automática a `vitest.config.ts`. No se agregaron dependencias.
- Las pruebas y el typecheck se ejecutaron fuera del sandbox tras errores locales de temporales/resolución de dependencias; allí pasaron. No se ejecutó lint ni build.
- No se verificó visualmente el PDF en navegador ni se efectuaron compras sandbox/reales. Las consultas de persistencia se probaron con dobles de prueba; no contra producción.

Comando de tests:

```powershell
node node_modules/vitest/vitest.mjs run tests/preview-editing.test.ts tests/cv-content.test.ts tests/payment-cv-snapshot.test.ts tests/create-flow-state.test.ts tests/guest-checkout.test.ts tests/guest-cv-generation.test.ts tests/guest-photo.test.ts tests/cv-schema.test.ts tests/payment-validation.test.ts tests/analytics-funnel.test.ts tests/analytics-transport.test.ts tests/analytics-event-policy.test.ts tests/analytics-events.test.ts tests/analytics-session.test.ts tests/analytics-attribution.test.ts
```

## Archivos del paquete

- Nuevos: `components/CVContentEditor.tsx`, `components/CVPreviewEditor.tsx`, `lib/cv-content.ts`.
- Modificados: `components/EditSavedCVForm.tsx`, `components/CVPreviewStep.tsx`, `components/pdf/CVForm.tsx`, `lib/create-flow-state.ts`, `lib/payment-cv.ts`, `vitest.config.ts`.
- Pruebas nuevas: `tests/preview-editing.test.ts`, `tests/payment-cv-snapshot.test.ts`, `tests/cv-content.test.ts`, `tests/fixtures/preview-cv.ts`.
- Documentación: este archivo.

No existe AGENTS.md en el repositorio inspeccionado; se aplicaron las instrucciones proporcionadas en el chat. Se conservaron los cambios ajenos en package.json, output y el script de Pinterest. No se hizo commit ni push.
