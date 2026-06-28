# Project Progress — BrotherFemi Ministry Website
Last updated: 2026-06-27 (Session 9: Hero optimization, social icon system, UI polish — FTTG-56, FTTG-57, FTTG-58)

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
- [ ] PR `feature/FTTG-49-layout-navigation` → `develop`
- [ ] PR `feature/FTTG-50-home-page` → `develop`

### Phase 2b — Data Layer (FTTG-48) ✅ merged to develop
- [x] `lib/data.ts` — typed helpers: `getBrotherFemi`, `getSections`, `getSectionById`, `getMentors`, `getMinistry`
- [x] `data/ministry.json` — fixed from empty file to valid `{}`
- [x] `app/blog/[slug]/page.tsx` — uses `getSections()`; async params for Next.js 15+
- [x] Merged into `develop`

### Phase 2c — Layout & Navigation (FTTG-49)
- [x] Created branch `feature/FTTG-49-layout-navigation` off develop
- [x] `globals.css` — `@theme` adds `bg-navy`, `text-gold`, `text-cream` as Tailwind v4 utilities
- [x] `components/layout/Header.tsx` — sticky navy header; desktop: `logo-main.svg` + anchor nav; mobile: `logo-icon.svg` + animated hamburger dropdown; `IntersectionObserver` gold active-link tracking
- [x] `components/layout/Footer.tsx` — navy footer, `logo-icon.svg`, 5 social links from JSON, copyright
- [x] `components/layout/index.ts` — barrel re-export
- [x] `app/layout.tsx` — `<Header />` + `<Footer />` wrap all pages
- [x] Build passes clean — no type errors
- [x] Branch pushed to remote

### Phase 2d — Home Page (FTTG-50)
- [x] Created branch `feature/FTTG-50-home-page` off develop (merged FTTG-49 first)
- [x] 12 section components in `components/sections/`: Worship, Mission, Vision, CoreValues, HeartCry, About, Mentors, TheWord, Blog, Hymns, NewLife, Contact
- [x] Worship — hero full-height, navy bg, bible verse, bio, CTA
- [x] NewLife — full content tree: core beliefs, spiritual warfare, 8 prayer children including five-finger prayer, altar call, children prayer
- [x] Contact — `use client`, Formspree form with send/success/error state, social links
- [x] `components/sections/index.ts` — barrel re-export
- [x] `app/page.tsx` — renders all 12 sections with typed props from `lib/data.ts`
- [x] Build passes clean — no TypeScript errors
- [x] Branch pushed to remote

---

### Phase 2e — Blog Migration (FTTG-51)
- [x] Created branch `feature/FTTG-51-blog` off develop (merged FTTG-50 first)
- [x] `data/blog.json` — 4 posts: midnight-encounter (extracted from HTML), my-journey-to-faith, lessons-from-the-valley, worship-as-a-lifestyle (written from titles/excerpts)
- [x] `types/index.ts` — added `BlogPost` interface
- [x] `lib/data.ts` — added `getBlogPosts()` and `getBlogPost(slug)` helpers
- [x] `app/blog/page.tsx` — full listing page with article cards (date, title, excerpt, link)
- [x] `app/blog/[slug]/page.tsx` — static detail pages with `generateStaticParams`, `generateMetadata`, and `dangerouslySetInnerHTML` render
- [x] `components/sections/Blog.tsx` — updated to use `getBlogPosts()` instead of hardcoded `blogtitles`
- [x] Build passes clean — all 4 posts generate as static HTML at build time
- [x] Branch pushed to remote

### Phase 2g — Vercel Deploy Fix (FTTG-56)
- [x] Created `vercel.json` with `outputDirectory: "out"` — fixes "No Output Directory named dist" build error
- [x] Vercel now correctly serves Next.js static export from `out/`

