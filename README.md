# Vitae Spark

**Vitae Spark** es una plataforma inteligente para la generación de currículums profesionales optimizados para sistemas ATS (Applicant Tracking Systems).  
Permite a los usuarios crear, personalizar y descargar su CV en formato PDF, utilizando plantillas modernas y tecnología de IA para mejorar su perfil laboral.

Este proyecto está desarrollado con [Next.js 15](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.dev/), [Supabase-Auth](https://supabase.com/) para autenticación, y [Supabase](https://supabase.com/) para la gestión de la base de datos.

---

## 🚀 Tecnologías principales

- **Next.js 15** (App Router, Server Actions)
- **TypeScript**
- **TailwindCSS + ShadCN UI**
- **Supabase** (Base de datos, Auth)
- **Clerk** (Autenticación segura)
- **@react-pdf/renderer** (Generación de PDFs)
- **MercadoPago API** (Sistema de pagos)
- **OpenAI API** (Generación asistida de contenido)

---

## 🛠️ Instalación y ejecución local

1. Clona este repositorio:


git clone https://github.com/tuusuario/vitae-spark.git
cd vitae-spark
---
Instala las dependencias:

bash
Copy
Edit
npm install
# o
yarn install
# o
pnpm install
Crea un archivo .env.local basado en .env.example y configura tus variables de entorno (Supabase, Clerk, MercadoPago, etc).
---
Inicia el servidor de desarrollo:

bash
Copy
Edit
npm run dev
# o
yarn dev
# o
pnpm dev
Abre http://localhost:3000 en tu navegador.

📦 Build para producción
Para generar el build de producción:

bash
Copy
Edit
npm run build
npm run start
🌐 Deployment
El proyecto está preparado para ser desplegado en Vercel.

Consulta la documentación oficial de Next.js para deployment para más detalles.

📄 Estructura básica del proyecto
bash
Copy
Edit
/app           → Páginas y rutas (Next.js App Router)
/components    → Componentes reutilizables
/lib           → Funciones auxiliares y utilidades
/styles        → Estilos globales
/public        → Archivos estáticos
📚 Documentación adicional
Documentación de Next.js

TailwindCSS

ShadCN UI

Clerk Documentation

Supabase Documentation

@react-pdf/renderer Docs

MercadoPago API Docs

✨ Créditos
Desarrollado con pasión por Sebastián Burgos.
Ayudando a las personas a destacar en su carrera profesional.

---
```bash

