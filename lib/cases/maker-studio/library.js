/**
 * Maker Studio — living ClearCenters image library (server helper).
 *
 * AUTO-ORGANIZE CONVENTION (Emily / content):
 *   Drop product illustration/photo files into:
 *     public/maker/   ← primary drop folder for new Maker art
 *     public/lab/     ← also scanned (lab/exhibit photos kids already know)
 *   New files become searchable automatically on the next API request
 *   (short in-memory cache, ~30s). No Maker-only JSON / manifest edit.
 *
 * Out of scope on purpose (not scanned): icons/, badges/, teacher chrome,
 * case card codes, node_modules, UI assets. Keep kid-facing art in the
 * folders above so the library stays clean.
 */

import fs from "fs";
import path from "path";

const LIBRARY_ROOTS = [
  { folder: "maker", label: "Maker" },
  { folder: "lab", label: "Lab" },
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const CACHE_MS = 30 * 1000;

/** ClearKeys / Relay case-code families → short kid labels (never show raw RS-3-BIO01). */
const CLEARKEYS_FAMILY = {
  BIO: "Biology scene",
  SCI: "Science materials",
  SS: "Social Studies map",
  ELA: "Reading scene",
  NUM: "Math story",
  LOG: "Logic puzzle",
  // Core single-letter tracks
  S: "Science scene",
  C: "Crew scene",
  P: "Study picture",
  L: "Looking scene",
};

const SHADE_PART_LABELS = {
  halves: "halves",
  thirds: "thirds",
  fourths: "fourths",
  unequal: "unequal parts",
};

let cache = { at: 0, items: null };

function titleCaseWords(stem) {
  return String(stem)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Student-facing title. Prefer folder/topic phrases over product codes.
 * Teachers can still find items by code via tags + url in search.
 */
function displayTitle(filename, urlPrefix) {
  const stem = String(filename).replace(/\.[^.]+$/, "");
  const folders = String(urlPrefix || "")
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean);
  const inClearkeys = folders.includes("clearkeys");
  const inExpedition = folders.includes("expedition");

  // RS-3-BIO01 / RS-4-S01 — ClearKeys copies (also match if filename alone looks like one)
  const rs = stem.match(
    /^RS[-_]?(\d+)[-_]?(BIO|SCI|SS|ELA|NUM|LOG|S|C|P|L)(\d+)?$/i
  );
  if (rs && (inClearkeys || /^RS[-_]/i.test(stem))) {
    const grade = rs[1];
    const family = rs[2].toUpperCase();
    const idx = rs[3] ? String(parseInt(rs[3], 10)) : "";
    const label = CLEARKEYS_FAMILY[family] || family;
    const withIdx = idx ? `${label} ${idx}` : label;
    return `${withIdx} · Grade ${grade}`;
  }

  // Expedition shade diagrams: shade-circle-halves → "Shade halves on a circle"
  if (inExpedition || /^shade[-_]/i.test(stem)) {
    const shade = stem.match(/^shade[-_]([a-z]+)[-_]([a-z]+)$/i);
    if (shade) {
      const shape = shade[1].toLowerCase();
      const partKey = shade[2].toLowerCase();
      const part = SHADE_PART_LABELS[partKey] || partKey.replace(/[-_]+/g, " ");
      const article = /^[aeiou]/i.test(shape) ? "an" : "a";
      return `Shade ${part} on ${article} ${shape}`;
    }
  }

  // Soft strip of known product prefixes (still searchable via url/tags)
  let cleaned = stem;
  if (/^bb[-_]/i.test(cleaned)) cleaned = cleaned.replace(/^bb[-_]/i, "");
  if (/^kinds[-_]/i.test(cleaned)) cleaned = cleaned.replace(/^kinds[-_]/i, "");

  return titleCaseWords(cleaned);
}

function buildTags(stem, title, urlPrefix) {
  const tags = new Set();
  for (const part of String(stem)
    .toLowerCase()
    .split(/[-_]+/)
    .filter(Boolean)) {
    tags.add(part);
  }
  // Keep raw stem so "RS-3-BIO01" / "bio01" still match after friendly titles
  tags.add(String(stem).toLowerCase());
  for (const word of String(title)
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1)) {
    tags.add(word);
  }
  for (const folder of String(urlPrefix || "")
    .toLowerCase()
    .split(/[/\\]+/)
    .filter(Boolean)) {
    tags.add(folder);
  }
  return Array.from(tags);
}

function walk(absDir, urlPrefix, items) {
  let entries;
  try {
    entries = fs.readdirSync(absDir, { withFileTypes: true });
  } catch (_) {
    return;
  }
  for (const ent of entries) {
    if (!ent || !ent.name || ent.name.startsWith(".")) continue;
    // Skip UI chrome: underscore-prefixed dirs/files (e.g. _chrome/) and crew-room bg
    if (ent.name.startsWith("_")) continue;
    if (/^readme/i.test(ent.name)) continue;
    if (/^crew-room-bg$/i.test(ent.name.replace(/\.[^.]+$/, ""))) continue;
    const abs = path.join(absDir, ent.name);
    if (ent.isDirectory()) {
      walk(abs, `${urlPrefix}/${ent.name}`, items);
      continue;
    }
    const ext = path.extname(ent.name).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const url = `/${urlPrefix}/${ent.name}`.replace(/\\/g, "/");
    const stem = ent.name.replace(/\.[^.]+$/, "");
    const title = displayTitle(ent.name, urlPrefix);
    const tags = buildTags(stem, title, urlPrefix);
    items.push({
      id: url,
      url,
      title,
      tags,
      source: urlPrefix.split("/")[0],
    });
  }
}

/** Full catalog (cached briefly). Prefer searchMakerLibrary for UI. */
export function scanMakerLibrary() {
  const now = Date.now();
  if (cache.items && now - cache.at < CACHE_MS) return cache.items;

  const publicDir = path.join(process.cwd(), "public");
  const items = [];
  for (const root of LIBRARY_ROOTS) {
    const abs = path.join(publicDir, root.folder);
    if (!fs.existsSync(abs)) continue;
    walk(abs, root.folder, items);
  }
  items.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  cache = { at: now, items };
  return items;
}

/** Filter by q (filename / title / tags). Empty q → first page of all. */
export function searchMakerLibrary(q, limit = 48) {
  const all = scanMakerLibrary();
  const capped = Math.min(80, Math.max(1, Number(limit) || 48));
  const query = String(q || "").trim().toLowerCase();
  if (!query) return all.slice(0, capped);
  const terms = query.split(/\s+/).filter(Boolean);
  const hits = [];
  for (const item of all) {
    const hay = `${item.title} ${(item.tags || []).join(" ")} ${item.url}`.toLowerCase();
    if (terms.every((t) => hay.includes(t))) hits.push(item);
  }
  return hits.slice(0, capped);
}

export function invalidateMakerLibraryCache() {
  cache = { at: 0, items: null };
}

export const MAKER_LIBRARY_DROP_FOLDERS = LIBRARY_ROOTS.map((r) => `public/${r.folder}/`);