### Phase 2h — Hero Section Optimization (FTTG-57)
- [x] Removed bio paragraph from hero (content lives in About section — cleaner hero)
- [x] Elevated scripture verse from `dark-muted` to `gold-lt` (10.4:1 contrast on navy)
- [x] Replaced "Welcome, Brother Femi" heading with "Brother Femi" in gold — previous copy read as addressing him, not welcoming visitors
- [x] Added `white-space: nowrap` to prevent heading orphan on mobile
- [x] Added animated scroll indicator (bobbing chevron + "SCROLL" label) at bottom of hero
- [x] Removed `brotherFemi` prop from Worship — no longer needed; `page.tsx` updated accordingly

### Phase 2i — General UI Polish (FTTG-58)
- [x] Social icon hover animation: lift (translateY -3px) + scale (1.2×) + brand-color `drop-shadow` glow — `.social-icon` CSS class in globals.css
- [x] Applied `.social-icon` to all 3 locations: Header, Footer, Contact (Contact was missed in initial pass)
- [x] Extracted shared `components/ui/SocialIcon.tsx` — `SocialIcon`, `getSocialColor`, `SOCIAL_ORDER_NAV`, `SOCIAL_ORDER_CONTACT` — eliminates duplication across 3 files
- [x] Email removed from Header and Footer (contact form handles direct reach; email redundant in nav)
- [x] Email kept in Contact section, moved to last position
- [x] Social icon order: Instagram → YouTube → TikTok → Threads → Facebook (reach order; Facebook last)
- [x] Icon sizes standardized: 20px in Header/Footer, 24px in Contact
- [x] Mobile nav: social icons now use brand colors (were using flat gold)
- [x] Logo click: scrolls smoothly to top when already on home page (`onClick` + `window.scrollTo`)
- [x] Fixed React 19 `allowTransparency` warning on Instagram iframe — removed deprecated prop

