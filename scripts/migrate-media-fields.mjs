import fs from "fs";
import path from "path";

const mediaPath = path.join("src", "_data", "media.json");
const items = JSON.parse(fs.readFileSync(mediaPath, "utf8"));

const COUNTRY_CODE = /^(.+)\s+\(([A-Z]{2})\)$/;

function splitOutlet(outlet) {
  if (!outlet) return { outlet: "", outlet_nationality: "" };
  const match = outlet.match(COUNTRY_CODE);
  if (!match) return { outlet, outlet_nationality: "" };
  return { outlet: match[1].trim(), outlet_nationality: match[2] };
}

function splitDate(date) {
  if (!date) return { month: "", year: null, day: null };

  const full = date.match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (full) {
    return { month: full[1], day: Number(full[2]), year: Number(full[3]) };
  }

  const monthYear = date.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYear) {
    return { month: monthYear[1], day: null, year: Number(monthYear[2]) };
  }

  return { month: "", year: null, day: null, date };
}

const migrated = items.map((item) => {
  const { outlet, outlet_nationality } = splitOutlet(item.outlet || "");
  const { month, year, day, date: legacyDate } = splitDate(item.date || "");
  const next = { ...item, outlet, outlet_nationality, month, year };

  if (day) next.day = day;
  else delete next.day;

  delete next.date;

  if (legacyDate) {
    next.date = legacyDate;
  }

  return next;
});

fs.writeFileSync(mediaPath, `${JSON.stringify(migrated, null, 2)}\n`);
console.log(`migrate-media-fields: updated ${migrated.length} entries`);
