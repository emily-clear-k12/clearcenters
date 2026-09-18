/**
 * CI2.0 glance grammar — quiet meaning colors (Emily design lock).
 *
 * 80% beauty / atmosphere, 20% glance grammar.
 * Grammar never louder than SAM or the art.
 * Soft pastels, glass-friendly — not neon, not corporate.
 *
 * Spatial (Daily Focus bento): SAM + morning top band · teach spine left ~60% ·
 * Plan·Teach·Check + Check-ins/grading peeks right ~40% · amber needs only ·
 * Hands-off / Sunday as compact chips (see docs/ci2/DAILY-FOCUS-LAYOUT.md).
 */

/** @typedef {'needsYou'|'ready'|'teach'|'project'|'toGrade'} GlanceMeaning */

export const GLANCE_MEANINGS = /** @type {const} */ ({
  needsYou: "needsYou",
  ready: "ready",
  teach: "teach",
  project: "project",
  toGrade: "toGrade",
});

/**
 * Soft / pastel tokens. Use as washes + ink, not solid brand blocks.
 * icon hints are for future Lucide/Sam marks — do not invent loud chrome yet.
 */
export const GLANCE = {
  needsYou: {
    key: "needsYou",
    label: "Needs you",
    /** soft amber — whisper only for real needs (never fill SAM chrome) */
    fg: "#9A7340",
    bg: "rgba(255, 246, 232, 0.72)",
    border: "rgba(212, 168, 98, 0.32)",
    wash: "#FFF8F0",
    icon: "amber-soft",
  },
  ready: {
    key: "ready",
    label: "Ready / good",
    /** calm teal-green */
    fg: "#2F8F7A",
    bg: "rgba(220, 242, 235, 0.92)",
    border: "rgba(90, 170, 150, 0.38)",
    wash: "#E4F5EF",
    icon: "teal-check",
  },
  teach: {
    key: "teach",
    label: "Teach",
    /** soft purple — stays behind existing lavender art */
    fg: "#7B6BB8",
    bg: "rgba(243, 238, 255, 0.95)",
    border: "rgba(179, 160, 230, 0.48)",
    wash: "#F3EEFF",
    icon: "soft-purple",
  },
  project: {
    key: "project",
    label: "Project",
    /** deeper indigo */
    fg: "#5B4F9A",
    bg: "rgba(232, 228, 250, 0.95)",
    border: "rgba(120, 108, 180, 0.42)",
    wash: "#E8E4FA",
    icon: "indigo-mark",
  },
  toGrade: {
    key: "toGrade",
    label: "To grade",
    /** coral / rose */
    fg: "#C07080",
    bg: "rgba(255, 232, 236, 0.9)",
    border: "rgba(210, 140, 155, 0.4)",
    wash: "#FFE8EC",
    icon: "coral-count",
  },
};

/** CSS custom properties for StationShell / glass surfaces. */
export const GLANCE_CSS_VARS = {
  "--glance-needs-fg": GLANCE.needsYou.fg,
  "--glance-needs-bg": GLANCE.needsYou.bg,
  "--glance-needs-border": GLANCE.needsYou.border,
  "--glance-ready-fg": GLANCE.ready.fg,
  "--glance-ready-bg": GLANCE.ready.bg,
  "--glance-ready-border": GLANCE.ready.border,
  "--glance-teach-fg": GLANCE.teach.fg,
  "--glance-teach-bg": GLANCE.teach.bg,
  "--glance-teach-border": GLANCE.teach.border,
  "--glance-project-fg": GLANCE.project.fg,
  "--glance-project-bg": GLANCE.project.bg,
  "--glance-project-border": GLANCE.project.border,
  "--glance-grade-fg": GLANCE.toGrade.fg,
  "--glance-grade-bg": GLANCE.toGrade.bg,
  "--glance-grade-border": GLANCE.toGrade.border,
};

/**
 * Resolve a meaning key (or legacy SamGlance tone) to a token.
 * Legacy: cream → needsYou, mint → ready, lav/lavender → teach.
 */
export function glanceToken(meaningOrTone) {
  const k = String(meaningOrTone || "").toLowerCase();
  if (k === "needsyou" || k === "needs_you" || k === "cream" || k === "amber") return GLANCE.needsYou;
  if (k === "ready" || k === "good" || k === "mint" || k === "teal") return GLANCE.ready;
  if (k === "teach" || k === "lav" || k === "lavender") return GLANCE.teach;
  if (k === "project" || k === "indigo") return GLANCE.project;
  if (k === "tograde" || k === "to_grade" || k === "grade" || k === "coral") return GLANCE.toGrade;
  return GLANCE.teach;
}

/**
 * Inline chip / badge styles — whisper accent, glass-friendly.
 * @param {string} meaningOrTone
 * @param {{ solid?: boolean }} [opts]
 */
export function glanceChipStyle(meaningOrTone, opts = {}) {
  const t = glanceToken(meaningOrTone);
  if (opts.solid) {
    return {
      color: "#fff",
      background: t.fg,
      border: `1px solid ${t.fg}`,
    };
  }
  return {
    color: t.fg,
    background: t.bg,
    border: `1px solid ${t.border}`,
  };
}

/** Soft card wash (Check-ins cards, SAM glance rows). */
export function glanceCardStyle(meaningOrTone) {
  const t = glanceToken(meaningOrTone);
  return {
    background: t.bg,
    border: `1px solid ${t.border}`,
  };
}

/**
 * One-line collapsed hint for docs / optional UI (NOT a loud on-screen key).
 * Prefer docs; if shown in UI, keep tiny + muted.
 */
export const GLANCE_LEGEND_HINT =
  "Quiet cues · amber needs you · teal ready · purple teach · indigo project · coral to grade";

export default GLANCE;