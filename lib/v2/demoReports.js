// CI2.0 · Reports by standard stub — glance-first bars/chips (not a spreadsheet).
// Demo standards only. Soft labels — no fake precision. Live spark = Check-ins waiting.

export const REPORTS_HREF = "/v2/teacher/reports";

export function REPORTS_STANDARD_HREF(code) {
  const c = String(code || "").trim();
  if (!c) return REPORTS_HREF;
  return `${REPORTS_HREF}/standard/${encodeURIComponent(c)}`;
}

export function REPORTS_ASSIGNMENT_HREF(id) {
  const a = String(id || "").trim();
  if (!a) return REPORTS_HREF;
  return `${REPORTS_HREF}/assignment/${encodeURIComponent(a)}`;
}

/**
 * Demo standards for the Reports stub.
 * classPct = rough “clear / ready” class share (demo — display as soft ~%).
 * needsCheckIn = soft demo hint only (not a live kid count).
 */
export const DEMO_STANDARD_REPORTS = [
  {
    id: "rep-4.3C",
    code: "4.3C",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Equivalent fractions — same amount with a clear model.",
    classPct: 78,
    needsCheckIn: 2,
    tone: "ready",
  },
  {
    id: "rep-4.3D",
    code: "4.3D",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Compare fractions — which is bigger, with a reason.",
    classPct: 62,
    needsCheckIn: 3,
    tone: "needsYou",
  },
  {
    id: "rep-4.3G",
    code: "4.3G",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    plain: "Fractions on a number line — mark and explain.",
    classPct: 71,
    needsCheckIn: 1,
    tone: "ready",
  },
  {
    id: "rep-4.9A",
    code: "4.9A",
    subject: "elar",
    subjectName: "ELAR",
    subjectColor: "#E8876A",
    plain: "Author’s purpose — persuade, inform, or entertain.",
    classPct: 84,
    needsCheckIn: 0,
    tone: "ready",
  },
  {
    id: "rep-5.6B",
    code: "5.6B",
    subject: "science",
    subjectName: "Science",
    subjectColor: "#3CB8A0",
    plain: "Mixtures vs solutions — claim + one evidence note.",
    classPct: 55,
    needsCheckIn: 3,
    tone: "needsYou",
  },
];


/**
 * Demo assignments linked to standards (contributing work for drill-ins).
 * Soft band counts — not a gradebook.
 */
export const DEMO_ASSIGNMENTS = [
  {
    id: "asg-mixtures-exit",
    title: "Mixtures exit ticket",
    subject: "science",
    subjectName: "Science",
    subjectColor: "#3CB8A0",
    standardCodes: ["5.6B"],
    when: "Yesterday",
    softSummary: "A few claims without evidence · most mixed the terms.",
    calmNext: "Quick Check-in on claim + one evidence note, then a short Daily Focus reteach.",
    bands: [
      { key: "clear", label: "Looking clear", count: 12, tone: "ready" },
      { key: "almost", label: "Almost there", count: 8, tone: "ready" },
      { key: "needsLook", label: "May need a look", count: 5, tone: "needsYou" },
    ],
  },
  {
    id: "asg-compare-frac",
    title: "Compare fractions mini-task",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3D", "4.3C"],
    when: "2 days ago",
    softSummary: "Reasons were thin when models didn’t match.",
    calmNext: "Pair share with matching models, then Check-ins for anyone still stuck.",
    bands: [
      { key: "clear", label: "Looking clear", count: 10, tone: "ready" },
      { key: "almost", label: "Almost there", count: 9, tone: "ready" },
      { key: "needsLook", label: "May need a look", count: 6, tone: "needsYou" },
    ],
  },
  {
    id: "asg-number-line",
    title: "Number line marks",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3G", "4.3C"],
    when: "This week",
    softSummary: "Most marks were close · a few skipped the explain step.",
    calmNext: "Daily Focus: mark + say why in one sentence.",
    bands: [
      { key: "clear", label: "Looking clear", count: 14, tone: "ready" },
      { key: "almost", label: "Almost there", count: 7, tone: "ready" },
      { key: "needsLook", label: "May need a look", count: 4, tone: "needsYou" },
    ],
  },
  {
    id: "asg-authors-purpose",
    title: "Author’s purpose warm-up",
    subject: "elar",
    subjectName: "ELAR",
    subjectColor: "#E8876A",
    standardCodes: ["4.9A"],
    when: "This week",
    softSummary: "Class looks steady · keep one evidence sentence habit.",
    calmNext: "Stay on Daily Focus pace — optional Check-ins only if someone flags.",
    bands: [
      { key: "clear", label: "Looking clear", count: 18, tone: "ready" },
      { key: "almost", label: "Almost there", count: 5, tone: "ready" },
      { key: "needsLook", label: "May need a look", count: 2, tone: "needsYou" },
    ],
  },
  {
    id: "asg-equiv-models",
    title: "Equivalent models check",
    subject: "math",
    subjectName: "Math",
    subjectColor: "#6C8CFF",
    standardCodes: ["4.3C"],
    when: "Last week",
    softSummary: "Models were mostly clear · a couple swapped parts.",
    calmNext: "Quick visual reteach in Daily Focus if the softest rows linger.",
    bands: [
      { key: "clear", label: "Looking clear", count: 16, tone: "ready" },
      { key: "almost", label: "Almost there", count: 6, tone: "ready" },
      { key: "needsLook", label: "May need a look", count: 3, tone: "needsYou" },
    ],
  },
];

/** Soften demo % so it never reads like a gradebook export. */
export function softClassPctLabel(pct) {
  const n = Math.round(Number(pct) || 0);
  if (n <= 0) return "~0% · demo";
  return `~${n}% · demo`;
}

