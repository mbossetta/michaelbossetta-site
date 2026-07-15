# Cloudflare Pages deployment

This document covers preview deployment. **Do not change production DNS** until you are ready to launch.

## Cloudflare build settings

| Setting | Value |
|---------|-------|
| **Framework preset** | None |
| **Build command** | `npm run build` |
| **Build output directory** | `_site` |
| **Root directory** | `/` (repository root) |
| **Node.js version** | `20` |
| **Install command** | `npm install` |
| **Environment variables** | None required |

Optional: add a `.node-version` or `.nvmrc` file containing `20` so Cloudflare picks the correct Node version automatically.

## Dashboard setup (first time)

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Select GitHub and authorize access to **`mbossetta/michaelbossetta-site`**.
3. Configure the build using the settings above.
4. Set **Production branch** to `main` for eventual launch; for now use **`redesign-pass-1`** as the preview branch.
5. Click **Save and Deploy**. Cloudflare assigns a URL like `https://redesign-pass-1.michaelbossetta-site.pages.dev`.
6. After each push to the deploy branch, Cloudflare rebuilds automatically.

## Preview vs production

| Item | Preview (now) | Production (later) |
|------|---------------|-------------------|
| URL | `*.pages.dev` subdomain | `michaelbossetta.com` |
| DNS | Unchanged | Point apex + www to Cloudflare when ready |
| Branch | `redesign-pass-1` (or feature branch) | `main` |
| Analytics | Same GA4 ID (`G-XV3CTBJWRY`) | Same |

## HTTPS and domains

- Cloudflare Pages serves preview sites over HTTPS by default.
- The canonical URL in `src/_data/site.json` is `https://michaelbossetta.com` (apex, no www).
- At launch, configure Cloudflare to redirect `www.michaelbossetta.com` → `michaelbossetta.com` (or vice versa — match current WordPress behavior: apex is canonical).

## Redirects

- File: `src/_redirects` (copied to `_site/_redirects` at build time).
- Format: Cloudflare Pages redirect syntax (`/old/path /new/path 301`).
- Covers legacy WordPress URLs, `/pdfviewer/*` PDF shortcuts, and `/cv/download/`.
- Full list: `docs/redirect-plan.md`.

## Custom 404

- Template: `src/404.njk` → builds to `_site/404.html`.
- Cloudflare Pages serves `404.html` automatically for missing routes.

## Sitemap and robots

- **Sitemap:** generated at `/sitemap.xml` from `src/sitemap.njk`.
- **robots.txt:** static file at `src/robots.txt` (references production sitemap URL).

## Security headers

- File: `src/_headers` (Cloudflare Pages `_headers` format).
- Sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and cache rules for assets.

## Assets before first deploy

Run locally once to mirror PDFs and images from the live site:

```bash
npm run mirror-assets
git add src/wp-content src/files
git commit -m "Mirror assets from live site"
git push
```

Without this step, publication PDFs and homepage images may 404 on the preview site.

## Pages CMS + Cloudflare

Pages CMS commits to GitHub → Cloudflare rebuilds. See [CONTENT-EDITING.md](CONTENT-EDITING.md).

Connect Pages CMS to the same branch Cloudflare deploys.

## Contact form

The live Contact page uses email and Twitter links only (no form). The static site matches this — no backend required.

If you add a form later, use [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) or a third-party form service with spam protection.

## Pre-launch checklist

- [ ] Preview site visually matches live site at 375px, 768px, 1024px, desktop
- [ ] All navigation links work
- [ ] Publications table and PDF links work
- [ ] CV download works at `/files/cv.pdf` and legacy wp-content path
- [ ] Media page entries render from CMS data
- [ ] Pages CMS editing tested (publication, media, homepage)
- [ ] Redirects tested on preview (`*.pages.dev` supports `_redirects`)
- [ ] GA4 receiving preview traffic (optional: use separate property for preview)
- [ ] `npm run build` succeeds cleanly on Cloudflare
- [ ] Production DNS **not** changed until final approval
- [ ] When ready: point `michaelbossetta.com` to Cloudflare Pages, enable apex + www redirect, keep WordPress available as rollback until verified

## Rollback plan

Keep WordPress hosting active until the static site is verified. DNS changes are reversible by restoring the previous A/CNAME records.

## Local verification

```bash
npm install
npm run mirror-assets   # if assets missing
npm run build
npx --yes serve _site   # optional static preview on port 3000
npm start               # dev server at http://localhost:8080
```
