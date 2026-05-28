# Redirect Plan (Cloudflare Pages `_redirects`)

All redirects are 301 unless noted. Paths are mirrored under `_site/` at deploy time.

## Legacy WordPress pages

```
/home/                                    /                           301
/2018/04/21/publications/                 /publications/              301
/2018/04/21/the-podcast/                  /podcast/                   301
/category/research/                       /publications/              301
/category/podcast/                        /podcast/                   301
```

## PDF viewer plugin → direct PDF (preserve `/wp-content/uploads/` targets)

```
/pdfviewer/analyzing-citizen-engagement-european-politics-social-media-eu/     /wp-content/uploads/2022/02/Analyzing-Citizen-Engagement-With-European-Politics-on-Social-Media.pdf  301
/pdfviewer/antisemitism-social-media-platforms-bossetta/                       /wp-content/uploads/2022/02/Antisemitism-Social-Media-Bossetta-Pre-Print-Final.pdf  301
/pdfviewer/gamification-politics-social-media-bossetta/                        /wp-content/uploads/2022/11/Gamification_in_Politics_Bossetta_Pre_Print_Final.pdf  301
/pdfviewer/social-media-affordances-digital-political-campaigning/             /wp-content/uploads/2024/10/BOSSETTA-2024-THE-PROBLEMS-WITH-SOCIAL-MEDIA-AFFORDANCES-AND-DIGITAL-POLITICAL-CAMPAIGNING-Pre-Print.pdf  301
/pdfviewer/ucrania-la-primera-gran-guerra-de-la-era-hiperconectada-el-mercurio/  /wp-content/uploads/2022/03/artículo-elmercurio-guerra-hiperconectada-Ucrania-bossetta.pdf  301
/pdfviewer/bossetta-cv-may-2023/            /files/cv.pdf               301
/pdfviewer/bossetta-cv-june-2024/          /files/cv.pdf               301
/pdfviewer/cv-bossetta-june-2024/           /files/cv.pdf               301
/pdfviewer/cv-oct-2024/                     /files/cv.pdf               301
/pdfviewer/cv-oct-2024-updated/             /files/cv.pdf               301
/pdfviewer/2902/                            /files/cv.pdf               301
```

## CV convenience redirect

The live CV URL remains mirrored as a static file. Optional alias:

```
/cv/download/                             /files/cv.pdf               301
```

## Not redirected (served as static files)

All `/wp-content/uploads/**` paths listed in `scripts/asset-manifest.txt` are copied into `src/wp-content/uploads/` and served at the same URLs.

## Removed (404 expected)

- `/wp-json/*`, `/xmlrpc.php`, `/feed/`, `/wp-admin/*` — WordPress infrastructure, not migrated.