/** Soften per-standard needs (demo hint — not a live kid count). */
export function softNeedsLabel(needsCheckIn) {
  const n = Number(needsCheckIn) || 0;
  if (n <= 0) return "Demo · looking clear";
  if (n === 1) return "Demo · may need a look";
  return "Demo · a few may need a look";
}

/** Soft row = needsYou tone (actionable next step — not a live kid list). */
export function isSoftStandardRow(row) {
  if (!row) return false;
  return row.tone === "needsYou";
}

/**
 * Softest demo standard: lowest classPct, with needsYou preferred on ties.
 * Used for one specific SAM takeaway + next-move CTA (not generic copy).
 */
export function pickSoftestStandard(rows = DEMO_STANDARD_REPORTS) {
  if (!rows.length) return null;
  return [...rows].sort((a, b) => {
    const pctDiff = (Number(a.classPct) || 0) - (Number(b.classPct) || 0);
    if (pctDiff !== 0) return pctDiff;
    const aNeeds = a.tone === "needsYou" ? 0 : 1;
    const bNeeds = b.tone === "needsYou" ? 0 : 1;
    return aNeeds - bNeeds;
  })[0];
}


/** Soft band total for an assignment (demo counts only). */
export function softBandTotal(bands) {
  if (!Array.isArray(bands) || !bands.length) return 0;
  return bands.reduce((s, b) => s + (Number(b.count) || 0), 0);
}

/** Soft one-line for assignment glance rows. */
export function softAssignmentGlanceLine(asg) {
  if (!asg) return "Demo · assignment";
  const needs = (asg.bands || []).find(
    (b) => b.key === "needsLook" || b.tone === "needsYou"
  );
  const n = needs ? Number(needs.count) || 0 : 0;
  if (n <= 0) return "Demo · looking clear";
  if (n === 1) return "Demo · 1 may need a look";
  return `Demo · ~${n} may need a look`;
}

export function findStandardByCode(code, rows = DEMO_STANDARD_REPORTS) {
  const needle = String(code || "").trim().toUpperCase();
  if (!needle) return null;
  return rows.find((r) => String(r.code || "").toUpperCase() === needle) || null;
}

export function findAssignmentById(id, list = DEMO_ASSIGNMENTS) {
  const needle = String(id || "").trim();
  if (!needle) return null;
  return list.find((a) => a.id === needle) || null;
}

/** Assignments that contributed data for a TEKS code (demo). */
export function getContributingAssignments(code, list = DEMO_ASSIGNMENTS) {
  const needle = String(code || "").trim().toUpperCase();
  if (!needle) return [];
  return list.filter((a) =>
    (a.standardCodes || []).some((c) => String(c).toUpperCase() === needle)
  );
}

/** Recent assignments for the glance MAP (demo order). */
export function getRecentAssignments(list = DEMO_ASSIGNMENTS, limit = 4) {
  return list.slice(0, Math.max(0, limit));
}

/**
 * Standard drill-in: how the class looks on that TEKS + contributing work + calm next move.
 */
export function getStandardDetail(code) {
  const standard = findStandardByCode(code);
  if (!standard) return null;
  const contributing = getContributingAssignments(standard.code);
  const softHint = softNeedsLabel(standard.needsCheckIn);
  const calmNext =
    standard.tone === "needsYou"
      ? `Calm next · Check-ins for anyone still stuck on ${standard.code}, then a short Daily Focus reteach.`
      : `Calm next · Keep Daily Focus pace on ${standard.code}; Check-ins only if someone flags.`;
  return {
    standard,
    contributing,
    softHint,
    calmNext,
    honesty: "Demo data · not live yet",
    classPctLabel: softClassPctLabel(standard.classPct),
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
    reportsHref: REPORTS_HREF,
  };
}

/**
 * Assignment drill-in: soft band breakdown (not a fake gradebook).
 */
export function getAssignmentDetail(id) {
  const assignment = findAssignmentById(id);
  if (!assignment) return null;
  const standards = (assignment.standardCodes || [])
    .map((c) => findStandardByCode(c))
    .filter(Boolean);
  const total = softBandTotal(assignment.bands);
  return {
    assignment,
    standards,
    total,
    honesty: "Demo data · not live yet",
    glanceLine: softAssignmentGlanceLine(assignment),
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
    reportsHref: REPORTS_HREF,
  };
}

export function getReportsStub() {
  const rows = DEMO_STANDARD_REPORTS;
  const recentAssignments = getRecentAssignments(DEMO_ASSIGNMENTS, 4);
  const needing = rows.filter((r) => r.needsCheckIn > 0).length;
  const avg =
    rows.length === 0
      ? 0
      : Math.round(rows.reduce((s, r) => s + r.classPct, 0) / rows.length);
  const softest = pickSoftestStandard(rows);
  const softHint = softest ? softNeedsLabel(softest.needsCheckIn) : null;
  const samLine = softest
    ? `Softest right now · TEKS ${softest.code} (${softest.subjectName}) — ${softest.plain} · ${softHint}.`
    : "Soft demo by standard — Check-ins when someone needs you.";
  return {
    title: "Class by standard",
    samLine,
    softest,
    softestHref: softest ? REPORTS_STANDARD_HREF(softest.code) : REPORTS_HREF,
    recentAssignments,
    softestNextMoveLabel: softest
      ? `Open ${softest.code} report`
      : "Open Reports",
    softestReteachLabel: softest
      ? `Plan a quick reteach · ${softest.code}`
      : "Plan a quick reteach",
    honesty: "Demo data · not live yet",
    rows,
    summary: {
      standards: rows.length,
      avgClassPct: avg,
      standardsNeedingCheckIn: needing,
    },
    checkInsHref: "/v2/teacher/check-ins",
    dayHref: "/v2/teacher/day?d=2",
  };
}

export default getReportsStub;
