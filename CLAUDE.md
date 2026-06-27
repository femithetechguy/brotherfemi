# BrotherFemi — Ministry Website
## What This Is
A personal ministry website for Brother Femi (Adefemi Kolawole) — a faith-inspired space to share his journey as a bond servant of Christ. The site includes prayers, blog posts, mentors, new life resources, hymns, testimony, and contact/social links.

**Owner:** Adefemi (Femi) Kolawole  
**Domain:** brotherfemi.org  
**Hosting:** Vercel  
**Linear Project:** BrotherFemi (FTTG Solutions)

---

## Current Stack
| Tool | Purpose |
|---|---|
| HTML / CSS / Vanilla JS | Current static site (v1) |
| JSON files | Content data source (sections, mentors, ministry, brotherfemi) |
| Vercel | Hosting and deployment |
| GitHub | Source control (master branch = production) |

---

## Planned Stack (Next.js Migration)
| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling (replaces CSS files) |
| JSON / Sanity CMS (later) | Content — JSON files carry over as-is initially |
| Vercel | Hosting (unchanged) |

---

## Architecture

### Current — Static Site
```
text/*.json  →  js/scripts.js  →  index.html (single page)
                                   blog/*.html (4 standalone posts)
```

### Planned — Next.js
```
data/*.json  →  Next.js components  →  app/page.tsx (home)
                                        app/blog/[slug]/page.tsx
                                        Vercel (static export)
```

### Repository Structure (Current)
```
index.html              ← Single page app entry point
blog/                   ← 4 standalone HTML blog posts
css/
  styles.css            ← Main styles
  blog_styles.css       ← Blog-specific styles
js/
  scripts.js            ← Main app logic (renders JSON content)
  blog_scripts.js       ← Blog page logic
text/
  brotherfemi.json      ← Bio, testimony, heart cry, core values, anchor, contact/socials
  sections.json         ← All page sections with content (prayers, new life, blog, etc.)
  mentors.json          ← Mentor list
  ministry.json         ← Ministry content
img/                    ← Images and icons
svg/                    ← SVG assets
CNAME                   ← Custom domain (brotherfemi.org)
```

### Planned Next.js Structure
```
app/
  page.tsx                    ← Home (maps from index.html)
  blog/
    page.tsx                  ← Blog listing
    [slug]/page.tsx           ← Individual blog posts
  layout.tsx                  ← Root layout (nav, footer)
components/
  sections/                   ← One component per section
  ui/                         ← Shared UI components
data/
  brotherfemi.json            ← Carried over as-is
  sections.json               ← Carried over as-is
  mentors.json                ← Carried over as-is
  ministry.json               ← Carried over as-is
public/
  img/                        ← Carried from img/
  svg/                        ← Carried from svg/
```

---

## Site Sections (from sections.json)
| Section ID | Title | Notes |
|---|---|---|
| worship | Worship & Adoration | Has bible verse |
| mission | Mission | Content TBD |
| vision | Vision | Content TBD |
| core-values | Core Values | From brotherfemi.json |
| heart-cry | Heart-Cry | From brotherfemi.json |
| about | My Testimony | From brotherfemi.json |
| mentors | Mentors | From mentors.json |
| the-word | The Word | Has bible verse |
| blog | Blog | 4 posts currently |
| hymns | Hymns | Has bible verse |
| newlife | New Life | Largest section — prayers, alter call, warfare, children prayers |
| contact | Contact & Socials | Social links from brotherfemi.json |

---

## Key Files
| File | Purpose |
|---|---|
| `text/brotherfemi.json` | Bio, testimony, heart cry, core values, anchor, contact/socials |
| `text/sections.json` | All page section content — source of truth for the entire site |
| `text/mentors.json` | Mentor list |
| `text/ministry.json` | Ministry content |
| `js/scripts.js` | Main app logic — renders JSON into DOM |
| `css/styles.css` | Main stylesheet |
| `CNAME` | Custom domain config — do not touch |
| `PROGRESS.md` | Full session history, completed work, pending items |

---

## Conventions & Rules
- **JSON files are source of truth.** All content changes go in `text/*.json` — never hardcode content in HTML.
- **`master` = production.** Never push broken code directly to master.
- **Branch strategy:** feature branch → develop → PR → master.
- **Vercel auto-deploys** on push to master. Preview deployments on all other branches.
- **Do not add Co-Authored-By lines to commits.**
- **After migration:** `data/*.json` replaces `text/*.json` — same files, new location.

---

## Git / Linear Commit Format
**Linear project:** BrotherFemi (FTTG-XX format)

```
Fixes FTTG-XX: what you changed    ← closes the Linear issue
Ref FTTG-XX: what you changed      ← progress, issue stays open
type: what you changed              ← for work without a Linear issue
```

- `Fixes` / `Closes` / `Resolves` → closes and logs in Linear activity
- `Ref` / `Refs` → links commit, issue stays open
- Use conventional commit types for non-Linear work: `feat`, `fix`, `chore`, `docs`, `refactor`
- **Do not add `Co-Authored-By` lines to commits**

---

## Current Status
- ✅ **Done:**
  - Static site live at brotherfemi.org
  - All content in JSON files (sections, mentors, ministry, bio)
  - 4 blog posts published
  - CLAUDE.md and PROGRESS.md created
- 🔁 **In Progress:**
  - Next.js migration planning (FTTG-45+)
- ⚠️ **Not Started / Blocked:**
  - Mission and vision content (currently "To be disclosed")
  - Next.js scaffold and migration
  - Sanity CMS integration (future — after migration stable)

---

## Pending Work
- [ ] Delete `app-remake` branch from remote
- [ ] Update `.gitignore` for Next.js (`node_modules/`, `.next/`, `.env*`)
- [ ] Tag current master as `v1.0-static` before migration
- [ ] Scaffold Next.js app on new `nextjs-migration` branch
- [ ] Migrate content and components from static site
- [ ] Add mission and vision content

---

## Active Blockers
- **Mission / Vision content** — placeholder "To be disclosed" in sections.json; content needed before those sections can be built in Next.js
- **`app-remake` branch** — failed migration attempt still exists on remote; delete before starting fresh migration to avoid confusion

---

## Do Not Touch
- `text/*.json` — source of truth for all content; changes ripple through entire site
- `CNAME` — custom domain config; do not delete or rename
- `master` branch — always production-ready; never commit broken code directly

---

*Last updated: 2026-06-27 (Session 1: CLAUDE.md and PROGRESS.md created, Next.js migration planned)*  
> **Read `PROGRESS.md` for full session history, completed work, and detailed pending items.**
