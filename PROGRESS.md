# Project Progress — BrotherFemi Ministry Website
Last updated: 2026-06-28 (Session 13: section deep redesigns — TheWord/Blog/Hymns/NewLife; iOS music player skip fix)

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

### Phase 2l — UI Polish & Section Redesigns (Session 12, on FTTG-61 branch)
- [x] `BibleVerseModal.tsx` — redesigned as non-intrusive floating card (no overlay, no scroll lock); mobile: full-width bottom sheet with 0.75rem margins; desktop: anchored bottom-right, 420px max-width; 4px gold top bar; `aria-modal="false"`
- [x] Social icons — replaced custom inline SVGs with `react-icons` (Font Awesome Brands: FaInstagram, FaYoutube, FaTiktok, FaFacebook, FaThreads, MdEmail); eliminates blur/anti-aliasing issues on retina
- [x] Footer logo — now links back to home (`<a href="/">`)
- [x] Mentors — navy background, cobalt cards, scroll-reveal stagger (IntersectionObserver + CSS transition-delay via `--delay` CSS var), SVG cross icon, Cinzel name / italic Lora ministry; inline iframe modal (`MentorModal.tsx`) with ESC + backdrop dismiss, gold spinner loading state, "Open in new tab" fallback
- [x] Mission & Vision — combined into `MissionVision.tsx`; cream background; side-by-side flex on desktop with gold vertical divider; animated FlameIcon (`flameDance` keyframe) for Mission, animated EyeIcon with radiating rays (`eyePulse` + `rayFade`) for Vision; Roman numeral watermarks; scroll-reveal per panel; `ComingSoon` pulse pill
- [x] Core Values — navy background; SVG icon per value (HeartIcon / FlameIcon / CrossRaysIcon / HandsIcon) in 72px gold-tinted circle; numeral watermark per card; scroll-reveal stagger via `--cv-delay` CSS var; hover lift + gold border
- [x] HeartCry — gold gradient heart icon with `hcHeartBeat` animation; large decorative open-quote watermark (7% opacity); scroll-reveal stagger per prayer (`hcCryReveal` + `--hc-delay` CSS var); kept cream background
- [x] About — "use client" for scroll-reveal; heading changed from "Acts 5:41-42 KJV" → "A Life Changed by Grace"; "Where it began / HOWJ Atlanta · June 22 2025" label with gradient overlay on card top; right card (`about-panel--delayed`) fades in 0.18s after left panel
- [x] Section rhythm restored — light/dark alternating: Worship (navy) → Mission/Vision (cream) → Core Values (navy) → Heart-Cry (cream) → About (parchment) → Mentors (navy) → TheWord (navy) → Blog (parchment) → Hymns (cream) → NewLife (parchment) → Contact (navy)
- [x] Pronoun fix — "Our Mission" → "My Mission", "Our Vision" → "My Vision", "What We Stand For" → "What I Stand For" (in MissionVision, Mission, Vision, CoreValues)
- [x] Nav click fix — nav `<a>` links now call `e.preventDefault()` + `scrollIntoView({ behavior: "smooth" })` instead of triggering full page reload; eliminates header visual shift (scrolled/activeId state no longer resets)
- [x] Dolapo Lawal added to `data/mentors.json`; duplicate entry removed (30 mentors total)

