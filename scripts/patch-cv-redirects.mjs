#!/usr/bin/env node
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import {
  cvRedirectFromPatterns,
  encodeUriPath,
  readSiteCvUrl,
} from "./lib/cv-path.mjs";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const redirectsPath = join(root, "_site", "_redirects");
const cvUrl = readSiteCvUrl(root);

if (!cvUrl) {
  console.warn("patch-cv-redirects: site.cv_url is not set");
  process.exit(0);
}

const cvTarget = encodeUriPath(cvUrl);
const lines = readFileSync(redirectsPath, "utf8").split("\n");
let patched = 0;

const updated = lines.map((line) => {
  const trimmed = line.trim();
  if (!trimmed) return line;

  const match = trimmed.match(/^(\S+)\s+(\S+)\s+(\d+)\s*$/);
  if (!match) return line;

  const [, from, , status] = match;
  if (!cvRedirectFromPatterns.some((pattern) => pattern.test(from))) {
    return line;
  }

  patched += 1;
  return `${from} ${cvTarget} ${status}`;
});

writeFileSync(redirectsPath, updated.join("\n"));
console.log(
  `patch-cv-redirects: updated ${patched} redirect(s) to ${cvTarget}`
);
