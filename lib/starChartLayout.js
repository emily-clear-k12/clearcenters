// Sept 24, 2026 — Star Chart layout and colors, shared by the teacher page
// and the student's My Sky. Safe to import in the browser (no server code).
//
// Design rule (FrequencyRush_Fluency_Expansion_v1.md §11.10c): each screen
// answers one question and everything else waits behind a tap. So a
// constellation draws at most MAX_DRAWN stars (the ones that most need
// attention first); the side panel lists every star.

export const MAX_DRAWN = 16;
const CELL_W = 300;
const CELL_H = 250;
const STATE_RANK = { needs: 0, learning: 1, lit: 2, untried: 3 };

// Class version of a star, for whichever students the teacher is looking at.
//   lit      — at least 80% of those students have lit it
//   needs    — at least a quarter of the students who tried it are stuck
//   learning — anything else that someone has tried
//   untried  — nobody in the group has tried it
export function classStar(star, scopeIds) {
  let lit = 0, learning = 0, needs = 0;
  const stuckIds = [];
  for (const id of scopeIds) {
    const s = star.byStudent[id];
    if (s === "lit") lit += 1;
    else if (s === "learning") learning += 1;
    else if (s === "needs") { needs += 1; stuckIds.push(id); }
  }
  const tried = lit + learning + needs;
  let state = "learning";
  if (!tried) state = "untried";
  else if (scopeIds.length && lit / scopeIds.length >= 0.8) state = "lit";
  else if (needs / tried >= 0.25) state = "needs";
  return { state, lit, learning, needs, tried, stuckIds };
}

// The student's own version of a star.
export function studentStar(star, studentId) {
  return { state: star.byStudent[studentId] || "untried" };
}

// Look of a star dot. Lit, learning and needs differ in size and brightness,
// not only hue, so they read apart for color-blind students too.
export function starDotStyle(state, { selected = false, inline = false } = {}) {
  const base = { display: inline ? "inline-block" : "block", borderRadius: "50%", flexShrink: 0 };
  const ring = selected ? { outline: "2px solid #FFFFFF", outlineOffset: 3 } : {};
  if (state === "lit") return { ...base, width: 15, height: 15, background: "#F2F8FF", boxShadow: "0 0 14px 4px rgba(140,210,255,0.85)", ...ring };
  if (state === "learning") return { ...base, width: 12, height: 12, background: "#F4B94A", boxShadow: "0 0 10px 2px rgba(244,185,74,0.6)", ...ring };
  if (state === "needs") return { ...base, width: 9, height: 9, background: "#C8664F", boxShadow: "0 0 6px 1px rgba(200,102,79,0.55)", ...ring };
  return { ...base, width: 5, height: 5, background: "rgba(255,255,255,0.35)", ...ring };
}

export const STATE_WORDS = {
  teacher: { lit: "Lit", learning: "Learning", needs: "Needs work", untried: "Not practiced yet" },
  student: { lit: "Lit", learning: "Getting it", needs: "Keep practicing", untried: "Not tried yet" },
};

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
//   stateOf(activity, star) -> "lit" | "learning" | "needs" | "untried"
export function layoutSky(activities, { width, stateOf }) {
  const cols = Math.max(1, Math.floor(width / CELL_W));
  const cellW = width / cols;
  const constellations = activities.map((act, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const ox = col * cellW;
    const oy = row * CELL_H;
    const withState = act.stars.map((s) => ({ ...s, state: stateOf(act, s) }));
    const drawn = [...withState]
      .sort((a, b) => STATE_RANK[a.state] - STATE_RANK[b.state] || hash(a.key) - hash(b.key))
      .slice(0, MAX_DRAWN);
    // 4 × 4 slots inside the cell, each nudged a little, in a snake order so
    // the connecting line wanders like a constellation instead of zig-zagging.
    const slots = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) slots.push({ r, c: r % 2 ? 3 - c : c });
    const start = hash(act.caseStandard) % slots.length;
    const placed = drawn.map((s, i) => {
      const slot = slots[(start + i * 5) % slots.length];
      const h = hash(s.key);
      const x = ox + 28 + slot.c * ((cellW - 90) / 3) + ((h % 25) - 12);
      const y = oy + 30 + slot.r * 40 + (((h >> 5) % 21) - 10);
      return { ...s, x: Math.round(x), y: Math.round(y), order: (start + i * 5) % slots.length };
    });
    const path = [...placed].sort((a, b) => a.order - b.order);
    const lines = [];
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1], b = path[i];
      if (a.state === "untried" || b.state === "untried") continue;
      lines.push({ x: a.x, y: a.y, len: Math.hypot(b.x - a.x, b.y - a.y), angle: (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI });
    }
    const lit = withState.filter((s) => s.state === "lit").length;
    return {
      caseStandard: act.caseStandard,
      title: act.title,
      stars: placed,
      lines,
      total: withState.length,
      lit,
      more: Math.max(0, withState.length - placed.length),
      labelX: Math.round(ox + 20),
      labelY: Math.round(oy + 30 + 3 * 40 + 34),
    };
  });
  const rows = Math.max(1, Math.ceil(activities.length / cols));
  return { constellations, height: rows * CELL_H };
}
