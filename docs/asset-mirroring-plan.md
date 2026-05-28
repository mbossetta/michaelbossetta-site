# Asset Mirroring Plan

## Principle

Every file linked from the live site under `/wp-content/uploads/` is downloaded and placed at the **identical path** in the static build:

```
src/wp-content/uploads/...  →  _site/wp-content/uploads/...
```

This preserves all publication preprint links, media PDFs, images, and favicon without breaking inbound URLs.

## Source manifest

Run `node scripts/mirror-assets.mjs` (or `bash scripts/mirror-assets.sh`) to download all URLs in `scripts/asset-manifest.txt`.

Manifest is generated from:
- All six main pages (HTML scrape)
- All `preprint_url` / `published_url` values in `src/_data/pubs.json` that point to `michaelbossetta.com/wp-content/`

## CV (special case)

| Path | Purpose |
|------|---------|
| `src/files/cv.pdf` | **Canonical CV** — replace this single file to update CV |
| `src/wp-content/uploads/2025/08/Michael-Bossetta-CV-Updated-August-2025.pdf` | Mirrored copy for old links (synced from `files/cv.pdf` at build) |

## Images used in layout (also under wp-content paths)

| File | Usage |
|------|-------|
| `wp-content/uploads/2023/01/Michael-Bossetta-Headshot-Compressed-for-Website-1-scaled.jpg` | Homepage hero |
| `wp-content/uploads/2018/04/Copenhagen-Black-White-Color-Select-1-e1524284609434.jpg` | Homepage background |
| `wp-content/uploads/2020/11/favicon-1.ico` | Favicon |

## Post-migration updates

- **New publication:** edit `src/_data/publications.yaml`, add PDF to `src/wp-content/uploads/` if self-hosted
- **New CV:** replace `src/files/cv.pdf`, run build (mirrors to legacy path via build script)
