# Migration Status Audit

**Date:** 2026-07-15  
**Branch:** `redesign-pass-1`  
**Live site:** https://michaelbossetta.com (WordPress, Personify Pro theme)  
**Static site:** Eleventy → `_site/` → Cloudflare Pages (not yet deployed)

---

## Local preview

From the project root:

```bash
cd /Users/michaelbossetta/Dropbox/michael-site-rebuild
npm install          # first time only
npm start            # dev server with live reload
```

Open **http://localhost:8080** in your browser.

One-off build (no server):

```bash
npm run build        # output in _site/
```

First-time asset setup (mirrors PDFs/images from live site):

```bash
npm run mirror-assets
```

---

## Current page structure

| URL | Static template | Status |
|-----|-----------------|--------|
| `/` | `src/index.njk` | Exists; layout differs from live |
| `/publications/` | `src/publications.njk` | Exists; 34 entries in `pubs.json` (matches live table count) |
| `/cv/` | `src/cv.njk` | Exists; download button only |
| `/podcast/` | `src/podcast.njk` | Exists; Apple Podcasts embed + copy |
| `/media/` | `src/media.njk` | Exists; content hardcoded in template |
| `/contact/` | `src/contact.njk` | Exists; email + Twitter links |
| `/sitemap.xml` | `src/sitemap.njk` | Generated |
| `/robots.txt` | `src/robots.txt` | Static passthrough |

**Not migrated:** WordPress infrastructure (`/wp-admin/`, `/wp-json/`, `/feed/`, `/xmlrpc.php`), site search, blog archive pages (`/2018/04/`, category pages — redirected instead).

---

## Missing or incomplete

### High priority (visual / functional parity)

- **Homepage layout** — Live uses Personify Pro sections (hero with headshot, styled “about” headline, dated teaser cards with “Read More”, Copenhagen image with `@SMandPPodcast`, quote block, YouTube embed). Static uses a simplified hero + plain `<section>` blocks.
- **Typography** — Live uses **Open Sans** (body) and **Abhaya Libre** (headings). Static uses system sans-serif (`Segoe UI`) and Georgia for quotes.
- **Fonts not loaded** — No Google Fonts link in static build.
- **YouTube video** — Live homepage embeds `https://youtu.be/xQm9wWMyG3M`; static omits it.
- **Homepage “about” headline** — Live: *“My research focuses on how Politicians and Citizens use social media during Elections”* with accent `<span>` styling. Static uses a plain “Research” `<h2>`.
- **Homepage teaser cards** — Live shows dated Publications/Podcast cards linking to legacy URLs (redirected). Static inlines full section text instead.
- **Pages CMS** — Not configured (no `.pages.yml`).
- **Media data file** — Entries hardcoded in `media.njk`; should move to `src/_data/media.json`.
- **Homepage editable data** — Bio/sections hardcoded in `index.njk`; only global settings in `site.json`.
- **Custom 404 page** — Not present.
- **Deployment docs** — No `DEPLOYMENT.md` or `CONTENT-EDITING.md` yet.

### Lower priority / acceptable differences

- **Site search** — Live nav includes a search toggle (WordPress). Not needed for static parity unless desired.
- **Breadcrumbs** — Live inner pages show breadcrumb trails; static omits them.
- **Back-to-top button** — Live footer has one; static omits it.
- **PDF inline viewer** — Live CV page uses PDF Viewer plugin styling; static uses a direct download link (functionally equivalent).
- **Schema.org JSON-LD** — Live outputs rich structured data via Yoast/AIOSEO; static has basic meta tags only.
- **Contact Form 7** — Plugin CSS/JS loaded site-wide on live, but Contact page content is email/Twitter only (no working form on that page).

---

## Static vs live: design differences

| Element | Live (WordPress / Personify Pro) | Static (Eleventy) |
|---------|----------------------------------|-------------------|
| Theme | Personify Pro | Custom CSS in `main.css` |
| Body font | Open Sans, 16px, `#333` | Segoe UI / system stack, `#1a1a1a` |
| Heading font | Abhaya Libre (serif) | Same as body (sans) |
| Accent color | `#003aa8` | `#003aa8` ✓ |
| Header | Sticky; brand + tagline left; horizontal nav; search icon; SVG menu toggle | Sticky; brand + tagline; horizontal nav; text “Menu” toggle; no search |
| Hero | Headshot as background image; name split into first/last spans | Copenhagen photo as full-width hero bg; headshot as `<img>` overlay |
| Homepage sections | About headline, teaser cards, side image, quote carousel, video | Linear `<section>` blocks with `<h2>` headings |
| Footer | Copyright only | Copyright + affiliation + email/Twitter |
| Publications | DataTables-style HTML table (desktop) | Table (desktop) + card list (mobile ≤768px) |
| CV page | Styled “Download CV” button → legacy wp-content PDF URL | Blue button → `/files/cv.pdf` |
| Podcast page | Similar content; 175k downloads figure | Matches content; Apple embed present |
| Page width | Personify Pro `.wrapper` (~1140px) | `--max-width: 1100px` (close) |

---

## Fonts, typography, spacing, colors

**Live (from theme + customizer):**

- Fonts: `Open Sans` (300–700), `Abhaya Libre` (400, 600, 700) via Google Fonts
- Body: `#333` on `#f6f6f6` page background (white content areas)
- Accent / links / buttons: `#003aa8`
- Section titles use Abhaya Libre with accent-colored `<span>` highlights
- Separator lines (red/accent bars) between hero elements