### Phase 2m — Section Deep Redesigns & Mobile Player Fix (Session 13, FTTG-61)
- [x] TheWord: cobalt bg (was navy — clashed with Mentors), open-book SVG watermark at 4% opacity, scroll-reveal (`word-panel`/`word-visible`), label contrast dark-muted
- [x] Blog: 2×2 grid (`sm:grid-cols-2`) fixes orphaned 4th card; Cinzel h2 with clamp + gold-bar; staggered scroll-reveal via `--blog-delay` CSS var; label fixed to "Blog" (was hardcoded "Reflections")
- [x] Hymns: navy bg + gold borders; Cinzel h2 "Hymns & Worship"; right column replaced broken play-button rows with "Now Playing" cobalt panel (music note icon, Cinzel label, lora description, gold footer note); scroll-reveal via `about-panel`/`about-visible`
- [x] NewLife — BibleRefPill: new `components/ui/BibleRefPill.tsx` — pill-shaped button opening BibleVerseModal; `dark` prop for navy/cobalt vs light backgrounds
- [x] NewLife — Bible verse text: all 18 reference objects in `data/sections.json` updated with `bibleVerse` field (NKJV); 4 in core_beliefs_reference, 2 in spiritual_newlife, 12 in bibleReferences
- [x] NewLife — FingerIcon: SVG component rendering 5 fingers with active index highlighted; one per Five Finger Prayer card
- [x] NewLife — Five Finger Prayer: 5th card orphan fixed (`sm:col-span-2 sm:max-w-xs sm:mx-auto lg:col-span-1`); scripture refs → BibleRefPill
- [x] NewLife — Spiritual Warfare: navy bg; shield SVG watermark; two-column layout; h2 "Stand Firm in the Faith"; labeled pill groups
- [x] NewLife — Stub sections (christian/acknowledgement/confession) consolidated into 3-card "Steps into New Life" grid instead of 3 separate flat blocks
- [x] NewLife — Altar Call: prayer text grouped into stanzas (split on `""` empty string); tight `space-y-1` within stanzas, `space-y-8` between; "Heavenly Father," gold salutation; "Amen." gold + bold; Cinzel h2 "A Prayer of Surrender" + gold-bar; cross SVG watermark at 4%
- [x] NewLife — Children's Prayer: cream bg; structured parser groups text by `⸻` divider into prayer blocks; each block: gold numbered circle badge + uppercase Cinzel theme, cobalt italic salutation, opener paragraph, petition list with gold `—` leaders; thin gold dividers between blocks; "In Jesus' name, Amen." centered gold; heart SVG watermark at 4%
- [x] MusicPlayer — iOS mobile fix: `muteRef` mirrors `muted` for use in YT event handler closure; `trackIndexRef` manually tracks playlist position; `handleNext`/`handlePrev` use `playVideoAt(index)` instead of `nextVideo()`/`previousVideo()` (more reliable on iOS); `onStateChange` PLAYING re-asserts `unMute()` + `setVolume(55)` on every new track when not muted — fixes iOS audio reset on video change; `trackIndexRef` reset on playlist switch

### Phase 2k — Clean Section URLs + Search + Bible Verse Modal (FTTG-61, FTTG-60, FTTG-62)
- [x] FTTG-61: Route-based section URLs — `/worship`, `/about`, `/word`, `/contact` etc. instead of `/#hash` links
- [x] `app/[section]/page.tsx` — dynamic route with `generateStaticParams` for all 11 section slugs; renders `<HomeContent />` + `<ScrollToSection id>` to scroll-on-mount
- [x] `components/HomeContent.tsx` — server component extracted from `app/page.tsx` to share between `/` and `/[section]` routes
- [x] `components/ui/ScrollToSection.tsx` — client-only component that calls `scrollIntoView({ behavior: "instant" })` on mount; prevents flash
- [x] Section ID `the-word` → `word` in `data/sections.json`; all nav hrefs and footer links updated to `/word`
- [x] Header: all nav hrefs changed from `/#section-id` to `/section-id`; `IntersectionObserver` uses `window.history.replaceState` to sync URL on scroll (worship → `/`, others → `/id`)
- [x] FTTG-60: Client-side fuzzy search with Fuse.js v7.4.2
- [x] `components/ui/SearchButton.tsx` — search icon with `p-3` (40×40px touch target on mobile); ⌘K / Ctrl+K global shortcut; lazy-loads `SearchModal` via `next/dynamic({ ssr: false })`
- [x] `components/ui/SearchModal.tsx` — portaled full-screen overlay; Fuse.js with keys `title(0.6)/subtitle(0.2)/body(0.2)`, threshold 0.4; ↑↓ navigate, Enter go, Esc close; results show TYPE/title/subtitle
- [x] `lib/search.ts` — `buildSearchIndex()` returns `SearchItem[]` from all sections, blog posts, mentors; `flatText()` recursively flattens nested JSON to string
- [x] `SearchButton` added to Header (desktop: after music player with divider; mobile: alongside hamburger)
- [x] FTTG-62: Bible verse modal on reference click
- [x] `components/ui/BibleVerseLink.tsx` — drop-in replacement for `<a href={bible_url}>` tags; renders a `<button>` that opens `BibleVerseModal` lazily; accepts `verse`, `reference`, `bibleUrl`, `children`
- [x] `components/ui/BibleVerseModal.tsx` — non-interruptive floating card (no overlay, no scroll lock); portaled to `document.body`; mobile: full-width bottom sheet with `0.75rem` margin all sides; desktop: anchored bottom-right, 420px max-width; 4px gold gradient top bar; ESC / X closes; `bvmSlideUp` animation
- [x] 5 section files updated to use `BibleVerseLink`: Worship, TheWord, Hymns, Contact, About
- [x] Build passes clean — zero TypeScript errors

