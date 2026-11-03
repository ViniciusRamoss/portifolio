# Portfólio Vinicius Ramos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Single-page bilingual (PT/EN) portfolio site for Vinicius Silva Ramos, with a liquid glass language toggle.

**Architecture:** Vite + React + TypeScript single page. All copy lives in a typed translation object; all project and contact data lives in plain data files. A `LanguageProvider` holds the current language. Sections are small presentational components that read copy through a `useLanguage()` hook.

**Tech Stack:** Vite, React 18, TypeScript (strict), Vitest, React Testing Library, plain CSS (no UI library).

**Spec:** `docs/superpowers/specs/2026-11-03-portfolio-design.md`. Mockup: https://www.figma.com/design/tJcrFXo6pzrUt8QSqKDVUE (desktop, EN; its About section is the old version, the spec's About text wins).

## Global Constraints

- Project root: `C:\dev\portifólio`. Photo source: `1739842361941.jpg` in the root; CV: `Vinicius_Silva_Ramos_CV.pdf` (reference only, do not publish it).
- Languages: `pt` and `en`. Both must have identical translation keys (enforced by the `Translations` type and a test).
- Initial language: `localStorage` key `lang` if `pt|en`, else `navigator.language` starting with `pt` gives `pt`, anything else gives `en`.
- Contacts, verbatim: LinkedIn `https://www.linkedin.com/in/vinicius-silva-ramos-7a5139164/`; GitHub `https://github.com/ViniciusRamoss`; email `viniciussilvaramos1@gmail.com`; phone display `+55 11 9 6150-7151`, `tel:+5511961507151`.
- Headline EN: "Python that solves real problems." PT: "Python que resolve problemas reais."
- Palette (from mockup): bg `#0A0D17`, ink `#F2F5FA`, muted `#9EA8BD`, card `#171A29`, line `#33384D`, accent `#5CD1AB`, accent2 `#738CFF`. Fonts: Space Grotesk (headings, 700), Inter (body), loaded from Google Fonts.
- Liquid glass: `backdrop-filter` blur + SVG displacement filter for refraction only under `@supports` Chromium detection; elsewhere frosted blur only. Must stay legible without either.
- Respect `prefers-reduced-motion`. Text contrast at least 4.5:1. Layout works from 360px to 1440px wide, no horizontal scroll.
- No analytics, no cookies, no backend, no contact form.
- TypeScript `strict: true`; `npm run lint`, `npm test`, `npm run build` must all pass.

## Review Focus

- First visit with `navigator.language = "pt-BR"` shows Portuguese; `"fr-FR"` shows English (Task 2).
- `localStorage.lang` holds garbage (`"xx"`): falls back to detection, does not crash (Task 2).
- `localStorage` throws (private mode): site still renders and toggles in memory (Task 2).
- Toggle switches every visible string, including `<html lang>` and `document.title` (Tasks 2, 4).
- Photo fails to load: `alt` text is shown and layout does not collapse (Task 5).
- Every external link has `rel="noopener noreferrer"` and `target="_blank"`; `mailto:` and `tel:` do not (Tasks 3, 5).
- Long strings (PT is longer than EN) do not overflow cards at 360px (Task 5, manual check).

---

### Task 1: Scaffold, tooling and repo

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/App.test.tsx`, `src/test/setup.ts`, `.gitignore`, `public/photo.jpg`
- Create: `.github/workflows/ci.yml`

**Interfaces:**
- Produces: `App(): JSX.Element` default export from `src/App.tsx`; npm scripts `dev`, `build`, `lint`, `test`.

- [ ] **Step 1: Initialize.** Run `git init`; scaffold Vite React-TS into the current directory (non-empty is fine: do not overwrite `docs/` or the PDF/photo); add dev deps `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `eslint` with the Vite React-TS config. `.gitignore` must include `node_modules`, `dist`, `.superpowers/`.
- [ ] **Step 2: Move the photo.** Copy `1739842361941.jpg` to `public/photo.jpg` (keep the original in place).
- [ ] **Step 3: Write failing test** `src/App.test.tsx`: `render(<App />)` and `expect(screen.getByRole('main')).toBeInTheDocument()`.
- [ ] **Step 4: Run `npm test`.** Expected: FAIL (no `main` landmark in the Vite starter).
- [ ] **Step 5: Replace the starter `App`** with `<main id="top"></main>`; remove starter assets and CSS. Configure Vitest (`jsdom`, `setupFiles: src/test/setup.ts` importing `@testing-library/jest-dom`).
- [ ] **Step 6: CI.** `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm test -- --run`, `npm run build` on push and pull request.
- [ ] **Step 7: Run `npm test -- --run && npm run lint && npm run build`.** Expected: all pass.
- [ ] **Step 8: Commit** `chore: scaffold vite react ts with vitest and ci`.

