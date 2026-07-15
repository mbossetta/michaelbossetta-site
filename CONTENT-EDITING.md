# Content editing with Pages CMS

This site uses [Pages CMS](https://pagescms.org/) — a free, Git-based editor with no database. Changes you make in the browser are committed directly to GitHub and trigger a Cloudflare Pages rebuild.

## Setup (one time)

1. Push this repository to GitHub (if not already).
2. Go to [app.pagescms.org](https://app.pagescms.org/) and sign in with GitHub.
3. Add the `michaelbossetta-site` repository.
4. Select branch **`redesign-pass-1`** (or whichever branch Cloudflare deploys).
5. Pages CMS reads `.pages.yml` at the repository root — no extra config needed.

## What you can edit

| Section in Pages CMS | File | What it controls |
|---------------------|------|------------------|
| **Homepage** | `src/_data/home.json` | Hero intro, about text, teasers, quote, YouTube ID, social handle |
| **Site settings** | `src/_data/site.json` | Name, tagline, email, social links, profile image paths, podcast URLs, analytics ID |
| **Publications** | `src/_data/pubs.json` | Full publication list (add, edit, reorder) |
| **Media appearances** | `src/_data/media.json` | Press, TV, radio, presentations (add, edit, reorder by category) |

Layout, typography, and spacing stay in code (`src/assets/css/main.css`) — they are not editable in the CMS.

## Editing workflow

1. Open [app.pagescms.org](https://app.pagescms.org/) and select this repository.
2. Choose a content section from the sidebar (e.g. **Publications**).
3. Click an existing entry to edit, or **Add** for a new one.
4. Fill in the fields and **Save**. Pages CMS creates a Git commit on your branch.
5. Cloudflare Pages detects the push and rebuilds the preview site (typically 1–2 minutes).

## Images and files

### Profile and homepage images

1. In Pages CMS, open **Media** (left sidebar) or use an **image** field.
2. Upload a file — it is stored under `src/wp-content/uploads/` preserving WordPress-compatible paths.
3. Copy the path (e.g. `/wp-content/uploads/2023/01/your-image.jpg`) into **Site settings → Profile image** or **Homepage sidebar image**.

### Publication PDFs

Upload PDFs to Media. Use the resulting path (e.g. `/wp-content/uploads/2024/10/my-paper.pdf`) as the **Preprint URL** or **PDF URL** on a publication entry.

### CV

Replace `src/files/cv.pdf` locally or via GitHub, then push. The build copies it to the legacy WordPress CV path automatically. Pages CMS media upload to `src/files/` is not configured by default — update the CV by committing a new PDF to `src/files/cv.pdf`.

## Publications tips

- **Title links** use the **Preprint URL** field. Leave blank if no open-access link exists.
- **[X] link** in the Link column uses **Published-version URL**.
- Optional fields (volume, issue, DOI, etc.) are stored in JSON for future use; the current table shows year, authors, title, journal, and links.
- Sort by **year** descending in the CMS list view; use **Display order** if you need manual ordering later.

## Media appearance tips

- **Category** determines which section heading the entry appears under (Presentations, Television, Print, etc.).
- **Display order** controls sort order within that category (lower numbers first).
- External URLs open in a new tab automatically.

## Homepage tips

- In **Hero introduction**, write `Publications` and `Podcast` as plain words — the template turns them into links.
- In **About section body**, write `Contact page` — it becomes a link to `/contact/`.
- **YouTube video ID** is only the ID (e.g. `xQm9wWMyG3M`), not the full URL.

## Local preview before pushing

If you edit files locally instead of via Pages CMS:

```bash
npm start
# open http://localhost:8080
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Image 404 after upload | Confirm path starts with `/wp-content/uploads/` and file exists under `src/wp-content/uploads/` |
| CMS shows wrong branch | Switch branch in Pages CMS settings to match Cloudflare deploy branch |
| Build fails after edit | Run `npm run build` locally; fix JSON syntax errors (trailing commas, etc.) |
| El Mercurio PDF 404 | Known issue on live WordPress too — re-upload PDF manually if needed |

## What stays in code

- Page layout and design (`*.njk`, `main.css`)
- Navigation order (`src/_data/navigation.json`)
- URL redirects (`src/_redirects`)
- Podcast page body copy (edit `src/podcast.njk` or extend CMS later)
