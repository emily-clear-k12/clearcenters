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

let cache = { at: 0, items: null };

function titleFromFilename(name) {
  const base = String(name).replace(/\.[^.]+$/, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
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
    const stem = ent.name.replace(/\.[^.]+$/, "").toLowerCase();
    const tags = stem.split(/[-_]+/).filter(Boolean);
    items.push({
      id: url,
      url,
      title: titleFromFilename(ent.name),
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
