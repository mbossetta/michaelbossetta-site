# Michael Bossetta — Static Site

Personal academic website built with [Eleventy](https://www.11ty.dev/) for deployment on Cloudflare Pages.

## Quick start

```bash
npm install
npm run mirror-assets   # download PDFs/images from live site (first-time setup)
npm run build           # output to _site/
npm start               # local preview at http://localhost:8080
```

## Documentation

| Doc | Purpose |
|-----|---------|
| [MIGRATION-STATUS.md](MIGRATION-STATUS.md) | Audit: static vs live WordPress |
| [CONTENT-EDITING.md](CONTENT-EDITING.md) | Browser editing via Pages CMS |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Cloudflare Pages setup |
| [docs/redirect-plan.md](docs/redirect-plan.md) | URL redirect map |
| [docs/asset-mirroring-plan.md](docs/asset-mirroring-plan.md) | Asset mirroring |

## Cloudflare Pages settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Build output directory | `_site` |
| Node version | 20 |

See [DEPLOYMENT.md](DEPLOYMENT.md) for full setup steps.

## Editing content

**Browser (recommended):** [Pages CMS](https://app.pagescms.org/) — see [CONTENT-EDITING.md](CONTENT-EDITING.md).

**Direct file edit:**

| Task | File |
|------|------|
| Homepage text | `src/_data/home.json` |
| Add/edit publication | `src/_data/pubs.json` |
| Add/edit media appearance | `src/_data/media.json` |
| Site-wide links & analytics | `src/_data/site.json` |
| Navigation | `src/_data/navigation.json` |
| Update CV | Replace `src/files/cv.pdf`, then `npm run build` |
| Styles | `src/assets/css/main.css` |

## CV

- **Canonical URL:** `/files/cv.pdf`
- **Legacy URL (mirrored on each build):** `/wp-content/uploads/2025/08/Michael-Bossetta-CV-Updated-August-2025.pdf`

Replace only `src/files/cv.pdf`. The build script syncs it to the legacy path automatically.

## Assets

Publication PDFs and images live under `src/wp-content/uploads/` at the **same paths** as the WordPress site. See `docs/asset-mirroring-plan.md` and `scripts/asset-manifest.txt`.

**Note:** The El Mercurio PDF returns 404 on the live WordPress site as well. Re-upload manually if needed.

## Redirects

See `src/_redirects` and `docs/redirect-plan.md`.