### Task 2: i18n core

**Files:**
- Create: `src/i18n/translations.ts`, `src/i18n/LanguageProvider.tsx`, `src/i18n/detect.ts`
- Test: `src/i18n/detect.test.ts`, `src/i18n/LanguageProvider.test.tsx`, `src/i18n/translations.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = 'pt' | 'en'`
  - `type Translations` (nested object; every leaf is `string`; arrays of strings allowed) and `export const translations: Record<Lang, Translations>`
  - `detectLanguage(storage?: Pick<Storage,'getItem'>, navLang?: string): Lang`
  - `LanguageProvider({children})`, `useLanguage(): { lang: Lang; setLang(l: Lang): void; t: Translations }`
- Translation keys (both languages, all of them): `meta.title`, `nav.work`, `nav.about`, `nav.contact`, `hero.eyebrow`, `hero.title`, `hero.subtitle`, `hero.ctaWork`, `hero.ctaContact`, `featured.label`, `featured.description`, `featured.github`, `featured.agentRepo`, `projects.label`, `projects.liveDemo`, `projects.github`, `about.title`, `about.photoAlt`, `about.intro`, `about.experience`, `about.focus`, `about.chips` (four `{title, subtitle}` for Nissan, KPMG, CompTIA, Azure), `contact.title`, `contact.email`, `contact.phone`, `contact.linkedin`, `contact.github`, `footer.rights`, `toggle.label`.

- [ ] **Step 1: Write failing tests.**
  - `detect.test.ts`: `detectLanguage({getItem:()=>null}, 'pt-BR')` is `'pt'`; `'fr-FR'` is `'en'`; stored `'en'` with navLang `'pt-BR'` is `'en'`; stored `'xx'` with navLang `'pt-BR'` is `'pt'`; a `getItem` that throws returns the navigator-based result.
  - `LanguageProvider.test.tsx`: a probe component shows `t.hero.title`; `setLang('pt')` changes it to "Python que resolve problemas reais.", sets `document.documentElement.lang` to `pt`, sets `document.title` to `t.meta.title`, and writes `localStorage.lang`; when `localStorage.setItem` throws, `setLang` still switches the text.
  - `translations.test.ts`: the set of flattened keys of `pt` equals that of `en`, and no value is an empty string.
- [ ] **Step 2: Run `npm test -- --run src/i18n`.** Expected: FAIL (modules missing).
- [ ] **Step 3: Implement** the three files with the signatures above. `about.intro/experience/focus` carry the spec's About text in each language (PT is a faithful translation of the EN text in the spec). Wrap every storage access in try/catch.
- [ ] **Step 4: Run `npm test -- --run src/i18n`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: add bilingual i18n core with detection and persistence`.

### Task 3: Data files

**Files:**
- Create: `src/data/contacts.ts`, `src/data/projects.ts`
- Test: `src/data/data.test.ts`

**Interfaces:**
- Produces:
  - `contacts: { email: {label:'email', display:string, href:string}, phone: {...}, linkedin: {...}, github: {...} }` with the values from Global Constraints (`href` for email is `mailto:viniciussilvaramos1@gmail.com`).
  - `type Project = { id: string; name: string; stack: string[]; links: { kind: 'github' | 'demo' | 'agent'; href: string }[]; descriptionKey: string }`
  - `featuredProject: Project` (id `sptaxi`, stack `React, TypeScript, Django REST, AI agent, CI`, links: GitHub `https://github.com/ViniciusRamoss/sptaxi` and agent `https://github.com/ViniciusRamoss/ai-agent-sptaxi`)
  - `projects: Project[]` in order: `taymodas` (stack `Django, HTMX, PostgreSQL`; links demo `https://taymodas.onrender.com/` and GitHub), `jobmatch` (`Python, Typer, Pydantic`), `fraud-detection` (`XGBoost, SHAP, scikit-learn`), `sales-data-consolidation` (`Python, Pandas, Power BI`). GitHub hrefs are `https://github.com/ViniciusRamoss/<id>`.
