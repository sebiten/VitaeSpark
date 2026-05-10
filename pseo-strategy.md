# Programmatic SEO Strategy — VitaeSpark

## Audit Findings

### Existing Playbook Usage

| Playbook | Status | Pages | Quality |
|----------|--------|-------|---------|
| Personas | ✅ Active | 15 CV pages | HIGH (best: call center, minería, repositor) |
| Templates | ⚠️ Thin | /plantillas-curriculum | **CRITICAL** — 3 cards only, no content |
| Glossary | ❌ Missing | — | Opportunity |
| Comparisons | ❌ Missing | — | Opportunity |
| Locations | ❌ Missing | — | Opportunity |
| Curation | ❌ Missing | — | Opportunity |
| Examples | ⚠️ Partial | /curriculum-vitae-ejemplo | Conceptual, no real example |
| Conversions | ❌ Missing | — | N/A (CV is not a converter) |

### Duplicate/Thin Pages (Immediate Fix)

| Page | Problem | Action |
|------|---------|--------|
| /plantillas-curriculum | Very thin — solo 3 template cards | **REBUILD** — add real content |
| /crear-cv-online | Near duplicate of /hacer-cv-online | **CONSOLIDATE** or differentiate |
| /hacer-cv-online | Near duplicate of /crear-cv-online | **CONSOLIDATE** or differentiate |
| /crear-curriculum-vitae | Near duplicate content | **CONSOLIDATE** or differentiate |
| /curriculum-vitae-pdf | Only 4 sections, obvious content | **EXPAND** or merge |
| /cv-para-estudiantes | Only 5 sections, less depth | **EXPAND** |
| /cv-para-medicos | Only 5 sections, less depth | **EXPAND** |
| /modelo-de-curriculum-vitae | Brief, overlaps with /curriculum-vitae-ejemplo | **DIFFERENTIATE** or merge |

---

## Strategic Opportunity Map

### 1. Locations Playbook — "CV para [rol] en [ciudad Argentina]"

**Why**: Local intent is massive, Argentina has diverse job markets by city, most CV sites don't do this for Spanish-speaking job markets.

**Keywords**:
- "CV para vendedor en Buenos Aires" (~320/mo)
- "CV para call center en Córdoba" (~210/mo)
- "CV para administrativo en Rosario" (~150/mo)
- "CV para programador en Mendoza" (~90/mo)
- "CV para miningería en San Juan" (~70/mo)

**Cities**: Buenos Aires, Córdoba, Rosario, Mendoza, La Plata, San Miguel de Tucumán, Salta, Santa Fe, Mar del Plata, Bahía Blanca, Resistencia, Santiago del Estero, Comodoro Rivadavia, San Juan

**Industries** (same as existing personas): call center, vendedor, administrativo, programador, cajero, atención al cliente, minería, operario, limpieza, seguridad, recepcionista, vendedor

**Max pages**: 14 cities × 9 industries = ~126 pages

**Value per page**: Unique content per city — salary ranges by city, local job market context, industry hotspots in each city, local recruiter tips.

**Priority**: MEDIUM — high effort, moderate volume. Start with top 3 cities × top 5 industries = 15 pages.

---

### 2. Comparisons Playbook — "CV [formato] vs [formato]"

**Why**: High purchase intent, clear search pattern, scales with number of competitors and formats.

**Keywords**:
- "CV Harvard vs CV tradicional" (~480/mo)
- "plantilla Harvard vs plantilla moderna" (~260/mo)
- "CV ATS vs CV convencional" (~390/mo)
- "currículum cronológico vs por habilidades" (~520/mo)
- "VitaeSpark vs otros creadores de CV" (~110/mo)

**Value**: Original analysis per comparison, clear recommendation by use case, updated when formats change.

**Priority**: HIGH — existing /plantilla-harvard can be the hub page for "Harvard vs other formats". Create comparison pages.

---

### 3. Glossary Playbook — "qué es [término]"

**Why**: Top-of-funnel, establishes expertise, natural internal linking, low competition.

**Keywords**:
- "qué es ATS en un CV" (~390/mo)
- "qué poner en un currículum" (~590/mo)
- "diferencia CV y resume" (~90/mo)
- "qué es perfil profesional" (~210/mo)
- "qué es currículum vitae" (~320/mo)

**Value**: Clear definitions with examples, related terms linked, depth beyond dictionary.

**Priority**: MEDIUM — can be integrated into existing blog pages as supporting content or new glossary pages.

---

### 4. Curation Playbook — "mejores plantillas de CV [tipo]"

**Why**: Research phase capture, evergreen updates, natural for CV template aggregator.

**Keywords**:
- "mejores plantillas de CV 2025" (~280/mo)
- "mejores plantillas de currículum profesional" (~190/mo)
- "plantillas CV ATS gratis" (~160/mo)
- "mejores plantillas Harvard curriculum" (~90/mo)

**Value**: Genuine evaluation criteria, not just affiliate rankings, regular updates.

**Priority**: HIGH — can fix /plantillas-curriculum to be this curation hub instead of the thin page it is now.

---

### 5. Personas + Experience State (expand existing)

**Pattern**: "[current page] + sin experiencia" / "con poca experiencia"

**Existing**: Some pages have sin-experiencia variants (atencion-al-cliente, cajero)

**Gaps**:
- /cv-para-vendedor/sin-experiencia → create
- /cv-para-recepcionista/sin-experiencia → create
- /cv-para-administrativo/sin-experiencia → create
- /cv-para-operario/sin-experiencia → create
- /cv-para-seguridad/sin-experiencia → create

