# ECCIA / Littus Group América — Frontend Design System
## Guía para agentes de IA: diseño de interfaces y materiales digitales

> Este documento describe el sistema visual oficial de Littus Group América / ECCIA extraído del brochure de Entrenamiento NDT 2026. Úsalo como referencia canónica al generar cualquier interfaz, componente, poster, presentación o material digital de la marca.

---

## 1. Identidad de la marca

**Empresa:** Littus Group América  
**División:** ECCIA (Entrenamiento, Calificación, Certificación, Intercomparación y Aptitud del personal)  
**Sector:** Ensayos No Destructivos (NDT) — industrias petrolera, minera y energética  
**Tono:** Técnico, profesional, confiable. Autoridad sin arrogancia. Industrial con precisión.  
**Tagline recurrente:** *"Compartiendo nuestra experiencia"*

---

## 2. Paleta de colores

Usa **exclusivamente** estas variables CSS. No inventes colores fuera de esta paleta.

```css
:root {
  /* Primarios */
  --color-bg-dark:      #0d0d0d;   /* Negro profundo — fondo principal dark */
  --color-bg-dark-2:    #1a1a1a;   /* Negro secundario — cards, secciones internas */
  --color-blue-primary: #0099ff;   /* Azul eléctrico — acento principal, títulos en páginas claras */
  --color-blue-dark:    #1a3f8f;   /* Azul oscuro/marino — elementos decorativos grandes (círculo hero) */
  --color-white:        #ffffff;   /* Blanco puro — texto sobre fondos oscuros */

  /* Texto */
  --color-text-primary:   #ffffff; /* Texto principal sobre fondos oscuros */
  --color-text-secondary: #cccccc; /* Texto de soporte / subtítulos */
  --color-text-muted:     #999999; /* Texto terciario / metadata */
  --color-text-dark:      #111111; /* Texto sobre fondos claros */

  /* Acentos */
  --color-accent:         #0099ff; /* = blue-primary, uso en links, highlights, números grandes */
  --color-accent-cyan:    #00cfff; /* Variante más clara del azul para gradientes sutiles */

  /* Fondos de página */
  --bg-page-dark:  #0d0d0d;        /* Páginas de portada, secciones hero */
  --bg-page-light: #ffffff;        /* Páginas de contenido/texto */
  --bg-section-accent: #0099ff;    /* Bandas de color para headers de sección */
}
```

### Regla de uso por sección

| Tipo de sección | Fondo | Texto principal | Acento |
|---|---|---|---|
| Hero / portada | `--color-bg-dark` | `--color-white` | `--color-blue-primary` |
| Páginas de contenido | `--color-white` o `--bg-page-light` | `--color-text-dark` | `--color-blue-primary` |
| Header de sección (banda) | `--color-blue-primary` | `--color-white` | — |
| Cards / módulos | `--color-bg-dark-2` | `--color-white` | `--color-blue-primary` |
| Footer / pie de página | `--color-blue-primary` | `--color-white` | — |

---

## 3. Tipografía

El brochure utiliza una familia sans-serif geométrica moderna con pesos marcados. Para implementaciones web usa:

```css
/* Importar desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap');

:root {
  --font-display:   'Barlow Condensed', 'Arial Narrow', sans-serif; /* Títulos grandes, hero */
  --font-body:      'Barlow', 'Helvetica Neue', sans-serif;          /* Cuerpo de texto */

  /* Escalas de tamaño */
  --text-hero:    clamp(3rem, 8vw, 6rem);   /* Títulos de portada: "Entrenamiento NDT 2026" */
  --text-h1:      clamp(2rem, 5vw, 3.5rem); /* Títulos de sección */
  --text-h2:      1.5rem;                   /* Subtítulos */
  --text-h3:      1.125rem;                 /* Títulos de card / módulo */
  --text-body:    0.9375rem;                /* Cuerpo (15px) */
  --text-small:   0.8125rem;               /* Metadata, footers (13px) */
  --text-stat:    clamp(2.5rem, 6vw, 4rem); /* Números estadísticos: "25+", "1500+" */
}
```

