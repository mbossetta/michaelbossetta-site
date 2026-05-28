#!/usr/bin/env node
import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const manifest = join(root, "scripts", "asset-manifest.txt");
const urls = readFileSync(manifest, "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean);

let ok = 0;
let fail = 0;

for (const url of urls) {
  const rel = url.replace("https://michaelbossetta.com/", "");
  const dest = join(root, "src", rel);
  mkdirSync(dirname(dest), { recursive: true });
  if (existsSync(dest)) {
    console.log("skip (exists):", rel);
    ok++;
    continue;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    console.log("ok:", rel, `(${buf.length} bytes)`);
    ok++;
  } catch (err) {
    console.error("FAIL:", rel, err.message);
    fail++;
  }
}

console.log(`\nDone: ${ok} ok, ${fail} failed`);