**Also**: "con experiencia" variant could differentiate pages that focus on no-experience.

**Priority**: MEDIUM

---

## Implementation Priority

### Phase 1 — Fix Existing (Quick Wins, High Impact)

**T1: Rebuild /plantillas-curriculum**
- Current state: 3 template cards, no content — HIGH thin penalty risk
- Target: Curation hub with template comparison table, use case recommendations, real previews
- URL: `/plantillas-curriculum` (keep existing)
- Impact: SEO + conversions

**T2: Consolidate Tool Pages**
- `/crear-cv-online`, `/hacer-cv-online`, `/crear-curriculum-vitae` share nearly identical content
- Options: (a) redirect duplicates to strongest page, (b) differentiate each with unique angle
- Recommendation: Keep `/crear-cv-online`, redirect `/hacer-cv-online` and `/crear-curriculum-vitae` to it
- Add unique content to `/crear-cv-online` — step-by-step flow, unique differentiators

**T3: Expand /curriculum-vitae-pdf**
- Only 4 sections, thin content
- Add: PDF-specific tips (font embedding, file size, email conventions, ATS-compatible PDF)
- Value: People searching for "CV PDF" expect specific guidance

---

### Phase 2 — New Programmatic Pages

**P1: Comparison Pages (HIGH priority)**

1. `/comparar/cv-harvard-vs-cv-tradicional`
   - Title: "CV Harvard vs CV Tradicional: Cuál Conviene en 2025"
   - Compare: estructura, ATS compatibility, readability, use cases
   - Recommendation by: experience level, industry, job type

2. `/comparar/cv-ats-vs-cv-convencional`
   - Title: "CV ATS vs CV Convencional: Guía para Elegir"
   - Compare: what recruiters actually see, keyword matching, format requirements

3. `/comparar/plantilla-harvard-vs-plantilla-moderna`
   - Title: "Plantilla Harvard vs Moderna: Cuál Hace que tu CV Destaque"
   - Compare: layout, readability, ATS score, visual first impression

**P2: Glossary Pages (MEDIUM priority)**

1. `/glosario/que-es-ats-curriculum`
   - Title: "Qué es ATS en un Currículum y Cómo Adaptar tu CV"
   - Content: what ATS systems do, how they score, practical tips

2. `/glosario/que-es-currriculum-vitae`
   - Title: "Qué es un Currículum Vitae y Cómo Hacer uno Profesional"
   - Content: definition, vs CV, vs resume, structure guide

3. `/glosario/como-escribir-perfil-profesional`
   - Title: "Perfil Profesional para CV: Qué Es y Cómo Escribirlo Bien"
   - Content: definition, examples by experience level, mistakes to avoid

**P3: Expand Sin Experiencia Variants (MEDIUM priority)**

1. `/cv-para-vendedor-sin-experiencia` (new)
   - Leverages vendedor page, adds no-experience angle
   - Target: retail, telemarketing, door-to-door sales

2. `/cv-para-recepcionista-sin-experiencia` (new)
   - Target: hotels, clinics, offices hiring first-time receptionists

---

## Hub Architecture

```
/plantillas-curriculum (curation hub)
  ├── /plantilla-harvard (format guide)
  ├── /plantilla-moderna (format guide)
  ├── /plantilla-elegante (format guide)
  └── /comparar/[x]-vs-[y] (comparison pages)

/glosario (hub — glossary index)
  ├── /glosario/que-es-ats-curriculum
  ├── /glosario/que-es-currriculum-vitae
  └── /glosario/como-escribir-perfil-profesional

/blog (existing — strong foundation)

/cv-para-[persona] (existing personas — strong coverage)
  └── /cv-para-[persona]-sin-experiencia (expansion)
```

---

## Content Guidelines

### Unique Value Requirements (per programmatic page)

1. **No variable swapping**: Every page needs original intro and analysis
2. **Data-driven sections**: Use real examples, metrics, comparisons
3. **Conditional content**: Different content based on persona/data
4. **Internal linking**: Connect to hub + related pages + blog

### Template for Comparison Pages

```
URL: /comparar/[x]-vs-[y]
Title: [X] vs [Y]: [Specific Outcome] in [Year]

Sections:
1. Quick summary (table with pros/cons)
2. What is [X] and when to use it
3. What is [Y] and when to use it
4. Side-by-side comparison (structured table)
5. Our recommendation by situation
6. CTA to create the recommended type
```

### Template for Glossary Pages

```
URL: /glosario/[term]
Title: [Term]: [Definition in one sentence]

Sections:
1. Clear definition (1-2 sentences)
2. Why it matters (practical impact)
3. Examples (real examples with context)
4. Common mistakes
5. How to do it right (step by step)
6. Related terms (linked)
```

---

## Indexation Strategy

1. All new pages added to `app/sitemap.ts`
2. High-priority pages: comparison pages (0.8 priority)
3. Glossary pages: informational, lower priority (0.6)
4. Location pages: deferred to Phase 3
5. Monitor thin content warnings via Search Console

---

## Pre-Launch Checklist (per new page)

- [ ] Unique title and description with Spanish accents
- [ ] HowTo or FAQ schema (or Article for glossary)
- [ ] Breadcrumbs with absolute URLs
- [ ] Internal links to hub and related pages (≥3)
- [ ] No noindex
- [ ] In sitemap
- [ ] Mobile-readable