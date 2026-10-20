# Reporte de mejoras SEO — 20 de octubre de 2026

## Resultado

Se diferenciaron las dos páginas de ejemplos, se corrigió contenido editorial en las páginas públicas y se añadieron o ampliaron 18 modelos completos de CV. Se revisaron las 58 rutas declaradas en el sitemap, la implementación compartida del glosario y los componentes principales de la home. Hay cambios en 55 archivos de páginas, además de los componentes y registros de contenido indicados abajo.

## Commits

1. **89cac06 — fix(seo): diferenciar landing de ejemplos y guía editorial.** La landing ofrece dos modelos completos, con y sin experiencia. El artículo analiza una postulación administrativa con antes/después de perfil, tareas y habilidades. Se conservaron URLs y canonical independientes.
2. **2bf9c90 — fix(content): corregir calidad editorial de páginas SEO.** Correcciones de tildes, preguntas, puntuación y traducciones incompletas; eliminación de textos internos destinados a SEO; revisión de afirmaciones sobre ATS, extensión y puntuación automática. Las páginas legales se revisaron sin modificar sus condiciones.
3. **feat(content): completar ejemplos de CV por intención de búsqueda.** Este reporte acompaña al tercer commit. Incluye 18 modelos, ajustes de imágenes de primer empleo, enlaces a los modelos generales, actualización de la tarjeta del artículo en el blog y fechas de modificación. El hash se entrega en el cierre de la tarea para evitar una autorreferencia del commit.

## Modelos completos añadidos o ampliados

- /cv-para-primer-empleo
- /curriculum-sin-experiencia
- /cv-para-programadores
- /cv-para-medicos
- /cv-para-estudiantes
- /cv-atencion-al-cliente-sin-experiencia
- /cv-call-center
- /cv-para-cajero-sin-experiencia
- /cv-para-vendedor
- /cv-para-recepcionista
- /cv-para-repositor
- /cv-para-seguridad
- /cv-para-limpieza
- /cv-para-vendedor-sin-experiencia
- /cv-para-recepcionista-sin-experiencia
- /cv-para-administrativo-sin-experiencia
- /cv-para-operario-sin-experiencia
- /cv-para-seguridad-sin-experiencia

Los modelos incluyen contacto, perfil, experiencia o actividades, formación, habilidades y disponibilidad. Están identificados como ficticios y usan campos para completar. Los ejemplos de medicina y seguridad distinguen formación, habilitaciones y funciones reales. Los proyectos de primer empleo se identifican como actividades, sin atribuirlos a empleos inexistentes.

Se conservaron los modelos completos existentes de cajero, administrativo, atención al cliente, operario, minería y el modelo general. Para las páginas iniciales se reutilizó la imagen de primer empleo como referencia visual general, con un pie que distingue esa imagen del modelo específico en texto; no se generaron imágenes nuevas.

## Archivos de páginas modificados

