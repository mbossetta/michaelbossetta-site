#!/usr/bin/env node
/**
 * Re-scrape publications table from the live site into src/_data/pubs.json.
 * Usage: node scripts/extract-publications.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const url = "https://michaelbossetta.com/publications/";

const res = await fetch(url);
const html = await res.text();
const tableMatch = html.match(/<table id="supsystic-table-1"[^>]*>([\s\S]*?)<\/table>/);
if (!tableMatch) {
  console.error("Could not find publications table");
  process.exit(1);
}

const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].slice(1);
const clean = (t) => t.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const pubs = rows
  .map((row) => {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((c) => c[1]);
    if (cells.length < 5) return null;
    const titleMatch = cells[2].match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    const linkMatch =
      cells[4].match(/<a[^>]+href="([^"]+)"[^>]*>\s*\[X\]\s*<\/a>/) ||
      cells[4].match(/<a[^>]+href="([^"]+)"/);
    let preprint_url = titleMatch ? titleMatch[1].replace(/&amp;/g, "&") : "";
    if (preprint_url.includes("pdfviewer/analyzing-citizen")) {
      preprint_url =
        "https://michaelbossetta.com/wp-content/uploads/2022/02/Analyzing-Citizen-Engagement-With-European-Politics-on-Social-Media.pdf";
    }
    return {
      year: clean(cells[0]),
      authors: clean(cells[1]),
      title: titleMatch ? clean(titleMatch[2]) : clean(cells[2]),
      journal: clean(cells[3]),
      preprint_url,
      published_url: linkMatch ? linkMatch[1].replace(/&amp;/g, "&") : "",
    };
  })
  .filter(Boolean);

writeFileSync(join(root, "src", "_data", "pubs.json"), JSON.stringify(pubs, null, 2) + "\n");
console.log(`Wrote ${pubs.length} publications to src/_data/pubs.json`);