### Phase 2j — Music Player + Nav Overhaul (FTTG-58, FTTG-59, FTTG-55)
- [x] `MusicPlayer.tsx` created — single instance, portals into `#music-player-header-slot` (desktop) or `#music-player-mobile-slot` (mobile) via `createPortal`; detects viewport with `matchMedia("(max-width: 767px)")`
- [x] YouTube IFrame API integration — hidden 1×1 iframe, autoplay muted, looping playlist
- [x] Controls: prev / play-pause / next / playlist switcher; slide-in label on hover; audio-bars animation when playing; gold-pulse when idle
- [x] Playlist switcher — 4 playlists: Worship (`PLXlw5wgpCx0w`), Praise (`PLfDBbmAY2PYE`), Messages (`PL9GoCpwDjkCVHSesG3mJ4qmLDWratKeg8`), Hymns (`PL9GoCpwDjkCX5gXgnt6Xb0gQi0gCRfVgN`)
- [x] Playlist switching uses destroy-and-recreate pattern — `playerRef.destroy()` → null → `createPlayer(index, wasMuted)` (avoids YouTube IFrame API `loadPlaylist()` reliability issues)
- [x] Scrolling track title strip — appears below header when unmuted; duplicated text marquee `@keyframes mpMarquee`; `position: fixed; top: 64px; right: max(1rem, calc((100vw - 80rem) / 2))` keeps it aligned with max-w-7xl container on any screen width
- [x] Playlist row also `position: fixed` with same right calculation — fully decoupled from header flex layout
- [x] Track title captured from `e.target.getVideoData().title` in `onStateChange PLAYING`
- [x] Desktop slot: gold divider + `#music-player-header-slot` div added after social icons in Header
- [x] Mobile slot: `#music-player-mobile-slot` with `flex-1 justify-center` between logo and hamburger
- [x] `MusicPlayer` rendered in `app/layout.tsx` after Footer
- [x] Nav icons — small 12px inline SVGs on all 5 desktop links (cross=About, book=Word, pen=Blog, flame=New Life, envelope=Contact)
- [x] Nav label: "The Word" → "Word"
- [x] Nav reorganised: Hymns replaced by New Life — Hymns now lives exclusively in the music player playlist switcher, eliminating duplication
- [x] `ReactElement` type used for icon map (not `JSX.Element` — removed in React 19)
- [x] WCAG contrast on track strip text: full `#C9A84C` (6.7:1 on navy) not `rgba(…,0.8)`

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

## 🔁 In Progress

### Phase 2 — Final Deploy (FTTG-53) ✅ COMPLETE
- [x] PR #47 merged: `feature/FTTG-55-visual-redesign` → `develop` (2026-06-27)
- [x] PR #48 merged: `develop` → `master` — brotherfemi.org is now live on Next.js (2026-06-28)
- [x] Production site confirmed live at https://www.brotherfemi.org
- [ ] Delete stale feature branches (FTTG-47 through FTTG-51, FTTG-54, FTTG-55, FTTG-59)

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

### Session 13 — 2026-06-28
**Completed:**
- TheWord: cobalt bg, open-book watermark, scroll-reveal, contrast fixes
- Blog: 2×2 grid (no orphan), Cinzel heading + gold-bar, staggered scroll-reveal, label = "Blog"
- Hymns: navy bg, "Now Playing" cobalt right panel replaces broken play-button rows, scroll-reveal
- NewLife deep redesigns: BibleRefPill component; verse text for all 18 scripture refs in JSON; FingerIcon SVG per Five Finger Prayer card; 5th card orphan fix; Spiritual Warfare navy bg + shield watermark; stub sections into 3-card grid; Altar Call stanza grouping + cross watermark + Cinzel heading; Children's Prayer structured hierarchy (parser, numbered badges, salutation, petition list, heart watermark)
- MusicPlayer iOS fix: `playVideoAt()` + `muteRef` + re-assert `unMute()` on PLAYING — fixes "plays one song, won't skip" on mobile

