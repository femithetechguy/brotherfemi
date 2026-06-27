# Project Progress — BrotherFemi Ministry Website
Last updated: June 27, 2026 (Session 1: CLAUDE.md and PROGRESS.md created, Next.js migration planned)

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
- [x] Christie Bature and Throphilus Sunday added as mentors

---

## 🔁 In Progress

### Phase 1 — Housekeeping & Migration Prep (FTTG-45)
- [ ] Delete `app-remake` branch from remote: `git push origin --delete app-remake`
- [ ] Update `.gitignore` for Next.js (`node_modules/`, `.next/`, `.env*`)
- [ ] Tag current master as `v1.0-static`: `git tag v1.0-static && git push origin v1.0-static`

---

## ⚠️ Not Started

### Phase 2 — Next.js Migration
- [ ] Create `nextjs-migration` branch from master
- [ ] Scaffold Next.js 14 app with TypeScript and Tailwind CSS
- [ ] Configure `next.config.js` with `output: 'export'` for Vercel static hosting
- [ ] Create `app/layout.tsx` — root layout (nav, footer)
- [ ] Create `app/page.tsx` — home page (maps all sections from `sections.json`)
- [ ] Create `app/blog/page.tsx` — blog listing
- [ ] Create `app/blog/[slug]/page.tsx` — individual blog posts (4 posts)
- [ ] Build section components (one per section ID in sections.json)
- [ ] Copy `text/*.json` → `data/` folder
- [ ] Copy `img/` and `svg/` → `public/`
- [ ] Migrate `css/styles.css` → Tailwind utilities
- [ ] Test on Vercel preview before merging to master
- [ ] PR `nextjs-migration` → develop → master

### Phase 3 — Content & Enhancements
- [ ] Add mission content (currently "To be disclosed" in sections.json)
- [ ] Add vision content (currently "To be disclosed" in sections.json)
- [ ] Add more blog posts
- [ ] Evaluate Sanity CMS integration for non-developer content updates

---

## Session Log

### Session 1 — 2026-06-27
**Completed:**
- Created `CLAUDE.md` with full project context, stack, architecture, section map, key files, git workflow
- Created `PROGRESS.md`
- Reviewed static site — confirmed all content already JSON-driven
- Identified `app-remake` as failed migration attempt (vite not installed, TypeScript errors)
- Planned Next.js migration: App Router, TypeScript, Tailwind, JSON data carry-over, static export

**Key Decisions:**
- JSON files carry over as-is into `data/` folder — no CMS needed initially
- Sanity CMS as optional future upgrade
- `output: 'export'` for Vercel static hosting
- Start fresh on `nextjs-migration` branch — delete `app-remake`

**Pending from this session:**
- Delete `app-remake` from remote
- Update `.gitignore`
- Tag `v1.0-static`
- Scaffold Next.js
