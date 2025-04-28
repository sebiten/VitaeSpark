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

## 🌐 Deployment

El proyecto está preparado para ser desplegado fácilmente en Vercel:

1. Conecta tu repositorio a [Vercel](https://vercel.com/).  
2. Configura las variables de entorno en el dashboard de Vercel.  
3. Vercel detectará automáticamente que es un proyecto Next.js y lo desplegará.

Para más detalles, consulta la [documentación oficial de Next.js sobre deployment](https://nextjs.org/docs/deployment).

---

## 📄 Estructura básica del proyecto

```bash
/app           → Páginas y rutas (Next.js App Router)
/components    → Componentes reutilizables
/lib           → Funciones auxiliares y utilidades
/styles        → Estilos globales (TailwindCSS, configuraciones)
/public        → Archivos estáticos (imágenes, favicon, etc.)
```
## 📚 Documentación adicional

- [Next.js Documentation](https://nextjs.org/docs)  
- [TailwindCSS Documentation](https://tailwindcss.com/docs)  
- [ShadCN UI Documentation](https://ui.shadcn.dev/docs)  
- [Clerk Documentation](https://clerk.dev/docs)  
- [Supabase Documentation](https://supabase.com/docs)  
- [@react-pdf/renderer Documentation](https://react-pdf.org/)  
- [MercadoPago API Documentation](https://www.mercadopago.com.ar/developers/es)

---

## ✨ Créditos

Desarrollado con pasión por **Sebastián Burgos**.  
Ayudando a las personas a destacar en su carrera profesional.