- Project descriptions are translation keys `projects.items.<id>` and must be added to `translations.ts` (both languages) in this task.

- [ ] **Step 1: Write failing test** `data.test.ts`: `projects` has 4 entries with the ids above in order; every `href` is a valid `https://` URL except `mailto:` and `tel:`; `contacts.phone.href` is `tel:+5511961507151`; for each project and for `featuredProject`, `translations.en` and `translations.pt` contain a non-empty string at its `descriptionKey`.
- [ ] **Step 2: Run `npm test -- --run src/data`.** Expected: FAIL.
- [ ] **Step 3: Implement** both files and add the description keys to `translations.ts` (one sentence each, drawn from the GitHub descriptions: taymodas catalog with stock by size/color and WhatsApp checkout; jobmatch CLI ranking jobs against a résumé; fraud-detection on 99.8% imbalanced data with XGBoost and SHAP; sales-data-consolidation merging ERP exports into a Power BI dashboard).
- [ ] **Step 4: Run `npm test -- --run`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: add project and contact data`.

### Task 4: Liquid glass and language toggle

**Files:**
- Create: `src/components/LiquidGlass.tsx`, `src/components/LangToggle.tsx`, `src/styles/glass.css`
- Test: `src/components/LangToggle.test.tsx`

**Interfaces:**
- Consumes: `useLanguage` from Task 2.
- Produces:
  - `LiquidGlass({ as?: 'div'|'button'|'a'; className?: string; children; ...rest }): JSX.Element` — wrapper that applies class `glass` and renders the shared SVG `<filter id="liquid-glass">` once via `LiquidGlassDefs`.
  - `LiquidGlassDefs(): JSX.Element` — hidden `<svg>` holding the `feTurbulence` + `feDisplacementMap` filter; rendered once in `App`.
  - `LangToggle(): JSX.Element` — a `role="group"` named by `t.toggle.label`, with two buttons "PT" and "EN" and `aria-pressed` on the active one; the active one has class `is-active` (the sliding knob).

- [ ] **Step 1: Write failing test** `LangToggle.test.tsx` inside `LanguageProvider` with `navigator.language='en-US'`: EN has `aria-pressed="true"`, PT `"false"`; clicking PT flips both, and the group's accessible name changes to the PT `toggle.label`; keyboard `Tab` then `Enter` on PT also switches.
- [ ] **Step 2: Run `npm test -- --run src/components`.** Expected: FAIL.
- [ ] **Step 3: Implement** the components. `glass.css`: translucent white fill (about 10%), `backdrop-filter: blur(18px) saturate(140%)`, 1px gradient border, inner highlight, drop shadow; `@supports (backdrop-filter: url(#liquid-glass))` is not reliable, so apply the SVG filter through a `.glass--refract` class added only when the user agent matches `/Chrome|Edg/` and not `/Firefox/` (put this check in one helper `supportsRefraction(): boolean` in `LiquidGlass.tsx`). The knob moves with a `transform` transition that is disabled under `prefers-reduced-motion: reduce`.
- [ ] **Step 4: Run `npm test -- --run`.** Expected: PASS.
- [ ] **Step 5: Commit** `feat: add liquid glass wrapper and language toggle`.

### Task 5: Page sections and composition

**Files:**
- Create: `src/components/{Header,Hero,FeaturedProject,ProjectGrid,About,Contact,Footer,Tag}.tsx`, `src/styles/{tokens,base,sections}.css`
- Modify: `src/App.tsx`, `src/main.tsx`, `index.html`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `contacts`, `featuredProject`, `projects`, `LangToggle`, `LiquidGlass`, `LiquidGlassDefs`.
- Produces: `App` renders, in order inside `LanguageProvider`: `LiquidGlassDefs`, `Header`, `main#top` containing `Hero`, `FeaturedProject`, `ProjectGrid` (`id="work"`), `About` (`id="about"`), `Contact` (`id="contact"`), then `Footer`.
- Layout per mockup: Header (logo "VR", nav `Work / About / Contact` linking to the section ids — "Stack" is dropped, my call — and `LangToggle`); Hero (eyebrow, h1, subtitle, two CTAs); FeaturedProject (two-column card, preview panel left, text right, stacked below 800px); ProjectGrid (2 columns, 1 below 700px); About (photo `public/photo.jpg` 320x400 radius 32 left, text and four chips right, stacked below 800px); Contact (four glass cards linking to the contacts); Footer. Background glow blobs are CSS-only radial gradients.
- The FeaturedProject preview panel is a CSS gradient with the project name (no screenshot asset yet, my call).

- [ ] **Step 1: Write failing tests** in `App.test.tsx` (default `navigator.language='en-US'`):
  - landmarks present: `banner`, `main`, `contentinfo`; headline `Python that solves real problems.` as `h1`.
  - four contact links exist with the exact `href`s from Global Constraints; LinkedIn and GitHub have `target="_blank"` and `rel="noopener noreferrer"`; `mailto:` and `tel:` links do not.
  - exactly 4 project cards in the grid plus the featured card; the `taymodas` card has a link to `https://taymodas.onrender.com/`.
  - About shows an image with `src` ending `/photo.jpg` and non-empty `alt`; `fireEvent.error` on it leaves the alt text in the DOM and the About text visible.
  - clicking the PT toggle changes the headline to the PT text and the nav link "Work" to its PT label; every `<h1>`/`<h2>` text changes.
- [ ] **Step 2: Run `npm test -- --run`.** Expected: FAIL.
- [ ] **Step 3: Implement** the sections and styles to the Global Constraints (palette tokens in `tokens.css`, fonts via a Google Fonts `<link>` in `index.html` with `display=swap`). Add `<title>` and a meta description in `index.html` (EN defaults; the provider updates the title).
- [ ] **Step 4: Run `npm test -- --run && npm run lint && npm run build`.** Expected: all pass.
- [ ] **Step 5: Manual check** with `npm run dev`: widths 360, 768 and 1440; PT and EN; no horizontal scroll; PT strings do not overflow cards; toggle works with keyboard; with OS "reduce motion" the knob does not animate. Note any failures and fix before committing.
- [ ] **Step 6: Commit** `feat: build portfolio sections and compose app`.

### Task 6: Deploy config and README

**Files:**
- Create: `README.md`, `public/_headers`
- Modify: `vite.config.ts` (only if a base path is needed)

**Interfaces:**
- Consumes: the `build` script (output in `dist/`).

- [ ] **Step 1: Write `README.md`** in Portuguese: what the site is, `npm run dev/test/build`, how to edit copy (`src/i18n/translations.ts`) and projects (`src/data/projects.ts`), and deploy steps for Cloudflare Pages (build command `npm run build`, output `dist`).
- [ ] **Step 2: Add `public/_headers`** with basic security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).
- [ ] **Step 3: Verify** `npm run build && npm run preview`, open the preview URL, confirm the page loads, the photo shows, and the toggle works. Expected: no console errors.
- [ ] **Step 4: Commit** `docs: add readme and deploy headers`.

---

## Open items (not blocking)

- Decide whether the headline stays "Python..." or adopts the CV's Power Platform/data/security positioning.
- Replace the SPtaxi preview gradient with a real screenshot when one exists.
- Email shown on the site is the Gmail address; the CV uses the Hotmail one.
- Mockup About section in Figma is outdated until the Figma tool limit resets.
