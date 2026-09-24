// Sept 24, 2026 — Star Chart layout and colors, shared by the teacher page
// and the student's My Sky. Safe to import in the browser (no server code).
//
// Design rule (FrequencyRush_Fluency_Expansion_v1.md §11.10c): each screen
// answers one question and everything else waits behind a tap. So a
// constellation draws at most MAX_DRAWN stars (the ones that most need
// attention first); the side panel lists every star.
//
// Star colors use the SAME score bands as the teacher home page
// (components/teacher/TodayBridge.js scoreColor), per Emily: a star's color
// means what a score's color means everywhere else on the site.

export const MAX_DRAWN = 16;
const CELL_W = 300;
const CELL_H = 250;

// Lower bound is exclusive of the band below, matching scoreColor():
// <=50 red, <70 orange, <80 yellow, <90 green, else blue.
export const BANDS = [
  { key: "red", label: "0–50%", color: "#d64545", glow: "rgba(214,69,69,0.6)", size: 9 },
  { key: "orange", label: "51–69%", color: "#e8943a", glow: "rgba(232,148,58,0.6)", size: 10 },
  { key: "yellow", label: "70–79%", color: "#e0aa1a", glow: "rgba(224,170,26,0.6)", size: 12 },
  { key: "green", label: "80–89%", color: "#2fae66", glow: "rgba(47,174,102,0.7)", size: 14 },
  { key: "blue", label: "90–100%", color: "#5a9bff", glow: "rgba(90,155,255,0.85)", size: 16 },
];
// The page's exact home-page colors, for text and dots on white.
export const BAND_ON_WHITE = { red: "#d64545", orange: "#e8943a", yellow: "#c8960a", green: "#1f8a4d", blue: "#3d84f5", untried: "#C9C4DB" };
const BAND_RANK = { red: 0, orange: 1, yellow: 2, green: 3, blue: 4, untried: 5 };

export function bandFor(pct) {
  if (pct == null) return "untried";
  if (pct <= 50) return "red";
  if (pct < 70) return "orange";
  if (pct < 80) return "yellow";
  if (pct < 90) return "green";
  return "blue";
}

// Class version of a star, for whichever students the teacher is looking at.
//   pct      — average of each student's recent score on it, among those who tried
//   stuckIds — students for whom it's currently a missed question
//   lit      — students at 80% or better on it
export function classStar(star, scopeIds) {
  let sum = 0, tried = 0, lit = 0;
  for (const id of scopeIds) {
    const p = star.byStudent[id];
    if (p == null) continue;
    tried += 1;
    sum += p;
    if (p >= 80) lit += 1;
  }
  const inScope = new Set(scopeIds);
  const stuckIds = (star.stuck || []).filter((id) => inScope.has(id));
  const pct = tried ? Math.round(sum / tried) : null;
  return { pct, band: bandFor(pct), tried, lit, stuckIds };
}

// The student's own version of a star.
export function studentStar(star, studentId) {
  const pct = star.byStudent[studentId];
  return { pct: pct == null ? null : pct, band: bandFor(pct), stuck: (star.stuck || []).includes(studentId) };
}

// Look of a star dot on the dark sky. Bands differ in size and glow as well
// as color, so they read apart for color-blind viewers too.
export function starDotStyle(band, { selected = false, inline = false } = {}) {
  const base = { display: inline ? "inline-block" : "block", borderRadius: "50%", flexShrink: 0 };
  const ring = selected ? { outline: "2px solid #FFFFFF", outlineOffset: 3 } : {};
  const b = BANDS.find((x) => x.key === band);
  if (!b) return { ...base, width: 5, height: 5, background: "rgba(255,255,255,0.35)", ...ring };
  const glow = b.key === "blue" ? `0 0 16px 5px ${b.glow}` : b.key === "green" ? `0 0 12px 3px ${b.glow}` : `0 0 8px 2px ${b.glow}`;
  return { ...base, width: b.size, height: b.size, background: b.color, boxShadow: glow, ...ring };
}

function hash(str) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

// Lays constellations out on a grid of cells, one per activity. Each drawn
// star gets a stable spot (the same star lands in the same place on every
// visit), and stars are joined in a gentle path like a constellation.
//   activities: [{ caseStandard, title, stars: [{ key, label, ... }] }]
//   bandOf(activity, star) -> "red" | "orange" | "yellow" | "green" | "blue" | "untried"
export function layoutSky(activities, { width, bandOf }) {
  const cols = Math.max(1, Math.floor(width / CELL_W));
  const cellW = width / cols;
  const constellations = activities.map((act, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const ox = col * cellW;
    const oy = row * CELL_H;
    const withBand = act.stars.map((s) => ({ ...s, band: bandOf(act, s) }));
    const drawn = [...withBand]
      .sort((a, b) => BAND_RANK[a.band] - BAND_RANK[b.band] || hash(a.key) - hash(b.key))
      .slice(0, MAX_DRAWN);
    // 4 × 4 slots inside the cell, each nudged a little, in a snake order so
    // the connecting line wanders like a constellation instead of zig-zagging.
    const slots = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) slots.push({ r, c: r % 2 ? 3 - c : c });
    const start = hash(act.caseStandard) % slots.length;
    const placed = drawn.map((s, i) => {
      const slotIndex = (start + i * 5) % slots.length;
      const slot = slots[slotIndex];
      const h = hash(s.key);
      const x = ox + 28 + slot.c * ((cellW - 90) / 3) + ((h % 25) - 12);
      const y = oy + 30 + slot.r * 40 + (((h >> 5) % 21) - 10);
      return { ...s, x: Math.round(x), y: Math.round(y), order: slotIndex };
    });
    const path = [...placed].sort((a, b) => a.order - b.order);
    const lines = [];
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1], b = path[i];
      if (a.band === "untried" || b.band === "untried") continue;
      lines.push({ x: a.x, y: a.y, len: Math.hypot(b.x - a.x, b.y - a.y), angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI });
    }
    const lit = withBand.filter((s) => s.band === "green" || s.band === "blue").length;
    return {
      caseStandard: act.caseStandard,
      title: act.title,
      stars: placed,
      lines,
      total: withBand.length,
      lit,
      more: Math.max(0, withBand.length - placed.length),
      labelX: Math.round(ox + 20),
      labelY: Math.round(oy + 30 + 3 * 40 + 34),
    };
  });
  const rows = Math.max(1, Math.ceil(activities.length / cols));
  return { constellations, height: rows * CELL_H };
}
