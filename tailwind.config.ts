import type { Config } from "tailwindcss"

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7C3AED", // Violeta brillante
          foreground: "#F4F4F5", // Texto claro
        },
        secondary: {
          DEFAULT: "#38BDF8", // Celeste vibrante
          foreground: "#0F0F10", // Fondo oscuro
        },
        destructive: {
          DEFAULT: "#EF4444", // Rojo coral suave
          foreground: "#F4F4F5", // Texto claro
        },
        muted: {
          DEFAULT: "#1F1F22", // Gris oscuro
          foreground: "#F4F4F5", // Texto claro
        },
        accent: {
          default: "#A78BFA", // Lavanda claro
          foreground: "#0F0F10", // Fondo oscuro
        },
        popover: {
          DEFAULT: "#0F0F10", // Fondo oscuro
          foreground: "#F4F4F5", // Texto claro
        },
        card: {
          DEFAULT: "#0F0F10", // Fondo oscuro
          foreground: "#F4F4F5", // Texto claro
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
} satisfies Config

export default config
