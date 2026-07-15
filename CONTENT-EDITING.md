# Content editing with Pages CMS

This site uses [Pages CMS](https://pagescms.org/) — a free, Git-based editor with no database. Changes you make in the browser are saved as commits to GitHub and trigger an automatic Cloudflare Pages rebuild.

**Workflow:** Edit in Pages CMS → commit to GitHub → Cloudflare rebuilds the live site (usually 1–2 minutes).

---

## One-time setup

1. Ensure this repository is on GitHub (`mbossetta/michaelbossetta-site`).
2. Go to **[app.pagescms.org](https://app.pagescms.org/)** and sign in with GitHub.
3. Click **Add repository** and select `michaelbossetta-site`.
4. Choose branch **`redesign-pass-1`** (or whichever branch Cloudflare Pages deploys).
5. Pages CMS reads `.pages.yml` at the repository root — no other configuration is required.

---

## Content audit (where everything lives)

| Content | Editable in CMS? | Data file | Template (layout only) |
|--------|-------------------|-----------|-------------------------|
| Site name | Yes | `src/_data/site.json` | `src/_includes/header.njk` |
| Tagline | Yes | `site.json` → `tagline` | `header.njk` |
| Current position, department, institution | Yes | `site.json` | Used in SEO metadata |
| Contact email | Yes | `site.json` → `email` | `src/contact.njk` |
| Profile image (headshot) | Yes | `site.json` → `headshot` | `src/index.njk` |
| Homepage sidebar image | Yes | `site.json` → `hero_bg` | `src/index.njk` |
| CV download file | Upload via Media | `src/files/cv.pdf` | `src/cv.njk` |
| CV URL | Yes | `site.json` → `cv_url` | `src/cv.njk` |
| Podcast platform links | Yes | `site.json` → `podcast` | `src/podcast.njk` |
| Podcast page body text | Yes | `site.json` → `podcast_page` | `src/podcast.njk` |
| Publications page intro | Yes | `site.json` → `publications_page` | `src/_includes/publications-list.njk` |
| Hero biography | Yes | `src/_data/home.json` → `hero_intro` | `src/index.njk` |
| Research-focus statement | Yes | `home.json` → `about_headline` + `about_headline_accents` | `src/index.njk` |
| Main research description | Yes | `home.json` → `about_body` | `src/index.njk` |
| Podcast description (about sidebar) | Yes | `home.json` → `podcast_summary` | `src/index.njk` |
| Homepage feature blocks | Yes | `home.json` → `publications_feature`, `podcast_feature`, `current_work_feature` | `src/index.njk` |
| Quote & YouTube video | Yes | `home.json` → `quote`, `quote_author`, `youtube_id` | `src/index.njk` |
| All publications | Yes | `src/_data/pubs.json` | `publications-list.njk` |
| All media appearances | Yes | `src/_data/media.json` | `media-list.njk` |
| Navigation menu order | No (code) | `src/_data/navigation.json` | `header.njk` |
| Page layout, colours, typography | No (code) | `src/assets/css/main.css`, `*.njk` | — |
| URL redirects | No (code) | `src/_redirects` | — |
| Google Analytics ID | Code only | `site.json` → `ga4_id` (not in CMS) | `base.njk` |

---

## Sidebar sections in Pages CMS

| Section | What you can edit |
|--------|-------------------|
| **Homepage** | Hero bio, research statement, about text, podcast summary, homepage feature blocks, quote, YouTube ID |
| **Publications** | Full publication list — add, edit, reorder |
| **Media** | Press, TV, radio, presentations — add, edit, reorder by category |
| **Site information** | Name, tagline, position, email, images, podcast links, publications/podcast page intro text |

You edit through structured forms — not raw JSON.

---

## Routine editing workflow

1. Open [app.pagescms.org](https://app.pagescms.org/) → select this repository.
2. Choose a section from the sidebar (e.g. **Publications**).
3. Click an entry to edit, or **Add** for a new one.
4. Fill in the fields and **Save**. Pages CMS creates a Git commit on your branch.
5. Cloudflare Pages detects the push and rebuilds (typically **1–2 minutes**).

---

## Homepage features

### Research-focus statement

- Edit **Research-focus statement** (plain text).
- Edit **Accent words** list — those words appear in blue (e.g. `research`, `Politicians`, `Elections`).

### Featured publications block

Under **Featured publications block**:

- Set title, description, dates, and links manually, **or**
- Paste a **Publication ID** from the Publications list (e.g. `pub-2024-did-gen-z-shape-the-election-no-because`).
- When an ID is set, the **title** links to that publication’s preprint URL and an optional **note** field can supply the description.

### Featured podcast block

Edit text fields directly under **Featured podcast block**.

### Sidebar / current work

Under **Sidebar / current work**:

- **Handle or caption** — text on the sidebar image (default: `@SMandPPodcast`).
- **Sidebar image** — optional override; leave blank to use **Homepage sidebar image** from Site information.
- **Featured publication ID** / **Featured media ID** — for reference; optional extra block appears only if you fill in **Extra block title**.

### Hero biography tips

- Write `Publications` and `Podcast` as plain words — they become links automatically.
- In **Main research description**, write `Contact page` — it becomes a link to `/contact/`.

---

## Adding a publication

1. Open **Publications** → **Add**.
2. Fill in **Year**, **Author(s)**, **Title**, and **Journal or venue** at minimum.
3. Add **Preprint / open-access URL** (title becomes a link) and/or **Publisher URL** (shown as `[X]`).
4. A **Stable ID** is assigned when entries are created — copy it if you want to feature this publication on the homepage.
5. **Save** → wait for Cloudflare to rebuild.

Optional fields (volume, issue, pages, DOI, PDF, type, note, display order) are stored for future use; the table shows year, authors, title, journal, and links.

---

## Adding a media appearance

1. Open **Media** → **Add**.
2. Set **Format or category**, **Title**, **Date**, **Outlet**, and **URL**.
3. Set **Display order** within that category (lower numbers appear first).
4. **Save** → wait for rebuild.

To feature on the homepage sidebar, copy the entry’s **Stable ID** into **Homepage → Sidebar / current work → Featured media ID**.

---

## Images and PDFs

Pages CMS provides two media libraries:

| Library | Use for |
|---------|---------|
| **Website images & PDFs** | Profile photo, homepage images, publication PDFs under `/wp-content/uploads/` |
| **CV & site documents** | CV PDF at `/files/cv.pdf` |

### Upload an image

1. Open **Website images & PDFs** in the Media area, or use an **image** field’s upload button.
2. Upload the file — it is stored under `src/wp-content/uploads/`.
3. Select the image in **Site information → Profile image** or **Homepage sidebar image**, or paste the path (e.g. `/wp-content/uploads/2024/10/my-photo.jpg`).

Paths work locally and on Cloudflare because Eleventy copies `src/wp-content/` to the site output.

### Replace the CV

1. Open **CV & site documents** in Media.
2. Upload a new PDF named `cv.pdf` (or upload and set **CV download path** in Site information to `/files/your-file.pdf`).
3. **Save** — the build also mirrors the CV to the legacy WordPress path automatically.

---

## Deployment

- **Host:** Cloudflare Pages (see `DEPLOYMENT.md`).
- **Build command:** `npm run build`
- **Output directory:** `_site`
- **Trigger:** Every push to the connected branch (including Pages CMS commits).
- **Typical wait:** 1–2 minutes after Save in Pages CMS.

---

## Reverting an accidental edit

1. Open the repository on **GitHub**.
2. Go to **Commits** and find the commit Pages CMS created (or the file history for `src/_data/…`).
3. Use **Revert** on the commit, or restore an earlier version of the file through GitHub’s editor.
4. Cloudflare will rebuild with the restored content.

For a single publication or media entry, it is often easier to open the entry in Pages CMS and fix the fields directly.

---

## What still requires Cursor (or a developer)

- Layout and visual design (`src/assets/css/main.css`, page templates)
- Navigation menu items and order (`src/_data/navigation.json`)
- URL redirects (`src/_redirects`)
- New page types or structural homepage changes
- Google Analytics ID (`ga4_id` in `site.json` — intentionally omitted from CMS)
- DNS and Cloudflare project settings

---

## Local preview (optional)

Developers can run `npm start` and open http://localhost:8080 — not required for routine CMS editing.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Image 404 after upload | Confirm path starts with `/wp-content/uploads/` and the file exists under `src/wp-content/uploads/` |
| CMS shows wrong branch | Switch branch in Pages CMS to match Cloudflare |
| Build fails after edit | Check JSON syntax — no trailing commas; run `npm run build` locally if needed |
| Homepage ID not linking | Copy the exact **Stable ID** from Publications or Media — IDs are case-sensitive |
