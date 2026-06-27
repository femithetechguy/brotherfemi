# Project Progress — BrotherFemi Ministry Website
Last updated: 2026-06-27 (Session 2: Housekeeping, Next.js scaffold, SVG logos)

**Owner:** Adefemi (Femi) Kolawole  
**Domain:** brotherfemi.org  
**Hosting:** Vercel  

---

## ✅ Completed

### Phase 0 — Static Site (Live)
- [x] Static site built and deployed at brotherfemi.org
- [x] All content data-driven via JSON files (`brotherfemi.json`, `sections.json`, `mentors.json`, `ministry.json`)
- [x] 4 blog posts published (`midnight-encounter`, `my-journey-to-faith`, `lessons-from-the-valley`, `worship-as-a-lifestyle`)
- [x] Custom domain configured (CNAME → brotherfemi.org)
- [x] Vercel hosting with auto-deploy on push to master
- [x] Social links connected (Instagram, Threads, TikTok, YouTube, Facebook)
- [x] Anchor verse added (Acts 5:41-42 KJV)
- [x] Five Finger Prayer added
- [x] Children prayer section added
- [x] Christie Bature and Theophilus Sunday added as mentors

### Phase 1 — Housekeeping & Migration Prep (FTTG-45, FTTG-46)
- [x] Created `CLAUDE.md` with full project context and architecture (FTTG-45)
- [x] Created `PROGRESS.md` (FTTG-45)
- [x] Created `MIGRATION.md` with Next.js migration plan (FTTG-45)
- [x] Deleted `app-remake` branch from remote (FTTG-46)
- [x] Updated `.gitignore` for Next.js (`node_modules/`, `.next/`, `out/`, `next-env.d.ts`, `.env*`) (FTTG-46)
- [x] Tagged `v1.0-static` and pushed to remote (FTTG-46)
- [x] Linear GitHub integration connected (FTTG-45)

### Phase 2 — Next.js Scaffold (FTTG-47)
- [x] Created branch `feature/FTTG-47-nextjs-scaffold`
- [x] Scaffolded Next.js 16.2.9 with TypeScript, Tailwind v4, App Router, `output: 'export'`
- [x] `app/layout.tsx` — root layout with BrotherFemi metadata, SVG favicon refs, `suppressHydrationWarning`
- [x] `app/page.tsx` — empty home placeholder
- [x] `app/globals.css` — Tailwind v4 `@import "tailwindcss"` only
- [x] `app/blog/page.tsx` — blog listing placeholder
- [x] `app/blog/[slug]/page.tsx` — dynamic route with `generateStaticParams` (reads from `sections.json` blogtitles)
- [x] `components/layout/`, `components/sections/`, `components/ui/` — scaffold dirs created
- [x] `data/` — all 4 JSON files copied from `text/`
- [x] `types/index.ts` — TypeScript interfaces for all JSON data shapes
- [x] `public/img/`, `public/svg/` — assets moved from root
- [x] Build passes cleanly (`npm run build`)
- [x] Branch pushed to remote

### Phase 2a — SVG Logo Assets (FTTG-54)
- [x] Created branch `feature/FTTG-54-svg-logo-assets`
- [x] `public/svg/logo-main.svg` — full wordmark (dark navy + gold, cross + BF + BROTHER FEMI + tagline + URL)
- [x] `public/svg/logo-icon.svg` — standalone 100×100 icon (dark navy circle, gold cross + BF initials)
- [x] `public/svg/favicon.svg` — 32×32 SVG favicon (dark navy + gold cross + BF)
- [x] `app/favicon.ico` — replaced default Vercel favicon with project favicon
- [x] `app/layout.tsx` metadata — SVG favicon + `.ico` fallback + webmanifest wired up
- [x] Branch pushed to remote

---

## 🔁 In Progress

### Phase 2 — Next.js Migration (open branches)
- [ ] PR `feature/FTTG-47-nextjs-scaffold` → `develop`
- [ ] PR `feature/FTTG-54-svg-logo-assets` → `develop`

---

## ⚠️ Not Started

### Phase 2 — Remaining Migration Issues
- [ ] FTTG-48: Data layer — confirm JSON imports work across all pages
- [ ] FTTG-49: Layout and Navigation component (navbar with logo-main, mobile menu, footer)
- [ ] FTTG-50: Home page — migrate all 12 sections from static site
- [ ] FTTG-51: Blog — listing page and 4 individual post pages
- [ ] FTTG-52: Assets and styles — Tailwind migration from `css/styles.css`, SEO meta per page
- [ ] FTTG-53: Deploy and validate on Vercel, PR develop → master

### Phase 3 — Content & Enhancements
- [ ] Add mission content (currently "To be disclosed" in sections.json)
- [ ] Add vision content (currently "To be disclosed" in sections.json)
- [ ] Add more blog posts
- [ ] Evaluate Sanity CMS integration for non-developer content updates

---

## Session Log

### Session 1 — 2026-06-27
**Completed:**
- Created `CLAUDE.md`, `PROGRESS.md`, `MIGRATION.md`
- Reviewed static site — confirmed all content already JSON-driven
- Identified `app-remake` as failed migration attempt
- Planned Next.js migration

**Key Decisions:**
- JSON files carry over as-is into `data/` — no CMS needed initially
- `output: 'export'` for Vercel static hosting
- Start fresh on feature branches off develop

### Session 2 — 2026-06-27
**Completed:**
- FTTG-45: CLAUDE.md, PROGRESS.md, MIGRATION.md committed and pushed; Linear integration set up
- FTTG-46: Deleted `app-remake` remote branch; updated `.gitignore`; tagged `v1.0-static`
- FTTG-47: Scaffolded Next.js 16.2.9 (React 19, Tailwind v4) on `feature/FTTG-47-nextjs-scaffold`; build passes with static export
- FTTG-54: Created SVG logo assets (dark navy `#1a2744` + gold `#c9a84c` brand); wired favicon metadata in layout.tsx

**Key Decisions:**
- `create-next-app@latest` resolves to Next.js 16.2.9 — proceeding with latest rather than pinning to 14
- Tailwind v4 uses `@import "tailwindcss"` (not `@tailwind` directives)
- `suppressHydrationWarning` added to `<html>` and `<body>` (Twitter/X browser extension injects attributes)
- SVG favicon preferred over `.ico`; `.ico` kept as fallback in metadata
- Brand colour scheme updated to dark navy + gold (`#1a2744`, `#c9a84c`) — used across all 3 logo SVGs
