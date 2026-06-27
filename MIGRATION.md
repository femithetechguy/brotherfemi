# BrotherFemi — Next.js Migration Plan
*Technical reference for the v1 static → Next.js 14 migration*

---

## Why Next.js
- Site will grow over time (blog posts, new sections, possible sermon library)
- Better SEO via server-side rendering / static generation
- Component-based structure replaces monolithic `scripts.js`
- Vercel is already the host — Next.js is the natural fit
- JSON content files carry over as-is — no CMS needed initially

---

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Modern, Vercel-native, file-based routing |
| Language | TypeScript | Type safety for JSON data structures |
| Styling | Tailwind CSS | Replaces custom CSS, consistent utility classes |
| Output | `output: 'export'` (static) | No server needed, works with Vercel free tier |
| Content | JSON files in `data/` | Carry over from `text/` — no CMS needed yet |
| Blog format | MDX or JSON | Convert 4 HTML blog posts |
| CMS | Sanity (future) | Only if non-developer needs to update content |

---

## Branch Strategy
```
master          ← production (brotherfemi.org)
develop         ← integration
  └── feature/FTTG-XX-description   ← individual issue branches
```

Each FTTG issue gets its own branch off develop, PR'd back into develop. When migration is complete and validated, develop → PR → master.

---

## File Mapping (Static → Next.js)

| Current | Next.js |
|---|---|
| `index.html` | `app/page.tsx` |
| `blog/*.html` (4 files) | `app/blog/[slug]/page.tsx` |
| `css/styles.css` | Tailwind + `app/globals.css` |
| `css/blog_styles.css` | Tailwind |
| `js/scripts.js` | Section components |
| `js/blog_scripts.js` | Blog components |
| `text/*.json` | `data/*.json` |
| `img/` | `public/img/` |
| `svg/` | `public/svg/` |
| `favicon.ico` | `public/favicon.ico` |
| `robots.txt` | `public/robots.txt` |
| `sitemap.xml` | `public/sitemap.xml` |
| `site.webmanifest` | `public/site.webmanifest` |
| `CNAME` | Vercel domain config (not in repo) |

---

## Folder Structure (Target)

```
app/
  layout.tsx              ← Root layout: nav, footer, metadata
  page.tsx                ← Home — renders all sections from sections.json
  blog/
    page.tsx              ← Blog listing
    [slug]/
      page.tsx            ← Individual post
components/
  layout/
    Nav.tsx               ← Navigation
    Footer.tsx            ← Footer
  sections/
    Worship.tsx
    Mission.tsx
    Vision.tsx
    CoreValues.tsx
    HeartCry.tsx
    Testimony.tsx
    Mentors.tsx
    TheWord.tsx
    Blog.tsx
    Hymns.tsx
    NewLife.tsx
    Contact.tsx
  ui/
    BibleVerse.tsx        ← Reusable bible verse block
    SectionWrapper.tsx    ← Consistent section padding/id
data/
  brotherfemi.json
  sections.json
  mentors.json
  ministry.json
public/
  img/
  svg/
  favicon.ico
  robots.txt
  sitemap.xml
  site.webmanifest
types/
  index.ts                ← TypeScript interfaces for all JSON shapes
```

---

## TypeScript Types to Define (FTTG-48)

```ts
// BrotherFemi bio
interface BrotherFemi { ... }

// Section
interface Section {
  id: string
  title: string
  menu: string
  bibleVerse?: string
  reference?: string
  bible_url?: string
  text?: string | string[]
  children?: NewLifeChild[]
  blogtitles?: BlogPost[]
}

// Mentor
interface Mentor { ... }

// Blog post
interface BlogPost {
  title: string
  short_details: string
  read_more_url: string
}
```

---

## Section Component Notes (FTTG-50)

| Section | Complexity | Notes |
|---|---|---|
| worship | Low | Title + bible verse + text |
| mission | Low | Placeholder — content TBD |
| vision | Low | Placeholder — content TBD |
| core-values | Low | List from brotherfemi.json |
| heart-cry | Low | List from brotherfemi.json |
| about | Medium | Testimony text + Instagram embed |
| mentors | Medium | Card list from mentors.json |
| the-word | Low | Bible verse + text |
| blog | Medium | Card list linking to blog/[slug] |
| hymns | Low | Bible verse + text + playlist |
| newlife | High | Largest — nested children with multiple sub-sections |
| contact | Low | Social links from brotherfemi.json |

**newlife** is the most complex section — it has nested `children` with sub-sections (christian, acknowledgement, confession, altercall, serenity prayer, early morning declaration, life principles, five finger prayer, prayer for children). Build last.

---

## Blog Migration Notes (FTTG-51)

4 existing posts in `blog/*.html`:
- `midnight-encounter.html`
- `my-journey-to-faith.html`
- `lessons-from-the-valley.html`
- `worship-as-a-lifestyle.html`

Options:
1. **MDX files** in `content/blog/[slug].mdx` — best for long-form writing, easy to add new posts
2. **JSON** — consistent with existing data approach but less natural for prose

**Recommendation: MDX.** Install `@next/mdx` or `next-mdx-remote`. Each post gets a frontmatter block (title, date, slug, excerpt) and prose body.

---

## SEO Notes (FTTG-52)
- Add `<title>`, `<meta description>` per page via Next.js `metadata` export
- `robots.txt` and `sitemap.xml` carry over to `public/` as-is initially
- Open Graph tags for blog posts
- Structured data (JSON-LD) optional but good for ministry discovery

---

## Deployment Notes (FTTG-53)
- Vercel already connected to GitHub repo
- Preview deploys on every branch push — test on preview URL before merging
- `output: 'export'` in `next.config.js` produces a static `out/` folder
- No server-side features (no API routes, no ISR) — pure static export
- Custom domain (brotherfemi.org) stays on Vercel — no DNS changes needed
- After PR master merge, Vercel auto-deploys production

---

*Last updated: 2026-06-27*