### Phase 2f — Visual Redesign (FTTG-55)
- [x] Created branch `feature/FTTG-55-visual-redesign` off develop (merged FTTG-50 + FTTG-51 first)
- [x] `app/globals.css` — Google Fonts import (Cinzel/Lora/Inter), 11-token `@theme` (navy, cobalt, gold, gold-lt, parchment, cream, sage, ink, muted, dark-text, dark-muted), base body/heading styles, utility classes (`.section-label`, `.gold-bar`, `.verse-underline`, `@keyframes growLine`), `prefers-reduced-motion` guard
- [x] `Header.tsx` — 5-link nav (About/The Word/Blog/Hymns/Contact), transparent→frosted scroll effect (rgba + backdrop-blur), inline SVG social icons from `getBrotherFemi().contact`, font-ui labels, mobile dropdown with social row; IntersectionObserver logic untouched
- [x] `Footer.tsx` — navy bg, logo-icon, 4 nav links, 6 inline SVG social icons, closing scripture italic Lora gold-lt, copyright font-ui
- [x] `Worship.tsx` — full-viewport navy hero, inline cross watermark (opacity 0.04), flanked eyebrow, Cinzel clamp(2.8rem,6vw,4.5rem) h1, italic Lora scripture + verse-underline animation, dual CTA (gold fill / gold outline)
- [x] `About.tsx` — two-column grid, Lora testimony, gold-bar, anchor verse blockquote, cobalt card with Instagram embed + name/title badge
- [x] `Blog.tsx` — parchment bg, 4-card grid auto-fit, gold top-border cards, category/date/title/excerpt/read-more layout, hover translateY
- [x] `TheWord.tsx` — navy bg, italic Lora clamp quote in gold-lt, verse-underline, sage citation, gold/12 top+bottom borders
- [x] `Hymns.tsx` — two-column, left: section-label + Cinzel h2 + Lora verse, right: numbered rows with play buttons and gold/12 separators
- [x] `NewLife.tsx` — visually segmented into 5 subsections: core beliefs (numbered parchment), five-finger prayer (cobalt cards), spiritual warfare (cobalt), other prayer children (parchment), altar call (navy CTA), children prayer (parchment 2x line-height)
- [x] `Contact.tsx` — two-column navy layout, info+social icons left, styled cobalt form right (Inter labels, cobalt inputs, gold-focus, gold submit); Formspree logic 100% untouched
- [x] `Mission.tsx` + `Vision.tsx` — cream bg, centered graceful placeholder in italic Lora muted
- [x] `CoreValues.tsx` — parchment bg, cobalt card grid with gold left-border, Cinzel numbered index, Lora value text
- [x] `HeartCry.tsx` — cream bg, centered large italic Lora gold psalm block
- [x] `Mentors.tsx` — parchment bg, Cinzel name + Inter ministry label, white cards gold border
- [x] Build passes clean after every step — zero TypeScript errors, all 10 pages static-generated
- [x] No hardcoded content — all text from props; social links from JSON throughout
- [x] Branch pushed to remote
- [x] FTTG-52 closed — fully absorbed by FTTG-55
- [x] Social icons: each platform uses its own brand color (Email gold, Instagram #E1306C, Threads white, TikTok #EE1D52, YouTube #FF0000, Facebook #1877F2)
- [x] WCAG contrast audit — fixed all failures: section-label default cobalt (10.8:1), HeartCry moved to navy bg + gold-lt text (10.2:1), Worship eyebrow dark-muted (6.7:1), Blog dates/read-more/excerpts → cobalt/ink, all bible ref links on light bg → cobalt, muted body text on light bg → ink
- [x] Header: always-navy base (no transparent-at-top), frosted blur only on scroll — fixes nav legibility
- [x] Nav font size: 0.75rem → 0.85rem (desktop + mobile)
- [x] Mobile dropdown: absolute positioned to overlay page (transparency + blur now visible), hover effect on links (`bg-white/10` + indent slide)
- [x] Mobile nav open: page content blurs via `html.mobile-nav-open body > *:not(header)` CSS rule; class toggled via `useEffect`
- [x] Horizontal overflow fixed: `overflow-x: clip` on `html` + `body` (clip doesn't break `position: sticky`); auto-fit grids use `minmax(min(Xpx, 100%), 1fr)` to prevent overflow on narrow viewports
- [x] Hamburger lines: dark-muted → gold-lt (#E8D4A8, 10.2:1 on navy) — always visible regardless of scroll state

---

## ⚠️ Not Started

### Phase 2 — Remaining Issues
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

### Session 9 — 2026-06-27
**Completed:**
- FTTG-56: `vercel.json` created to fix Vercel deploy (outputDirectory: out)
- FTTG-57: Hero section redesigned — bio removed, verse to gold-lt, heading changed from "Welcome, Brother Femi" → "Brother Femi" in gold, scroll indicator added
- FTTG-58: Social icon system overhauled — shared `components/ui/SocialIcon.tsx`, hover animation on all 3 locations, email removed from nav, consistent order and sizes, logo scroll-to-top fixed, React 19 iframe warning resolved

**Key Decisions:**
- "Welcome, Brother Femi" reads as addressing him, not welcoming visitors — dropped "Welcome," entirely; name alone in gold is more impactful and unambiguous
- Email excluded from Header/Footer social row — contact form is the intended channel; email in nav prime real estate signals wrong priority
- Facebook moved to last in social order — Instagram/YouTube/TikTok/Threads carry more ministry reach
- Shared `SocialIcon` component extracted to `components/ui/` — was duplicated identically in 3 files; single source of truth for icons, colors, and order constants
- `drop-shadow(0 0 8px currentColor)` used for hover glow — inherits the icon's brand color automatically, no per-icon CSS needed
- Logo `onClick` scroll-to-top handles the "already on home page" case; Next.js `<Link href="/">` handles cross-page navigation naturally

### Session 8 — 2026-06-27
**Completed:**
- FTTG-55 polish: brand colors on social icons, full WCAG contrast audit + fixes, header always-navy, nav 0.85rem, mobile nav absolute overlay + hover effects, background blur when mobile nav open, horizontal overflow fix (overflow-x: clip), hamburger gold-lt

**Key Decisions:**
- `overflow-x: clip` preferred over `overflow-x: hidden` on `html` — `hidden` creates a new scroll container which breaks `position: sticky` on mobile; `clip` clips visually without creating a scroll container
- Gold reserved for dark backgrounds only; cobalt used for interactive/accent text on light backgrounds (passes 10.8:1 vs gold's 2.1:1 on parchment)
- HeartCry moved from cream bg to navy to enable gold-lt psalm quotes — design intent preserved at proper contrast
- `html.mobile-nav-open` class approach chosen over portal/fixed overlay — no DOM outside the component tree, no React import changes needed

### Session 7 — 2026-06-27
**Completed:**
- FTTG-50 + FTTG-51 merged into develop
- FTTG-55: Full visual redesign across all 15 files — Cinzel/Lora/Inter type system, 11-token warm parchment palette, all section components restyled; build passed clean after every step; no logic changes

**Key Decisions:**
- FTTG-55 branch created after merging both FTTG-50 and FTTG-51 (intended order was FTTG-55 before FTTG-51, but no conflict since FTTG-55 is CSS-only — net result on master is identical)
- FTTG-52 ("Assets and styles") closed — fully absorbed by FTTG-55 scope
- Social icons implemented as inline SVGs throughout (no icon library dependency)
- Header scroll effect uses inline `style` prop (rgba + backdrop-filter) rather than Tailwind arbitrary values — avoids Tailwind v4 static analysis edge cases
- Hymns section has no hymn list in JSON — right column renders available text rows gracefully, with placeholder if empty
- NewLife rendered as one `<section>` element containing 5 visually distinct subsections (avoids ID fragmentation, keeps IntersectionObserver anchor correct)

### Session 6 — 2026-06-27
**Completed:**
- FTTG-51: Blog migration — `data/blog.json` with 4 posts; `BlogPost` type; `getBlogPosts`/`getBlogPost` helpers; `/blog` listing page; `/blog/[slug]` detail pages; `Blog.tsx` updated; all 4 posts static-generated at build time

**Key Decisions:**
- Blog content for 3 empty HTML files written from scratch using their titles and excerpts as guidance — personal testimony, valley/trials reflections, worship-as-lifestyle devotional
- Midnight-encounter content extracted faithfully from 207-line HTML file including Jeremiah 33:3, 3-5am significance section, and 14 recommended actions
- `dangerouslySetInnerHTML` used on detail page — content is internal HTML written by us, not user input, so XSS risk is zero
- Tailwind prose-like styling done with arbitrary class selectors (`[&_h2]:`, `[&_ul]:` etc.) to avoid adding @tailwindcss/typography plugin

### Session 5 — 2026-06-27
**Completed:**
- FTTG-50: Built all 12 section components; Worship is the hero; NewLife renders full nested content tree; Contact has Formspree form with client-side state; all sections receive typed props from lib/data.ts

**Key Decisions:**
- Worship section doubles as the page hero (full-height navy, bible verse, bio, CTA) — no separate hero component needed
- NewLife casts `section` to `NewLifeSection` interface locally to access nested fields not in base `Section` type
- Contact is the only `use client` section component (form state); all others are server components
- Blog renders card layout instead of accordion (no client state needed, better for static export)

### Session 4 — 2026-06-27
**Completed:**
- FTTG-49: Built Header and Footer; added brand colors to Tailwind @theme; wired into root layout; merged FTTG-48 into develop first

**Key Decisions:**
- Tailwind v4 `@theme` block used for brand colors (`--color-navy/gold/cream`) — avoids scattering hex codes across components
- `IntersectionObserver` in Header uses `rootMargin: "-30% 0px -65% 0px"` to trigger active state when section is in the middle third of viewport
- Footer is a server component (no state needed); Header is `use client` (needs menu + scroll state)
- `getSections()` called directly in client component — safe because JSON is bundled at build time, not fetched

### Session 3 — 2026-06-27
**Completed:**
- FTTG-48: Built `lib/data.ts` data layer; fixed empty `ministry.json`; smoke-tested all helpers at build time; updated `blog/[slug]/page.tsx` to async params

**Key Decisions:**
- `as unknown as Type` cast used on JSON imports to avoid readonly/literal type conflicts with interfaces
- `params` typed as `Promise<{slug}>` in blog slug page — aligns with Next.js 15+ async params API
- `ministry.json` is intentionally empty (`{}`) for now — placeholder until ministry content is defined

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