- app/blog/como-adaptar-tu-cv-a-una-vacante/page.tsx
- app/blog/como-hacer-un-curriculum-sin-experiencia/page.tsx
- app/blog/como-hacer-un-curriculum/page.tsx
- app/blog/como-hacer-un-cv-ats/page.tsx
- app/blog/como-hacer-un-cv-para-programador/page.tsx
- app/blog/como-hacer-un-cv-para-trabajo/page.tsx
- app/blog/como-hacer-un-cv-profesional/page.tsx
- app/blog/como-mejorar-mi-curriculum/page.tsx
- app/blog/ejemplo-de-curriculum-vitae/page.tsx
- app/blog/ejemplo-de-perfil-profesional/page.tsx
- app/blog/errores-en-el-curriculum/page.tsx
- app/blog/habilidades-blandas-para-cv/page.tsx
- app/blog/habilidades-para-curriculum/page.tsx
- app/blog/page.tsx
- app/blog/perfil-profesional-para-cv/page.tsx
- app/blog/que-poner-en-un-curriculum/page.tsx
- app/comparar/cv-ats-vs-cv-convencional/page.tsx
- app/comparar/cv-harvard-vs-cv-tradicional/page.tsx
- app/comparar/plantilla-harvard-vs-moderna/page.tsx
- app/curriculum-ats/page.tsx
- app/curriculum-sin-experiencia/page.tsx
- app/curriculum-vitae-ejemplo/page.tsx
- app/curriculum-vitae-pdf/page.tsx
- app/cv-atencion-al-cliente-sin-experiencia/page.tsx
- app/cv-call-center/page.tsx
- app/cv-para-administrativo-sin-experiencia/page.tsx
- app/cv-para-administrativo/page.tsx
- app/cv-para-atencion-al-cliente/page.tsx
- app/cv-para-cajero-sin-experiencia/page.tsx
- app/cv-para-cajero/page.tsx
- app/cv-para-estudiantes/page.tsx
- app/cv-para-limpieza/page.tsx
- app/cv-para-medicos/page.tsx
- app/cv-para-mineria/page.tsx
- app/cv-para-operario-sin-experiencia/page.tsx
- app/cv-para-operario/page.tsx
- app/cv-para-primer-empleo/page.tsx
- app/cv-para-programadores/page.tsx
- app/cv-para-recepcionista-sin-experiencia/page.tsx
- app/cv-para-recepcionista/page.tsx
- app/cv-para-repositor/page.tsx
- app/cv-para-seguridad-sin-experiencia/page.tsx
- app/cv-para-seguridad/page.tsx
- app/cv-para-vendedor-sin-experiencia/page.tsx
- app/cv-para-vendedor/page.tsx
- app/cv-profesional/page.tsx
- app/glosario/como-escribir-perfil-profesional/page.tsx
- app/glosario/que-es-ats-curriculum/page.tsx
- app/glosario/que-es-currriculum-vitae/page.tsx
- app/hacer-cv-con-ia/page.tsx
- app/herramientas/generador-habilidades-cv/page.tsx
- app/modelo-de-curriculum-vitae/page.tsx
- app/page.tsx
- app/plantilla-harvard/page.tsx
- app/plantillas-curriculum/page.tsx

Otros archivos: components/hero.tsx, components/WelcomeHero.tsx, data/blog-posts.ts y lib/seo-routes.ts. Se actualizaron las fechas de cambios sustanciales al 2026-10-20; las correcciones puramente ortográficas no se presentaron como nuevas publicaciones. Los artículos modificados sustancialmente consultan ese registro para su fecha visible y estructurada.

## Verificación realizada

- Análisis de sintaxis TS/TSX mediante TypeScript, sin generar archivos de aplicación: sin errores detectados. Esta comprobación no equivale a un chequeo completo de tipos o un build.
- Recorrido estático de las 58 rutas públicas: 250 enlaces internos declarados como propiedades y 23 referencias de imágenes comprobados contra el proyecto, sin destinos faltantes.
- Los 18 modelos contienen contacto, perfil, formación y habilidades; conservan el path de metadata de su URL y tienen fecha de modificación en el sitemap.
- Revisión de los diffs y git diff --check sin errores de espacios.
- Revisión React: se reutilizan las interfaces existentes; no se añadieron hooks, dependencias, peticiones ni componentes cliente.
- Sin build, lint ni suite de tests: se realizaron verificaciones estáticas específicas de contenido y sintaxis.

## Límites y pendientes

No se ejecutó un despliegue ni se hizo push. No había servidor local activo en los puertos 3000/3001, por lo que quedó pendiente la comprobación visual en navegador. Las comprobaciones de enlaces son de existencia local; no certifican respuestas HTTP de producción.

No se midieron posiciones, indexación, CTR ni tráfico: el conector de Search Console requiere una suscripción activa. La diferenciación de contenido reduce el solapamiento editorial, pero su efecto SEO debe evaluarse con datos después de publicar.

No se implementaron las mejoras de prioridad media: índice por profesión, autoría visible, optimización de rendimiento ni ajuste general del título de marca. Se preservaron los cambios preexistentes de package.json, output/ y scripts/generate-pinterest-pins.mts.

La revisión de las afirmaciones sobre lectura de archivos ATS tuvo como referencia la documentación del proveedor [Greenhouse](https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse). Sus restricciones describen ese producto y no se generalizaron a todos los sistemas.
