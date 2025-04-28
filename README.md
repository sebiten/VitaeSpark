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

### 1. Clona este repositorio

```bash
git clone https://github.com/tuusuario/vitae-spark.git
cd vitae-spark
npm i
npm run dev
```
### Configuración de variables de entorno

1. **Supabase**  
   - `NEXT_PUBLIC_SUPABASE_URL`  
     - Desarrollo: `http://localhost:3000`  
     - Producción: `https://tudominio.com`  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - `SUPABASE_SERVICE_ROLE_KEY`

2. **MercadoPago**  
   - `MERCADOPAGO_PUBLIC_KEY`  
   - `MERCADOPAGO_ACCESS_TOKEN`

3. **Google OAuth**  
   - `GOOGLE_CLIENT_ID`  (Client ID desde Google Cloud Console)  
   - `GOOGLE_CLIENT_SECRET`  (Client Secret desde Google Cloud Console)  

