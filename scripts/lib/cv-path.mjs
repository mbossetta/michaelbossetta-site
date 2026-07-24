import { readFileSync } from "fs";
import { join } from "path";

export function readSiteCvUrl(root) {
  const sitePath = join(root, "src", "_data", "site.json");
  const site = JSON.parse(readFileSync(sitePath, "utf8"));
  return site.cv_url || "";
}

export function cvUrlToSrcPath(root, cvUrl) {
  if (!cvUrl?.startsWith("/files/")) return null;
  return join(root, "src", "files", cvUrl.replace(/^\/files\//, ""));
}

export function legacyCvSrcPath(root) {
  return join(
    root,
    "src",
    "wp-content",
    "uploads",
    "2025",
    "08",
    "Michael-Bossetta-CV-Updated-August-2025.pdf"
  );
}

export function encodeUriPath(path) {
  if (!path) return "";
  return path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

export const cvRedirectFromPatterns = [
  /^\/pdfviewer\/bossetta-cv-/,
  /^\/pdfviewer\/cv-/,
  /^\/pdfviewer\/2902\//,
  /^\/cv\/download\//,
];