### Reglas tipográficas

- Los **títulos hero** van en `font-family: var(--font-display)`, `font-weight: 800`, `text-transform: uppercase`.
- Los **números de estadísticas** ("25+", "1500+") son `var(--text-stat)`, `font-weight: 800`, color `var(--color-blue-primary)`.
- Los **números de módulo** ("01", "02"...) son color `var(--color-blue-primary)`, `font-weight: 700`, separados del título por espacio generoso.
- El cuerpo de texto usa `font-weight: 300` o `400`, nunca negrita en bloques largos.
- `line-height: 1.6` para párrafos; `line-height: 1.1` para títulos hero.

---

## 4. Layout y composición espacial

### Grid base

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 3rem);
}

.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.grid-4col-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Para bloques de estadísticas */
  gap: 1.5rem;
}
```

### Estructura de página recurrente

Cada sección del brochure sigue este patrón:

```
┌─────────────────────────────────────────┐
│  HEADER AZUL (banda)                    │
│  Título grande de la sección            │
│  Subtítulo / descriptor                 │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  CUERPO (fondo dark o white)            │
│  Contenido principal                    │
│  ...                                    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  FOOTER AZUL (banda)                    │
│  cursos.littusgroup.com    Página XX    │
└─────────────────────────────────────────┘
```

### Proporciones y espaciado

```css
:root {
  --space-xs:   0.5rem;
  --space-sm:   1rem;
  --space-md:   2rem;
  --space-lg:   3rem;
  --space-xl:   5rem;

  --radius-card:   8px;   /* Bordes de cards */
  --radius-photo:  50%;   /* Fotos de instructores (círculo) */
  --radius-badge:  4px;   /* Badges y etiquetas */
}
```

---

## 5. Elementos decorativos

El brochure tiene un conjunto de elementos visuales recurrentes que definen la identidad. **Inclúyelos** en toda interfaz.

### 5.1 Círculo decorativo (hero)

Círculo azul marino grande, parcialmente recortado, en esquina superior derecha del hero:

```css
.deco-circle {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background-color: var(--color-blue-dark); /* #1a3f8f */
  z-index: 0;
  pointer-events: none;
}
```

### 5.2 Grid de puntos (dot matrix)

Patrón de puntos azules en esquina derecha, usado como elemento de fondo en secciones de contenido:

```css
.deco-dots {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 120px;
  height: 150px;
  background-image: radial-gradient(circle, var(--color-blue-primary) 1.5px, transparent 1.5px);
  background-size: 12px 12px;
  opacity: 0.6;
  pointer-events: none;
}
```

### 5.3 Triángulo / flecha decorativa

Forma triangular azul a la derecha del dot matrix, apuntando hacia la izquierda:

```css
.deco-arrow {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 60px solid transparent;
  border-bottom: 60px solid transparent;
  border-right: 60px solid var(--color-blue-primary);
}
```

### 5.4 Línea divisora de módulos

Separador horizontal sutil entre módulos de contenido:

```css
.module-divider {
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.1); /* sobre fondos dark */
  /* ó */
  background: rgba(0,0,0,0.08);      /* sobre fondos claros */
  margin: var(--space-md) 0;
}
```

### 5.5 Triángulo blanco inferior izquierdo

Forma blanca triangular en la esquina inferior izquierda de secciones hero oscuras:

```css
.deco-corner-white {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  border-bottom: 80px solid white;
  border-right: 80px solid transparent;
}
```

---

## 6. Componentes

### 6.1 Card de módulo de contenido

Patrón de los módulos "01 Introducción…", "02 Materiales…", etc.:

```html
<div class="module-card">
  <div class="module-header">
    <span class="module-number">01</span>
    <h3 class="module-title">Título del Módulo</h3>
  </div>
  <ul class="module-items">
    <li>Subtema uno</li>
    <li>Subtema dos</li>
  </ul>
