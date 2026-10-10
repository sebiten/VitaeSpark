# Publicación de paquetes 1–4 — 10 de octubre de 2026

El usuario autorizó hacer push y continuar las verificaciones directamente en producción. Esta decisión reemplaza la restricción previa de no publicar; no convierte las verificaciones pendientes en pruebas aprobadas.

## Comprobación previa

- Regresión completa: 199 pruebas aprobadas en 37 suites. Se omitieron 10 pruebas de una suite PostgreSQL/WASM por ausencia de `PAYMENT_TEST_PGLITE`; no se instaló ni ejecutó una migración remota.
- `next build` aprobado, incluidas comprobaciones de tipos y generación de 104 páginas estáticas. Advertencia de rendimiento de caché de webpack, sin errores de compilación.
- `git diff --cached --check` aprobado.
- Ambos destinos configurados de `origin` tenían `main` en `93ccf1513c97a5011ec00d17651634caaee75da9`: GitHub `sebiten/VitaeSpark` y GitLab `reservaspro.online/vitaespark`.
- Se incluyen implementación, pruebas y documentación de los agentes 1–4. Quedan fuera el cambio de `package.json` para Pinterest, `scripts/generate-pinterest-pins.mts`, `output/facebook-direct-offers.txt` y `output/social/`.
- Proyecto de producción verificado: Vercel `vitaespark`, `prj_lwbxaNzHhR8ToAq9xc8AWUwsgNgN`, equipo `team_UAl5DJGoWpoaz2C3BdPxep4S`; dominio `vitaespark.com`.
- Deployment de producción previo: `dpl_8AjLeRDdwhPayjjMjijedWi9QjMY`, estado READY y candidato a rollback. No se ejecutó rollback ni se cambió la configuración de Vercel.

## Verificaciones pendientes en producción

1. Entrada por Harvard, precio regional, conservación del borrador y edición sin regenerar.
2. Generación real de primer empleo y revisión del PDF en un navegador compatible.
3. Compra nueva controlada: aprobación, entrega por correo, recuperación y nueva descarga. No usar las dos órdenes históricas como pruebas ni invocar sus retornos/webhooks.
4. Cancelación y reintento; las pruebas automatizadas locales usan proveedores simulados y no demuestran comportamiento transaccional real.

La migración `20261005230057_payment_recovery` y la de medición ya están aplicadas. No reaplicar ni ejecutar `db push`. Los dos intentos PayPal históricos siguen pendientes de consulta externa en modo lectura.
