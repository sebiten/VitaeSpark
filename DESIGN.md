---
name: VitaeSpark
description: Sistema visual sobrio y confiable para crear currículums profesionales.
colors:
  canvas-deep: "#0C0C10"
  canvas: "#111113"
  surface: "#1C1C22"
  surface-hover: "#252528"
  warm-white: "#F6F2EA"
  text-primary: "#F4F4F5"
  text-secondary: "#A1A1AA"
  violet: "#8B5CF6"
  violet-soft: "#C4B5FD"
  sky: "#38BDF8"
  border-subtle: "#FFFFFF14"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.6rem, 6vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.055em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  control: "999px"
  field: "16px"
  surface: "22px"
  feature: "34px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.canvas-deep}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.surface}"
    padding: "24px"
---

# Design System: VitaeSpark

## Overview

**Creative North Star: "El escritorio del editor"**

VitaeSpark debe sentirse como un espacio de trabajo profesional donde la información desordenada se vuelve clara. La interfaz es oscura, contenida y precisa; transmite criterio antes que tecnología. El violeta identifica acciones y estados importantes, pero nunca domina toda la pantalla.

El sistema rechaza los formularios recargados con demasiadas cards o cajas anidadas, el look SaaS genérico con exceso de gradientes y las interfaces experimentales o demasiado “tech”. La jerarquía debe bajar la carga cognitiva y hacer evidente el siguiente paso.

**Key Characteristics:**
- Superficies oscuras cálidas con contraste firme.
- Tipografía grande y compacta para mensajes decisivos.
- Bordes sutiles y profundidad principalmente tonal.
- Una acción primaria clara por contexto.
- Violeta reservado para orientación, selección y progreso.

## Colors

La paleta combina negros cálidos, blanco marfil y un violeta controlado. El celeste se reserva para información y enlaces útiles.

### Primary
- **Violeta de criterio:** identifica progreso, selección, foco y detalles de marca; no se usa como relleno dominante.
- **Marfil de acción:** fondo de los botones principales y texto de máxima jerarquía cuando se necesita una sensación humana y confiable.

### Secondary
- **Celeste informativo:** enlaces, estados informativos y referencias puntuales; nunca compite con la acción primaria.

### Neutral
- **Negro profundo:** fondo de escenas inmersivas, login y hero.
- **Carbón base:** fondo general de producto y contenido.
- **Grafito elevado:** controles, campos y superficies que realmente agrupan una tarea.
- **Gris editorial:** texto secundario legible, nunca por debajo del contraste necesario.

**The One Accent Rule.** El violeta ocupa como máximo una pequeña fracción de cada pantalla. Si todos los elementos llaman la atención, ninguno guía.

## Typography

**Display Font:** Geist (con fallback sans-serif)
**Body Font:** Geist (con fallback sans-serif)
**Label/Mono Font:** Geist Mono (con fallback monospace)

**Character:** Una sola familia mantiene el producto directo y contemporáneo. El carácter surge de la escala, el peso y el espaciado, no de mezclar tipografías decorativas.

### Hierarchy
- **Display** (600, escala fluida, line-height 0.95): heroes y mensajes de resultado; máximo cuatro líneas en mobile.
- **Headline** (600, escala fluida, line-height 1.08): títulos de sección y decisiones importantes.
- **Title** (600, 1rem–1.25rem, line-height 1.35): bloques funcionales y nombres de pasos.
- **Body** (400, 1rem, line-height 1.75): lectura y ayuda; ancho máximo de 65–75 caracteres.
- **Label** (600, 0.75rem, tracking amplio): categorías y contexto breve; nunca como sustituto de un título.

**The Editorial Measure Rule.** Ningún párrafo de lectura supera 75 caracteres por línea. La claridad vale más que llenar el ancho disponible.

## Elevation

La profundidad es tonal por defecto: fondo, superficie y borde sutil. Las sombras son ambientales, amplias y de baja opacidad; aparecen en previews, modales y elementos flotantes, no en cada tarjeta.

### Shadow Vocabulary
- **Ambient low** (`0 18px 50px rgba(0,0,0,0.32)`): sticky controls y superficies temporalmente elevadas.
- **Document lift** (`0 28px 70px rgba(0,0,0,0.34)`): previews de CV sobre el fondo oscuro.
- **Modal depth** (`0 26px 80px rgba(0,0,0,0.36)`): diálogos y confirmaciones de sesión.

**The Flat-by-Default Rule.** Una superficie en reposo no necesita sombra si el tono y un borde fino ya explican su jerarquía.

## Components

Los componentes son táctiles pero contenidos: radio generoso en controles, foco visible y un solo estado dominante.

### Buttons
- **Shape:** cápsula completa en acciones principales y secundarias.
- **Primary:** marfil cálido sobre texto casi negro; sin glow violeta.
- **Hover / Focus:** leve aumento de luminancia y anillo de foco violeta translúcido; no saltos pronunciados.
- **Secondary / Ghost:** fondo transparente o grafito tenue, borde blanco sutil y texto secundario.

### Chips
- **Style:** borde fino, fondo casi transparente y texto breve.
- **State:** el seleccionado usa un tinte violeta leve más un cambio de contraste, nunca solo color.

### Cards / Containers
- **Corner Style:** esquinas de 16–22px; 34px solo en escenas principales como login o checkout.
- **Background:** grafito únicamente cuando hay una agrupación funcional real.
- **Shadow Strategy:** plana por defecto; consultar Elevation.
- **Border:** una línea blanca de baja opacidad.
- **Internal Padding:** 16–24px; evitar anidar más de una superficie dentro de otra.

### Inputs / Fields
- **Style:** grafito translúcido, borde sutil y radio de 16px.
- **Focus:** borde violeta controlado más anillo amplio de baja opacidad.
- **Error / Disabled:** texto y borde explícitos; el estado no depende solo del color.

### Navigation
- Barra oscura estable, enlaces de contraste medio y una sola acción destacada. En mobile, la navegación secundaria se desplaza o colapsa sin tapar el contenido.

### CV Preview
- El documento claro es la principal evidencia visual del producto. Debe mostrar contenido reconocible, escala legible y una etiqueta funcional; nunca un rectángulo vacío o un skeleton decorativo.

## Do's and Don'ts

### Do:
- **Do** usar el marfil para la acción primaria y reservar el violeta para orientación y estado.
- **Do** usar espacio, tipografía y divisores finos antes de agregar otra card.
- **Do** mantener contraste sólido en placeholders, labels y estados interactivos.
- **Do** priorizar una acción importante por bloque y explicar el resultado de esa acción.
- **Do** mostrar previews de CV con contenido realista y legible.

### Don't:
- **Don't** crear formularios recargados con demasiadas cards o cajas anidadas.
- **Don't** usar un look SaaS genérico con exceso de gradientes, brillo o recursos decorativos.
- **Don't** diseñar interfaces experimentales, lúdicas o demasiado “tech”.
- **Don't** construir jerarquías visuales ruidosas que distraigan de completar el CV.
- **Don't** repetir etiquetas pequeñas en mayúsculas sobre cada bloque.
- **Don't** aplicar glow a todos los botones ni usar violeta sobre grandes superficies.
- **Don't** esconder contenido importante detrás de overlays, popups o sticky bars permanentes.