</div>
```

```css
.module-card {
  padding: var(--space-md) 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.module-number {
  color: var(--color-blue-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-right: var(--space-sm);
}
.module-title {
  font-size: var(--text-h3);
  font-weight: 600;
  color: var(--color-white);
  display: inline;
}
.module-items {
  list-style: none;
  padding-left: 2.5rem;
  margin-top: var(--space-xs);
  color: var(--color-text-secondary);
  font-size: var(--text-small);
  line-height: 1.8;
}
```

### 6.2 Card de beneficio / feature

Patrón de las cards de "Lo que obtendrás":

```css
.benefit-card {
  background: var(--color-bg-dark-2);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: var(--radius-card);
  padding: var(--space-md);
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}
.benefit-card .icon {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: var(--color-blue-primary);
}
.benefit-card p {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
```

### 6.3 Card de pricing

Patrón de los planes "$250 / $400 + IVA":

```css
.pricing-card {
  border: 1.5px solid var(--color-blue-primary);
  border-radius: var(--radius-card);
  padding: var(--space-md);
  background: transparent;
  color: var(--color-text-dark);  /* sobre fondo blanco */
}
.pricing-card .plan-title {
  font-size: var(--text-h3);
  font-weight: 700;
  margin-bottom: var(--space-xs);
}
.pricing-card .price {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-blue-primary);
  line-height: 1;
}
.pricing-card .price-note {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}
.pricing-card ul {
  list-style: none;
  margin-top: var(--space-sm);
}
.pricing-card ul li::before {
  content: "✓";
  color: var(--color-blue-primary);
  font-weight: 700;
  margin-right: 0.5rem;
}
```

### 6.4 Estadísticas ("25+", "1500+")

```html
<div class="stats-grid">
  <div class="stat-item">
    <span class="stat-value">25+</span>
    <span class="stat-label">Años de experiencia</span>
  </div>
</div>
```

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-md);
}
.stat-value {
  display: block;
  font-size: var(--text-stat);
  font-weight: 800;
  color: var(--color-blue-primary);
  line-height: 1;
}
.stat-label {
  display: block;
  font-size: var(--text-small);
  color: var(--color-text-secondary);
  margin-top: 0.25rem;
  line-height: 1.3;
}
```

### 6.5 Card de instructor

Foto circular + nombre + rol en azul:

```css
.instructor-card {
  text-align: center;
  max-width: 280px;
}
.instructor-photo {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto var(--space-sm);
  display: block;
}
.instructor-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-dark);
  margin-bottom: 0.25rem;
}
.instructor-role {
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--color-blue-primary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-sm);
}
.instructor-detail-label {
  font-weight: 700;
  font-size: var(--text-small);
  color: var(--color-text-dark);
}
.instructor-detail-value {
  font-size: var(--text-small);
  color: var(--color-text-muted);
}
```

### 6.6 Header de sección (banda azul)

```html
<header class="section-header">
  <h1 class="section-title">Entrenamiento NDT<br>Edición 2026</h1>
  <div class="deco-dots"></div>
  <div class="deco-arrow"></div>
</header>
```

```css
.section-header {
  background: var(--color-blue-primary);
  color: var(--color-white);
  padding: var(--space-lg) var(--space-lg);
  position: relative;
  overflow: hidden;
}
.section-title {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: 800;
  text-transform: none; /* los headers de sección NO van en mayúsculas */
  line-height: 1.1;
  position: relative;
  z-index: 1;
}
```

### 6.7 Footer de página

```css
.page-footer {
  background: var(--color-blue-primary);
  color: var(--color-white);
  padding: var(--space-sm) var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--text-small);
}
.page-footer a,
.page-footer span {
  color: var(--color-white);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.page-footer .page-number {
  font-weight: 700;
}
```

---

## 7. Iconografía

- Usar iconos **line-style** (contorno, no relleno sólido) en color `var(--color-blue-primary)`.
- Tamaño estándar: `24px` en cards, `36px` en cards grandes de beneficios.
- Fuentes de iconos recomendadas: **Lucide**, **Phosphor Icons**, o SVG inline.
- Para iconos de contacto (teléfono, dirección, web, email): siempre con el ícono a la izquierda del texto, en azul primario.

---

## 8. Fotografía e imágenes

- Las fotos de contexto son **industriales**: inspectores en campo con cascos blancos, trajes de trabajo azul marino, equipos de inspección.
- Siempre aplicar un **overlay oscuro semi-transparente** (`rgba(0,0,0,0.45)`) sobre fotos usadas como fondo.
- Las fotos de instructores van en **recorte circular** (`border-radius: 50%`).
- No usar ilustraciones, solo fotografía real o placeholder con esas características.

---

## 9. Recursos de marca

| Recurso | URL / Referencia |
|---|---|
| Plataforma de cursos | `cursos.littusgroup.com` |
| Sitio principal | `littusgroup.com` |
| Portal de inspectores | `littusgroup.com/ndtsearch/` |
| Facebook | @Littus Group America - Entrenamiento y Certificación |
| LinkedIn | /company/littusgroup |
| TikTok | @littus.group.amer |
| Email principal | `info@littusgroup.com` |
| Email ECCIA | `emena@littusgroup.com` |
| Teléfono 1 | +593 98 118 1997 |
| Teléfono 2 | +593 98 728 2369 |
| Dirección | Sergio Guarderas Oe7 235, Puente 4, Autopista Rumiñahui, CP 170806, Quito |

---

## 10. Normas de cumplimiento a mencionar

Cuando el contexto sea curricular/técnico, mencionar siempre:

- **ASNT CP-105** — estándar que rige el contenido de los cursos
- **SNT-TC-1A** — esquema de certificación de personal NDT
- **ISO 9712** — esquema de certificación alternativo
- El certificado de entrenamiento es **avalado por un Nivel III ASNT**

---

## 11. Reglas de diseño — qué NO hacer

- ❌ No usar `purple`, `green`, `red` ni ningún color fuera de la paleta definida.
- ❌ No usar fuentes genéricas: `Inter`, `Roboto`, `Arial`, `system-ui` como fuente display.
- ❌ No usar gradientes en los fondos principales (los fondos son planos: negro o azul sólido).
- ❌ No redondear fotos de contexto (solo las de instructores van en círculo).
- ❌ No usar fondos blancos para secciones hero o portadas.
- ❌ No agregar sombras excesivas en cards — el contraste se logra con borde `rgba` sutil.
- ❌ No inventar contenido textual (nombres, precios, fechas, certificaciones). Usar solo lo documentado en este archivo.
- ❌ No omitir los elementos decorativos (círculo, dots, triángulo) en layouts de sección completa.

---

## 12. Plantilla base HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ECCIA — Littus Group América</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;600;700;800&family=Barlow+Condensed:wght@700;800;900&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --color-bg-dark:      #0d0d0d;
      --color-bg-dark-2:    #1a1a1a;
      --color-blue-primary: #0099ff;
      --color-blue-dark:    #1a3f8f;
      --color-white:        #ffffff;
      --color-text-primary:   #ffffff;
      --color-text-secondary: #cccccc;
      --color-text-muted:     #999999;
      --color-text-dark:      #111111;
      --font-display: 'Barlow Condensed', 'Arial Narrow', sans-serif;
      --font-body:    'Barlow', 'Helvetica Neue', sans-serif;
      --text-hero:  clamp(3rem, 8vw, 6rem);
      --text-h1:    clamp(2rem, 5vw, 3.5rem);
      --text-stat:  clamp(2.5rem, 6vw, 4rem);
      --text-body:  0.9375rem;
      --text-small: 0.8125rem;
      --space-sm: 1rem; --space-md: 2rem; --space-lg: 3rem;
      --radius-card: 8px;
    }

    body {
      font-family: var(--font-body);
      background: var(--color-bg-dark);
      color: var(--color-text-primary);
      line-height: 1.6;
    }

    /* Inserta aquí los componentes necesarios */
  </style>
</head>
<body>
  <!-- Contenido -->
</body>
</html>
```

---

*Documento generado a partir del brochure oficial: Entrenamiento NDT 2026 — Littus Group América / ECCIA.*  
*Versión: 1.0 — Junio 2026*
