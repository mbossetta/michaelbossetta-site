#!/usr/bin/env node
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const cvSrc = join(root, "src", "files", "cv.pdf");
const cvLegacy = join(
  root,
  "src",
  "wp-content",
  "uploads",
  "2025",
  "08",
  "Michael-Bossetta-CV-Updated-August-2025.pdf"
);

if (!existsSync(cvSrc)) {
  console.warn("sync-cv: src/files/cv.pdf not found (run mirror-assets first)");
  process.exit(0);
}

mkdirSync(dirname(cvLegacy), { recursive: true });
copyFileSync(cvSrc, cvLegacy);
console.log("sync-cv: copied cv.pdf → legacy wp-content path");
