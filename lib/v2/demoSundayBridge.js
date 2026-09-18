// CI2.0 · Sunday preview → This Week bridge (demo localStorage).
// Apply writes routine-style blocks onto ci2.teacher.addedActivities.

export const SUNDAY_APPLIED_KEY = "ci2.sunday.appliedToWeek";
export const SUNDAY_BRIDGE_PREFIX = "added-sunday-";

/**
 * Build demo tiles from Sunday outbound preview rows.
 * Prefers auto/routine rows; falls back to one assign per day.
 */
export function buildSundayBridgeBlocks(outboundRows, opts = {}) {
  const classFilter = opts.classFilter || "all";
  const stamp = opts.stamp || Date.now();
  const assigns = (outboundRows || []).filter((r) => r && r.type === "assign");
  let picks = assigns.filter((r) => r.auto);
  if (picks.length === 0) {
    const byDay = {};
    for (const r of assigns) {
      if (byDay[r.day] == null) byDay[r.day] = r;
    }
    picks = Object.keys(byDay)
      .map(Number)
      .sort((a, b) => a - b)
      .map((d) => byDay[d]);
  }
  // Cap glance — 2–5 blocks is enough to see on This Week
  picks = picks.slice(0, 5);
  if (picks.length === 0) {
    // Absolute fallback so Apply is never a no-op in empty demos
    picks = [
      {
        day: 1,
        subject: "math",
        title: "Fraction practice",
        kind: "work",
        minutes: 15,
        auto: true,
      },
      {
        day: 2,
        subject: "elar",
        title: "ClearSheet check",
        kind: "work",
        minutes: 12,
        auto: true,
      },
      {
        day: 3,
        subject: "math",
        title: "Skill Builder Practice",
        kind: "work",
        minutes: 15,
        auto: true,
      },
    ];
  }

  const classes =
    classFilter && classFilter !== "all" ? [classFilter] : "all";

  return picks.map((r, i) => ({
    id: `${SUNDAY_BRIDGE_PREFIX}${stamp}-${i}`,
    subject: r.subject || "math",
    day: typeof r.day === "number" ? r.day : 2,
    kind: r.kind || "work",
    title: r.auto
      ? `Routine · ${r.title}`
      : `From Sunday · ${r.title}`,
    product: r.product || "CrystalQuest",
    minutes: r.minutes != null ? r.minutes : 15,
    who: "Everyone",
    classes,
    standard: "",
    isNew: true,
    fromSunday: true,
    routine: !!r.auto,
    auto: !!r.auto,
  }));
}

export function isSundayBridgeActivity(a) {
  const id = String(a?.id || "");
  return a?.fromSunday === true || id.startsWith(SUNDAY_BRIDGE_PREFIX);
}

export function readSundayAppliedMeta() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SUNDAY_APPLIED_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function writeSundayAppliedMeta(meta) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SUNDAY_APPLIED_KEY, JSON.stringify(meta || {}));
    window.dispatchEvent(new CustomEvent("ci2-sunday-applied"));
  } catch {
    /* ignore */
  }
}

export function clearSundayAppliedMeta() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SUNDAY_APPLIED_KEY);
    window.dispatchEvent(new CustomEvent("ci2-sunday-applied"));
  } catch {
    /* ignore */
  }
}

export default buildSundayBridgeBlocks;
