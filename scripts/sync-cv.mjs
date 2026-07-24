#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  cvUrlToSrcPath,
  legacyCvSrcPath,
  readSiteCvUrl,
} from "./lib/cv-path.mjs";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const cvUrl = readSiteCvUrl(root);
const cvSrc = cvUrlToSrcPath(root, cvUrl);
const cvLegacy = legacyCvSrcPath(root);

if (!cvSrc) {
  console.warn("sync-cv: site.cv_url must be a /files/ path");
  process.exit(0);
}

if (!existsSync(cvSrc)) {
  console.warn(`sync-cv: CV source not found at ${cvSrc}`);
  process.exit(0);
}

mkdirSync(dirname(cvLegacy), { recursive: true });
copyFileSync(cvSrc, cvLegacy);
console.log(`sync-cv: copied ${cvUrl} → legacy wp-content path`);
