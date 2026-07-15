import fs from "fs";
import path from "path";

const siteDir = "_site";
const indexPath = path.join(siteDir, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error("Build verification failed: missing _site/index.html. Run npm run build first.");
  process.exit(1);
}

const html = fs.readFileSync(indexPath, "utf8");
const stylesheetHrefs = [
  ...html.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi),
]
  .map((match) => {
    const tag = match[0];
    const hrefMatch = tag.match(/\bhref=["']([^"']+)["']/i);
    return hrefMatch?.[1] ?? null;
  })
  .filter((href) => href && !/^https?:\/\//i.test(href));

if (stylesheetHrefs.length === 0) {
  console.error("Build verification failed: no local stylesheet linked from _site/index.html.");
  process.exit(1);
}

const missing = [];

for (const href of stylesheetHrefs) {
  const filePath = path.join(siteDir, href.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    missing.push({ href, filePath });
  }
}

if (missing.length > 0) {
  console.error("Build verification failed: stylesheet referenced in HTML but missing from _site:");
  for (const { href, filePath } of missing) {
    console.error(`  ${href} → expected ${filePath}`);
  }
  process.exit(1);
}

console.log("Build verification passed.");
for (const href of stylesheetHrefs) {
  const filePath = path.join(siteDir, href.replace(/^\//, ""));
  console.log(`  ${href} → ${filePath}`);
}
