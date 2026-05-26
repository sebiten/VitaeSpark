# Vitae Spark

Vitae Spark es una plataforma para crear curriculums profesionales con inteligencia artificial, optimizados para sistemas ATS y exportables en PDF.

La app permite:

- registrarse e iniciar sesion con Supabase Auth
- completar un formulario guiado para generar el CV
- mejorar el contenido con OpenAI
- elegir plantillas visuales
- pagar la generacion/descarga mediante Mercado Pago
- guardar CVs en el perfil del usuario
- administrar ciertos datos desde un panel interno

## Stack principal

- Next.js 15 con App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Supabase
- OpenAI API
- Mercado Pago
- Arcjet
- Vercel Analytics

## Estructura del proyecto

```text
app/
  (auth)/               Flujo de login, callback y recuperacion
  api/                  Endpoints para IA, pagos, webhook y keepalive
  crear/                Flujo principal para crear el CV
  perfil/               CVs generados por el usuario
  abelardo/admin/       Panel interno y acciones administrativas
components/             UI, landing, formulario y preview
components/pdf/         Generacion y plantillas del CV en PDF
lib/                    Tipos y utilidades generales
utils/supabase/         Clientes y helpers de Supabase
public/                 Assets estaticos
```

## Variables de entorno

Crea un archivo `.env.local` con estas variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET=

OPENAI_API_KEY=
MERCADOPAGO_ACCESS_TOKEN=

ARCJET_KEY=
CRON_SECRET=
```

### Que usa cada variable

- `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto en Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: clave publica para auth y acceso cliente
- `SUPABASE_SERVICE_ROLE_KEY`: clave privada para tareas de servidor
- `NEXT_PUBLIC_SITE_URL`: base usada en redirects, recovery y pagos
- `NEXT_PUBLIC_BASE_URL`: base usada para metadata SEO
- `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET`: bucket usado por acciones administrativas
- `OPENAI_API_KEY`: generacion de contenido del CV
- `MERCADOPAGO_ACCESS_TOKEN`: creacion de preferencias y consulta de pagos
- `ARCJET_KEY`: proteccion de endpoints como la generacion de CV
- `CRON_SECRET`: autorizacion del endpoint `/api/keepalive`

## Instalacion local

Instala dependencias con el gestor que prefieras:

```bash
npm install
```

o

```bash
pnpm install
```

Luego inicia el entorno de desarrollo:

```bash
npm run dev
```

o

```bash
pnpm dev
```

La app quedara disponible en [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run social:posts
```

## Flujo principal de la app

1. El usuario inicia sesion o crea una cuenta.
2. Accede a `/crear` y selecciona una plantilla.
3. Completa sus datos profesionales.
4. La API `/api/generate-cv` mejora el contenido con OpenAI y valida la salida.
5. El usuario previsualiza el CV.
6. La API `/api/create-payment` crea la preferencia en Mercado Pago.
7. El webhook `/api/webhook` confirma el pago.
8. El CV queda asociado al perfil y disponible en `/perfil`.

## Rutas importantes

- `/`: landing principal
- `/login`: autenticacion
- `/crear`: generador de CV
- `/perfil`: CVs del usuario
- `/api/generate-cv`: generacion del CV con IA
- `/api/create-payment`: creacion del checkout
- `/api/webhook`: confirmacion de pagos
- `/api/keepalive`: endpoint de verificacion protegido por `CRON_SECRET`

## Notas de desarrollo

- El proyecto usa Supabase SSR para manejar la sesion entre server components y middleware.
- La generacion del CV espera JSON valido desde OpenAI y luego lo valida con `zod`.
- El endpoint de pagos depende de que `NEXT_PUBLIC_SITE_URL` apunte correctamente al dominio actual.
- El panel `app/abelardo/admin` contiene acciones administrativas y utilidades internas; conviene revisarlo antes de exponerlo en produccion.

## Despliegue

El proyecto puede desplegarse en Vercel o en cualquier entorno compatible con Next.js 15.

Checklist minimo antes de produccion:

- configurar todas las variables de entorno
- verificar auth en Supabase
- configurar `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_BASE_URL` con el dominio real
- configurar Mercado Pago con URLs publicas accesibles
- revisar seguridad del webhook y politicas de Supabase
- probar el flujo completo: login, generacion, pago y acceso al perfil

## Estado actual

Vitae Spark ya tiene una base funcional de producto: landing, autenticacion, generacion asistida por IA, plantillas, perfil y flujo de pago. Aun asi, antes de una salida fuerte a produccion conviene endurecer el webhook, limpiar documentacion tecnica y revisar algunos flujos administrativos.