**Static:**

- CSS variables in `src/assets/css/main.css`
- No webfont loading; approximate sizing but different typeface feel
- Alternating `#f6f7f9` section backgrounds on homepage (similar intent)

---

## Header and navigation

**Live:** Home · Publications · CV · Podcast · Media · Contact + search icon. Sticky header. Mobile: icon-based menu toggle.

**Static:** Same six links from `src/_data/navigation.json`. Sticky header. Mobile: “Menu” button toggles vertical nav (`nav.js`). Active page indicated with underline.

**URL parity:** All nav URLs match live paths (trailing slashes on inner pages).

---

## Responsive / mobile

**Live:** Personify Pro breakpoints; publications table may scroll or reflow depending on viewport.

**Static:** Explicit breakpoint at 768px — hamburger nav, hero stacks (photo above text), publications switch from table to cards, podcast iframe height reduced.

**Needs verification at:** 375px, 768px, 1024px, desktop after Stage 2 visual pass.

---

## Images, PDFs, and downloadable files

**Asset mirroring:** `npm run mirror-assets` downloads 25 URLs listed in `scripts/asset-manifest.txt` into `src/wp-content/uploads/` preserving WordPress paths. Currently **24 files** present locally (El Mercurio PDF 404s on live too).

**CV workflow:**

- Canonical: `/files/cv.pdf` (source: `src/files/cv.pdf`)
- Legacy mirror: `/wp-content/uploads/2025/08/Michael-Bossetta-CV-Updated-August-2025.pdf` (synced on each build via `scripts/sync-cv.mjs`)

**Key images:**

| Asset | Path | Local |
|-------|------|-------|
| Headshot | `/wp-content/uploads/2023/01/Michael-Bossetta-Headshot-Compressed-for-Website-1-scaled.jpg` | ✓ |
| Copenhagen photo | `/wp-content/uploads/2018/04/Copenhagen-Black-White-Color-Select-1-e1524284609434.jpg` | ✓ |
| Favicon | `/wp-content/uploads/2020/11/favicon-1.ico` | ✓ |

Publication pre-print PDFs under `/wp-content/uploads/` are mirrored and linked from `pubs.json`.

---

## Contact functionality

**Live Contact page:** Plain text — Twitter `@MichaelBossetta` and email `michael@socialmediaandpolitics.org`. No submit form on the page itself (Contact Form 7 is installed site-wide but unused here).

**Static Contact page:** Equivalent email + Twitter list. **No form needed** for parity; email-link fallback is correct.

---

## SEO metadata

**Present in static:**

- `<title>`, meta description (where set in front matter)
- Canonical URLs via `site.url` + `page.url`
- Open Graph: type, site_name, title, description, url
- Twitter card (summary), site handle
- `robots.txt` with sitemap reference
- Auto-generated `sitemap.xml`

**Missing vs live:**

- `og:image` / Twitter large-image card
- JSON-LD structured data (Organization, WebSite, BreadcrumbList)
- Live homepage meta description still says “Political and Data Scientist” (older title); static says “Associate Professor (Docent)” — static is more current

---

## Existing redirects

Configured in `src/_redirects` (Cloudflare Pages format):

- `/home/` → `/`
- Legacy publication/podcast URLs → current pages
- WordPress category archives → current pages
- `/pdfviewer/*` → direct PDF or `/files/cv.pdf`
- Documented in `docs/redirect-plan.md`

**Not yet added:** `/cv/download/` alias (optional, documented in plan).

**Trailing slashes:** Eleventy permalinks use trailing slashes on inner pages, matching live.

**www vs apex:** Live canonical URLs use apex `michaelbossetta.com`. Static `site.json` matches. Cloudflare redirect rule TBD at deploy.

---

## Analytics and external scripts

| Script | Live | Static |
|--------|------|--------|
| Google Analytics 4 (`G-XV3CTBJWRY`) | ✓ (ExactMetrics/MonsterInsights) | ✓ (gtag in `base.njk`) |
| Apple Podcasts embed | ✓ | ✓ |
| YouTube (homepage) | ✓ | ✗ |
| WordPress/jQuery/Slick/DataTables | ✓ | N/A (removed) |
| Contact Form 7 JS | Loaded globally | N/A |

---

## WordPress functionality still to replace

| WP feature | Replacement plan |
|------------|------------------|
| Personify Pro theme layout | Stage 2 CSS/template work |
| Publications table (Supsystic Data Tables) | Static HTML table from `pubs.json` ✓ |
| PDF Viewer plugin | Direct PDF links + redirects ✓ |
| Media page content | Move to `media.json` + template (Stage 3) |
| Pages CMS / WP admin | Pages CMS via `.pages.yml` (Stage 3) |
| Site search | Omit unless requested |
| RSS feeds | Omit |
| Comments | N/A |
| WP cron / dynamic features | N/A |

---

## Build status

```
npm run build   → succeeds (7 HTML pages + sitemap + 30 passthrough files)
```

---

## Recommended next steps

1. **Stage 2** — Match Personify Pro visual design (fonts, homepage structure, hero, sections, video, footer).
2. **Stage 3** — Add Pages CMS (`.pages.yml`), extract `media.json` and homepage content to data files, write `CONTENT-EDITING.md`.
3. **Stage 4** — Cloudflare Pages preview setup, `DEPLOYMENT.md`, 404 page, final redirect validation.