**Key Decisions:**
- Children's Prayer parser uses `⸻` (U+2E3B three-em dash) as stanza divider — matches exact JSON character; closing line detected by absence of `/^\d+\./` header pattern
- `playVideoAt(index)` preferred over `nextVideo()` on mobile — more reliable on iOS hidden players; manually tracked `trackIndexRef` keeps the index accurate across tracks
- Re-asserting `unMute()` in `onStateChange PLAYING` is the correct fix for iOS audio reset — iOS mutes each new video load; re-unmuting on every PLAYING event corrects it without requiring another user gesture (since playback itself was already gesture-initiated)
- Altar Call stanzas split on `""` empty string entries — existing JSON structure already encodes the natural stanza breaks; no JSON changes needed

### Session 12 — 2026-06-28
**Completed:**
- BibleVerseModal redesigned as a non-intrusive floating card (bottom sheet mobile, bottom-right desktop); no overlay, no scroll lock
- Social icons replaced with react-icons Font Awesome Brands — eliminates blur/anti-aliasing issues, especially Instagram
- Footer logo now links back to home
- Mentors section: navy bg, cobalt cards, scroll-reveal stagger, inline iframe MentorModal with ESC/backdrop dismiss and "Open in new tab" fallback
- Mission & Vision: combined into single component side-by-side on desktop; cream bg; animated Flame/Eye icons; scroll-reveal; Coming Soon pills
- Core Values: navy bg; SVG icon per value in gold circle; numeral watermark; scroll-reveal stagger with hover lift
- HeartCry: heart icon with heartbeat animation; decorative open-quote watermark; scroll-reveal stagger per prayer
- About: "A Life Changed by Grace" heading replaces verse reference; "Where it began / HOWJ Atlanta · June 22 2025" card label; both panels scroll-reveal with stagger
- Section rhythm restored to light/dark alternating pattern after too many consecutive navy sections
- Pronoun standardisation: "Our/We" → "My/I" across all section headings
- Nav click fix: `e.preventDefault()` + `scrollIntoView` prevents full page reload on nav click; eliminates header visual shift
- Dolapo Lawal added to mentors; duplicate entry removed (30 mentors total)

**Key Decisions:**
- BibleVerseModal uses `aria-modal="false"` — it's a supplemental panel, not a true modal; page stays interactive
- react-icons chosen over custom SVGs for social icons — professionally optimised fill paths, correct brand shapes at any size
- MissionVision combined into one component so the gold vertical divider and side-by-side layout can be implemented as a single flex container
- "A Life Changed by Grace" hardcoded as About heading — it's presentational, not content data; the verse reference belongs in the blockquote, not the h2
- Nav `e.preventDefault()` approach preferred over Next.js `<Link>` — avoids triggering route transitions while preserving the existing IntersectionObserver + replaceState URL sync system

### Session 11 — 2026-06-28
**Completed:**
- FTTG-61: Clean section URLs — route-based (`/worship`, `/about`, `/word` etc.) instead of hash links; `[section]` dynamic route + `ScrollToSection` for scroll-on-mount; URL synced via `replaceState` on scroll; `the-word` → `word` rename throughout
- FTTG-60: Client-side search — Fuse.js fuzzy search across sections/blog/mentors; ⌘K shortcut; `SearchButton` in Header (desktop + mobile); `SearchModal` portaled overlay with keyboard navigation
- FTTG-62: Bible verse modal — `BibleVerseLink` replaces anchor tags on all reference clicks; `BibleVerseModal` floating card (non-blocking, no overlay, no scroll lock); mobile bottom sheet with margins; desktop bottom-right corner; 4px gold top bar; ESC to close

**Key Decisions:**
- `generateStaticParams` + `ScrollToSection` preferred over client-side router navigation — avoids full-page re-renders and keeps scroll behavior snappy with `behavior: "instant"`
- `window.history.replaceState` used for URL sync on scroll (not Next.js router) — router pushes create history entries which break the back button for in-page scrolling
- `aria-modal="false"` on BibleVerseModal — it's not a true modal (doesn't trap focus, page stays interactive); correct ARIA semantics for a supplemental panel
- Fuse.js index built once at module level (`buildSearchIndex()` called outside component) — avoids rebuilding on every keystroke or re-render

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
