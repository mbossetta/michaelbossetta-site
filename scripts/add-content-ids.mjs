#!/usr/bin/env node
/**
 * Add stable `id` fields to pubs.json and media.json (non-destructive).
 * Run once: node scripts/add-content-ids.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function addIds(items, prefix) {
  const used = new Set(items.filter((i) => i.id).map((i) => i.id));
  for (const item of items) {
    if (item.id) continue;
    const year = (item.date || item.year || "unknown").toString().slice(0, 4);
    const base = slugify(item.title || item.outlet || "entry");
    let id = `${prefix}-${year}-${base}`;
    let n = 2;
    while (used.has(id)) {
      id = `${prefix}-${year}-${base}-${n++}`;
    }
    item.id = id;
    used.add(id);
  }
  return items;
}

for (const [file, prefix] of [
  ["src/_data/pubs.json", "pub"],
  ["src/_data/media.json", "media"],
]) {
  const path = join(root, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  addIds(data, prefix);
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${file} (${data.length} entries)`);
}
